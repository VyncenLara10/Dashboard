#!/usr/bin/env node
/**
 * Inserta en la portada una tarjeta HTML rastreable para una herramienta
 * desplegada en un subdominio independiente.
 * Uso: node scripts/agregar-subdominio.mjs "Nombre" "https://sub.vyntools.com/" "Categoría" "Descripción"
 * SOLO ejecutar cuando el subdominio ya esté publicado y probado.
 */
import {readFileSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname,resolve} from 'node:path';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const [title,rawUrl,category='Desarrollo',description='Herramienta gratuita de VynTools']=process.argv.slice(2);
if(!title||!rawUrl){console.error('Uso: node scripts/agregar-subdominio.mjs "Nombre" "https://sub.vyntools.com/" "Categoría" "Descripción"');process.exit(1)}
const url=new URL(rawUrl);if(url.protocol!=='https:'||!/^([a-z0-9-]+\.)+vyntools\.com$/.test(url.hostname)){throw Error('La dirección debe ser un subdominio HTTPS de vyntools.com')}
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const p=resolve(root,'index.html');let h=readFileSync(p,'utf8');
if(h.includes('href="'+esc(url.href)+'"'))throw Error('Esta URL ya está enlazada desde el catálogo.');
const marker='</div><div class="no-results" id="noResults"';if(!h.includes(marker))throw Error('No se encuentra el cierre del catálogo.');
const card=`<a class="tool-card ext-card" href="${esc(url.href)}" data-title="${esc(title.toLowerCase())}" data-category="${esc(category)}" data-keywords="${esc(title.toLowerCase())}"><span class="tool-emoji">✳</span><span class="tool-meta">${esc(category)} <span class="tool-status">GRATIS</span></span><strong>${esc(title)}</strong><p>${esc(description)}</p><span class="card-bottom">Ir a la herramienta <span aria-hidden="true">↗</span></span></a>`;
h=h.replace(marker,card+marker);
h=h.replace(/(<strong>)(\d+)(<\/strong><span>Herramientas disponibles)/,(_,a,n,b)=>a+(Number(n)+1)+b);
h=h.replace(/(id="resultCount">)(\d+)( herramientas<\/div>)/,(_,a,n,b)=>a+(Number(n)+1)+b);
writeFileSync(p,h,'utf8');
const cp=resolve(root,'assets/js/config.js');let config=readFileSync(cp,'utf8');const label=url.hostname.split('.')[0];
config=config.replace(/(subdomains:\{)([^}]*)(\})/,(_,left,inner,right)=>`${left}${inner}${inner.trim()? ',':''}'${label}':'${url.origin}'${right}`);
writeFileSync(cp,config,'utf8');
console.log('Herramienta enlazada en la portada:',title,'→',url.href);
console.log('Revisa la categoría, SEO y disponibilidad antes del commit.');
