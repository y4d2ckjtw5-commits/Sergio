// Escenas 1: introducción, entrega, contenido del modelo, uso, parcela, terreno, forma y plantas
// Cada línea: "texto" o ["subtítulo", "texto para la voz"]
const SCENES = [];
const V = (s, v) => [s, v];

// ---------- Edificio isométrico ----------
const P1PLAN = [[0, 0], [19, 0], [19, 10], [11, 10], [11, 20], [0, 20]];
// pr: progreso por nivel {ps,pb,p1,pc,px}; ex: separación (explosionado)
function building(pr, ex = 0, o = {}) {
  const g = k => (pr[k] ?? 1);
  const grow = (k, z0, z1) => z0 + (z1 - z0) * ease(g(k));
  const dz = i => i * ex;
  if (o.ground) {
    poly([ip(-6, -6, 0), ip(33, -6, 0), ip(33, 27, 0), ip(-6, 27, 0)], { fill: '#CFE3B6', stroke: '#9FBF84', lw: 2, alpha: o.ground });
    // vial
    poly([ip(-6, 27, 0), ip(33, 27, 0), ip(33, 33, 0), ip(-6, 33, 0)], { fill: '#8E959C', alpha: o.ground });
    for (let x = -4; x < 32; x += 5) poly([ip(x, 29.8, 0), ip(x + 2.5, 29.8, 0), ip(x + 2.5, 30.2, 0), ip(x, 30.2, 0)], { fill: '#fff', alpha: o.ground });
  }
  if (g('ps') > 0 && !o.ground) extrude(LPLAN, -3.5 + dz(0), grow('ps', -3.5, 0) + dz(0), '#9AA3AD', { alpha: clamp(g('ps') * 3) });
  if (g('pb') > 0) extrude(LPLAN, dz(1), grow('pb', 0, 3.5) + dz(1), C.brick, { alpha: clamp(g('pb') * 3), win: C.glass, top: '#E8E2D6' });
  if (g('p1') > 0) {
    const a = clamp(g('p1') * 3), z0 = 3.5 + dz(2), z1 = grow('p1', 3.5, 7) + dz(2);
    extrude(P1PLAN, z0, z1, '#E9DCC3', { alpha: a, win: C.glass, top: '#F3EEE4' });
    // terraza: forjado y soportes de acero
    if (z1 > z0 + 2.5) {
      [[25, 0], [25, 10], [19.3, 10], [22, 10]].forEach(([x, y]) => { const A = ip(x - 0.3, y - 0.3, z0), B = ip(x - 0.3, y - 0.3, z1 - 0.35); line(A[0], A[1], B[0], B[1], { color: C.steel, lw: 4, alpha: a }); });
      ibox(19, 0, 25, 10, z0 - 0.0, z0 + 0.05, '#D8D2C6', { alpha: a });
      ibox(19, 0, 25, 10, z1 - 0.35, z1, '#D8D2C6', { alpha: a });
    }
  }
  if (g('pc') > 0) extrude(LPLAN, 7 + dz(3), grow('pc', 7, 8.1) + dz(3), '#D9D4CA', { alpha: clamp(g('pc') * 3), top: '#7FB55A' });
  if (g('px') > 0) {
    const a = clamp(g('px') * 3), z0 = 8.1 + dz(4), z1 = grow('px', 8.1, 11) + dz(4);
    extrude([[5, 4], [11, 4], [11, 10], [5, 10]], z0, z1, '#D9D4CA', { alpha: a, top: '#B8B2A6' });
    if (o.panels && z1 > 10.9) for (let i = 0; i < 2; i++) {
      const y0 = 4.6 + i * 2.8;
      poly([ip(5.6, y0, z1 + 0.1), ip(10.4, y0, z1 + 0.1), ip(10.4, y0 + 2, z1 + 1.1), ip(5.6, y0 + 2, z1 + 1.1)], { fill: '#2C4A7A', stroke: '#9EC3F0', lw: 1.5, alpha: a * o.panels });
    }
  }
  if (o.core) { // núcleo escalera + ascensor
    grp(o.core, () => { extrude([[7, 6], [11, 6], [11, 10], [7, 10]], -4.6 + dz(0), 11 + dz(4), C.orange, { alpha: 0.75, top: C.yellow }); });
  }
}

// ---------- 0. INTRO ----------
SCENES.push({
  title: 'Práctica de evaluación: REVIT',
  lines: [
    'Bienvenido. En este vídeo vamos a ver, paso a paso, qué pide la práctica de evaluación de Revit.',
    V('Asignatura: Edificación y Construcción Industrializada. Ingeniería Civil, curso 2026-27.', 'Asignatura: Edificación y Construcción Industrializada. Ingeniería Civil, curso dos mil veintiséis, veintisiete.'),
    V('El objetivo: demostrar lo aprendido en clase construyendo un modelo BIM completo de un edificio.', 'El objetivo: demostrar lo aprendido en clase construyendo un modelo bim completo de un edificio.'),
    V('La fecha límite de entrega es el 30 de noviembre de 2026 a las 23:59 h.', 'La fecha límite de entrega es el treinta de noviembre de dos mil veintiséis, a las veintitrés cincuenta y nueve.'),
  ],
  draw(t) {
    setIso(900, 250, 11.5);
    const b = clamp(t.t / 10);
    building({ ps: 0, pb: clamp(b * 4), p1: clamp(b * 4 - 1), pc: clamp(b * 4 - 2), px: clamp(b * 4 - 3) }, 0, { ground: 1, panels: 1 });
    slide(clamp(t.t / 1.2), -40, 0, () => {
      txt('Modelo BIM', 80, 170, { size: 30, color: C.orange, weight: 'bold', align: 'left' });
      txt('con Autodesk Revit', 80, 225, { size: 52, weight: 'bold', align: 'left', color: C.navy });
      txt('¿Qué hay que hacer exactamente?', 80, 280, { size: 28, align: 'left', color: C.grey });
    });
    slide(t.p(1), -40, 0, () => {
      box(80, 320, 470, 96, { fill: '#fff' });
      txt('Edificación y Construcción Industrializada', 100, 352, { size: 21, weight: 'bold', align: 'left' });
      txt('Ingeniería Civil · Curso 2026-27', 100, 388, { size: 21, align: 'left', color: C.grey });
    });
    slide(t.p(2), -40, 0, () => { emo('🎯', 102, 452, 30); txt('Objetivo: demostrar lo aprendido en clase', 130, 452, { size: 22, align: 'left' }); });
    pop(t.p(3), 300, 530, () => {
      box(80, 495, 500, 72, { fill: C.red });
      emo('📅', 122, 531, 34);
      txt('Entrega: 30/11/2026 · 23:59 h', 155, 531, { size: 27, weight: 'bold', color: '#fff', align: 'left' });
    });
  }
});

// ---------- 1. QUÉ ENTREGAR ----------
function fileIcon(x, y, ext, col, a = 1) {
  grp(a, () => {
    poly([[x - 45, y - 60], [x + 25, y - 60], [x + 45, y - 40], [x + 45, y + 60], [x - 45, y + 60]], { fill: '#fff', stroke: col, lw: 4 });
    poly([[x + 25, y - 60], [x + 25, y - 40], [x + 45, y - 40]], { fill: col });
    box(x - 38, y + 5, 76, 32, { fill: col, r: 6, shadow: false });
    txt(ext, x, y + 22, { size: 20, weight: 'bold', color: '#fff' });
  });
}
SCENES.push({
  title: '¿Qué hay que entregar?',
  lines: [
    V('Tienes que entregar dos ficheros: el modelo nativo de Revit, en formato .rvt…', 'Tienes que entregar dos ficheros: el modelo nativo de Revit, en formato punto erre uve te.'),
    V('…y el mismo modelo exportado a IFC4x3, el formato abierto de intercambio BIM.', 'Y el mismo modelo exportado a I F C cuatro por tres, el formato abierto de intercambio bim.'),
    'Los dos ficheros se comprimen en un único ZIP, que es lo que se entrega.',
    V('Nombre: 33536ECI26_PRVT_ seguido de las 3 últimas cifras de tu DNI o NIE (βδμ).', 'Los nombres siguen este patrón: treinta y tres, quinientos treinta y seis, E C I veintiséis, guion bajo, P R V T, guion bajo, y las tres últimas cifras de tu D N I o N I E.'),
    'Ojo: envía siempre el fichero final, no los temporales.',
    'Si el ZIP es demasiado grande, entrega un PDF con un enlace de WeTransfer o similar. Si el enlace no funciona, la práctica se considera no entregada.',
  ],
  draw(t) {
    pop(t.p(0), 220, 230, () => { fileIcon(220, 230, '.RVT', C.blue); txt('Modelo nativo Revit', 220, 320, { size: 20, weight: 'bold' }); });
    pop(t.p(1), 470, 230, () => { fileIcon(470, 230, '.IFC', C.teal); txt('IFC4x3 (formato abierto)', 470, 320, { size: 20, weight: 'bold' }); });
    grp(t.p(1), () => txt('+', 345, 230, { size: 50, weight: 'bold', color: C.grey }));
    pop(t.p(2, 0.8, 0.8), 860, 230, () => {
      box(780, 150, 160, 160, { fill: C.yellow, r: 18 });
      for (let i = 0; i < 6; i++) box(852, 158 + i * 18, 16, 10, { fill: i % 2 ? '#fff' : C.ink, r: 2, shadow: false });
      txt('.ZIP', 860, 280, { size: 30, weight: 'bold' });
      txt('¡Esto es lo que se entrega!', 860, 335, { size: 20, weight: 'bold', color: C.red });
    });
    grp(t.p(2), () => { arrow(620, 230, 765, 230, { p: t.p(2, 1), color: C.grey, lw: 4 }); });
    slide(t.p(3), 0, 30, () => {
      box(90, 370, 1100, 120, { fill: '#fff' });
      const parts = [['33536ECI26_PRVT_', C.navy], ['βδμ', C.red]];
      txt('33536ECI26_PRVT_βδμ.RVT', 140, 405, { size: 26, weight: 'bold', align: 'left', color: C.navy, family: '"Liberation Mono",monospace' });
      txt('33536ECI26_PRVT__βδμ.IFC', 140, 445, { size: 26, weight: 'bold', align: 'left', color: C.teal, family: '"Liberation Mono",monospace' });
      txt('33536ECI26_PRVT_βδμ.zip', 640, 425, { size: 26, weight: 'bold', align: 'left', color: '#A0781A', family: '"Liberation Mono",monospace' });
      txt('βδμ = 3 últimas cifras del DNI/NIE', 1170, 470, { size: 17, align: 'right', color: C.red, weight: 'bold' });
    });
    slide(t.p(4), -30, 0, () => { emo('⚠️', 120, 530, 30); txt('Fichero final, no temporales', 150, 530, { size: 23, align: 'left', weight: 'bold' }); });
    slide(t.p(5), 30, 0, () => { emo('🔗', 640, 530, 30); txt('¿Muy grande? → PDF con enlace WeTransfer', 670, 530, { size: 23, align: 'left', weight: 'bold' }); });
  }
});

// ---------- 2. CONTENIDO DEL MODELO ----------
SCENES.push({
  title: '¿Qué debe contener el modelo?',
  lines: [
    V('El modelo se desarrolla con un nivel de detalle LOD 300, el de las familias que trae Revit por defecto.', 'El modelo se desarrolla con un nivel de detalle L O D trescientos, el de las familias que trae Revit por defecto.'),
    V('Puedes descargar objetos BIM gratuitos de fabricantes, como Roca, o de webs como BIMobject.', 'Puedes descargar objetos bim gratuitos de fabricantes, como Roca, o de webs como bim óbyect.'),
    'Necesitas todas las vistas precisas para entender el modelo: plantas, planos de techo, estructura, alzados, secciones y 3D.',
    'Esas vistas se colocan en planos, con formato, escala y cajetín adecuados.',
    'Y debes incluir tablas de planificación y cantidades para medir los elementos.',
    'En los forjados basta con su envolvente: no hace falta dibujar viguetas, bovedillas, casetones ni armados.',
  ],
  draw(t) {
    // LOD
    slide(t.p(0), 0, -20, () => {
      txt('Nivel de detalle (LOD)', 270, 115, { size: 22, weight: 'bold' });
      [100, 200, 300, 350, 400, 500].forEach((v, i) => {
        const on = v === 300; pill(80 + i * 76 + 30, 160, 66, on ? 54 : 40, String(v), on ? C.orange : '#DDE3EA', { size: on ? 24 : 18, tc: on ? '#fff' : C.grey });
      });
    });
    slide(t.p(1), 0, 20, () => { emo('📦', 100, 225, 28); txt('Objetos BIM gratis: Roca, BIMobject…', 125, 225, { size: 20, align: 'left', color: C.grey }); });
    // vistas
    const views = [['🗺️', 'Plantas'], ['💡', 'Techos'], ['🏛️', 'Estructura'], ['🏢', 'Alzados'], ['✂️', 'Secciones'], ['🧊', '3D']];
    views.forEach(([e, s], i) => {
      const x = 600 + (i % 3) * 205, y = 110 + Math.floor(i / 3) * 110;
      pop(t.p(2, 0.6, i * 0.25), x + 90, y + 45, () => { box(x, y, 180, 90, { fill: '#fff' }); emo(e, x + 40, y + 45, 34); txt(s, x + 70, y + 45, { size: 21, weight: 'bold', align: 'left' }); });
    });
    // plano con cajetín
    pop(t.p(3), 270, 410, () => {
      box(90, 300, 360, 230, { fill: '#fff', stroke: C.ink, lw: 2, r: 4 });
      box(105, 315, 220, 200, { fill: C.lblue2, r: 2, shadow: false });
      poly([[140, 480], [140, 360], [200, 360], [200, 420], [290, 420], [290, 480]], { stroke: C.navy, lw: 3 });
      box(335, 440, 100, 75, { fill: '#F4F4F4', stroke: C.ink, lw: 1.5, r: 0, shadow: false });
      txt('CAJETÍN', 385, 462, { size: 13, weight: 'bold' }); txt('E 1:100', 385, 490, { size: 13, color: C.grey });
      txt('Planos (láminas)', 270, 550, { size: 20, weight: 'bold' });
    });
    // tabla
    pop(t.p(4), 680, 420, () => {
      box(520, 300, 330, 230, { fill: '#fff' });
      box(520, 300, 330, 40, { fill: C.navy, r: [14, 14, 0, 0], shadow: false });
      txt('Tabla de cantidades', 685, 320, { size: 19, weight: 'bold', color: '#fff' });
      const rows = [['Muros', '412 m²'], ['Suelos', '1.120 m²'], ['Pilares', '36 ud'], ['Puertas', '28 ud']];
      rows.forEach(([a, b], i) => { txt(a, 545, 365 + i * 40, { size: 19, align: 'left' }); txt(b, 825, 365 + i * 40, { size: 19, align: 'right', color: C.grey }); line(540, 385 + i * 40, 830, 385 + i * 40, { lw: 1, color: '#DDD' }); });
    });
    pop(t.p(5), 1040, 420, () => {
      box(890, 300, 300, 230, { fill: C.lyellow });
      txt('Forjados:', 1040, 330, { size: 21, weight: 'bold' });
      box(915, 360, 250, 34, { fill: C.concrete, r: 3, shadow: false }); txt('solo envolvente ✓', 1040, 378, { size: 18, weight: 'bold' });
      ['viguetas', 'bovedillas', 'casetones', 'armados'].forEach((s, i) => { txt(s, 1040, 420 + i * 26, { size: 18, color: C.grey }); line(990, 420 + i * 26, 1090, 420 + i * 26, { color: C.red, lw: 2 }); });
    });
  }
});

// ---------- 3. USO ----------
SCENES.push({
  title: 'Paso 1 · El uso del edificio',
  lines: [
    'Lo primero es decidir el uso del edificio, que debe estar relacionado con la ingeniería civil.',
    'Por ejemplo, un edificio de control y gestión de una depuradora, una presa, una carretera o un ferrocarril.',
    V('No vale un uso residencial, administrativo, sanitario, religioso, docente o cultural: la LOE reserva esos proyectos a los arquitectos.', 'No vale un uso residencial, administrativo, sanitario, religioso, docente o cultural: la ley de ordenación de la edificación reserva esos proyectos a los arquitectos.'),
  ],
  draw(t) {
    pop(t.p(0), 640, 150, () => { box(340, 105, 600, 90, { fill: C.navy }); emo('🏗️', 400, 150, 40); txt('Edificio de control y gestión', 670, 150, { size: 30, weight: 'bold', color: '#fff' }); });
    const ex = [['💧', 'Depuradora'], ['🌊', 'Presa'], ['🛣️', 'Carretera'], ['🚆', 'Ferrocarril']];
    ex.forEach(([e, s], i) => {
      const x = 130 + i * 265;
      pop(t.p(1, 0.6, i * 0.35), x + 110, 300, () => { box(x, 230, 220, 140, { fill: '#fff' }); emo(e, x + 110, 280, 54); txt(s, x + 110, 343, { size: 24, weight: 'bold' }); });
      grp(t.p(1, 0.6, i * 0.35), () => arrow(640, 198, x + 110, 228, { color: C.grey, lw: 2 }));
    });
    slide(t.p(2), 0, 30, () => {
      box(130, 400, 1015, 150, { fill: C.lpink });
      txt('🚫  No permitidos (LOE, Ley 38/1999):', 160, 435, { size: 22, weight: 'bold', align: 'left', color: C.red });
      ['residencial', 'administrativo', 'sanitario', 'religioso', 'docente', 'cultural'].forEach((s, i) => {
        const x = 165 + (i % 6) * 162; pill(x + 70, 500, 150, 44, s, '#fff', { size: 19, tc: C.red });
        line(x + 10, 500, x + 130, 500, { color: C.red, lw: 2.5, alpha: 0.8 });
      });
    });
  }
});

// ---------- 4. PARCELA ----------
const PARCEL = [[90, 140], [520, 120], [560, 470], [110, 520]];
SCENES.push({
  title: 'Paso 2 · La parcela (Catastro)',
  lines: [
    'Después eliges una parcela real, en cualquier punto de España, desde la Sede Electrónica del Catastro.',
    V('Descargas su cartografía en formato DXF y la usas para implantar el edificio.', 'Descargas su cartografía en formato D X F y la usas para implantar el edificio.'),
    V('El modelo debe quedar situado en las coordenadas UTM reales de la parcela.', 'El modelo debe quedar situado en las coordenadas U T M reales de la parcela.'),
    'La parcela debe ser adecuada: lo bastante grande para el edificio más los retranqueos, y cercana a la infraestructura elegida.',
    'Y no puede repetirse entre estudiantes: en cuanto la elijas, envía su referencia catastral al profesor Óscar Galao por tutoría.',
  ],
  draw(t) {
    // mapa
    box(60, 95, 540, 470, { fill: '#F2EEE2', r: 10 });
    X.save(); X.globalAlpha = 0.5; for (let i = 0; i < 6; i++) { line(60, 120 + i * 85, 600, 100 + i * 85, { color: '#D8D0BC', lw: 1.5 }); line(80 + i * 100, 95, 100 + i * 95, 565, { color: '#D8D0BC', lw: 1.5 }); } X.restore();
    const p0 = t.p(0, 1.2);
    grp(p0, () => { poly(PARCEL, { fill: 'rgba(242,158,56,0.25)', stroke: C.orange, lw: 4 }); txt('Parcela', 320, 320, { size: 26, weight: 'bold', color: '#B36A12' }); });
    grp(p0, () => txt('Sede Electrónica del Catastro', 330, 545, { size: 17, color: C.grey }));
    // dxf
    pop(t.p(1), 760, 180, () => { fileIcon(720, 180, '.DXF', C.purple); arrow(560, 250, 660, 200, { color: C.purple, lw: 3 }); txt('Cartografía de la parcela', 870, 165, { size: 20, align: 'left', weight: 'bold' }); txt('→ se vincula en Revit', 870, 195, { size: 19, align: 'left', color: C.grey }); });
    // UTM
    grp(t.p(2), () => {
      PARCEL.forEach((q, i) => { circ(q[0], q[1], 7, { fill: C.red }); });
      txt('ej.: X = 718 245,3 · Y = 4 253 810,6', 330, 108, { size: 15, color: C.red, weight: 'bold' });
    });
    pop(t.p(2), 960, 300, () => { box(700, 260, 500, 80, { fill: '#fff' }); emo('📍', 740, 300, 32); txt('Coordenadas UTM reales', 770, 300, { size: 24, weight: 'bold', align: 'left' }); });
    slide(t.p(3), 30, 0, () => {
      box(700, 360, 500, 110, { fill: C.lgreen });
      txt('✓ Cabe el edificio + retranqueos', 725, 395, { size: 21, align: 'left', weight: 'bold', color: C.dgreen });
      txt('✓ Cerca de la infraestructura elegida', 725, 435, { size: 21, align: 'left', weight: 'bold', color: C.dgreen });
    });
    slide(t.p(4), 30, 0, () => {
      box(700, 490, 500, 76, { fill: C.lyellow });
      emo('✉️', 735, 528, 30); txt('Ref. catastral → prof. Óscar Galao', 765, 518, { size: 20, align: 'left', weight: 'bold' });
      txt('(por tutoría · sin parcelas repetidas)', 765, 546, { size: 17, align: 'left', color: C.grey });
    });
  }
});

// ---------- 5. TERRENO ----------
const TV = [[-4, -3, 2.6], [30, -4, 1.4], [32, 26, 0.2], [-5, 27, 1.2]];
SCENES.push({
  title: 'Paso 3 · El terreno (topografía)',
  lines: [
    'Ahora hay que modelar el terreno. Averigua las cotas aproximadas de los vértices del perímetro de la parcela.',
    'Con ellas generas un sólido topográfico que se ajuste a la realidad existente.',
    V('Un método: descargar la nube de puntos del PNOA, procesarla en Autodesk ReCap y llevarla a Revit.', 'Un método: descargar la nube de puntos del pe noa, procesarla en Autodesk Ricap, y llevarla a Revit.'),
    'Vale cualquier otro método, siempre que sea contrastable.',
  ],
  draw(t) {
    setIso(400, 190, 9.5);
    const h = t.p(1, 1.5);
    const top = TV.map(v => ip(v[0], v[1], v[2] * 2.2 * h));
    const bot = TV.map(v => ip(v[0], v[1], -5));
    grp(t.p(0), () => {
      if (h > 0) {
        poly([bot[1], bot[2], top[2], top[1]], { fill: '#8B6B4A', stroke: '#5E4630', lw: 1.5, alpha: h });
        poly([bot[2], bot[3], top[3], top[2]], { fill: '#755838', stroke: '#5E4630', lw: 1.5, alpha: h });
      }
      poly(top, { fill: h > 0 ? '#9CC57A' : 'rgba(255,255,255,0.6)', stroke: '#4E7A2C', lw: 2 });
      if (h > 0.2) for (let k = 1; k < 5; k++) { const u = k / 5; const A = [lerp(top[0][0], top[3][0], u), lerp(top[0][1], top[3][1], u)], B = [lerp(top[1][0], top[2][0], u), lerp(top[1][1], top[2][1], u)]; line(A[0], A[1], B[0], B[1], { color: '#6E9B4C', lw: 1, alpha: h }); }
      TV.forEach((v, i) => { const q = top[i]; circ(q[0], q[1], 7, { fill: C.red }); txt('+' + (100 + v[2] * 2.2).toFixed(1).replace('.', ',') + ' m', q[0], q[1] - 18, { size: 17, weight: 'bold', color: C.red, stroke: 4 }); });
    });
    grp(h, () => txt('Sólido topográfico', 400, 560, { size: 22, weight: 'bold', color: C.dgreen }));
    const steps = [['🛩️', 'PNOA', 'datos'], ['☁️', 'Nube de puntos', ''], ['🖥️', 'Autodesk ReCap', ''], ['🏗️', 'Revit', 'toposólido']];
    steps.forEach(([e, s], i) => {
      const y = 130 + i * 105;
      pop(t.p(2, 0.6, i * 0.5), 960, y + 35, () => { box(820, y, 280, 72, { fill: '#fff' }); emo(e, 860, y + 36, 32); txt(s, 895, y + 36, { size: 22, weight: 'bold', align: 'left' }); });
      if (i) grp(t.p(2, 0.6, i * 0.5), () => arrow(960, y - 30, 960, y - 3, { color: C.grey, lw: 3 }));
    });
    slide(t.p(3), 0, 20, () => { txt('…o cualquier otro método contrastable', 960, 560, { size: 20, color: C.grey, weight: 'bold' }); });
  }
});

// ---------- 6. FORMA Y RETRANQUEOS ----------
SCENES.push({
  title: 'Forma y dimensiones mínimas',
  lines: [
    'En planta, el edificio medirá como mínimo 20 por 25 metros, y obligatoriamente tendrá forma de L.',
    'Además debe respetar unos retranqueos mínimos: 3 metros a los linderos…',
    '…y 5 metros a los viales.',
  ],
  draw(t) {
    const S = 13, ox = 230, oy = 115, f = (x, y) => [ox + x * S, oy + y * S];
    // parcela (rectángulo simple 37 x 31 m) y vial abajo
    box(ox - 4 * S, oy + 31 * S, 44 * S, 50, { fill: '#8E959C', r: 0, shadow: false });
    txt('VIAL', ox + 18 * S, oy + 31 * S + 25, { size: 20, weight: 'bold', color: '#fff' });
    poly([f(-3, -3), f(34, -3), f(34, 31), f(-3, 31)], { fill: '#EEF3E6', stroke: C.orange, lw: 3 });
    txt('Lindero', ox + 15 * S, oy - 3 * S - 14, { size: 17, color: C.orange, weight: 'bold' });
    // retranqueos
    grp(t.p(1), () => {
      poly([f(0, 0), f(31, 0), f(31, 26), f(0, 26)], { stroke: C.red, lw: 2, dash: [8, 6] });
      [[f(-3, 12), f(0, 12)], [f(31, 12), f(34, 12)], [f(15, -3), f(15, 0)]].forEach(([a, b]) => { arrow(a[0], a[1], b[0], b[1], { color: C.red, lw: 2, hs: 8 }); arrow(b[0], b[1], a[0], a[1], { color: C.red, lw: 2, hs: 8 }); });
      txt('3 m', ...f(-1.5, 10.5), { size: 17, weight: 'bold', color: C.red });
      txt('3 m', ...f(32.5, 10.5), { size: 17, weight: 'bold', color: C.red });
      txt('3 m', ...f(17, -1.5), { size: 17, weight: 'bold', color: C.red });
    });
    grp(t.p(2), () => {
      const a = f(15, 26), b = f(15, 31); arrow(a[0], a[1], b[0], b[1], { color: C.blue, lw: 3, hs: 9 }); arrow(b[0], b[1], a[0], a[1], { color: C.blue, lw: 3, hs: 9 });
      txt('5 m', ...f(17, 28.5), { size: 20, weight: 'bold', color: C.blue });
    });
    // edificio en L
    const pL = t.p(0, 1.2);
    grp(pL, () => {
      const bx = 3, by = 3;
      poly(LPLAN.map(([x, y]) => f(x + bx, y + by)), { fill: 'rgba(31,58,95,0.85)', stroke: C.navy, lw: 3 });
      txt('L', ...f(bx + 5.5, by + 8), { size: 64, weight: 'bold', color: '#fff' });
      const a = f(bx, by - 1.2), b = f(bx + 25, by - 1.2);
      line(a[0], a[1] + 8, b[0], b[1] + 8, { color: '#fff', lw: 0 });
      txt('25 m', ...f(bx + 12.5, by + 1.6), { size: 20, weight: 'bold', color: '#fff' });
      txt('20 m', ...f(bx + 1.6, by + 14), { size: 20, weight: 'bold', color: '#fff', rot: -PI / 2 });
    });
    slide(t.p(0), 40, 0, () => {
      box(830, 130, 380, 130, { fill: '#fff' });
      txt('Mínimo 20 × 25 m', 1020, 172, { size: 28, weight: 'bold', color: C.navy });
      txt('Forma de L obligatoria', 1020, 222, { size: 24, weight: 'bold', color: C.red });
    });
    slide(t.p(1), 40, 0, () => { box(830, 290, 380, 70, { fill: C.lpink }); txt('≥ 3 m a linderos', 1020, 325, { size: 26, weight: 'bold', color: C.red }); });
    slide(t.p(2), 40, 0, () => { box(830, 380, 380, 70, { fill: C.lblue2 }); txt('≥ 5 m a viales', 1020, 415, { size: 26, weight: 'bold', color: C.blue }); });
  }
});

// ---------- 7. NIVELES ----------
SCENES.push({
  title: 'Los niveles del edificio',
  lines: [
    'El edificio se organiza en cinco niveles.',
    'Sótano o semisótano: PS.',
    'Planta baja: PB.',
    'Planta primera: P1.',
    'Cubierta: PC, accesible solo para conservación.',
    'Y el casetón, PX, que da acceso a la cubierta y alberga la sala de máquinas del ascensor.',
    'La escalera y el hueco del ascensor conectan todas las plantas, hasta el casetón. Atención al foso del ascensor bajo el sótano.',
  ],
  draw(t) {
    setIso(470, 300, 11);
    const ex = 2.2 * (1 - t.p(6, 1.2));
    const core = t.p(6, 1, 0.4);
    if (core > 0) building({ ps: 1, pb: 1, p1: 1, pc: 1, px: 1 }, ex, { core: 0, panels: 0 });
    building({ ps: t.p(1), pb: t.p(2), p1: t.p(3), pc: t.p(4), px: t.p(5) }, ex, {});
    if (core > 0) grp(core, () => {
      const dz = i => i * ex;
      extrude([[7, 6], [11, 6], [11, 10], [7, 10]], -4.6, 11 + dz(4), C.orange, { alpha: 0.85, top: C.yellow });
      const q = ip(7, 10, -4.6); arrow(q[0] - 150, q[1] + 60, q[0] - 6, q[1] + 6, { color: C.orange, lw: 2.5, hs: 9 }); txt('foso del ascensor', q[0] - 155, q[1] + 72, { size: 18, weight: 'bold', color: C.orange, align: 'right' });
    });
    const labs = [['PS', 'Sótano / semisótano', -1.75, '#9AA3AD'], ['PB', 'Planta baja', 1.75, C.brick], ['P1', 'Planta primera', 5.25, '#C9B48E'], ['PC', 'Cubierta', 7.6, '#7FB55A'], ['PX', 'Casetón', 9.6, '#9C968A']];
    labs.forEach(([k, s, z, c], i) => {
      const q = ip(25, 0, z + i * ex), y = q[1];
      slide(t.p(i + 1), 30, 0, () => {
        line(q[0] + 10, y, 845, 610 - (i + 1) * 92 + 20, { color: C.grey, lw: 1.5, dash: [4, 4] });
        pill(900, 610 - (i + 1) * 92 + 20, 100, 52, k, c, { size: 26, tc: '#fff' });
        txt(s, 962, 610 - (i + 1) * 92 + 20, { size: 24, weight: 'bold', align: 'left' });
      });
    });
    slide(t.p(4), 0, 0, () => txt('solo conservación', 962, 610 - 4 * 92 + 48, { size: 17, align: 'left', color: C.grey }));
    slide(t.p(5), 0, 0, () => txt('acceso cubierta + máquinas ascensor', 962, 610 - 5 * 92 + 48, { size: 17, align: 'left', color: C.grey }));
    pop(t.p(6), 160, 140, () => { box(60, 100, 230, 80, { fill: C.orange }); txt('Escalera + ascensor', 175, 128, { size: 20, weight: 'bold', color: '#fff' }); txt('en todas las plantas', 175, 155, { size: 18, color: '#fff' }); });
  }
});
