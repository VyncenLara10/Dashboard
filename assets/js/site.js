(()=>{'use strict';
const toggle=document.getElementById('navToggle'),menu=document.getElementById('mobilePanel');if(toggle&&menu)toggle.addEventListener('click',()=>{menu.hidden=!menu.hidden;toggle.setAttribute('aria-expanded',String(!menu.hidden))});
const key='vyntools:recent:v1';let recent=[];try{recent=JSON.parse(localStorage.getItem(key)||'[]');if(!Array.isArray(recent))recent=[]}catch{recent=[]}
if(document.body.classList.contains('tool-page')){
 const path=location.pathname,title=document.querySelector('h1')?.textContent?.replace(' online y gratis.','').trim()||'Herramienta';
 if(/^\/herramientas\/[a-z0-9-]+\/?$/.test(path)){recent=[{path,title},...recent.filter(x=>x?.path!==path)].slice(0,6);try{localStorage.setItem(key,JSON.stringify(recent))}catch{}}
}
if(document.body.classList.contains('home-page')&&recent.length){
 const node=document.createElement('section');node.className='recent-section container';node.innerHTML='<div class="recent-title"><span>↶</span><strong>Retoma donde lo dejaste</strong><button type="button" id="clearRecents">Borrar historial local</button></div><div class="recent-links">'+recent.filter(x=>/^\/herramientas\/[a-z0-9-]+\/?$/.test(x.path)).map(x=>'<a href="'+x.path+'">'+String(x.title).replace(/[&<>"']/g,'')+' ↗</a>').join('')+'</div>';
 document.querySelector('.highlights')?.insertAdjacentElement('afterend',node);
 node.querySelector('#clearRecents')?.addEventListener('click',()=>{try{localStorage.removeItem(key)}catch{}node.remove()});
}
})();
