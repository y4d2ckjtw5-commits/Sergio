# Coloca cada línea de voz en su instante y crea la pista de narración completa.
import json, sys, wave, numpy as np
d = json.load(open(sys.argv[1])); adir = sys.argv[2]; out = sys.argv[3]
sr = 22050
with wave.open(f"{adir}/{d['starts'][0]['file']}") as w: sr = w.getframerate()
track = np.zeros(int((d['total'] + 1) * sr), dtype=np.float32)
for s in d['starts']:
    with wave.open(f"{adir}/{s['file']}") as w:
        a = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768
    i = int(s['t'] * sr); track[i:i + len(a)] += a[:len(track) - i]
track = np.clip(track * 0.95, -1, 1)
with wave.open(out, 'wb') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr); w.writeframes((track * 32767).astype(np.int16).tobytes())
print('sr', sr, 'dur', len(track) / sr)
