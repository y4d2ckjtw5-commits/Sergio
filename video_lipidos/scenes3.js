// Escenas 3: lípidos simples, complejos, insaponificables y funciones

// ---------- 12. ACILGLICÉRIDOS ----------
function faRow(xEnd, y, n, seg, o = {}) { // ácido graso cuyo extremo COOH queda en xEnd
  const pts = zigzag(0, 0, n, seg, 0, { bends: o.bends });
  const dx = xEnd - pts[n][0], dy = y - pts[n][1];
  const q = pts.map(p => [p[0] + dx, p[1] + dy]);
  drawPts(q, { lw: o.lw || 4, color: o.color || '#B9860F', doubles: o.doubles, alpha: o.alpha });
  return q;
}
SCENES.push({
  title: '3. Lípidos saponificables simples',
  lines: [
    'Pasamos a los lípidos saponificables. Todos son ésteres de ácidos grasos con un alcohol.',
    'Los más sencillos son los lípidos simples, u hololípidos. Los primeros son los acilglicéridos, o grasas: ésteres de la glicerina con uno, dos o tres ácidos grasos.',
    'La glicerina es un alcohol con tres grupos OH. Cada uno puede unirse a un ácido graso mediante un enlace éster, liberando una molécula de agua.',
    'Con un ácido graso se forma un monoacilglicérido; con dos, un diacilglicérido; y con tres, un triacilglicérido, o triglicérido.',
    'Los mono y diacilglicéridos tienen algo de polaridad, por sus OH libres. Pero los triglicéridos no tienen ninguno: son apolares, insolubles en agua, y se llaman grasas neutras. Flotan en el agua.',
    'En nuestro cuerpo, unas enzimas llamadas lipasas, del estómago y del intestino, rompen los enlaces éster por hidrólisis, y liberan los ácidos grasos y la glicerina.',
    'Y si la hidrólisis se hace con una base, es decir, por saponificación, se obtiene jabón y glicerina.',
  ],
  draw(T) {
    pop(T.p(0), 640, 120, () => { box(240, 92, 800, 56, { fill: '#fff' }); txt('Saponificables = ácidos grasos + alcohol (unidos por enlaces éster)', 640, 120, { size: 23, weight: 'bold', color: C.dgreen }); });
    const gp = T.p(1, 0.8, 2);
    const gx = 700;
    grp(gp, () => {
      vbar(gx, 180, 56, 330, 'GLICERINA', '#BFD8F6');
      txt('(propanotriol)', gx + 28, 530, { size: 18, color: C.grey });
    });
    // tres ácidos grasos que se unen
    const ys = [215, 345, 475];
    const join = [T.p(2, 1.5, 1.2), T.p(3, 1.3, 0.3), T.p(3, 1.3, 2.6)];
    const cut = T.p(5, 1.6, 1.5) * (1 - T.p(6, 0.5) * 0);
    ys.forEach((y, i) => {
      const j = join[i], off = lerp(-420, 0, j) - cut * 160;
      grp(gp, () => {
        // OH de la glicerina (desaparece al unirse; reaparece al hidrolizar)
        txt('HO–', gx - 26, y, { size: 26, weight: 'bold', color: C.red, alpha: 1 - clamp(j * 3 - 2) + cut });
        if (j > 0 || T.c(2) > 0) {
          X.save(); X.translate(off, 0);
          faRow(gx - 70, y, 13, 30, { doubles: i === 1 ? [] : [] });
          txt('C', gx - 58, y, { size: 26, weight: 'bold' }); txt('=O', gx - 58, y - 30, { size: 20, weight: 'bold', color: C.red });
          X.restore();
          grp(clamp(j * 3 - 2) * (1 - cut), () => { txt('–O–', gx - 22, y + 2, { size: 24, weight: 'bold', color: C.purple }); });
        }
        // agua liberada
        const w = clamp(j * 2 - 1);
        if (w > 0 && w < 1) { txt('💧H₂O', gx + 120 + w * 80, y - w * 60, { size: 26, weight: 'bold', color: C.blue, alpha: 1 - w }); }
      });
    });
    grp(T.p(2, 0.6, 2.5) * (1 - T.p(3)), () => txt('enlace éster', gx - 22, 270, { size: 20, weight: 'bold', color: C.purple }));
    // contador mono/di/tri
    const labels = [['MONOacilglicérido', 0], ['DIacilglicérido', 1], ['TRIacilglicérido (triglicérido)', 2]];
    const nj = join.filter(j => j >= 1).length;
    if (T.c(3) > 0 && nj > 0) grp(1 - T.p(5, 0.5), () => {
      box(830, 260, 410, 120, { fill: '#fff', stroke: C.green, lw: 3 });
      txt(`${nj} ácido${nj > 1 ? 's' : ''} graso${nj > 1 ? 's' : ''}`, 1035, 295, { size: 24 });
      txt(labels[nj - 1][0], 1035, 340, { size: nj === 3 ? 22 : 26, weight: 'bold', color: C.dgreen });
    });
    grp(T.p(4) * (1 - T.p(5, 0.5)), () => {
      box(830, 400, 410, 150, { fill: C.lyellow, stroke: C.orange, lw: 3 });
      txt('Sin OH libres → APOLAR', 1035, 435, { size: 23, weight: 'bold', color: '#B5651D' });
      txt('GRASA NEUTRA', 1035, 475, { size: 28, weight: 'bold' }); txt('insoluble · flota en el agua', 1035, 515, { size: 20 });
    });
    grp(T.p(5, 0.6), () => {
      emo('✂️', gx - 45, 280, 44);
      box(830, 260, 410, 150, { fill: '#fff', stroke: C.purple, lw: 3 });
      txt('HIDRÓLISIS ENZIMÁTICA', 1035, 290, { size: 22, weight: 'bold', color: C.purple });
      txt('Lipasas (estómago e intestino)', 1035, 330, { size: 20 });
      txt('→ ácidos grasos + glicerina', 1035, 370, { size: 22, weight: 'bold' });
    });
    pop(T.p(6), 1035, 490, () => {
      box(830, 430, 410, 120, { fill: C.lpurple, stroke: C.purple, lw: 3 });
      txt('+ NaOH (saponificación)', 1035, 465, { size: 22, weight: 'bold', color: C.purple });
      txt('→ JABÓN 🧼 + glicerina', 1035, 510, { size: 24, weight: 'bold' });
    });
  },
});

// ---------- 13. GRASAS: FUNCIÓN Y TIPOS ----------
SCENES.push({
  title: '3.1. Triglicéridos: reserva de energía',
  lines: [
    'Los triglicéridos son una gran reserva de energía. Los vegetales los guardan en vacuolas, sobre todo en frutos y semillas, y los animales, en unas células llamadas adipocitos.',
    'También sirven de aislante térmico en animales que viven en lugares fríos, y de protección mecánica, recubriendo órganos como el corazón.',
    'Las grasas de origen animal tienen ácidos grasos saturados, con puntos de fusión altos. A temperatura ambiente son sólidas, como la mantequilla, el sebo de buey o el tocino.',
    'Las grasas de origen vegetal, los aceites, tienen ácidos grasos insaturados, con puntos de fusión bajos: son líquidas. Por ejemplo, el aceite de oliva, formado por glicerina y tres ácidos oleicos.',
  ],
  draw(T) {
    pop(T.p(0), 330, 220, () => {
      box(60, 95, 560, 240, { fill: '#fff' });
      // adipocito
      circ(200, 210, 95, { fill: '#FCE7C8', stroke: '#E0B080', lw: 3 }); circ(200, 210, 75, { fill: C.yellow });
      circ(265, 270, 14, { fill: C.purple }); txt('grasa', 200, 210, { size: 22, weight: 'bold', color: '#8A6400' });
      txt('Adipocito', 200, 320, { size: 20, weight: 'bold' });
      emo('🌰', 450, 180, 60); emo('🥑', 540, 180, 60); txt('vacuolas de', 495, 250, { size: 19 }); txt('frutos y semillas', 495, 275, { size: 19 });
    });
    slide(T.p(1), 60, 0, () => {
      box(660, 95, 560, 240, { fill: '#fff' });
      emo('🐻‍❄️', 760, 180, 70); txt('Aislante térmico', 760, 260, { size: 21, weight: 'bold' });
      emo('❤️', 1080, 180, 64); txt('Protección de órganos', 1080, 260, { size: 21, weight: 'bold' });
      line(940, 120, 940, 310, { color: '#ddd', lw: 2 });
    });
    slide(T.p(2), -60, 0, () => {
      box(60, 355, 560, 235, { fill: C.lorange, stroke: C.orange, lw: 3 });
      txt('Grasas ANIMALES', 340, 388, { size: 27, weight: 'bold', color: '#B5651D' });
      txt('saturadas · P.F. alto · SÓLIDAS', 340, 425, { size: 21 });
      ['🧈', '🥓', '🐄'].forEach((e, i) => emo(e, 210 + i * 130, 500, 64));
      txt('mantequilla · tocino · sebo', 340, 565, { size: 19 });
    });
    slide(T.p(3), 60, 0, () => {
      box(660, 355, 560, 235, { fill: C.lgreen, stroke: C.green, lw: 3 });
      txt('Grasas VEGETALES (aceites)', 940, 388, { size: 27, weight: 'bold', color: C.dgreen });
      txt('insaturadas · P.F. bajo · LÍQUIDAS', 940, 425, { size: 21 });
      ['🫒', '🌻', '🌽'].forEach((e, i) => emo(e, 810 + i * 130, 500, 64));
      txt('aceite de oliva = glicerina + 3 ác. oleicos', 940, 565, { size: 19 });
    });
  },
});

// ---------- 14. CERAS ----------
SCENES.push({
  title: '3.2. Céridos o ceras',
  lines: [
    'El otro tipo de lípido simple son los céridos, o ceras.',
    'Son ésteres de un ácido graso de cadena larga con un monoalcohol, es decir, un alcohol con un solo OH, también de cadena larga.',
    'Como las dos partes son largas y apolares, son totalmente insolubles en agua. Por eso son perfectas para impermeabilizar.',
    'Las encontramos en la piel, el pelo y las plumas de los animales, en las hojas y los frutos de las plantas, y en la cera que fabrican las abejas.',
  ],
  draw(T) {
    pop(T.p(0), 640, 150, () => { emo('🕯️', 520, 150, 80); txt('CERAS', 680, 150, { size: 60, weight: 'bold', color: '#B9860F' }); });
    const bp = T.p(1, 1.2);
    grp(bp * (1 - T.p(3, 0.5) * 0.0), () => {
      const y = 290;
      const a = zigzag(215, y, 15, 26, 0); drawPts(a, { lw: 5, color: '#B9860F', p: bp });
      const b = zigzag(720, y, 17, 30, 0); drawPts(b, { lw: 5, color: C.blue, p: bp });
      txt('–CO–O–', 660, y - 4, { size: 26, weight: 'bold', color: C.purple });
      txt('Ácido graso (cadena larga)', 370, y + 55, { size: 21, weight: 'bold', color: '#B9860F' });
      txt('Monoalcohol (cadena larga)', 960, y + 55, { size: 21, weight: 'bold', color: C.blue });
    });
    const wp = T.p(2, 0.6);
    if (wp > 0) grp(wp * (1 - T.p(3, 0.5)), () => {
      // hoja encerada con gotas que resbalan
      X.save(); X.fillStyle = '#7FBF4D'; X.beginPath(); X.ellipse(640, 500, 380, 55, -0.05, 0, 2 * PI); X.fill(); X.restore();
      X.save(); X.strokeStyle = '#F8F2C0'; X.globalAlpha *= 0.8; X.lineWidth = 6; X.beginPath(); X.ellipse(640, 492, 370, 50, -0.05, PI * 1.1, PI * 1.9); X.stroke(); X.restore();
      txt('capa de cera', 640, 515, { size: 20, weight: 'bold', color: '#fff' });
      for (let i = 0; i < 6; i++) {
        const ph = (T.c(2) * 0.5 + i / 6) % 1;
        const x = 300 + i * 120 + ph * 60, y = ph < 0.5 ? lerp(380, 440, ph * 2) : 440 - Math.sin((ph - 0.5) * 2 * PI) * 30;
        X.save(); X.fillStyle = 'rgba(80,160,230,0.85)'; X.beginPath(); X.ellipse(x, y, 16, 14, 0, 0, 2 * PI); X.fill(); X.restore();
      }
      txt('💧 El agua resbala: ¡impermeable!', 640, 395, { size: 26, weight: 'bold', color: C.blue, alpha: 0 });
    });
    const items = [['🐑', 'pelo'], ['🪶', 'plumas'], ['🍃', 'hojas'], ['🍎', 'frutos'], ['🐝', 'cera de abeja'], ['🖐️', 'piel']];
    items.forEach((it, i) => pop(T.p(3, 0.5, i * 0.4), 165 + i * 190, 470, () => {
      box(95 + i * 190, 405, 140, 150, { fill: '#fff' }); emo(it[0], 165 + i * 190, 460, 60); txt(it[1], 165 + i * 190, 525, { size: 19, weight: 'bold' });
    }));
  },
});

// ---------- 15. LÍPIDOS COMPLEJOS ----------
function gDiag(x, y, kind, s = 1) { // esquema de glicerolípido
  X.save(); X.translate(x, y); X.scale(s, s);
  pill(-60, 20, 90, 40, 'Ác. graso', C.lyellow, { size: 15, r: 10, shadow: false });
  pill(-60, 75, 90, 40, 'Ác. graso', C.lyellow, { size: 15, r: 10, shadow: false });
  vbar(0, 0, 34, 140, 'Glicerol', '#BFD8F6');
  if (kind === 'P') { pill(75, 120, 56, 36, 'PO₄', '#FFD08A', { size: 15, shadow: false }); pill(130, 120, 36, 36, 'R', '#fff', { size: 15, stroke: C.ink, shadow: false }); }
  else { hexa(85, 120, 22, C.pink); txt('glúcido', 85, 158, { size: 14 }); }
  X.restore();
}
function sDiag(x, y, kind, s = 1, sugars = 1) { // esquema de esfingolípido
  X.save(); X.translate(x, y); X.scale(s, s);
  box(-80, 0, 114, 30, { fill: '#BFD8F6', r: 10, shadow: false }); vbar(0, 0, 34, 140, 'Esfingosina', '#BFD8F6');
  pill(-60, 75, 90, 40, 'Ác. graso', C.lyellow, { size: 15, r: 10, shadow: false });
  if (kind === 'P') { pill(75, 120, 56, 36, 'PO₄', '#FFD08A', { size: 15, shadow: false }); pill(130, 120, 36, 36, 'R', '#fff', { size: 15, stroke: C.ink, shadow: false }); }
  else {
    hexa(70, 125, 18, C.pink);
    if (sugars > 1) { hexa(108, 125, 16, '#7FCB6B'); hexa(144, 125, 16, '#7FCB6B'); hexa(144, 90, 16, '#7FCB6B'); hexa(178, 125, 16, '#9EE0F0'); hexa(178, 60, 14, '#9EE0F0'); }
  }
  X.restore();
}
SCENES.push({
  title: '4. Lípidos saponificables complejos',
  lines: [
    'Los lípidos complejos, o heterolípidos, tienen ácidos grasos, un alcohol, y además otra molécula: un ácido fosfórico, o un glúcido.',
    'Si llevan ácido fosfórico, se llaman fosfolípidos. Si llevan un glúcido, se llaman glucolípidos.',
    'Y según su alcohol sea la glicerina o la esfingosina, tenemos cuatro grupos: glicerofosfolípidos, esfingofosfolípidos, gliceroglucolípidos y esfingoglucolípidos.',
    'Todos son moléculas anfipáticas, así que al disolverse en agua forman bicapas y micelas.',
  ],
  draw(T) {
    pop(T.p(0), 640, 125, () => {
      box(390, 95, 500, 60, { fill: C.yellow }); txt('LÍPIDOS COMPLEJOS', 640, 125, { size: 30, weight: 'bold' });
      txt('ácidos grasos + alcohol + (ácido fosfórico o glúcido)', 640, 180, { size: 23 });
    });
    slide(T.p(1), -60, 0, () => { box(60, 210, 560, 60, { fill: C.orange, r: 14 }); txt('FOSFOLÍPIDOS  (ácido fosfórico)', 340, 240, { size: 24, weight: 'bold', color: '#fff' }); });
    slide(T.p(1, 0.7, 1.5), 60, 0, () => { box(660, 210, 560, 60, { fill: C.pink, r: 14 }); txt('GLUCOLÍPIDOS  (glúcido)', 940, 240, { size: 24, weight: 'bold', color: '#fff' }); });
    const cells = [
      [200, 'Glicerofosfolípidos', () => gDiag(200, 345, 'P', 0.95)],
      [480, 'Esfingofosfolípidos', () => sDiag(470, 345, 'P', 0.95)],
      [800, 'Gliceroglucolípidos', () => gDiag(800, 345, 'G', 0.95)],
      [1080, 'Esfingoglucolípidos', () => sDiag(1070, 345, 'G', 0.95)],
    ];
    cells.forEach((c, i) => pop(T.p(2, 0.6, 0.8 + i * 1.2), c[0], 430, () => {
      box(c[0] - 135, 285, 270, 230, { fill: i < 2 ? C.lorange : C.lpink, shadow: false });
      txt(c[1], c[0], 307, { size: 19, weight: 'bold' }); c[2]();
    }));
    grp(T.p(3) , () => {
      box(60, 528, 1160, 64, { fill: '#fff' });
      txt('Todos anfipáticos →', 260, 560, { size: 22, weight: 'bold', color: C.dgreen });
      bilayer(400, 540, 360, 0.5, { head: C.orange });
      micelle(860, 560, 24, 14, 0.45, { head: C.pink });
      txt('bicapas y micelas', 1030, 560, { size: 22, weight: 'bold', color: C.dgreen });
    });
  },
});

// ---------- 16. GLICEROFOSFOLÍPIDOS ----------
SCENES.push({
  title: '4.1. Glicerofosfolípidos',
  lines: [
    'Los glicerofosfolípidos tienen una glicerina unida, por sus carbonos uno y dos, a dos ácidos grasos: normalmente, uno saturado y otro insaturado.',
    'Y por el carbono tres, se une a un ácido fosfórico. Esta molécula se llama ácido fosfatídico.',
    'Las colas de los ácidos grasos forman la parte apolar, y la glicerina con el fosfato forma la cabeza polar.',
    'Al fosfato se le puede unir otra molécula polar, que llamamos R. Según cuál sea, obtenemos distintos fosfolípidos.',
    'Con colina se forma la fosfatidilcolina, o lecitina, en la cara externa de las membranas. Con etanolamina, la cefalina. Y con serina, la fosfatidilserina, que ayuda a reparar la red neuronal.',
    'Con inositol se forma el fosfatidilinositol, que participa en la comunicación celular. Y las cardiolipinas abundan en las mitocondrias del corazón.',
  ],
  draw(T) {
    const gx = 520;
    grp(T.p(0, 0.6), () => {
      vbar(gx, 160, 50, 260, 'Glicerina', '#BFD8F6');
      ['C1', 'C2', 'C3'].forEach((c, i) => txt(c, gx + 25, 185 + i * 95, { size: 16, weight: 'bold', color: C.blue, alpha: 0 }));
      const p = T.p(0, 1.5, 0.8);
      faRow(gx - 40, 200, 12, 30, { alpha: p });
      faRow(gx - 40, 300, 12, 30, { alpha: p, bends: { 5: -0.4, 7: 0.4 }, doubles: [4] });
      grp(p, () => { txt('–O–', gx - 18, 200, { size: 20, weight: 'bold', color: C.purple }); txt('–O–', gx - 18, 300, { size: 20, weight: 'bold', color: C.purple }); txt('saturado', 260, 165, { size: 18, color: C.grey }); txt('insaturado', 260, 350, { size: 18, color: C.grey }); });
    });
    pop(T.p(1), gx + 110, 395, () => {
      line(gx + 50, 395, gx + 85, 395, { lw: 4 }); ball(gx + 115, 395, 32, C.orange, 'P', { size: 28 });
      txt('fosfato', gx + 115, 445, { size: 18, weight: 'bold', color: '#B5651D' });
    });
    grp(T.p(1, 0.6, 1.5) * (1 - T.p(3, 0.5)), () => { box(140, 470, 420, 60, { fill: C.lorange }); txt('= ÁCIDO FOSFATÍDICO', 350, 500, { size: 26, weight: 'bold', color: '#B5651D' }); });
    grp(T.p(2), () => {
      X.save(); X.setLineDash([8, 6]); X.strokeStyle = C.blue; X.lineWidth = 3; X.beginPath(); X.ellipse(gx + 70, 300, 130, 175, 0, 0, 2 * PI); X.stroke(); X.restore();
      txt('Parte POLAR', gx + 70, 112, { size: 22, weight: 'bold', color: C.blue });
      box(120, 120, 340, 230, { fill: 'rgba(246,201,69,0.12)', stroke: '#B9860F', dash: [8, 6], shadow: false });
      txt('Parte APOLAR', 290, 112, { size: 22, weight: 'bold', color: '#B9860F' });
    });
    const Rs = ['colina', 'etanolamina', 'serina', 'inositol', 'glicerina'];
    pop(T.p(3), gx + 190, 395, () => {
      line(gx + 147, 395, gx + 170, 395, { lw: 4 });
      const k = Math.floor(Math.max(0, T.c(3)) / 1.6) % Rs.length;
      box(gx + 170, 370, 120, 50, { fill: '#fff', stroke: C.ink }); txt('R', gx + 230, 395, { size: 26, weight: 'bold' });
      txt(Rs[k], gx + 230, 440, { size: 18, color: C.purple, weight: 'bold' });
    });
    // tabla
    const rows = [
      ['Fosfatidilcolina (lecitina)', 'colina', 'cara externa de las membranas', 4],
      ['Fosfatidiletanolamina (cefalina)', 'etanolamina', 'membranas (procariotas y cara interna)', 4],
      ['Fosfatidilserina', 'serina', 'red neuronal · membranas fluidas', 4],
      ['Fosfatidilinositol', 'inositol', 'comunicación celular', 5],
      ['Cardiolipinas', 'glicerina', 'mitocondrias del corazón ❤️', 5],
    ];
    rows.forEach((r, i) => slide(T.p(r[3], 0.5, (i % 3) * 1.8 + (r[3] === 5 ? -0 : 0)), 60, 0, () => {
      const y = 110 + i * 96;
      box(850, y, 390, 86, { fill: '#fff', stroke: C.orange, lw: 2 });
      txt(r[0], 865, y + 22, { size: 18, weight: 'bold', align: 'left' });
      txt('R = ' + r[1], 865, y + 47, { size: 16, color: C.purple, align: 'left' });
      txt(r[2], 865, y + 70, { size: 15, color: C.ink, align: 'left' });
    }));
  },
});

// ---------- 17. ESFINGOFOSFOLÍPIDOS ----------
function neuron(x, y, s, t) {
  X.save(); X.translate(x, y); X.scale(s, s);
  X.strokeStyle = '#8E7BC9'; X.lineWidth = 6; X.lineCap = 'round';
  for (let i = 0; i < 7; i++) { const a = PI * 0.6 + i * 0.25; X.beginPath(); X.moveTo(0, 0); X.quadraticCurveTo(70 * Math.cos(a) - 20, 70 * Math.sin(a), 110 * Math.cos(a), 110 * Math.sin(a)); X.stroke(); }
  circ(0, 0, 40, { fill: '#B7A6EE' }); circ(0, 0, 15, { fill: '#7A5BC7' });
  X.lineWidth = 8; X.beginPath(); X.moveTo(35, 0); X.lineTo(470, 0); X.stroke();
  for (let i = 0; i < 6; i++) { const mx = 70 + i * 68; box(mx, -16, 56, 32, { fill: '#F7E9B0', stroke: '#D8B44A', r: 16, shadow: false }); }
  // impulso nervioso
  const px = 40 + ((t * 160) % 440); circ(px, 0, 9, { fill: '#FFEB3B', alpha: 0.9 });
  X.restore();
}
SCENES.push({
  title: '4.2. Esfingofosfolípidos',
  lines: [
    'Los esfingolípidos usan otro alcohol: la esfingosina, una molécula de cadena larga que tiene un grupo amino.',
    'Cuando la esfingosina se une a un ácido graso a través de su grupo amino, se forma la ceramida, que es la unidad básica de todos los esfingolípidos.',
    'Si a la ceramida le unimos un grupo fosfato y un segundo alcohol, como la colina, obtenemos una esfingomielina.',
    'Las esfingomielinas abundan en el tejido nervioso: forman las vainas de mielina, que recubren los axones de las neuronas.',
  ],
  draw(T) {
    pop(T.p(0), 300, 230, () => {
      box(120, 170, 380, 36, { fill: '#BFD8F6', r: 12, shadow: false });
      const z = zigzag(140, 188, 11, 28, 0); drawPts(z, { lw: 3, color: C.blue });
      vbar(440, 170, 60, 250, '', '#BFD8F6');
      txt('–OH', 540, 230, { size: 22, weight: 'bold', color: C.red }); txt('–NH₂', 545, 310, { size: 22, weight: 'bold', color: C.blue, alpha: 1 - T.p(1) });
      txt('ESFINGOSINA', 310, 150, { size: 24, weight: 'bold', color: C.blue });
    });
    const fp = T.p(1, 1.2);
    if (fp > 0) {
      X.save(); X.translate(lerp(-300, 0, fp), 0);
      faRow(430, 310, 11, 28, {}); txt('ácido graso', 270, 360, { size: 20, weight: 'bold', color: '#B9860F' });
      X.restore();
      grp(T.p(1, 0.6, 1.5), () => {
        txt('–NH–', 470, 290, { size: 18, weight: 'bold', color: C.purple });
        X.save(); X.strokeStyle = C.dgreen; X.lineWidth = 4; X.beginPath(); X.moveTo(110, 440); X.lineTo(110, 455); X.lineTo(510, 455); X.lineTo(510, 440); X.stroke(); X.restore();
        txt('CERAMIDA (parte apolar)', 310, 485, { size: 26, weight: 'bold', color: C.dgreen });
      });
    }
    pop(T.p(2), 560, 410, () => {
      line(470, 420, 520, 420, { lw: 4 }); ball(545, 420, 26, C.orange, 'P', { size: 24 }); line(571, 420, 600, 420, { lw: 4 });
      ball(625, 420, 26, C.green, 'Col', { size: 15 });
      txt('fosfato + colina', 585, 470, { size: 18, weight: 'bold' });
      box(150, 520, 460, 60, { fill: C.lorange }); txt('= ESFINGOMIELINA', 380, 550, { size: 28, weight: 'bold', color: '#B5651D' });
    });
    pop(T.p(3), 950, 330, () => {
      box(700, 110, 540, 430, { fill: '#fff' });
      txt('Neurona 🧠', 970, 145, { size: 26, weight: 'bold', color: C.purple });
      neuron(790, 330, 0.85, T.t);
      txt('vaina de mielina', 1020, 405, { size: 22, weight: 'bold', color: '#B9860F' }); arrow(1020, 385, 1000, 345, { color: '#B9860F' });
      txt('aísla el axón → impulso más rápido ⚡', 970, 500, { size: 20 });
    });
  },
});

// ---------- 18. GLUCOLÍPIDOS ----------
SCENES.push({
  title: '4.3 y 4.4. Glucolípidos',
  lines: [
    'Los gliceroglucolípidos tienen glicerina unida a dos ácidos grasos y, por el carbono tres, a un monosacárido, mediante un enlace O-glucosídico. Están en las membranas de bacterias y células vegetales.',
    'Los esfingoglucolípidos son una ceramida unida a un glúcido. Están en la cara externa de las membranas, formando el glucocálix.',
    'Allí actúan como señales para que las células se reconozcan, y como lugares de anclaje de microorganismos.',
    'Los cerebrósidos llevan un solo monosacárido, glucosa o galactosa. Están en las células de la piel, donde crean una barrera que controla la pérdida de agua.',
    ['Los gangliósidos llevan una cadena ramificada de azúcares con ácido N-acetilneuramínico (NANA). Están en las neuronas y actúan como receptores en la transmisión del impulso nervioso.', 'Los gangliósidos llevan una cadena ramificada de azúcares, con ácido ene acetil neuramínico. Están en las neuronas, y actúan como receptores en la transmisión del impulso nervioso.'],
    'Y además, algunos esfingoglucolípidos de la membrana de los glóbulos rojos determinan nuestro grupo sanguíneo.',
  ],
  draw(T) {
    pop(T.p(0), 210, 230, () => {
      box(50, 95, 340, 245, { fill: C.lpink, shadow: false });
      txt('Gliceroglucolípidos', 220, 120, { size: 21, weight: 'bold' });
      gDiag(200, 150, 'G', 0.9); txt('🦠 bacterias · 🌿 vegetales', 220, 320, { size: 17 });
    });
    pop(T.p(3), 600, 230, () => {
      box(420, 95, 360, 245, { fill: C.lpink, shadow: false });
      txt('Cerebrósidos', 600, 120, { size: 22, weight: 'bold', color: C.pink });
      sDiag(570, 150, 'G', 0.9, 1); txt('glucosa o galactosa', 640, 295, { size: 15 });
      txt('🧴 piel: barrera de agua', 600, 320, { size: 18 });
    });
    pop(T.p(4), 1010, 230, () => {
      box(810, 95, 420, 245, { fill: C.lpink, shadow: false });
      txt('Gangliósidos', 1010, 120, { size: 22, weight: 'bold', color: C.pink });
      sDiag(950, 150, 'G', 0.9, 3); txt('NANA', 1140, 185, { size: 15, weight: 'bold', color: C.teal });
      txt('🧠 neuronas: receptores', 1010, 320, { size: 18 });
    });
    // membrana con glucocálix
    const mp = T.p(1);
    if (mp > 0) grp(mp, () => {
      box(50, 360, 830, 230, { fill: '#FFF0F0', shadow: false });
      bilayer(60, 470, 810, 0.75, { head: C.blue });
      for (let i = 0; i < 9; i++) {
        const x = 100 + i * 88, h = T.p(1, 1, 0.5 + i * 0.15);
        line(x, 470, x, 470 - 70 * h, { color: '#7FCB6B', lw: 3 });
        for (let k = 0; k < 3; k++) if (h > k / 3) hexa(x + (k === 2 ? (i % 2 ? 14 : -14) : 0), 455 - k * 22, 9, k === 0 ? C.pink : '#7FCB6B');
      }
      txt('GLUCOCÁLIX', 465, 380, { size: 22, weight: 'bold', color: C.dgreen });
      txt('cara externa de la membrana', 465, 575, { size: 18, color: C.grey });
    });
    if (T.c(2) > 0) {
      const q = T.p(2, 2);
      [[150, 0], [640, 1], [800, 2]].forEach(([x, i]) => { emo('🦠', x + 40 * (1 - q) * (i - 1), lerp(330, 395, q), 38); });
      grp(T.p(2, 0.6, 1.5), () => { box(580, 300, 0, 0); });
      pop(T.p(2, 0.6, 1.5), 465, 330, () => {});
    }
    pop(T.p(5), 1060, 470, () => {
      box(900, 360, 330, 230, { fill: '#fff' });
      drop(1065, 470, 0.95, C.red);
      ['A', 'B', 'AB', '0'].forEach((g, i) => txt(g, [960, 1170, 950, 1180][i], [420, 420, 530, 530][i], { size: 30, weight: 'bold', color: C.red }));
      txt('grupos sanguíneos', 1065, 572, { size: 18, weight: 'bold' });
    });
  },
});
