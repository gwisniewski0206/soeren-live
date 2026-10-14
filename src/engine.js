import CSV from './data/music.csv?raw';
import AINFO from './data/audio.json';
import {readCatalogue,ARTISTS,TYPES,place,fmtTime,parseTime} from './lib/music.js';

const IMG={"hero":"/img/hero.jpg","marina":"/img/marina.jpg","maiden":"/img/maiden.jpg","walk":"/img/walk.jpg","rust":"/img/rust.jpg"},MSK={"hero":"/img/hero_m.png","marina":"/img/marina_m.png","maiden":"/img/maiden_m.png","walk":"/img/walk_m.png","rust":"/img/rust_m.png"},STR={"en": {"nav": {"home": "start", "about": "bio", "live": "live", "music": "music", "booking": "booking"}, "tagline": "deep and minimal dance music", "bio": ["søren is a live electronic project defined by the tension between improvisational fluidity and studio-grade precision. originally formed in 2017 by producers göran and sven, the project was born from an early commitment to hardware-only performance, making its mark on stages like südpol, moloch, and habitat festival.", "following a hiatus dedicated to individual growth — göran refining his minimalist output as co-founder of the bladehouse imprint, and sven delving into the complexities of sound design and algorithmic programming — the duo has returned with a reconfigured approach. this period of divergence served to sharpen their respective sonic palettes, allowing for a more deliberate fusion of structural austerity and technical detail. the resulting synergy is no longer about finding a middle ground, but a shared language informed by years of solitary exploration.", "the current iteration of søren moves away from rigid dogma; the computer has returned to the setup, serving alongside an extensive hardware array. for the duo, tools are secondary to the result: a floor-focused sound that prioritizes depth and melodic clarity over the aimlessness of a typical jam. their performances are built on a silent, intuitive dialogue, where each set is a unique deconstruction of their core material — retaining only the most essential motifs while turning everything else inside out."], "upcoming": "upcoming", "past": "past", "no_dates": "to be announced.", "booking_intro": "for bookings, rider and dates:", "music_intro": "live sets and releases by søren, rangø and sven miesner. press play — it keeps going as you browse.", "f_name": "name", "f_email": "email", "f_when": "date or venue", "f_msg": "message", "send": "send message", "mail_direct": "or email us directly", "rider": "technical rider — on request", "press_intro": "press photos, live clips and the full hör set.", "view_photos": "view photos →", "epk": "epk on request", "credit": "photos: Leander Schröder, Jan-Ole Minners", "hoer_link": "hör set →", "sc_link": "soundcloud →", "links_head": "links & press", "open": "→", "vid_missing": "add the hör youtube link to show the set.", "aud_missing": "add an audio recording to play it here.", "close": "close ×"}, "de": {"nav": {"home": "start", "about": "bio", "live": "live", "music": "musik", "booking": "booking"}, "tagline": "deep and minimal dance music", "bio": ["søren ist ein elektronisches live-projekt, das von der spannung zwischen improvisatorischer freiheit und studiogenauer präzision lebt. 2017 von den produzenten göran und sven gegründet, entstand das projekt aus einem frühen bekenntnis zu reinen hardware-sets — und hinterließ spuren auf bühnen wie südpol, moloch und habitat festival.", "nach einer pause für die eigene entwicklung — göran schärfte als mitgründer des labels bladehouse seinen minimalistischen sound, sven vertiefte sich in sounddesign und algorithmische programmierung — ist das duo mit neu justiertem ansatz zurück. diese zeit des auseinandergehens hat beide klangpaletten geschärft und erlaubt eine bewusstere verbindung aus struktureller strenge und technischem detail. das ergebnis ist kein kompromiss in der mitte mehr, sondern eine gemeinsame sprache, geprägt von jahren einzelgängerischen suchens.", "die aktuelle version von søren löst sich vom starren dogma; der rechner ist zurück im setup, neben einem umfangreichen hardware-arsenal. für die beiden sind die werkzeuge zweitrangig — es zählt das ergebnis: ein floor-orientierter sound, der tiefe und melodische klarheit über die ziellosigkeit eines typischen jams stellt. ihre auftritte leben von einem stillen, intuitiven dialog, in dem jedes set eine eigene dekonstruktion des kernmaterials ist — nur die wesentlichsten motive bleiben, alles andere wird umgekrempelt."], "upcoming": "upcoming", "past": "past", "no_dates": "to be announced.", "booking_intro": "für anfragen, rider und termine:", "music_intro": "live-sets und releases von søren, rangø und sven miesner. auf play — läuft weiter, während du stöberst.", "f_name": "name", "f_email": "e-mail", "f_when": "datum oder venue", "f_msg": "nachricht", "send": "nachricht senden", "mail_direct": "oder direkt per mail", "rider": "technical rider — auf anfrage", "press_intro": "pressefotos, live-clips und das komplette hör-set.", "view_photos": "fotos ansehen →", "epk": "epk auf anfrage", "credit": "fotos: Leander Schröder, Jan-Ole Minners", "hoer_link": "hör-set →", "sc_link": "soundcloud →", "links_head": "links & presse", "open": "→", "vid_missing": "hör-youtube-link eintragen, dann erscheint das set.", "aud_missing": "audio-aufnahme eintragen, dann läuft sie hier.", "close": "schließen ×"}},GIGS=[{"venue": "hör berlin", "en": "radio set · 2025", "de": "radio-set · 2025", "type": "video", "id": ""}, {"venue": "3000grad festival", "en": "festival · 2026", "de": "festival · 2026", "type": "carousel", "videos": ["clip-01.mp4", "clip-02.mp4", "clip-03.mp4", "clip-04.mp4", "clip-05.mp4", "clip-06.mp4", "clip-07.mp4", "clip-08.mp4"]}, {"venue": "hafenklang", "en": "hamburg · 2024", "de": "hamburg · 2024", "type": "carousel", "videos": ["hf-01.mp4", "hf-02.mp4", "hf-03.mp4", "hf-04.mp4", "hf-05.mp4", "hf-06.mp4"], "url": "https://soundcloud.com/phantasia-rec/phantasia-mix-7-soren-live?in=phantasia-rec/sets/phantasia-mix"}, {"venue": "südpol", "en": "hamburg · 2025, 2026", "de": "hamburg · 2025, 2026", "type": "none"}],CFG={"booking_email": "booking@soeren.live", "instagram": "@soeren.live", "ig_url": "https://instagram.com/soeren.live", "hoer_url": "https://www.youtube.com/embed/PqiJcqFA3tU", "hoer_watch": "https://www.youtube.com/watch?v=PqiJcqFA3tU", "sc_url": "https://soundcloud.com/phantasia-rec/phantasia-mix-7-soren-live?in=phantasia-rec/sets/phantasia-mix", "form_endpoint": "", "lines": "smooth"},PAGES=[["home", "hero"], ["about", "marina"], ["live", "maiden"], ["music", "rust"], ["booking", "walk"]],PHOTOS={"home": "hero", "about": "marina", "live": "maiden", "music": "rust", "booking": "walk"};
const PBAR_H=96;
const SMOOTH=((new URLSearchParams(location.search).get('lines'))||CFG.lines)==='smooth';
const BASE=import.meta.env.BASE_URL.replace(/\/+$/,'');
function U(p){return BASE+p;}
function _path(){const p=location.pathname;return BASE&&p.startsWith(BASE)?p.slice(BASE.length)||'/':p;}
for(const k in IMG)IMG[k]=U(IMG[k]);for(const k in MSK)MSK[k]=U(MSK[k]);
const _SL={home:'/',about:'/bio',live:'/live',music:'/music',booking:'/booking'};
function _slug(id){return U(_SL[id]||'/');}
function _idFromPath(){let p=_path().replace(/\/+$/,'');if(p==='')p='/';if(p.startsWith('/music/'))return 'music';for(const k in _SL){if(_SL[k]===p)return k;}return 'home';}
addEventListener('popstate',()=>{const id=_idFromPath();if(typeof page!=='undefined'&&id!==page&&!trans)goto(id,0,0,true);});
const TRACKS=readCatalogue(CSV).tracks.filter(t=>AINFO[t.id]).map(t=>({...t,...AINFO[t.id]})),TBYID=Object.fromEntries(TRACKS.map(t=>[t.id,t]));
const PLIST=Object.keys(IMG);
let lang="en",page="home",openGig=null,morphing=false,settle=null,bioPage=0,playerActive=false,scrollY=0,maxScroll=0,_hotBoxes=null;
let THEME,RUST,CON;
function applyTheme(t){THEME=t==='dark'?'dark':'light';const d=THEME==='dark';RUST=d?[240,240,239]:[22,22,22];CON=d?[22,22,22]:[240,240,239];
  document.documentElement.dataset.theme=THEME;const m=document.querySelector('meta[name=theme-color]');if(m)m.content='rgb('+CON+')';}
applyTheme(document.documentElement.dataset.theme||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'));
// follow the system setting until the visitor picks one with the toggle
matchMedia('(prefers-color-scheme: dark)').addEventListener('change',e=>{let s=null;try{s=localStorage.getItem('soeren.theme');}catch(_){}if(!s){applyTheme(e.matches?'dark':'light');restyle();}});
// theme switch: the new look grows from the tap point inside an irregular blob (same harmonics as the photo outline,
// drifting while it grows); its edge and a few ripples behind it are drawn as lines in the art's style
let WAVE=null;const WSTYLE=document.createElement('style');document.head.appendChild(WSTYLE);
// pacing per direction: every direction surges and stalls at its own moment (phase psi varies around the blob); all arrive at p=1
function wavePace(w,th,p){let psi=w.sph;for(const[k,ph,c] of w.ps)psi+=c*Math.sin(k*th+ph);
  const q=Math.min(1,Math.max(0,p+0.05*Math.sin(6.2832*w.sf*p+psi)*Math.sin(Math.PI*p)));return 0.5-0.5*Math.cos(Math.PI*q);}
function waveF(h,th,t){let v=0;for(const[k,a,ph,om] of h)v+=a*Math.sin(k*th+ph+om*t);return 1+(v<0?v*0.4:v);}
function wavePts(w,p,t,off){const P=[],N=SMOOTH?200:260;for(let i=0;i<N;i++){const th=i/N*6.2832,f=waveF(w.h,th,t);
  const r=Math.max(0,w.R*wavePace(w,th,p)*f-off);P.push([w.x+r*Math.cos(th),w.y+r*Math.sin(th)]);}return P;}
function wavePath(P){const f=v=>v.toFixed(1);
  if(SMOOTH){const m=(a,b)=>[(a[0]+b[0])/2,(a[1]+b[1])/2];let q=m(P[P.length-1],P[0]),s='M'+f(q[0])+' '+f(q[1]);
    for(let i=0;i<P.length;i++){const a=P[i],n=m(a,P[(i+1)%P.length]);s+='Q'+f(a[0])+' '+f(a[1])+' '+f(n[0])+' '+f(n[1]);}return s+'Z';}
  const sn=v=>Math.round(v/g)*g;let s='M'+sn(P[0][0])+' '+sn(P[0][1]);for(let i=1;i<=P.length;i++){const a=P[i%P.length];s+='H'+sn(a[0])+'V'+sn(a[1]);}return s+'Z';}
function waveP(w,now){return Math.min(1,Math.max(0,(now-w.t0)/w.d));}
function waveFrame(now){const w=WAVE;if(!w)return;const t=(now-w.t0)/1000;
  WSTYLE.textContent='::view-transition-new(root){clip-path:path("'+wavePath(wavePts(w,waveP(w,now),t,0))+'")}';dirty=true;
  if(now-w.t0<w.d)requestAnimationFrame(waveFrame);}
function drawWaveLines(){const w=WAVE;if(!w||!w.t0)return;const now=performance.now(),t=(now-w.t0)/1000,p=waveP(w,now),lw=SMOOTH?Math.max(1.4,g*0.62):g;
  ctx.save();ctx.strokeStyle='rgb('+RUST+')';ctx.lineWidth=lw;ctx.lineJoin='round';
  for(let k=0;k<4;k++){ctx.globalAlpha=(SMOOTH&&k?0.85-k*0.2:1)*Math.min(1,(1-p)*5);ctx.stroke(new Path2D(wavePath(wavePts(w,p,t-k*0.12,lw/2+1+k*w.gap))));}
  ctx.restore();}
function toggleTheme(x,y){const t=THEME==='dark'?'light':'dark';try{localStorage.setItem('soeren.theme',t);}catch(e){}
  const swap=()=>{applyTheme(t);restyle();};
  if(!document.startViewTransition||matchMedia('(prefers-reduced-motion: reduce)').matches||WAVE){swap();return;}
  const rnd=Math.random,h=[[2,.12],[3,.10],[4,.06],[5,.07],[7,.05],[9,.035],[13,.022],[17,.014]].map(([k,a])=>[k,a*(.6+rnd()*.8),rnd()*6.2832,(rnd()-.5)*4]),
    ps=[[1,rnd()*6.2832,.6+rnd()*.8],[2,rnd()*6.2832,.4+rnd()*.6],[3,rnd()*6.2832,.2+rnd()*.5]];
  // size from this outline's narrowest point over the whole run, so the wave covers the screen exactly at the end, not halfway
  let fmin=1;for(let j=0;j<=6;j++)for(let i=0;i<180;i++){const f=waveF(h,i/180*6.2832,j*0.33);if(f<fmin)fmin=f;}
  const gap=Math.max(10,g*4),far=Math.hypot(Math.max(x,W-x),Math.max(y,H-y));
  WAVE={x,y,h,ps,sf:2+rnd()*1.3,sph:rnd()*6.2832,gap,R:(far+4*gap)/Math.max(0.35,fmin)*1.02,d:1900,t0:0};
  WSTYLE.textContent='::view-transition-new(root){clip-path:circle(0px at '+x+'px '+y+'px)}';
  const vt=document.startViewTransition(swap);
  vt.ready.then(()=>{WAVE.t0=performance.now();requestAnimationFrame(waveFrame);}).catch(()=>{});
  vt.finished.finally(()=>{WAVE=null;WSTYLE.textContent='';dirty=true;});}
// everything drawn with the old ink: rebuild the canvas state and force every DOM frame to redraw
function restyle(){if(!ready||trans)return;settle=null;const pl=document.getElementById('player'),mm=document.getElementById('music'),f=document.getElementById('bform');
  pl._k=null;f._w=null;if(mm){mm._k=null;const l=mm.querySelector('.tlist');if(l)l._k=null;}build(page);renderPlayer();
  drawIdle();renderPlayerFrame();renderMusicFrames();renderFormFrame();dirty=false;}
const BAYER=[[0,8,2,10],[12,4,14,6],[3,11,1,9],[15,7,13,5]].map(r=>r.map(v=>(v+0.5)/16));
const cv=document.getElementById('art'),ctx=cv.getContext('2d'),hot=document.getElementById('hot');
const images={},masks={};let loaded=0,need=0,ready=false,cur=null,trans=null;
let W,H,dpr,cw,ch,g=5,LOOSE=4,FORMLV=4,BGLV=4,DETAIL=15,Rmax=150,mx=-9999,my=-9999,curR=0,tgtR=0,dirty=true;

function met(){W=innerWidth;H=innerHeight;const s=Math.min(W,H);dpr=Math.min(devicePixelRatio||1,2);
  g=W>1800?4:3;Rmax=Math.max(90,Math.round(s*0.26));}
function cover(iw,ih){const ir=iw/ih,cr=cw/ch;let sw,sh;
  if(ir>cr){sh=ih;sw=sh*cr;}else{sw=iw;sh=sw/cr;}
  const ar=W/H,zoom=Math.max(1,Math.min(1.35,1+(ar-1)*0.4));sw/=zoom;sh/=zoom;
  const sx=(iw-sw)/2,sy=(ih-sh)/2;return[sx,sy,sw,sh];}
function samp(im,sm){const o=document.createElement('canvas');o.width=cw;o.height=ch;const x=o.getContext('2d');
  x.imageSmoothingEnabled=sm;const[a,b,c,d]=cover(im.width,im.height);x.drawImage(im,a,b,c,d,0,0,cw,ch);return x.getImageData(0,0,cw,ch).data;}
function blr(L){const o=new Float32Array(L.length);for(let y=0;y<ch;y++)for(let x=0;x<cw;x++){let s=0,n=0;
  for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const nx=x+dx,ny=y+dy;if(nx>=0&&nx<cw&&ny>=0&&ny<ch){s+=L[ny*cw+nx];n++;}}o[y*cw+x]=s/n;}return o;}
function fieldOf(im){const d=samp(im,true);let L=new Float32Array(cw*ch);
  for(let i=0;i<cw*ch;i++)L[i]=(0.299*d[i*4]+0.587*d[i*4+1]+0.114*d[i*4+2])/255;
  L=blr(blr(blr(blr(blr(L)))));let mn=1,mx2=0;for(const v of L){if(v<mn)mn=v;if(v>mx2)mx2=v;}
  for(let i=0;i<L.length;i++)L[i]=(L[i]-mn)/(mx2-mn+1e-6);return L;}
function maskOf(m){const d=samp(m,true);const M=new Uint8Array(cw*ch);for(let i=0;i<cw*ch;i++)M[i]=d[i*4]>128?1:0;return M;}
function maskSoft(m){const d=samp(m,true);const M=new Float32Array(cw*ch);for(let i=0;i<cw*ch;i++)M[i]=d[i*4]/255;return blr(M);}
function mrp(M,mode,it){let a=M;for(let k=0;k<it;k++){const o=new Uint8Array(a.length);
  for(let y=0;y<ch;y++)for(let x=0;x<cw;x++){const i=y*cw+x,v=a[i],l=x>0?a[i-1]:v,r=x<cw-1?a[i+1]:v,u=y>0?a[i-cw]:v,dn=y<ch-1?a[i+cw]:v;
    o[i]=mode==='e'?(v&&l&&r&&u&&dn?1:0):(v||l||r||u||dn?1:0);}a=o;}return a;}
function qedge(L,lv,valid){const q=new Int16Array(L.length);for(let i=0;i<L.length;i++)q[i]=Math.floor(L[i]*lv);
  const e=new Uint8Array(L.length);for(let y=0;y<ch;y++)for(let x=0;x<cw;x++){const i=y*cw+x;let on=false;
    if(x>0&&q[i]!==q[i-1])on=true;else if(y>0&&q[i]!==q[i-cw])on=true;if(on&&(!valid||valid[i]))e[i]=1;}return e;}
function medge(M){const e=new Uint8Array(M.length);for(let y=0;y<ch;y++)for(let x=0;x<cw;x++){const i=y*cw+x;
  if((x>0&&M[i]!==M[i-1])||(y>0&&M[i]!==M[i-cw]))e[i]=1;}return e;}
function desp(e,k){const o=e.slice();for(let y=0;y<ch;y++)for(let x=0;x<cw;x++){const i=y*cw+x;if(!e[i])continue;let n=0;
  for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){if(!dx&&!dy)continue;const nx=x+dx,ny=y+dy;
    if(nx>=0&&nx<cw&&ny>=0&&ny<ch&&e[ny*cw+nx])n++;}if(n<k)o[i]=0;}return o;}

/* organic photo window derived from a contour-like closed curve */
function photoBlob(bx,by,bw,bh,seed){const _r=_rng(seed||'blob');
  const HARM=[[2,0.10],[3,0.10],[5,0.07],[7,0.05],[9,0.035]].map(h=>[h[0],h[1]*(0.7+_r()*0.7),_r()*6.28]);let R0=1;for(const h of HARM)R0+=Math.abs(h[1]);
  const cx=(bx+bw/2)/g,cy=(by+bh/2)/g,rx=(bw/2)/g/R0,ry=(bh/2)/g/R0,N=720;
  const mc=document.createElement('canvas');mc.width=cw;mc.height=ch;const mg=mc.getContext('2d');mg.fillStyle='#fff';mg.beginPath();
  const path=[];for(let i=0;i<N;i++){const th=i/N*2*Math.PI;let r=1;for(const[k,a,ph] of HARM)r+=a*Math.sin(k*th+ph);
    const X=cx+rx*r*Math.cos(th),Y=cy+ry*r*Math.sin(th);path.push([X*g,Y*g]);i?mg.lineTo(X,Y):mg.moveTo(X,Y);}
  mg.closePath();mg.fill();
  const md=mg.getImageData(0,0,cw,ch).data,M=new Uint8Array(cw*ch);for(let i=0;i<cw*ch;i++)M[i]=md[i*4+3]>127?1:0;
  const edge=medge(M);
  let x0=cw,y0=ch,x1=0,y1=0;for(let i=0;i<cw*ch;i++){if(!M[i])continue;const gx=i%cw,gy=(i/cw)|0;if(gx<x0)x0=gx;if(gy<y0)y0=gy;if(gx>x1)x1=gx;if(gy>y1)y1=gy;}
  x0=Math.max(0,x0-1);y0=Math.max(0,y0-1);x1=Math.min(cw-1,x1+1);y1=Math.min(ch-1,y1+1);
  const px0=x0*g,py0=y0*g,pbw=(x1+1-x0)*g,pbh=(y1+1-y0)*g;
  function crop(cells,rgba){const src=document.createElement('canvas');src.width=cw;src.height=ch;const sc=src.getContext('2d');
    const sd=sc.createImageData(cw,ch),sp=sd.data;for(let i=0;i<cw*ch;i++){if(cells[i]){sp[i*4]=rgba[0];sp[i*4+1]=rgba[1];sp[i*4+2]=rgba[2];sp[i*4+3]=rgba[3];}}
    sc.putImageData(sd,0,0);const out=document.createElement('canvas');out.width=pbw;out.height=pbh;const oc=out.getContext('2d');oc.imageSmoothingEnabled=false;
    oc.drawImage(src,x0,y0,(x1-x0+1),(y1-y0+1),0,0,pbw,pbh);return out.toDataURL();}
  const gw=x1-x0+1,gh=y1-y0+1,mcells=new Uint8Array(gw*gh),ecells=new Uint8Array(gw*gh);
  for(let yy=0;yy<gh;yy++)for(let xx=0;xx<gw;xx++){const si=(y0+yy)*cw+(x0+xx),di=yy*gw+xx;mcells[di]=M[si];ecells[di]=edge[si];}
  return {path,x:px0,y:py0,w:pbw,h:pbh,gx0:x0,gy0:y0,gw,gh,mcells,ecells,maskURI:crop(M,[255,255,255,255]),lineURI:crop(edge,[RUST[0],RUST[1],RUST[2],255])};}

/* text + quiet zone */
function fitFont(mc,t,wt,maxW,px){mc.font=wt+" "+px+"px Archivo";const w=mc.measureText(t).width;if(w>maxW)px=Math.floor(px*maxW/w);return Math.max(10,px);}
function wrap(mc,t,wt,px,maxW){mc.font=wt+" "+px+"px Archivo";const ws=t.split(' ');const o=[];let c='';
  for(const w of ws){const s=c?c+' '+w:w;if(mc.measureText(s).width>maxW&&c){o.push(c);c=w;}else c=s;}if(c)o.push(c);return o;}
function gigYear(g){const m=(g.en||'').match(/\d{4}/g);return m?Math.max.apply(null,m.map(Number)):0;}
function layout(pid){const mc=document.createElement('canvas').getContext('2d');const S=STR[lang];
  const items=[],boxes=[];let formRect=null,mediaRect=null,galRect=null,musicRect=null;
  const M=Math.max(16,Math.round(W*0.045)),usable=W-2*M,wide=W>=1000,K=wide?1.18:1;document.documentElement.style.setProperty('--k',K);
  // chrome: nav
  const nn=W<820,nfs=nn?Math.max(12,Math.round(Math.min(W,H)*0.032)):Math.max(13,Math.round(Math.min(W,H)*0.026)),gap=Math.round(nfs*(nn?1.0:1.05)),rowH=Math.round(nfs*1.5);
  mc.font="700 "+nfs+"px Archivo";let nx=M,ny=Math.max(14,Math.round(H*0.05));
  const starW=mc.measureText("*").width;let activeStar=null;
  PAGES.forEach(([id],idx)=>{const lab=S.nav[id];const w=Math.ceil(mc.measureText(lab).width);
    if(nx+w>W-M&&nx>M){nx=M;ny+=rowH;}items.push({t:lab,px:nfs,x:nx,y:ny,wt:700,chrome:true});
    boxes.push({x:nx-7,y:ny-7,w:w+14,h:nfs+14,act:'go',arg:id});
    if(id===pid)activeStar={x:Math.round(nx-starW-2),y:ny};nx+=w;
    if(idx<PAGES.length-1){if(nn){const dw=mc.measureText("·").width;items.push({t:"·",px:nfs,x:Math.round(nx+(gap-dw)/2),y:ny,wt:700,chrome:true});}nx+=gap;}});
  if(activeStar)items.push({t:"*",px:nfs,x:activeStar.x,y:activeStar.y,wt:700});
  // chrome: lang
  const lfs=Math.max(12,Math.round(Math.min(W,H)*0.024));mc.font="700 "+lfs+"px Archivo";
  const de="de",en="en",sepW=mc.measureText(" / ").width,enW=mc.measureText(en).width,deW=mc.measureText(de).width;
  const ltot=enW+sepW+deW;let lx=W-M-ltot,lyy=Math.max(14,Math.round(H*0.05));
  items.push({t:en,px:lfs,x:lx,y:lyy,wt:700,chrome:true});boxes.push({x:lx-6,y:lyy-6,w:enW+12,h:lfs+12,act:'lang',arg:'en'});
  items.push({t:"/",px:lfs,x:lx+enW+sepW*0.35,y:lyy,wt:700,chrome:true});
  items.push({t:de,px:lfs,x:lx+enW+sepW,y:lyy,wt:700,chrome:true});boxes.push({x:lx+enW+sepW-6,y:lyy-6,w:deW+12,h:lfs+12,act:'lang',arg:'de'});
  const ulY=lyy+lfs+Math.round(lfs*0.16),ulH=Math.max(2,Math.round(lfs*0.11));
  if(lang==='en')items.push({ul:true,x:Math.round(lx),y:ulY,w:Math.round(enW),h:ulH,chrome:true});
  else items.push({ul:true,x:Math.round(lx+enW+sepW),y:ulY,w:Math.round(deW),h:ulH,chrome:true});
  const thl=THEME==='dark'?(lang==='de'?'hell':'light'):(lang==='de'?'dunkel':'dark'),thW=Math.ceil(mc.measureText(thl).width),thx=Math.round(lx-Math.round(lfs*1.5)-thW);
  items.push({t:thl,px:lfs,x:thx,y:lyy,wt:700,chrome:true});boxes.push({x:thx-6,y:lyy-6,w:thW+12,h:lfs+12,act:'theme'});
  // content geometry
  const topY=ny+rowH+Math.round(H*0.02);
  const body=Math.max(15,Math.round(Math.min(W,H)*0.03)),small=Math.max(12,Math.round(Math.min(W,H)*0.021));
  const cgap=Math.max(28,Math.round(W*0.045));
  const half=Math.round(usable/2);
  const bwFix=wide?Math.min(680,Math.round(usable*0.44)):0;
  const colW=wide?Math.max(360,Math.min(760,(W-M-bwFix)-M-44)):Math.min(usable,640);
  const xL=M,xR=M;
  function eyeb(c,t){items.push({t:t.toUpperCase(),px:small,x:c.x,y:c.y,wt:700,track:true});c.y+=Math.round(small*2);}
  function sub(c,t){items.push({t:t,px:small,x:c.x,y:c.y,wt:700,track:true});c.y+=Math.round(small*1.8);}
  function put(c,t,px,wt){wrap(mc,t,wt,px,c.w).forEach(l=>{items.push({t:l,px,x:c.x,y:c.y,wt});c.y+=Math.round(px*1.45);});}
  function gigRow(c,gig,i){const y0=c.y,meta=gig[lang],open=(i===openGig),clk=gig.type!=='none';
    const TL={carousel:(gig.url?'videos + mix':'videos'),video:'radio set',soundcloud:'audio',audio:'audio',gallery:(lang==='de'?'fotos':'photos')};
    mc.font="700 "+body+"px Archivo";const ind=Math.ceil(mc.measureText('\u25B8  ').width);
    if(clk)items.push({t:open?'\u25BE':'\u25B8',px:body,x:c.x,y:c.y,wt:700});
    items.push({t:gig.venue,px:body,x:c.x+ind,y:c.y,wt:700});
    mc.font="700 "+small+"px Archivo";const mw=mc.measureText(meta).width;
    items.push({t:meta,px:small,x:c.x+c.w-mw,y:c.y+Math.round((body-small)*0.55),wt:700});
    c.y+=Math.round(body*1.12);let h=Math.round(body*1.12);
    if(clk){const tl=TL[gig.type]||'';if(tl)items.push({t:tl,px:Math.round(small*0.95),x:c.x+ind,y:c.y,wt:700,track:true});c.y+=Math.round(small*1.5);h+=Math.round(small*1.5);}
    else c.y+=Math.round(small*0.6);
    if(clk)boxes.push({x:c.x-6,y:y0-6,w:c.w+12,h:h+12,act:'media',arg:i});
    if(open&&clk){const t=gig.type,mh=t==='carousel'?(Math.round(Math.min(H*0.5,380))+(gig.url?128:0)):t==='video'?Math.round(c.w*0.6):t==='gallery'?Math.round(c.w*0.34):t==='soundcloud'?130:48;
      mediaRect={x:c.x,y:Math.round(c.y),w:c.w,h:mh};c.y+=mh+Math.round(small*1.2);}}
  function trackRow(c,tr,i){const y0=c.y,play=!tr.soon;mc.font="700 "+body+"px Archivo";
    const tri=play?'\u25B8  ':'';
    items.push({t:tri+tr.title,px:body,x:c.x,y:c.y,wt:700});
    mc.font="700 "+small+"px Archivo";const mt=tr.meta||'',mw=mc.measureText(mt).width;
    items.push({t:mt,px:small,x:c.x+c.w-mw,y:c.y+Math.round((body-small)*0.55),wt:700});
    if(play)boxes.push({x:c.x-6,y:y0-6,w:c.w+12,h:body+12,act:'track',arg:i});
    c.y+=Math.round(body*1.55);}

  if(pid==="home"){
    if(wide){const hw=Math.min(usable,720),wf=fitFont(mc,"søren *live","800",hw,Math.round(H*0.17));
      let y=Math.max(topY,Math.round(H*0.20));items.push({t:"søren *live",px:wf,x:xL,y,wt:800});y+=wf+Math.round(wf*0.12);
      put({x:xL,y,w:Math.min(usable,640)},S.tagline,body,700);
    }else{const wf=fitFont(mc,"søren","800",usable,Math.round(H*0.12));
      let y=Math.max(topY,Math.round(H*0.13));items.push({t:"søren",px:wf,x:xL,y,wt:800});y+=Math.round(wf*1.02);
      items.push({t:"*live",px:wf,x:xL,y,wt:800});y+=wf+Math.round(wf*0.22);
      put({x:xL,y,w:usable},S.tagline,body,700);}
  } else if(pid==="about"){const c={x:xL,y:topY,w:colW};eyeb(c,S.nav.about);
    const bfs=Math.max(14,Math.round(Math.min(W,H)*0.0225)),bw2=Math.min(usable,wide?740:colW),B={x:xL,y:c.y,w:bw2};
    put(B,S.bio[bioPage],bfs,600);B.y+=Math.round(bfs*1.2);
    mc.font="700 "+small+"px Archivo";const pv="\u2039",nx="\u203A",idx=(bioPage+1)+" / "+S.bio.length,gp=Math.round(small*1.5);
    let px2=B.x;const pvw=mc.measureText(pv).width;
    items.push({t:pv,px:small,x:px2,y:B.y,wt:700});if(bioPage>0)boxes.push({x:px2-10,y:B.y-10,w:pvw+20,h:small+20,act:'bio',arg:bioPage-1});px2+=pvw+gp;
    const idw=mc.measureText(idx.split('').join('\u200a')).width;items.push({t:idx,px:small,x:px2,y:B.y,wt:700,track:true});px2+=idw+gp;
    const nxw=mc.measureText(nx).width;items.push({t:nx,px:small,x:px2,y:B.y,wt:700});if(bioPage<S.bio.length-1)boxes.push({x:px2-10,y:B.y-10,w:nxw+20,h:small+20,act:'bio',arg:bioPage+1});
  } else if(pid==="live"){const c={x:xL,y:topY,w:colW};eyeb(c,S.nav.live);
    const L={x:xL,y:c.y,w:colW};sub(L,S.upcoming);put(L,S.no_dates,small,600);L.y+=Math.round(small*1.4);
    sub(L,S.past);GIGS.map((g,i)=>[g,i]).sort((a,b)=>gigYear(b[0])-gigYear(a[0])).forEach(([g,i])=>gigRow(L,g,i));
  } else if(pid==="booking"){const c={x:xL,y:topY,w:colW};eyeb(c,S.nav.booking);const y0=c.y;
    const L={x:xL,y:y0,w:colW};put(L,S.booking_intro,body,700);L.y+=Math.round(small*0.6);
    const fi=Math.round(1.6*g),fw=Math.min(L.w,Math.round(440*K))+2*fi,fh=Math.round((16+3*40+88+48+14)*K);L.y+=Math.round(small*0.4);
    formRect={x:L.x-fi,y:Math.round(L.y),w:fw,h:fh};L.y+=fh+Math.round(small*1.2);
    const rc=L;
    function lnk(label,url){mc.font="700 "+small+"px Archivo";const w=Math.ceil(mc.measureText(label).width);items.push({t:label,px:small,x:rc.x,y:rc.y,wt:700});boxes.push({x:rc.x-6,y:rc.y-6,w:w+12,h:small+12,act:'url',arg:url});rc.y+=Math.round(small*1.7);}
    lnk(CFG.instagram,CFG.ig_url);
    rc.y+=Math.round(small*0.6);
    put(rc,S.credit,small,600);
  } else if(pid==="music"){const c={x:xL,y:topY,w:usable};eyeb(c,S.nav.music);
    const M2={x:xL,y:c.y,w:colW};put(M2,S.music_intro,body,700);M2.y+=Math.round(small*1.3);
    const fi=Math.round(1.6*g);musicRect={x:xL-fi,y:Math.round(M2.y),w:Math.min(colW,Math.round(680*K))+2*fi,h:0};
  }
  // player bar: on the text margin, above the footer line; its height is reserved while it is open
  const fi=Math.round(1.6*g),footY=H-Math.round(Math.max(22,H*0.045)),pGap=Math.round(10*K),pH=playerActive?Math.round(PBAR_H*K)+pGap:0;
  const playerRect={x:M-fi,w:(wide?colW:usable)+2*fi,bottom:footY-pGap};
  let photoRect=null;
  {
    const footB=H-Math.round(Math.max(22,H*0.045))-8;
    if(wide){
      const bw=bwFix,bh=Math.round(bw*0.9),bx=W-M-bw,by=footB-bh;
      photoRect=photoBlob(bx,by,bw,bh,pid);
      const dx=(W-M)-(photoRect.x+photoRect.w),dy=footB-(photoRect.y+photoRect.h);
      if(Math.abs(dx)>=g||Math.abs(dy)>=g)photoRect=photoBlob(bx+dx,by+dy,bw,bh,pid);
    }else{
      let cbAll=topY;items.forEach(it=>{if(it.chrome)return;const b=it.h?it.y+it.h:it.y+(it.px||0);cbAll=Math.max(cbAll,b);});
      [formRect,mediaRect,galRect,musicRect].forEach(r=>{if(r)cbAll=Math.max(cbAll,r.y+(r.h||0));});
      const bottom=footB-pH-12,bw=Math.min(usable,Math.round(usable*(pid==='music'?0.58:0.86))),bh=Math.round(bw*0.82),by=bottom-bh,bx=Math.round((W-bw)/2);
      photoRect=photoBlob(bx,by,bw,bh,pid);
      const dx=Math.round(W/2-(photoRect.x+photoRect.w/2)),dy=bottom-(photoRect.y+photoRect.h);
      if(Math.abs(dx)>=g||Math.abs(dy)>=g)photoRect=photoBlob(bx+dx,by+dy,bw,bh,pid);
    }
    if(photoRect)photoRect.photo=PHOTOS[pid];
  }
  const cb=(!wide&&photoRect)?photoRect.y-10:footY-4-pH;
  if(musicRect)musicRect.h=Math.max(Math.round(120*K),cb-musicRect.y-Math.round(6*K));
  const ff=Math.max(11,Math.round(Math.min(W,H)*0.02));
  items.push({t:"søren *live",px:ff,x:M,y:H-Math.round(Math.max(22,H*0.045)),wt:600,chrome:true});
  let contentH=topY;items.forEach(it=>{if(it.chrome)return;const b=it.h?it.y+it.h:it.y+(it.px||0);contentH=Math.max(contentH,b);});
  [formRect,mediaRect,musicRect].forEach(r=>{if(r)contentH=Math.max(contentH,r.y+(r.h||0));});
  if(photoRect&&!wide)contentH=Math.max(contentH,photoRect.y+photoRect.h);
  return {items,boxes,formRect,mediaRect,galRect,photoRect,musicRect,playerRect,topY,cb,contentH};}
function textOf(items){
  function draw(list){const c=document.createElement('canvas');c.width=Math.round(W*dpr);c.height=Math.round(H*dpr);
    const x=c.getContext('2d');x.scale(dpr,dpr);x.textBaseline="top";x.fillStyle="rgb("+RUST+")";
    list.forEach(it=>{if(it.ul){x.fillRect(it.x,it.y,it.w,it.h||2);return;}
      let t=it.t;if(it.track)t=t.split('').join('\u200a');x.font=it.wt+" "+it.px+"px Archivo, sans-serif";x.fillText(t,it.x,it.y);});
    return c;}
  function gmask(c){const sc=document.createElement('canvas');sc.width=cw;sc.height=ch;const sg=sc.getContext('2d');sg.imageSmoothingEnabled=true;sg.drawImage(c,0,0,cw,ch);
    const d=sg.getImageData(0,0,cw,ch).data;const m=new Uint8Array(cw*ch);for(let i=0;i<cw*ch;i++)m[i]=d[i*4+3]>25?1:0;return m;}
  const content=items.filter(it=>!it.chrome),chrome=items.filter(it=>it.chrome);
  const contentCanvas=draw(content),chromeCanvas=draw(chrome);
  const allC=document.createElement('canvas');allC.width=Math.round(W*dpr);allC.height=Math.round(H*dpr);
  const ax=allC.getContext('2d');ax.drawImage(contentCanvas,0,0);ax.drawImage(chromeCanvas,0,0);
  const tmask=gmask(allC),taM=gmask(contentCanvas);
  return {contentCanvas,chromeCanvas,halo:mrp(tmask,'d',2),tmask,ta:blr(new Float32Array(taM))};}

function clearField(tmask,rects){const core=mrp(tmask,'d',2),wide=mrp(tmask,'d',4);
  const rr=(rects||[]).filter(Boolean).map(r=>[r.x/g,r.y/g,(r.x+r.w)/g,(r.y+r.h)/g]);
  const inR=(gx,gy,pad)=>{for(const z of rr){if(gx>=z[0]-pad&&gx<=z[2]+pad&&gy>=z[1]-pad&&gy<=z[3]+pad)return true;}return false;};
  let cf=new Float32Array(cw*ch);
  for(let i=0;i<cw*ch;i++){const gx=i%cw,gy=(i/cw)|0;if(wide[i]||inR(gx,gy,2))cf[i]=1;}
  cf=blr(blr(blr(cf)));
  for(let i=0;i<cw*ch;i++){const gx=i%cw,gy=(i/cw)|0;if(core[i]||inR(gx,gy,-1))cf[i]=1;}
  return cf;}
function keepLong(e,K){const lab=new Int32Array(e.length),keep=new Uint8Array(e.length),st=[];let cc=0;
  for(let i=0;i<e.length;i++){if(!e[i]||lab[i])continue;cc++;st.length=0;st.push(i);lab[i]=cc;const comp=[];
    while(st.length){const q=st.pop();comp.push(q);const x=q%cw,y=(q/cw)|0;
      for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){if(!dx&&!dy)continue;const nx=x+dx,ny=y+dy;
        if(nx>=0&&nx<cw&&ny>=0&&ny<ch){const r=ny*cw+nx;if(e[r]&&!lab[r]){lab[r]=cc;st.push(r);}}}}
    if(comp.length>=K)for(const q of comp)keep[q]=1;}
  return keep;}
function linesOf(L,Mb){const inner=mrp(Mb,'e',3),outer=mrp(Mb,'d',2),outline=medge(Mb);
  const Kf=Math.max(8,Math.round(cw*0.034)),Kb=Math.max(14,Math.round(cw*0.06));
  const form=keepLong(qedge(L,FORMLV,inner),Kf);
  const bv=new Uint8Array(cw*ch);for(let i=0;i<cw*ch;i++)bv[i]=outer[i]?0:1;
  const bg=keepLong(qedge(blr(blr(L)),BGLV,bv),Kb);
  if(SMOOTH)return{form,bg,Lb:blr(blr(L))};
  const ln=new Uint8Array(cw*ch);for(let i=0;i<cw*ch;i++)ln[i]=(bg[i]||form[i]||outline[i])?1:0;return ln;}
/* smooth lines: the same contours, traced with marching squares and stroked as vectors.
   A square is traced only where the pixel version keeps a line cell, so the composition is identical. */
function msTrace(c,F,lv,gate){const h=g/2;c.beginPath();
  for(const t of lv){for(let y=0;y<ch-1;y++)for(let x=0;x<cw-1;x++){const i=y*cw+x;
    if(gate&&!(gate[i]||gate[i+1]||gate[i+cw]||gate[i+cw+1]))continue;
    const a=F[i],b=F[i+1],d=F[i+cw],e=F[i+cw+1],k=(a>t?8:0)|(b>t?4:0)|(e>t?2:0)|(d>t?1:0);if(k===0||k===15)continue;
    const X=x*g+h,Y=y*g+h,f=(p,q)=>(t-p)/(q-p||1e-6)*g;
    const T=[X+f(a,b),Y],R=[X+g,Y+f(b,e)],B=[X+f(d,e),Y+g],Lf=[X,Y+f(a,d)];
    const seg=(P,Q)=>{c.moveTo(P[0],P[1]);c.lineTo(Q[0],Q[1]);};
    switch(k){case 1:case 14:seg(Lf,B);break;case 2:case 13:seg(B,R);break;case 3:case 12:seg(Lf,R);break;
      case 4:case 11:seg(T,R);break;case 6:case 9:seg(T,B);break;case 7:case 8:seg(Lf,T);break;
      case 5:seg(Lf,T);seg(B,R);break;case 10:seg(T,R);seg(Lf,B);break;}}}
  c.stroke();}
function smoothLines(L,Mb,Ms,cf){const P=linesOf(L,Mb);
  const lc=document.createElement('canvas');lc.width=Math.round(W*dpr);lc.height=Math.round(H*dpr);const c=lc.getContext('2d');
  c.scale(dpr,dpr);c.strokeStyle='rgb('+RUST+')';c.lineWidth=Math.max(1.4,g*0.62);c.lineCap='round';c.lineJoin='round';
  msTrace(c,L,[0.25,0.5,0.75],P.form);msTrace(c,P.Lb,[0.25,0.5,0.75],P.bg);msTrace(c,Ms,[0.5],null);
  // fade lines out around text / boxes with the clear field (soft, instead of the Bayer stipple)
  const fc=document.createElement('canvas');fc.width=cw;fc.height=ch;const fx=fc.getContext('2d'),fd=fx.createImageData(cw,ch);
  for(let i=0;i<cw*ch;i++)fd.data[i*4+3]=Math.min(255,cf[i]*290);fx.putImageData(fd,0,0);
  c.setTransform(1,0,0,1,0,0);c.globalCompositeOperation='destination-out';c.imageSmoothingEnabled=true;c.drawImage(fc,0,0,lc.width,lc.height);
  const out=document.createElement('canvas');out.width=lc.width;out.height=lc.height;const o=out.getContext('2d');
  o.fillStyle='rgb('+CON+')';o.fillRect(0,0,out.width,out.height);o.drawImage(lc,0,0);return out;}
function drawBase(c){if(c.width===cw)ctx.drawImage(c,0,0,cw,ch,0,0,W,H);else ctx.drawImage(c,0,0,W,H);}
function baseImg(L,Mb,cf,Ms){if(SMOOTH)return smoothLines(L,Mb,Ms,cf);const ln=linesOf(L,Mb);
  const c=document.createElement('canvas');c.width=cw;c.height=ch;const id=c.getContext('2d').createImageData(cw,ch),p=id.data;
  for(let i=0;i<cw*ch;i++){const gx=i%cw,gy=(i/cw)|0;const keep=ln[i]&&(cf[i]<BAYER[gy&3][gx&3]);const col=keep?RUST:CON;
    p[i*4]=col[0];p[i*4+1]=col[1];p[i*4+2]=col[2];p[i*4+3]=255;}
  c.getContext('2d').putImageData(id,0,0);return c;}
function detailImg(L,Mb,halo){const inner=mrp(Mb,'e',1),e=desp(qedge(L,DETAIL,inner),1);
  const sc=document.createElement('canvas');sc.width=cw;sc.height=ch;const id=sc.getContext('2d').createImageData(cw,ch),p=id.data;
  for(let i=0;i<cw*ch;i++){if(e[i]&&!halo[i]){p[i*4]=RUST[0];p[i*4+1]=RUST[1];p[i*4+2]=RUST[2];p[i*4+3]=255;}else p[i*4+3]=0;}
  sc.getContext('2d').putImageData(id,0,0);const fs=document.createElement('canvas');fs.width=W;fs.height=H;
  const fx=fs.getContext('2d');fx.imageSmoothingEnabled=true;fx.imageSmoothingQuality='high';fx.drawImage(sc,0,0,cw,ch,0,0,W,H);return fs;}

function stateFor(pid){const photo=PHOTOS[pid];const L=fieldOf(images[photo]),Mb=maskOf(masks[photo]),Ms=maskSoft(masks[photo]);
  const lay=layout(pid);const txt=textOf(lay.items);const cf=clearField(txt.tmask,[lay.formRect,lay.mediaRect,lay.galRect,lay.musicRect]);
  if(lay.photoRect){const pr=lay.photoRect,im=images[pr.photo];
    const oc=document.createElement('canvas');oc.width=pr.gw;oc.height=pr.gh;const og=oc.getContext('2d');og.imageSmoothingEnabled=true;
    const bAR=pr.gw/pr.gh,iAR=im.width/im.height;let sw,sh;if(iAR>bAR){sh=im.height;sw=sh*bAR;}else{sw=im.width;sh=sw/bAR;}
    const sx=(im.width-sw)/2,sy=(im.height-sh)*0.18;og.drawImage(im,sx,sy,sw,sh,0,0,pr.gw,pr.gh);
    const gd=og.getImageData(0,0,pr.gw,pr.gh),gp=gd.data;for(let i=0;i<pr.gw*pr.gh;i++)if(!pr.mcells[i])gp[i*4+3]=0;pr.pgrid=gd;
    const cc=document.createElement('canvas');cc.width=pr.w;cc.height=pr.h;const cx2=cc.getContext('2d');
    const csx=(im.width-sw)/2,csy=(im.height-sh)*0.18;cx2.imageSmoothingEnabled=true;cx2.imageSmoothingQuality='high';cx2.drawImage(im,csx,csy,sw,sh,0,0,pr.w,pr.h);
    const mk=document.createElement('canvas');mk.width=pr.gw;mk.height=pr.gh;const mkc=mk.getContext('2d'),mkd=mkc.createImageData(pr.gw,pr.gh),mkp=mkd.data;
    for(let i=0;i<pr.gw*pr.gh;i++)mkp[i*4+3]=pr.mcells[i]?255:0;mkc.putImageData(mkd,0,0);
    cx2.globalCompositeOperation='destination-in';cx2.imageSmoothingEnabled=false;cx2.drawImage(mk,0,0,pr.gw,pr.gh,0,0,pr.w,pr.h);cx2.globalCompositeOperation='source-over';
    const ec=document.createElement('canvas');ec.width=pr.gw;ec.height=pr.gh;const ecc=ec.getContext('2d'),ecd=ecc.createImageData(pr.gw,pr.gh),ecp=ecd.data;
    for(let i=0;i<pr.gw*pr.gh;i++)if(pr.ecells[i]){ecp[i*4]=RUST[0];ecp[i*4+1]=RUST[1];ecp[i*4+2]=RUST[2];ecp[i*4+3]=255;}ecc.putImageData(ecd,0,0);
    cx2.imageSmoothingEnabled=false;cx2.drawImage(ec,0,0,pr.gw,pr.gh,0,0,pr.w,pr.h);pr.crisp=cc;
    if(SMOOTH){const PAD=3,sc=document.createElement('canvas');sc.width=Math.round((pr.w+2*PAD)*dpr);sc.height=Math.round((pr.h+2*PAD)*dpr);
      const s2=sc.getContext('2d');s2.scale(dpr,dpr);s2.translate(PAD-pr.x,PAD-pr.y);
      const trace=()=>{s2.beginPath();pr.path.forEach(([X,Y],i)=>i?s2.lineTo(X,Y):s2.moveTo(X,Y));s2.closePath();};
      s2.save();trace();s2.clip();s2.imageSmoothingEnabled=true;s2.imageSmoothingQuality='high';s2.drawImage(im,csx,csy,sw,sh,pr.x,pr.y,pr.w,pr.h);s2.restore();
      trace();s2.strokeStyle='rgb('+RUST+')';s2.lineWidth=Math.max(1.4,g*0.62);s2.lineJoin='round';s2.stroke();
      pr.crisp=sc;pr.cpad=PAD;}}
  return {base:baseImg(L,Mb,cf,Ms),detail:detailImg(L,Mb,txt.halo),contentCanvas:txt.contentCanvas,chromeCanvas:txt.chromeCanvas,
    boxes:lay.boxes,formRect:lay.formRect,mediaRect:lay.mediaRect,galRect:lay.galRect,photoRect:lay.photoRect,musicRect:lay.musicRect,playerRect:lay.playerRect,cb:lay.cb,topY:lay.topY,contentH:lay.contentH,items:lay.items,L,Ms,ta:txt.ta,cf,pid};}
function build(pid){met();cv.width=W*dpr;cv.height=H*dpr;cv.style.width=W+'px';cv.style.height=H+'px';
  ctx.setTransform(dpr,0,0,dpr,0,0);ctx.imageSmoothingEnabled=false;cw=Math.ceil(W/g);ch=Math.ceil(H/g);
  cur=stateFor(pid);ready=true;dirty=true;bindHot(cur.boxes);placeDom();}

function _clipC(){const[ct,cb]=_win();ctx.save();ctx.beginPath();ctx.rect(0,ct,W,Math.max(20,cb-ct));ctx.clip();}
function drawContent(cc,off,alpha){_clipC();if(alpha!=null)ctx.globalAlpha=alpha;ctx.drawImage(cc,0,-off,W,H);ctx.globalAlpha=1;ctx.restore();}
function updateScroll(){const ty=(cur&&cur.topY?cur.topY:Math.round(H*0.11)),cb=_win()[1],avail=cb-ty;maxScroll=Math.max(0,(cur?cur.contentH:0)-ty-avail+Math.round(H*0.02));if(scrollY>maxScroll)scrollY=maxScroll;if(scrollY<0)scrollY=0;}
function drawCrisp(pr){const p=pr.cpad||0;ctx.drawImage(pr.crisp,pr.x-p,pr.y-p,pr.w+2*p,pr.h+2*p);}
function drawIdle(){ctx.imageSmoothingEnabled=false;drawBase(cur.base);drawWaveLines();const pr=cur.photoRect;
  _clipC();ctx.drawImage(cur.contentCanvas,0,-scrollY,W,H);ctx.restore();
  if(pr&&pr.crisp){ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';drawCrisp(pr);ctx.imageSmoothingEnabled=false;}
  ctx.drawImage(cur.chromeCanvas,0,0,W,H);}
function mframe(gt){const N=cw*ch,o=trans.o,n=trans.n,rad=trans.radial;
  const ox=trans.ox||0,oy=trans.oy||0,cz=trans.chaos,md=trans.maxD||1,SPREAD=0.55,RAMP=0.36;
  const L=new Float32Array(N),Ms=new Float32Array(N),cfm=new Float32Array(N);
  for(let i=0;i<N;i++){let p;
    if(rad){const gx=i%cw,gy=(i/cw)|0,dx=gx-ox,dy=gy-oy,dist=Math.sqrt(dx*dx+dy*dy)/md;
      let q=(gt-(dist*SPREAD+cz[i]))/RAMP;q=q<0?0:q>1?1:q;p=q<.5?2*q*q:1-Math.pow(-2*q+2,2)/2;}
    else p=gt;
    L[i]=o.L[i]*(1-p)+n.L[i]*p;Ms[i]=o.Ms[i]*(1-p)+n.Ms[i]*p;cfm[i]=o.cf[i]*(1-p)+n.cf[i]*p;}
  const Mb=new Uint8Array(N);for(let i=0;i<N;i++)Mb[i]=Ms[i]>0.5?1:0;
  if(SMOOTH)return smoothLines(L,Mb,Ms,cfm);
  const ln=linesOf(L,Mb);
  const c=document.createElement('canvas');c.width=cw;c.height=ch;const id=c.getContext('2d').createImageData(cw,ch),pd=id.data;
  for(let i=0;i<N;i++){const gx=i%cw,gy=(i/cw)|0;const col=(ln[i]&&cfm[i]<BAYER[gy&3][gx&3])?RUST:CON;
    pd[i*4]=col[0];pd[i*4+1]=col[1];pd[i*4+2]=col[2];pd[i*4+3]=255;}c.getContext('2d').putImageData(id,0,0);return c;}
function drawBlobMorph(pr,gt,tr,dir){if(!pr||!pr.pgrid)return;const gw=pr.gw,gh=pr.gh,gx0=pr.gx0,gy0=pr.gy0;
  const ox=tr.ox||0,oy=tr.oy||0,md=tr.maxD||1,chaos=tr.chaos,SPREAD=0.55,RAMP=0.36,src=pr.pgrid.data;
  const c=document.createElement('canvas');c.width=gw;c.height=gh;const cc=c.getContext('2d'),cd=cc.createImageData(gw,gh),o=cd.data;
  for(let yy=0;yy<gh;yy++)for(let xx=0;xx<gw;xx++){const i=yy*gw+xx,inside=pr.mcells[i],edge=pr.ecells[i];
    if(!inside&&(!edge||SMOOTH)){o[i*4+3]=0;continue;}
    const gx=gx0+xx,gy=gy0+yy,dx=gx-ox,dy=gy-oy,dist=Math.sqrt(dx*dx+dy*dy)/md,cz=chaos?chaos[gy*cw+gx]:0;
    let q=(gt-(dist*SPREAD+cz))/RAMP;q=q<0?0:q>1?1:q;const p=q<.5?2*q*q:1-Math.pow(-2*q+2,2)/2;
    const th=BAYER[gy&3][gx&3],show=dir>0?(p>th):((1-p)>th);
    if(!show){o[i*4+3]=0;continue;}
    if(edge&&!SMOOTH){o[i*4]=RUST[0];o[i*4+1]=RUST[1];o[i*4+2]=RUST[2];o[i*4+3]=255;}
    else{o[i*4]=src[i*4];o[i*4+1]=src[i*4+1];o[i*4+2]=src[i*4+2];o[i*4+3]=255;}}
  cc.putImageData(cd,0,0);const pe=ctx.imageSmoothingEnabled;ctx.imageSmoothingEnabled=false;
  ctx.drawImage(c,0,0,gw,gh,gx0*g,gy0*g,gw*g,gh*g);ctx.imageSmoothingEnabled=pe;
  if(SMOOTH&&pr.path){const dx=gx0+gw/2-ox,dy=gy0+gh/2-oy;let q=(gt-Math.sqrt(dx*dx+dy*dy)/md*SPREAD)/RAMP;q=q<0?0:q>1?1:q;
    const p=q<.5?2*q*q:1-Math.pow(-2*q+2,2)/2,a=dir>0?p:1-p;if(a<=0.01)return;
    ctx.save();ctx.globalAlpha=a;ctx.beginPath();pr.path.forEach(([X,Y],i)=>i?ctx.lineTo(X,Y):ctx.moveTo(X,Y));ctx.closePath();
    ctx.strokeStyle='rgb('+RUST+')';ctx.lineWidth=Math.max(1.4,g*0.62);ctx.lineJoin='round';ctx.stroke();ctx.restore();}}
function scrambleText(state,nt,ox,oy){const c=document.createElement('canvas');c.width=Math.round(W*dpr);c.height=Math.round(H*dpr);
  const x=c.getContext('2d');x.scale(dpr,dpr);x.textBaseline="top";x.fillStyle="rgb("+RUST+")";
  const GL="ABCDEFGHKMNPRSTXZ0123456789#%&*/<>+=-";const diag=Math.hypot(W,H)||1,SPREAD=0.55,RAMP=0.42;
  (state.items||[]).forEach(it=>{if(it.chrome)return;
    if(it.ul){x.fillRect(it.x,it.y,it.w,it.h||2);return;}
    x.font=it.wt+" "+it.px+"px Archivo, sans-serif";const sp=it.track?'\u200a':'';
    const chars=it.t.split('');let cx=it.x;
    for(let k=0;k<chars.length;k++){const ch0=chars[k],aw=x.measureText(ch0+sp).width,cx0=cx;cx+=aw;
      if(ch0===' ')continue;
      const d=Math.hypot(cx0-ox,it.y-oy)/diag,jit=(Math.sin(it.x*13.1+it.y*7.7+k*29.3)*0.5+0.5);
      const local=(nt-(SPREAD*d+0.10*jit))/RAMP;
      if(local<=0.02)continue;
      const rTh=0.6+0.35*jit,g=local>=rTh?ch0:GL[(Math.random()*GL.length)|0];
      x.fillText(g,cx0,it.y);}});
  return c;}
function loop(now){curR+=(tgtR-curR)*0.16;if(WAVE&&WAVE.t0)dirty=true;
  if(trans){ctx.imageSmoothingEnabled=false;
    if(trans.textonly){const t=Math.min(1,(now-trans.s)/trans.d);
      drawBase(trans.n.base);
      if(trans.n.photoRect&&trans.n.photoRect.crisp){ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';drawCrisp(trans.n.photoRect);ctx.imageSmoothingEnabled=false;}
      drawContent(scrambleText(trans.n,t,trans.pox,trans.poy),scrollY);
      ctx.drawImage(trans.n.chromeCanvas,0,0,W,H);
      if(t>=1){cur=trans.n;bindHot(cur.boxes);trans=null;placeDom();dirty=true;}}
    else if(trans.band!=null){const t=Math.min(1,(now-trans.s)/trans.d),e=t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
      drawBase(trans.n.base);
      // lines morph in the band below the row; the photo and the text stay on top of it
      ctx.save();ctx.beginPath();ctx.rect(trans.bandX,trans.band,trans.bandW,H-trans.band);ctx.clip();drawBase(mframe(e));ctx.restore();
      if(trans.n.photoRect&&trans.n.photoRect.crisp){ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';drawCrisp(trans.n.photoRect);ctx.imageSmoothingEnabled=false;}
      drawContent(scrambleText(trans.n,t,trans.pox,trans.poy),scrollY);
      ctx.drawImage(trans.n.chromeCanvas,0,0,W,H);
      if(t>=1){cur=trans.n;bindHot(cur.boxes);trans=null;morphing=false;placeDom();dirty=true;}}
    else{const nt=(now-trans.s)/trans.d;drawBase(mframe(nt));
      drawBlobMorph(trans.o&&trans.o.photoRect,nt,trans,-1);drawBlobMorph(trans.n&&trans.n.photoRect,nt,trans,1);
      const oa=Math.max(0,1-nt*2.4);if(oa>0)drawContent(trans.o.contentCanvas,scrollY,oa);
      drawContent(scrambleText(trans.n,nt,trans.pox,trans.poy),scrollY);
      ctx.drawImage(trans.n.chromeCanvas,0,0,W,H);
      if(nt>=1.05){settle=SMOOTH?null:{n:trans.n,s:now,d:300};cur=trans.n;bindHot(cur.boxes);trans=null;morphing=false;placeDom();dirty=true;}}}
  else if(settle){const t=Math.min(1,(now-settle.s)/settle.d);if(ready){drawIdle();ctx.globalAlpha=1-t;drawBlobMorph(settle.n.photoRect,3,{ox:0,oy:0,maxD:1,chaos:null},1);ctx.globalAlpha=1;}if(t>=1){settle=null;dirty=true;}requestAnimationFrame(loop);return;}
  else if(dirty||Math.abs(tgtR-curR)>0.4){if(ready)drawIdle();dirty=false;}requestAnimationFrame(loop);}
function bindHot(boxes){hot.innerHTML="";_hotBoxes=boxes;const[ct,cb]=_win();boxes.forEach(b=>{
  const chrome=(b.act==='go'||b.act==='lang'||b.act==='theme'),off=chrome?0:scrollY;if(!chrome&&(b.y-off+b.h<ct||b.y-off>cb))return;
  const el=document.createElement('button');el.className='b';el.style.left=b.x+'px';el.style.top=(b.y-off)+'px';el.style.width=b.w+'px';el.style.height=b.h+'px';
  el.onclick=ev=>{ev.preventDefault();doAct(b,ev);};hot.appendChild(el);});}
function rebindHot(){if(_hotBoxes)bindHot(_hotBoxes);}
function doAct(b,ev){if(b.act==='go')goto(b.arg,ev?ev.clientX:null,ev?ev.clientY:null);
  else if(b.act==='lang'){if(lang!==b.arg){lang=b.arg;document.documentElement.lang=lang;cur=stateFor(page);bindHot(cur.boxes);buildForm();buildMusic();renderPlayer();placeDom();dirty=true;}}
  else if(b.act==='theme'){if(!trans)toggleTheme(ev?ev.clientX:W-M,ev?ev.clientY:30);}
  else if(b.act==='url')window.open(b.arg,'_blank','noopener');
  else if(b.act==='bio'){const np=Math.max(0,Math.min(STR[lang].bio.length-1,b.arg));if(np!==bioPage&&!trans){bioPage=np;const nx=stateFor('about'),pox=ev?ev.clientX:W/2,poy=ev?ev.clientY:H/2;trans={o:cur,n:nx,s:performance.now(),d:600,textonly:true,pox,poy};tgtR=0;curR=0;}}
  else if(b.act==='media'){openGig=(openGig===b.arg?null:b.arg);const nx=stateFor('live');document.getElementById('media').classList.remove('on');const mr=(nx.mediaRect||cur.mediaRect);const band=mr?Math.max(0,mr.y-8):0;const bandX=mr?Math.max(0,mr.x-12):0;const bandW=mr?mr.w+24:W;const pox=ev?ev.clientX:W/2,poy=ev?ev.clientY:H/2;trans={o:cur,n:nx,s:performance.now(),d:520,band,bandX,bandW,pox,poy};tgtR=0;curR=0;}}

/* booking form (transparent, in cleared zone) */
function buildForm(){const S=STR[lang],f=document.getElementById('bform');
  f.innerHTML='<div class="fld"><label>'+S.f_name+'</label><input name="name" autocomplete="name" required></div>'
   +'<div class="fld"><label>'+S.f_email+'</label><input name="email" type="email" autocomplete="email" required></div>'
   +'<div class="fld"><label>'+S.f_when+'</label><input name="when"></div>'
   +'<div class="fld big"><label>'+S.f_msg+'</label><textarea name="msg" required></textarea></div>'
   +'<div class="row"><button class="send" type="submit" data-seed="send"><span>'+(lang==='de'?'senden':'send')+' \u2192</span></button></div>';
  f.dataset.seed='bookingform';f._w=null;const b=f.querySelector('.send');
  b.addEventListener('pointerenter',()=>drawPixFrame(b,true,null));b.addEventListener('pointerleave',()=>drawPixFrame(b,false,null,0));
  b.addEventListener('focus',()=>drawPixFrame(b,true,null));b.addEventListener('blur',()=>drawPixFrame(b,false,null,0));}
function renderFormFrame(){const f=document.getElementById('bform');if(!f.classList.contains('on'))return;
  drawPixFrame(f,false,null,226);drawPixFrame(f.querySelector('.send'),false,null,0);}
document.getElementById('bform').addEventListener('submit',e=>{e.preventDefault();const f=e.target,d=new FormData(f);
  const name=d.get('name')||'',email=d.get('email')||'',when=d.get('when')||'',msg=d.get('msg')||'';
  if(CFG.form_endpoint){fetch(CFG.form_endpoint,{method:'POST',headers:{Accept:'application/json'},body:d})
    .then(()=>{f.reset();alert(lang==='de'?'Gesendet — danke!':'Sent — thanks!');}).catch(mailto);return;}mailto();
  function mailto(){const sub=encodeURIComponent('Booking – '+name);
    const body=encodeURIComponent(name+' <'+email+'>\n'+(when?('Date/Venue: '+when+'\n'):'')+'\n'+msg+'\n\n— soeren.live');
    location.href='mailto:'+CFG.booking_email+'?subject='+sub+'&body='+body;}});
function placeForm(){const f=document.getElementById('bform');
  if(page==='booking'&&cur&&cur.formRect){const r=cur.formRect;f.style.left=r.x+'px';f.style.top=(r.y-scrollY)+'px';f.style.width=r.w+'px';f.classList.add('on');}
  else f.classList.remove('on');}

/* inline media + gallery (no modals) */
const mediaEl=document.getElementById('media'),galEl=document.getElementById('gallery');
function fmt(t){t=Math.max(0,t|0);return (t/60|0)+':'+String(t%60).padStart(2,'0');}
function audioPlayer(host,src){host.innerHTML='<div class="aud"><button class="pp" aria-label="play">\u25B6</button><div class="bar"><div class="fill"></div></div><span class="tm">0:00 / 0:00</span></div>';
  const a=new Audio();a.preload='metadata';a.src=src;const pp=host.querySelector('.pp'),bar=host.querySelector('.bar'),fill=host.querySelector('.fill'),tm=host.querySelector('.tm');
  pp.onclick=()=>{if(a.paused){a.play();pp.textContent='\u275A\u275A';}else{a.pause();pp.textContent='\u25B6';}};
  a.ontimeupdate=()=>{const d=a.duration||0;fill.style.width=(d?a.currentTime/d*100:0)+'%';tm.textContent=fmt(a.currentTime)+' / '+fmt(d);};
  a.onended=()=>{pp.textContent='\u25B6';};
  bar.onclick=e=>{const r=bar.getBoundingClientRect();if(a.duration)a.currentTime=(e.clientX-r.left)/r.width*a.duration;};
  host._audio=a;}
function stopAudio(){if(mediaEl._audio){mediaEl._audio.pause();mediaEl._audio=null;}}
function thumbs(){return '<div class="strip">'+PLIST.map(k=>'<img src="'+IMG[k]+'" alt="" data-full="'+IMG[k]+'">').join('')+'</div>';}
function wireThumbs(host){host.querySelectorAll('.strip img').forEach(im=>im.onclick=()=>window.open(im.dataset.full,'_blank','noopener'));}
function buildMediaContent(i){const g=GIGS[i],S=STR[lang];stopAudio();if(mediaEl._io){mediaEl._io.disconnect();mediaEl._io=null;}
  if(g.type==='video'){const url=CFG.hoer_url;if(url){const m=url.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{6,})/);const id=g.id||(m?m[1]:url);
      mediaEl.innerHTML='<div class="vid"><iframe src="https://www.youtube.com/embed/'+id+'" allowfullscreen></iframe></div>';}
    else mediaEl.innerHTML='<div class="msg">'+S.vid_missing+'</div>';}
  else if(g.type==='audio'){if(g.src)audioPlayer(mediaEl,g.src);else mediaEl.innerHTML='<div class="msg">'+S.aud_missing+'</div>';}
  else if(g.type==='soundcloud'){if(g.url){const u=encodeURIComponent(g.url);mediaEl.innerHTML='<iframe width="100%" height="120" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url='+u+'&color=%23161616&inverse=false&auto_play=false&show_user=true&hide_related=true&show_comments=false&show_reposts=false&show_teaser=false"></iframe>';}else mediaEl.innerHTML='<div class="msg">'+S.aud_missing+'</div>';}
  else if(g.type==='gallery'){mediaEl.innerHTML=thumbs();wireThumbs(mediaEl);}
  else if(g.type==='carousel'){const slides=g.videos.map(v=>'<div class="cslide"><video src="'+(VIDS[v]||VID+v)+'" '+(VIDS[v]?'':'preload="metadata" ')+'muted loop playsinline></video></div>').join('');
    const carH=(g.url&&cur.mediaRect)?(cur.mediaRect.h-132):0,cs=carH?' style="height:'+carH+'px"':'';
    let html='<div class="car"'+cs+'><div class="cscroll">'+slides+'</div><button class="cnav prev" aria-label="prev">\u2039</button><button class="cnav next" aria-label="next">\u203A</button><button class="csnd" id="csnd">'+(lang==='de'?'ton':'sound')+'</button><div class="cidx" id="cidx">01 / '+String(g.videos.length).padStart(2,'0')+'</div></div>';
    if(g.url){const u=encodeURIComponent(g.url);html+='<iframe class="scw" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url='+u+'&color=%23161616&inverse=false&auto_play=false&show_user=true&hide_related=true&show_comments=false&show_teaser=false"></iframe>';}
    mediaEl.innerHTML=html;wireCarousel(g.videos.length);}}
function wireCarousel(n){const sc=mediaEl.querySelector('.cscroll');if(!sc)return;const vids=[...mediaEl.querySelectorAll('video')];
  const idx=mediaEl.querySelector('#cidx');let muted=true;
  vids.forEach(v=>{v.muted=true;v.addEventListener('click',()=>{v.paused?v.play():v.pause();});});
  const snd=mediaEl.querySelector('#csnd');if(snd)snd.onclick=()=>{muted=!muted;vids.forEach(v=>v.muted=muted);snd.classList.toggle('on',!muted);snd.textContent=lang==='de'?(muted?'ton':'ton aus'):(muted?'sound':'sound off');};
  const io=new IntersectionObserver(es=>{es.forEach(en=>{const v=en.target;
    if(en.isIntersecting&&en.intersectionRatio>0.6){v.play().catch(()=>{});const i=vids.indexOf(v);if(idx)idx.textContent=String(i+1).padStart(2,'0')+' / '+String(n).padStart(2,'0');}else v.pause();});},{root:sc,threshold:[0,0.6,1]});
  vids.forEach(v=>io.observe(v));mediaEl._io=io;
  const prev=mediaEl.querySelector('.prev'),next=mediaEl.querySelector('.next');
  if(prev)prev.onclick=()=>sc.scrollBy({left:-sc.clientWidth,behavior:'smooth'});
  if(next)next.onclick=()=>sc.scrollBy({left:sc.clientWidth,behavior:'smooth'});}
function _win(){const ct=(cur&&cur.topY?cur.topY-6:Math.round(H*0.11)),cb=(cur&&cur.cb)||(H-Math.round(Math.max(22,H*0.045))-4);return[ct,cb];}
function _clipDom(el){const[ct,cb]=_win(),t=parseFloat(el.style.top)||0,h=el.offsetHeight;
  el.style.clipPath='inset('+Math.max(0,ct-t)+'px -40px '+Math.max(0,t+h-cb)+'px -40px)';}
function placeDom(){const f=document.getElementById('bform');updateScroll();
  // form
  if(page==='booking'&&cur&&cur.formRect){const r=cur.formRect;f.style.left=r.x+'px';f.style.top=(r.y-scrollY)+'px';f.style.width=r.w+'px';f.classList.add('on');_clipDom(f);if(f._w!==r.w){f._w=r.w;requestAnimationFrame(renderFormFrame);}}else f.classList.remove('on');
  // media
  if(page==='live'&&openGig!=null&&cur&&cur.mediaRect){const r=cur.mediaRect,key=openGig+'|'+lang+'|'+r.h;if(mediaEl._key!==key){buildMediaContent(openGig);mediaEl._key=key;}
    mediaEl.style.left=r.x+'px';mediaEl.style.top=(r.y-scrollY)+'px';mediaEl.style.width=r.w+'px';mediaEl.style.height=(GIGS[openGig].type==='carousel'?r.h+'px':'auto');mediaEl.classList.add('on');_clipDom(mediaEl);}
  else{stopAudio();if(mediaEl._io){mediaEl._io.disconnect();mediaEl._io=null;}mediaEl.classList.remove('on');mediaEl.innerHTML='';mediaEl._key=null;}
  // gallery
  if(page==='press'&&cur&&cur.galRect){const r=cur.galRect;galEl.innerHTML=thumbs();wireThumbs(galEl);
    galEl.style.left=r.x+'px';galEl.style.top=r.y+'px';galEl.style.width=r.w+'px';galEl.classList.add('on');}
  else{galEl.classList.remove('on');galEl.innerHTML='';}
  if(page==='music'&&cur&&cur.musicRect){const r=cur.musicRect,mm=document.getElementById('music');if(mm){mm.style.left=r.x+'px';mm.style.top=(r.y-scrollY)+'px';mm.style.width=r.w+'px';mm.style.height=r.h+'px';mm.classList.add('on');_clipDom(mm);const k=r.w+'x'+r.h;if(mm._k!==k){mm._k=k;requestAnimationFrame(renderMusicFrames);}mfToURL();const lh=loadHls();if(lh)lh.catch(()=>{});}}
  else{const mm=document.getElementById('music');if(mm)mm.classList.remove('on');}
  positionPlayer();
}
const VID=U("/media/");const VIDS={};
function goto(id,px,py,_np){if(id===page||trans)return;openGig=null;settle=null;scrollY=0;if(id==='about')bioPage=0;page=id;if(!_np){try{history.pushState(null,'',_slug(id));}catch(e){}}
  if(!ready){build(id);return;}morphing=true;placeDom();const n=stateFor(id);
  const pox=(px==null?W/2:px),poy=(py==null?H/2:py),gx=pox*cw/W,gy=poy*ch/H;
  const cz=new Float32Array(cw*ch);for(let i=0;i<cz.length;i++)cz[i]=Math.random()*0.12;
  const md=Math.max(1,Math.max(Math.hypot(gx,gy),Math.hypot(cw-gx,gy),Math.hypot(gx,ch-gy),Math.hypot(cw-gx,ch-gy)));
  trans={o:cur,n,s:performance.now(),d:1000,radial:true,ox:gx,oy:gy,pox,poy,chaos:cz,maxD:md};tgtR=0;curR=0;}

function lens(x,y){mx=x;my=y;}
addEventListener('pointermove',e=>lens(e.clientX,e.clientY));
addEventListener('pointerdown',e=>lens(e.clientX,e.clientY));
['pointerup','pointercancel','pointerleave'].forEach(ev=>addEventListener(ev,()=>{tgtR=0;dirty=true;}));
let rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(()=>build(page),200);});

need=PLIST.length*2;function done(){loaded++;if(loaded===need){const start=()=>{if(start._d)return;start._d=1;buildForm();page=_idFromPath();build(page);};
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(start);
  setTimeout(start,1200);}}
PLIST.forEach(k=>{const im=new Image();im.onload=()=>{images[k]=im;done();};im.onerror=done;im.src=IMG[k];
  const mk=new Image();mk.onload=()=>{masks[k]=mk;done();};mk.onerror=done;mk.src=MSK[k];});
/* ---- site-wide player: HLS audio, a queue, remembered between visits ---- */
const MT={en:{search:'search title, venue, city',n:k=>k===1?'1 recording':k+' recordings',none:'nothing matches.',reset:'clear filters',queue:'queue',upnext:'up next',clear:'clear',link:'copy link',copied:'link copied',add:'add to queue',queued:'in queue — tap to remove',err:'could not load this recording'},
  de:{search:'titel, venue, stadt suchen',n:k=>k===1?'1 aufnahme':k+' aufnahmen',none:'keine treffer.',reset:'filter zurücksetzen',queue:'liste',upnext:'als nächstes',clear:'leeren',link:'link kopieren',copied:'link kopiert',add:'zur liste',queued:'in der liste — tippen zum entfernen',err:'aufnahme konnte nicht geladen werden'}};
const _A=new Audio();_A.preload='none';
const PL={queue:[],idx:-1,loaded:null,pending:0,qopen:false};let _hls=null,_Hls=null,_tok=0,_lastSave=0;
const PKEY='soeren.player.v1';
function _q(id){return document.getElementById(id);}
function T(){return MT[lang]||MT.en;}
function esc(s){return String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
function fold(s){return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/ø/g,'o').replace(/æ/g,'ae').replace(/ß/g,'ss');}
function curTrack(){return TBYID[PL.queue[PL.idx]]||null;}
function curTime(){const t=curTrack();return t&&PL.loaded===t.id?_A.currentTime:PL.pending;}
function isPlaying(){const t=curTrack();return !!t&&PL.loaded===t.id&&!_A.paused;}
function savePL(){try{localStorage.setItem(PKEY,JSON.stringify({queue:PL.queue,id:PL.queue[PL.idx]||null,t:Math.floor(curTime())}));}catch(e){}}
function restorePL(){let s=null;try{s=JSON.parse(localStorage.getItem(PKEY)||'null');}catch(e){}
  if(s&&Array.isArray(s.queue)){PL.queue=s.queue.filter(id=>TBYID[id]);PL.idx=PL.queue.indexOf(s.id);if(PL.idx<0&&PL.queue.length)PL.idx=0;PL.pending=PL.queue[PL.idx]===s.id?(+s.t||0):0;}
  // /music/<id>?t=41:20 — that recording becomes the current one, paused at t
  const m=_path().match(/^\/music\/([^/]+)/);
  if(m&&TBYID[m[1]]){let i=PL.queue.indexOf(m[1]);if(i<0){i=PL.idx+1;PL.queue.splice(i,0,m[1]);}PL.idx=i;PL.pending=parseTime(new URLSearchParams(location.search).get('t'));}
  playerActive=PL.idx>=0;}
// Safari plays HLS natively; everywhere else hls.js, loaded only when music is about to play
function loadHls(){if(!_Hls&&!_A.canPlayType('application/vnd.apple.mpegurl'))_Hls=import('hls.js').then(m=>m.default,e=>{_Hls=null;throw e;});return _Hls;}
async function attach(t){const tok=++_tok;if(_hls){_hls.destroy();_hls=null;}PL.loaded=t.id;const url=U('/audio/'+t.id+'/index.m3u8');
  if(_A.canPlayType('application/vnd.apple.mpegurl')){_A.src=url;return tok;}
  let Hls=null;try{Hls=await loadHls();}catch(e){}if(tok!==_tok)return tok;
  if(Hls&&Hls.isSupported()){_hls=new Hls({maxBufferLength:30});_hls.on(Hls.Events.ERROR,(e,d)=>{if(d.fatal)playerError();});_hls.loadSource(url);_hls.attachMedia(_A);}
  else playerError();
  return tok;}
async function startAt(t,sec,play){const tok=await attach(t);if(tok!==_tok)return;
  // play() first: with preload=none nothing loads (and no metadata arrives) until playback is asked for
  if(sec){const go=()=>{if(tok===_tok)try{_A.currentTime=sec;}catch(e){}};if(_A.readyState>=1)go();else _A.addEventListener('loadedmetadata',go,{once:true});}
  if(play)_A.play().catch(()=>{});}
function playerError(){_q('pArtist').textContent=T().err;}
function unload(){_tok++;if(_hls){_hls.destroy();_hls=null;}_A.pause();_A.removeAttribute('src');_A.load();PL.loaded=null;}

function playAt(i,sec){if(i<0||i>=PL.queue.length)return;PL.idx=i;PL.pending=0;showPlayer();startAt(curTrack(),sec||0,true);renderPlayer();savePL();}
function playNow(id){const t=curTrack();if(t&&t.id===id){toggle();return;}let i=PL.queue.indexOf(id);if(i<0){i=PL.idx+1;PL.queue.splice(i,0,id);}playAt(i);}
function toggleQueued(id){const i=PL.queue.indexOf(id);if(i>=0){removeAt(i);return;}PL.queue.push(id);if(PL.idx<0){PL.idx=0;PL.pending=0;showPlayer();}renderPlayer();savePL();}
function removeAt(i){if(i<0||i>=PL.queue.length)return;const wasCur=i===PL.idx,was=isPlaying();PL.queue.splice(i,1);
  if(!PL.queue.length){closePlayer();return;}
  if(i<PL.idx)PL.idx--;else if(wasCur){PL.idx=Math.min(PL.idx,PL.queue.length-1);unload();PL.pending=0;if(was){playAt(PL.idx);return;}}
  renderPlayer();savePL();}
function moveAt(i,d){const j=i+d,q=PL.queue;if(j<0||j>=q.length)return;[q[i],q[j]]=[q[j],q[i]];if(PL.idx===i)PL.idx=j;else if(PL.idx===j)PL.idx=i;renderPlayer();savePL();}
function nextTrack(auto){if(PL.idx<PL.queue.length-1)playAt(PL.idx+1);else if(auto)seek(0);}
function prevTrack(){if(curTime()>3||PL.idx<=0)seek(0);else playAt(PL.idx-1);}
function toggle(){const t=curTrack();if(!t)return;if(PL.loaded!==t.id){startAt(t,PL.pending,true);return;}if(_A.paused)_A.play().catch(()=>{});else _A.pause();}
function seek(sec){const t=curTrack();if(!t)return;sec=Math.max(0,Math.min(t.duration-0.5,sec));if(PL.loaded===t.id){try{_A.currentTime=sec;}catch(e){}}else PL.pending=sec;drawWave();updTime();msPos();savePL();}
function closePlayer(){unload();PL.queue=[];PL.idx=-1;PL.pending=0;PL.qopen=false;savePL();hidePlayer();renderPlayer();}
function refreshPage(){if(trans)return;cur=stateFor(page);bindHot(cur.boxes);placeDom();dirty=true;}
function showPlayer(){const el=_q('player');el.classList.add('on');if(!playerActive){playerActive=true;if(ready)refreshPage();}positionPlayer();}
function hidePlayer(){_q('player').classList.remove('on');if(playerActive){playerActive=false;if(ready)refreshPage();}}
function positionPlayer(){const el=_q('player');if(!el||!cur||!cur.playerRect)return;const r=cur.playerRect;
  el.style.left=r.x+'px';el.style.width=r.w+'px';el.style.bottom=(H-r.bottom)+'px';
  if(el.classList.contains('on'))requestAnimationFrame(renderPlayerFrame);}
function renderPlayerFrame(){const el=_q('player');if(!el.classList.contains('on'))return;const k=el.offsetWidth+'x'+el.offsetHeight;
  if(el._k!==k){el._k=k;drawPixFrame(el,false,null,250);}
  drawBtn(_q('pPrev'),false,'prev');drawBtn(_q('pNext'),false,'next');drawBtn(_q('pPlay'),false,isPlaying()?'pause':'play');drawWave();}
function renderPlayer(){const t=curTrack(),L=T(),el=_q('player');
  _q('pTitle').textContent=t?t.title:'';_q('pArtist').textContent=t?t.artist+(place(t)?' · '+place(t):''):'';
  const qb=_q('pQBtn');qb.textContent=L.queue+' '+PL.queue.length;qb.setAttribute('aria-expanded',String(PL.qopen));
  el.classList.toggle('qopen',PL.qopen);_q('pNext').disabled=PL.idx>=PL.queue.length-1;
  renderQueue();updTime();syncMusic();msMeta();
  if(el.classList.contains('on'))requestAnimationFrame(renderPlayerFrame);}
function renderQueue(){const q=_q('pQ'),L=T();if(!PL.qopen){q.innerHTML='';return;}
  q.innerHTML='<div class="pqh"><span>'+L.upnext+'</span><span><button class="pql" data-a="link">'+L.link+'</button><button class="pql" data-a="clear">'+L.clear+'</button></span></div><ol>'+
    PL.queue.map((id,i)=>{const t=TBYID[id];return '<li class="pqi'+(i===PL.idx?' cur':'')+'" data-i="'+i+'"><span class="pqt">'+esc(t.title)+'</span><span class="pqa">'+esc(t.artist)+' · '+fmtTime(t.duration)+'</span>'
      +'<span class="pqx"><button data-a="up" aria-label="move up"'+(i?'':' disabled')+'>↑</button><button data-a="down" aria-label="move down"'+(i<PL.queue.length-1?'':' disabled')+'>↓</button><button data-a="rm" aria-label="remove">×</button></span></li>';}).join('')+'</ol>';}
function updTime(){const t=curTrack();_q('pEl').textContent=fmtTime(curTime());_q('pDur').textContent=t?fmtTime(t.duration):'';}
// waveform from the precomputed loudness: played part solid, rest faint; pixel mode snaps to the art's grid
function drawWave(){const cv=_q('pWave'),t=curTrack();if(!t||!_q('player').classList.contains('on'))return;const Wc=cv.clientWidth,Hc=cv.clientHeight;if(!Wc||!Hc)return;
  const pw=Math.round(Wc*dpr),ph=Math.round(Hc*dpr);if(cv.width!==pw||cv.height!==ph){cv.width=pw;cv.height=ph;}
  const c=cv.getContext('2d');c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,Wc,Hc);
  const step=SMOOTH?3:g,bw=SMOOTH?2:g-1,n=Math.floor(Wc/step),P=t.peaks,frac=t.duration?curTime()/t.duration:0;
  for(let i=0;i<n;i++){const a=Math.floor(i/n*P.length),b=Math.max(a+1,Math.floor((i+1)/n*P.length));let v=0;for(let k=a;k<b;k++)v=Math.max(v,P[k]);
    let h=Math.max(2,v/100*Hc);if(!SMOOTH)h=Math.max(g,Math.round(h/g)*g);
    c.fillStyle=(i+0.5)/n<=frac?'rgb('+RUST+')':'rgba('+RUST+',.26)';c.fillRect(i*step,Math.round((Hc-h)/2),bw,h);}}
function msMeta(){if(!('mediaSession' in navigator))return;const t=curTrack();
  try{navigator.mediaSession.metadata=t?new MediaMetadata({title:t.title,artist:t.artist,album:'søren *live',artwork:[{src:new URL(t.cover?U('/'+t.cover):IMG.hero,location.href).href}]}):null;}catch(e){}}
function msPos(){const t=curTrack();if(!t||!('mediaSession' in navigator)||!navigator.mediaSession.setPositionState)return;
  try{navigator.mediaSession.setPositionState({duration:t.duration,playbackRate:1,position:Math.min(t.duration,curTime())});}catch(e){}}
function renderPlayState(){if(_q('player').classList.contains('on'))drawBtn(_q('pPlay'),false,isPlaying()?'pause':'play');syncMusic();
  if('mediaSession' in navigator)navigator.mediaSession.playbackState=isPlaying()?'playing':'paused';}

_A.addEventListener('play',renderPlayState);_A.addEventListener('pause',renderPlayState);
_A.addEventListener('timeupdate',()=>{updTime();drawWave();const now=Date.now();if(now-_lastSave>5000){_lastSave=now;savePL();msPos();}});
_A.addEventListener('ended',()=>nextTrack(true));
addEventListener('pagehide',savePL);
_q('pPlay').addEventListener('click',toggle);_q('pPrev').addEventListener('click',prevTrack);_q('pNext').addEventListener('click',()=>nextTrack(false));
_q('pClose').addEventListener('click',closePlayer);
_q('pQBtn').addEventListener('click',()=>{PL.qopen=!PL.qopen;renderPlayer();});
_q('pQ').addEventListener('click',e=>{const b=e.target.closest('button'),li=e.target.closest('.pqi'),L=T();
  if(b&&b.dataset.a==='clear'){const id=PL.queue[PL.idx];PL.queue=id?[id]:[];PL.idx=id?0:-1;renderPlayer();savePL();return;}
  if(b&&b.dataset.a==='link'){const t=curTrack();if(!t)return;const s=Math.floor(curTime()),url=location.origin+U('/music/'+t.id)+(s?'?t='+fmtTime(s):'');
    (navigator.clipboard?navigator.clipboard.writeText(url):Promise.reject()).then(()=>{b.textContent=L.copied;setTimeout(()=>{b.textContent=L.link;},1600);}).catch(()=>{prompt('',url);});return;}
  if(!li)return;const i=+li.dataset.i;
  if(b){if(b.dataset.a==='up')moveAt(i,-1);else if(b.dataset.a==='down')moveAt(i,1);else if(b.dataset.a==='rm')removeAt(i);return;}
  if(i===PL.idx)toggle();else playAt(i);});
{const wv=_q('pWave');let down=false;const at=e=>{const t=curTrack();if(!t)return;const r=wv.getBoundingClientRect();seek((e.clientX-r.left)/r.width*t.duration);};
  wv.addEventListener('pointerdown',e=>{down=true;try{wv.setPointerCapture(e.pointerId);}catch(_){}at(e);});
  wv.addEventListener('pointermove',e=>{if(down)at(e);});['pointerup','pointercancel'].forEach(k=>wv.addEventListener(k,()=>{down=false;}));}
if('mediaSession' in navigator){const on=(a,f)=>{try{navigator.mediaSession.setActionHandler(a,f);}catch(e){}};
  on('play',()=>{if(!isPlaying())toggle();});on('pause',()=>{if(isPlaying())_A.pause();});
  on('previoustrack',prevTrack);on('nexttrack',()=>nextTrack(false));
  on('seekto',d=>seek(d.seekTime));on('seekbackward',d=>seek(curTime()-(d.seekOffset||10)));on('seekforward',d=>seek(curTime()+(d.seekOffset||10)));}
// keyboard: space play/pause, ←/→ 10 s, with shift 60 s (not while typing or on a focused control)
addEventListener('keydown',e=>{if(!curTrack()||e.metaKey||e.ctrlKey||e.altKey)return;if(e.target.closest&&e.target.closest('input,textarea,select,button,[contenteditable],.tcard'))return;
  if(e.code==='Space'){e.preventDefault();toggle();}else if(e.key==='ArrowRight')seek(curTime()+(e.shiftKey?60:10));else if(e.key==='ArrowLeft')seek(curTime()-(e.shiftKey?60:10));});
function _rng(seed){let a=0;for(let i=0;i<seed.length;i++)a=(a*31+seed.charCodeAt(i))>>>0;return function(){a=(a+0x6D2B79F5)|0;let t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;return ((t^(t>>>14))>>>0)/4294967296;};}
function _medge2(M,cols,rows){const e=new Uint8Array(cols*rows);for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){const i=y*cols+x;if(!M[i])continue;if(x===0||x===cols-1||y===0||y===rows-1||!M[i-1]||!M[i+1]||!M[i-cols]||!M[i+cols])e[i]=1;}return e;}
function _cardPoly(seed,cols,rows,A,I){A=A||1.35;I=I||1.6;const r=_rng(seed),ph=[r()*6.28,r()*6.28,r()*6.28,r()*6.28],n=Math.max(8,Math.round(cols/6)),p=[];
  const w=(t,a,b)=>(Math.sin(t*6.28*1.3+ph[a])+Math.sin(t*6.28*2.7+ph[b]))*A*0.5;
  for(let k=0;k<=n;k++){const t=k/n;p.push([I+(cols-2*I)*t, I+w(t,0,1)]);}
  for(let k=1;k<=n;k++){const t=k/n;p.push([cols-I+w(t,1,2), I+(rows-2*I)*t]);}
  for(let k=1;k<=n;k++){const t=k/n;p.push([cols-I-(cols-2*I)*t, rows-I+w(t,2,3)]);}
  for(let k=1;k<n;k++){const t=k/n;p.push([I+w(t,3,0), rows-I-(rows-2*I)*t]);}
  return p;}
function _vecFrame(cv,Wc,Hc,poly,sx,sy,fill,fa,line,icon){cv.width=Math.max(1,Math.round(Wc*dpr));cv.height=Math.max(1,Math.round(Hc*dpr));
  const c=cv.getContext('2d');c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,Wc,Hc);c.beginPath();
  poly.forEach(([x,y],i)=>i?c.lineTo(x*sx,y*sy):c.moveTo(x*sx,y*sy));c.closePath();
  c.fillStyle='rgba('+fill+','+(fa/255)+')';c.fill();c.strokeStyle='rgb('+line+')';c.lineWidth=Math.max(1.4,g*0.62);c.lineJoin='round';c.stroke();
  if(icon)_vecIcon(c,Wc/2,Hc/2,Math.min(Wc,Hc)*0.44,line,icon);}
function _vecIcon(c,cx,cy,s,line,kind){c.fillStyle='rgb('+line+')';c.beginPath();
  if(kind==='pause'){const bw=s*0.3,gp=s*0.21,bh=s*1.4;c.rect(cx-gp-bw,cy-bh/2,bw,bh);c.rect(cx+gp,cy-bh/2,bw,bh);}
  else if(kind==='next'||kind==='prev'){const d=kind==='next'?1:-1,h=s*0.62,w=s*0.95,bw=s*0.22,x0=cx-d*w*0.6;
    c.moveTo(x0,cy-h);c.lineTo(x0+d*w,cy);c.lineTo(x0,cy+h);c.closePath();c.rect(d>0?x0+w:x0-w-bw,cy-h,bw,2*h);}
  else{const Ht=s*0.72,Wt=s*1.15,x0=cx-s*0.5;c.moveTo(x0,cy-Ht);c.lineTo(x0+Wt,cy);c.lineTo(x0,cy+Ht);c.closePath();}c.fill();}
function _pxIcon(o,cols,rows,line,kind){const cx=cols/2,cy=rows/2,s=Math.min(cols,rows)*0.44;
  const setc=(x,y)=>{const xi=Math.round(x),yi=Math.round(y);if(xi<0||xi>=cols||yi<0||yi>=rows)return;const j=(yi*cols+xi)*4;o[j]=line[0];o[j+1]=line[1];o[j+2]=line[2];o[j+3]=255;};
  if(kind==='play'){const Ht=s*0.72,Wt=s*1.15,x0=cx-s*0.5;for(let yy=-Ht;yy<=Ht;yy+=0.5){const wl=(1-Math.abs(yy)/Ht)*Wt;for(let xx=0;xx<=wl;xx+=0.5)setc(x0+xx,cy+yy);}}
  else if(kind==='pause'){const bw=Math.max(1,s*0.3),gap=s*0.42,bh=s*1.4;[-1,1].forEach(sd=>{const bx=cx+sd*gap*0.5-(sd<0?bw:0);for(let xx=0;xx<=bw;xx+=0.5)for(let yy=-bh/2;yy<=bh/2;yy+=0.5)setc(bx+xx,cy+yy);});}}
function drawPixFrame(el,playing,icon,fillA){const rc=el.getBoundingClientRect(),Wc=Math.round(rc.width),Hc=Math.round(rc.height);if(Wc<12||Hc<12)return;
  const cell=g,cols=Math.max(8,Math.round(Wc/cell)),rows=Math.max(6,Math.round(Hc/cell));
  const gm=document.createElement('canvas');gm.width=cols;gm.height=rows;const gx=gm.getContext('2d');
  const poly=_cardPoly(el.dataset.seed||'x',cols,rows);
  if(SMOOTH){let cv=el.querySelector('canvas.frame');if(!cv){cv=document.createElement('canvas');cv.className='frame';el.insertBefore(cv,el.firstChild);}
    const line=playing?CON:RUST,fill=playing?RUST:CON;_vecFrame(cv,Wc,Hc,poly,Wc/cols,Hc/rows,fill,playing?255:(fillA==null?219:fillA),line,icon);return;}
  gx.fillStyle='#fff';gx.beginPath();gx.moveTo(poly[0][0],poly[0][1]);for(let i=1;i<poly.length;i++)gx.lineTo(poly[i][0],poly[i][1]);gx.closePath();gx.fill();
  const md=gx.getImageData(0,0,cols,rows).data,M=new Uint8Array(cols*rows);for(let i=0;i<cols*rows;i++)M[i]=md[i*4+3]>127?1:0;
  const edge=_medge2(M,cols,rows),line=playing?CON:RUST,fill=playing?RUST:CON,fa=(fillA==null?219:fillA);
  const id=gx.createImageData(cols,rows),o=id.data;
  for(let i=0;i<cols*rows;i++){if(M[i]){o[i*4]=fill[0];o[i*4+1]=fill[1];o[i*4+2]=fill[2];o[i*4+3]=(playing?255:fa);}}
  for(let i=0;i<cols*rows;i++){if(edge[i]){o[i*4]=line[0];o[i*4+1]=line[1];o[i*4+2]=line[2];o[i*4+3]=255;}}
  if(icon)_pxIcon(o,cols,rows,line,icon);
  gx.putImageData(id,0,0);
  let cv=el.querySelector('canvas.frame');if(!cv){cv=document.createElement('canvas');cv.className='frame';el.insertBefore(cv,el.firstChild);}
  cv.width=Math.max(1,Math.round(Wc*dpr));cv.height=Math.max(1,Math.round(Hc*dpr));const oc=cv.getContext('2d');oc.imageSmoothingEnabled=false;oc.clearRect(0,0,cv.width,cv.height);oc.drawImage(gm,0,0,cols,rows,0,0,cv.width,cv.height);}
function drawBtn(el,playing,kind){const rc=el.getBoundingClientRect(),Wc=Math.round(rc.width),Hc=Math.round(rc.height);if(Wc<10||Hc<10)return;
  if(SMOOTH){let cv=el.querySelector('canvas.frame');if(!cv){cv=document.createElement('canvas');cv.className='frame';el.insertBefore(cv,el.firstChild);}
    cv.width=Math.round(Wc*dpr);cv.height=Math.round(Hc*dpr);const c=cv.getContext('2d');c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,Wc,Hc);
    _vecIcon(c,Wc/2+(kind==='play'?Wc*0.04:0),Hc/2,Math.min(Wc,Hc)*0.3,playing?CON:RUST,kind);return;}
  const N=18,gm=document.createElement('canvas');gm.width=N;gm.height=N;const gx=gm.getContext('2d'),id=gx.createImageData(N,N),o=id.data,col=playing?CON:RUST;
  const set=(x,y)=>{if(x<0||x>=N||y<0||y>=N)return;const j=(y*N+x)*4;o[j]=col[0];o[j+1]=col[1];o[j+2]=col[2];o[j+3]=255;};
  const cx=N/2,cy=N/2;
  if(kind==='next'||kind==='prev'){const d=kind==='next'?1:-1,h=9,w=7,y0=Math.round(cy-h/2);
    for(let y=0;y<h;y++){const wl=Math.max(1,Math.round(w*(1-Math.abs(y/(h-1)-0.5)*2)));for(let x=0;x<wl;x++)set(d>0?5+x:12-x,y0+y);}
    for(let y=0;y<h;y++)for(let x=0;x<2;x++)set(d>0?12+x:4+x,y0+y);}
  else if(kind==='pause'){const bw=3,gap=4,bh=12,y0=Math.round(cy-bh/2);[-1,1].forEach(sd=>{const x0=Math.round(cx+sd*(gap/2)-(sd<0?bw:0));for(let x=0;x<bw;x++)for(let y=0;y<bh;y++)set(x0+x,y0+y);});}
  else{const h=13,w=12,x0=Math.round(cx-w/2+1),y0=Math.round(cy-h/2);for(let y=0;y<h;y++){const frac=1-Math.abs((y/(h-1))-0.5)*2;const wl=Math.max(1,Math.round(w*frac));for(let x=0;x<wl;x++)set(x0+x,y0+y);}}
  gx.putImageData(id,0,0);
  let cv=el.querySelector('canvas.frame');if(!cv){cv=document.createElement('canvas');cv.className='frame';el.insertBefore(cv,el.firstChild);}
  cv.width=Math.round(Wc*dpr);cv.height=Math.round(Hc*dpr);const oc=cv.getContext('2d');oc.imageSmoothingEnabled=false;oc.clearRect(0,0,cv.width,cv.height);
  const S=Math.floor(Math.min(Wc,Hc)*0.6)*dpr,ox=(cv.width-S)/2,oy=(cv.height-S)/2;oc.drawImage(gm,0,0,N,N,ox,oy,S,S);}
/* ---- music page: filter chips (artist / type / year), search, rows that play or queue ---- */
const MF={artist:'',type:'',year:'',q:''},MFK=['artist','type','year','q'];
{const u=new URLSearchParams(location.search);MFK.forEach(k=>{MF[k]=u.get(k)||'';});}
TRACKS.forEach(t=>{t._h=fold([t.title,t.artist,t.venue,t.city,t.date,t.type].join(' '));});
// filters live in the address (?artist=rangø&type=live); a /music/<id> link stays as it is until a filter is touched
function mfToURL(){if(page!=='music')return;const u=new URLSearchParams(location.search);MFK.forEach(k=>{if(MF[k])u.set(k,MF[k]);else u.delete(k);});
  if(_path().startsWith('/music/')&&!MFK.some(k=>MF[k]))return;u.delete('t');
  const qs=u.toString(),url=U('/music')+(qs?'?'+qs:'');if(url!==location.pathname+location.search)history.replaceState(null,'',url);}
function buildMusic(){const host=_q('music');if(!host)return;const L=T(),years=[...new Set(TRACKS.map(t=>String(t.year)))].sort().reverse();
  const chip=(k,v)=>'<button class="chip" data-k="'+k+'" data-v="'+esc(v)+'">'+esc(v)+'</button>';
  host.innerHTML='<div class="mchips">'+ARTISTS.map(v=>chip('artist',v)).join('')+'<span class="csep"></span>'+TYPES.map(v=>chip('type',v)).join('')+'<span class="csep"></span>'+years.map(v=>chip('year',v)).join('')+'</div>'
    +'<div class="msearch"><input type="search" enterkeyhint="search" placeholder="'+L.search+'" aria-label="'+L.search+'" value="'+esc(MF.q)+'"><span class="mcount"></span></div>'
    +'<div class="tlist" data-seed="tracklist"><div class="tscroll"></div></div>';
  host.querySelector('.mchips').addEventListener('click',e=>{const b=e.target.closest('.chip');if(!b)return;const k=b.dataset.k;MF[k]=MF[k]===b.dataset.v?'':b.dataset.v;renderRows();mfToURL();});
  const inp=host.querySelector('input');inp.addEventListener('input',()=>{MF.q=inp.value;renderRows();mfToURL();});
  const sc=host.querySelector('.tscroll');
  sc.addEventListener('click',e=>{if(e.target.closest('.treset')){MFK.forEach(k=>{MF[k]='';});buildMusic();mfToURL();return;}
    const row=e.target.closest('.tcard');if(!row)return;if(e.target.closest('.tadd'))toggleQueued(row.dataset.id);else playNow(row.dataset.id);});
  sc.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.classList.contains('tcard')){e.preventDefault();playNow(e.target.dataset.id);}});
  host._k=null;renderRows();}
function renderRows(){const host=_q('music');if(!host)return;const L=T(),words=fold(MF.q).split(/\s+/).filter(Boolean);
  host.querySelectorAll('.chip').forEach(b=>b.classList.toggle('on',MF[b.dataset.k]===b.dataset.v));
  const list=TRACKS.filter(t=>(!MF.artist||t.artist===MF.artist)&&(!MF.type||t.type===MF.type)&&(!MF.year||String(t.year)===MF.year)&&words.every(w=>t._h.includes(w)));
  host.querySelector('.mcount').textContent=L.n(list.length);
  host.querySelector('.tscroll').innerHTML=list.length?list.map(t=>'<div class="tcard" tabindex="0" role="button" data-id="'+t.id+'"><div class="pp"></div><div class="tmain"><div class="tt">'+esc(t.title)+'</div><div class="ts">'+esc(t.artist+(place(t)?' · '+place(t):''))+'</div></div><div class="tm">'+t.year+' · '+fmtTime(t.duration)+'</div><button class="tadd"></button></div>').join('')
    :'<div class="tempty">'+L.none+' <button class="treset">'+L.reset+'</button></div>';
  syncMusic();}
function syncMusic(){const host=_q('music');if(!host)return;const ct=curTrack(),L=T(),pl=isPlaying();
  host.querySelectorAll('.tcard').forEach(c=>{const id=c.dataset.id,q=PL.queue.includes(id),a=c.querySelector('.tadd'),me=!!ct&&ct.id===id;
    c.classList.toggle('current',me);c.classList.toggle('playing',me&&pl);a.textContent=q?'✓':'+';a.setAttribute('aria-label',q?L.queued:L.add);a.title=q?L.queued:L.add;});
  renderMusicFrames();}
function renderMusicFrames(){const host=_q('music');if(!host||!host.classList.contains('on'))return;const list=host.querySelector('.tlist'),k=list.offsetWidth+'x'+list.offsetHeight;
  if(list._k!==k){list._k=k;drawPixFrame(list,false,null,226);}
  host.querySelectorAll('.tcard').forEach(c=>{const pp=c.querySelector('.pp');if(pp)drawBtn(pp,false,c.classList.contains('playing')?'pause':'play');});}

restorePL();buildMusic();if(playerActive){_q('player').classList.add('on');renderPlayer();}
// page scroll (canvas + overlays) — not while the pointer is over a list that scrolls by itself
const _ownScroll=e=>e.target.closest&&e.target.closest('.tscroll,#pQ,.mchips');
addEventListener('wheel',e=>{if(_ownScroll(e))return;updateScroll();if(maxScroll<=0)return;scrollY=Math.max(0,Math.min(maxScroll,scrollY+e.deltaY));placeDom();rebindHot();dirty=true;},{passive:true});
let _ty=0;addEventListener('touchstart',e=>{_ty=e.touches[0].clientY;},{passive:true});
addEventListener('touchmove',e=>{if(_ownScroll(e))return;updateScroll();if(maxScroll<=0)return;const y=e.touches[0].clientY,d=_ty-y;_ty=y;scrollY=Math.max(0,Math.min(maxScroll,scrollY+d));placeDom();rebindHot();dirty=true;},{passive:true});
requestAnimationFrame(loop);
