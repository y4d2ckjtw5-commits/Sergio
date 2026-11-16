// Motor: línea de tiempo, cabecera, subtítulos y render de un fotograma
let TIMELINE = null; // [{start, dur, cues:[t], ends:[t]}] por escena (tiempos locales)
const LEAD = 0.6, GAP = 0.45, TAIL = 0.9;

function lineText(l) { return Array.isArray(l) ? l[0] : l; }
function lineVoice(l) { return Array.isArray(l) ? l[1] : l; }

function buildTimeline(durs) { // durs[scene][line] en segundos
  let t = 0; TIMELINE = SCENES.map((s, i) => {
    const cues = [], ends = []; let lt = LEAD;
    s.lines.forEach((l, j) => { cues.push(lt); lt += durs[i][j]; ends.push(lt); lt += GAP; });
    const dur = lt - GAP + TAIL; const r = { start: t, dur, cues, ends }; t += dur; return r;
  });
  return t;
}
function totalDuration() { const l = TIMELINE[TIMELINE.length - 1]; return l.start + l.dur; }

function makeT(t, tl) {
  return {
    t, dur: tl.dur,
    c(k) { return k < tl.cues.length ? t - tl.cues[k] : -1e9; },
    p(k, d = 0.7, delay = 0) { return k < tl.cues.length ? ease((t - tl.cues[k] - delay) / d) : 0; },
  };
}

function header(title, a) {
  X.save(); X.globalAlpha = a;
  X.fillStyle = C.navy; X.beginPath(); X.roundRect(-20, 14, Math.max(420, tw(title, 28, 'bold') + 90), 52, 26); X.fill();
  txt(title, 30, 41, { size: 28, weight: 'bold', color: '#fff', align: 'left' });
  X.fillStyle = '#fff'; X.beginPath(); X.roundRect(1060, 20, 200, 40, 20); X.fill();
  txt('🏗️ Práctica REVIT', 1160, 41, { size: 20, weight: 'bold', color: C.navy });
  X.restore();
}
function subtitle(s) {
  const lines = wrap(s, 1120, 25, '');
  const lh = 32, h = lines.length * lh + 22, y = 712 - h;
  X.save(); X.fillStyle = 'rgba(20,30,40,0.82)'; X.beginPath(); X.roundRect(60, y, 1160, h, 14); X.fill(); X.restore();
  lines.forEach((l, i) => txt(l, 640, y + 11 + lh / 2 + i * lh, { size: 25, color: '#fff' }));
}

function renderFrame(gt) {
  let si = TIMELINE.findIndex(s => gt >= s.start && gt < s.start + s.dur);
  if (si < 0) si = TIMELINE.length - 1;
  const tl = TIMELINE[si], sc = SCENES[si], t = gt - tl.start;
  X.setTransform(1, 0, 0, 1, 0, 0); X.globalAlpha = 1;
  const g = X.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#F8FAFC'); g.addColorStop(1, '#E8EEF4');
  X.fillStyle = g; X.fillRect(0, 0, W, H);
  const fade = Math.min(clamp(t / 0.4), clamp((tl.dur - t) / 0.4));
  X.save(); X.globalAlpha = fade; sc.draw(makeT(t, tl)); X.restore();
  header(sc.title, 1);
  // subtítulo actual
  let li = -1; tl.cues.forEach((c, j) => { if (t >= c - 0.1) li = j; });
  if (li >= 0 && t < tl.ends[tl.ends.length - 1] + 0.5) subtitle(lineText(sc.lines[li]));
  // barra de progreso
  const tot = totalDuration();
  X.fillStyle = 'rgba(242,158,56,0.95)'; X.fillRect(0, H - 4, W * gt / tot, 4);
}

function applyLang() {
  return;
  SCENES.forEach((s, i) => { if (AR_LINES[i].length !== s.lines.length) throw new Error('líneas AR escena ' + i); s.lines = AR_LINES[i]; });
}
function init() { applyLang(); const cv = document.getElementById('c'); X = cv.getContext('2d'); }
function getLines() { return SCENES.map(s => s.lines.map(lineVoice)); }
