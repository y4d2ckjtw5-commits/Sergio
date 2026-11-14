// Escenas 4: insaponificables, funciones, lipoproteínas y resumen

// ---------- 19. TERPENOS ----------
function isoprene(x, y, s = 1, col = C.purple, a = 1) {
  const p = [[x, y], [x + 26 * s, y + 15 * s], [x + 52 * s, y], [x + 78 * s, y + 15 * s]];
  drawPts(p, { lw: 4 * s, color: col, doubles: [0, 2], dcolor: col, alpha: a });
  line(p[1][0], p[1][1], p[1][0], p[1][1] + 30 * s, { lw: 4 * s, color: col, alpha: a });
}
SCENES.push({
  title: '5. Lípidos insaponificables: terpenos',
  lines: [
    'Llegamos a los lípidos insaponificables: no tienen ácidos grasos, así que no pueden formar jabones. Hay tres tipos: terpenos, esteroides y eicosanoides.',
    'Los isoprenoides, o terpenos, son polímeros de una pequeña molécula de cinco carbonos: el isopreno.',
    'Se diferencian según el número de moléculas de isopreno que contienen, y son sustancias hidrófobas, insolubles en agua.',
    'Abundan en los vegetales, donde actúan como pigmentos: los carotenos de la zanahoria, las xantofilas de las hojas, o el licopeno del tomate.',
    'También forman esencias vegetales, como el limoneno del limón, el mentol de la menta o el eucaliptol. Y algunas vitaminas, como la A, la E y la K.',
  ],
  draw(T) {
    grp(1 - T.p(1, 0.5), () => pop(T.p(0), 640, 320, () => {
      box(290, 130, 700, 90, { fill: '#fff', stroke: C.red, lw: 3 }); txt('✗ ácidos grasos  →  ✗ jabón', 640, 175, { size: 34, weight: 'bold', color: C.red });
      [['Terpenos', 380], ['Esteroides', 640], ['Eicosanoides', 900]].forEach(([s, x], i) => pop(T.p(0, 0.5, 3 + i * 0.6), x, 330, () => { box(x - 115, 290, 230, 80, { fill: C.lpurple }); txt(s, x, 330, { size: 26, weight: 'bold', color: C.purple }); }));
    }));
    const ip = T.p(1, 0.8, 0.4);
    if (ip > 0) grp(ip, () => {
      box(60, 100, 440, 200, { fill: '#fff' });
      txt('ISOPRENO (5 C)', 280, 130, { size: 26, weight: 'bold', color: C.purple });
      isoprene(205, 175, 1.9);
      txt('CH₂=C(CH₃)–CH=CH₂', 280, 280, { size: 20, color: C.grey });
      // polímero
      const n = 5;
      for (let i = 0; i < n; i++) {
        const a = T.p(1, 0.5, 1.5 + i * 0.5);
        isoprene(560 + i * 128, 190, 1.3, [C.purple, C.blue, C.teal, C.pink, C.orange][i], a);
        if (i < n - 1 && a > 0) line(560 + i * 128 + 101, 209, 560 + (i + 1) * 128, 190, { lw: 4, alpha: a, color: C.grey });
      }
      txt('…unidos forman los TERPENOS', 880, 280, { size: 22, weight: 'bold', alpha: T.p(1, 0.5, 4) });
    });
    grp(T.p(2), () => { box(60, 320, 1160, 56, { fill: C.lpurple, shadow: false }); txt('Distinto nº de isoprenos  ·  hidrófobos (insolubles en agua) 💧✗', 640, 348, { size: 23, weight: 'bold', color: C.purple }); });
    const pig = [['🥕', 'carotenos'], ['🍂', 'xantofilas'], ['🍅', 'licopeno']];
    slide(T.p(3), -40, 0, () => {
      box(60, 395, 540, 195, { fill: '#fff', stroke: C.orange, lw: 3 }); txt('🎨 Pigmentos', 330, 425, { size: 24, weight: 'bold', color: '#B5651D' });
      pig.forEach((p, i) => { emo(p[0], 150 + i * 180, 495, 60); txt(p[1], 150 + i * 180, 560, { size: 19, weight: 'bold' }); });
    });
    slide(T.p(4), 40, 0, () => {
      box(640, 395, 580, 195, { fill: '#fff', stroke: C.green, lw: 3 }); txt('🌿 Esencias y vitaminas', 930, 425, { size: 24, weight: 'bold', color: C.dgreen });
      [['🍋', 'limoneno'], ['🌱', 'mentol'], ['🌳', 'eucaliptol']].forEach((p, i) => { emo(p[0], 710 + i * 120, 490, 50); txt(p[1], 710 + i * 120, 545, { size: 17, weight: 'bold' }); });
      ['A', 'E', 'K'].forEach((v, i) => pop(T.p(4, 0.5, 3 + i * 0.4), 1080 + (i % 2) * 70, 470 + Math.floor(i / 2) * 70, () => ball(1080 + (i % 2) * 70, 470 + Math.floor(i / 2) * 70, 28, C.orange, v, { size: 26 })));
      txt('vit.', 1150, 540, { size: 18, weight: 'bold', alpha: T.p(4, 0.5, 4) });
    });
  },
});

// ---------- 20. ESTEROIDES: ESTEROLES ----------
function artery(x, y, w, h, plaque, t) {
  box(x, y, w, h, { fill: '#C94A4A', r: 30, shadow: false }); box(x + 10, y + 14, w - 20, h - 28, { fill: '#F2B3B3', r: 22, shadow: false });
  for (let i = 0; i < 6; i++) { const cx = x + ((t * 90 + i * w / 6) % w); circ(cx, y + h / 2 + 10 * Math.sin(i), 12, { fill: '#D9534F' }); }
  if (plaque > 0) { X.save(); X.fillStyle = '#F2D04A'; X.beginPath(); X.ellipse(x + w * 0.55, y + 16, 70 * plaque, 34 * plaque, 0, 0, PI); X.fill(); X.restore(); }
}
SCENES.push({
  title: '5.2. Esteroides: los esteroles',
  lines: [
    'Los esteroides derivan del esterano: cuatro anillos de carbono unidos, llamados A, B, C y D, que les dan una estructura rígida e hidrófoba.',
    'Los esteroles tienen un grupo OH en el carbono tres. El más famoso es el colesterol.',
    'El colesterol es un componente esencial de las membranas de las células animales, a las que da fluidez. Gracias al OH del carbono tres, es una molécula anfipática.',
    'Puede venir de los alimentos, el colesterol exógeno, o fabricarse en el hígado, el colesterol endógeno. Pero si hay demasiado en sangre, forma placas en las arterias.',
    'Otros esteroles son los ácidos biliares. Se fabrican en el hígado a partir del colesterol, y emulsionan las grasas para que las lipasas del intestino las digieran.',
    'Y la vitamina D, que regula el metabolismo del calcio. Se fabrica en la piel a partir de provitaminas, gracias a los rayos ultravioleta del sol.',
  ],
  draw(T) {
    const sp = T.p(0, 2.5, 0.3);
    grp(sp > 0 ? 1 : 0, () => {
      box(60, 95, 540, 300, { fill: '#fff' });
      const r = steroid(190, 280, 46, { p: sp, labels: true, fill: 'rgba(122,91,199,0.06)', color: C.ink });
      txt('ESTERANO', 330, 125, { size: 26, weight: 'bold', color: C.purple, alpha: 1 - T.p(1) });
      grp(T.p(1, 0.6), () => {
        line(r.c3[0], r.c3[1], r.c3[0] - 30, r.c3[1] + 18, { lw: 3.5 }); box(r.c3[0] - 95, r.c3[1] + 2, 64, 40, { fill: C.lpink, r: 18, shadow: false });
        txt('HO', r.c3[0] - 63, r.c3[1] + 22, { size: 24, weight: 'bold', color: C.red }); txt('C3', r.c3[0] + 12, r.c3[1] - 6, { size: 15, weight: 'bold', color: C.grey });
        const z = zigzag(r.c17[0], r.c17[1], 6, 26, -0.6); drawPts(z, { lw: 3.5, p: T.p(1, 1, 0.6) });
        txt('COLESTEROL', 330, 125, { size: 28, weight: 'bold', color: C.red });
      });
    });
    slide(T.p(2), 60, 0, () => {
      box(640, 95, 580, 230, { fill: '#fff' });
      txt('Membrana animal: da FLUIDEZ', 930, 122, { size: 22, weight: 'bold', color: C.dgreen });
      bilayer(670, 160, 520, 0.85, { head: C.blue });
      for (let i = 0; i < 6; i++) { const x = 700 + i * 85; box(x, 172, 14, 30, { fill: C.yellow, r: 4, shadow: false }); circ(x + 7, 168, 5, { fill: C.red }); }
      txt('colesterol (amarillo) entre los fosfolípidos', 930, 300, { size: 17, color: C.grey });
    });
    slide(T.p(3), 60, 0, () => {
      box(640, 340, 580, 250, { fill: '#fff' });
      txt('🍳 exógeno (dieta)   ·   🫀 endógeno (hígado)', 930, 370, { size: 21, weight: 'bold' });
      artery(670, 410, 520, 110, T.p(3, 2, 3), T.t);
      txt('Exceso → PLACAS en las arterias ⚠️', 930, 555, { size: 21, weight: 'bold', color: C.red, alpha: T.p(3, 0.6, 3) });
    });
    slide(T.p(4), 0, 40, () => {
      box(60, 410, 265, 180, { fill: C.lgreen, stroke: C.green, lw: 3 });
      txt('Ácidos biliares', 192, 438, { size: 21, weight: 'bold', color: C.dgreen });
      para('Hígado → bilis. Emulsionan las grasas para digerirlas.', 78, 460, 230, { size: 17 });
      emo('🫧', 192, 560, 34);
    });
    slide(T.p(5), 0, 40, () => {
      box(335, 410, 265, 180, { fill: C.lyellow, stroke: C.orange, lw: 3 });
      txt('Vitamina D', 467, 438, { size: 21, weight: 'bold', color: '#B5651D' });
      para('Regula el calcio. Se forma con la luz UV del sol.', 353, 460, 230, { size: 17 });
      emo('☀️', 430, 560, 34); emo('🦴', 505, 560, 34);
    });
  },
});

// ---------- 21. HORMONAS ESTEROIDEAS ----------
SCENES.push({
  title: '5.2. Esteroides: hormonas esteroideas',
  lines: [
    'Las hormonas esteroideas, en lugar del OH, tienen un átomo de oxígeno unido por un doble enlace en el carbono tres.',
    'Las hormonas sexuales regulan la madurez sexual y las funciones reproductoras. Destacan la testosterona, la hormona sexual masculina, producida en los testículos, y la progesterona, la hormona del embarazo.',
    'Las hormonas de las glándulas suprarrenales se fabrican a partir del colesterol. El cortisol regula el metabolismo de los glúcidos, y la aldosterona controla la absorción de agua y sales minerales en el riñón.',
  ],
  draw(T) {
    pop(T.p(0), 330, 260, () => {
      box(60, 95, 540, 330, { fill: '#fff' });
      const r = steroid(200, 290, 46, { labels: true, fill: 'rgba(59,125,216,0.06)' });
      line(r.c3[0] - 2, r.c3[1] + 2, r.c3[0] - 34, r.c3[1] + 20, { lw: 3.5 }); line(r.c3[0] + 3, r.c3[1] + 10, r.c3[0] - 29, r.c3[1] + 28, { lw: 3.5, color: C.red });
      ball(r.c3[0] - 48, r.c3[1] + 30, 20, C.red, 'O', { size: 20 });
      txt('C3 = O', 330, 130, { size: 30, weight: 'bold', color: C.blue });
      txt('(los esteroles tienen –OH)', 330, 395, { size: 19, color: C.grey });
    });
    slide(T.p(1), 60, 0, () => {
      box(640, 95, 580, 230, { fill: C.lpurple, stroke: C.purple, lw: 3 });
      txt('Hormonas SEXUALES', 930, 125, { size: 25, weight: 'bold', color: C.purple });
      emo('♂️', 720, 210, 54); txt('Testosterona', 860, 195, { size: 22, weight: 'bold', align: 'left' }); txt('(testículos)', 860, 225, { size: 18, align: 'left' });
      emo('🤰', 720, 285, 54); txt('Progesterona', 860, 275, { size: 22, weight: 'bold', align: 'left' }); txt('(hormona del embarazo)', 860, 303, { size: 18, align: 'left' });
    });
    slide(T.p(2), 60, 0, () => {
      box(640, 345, 580, 245, { fill: C.lgreen, stroke: C.green, lw: 3 });
      txt('Glándulas SUPRARRENALES', 930, 375, { size: 25, weight: 'bold', color: C.dgreen });
      txt('(se fabrican a partir del colesterol)', 930, 405, { size: 17, color: C.grey });
      emo('🍬', 720, 465, 48); txt('Cortisol', 860, 455, { size: 22, weight: 'bold', align: 'left' }); txt('metabolismo de los glúcidos', 860, 483, { size: 18, align: 'left' });
      emo('🧂', 720, 545, 48); txt('Aldosterona', 860, 535, { size: 22, weight: 'bold', align: 'left' }); txt('agua y sales en el riñón', 860, 563, { size: 18, align: 'left' });
    });
  },
});

// ---------- 22. EICOSANOIDES ----------
SCENES.push({
  title: '5.3. Eicosanoides',
  lines: [
    'Los eicosanoides derivan del ácido araquidónico, un omega seis de veinte carbonos, por oxidación de sus dobles enlaces.',
    'Están en los tejidos en muy poca cantidad, y actúan como mensajeros locales, con efectos de corta duración.',
    'Las prostaglandinas contraen el músculo liso, por ejemplo en el útero durante el parto o la menstruación, dilatan los capilares, y causan la fiebre y el dolor de la inflamación.',
    'Por eso la aspirina, que impide fabricar prostaglandinas, alivia el dolor y baja la fiebre.',
    'Los tromboxanos los producen las plaquetas: facilitan la formación de coágulos y contraen los vasos sanguíneos.',
    'Y los leucotrienos los producen los glóbulos blancos: participan en las alergias, el asma y la respuesta inflamatoria.',
  ],
  draw(T) {
    pop(T.p(0), 330, 230, () => {
      box(60, 95, 540, 260, { fill: '#fff' });
      const z = zigzag(420, 160, 19, 26, PI, { bends: { 7: -0.55, 8: -0.55, 9: -0.55, 10: -0.55, 11: -0.55 }, flip: true });
      drawPts(z, { lw: 4, doubles: [4, 7, 10, 13], dcolor: C.purple, p: T.p(0, 2, 0.3) });
      circ(445, 160, 22, { fill: C.red }); txt('COOH', 445, 160, { size: 11, weight: 'bold', color: '#fff' });
      txt('Ácido araquidónico', 330, 300, { size: 24, weight: 'bold' }); txt('20:4 · omega 6', 330, 330, { size: 20, color: C.purple });
      emo('💨', 540, 230, 40, T.p(0, 0.5, 3)); txt('O₂', 540, 270, { size: 20, weight: 'bold', color: C.red, alpha: T.p(0, 0.5, 3) });
    });
    pop(T.p(1), 930, 230, () => {
      box(640, 95, 580, 260, { fill: '#fff' });
      const c = [930, 225];
      for (let i = 0; i < 3; i++) { const r = ((T.t * 50 + i * 40) % 120); circ(c[0], c[1], r, { stroke: C.teal, lw: 3, alpha: 1 - r / 120 }); }
      ball(c[0], c[1], 22, C.teal);
      txt('Mensajeros LOCALES', 930, 130, { size: 24, weight: 'bold', color: C.teal });
      txt('poca cantidad · efecto corto ⏱️', 930, 325, { size: 20 });
    });
    slide(T.p(2), 0, 40, () => {
      box(60, 375, 400, 215, { fill: C.lpink, stroke: C.pink, lw: 3 });
      txt('Prostaglandinas', 260, 402, { size: 23, weight: 'bold', color: C.pink });
      ['💪 contraen el músculo liso', '🩸 dilatan capilares', '🤒 fiebre y dolor'].forEach((s, i) => txt(s, 80, 440 + i * 32, { size: 18, align: 'left' }));
      pop(T.p(3), 260, 555, () => { box(90, 535, 340, 42, { fill: '#fff', r: 21, stroke: C.blue }); txt('💊 Aspirina las bloquea', 260, 556, { size: 19, weight: 'bold', color: C.blue }); });
    });
    slide(T.p(4), 0, 40, () => {
      box(480, 375, 360, 215, { fill: C.lorange, stroke: C.orange, lw: 3 });
      txt('Tromboxanos', 660, 402, { size: 23, weight: 'bold', color: '#B5651D' });
      txt('🩸 de las plaquetas', 500, 445, { size: 18, align: 'left' }); txt('🧱 forman coágulos', 500, 480, { size: 18, align: 'left' }); txt('↘ contraen los vasos', 500, 515, { size: 18, align: 'left' });
    });
    slide(T.p(5), 0, 40, () => {
      box(860, 375, 360, 215, { fill: C.lpurple, stroke: C.purple, lw: 3 });
      txt('Leucotrienos', 1040, 402, { size: 23, weight: 'bold', color: C.purple });
      txt('⚪ de los glóbulos blancos', 880, 445, { size: 18, align: 'left' }); txt('🤧 alergias y asma', 880, 480, { size: 18, align: 'left' }); txt('🔥 inflamación', 880, 515, { size: 18, align: 'left' });
    });
  },
});

// ---------- 23. FUNCIONES (1) ----------
function panel(i, p, title, col, fn) {
  const x = [40, 450, 860][i % 3], y = i < 3 ? 90 : 345;
  pop(p, x + 190, y + 117, () => { box(x, y, 380, 235, { fill: '#fff', stroke: col, lw: 3 }); txt(title, x + 190, y + 28, { size: 22, weight: 'bold', color: col }); fn(x, y); });
}
SCENES.push({
  title: '6. Funciones de los lípidos',
  lines: [
    'Por último, repasemos las funciones de los lípidos.',
    'Función de reserva energética: un gramo de grasa produce nueve coma cuatro kilocalorías, más del doble que las proteínas o los glúcidos, que dan cuatro coma una.',
    'Los osos que hibernan viven de su grasa durante meses, y en los animales del desierto, como los camellos, la grasa de la joroba sirve como reserva de agua metabólica.',
    'Función estructural: los fosfolípidos, los glucolípidos y el colesterol forman la bicapa lipídica de todas las membranas celulares.',
    'Función de protección: la grasa recubre órganos como el corazón o el hígado, amortigua los golpes en las plantas de los pies, y las ceras impermeabilizan la piel, frutos, hojas, pelos y plumas.',
    'Función de aislante térmico: la grasa bajo la piel conserva el calor del cuerpo. Por eso los osos polares y las focas tienen gruesas capas de grasa.',
  ],
  draw(T) {
    pop(T.p(0) * (1 - T.p(1, 0.5)), 640, 330, () => { txt('¿Para qué sirven los lípidos?', 640, 330, { size: 48, weight: 'bold', color: C.dgreen }); });
    panel(0, T.p(1), '⚡ Reserva energética', C.orange, (x, y) => {
      const bars = [['Grasa', 9.4, C.yellow], ['Proteínas', 4.1, C.pink], ['Glúcidos', 4.1, C.blue]];
      bars.forEach((b, i) => {
        const g = T.p(1, 1.2, 1 + i * 0.4), w = 16 * b[1] * g;
        txt(b[0], x + 20, y + 80 + i * 55, { size: 18, align: 'left', weight: 'bold' });
        box(x + 115, y + 66 + i * 55, w, 28, { fill: b[2], r: 6, shadow: false });
        txt(b[1].toString().replace('.', ',') + ' kcal/g', x + 122 + w, y + 80 + i * 55, { size: 17, align: 'left', weight: 'bold', alpha: g });
      });
    });
    panel(1, T.p(2), '🐻 Hibernación y 🐫 desierto', C.orange, (x, y) => {
      emo('🐻', x + 100, y + 115, 76); emo('💤', x + 150, y + 75, 30); emo('🐫', x + 280, y + 115, 76);
      txt('grasa = energía', x + 100, y + 180, { size: 17, weight: 'bold' }); txt('grasa → agua metabólica', x + 280, y + 180, { size: 15, weight: 'bold' });
    });
    panel(2, T.p(3), '🧱 Estructural', C.blue, (x, y) => { bilayer(x + 20, y + 80, 340, 0.9, { head: C.blue }); txt('membranas celulares', x + 190, y + 205, { size: 18, weight: 'bold' }); });
    panel(3, T.p(4), '🛡️ Protección', C.green, (x, y) => {
      [['❤️', 'órganos'], ['🦶', 'pies'], ['🍎', 'ceras']].forEach((e, i) => { emo(e[0], x + 70 + i * 120, y + 115, 60); txt(e[1], x + 70 + i * 120, y + 180, { size: 18, weight: 'bold' }); });
    });
    panel(4, T.p(5), '🌡️ Aislante térmico', C.teal, (x, y) => {
      emo('🐻‍❄️', x + 110, y + 115, 76); emo('🦭', x + 270, y + 115, 76); txt('gruesas capas de grasa', x + 190, y + 190, { size: 18, weight: 'bold' });
    });
    panel(5, T.p(5, 0.6, 3), '➡️ Y además…', C.purple, (x, y) => { txt('⚙️ Reguladora', x + 190, y + 100, { size: 24, weight: 'bold' }); txt('🚚 Transportadora', x + 190, y + 150, { size: 24, weight: 'bold' }); });
  },
});

// ---------- 24. FUNCIONES (2): REGULADORA Y TRANSPORTE ----------
function lipoprotein(cx, cy, R, t, o = {}) {
  circ(cx, cy, R, { fill: '#DCEBFA' });
  const g = X.createRadialGradient(cx - R * 0.2, cy - R * 0.2, 5, cx, cy, R * 0.8); g.addColorStop(0, '#FFF6B0'); g.addColorStop(1, C.yellow);
  circ(cx, cy, R * 0.78, { fill: g });
  const n = Math.round(R * 0.42), s = R / 140;
  for (let i = 0; i < n; i++) { const a = 2 * PI * i / n + t * 0.05; lipid(cx + R * Math.cos(a), cy + R * Math.sin(a), s, a + PI, { tails: 2, head: C.blue, len: 22, ph: i }); }
  if (!o.noProt) [[0.6, C.red], [2.4, '#7FCB6B'], [4.2, C.purple]].forEach(([a, c]) => { X.save(); X.fillStyle = c; X.beginPath(); X.ellipse(cx + R * Math.cos(a + t * 0.05), cy + R * Math.sin(a + t * 0.05), 26 * s, 18 * s, a, 0, 2 * PI); X.fill(); X.restore(); });
}
SCENES.push({
  title: '6. Funciones: reguladora y transportadora',
  lines: [
    'Función reguladora: las vitaminas lipídicas, A, D, E y K, ayudan a funcionar a muchas enzimas, y las hormonas lipídicas, como el cortisol, actúan como mensajeros químicos que regulan el metabolismo.',
    'Función transportadora: como los lípidos no se disuelven en la sangre ni en la linfa, viajan dentro de unas partículas solubles llamadas lipoproteínas.',
    'Una lipoproteína tiene un núcleo apolar de triglicéridos y colesterol, y una cubierta soluble de fosfolípidos, colesterol y proteínas.',
    'Los quilomicrones son las más grandes y menos densas: se forman en el intestino, y llevan los lípidos de la dieta hacia los músculos y el tejido adiposo.',
    'Las LDL, de baja densidad, llevan el colesterol desde el hígado a los tejidos. Si hay demasiadas, forman placas en las arterias: es el llamado colesterol malo.',
    'Las HDL, de alta densidad, recogen el colesterol sobrante de los tejidos y de los vasos sanguíneos, y lo llevan al hígado para eliminarlo: es el colesterol bueno.',
  ].map(s => s.includes('LDL') || s.includes('HDL') ? [s, s.replace('Las LDL', 'Las ele de ele').replace('Las HDL', 'Las hache de ele')] : s),
  draw(T) {
    slide(T.p(0), -60, 0, () => {
      box(40, 90, 580, 150, { fill: '#fff', stroke: C.purple, lw: 3 });
      txt('⚙️ Reguladora', 330, 118, { size: 24, weight: 'bold', color: C.purple });
      ['A', 'D', 'E', 'K'].forEach((v, i) => ball(100 + i * 70, 185, 26, C.orange, v, { size: 24 }));
      txt('vitaminas', 205, 225, { size: 16 });
      txt('🧪 cofactores', 470, 165, { size: 19, weight: 'bold' }); txt('📨 hormonas', 470, 200, { size: 19, weight: 'bold' });
    });
    slide(T.p(1), 60, 0, () => {
      box(660, 90, 580, 150, { fill: '#fff', stroke: C.red, lw: 3 });
      txt('🚚 Transportadora', 950, 118, { size: 24, weight: 'bold', color: C.red });
      txt('lípidos insolubles en sangre 🩸', 950, 160, { size: 20 });
      txt('→ viajan en LIPOPROTEÍNAS', 950, 200, { size: 22, weight: 'bold' });
    });
    pop(T.p(2), 330, 420, () => {
      box(40, 255, 580, 335, { fill: '#fff' });
      lipoprotein(260, 420, 135, T.t);
      txt('núcleo APOLAR', 260, 405, { size: 18, weight: 'bold', color: '#8A6400' }); txt('triglicéridos', 260, 428, { size: 15 }); txt('+ colesterol', 260, 448, { size: 15 });
      txt('Cubierta', 510, 300, { size: 18, weight: 'bold', color: C.blue }); txt('fosfolípidos,', 510, 322, { size: 15 }); txt('colesterol', 510, 340, { size: 15 });
      txt('Proteínas', 510, 520, { size: 18, weight: 'bold', color: C.red }); txt('(apolipoproteínas)', 510, 542, { size: 14 });
    });
    const rows = [
      [3, 'Quilomicrones', 'intestino → músculo y tejido adiposo', 46, '#FFF1B8', '', C.orange],
      [4, 'LDL (baja densidad)', 'hígado → tejidos · exceso = placas', 32, '#FFC9A8', '👎 “malo”', C.red],
      [5, 'HDL (alta densidad)', 'tejidos → hígado (lo elimina)', 22, '#BFE6B5', '👍 “bueno”', C.dgreen],
    ];
    rows.forEach((r, i) => slide(T.p(r[0]), 60, 0, () => {
      const y = 255 + i * 113;
      box(660, y, 580, 103, { fill: '#fff', stroke: r[6], lw: 2 });
      circ(720, y + 52, r[3], { fill: r[4], stroke: C.blue, lw: 3 });
      txt(r[1], 790, y + 30, { size: 22, weight: 'bold', align: 'left', color: r[6] });
      txt(r[2], 790, y + 62, { size: 17, align: 'left' });
      if (r[5]) txt(r[5], 1225, y + 30, { size: 19, weight: 'bold', align: 'right', color: r[6] });
    }));
  },
});

// ---------- 25. RESUMEN ----------
SCENES.push({
  title: 'Resumen final',
  lines: [
    'Resumiendo: los lípidos son biomoléculas insolubles en agua, y muy variadas.',
    'Los saponificables tienen ácidos grasos. Pueden ser simples, como las grasas y las ceras, o complejos, como los fosfolípidos y los glucolípidos.',
    'Los insaponificables no tienen ácidos grasos: son los terpenos, los esteroides y los eicosanoides.',
    'Y cumplen funciones de reserva de energía, estructura, protección, aislamiento térmico, regulación y transporte.',
    'Y ahora ya sabes por qué lavarte las manos con jabón destruye muchos virus: ¡el jabón rompe su envoltura de lípidos! ¡Hasta la próxima!',
  ],
  draw(T) {
    grp(1 - T.p(4, 0.6), () => {
      pop(T.p(0), 640, 125, () => { box(340, 95, 600, 60, { fill: C.yellow }); txt('LÍPIDOS · insolubles en agua · muy variados', 640, 125, { size: 24, weight: 'bold' }); });
      slide(T.p(1), -60, 0, () => {
        box(60, 180, 560, 230, { fill: '#D6E6FA' });
        txt('SAPONIFICABLES (con ác. grasos)', 340, 210, { size: 22, weight: 'bold', color: C.blue });
        box(80, 240, 250, 150, { fill: '#fff' }); txt('Simples', 205, 265, { size: 20, weight: 'bold' }); txt('🫒 Acilglicéridos', 205, 310, { size: 18 }); txt('🕯️ Ceras', 205, 350, { size: 18 });
        box(350, 240, 250, 150, { fill: '#fff' }); txt('Complejos', 475, 265, { size: 20, weight: 'bold' }); txt('Fosfolípidos', 475, 310, { size: 18 }); txt('Glucolípidos', 475, 350, { size: 18 });
      });
      slide(T.p(2), 60, 0, () => {
        box(660, 180, 560, 230, { fill: '#E3DBFA' });
        txt('INSAPONIFICABLES (sin ác. grasos)', 940, 210, { size: 22, weight: 'bold', color: C.purple });
        [['Terpenos', '🥕'], ['Esteroides', '🍳'], ['Eicosanoides', '💊']].forEach((e, i) => { box(680 + i * 178, 240, 165, 150, { fill: '#fff' }); emo(e[1], 762 + i * 178, 295, 50); txt(e[0], 762 + i * 178, 355, { size: 18, weight: 'bold' }); });
      });
      const f = [['⚡', 'Energía'], ['🧱', 'Estructura'], ['🛡️', 'Protección'], ['🌡️', 'Aislante'], ['⚙️', 'Regulación'], ['🚚', 'Transporte']];
      f.forEach((e, i) => pop(T.p(3, 0.5, 0.3 + i * 0.4), 145 + i * 198, 495, () => { box(65 + i * 198, 430, 160, 130, { fill: '#fff' }); emo(e[0], 145 + i * 198, 480, 48); txt(e[1], 145 + i * 198, 535, { size: 19, weight: 'bold' }); }));
    });
    const e = T.p(4, 0.8);
    if (e > 0) grp(e, () => {
      const sc = T.p(4, 2.5, 1.5);
      drawVirus(420, 340, 140, sc, 1);
      emo('🧼', lerp(150, 330, T.p(4, 1.2, 0.5)), 470, 90);
      emo('🙌', 900, 300, 120);
      txt('¡Lávate las manos!', 900, 420, { size: 44, weight: 'bold', color: C.blue, stroke: 6 });
      txt('¡Hasta la próxima! 👋', 900, 490, { size: 34, weight: 'bold', color: C.dgreen, alpha: T.p(4, 0.6, 3) });
    });
  },
});
