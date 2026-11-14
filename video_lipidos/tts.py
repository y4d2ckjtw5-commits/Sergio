# Genera la narración: un WAV por línea y un JSON con las duraciones.
import json, sys, wave, os
from piper import PiperVoice, SynthesisConfig
lines = json.load(open(sys.argv[1])); model = sys.argv[2]; out = sys.argv[3]
os.makedirs(out, exist_ok=True)
voice = PiperVoice.load(model)
cfg = SynthesisConfig(length_scale=float(os.environ.get("LSCALE", "1.15")), noise_scale=0.6, noise_w_scale=0.8)
durs = []
for i, sc in enumerate(lines):
    d = []
    for j, text in enumerate(sc):
        fn = f'{out}/s{i:02d}_{j:02d}.wav'
        with wave.open(fn, 'wb') as w:
            voice.synthesize_wav(text, w, syn_config=cfg)
        with wave.open(fn) as w:
            d.append(w.getnframes() / w.getframerate())
    durs.append(d); print(i, round(sum(d), 1), flush=True)
json.dump(durs, open(f'{out}/durs.json', 'w'))
