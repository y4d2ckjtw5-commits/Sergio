// Escenas 1: introducción, objetivo, visión general, seguridad, estación (cut & cover, losa, pantallas, auscultación)
// Cada línea: "texto" o ["subtítulo", "texto para la voz"]
const SCENES = [];
const CC = ['Cut & cover', 'Cat an cóver'];

// ---------- 0. INTRO ----------
SCENES.push({
  title: 'Salida de campo · Estación de RENFE',
  lines: [
    '¡Hola! En este vídeo te contamos la salida de campo a las obras de renovación de la estación de trenes de RENFE.',
    'Fue una visita de la asignatura Construcciones Geotécnicas, del grado en Ingeniería Civil de la Universidad de Alicante.',
    'Veremos qué se está construyendo, cómo trabaja cada elemento de la estructura y en qué orden se ejecuta la obra.',
  ],
  draw(T) {
    photo('f000', 800, 100, 380, 500, { zoom: 1.05 + 0.04 * T.t / T.dur, fy: 0.45, alpha: T.p(0, 1, 0.5), cap: 'Hormigonado de la losa de cubierta' });
    pop(T.p(0, 1), 400, 200, () => {
      txt('Memoria de la salida', 400, 150, { size: 30, color: C.grey, weight: 'bold' });
      txt('Renovación de la', 400, 205, { size: 52, weight: 'bold', color: C.navy });
      txt('estación de RENFE', 400, 265, { size: 52, weight: 'bold', color: C.navy });
    });
    // tren que pasa
    const tx = lerp(-300, 760, ease(T.t / 3.5));
    grp(T.p(0, 0.5), () => drawTrain(tx, 362, 0.6));
    line(40, 366, 760, 366, { color: C.grey, lw: 4 });
    slide(T.p(1), 0, 30, () => {
      box(90, 395, 620, 64, { fill: C.lorange });
      txt('Construcciones Geotécnicas · Ingeniería Civil UA', 400, 427, { size: 24, weight: 'bold', color: C.ink });
    });
    const al = T.p(1, 0.8, 1);
    grp(al * (1 - T.p(2)), () => {
      ['Remdane Hamraoui', 'Youssef El Fadily', 'Nassim Labbassi', 'Youssef Hossein El Makki'].forEach((n, i) =>
        txt(n, 400 + (i % 2 ? 160 : -160), 495 + Math.floor(i / 2) * 36, { size: 22, color: C.ink, alpha: clamp(al * 3 - i * 0.4) }));
    });
    const it = ['1. Objetivo', '2. Lo que vimos', '3. Elementos y su función', '4. Secuencias constructivas'];
    it.forEach((s, i) => slide(T.p(2, 0.6, 0.4 + i * 0.5), -40, 0, () => pill(i % 2 ? 560 : 245, 500 + Math.floor(i / 2) * 54, 300, 44, s, i % 2 ? C.lblue : C.lgreen, { size: 20 })));
  },
});

function drawTrain(x, y, s = 1, color = C.navy) { // x = morro derecho, y = base
  X.save(); X.translate(x, y); X.scale(s, s);
  for (let k = 0; k < 3; k++) {
    const x0 = -k * 250 - 240;
    rr(x0, -90, 236, 80, k === 0 ? [10, 40, 10, 10] : 10); X.fillStyle = k === 0 ? color : shade(color, 0.1); X.fill();
    X.fillStyle = '#DDEEFF'; for (let w = 0; w < 5; w++) X.fillRect(x0 + 18 + w * 38, -76, 26, 24);
    X.fillStyle = C.yellow; X.fillRect(x0, -40, 236, 7);
    X.fillStyle = '#333'; [40, 80, 160, 200].forEach(c => { X.beginPath(); X.arc(x0 + c, -6, 9, 0, PI * 2); X.fill(); });
  }
  X.restore();
}

// ---------- 1. OBJETIVO ----------
function cityMap(T, under, park) {
  // manzanas
  for (let r = 0; r < 4; r++) for (let c = 0; c < 8; c++) {
    const x = 150 + c * 125 + (c >= 4 ? 80 : 0), y = 100 + r * 125;
    if (c >= 4) continue;
    box(x, y, 100, 100, { fill: ['#E8DCC8', '#DCE3EA', '#EFE2D0'][(r + c) % 3], r: 8, shadow: false });
  }
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) box(730 + c * 125, 100 + r * 125, 100, 100, { fill: ['#DCE3EA', '#E8DCC8', '#EFE2D0'][(r + c) % 3], r: 8, shadow: false });
  // corredor ferroviario
  const cx = 640, cw = 140;
  X.save(); X.fillStyle = '#A9A39A'; X.fillRect(cx - cw / 2, 85, cw, 520); X.restore();
  grp(park, () => {
    X.save(); X.fillStyle = '#A8D58A'; X.fillRect(cx - cw / 2, 85, cw, 520); X.restore();
    for (let i = 0; i < 9; i++) circ(cx + (i % 2 ? 38 : -38), 110 + i * 58, 18, { fill: '#5E9E3A' });
    for (let i = 0; i < 8; i++) { line(cx - 55, 140 + i * 58, cx + 55, 140 + i * 58, { color: '#EEE', lw: 6, alpha: 0.9 }); }
  });
  [-22, 22].forEach(o => {
    const dash = under > 0.5 ? [14, 10] : null;
    line(cx + o - 8, 85, cx + o - 8, 605, { color: under > 0.5 ? C.navy : '#555', lw: 3, dash, alpha: 1 - 0.4 * under });
    line(cx + o + 8, 85, cx + o + 8, 605, { color: under > 0.5 ? C.navy : '#555', lw: 3, dash, alpha: 1 - 0.4 * under });
  });
  if (under < 0.5) for (let y = 90; y < 605; y += 16) { line(cx - 40, y, cx - 4, y, { color: '#6B5', lw: 3, alpha: 0 }); line(cx - 34, y, cx - 10, y, { color: '#7a6a55', lw: 3 }); line(cx + 10, y, cx + 34, y, { color: '#7a6a55', lw: 3 }); }
}
SCENES.push({
  title: 'Objetivo de la actuación',
  lines: [
    'El objetivo de la obra es modernizar la red ferroviaria e integrarla en la ciudad mediante el soterramiento de las vías.',
    'Con las vías en superficie, la ciudad queda partida en dos: el ferrocarril es una barrera para peatones y coches.',
    'Al llevar los trenes bajo tierra, la superficie queda libre para calles, plazas y zonas verdes.',
    'Para conseguirlo se combinan dos grandes obras: una estación enterrada, construida desde la superficie, y un túnel excavado en mina.',
  ],
  draw(T) {
    const under = T.p(2, 1.2), park = T.p(2, 1.2, 0.8);
    cityMap(T, under, park);
    // tren (vista en planta)
    const ty = ((T.t * 110) % 900) - 300;
    grp(1 - under, () => { X.save(); X.fillStyle = C.navy; for (let k = 0; k < 3; k++) { rr(640 - 36, ty + k * 92, 30, 86, 8); X.fill(); } X.restore(); });
    grp(under * (1 - T.p(3)), () => { X.save(); X.fillStyle = C.navy; for (let k = 0; k < 3; k++) { rr(640 + 6, ty + k * 92, 30, 86, 8); X.globalAlpha = 0.25; X.fill(); } X.restore(); });
    pop(T.p(0, 0.8, 0.5), 640, 300, () => { box(90, 250, 250, 110, { fill: '#fff' }); txt('Soterrar', 215, 285, { size: 30, weight: 'bold', color: C.navy }); txt('las vías', 215, 325, { size: 30, weight: 'bold', color: C.navy }); });
    // barrera
    const b = T.p(1) * (1 - T.p(2, 0.6));
    grp(b, () => {
      [200, 330, 460].forEach((y, i) => { emo('🚶', 540, y, 40); arrow(565, y, 610, y, { color: C.red, lw: 4 }); cross(640, y, 0.9); });
      box(820, 270, 300, 70, { fill: C.lpink }); txt('Barrera urbana', 970, 305, { size: 28, weight: 'bold', color: C.red });
    });
    grp(park * (1 - T.p(3, 0.6)), () => {
      [200, 330, 460].forEach((y, i) => { const m = (T.c(2) * 0.35 + i * 0.3) % 1; emo('🚶', lerp(520, 760, m), y, 36); });
      box(820, 270, 300, 70, { fill: C.lgreen }); txt('Ciudad unida', 970, 305, { size: 28, weight: 'bold', color: C.dgreen });
    });
    // estación y túnel
    const s = T.p(3, 0.8);
    grp(s, () => {
      X.save(); X.setLineDash([10, 8]); X.lineWidth = 5; X.strokeStyle = C.orange; rr(560, 240, 160, 200, 10); X.stroke();
      X.strokeStyle = C.purple; X.beginPath(); X.moveTo(640, 440); X.lineTo(640, 605); X.moveTo(640, 85); X.lineTo(640, 240); X.stroke(); X.restore();
      box(830, 200, 330, 90, { fill: C.lorange }); txt('Estación enterrada', 995, 230, { size: 26, weight: 'bold', color: '#B5651D' }); txt('construida desde arriba', 995, 262, { size: 20 });
      arrow(830, 250, 725, 300, { color: C.orange, p: T.p(3, 0.6, 0.4) });
      box(830, 420, 330, 90, { fill: C.lpurple }); txt('Túnel en mina', 995, 450, { size: 26, weight: 'bold', color: C.purple }); txt('excavado bajo tierra', 995, 482, { size: 20 });
      arrow(830, 470, 650, 540, { color: C.purple, p: T.p(3, 0.6, 1.4) });
    });
  },
});

// ---------- 2. VISIÓN GENERAL ----------
SCENES.push({
  title: 'Lo que vimos en la visita',
  lines: [
    'Durante la visita, los técnicos explicaron que se emplean dos sistemas constructivos para la estación y uno para el túnel.',
    ['En la estación: una losa cimbrada que hace de cubierta, y el procedimiento cut and cover, de arriba hacia abajo, hasta unos catorce metros de profundidad.',
      'En la estación: una losa cimbrada que hace de cubierta, y el procedimiento cat an cóver, de arriba hacia abajo, hasta unos catorce metros de profundidad.'],
    'En el túnel: paraguas de micropilotes, cerchas metálicas y gunita, avanzando metro a metro.',
    'Y todo ello con auscultación y monitorización continua del terreno y del avance de la obra.',
    'Además, el orden de construcción es fundamental: cada fase depende de que la anterior esté terminada.',
  ],
  draw(T) {
    const out = 1 - T.p(4, 0.6);
    const cards = [
      ['Losa cimbrada', 'Cubierta continua', C.lorange, '#B5651D', 'f005', 1],
      ['Cut & cover', 'Descendente · 14 m', C.lyellow, '#9A7B0A', 'f008', 1],
      ['Túnel en mina', 'Paraguas · cerchas · gunita', C.lpurple, C.purple, 'f002', 2],
    ];
    grp(out, () => {
      grp(T.p(0), () => { pill(400, 105, 380, 40, 'ESTACIÓN · 2 sistemas', C.orange, { tc: '#fff' }); pill(1030, 105, 300, 40, 'TÚNEL · 1 sistema', C.purple, { tc: '#fff' }); });
      cards.forEach((c, i) => {
        const x = [90, 470, 880][i];
        pop(T.p(c[5], 0.8, i === 1 ? 2.5 : 0.2), x + 155, 300, () => {
          box(x, 140, 310, 340, { fill: '#fff' });
          photo(c[4], x + 15, 155, 280, 210, { zoom: 1.1 });
          txt(c[0], x + 155, 405, { size: 28, weight: 'bold', color: c[3] });
          txt(c[1], x + 155, 445, { size: 20, color: C.ink });
        });
      });
      slide(T.p(3), 0, 40, () => {
        box(190, 510, 900, 76, { fill: C.lgreen });
        emo('📡', 250, 548, 40);
        txt('Auscultación y monitorización continua', 670, 548, { size: 28, weight: 'bold', color: C.dgreen });
        for (let i = 0; i < 3; i++) { const r = ((T.c(3) * 0.8 + i / 3) % 1); circ(250, 548, 20 + r * 50, { stroke: C.green, lw: 3, alpha: 1 - r }); }
      });
    });
    const steps = ['Pilotes', 'Losa', 'Excavar', 'Forjados'];
    steps.forEach((s, i) => {
      pop(T.p(4, 0.6, 0.4 + i * 0.6), 220 + i * 280, 330, () => { circ(220 + i * 280, 300, 62, { fill: [C.orange, C.yellow, C.soil, C.blue][i] }); txt(String(i + 1), 220 + i * 280, 300, { size: 54, weight: 'bold', color: '#fff', stroke: 5, strokeColor: 'rgba(0,0,0,0.3)' }); txt(s, 220 + i * 280, 400, { size: 28, weight: 'bold' }); });
      if (i < 3) arrow(290 + i * 280, 300, 430 + i * 280, 300, { p: T.p(4, 0.5, 0.8 + i * 0.6), lw: 5 });
    });
    grp(T.p(4, 0.6, 3.2), () => txt('El orden importa', 640, 500, { size: 40, weight: 'bold', color: C.red, stroke: 6 }));
  },
});

// ---------- 3. REQUISITOS Y SEGURIDAD ----------
function controlCenter(x, y, on, label) {
  box(x - 110, y - 70, 220, 140, { fill: on > 0.5 ? '#fff' : '#555', stroke: on > 0.5 ? C.green : C.red, lw: 4 });
  X.save(); X.fillStyle = on > 0.5 ? '#1D3557' : '#222'; X.fillRect(x - 85, y - 50, 170, 70); X.restore();
  if (on > 0.5) for (let i = 0; i < 4; i++) line(x - 75, y - 35 + i * 15, x - 75 + 60 + 80 * rnd(i + x), y - 35 + i * 15, { color: [C.green, C.yellow, C.lblue, C.green][i], lw: 4 });
  txt(label, x, y + 45, { size: 20, weight: 'bold', color: on > 0.5 ? C.ink : '#ddd' });
}
SCENES.push({
  title: 'Requisitos y seguridad de la red',
  lines: [
    'La nueva estación debe cumplir varios requisitos: acceso para ambulancias, pasillos de embarque, ventilación y alumbrado de emergencia.',
    'También se comentó la importancia de duplicar el puesto de mando, el cerebro que controla la circulación de los trenes.',
    'Si un temporal, como una DANA, deja fuera de servicio el puesto de mando, toda la red se queda a ciegas y los trenes no pueden salir de las estaciones.',
    'Con un segundo puesto de mando, el otro toma el control y la red sigue funcionando con seguridad.',
  ],
  draw(T) {
    const req = [['🚑', 'Acceso de ambulancias'], ['🚶', 'Pasillos de embarque'], ['🌀', 'Ventilación'], ['💡', 'Alumbrado de emergencia']];
    grp(1 - T.p(1, 0.6), () => req.forEach((r, i) => pop(T.p(0, 0.7, 0.3 + i * 0.9), 220 + i * 280, 330, () => {
      box(105 + i * 280, 200, 230, 250, { fill: '#fff' }); emo(r[0], 220 + i * 280, 290, 90);
      para(r[1], 220 + i * 280, 370, 200, { size: 24, weight: 'bold', align: 'center' });
    })));
    const a = T.p(1, 0.8, 0.5); if (a <= 0) return;
    grp(a, () => {
      const storm = T.p(2, 1, 0.5), back = T.p(3, 0.8, 0.3);
      const st = [[640, 150], [1080, 300], [640, 540], [200, 300], [900, 520], [380, 520]];
      const ok1 = storm < 0.5, ok2 = back > 0.5;
      const live = ok1 || ok2;
      st.forEach(([x, y], i) => {
        const src = ok2 ? [880, 300] : [400, 300];
        line(src[0], src[1], x, y, { color: live ? C.green : C.grey, lw: 3, dash: live ? null : [8, 8] });
        if (live) { const m = (T.t * 0.6 + i * 0.17) % 1; circ(lerp(src[0], x, m), lerp(src[1], y, m), 6, { fill: C.green }); }
      });
      st.forEach(([x, y], i) => { box(x - 50, y - 26, 100, 52, { fill: '#fff', stroke: live ? C.green : C.red, lw: 3 }); emo(live ? '🚆' : '⛔', x, y, 30); });
      controlCenter(400, 300, ok1 ? 1 : 0, 'Puesto de mando 1');
      grp(T.p(1, 0.8, 2), () => controlCenter(880, 300, ok2 ? 1 : 0.6, 'Puesto de mando 2'));
      if (storm > 0) {
        grp(storm * (1 - back * 0.6), () => {
          emo('⛈️', 400, 165, 80);
          for (let i = 0; i < 40; i++) { const yy = (T.t * 400 + rnd(i) * 300) % 260; line(300 + rnd(i + 3) * 200, 190 + yy, 294 + rnd(i + 3) * 200, 204 + yy, { color: C.blue, lw: 2, alpha: 0.6 }); }
        });
        grp(storm * (1 - back), () => pill(640, 610 - 20, 520, 50, 'Red a ciegas: los trenes no salen', C.red, { tc: '#fff', size: 24 }));
      }
      grp(back, () => pill(640, 590, 560, 50, 'Puesto duplicado: la red sigue funcionando', C.green, { tc: '#fff', size: 24 }));
    });
  },
});

// ---------- 4. CUT & COVER DESCENDENTE ----------
const GY = 190, PXM = 26, BY = GY + 14 * PXM; // suelo, px por metro, fondo (14 m)
const WL = 210, WR = 1050, WW = 24; // pantallas
const PP = [450, 630, 810]; // pila-pilotes
const LEV = [4.6, 8.4, 11.6]; // profundidad de forjados (m)
function station(S) {
  // S: {walls, piles, slab, exc, berm, forj, bottom, colors}
  soil(60, GY, 1160, 610 - GY);
  line(60, GY, 1220, GY, { color: '#7A6040', lw: 3 });
  // excavación interior
  const ey = GY + S.exc * 14 * PXM;
  if (S.exc > 0) {
    X.save(); X.fillStyle = C.air; X.fillRect(WL + WW, GY, WR - WL - WW, ey - GY); X.restore();
    // bermas provisionales
    if (S.berm > 0) [0, 1].forEach(side => {
      const xw = side ? WR : WL + WW, d = side ? -1 : 1, hb = Math.min(110, ey - GY - 30) * S.berm, wb = 150 * S.berm;
      if (hb <= 0) return;
      poly([[xw, ey], [xw, ey - hb], [xw + d * 45 * S.berm, ey - hb], [xw + d * wb, ey]], { fill: '#C49E74', stroke: '#8a6a45', lw: 2 });
    });
  }
  // pantallas (pilotes perimetrales)
  if (S.walls > 0) [WL, WR - WW].forEach(x => {
    const h = (600 - GY) * S.walls; concrete(x, GY, WW, h, { fill: '#AEB4BB' });
    for (let k = 1; k < 3; k++) line(x + k * 8, GY + 4, x + k * 8, GY + h - 4, { color: '#6c737b', lw: 1.5 });
  });
  if (S.piles > 0) PP.forEach(x => { const h = (615 - GY) * S.piles; concrete(x - 8, GY, 16, h, { fill: '#BFC5CC' }); });
  // losa de cubierta
  if (S.slab > 0) concrete(WL - 10, GY - 16, (WR - WL + 20) * S.slab, 18, { fill: '#9AA2AB' });
  // forjados intermedios
  LEV.forEach((m, i) => { const p = clamp(S.forj - i); if (p > 0) concrete(WL + WW, GY + m * PXM - 7, (WR - WL - WW) * ease(p) - 0, 14, { fill: '#A7AEB6' }); });
  if (S.bottom > 0) concrete(WL + WW, BY - 8, (WR - WL - WW) * ease(S.bottom), 16, { fill: '#9AA2AB' });
}
SCENES.push({
  title: 'La estación: cut & cover descendente',
  lines: [
    ['La estación se construye con el método cut and cover descendente, o top-down: es decir, de arriba hacia abajo.',
      'La estación se construye con el método cat an cóver descendente, o top daun: es decir, de arriba hacia abajo.'],
    'Primero se ejecutan las cimentaciones profundas: las pantallas de pilotes en el perímetro y los pila-pilotes en el interior.',
    'Para que los pilotes queden perfectamente verticales se usan mesas de nivelación: una estructura que guía la perforación, como un casquillo.',
    'Después se hormigona la losa de cubierta en superficie, apoyada sobre los pilotes. Así se puede devolver pronto el tráfico a la superficie.',
    'Luego se excava por debajo de la losa, por fases, hasta unos catorce metros de profundidad.',
    'A medida que se baja, se construyen los forjados de los tres niveles de aparcamiento y, al final, la losa de fondo.',
  ],
  draw(T) {
    const S = {
      walls: T.p(1, 2.5), piles: T.p(1, 2.5, 1.2), slab: T.p(3, 2, 0.3),
      exc: T.p(4, 4, 0.3), berm: 1 - T.p(5, 1.5, 2.5), forj: T.p(5, 3.5, 0) * 3, bottom: T.p(5, 1.5, 3.8),
    };
    station(S);
    // edificios en superficie
    building(80, GY, 90, 80, '#C9D6E3'); building(1090, GY, 110, 100, '#E3D3C3');
    // intro: flecha de arriba hacia abajo
    grp(1 - T.p(1, 0.5), () => {
      arrow(640, 220, 640, 520, { p: T.p(0, 1.5, 0.5), lw: 8, color: C.navy, hs: 24 });
      txt('TOP-DOWN', 640, 150 + 0, { size: 44, weight: 'bold', color: C.navy, stroke: 7, alpha: T.p(0, 0.6, 0.3) });
      txt('de arriba hacia abajo', 760, 380, { size: 26, weight: 'bold', align: 'left', stroke: 5, alpha: T.p(0, 0.6, 1.5) });
    });
    // etiquetas
    grp(T.p(1, 0.6, 0.8) * (1 - T.p(3, 0.5)), () => { pill(WL + 12, 135, 230, 38, 'Pantalla de pilotes', C.orange, { tc: '#fff', size: 18 }); pill(WR - 12, 135, 230, 38, 'Pantalla de pilotes', C.orange, { tc: '#fff', size: 18 }); });
    grp(T.p(1, 0.6, 2.2) * (1 - T.p(2, 0.5)), () => { pill(630, 135, 180, 38, 'Pila-pilotes', C.blue, { tc: '#fff', size: 18 }); });
    // mesa de nivelación
    grp(T.p(2, 0.7) * (1 - T.p(3, 0.5)), () => {
      const x = PP[0];
      X.save(); X.strokeStyle = C.red; X.lineWidth = 5; X.strokeRect(x - 40, GY - 60, 80, 60); X.restore();
      line(x - 40, GY - 30, x + 40, GY - 30, { color: C.red, lw: 4 });
      line(x, GY - 120, x, GY + 40 + 60 * Math.sin(T.c(2) * 2) ** 2, { color: '#333', lw: 6 });
      box(530, 80, 330, 90, { fill: '#fff', stroke: C.red });
      txt('Mesa de nivelación', 695, 110, { size: 24, weight: 'bold', color: C.red }); txt('guía para pilotes verticales', 695, 145, { size: 19 });
      arrow(530, 125, x + 45, GY - 40, { color: C.red, p: T.p(2, 0.6, 0.5) });
    });
    grp(T.p(3, 0.6, 0.8) * (1 - T.p(4, 0.5)), () => {
      pill(640, 140, 260, 40, 'Losa de cubierta', C.navy, { tc: '#fff' });
      for (let i = 0; i < 3; i++) emo('🚗', ((T.c(3) * 90 + i * 300) % 1100) + 100, GY - 34, 34);
    });
    // excavación
    grp(T.p(4, 0.5) * (1 - T.p(5, 0.5, 4)), () => { const ey = GY + S.exc * 14 * PXM; emo('🚜', 640 + 120 * Math.sin(T.t), ey - 26, 44); });
    grp(T.p(4, 0.6, 1), () => vbrace(1160, GY, BY, '14 m', { color: C.red, size: 26, left: true }));
    grp(T.p(4, 0.6, 2.5) * (1 - T.p(5, 0.6, 2)), () => { pill(400, BY - 40, 200, 34, 'Berma provisional', C.dsoil, { tc: '#fff', size: 17 }); });
    // niveles
    const names = ['Nivel −1', 'Nivel −2', 'Nivel −3'];
    LEV.forEach((m, i) => grp(clamp(S.forj - i) * T.p(5), () => txt(names[i], 640, GY + m * PXM - 24, { size: 20, weight: 'bold', color: C.navy, stroke: 4 })));
    grp(S.bottom, () => txt('Losa de fondo', 640, BY - 24, { size: 20, weight: 'bold', color: C.navy, stroke: 4 }));
  },
});

// ---------- 5. LOSA CIMBRADA ----------
SCENES.push({
  title: 'La losa cimbrada (cubierta)',
  lines: [
    'La cubierta es una losa cimbrada: una losa continua de hormigón armado, construida en superficie y apoyada sobre cimbras.',
    'Sirve de techo para construir debajo los tres forjados del aparcamiento, y permite devolver el tráfico a la superficie.',
    'La secuencia es: montaje de la cimbra, ferrallado de alta densidad, hormigonado continuo con bomba y desencofrado.',
    'La armadura era tan densa que el técnico encargado dijo no haber visto nunca tanta en una losa: hubo que recolocar barras porque el hormigón apenas podía penetrar.',
  ],
  draw(T) {
    const ph = T.p(3, 0.7);
    photo('f000', 70, 100, 330, 440, { zoom: 1.08 + 0.05 * T.t / T.dur, alpha: 1 - ph, cap: 'Bomba de hormigón' });
    photo('f005', 70, 100, 330, 440, { zoom: 1.15, alpha: ph, cap: 'Ferralla de alta densidad' });
    // esquema de la secuencia
    const x0 = 480, x1 = 1180, gy = 470, sy = 330;
    const p1 = T.p(2, 1, 0.2), p2 = T.p(2, 1.2, 1.6), p3 = T.p(2, 1.5, 3.2), p4 = T.p(2, 1, 5);
    const pre = T.p(0, 1, 0.5); // estado inicial: losa terminada sobre cimbra
    const seq = T.c(2) > 0;
    const cim = seq ? p1 * (1 - p4) : pre, reb = seq ? p2 : pre, con = seq ? p3 : pre;
    soil(x0 - 20, gy, x1 - x0 + 40, 120);
    [x0 + 4, x1 - 22].forEach(x => concrete(x, sy + 6, 18, gy - sy + 100, { fill: '#AEB4BB' }));
    // cimbra
    for (let i = 0; i < 12; i++) { const x = x0 + 30 + i * 58, h = (gy - sy - 16) * ease(clamp(cim * 2 - i / 12)); if (h > 0) { line(x, gy, x, gy - h, { color: C.orange, lw: 5 }); if (i % 2 === 0 && i < 11) line(x, gy - h * 0.5, x + 58, gy - h * 0.5 + 10, { color: C.orange, lw: 3, alpha: 0.8 }); } }
    if (cim > 0.5) concrete(x0, sy + 6, x1 - x0, 8, { fill: '#C7A06B', alpha: clamp(cim * 2 - 1) }); // encofrado
    // ferralla
    if (reb > 0) { X.save(); X.globalAlpha = 1; for (let i = 0; i < 70 * reb; i++) line(x0 + 6 + i * 10, sy - 30, x0 + 6 + i * 10, sy + 4, { color: C.steel, lw: 2 }); line(x0, sy - 24, x0 + (x1 - x0) * reb, sy - 24, { color: C.steel, lw: 3 }); line(x0, sy - 2, x0 + (x1 - x0) * reb, sy - 2, { color: C.steel, lw: 3 }); X.restore(); }
    if (con > 0) { X.save(); X.globalAlpha = 0.85; X.fillStyle = C.conc; X.fillRect(x0, sy - 36, (x1 - x0) * con, 42); X.restore(); }
    if (seq && p3 > 0 && p3 < 1) { const px = x0 + (x1 - x0) * p3; line(px, 100, px, sy - 40, { color: '#3B8ED0', lw: 10 }); line(px, 100, px - 200, 120, { color: '#3B8ED0', lw: 10 }); emo('🏗️', px - 220, 110, 40); }
    // etiquetas
    grp(T.p(0, 0.6, 1.2) * (1 - T.p(1, 0.5)), () => { pill(830, sy - 70, 280, 38, 'Losa de hormigón armado', C.navy, { tc: '#fff', size: 18 }); pill(830, gy - 40, 140, 34, 'Cimbras', C.orange, { tc: '#fff', size: 18 }); });
    grp(T.p(1, 0.6) * (1 - T.p(2, 0.5)), () => {
      for (let i = 0; i < 3; i++) emo('🚗', ((T.c(1) * 80 + i * 240) % 700) + x0, sy - 60, 34);
      pill(830, 150, 340, 40, 'Techo para 3 forjados debajo', C.lorange, { size: 20 });
    });
    const st = ['1 · Cimbra', '2 · Ferrallado', '3 · Hormigonado', '4 · Desencofrado'];
    st.forEach((s, i) => { const on = [p1, p2, p3, p4][i]; grp(T.p(2, 0.5) * (1 - ph), () => pill(560 + i * 180, 150, 166, 40, s, on > 0.05 ? [C.orange, C.steel, C.grey, C.green][i] : '#ddd', { tc: on > 0.05 ? '#fff' : C.grey, size: 17 })); });
    // armadura densa
    grp(ph, () => {
      box(x0 + 60, 90, 580, 200, { fill: '#fff' });
      for (let i = 0; i < 26; i++) { circ(x0 + 100 + i * 20, 160, 7, { fill: C.steel }); circ(x0 + 100 + i * 20, 230, 7, { fill: C.steel }); }
      for (let i = 0; i < 4; i++) { const m = clamp(T.c(3) * 0.5 - i * 0.2); arrow(x0 + 160 + i * 140, 100, x0 + 160 + i * 140, 100 + 50 * ease(m), { color: C.blue, lw: 4, p: m }); }
      if (T.c(3) > 2.5) [0, 1, 2, 3].forEach(i => cross(x0 + 160 + i * 140, 160, 0.6, C.red));
      txt('¡Casi sin hueco para el hormigón!', x0 + 350, 270, { size: 22, weight: 'bold', color: C.red });
    });
  },
});

// ---------- 6. PANTALLA DE PILOTES Y BERMA ----------
SCENES.push({
  title: 'Pantallas de pilotes y berma',
  lines: [
    'Las pantallas de pilotes contienen el empuje del terreno, que las hace trabajar a flexocompresión.',
    'Mientras no existen los forjados, ese empuje puede hacer volcar la pantalla. Por eso se deja una berma de tierra provisional al pie.',
    'La berma contrarresta el vuelco hasta que se hormigonan los forjados definitivos, que acaban actuando como codales.',
    'Según los técnicos especializados, las dimensiones de la berma en esta obra eran algo preocupantes.',
    'Fíjate también en que el diámetro de los pilotes varía: es proporcional a los esfuerzos que deben soportar en la zona que tienen encima.',
  ],
  draw(T) {
    const last = T.p(4, 0.7);
    grp(1 - last, () => {
      photo('f004', 870, 100, 330, 440, { zoom: 1.04 + 0.04 * T.t / T.dur, cap: 'Pantalla de pilotes y berma' });
      const gy = 150, wx = 380, bot = 590, ex = 470;
      soil(80, gy, wx - 80, bot - gy); soil(wx + 30, ex, 420, bot - ex);
      X.save(); X.fillStyle = C.air; X.fillRect(wx + 30, gy, 420, ex - gy); X.restore();
      const berm = Math.max(T.p(1, 1, 2.5) * (1 - T.p(2, 1, 2.5)), T.p(3, 0.8));
      const tilt = (T.p(1, 1.2) * (1 - T.p(1, 0.8, 2.5))) * 0.07;
      X.save(); X.translate(wx + 15, bot); X.rotate(tilt);
      concrete(-15, gy - bot, 30, bot - gy, { fill: '#AEB4BB' }); X.restore();
      // empuje triangular
      const e = T.p(0, 1, 0.3);
      for (let i = 0; i < 6; i++) { const y = gy + 30 + i * 52, L = (20 + i * 22) * e; arrow(wx - 10 - L, y, wx - 8, y, { color: C.red, lw: 3, p: e, hs: 10 }); }
      line(wx - 10, gy + 10, wx - 10 - 132 * e, gy + 30 + 5 * 52, { color: C.red, lw: 2, alpha: 0.6 });
      grp(e, () => txt('Empuje del terreno', 220, gy - 20, { size: 22, weight: 'bold', color: C.red }));
      grp(T.p(1, 0.8) * (1 - T.p(1, 0.6, 2.5)), () => { X.save(); X.strokeStyle = C.red; X.lineWidth = 4; X.beginPath(); X.arc(wx + 15, bot, 330, -PI / 2 + 0.05, -PI / 2 + 0.35); X.stroke(); X.restore(); txt('¡Vuelco!', 560, 230, { size: 30, weight: 'bold', color: C.red, stroke: 5 }); });
      if (berm > 0) { poly([[wx + 30, ex], [wx + 30, ex - 120 * berm], [wx + 90, ex - 120 * berm], [wx + 30 + 240 * berm, ex]], { fill: '#C49E74', stroke: '#8a6a45' }); grp(berm, () => { txt('Berma', wx + 110, ex - 40, { size: 24, weight: 'bold', color: '#5a4026', stroke: 4 }); arrow(wx + 200, ex - 70, wx + 50, ex - 70, { color: C.dgreen, lw: 4 }); }); }
      const cod = T.p(2, 1, 1.2);
      [gy + 10, gy + 150].forEach((y, i) => { if (cod > 0) concrete(wx + 30, y, 420 * ease(clamp(cod * 2 - i)), 16, { fill: '#9AA2AB' }); });
      grp(T.p(2, 0.6, 2.5), () => txt('Forjados = codales', 640, gy + 90, { size: 24, weight: 'bold', color: C.navy, stroke: 5 }));
      grp(T.p(3, 0.6), () => { box(470, 520, 400, 64, { fill: C.lyellow, stroke: C.orange }); emo('⚠️', 500, 552, 30); txt('Berma algo justa según expertos', 680, 552, { size: 21, weight: 'bold' }); });
    });
    grp(last, () => {
      photo('f008', 70, 100, 360, 470, { zoom: 1.1, fy: 0.75 });
      const xs = [560, 700, 830, 950, 1070], ds = [70, 52, 40, 34, 28];
      soil(500, 520, 640, 80);
      xs.forEach((x, i) => {
        pop(T.p(4, 0.6, 0.5 + i * 0.25), x, 400, () => {
          concrete(x - ds[i] / 2, 230, ds[i], 290, { fill: '#BFC5CC' });
          const L = ds[i] * 1.8; arrow(x, 130, x, 130 + L * 0.9, { color: C.red, lw: 2 + ds[i] / 10, hs: 8 + ds[i] / 5 });
        });
      });
      concrete(500, 216, 640, 16, { fill: '#9AA2AB' });
      grp(T.p(4, 0.6, 2.5), () => { txt('Más carga → mayor diámetro', 820, 570 + 0, { size: 26, weight: 'bold', color: C.navy, stroke: 5 }); });
    });
  },
});

// ---------- 7. AUSCULTACIÓN ----------
SCENES.push({
  title: 'Auscultación del terreno',
  lines: [
    'Toda la obra está instrumentada para vigilar cómo se comporta el terreno mientras se excava.',
    'Los inclinómetros miden la deformación horizontal del terreno y de las pantallas, a lo largo de toda la profundidad.',
    'Los piezómetros miden las presiones intersticiales, es decir, la presión del agua en los poros del suelo.',
    'Las deformaciones medidas en la pantalla de pilotes fueron menores de dos milímetros: una estructura muy rígida y sólida frente al terreno.',
  ],
  draw(T) {
    const gy = 150, bot = 590;
    soil(80, gy, 520, bot - gy);
    X.save(); X.fillStyle = C.air; X.fillRect(600, gy, 30, 0); X.restore();
    concrete(520, gy - 6, 30, bot - gy + 6, { fill: '#AEB4BB' });
    X.save(); X.fillStyle = C.air; X.fillRect(550, gy, 100, bot - gy); X.restore();
    grp(T.p(0, 0.8) * (1 - T.p(1, 0.5)), () => { pill(330, 115, 300, 40, 'Terreno instrumentado', C.navy, { tc: '#fff', size: 20 }); });
    // inclinómetro
    const pi = T.p(1, 0.6);
    grp(pi, () => {
      X.save(); X.fillStyle = '#fff'; X.fillRect(452, gy - 20, 16, bot - gy + 10); X.strokeStyle = C.blue; X.lineWidth = 2; X.strokeRect(452, gy - 20, 16, bot - gy + 10); X.restore();
      const py = gy + (bot - gy - 30) * (0.5 - 0.5 * Math.cos(T.c(1) * 1.2));
      rr(450, py, 20, 34, 6); X.fillStyle = C.blue; X.fill(); line(460, gy - 20, 460, py, { color: '#333', lw: 1.5 });
      txt('Inclinómetro', 460, gy - 40, { size: 20, weight: 'bold', color: C.blue });
    });
    // piezómetro
    const pz = T.p(2, 0.6);
    grp(pz, () => {
      X.save(); X.fillStyle = '#fff'; X.fillRect(200, gy - 20, 14, 380); X.strokeStyle = C.teal; X.lineWidth = 2; X.strokeRect(200, gy - 20, 14, 380); X.restore();
      const wl = 300 + 20 * Math.sin(T.c(2) * 1.5);
      X.save(); X.fillStyle = C.lblue; X.fillRect(201, wl, 12, gy + 360 - wl); X.restore();
      line(80, wl, 520, wl, { color: C.blue, lw: 2, dash: [10, 6], alpha: 0.8 });
      txt('▽ nivel del agua', 300, wl - 14, { size: 18, color: C.blue, weight: 'bold' });
      txt('Piezómetro', 207, gy - 40, { size: 20, weight: 'bold', color: C.teal });
      for (let i = 0; i < 14; i++) circ(230 + rnd(i) * 200, wl + 30 + rnd(i + 4) * 200, 4, { fill: C.blue, alpha: 0.5 });
    });
    // panel de datos
    box(700, 100, 500, 470, { fill: '#fff' });
    if (T.c(2) < 0 || T.c(3) > 0) {
      txt('Inclinómetro: desplazamiento vs profundidad', 950, 130, { size: 19, weight: 'bold', alpha: pi });
      const gx = 760, gw = 400, g0 = 170, g1 = 540;
      grp(pi, () => {
        line(gx + 40, g0, gx + 40, g1, { color: C.ink, lw: 2 }); line(gx + 40, g0, gx + gw, g0, { color: C.ink, lw: 2 });
        txt('0', gx + 40, g0 - 14, { size: 16 }); txt('mm', gx + gw - 10, g0 - 14, { size: 16 }); txt('prof.', gx + 10, g1, { size: 16 });
        const lim = T.c(3) > 0 ? 1 : T.p(1, 3, 0.5);
        X.save(); X.strokeStyle = C.blue; X.lineWidth = 4; X.beginPath();
        for (let i = 0; i <= 40 * lim; i++) { const f = i / 40, d = 2 * Math.sin(f * PI * 0.9) * (1 - f * 0.3); const x = gx + 40 + d * 80, y = g0 + f * (g1 - g0); i ? X.lineTo(x, y) : X.moveTo(x, y); }
        X.stroke(); X.restore();
      });
      const q = T.p(3, 0.8, 0.5);
      grp(q, () => {
        line(gx + 40 + 2 * 80, g0, gx + 40 + 2 * 80, g1, { color: C.red, lw: 3, dash: [8, 6] });
        txt('2 mm', gx + 200, g1 + 14, { size: 18, weight: 'bold', color: C.red });
        pop(T.p(3, 0.7, 1.5), 1040, 380, () => { box(900, 330, 280, 110, { fill: C.lgreen, stroke: C.green }); txt('< 2 mm', 1040, 370, { size: 44, weight: 'bold', color: C.dgreen }); txt('estructura muy rígida', 1040, 415, { size: 20 }); });
      });
    } else {
      txt('Piezómetro: presión del agua', 950, 130, { size: 19, weight: 'bold' });
      grp(pz, () => {
        circ(950, 330, 140, { fill: '#F5F7FA', stroke: C.teal, lw: 6 });
        for (let i = 0; i <= 10; i++) { const a = PI * 0.75 + i * PI * 0.15; line(950 + 118 * Math.cos(a), 330 + 118 * Math.sin(a), 950 + 132 * Math.cos(a), 330 + 132 * Math.sin(a), { color: C.ink, lw: 3 }); }
        const a = PI * 0.75 + (0.45 + 0.1 * Math.sin(T.c(2) * 1.5)) * PI * 1.5;
        line(950, 330, 950 + 105 * Math.cos(a), 330 + 105 * Math.sin(a), { color: C.red, lw: 6 }); circ(950, 330, 12, { fill: C.ink });
        txt('Presión intersticial', 950, 410, { size: 22, weight: 'bold', color: C.teal });
        txt('agua en los poros del suelo', 950, 520, { size: 22 });
      });
    }
  },
});
