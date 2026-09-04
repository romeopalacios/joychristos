const intro=document.querySelector('.intro');
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const openingSignature=document.querySelector('.signature-writing');
const hero=document.querySelector('.hero');
const signatureCanvas=document.querySelector('.signature-canvas');
if(openingSignature&&signatureCanvas&&!document.documentElement.classList.contains('skip-intro')){
  const ctx=signatureCanvas.getContext('2d'),mask=document.createElement('canvas'),maskCtx=mask.getContext('2d'),ink=new Image();
  mask.width=signatureCanvas.width;mask.height=signatureCanvas.height;ink.src='assets/signature-ink.png';
  const routes=[[[111,226],[135,350],[185,520],[218,667],[202,780],[145,880],[75,919],[45,860]],[[213,595],[260,540],[330,530],[372,576],[360,630],[294,669],[255,620],[306,559],[385,570],[424,638],[420,725],[405,815],[442,884],[490,920],[529,830]],[[502,256],[455,220],[430,320],[440,460],[485,590],[560,660],[640,650],[715,574]],[[635,393],[655,500],[678,565],[700,520],[736,493],[770,510],[760,545],[810,490],[850,475],[890,476],[916,491],[950,438],[970,285],[978,420],[992,474],[1025,470],[1050,427],[1080,400],[1094,414],[1080,450],[1129,431]],[[854,425],[835,414],[818,435],[842,462],[866,478],[892,450],[908,427],[890,410],[866,422]]];
  const segments=[];routes.forEach((route,routeIndex)=>{for(let i=1;i<route.length;i++)segments.push({a:route[i-1],b:route[i],routeIndex})});
  const start=performance.now(),duration=3900;
  const draw=now=>{const progress=Math.min(1,(now-start)/duration),count=Math.floor(progress*segments.length),partial=progress*segments.length-count;maskCtx.clearRect(0,0,mask.width,mask.height);maskCtx.strokeStyle='#fff';maskCtx.lineWidth=routeWidth();maskCtx.lineCap='round';maskCtx.lineJoin='round';for(let i=0;i<=count&&i<segments.length;i++){const s=segments[i],amount=i<count?1:partial;maskCtx.beginPath();maskCtx.moveTo(...s.a);maskCtx.lineTo(s.a[0]+(s.b[0]-s.a[0])*amount,s.a[1]+(s.b[1]-s.a[1])*amount);maskCtx.stroke()}ctx.clearRect(0,0,signatureCanvas.width,signatureCanvas.height);ctx.drawImage(ink,0,0);ctx.globalCompositeOperation='destination-in';ctx.drawImage(mask,0,0);ctx.globalCompositeOperation='source-over';if(progress<1)requestAnimationFrame(draw);else openingSignature.classList.add('drawing-complete')};
  const routeWidth=()=>92;
  ink.onload=()=>requestAnimationFrame(draw);
}
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
