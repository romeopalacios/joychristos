const intro=document.querySelector('.intro');
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const openingSignature=document.querySelector('.signature-writing');
const hero=document.querySelector('.hero');
const dockSignature=()=>{if(openingSignature&&hero){openingSignature.classList.remove('signature-writing');openingSignature.classList.add('hero-signature');hero.prepend(openingSignature)}};
if(document.documentElement.classList.contains('skip-intro')){dockSignature();intro?.remove();document.documentElement.classList.remove('is-loading')}else if(intro){const finish=()=>{try{sessionStorage.setItem('joyIntroPlayed','true')}catch(e){}intro.classList.add('done');document.documentElement.classList.remove('is-loading');setTimeout(()=>{dockSignature();intro.remove()},1480)};window.addEventListener('load',()=>setTimeout(finish,reduceMotion?150:4300),{once:true});intro.addEventListener('click',finish,{once:true})}
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible')}),{threshold:.18});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const track=document.querySelector('.gallery-track');
if(track){
  let dragging=false,startX=0,startScroll=0,pointerId=null;
  track.addEventListener('pointerdown',e=>{
    if(e.pointerType!=='mouse'||e.button!==0)return;
    startX=e.clientX;startScroll=track.scrollLeft;pointerId=e.pointerId;
  });
  track.addEventListener('pointermove',e=>{
    if(pointerId!==e.pointerId)return;
    const distance=e.clientX-startX;
    if(!dragging&&Math.abs(distance)<6)return;
    if(!dragging){dragging=true;track.classList.add('grabbing');track.setPointerCapture(pointerId)}
    track.scrollLeft=startScroll-distance;
  });
  const stop=e=>{
    if(pointerId!==null&&e.pointerId!==pointerId)return;
    dragging=false;pointerId=null;track.classList.remove('grabbing');
  };
  track.addEventListener('pointerup',stop);track.addEventListener('pointercancel',stop);
  track.querySelectorAll('img').forEach(img=>img.addEventListener('dragstart',e=>e.preventDefault()));
}
const curtainButton=document.querySelector('.video-curtain');
if(curtainButton){const comedyVideo=curtainButton.parentElement.querySelector('video');curtainButton.addEventListener('click',()=>{curtainButton.classList.add('opening');window.setTimeout(()=>{curtainButton.classList.add('opened');comedyVideo.play().catch(()=>{})},reduceMotion?0:1050)})}
const mobileComedy=document.querySelector('.comedy');
if(mobileComedy&&window.matchMedia('(max-width: 600px)').matches){
  const mobileVideoObserver=new IntersectionObserver(entries=>{
    if(entries.some(entry=>entry.isIntersecting)){
      window.setTimeout(()=>mobileComedy.classList.add('mobile-video-ready'),reduceMotion?0:1200);
      mobileVideoObserver.disconnect();
    }
  },{threshold:.5});
  mobileVideoObserver.observe(mobileComedy);
}
document.querySelectorAll('[data-year]').forEach(node=>{node.textContent=new Date().getFullYear()});
