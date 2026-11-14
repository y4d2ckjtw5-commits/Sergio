# Vídeo animado: salida de campo a la estación de RENFE

Vídeo explicativo (≈8 min, 1280×720, narrado en español y con subtítulos) basado en la memoria
«Memoria descriptiva de la salida de renovación de la estación de trenes de RENFE»
(Construcciones Geotécnicas · Ingeniería Civil UA).

**Vídeo final:** `Salida_RENFE_video_animado.mp4`

## Contenido (15 escenas)

1. Presentación de la salida
2. Objetivo: soterramiento de las vías e integración urbana
3. Lo que vimos: 2 sistemas para la estación, 1 para el túnel, auscultación, orden de construcción
4. Requisitos (ambulancias, embarque, ventilación, alumbrado) y puesto de mando duplicado (DANA)
5. Cut & cover descendente (top-down, 14 m): pilotes, mesas de nivelación, losa, excavación, berma, forjados
6. Losa cimbrada: cimbra → ferrallado → hormigonado con bomba → desencofrado; armadura muy densa
7. Pantallas de pilotes, empuje, vuelco y berma; diámetro de pilotes según esfuerzos
8. Auscultación: inclinómetros, piezómetros, deformaciones < 2 mm
9. Túnel: paraguas de micropilotes (9 m clavados, 1 m de voladizo), cercha y viga de atado
10. Ciclo de avance: paraguas, excavación + cercha, patas de elefante, mallazo + gunita, tresbolillo, impermeabilización, contrabóveda
11. Terreno: calizas muy duras, desviación de la perforación, bulones de fibra de vidrio bajo el colector
12. Agua: rebajamiento del freático con bombas, subpresión y contrabóveda
13. Ventilación del túnel y modelización por elementos finitos sin edificios
14. Funcionamiento estructural global: cajón (pantallas, losas-codales, pila-pilotes) y túnel en anillo
15. Resumen

Las fotos son las del informe (`img/`, incrustadas en `photos.js`).

## Cómo se ha generado

Mismo sistema que `video_lipidos`: Canvas 2D (`lib.js`, `scenes1.js`, `scenes2.js`, `main.js`),
voz Piper TTS `es-carlfm-x-low`, render con Chromium (Playwright) + ffmpeg.

```bash
node dump_lines.js build/lines.json
python3 tts.py build/lines.json es-carlfm-x-low.onnx build/audio
node render.js build/audio/durs.json build/vid 30
python3 mix.py build/vid/starts.json build/audio build/narracion.wav
ffmpeg -f concat -i build/vid/parts.txt -i build/narracion.wav -c:v copy -c:a aac -b:a 128k -shortest Salida_RENFE_video_animado.mp4
```
