// Escenas 2: sótano, planta baja, planta primera y cubierta

// Planta (vista superior) en L: f(x,y) en metros -> píxeles
function planF(ox, oy, S) { return (x, y) => [ox + x * S, oy + y * S]; }
function room(f, x0, y0, x1, y1, col, label, p, o = {}) {
  if (p <= 0) return;
  const a = f(x0, y0), b = f(x1, y1);
  pop(p, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2, () => {
    box(a[0], a[1], b[0] - a[0], b[1] - a[1], { fill: col, r: 3, shadow: false, stroke: C.ink, lw: 2 });
    const ls = Array.isArray(label) ? label : [label];
    if (o.emo) emo(o.emo, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2 - 12 * ls.length - 6, o.es || 26);
    ls.forEach((l, i) => txt(l, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + (i - (ls.length - 1) / 2) * 20 + (o.emo ? 10 : 0), { size: o.size || 16, weight: 'bold' }));
  });
}
function planOutline(f, pts, o = {}) { poly(pts.map(p => f(...p)), { fill: o.fill || '#fff', stroke: C.ink, lw: 6 }); }
function car(x, y, col, s = 1) {
  X.save(); X.translate(x, y); X.scale(s, s);
  box(-14, -24, 28, 48, { fill: col, r: 8, shadow: false, stroke: shade(col, -0.3), lw: 1.5 });
  box(-10, -12, 20, 12, { fill: '#DDEFFA', r: 3, shadow: false }); X.restore();
}
function coreRoom(f, p) { room(f, 7, 5, 11, 10, C.yellow, ['Escalera', '+ ascensor'], p, { size: 14 }); }

// ---------- 8. SÓTANO: PROGRAMA ----------
SCENES.push({
  title: 'Sótano (PS) · ¿Qué contiene?',
  lines: [
    'El sótano es un aparcamiento de vehículos ligeros, con una rampa de acceso.',
    'Además de ascensor y escalera, tiene salas de instalaciones: grupo de presión contra incendios, bombeo de aguas residuales y captación de agua freática.',
    V('El depósito contra incendios es de 12 m³, y su parte superior queda 0,5 m por debajo de la altura libre del forjado.', 'El depósito contra incendios es de doce metros cúbicos, y su parte superior queda cero coma cinco metros por debajo de la altura libre del forjado.'),
    'También hay un espacio para los racks de la instalación de voz y datos.',
    V('Y una sala de archivo de 30 m².', 'Y una sala de archivo de treinta metros cuadrados.'),
    'Las particiones se dibujan, pero no hace falta representar los equipos.',
  ],
  draw(t) {
    const f = planF(90, 100, 19.5);
    planOutline(f, LPLAN, { fill: '#EEF0F2' });
    grp(t.p(0), () => {
      for (let i = 0; i < 5; i++) car(...f(13.2 + i * 2.6, 2.6), [C.blue, C.red, C.teal, C.orange, C.purple][i], 0.95);
      for (let i = 0; i < 2; i++) car(...f(1.6 + i * 2.6, 2.6), [C.green, C.pink][i], 0.95);
      txt('APARCAMIENTO', ...f(18, 7.3), { size: 18, weight: 'bold', color: C.grey });
      // rampa
      const a = f(25, 5.5), b = f(31, 9.5);
      X.save(); X.beginPath(); X.rect(a[0], a[1], b[0] - a[0], b[1] - a[1]); X.fillStyle = '#C9CDD2'; X.fill(); X.clip();
      X.strokeStyle = '#9AA0A6'; X.lineWidth = 2; for (let k = 0; k < 10; k++) line(a[0] + k * 13, a[1], a[0] + k * 13, b[1], { color: '#A8AEB4', lw: 2 }); X.restore();
      arrow(b[0] - 10, (a[1] + b[1]) / 2, a[0] + 8, (a[1] + b[1]) / 2, { color: C.ink, lw: 3 });
      txt('Rampa', (a[0] + b[0]) / 2, a[1] - 14, { size: 17, weight: 'bold' });
    });
    coreRoom(f, t.p(1));
    room(f, 0, 10, 6, 15, C.lblue2, ['Grupo presión', 'PCI + depósito'], t.p(1, 0.6, 0.3), { size: 13 });
    room(f, 6, 10, 11, 15, C.lpurple, ['Bombeo', 'residuales', '+ freático'], t.p(1, 0.6, 0.6), { size: 13 });
    room(f, 6, 15, 11, 20, C.lorange, ['Racks', 'voz y datos'], t.p(3), { size: 14 });
    room(f, 0, 15, 6, 20, C.lyellow, ['ARCHIVO', '30 m²'], t.p(4), { size: 16 });
    // depósito
    grp(t.p(2), () => {
      const x0 = 780, yT = 140, yB = 470;
      box(740, 110, 470, 400, { fill: '#fff' });
      box(x0 - 20, yT - 22, 400, 22, { fill: C.concrete, r: 0, shadow: false }); txt('Forjado (cara inferior)', x0 + 180, yT - 11, { size: 14, weight: 'bold' });
      box(x0 - 20, yB, 400, 18, { fill: C.concrete, r: 0, shadow: false }); txt('Losa', x0 + 180, yB + 9, { size: 14, weight: 'bold' });
      const top = yT + 70;
      box(x0 + 40, top, 230, yB - top, { fill: '#7FBDE8', r: 8, shadow: false, stroke: C.blue, lw: 3 });
      emo('🔥', x0 + 155, top + 70, 34); txt('Depósito PCI', x0 + 155, top + 130, { size: 20, weight: 'bold', color: '#fff' }); txt('12 m³', x0 + 155, top + 165, { size: 30, weight: 'bold', color: '#fff' });
      arrow(x0 + 320, yT + 4, x0 + 320, top - 2, { color: C.red, lw: 2.5, hs: 8 }); arrow(x0 + 320, top - 2, x0 + 320, yT + 4, { color: C.red, lw: 2.5, hs: 8 });
      txt('0,5 m', x0 + 333, (yT + top) / 2, { size: 20, weight: 'bold', color: C.red, align: 'left' });
      line(x0 + 270, top, x0 + 340, top, { color: C.red, lw: 1.5, dash: [4, 4] });
    });
    slide(t.p(5), 0, 20, () => { box(760, 525, 430, 60, { fill: C.lyellow }); txt('Particiones sí · equipos no', 975, 555, { size: 22, weight: 'bold' }); });
  }
});

// ---------- 9. SÓTANO: CONSTRUCCIÓN ----------
SCENES.push({
  title: 'Sótano (PS) · Construcción',
  lines: [
    'La cimentación es una losa de hormigón armado de al menos 50 centímetros, en múltiplos de 5.',
    'El cerramiento exterior es un muro de hormigón armado de al menos 30 centímetros.',
    V('El pavimento es la propia losa, tratada con dos capas de resina epoxi, unos 2 mm: un suelo industrial.', 'El pavimento es la propia losa, tratada con dos capas de resina epoxi, de unos dos milímetros: un suelo de tipo industrial.'),
    'Las paredes van pintadas y el techo queda visto.',
    'Las salas técnicas se cierran con ladrillo hueco doble de 24 centímetros, enlucido con 3 centímetros de mortero por cada cara.',
    'Las instalaciones discurren por el techo: no se modelan, pero hay que dejarles espacio libre. ¡Cuidado con las vigas descolgadas!',
  ],
  draw(t) {
    const L = 120, R = 760, yS = 470, sl = 100;
    // terreno
    grp(t.p(1), () => { box(40, 150, L - 40, yS + sl - 150, { fill: C.soil, r: 0, shadow: false }); txt('terreno', 80, 300, { size: 16, color: '#fff', rot: -PI / 2, weight: 'bold' }); });
    // losa
    grp(t.p(0), () => {
      box(L - 10, yS, R - L + 10, sl, { fill: C.concrete, r: 0, shadow: false, stroke: C.ink, lw: 2 });
      for (let x = L; x < R; x += 40) circ(x + 20, yS + sl - 14, 3, { fill: C.steel });
      for (let x = L; x < R; x += 40) circ(x + 20, yS + 14, 3, { fill: C.steel });
      txt('Losa de cimentación HA', 440, yS + sl / 2, { size: 22, weight: 'bold' });
    });
    // muro
    grp(t.p(1), () => { box(L - 10, 130, 60, yS - 130, { fill: shade(C.concrete, -0.08), r: 0, shadow: false, stroke: C.ink, lw: 2 }); txt('Muro HA', L + 20, 300, { size: 18, weight: 'bold', rot: -PI / 2 }); });
    // epoxi
    grp(t.p(2), () => { box(L + 50, yS - 6, R - L - 50, 6, { fill: C.red, r: 0, shadow: false }); });
    // techo
    grp(t.p(3), () => {
      box(L - 10, 100, R - L + 10, 30, { fill: C.concrete, r: 0, shadow: false, stroke: C.ink, lw: 2 });
      txt('techo visto', 470, 115, { size: 15, weight: 'bold' });
      for (let k = 0; k < 4; k++) { const x = L + 60 + k * 9; }
      box(L + 50, 130, R - L - 50, yS - 136, { fill: 'rgba(214,232,247,0.35)', r: 0, shadow: false });
      txt('🖌️ pintura', L + 70, 300, { size: 16, align: 'left', weight: 'bold', color: C.blue });
    });
    // tabique 24 + 3 + 3
    grp(t.p(4), () => {
      const x = 560; box(x, 200, 6, yS - 206, { fill: '#E4DED2', r: 0, shadow: false, stroke: C.ink, lw: 1 });
      box(x + 6, 200, 48, yS - 206, { fill: C.brick, r: 0, shadow: false, stroke: C.ink, lw: 1 });
      for (let y = 210; y < yS - 10; y += 22) { box(x + 14, y, 12, 12, { fill: '#9C4C2A', r: 1, shadow: false }); box(x + 34, y, 12, 12, { fill: '#9C4C2A', r: 1, shadow: false }); }
      box(x + 54, 200, 6, yS - 206, { fill: '#E4DED2', r: 0, shadow: false, stroke: C.ink, lw: 1 });
      txt('Sala técnica', x + 120, 330, { size: 17, weight: 'bold', color: C.grey });
    });
    // instalaciones y viga descolgada
    grp(t.p(5), () => {
      box(L + 60, 136, R - L - 70, 50, { fill: 'rgba(242,158,56,0.18)', r: 4, shadow: false, stroke: C.orange, dash: [8, 6], lw: 2 });
      txt('espacio para instalaciones', 300, 161, { size: 16, weight: 'bold', color: '#B36A12' });
      box(470, 130, 45, 70, { fill: C.concrete, r: 0, shadow: false, stroke: C.red, lw: 3 });
      emo('⚠️', 492, 220, 26);
    });
    // fichas
    const cards = [
      ['Losa ≥ 50 cm', 'en múltiplos de 5 cm', C.navy],
      ['Muro HA ≥ 30 cm', 'cerramiento exterior', shade(C.concrete, -0.45)],
      ['Epoxi 2 capas ≈ 2 mm', 'pavimento industrial', C.red],
      ['Pintura + techo visto', 'acabados', C.blue],
      ['LHD 24 cm + 3 + 3 cm', 'mortero de cemento', C.brick],
      ['Instalaciones por techo', 'dejar espacio libre', C.orange],
    ];
    cards.forEach(([a, b, c], i) => slide(t.p(i), 40, 0, () => {
      const y = 100 + i * 80; box(820, y, 400, 66, { fill: '#fff' }); box(820, y, 10, 66, { fill: c, r: [14, 0, 0, 14], shadow: false });
      txt(a, 848, y + 24, { size: 21, weight: 'bold', align: 'left' }); txt(b, 848, y + 49, { size: 16, align: 'left', color: C.grey });
    }));
  }
});

// ---------- 10. PLANTA BAJA: PROGRAMA ----------
SCENES.push({
  title: 'Planta baja (PB) · Programa',
  lines: [
    'En la planta baja se desarrolla la actividad principal del edificio.',
    'La sala de monitores, desde la que se controlan los dispositivos de mantenimiento y operación de la infraestructura.',
    'La sala de reuniones; y la despensa, la cocina y el comedor.',
    'Los aseos y vestuarios, y un área de descanso.',
    'Y un patio interior accesible, cerrado con muro cortina.',
  ],
  draw(t) {
    const f = planF(110, 95, 21);
    planOutline(f, LPLAN, { fill: '#FBF7EF' });
    coreRoom(f, t.p(0));
    room(f, 11, 0, 19, 6.5, '#D7E8FA', ['Sala de', 'monitores'], t.p(1), { emo: '🖥️', size: 15 });
    room(f, 19, 0, 25, 6.5, C.lpurple, ['Reuniones'], t.p(2), { emo: '👥', size: 15 });
    room(f, 0, 0, 7, 5, C.lorange, ['Cocina +', 'despensa'], t.p(2, 0.6, 0.6), { emo: '🍳', size: 14 });
    room(f, 0, 5, 7, 10, C.lyellow, ['Comedor'], t.p(2, 0.6, 1), { emo: '🍽️', size: 15 });
    room(f, 0, 10, 5.5, 20, C.lblue2, ['Aseos y', 'vestuarios'], t.p(3), { emo: '🚻', size: 14 });
    room(f, 5.5, 14, 11, 20, C.lgreen, ['Descanso'], t.p(3, 0.6, 0.6), { emo: '🛋️', size: 15 });
    // patio
    grp(t.p(4), () => {
      const a = f(14, 6.5), b = f(22, 10);
      box(a[0], a[1], b[0] - a[0], b[1] - a[1], { fill: '#BFE3B0', r: 2, shadow: false });
      X.save(); X.strokeStyle = C.blue; X.lineWidth = 6; X.setLineDash([14, 5]); X.strokeRect(a[0], a[1], b[0] - a[0], b[1] - a[1]); X.restore();
      emo('🌳', (a[0] + b[0]) / 2, (a[1] + b[1]) / 2, 30);
      txt('Patio interior', (a[0] + b[0]) / 2, b[1] + 22, { size: 16, weight: 'bold', color: C.dgreen });
    });
    const items = [['🖥️', 'Sala de monitores (control)'], ['👥', 'Sala de reuniones'], ['🍳', 'Despensa, cocina y comedor'], ['🚻', 'Aseos y vestuarios'], ['🛋️', 'Área de descanso'], ['🌳', 'Patio interior accesible']];
    const ps = [t.p(1), t.p(2), t.p(2, 0.6, 0.6), t.p(3), t.p(3, 0.6, 0.6), t.p(4)];
    box(760, 110, 470, 360, { fill: '#fff', alpha: t.p(0) });
    grp(t.p(0), () => txt('+ escalera y ascensor', 995, 140, { size: 18, color: C.grey, weight: 'bold' }));
    bullets(items, 780, 185, ps, { lh: 52, size: 22, isize: 26 });
  }
});

// ---------- 11. PLANTA BAJA: CONSTRUCCIÓN ----------
function hollowCore(x, y, w, h, s) { // placa alveolar
  box(x, y, w, h, { fill: C.concrete, r: 0, shadow: false, stroke: C.ink, lw: 1.5 });
  for (let cx = x + 22; cx < x + w - 10; cx += 40) { X.save(); X.beginPath(); X.ellipse(cx, y + h / 2, 14, h * 0.32, 0, 0, 2 * PI); X.fillStyle = '#F4F6F8'; X.fill(); X.strokeStyle = '#7D848B'; X.lineWidth = 1; X.stroke(); X.restore(); }
}
SCENES.push({
  title: 'Planta baja (PB) · Construcción',
  lines: [
    V('Forjado 30+5: placa alveolar de 30 cm con capa de compresión de 5 cm, apoyado en vigas descolgadas de 25×45 cm.', 'El forjado es treinta más cinco: placa alveolar de treinta centímetros con capa de compresión de cinco, apoyado en vigas descolgadas de veinticinco por cuarenta y cinco.'),
    V('Fachada, de fuera a dentro: ladrillo perforado cara vista de 12 cm, lana de roca de 12 mm, ladrillo hueco de 7 cm, enfoscado de 2 cm y trasdosado de yeso laminado.', 'La fachada, de fuera a dentro: ladrillo perforado cara vista de doce centímetros, lana de roca de doce milímetros, ladrillo hueco de siete centímetros, enfoscado de dos centímetros, y trasdosado de yeso laminado, tipo pladur.'),
    'El patio interior se cierra con un muro cortina fijado a la estructura.',
    'El suelo: terrazo tomado con mortero, 5 centímetros en total, sobre 5 centímetros de mortero autonivelante.',
    V('Paredes pintadas y falso techo de placas de yeso laminado de 15 mm.', 'Las paredes van pintadas, y el techo lleva un falso techo de placas de yeso laminado de quince milímetros.'),
    V('La compartimentación se hace con mamparas de vidrio templado de 10 mm, salvo en aseos y núcleo de comunicaciones.', 'La compartimentación se hace con mamparas de vidrio templado de diez milímetros, salvo en los aseos y el núcleo de comunicaciones.'),
  ],
  draw(t) {
    // --- Forjado (izquierda) ---
    const x = 60, w = 400, k = 4; let y = 135;
    txt('Sección de forjado y suelo', x + w / 2, 105, { size: 20, weight: 'bold', color: C.navy, alpha: t.p(0) });
    const top = y;
    grp(t.p(3), () => {
      box(x, y, w, 5 * k, { fill: '#E9E2D2', r: 0, shadow: false, stroke: C.ink, lw: 1 });
      for (let i = 0; i < 40; i++) circ(x + 6 + rnd(i) * (w - 12), y + 3 + rnd(i + 50) * (5 * k - 6), 1.6, { fill: ['#B9A27A', '#7F8C8D', '#C0392B'][i % 3] });
      box(x, y + 5 * k, w, 5 * k, { fill: '#CDBFA8', r: 0, shadow: false, stroke: C.ink, lw: 1 });
      txt('Terrazo + mortero · 5 cm', x + w + 12, y + 2.5 * k, { size: 14, align: 'left', weight: 'bold' });
      txt('Mortero autonivelante · 5 cm', x + w + 12, y + 7.5 * k, { size: 14, align: 'left', weight: 'bold' });
    });
    y += 10 * k;
    grp(t.p(0), () => {
      box(x, y, w, 5 * k, { fill: shade(C.concrete, 0.1), r: 0, shadow: false, stroke: C.ink, lw: 1 });
      txt('Capa de compresión · 5 cm', x + w + 12, y + 2.5 * k, { size: 14, align: 'left', weight: 'bold' });
      hollowCore(x, y + 5 * k, w, 30 * k, 1);
      txt('Placa alveolar · 30 cm', x + w + 12, y + 20 * k, { size: 15, align: 'left', weight: 'bold' });
      box(x + 150, y + 35 * k, 25 * k, 45 * k * 0.5, { fill: shade(C.concrete, -0.1), r: 0, shadow: false, stroke: C.ink, lw: 1.5 });
      txt('Viga descolgada 25 × 45', x + 160 + 25 * k, y + 35 * k + 45, { size: 15, weight: 'bold', align: 'left' });
    });
    grp(t.p(4), () => {
      const yf = y + 35 * k + 45 * k * 0.5 + 10;
      box(x, yf, w, 6, { fill: '#F4F4F4', r: 0, shadow: false, stroke: C.ink, lw: 1 });
      for (let xx = x + 30; xx < x + w; xx += 90) line(xx, y + 35 * k, xx, yf, { lw: 1, color: C.grey });
      txt('Falso techo yeso laminado 15 mm', x + w + 12, yf + 3, { size: 15, align: 'left', weight: 'bold' });
    });
    // --- Fachada (derecha) ---
    const fx = 790, fy = 160, fh = 210;
    const ws = [
      { t: 36, c: C.brick, label: 'LP cara vista · 12 cm' },
      { t: 8, c: '#F2D16B', label: 'Lana de roca · 12 mm' },
      { t: 21, c: '#D88A5E', label: 'LH · 7 cm' },
      { t: 8, c: '#BDB6A8', label: 'Enfoscado · 2 cm' },
      { t: 10, c: '#F0F0F0', label: 'Trasdosado yeso laminado' },
    ];
    grp(t.p(1), () => {
      txt('Fachada (sección horizontal)', fx + 160, fy - 40, { size: 20, weight: 'bold', color: C.navy });
      txt('EXT', fx - 30, fy + fh / 2, { size: 16, weight: 'bold', color: C.grey }); txt('INT', fx + 120, fy + fh / 2, { size: 16, weight: 'bold', color: C.grey });
    });
    ws.forEach((L, i) => {
      const a = t.p(1, 0.5, i * 1.6); if (a <= 0) return; let xx = fx; for (let j = 0; j < i; j++) xx += ws[j].t;
      grp(a, () => {
        box(xx, fy, L.t, fh, { fill: L.c, r: 0, shadow: false, stroke: 'rgba(0,0,0,0.4)', lw: 1 });
        const ly = fy - 15 - (ws.length - i) * 0 ;
        line(xx + L.t / 2, fy + fh, xx + L.t / 2, fy + fh + 12 + i * 0, { lw: 1.5, color: C.grey });
      });
    });
    // leyenda de fachada a la derecha
    ws.forEach((L, i) => slide(t.p(1, 0.5, i * 1.6), 20, 0, () => {
      box(940, 170 + i * 44, 22, 22, { fill: L.c, r: 3, shadow: false, stroke: C.ink, lw: 1 });
      txt((i + 1) + '. ' + L.label, 970, 181 + i * 44, { size: 16, align: 'left', weight: 'bold' });
    }));
    grp(t.p(1), () => { [0, 1, 2, 3, 4].forEach(i => { let xx = fx; for (let j = 0; j < i; j++) xx += ws[j].t; if (t.p(1, 0.5, i * 1.6) > 0) txt(String(i + 1), xx + ws[i].t / 2, fy + fh + 26, { size: 14, weight: 'bold', alpha: t.p(1, 0.5, i * 1.6) }); }); });
    pop(t.p(2), 260, 510, () => {
      box(60, 460, 400, 110, { fill: C.lblue2 });
      for (let i = 0; i < 4; i++) box(80 + i * 62, 475, 54, 80, { fill: C.glass, r: 2, shadow: false, stroke: C.steel, lw: 3 });
      txt('Muro cortina', 340, 500, { size: 19, weight: 'bold', align: 'left' });
      txt('cierre del patio', 340, 528, { size: 16, align: 'left', color: C.grey });
    });
    pop(t.p(5), 960, 530, () => {
      box(700, 500, 520, 60, { fill: '#fff' });
      box(715, 515, 8, 30, { fill: C.glass, r: 1, shadow: false, stroke: C.blue, lw: 2 });
      txt('Mamparas de vidrio templado 10 mm', 740, 530, { size: 19, weight: 'bold', align: 'left' });
    });
    grp(t.p(4), () => txt('🖌️ Paredes pintadas', 940, 420, { size: 16, weight: 'bold', color: C.blue, align: 'left' }));
  }
});

// ---------- 12. PLANTA PRIMERA: PROGRAMA ----------
SCENES.push({
  title: 'Planta primera (P1) · Programa',
  lines: [
    'En la planta primera, además de ascensor y escalera, están los despachos.',
    'El despacho del ingeniero o ingeniera responsable de la dirección de la explotación, y los despachos de las jefaturas de sección.',
    'Aseos, y habitaciones con dormitorio y baño propio cada una.',
    'Y una terraza exterior cubierta: diáfana y abierta, o cerrada con perfilería metálica y vidrio.',
    'En la terraza los soportes son de acero y quedan vistos. El resto de la estructura es de hormigón armado.',
  ],
  draw(t) {
    const f = planF(80, 95, 19);
    planOutline(f, P1PLAN, { fill: '#FBF7EF' });
    coreRoom(f, t.p(0));
    room(f, 11, 0, 19, 5, '#D7E8FA', ['Dirección', 'explotación'], t.p(1), { emo: '👷', size: 14 });
    room(f, 0, 0, 3.5, 5, C.lpurple, ['Jefat.'], t.p(1, 0.6, 0.6), { size: 13 });
    room(f, 3.5, 0, 7, 5, C.lpurple, ['Jefat.'], t.p(1, 0.6, 0.8), { size: 13 });
    room(f, 0, 5, 7, 10, C.lblue2, ['Aseos'], t.p(2), { emo: '🚻', size: 14 });
    room(f, 0, 10, 5.5, 15, C.lpink, ['Habitación', '+ baño'], t.p(2, 0.6, 0.4), { emo: '🛏️', size: 13 });
    room(f, 0, 15, 5.5, 20, C.lpink, ['Habitación', '+ baño'], t.p(2, 0.6, 0.7), { emo: '🛏️', size: 13 });
    room(f, 5.5, 13, 11, 20, C.lpink, ['Habitación', '+ baño'], t.p(2, 0.6, 1.0), { emo: '🛏️', size: 13 });
    grp(t.p(3), () => {
      const a = f(19, 0), b = f(25, 10);
      box(a[0], a[1], b[0] - a[0], b[1] - a[1], { fill: '#F3EBDD', r: 0, shadow: false, stroke: C.ink, lw: 2, dash: [10, 6] });
      txt('Terraza', (a[0] + b[0]) / 2, (a[1] + b[1]) / 2 - 12, { size: 18, weight: 'bold' });
      txt('cubierta', (a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + 12, { size: 16, color: C.grey });
    });
    grp(t.p(4), () => { [[19.3, 0.3], [24.7, 0.3], [19.3, 9.7], [24.7, 9.7], [22, 0.3], [22, 9.7]].forEach(([x, y]) => { const q = f(x, y); box(q[0] - 7, q[1] - 7, 14, 14, { fill: C.steel, r: 1, shadow: false }); }); });
    // vista isométrica de la terraza
    setIso(800, 140, 17);
    grp(t.p(3), () => {
      ibox(14, 0, 19, 10, 0, 3.5, '#E9DCC3', { win: C.glass });
      ibox(19, 0, 25, 10, -0.35, 0, '#D8D2C6');
      const col = t.p(4) > 0 ? C.steel : '#A7A29A';
      [[25, 0], [25, 10], [19.2, 10], [22, 10], [22, 0]].forEach(([x, y]) => { const A = ip(x - 0.25, y - 0.25, 0), B = ip(x - 0.25, y - 0.25, 3.15); line(A[0], A[1], B[0], B[1], { color: col, lw: t.p(4) > 0 ? 7 : 5 }); });
      ibox(19, 0, 25, 10, 3.15, 3.5, '#D8D2C6');
      // barandilla de vidrio
      poly([ip(25, 0, 0), ip(25, 10, 0), ip(25, 10, 1.1), ip(25, 0, 1.1)], { fill: 'rgba(191,227,245,0.5)', stroke: C.steel, lw: 1.5 });
      poly([ip(19, 10, 0), ip(25, 10, 0), ip(25, 10, 1.1), ip(19, 10, 1.1)], { fill: 'rgba(191,227,245,0.5)', stroke: C.steel, lw: 1.5 });
    });
    slide(t.p(4), 0, 20, () => { box(780, 470, 420, 80, { fill: '#fff' }); txt('Soportes de ACERO vistos', 990, 498, { size: 21, weight: 'bold', color: C.steel }); txt('resto: hormigón armado', 990, 527, { size: 18, color: C.grey }); });
  }
});

// ---------- 13. PLANTA PRIMERA: CONSTRUCCIÓN ----------
function waffle(x, y, w, k, hc, hcomp, lost) {
  box(x, y, w, hcomp * k, { fill: shade(C.concrete, 0.1), r: 0, shadow: false, stroke: C.ink, lw: 1 });
  const yy = y + hcomp * k, h = hc * k, step = 110, rib = 22;
  box(x, yy, w, h, { fill: C.concrete, r: 0, shadow: false, stroke: C.ink, lw: 1 });
  for (let xx = x + rib; xx + step - rib <= x + w; xx += step) {
    const cw = step - rib;
    if (lost) { box(xx, yy, cw, h, { fill: '#8E949A', r: 0, shadow: false, stroke: C.ink, lw: 1 }); X.save(); X.globalAlpha *= 0.35; for (let q = 0; q < 6; q++) circ(xx + 10 + rnd(q + xx) * (cw - 20), yy + 8 + rnd(q + xx + 7) * (h - 16), 2, { fill: '#fff' }); X.restore(); }
    else { box(xx, yy, cw, h, { fill: '#F8FAFC', r: 0, shadow: false }); line(xx, yy, xx, yy + h, { lw: 1, color: C.ink }); line(xx + cw, yy, xx + cw, yy + h, { lw: 1, color: C.ink }); line(xx, yy + h, xx + cw, yy + h, { lw: 1, color: '#F8FAFC' }); }
  }
}
SCENES.push({
  title: 'Planta primera (P1) · Construcción',
  lines: [
    V('Forjado reticular de casetón perdido 25+10: casetones de hormigón de 25 cm y capa de compresión de 10 cm.', 'El forjado es reticular, de casetón perdido, veinticinco más diez: casetones de hormigón de veinticinco centímetros y capa de compresión de diez.'),
    'La tabiquería es de ladrillo hueco doble de 9 centímetros, con 3 centímetros de yeso por cada cara.',
    V('El techo lleva falso techo de yeso laminado de 15 mm, y por él discurren las instalaciones.', 'El techo lleva falso techo de yeso laminado de quince milímetros, y por él discurren las instalaciones.'),
    'Los acabados de las paredes son los propios de los cerramientos y de la tabiquería.',
  ],
  draw(t) {
    const k = 4;
    grp(t.p(0), () => {
      txt('Forjado reticular · casetón perdido 25+10', 340, 110, { size: 21, weight: 'bold', color: C.navy });
      waffle(80, 150, 560, k, 25, 10, true);
      txt('10 cm', 655, 150 + 20, { size: 16, align: 'left', weight: 'bold' });
      txt('25 cm', 655, 150 + 40 + 50, { size: 16, align: 'left', weight: 'bold' });
      txt('casetón', 80 + 22 + 44, 150 + 10 * k + 12.5 * k, { size: 14, color: '#fff', weight: 'bold' });
      txt('Casetones de hormigón: se quedan en el forjado', 360, 150 + 35 * k + 70, { size: 16, color: C.grey, alpha: 1 - t.p(2) });
    });
    grp(t.p(2), () => {
      const yf = 150 + 35 * k + 50; box(80, yf, 560, 6, { fill: '#F4F4F4', r: 0, shadow: false, stroke: C.ink, lw: 1 });
      for (let xx = 120; xx < 640; xx += 110) line(xx, 150 + 35 * k, xx, yf, { lw: 1, color: C.grey });
      box(150, 150 + 35 * k + 8, 380, 24, { fill: 'rgba(242,158,56,0.25)', r: 4, shadow: false, stroke: C.orange, dash: [6, 4] });
      txt('instalaciones', 340, 150 + 35 * k + 20, { size: 14, weight: 'bold', color: '#B36A12' });
      txt('Falso techo yeso laminado 15 mm', 360, yf + 26, { size: 17, weight: 'bold' });
    });
    // tabique
    grp(t.p(1), () => {
      const x = 860, y = 160, h = 340, kk = 7;
      txt('Tabique (sección)', 965, 115, { size: 21, weight: 'bold', color: C.navy });
      box(x, y, 3 * kk, h, { fill: '#EFEBE2', r: 0, shadow: false, stroke: C.ink, lw: 1 });
      box(x + 3 * kk, y, 9 * kk, h, { fill: C.brick, r: 0, shadow: false, stroke: C.ink, lw: 1 });
      for (let yy = y + 10; yy < y + h - 10; yy += 26) box(x + 3 * kk + 10, yy, 9 * kk - 20, 14, { fill: '#9C4C2A', r: 2, shadow: false });
      box(x + 12 * kk, y, 3 * kk, h, { fill: '#EFEBE2', r: 0, shadow: false, stroke: C.ink, lw: 1 });
      txt('yeso 3 cm', x - 10, y + h + 25, { size: 16, weight: 'bold', align: 'right' });
      txt('LHD 9 cm', x + 7.5 * kk, y + h + 25, { size: 16, weight: 'bold' });
      txt('yeso 3 cm', x + 15 * kk + 10, y + h + 25, { size: 16, weight: 'bold', align: 'left' });
    });
    slide(t.p(3), 0, 20, () => { box(80, 490, 560, 60, { fill: C.lyellow }); txt('Acabados = los de cerramientos y tabiques', 360, 520, { size: 20, weight: 'bold' }); });
  }
});

// ---------- 14. CUBIERTA ----------
SCENES.push({
  title: 'Cubierta (PC) · Cubierta verde',
  lines: [
    V('La cubierta no tiene un uso específico. Su forjado es reticular de casetón recuperable 20+8.', 'La cubierta no tiene un uso específico. Su forjado es reticular, de casetón recuperable, veinte más ocho.'),
    'Todo su perímetro lleva un peto de 110 centímetros de altura, de ladrillo hueco doble de 24 centímetros, enlucido por ambas caras.',
    'Será una cubierta verde o ajardinada, y eres tú quien define sus capas.',
    'Por ejemplo: impermeabilización y lámina antirraíces, drenaje, filtro, sustrato y vegetación de bajo porte, además del riego.',
    'Y no olvides la formación de pendientes hacia los desagües.',
  ],
  draw(t) {
    const x = 330, w = 560, k = 3.6;
    let y = 380;
    // forjado reticular recuperable
    grp(t.p(0), () => {
      waffle(x, y, w, k, 20, 8, false);
      txt('Forjado reticular 20+8', x + w + 18, y + 14 * k, { size: 17, weight: 'bold', align: 'left' });
      txt('(casetón recuperable: hueco)', x + w + 18, y + 14 * k + 22, { size: 15, color: C.grey, align: 'left' });
    });
    // pendientes
    grp(Math.max(t.p(3), t.p(4)), () => poly([[x, y], [x + w, y], [x + w, y - 12], [x, y - 34]], { fill: '#D9D2C2', stroke: C.ink, lw: 1 }));
    grp(t.p(4), () => { txt('Formación de pendientes', x + w + 30, y + 8, { size: 17, weight: 'bold', align: 'left' }); arrow(x + 120, y - 50, x + 380, y - 40, { color: C.blue, lw: 2.5, hs: 10 }); });
    const yb = y - 34;
    const capas = [
      { t: 10, c: '#2F3B45', label: 'Impermeabilización + antirraíces' },
      { t: 14, c: '#3C8DBC', label: 'Drenaje' },
      { t: 6, c: '#E8E3D6', label: 'Filtro geotextil' },
      { t: 38, c: '#6D4C30', label: 'Sustrato' },
    ];
    let yy = yb; const tot = capas.reduce((s, c) => s + c.t, 0); yy = yb - tot;
    capas.slice().reverse().forEach((c, ri) => {
      const i = capas.length - 1 - ri; let yt = yb; for (let j = 0; j <= i; j++) yt -= capas[j].t;
      const a = t.p(3, 0.5, i * 0.9); if (a <= 0) return;
      grp(a, () => {
        box(x + 40, yt, w - 40, c.t, { fill: c.c, r: 0, shadow: false, stroke: 'rgba(0,0,0,0.3)', lw: 1 });
        if (i === 1) for (let xx = x + 50; xx < x + w; xx += 16) circ(xx, yt + c.t / 2, 4, { fill: '#9CC8F2' });
        const ly = 290 + (3 - i) * 24;
        line(x + w + 4, yt + c.t / 2, x + w + 26, ly, { lw: 1.5, color: C.grey });
        txt(c.label, x + w + 30, ly, { size: 16, weight: 'bold', align: 'left' });
      });
    });
    // vegetación
    const ytop = yb - tot;
    grp(t.p(3, 0.5, 4 * 0.9), () => {
      for (let i = 0; i < 26; i++) { const xx = x + 55 + i * 19.5, hh = 14 + 14 * rnd(i); X.save(); X.strokeStyle = i % 3 ? C.green : C.dgreen; X.lineWidth = 3; X.lineCap = 'round'; X.beginPath(); X.moveTo(xx, ytop); X.quadraticCurveTo(xx - 6, ytop - hh / 2, xx - 3 + 6 * rnd(i + 3), ytop - hh); X.stroke(); X.restore(); if (i % 5 === 2) circ(xx, ytop - hh, 4, { fill: C.pink }); }
      txt('Vegetación de bajo porte', x + w + 18, ytop - 14, { size: 16, weight: 'bold', align: 'left', color: C.dgreen });
      // riego
      line(x + 60, ytop - 34, x + 300, ytop - 34, { color: C.blue, lw: 3 });
      for (let i = 0; i < 6; i++) emo('💧', x + 80 + i * 42, ytop - 22, 12);
      txt('Riego', x + 330, ytop - 34, { size: 16, weight: 'bold', color: C.blue, align: 'left' });
    });
    // peto
    grp(t.p(1), () => {
      const px = x - 50, ph = 110 * 2.1;
      box(px, y - ph, 50, ph, { fill: C.brick, r: 0, shadow: false, stroke: C.ink, lw: 1.5 });
      for (let yy2 = y - ph + 10; yy2 < y - 10; yy2 += 22) box(px + 10, yy2, 30, 11, { fill: '#9C4C2A', r: 1, shadow: false });
      box(px - 4, y - ph - 6, 58, 6, { fill: '#D6D0C4', r: 0, shadow: false });
      arrow(px - 25, y, px - 25, y - ph, { color: C.red, lw: 2, hs: 8 }); arrow(px - 25, y - ph, px - 25, y, { color: C.red, lw: 2, hs: 8 });
      txt('110 cm', px - 35, y - ph / 2, { size: 18, weight: 'bold', color: C.red, align: 'right' });
      txt('Peto LHD 24 cm', px - 35, y - ph / 2 + 40, { size: 16, weight: 'bold', align: 'right' });
      txt('enlucido ambas caras', px - 35, y - ph / 2 + 62, { size: 14, color: C.grey, align: 'right' });
    });
    pop(t.p(2), 640, 120, () => { box(450, 90, 380, 56, { fill: C.lgreen }); txt('🌿 Cubierta verde: capas a definir por ti', 640, 118, { size: 19, weight: 'bold', color: C.dgreen }); });
  }
});
