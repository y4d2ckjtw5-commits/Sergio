// Escenas 1: introducción, concepto, clasificación y ácidos grasos
// Cada línea: "texto" o ["subtítulo", "texto para la voz"]
const SCENES = [];

// ---------- 0. INTRO ----------
function virusRing(cx, cy, R, scatter, alpha) {
  // capa externa (colas hacia dentro) e interna (colas hacia fuera)
  const n = 46, s = 0.55;
  for (let i = 0; i < n; i++) {
    const a = 2 * PI * i / n; const d = scatter * (80 + 220 * rnd(i)); const sp = scatter * (rnd(i + 3) - .5) * 5;
    lipid(cx + (R + d) * Math.cos(a), cy + (R + d) * Math.sin(a), s, a + PI + sp, { head: C.pink, alpha: alpha * (1 - scatter), ph: i });
    const r2 = R - 47 * s;
    lipid(cx + (r2 + d) * Math.cos(a + 0.07), cy + (r2 + d) * Math.sin(a + 0.07), s, a + 0.07 + sp, { head: C.pink, alpha: alpha * (1 - scatter), ph: i + 5 });
  }
}
function drawVirus(cx, cy, R, scatter, alpha) {
  grp(alpha, () => {
    circ(cx, cy, R - 52, { fill: '#EEE8FB' });
    for (let i = 0; i < 6; i++) {
      const a = i * 1.05, r = 22 + 26 * rnd(i);
      const px = cx + r * Math.cos(a), py = cy + r * Math.sin(a);
      X.save(); X.strokeStyle = C.purple; X.lineWidth = 3; X.lineCap = 'round'; X.beginPath();
      for (let j = 0; j < 16; j++) { const xx = px - 16 + j * 2, yy = py + 5 * Math.sin(j * 0.9 + i); j ? X.lineTo(xx, yy) : X.moveTo(xx, yy); }
      X.stroke(); X.restore();
    }
  });
  for (let i = 0; i < 10; i++) {
    const a = i * 2 * PI / 10 + 0.15, d = scatter * (100 + 200 * rnd(i + 40)), r1 = R + 8 + d, r2 = r1 + 24;
    grp(alpha * (1 - scatter), () => {
      line(cx + r1 * Math.cos(a), cy + r1 * Math.sin(a), cx + r2 * Math.cos(a), cy + r2 * Math.sin(a), { color: C.red, lw: 5 });
      circ(cx + r2 * Math.cos(a), cy + r2 * Math.sin(a), 8, { fill: C.red });
    });
  }
  virusRing(cx, cy, R, scatter, alpha);
}

SCENES.push({
  title: 'Tema 3 · Los lípidos',
  lines: [
    '¡Hola! En este vídeo vamos a aprender todo sobre los lípidos, paso a paso y de forma sencilla.',
    'Seguro que ya conoces algunos: el aceite de oliva, la mantequilla, la cera de una vela o el colesterol son lípidos.',
    'Y son más importantes de lo que parece: el virus de la gripe, por ejemplo, está envuelto en una capa de lípidos que roba de nuestras células.',
    'Por eso el jabón funciona tan bien contra él: disuelve esa envoltura de grasa y el virus queda destruido.',
    'Vamos a ver qué son los lípidos, cómo se clasifican, cómo están hechos y para qué sirven.',
  ],
  draw(T) {
    for (let i = 0; i < 18; i++) { // gotitas de fondo
      const x = (rnd(i) * 1400 + T.t * 12 * (0.5 + rnd(i + 1))) % 1400 - 60, y = 100 + rnd(i + 2) * 480 + 10 * Math.sin(T.t + i);
      circ(x, y, 8 + 22 * rnd(i + 3), { fill: C.yellow, alpha: 0.18 });
    }
    const out1 = 1 - T.p(2), up = T.p(1);
    grp(1 - T.p(4), () => pop(T.p(0, 1), 640, 270, () => {
      const y = lerp(260, 140, up);
      txt('LOS LÍPIDOS', 640, y, { size: lerp(96, 64, up), weight: 'bold', color: C.dgreen, stroke: 8 });
      txt('Biología · explicado paso a paso', 640, y + lerp(70, 50, up), { size: lerp(30, 24, up), color: C.ink, alpha: 1 - up * 0.3 });
    }));
    const items = [['🫒', 'Aceite de oliva'], ['🧈', 'Mantequilla'], ['🕯️', 'Cera'], ['🍳', 'Colesterol']];
    grp(out1, () => items.forEach((it, i) => pop(T.p(1, 0.7, 0.8 + i * 0.5), 250 + i * 260, 380, () => {
      box(160 + i * 260, 290, 180, 190, { fill: '#fff' }); emo(it[0], 250 + i * 260, 365, 80); txt(it[1], 250 + i * 260, 445, { size: 22, weight: 'bold' });
    })));
    // virus
    const vs = T.p(3, 2.2, 1.6);
    grp(1 - T.p(4), () => {
      const va = T.p(2, 1);
      if (va > 0) {
        drawVirus(640, 390, 150, vs, va);
        grp(va * (1 - vs), () => {
          box(880, 250, 300, 80, { fill: C.lpink }); txt('Envoltura de lípidos', 1030, 290, { size: 24, weight: 'bold', color: C.red });
          arrow(880, 300, 790, 360, { color: C.red, p: T.p(2, 0.8, 1) });
          box(80, 430, 260, 70, { fill: C.lpurple }); txt('ARN del virus', 210, 465, { size: 24, weight: 'bold', color: C.purple });
          arrow(340, 460, 600, 400, { color: C.purple, p: T.p(2, 0.8, 1.5) });
        });
      }
      if (T.c(3) > 0) {
        const m = ease(T.c(3) / 1.6);
        emo('🧼', lerp(-80, 420, m), 390, 90, 1);
        for (let i = 0; i < 12; i++) { const b = (T.c(3) * 0.8 + rnd(i)) % 1; circ(lerp(380, 900, rnd(i + 7)), 600 - b * 400, 6 + 14 * rnd(i + 2), { stroke: C.lblue, lw: 3, alpha: m * (1 - b) }); }
        txt('¡El jabón rompe la envoltura!', 640, 585, { size: 38, weight: 'bold', color: C.blue, stroke: 6, alpha: T.p(3, 0.6, 2) });
      }
    });
    // índice
    const idx = ['Concepto y clasificación', 'Los ácidos grasos', 'Lípidos saponificables simples', 'Lípidos saponificables complejos', 'Lípidos insaponificables', 'Funciones de los lípidos'];
    idx.forEach((s, i) => slide(T.p(4, 0.6, 0.6 + i * 0.35), -60, 0, () => {
      const x = i < 3 ? 120 : 660, y = 250 + (i % 3) * 110;
      box(x, y, 500, 86, { fill: '#fff' }); ball(x + 45, y + 43, 28, C.green, String(i + 1), { size: 28 });
      txt(s, x + 90, y + 43, { size: 25, weight: 'bold', align: 'left' });
    }));
  },
});

// ---------- 1. CONCEPTO ----------
function card(x, y, w, h, icon, title, body, col, o = {}) {
  box(x, y, w, h, { fill: '#fff', stroke: col, lw: 3 });
  if (icon) emo(icon, x + 46, y + h / 2, 46);
  const tx = icon ? x + 90 : x + 22;
  txt(title, tx, y + 32, { size: o.ts || 25, weight: 'bold', color: col, align: 'left' });
  if (body) para(body, tx, y + 54, w - (tx - x) - 16, { size: o.bs || 20, color: C.ink });
}
SCENES.push({
  title: '1. Concepto de lípido',
  lines: [
    'Los lípidos son biomoléculas orgánicas formadas, sobre todo, por carbono e hidrógeno.',
    'Además, pueden llevar oxígeno, y a veces fósforo, nitrógeno y azufre.',
    'Son un grupo muy variado, o heterogéneo, tanto por su estructura química como por las funciones que realizan.',
    'Comparten tres propiedades. La primera: son untuosos al tacto, es decir, grasientos.',
    'La segunda: son poco o nada solubles en agua, pero sí se disuelven en disolventes orgánicos apolares, como el éter, el cloroformo, el benceno o la acetona.',
    'Y la tercera: son menos densos que el agua. Por eso el aceite no se mezcla con el agua, y flota sobre ella.',
  ],
  draw(T) {
    const leave = 1 - T.p(3, 0.8);
    grp(leave, () => {
      pop(T.p(0, 0.8), 260, 260, () => { ball(220, 260, 70, '#4A4F57', 'C', { size: 64 }); txt('Carbono', 220, 360, { size: 26, weight: 'bold' }); });
      pop(T.p(0, 0.8, 0.6), 400, 240, () => { ball(400, 240, 48, '#B8C2CC', 'H', { size: 46, tc: C.ink }); txt('Hidrógeno', 400, 320, { size: 26, weight: 'bold' }); });
      const ex = [['O', C.red, 'Oxígeno'], ['P', C.orange, 'Fósforo'], ['N', C.blue, 'Nitrógeno'], ['S', '#D4B12A', 'Azufre']];
      ex.forEach((e, i) => pop(T.p(1, 0.6, i * 0.35), 120 + i * 130, 470, () => { ball(120 + i * 130, 460, 36, e[1], e[0], { size: 34 }); txt(e[2], 120 + i * 130, 520, { size: 19 }); }));
      grp(T.p(1), () => txt('…y a veces:', 120, 400, { size: 22, color: C.grey, align: 'left' }));
      pop(T.p(2), 900, 330, () => {
        box(700, 180, 460, 300, { fill: C.lgreen });
        txt('Grupo HETEROGÉNEO', 930, 225, { size: 32, weight: 'bold', color: C.dgreen });
        ['🫒', '🕯️', '🧬', '💊', '🧈', '🥕'].forEach((e, i) => emo(e, 780 + (i % 3) * 150, 300 + Math.floor(i / 3) * 90 + 6 * Math.sin(T.t * 2 + i), 56));
        txt('estructuras y funciones muy distintas', 930, 455, { size: 22 });
      });
    });
    // propiedades
    const props = [
      ['🖐️', 'Untuosos al tacto', 'Tienen un tacto grasiento.', C.orange],
      ['🧪', 'Insolubles en agua', 'Pero solubles en éter, cloroformo, benceno o acetona (disolventes apolares).', C.blue],
      ['⬆️', 'Menos densos que el agua', 'Por eso flotan: el aceite queda arriba.', C.green],
    ];
    props.forEach((pr, i) => slide(T.p(3 + i, 0.7, 0.2), 80, 0, () => card(600, 100 + i * 165, 640, 145, pr[0], pr[1], pr[2], pr[3])));
    grp(T.p(3, 0.6, 0.6) * (1 - T.p(4, 0.5)), () => { emo('🖐️', 300, 330, 150); for (let i = 0; i < 4; i++) circ(250 + i * 35, 420 + 8 * Math.sin(T.t * 3 + i), 10, { fill: C.yellow, stroke: '#D6A520' }); txt('¡grasiento!', 300, 480, { size: 30, weight: 'bold', color: '#B9860F' }); });
    // vaso de agua y aceite
    const g = T.p(4, 0.8);
    if (g > 0) grp(g, () => {
      const gx = 140, gy = 160, gw = 300, gh = 380;
      const q = T.p(5, 3.5, 0.5);
      box(gx, gy + 40, gw, gh - 40, { fill: C.water, r: 6, shadow: false });
      const layer = 60 * q;
      box(gx, gy + 40, gw, layer + 2, { fill: C.yellow, r: 4, shadow: false, alpha: 0.9 });
      for (let i = 0; i < 16; i++) {
        const y0 = gy + 120 + rnd(i) * (gh - 140); const y = lerp(y0, gy + 50, clamp(q * 1.4 - rnd(i + 5) * 0.4));
        circ(gx + 30 + rnd(i + 2) * (gw - 60), y + 4 * Math.sin(T.t * 3 + i), 8 + 8 * rnd(i + 3), { fill: C.yellow, stroke: '#D6A520', lw: 1.5, alpha: 1 - clamp(q * 1.4 - rnd(i + 5) * 0.4) * 0.9 });
      }
      X.save(); X.strokeStyle = '#7C8A99'; X.lineWidth = 5; X.beginPath(); X.moveTo(gx - 6, gy); X.lineTo(gx - 6, gy + gh + 6); X.lineTo(gx + gw + 6, gy + gh + 6); X.lineTo(gx + gw + 6, gy); X.stroke(); X.restore();
      txt('Agua', gx + gw / 2, gy + gh - 40, { size: 28, weight: 'bold', color: C.blue });
      grp(q, () => { txt('Aceite', gx + gw / 2, gy + 10, { size: 28, weight: 'bold', color: '#B9860F' }); });
    });
  },
});

// ---------- 2. CLASIFICACIÓN ----------
function node(x, y, w, h, label, fill, p, o = {}) {
  label = tr(label);
  pop(p, x, y, () => {
    box(x - w / 2, y - h / 2, w, h, { fill, r: 14, stroke: o.stroke });
    const ls = label.split('\n');
    ls.forEach((l, i) => txt(l, x, y + (i - (ls.length - 1) / 2) * (o.size || 20) * 1.2, { size: o.size || 20, weight: i === 0 ? 'bold' : '', color: o.tc || C.ink }));
  });
}
function conn(x1, y1, x2, y2, p, col = C.grey) {
  if (p <= 0) return; const my = (y1 + y2) / 2; const e = ease(p);
  X.save(); X.strokeStyle = col; X.lineWidth = 3; X.beginPath(); X.moveTo(x1, y1); X.lineTo(x1, lerp(y1, my, clamp(e * 3)));
  if (e > 0.33) X.lineTo(lerp(x1, x2, clamp((e - 0.33) * 3)), my);
  if (e > 0.66) X.lineTo(x2, lerp(my, y2, clamp((e - 0.66) * 3)));
  X.stroke(); X.restore();
}
SCENES.push({
  title: '1.1. Clasificación de los lípidos',
  lines: [
    'Para clasificarlos, nos hacemos una pregunta: ¿tienen ácidos grasos en su estructura, o no?',
    'Los ácidos grasos son largas cadenas de carbono e hidrógeno, que se obtienen al romper los lípidos por hidrólisis.',
    'Los lípidos que sí tienen ácidos grasos se llaman saponificables, porque con ellos se puede fabricar jabón.',
    'Dentro de ellos están los lípidos simples, u hololípidos: los acilglicéridos o grasas, y los céridos o ceras.',
    'Y los lípidos complejos, o heterolípidos: los fosfolípidos y los glucolípidos.',
    'Los lípidos que no tienen ácidos grasos se llaman insaponificables: son los terpenos, los esteroides y los eicosanoides.',
  ],
  draw(T) {
    node(640, 110, 260, 60, 'LÍPIDOS', C.yellow, T.p(0), { size: 30 });
    pop(T.p(0, 0.7, 1), 640, 175, () => txt('¿Tienen ácidos grasos?', 640, 178, { size: 26, weight: 'bold', color: C.red }));
    grp(T.p(1) * (1 - T.p(2)), () => {
      const pts = zigzag(420, 330, 15, 30, 0); drawPts(pts, { p: T.p(1, 2), color: C.tail, lw: 5, dots: 4 });
      txt('ácido graso = cadena larga de C e H', 640, 420, { size: 26, weight: 'bold' });
      txt('(se obtiene por hidrólisis de los lípidos)', 640, 455, { size: 22, color: C.grey });
    });
    conn(600, 196, 330, 222, T.p(2, 0.8)); conn(680, 196, 960, 222, T.p(5, 0.8));
    node(330, 255, 400, 70, 'SAPONIFICABLES\n✓ con ácidos grasos · forman jabón', '#D6E6FA', T.p(2, 0.7, 0.4), { size: 21 });
    conn(250, 290, 180, 345, T.p(3, 0.8)); conn(410, 290, 480, 345, T.p(4, 0.8));
    node(180, 370, 270, 56, 'Simples\n(hololípidos)', '#fff', T.p(3, 0.6, 0.4), { size: 19 });
    node(480, 370, 270, 56, 'Complejos\n(heterolípidos)', '#fff', T.p(4, 0.6, 0.4), { size: 19 });
    conn(130, 398, 110, 450, T.p(3, 0.6, 0.8)); conn(230, 398, 260, 450, T.p(3, 0.6, 0.8));
    conn(430, 398, 405, 450, T.p(4, 0.6, 0.8)); conn(530, 398, 560, 450, T.p(4, 0.6, 0.8));
    const leaf = (x, lab, ic, p, col) => pop(p, x, 520, () => { box(x - 72, 455, 144, 135, { fill: col }); if (typeof ic === 'string') emo(ic, x, 505, 46); else ic(x, 505); txt(lab, x, 565, { size: 17, weight: 'bold' }); });
    leaf(105, 'Acilglicéridos', '🫒', T.p(3, 0.6, 1.2), C.lyellow);
    leaf(260, 'Ceras', '🕯️', T.p(3, 0.6, 1.6), C.lyellow);
    leaf(405, 'Fosfolípidos', (x, y) => { for (let i = 0; i < 4; i++) lipid(x - 27 + i * 18, y - 22, 0.9, PI / 2, { head: C.blue, ph: i }); }, T.p(4, 0.6, 1.2), C.lorange);
    leaf(560, 'Glucolípidos', (x, y) => { for (let i = 0; i < 4; i++) { lipid(x - 27 + i * 18, y - 18, 0.9, PI / 2, { head: C.pink, ph: i }); hexa(x - 27 + i * 18, y - 32, 7, C.red); } }, T.p(4, 0.6, 1.6), C.lorange);
    node(960, 255, 400, 70, 'INSAPONIFICABLES\n✗ sin ácidos grasos', '#E3DBFA', T.p(5, 0.7, 0.4), { size: 21 });
    [[820, 'Terpenos', 'isopreno'], [960, 'Esteroides', 'colesterol'], [1100, 'Eicosanoides', 'prostaglandinas']].forEach((l, i) => {
      conn(960, 290, l[0], 340, T.p(5, 0.6, 0.8));
      pop(T.p(5, 0.6, 1.2 + i * 0.4), l[0], 430, () => {
        box(l[0] - 66, 345, 132, 200, { fill: C.lpurple });
        if (i === 0) { const p = zigzag(l[0] - 40, 420, 4, 22, 0); drawPts(p, { color: C.purple, doubles: [0, 2] }); line(p[1][0], p[1][1], p[1][0], p[1][1] + 26, { color: C.purple }); }
        if (i === 1) steroid(l[0] - 30, 432, 15, { color: C.purple, lw: 2.5 });
        if (i === 2) { const p = zigzag(l[0] - 48, 415, 8, 14, 0, { bends: { 3: 1.3, 5: 1.3 } }); drawPts(p, { color: C.purple, lw: 2.5 }); }
        txt(l[1], l[0], 500, { size: 18, weight: 'bold' }); txt(l[2], l[0], 525, { size: 15, color: C.grey });
      });
    });
  },
});

// ---------- 3. ÁCIDO GRASO: ESTRUCTURA ----------
SCENES.push({
  title: '2. Los ácidos grasos',
  lines: [
    'Empecemos por las piezas básicas de muchos lípidos: los ácidos grasos.',
    'Un ácido graso es una cadena larga y abierta de átomos de carbono, normalmente con un número par de carbonos.',
    ['En un extremo tiene un grupo carboxilo, o grupo ácido: –COOH. Es la cabeza de la molécula.', 'En un extremo tiene un grupo carboxilo, o grupo ácido. Es la cabeza de la molécula.'],
    ['En el otro extremo tiene un grupo metilo, –CH₃. La cadena hidrocarbonada forma la cola.', 'En el otro extremo tiene un grupo metilo. La cadena de carbonos e hidrógenos forma la cola.'],
    ['Por eso se representan de forma abreviada como R–COOH, donde R es la cadena.', 'Por eso se representan de forma abreviada como erre, ce, o, o, hache. Donde erre es la cadena.'],
    ['La cadena no es recta: forma un zigzag, porque cada enlace C–C forma un ángulo de unos 111°.', 'La cadena no es recta: forma un zigzag, porque cada enlace entre carbonos forma un ángulo de unos ciento once grados.'],
  ],
  draw(T) {
    pop(T.p(0), 640, 130, () => txt('ÁCIDO GRASO', 640, 130, { size: 52, weight: 'bold', color: C.dgreen, stroke: 6 }));
    const pts = zigzag(300, 330, 17, 40, 0);
    const pc = T.p(1, 2.5, 0.3);
    drawPts(pts, { p: pc, color: C.ink, lw: 5, dots: 6, dotColor: '#4A4F57' });
    grp(T.p(1, 0.6, 2.8) * (1 - T.p(2)), () => txt('18 carbonos → número par', 640, 430, { size: 28, weight: 'bold', color: C.grey }));
    const end = pts[17];
    // cabeza COOH
    const hp = T.p(2, 0.8);
    if (hp > 0) grp(hp, () => {
      circ(end[0] + 40, end[1] - 10, 62 + 4 * Math.sin(T.t * 4), { fill: 'rgba(224,83,61,0.12)', stroke: C.red, lw: 3, dash: [8, 6] });
      line(end[0], end[1], end[0] + 34, end[1] - 34, { lw: 5 }); line(end[0] + 6, end[1] - 6 - 5, end[0] + 34 - 6, end[1] - 34 - 5, { lw: 0 });
      X.save(); X.strokeStyle = C.red; X.lineWidth = 4; X.beginPath(); X.moveTo(end[0] + 6, end[1] - 14); X.lineTo(end[0] + 30, end[1] - 38); X.stroke(); X.restore();
      txt('O', end[0] + 44, end[1] - 46, { size: 30, weight: 'bold', color: C.red });
      line(end[0], end[1], end[0] + 38, end[1] + 18, { lw: 5 });
      txt('OH', end[0] + 66, end[1] + 22, { size: 30, weight: 'bold', color: C.red });
      box(860, 130, 360, 90, { fill: C.lpink });
      txt('CABEZA', 1040, 158, { size: 26, weight: 'bold', color: C.red });
      txt('grupo carboxilo –COOH', 1040, 194, { size: 22 });
    });
    const tp = T.p(3, 0.8);
    if (tp > 0) grp(tp, () => {
      txt('H₃C', pts[0][0] - 42, pts[0][1] + 2, { size: 30, weight: 'bold', color: C.blue });
      txt('grupo metilo', pts[0][0] - 40, pts[0][1] + 44, { size: 20, color: C.blue });
      X.save(); X.strokeStyle = C.tail; X.lineWidth = 4; X.beginPath(); X.moveTo(300, 400); X.lineTo(300, 412); X.lineTo(pts[16][0], 412); X.lineTo(pts[16][0], 400); X.stroke(); X.restore();
      txt('COLA: cadena hidrocarbonada', (300 + pts[16][0]) / 2, 445, { size: 26, weight: 'bold', color: '#B9860F' });
    });
    const fp = T.p(4, 0.8);
    if (fp > 0) pop(fp, 640, 530, () => {
      box(430, 490, 420, 85, { fill: '#fff', stroke: C.ink });
      txt('R', 520, 533, { size: 48, weight: 'bold', color: '#B9860F' }); txt('–', 560, 533, { size: 48, weight: 'bold' });
      txt('COOH', 660, 533, { size: 48, weight: 'bold', color: C.red });
      txt('cola', 520, 588, { size: 18, color: '#B9860F', alpha: 0.9 }); txt('cabeza', 660, 588, { size: 18, color: C.red });
    });
    const ap = T.p(5, 0.8);
    if (ap > 0) grp(ap, () => {
      const v = pts[8], a = pts[7], b = pts[9];
      const a1 = Math.atan2(a[1] - v[1], a[0] - v[0]), a2 = Math.atan2(b[1] - v[1], b[0] - v[0]);
      X.save(); X.strokeStyle = C.purple; X.lineWidth = 4; X.beginPath(); X.arc(v[0], v[1], 26, Math.min(a1, a2), Math.max(a1, a2)); X.stroke(); X.restore();
      box(v[0] - 70, v[1] - 120, 140, 56, { fill: C.lpurple }); txt('≈ 111°', v[0], v[1] - 92, { size: 30, weight: 'bold', color: C.purple });
      line(v[0], v[1] - 64, v[0], v[1] - 30, { color: C.purple });
    });
  },
});

// ---------- 4. SATURADOS E INSATURADOS ----------
function faChain(x, y, n, seg, o = {}) {
  const pts = zigzag(x, y, n, seg, o.ang || 0, { bends: o.bends });
  drawPts(pts, { p: o.p, color: o.color || C.ink, lw: o.lw || 4, doubles: o.doubles, dcolor: o.dcolor });
  if ((o.p ?? 1) >= 0.99 && !o.nohead) { const e = pts[n]; circ(e[0], e[1], o.hr || 13, { fill: C.red }); }
  return pts;
}
SCENES.push({
  title: '2. Ácidos grasos saturados e insaturados',
  lines: [
    'Los ácidos grasos se diferencian en dos cosas: la longitud de su cadena, y si tienen o no dobles enlaces.',
    'Los saturados no tienen dobles enlaces. Su cadena es recta, son sólidos a temperatura ambiente, y tienen puntos de fusión altos.',
    'Abundan en las grasas animales, como la carne, el tocino o los embutidos, y también en el cacao y en los aceites de coco, palma y cacahuete.',
    'Los insaturados tienen uno o más dobles enlaces, que doblan la cadena. Son líquidos a temperatura ambiente.',
    'Si tienen un solo doble enlace, son monoinsaturados, como el ácido oleico del aceite de oliva. Si tienen varios, son poliinsaturados, como el ácido linoleico.',
    'Ojo: los dobles enlaces reaccionan con el oxígeno del aire y forman aldehídos. Eso es lo que hace que las grasas se pongan rancias.',
  ],
  draw(T) {
    grp(1 - T.p(1), () => {
      pop(T.p(0, 0.7), 400, 320, () => { box(230, 250, 340, 140, { fill: '#fff' }); txt('📏 Longitud', 400, 300, { size: 34, weight: 'bold' }); txt('de la cadena', 400, 345, { size: 26 }); });
      pop(T.p(0, 0.7, 1.2), 880, 320, () => { box(710, 250, 340, 140, { fill: '#fff' }); txt('🔗 ¿Dobles enlaces?', 880, 300, { size: 32, weight: 'bold' }); txt('C = C', 880, 345, { size: 28, color: C.red, weight: 'bold' }); });
    });
    slide(T.p(1), -80, 0, () => {
      box(40, 90, 580, 500, { fill: C.lorange });
      box(40, 90, 580, 56, { fill: C.orange, shadow: false }); txt('SATURADOS', 330, 119, { size: 30, weight: 'bold', color: '#fff' });
      faChain(90, 215, 17, 30, { p: T.p(1, 1.5, 0.3) });
      ['✗ Sin dobles enlaces', '🧊 Sólidos a 25 °C', '🌡️ Punto de fusión alto'].forEach((s, i) => txt(s, 80, 290 + i * 42, { size: 24, align: 'left', alpha: T.p(1, 0.5, 1 + i * 0.6) }));
      grp(T.p(2), () => { ['🥓', '🍖', '🍫', '🥥', '🥜'].forEach((e, i) => emo(e, 110 + i * 100, 475, 52)); txt('grasas animales · cacao · coco · palma', 330, 545, { size: 20, color: C.ink }); });
    });
    slide(T.p(3), 80, 0, () => {
      box(660, 90, 580, 500, { fill: C.lpink });
      box(660, 90, 580, 56, { fill: C.pink, shadow: false }); txt('INSATURADOS', 950, 119, { size: 30, weight: 'bold', color: '#fff' });
      faChain(700, 250, 17, 30, { p: T.p(3, 1.5, 0.3), bends: { 9: -0.5 }, doubles: [8] });
      ['✓ Uno o más dobles enlaces', '💧 Líquidos a 25 °C', '🌡️ Punto de fusión bajo'].forEach((s, i) => txt(s, 700, 290 + i * 42, { size: 24, align: 'left', alpha: T.p(3, 0.5, 1 + i * 0.6) }));
      grp(T.p(4), () => {
        box(690, 425, 255, 150, { fill: '#fff' }); box(960, 425, 255, 150, { fill: '#fff' });
        txt('MONOinsaturado', 817, 450, { size: 19, weight: 'bold', color: C.pink }); txt('1 doble enlace', 817, 475, { size: 17 }); emo('🫒', 780, 530, 44); txt('oleico', 860, 530, { size: 20, weight: 'bold' });
        txt('POLIinsaturado', 1087, 450, { size: 19, weight: 'bold', color: C.pink }); txt('varios dobles enlaces', 1087, 475, { size: 17 }); emo('🌻', 1040, 530, 44); txt('linoleico', 1130, 530, { size: 20, weight: 'bold' });
      });
    });
    const r = T.p(5, 0.7);
    if (r > 0) pop(r, 640, 340, () => {
      box(290, 230, 700, 220, { fill: '#fff', stroke: C.red, lw: 4 });
      txt('¡ENRANCIAMIENTO!', 640, 270, { size: 34, weight: 'bold', color: C.red });
      const m = T.p(5, 2, 0.8);
      [0, 1].forEach(k => { const x = lerp(360 + k * 560, 540 + k * 200, m), y = 340; ball(x - 9, y, 14, C.red, 'O', { size: 13 }); ball(x + 9, y, 14, C.red, 'O', { size: 13 }); });
      txt('C = C', 640, 340, { size: 34, weight: 'bold', color: C.ink });
      txt('O₂ del aire + dobles enlaces → aldehídos → olor y sabor a rancio', 640, 410, { size: 22, alpha: T.p(5, 0.6, 2.5) });
      emo('🤢', 930, 270, 40, T.p(5, 0.6, 3));
    });
  },
});
