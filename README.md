# VynTools — Portal de herramientas gratuitas

**Repositorio:** `VyncenLara10/Dashboard` · **Dominio previsto:** `https://vyntools.com` · **Hosting recomendado:** Cloudflare Pages.

Portal estático en español (HTML, CSS y JavaScript) con **47 herramientas internas funcionales** y acceso al generador independiente **Barras Studio** (`https://barras.vyntools.com/`). No requiere Node.js, instalación, base de datos ni compilación para publicar.

## Arquitectura

```text
Dashboard/
├── index.html                        # Portada y catálogo rastreable
├── herramientas/<slug>/index.html    # 47 páginas con SEO independiente
├── guias/                            # Índice + 3 guías editoriales
├── assets/css/site.css               # Diseño adaptable a escritorio/móvil
├── assets/js/catalog.js             # Metadatos de herramientas
├── assets/js/config.js              # Configuración y futuros subdominios
├── assets/js/home.js                # Buscar y filtrar en portada
├── assets/js/tool.js                # Motor de herramientas y juegos
├── assets/js/site.js                # Navegación
├── assets/img/                      # Marca, favicon y Open Graph
├── privacidad.html, terminos.html, contacto.html, acerca.html
├── robots.txt, sitemap.xml, _headers
├── adsense-setup.example.txt, ads.txt.example
└── README.md
```

### Herramientas disponibles

- **Finanzas:** descuentos, propinas, IVA Guatemala, impuestos personalizados, interés compuesto, préstamo, ahorro, divisas con tasa manual y punto de equilibrio.
- **Salud:** IMC, calorías diarias orientativas y suma aproximada de calorías de alimentos.
- **Matemáticas y fechas:** porcentajes, regla de tres, unidades, edad, días entre fechas y días hábiles sin feriados.
- **Texto y desarrollo:** contador de palabras, transformar texto, contraseñas criptográficas, UUID y Lorem Ipsum.
- **Diseño e imágenes:** paleta de colores, comprimir JPG/WebP, redimensionar, quitar fondos de color uniforme (sin IA), generador QR (biblioteca externa).
- **Documentos:** CV, carta de renuncia, recibo particular proforma y directorio de trámites oficiales; documentos imprimibles a PDF, **no equivalentes a facturas FEL**.
- **Cuestionarios:** personalidad divertida, animal, empatía (no clínico), personajes fantásticos originales, horóscopo recreativo y nombres para bebés.
- **Juegos:** Sudoku, palabra de cinco letras, sopa de letras, trivia, memoria y selector aleatorio y crucigrama.

No hay autenticación. La mayoría de herramientas procesan datos localmente y no guardan resultados. El generador QR necesita la biblioteca JavaScript de una CDN cuando se utiliza. Fuentes web opcionales también requieren conexión. No se consultan cotizaciones de moneda en tiempo real ni existen comprobantes fiscales reales.

## Publicar en Cloudflare Pages con GitHub

1. Crea un proyecto **Workers & Pages → Pages → Import a Git repository**.
2. Elige `VyncenLara10/Dashboard`.
3. Configuración: rama `main`, preset `None`, comando `exit 0`, directorio publicado `.` (raíz).
4. Despliega: primero prueba la dirección `*.pages.dev`.
5. En **Custom domains** solicita `vyntools.com`. Para usar el **dominio raíz (apex)** con Pages, Cloudflare normalmente requiere administrar la zona DNS. Antes de cambiar nameservers en Namecheap, copia todos los registros MX, SPF, DKIM, DMARC, TXT y demás para no interrumpir correo u otros servicios. Si ya gestionas DNS en Cloudflare, añade el dominio desde el proyecto Pages.
6. Cloudflare publica automáticamente las actualizaciones que llegan a `main`.

Los enlaces internos del portal usan `/herramientas/slug/`. A diferencia de 45 subdominios, esto reduce trabajo, permite enlazado interno y facilita Search Console. **No necesitas crear un subdominio por herramienta.** Los proyectos más grandes pueden separarse después.

## ¿Cómo añadir otra herramienta?

1. Escribe una nueva entrada en `build_vyntools.py` (script de construcción de la estructura, no necesario en producción) o agrega su metadato en `assets/js/catalog.js` y su página en `herramientas/<slug>/index.html`.
2. Implementa la lógica en `assets/js/tool.js` bajo una clave que coincida con su `slug`.
3. Añade la nueva página a `sitemap.xml`.
4. Verifica el comportamiento, sube una rama y abre un PR. Después del merge a `main`, Cloudflare despliega automáticamente.

> La construcción inicial utiliza `build_vyntools.py` y `build_extras.py`, incluidos en `scripts/` del ZIP como herramientas de desarrollo opcionales. Los archivos HTML generados son la fuente publicada; no edites los scripts sin regenerar las páginas.

### Enlace a futuros subdominios

El ejemplo Barras Studio es un proyecto separado: `https://barras.vyntools.com/`. Para migrar `sudoku` o `qr` a un repositorio y subdominio independiente:

- Publica ese repositorio desde otro proyecto Cloudflare Pages.
- Configura y verifica el custom domain, por ejemplo `juegos.vyntools.com`.
- **Solo cuando funcione**, actualiza el `href` de su tarjeta en `index.html`, los enlaces relacionados, sus metadatos en `assets/js/catalog.js`, y (si reemplazas la página local) configura una redirección 301 y actualiza el canonical. Evita páginas locales duplicadas bajo dominios distintos.
- Ajusta `assets/js/config.js` para documentar los nuevos destinos.

## Google Search Console y SEO

La portada y las 47 fichas contienen `<title>`, descripción, canonical, Open Graph y texto HTML visible aunque falle JavaScript. Incluyen `robots.txt` y `sitemap.xml`. En Search Console registra una propiedad **Dominio** para `vyntools.com`, verifica mediante un registro TXT del proveedor DNS y envía `https://vyntools.com/sitemap.xml`.

No hay promesas de indexación, posicionamiento o aprobación de publicidad. Publica contenidos útiles y revisa Search Console para detectar errores reales.

## Google AdSense

Los componentes publicitarios son **espacios reservados**, no anuncios activos. Los archivos `adsense-setup.example.txt` y `ads.txt.example` contienen únicamente instrucciones: **no** tienen un ID de editor real.

1. Publica el dominio raíz y deja funcionando páginas, guías, contacto y privacidad.
2. Agrega y verifica `vyntools.com` en tu cuenta AdSense, siguiendo el método que muestre tu panel.
3. Cuando el sitio esté aprobado y revises requisitos de privacidad y consentimiento, copia el script público `ca-pub-...` proporcionado por Google en los `<head>` de las páginas que monetizarás. Para escalar puedes usar un snippet de JavaScript reutilizable con carga controlada, pero sin activar anuncios antes de configurar el consentimiento que corresponda.
4. Publica el contenido real del `ads.txt` de tu cuenta como archivo `ads.txt` en la raíz **del dominio principal**. No es suficiente `ads.txt.example`.
5. Activa Auto ads o crea unidades manuales `data-ad-slot` reales. Los huecos CSS por sí solos no muestran anuncios.
6. Actualiza `/privacidad.html` con responsable, contacto, proveedores, cookies y mecanismo de consentimiento antes de activar publicidad.

**Nunca coloques contraseña, credenciales OAuth, API keys privadas ni tokens de AdSense en este repositorio.** El identificador `ca-pub` es público.

## Límites y advertencias

- Las herramientas de nutrición, IMC, horóscopo y personalidad son orientativas/recreativas; no son asesoría médica o diagnósticos.
- El directorio de trámites enlaza a sitios gubernamentales externos sin presentar requisitos como definitivos.
- Los cálculos de impuesto son informativos y no sustituyen la normativa fiscal. El IVA general de Guatemala se muestra al 12%.
- El conversor de moneda **requiere que el usuario introduzca una tasa manual**, no consulta una API de mercado.
- Los juegos generan partidas en el navegador y no envían respuestas al servidor.
- Quitar fondo funciona por similitud del color superior izquierdo y no es segmentación de personas.
- Los documentos de pago no son documentos fiscales oficiales ni FEL.
- La identidad del responsable y el canal de contacto para privacidad aún deben completarse antes de solicitar monetización.

## Desarrollo y pruebas locales

```bash
python3 -m http.server 8000
# Abrir http://localhost:8000
```

Para revisar sintaxis de JavaScript:

```bash
node --check assets/js/tool.js
node --check assets/js/home.js
node --check assets/js/site.js
```

© 2026 VynTools. Proyecto independiente. 

### Agregar un subdominio nuevo mediante un comando

Cuando el proyecto externo ya esté publicado y hayas verificado HTTPS y DNS:

```bash
node scripts/agregar-subdominio.mjs "Sopa de letras PRO" "https://juegos.vyntools.com/" "Juegos" "Más juegos gratuitos en español."
```

El comando añade un enlace HTML rastreable al catálogo de `index.html`, actualiza los contadores y documenta el destino en `assets/js/config.js`. No crea repositorios, DNS ni proyectos Cloudflare. Revisa el cambio antes de publicarlo; no lo ejecutes para direcciones que todavía no funcionan. No se añade el subdominio al `sitemap.xml` del dominio raíz, ya que la aplicación externa deberá publicar su sitemap propio.


## Despliegue y anuncios

Consulta [DESPLIEGUE-Y-ADSENSE.md](DESPLIEGUE-Y-ADSENSE.md). La integración está preparada para configurar el ID público de Google AdSense, primero verificar el sitio y después activar Auto ads con consentimiento adecuado. No hay anuncios activos hasta configurar tu ID.
