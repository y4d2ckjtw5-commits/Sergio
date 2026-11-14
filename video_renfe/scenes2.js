// Escenas 2: túnel (paraguas, ciclo de avance, terreno, agua, ventilación), funcionamiento global y resumen

// ---------- 8. TÚNEL: PARAGUAS ----------
const TC = 330, TI = 560, TM = 40; // corona, solera, px por metro (sección longitudinal)
function tunnelLong(face, o = {}) {
  soil(40, 130, 1200, 480, { top: '#CDB897', bot: '#A99273' });
  line(40, 130, 1240, 130, { color: '#7A6040', lw: 3 });
  building(80, 130, 120, 40, '#C9D6E3'); building(260, 130, 90, 30, '#E3D3C3'); building(900, 130, 140, 45, '#D8CFE6');
  // hueco excavado
  X.save(); X.fillStyle = '#5B5F66'; X.fillRect(40, TC, face - 40, TI - TC); X.restore();
  X.save(); const g = X.createLinearGradient(40, 0, face, 0); g.addColorStop(0, 'rgba(255,240,200,0.0)'); g.addColorStop(1, 'rgba(255,240,200,0.35)'); X.fillStyle = g; X.fillRect(40, TC, face - 40, TI - TC); X.restore();
  // gunita (franja superior)
  concrete(40, TC - 10, face - 40 - TM, 10, { fill: '#9DA3AA' });
  // cerchas cada metro
  for (let x = face - TM; x > 40; x -= TM) { X.save(); X.fillStyle = o.hl ? C.orange : C.steel; X.fillRect(x - 3, TC - 10, 6, TI - TC + 10); X.restore(); }
  // frente
  X.save(); X.strokeStyle = '#6b5638'; X.lineWidth = 3; X.setLineDash([6, 5]); X.beginPath(); X.moveTo(face, TC); X.lineTo(face, TI); X.stroke(); X.restore();
}
function umbrellas(x0, len, p, o = {}) {
  for (let k = 0; k < 3; k++) {
    const y0 = TC - 14 - k * 6, y1 = y0 - len * (0.07 + k * 0.035);
    const ex = x0 + len * p;
    line(x0, y0, ex, lerp(y0, y1, p), { color: o.color || '#3A4A5A', lw: 4 });
  }
}
SCENES.push({
  title: 'El túnel: paraguas de micropilotes',
  lines: [
    'El túnel se excava en mina, en avances de un metro: es decir, metro a metro.',
    'Antes de excavar se clavan los paraguas: micropilotes que se hincan unos nueve metros en el terreno, por delante del frente.',
    'Solo queda un metro en voladizo. Por eso son muy estables y resistentes frente a las acciones del terreno y los esfuerzos.',
    'Los paraguas no están conectados entre sí: se apoyan directamente en la cercha metálica y en la viga de atado.',
    'Así se construye la bóveda con el presostenimiento y el sostenimiento a la vez.',
  ],
  draw(T) {
    const step = Math.min(3, Math.floor(clamp(T.c(0) / 1.6, 0, 3.99)));
    const sub = clamp((T.c(0) - step * 1.6) / 0.8);
    const face0 = 440 + TM * (step + (step < 3 ? ease(sub) : 0)) ;
    const face = T.c(0) < 0 ? 440 : Math.min(face0, 560);
    tunnelLong(face, { hl: T.p(3) > 0 && T.p(4) < 1 });
    const xc = 560 - TM; // última cercha
    grp(T.p(0, 0.6) * (1 - T.p(1, 0.5)), () => { brace(face - TM, face, TC - 40, '1 m', { color: C.navy, size: 22 }); pill(640, 620 - 30, 420, 40, 'Avance de 1 m en cada ciclo', C.navy, { tc: '#fff' }); });
    const up = T.p(1, 2, 0.5);
    if (up > 0) {
      umbrellas(xc - 2 * TM, TM * 2 + TM + 360, up);
      if (up < 1) { emo('🛠️', xc - 2 * TM + (TM * 3 + 360) * up, TC - 50, 36); }
    }
    grp(T.p(1, 0.6, 2.5), () => { brace(560, 560 + 360, TC - 110, '≈ 9 m en el terreno', { color: C.navy, size: 22 }); });
    grp(T.p(2, 0.6), () => {
      brace(xc, 560, TC - 60, '', { color: C.red });
      pill(470, 200, 180, 40, '1 m voladizo', C.red, { tc: '#fff' }); arrow(500, 220, 540, TC - 64, { color: C.red, lw: 3 });
      check(1130, 200, 1.4, C.green);
      txt('Muy estables', 1120, 245, { size: 22, weight: 'bold', color: C.dgreen });
    });
    // vista frontal
    const fv = T.p(3, 0.7);
    grp(fv * (1 - T.p(4, 0.5, 2)), () => {
      box(870, 280, 340, 300, { fill: '#fff' });
      txt('Vista frontal', 1040, 305, { size: 20, weight: 'bold' });
      const cx = 1040, cy = 470, R = 110;
      X.save(); X.strokeStyle = C.orange; X.lineWidth = 10; X.beginPath(); X.arc(cx, cy, R, PI, 0); X.lineTo(cx + R, cy + 90); X.moveTo(cx - R, cy); X.lineTo(cx - R, cy + 90); X.stroke(); X.restore();
      for (let i = 0; i <= 12; i++) { const a = PI + i * PI / 12; circ(cx + (R + 14) * Math.cos(a), cy + (R + 14) * Math.sin(a), 6, { fill: '#3A4A5A' }); }
      txt('cercha', cx, cy + 20, { size: 20, weight: 'bold', color: C.orange });
      txt('micropilotes sueltos', cx, cy - 145 + 0, { size: 18, weight: 'bold', alpha: T.p(3, 0.5, 1), color: '#3A4A5A' });
    });
    grp(T.p(4, 0.6), () => {
      pill(280, 410, 300, 44, 'Presostenimiento', '#3A4A5A', { tc: '#fff' });
      pill(280, 470, 300, 44, '+ Sostenimiento', C.steel, { tc: '#fff' });
      photo('f001', 940, 150, 260, 330, { zoom: 1.1, alpha: T.p(4, 0.6, 1.5), cap: 'Cerchas metálicas' });
    });
  },
});

// ---------- 9. CICLO DE AVANCE ----------
function tunnelSection(cx, cy, R, wallH, st) {
  // st: {cut, cercha, feet, mesh, shot, bolts, memb, inv}
  const path = (r, h) => { X.beginPath(); X.moveTo(cx - r, cy + h); X.lineTo(cx - r, cy); X.arc(cx, cy, r, PI, 0); X.lineTo(cx + r, cy + h); };
  soil(cx - 330, 95, 660, 515, { top: '#CDB897', bot: '#A99273' });
  if (st.cut > 0) { X.save(); X.globalAlpha = st.cut; path(R + 18, wallH); X.lineTo(cx - R - 18, cy + wallH); X.closePath(); X.fillStyle = '#4E535A'; X.fill(); X.restore(); }
  if (st.shot > 0) { X.save(); X.globalAlpha = st.shot; X.lineWidth = 26; X.strokeStyle = '#A3A8AF'; path(R + 5, wallH); X.stroke(); X.restore(); }
  if (st.mesh > 0) { X.save(); X.globalAlpha = st.mesh; X.lineWidth = 2; X.strokeStyle = '#333'; X.setLineDash([3, 5]); path(R + 12, wallH); X.stroke(); path(R + 2, wallH); X.stroke(); X.restore(); }
  if (st.cercha > 0) { X.save(); X.globalAlpha = st.cercha; X.lineWidth = 10; X.strokeStyle = C.steel; path(R + 6, wallH); X.stroke(); X.restore(); }
  if (st.feet > 0) [-1, 1].forEach(s => { const x = cx + s * (R + 6); poly([[x - 9, cy + wallH - 6], [x + 9, cy + wallH - 6], [x + 30 * st.feet, cy + wallH + 12], [x - 30 * st.feet, cy + wallH + 12]], { fill: C.steel, stroke: '#4a2017', lw: 2 }); });
  if (st.bolts > 0) for (const s of [-1, 1]) for (let r = 0; r < 5; r++) for (let c = 0; c < 2; c++) {
    const y = cy - 10 + r * 30 + (c ? 15 : 0), x = cx + s * (R + 18 + c * 26);
    grp(clamp(st.bolts * 10 - (r * 2 + c)), () => { line(cx + s * (R + 4), y, x + s * 40, y, { color: '#1F7A3A', lw: 3 }); circ(x + s * 10, y, 5, { fill: C.green }); });
  }
  if (st.memb > 0) { X.save(); X.globalAlpha = st.memb; X.lineWidth = 5; X.strokeStyle = C.blue; path(R - 10, wallH - 4); X.stroke(); X.restore(); }
  if (st.inv > 0) { X.save(); X.globalAlpha = st.inv; X.beginPath(); X.moveTo(cx - R - 18, cy + wallH); X.quadraticCurveTo(cx, cy + wallH + 80, cx + R + 18, cy + wallH); X.lineTo(cx + R + 18, cy + wallH + 14); X.quadraticCurveTo(cx, cy + wallH + 100, cx - R - 18, cy + wallH + 14); X.closePath(); X.fillStyle = '#8F969E'; X.fill(); X.restore();
    grp(st.inv, () => { X.save(); X.lineWidth = 22; X.strokeStyle = 'rgba(180,186,192,0.9)'; path(R - 24, wallH - 6); X.stroke(); X.restore(); }); }
}
SCENES.push({
  title: 'Ciclo de avance del túnel',
  lines: [
    'Cada avance del túnel sigue siempre la misma secuencia.',
    'Uno: se colocan los paraguas de presostenimiento. Dos: se excava un metro y se coloca la cercha metálica.',
    'Las cerchas se apoyan sobre patas de elefante: un ensanchamiento de la base que reparte la carga para no hundir el terreno.',
    'Tres: mallazo y gunitado, es decir, hormigón proyectado. Los hastiales se refuerzan al tresbolillo, en malla triangular.',
    'Cuatro: impermeabilización con láminas de polietileno y gunita y, al final, la contrabóveda y el revestimiento definitivo.',
  ],
  draw(T) {
    const st = { cut: T.p(1, 1, 2.5), cercha: T.p(1, 1, 4), feet: T.p(2, 1, 0.5), mesh: T.p(3, 1), shot: T.p(3, 1, 1.5), bolts: T.p(3, 2, 3.5), memb: T.p(4, 1, 1), inv: T.p(4, 1.5, 3.5) };
    const cx = 380, cy = 300, R = 150, wh = 170;
    tunnelSection(cx, cy, R, wh, st);
    // paraguas (puntos en corona)
    const pu = T.p(1, 1, 0.3);
    for (let i = 0; i <= 14; i++) { const a = PI + 0.1 + i * (PI - 0.2) / 14; grp(clamp(pu * 15 - i), () => circ(cx + (R + 32) * Math.cos(a), cy + (R + 32) * Math.sin(a), 5, { fill: '#2B3A4A' })); }
    // patas de elefante: reparto de carga
    const fe = T.p(2, 0.8, 1.5) * (1 - T.p(3, 0.5));
    grp(fe, () => {
      [-1, 1].forEach(s => { const x = cx + s * (R + 6); for (let k = -2; k <= 2; k++) arrow(x, cy + wh + 16, x + k * 18, cy + wh + 60, { color: C.red, lw: 3, hs: 8 }); });
      box(cx - 140, cy + wh + 70, 280, 44, { fill: '#fff', stroke: C.red }); txt('Patas de elefante', cx, cy + wh + 92, { size: 22, weight: 'bold', color: C.red });
    });
    grp(T.p(3, 0.6, 3.5) * (1 - T.p(4, 0.5)), () => { pill(cx, 120, 300, 40, 'Hastiales al tresbolillo', C.dgreen, { tc: '#fff', size: 19 }); });
    // lista de pasos
    const items = [['1', 'Paraguas', '#2B3A4A', T.p(1, 0.5)], ['2', 'Excavar 1 m + cercha', C.steel, T.p(1, 0.5, 2.5)], ['3', 'Mallazo + gunita', '#7C848C', T.p(3, 0.5)], ['4', 'Impermeabilizar + contrabóveda', C.blue, T.p(4, 0.5)]];
    grp(T.p(0, 0.6), () => txt('Secuencia', 960, 110, { size: 30, weight: 'bold', color: C.navy }));
    items.forEach((it, i) => slide(Math.max(it[3], T.p(0, 0.6, 0.4 + i * 0.25) * 0.35), 40, 0, () => {
      const on = it[3] > 0.5; box(740, 150 + i * 100, 450, 80, { fill: on ? '#fff' : '#F2F2F2', stroke: on ? it[2] : null, lw: 3 });
      circ(785, 190 + i * 100, 26, { fill: on ? it[2] : '#ccc' }); txt(it[0], 785, 190 + i * 100, { size: 26, weight: 'bold', color: '#fff' });
      txt(it[1], 825, 190 + i * 100, { size: 23, weight: 'bold', align: 'left', color: on ? C.ink : C.grey });
    }));
    grp(T.p(4, 0.6, 1.5), () => { txt('lámina de polietileno', cx, cy - 40, { size: 18, color: C.blue, weight: 'bold', stroke: 4 }); });
    grp(T.p(4, 0.6, 4), () => { txt('contrabóveda', cx, cy + wh + 40, { size: 20, color: '#fff', weight: 'bold', stroke: 4, strokeColor: '#555' }); });
  },
});

// ---------- 10. TERRENO, PERFORACIÓN Y BULONES ----------
SCENES.push({
  title: 'Terreno, perforación y bulones de fibra',
  lines: [
    'El terreno que atraviesa el túnel incluye calizas durísimas, de resistencia muy elevada.',
    'Además el suelo cambia mucho. Al mínimo cambio en el tipo de terreno, la perforación de los paraguas se desvía, y eso no se puede controlar del todo.',
    'Bajo el colector urbano, el frente se refuerza con bulones de fibra de vidrio.',
    'La fibra de vidrio tiene alta resistencia a tracción, pero se corta con facilidad: consolida el frente sin dañar la maquinaria al excavar.',
  ],
  draw(T) {
    const a = 1 - T.p(2, 0.6);
    grp(a, () => {
      const lay = [['#D9CBB0', 'Relleno'], ['#C2A47A', 'Arcillas'], ['#B9B3A6', 'Calizas'], ['#A89A84', 'Margas']];
      const ys = [110, 210, 300, 470, 610];
      lay.forEach((l, i) => { X.save(); X.fillStyle = l[0]; X.beginPath(); X.moveTo(60, ys[i] + 15 * Math.sin(i)); for (let x = 60; x <= 1220; x += 40) X.lineTo(x, ys[i] + 18 * Math.sin(x / 140 + i)); for (let x = 1220; x >= 60; x -= 40) X.lineTo(x, ys[i + 1] + 18 * Math.sin(x / 140 + i + 1)); X.fill(); X.restore();
        txt(l[1], 1150, (ys[i] + ys[i + 1]) / 2, { size: 20, weight: 'bold', color: '#4a3b28', alpha: 0.85 }); });
      // calizas resaltadas
      grp(T.p(0, 0.6, 0.6) * (1 - T.p(1, 0.5)), () => { X.save(); X.strokeStyle = C.red; X.lineWidth = 4; X.setLineDash([10, 6]); X.strokeRect(70, 305, 1140, 160); X.restore();
        box(430, 335, 420, 100, { fill: '#fff' }); txt('Calizas durísimas', 640, 368, { size: 32, weight: 'bold', color: C.red }); txt('resistencia muy elevada', 640, 406, { size: 21 }); emo('🪨', 470, 385, 40); });
      // perforación
      const dp = T.p(1, 3, 0.5);
      grp(T.p(1, 0.5), () => {
        line(150, 260, 1050, 360, { color: C.navy, lw: 3, dash: [12, 8] });
        txt('trayectoria prevista', 300, 240, { size: 18, color: C.navy, weight: 'bold' });
        X.save(); X.strokeStyle = C.red; X.lineWidth = 6; X.lineCap = 'round'; X.beginPath(); X.moveTo(150, 260);
        for (let i = 1; i <= 60 * dp; i++) { const f = i / 60, x = 150 + 900 * f; let y = 260 + 100 * f; if (x > 520) y += Math.pow((x - 520) / 530, 1.6) * 90; X.lineTo(x, y); }
        X.stroke(); X.restore();
        if (dp > 0.6) { pill(900, 520, 360, 44, 'Desviación imprevisible', C.red, { tc: '#fff' }); }
      });
    });
    grp(T.p(2, 0.6), () => {
      photo('f003', 70, 110, 340, 450, { zoom: 1.1, cap: 'Frente del túnel' });
      // frente con bulones
      const cx = 800, cy = 400;
      soil(480, 100, 740, 510, { top: '#CDB897', bot: '#A99273' });
      X.save(); X.fillStyle = '#8FA0AE'; rr(700, 120, 200, 60, 30); X.fill(); X.restore(); txt('Colector', 800, 150, { size: 20, weight: 'bold', color: '#fff' });
      X.save(); X.fillStyle = '#9DA3AA'; X.beginPath(); X.moveTo(cx - 200, cy + 190); X.lineTo(cx - 200, cy); X.arc(cx, cy, 200, PI, 0); X.lineTo(cx + 200, cy + 190); X.closePath(); X.fill(); X.restore();
      for (let r = 0; r < 5; r++) for (let c = 0; c < 7 - (r === 0 ? 2 : 0); c++) {
        const x = cx - 150 + c * 50 + (r % 2) * 25 + (r === 0 ? 50 : 0), y = cy - 120 + r * 60;
        grp(clamp(T.p(2, 2, 0.6) * 35 - (r * 7 + c)), () => { circ(x, y, 9, { fill: C.yellow, stroke: '#9A7B0A', lw: 2 }); });
      }
      grp(T.p(2, 0.6, 2), () => pill(800, 570, 380, 42, 'Bulones de fibra de vidrio', '#9A7B0A', { tc: '#fff', size: 20 }));
    });
    grp(T.p(3, 0.6), () => {
      box(500, 160, 600, 330, { fill: '#fff' });
      txt('Fibra de vidrio', 650, 200, { size: 26, weight: 'bold', color: '#9A7B0A' }); txt('Acero', 950, 200, { size: 26, weight: 'bold', color: C.grey });
      line(800, 180, 800, 470, { color: '#ddd', lw: 2 });
      const k = T.p(3, 1.2, 1.5);
      [650, 950].forEach((x, i) => {
        line(x - 90, 300, x + 90, 300, { color: i ? C.grey : C.yellow, lw: 14 });
        emo('⚙️', x, lerp(230, 280, k), 44);
        if (k > 0.8) { if (i === 0) { check(x, 380, 1.3); txt('se corta fácil', x, 430, { size: 20, weight: 'bold', color: C.dgreen }); } else { cross(x, 380, 1.1); txt('daña la máquina', x, 430, { size: 20, weight: 'bold', color: C.red }); } }
      });
      grp(T.p(3, 0.5, 0.4), () => txt('Alta resistencia a tracción ↔', 650, 250, { size: 17, color: C.ink }));
    });
  },
});

// ---------- 11. AGUA ----------
SCENES.push({
  title: 'El agua: freático e impermeabilización',
  lines: [
    'El agua subterránea es uno de los grandes enemigos de una obra bajo tierra.',
    'Por eso se rebaja el nivel freático con bombas. Sin ellas sería imposible trabajar a esa cota sin inundarse y sin que el terreno cediera.',
    'El drenaje protege a los trabajadores y a la costosa maquinaria que trabaja en el fondo de la excavación.',
    'Además, en el túnel, la contrabóveda cierra el anillo y soporta la subpresión del agua, evitando que el fondo se levante.',
  ],
  draw(T) {
    const last = T.p(3, 0.6);
    grp(1 - last, () => {
      const gy = 140, ex0 = 520, ex1 = 900, eb = 470;
      soil(60, gy, 1160, 470);
      X.save(); X.fillStyle = C.air; X.fillRect(ex0, gy, ex1 - ex0, eb - gy); X.restore();
      const drop = T.p(1, 3, 1);
      const wt = (x) => { const base = 260; const d = drop * 260; const dist = Math.max(0, Math.abs(x - 710) - 190); return base + d * Math.exp(-dist / 260); };
      X.save(); X.fillStyle = 'rgba(60,140,230,0.45)'; X.beginPath(); X.moveTo(60, 610); for (let x = 60; x <= 1220; x += 10) X.lineTo(x, (x > ex0 && x < ex1) ? Math.max(wt(x), gy) : wt(x)); X.lineTo(1220, 610); X.closePath(); X.fill(); X.restore();
      X.save(); X.strokeStyle = C.blue; X.lineWidth = 3; X.beginPath(); for (let x = 60; x <= 1220; x += 10) { const y = wt(x) + 3 * Math.sin(x / 20 + T.t * 3); x === 60 ? X.moveTo(x, y) : X.lineTo(x, y); } X.stroke(); X.restore();
      txt('▽ nivel freático', 230, wt(230) - 18, { size: 20, weight: 'bold', color: C.blue, stroke: 4 });
      if (drop < 0.3) grp(T.p(0, 0.6, 0.5), () => { emo('🌊', 710, 380, 70); pill(710, 200, 280, 44, '¡Excavación inundada!', C.red, { tc: '#fff', size: 20 }); });
      // bombas
      grp(T.p(1, 0.6), () => {
        [ex0 - 40, ex1 + 40].forEach((x, i) => { X.save(); X.fillStyle = '#fff'; X.fillRect(x - 7, gy - 30, 14, 470); X.strokeStyle = C.blue; X.strokeRect(x - 7, gy - 30, 14, 470); X.restore(); box(x - 26, gy - 70, 52, 40, { fill: C.orange, r: 8 }); txt('P', x, gy - 50, { size: 22, weight: 'bold', color: '#fff' });
          for (let k = 0; k < 5; k++) { const m = (T.c(1) * 0.7 + k / 5) % 1; circ(x, lerp(560, gy - 20, m), 5, { fill: C.blue, alpha: drop > 0 ? 1 : 0 }); } });
        pill(710, 100, 330, 40, 'Rebajamiento con bombas', C.orange, { tc: '#fff', size: 20 });
      });
      grp(T.p(2, 0.6), () => { emo('👷', 620, eb - 30, 50); emo('🚜', 800, eb - 30, 54); check(710, 300, 1.6); });
      photo('f007', 980, 330, 210, 270, { zoom: 1.1, alpha: T.p(1, 0.6, 3) * (1 - T.p(2, 0.4, 3.5)) });
    });
    grp(last, () => {
      const cx = 640, cy = 300, R = 150, wh = 150;
      tunnelSection(cx, cy, R, wh, { cut: 1, cercha: 1, feet: 1, mesh: 1, shot: 1, bolts: 0, memb: 1, inv: T.p(3, 1, 1) });
      X.save(); X.fillStyle = 'rgba(80,150,220,0.3)'; X.fillRect(cx - 330, cy + 60, 660, 250); X.restore();
      for (let i = -3; i <= 3; i++) { const x = cx + i * 45; arrow(x, 600, x, cy + wh + 60 - 30 * Math.cos(i / 3), { color: C.blue, lw: 5, p: T.p(3, 0.8, 0.5) }); }
      grp(T.p(3, 0.6, 1.5), () => { box(880, 230, 330, 110, { fill: '#fff', stroke: C.blue }); txt('Subpresión del agua', 1045, 265, { size: 24, weight: 'bold', color: C.blue }); txt('la contrabóveda la resiste', 1045, 305, { size: 20 }); });
      grp(T.p(3, 0.6, 2.5), () => { box(70, 230, 330, 110, { fill: '#fff', stroke: C.green }); txt('Anillo cerrado', 235, 265, { size: 24, weight: 'bold', color: C.dgreen }); txt('el fondo no se levanta', 235, 305, { size: 20 }); });
    });
  },
});

// ---------- 12. VENTILACIÓN Y MODELIZACIÓN ----------
SCENES.push({
  title: 'Ventilación y modelización',
  lines: [
    'Dentro del túnel la ventilación es imprescindible: aporta oxígeno y evita temperaturas molestas para el personal.',
    'Se usan grandes conductos que llevan aire fresco desde el exterior hasta el frente de trabajo.',
    'Para el cálculo, el túnel se modelizó con elementos finitos, pero sin incluir los edificios adyacentes.',
    'Un modelo más complejo exige más tiempo y más coste de análisis, así que se simplificó para ahorrar presupuesto.',
  ],
  draw(T) {
    const fem = T.p(2, 0.6);
    grp(1 - fem, () => {
      photo('f009', 70, 100, 340, 450, { zoom: 1.05 + 0.04 * T.t / T.dur, fy: 0.55, cap: 'Conducto de ventilación' });
      // túnel longitudinal con conducto
      const y0 = 260, y1 = 520;
      soil(460, 110, 760, 500, { top: '#CDB897', bot: '#A99273' });
      X.save(); X.fillStyle = '#5B5F66'; X.fillRect(460, y0, 700, y1 - y0); X.restore();
      line(460, 110, 1220, 110, { color: '#7A6040', lw: 3 });
      X.save(); X.fillStyle = '#E8EDF2'; X.fillRect(460, y0 + 14, 640 * Math.max(T.p(0, 1), 0), 36); X.restore();
      emo('🌀', 480, 160, 50);
      line(480, 190, 480, y0 + 14, { color: '#E8EDF2', lw: 30, alpha: T.p(0, 0.6) });
      const fl = T.p(1, 0.6);
      for (let i = 0; i < 14; i++) { const m = (T.t * 0.35 + i / 14) % 1; const x = 470 + m * 640; txt('›', x, y0 + 32, { size: 30, weight: 'bold', color: C.blue, alpha: fl }); }
      grp(fl, () => { for (let i = 0; i < 6; i++) { const m = (T.t * 0.3 + i / 6) % 1; circ(1110 - m * 500, y1 - 60 - 40 * Math.sin(m * 6 + i), 10 + 10 * m, { fill: '#999', alpha: 0.4 * (1 - m) }); } emo('👷', 1120, y1 - 40, 54); });
      grp(T.p(0, 0.6, 1.5), () => { pill(740, 560 - 0, 200, 38, 'O₂ ✓', C.green, { tc: '#fff' }); pill(960, 560, 210, 38, 'Temperatura ✓', C.green, { tc: '#fff', size: 18 }); });
      grp(fl, () => pill(800, 220, 300, 38, 'Aire fresco → frente', C.blue, { tc: '#fff', size: 19 }));
    });
    grp(fem, () => {
      const cx = 420, cy = 380, R = 90;
      // malla de elementos finitos
      X.save(); X.beginPath(); X.rect(90, 120, 660, 470); X.clip();
      const pal = ['#2B83BA', '#80BFAB', '#C7E89E', '#FEE08B', '#FDAE61', '#D7191C'];
      for (let i = 0; i < 22; i++) for (let j = 0; j < 16; j++) {
        const x = 90 + i * 30, y = 120 + j * 30, d = Math.hypot(x + 15 - cx, y + 15 - cy);
        if (d < R) continue;
        const v = clamp(1.2 - (d - R) / 220); const ci = Math.min(5, Math.floor(v * 6 * T.p(2, 2, 1)));
        X.fillStyle = pal[ci]; X.globalAlpha = 0.85; X.beginPath(); X.moveTo(x, y); X.lineTo(x + 30, y); X.lineTo(x, y + 30); X.fill();
        X.fillStyle = pal[Math.max(0, ci - ((i + j) % 2))]; X.beginPath(); X.moveTo(x + 30, y); X.lineTo(x + 30, y + 30); X.lineTo(x, y + 30); X.fill();
        X.globalAlpha = 1; X.strokeStyle = 'rgba(255,255,255,0.6)'; X.lineWidth = 1; X.strokeRect(x, y, 30, 30); X.beginPath(); X.moveTo(x + 30, y); X.lineTo(x, y + 30); X.stroke();
      }
      X.restore();
      circ(cx, cy, R, { fill: '#555', stroke: '#222', lw: 4 });
      txt('Túnel', cx, cy, { size: 22, weight: 'bold', color: '#fff' });
      box(90, 120, 660, 470, { fill: 'rgba(0,0,0,0)', stroke: C.ink, shadow: false, r: 2 });
      // edificios descartados
      grp(T.p(2, 0.6, 2.5), () => { building(150, 120, 120, 0, '#fff'); [[150, 110], [520, 140]].forEach(([x, w]) => { X.save(); X.globalAlpha *= 0.5; X.setLineDash([8, 6]); X.strokeStyle = C.ink; X.lineWidth = 3; X.strokeRect(x, 0 + 70, w, 50); X.restore(); }); cross(205, 95, 0.8); cross(590, 95, 0.8); });
      grp(T.p(2, 0.6, 2.5), () => { box(800, 120, 400, 80, { fill: '#fff' }); txt('Modelo sin edificios', 1000, 160, { size: 26, weight: 'bold', color: C.navy }); });
      // coste / tiempo
      const k = T.p(3, 1.2, 0.3);
      grp(T.p(3, 0.6), () => {
        box(800, 230, 400, 330, { fill: '#fff' });
        txt('Complejidad del modelo', 1000, 260, { size: 20, weight: 'bold' });
        [['Tiempo', C.orange], ['Coste', C.red]].forEach((b, i) => {
          txt(b[0], 860, 330 + i * 110, { size: 20, weight: 'bold', align: 'left' });
          box(860, 350 + i * 110, 300, 26, { fill: '#eee', shadow: false, r: 13 });
          box(860, 350 + i * 110, 300 * lerp(0.95, 0.4, k), 26, { fill: b[1], shadow: false, r: 13 });
        });
        txt('Simplificar → ahorrar', 1000, 540, { size: 22, weight: 'bold', color: C.dgreen, alpha: k });
      });
    });
  },
});

// ---------- 13. FUNCIONAMIENTO ESTRUCTURAL GLOBAL ----------
SCENES.push({
  title: '¿Cómo trabaja la estructura?',
  lines: [
    'Veamos ahora cómo funciona la estructura en conjunto.',
    'La estación es un cajón subterráneo: las pantallas de pilotes perimetrales contienen los empujes laterales del terreno y del agua.',
    'Las losas de cubierta y de los tres niveles actúan como codales permanentes, diafragmas rígidos que impiden que las pantallas se cierren.',
    'Las cargas verticales bajan a través de los pila-pilotes, y las vigas de atado unen sus cabezas para que trabajen juntos y no haya asientos diferenciales.',
    'El túnel, en cambio, trabaja como un anillo: la bóveda, los hastiales y la contrabóveda absorben a compresión las fuerzas del terreno.',
  ],
  draw(T) {
    // cajón
    const x0 = 120, x1 = 560, y0 = 150, y1 = 520;
    const lp = T.p(0, 0.8);
    grp(lp, () => {
      soil(70, y0, 540, 460);
      X.save(); X.fillStyle = C.air; X.fillRect(x0, y0, x1 - x0, y1 - y0); X.restore();
      concrete(x0 - 16, y0 - 10, 16, 470, { fill: '#AEB4BB' }); concrete(x1, y0 - 10, 16, 470, { fill: '#AEB4BB' });
      [y0, y0 + 95, y0 + 190, y0 + 285, y1 - 8].forEach((y, i) => concrete(x0, y - 6, x1 - x0, 14, { fill: T.p(2) > 0.3 ? '#7FA9D6' : '#9AA2AB' }));
      [260, 420].forEach(x => concrete(x - 6, y0, 12, 450, { fill: T.p(3) > 0.3 ? '#F2B66D' : '#BFC5CC' }));
      txt('Estación (cajón)', 340, 115, { size: 26, weight: 'bold', color: C.navy });
    });
    const e1 = T.p(1, 0.8);
    for (let i = 0; i < 6; i++) { const y = y0 + 30 + i * 60, L = 30 + i * 8; arrow(x0 - 30 - L, y, x0 - 20, y, { color: C.red, lw: 4, p: e1 }); arrow(x1 + 30 + L, y, x1 + 20, y, { color: C.red, lw: 4, p: e1 }); }
    grp(T.p(1, 0.6, 1) * (1 - T.p(2, 0.5)), () => pill(340, 580, 300, 38, 'Pantallas: empuje lateral', C.red, { tc: '#fff', size: 18 }));
    const e2 = T.p(2, 0.8);
    grp(e2, () => { [y0 + 95, y0 + 190, y0 + 285].forEach(y => { arrow(340, y, x0 + 10, y, { color: C.blue, lw: 3, hs: 10 }); arrow(340, y, x1 - 10, y, { color: C.blue, lw: 3, hs: 10 }); }); });
    grp(e2 * (1 - T.p(3, 0.5)), () => pill(340, 625 - 45, 300, 38, 'Losas = codales rígidos', C.blue, { tc: '#fff', size: 18 }));
    const e3 = T.p(3, 0.8);
    grp(e3, () => { [260, 420].forEach(x => { for (let k = 0; k < 3; k++) { const m = (T.c(3) * 0.5 + k / 3) % 1; arrow(x, y0 + m * 400, x, y0 + m * 400 + 40, { color: C.orange, lw: 5, hs: 12 }); } });
      line(240, y0 - 4, 440, y0 - 4, { color: C.orange, lw: 8 }); });
    grp(e3 * (1 - T.p(4, 0.5)), () => pill(340, 580, 330, 38, 'Pila-pilotes + vigas de atado', C.orange, { tc: '#fff', size: 18 }));
    // túnel en anillo
    const tp = T.p(4, 0.8);
    grp(tp, () => {
      const cx = 960, cy = 360, R = 150;
      soil(700, 150, 520, 460, { top: '#CDB897', bot: '#A99273' });
      circ(cx, cy, R + 14, { fill: '#9DA3AA' }); circ(cx, cy, R - 14, { fill: '#4E535A' });
      txt('Túnel (anillo)', cx, 115, { size: 26, weight: 'bold', color: C.purple });
      for (let i = 0; i < 12; i++) { const a = i * PI / 6; arrow(cx + (R + 80) * Math.cos(a), cy + (R + 80) * Math.sin(a), cx + (R + 20) * Math.cos(a), cy + (R + 20) * Math.sin(a), { color: C.red, lw: 3, p: T.p(4, 0.8, 0.8), hs: 10 }); }
      const rot = T.c(4) * 0.8;
      for (let i = 0; i < 6; i++) { const a = rot + i * PI / 3; X.save(); X.strokeStyle = C.purple; X.lineWidth = 5; X.beginPath(); X.arc(cx, cy, R, a, a + 0.5); X.stroke(); X.restore(); const b = a + 0.5; arrow(cx + R * Math.cos(b - 0.05), cy + R * Math.sin(b - 0.05), cx + R * Math.cos(b + 0.02), cy + R * Math.sin(b + 0.02), { color: C.purple, lw: 5, hs: 14 }); }
      txt('Bóveda', cx, cy - R + 40, { size: 20, weight: 'bold', color: '#fff' }); txt('Hastial', cx - R + 60, cy, { size: 18, weight: 'bold', color: '#fff' }); txt('Hastial', cx + R - 60, cy, { size: 18, weight: 'bold', color: '#fff' }); txt('Contrabóveda', cx, cy + R - 40, { size: 20, weight: 'bold', color: '#fff' });
      pill(cx, 580, 300, 38, 'Todo a compresión', C.purple, { tc: '#fff', size: 18 });
    });
  },
});

// ---------- 14. RESUMEN ----------
SCENES.push({
  title: 'Resumen',
  lines: [
    'En resumen: el soterramiento combina una estación construida de arriba hacia abajo y un túnel excavado metro a metro.',
    'Pantallas, pila-pilotes y losas forman un cajón muy rígido; paraguas, cerchas y gunita sostienen el túnel.',
    'El control del agua, la auscultación continua y, sobre todo, el orden de construcción son la clave del éxito de la obra.',
    '¡Gracias por ver el vídeo!',
  ],
  draw(T) {
    const ph = ['f000', 'f004', 'f008', 'f002', 'f001', 'f006'];
    ph.forEach((k, i) => photo(k, 80 + (i % 3) * 190, 100 + Math.floor(i / 3) * 250, 170, 225, { zoom: 1.1 + 0.03 * Math.sin(T.t * 0.3 + i), alpha: T.p(0, 0.6, 0.2 + i * 0.25) * (1 - T.p(3, 0.6)) }));
    const kw = [
      [0, 'Estación: top-down', C.orange], [0, 'Túnel: metro a metro', C.purple],
      [1, 'Cajón rígido', C.navy], [1, 'Paraguas + cerchas + gunita', C.steel],
      [2, 'Control del agua', C.blue], [2, 'Auscultación', C.green], [2, 'Orden de construcción', C.red],
    ];
    let n = 0; kw.forEach((k, i) => { const d = kw.slice(0, i).filter(q => q[0] === k[0]).length; grp(1 - T.p(3, 0.6), () => slide(T.p(k[0], 0.6, 0.5 + d * 0.9), 60, 0, () => pill(930, 130 + i * 64, 470, 48, k[1], k[2], { tc: '#fff', size: 22 }))); });
    pop(T.p(3, 0.8), 640, 330, () => {
      txt('¡Gracias!', 640, 280, { size: 90, weight: 'bold', color: C.navy, stroke: 8 });
      txt('Salida de campo · Renovación de la estación de RENFE', 640, 370, { size: 28, color: C.ink });
      txt('Construcciones Geotécnicas · Ingeniería Civil UA', 640, 415, { size: 24, color: C.grey });
    });
    grp(T.p(3, 0.8), () => drawTrain(lerp(-100, 1600, clamp(T.c(3) / 6)), 560, 0.7));
  },
});
