// Uso: node preview.js out_dir escena[,escena...] [segundos por línea]
// Renderiza fotogramas de muestra (al final de cada línea) para revisar el diseño.
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
(async () => {
  const out = process.argv[2]; const which = process.argv[3]; const spl = +(process.argv[4] || 6);
  fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 1280, height: 720 } });
  pg.on('pageerror', e => console.log('ERR', e.message)); pg.on('console', m => console.log('LOG', m.text()));
  await pg.goto('file://' + path.join(__dirname, 'index.html'));
  const n = await pg.evaluate(spl => { const d = SCENES.map(s => s.lines.map(() => spl)); buildTimeline(d); return SCENES.length; }, spl);
  const list = which === 'all' ? [...Array(n).keys()] : which.split(',').map(Number);
  for (const si of list) {
    const times = await pg.evaluate(si => { const tl = TIMELINE[si]; return tl.ends.map(e => tl.start + e - 0.2); }, si);
    for (let j = 0; j < times.length; j++) {
      const d = await pg.evaluate(t => { renderFrame(t); return document.getElementById('c').toDataURL('image/jpeg', 0.85); }, times[j]);
      fs.writeFileSync(`${out}/s${String(si).padStart(2, '0')}_${j}.jpg`, Buffer.from(d.split(',')[1], 'base64'));
    }
  }
  await b.close();
})();
