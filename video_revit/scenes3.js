// Escenas 3: casetón, rampa, requisitos generales, evaluación, normas y resumen

// ---------- 15. CASETÓN Y ESCALERAS ----------
SCENES.push({
  title: 'Casetón (PX) y escaleras',
  lines: [
    'El casetón del ascensor se cubre con una losa maciza de hormigón armado de 26 centímetros.',
    'Su cerramiento es igual que el peto de la cubierta: ladrillo hueco doble de 24 centímetros.',
    'Encima va una cubierta plana no transitable, con protección pesada. Tú defines su impermeabilización básica.',
    'Al ser la parte más alta del edificio, sobre ella se instalarán paneles solares para el agua caliente sanitaria.',
    'La escalera la diseñas tú. Su salida a la cubierta será similar al casetón del ascensor, o integrada en él.',
  ],
  draw(t) {
    setIso(330, 120, 21);
    // cubierta (trozo) y casetón
    extrude([[0, 0], [16, 0], [16, 12], [0, 12]], 0, 0.6, '#D9D4CA', { top: '#7FB55A' });
    const hx = 3.5 * ease(clamp(t.t / 1.5));
    grp(t.p(1) > 0 ? 1 : 0.9, () => extrude([[4, 3], [11, 3], [11, 9], [4, 9]], 0.6, 0.6 + hx, t.p(1) > 0 ? C.brick : '#D9D4CA', { top: '#B8B2A6' }));
    const zt = 0.6 + hx;
    grp(t.p(0), () => { ibox(3.8, 2.8, 11.2, 9.2, zt, zt + 0.35, C.concrete, {}); });
    grp(t.p(2), () => {
      extrude([[3.8, 2.8], [11.2, 2.8], [11.2, 9.2], [3.8, 9.2]], zt + 0.35, zt + 0.55, '#A9A397', { top: '#C9C3B5' });
      for (let i = 0; i < 60; i++) { const q = ip(4 + 7 * rnd(i), 3 + 6 * rnd(i + 99), zt + 0.55); circ(q[0], q[1], 2.2, { fill: '#8E877A' }); }
    });
    grp(t.p(3), () => {
      for (let i = 0; i < 3; i++) {
        const y0 = 3.4 + i * 1.9;
        poly([ip(4.6, y0, zt + 0.6), ip(10.4, y0, zt + 0.6), ip(10.4, y0 + 1.2, zt + 1.5), ip(4.6, y0 + 1.2, zt + 1.5)], { fill: '#24467A', stroke: '#A9CBF2', lw: 1.5 });
      }
      emo('☀️', 640, 140, 54);
    });
    const cards = [
      ['Losa maciza HA 26 cm', 'forjado del casetón', C.navy],
      ['Cerramiento = peto PC', 'LHD 24 cm enlucido', C.brick],
      ['Cubierta plana no transitable', 'protección pesada (grava)', C.grey],
      ['Paneles solares ACS', 'agua caliente sanitaria', '#24467A'],
      ['Escalera: diseño libre', 'cierre similar o integrado', C.orange],
    ];
    cards.forEach(([a, b, c], i) => slide(t.p(i), 40, 0, () => {
      const y = 100 + i * 92; box(780, y, 430, 76, { fill: '#fff' }); box(780, y, 10, 76, { fill: c, r: [14, 0, 0, 14], shadow: false });
      txt(a, 808, y + 28, { size: 21, weight: 'bold', align: 'left' }); txt(b, 808, y + 55, { size: 17, align: 'left', color: C.grey });
    }));
  }
});

// ---------- 16. RAMPA ----------
SCENES.push({
  title: 'Rampa de acceso al sótano',
  lines: [
    V('La rampa es una losa maciza de hormigón HA-25/B/20/XC3, de 20 centímetros, armada con acero B-500S.', 'La rampa es una losa maciza de hormigón, H A veinticinco, B, veinte, X C tres, de veinte centímetros de espesor, armada con acero B quinientos S.'),
    'Se apoya en vigas transversales descolgadas.',
    V('Su pendiente máxima es del 18 %.', 'Su pendiente máxima es del dieciocho por ciento.'),
    'El pavimento es un microaglomerado impreso y coloreado, que forma una capa de rodadura de 5 centímetros.',
  ],
  draw(t) {
    const x0 = 120, y0 = 230, x1 = 880, y1 = 430;
    // terreno y vial
    poly([[40, y0], [x0, y0], [x1, y1], [x1, 560], [40, 560]], { fill: '#C9B79C' });
    box(40, y0 - 14, x0 - 40, 14, { fill: '#6F767D', r: 0, shadow: false }); txt('Vial', 80, y0 - 30, { size: 18, weight: 'bold' });
    box(x1, y1, 340, 30, { fill: C.concrete, r: 0, shadow: false, stroke: C.ink, lw: 1.5 }); txt('Sótano (losa)', x1 + 170, y1 + 50, { size: 17, weight: 'bold' });
    const ang = Math.atan2(y1 - y0, x1 - x0), nx = -Math.sin(ang), ny = Math.cos(ang);
    const T = 20;
    grp(t.p(0), () => {
      poly([[x0, y0], [x1, y1], [x1 + nx * T, y1 + ny * T], [x0 + nx * T, y0 + ny * T]], { fill: C.concrete, stroke: C.ink, lw: 1.5 });
      for (let k = 0.05; k < 1; k += 0.05) { const px = lerp(x0, x1, k) + nx * T * 0.7, py = lerp(y0, y1, k) + ny * T * 0.7; circ(px, py, 2, { fill: C.steel }); }
    });
    grp(t.p(1), () => {
      [0.2, 0.45, 0.7, 0.92].forEach(k => {
        const px = lerp(x0, x1, k) + nx * T, py = lerp(y0, y1, k) + ny * T;
        box(px - 16, py - 4, 32, 40, { fill: shade(C.concrete, -0.12), r: 0, shadow: false, stroke: C.ink, lw: 1.5 });
      });
      txt('vigas transversales descolgadas', 560, 470, { size: 17, weight: 'bold' });
    });
    grp(t.p(3), () => {
      poly([[x0, y0], [x1, y1], [x1 - nx * 7, y1 - ny * 7], [x0 - nx * 7, y0 - ny * 7]], { fill: '#B5523B', stroke: '#7A2E1E', lw: 1 });
    });
    // coche bajando
    const cp = clamp((t.t - (t.c(3) > 0 ? 0 : 1e9)) / 6);
    if (t.p(2) > 0) {
      const k = 0.1 + 0.8 * ((t.t * 0.08) % 1), px = lerp(x0, x1, k), py = lerp(y0, y1, k);
      X.save(); X.translate(px, py - 4); X.rotate(ang); X.globalAlpha *= t.p(2);
      box(-40, -34, 80, 26, { fill: C.blue, r: 8, shadow: false }); box(-24, -50, 44, 20, { fill: C.blue, r: 6, shadow: false }); box(-18, -46, 32, 12, { fill: '#DDEFFA', r: 3, shadow: false });
      circ(-24, -8, 9, { fill: C.ink }); circ(24, -8, 9, { fill: C.ink }); X.restore();
    }
    // pendiente
    grp(t.p(2), () => {
      const ax = 560, ay = lerp(y0, y1, (ax - x0) / (x1 - x0)) - 70;
      line(ax, ay, ax + 200, ay, { color: C.red, lw: 2, dash: [6, 4] });
      line(ax + 200, ay, ax + 200, ay + 200 * (y1 - y0) / (x1 - x0), { color: C.red, lw: 2, dash: [6, 4] });
      line(ax, ay, ax + 200, ay + 200 * (y1 - y0) / (x1 - x0), { color: C.red, lw: 3 });
      pill(ax + 110, ay - 34, 170, 46, '≤ 18 %', C.red, { size: 26, tc: '#fff' });
    });
    const cards = [['Losa maciza 20 cm', 'HA-25/B/20/XC3 · acero B-500S', C.navy], ['Vigas transversales', 'descolgadas', C.grey], ['Pendiente máx. 18 %', '', C.red], ['Microaglomerado 5 cm', 'impreso y coloreado', '#B5523B']];
    cards.forEach(([a, b, c], i) => slide(t.p(i), 0, -20, () => {
      const x = 80 + i * 285; box(x, 95, 270, 72, { fill: '#fff' }); box(x, 95, 270, 8, { fill: c, r: [14, 14, 0, 0], shadow: false });
      txt(a, x + 135, 127, { size: 19, weight: 'bold' }); if (b) txt(b, x + 135, 152, { size: 15, color: C.grey });
    }));
  }
});

// ---------- 17. REQUISITOS GENERALES ----------
SCENES.push({
  title: 'Requisitos generales del modelo',
  lines: [
    'La estructura es de hormigón armado y, aunque no se piden cálculos, debe ser estructuralmente adecuada, incluida la cimentación.',
    'El modelo debe tener cerramientos exteriores, particiones interiores, puertas y ventanas.',
    'Y algunos muebles adecuados al uso de cada planta.',
    'Muy importante: evita duplicar mediciones. Por ejemplo, si haces una solera sobre zapatas, la solera debe quedar recortada por los pilares.',
    'Lo mismo con los suelos frente a los tabiques. Si un elemento ya ocupa un volumen, no lo midas dos veces.',
    'Y no hace falta detallarlo todo: el falso techo, por ejemplo, basta con ponerlo en algunas estancias. Pero no dejes de representar ningún elemento pedido.',
  ],
  draw(t) {
    const items = [['🏛️', 'Estructura HA + cimentación adecuada'], ['🧱', 'Cerramientos y particiones'], ['🚪', 'Puertas y ventanas'], ['🪑', 'Mobiliario según el uso'], ['📏', 'Sin mediciones duplicadas'], ['🎯', 'Detalle suficiente, sin omitir nada']];
    const ps = [t.p(0), t.p(1), t.p(1, 0.6, 0.8), t.p(2), t.p(3), t.p(5)];
    bullets(items, 70, 130, ps, { lh: 64, size: 23, isize: 30 });
    // solera y pilares
    const cx = 760, cy = 160, w = 440, h = 300;
    grp(t.p(3), () => {
      txt('Solera y pilares (planta)', cx + w / 2, cy - 30, { size: 20, weight: 'bold', color: C.navy });
      const cut = t.p(3, 1, 3.5);
      box(cx, cy, w, h, { fill: '#D6DADF', r: 4, shadow: false, stroke: C.ink, lw: 2 });
      [[0.2, 0.25], [0.5, 0.25], [0.8, 0.25], [0.2, 0.75], [0.5, 0.75], [0.8, 0.75]].forEach(([u, v]) => {
        const x = cx + u * w, y = cy + v * h;
        if (cut > 0) box(x - 24, y - 24, 48, 48, { fill: '#fff', r: 0, shadow: false, alpha: cut });
        box(x - 18, y - 18, 36, 36, { fill: cut > 0.5 ? C.steel : 'rgba(224,83,61,0.75)', r: 0, shadow: false, stroke: C.ink, lw: 1.5 });
      });
      const ok = cut > 0.5;
      pill(cx + w / 2, cy + h + 40, 340, 50, ok ? '✓ Solera recortada por pilares' : '✗ Volumen medido dos veces', ok ? C.green : C.red, { size: 20, tc: '#fff' });
    });
    grp(t.p(5), () => { box(cx, cy + h + 80, w, 0, {}); });
  }
});

// ---------- 18. EVALUACIÓN ----------
SCENES.push({
  title: '¿Cómo se evalúa? (10 puntos)',
  lines: [
    'Veamos cómo se reparte la nota, sobre 10 puntos.',
    '6 puntos: el modelo 3D bien definido, con todos los elementos en su sitio, y enviado correctamente: formatos, ZIP y nombres.',
    '1 punto: las vistas. Que no falte ninguna y que tengan toda la información. Los materiales deben tener texturas adecuadas.',
    '1 punto: las tablas de planificación y cantidades para medir los elementos.',
    '2 puntos: los planos necesarios para entender el modelo en papel, con escalas, formatos y cajetines correctos.',
  ],
  draw(t) {
    const segs = [[6, C.navy, 'Modelo 3D + entrega', '🏗️'], [1, C.teal, 'Vistas + texturas', '👁️'], [1, C.orange, 'Tablas', '📊'], [2, C.purple, 'Planos', '📐']];
    const x0 = 80, W0 = 1120, y = 140, h = 90;
    grp(t.p(0), () => { box(x0, y, W0, h, { fill: '#E3E8EE', r: 12, shadow: false }); for (let i = 0; i <= 10; i++) txt(String(i), x0 + i * W0 / 10, y - 18, { size: 16, color: C.grey }); });
    let acc = 0;
    segs.forEach(([v, c, s, e], i) => {
      const p = t.p(i + 1, 1); const xs = x0 + acc * W0 / 10, ww = v * W0 / 10 * p; acc += v;
      if (p > 0) {
        box(xs, y, ww, h, { fill: c, r: 0, shadow: false, stroke: '#fff', lw: 3 });
        grp(p, () => txt(v + (v === 1 ? ' pt' : ' pts'), xs + v * W0 / 20, y + h / 2, { size: v > 1 ? 34 : 24, weight: 'bold', color: '#fff' }));
      }
      slide(t.p(i + 1), 0, 30, () => {
        const cx = 80 + i * 285; box(cx, 290, 265, 230, { fill: '#fff' }); box(cx, 290, 265, 10, { fill: c, r: [14, 14, 0, 0], shadow: false });
        emo(e, cx + 132, 345, 40); txt(s, cx + 132, 395, { size: 21, weight: 'bold' });
        const det = [['Elementos y condiciones', 'Formatos, ZIP, nombres'], ['Todas las necesarias', 'Materiales con textura'], ['Planificación / cantidades', 'Medición de elementos'], ['Escalas y formatos', 'Cajetines y tablas']][i];
        det.forEach((d, j) => txt(d, cx + 132, 435 + j * 28, { size: 17, color: C.grey }));
        txt(v + ' / 10', cx + 132, 500, { size: 20, weight: 'bold', color: c });
      });
    });
  }
});

// ---------- 19. NORMAS DE ENTREGA ----------
SCENES.push({
  title: 'Normas y observaciones',
  lines: [
    'El trabajo es obligatoriamente individual, y se valora el orden y la pulcritud de la presentación.',
    V('Se entrega por UACloud, en la aplicación Evaluación, antes del 30 de noviembre de 2026 a las 23:59.', 'Se entrega por U A cloud, en la aplicación Evaluación, antes del treinta de noviembre de dos mil veintiséis, a las veintitrés cincuenta y nueve.'),
    V('Si no se cumple el plazo o la forma de entrega, se aplica una penalización del 40 %.', 'Si no se cumple el plazo o la forma de entrega, se aplica una penalización del cuarenta por ciento.'),
    'Y cualquier indicio de plagio se tramitará de oficio, según la guía docente.',
  ],
  draw(t) {
    const cards = [
      ['👤', 'Individual', 'Orden y pulcritud', C.navy],
      ['☁️', 'UACloud · Evaluación', '30/11/2026 · 23:59 h', C.teal],
      ['⏰', '−40 %', 'fuera de plazo o de forma', C.red],
      ['🚫', 'Plagio', 'se tramita de oficio', C.purple],
    ];
    cards.forEach(([e, a, b, c], i) => {
      const x = 90 + (i % 2) * 560, y = 110 + Math.floor(i / 2) * 230;
      pop(t.p(i), x + 250, y + 100, () => {
        box(x, y, 500, 200, { fill: '#fff' }); box(x, y, 14, 200, { fill: c, r: [14, 0, 0, 14], shadow: false });
        emo(e, x + 90, y + 100, 64);
        txt(a, x + 160, y + 80, { size: i === 2 ? 52 : 30, weight: 'bold', align: 'left', color: c });
        txt(b, x + 160, y + 135, { size: 22, align: 'left', color: C.grey, weight: 'bold' });
      });
    });
  }
});

// ---------- 20. RESUMEN ----------
SCENES.push({
  title: 'Resumen: tu lista de comprobación',
  lines: [
    'Resumiendo. Elige el uso y la parcela, y comunica la referencia catastral.',
    'Modela el terreno en coordenadas UTM y el edificio en L, con sus cinco niveles, escalera y ascensor.',
    'Aplica las soluciones constructivas de cada planta, la rampa, la cubierta verde y el casetón.',
    'Prepara las vistas, las tablas de cantidades y los planos con cajetín.',
    V('Exporta a IFC4x3, comprime todo en un ZIP con el nombre correcto y entrégalo a tiempo. ¡Mucho ánimo!', 'Exporta a I F C cuatro por tres, comprime todo en un ZIP con el nombre correcto, y entrégalo a tiempo. ¡Mucho ánimo!'),
  ],
  draw(t) {
    const items = ['Uso + parcela + ref. catastral', 'Terreno UTM + edificio en L (5 niveles)', 'Soluciones constructivas, rampa, cubierta', 'Vistas, tablas y planos', '.RVT + .IFC → ZIP → UACloud (30/11)'];
    bullets(items, 70, 140, items.map((_, i) => t.p(i)), { check: true, lh: 72, size: 24, weight: 'bold', color: C.green });
    setIso(1000, 200, 9);
    const b = clamp(t.t / 8);
    building({ ps: 0, pb: clamp(b * 4), p1: clamp(b * 4 - 1), pc: clamp(b * 4 - 2), px: clamp(b * 4 - 3) }, 0, { ground: 1, panels: 1 });
    pop(t.p(4, 0.8, 2.5), 640, 560, () => { box(380, 530, 520, 60, { fill: C.orange }); txt('¡Mucho ánimo con la práctica! 💪', 640, 560, { size: 26, weight: 'bold', color: '#fff' }); });
  }
});
