# VynTools — Actualización de diseño y juegos (noviembre 2026)

## Diseño
- Paleta editorial: corinto `#792f48`, vino profundo `#492334`, blanco `#ffffff` y beige marfil `#fcfaf7`.
- Diseño adaptable a móvil y escritorio, implementado en `assets/css/site.css`.
- Imagen de vista previa y favicon actualizados a la misma identidad.

## Juegos nuevos
- `/herramientas/buscaminas/`: primer clic seguro, banderas, 9×9 y 12×12.
- `/herramientas/snake/`: teclado o controles táctiles.
- `/herramientas/rompebloques/`: barra controlada por ratón, dedo o teclas.
- `/herramientas/mecanografia/`: palabras que caen, vidas, puntuación y tiempo.
- `/herramientas/tiempo-reaccion/`: reflejos y mejor marca local.
- `/herramientas/2048/`: combinaciones con puntuación y controles de teclado/táctil.
- `/herramientas/tres-en-raya/`: contra computadora con minimax.
- `/herramientas/memoria/`: cuadrículas 4×4, 4×5 y 6×6, posición aleatoria, récord local.
- `/herramientas/crucigrama/`: tablero 5×5 con numeración y pistas resaltadas.

La mayoría de las herramientas no guardan datos. Los récords de juegos se almacenan solo en el navegador mediante `localStorage` cuando está habilitado.

## AdSense y privacidad
- `google-adsense-account` del editor se mantiene **en `index.html`** para verificar el sitio ante AdSense.
- `ads.txt` de la raíz permanece con el ID del editor.
- El script `adsbygoogle.js` **no está activo** todavía: requiere aprobación y revisar consentimiento/CMP.
- Políticas de privacidad renovadas con almacenamiento local, tercero y futura publicidad. Para cumplir requisitos legales particulares aún hay que facilitar un medio de contacto privado, identificar plenamente al responsable y revisar las normas aplicables antes de activar anuncios.

## Cómo publicar
Cloudflare Pages despliega automáticamente los commits nuevos a `main` cuando se fusiona el PR.
Repositorio: `VyncenLara10/Dashboard`. Carpeta de publicación `.` sin build.

## Pruebas
- Validación de sintaxis Node.js para `tool.js`, `games-plus.js` y `catalog.js`.
- Pruebas DOM en Chromium, navegando los estados principales de los juegos.
- Revisiones de diseño responsive y enlaces canónicos.
- Pendiente verificar interacciones con dispositivos táctiles físicos y en Cloudflare una vez fusionado.
