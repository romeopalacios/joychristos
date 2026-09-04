const intro=document.querySelector('.intro');
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const openingSignature=document.querySelector('.signature-writing');
const hero=document.querySelector('.hero');
const dockSignature=()=>{if(openingSignature&&hero){openingSignature.classList.remove('signature-writing');openingSignature.classList.add('hero-signature');hero.prepend(openingSignature)}};
if(document.documentElement.classList.contains('skip-intro')){dockSignature();intro?.remove();document.documentElement.classList.remove('is-loading')}else if(intro){const finish=()=>{try{sessionStorage.setItem('joyIntroPlayed','true')}catch(e){}intro.classList.add('done');document.documentElement.classList.remove('is-loading');setTimeout(()=>{dockSignature();intro.remove()},1480)};window.addEventListener('load',()=>setTimeout(finish,reduceMotion?150:4300),{once:true});intro.addEventListener('click',finish,{once:true})}
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible')}),{threshold:.18});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const track=document.querySelector('.gallery-track');
if(track){let dragging=false,startX=0,startScroll=0;track.addEventListener('pointerdown',e=>{dragging=true;startX=e.clientX;startScroll=track.scrollLeft;track.classList.add('grabbing');track.setPointerCapture(e.pointerId)});track.addEventListener('pointermove',e=>{if(dragging)track.scrollLeft=startScroll-(e.clientX-startX)});const stop=()=>{dragging=false;track.classList.remove('grabbing')};track.addEventListener('pointerup',stop);track.addEventListener('pointercancel',stop)}
const curtainButton=document.querySelector('.video-curtain');
if(curtainButton){const comedyVideo=curtainButton.parentElement.querySelector('video');curtainButton.addEventListener('click',()=>{curtainButton.classList.add('opening');window.setTimeout(()=>{curtainButton.classList.add('opened');comedyVideo.play().catch(()=>{})},reduceMotion?0:1050)})}
document.querySelectorAll('[data-year]').forEach(node=>{node.textContent=new Date().getFullYear()});
