// node render.js durs.json salida_dir [fps]
// Calcula la línea de tiempo, renderiza el vídeo (4 procesos en paralelo) y guarda los tiempos de la voz.
const { chromium } = require('playwright'); const { spawn } = require('child_process');
const path = require('path'); const fs = require('fs');
const durs = JSON.parse(fs.readFileSync(process.argv[2])); const out = process.argv[3]; const FPS = +(process.argv[4] || 30);
const WORKERS = 4;
(async () => {
  const b = await chromium.launch();
  const pg0 = await b.newPage({ viewport: { width: 1280, height: 720 } });
  await pg0.goto('file://' + path.join(__dirname, 'index.html'));
  const info = await pg0.evaluate(d => { const tot = buildTimeline(d); return { tot, tl: TIMELINE }; }, durs);
  const starts = []; info.tl.forEach((s, i) => s.cues.forEach((c, j) => starts.push({ file: `s${String(i).padStart(2, '0')}_${String(j).padStart(2, '0')}.wav`, t: s.start + c })));
  fs.writeFileSync(path.join(out, 'starts.json'), JSON.stringify({ total: info.tot, starts }));
  const N = Math.ceil(info.tot * FPS); console.log('duración', info.tot.toFixed(1), 's, fotogramas', N);
  const per = Math.ceil(N / WORKERS);
  await Promise.all([...Array(WORKERS).keys()].map(async w => {
    const pg = w === 0 ? pg0 : await b.newPage({ viewport: { width: 1280, height: 720 } });
    if (w) { await pg.goto('file://' + path.join(__dirname, 'index.html')); await pg.evaluate(d => buildTimeline(d), durs); }
    const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
      '-c:v', 'libx264', '-preset', 'medium', '-crf', '22', '-pix_fmt', 'yuv420p', '-threads', '1', path.join(out, `part${w}.mp4`)]);
    const a = w * per, z = Math.min(N, a + per);
    for (let f = a; f < z; f += 10) {
      const ts = []; for (let k = f; k < Math.min(z, f + 10); k++) ts.push(k / FPS);
      const imgs = await pg.evaluate(ts => ts.map(t => { renderFrame(t); return document.getElementById('c').toDataURL('image/jpeg', 0.93); }), ts);
      for (const d of imgs) { const buf = Buffer.from(d.split(',')[1], 'base64'); if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r)); }
      if (w === 0 && (f - a) % 900 === 0) console.log(`progreso ~${Math.round(100 * (f - a) / (z - a))}%`);
    }
    ff.stdin.end(); await new Promise(r => ff.on('close', r));
  }));
  await b.close();
  fs.writeFileSync(path.join(out, 'parts.txt'), [...Array(WORKERS).keys()].map(w => `file 'part${w}.mp4'`).join('\n'));
})();
