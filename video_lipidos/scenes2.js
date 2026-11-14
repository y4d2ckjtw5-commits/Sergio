// Escenas 2: nomenclatura, omega, propiedades físicas y químicas, lípidos simples

// ---------- 5. NOMENCLATURA ----------
function numberedChain(x, y, n, seg, o = {}) {
  // cadena dibujada desde el C1 (COOH, a la derecha) hacia la izquierda
  const pts = zigzag(x, y, n, seg, PI, { bends: o.bends, flip: true });
  drawPts(pts, { p: o.p, lw: 4, doubles: o.doubles, color: o.color || C.ink, alpha: o.alpha });
  grp(o.alpha ?? 1, () => {
    circ(x + 22, y, 22, { fill: C.red }); txt('COOH', x + 22, y, { size: 13, weight: 'bold', color: '#fff' });
    if (o.nums) pts.forEach((q, i) => { if ((o.nums === 'all') || o.nums.includes(i + 1)) txt(String(i + 1), q[0], q[1] + (i % 2 ? -20 : 20), { size: 16, weight: 'bold', color: (o.hl || []).includes(i + 1) ? C.red : C.grey }); });
  });
  return pts;
}
SCENES.push({
  title: '2. Cómo se nombran los ácidos grasos',
  lines: [
    ['Para nombrarlos se usan tres números: A : B (Δᶜ).', 'Para nombrarlos se usan tres números: a, dos puntos, be, y delta ce.'],
    ['A es el número de carbonos; B, el número de dobles enlaces; y C, el carbono donde empieza cada doble enlace, contando desde el carbono del grupo carboxilo, que es el número 1.', 'A es el número de carbonos. Be, el número de dobles enlaces. Y ce, el carbono donde empieza cada doble enlace, contando desde el carbono del grupo carboxilo, que es el número uno.'],
    ['Por ejemplo, el ácido esteárico es 18:0: dieciocho carbonos y ningún doble enlace.', 'Por ejemplo, el ácido esteárico es dieciocho, dos puntos, cero: dieciocho carbonos y ningún doble enlace.'],
    ['El ácido oleico es 18:1 (Δ⁹): un doble enlace que empieza en el carbono 9.', 'El ácido oleico es dieciocho, dos puntos, uno, delta nueve: un doble enlace que empieza en el carbono nueve.'],
    ['Y el linoleico es 18:2 (Δ⁹·¹²): dos dobles enlaces, en los carbonos 9 y 12.', 'Y el linoleico es dieciocho, dos puntos, dos, delta nueve, doce: dos dobles enlaces, en los carbonos nueve y doce.'],
  ],
  draw(T) {
    pop(T.p(0), 640, 140, () => {
      box(390, 95, 500, 95, { fill: '#fff' });
      txt('A', 470, 145, { size: 60, weight: 'bold', color: C.blue }); txt(':', 525, 145, { size: 60, weight: 'bold' });
      txt('B', 580, 145, { size: 60, weight: 'bold', color: C.pink }); txt('( Δ', 680, 145, { size: 60, weight: 'bold' });
      txt('C', 755, 125, { size: 40, weight: 'bold', color: C.orange }); txt(')', 800, 145, { size: 60, weight: 'bold' });
    });
    const ex = [['A', 'nº de carbonos', C.blue], ['B', 'nº de dobles enlaces', C.pink], ['C', 'carbono donde empieza el doble enlace (C1 = el del COOH)', C.orange]];
    ex.forEach((e, i) => slide(T.p(1, 0.6, i * 1.6), 0, 30, () => {
      box(90 + i * 380, 215, 340, 100, { fill: '#fff', stroke: e[2], lw: 3 });
      txt(e[0], 130 + i * 380, 265, { size: 48, weight: 'bold', color: e[2] });
      para(e[1], 170 + i * 380, 240, 250, { size: 20 });
    }));
    const exs = [
      { k: 2, name: 'Ácido esteárico  18:0', o: {} },
      { k: 3, name: 'Ácido oleico  18:1 (Δ⁹)', o: { doubles: [8], bends: { 9: -0.35, 11: 0.35 }, hl: [9] } },
      { k: 4, name: 'Ácido linoleico  18:2 (Δ⁹·¹²)', o: { doubles: [8, 11], bends: { 9: -0.3, 11: 0.3, 12: -0.3, 14: 0.3 }, hl: [9, 12] } },
    ];
    exs.forEach((e, i) => {
      const a = T.p(e.k, 0.6) * (1 - (i < 2 ? T.p(e.k + 1, 0.5) : 0));
      if (a <= 0) return;
      grp(a, () => {
        txt(e.name, 640, 360, { size: 32, weight: 'bold', color: C.dgreen });
        numberedChain(980, 470, 17, 40, { ...e.o, nums: 'all', p: T.p(e.k, 1.5, 0.2) });
        txt('C1', 1002, 510, { size: 18, weight: 'bold', color: C.red });
      });
    });
  },
});

// ---------- 6. OMEGA ----------
function omegaChain(x, y, dbl, col, label, p) {
  // CH3 (omega) a la izquierda, COOH a la derecha
  const b = {}; dbl.forEach(d => { b[d + 1] = 0.35; b[d + 3] = -0.35; });
  const pts = zigzag(x, y, 17, 32, 0, { bends: b });
  drawPts(pts, { p, lw: 4, doubles: dbl, dcolor: col });
  if (p > 0.95) {
    const e = pts[17]; circ(e[0] + 18, e[1], 20, { fill: C.red }); txt('COOH', e[0] + 18, e[1], { size: 11, weight: 'bold', color: '#fff' });
    ball(pts[0][0] - 16, pts[0][1], 20, C.blue, 'ω', { size: 22 });
  }
  return pts;
}
SCENES.push({
  title: '2. Omega 3 y omega 6',
  lines: [
    'Seguro que has oído hablar de los omega tres y los omega seis.',
    'El último carbono de la cadena, el del grupo metilo, se llama carbono omega.',
    'Si contamos desde ese extremo, un omega tres tiene su primer doble enlace en el carbono tres, y un omega seis, en el carbono seis.',
    ['Los principales omega 3 son el ácido alfa-linolénico (ALA), el EPA y el DHA. Están en pescados, mariscos, nueces, almendras y aceites vegetales.', 'Los principales omega tres son el ácido alfa linolénico, el e pe a, y el de hache a. Están en pescados, mariscos, nueces, almendras y aceites vegetales.'],
    'Regulan la presión arterial, aumentan la elasticidad de las arterias y bajan los triglicéridos. Por eso es aconsejable incluirlos en la dieta.',
    'Además, algunos ácidos grasos insaturados, como el linoleico o el linolénico, son esenciales: no podemos fabricarlos, y tenemos que tomarlos con los alimentos.',
  ],
  draw(T) {
    pop(T.p(0), 640, 120, () => { txt('ω', 420, 125, { size: 70, weight: 'bold', color: C.blue }); txt('omega 3 · omega 6', 720, 125, { size: 46, weight: 'bold', color: C.dgreen }); });
    const p1 = T.p(1, 1.5, 0.2);
    if (p1 > 0) {
      const a = omegaChain(250, 230, [2], C.green, '', p1);
      grp(T.p(1, 0.6, 1.6), () => { txt('carbono omega (ω)', 175, 285, { size: 20, weight: 'bold', color: C.blue }); });
      const b = T.p(2, 1) > 0 ? omegaChain(250, 360, [5], C.purple, '', T.p(2, 1.5, 2.5)) : null;
      grp(T.p(2, 0.6), () => {
        [1, 2, 3].forEach(i => txt(String(i), a[i - 1][0], a[i - 1][1] + (i % 2 ? 24 : -22), { size: 18, weight: 'bold', color: C.green }));
        box(860, 200, 190, 56, { fill: C.lgreen }); txt('omega 3', 955, 228, { size: 28, weight: 'bold', color: C.dgreen });
      });
      if (b) grp(T.p(2, 0.6, 3.5), () => {
        [1, 2, 3, 4, 5, 6].forEach(i => txt(String(i), b[i - 1][0], b[i - 1][1] + (i % 2 ? 24 : -22), { size: 18, weight: 'bold', color: C.purple }));
        box(860, 330, 190, 56, { fill: C.lpurple }); txt('omega 6', 955, 358, { size: 28, weight: 'bold', color: C.purple });
      });
    }
    slide(T.p(3), 0, 40, () => {
      box(60, 420, 560, 165, { fill: '#fff', stroke: C.blue, lw: 3 });
      txt('Omega 3: ALA · EPA · DHA', 340, 450, { size: 26, weight: 'bold', color: C.blue });
      ['🐟', '🦐', '🌰', '🥜', '🫒'].forEach((e, i) => emo(e, 130 + i * 105, 520 + 4 * Math.sin(T.t * 2 + i), 52));
    });
    slide(T.p(4), 0, 40, () => {
      box(660, 420, 560, 165, { fill: '#fff', stroke: C.red, lw: 3 });
      txt('❤️ Beneficios', 940, 450, { size: 26, weight: 'bold', color: C.red });
      ['↓ presión arterial', '↑ elasticidad de las arterias', '↓ triglicéridos'].forEach((s, i) => txt(s, 700, 492 + i * 33, { size: 22, align: 'left', alpha: T.p(4, 0.4, 0.8 + i * 0.8) }));
    });
    pop(T.p(5), 640, 330, () => {
      box(240, 270, 800, 130, { fill: C.lyellow, stroke: C.orange, lw: 4 });
      txt('⭐ ÁCIDOS GRASOS ESENCIALES', 640, 310, { size: 32, weight: 'bold', color: '#B5651D' });
      txt('No los fabricamos → hay que comerlos 🍽️', 640, 360, { size: 26 });
    });
  },
});

// ---------- 7. PUNTO DE FUSIÓN ----------
SCENES.push({
  title: '2.1. Propiedades físicas: punto de fusión',
  lines: [
    'Veamos sus propiedades físicas. La primera es el punto de fusión: la temperatura a la que pasan de sólido a líquido.',
    ['Las cadenas de los ácidos grasos se atraen entre sí mediante unas fuerzas débiles, llamadas fuerzas de Van der Waals.', 'Las cadenas de los ácidos grasos se atraen entre sí mediante unas fuerzas débiles, llamadas fuerzas de van der vals.'],
    'Cuanto más larga y saturada es la cadena, más se pueden juntar, más fuerzas se forman, y más calor hace falta para separarlas. Su punto de fusión es alto.',
    'En cambio, los dobles enlaces doblan las cadenas, y estas no pueden empaquetarse bien. Hay menos fuerzas, y el punto de fusión baja.',
    'Por eso, con el mismo número de carbonos, un insaturado funde a menor temperatura que un saturado: el ácido oleico es líquido, y el esteárico es sólido.',
  ],
  draw(T) {
    pop(T.p(0), 640, 320, () => {
      // termómetro
      box(615, 110, 50, 280, { fill: '#fff', stroke: C.grey, r: 25 }); circ(640, 400, 40, { fill: C.red });
      const lv = 0.3 + 0.5 * (0.5 + 0.5 * Math.sin(T.t * 0.8));
      box(627, 380 - 250 * lv, 26, 250 * lv + 10, { fill: C.red, r: 13, shadow: false });
      txt('Punto de', 640, 460, { size: 22, weight: 'bold' }); txt('fusión', 640, 485, { size: 22, weight: 'bold' });
    });
    // saturados: empaquetados
    const L = T.p(1, 0.8);
    if (L > 0) grp(L, () => {
      box(40, 95, 540, 380, { fill: C.lorange, shadow: false });
      txt('SATURADOS', 310, 125, { size: 28, weight: 'bold', color: '#B5651D' });
      const chs = [];
      for (let k = 0; k < 6; k++) { const j = Math.sin(T.t * 6 + k) * 1.2; chs.push(zigzag(85, 175 + k * 40 + j, 15, 30, 0)); }
      const dp = T.p(1, 1, 1);
      for (let k = 0; k < 5; k++) for (let i = 0; i <= 15; i += 1) {
        const a = chs[k][i], b = chs[k + 1][i]; if (i / 15 <= dp) line(a[0], a[1] + 6, b[0], b[1] - 6, { color: C.purple, lw: 2, dash: [3, 4], alpha: 0.8 });
      }
      chs.forEach(c => { drawPts(c, { lw: 4 }); circ(c[15][0] + 10, c[15][1], 10, { fill: C.red }); });
      grp(T.p(1, 0.6, 1.5) * (1 - T.p(2)), () => { box(170, 420, 280, 44, { fill: C.purple, r: 22 }); txt('fuerzas de Van der Waals', 310, 442, { size: 19, weight: 'bold', color: '#fff' }); });
      grp(T.p(2, 0.6, 1), () => { box(80, 410, 460, 58, { fill: '#fff', stroke: C.red }); txt('Muchas fuerzas → P.F. ALTO 🔥 → SÓLIDO 🧈', 310, 439, { size: 21, weight: 'bold', color: C.red }); });
    });
    const R = T.p(3, 0.8);
    if (R > 0) grp(R, () => {
      box(700, 95, 540, 380, { fill: C.lpink, shadow: false });
      txt('INSATURADOS', 970, 125, { size: 28, weight: 'bold', color: C.pink });
      for (let k = 0; k < 5; k++) {
        const j = Math.sin(T.t * 4 + k * 2) * 6, ang = (rnd(k) - 0.5) * 0.5 + Math.sin(T.t * 1.5 + k) * 0.08;
        const c = zigzag(735 + rnd(k + 3) * 50, 185 + k * 48 + j, 14, 28, ang, { bends: { 7: (k % 2 ? 0.45 : -0.45) } });
        X.save(); rr(700, 95, 540, 380, 14); X.clip(); drawPts(c, { lw: 4, doubles: [6] }); circ(c[14][0], c[14][1], 10, { fill: C.red }); X.restore();
      }
      grp(T.p(3, 0.6, 1.5), () => { box(740, 410, 460, 58, { fill: '#fff', stroke: C.blue }); txt('Pocas fuerzas → P.F. BAJO → LÍQUIDO 🫒', 970, 439, { size: 21, weight: 'bold', color: C.blue }); });
    });
    slide(T.p(4), 0, 40, () => {
      box(140, 495, 1000, 95, { fill: '#fff' });
      txt('Esteárico 18:0 → funde a ~70 °C → sólido 🧈', 640, 525, { size: 24, weight: 'bold', color: '#B5651D' });
      txt('Oleico 18:1 → funde a ~13 °C → líquido 🫒', 640, 563, { size: 24, weight: 'bold', color: C.pink });
    });
  },
});

// ---------- 8. ANFIPÁTICOS ----------
SCENES.push({
  title: '2.1. Solubilidad: moléculas anfipáticas',
  lines: [
    'La segunda propiedad es la solubilidad. Los ácidos grasos son anfipáticos: tienen una parte que quiere al agua, y otra que la rechaza.',
    'La cabeza, el grupo carboxilo, es polar o hidrófila: le gusta el agua.',
    ['La cola, la cadena hidrocarbonada, es apolar o hidrófoba: huye del agua y se une a otras colas por fuerzas de Van der Waals.', 'La cola, la cadena de carbonos, es apolar o hidrófoba: huye del agua, y se une a otras colas por fuerzas de van der vals.'],
    'Cuanto más larga es la cadena, más insoluble en agua es el ácido graso.',
    'Por eso, en el agua, se organizan solos. Pueden formar una película en la superficie, con las colas hacia el aire.',
    'O pueden formar micelas: esferas con las cabezas hacia fuera, tocando el agua, y las colas escondidas dentro.',
    'O bicapas: dos capas enfrentadas por sus colas. ¡Así están construidas las membranas de nuestras células!',
  ],
  draw(T) {
    const top = T.p(4, 0.8);
    const sy = lerp(1, 0.55, top), cy = lerp(300, 150, top);
    X.save(); X.translate(640, cy); X.scale(sy, sy); X.translate(-640, -cy);
    pop(T.p(0), 640, cy, () => {
      const pts = zigzag(560, 300, 13, 36, 0); drawPts(pts, { lw: 6, color: '#B9860F' });
      ball(510, 300, 50, C.blue, 'COOH', { size: 20 });
      txt('ANFIPÁTICO = con dos “caras”', 640, 175, { size: 34, weight: 'bold', color: C.dgreen, alpha: 1 - top });
    });
    grp(T.p(1), () => { box(330, 380, 330, 86, { fill: '#fff', stroke: C.blue, lw: 3 }); txt('Cabeza POLAR', 495, 405, { size: 24, weight: 'bold', color: C.blue }); txt('hidrófila 💧❤️', 495, 442, { size: 22 }); });
    grp(T.p(2), () => { box(740, 380, 360, 86, { fill: '#fff', stroke: '#B9860F', lw: 3 }); txt('Cola APOLAR', 920, 405, { size: 24, weight: 'bold', color: '#B9860F' }); txt('hidrófoba 💧✗', 920, 442, { size: 22 }); });
    X.restore();
    grp(T.p(3) * (1 - top), () => { txt('Cadena más larga → más insoluble en agua', 640, 520, { size: 28, weight: 'bold', color: C.red }); });
    if (top > 0) grp(top, () => {
      box(60, 330, 1160, 265, { fill: C.water, r: 12, shadow: false });
      txt('AGUA', 1170, 575, { size: 18, weight: 'bold', color: C.blue, align: 'right' });
      // película superficial
      for (let i = 0; i < 18; i++) lipid(90 + i * 17, 340, 0.8, -PI / 2, { head: C.blue, ph: i + T.t });
      txt('Película superficial', 245, 395, { size: 20, weight: 'bold' }); txt('(colas hacia el aire)', 245, 420, { size: 17, color: C.grey });
      pop(T.p(5), 600, 490, () => { micelle(600, 480, 62, 22, 0.85, { head: C.blue, rot: T.t * 0.2 }); txt('Micela', 600, 575, { size: 22, weight: 'bold' }); });
      slide(T.p(6), 60, 0, () => {
        bilayer(800, 420, 380, 0.85, { head: C.blue });
        txt('Bicapa', 990, 395, { size: 22, weight: 'bold' }); txt('= membrana celular', 990, 530, { size: 22, weight: 'bold', color: C.dgreen });
      });
    });
  },
});

// ---------- 9. CIS-TRANS ----------
function ccDouble(x, y, cis, p) {
  // C=C con dos H y dos cadenas
  grp(p, () => {
    line(x - 40, y - 4, x + 40, y - 4, { lw: 4 }); line(x - 40, y + 6, x + 40, y + 6, { lw: 4, color: C.red });
    ball(x - 50, y, 22, '#4A4F57', 'C', { size: 22 }); ball(x + 50, y, 22, '#4A4F57', 'C', { size: 22 });
    // H
    line(x - 50, y - 22, x - 80, y - 70, { lw: 3 }); ball(x - 88, y - 82, 18, '#B8C2CC', 'H', { size: 18, tc: C.ink });
    const hy = cis ? -1 : 1;
    line(x + 50, y + 22 * hy, x + 80, y + 70 * hy, { lw: 3 }); ball(x + 88, y + 82 * hy, 18, '#B8C2CC', 'H', { size: 18, tc: C.ink });
    // cadenas
    const a = zigzag(x - 70, y + 20, 4, 30, PI * 0.72, {}); drawPts(a, { lw: 4, color: '#B9860F' });
    const b = zigzag(x + 70, y - 20 * hy * -1 + (cis ? 20 : -40), 4, 30, cis ? PI * 0.28 : -PI * 0.28, {}); drawPts(b, { lw: 4, color: '#B9860F' });
  });
}
SCENES.push({
  title: '2.1. Isomería geométrica cis-trans',
  lines: [
    'Los ácidos grasos insaturados presentan isomería cis-trans, que depende de cómo se colocan los átomos alrededor del doble enlace.',
    'Si los dos hidrógenos del doble enlace están del mismo lado, la forma es cis, y la cadena se dobla.',
    'Si están en lados opuestos, la forma es trans, y la cadena queda casi recta.',
    'En la naturaleza, la mayoría de los ácidos grasos insaturados tienen forma cis.',
  ],
  draw(T) {
    pop(T.p(0), 640, 130, () => { txt('C = C', 640, 140, { size: 60, weight: 'bold', color: C.red }); txt('el doble enlace no puede girar', 640, 190, { size: 22, color: C.grey }); });
    slide(T.p(1), -60, 0, () => {
      box(60, 220, 560, 370, { fill: C.lgreen, shadow: false });
      txt('CIS', 340, 255, { size: 36, weight: 'bold', color: C.dgreen });
      txt('H del mismo lado', 340, 292, { size: 22 });
      ccDouble(340, 400, true, 1);
      txt('↪ cadena doblada', 340, 560, { size: 24, weight: 'bold', color: C.dgreen });
    });
    slide(T.p(2), 60, 0, () => {
      box(660, 220, 560, 370, { fill: C.lpink, shadow: false });
      txt('TRANS', 940, 255, { size: 36, weight: 'bold', color: C.pink });
      txt('H en lados opuestos', 940, 292, { size: 22 });
      ccDouble(940, 410, false, 1);
      txt('→ cadena casi recta', 940, 560, { size: 24, weight: 'bold', color: C.pink });
    });
    pop(T.p(3), 340, 520, () => { box(150, 495, 380, 50, { fill: C.green, r: 25 }); txt('🌿 ¡La más común en la naturaleza!', 340, 520, { size: 21, weight: 'bold', color: '#fff' }); });
  },
});

// ---------- 10. ESTERIFICACIÓN ----------
SCENES.push({
  title: '2.2. Propiedades químicas: esterificación',
  lines: [
    'Las propiedades químicas de los ácidos grasos se deben a que su grupo carboxilo puede reaccionar con otras moléculas.',
    'En la esterificación, un ácido graso se une a un alcohol: reacciona el grupo OH del carboxilo con el grupo OH del alcohol.',
    'Se forma un enlace covalente de tipo éster, y se libera una molécula de agua. El compuesto que se obtiene se llama éster.',
    'Por ejemplo: ácido palmítico más propanol forman palmitato de propilo, que es un éster, y agua.',
    'Esta reacción es reversible: el enlace éster se puede romper por hidrólisis, por ejemplo hirviendo el éster con ácidos o bases. Así recuperamos el ácido graso y el alcohol.',
  ],
  draw(T) {
    pop(T.p(0), 640, 140, () => { txt('R–', 560, 140, { size: 56, weight: 'bold', color: '#B9860F' }); txt('COOH', 690, 140, { size: 56, weight: 'bold', color: C.red }); txt('¡el grupo que reacciona!', 640, 195, { size: 22, color: C.grey }); });
    const q = T.p(2, 2.2), rev = T.p(4, 2, 2.5);
    const m = q * (1 - rev);
    const y = 300;
    grp(T.p(1, 0.6) * (1 - T.p(3, 0.6) * 0.0), () => {
      // ácido: "R–CO" + "OH"   alcohol: "H" + "O–R₁"
      const ax = lerp(300, 470, m), bx = lerp(800, 600, m);
      box(ax - 140, y - 45, 210, 90, { fill: C.lyellow, alpha: 1 });
      txt('R–CO', ax - 35, y, { size: 40, weight: 'bold' });
      box(bx - 20, y - 45, 190, 90, { fill: C.lblue, alpha: 1 });
      txt('O–R₁', bx + 75, y, { size: 40, weight: 'bold' });
      // las partes que salen
      const ox = lerp(ax + 55, 640, m), oy = lerp(y, y + 140, m), hx = lerp(bx - 5, 680, m), hy = lerp(y, y + 140, m);
      txt('OH', ox, oy, { size: 40, weight: 'bold', color: C.red });
      txt('H', hx, hy, { size: 40, weight: 'bold', color: C.red });
      grp(T.p(1, 0.6, 1) * (1 - m), () => { circ(ax + 55, y, 34, { stroke: C.red, lw: 3, dash: [6, 5] }); circ(bx - 5, y, 26, { stroke: C.red, lw: 3, dash: [6, 5] }); txt('+', 545, y, { size: 44, weight: 'bold' }); });
      txt('Ácido graso', ax - 35, y + 70, { size: 20, alpha: 1 - m }); txt('Alcohol', bx + 75, y + 70, { size: 20, alpha: 1 - m });
      grp(clamp((m - 0.85) * 7), () => {
        box(500, 395, 280, 70, { fill: C.water, r: 35 }); txt('💧 H₂O', 640, 430, { size: 30, weight: 'bold', color: C.blue });
        txt('enlace ÉSTER', 640, y - 75, { size: 24, weight: 'bold', color: C.purple }); arrow(640, y - 60, 590, y - 25, { color: C.purple });
        txt('Éster', 640, y + 60, { size: 22, weight: 'bold' });
      });
    });
    slide(T.p(3), 0, 40, () => {
      box(70, 490, 1140, 100, { fill: '#fff' });
      txt('Ácido palmítico  +  Propanol', 330, 525, { size: 22, weight: 'bold' });
      txt('CH₃–(CH₂)₁₄–COOH + HO–(CH₂)₂–CH₃', 330, 560, { size: 18, color: C.grey });
      txt('⇄', 640, 540, { size: 44, weight: 'bold', color: C.green });
      txt('Palmitato de propilo  +  Agua', 930, 525, { size: 22, weight: 'bold' });
      txt('CH₃–(CH₂)₁₄–COO–(CH₂)₂–CH₃ + H₂O', 930, 560, { size: 18, color: C.grey });
    });
    pop(T.p(4, 0.6), 1080, 200, () => {
      box(930, 120, 300, 150, { fill: '#fff', stroke: C.green, lw: 3 });
      txt('Esterificación →', 1080, 160, { size: 22, weight: 'bold', color: C.green });
      txt('← Hidrólisis', 1080, 200, { size: 22, weight: 'bold', color: C.orange });
      txt('(ácidos o bases + calor 🔥)', 1080, 240, { size: 17 });
    });
  },
});

// ---------- 11. SAPONIFICACIÓN ----------
function soap(x, y, s, ang, o = {}) { lipid(x, y, s, ang, { tails: 1, head: C.red, len: 40, ...o }); }
SCENES.push({
  title: '2.2. Saponificación: ¡así se hace el jabón!',
  lines: [
    'La saponificación es la reacción de un ácido graso con una base fuerte, como la sosa, NaOH, o la potasa, KOH.',
    'Se forma una sal del ácido graso, que es el jabón, y agua.',
    'Por ejemplo, el ácido palmítico con hidróxido de sodio forma palmitato de sodio, un jabón.',
    ['Los jabones son muy anfipáticos: tienen una cola apolar, que se une a la grasa, y una cabeza polar con carga, COO⁻ y Na⁺, que se une al agua.', 'Los jabones son muy anfipáticos: tienen una cola apolar, que se une a la grasa, y una cabeza polar con carga eléctrica, que se une al agua.'],
    'Así, el jabón rodea las manchas de grasa formando micelas, las despega de la superficie, y quedan flotando en el agua jabonosa.',
    'Incluso puedes fabricar jabón casero con aceite usado, agua y sosa cáustica. Pero siempre con gafas y guantes, porque la sosa produce quemaduras.',
  ],
  draw(T) {
    const out = 1 - T.p(3, 0.6);
    grp(out, () => {
      pop(T.p(0), 640, 180, () => {
        box(150, 130, 260, 90, { fill: C.lyellow }); txt('R–COOH', 280, 162, { size: 36, weight: 'bold' }); txt('Ácido graso', 280, 200, { size: 18 });
        txt('+', 455, 175, { size: 44, weight: 'bold' });
        box(500, 130, 220, 90, { fill: C.lpurple }); txt('NaOH', 610, 162, { size: 36, weight: 'bold', color: C.purple }); txt('Base (o KOH)', 610, 200, { size: 18 });
      });
      arrow(740, 175, 830, 175, { p: T.p(1, 0.6), lw: 5, color: C.green });
      pop(T.p(1, 0.6, 0.5), 1000, 175, () => {
        box(850, 120, 360, 110, { fill: '#fff', stroke: C.blue, lw: 3 });
        txt('R–COO⁻ Na⁺  +  H₂O', 1030, 160, { size: 30, weight: 'bold' }); txt('JABÓN 🧼          agua', 1010, 202, { size: 21, weight: 'bold', color: C.blue });
      });
      slide(T.p(2), 0, 40, () => {
        box(150, 290, 980, 110, { fill: '#fff' });
        txt('Ácido palmítico + Hidróxido de sodio → Palmitato de sodio (jabón) + Agua', 640, 325, { size: 23, weight: 'bold' });
        txt('CH₃–(CH₂)₁₄–COOH + NaOH → CH₃–(CH₂)₁₄–COONa + H₂O', 640, 365, { size: 21, color: C.grey });
      });
    });
    // molécula de jabón grande
    const sp = T.p(3, 0.7) * (1 - T.p(4, 0.6));
    if (sp > 0) grp(sp, () => {
      const pts = zigzag(380, 300, 15, 34, 0); drawPts(pts, { lw: 6, color: '#B9860F' });
      const e = pts[15]; ball(e[0] + 40, e[1], 38, C.red, 'COO⁻', { size: 17 }); ball(e[0] + 105, e[1] - 30, 22, C.purple, 'Na⁺', { size: 15 });
      box(330, 380, 420, 80, { fill: '#fff', stroke: '#B9860F', lw: 3 }); txt('cola APOLAR → se une a la grasa', 540, 420, { size: 22, weight: 'bold', color: '#B9860F' });
      box(790, 380, 400, 80, { fill: '#fff', stroke: C.red, lw: 3 }); txt('cabeza POLAR → se une al agua', 990, 420, { size: 22, weight: 'bold', color: C.red });
      txt('molécula de jabón', 640, 160, { size: 34, weight: 'bold', color: C.blue });
    });
    // limpieza
    const cp = T.p(4, 0.6) * (1 - T.p(5, 0.6));
    if (cp > 0) grp(cp, () => {
      box(60, 110, 1160, 460, { fill: C.water, shadow: false });
      box(60, 540, 1160, 30, { fill: '#C9B79C', r: 4, shadow: false }); txt('superficie (plato, ropa, piel…)', 640, 555, { size: 16 });
      const a = T.p(4, 2.5, 0.5), lift = T.p(4, 2.5, 3);
      const gx = 640, gy = lerp(500, 300, lift);
      X.save(); X.fillStyle = C.yellow; X.beginPath(); X.ellipse(gx, gy, lerp(110, 60, lift), lerp(40, 60, lift), 0, 0, 2 * PI); X.fill(); X.restore();
      txt('GRASA', gx, gy, { size: 22, weight: 'bold', color: '#8A6400' });
      const n = 22;
      for (let i = 0; i < n; i++) {
        const ang = lift > 0 ? 2 * PI * i / n : PI + PI * i / (n - 1);
        const R = lift > 0 ? 100 : 150;
        const ex = gx + lerp(130, R, lift) * Math.cos(ang) * 1, ey = gy + lerp(70, R * 0.9, lift) * Math.sin(ang);
        const fx = gx + (300 + 300 * rnd(i)) * Math.cos(ang), fy = gy - 200 - 200 * rnd(i + 1);
        const x = lerp(fx, ex, a), y = lerp(fy, ey, a);
        if (lift === 0 && Math.sin(ang) > 0.2) continue;
        soap(x, y, 0.9, Math.atan2(gy - y, gx - x), { ph: i });
      }
      grp(lift, () => { txt('¡Micela de jabón con la grasa dentro!', 640, 150, { size: 30, weight: 'bold', color: C.blue }); });
    });
    pop(T.p(5), 640, 330, () => {
      box(200, 140, 880, 400, { fill: '#fff', stroke: C.green, lw: 4 });
      txt('Jabón casero 🧪', 640, 190, { size: 36, weight: 'bold', color: C.dgreen });
      emo('🫒', 330, 290, 80); txt('aceite usado', 330, 355, { size: 20 }); txt('+', 450, 290, { size: 50, weight: 'bold' });
      emo('💧', 560, 290, 70); txt('agua + sosa', 560, 355, { size: 20 }); txt('→', 690, 290, { size: 50, weight: 'bold' });
      emo('🧼', 830, 290, 90); txt('jabón', 830, 355, { size: 20, weight: 'bold' });
      box(340, 400, 600, 90, { fill: C.lpink, stroke: C.red, lw: 3 }); txt('🥽 🧤  ¡Protégete! La sosa quema', 640, 445, { size: 28, weight: 'bold', color: C.red });
    });
  },
});
