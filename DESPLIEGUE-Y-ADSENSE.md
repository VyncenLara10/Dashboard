# Cloudflare Pages + Google AdSense

## Despliegue automático
1. Cloudflare → Workers & Pages → Create application → Pages → Connect to Git.
2. Repositorio: **VyncenLara10/Dashboard**, rama: `main`, Framework: None, Build command: `exit 0`, Output directory: `.`.
3. Cloudflare → proyecto → Custom domains → conectar **vyntools.com**.
4. Cada merge/push a `main` desplegará automáticamente.

**DNS:** Para usar `vyntools.com` (dominio raíz) en Cloudflare Pages necesitas administrar la zona DNS desde Cloudflare. Antes de cambiar nameservers en Namecheap, copia todos los registros existentes (MX, SPF, DKIM, DMARC, barras, etc.). Para Barras, conserva su proyecto Pages y el registro CNAME `barras` hacia `barras-vyntools.pages.dev`.

## Un solo identificador para ambas webs
En Google AdSense → **Sitios**, añade `vyntools.com`. Los subdominios normales (como `barras.vyntools.com`) se gestionan bajo ese dominio. Obtén tu ID público `pub-XXXXXXXXXXXXXXXX` de la cuenta. **No compartas contraseña ni claves privadas.**

### Fase 1: Verificación
En el repositorio local, con Node.js:

```bash
node scripts/configurar-adsense.mjs verify ca-pub-XXXXXXXXXXXXXXXX
```

El modo verify agrega una metaetiqueta de verificación a `index.html`. Solo en Dashboard se genera el archivo raíz `ads.txt`. Después haz commit/push y solicita la revisión del sitio en AdSense → Sitios.

### Fase 2: Anuncios
Cuando `vyntools.com` aparezca **Ready/Listo** en AdSense, hayas actualizado Privacidad y tengas configurado el consentimiento/CMP necesario para EEE, Reino Unido y Suiza:

```bash
node scripts/configurar-adsense.mjs ads ca-pub-XXXXXXXXXXXXXXXX
```

El modo ads inserta el fragmento oficial de **Auto ads** en portada, herramientas y guías (no páginas legales). No inventa `data-ad-slot`; los espacios publicitarios existentes no se llenan automáticamente salvo que Google elija una ubicación allí. Activa Auto ads en el panel de AdSense.

Para quitarlo: `node scripts/configurar-adsense.mjs remove`.

La activación, verificación y aprobación de AdSense **no** son automáticas y no están garantizadas. Completa la identidad y datos de contacto del responsable del sitio; revisa las páginas de privacidad y términos. Las credenciales no se publican en GitHub.

## Validar
- El sitio abre con HTTPS sin bloquear bots.
- Si usas el dominio raíz: `https://vyntools.com/ads.txt` tiene tu propio `pub-...`.
- El código fuente HTML muestra `google-adsense-account` con tu `ca-pub-...`.
- `inventario.html` y `ticket.html` no deben cargar anuncios.

Fuentes oficiales:
- https://developers.cloudflare.com/pages/configuration/custom-domains/
- https://support.google.com/adsense/answer/7584263
- https://support.google.com/adsense/answer/9785052
- https://support.google.com/adsense/answer/13554116
