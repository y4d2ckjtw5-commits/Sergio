# Vídeo animado: Práctica de evaluación REVIT (Modelo BIM, 2026-27)

Vídeo explicativo (≈11 min, 1280×720, narrado en español y con subtítulos) de la práctica
«Práctica de Evaluación: REVIT – Edificación y Construcción Industrializada, Ingeniería Civil, curso 2026-27».

**Vídeo final:** `Practica_REVIT_video_animado.mp4`

## Contenido (21 escenas)

1. Presentación, objetivo y fecha de entrega (30/11/2026, 23:59 h)
2. Qué hay que entregar: .RVT + .IFC (IFC4x3) en un ZIP, nomenclatura `33536ECI26_PRVT_βδμ`
3. Contenido del modelo: LOD 300, vistas, planos con cajetín, tablas de cantidades, forjados (solo envolvente)
4. Paso 1 · Uso del edificio (ingeniería civil; usos no permitidos por la LOE)
5. Paso 2 · Parcela del Catastro (DXF, coordenadas UTM, referencia catastral al profesor)
6. Paso 3 · Terreno: cotas de vértices, PNOA → nube de puntos → ReCap → toposólido
7. Forma en L (mín. 20 × 25 m) y retranqueos (3 m a linderos, 5 m a viales)
8. Los cinco niveles: PS, PB, P1, PC, PX; escalera, ascensor y foso
9. Sótano: programa (aparcamiento, rampa, instalaciones, depósito PCI 12 m³, racks, archivo 30 m²)
10. Sótano: construcción (losa ≥ 50 cm, muro HA ≥ 30 cm, epoxi, LHD 24 cm, instalaciones)
11. Planta baja: programa (monitores, reuniones, cocina/comedor, aseos/vestuarios, descanso, patio)
12. Planta baja: construcción (forjado 30+5 alveolar, vigas 25×45, fachada por capas, terrazo, mamparas)
13. Planta primera: programa (despachos, habitaciones, terraza cubierta con soportes de acero)
14. Planta primera: construcción (reticular casetón perdido 25+10, tabiquería LHD 9 + yeso)
15. Cubierta: reticular recuperable 20+8, peto de 110 cm, cubierta verde y pendientes
16. Casetón: losa maciza 26 cm, protección pesada, paneles solares ACS, escalera
17. Rampa: losa HA-25/B/20/XC3 de 20 cm, vigas descolgadas, pendiente ≤ 18 %, microaglomerado
18. Requisitos generales (estructura, cerramientos, puertas, mobiliario, sin mediciones duplicadas)
19. Evaluación: 6 + 1 + 1 + 2 puntos
20. Normas: individual, UACloud, penalización del 40 %, plagio
21. Resumen / lista de comprobación

## Cómo se ha generado

Mismo sistema que `../video_lipidos`: animaciones en Canvas 2D (`lib.js`, `scenes*.js`, `main.js`),
voz Piper TTS (`es-carlfm-x-low`), render con Chromium (Playwright) + ffmpeg.

```bash
node dump_lines.js build/lines.json
LSCALE=1.1 python3 tts.py build/lines.json es-carlfm-x-low.onnx build/audio
node render.js build/audio/durs.json build/vid 30
python3 mix.py build/vid/starts.json build/audio build/narracion.wav
ffmpeg -f concat -i build/vid/parts.txt -i build/narracion.wav -c:v copy -c:a aac -b:a 128k Practica_REVIT_video_animado.mp4
```

`preview.js` genera fotogramas de muestra para revisar el diseño de cada escena.
