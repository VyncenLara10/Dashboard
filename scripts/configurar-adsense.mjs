#!/usr/bin/env node
// Configura AdSense con el ID público del editor. Nunca utilices secretos.
import {readFileSync,writeFileSync,readdirSync,existsSync,unlinkSync} from 'node:fs';
import {join,resolve,dirname,relative} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const PROJECT='portal'; // portal o barras
const [mode,input]=process.argv.slice(2);
if(!['verify','ads','remove'].includes(mode)) throw Error('Uso: node scripts/configurar-adsense.mjs <verify|ads|remove> <ca-pub-ID_REAL>');
const id=mode==='remove'?'':String(input||'').replace(/^pub-/,'ca-pub-');
if(mode!=='remove'&&!/^ca-pub-\d{16}$/.test(id)) throw Error('ID invalido: usa el ca-pub- de 16 digitos de tu cuenta de AdSense');
const START='<!-- ADSENSE-CONFIG-BEGIN -->', END='<!-- ADSENSE-CONFIG-END -->';
function walk(dir){return readdirSync(dir,{withFileTypes:true}).flatMap(entry=>{const p=join(dir,entry.name);return entry.isDirectory()?(entry.name==='node_modules'||entry.name.startsWith('.')?[]:walk(p)):entry.name.endsWith('.html')?[p]:[]})}
function eligible(file){const r=relative(root,file).replaceAll('\\','/');return r==='index.html'||PROJECT==='portal'&&(r.startsWith('herramientas/')||r.startsWith('guias/'))&&r.endsWith('/index.html')}
let n=0;
for(const file of walk(root)){
 let h=readFileSync(file,'utf8'), cleaned=h;
 const a=cleaned.indexOf(START);
 if(a>=0){const b=cleaned.indexOf(END,a);if(b<0)throw Error('Bloque incompleto en '+file);cleaned=cleaned.slice(0,a)+cleaned.slice(b+END.length)}
 const path=relative(root,file).replaceAll('\\','/');
 const include=(mode==='ads'&&eligible(file))||(mode==='verify'&&path==='index.html');
 if(include){
  if(!cleaned.includes('</head>'))throw Error('No se encontro </head> en '+file);
  const meta='<meta name="google-adsense-account" content="'+id+'">';
  const script='<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client='+id+'" crossorigin="anonymous"></script>';
  cleaned=cleaned.replace('</head>','\n'+START+'\n'+meta+(mode==='ads'?'\n'+script:'')+'\n'+END+'\n</head>');
 }
 if(cleaned!==h){writeFileSync(file,cleaned,'utf8');n++}
}
if(PROJECT==='portal'){
 const path=join(root,'ads.txt');
 if(mode==='remove'){if(existsSync(path))unlinkSync(path)}
 else writeFileSync(path,'google.com, '+id.replace('ca-pub-','pub-')+', DIRECT, f08c47fec0942fa0\n','utf8');
}
console.log(PROJECT+': modo '+mode+'; archivos HTML cambiados: '+n);
console.log('No se ha solicitado aprobacion, configurado consentimiento ni activado anuncios en el panel.');
