import sys,glob
from PIL import Image
d=sys.argv[1]; fs=sorted(glob.glob(d+'/s*.jpg'))
for k in range(0,len(fs),6):
    ims=[Image.open(f).resize((640,360)) for f in fs[k:k+6]]
    sh=Image.new('RGB',(1280,1080),'black')
    for i,im in enumerate(ims): sh.paste(im,((i%2)*640,(i//2)*360))
    sh.save(f'{d}/sheet{k//6}.jpg')
print(len(fs))
