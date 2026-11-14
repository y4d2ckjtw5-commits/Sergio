// Utilidades de dibujo para el vídeo de la salida a la obra de RENFE (canvas 1280x720)
const W = 1280, H = 720;
let X; // contexto 2D
const FONT = '"Liberation Sans","Noto Sans Arabic","DejaVu Sans",sans-serif';
const LANG = 'es';
const ARRE = /[\u0600-\u06FF]/;
const MISS = new Set();
function tr(s) {
  if (LANG !== 'ar' || typeof TR === 'undefined') return s;
  if (TR[s] !== undefined) return TR[s];
  if (!ARRE.test(s) && /[a-záéíóúñ]{4,}/i.test(s)) MISS.add(s);
  return s;
}
const EMO = '"Noto Color Emoji"';
const C = {
  bg: '#FBF9F1', green: '#6BA539', dgreen: '#3E7A1E', ink: '#22313F', blue: '#3B7DD8',
  lblue: '#9CC8F2', orange: '#F29E38', red: '#E0533D', pink: '#E56B9A', purple: '#7A5BC7',
  yellow: '#F6C945', teal: '#2AA198', water: '#CBE8F8', grey: '#8A96A3', tail: '#E2B33C', soil: '#C8A47C', dsoil: '#9C7A55', rock: '#B9AE98', conc: '#B8BCC2', dconc: '#8D939B', steel: '#7A3B2E', navy: '#1F4E79', sky: '#E4F0FA', air: '#EEF3F6',
  lgreen: '#E6F2D9', lpink: '#FBE3EC', lorange: '#FDEBD3', lpurple: '#ECE6FA', lyellow: '#FFF5D1',
};
const PI = Math.PI;
function clamp(x, a = 0, b = 1) { return Math.max(a, Math.min(b, x)); }
function ease(x) { x = clamp(x); return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
function eob(x) { x = clamp(x); const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); }
function lerp(a, b, t) { return a + (b - a) * t; }
function rnd(i) { const s = Math.sin(i * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); }

function txt(s, x, y, o = {}) {
  const { size = 24, color = C.ink, weight = '', align = 'center', base = 'middle', alpha = 1, family = FONT } = o;
  if (alpha <= 0) return;
  s = tr(s);
  X.save(); X.globalAlpha *= alpha; X.direction = ARRE.test(s) ? 'rtl' : 'ltr';
  X.font = `${weight} ${size}px ${family}`; X.fillStyle = color; X.textAlign = align; X.textBaseline = base;
  if (o.rot) { X.translate(x, y); X.rotate(o.rot); x = 0; y = 0; }
  if (o.stroke) { X.lineWidth = o.stroke; X.strokeStyle = o.strokeColor || '#fff'; X.lineJoin = 'round'; X.strokeText(s, x, y); }
  X.fillText(s, x, y); X.restore();
}
function tw(s, size = 24, weight = '') { s = tr(s); X.font = `${weight} ${size}px ${FONT}`; return X.measureText(s).width; }
function emo(s, x, y, size = 48, alpha = 1) { txt(s, x, y, { size, family: EMO, alpha }); }
function wrap(s, maxW, size, weight = '') {
  s = tr(s);
  X.font = `${weight} ${size}px ${FONT}`; const words = s.split(' '); const lines = []; let cur = '';
  for (const w of words) { const t = cur ? cur + ' ' + w : w; if (X.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; } else cur = t; }
  if (cur) lines.push(cur); return lines;
}
function para(s, x, y, w, o = {}) {
  const size = o.size || 22, lh = o.lh || size * 1.3; const lines = wrap(s, w, size, o.weight);
  lines.forEach((l, i) => txt(l, x, y + i * lh, { ...o, size, align: o.align || 'left', base: 'top' }));
  return lines.length * lh;
}
function rr(x, y, w, h, r) { X.beginPath(); X.roundRect(x, y, w, h, r); }
function box(x, y, w, h, o = {}) {
  X.save(); X.globalAlpha *= (o.alpha ?? 1);
  if (o.shadow !== false) { X.shadowColor = 'rgba(0,0,0,0.13)'; X.shadowBlur = 14; X.shadowOffsetY = 4; }
  rr(x, y, w, h, o.r ?? 14); X.fillStyle = o.fill || '#fff'; X.fill(); X.shadowColor = 'transparent';
  if (o.stroke) { X.lineWidth = o.lw || 2; X.strokeStyle = o.stroke; if (o.dash) X.setLineDash(o.dash); X.stroke(); }
  X.restore();
}
function grp(a, fn) { if (a <= 0) return; X.save(); X.globalAlpha *= clamp(a); fn(); X.restore(); }
function pop(p, cx, cy, fn) {
  if (p <= 0) return; X.save(); X.globalAlpha *= clamp(p * 2); const s = 0.4 + 0.6 * eob(p);
  X.translate(cx, cy); X.scale(s, s); X.translate(-cx, -cy); fn(); X.restore();
}
function slide(p, dx, dy, fn) {
  if (p <= 0) return; X.save(); X.globalAlpha *= clamp(p * 1.5); const e = 1 - ease(p);
  X.translate(dx * e, dy * e); fn(); X.restore();
}
function line(x1, y1, x2, y2, o = {}) {
  X.save(); X.globalAlpha *= (o.alpha ?? 1); X.strokeStyle = o.color || C.ink; X.lineWidth = o.lw || 3; X.lineCap = 'round';
  if (o.dash) X.setLineDash(o.dash); X.beginPath(); X.moveTo(x1, y1); X.lineTo(x2, y2); X.stroke(); X.restore();
}
function arrow(x1, y1, x2, y2, o = {}) {
  const p = o.p ?? 1; if (p <= 0) return; const e = ease(p);
  const ex = lerp(x1, x2, e), ey = lerp(y1, y2, e); line(x1, y1, ex, ey, o);
  const a = Math.atan2(y2 - y1, x2 - x1), hs = o.hs || 13;
  X.save(); X.globalAlpha *= (o.alpha ?? 1); X.fillStyle = o.color || C.ink; X.beginPath(); X.moveTo(ex + 2 * Math.cos(a), ey + 2 * Math.sin(a));
  X.lineTo(ex - hs * Math.cos(a - 0.45), ey - hs * Math.sin(a - 0.45)); X.lineTo(ex - hs * Math.cos(a + 0.45), ey - hs * Math.sin(a + 0.45));
  X.closePath(); X.fill(); X.restore();
}
function circ(x, y, r, o = {}) {
  X.save(); X.globalAlpha *= (o.alpha ?? 1); X.beginPath(); X.arc(x, y, Math.max(0.1, r), 0, PI * 2);
  if (o.fill) { X.fillStyle = o.fill; X.fill(); }
  if (o.stroke) { X.strokeStyle = o.stroke; X.lineWidth = o.lw || 2; if (o.dash) X.setLineDash(o.dash); X.stroke(); }
  X.restore();
}
function ball(x, y, r, color, label, o = {}) { // esfera con brillo
  X.save(); X.globalAlpha *= (o.alpha ?? 1);
  const g = X.createRadialGradient(x - r * 0.35, y - r * 0.35, r * 0.1, x, y, r);
  g.addColorStop(0, 'rgba(255,255,255,0.85)'); g.addColorStop(0.3, color); g.addColorStop(1, shade(color, -0.35));
  X.beginPath(); X.arc(x, y, r, 0, PI * 2); X.fillStyle = g; X.fill(); X.restore();
  if (label) txt(label, x, y + 1, { size: o.size || r * 0.9, weight: 'bold', color: o.tc || '#fff', alpha: o.alpha ?? 1, stroke: o.tc ? 0 : 3, strokeColor: shade(color, -0.45) });
}
function shade(hex, f) {
  const n = parseInt(hex.slice(1), 16); let r = n >> 16, g = (n >> 8) & 255, b = n & 255;
  const t = f < 0 ? 0 : 255, p = Math.abs(f);
  r = Math.round((t - r) * p + r); g = Math.round((t - g) * p + g); b = Math.round((t - b) * p + b);
  return `rgb(${r},${g},${b})`;
}
function pill(x, y, w, h, label, fill, o = {}) { // caja centrada
  box(x - w / 2, y - h / 2, w, h, { fill, r: o.r ?? h / 2, stroke: o.stroke, alpha: o.alpha, shadow: o.shadow });
  if (label) txt(label, x, y + 1, { size: o.size || 20, weight: o.weight ?? 'bold', color: o.tc || C.ink, alpha: o.alpha ?? 1 });
}

// Cadena en zigzag (ácido graso)
function zigzag(x, y, n, seg = 24, ang = 0, o = {}) {
  const pts = [[x, y]]; let base = ang; const dev = 0.6;
  for (let i = 0; i < n; i++) {
    if (o.bends && o.bends[i] !== undefined) base += o.bends[i];
    const s = (i % 2 ? 1 : -1) * (o.flip ? -1 : 1); const a = base + s * dev;
    const [px, py] = pts[pts.length - 1]; pts.push([px + seg * Math.cos(a), py + seg * Math.sin(a)]);
  }
  return pts;
}
function drawPts(pts, o = {}) {
  const p = o.p ?? 1; if (p <= 0) return; const n = pts.length - 1; const lim = p * n;
  X.save(); X.globalAlpha *= (o.alpha ?? 1); X.strokeStyle = o.color || C.ink; X.lineWidth = o.lw || 3; X.lineCap = 'round'; X.lineJoin = 'round';
  X.beginPath(); X.moveTo(...pts[0]);
  for (let i = 1; i <= n; i++) {
    if (i <= lim) X.lineTo(...pts[i]);
    else { const f = lim - (i - 1); if (f > 0) X.lineTo(lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)); break; }
  }
  X.stroke();
  (o.doubles || []).forEach(i => {
    if (i + 1 > lim + 0.01) return; const [ax, ay] = pts[i], [bx, by] = pts[i + 1];
    const dx = bx - ax, dy = by - ay, L = Math.hypot(dx, dy); let nx = -dy / L * 7, ny = dx / L * 7;
    // desplaza la segunda línea hacia el interior del zigzag
    const nxt = pts[i + 2] || pts[i - 1]; const mx = (ax + bx) / 2, my = (ay + by) / 2;
    if (nxt && ((nxt[0] - mx) * nx + (nxt[1] - my) * ny) < 0) { nx = -nx; ny = -ny; }
    X.strokeStyle = o.dcolor || C.red; X.lineWidth = (o.lw || 3);
    X.beginPath(); X.moveTo(ax, ay); X.lineTo(bx, by); X.stroke();
    X.beginPath(); X.moveTo(ax + nx + dx * 0.15, ay + ny + dy * 0.15); X.lineTo(bx + nx - dx * 0.15, by + ny - dy * 0.15); X.stroke();
  });
  X.restore();
  if (o.dots) pts.forEach((q, i) => { if (i <= lim) circ(q[0], q[1], o.dots, { fill: o.dotColor || C.ink, alpha: o.alpha ?? 1 }); });
}

// Molécula anfipática simplificada: cabeza + colas
function lipid(x, y, s = 1, ang = PI / 2, o = {}) {
  const head = o.head || C.blue, tail = o.tail || C.tail, len = (o.len || 36) * s, hr = (o.hr || 8) * s;
  X.save(); X.globalAlpha *= (o.alpha ?? 1); X.translate(x, y); X.rotate(ang - PI / 2);
  X.strokeStyle = tail; X.lineWidth = 2.6 * s; X.lineCap = 'round';
  const nt = o.tails ?? 2;
  for (let k = 0; k < nt; k++) {
    const ox = nt === 1 ? 0 : (k ? 3.5 : -3.5) * s; X.beginPath();
    for (let j = 0; j <= 12; j++) {
      const yy = hr * 0.6 + j / 12 * len; let xx = ox + Math.sin(j * 1.4 + (o.ph || 0)) * 1.6 * s;
      if (o.kink && k === 1 && j > 5) xx += (j - 5) * 1.8 * s;
      j ? X.lineTo(xx, yy) : X.moveTo(xx, yy);
    }
    X.stroke();
  }
  X.restore();
  ball(x, y, hr, head, null, { alpha: o.alpha ?? 1 });
}
function bilayer(x0, y0, w, s = 1, o = {}) {
  const sp = (o.sp || 17) * s, n = Math.floor(w / sp), len = (o.len || 36) * s, hr = 8 * s;
  const gap = 2 * (len + hr * 0.6) + 2 * s;
  for (let i = 0; i < n; i++) {
    const x = x0 + i * sp + sp / 2; const a = o.alpha ?? 1; if (o.p !== undefined && i / n > o.p) continue;
    lipid(x, y0, s, PI / 2, { ...o, alpha: a, ph: i });
    lipid(x, y0 + gap, s, -PI / 2, { ...o, alpha: a, ph: i + 2 });
  }
  return gap;
}
function micelle(cx, cy, R, n, s = 1, o = {}) {
  for (let i = 0; i < n; i++) {
    const a = 2 * PI * i / n + (o.rot || 0); if (o.p !== undefined && i / n > o.p) continue;
    const r = R + (o.scatter ? o.scatter * (60 + 200 * rnd(i)) : 0);
    lipid(cx + r * Math.cos(a), cy + r * Math.sin(a), s, a + PI + (o.scatter ? o.scatter * (rnd(i + 9) - .5) * 6 : 0), { ...o, ph: i });
  }
}
function poly(pts, o = {}) {
  X.save(); X.globalAlpha *= (o.alpha ?? 1); X.beginPath(); X.moveTo(...pts[0]); pts.slice(1).forEach(p => X.lineTo(...p)); X.closePath();
  if (o.fill) { X.fillStyle = o.fill; X.fill(); } if (o.stroke) { X.strokeStyle = o.stroke; X.lineWidth = o.lw || 3; X.lineJoin = 'round'; X.stroke(); } X.restore();
}
function hexPts(x, y, r, rot = -PI / 2) { const p = []; for (let i = 0; i < 6; i++) { const a = rot + i * PI / 3; p.push([x + r * Math.cos(a), y + r * Math.sin(a)]); } return p; }
function hexa(x, y, r, fill, o = {}) { poly(hexPts(x, y, r, o.rot ?? 0), { fill, stroke: o.stroke || shade(fill, -0.3), lw: o.lw || 2, alpha: o.alpha }); }

// Núcleo de esterano: anillos A, B, C (hexágonos) y D (pentágono)
function steroid(x, y, r, o = {}) {
  const p = o.p ?? 1, s3 = Math.sqrt(3);
  const cs = [[x, y], [x + s3 * r, y], [x + 1.5 * s3 * r, y - 1.5 * r]];
  const col = o.color || C.ink, a = o.alpha ?? 1;
  cs.forEach((c, i) => { if (p * 4 > i) poly(hexPts(c[0], c[1], r), { stroke: col, lw: o.lw || 3.5, fill: o.fill, alpha: a * clamp(p * 4 - i) }); });
  // pentágono a la derecha del anillo C
  const c = cs[2]; const A = [c[0] + s3 / 2 * r, c[1] - r / 2], B = [c[0] + s3 / 2 * r, c[1] + r / 2];
  const pts = [A]; let dir = -PI / 2; let cur = A;
  for (let i = 0; i < 4; i++) { dir += 2 * PI / 5; cur = [cur[0] + r * Math.cos(dir), cur[1] + r * Math.sin(dir)]; pts.push(cur); }
  if (p * 4 > 3) poly(pts, { stroke: col, lw: o.lw || 3.5, fill: o.fill, alpha: a * clamp(p * 4 - 3) });
  const dc = pts.reduce((s, q) => [s[0] + q[0] / 5, s[1] + q[1] / 5], [0, 0]);
  if (o.labels) {
    ['A', 'B', 'C'].forEach((L, i) => txt(L, cs[i][0], cs[i][1], { size: r * 0.55, weight: 'bold', color: C.grey, alpha: a * clamp(p * 4 - i) }));
    txt('D', dc[0], dc[1], { size: r * 0.55, weight: 'bold', color: C.grey, alpha: a * clamp(p * 4 - 3) });
  }
  // devuelve puntos útiles: C3 (vértice inferior-izquierdo del anillo A), C17 (vértice superior del D)
  return { c3: [x - s3 / 2 * r, y + r / 2], c17: pts[2], centers: cs, dc };
}

// Gota de sangre
function drop(x, y, s, color) {
  X.save(); X.translate(x, y); X.scale(s, s); X.beginPath(); X.moveTo(0, -60);
  X.bezierCurveTo(25, -25, 45, 0, 45, 25); X.arc(0, 25, 45, 0, PI); X.bezierCurveTo(-45, 0, -25, -25, 0, -60);
  X.fillStyle = color; X.fill(); X.restore();
}
// Bloque de "glicerina"/"esfingosina" para esquemas
function vbar(x, y, w, h, label, fill) { box(x, y, w, h, { fill, r: 10, shadow: false }); txt(label, x + w / 2, y + h / 2, { size: 17, rot: -PI / 2, color: C.ink, weight: 'bold' }); }

// ---- Fotos del informe (data URL para no "ensuciar" el canvas) ----
const IMG = {};
const READY = Promise.all(Object.entries(PHOTOS).map(([k, src]) => new Promise(r => { const im = new Image(); im.onload = () => { IMG[k] = im; r(); }; im.src = src; })));
// foto con recorte tipo "cover", zoom lento (Ken Burns), marco blanco y pie
function photo(k, x, y, w, h, o = {}) {
  const im = IMG[k]; if (!im) return; const a = o.alpha ?? 1; if (a <= 0) return;
  X.save(); X.globalAlpha *= a;
  X.shadowColor = 'rgba(0,0,0,0.25)'; X.shadowBlur = 18; X.shadowOffsetY = 6;
  rr(x - 6, y - 6, w + 12, h + 12, 14); X.fillStyle = '#fff'; X.fill(); X.shadowColor = 'transparent';
  rr(x, y, w, h, 9); X.clip();
  const z = o.zoom ?? 1, s = Math.max(w / im.width, h / im.height) * z;
  const iw = im.width * s, ih = im.height * s, fx = o.fx ?? 0.5, fy = o.fy ?? 0.5;
  X.drawImage(im, x + (w - iw) * fx, y + (h - ih) * fy, iw, ih);
  X.restore();
  if (o.cap) {
    const cw = tw(o.cap, 18, 'bold') + 28;
    grp(a, () => { pill(x + w / 2, y + h + 4, cw, 34, o.cap, C.navy, { size: 18, tc: '#fff' }); });
  }
}
// suelo con motas
function soil(x, y, w, h, o = {}) {
  X.save(); X.globalAlpha *= (o.alpha ?? 1);
  const g = X.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, o.top || '#D2B08A'); g.addColorStop(1, o.bot || '#B08C64');
  X.fillStyle = g; X.fillRect(x, y, w, h);
  X.beginPath(); X.rect(x, y, w, h); X.clip();
  const n = Math.floor(w * h / 2600);
  for (let i = 0; i < n; i++) { X.fillStyle = i % 3 ? 'rgba(110,80,50,0.25)' : 'rgba(255,255,255,0.18)'; X.beginPath(); X.arc(x + rnd(i * 3.1) * w, y + rnd(i * 7.7 + 1) * h, 1.5 + 2.5 * rnd(i + 5), 0, PI * 2); X.fill(); }
  X.restore();
}
function concrete(x, y, w, h, o = {}) {
  X.save(); X.globalAlpha *= (o.alpha ?? 1); X.fillStyle = o.fill || C.conc; X.fillRect(x, y, w, h);
  X.strokeStyle = o.stroke || C.dconc; X.lineWidth = 1.5; X.strokeRect(x, y, w, h); X.restore();
}
function building(x, y, w, h, color, o = {}) { // y = base
  X.save(); X.globalAlpha *= (o.alpha ?? 1); X.fillStyle = color; X.fillRect(x, y - h, w, h);
  X.fillStyle = 'rgba(255,255,255,0.75)';
  for (let r = y - h + 12; r < y - 18; r += 22) for (let c = x + 8; c < x + w - 12; c += 18) X.fillRect(c, r, 9, 12);
  X.restore();
}
function brace(x1, x2, y, label, o = {}) { // cota horizontal
  const col = o.color || C.ink, a = o.alpha ?? 1;
  line(x1, y, x2, y, { color: col, lw: 2, alpha: a }); line(x1, y - 8, x1, y + 8, { color: col, lw: 2, alpha: a }); line(x2, y - 8, x2, y + 8, { color: col, lw: 2, alpha: a });
  if (label) txt(label, (x1 + x2) / 2, y + (o.below ? 18 : -16), { size: o.size || 20, weight: 'bold', color: col, alpha: a, stroke: 5 });
}
function vbrace(x, y1, y2, label, o = {}) {
  const col = o.color || C.ink, a = o.alpha ?? 1;
  line(x, y1, x, y2, { color: col, lw: 2, alpha: a }); line(x - 8, y1, x + 8, y1, { color: col, lw: 2, alpha: a }); line(x - 8, y2, x + 8, y2, { color: col, lw: 2, alpha: a });
  if (label) txt(label, x + (o.left ? -14 : 14), (y1 + y2) / 2, { size: o.size || 22, weight: 'bold', color: col, alpha: a, align: o.left ? 'right' : 'left', stroke: 5 });
}
function check(x, y, s = 1, color = C.green, a = 1) { X.save(); X.globalAlpha *= a; X.strokeStyle = color; X.lineWidth = 6 * s; X.lineCap = 'round'; X.lineJoin = 'round'; X.beginPath(); X.moveTo(x - 14 * s, y); X.lineTo(x - 4 * s, y + 10 * s); X.lineTo(x + 16 * s, y - 12 * s); X.stroke(); X.restore(); }
function cross(x, y, s = 1, color = C.red, a = 1) { line(x - 14 * s, y - 14 * s, x + 14 * s, y + 14 * s, { color, lw: 6 * s, alpha: a }); line(x + 14 * s, y - 14 * s, x - 14 * s, y + 14 * s, { color, lw: 6 * s, alpha: a }); }
