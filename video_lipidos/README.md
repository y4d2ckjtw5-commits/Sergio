# Vídeo animado: Los lípidos

Vídeo explicativo (≈19 min, 1280×720, narrado en español y con subtítulos) basado en las dos partes del tema 3 «Los lípidos».

**Vídeo final:** `Los_lipidos_video_animado.mp4`

## Contenido (26 escenas)

1. Introducción: virus de la gripe, envoltura lipídica y jabón
2. Concepto de lípido y propiedades (untuosos, insolubles en agua, menos densos)
3. Clasificación: saponificables (simples y complejos) e insaponificables
4. Ácidos grasos: estructura (cabeza –COOH, cola, zigzag de 111°)
5. Saturados e insaturados, enranciamiento
6. Nomenclatura A:B(Δᶜ): esteárico, oleico, linoleico
7. Omega 3 y omega 6, ácidos grasos esenciales
8. Punto de fusión y fuerzas de Van der Waals
9. Carácter anfipático: película, micelas y bicapas
10. Isomería cis-trans
11. Esterificación e hidrólisis
12. Saponificación, cómo limpia el jabón y jabón casero
13. Acilglicéridos (mono, di, triglicéridos), lipasas
14. Grasas animales y vegetales, reserva de energía
15. Ceras
16. Lípidos complejos: los cuatro grupos
17. Glicerofosfolípidos (ácido fosfatídico, lecitina, cefalina…)
18. Esfingofosfolípidos: ceramida, esfingomielina, mielina
19. Glucolípidos: cerebrósidos, gangliósidos, glucocálix, grupos sanguíneos
20. Terpenos (isopreno, pigmentos, esencias, vitaminas A, E, K)
21. Esteroles: colesterol, ácidos biliares, vitamina D
22. Hormonas esteroideas
23. Eicosanoides: prostaglandinas, tromboxanos, leucotrienos
24. Funciones: energética, estructural, protectora, aislante
25. Funciones reguladora y transportadora: lipoproteínas (quilomicrones, LDL, HDL)
26. Resumen final

## Cómo se ha generado

- Animaciones dibujadas con Canvas 2D (`lib.js`, `scenes*.js`, `main.js`, `index.html`).
- Voz: Piper TTS (voz española `es-carlfm-x-low`), un audio por frase (`tts.py`).
- Cada animación se sincroniza con el inicio de su frase; `render.js` renderiza los fotogramas
  con Chromium (Playwright) y los codifica con ffmpeg; `mix.py` monta la pista de voz.

Para regenerarlo:

```bash
node dump_lines.js build/lines.json
python3 tts.py build/lines.json es-carlfm-x-low.onnx build/audio
node render.js build/audio/durs.json build/vid 30
python3 mix.py build/vid/starts.json build/audio build/narracion.wav
ffmpeg -f concat -i build/vid/parts.txt -i build/narracion.wav -c:v copy -c:a aac -b:a 128k Los_lipidos_video_animado.mp4
```

`preview.js` genera fotogramas de muestra para revisar el diseño de cada escena.
