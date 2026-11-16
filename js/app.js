(function(){
"use strict";
const S=window.SITE, SV=window.SERVICES, NEWS=window.NEWS, CATS=window.NEWS_CATS, LINKS=window.LINKS, STEPS=window.STEPS;
const state={lang:"uk",page:"holovna",newsCat:"all",newsPage:1,linkCat:"all",linkQ:""};
const store={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};

/* ---------- i18n ---------- */
const t=o=>o==null?"":(typeof o==="string"||typeof o==="number")?o:(o[state.lang]??o.uk);
const UI={
 home:{uk:"Головна",en:"Home"},services:{uk:"Послуги",en:"Services"},about:{uk:"Про адвоката",en:"About"},news:{uk:"Новини",en:"News"},links:{uk:"Корисні посилання",en:"Useful links"},contacts:{uk:"Контакти",en:"Contacts"},privacy:{uk:"Політика конфіденційності",en:"Privacy policy"},
 contactLawyer:{uk:"Звʼязатися з адвокатом",en:"Contact the lawyer"},getConsult:{uk:"Отримати консультацію",en:"Get a consultation"},more:{uk:"Детальніше",en:"Learn more"},allServices:{uk:"Усі послуги",en:"All services"},
 cases:{uk:"справ",en:"cases"},years:{uk:"років практики",en:"years of practice"},casesWon:{uk:"справ у практиці",en:"cases handled"},
 call:{uk:"Подзвонити",en:"Call"},write:{uk:"Написати",en:"Message"},callback:{uk:"Зворотний дзвінок",en:"Request a call"},
 name:{uk:"Імʼя",en:"Name"},phone:{uk:"Телефон",en:"Phone"},msg:{uk:"Коротко опишіть ситуацію",en:"Briefly describe your situation"},topic:{uk:"Напрям",en:"Practice area"},chooseTopic:{uk:"Оберіть напрям",en:"Select an area"},other:{uk:"Інше / не знаю",en:"Other / not sure"},
 send:{uk:"Надіслати заявку",en:"Send request"},consent1:{uk:"Погоджуюсь з ",en:"I agree to the "},consent2:{uk:"політикою конфіденційності",en:"privacy policy"},
 errPhone:{uk:"Вкажіть номер телефону",en:"Please enter a phone number"},errName:{uk:"Вкажіть імʼя",en:"Please enter your name"},
 okT:{uk:"Дякую! Заявку сформовано",en:"Thank you! Request prepared"},okP:{uk:"Адвокат звʼяжеться з вами протягом робочого дня.",en:"The lawyer will contact you within one business day."},okDemo:{uk:"Демо-версія: форма ще не підключена до сервера, дані нікуди не надсилаються.",en:"Demo: the form is not yet connected to a server; no data is sent."},
 yourPhone:{uk:"Ваш номер телефону",en:"Your phone number"},
 needHelp:{uk:"Потрібна консультація?",en:"Need a consultation?"},needHelpP:{uk:"Розкажіть про ситуацію — адвокат оцінить перспективи та запропонує перші кроки. Усе, що ви розповідаєте, захищене адвокатською таємницею.",en:"Tell me about your situation — the lawyer will assess your prospects and suggest first steps. Everything you share is protected by attorney–client privilege."},
 chooseWay:{uk:"Оберіть зручний спосіб звʼязку",en:"Choose how to get in touch"},orForm:{uk:"або залиште номер",en:"or leave your number"},
 address:{uk:"Адреса",en:"Address"},email:{uk:"Email",en:"Email"},schedule:{uk:"Графік роботи",en:"Office hours"},messengers:{uk:"Месенджери",en:"Messengers"},route:{uk:"Побудувати маршрут",en:"Get directions"},
 readAlso:{uk:"Читайте також",en:"Read also"},allNews:{uk:"Усі новини",en:"All news"},all:{uk:"Усі",en:"All"},read:{uk:"Читати",en:"Read"},
 search:{uk:"Пошук посилань…",en:"Search links…"},nothing:{uk:"Нічого не знайдено",en:"Nothing found"},
 helpWith:{uk:"З чим я допомагаю",en:"How I help"},howWork:{uk:"Як я працюю",en:"How I work"},faq:{uk:"Часті запитання",en:"FAQ"},related:{uk:"Суміжні послуги",en:"Related services"},
 achievements:{uk:"Досягнення",en:"Track record"},
 menu:{uk:"Меню",en:"Menu"},close:{uk:"Закрити",en:"Close"},
 phase2:{uk:"фаза 2",en:"phase 2"},
 nfT:{uk:"Сторінку не знайдено",en:"Page not found"},nfP:{uk:"Можливо, її перенесли або адреса введена з помилкою. Перейдіть на головну або оберіть послугу.",en:"It may have moved or the address is mistyped. Go to the home page or choose a service."},
 toHome:{uk:"На головну",en:"Go home"},
 rights:{uk:"Усі права захищено.",en:"All rights reserved."},
 lawyer:{uk:"Адвокат",en:"Attorney at law"}
};
const u=k=>t(UI[k]);
const uk2=(a,b)=>state.lang==="uk"?a:b;
const fmtN=n=>String(n).replace(/\B(?=(\d{3})+(?!\d))/g,state.lang==="uk"?" ":",");
const fmtDate=d=>new Date(d+"T12:00:00").toLocaleDateString(state.lang==="uk"?"uk-UA":"en-GB",{day:"numeric",month:"long",year:"numeric"});
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

/* ---------- routes ---------- */
const href=k=>"#"+(state.lang==="en"?"en-":"")+(k||"holovna");
const PATHS={holovna:"/",poslugy:"/poslugy/","pro-advokata":"/pro-advokata/",novyny:"/novyny/","korysni-posylannia":"/korysni-posylannia/",kontakty:"/kontakty/","polityka-konfidentsiinosti":"/polityka-konfidentsiinosti/"};
const svcBy=slug=>SV.find(s=>s.slug===slug);

/* ---------- icons ---------- */
const P={
 arrow:'<path d="M7 17 17 7M8 7h9v9"/>',
 right:'<path d="M5 12h14M13 6l6 6-6 6"/>',
 left:'<path d="M19 12H5M11 6l-6 6 6 6"/>',
 down:'<path d="m6 9 6 6 6-6"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',
 check:'<path d="m5 12.5 4.5 4.5L19 7.5"/>',
 menu:'<path d="M4 8h16M4 16h16"/>',
 close:'<path d="M6 6l12 12M18 6 6 18"/>',
 search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
 phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
 mail:'<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/>',
 pin:'<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 chat:'<path d="M20 15a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z"/><path d="M8 9h8M8 13h5"/>',
 ext:'<path d="M14 4h6v6M20 4l-9 9M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4"/>',
 globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/>',
 landmark:'<path d="M3 21h18M5 21V10M19 21V10M9.5 21V10M14.5 21V10M2.5 10 12 4l9.5 6z"/>',
 scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2.5 14 5 7l2.5 7a2.5 2.5 0 0 1-5 0zM16.5 14 19 7l2.5 7a2.5 2.5 0 0 1-5 0z"/>',
 users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14a6.5 6.5 0 0 1 3.5 6"/>',
 briefcase:'<rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M8.5 7V5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2M3 13h18M10 13v2h4v-2"/>',
 shield:'<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6z"/><path d="m9 12 2 2 4-4"/>',
 home:'<path d="M3 11 12 4l9 7"/><path d="M5.5 9.5V20h13V9.5"/><circle cx="12" cy="13" r="1.8"/><path d="M9.2 18a2.8 2.8 0 0 1 5.6 0"/>',
 house:'<path d="M3 11 12 4l9 7"/><path d="M5.5 9.5V20h13V9.5"/><path d="m11 9-1.5 3.5 3 1L11 17"/>',
 doc:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
 tg:'<path d="M21 4.5 2.9 11.6c-.9.4-.9 1.6.1 1.9l4.6 1.4 1.8 5.5c.2.7 1.1.9 1.6.4l2.6-2.4 4.6 3.4c.6.4 1.4.1 1.6-.6L22.2 5.8c.2-.9-.6-1.6-1.2-1.3z"/><path d="m7.6 14.9 9.9-6.9"/>',
 vb:'<path d="M12 3c-5 0-8.5 1.6-8.5 7.5 0 3.5 1.2 5.6 3.5 6.6V21l3.3-3.1c.6.1 1.1.1 1.7.1 5 0 8.5-1.6 8.5-7.5S17 3 12 3z"/><path d="M9.3 7.6c.4-.2.9 0 1.1.4l.6 1.3c.2.4 0 .8-.3 1l-.4.3a5 5 0 0 0 2.7 2.7l.3-.4c.2-.3.7-.5 1-.3l1.3.6c.4.2.6.7.4 1.1-.4.9-1.3 1.4-2.2 1.2a7.3 7.3 0 0 1-5.2-5.2c-.2-.9.3-1.8 1.2-2.2z"/>',
 wa:'<path d="M4 20.5 5.2 17A8.5 8.5 0 1 1 8 19.6z"/><path d="M9.3 8.2c.4-.2.8 0 1 .4l.5 1.2c.1.3 0 .7-.2.9l-.4.4a5.6 5.6 0 0 0 2.7 2.7l.4-.4c.2-.2.6-.3.9-.2l1.2.5c.4.2.6.6.4 1-.4.8-1.2 1.2-2 1.1A6.8 6.8 0 0 1 8.2 10.2c-.1-.8.3-1.6 1.1-2z"/>',
 fb:'<path d="M15 3.5h-2.2A3.8 3.8 0 0 0 9 7.3V10H6.5v3.5H9V21h3.5v-7.5H15l.5-3.5h-3V7.6c0-.5.4-.6.6-.6H15z"/>',
 ig:'<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".6" fill="currentColor"/>',
 li:'<rect x="3.5" y="3.5" width="17" height="17" rx="3"/><path d="M8 10.5V16M8 7.8v.1M11.5 16v-5.5M11.5 13c0-1.6 1-2.6 2.3-2.6s2.2.9 2.2 2.6v3"/>',
 bag:'<rect x="4" y="7.5" width="16" height="12" rx="2.5"/><path d="M9 7.5V6a3 3 0 0 1 6 0v1.5"/>'
};
const ic=(n,cls)=>`<svg ${cls?`class="${cls}"`:""} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]||""}</svg>`;
const BRAND={
 tg:'<path fill="currentColor" d="M21.94 4.3 18.9 18.63c-.23 1.02-.83 1.27-1.69.79l-4.66-3.43-2.25 2.16c-.25.25-.46.46-.94.46l.34-4.74 8.63-7.8c.38-.33-.08-.52-.58-.19L7.08 12.6l-4.59-1.44c-1-.31-1.02-1 .21-1.48L20.62 2.8c.83-.31 1.56.19 1.32 1.5z"/>',
 wa:'<path d="M12 3a9 9 0 0 0-7.75 13.57L3 21l4.56-1.2A9 9 0 1 0 12 3z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path fill="currentColor" d="M8.9 7.6c.2-.4.5-.4.8-.4h.6c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .6l-.4.6c-.1.2-.3.3-.1.6.5.9 1.2 1.6 2 2.1.3.2.5.1.6 0l.6-.7c.2-.2.3-.2.6-.1l1.8.9c.3.1.4.2.4.4 0 .3 0 1-.4 1.5-.4.5-1.2 1-2 1-1.5 0-3.3-.9-4.7-2.3C8.6 12.8 7.8 11.1 7.8 9.7c0-.9.6-1.6 1.1-2.1z"/>',
 vb:'<path d="M10.3 19H15.9a5.6 5.6 0 0 0 5.6-5.6V8.1a5.6 5.6 0 0 0-5.6-5.6H8.1a5.6 5.6 0 0 0-5.6 5.6v5.3c0 2.8 2 5.1 4.5 5.5V22.4z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><g transform="translate(5.0 5.7) scale(0.53)"><path fill="currentColor" d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/></g><path d="M12.7 9.2a1.7 1.7 0 0 1 1.7 1.7M12.7 7.9a3 3 0 0 1 3 3M12.7 6.6a4.3 4.3 0 0 1 4.3 4.3" fill="none" stroke="currentColor" stroke-width="0.9" stroke-linecap="round"/>'};
const brand=n=>`<svg viewBox="0 0 24 24" aria-hidden="true">${BRAND[n]}</svg>`;
const LI={book:'<path d="M4 19.5V5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 0-2 2v-1.5z"/><path d="M8 7h8M8 11h6"/>',usercheck:'<circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 14 0"/><path d="m16 11 2 2 4-4"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',gavel:'<path d="m14 13-7.5 7.5a2.12 2.12 0 0 1-3-3L11 10"/><path d="m16 16 6-6M8 8l6-6M9 7l8 8M21 11l-8-8"/>',landmark:'<path d="M3 21h18M5 21V10M19 21V10M9.5 21V10M14.5 21V10M2.5 10 12 4l9.5 6z"/>',filecheck:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="m9 14 2 2 4-4"/>',shieldalert:'<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6z"/><path d="M12 8v5M12 16.5v.01"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/>',graduation:'<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2 9 2 12 0v-5M22 10v6"/>',map:'<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',car:'<path d="M5 17V12l2-5h10l2 5v5z"/><path d="M5 12h14"/><circle cx="8" cy="17" r="2"/><circle cx="16" cy="17" r="2"/>',stamp:'<path d="M5 21h14M6 17h12v-3a2 2 0 0 0-2-2h-2l-.5-3a2.5 2.5 0 1 0-3 0L10 12H8a2 2 0 0 0-2 2z"/>',coins:'<ellipse cx="9" cy="7" rx="6" ry="3"/><path d="M3 7v5c0 1.7 2.7 3 6 3s6-1.3 6-3V7"/><path d="M9 15v2c0 1.7 2.7 3 6 3s6-1.3 6-3v-5c0-1.7-2.7-3-6-3"/>',database:'<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',mappin:'<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',package:'<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v8M7.5 5.5l9 5"/>'};
const dom=u=>u.replace(/^https?:\/\//,"").split(/[/#?]/)[0];
const allLinks=()=>LINKS.flatMap(g=>g.items);
const homeLinks=()=>window.HOME_LINKS.map(h=>allLinks().find(l=>l.u.startsWith(h))).filter(Boolean);
const linkCard=l=>`<a class="lcard2 rv" href="${l.u}" target="_blank" rel="noopener"><b>${t(l.t)}</b><span class="lrow"><span class="dom">${dom(l.u)}</span><span class="circle sm">${ic("arrow")}</span></span></a>`;
const pill=(w,icn="bag")=>`<span class="pill">${w}<i>${ic(icn)}</i></span>`;
const arr=(cls="")=>`<span class="ar ${cls}">${ic("arrow")}</span>`;

/* ---------- shared bits ---------- */
const crumbs=items=>`<nav class="crumbs" aria-label="breadcrumbs"><a href="${href("holovna")}">${u("home")}</a>${items.map((it,i)=>`<span class="sep">/</span>`+(i===items.length-1?`<span aria-current="page">${it[0]}</span>`:`<a href="${href(it[1])}">${it[0]}</a>`)).join("")}</nav>`;

const PHOTO4=[1,3,4,6], PHOTO2=[1,2,5,6];
const sCard=(s,ph)=>`<a class="scard rv ${ph?"ph":""}" href="${href(s.slug)}">
  <div class="bg"><img src="img/svc-${s.slug}.jpg" alt="" loading="lazy"></div>
  <div><span class="cnt">${fmtN(s.cases)}+ ${u("cases")}</span><h3>${t(s.t)}</h3></div>
  <div class="bot"><p>${t(s.s)}</p><span class="go">${ic("arrow")}</span></div>
</a>`;
const sGrid=(list,cols=4)=>`<div class="sgrid ${cols===3?"c3":""}" data-sgrid>${list.map((s,i)=>sCard(s,cols===3?i===1:PHOTO4.includes(i))).join("")}</div>`;
const svcCard=s=>`<a class="card svc rv" href="${href(s.slug)}">
  <div class="ico">${ic(s.icon)}</div>
  <h3 class="h3">${t(s.t)}</h3>
  <p>${t(s.s)}</p>
  <div class="foot"><span class="chip ac">${fmtN(s.cases)}+ ${u("cases")}</span><span class="more">${u("more")} ${ic("right")}</span></div>
</a>`;

const cover=(n,size)=>{
  if(n.img) return `<div class="art photo"><img src="${n.img}" alt="" loading="lazy"></div>`;
  if(n.art==="photo") return `<div class="art photo"><img src="img/oksana-sm.jpg" alt=""></div>`;
  return `<div class="art ${n.art}"><div class="grid-lines"></div>${ic(n.icon,"big")}</div>`;
};
const newsCard=(n,light)=>`<a class="news-card rv" href="${href("novyny-"+n.slug)}">
  <div class="cov">${cover(n)}</div>
  <div><div class="meta"><span class="chip">${t(CATS[n.cat])}</span><span>${fmtDate(n.date)}</span></div>
  <h3>${t(n.t)}</h3></div>
  <div class="bot"><p>${t(n.e)}</p><span class="circle ${light?"dk":""}">${ic("arrow")}</span></div>
</a>`;

const ctaBand=()=>`<section class="wrap" style="margin-top:clamp(56px,8vw,112px)"><div class="cta-band rv">
  <span class="ring"></span><span class="ring r2"></span>
  <div><h2 class="h2">${u("needHelp")}</h2><p>${u("needHelpP")}</p></div>
  <div class="acts"><button class="btn btn-dark" data-modal>${u("contactLawyer")}${arr()}</button><a class="btn btn-ghost" style="color:#fff;border-color:rgba(255,255,255,.5)" href="${S.phoneHref}">${S.phone}</a></div>
</div></section>`;

const svcOptions=sel=>`<option value="">${u("chooseTopic")}</option>`+SV.map(s=>`<option value="${s.slug}" ${s.slug===sel?"selected":""}>${t(s.t)}</option>`).join("")+`<option value="other">${u("other")}</option>`;

const formHTML=(opts={})=>`<form class="form ${opts.cls||""}" novalidate data-form>
  ${opts.title?`<h3 class="h3">${opts.title}</h3>`:""}
  ${opts.sub?`<p class="muted" style="margin:0 0 6px">${opts.sub}</p>`:""}
  <div class="two">
    <div class="field" data-req="name"><label>${u("name")}</label><input name="name" autocomplete="name"><span class="em">${u("errName")}</span></div>
    <div class="field" data-req="phone"><label>${u("phone")}</label><input name="phone" type="tel" autocomplete="tel" placeholder="+380"><span class="em">${u("errPhone")}</span></div>
  </div>
  ${opts.noTopic?"":`<div class="field"><label>${u("topic")}</label><select name="topic">${svcOptions(opts.sel)}</select></div>`}
  ${opts.noMsg?"":`<div class="field"><label>${u("msg")}</label><textarea name="msg"></textarea></div>`}
  <label class="consent"><input type="checkbox" name="consent"><span>${u("consent1")}<a href="${href("polityka-konfidentsiinosti")}">${u("consent2")}</a></span></label>
  <button class="btn btn-dark" type="submit" style="justify-self:start">${u("send")}${arr()}</button>
  <div class="ok"><span class="circle">${ic("check")}</span><h3 class="h3">${u("okT")}</h3><p>${u("okP")}</p><small>${u("okDemo")}</small></div>
</form>`;

const msgrBtns=()=>`<div class="msgr">
  <a href="${S.tg}" target="_blank" rel="noopener"><span class="fi c-tg">${brand("tg")}</span>Telegram</a>
  <a href="${S.viber}"><span class="fi c-vb">${brand("vb")}</span>Viber</a>
  <a href="${S.wa}" target="_blank" rel="noopener"><span class="fi c-wa">${brand("wa")}</span>WhatsApp</a>
</div>`

const contactList=(full)=>`<div class="ct-list">
  <div class="ct-item"><span class="ci">${ic("phone")}</span><div><small>${u("phone")}</small><b><a href="${S.phoneHref}">${S.phone}</a></b></div></div>
  <div class="ct-item"><span class="ci">${ic("mail")}</span><div><small>${u("email")}</small><b><a href="mailto:${S.email}">${S.email}</a></b></div></div>
  <div class="ct-item"><span class="ci">${ic("pin")}</span><div><small>${u("address")}</small><b>${t(S.address)}</b></div></div>
  <div class="ct-item"><span class="ci">${ic("clock")}</span><div><small>${u("schedule")}</small><b>${S.hours.map(h=>`${t(h.d)} ${t(h.h)}`).join(" · ")}</b></div></div>
  ${full?`<div class="ct-msgr"><small>${u("messengers")}</small>${msgrBtns()}</div>`:""}
</div>`;

const mapHTML=()=>`<div class="map rv"><div class="map-art">
  <img class="map-img" src="img/map-podil.jpg" alt="${uk2("Схема проїзду: Поділ, вул. Кирилівська","Map: Podil, Kyrylivska St.")}" loading="lazy">
  <div class="pin"><span class="bub">${t(S.brand)} ${state.lang==="uk"?"Оксани Мелехової":"of Oksana Melekhova"}</span><span class="dot"></span></div></div>
  <div class="route"><b>${t(S.address)}</b><a class="btn btn-dark btn-sm" href="${S.maps}" target="_blank" rel="noopener">${u("route")}${arr()}</a></div>
</div>`;

/* ---------- pages ---------- */
const PAGES={};

/* ===== Головна: точна копія фрейму Figma «01 · Головна /» (72:2398) ===== */
const fArrow=(tone)=>`<span class="f-circ f-circ-${tone}"><svg viewBox="0 0 18 18" fill="none"><path d="M5.25 12.75L12.75 5.25M12.75 12V5.25H6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`;
const fEyebrow=(txt,dark)=>`<span class="f-eb ${dark?"f-eb-d":""}"><i></i>${txt}</span>`;
const fBtn=(label,style,attrs="")=>style==="dark"?`<a class="f-btn f-btn-dark" ${attrs}>${label}${fArrow("w")}</a>`:style==="light"?`<a class="f-btn f-btn-light" ${attrs}>${label}${fArrow("d")}</a>`:style==="lightb"?`<a class="f-btn f-btn-light f-btn-b" ${attrs}>${label}${fArrow("d")}</a>`:`<a class="f-btn f-btn-ol" ${attrs}>${label}</a>`;
const F_SVC=[["migratsiyni-spory","270+ справ","Міграційні спори","Посвідки на проживання, відмови ДМС, статус біженця, заборона вʼїзду",0],
 ["administratyvni-spory","260+ справ","Адміністративні спори","Оскарження рішень, дій та бездіяльності органів влади й посадових осіб",1],
 ["tsyvilni-spory","320+ справ","Цивільні спори","Договори, нерухомість, спадщина, стягнення боргів, захист прав споживачів",0],
 ["korporatyvni-spory","280+ справ","Корпоративні спори","Конфлікти учасників, захист частки, оскарження рішень загальних зборів",1],
 ["hospodarski-spory","350+ справ","Господарські спори","Спори між компаніями та ФОП, стягнення заборгованості, банкрутств",1],
 ["kryminalni-spravy","380+ справ","Кримінальні справи","Захист на всіх стадіях, представництво потерпілих, обшуки, запобіжні заходи",0],
 ["simeini-spory","260+ справ","Сімейні спори","Розлучення, поділ майна, аліменти, місце проживання та виїзд дитини",1],
 ["vidshkoduvannia-shkody","190+ справ","Відшкодування шкоди, завданої агресією","Зруйноване майно, Реєстр збитків, «єВідновлення», позови до РФ",0]];
const F_STEPS=[["Знайомство","Ви описуєте ситуацію, я уточнюю ключові обставини",212],["Аналіз","Вивчаю документи, оцінюю перспективи та можливі ризики",212],["Стратегія","Погоджую з вами план дій, строки, формат і вартість роботи",212],["Супровід","Беру на себе документи, переговори та представництво",200],["Результат","Доводжу справу до виконання рішення та звітую про кожен етап",200]];
const F_NEWS=[["vidmova-dms-5-krokiv","Міграційне право","4 листопада 2026","Відмова ДМС у посвідці: 5 кроків, які варто зробити одразу","Що перевірити в рішенні, як не пропустити строк оскарження і які документи підготувати.",1],
 ["fiksatsiia-poshkodzhenoho-zhytla","Відшкодування шкоди","21 жовтня 2026","Як зафіксувати пошкоджене житло для подальшого відшкодування","Фото, акти, свідки та онлайн-заяви: що знадобиться для державних і міжнародних механізмів.",2],
 ["vyizd-dytyny-za-kordon","Сімейне право","8 жовтня 2026","Виїзд дитини за кордон без згоди одного з батьків","Коли потрібна згода, як отримати дозвіл суду і що враховує суд.",3],
 ["obshuk-v-ofisi","Кримінальне право","24 вересня 2026","Обшук в офісі: алгоритм дій для керівника","Що можна і чого не можна робити під час обшуку, і чому адвокат має бути поруч.",4]];
const F_LINKS=[["Бази даних «Законодавство України»","zakon.rada.gov.ua","https://zakon.rada.gov.ua/","book"],["Єдиний реєстр адвокатів","erau.unba.org.ua","https://erau.unba.org.ua/","usercheck"],["Стан розгляду справ","court.gov.ua/fair","https://court.gov.ua/fair/","clock"],["Єдиний державний реєстр судових рішень","reyestr.court.gov.ua","https://reyestr.court.gov.ua/","gavel"],
 ["База правових позицій Верховного Суду","lpd.court.gov.ua","https://lpd.court.gov.ua/","landmark"],["Отримання довідки про несудимість","diia.gov.ua","https://diia.gov.ua/services/vityag-pro-nesudimist","filecheck"],["Єдиний державний реєстр осіб, які вчинили корупційні або повʼязані з корупцією правопорушення","corruptinfo.nazk.gov.ua","https://corruptinfo.nazk.gov.ua/","shieldalert"],["Перелік осіб, повʼязаних зі здійсненням терористичної діяльності або стосовно яких застосовано міжнародних санкцій","fiu.gov.ua","https://fiu.gov.ua/pages/dijalnist/protidija-terorizmu/perelik-teroristiv/aktualnij-perelik-osib-pov-yazanix-z-provadzhennyam-teroristichnoji-diyalnosti-abo-stosovno-yakix-zastosovano-mizhnarodni-sankcziji.html","globe"],
 ["Перевірка документів про освіту","info.edbo.gov.ua","https://info.edbo.gov.ua/edu-documents/","graduation"],["Публічна кадастрова карта","kadastrova-karta.com","https://kadastrova-karta.com/","map"],["Централізована база даних МТСБУ","cbd.mtsbu.ua","https://cbd.mtsbu.ua/Login.aspx","car"],["Єдиний реєстр спеціальних бланків нотаріальних документів","rnb.nais.gov.ua","https://rnb.nais.gov.ua/","stamp"],
 ["Єдиний реєстр виконавчих проваджень","asvpweb.minjust.gov.ua","https://asvpweb.minjust.gov.ua/#/search-debtors","coins"],["Реєстр адміністративних послуг","data.gov.ua","https://data.gov.ua/dataset/reyest-admin-poslug","database"],["Перелік центрів адміністративних послуг м. Київ","kyivcnap.gov.ua","https://kyivcnap.gov.ua/OneStopShops/Details/ababc65b-0d0b-4ba9-bbda-8ad86a601f5a","mappin"],["Пошук поштових відправлень","track.ukrposhta.ua","https://track.ukrposhta.ua/tracking_UA.html","package"]];
const fCi=(path)=>`<span class="f-ci"><svg viewBox="0 0 24 24" fill="none" stroke="#5D6984" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${path}</svg></span>`;
const F_GRAD_DEF="linear-gradient(180deg,rgba(10,10,13,.65) 11.538%,rgba(10,10,13,.18) 42.308%,rgba(10,10,13,.22) 54.327%,rgba(10,10,13,.75) 88.942%)";
const fSvcGrid=(grads={})=>`<div class="f-svc-grid">${F_SVC.map(([slug,chip,title,desc,photo],i)=>`<a class="f-scard ${photo?"is-photo":""}" href="${href(slug)}">
    <span class="f-scard-bg" style="--ov:${grads[i]||F_GRAD_DEF}"><img src="img/svc-${slug}.jpg" alt="" loading="lazy"></span>
    <span class="f-scard-top"><span class="f-chip">${chip}</span><span class="f-scard-t">${title}</span></span>
    <span class="f-scard-bot"><span class="f-scard-d">${desc}</span>${fArrow(photo?"w54":"a54")}</span>
  </a>`).join("")}</div>`;
PAGES.holovna=()=>`
<div class="fh">
<section class="f-hero"><img class="f-glow" src="img/f/ellipse.svg" alt="" aria-hidden="true">
  <div class="f-hero-grid">
    <div class="f-hero-text">
      ${fEyebrow("Адвокатське бюро · Київ")}
      <h1 class="f-h1"><span>Захищаю ваші</span><span class="f-h1-row">права <span class="f-pill f-pill-lg">чесно<img src="img/f/case.svg" alt="" width="52" height="52"></span></span><span>і до результату</span></h1>
      <p class="f-lead">Індивідуальний підхід до кожного клієнта та комплексний супровід на всіх етапах справи — спокійно, зрозуміло й конфіденційно</p>
      <div class="f-metrics"><div><b>20+</b><span>років практики</span></div><div><b>2 500+</b><span>справ у практиці</span></div></div>
      <form class="f-phone" data-quick novalidate><input type="tel" name="phone" placeholder="Ваш номер телефону" aria-label="Ваш номер телефону"><button class="f-btn f-btn-dark" type="submit">Звʼязатися з адвокатом${fArrow("w")}</button></form>
    </div>
    <div class="f-hero-img"><img src="img/hero@2x.jpg" srcset="img/hero.jpg 576w, img/hero@2x.jpg 1152w" sizes="(max-width:1100px) 100vw, 576px" width="576" height="720" alt="${t(S.name)}" fetchpriority="high" decoding="sync"></div>
    <div class="f-glass"><b>Оксана Мелехова</b><span>Допомагаю людям і бізнесу пройти складні юридичні ситуації з відчуттям ясності та опори.</span></div>
  </div>
</section>

<section class="f-svc-wrap"><div class="f-svc">
  <div class="f-head">
    <div class="f-head-l f-g14">${fEyebrow("Послуги",1)}<h2 class="f-h2 f-white f-h2-row">Правова допомога у <span class="f-pill f-pill-md">8 напрямах<img src="img/f/balance.svg" alt="" width="40" height="40"></span></h2></div>
    ${fBtn("Усі послуги","ol",`href="${href("poslugy")}"`)}
  </div>
  ${fSvcGrid()}
</div></section>

<section class="f-proc">
  <div class="f-head"><div class="f-head-l f-g26 f-w722">${fEyebrow("Прозорий процес")}<h2 class="f-h2b">Ви завжди знаєте, що буде далі</h2></div>${fBtn("Звʼязатися","dark",'href="#" data-modal')}</div>
  <div class="f-steps">${F_STEPS.map(([t1,d],i)=>`<div class="f-step" style="width:${F_STEPS[i][2]}px"><img src="img/f/n${i+1}.svg" alt="0${i+1}" width="110" height="94"><div><h3>${t1}</h3><p>${d}</p></div></div>`).join("")}</div>
</section>

<section class="f-cta-wrap"><div class="f-cta">
  <div class="f-cta-t"><h2 class="f-h2 f-white">Потрібна консультація?</h2><p>Розкажіть про ситуацію — я оціню перспективи та запропоную перші кроки. Усе, що ви розповідаєте, захищене адвокатською таємницею.</p></div>
  <div class="f-cta-a">${fBtn("Звʼязатися з адвокатом","dark",'href="#" data-modal')}<a class="f-btn f-btn-ol f-btn-olw" href="${S.phoneHref}">+380-96-391-08-98</a></div>
  <i class="f-ring f-ring1"></i><i class="f-ring f-ring2"></i>
</div></section>

<section class="f-news-wrap"><div class="f-news">
  <div class="f-head">
    <div class="f-head-l f-g14"><div class="f-head-l f-g26">${fEyebrow("Новини",1)}<h2 class="f-h2 f-white">Право — зрозумілою мовою</h2></div><p class="f-sub">Практичні пояснення, зміни законодавства та відповіді на часті запитання.</p></div>
    ${fBtn("Усі новини","light",`href="${href("novyny")}"`)}
  </div>
  <div class="f-news-grid">${F_NEWS.map(([slug,cat,date,tt,ex,img])=>`<a class="f-ncard" href="${href("novyny-"+slug)}">
    <span class="f-ncard-bg"><img src="img/news-${img}.jpg" alt="" loading="lazy"></span>
    <span class="f-ncard-top"><span class="f-meta"><span class="f-chip">${cat}</span><span class="f-date">${date}</span></span><span class="f-ncard-t">${tt}</span></span>
    <span class="f-ncard-bot"><span>${ex}</span>${fArrow("w44")}</span>
  </a>`).join("")}</div>
</div></section>

<section class="f-links">
  <div class="f-head"><div class="f-head-l f-g26 f-w722">${fEyebrow("Корисні посилання")}<h2 class="f-h2b">Офіційні реєстри та сервіси</h2></div>${fBtn("Усі посилання","dark",`href="${href("korysni-posylannia")}"`)}</div>
  <div class="f-links-grid">${F_LINKS.map(([tt,dom,url,ico])=>`<a class="f-lcard" href="${url}" target="_blank" rel="noopener">
    <span class="f-lcard-t">${tt}</span>
    <span class="f-lcard-b"><span>${dom}</span>${fArrow("s40")}</span>
  </a>`).join("")}</div>
</section>

<section class="f-ct">
  <div class="f-head"><div class="f-head-l f-g14">${fEyebrow("Контакти")}<h2 class="f-h2">Офіс в історичній частині Києва</h2></div>${fBtn("Контакти","lightb",`href="${href("kontakty")}"`)}</div>
  <div class="f-ct-grid">
    <div class="f-ct-card">
      <div class="f-ci-row">${fCi(P.phone)}<div><small>ТЕЛЕФОН</small><b><a href="${S.phoneHref}">+380-96-391-08-98</a></b></div></div>
      <div class="f-ci-row">${fCi(P.mail)}<div><small>EMAIL</small><b><a href="mailto:${S.email}">info@melekhova.law</a></b></div></div>
      <div class="f-ci-row">${fCi(P.pin)}<div><small>АДРЕСА</small><b>м. Київ, вул. Кирилівська, 31-Б</b></div></div>
      <div class="f-ci-row">${fCi(P.clock)}<div><small>ГРАФІК РОБОТИ</small><b>Пн – Пт 09:00 – 19:00 · Сб - Нд за домовленістю</b></div></div>
      <div class="f-spacer"></div>
      <div class="f-msgr"><small>МЕСЕНДЖЕРИ</small><div>
        <a href="${S.tg}" target="_blank" rel="noopener"><span style="background:#2aabee">${brand("tg")}</span>Telegram</a>
        <a href="${S.viber}"><span style="background:#7360f2">${brand("vb")}</span>Viber</a>
        <a href="${S.wa}" target="_blank" rel="noopener"><span style="background:#25d366">${brand("wa")}</span>WhatsApp</a>
      </div></div>
    </div>
    <div class="f-map"><div class="f-map-art"><img src="img/map-podil.jpg" alt="Схема: Поділ, вул. Кирилівська" loading="lazy">
      <div class="f-pin"><span>Адвокатське бюро Оксани Мелехової</span><i></i></div></div>
      <div class="f-route"><b>м. Київ, вул. Кирилівська, 31-Б</b>${fBtn("Побудувати маршрут","dark",`href="${S.maps}" target="_blank" rel="noopener"`)}</div>
    </div>
  </div>
</section>
</div>`;

PAGES.poslugy=()=>`
<div class="fh">
<section class="f-phead">
  <nav class="f-crumbs" aria-label="breadcrumbs"><a href="${href("holovna")}">Головна</a><span class="sep">/</span><span aria-current="page">Послуги</span></nav>
  <h1 class="f-h1 f-h1-page"><span class="f-h1-row">Послуги <span class="f-pill f-pill-pg">8 напрямах<img src="img/f/balance52.svg" alt="" width="52" height="52"></span></span></h1>
  <p class="f-lead f-lead-pg">Вісім ключових напрямів юридичної практики. Оберіть потрібний напрям — на сторінці кожної послуги ви знайдете інформацію про правову допомогу, порядок співпраці та можливість залишити заявку на консультацію.</p>
</section>
<section class="f-svc-wrap"><div class="f-svc">
  ${fSvcGrid({0:"linear-gradient(180deg,rgba(10,10,13,.65) 11.538%,rgba(10,10,13,.26) 42.308%,rgba(10,10,13,.3) 54.327%,rgba(10,10,13,.75) 88.942%)",4:"linear-gradient(180deg,rgba(10,10,13,.65) 20.673%,rgba(10,10,13,.38) 42.308%,rgba(10,10,13,.42) 54.327%,rgba(10,10,13,.75) 88.942%)",6:"linear-gradient(180deg,rgba(10,10,13,.65) 11.538%,rgba(10,10,13,.28) 42.308%,rgba(10,10,13,.34) 54.327%,rgba(10,10,13,.75) 88.942%)",7:"linear-gradient(180deg,rgba(10,10,13,.65) 11.538%,rgba(10,10,13,.28) 42.308%,rgba(10,10,13,.34) 54.327%,rgba(10,10,13,.75) 88.942%)"})}
</div></section>
<section class="f-cta-wrap f-cta-pg"><div class="f-cta">
  <div class="f-cta-t"><h2 class="f-h2 f-white">Потрібна консультація?</h2><p>Розкажіть про ситуацію — я оціню перспективи та запропоную перші кроки. Усе, що ви розповідаєте, захищене адвокатською таємницею.</p></div>
  <div class="f-cta-a">${fBtn("Звʼязатися з адвокатом","dark",'href="#" data-modal')}<a class="f-btn f-btn-ol f-btn-olw" href="${S.phoneHref}">+380-96-391-08-98</a></div>
  <i class="f-ring f-ring1"></i><i class="f-ring f-ring2"></i>
</div></section>
</div>`;

const F_SVC_PAGE={"migratsiyni-spory":{d:"Допомога у правильному оформленні документів, уникненні помилок та відмов під час подання заяв. Супровід на всіх етапах міграційної процедури. Представництво й захист прав та інтересів у органах державної влади та в усіх судах України.",
  h:["Оскарження відмов у видачі посвідки на тимчасове чи постійне проживання","Отримання статусу біженця або особи, яка потребує додаткового захисту","Супровід процедури набуття громадянства України","Захист у справах про примусове повернення та видворення","Оскарження заборони вʼїзду в Україну","Представництво в адміністративних судах усіх інстанцій"],
  img:"img/svc-migr-photo.jpg",rel:["administratyvni-spory","tsyvilni-spory","korporatyvni-spory","hospodarski-spory"]}};
const F_CHECK=`<svg viewBox="0 0 16 16" fill="none"><path d="M3.33301 8.33333L6.33301 11.3333L12.6663 5" stroke="#3E4964" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const fRelCard=slug=>{const i=F_SVC.findIndex(x=>x[0]===slug);const [sl,chip,title,desc]=F_SVC[i];
  const g=sl==="hospodarski-spory"?"linear-gradient(180deg,rgba(10,10,13,.65) 20.673%,rgba(10,10,13,.38) 42.308%,rgba(10,10,13,.42) 54.327%,rgba(10,10,13,.75) 88.942%)":F_GRAD_DEF;
  return `<a class="f-scard is-photo" href="${href(sl)}"><span class="f-scard-bg" style="--ov:${g}"><img src="img/svc-${sl}.jpg" alt="" loading="lazy"></span><span class="f-scard-top"><span class="f-chip">${chip}</span><span class="f-scard-t">${title}</span></span><span class="f-scard-bot"><span class="f-scard-d">${desc}</span>${fArrow("w54")}</span></a>`;};
const svcPage=s=>{
  const fs=F_SVC.find(x=>x[0]===s.slug)||[], ov=F_SVC_PAGE[s.slug]||{};
  const n=(fs[1]||String(s.cases)).replace(/\D/g,"");
  const desc=ov.d||t(s.d), help=ov.h||t(s.h);
  const first=ov.rel||[];
  const rel=first.concat(F_SVC.map(x=>x[0]).filter(x=>x!==s.slug&&!first.includes(x)));
  return `
<div class="fh">
<section class="f-sh">
  <nav class="f-crumbs" aria-label="breadcrumbs"><a href="${href("holovna")}">Головна</a><span class="sep">/</span><a href="${href("poslugy")}">Послуги</a><span class="sep">/</span><span aria-current="page">${t(s.t)}</span></nav>
  <div class="f-sh-grid">
    <div class="f-sh-main">
      ${fEyebrow("Послуги")}
      <h1 class="f-sh-h1">${t(s.t)}</h1>
      <p class="f-sh-lead">${desc}</p>
      ${fEyebrow("З чим допомагаю")}
      <ul class="f-help">${help.map(x=>`<li><span class="f-ck">${F_CHECK}</span>${x}</li>`).join("")}</ul>
      <div class="f-sh-acts"><button class="f-btn f-btn-dark" type="button" data-modal data-topic="${s.slug}">Отримати консультацію${fArrow("w")}</button><a class="f-btn f-btn-light f-btn-b" href="${S.phoneHref}">+380-96-391-08-98${fArrow("d")}</a></div>
      <div class="f-trust"><span>Консультація в офісі або онлайн</span><span>Адвокатська таємниця</span><span>Суди всіх інстанцій</span></div>
    </div>
    <div class="f-sh-side">
      <div class="f-counter">${fEyebrow(t(s.t),1)}<div><b>${n}<em>+</em></b><span>справ у практиці адвоката</span></div></div>
      <div class="f-sh-photo"><img src="${ov.img||"img/svc-"+s.slug+".jpg"}" alt=""></div>
    </div>
  </div>
</section>

<section class="f-proc f-proc-pg">
  <div class="f-head"><div class="f-head-l f-g26 f-w722">${fEyebrow("Прозорий процес")}<h2 class="f-h2b">Ви завжди знаєте, що буде далі</h2></div></div>
  <div class="f-steps">${F_STEPS.map(([t1,d],i)=>`<div class="f-step" style="width:${F_STEPS[i][2]}px"><img src="img/f/n${i+1}.svg" alt="0${i+1}" width="110" height="94"><div><h3>${t1}</h3><p>${d}</p></div></div>`).join("")}</div>
</section>

<section class="f-rel" data-carousel>
  <div class="f-rel-top"><div class="f-g14 f-rel-head">${fEyebrow("Суміжні послуги")}<h2 class="f-rel-h2">Може стати у нагоді</h2></div>
    <div class="f-rel-nav"><button type="button" class="f-rel-btn" data-dir="-1" aria-label="Назад"><svg viewBox="0 0 18 18" fill="none"><path d="M11 4L6 9l5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button><button type="button" class="f-rel-btn" data-dir="1" aria-label="Далі"><svg viewBox="0 0 18 18" fill="none"><path d="M7 4l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button></div></div>
  <div class="f-rel-track" tabindex="0" aria-label="Суміжні послуги">${rel.map(fRelCard).join("")}</div>
</section>

<section class="f-rq">
  <form class="f-rq-form" novalidate data-form>
    <h3>Отримати консультацію</h3>
    <p class="f-rq-sub">Залиште контакти — адвокат передзвонить і поставить уточнювальні питання.</p>
    <div class="f-rq-fields">
      <label class="field" data-req="name"><span>Імʼя</span><input name="name" autocomplete="name"></label>
      <label class="field" data-req="phone"><span>Телефон</span><input name="phone" type="tel" autocomplete="tel" placeholder="+380"></label>
    </div>
    <label class="consent"><input type="checkbox" name="consent"><span>Погоджуюсь з <a href="${href("polityka-konfidentsiinosti")}">політикою конфіденційності</a></span></label>
    <button class="f-btn f-btn-dark" type="submit">Надіслати заявку${fArrow("w")}</button>
    <div class="ok"><h3>Дякую!</h3><p>Заявку отримано — адвокат передзвонить найближчим часом.</p></div>
  </form>
  <div class="f-rq-ct">
    <h3>Контакти</h3>
    <div class="f-rq-list">
      <div class="f-ci-row">${fCi(P.phone)}<div><small>ТЕЛЕФОН</small><b><a href="${S.phoneHref}">+380-96-391-08-98</a></b></div></div>
      <div class="f-ci-row">${fCi(P.mail)}<div><small>EMAIL</small><b><a href="mailto:${S.email}">info@melekhova.law</a></b></div></div>
      <div class="f-ci-row">${fCi(P.pin)}<div><small>АДРЕСА</small><b>м. Київ, вул. Кирилівська, 31-Б</b></div></div>
      <div class="f-ci-row">${fCi(P.clock)}<div><small>ГРАФІК РОБОТИ</small><b>Пн – Пт 09:00 – 19:00 · Сб за домовленістю</b></div></div>
    </div>
  </div>
</section>
</div>`;
};

const F_PRINC=[["Чесність","Кажу, як є: які шанси, ризики і скільки це коштуватиме — ще до початку роботи",'<path d="M12 3v18M7 21h10M4 7h16"/><path d="M4 7l-2.5 6a3 3 0 0 0 5 0z"/><path d="M20 7l-2.5 6a3 3 0 0 0 5 0z"/>'],
 ["Конфіденційність","Усе, що ви розповідаєте, захищено адвокатською таємницею",'<rect x="4.5" y="10.5" width="15" height="10.5" rx="2.5"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/><path d="M12 15v2.2"/>'],
 ["Особиста участь","Справу веду сама, а не передаю помічникам. Ви знаєте, кому телефонувати",'<circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/>'],
 ["Результат","Працюю на рішення, яке можна виконати, а не на процес заради процесу",'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/>']];
PAGES["pro-advokata"]=()=>`
<div class="fh">
<section class="f-ab">
  <img class="f-ab-glow" src="img/f/about-ellipse.svg" alt="" aria-hidden="true">
  <nav class="f-crumbs" aria-label="breadcrumbs"><a href="${href("holovna")}">Головна</a><span class="sep">/</span><span aria-current="page">Про адвоката</span></nav>
  <div class="f-ab-grid">
    <div class="f-ab-photo"><img src="img/about-photo.jpg" alt="Оксана Мелехова" fetchpriority="high"></div>
    <div class="f-ab-main">
      ${fEyebrow("Адвокат")}
      <h1 class="f-ab-h1">Оксана Мелехова</h1>
      <p class="f-ab-lead">Адвокат із 20-річною практикою. Веду справи особисто — від першої консультації до виконання рішення суду. Працюю з громадянами України, іноземцями та бізнесом.</p>
      <div class="f-facts"><div><b>20+</b><span>років практики</span></div><div><b>2 500+</b><span>справ у практиці</span></div><div><b>UA · EN</b><span>мови консультацій</span></div></div>
      <div class="f-ab-acts">${fBtn("Звʼязатися з адвокатом","dark",'href="#" data-modal')}<a class="f-btn f-btn-light f-btn-b" href="https://erau.unba.org.ua/" target="_blank" rel="noopener">Перевірити в ЄРАУ${fArrow("d")}</a></div>
    </div>
  </div>
</section>

<section class="f-pr">
  <div class="f-g14 f-pr-head">${fEyebrow("Принципи роботи")}<h2 class="f-pr-h2">На чому тримається <span class="f-pill f-pill-pr">довіра<img src="img/f/shield.svg" alt="" width="44" height="44"></span></h2></div>
  <div class="f-bento">
    <div class="f-bc f-bc-dark"><i class="f-bring f-bring1"></i><i class="f-bring f-bring2"></i>
      <div class="f-bc-h"><h3>Чесність</h3><span class="f-bc-n">01</span></div>
      <div class="f-bc-b"><p>Кажу, як є: які шанси, ризики і скільки це коштуватиме — ще до початку роботи</p><div class="f-bc-tags"><span>Шанси</span><span>Ризики</span><span>Вартість</span></div></div></div>
    <div class="f-bc f-bc-accent">
      <div class="f-bc-h"><span class="f-bc-ic"><img src="img/f/shield.svg" alt="" width="52" height="52"></span><span class="f-bc-n">02</span></div>
      <div class="f-bc-v"><h3>Конфіденційність</h3><p>Усе, що ви розповідаєте, захищено адвокатською таємницею</p></div></div>
    <div class="f-bc f-bc-white">
      <div class="f-bc-h"><span class="f-bc-who"><i class="f-bc-av"></i><span><b>Оксана Мелехова</b><small>веде вашу справу особисто</small></span></span><span class="f-bc-n">03</span></div>
      <div class="f-bc-v"><h3>Особиста участь</h3><p>Справу веду сама, а не передаю помічникам. Ви знаєте, кому телефонувати</p></div></div>
    <div class="f-bc f-bc-light">
      <div class="f-bc-h"><h3>Результат</h3><span class="f-bc-n">04</span></div>
      <div class="f-bc-b"><p>Працюю на рішення, яке можна виконати, а не на процес заради процесу</p><div class="f-bc-stat"><b>2 500+</b><span>справ у практиці</span></div></div></div>
  </div>
</section>

<section class="f-cta-wrap f-cta-ab"><div class="f-cta">
  <div class="f-cta-t"><h2 class="f-h2 f-white">Потрібна консультація?</h2><p>Розкажіть про ситуацію — я оціню перспективи та запропоную перші кроки. Усе, що ви розповідаєте, захищене адвокатською таємницею.</p></div>
  <div class="f-cta-a">${fBtn("Звʼязатися з адвокатом","dark",'href="#" data-modal')}<a class="f-btn f-btn-ol f-btn-olw" href="${S.phoneHref}">+380-96-391-08-98</a></div>
  <i class="f-ring f-ring1"></i><i class="f-ring f-ring2"></i>
</div></section>
</div>`;

const fDate=d=>fmtDate(d);
const fPhead=(crumb,word,pillTxt,icon,lead)=>`<section class="f-phead">
  <nav class="f-crumbs" aria-label="breadcrumbs"><a href="${href("holovna")}">Головна</a><span class="sep">/</span><span aria-current="page">${crumb}</span></nav>
  <h1 class="f-h1 f-h1-page"><span class="f-h1-row">${word} <span class="f-pill f-pill-pg">${pillTxt}<img src="img/f/${icon}" alt="" width="52" height="52"></span></span></h1>
  <p class="f-lead f-lead-pg">${lead}</p>
</section>`;
const fCtaBand=(cls)=>`<section class="f-cta-wrap ${cls}"><div class="f-cta">
  <div class="f-cta-t"><h2 class="f-h2 f-white">Потрібна консультація?</h2><p>Розкажіть про ситуацію — я оціню перспективи та запропоную перші кроки. Усе, що ви розповідаєте, захищене адвокатською таємницею.</p></div>
  <div class="f-cta-a">${fBtn("Звʼязатися з адвокатом","dark",'href="#" data-modal')}<a class="f-btn f-btn-ol f-btn-olw" href="${S.phoneHref}">+380-96-391-08-98</a></div>
  <i class="f-ring f-ring1"></i><i class="f-ring f-ring2"></i>
</div></section>`;
const fNewsCard=n=>`<a class="f-nc" href="${href("novyny-"+n.slug)}">
  <span class="f-nc-cover"><img src="${n.img}" alt="" loading="lazy"></span>
  <span class="f-nc-body"><span class="f-nc-meta"><span class="f-nc-chip">${t(CATS[n.cat])}</span><span class="f-nc-date">${fDate(n.date)}</span></span>
  <span class="f-nc-t">${t(n.t)}</span>
  <span class="f-nc-bot"><span>${t(n.e)}</span>${fArrow("d44")}</span></span>
</a>`;
const F_CHEV=d=>`<svg viewBox="0 0 18 18" fill="none"><path d="${d<0?"M11 4L6 9l5 5":"M7 4l5 5-5 5"}" stroke="#141414" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
PAGES.novyny=()=>{
  const per=6, list=NEWS, pages=Math.max(1,Math.ceil(list.length/per));
  if(state.newsPage>pages) state.newsPage=1;
  const pgN=state.newsPage, slice=list.slice((pgN-1)*per,pgN*per);
  return `
<div class="fh">
${fPhead("Новини","Новини та","статті","pill-doc.svg","Пояснюю зміни законодавства та судову практику простими словами.")}
<section class="f-nl">
  <div class="f-nl-grid">${slice.map(fNewsCard).join("")}</div>
  ${pages>1?`<div class="f-pager" data-pager><button data-p="${pgN-1}" ${pgN===1?"disabled":""} aria-label="Назад">${F_CHEV(-1)}</button>${Array.from({length:pages},(_,i)=>`<button data-p="${i+1}" class="${pgN===i+1?"on":""}">${i+1}</button>`).join("")}<button data-p="${pgN+1}" ${pgN===pages?"disabled":""} aria-label="Далі">${F_CHEV(1)}</button></div>`:""}
</section>
${fCtaBand("f-cta-80")}
</div>`;
};

const F_GLOBE=`<svg viewBox="0 0 22 22" fill="none"><path d="M11 19.25C15.5563 19.25 19.25 15.5563 19.25 11C19.25 6.44365 15.5563 2.75 11 2.75C6.44365 2.75 2.75 6.44365 2.75 11C2.75 15.5563 6.44365 19.25 11 19.25Z" stroke="#5D6984" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.75 11H19.25M11 2.75C13.2917 5.13333 14.4833 7.88333 14.4833 11C14.4833 14.1167 13.2917 16.8667 11 19.25C8.70833 16.8667 7.51667 14.1167 7.51667 11C7.51667 7.88333 8.70833 5.13333 11 2.75Z" stroke="#5D6984" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const articlePage=n=>{
  const raw=t(n.b); const intro=[]; const secs=[]; let quote="";
  for(const p of raw){ if(p.startsWith("## ")) secs.push({h:p.slice(3),ps:[]}); else if(p.startsWith("> ")) quote=p.slice(2); else if(secs.length) secs[secs.length-1].ps.push(p); else intro.push(p); }
  const svc=SV.find(s=>s.icon===n.icon)||SV[0];
  const more=NEWS.filter(x=>x.slug!==n.slug).slice(0,3);
  return `
<div class="fh">
<section class="f-ah">
  <nav class="f-crumbs" aria-label="breadcrumbs"><a href="${href("holovna")}">Головна</a><span class="sep">/</span><a href="${href("novyny")}">Новини</a><span class="sep">/</span><span aria-current="page">${t(n.t)}</span></nav>
  <h1 class="f-ah-h1">${t(n.t)}</h1>
  <div class="f-ah-meta"><span class="f-nc-chip">${t(CATS[n.cat])}</span><span>${fDate(n.date)}</span><i></i><span>Оксана Мелехова</span></div>
</section>
<section class="f-acov"><img src="${n.img}" alt=""></section>
<section class="f-abody">
  <article class="f-atext">
    <p class="f-alead">${t(n.e)}</p>
    ${intro.map(p=>`<p>${p}</p>`).join("")}
    ${secs.map(x=>`<div class="f-asec"><h2>${x.h}</h2>${x.ps.map(p=>`<p>${p}</p>`).join("")}</div>`).join("")}
    ${quote?`<blockquote class="f-aq">${quote}</blockquote>`:""}
  </article>
  <aside class="f-aside">
    <div class="f-aside-c"><h3>Потрібна консультація?</h3><p>Опишіть свою ситуацію — я підкажу перші кроки.</p><i class="f-sp4"></i>${fBtn("Звʼязатися з адвокатом","dark",`href="#" data-modal data-topic="${svc.slug}"`)}</div>
    <a class="f-aside-s" href="${href(svc.slug)}"><span class="f-ci">${svc.slug==="migratsiyni-spory"?F_GLOBE:ic(svc.icon)}</span><span class="f-aside-sb"><small>ПОСЛУГА</small><b>${t(svc.t)}</b></span>${fArrow("s40")}</a>
  </aside>
</section>
<section class="f-also">
  <div class="f-also-h"><div class="f-g14 f-col">${fEyebrow("Новини")}<h2 class="f-h2">Читайте також</h2></div>${fBtn("Усі новини","lightb",`href="${href("novyny")}"`)}</div>
  <div class="f-nl-row">${more.map(fNewsCard).join("")}</div>
</section>
${fCtaBand("f-cta-80")}
</div>`;
};

PAGES["korysni-posylannia"]=()=>`
<div class="fh"><img class="f-pgglow" src="img/f/glow-07.svg" alt="" aria-hidden="true" style="left:483px;top:-100px;width:957px">
${fPhead("Корисні посилання","Корисні","посилання","pill-ext.svg","Офіційні реєстри, суди та сервіси, які знадобляться у вашій справі. Усі посилання відкриваються в новій вкладці.")}
<section class="f-lk">${LINKS.map(g=>`<div class="f-lk-g"><div class="f-lk-h"><h2>${t(g.cat)}</h2><span>${g.items.length}</span></div>
  <div class="f-lk-grid">${g.items.map(l=>`<a class="f-lcard" href="${l.u}" target="_blank" rel="noopener"><span class="f-lcard-t">${t(l.t)}</span><span class="f-lcard-b"><span>${(F_LINKS.find(x=>x[2]===l.u)||[0,dom(l.u)])[1]}</span>${fArrow("s40")}</span></a>`).join("")}</div></div>`).join("")}</section>
${fCtaBand("f-cta-80")}
</div>`;

function linksList(){
  const q=state.linkQ.trim().toLowerCase();
  let out="";
  LINKS.forEach((g,i)=>{
    if(state.linkCat!=="all"&&String(state.linkCat)!==String(i)) return;
    const items=g.items.filter(l=>!q||(t(l.t)+" "+l.u).toLowerCase().includes(q));
    if(!items.length) return;
    out+=`<div class="lgroup"><h2>${t(g.cat)} <span class="chip">${items.length}</span></h2><div class="grid g4 lgrid">${items.map(linkCard).join("")}</div></div>`;
  });
  return out||`<div class="empty">${u("nothing")}</div>`;
}

const F_CHAT22=`<svg viewBox="0 0 22 22" fill="none"><path d="M18.3334 11C18.3265 12.2485 18.001 13.4746 17.3876 14.5621C16.7743 15.6496 15.8934 16.5625 14.8285 17.2142C13.7636 17.866 12.5499 18.2352 11.3025 18.2866C10.055 18.3381 8.81505 18.0702 7.70008 17.5083L3.66675 18.3333L4.58341 14.6667C4.0443 13.6917 3.73443 12.6066 3.67734 11.494C3.62024 10.3813 3.81742 9.27027 4.25389 8.2452C4.69037 7.22013 5.35467 6.30799 6.19636 5.57803C7.03805 4.84808 8.035 4.3195 9.11151 4.03243C10.188 3.74536 11.3158 3.70735 12.4092 3.92129C13.5026 4.13522 14.5328 4.59547 15.4218 5.2671C16.3107 5.93872 17.0349 6.80407 17.5394 7.79742C18.0439 8.79077 18.3155 9.88602 18.3334 11Z" stroke="#5D6984" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.25 10.0833H13.75M8.25 12.8333H11.9167" stroke="#5D6984" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
PAGES.kontakty=()=>`
<div class="fh"><img class="f-pgglow" src="img/f/glow-08.svg" alt="" aria-hidden="true" style="left:560px;top:-100px;width:880px">
${fPhead("Контакти","Звʼяжіться","зручно","pill-chat.svg","Телефон, месенджери, email або форма — оберіть те, що зручніше. Консультації в офісі та онлайн.")}
<section class="f-kt">
  <div class="f-kt-ways">
    <div class="f-kt-tile" style="--w:386px">${fCi(P.phone)}<div class="f-kt-b"><small>ЗАТЕЛЕФОНУВАТИ</small><b><a href="${S.phoneHref}">+380-96-391-08-98</a></b><span>Пн – Пт 09:00 – 19:00 · Сб – Нд за домовленістю</span></div></div>
    <div class="f-kt-tile" style="--w:474px"><span class="f-ci">${F_CHAT22}</span><div class="f-kt-b"><small>НАПИСАТИ В МЕСЕНДЖЕР</small><div class="f-kt-m">
      <a href="${S.tg}" target="_blank" rel="noopener"><span style="background:#2aabee">${brand("tg")}</span>Telegram</a>
      <a href="${S.viber}"><span style="background:#7360f2">${brand("vb")}</span>Viber</a>
      <a href="${S.wa}" target="_blank" rel="noopener"><span style="background:#25d366">${brand("wa")}</span>WhatsApp</a></div><span>Відповім протягом робочого дня</span></div></div>
    <div class="f-kt-tile" style="--w:372px">${fCi(P.mail)}<div class="f-kt-b"><small>EMAIL</small><b><a href="mailto:${S.email}">info@melekhova.law</a></b><span>Для документів і детальних запитів</span></div></div>
  </div>
  <div class="f-kt-row">
    <form class="f-rq-form f-kt-form" novalidate data-form>
      <h3>Отримати консультацію</h3>
      <p class="f-rq-sub">Залиште контакти — адвокат передзвонить і поставить уточнювальні питання.</p>
      <div class="f-rq-fields">
        <label class="field" data-req="name"><span>Імʼя</span><input name="name" autocomplete="name"></label>
        <label class="field" data-req="phone"><span>Телефон</span><input name="phone" type="tel" autocomplete="tel" placeholder="+380"></label>
      </div>
      <label class="consent"><input type="checkbox" name="consent"><span>Погоджуюсь з <a href="${href("polityka-konfidentsiinosti")}">політикою конфіденційності</a></span></label>
      <button class="f-btn f-btn-dark" type="submit">Надіслати заявку${fArrow("w")}</button>
      <div class="ok"><h3>Дякую!</h3><p>Заявку отримано — адвокат передзвонить найближчим часом.</p></div>
    </form>
    <div class="f-kt-map"><img src="img/map-kontakty.jpg" alt="Схема: Поділ, вул. Кирилівська" loading="lazy">
      <div class="f-kt-pin"><span>Адвокатське бюро Оксани Мелехової</span><i></i></div>
      <div class="f-kt-route"><b>м. Київ, вул. Кирилівська, 31-Б</b>${fBtn("Побудувати маршрут","dark",`href="${S.maps}" target="_blank" rel="noopener"`)}</div>
    </div>
  </div>
</section>
</div>`;

PAGES["polityka-konfidentsiinosti"]=()=>{
  const uk=state.lang==="uk";
  const secs=uk?[
   ["1. Загальні положення","Ця політика пояснює, як адвокат Оксана Мелехова (далі — «Адвокат») обробляє персональні дані відвідувачів сайту відповідно до Закону України «Про захист персональних даних»."],
   ["2. Які дані я збираю","Імʼя, номер телефону."],
   ["3. Мета обробки","Звʼязок з вами щодо вашого звернення, надання правової допомоги та виконання вимог законодавства."],
   ["4. Адвокатська таємниця","Інформація, отримана в межах звернення, становить адвокатську таємницю і не розголошується третім особам, крім випадків, передбачених законом."],
   ["5. Строк зберігання","Дані зберігаються не довше, ніж це необхідно для досягнення мети обробки або встановлено законом."],
   ["6. Ваші права","Ви маєте право знати про обробку ваших даних, вимагати їх виправлення чи видалення та відкликати згоду. Для цього напишіть на "+S.email+"."],
   ["7. Файли cookie","Сайт може використовувати технічні cookie для коректної роботи та запамʼятовування мовних налаштувань."]
  ]:[
   ["1. General","This policy explains how attorney Oksana Melekhova (the “Attorney”) processes personal data of website visitors in accordance with the Law of Ukraine “On Personal Data Protection”."],
   ["2. Data I collect","Name, phone number."],
   ["3. Purpose","Contacting you about your request, providing legal assistance and complying with legal requirements."],
   ["4. Attorney–client privilege","Information received in connection with your request is privileged and is not disclosed to third parties except as required by law."],
   ["5. Retention","Data is kept no longer than necessary for its purpose or as required by law."],
   ["6. Your rights","You may request information about processing, correction or deletion of your data, and withdraw consent by writing to "+S.email+"."],
   ["7. Cookies","The site may use technical cookies to function correctly and remember your language setting."]
  ];
  return `<div class="fh"><img class="f-pgglow" src="img/f/glow-09.svg" alt="" aria-hidden="true" style="left:640px;top:-100px;width:800px">
  <i class="f-pgring" style="left:870px;top:-300px;width:760px;height:760px"></i><i class="f-pgring" style="left:970px;top:-200px;width:560px;height:560px"></i><i class="f-pgring" style="left:1070px;top:-100px;width:360px;height:360px"></i>
<section class="f-lh"><nav class="f-crumbs" aria-label="breadcrumbs"><a href="${href("holovna")}">Головна</a><span class="sep">/</span><span aria-current="page">${u("privacy")}</span></nav><h1>${u("privacy")}</h1><p>${uk?"Редакція від 13 листопада 2026 року":"Version of 13 November 2026"}</p></section>
<section class="f-lw"><div class="f-legal">${secs.map(x=>`<div><h2>${x[0]}</h2><p>${x[1]}</p></div>`).join("")}</div></section></div>`;
};

PAGES["404"]=()=>`<div class="fh"><img class="f-pgglow" src="img/f/glow-10.svg" alt="" aria-hidden="true" style="left:151px;top:-100px;width:1138px">
<i class="f-pgring" style="left:270px;top:-270px;width:900px;height:900px"></i><i class="f-pgring" style="left:390px;top:-150px;width:660px;height:660px"></i><i class="f-pgring" style="left:510px;top:-30px;width:420px;height:420px"></i>
<section class="f-nf"><div class="f-nf-code">404</div><h1>Сторінку не знайдено</h1><p>Можливо, її перенесли або адреса введена з помилкою. Перейдіть на головну або оберіть послугу.</p>
<div class="f-nf-acts">${fBtn("На головну","dark",`href="${href("holovna")}"`)}${fBtn("Послуги","lightb",`href="${href("poslugy")}"`)}</div>
<small>Можливо, ви шукали</small>
<div class="f-nf-links">${[["Міграційні спори","migratsiyni-spory"],["Сімейні спори","simeini-spory"],["Кримінальні справи","kryminalni-spravy"],["Новини","novyny"],["Корисні посилання","korysni-posylannia"],["Контакти","kontakty"]].map(([l,k])=>`<a href="${href(k)}">${l}</a>`).join("")}</div>
</section></div>`;

/* ---------- chrome: header, footer, fab, modal ---------- */
const logoHTML=(cls="")=>`<a class="logo ${cls}" href="${href("holovna")}" aria-label="${t(S.brand)} ${t(S.name)}"><img class="logo-emb" src="img/logo-emblem.png" alt="" width="86" height="52"><span class="logo-txt"><span>${state.lang==="uk"?"Адвокатське бюро":"Law Office of"}</span><b>${state.lang==="uk"?"Оксани Мелехової":"Oksana Melekhova"}</b></span></a>`;
function header(active){
  const svcActive=active==="poslugy"||!!svcBy(active);
  const navLinks=[["pro-advokata","about"],["novyny","news"],["korysni-posylannia","links"],["kontakty","contacts"]];
  const langLink=l=>{const cur=state.page;return "#"+(l==="en"?"en-":"")+cur;};
  return `<header class="hdr"><div class="wrap"><div class="hdr-bar">
  ${logoHTML()}
  <nav class="nav" aria-label="main">
    <div class="dd"><a href="${href("poslugy")}" class="${svcActive?"active":""}" aria-haspopup="true">${u("services")} ${ic("down")}</a>
      <div class="mega">${SV.map(s=>`<a href="${href(s.slug)}"><span class="mi">${ic(s.icon)}</span><span><b>${t(s.t)}</b><small>${fmtN(s.cases)}+ ${u("cases")}</small></span></a>`).join("")}<a class="all" href="${href("poslugy")}"><b>${u("allServices")}</b>${ic("right").replace("<svg","<svg style='width:18px;height:18px'")}</a></div>
    </div>
    ${navLinks.map(([k,l])=>`<a href="${href(k)}" class="${active===k||(k==="novyny"&&active.startsWith("novyny-"))?"active":""}">${u(l)}</a>`).join("")}
  </nav>
  <div class="hdr-right">
    <div class="lang"><a href="${langLink("uk")}" class="${state.lang==="uk"?"on":""}" hreflang="uk">UA</a><a href="${langLink("en")}" class="${state.lang==="en"?"on":""}" hreflang="en">EN</a></div>
    <a class="hdr-phone" href="${S.phoneHref}">${S.phone}</a>
    <button class="btn btn-dark btn-sm" data-modal>${u("contactLawyer")}${arr()}</button>
    <button class="burger" data-burger aria-label="${u("menu")}">${ic("menu")}</button>
  </div>
</div></div></header>
<div class="mnav" data-mnav aria-hidden="true">
  <div class="mnav-top">${logoHTML()}<button class="burger" style="display:grid" data-burger-close aria-label="${u("close")}">${ic("close")}</button></div>
  <div class="mnav-list">
    <a href="${href("holovna")}">${u("home")}</a>
    <div class="acc"><button class="acc-btn" data-acc>${u("services")} ${ic("plus")}</button><div class="acc-panel"><div><div class="lst">${SV.map(s=>`<a href="${href(s.slug)}">${ic(s.icon)}${t(s.t)}</a>`).join("")}<a href="${href("poslugy")}" style="color:var(--ink)">${ic("right")}${u("allServices")}</a></div></div></div></div>
    ${navLinks.map(([k,l])=>`<a href="${href(k)}">${u(l)} ${ic("arrow").replace("<svg","<svg style='width:20px;height:20px'")}</a>`).join("")}
  </div>
  <div class="mnav-foot">
    <div class="lang" style="justify-self:start"><a href="${langLink("uk")}" class="${state.lang==="uk"?"on":""}">UA</a><a href="${langLink("en")}" class="${state.lang==="en"?"on":""}">EN</a></div>
    <a href="${S.phoneHref}" style="font-size:22px;font-weight:700">${S.phone}</a>
    ${msgrBtns()}
  </div>
</div>`;
}

function footer(){
  return `<footer class="f-foot-wrap"><div class="f-foot">
  <div class="f-foot-top">
    <div class="f-foot-cta"><p><span class="m">Правова проблема?</span> Допоможу<span class="m"> розібратися.</span></p><a class="f-btn f-btn-light" href="#" data-modal>Звʼязатися з адвокатом${fArrow("d")}</a></div>
    <div class="f-foot-col"><h4>Контакти</h4><ul><li><a href="${S.phoneHref}">+380-96-391-08-98</a></li><li><a href="mailto:${S.email}">info@melekhova.law</a></li><li>м. Київ, вул. Кирилівська, 31-Б</li></ul>
      <div class="f-soc"><a href="${S.tg}" aria-label="Telegram" target="_blank" rel="noopener">${brand("tg")}</a><a href="${S.viber}" aria-label="Viber">${brand("vb")}</a><a href="${S.wa}" aria-label="WhatsApp" target="_blank" rel="noopener">${brand("wa")}</a></div></div>
    <div class="f-foot-col"><h4>Графік роботи</h4><ul><li>Пн – Пт: 09:00 – 19:00</li><li>Сб - Нд: за домовленістю</li></ul></div>
    <div class="f-foot-col"><h4>Меню</h4><ul><li><a href="${href("poslugy")}">Послуги</a></li><li><a href="${href("pro-advokata")}">Про адвоката</a></li><li><a href="${href("novyny")}">Новини</a></li><li><a href="${href("korysni-posylannia")}">Корисні посилання</a></li><li><a href="${href("kontakty")}">Контакти</a></li></ul></div>
  </div>
  <div class="f-foot-bot">${logoHTML("on-dark-logo")}<span>© 2026 Оксана Мелехова. Усі права захищено.</span><a href="${href("polityka-konfidentsiinosti")}">Політика конфіденційності</a></div>
</div></footer>`;
}

function chrome(){
  return `
<div class="fab" data-fab>
  <div class="fab-list">
    <a href="${S.tg}" target="_blank" rel="noopener">Telegram <span class="fi c-tg">${brand("tg")}</span></a>
    <a href="${S.viber}">Viber <span class="fi c-vb">${brand("vb")}</span></a>
    <a href="${S.wa}" target="_blank" rel="noopener">WhatsApp <span class="fi c-wa">${brand("wa")}</span></a>
    <a href="${S.phoneHref}">${u("call")} <span class="fi c-ph">${ic("phone")}</span></a>
  </div>
  <button class="fab-main" data-fab-btn aria-label="${u("contactLawyer")}" aria-expanded="false">${ic("chat")}</button>
</div>
<div class="mbar"><a class="call" href="${S.phoneHref}">${ic("phone")} ${u("call")}</a><button class="write" data-modal>${ic("chat")} ${u("write")}</button></div>
<div class="modal" data-modal-root role="dialog" aria-modal="true" aria-labelledby="mt">
  <div class="modal-box">
    <button class="modal-x" data-modal-close aria-label="${u("close")}">${ic("close")}</button>
    <h2 class="h3" id="mt" style="font-size:28px;padding-right:50px">${u("contactLawyer")}</h2>
    <p class="muted" style="margin:6px 0 0">${u("chooseWay")}</p>
    <div class="ways">
      <a href="${S.tg}" target="_blank" rel="noopener"><span class="fi c-tg">${brand("tg")}</span>Telegram</a>
      <a href="${S.viber}"><span class="fi c-vb">${brand("vb")}</span>Viber</a>
      <a href="${S.wa}" target="_blank" rel="noopener"><span class="fi c-wa">${brand("wa")}</span>WhatsApp</a>
      <a href="${S.phoneHref}"><span class="fi c-ph">${ic("phone")}</span>${u("call")}</a>
    </div>
    <p style="text-align:center;margin:-8px 0 18px;font-weight:700">${S.phone}</p>
    <div class="divider">${u("orForm")}</div>
    <div data-modal-form></div>
  </div>
</div>`;
}

/* ---------- render ---------- */
const app=document.getElementById("app");
function parse(){
  let h=decodeURIComponent(location.hash.replace(/^#/,""));
  let lang="uk";
  if(h==="en"||h.startsWith("en-")){lang="en";h=h==="en"?"":h.slice(3);}
  else if(!h){const saved=store.get("lang");if(saved==="en")lang="en";}
  return {lang,page:h||"holovna"};
}
const TITLES={holovna:"home",poslugy:"services","pro-advokata":"about",novyny:"news","korysni-posylannia":"links",kontakty:"contacts","polityka-konfidentsiinosti":"privacy"};
function render(){
  const {lang,page}=parse();
  const pageChanged=page!==state.page;
  state.lang=lang;state.page=page;store.set("lang",lang);
  document.documentElement.lang=lang==="uk"?"uk":"en";
  let html,title;
  const svc=svcBy(page);
  if(PAGES[page]&&page!=="404"){html=PAGES[page]();title=page==="holovna"?`${t(S.name)} — ${state.lang==="uk"?"адвокат у Києві":"attorney in Kyiv"}`:`${u(TITLES[page])} — ${t(S.name)}`;}
  else if(svc){html=svcPage(svc);title=`${t(svc.t)} — ${state.lang==="uk"?"адвокат у Києві":"attorney in Kyiv"} | ${t(S.name)}`;}
  else if(page.startsWith("novyny-")&&NEWS.find(n=>"novyny-"+n.slug===page)){const n=NEWS.find(n=>"novyny-"+n.slug===page);html=articlePage(n);title=`${t(n.t)} | ${t(S.name)}`;}
  else {html=PAGES["404"]();title=`404 — ${t(S.name)}`;}
  document.title=title;
  app.innerHTML=header(page)+`<main id="main">${html}</main>`+footer()+chrome();
  bind();
  if(pageChanged) window.scrollTo({top:0,behavior:"instant"});
}

/* ---------- behaviour ---------- */
let io;
function bind(){
  // reveal + counters
  io&&io.disconnect();
  io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}}),{threshold:.12,rootMargin:"0px 0px -40px 0px"});
  app.querySelectorAll(".rv").forEach(el=>io.observe(el));
  const cio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){countUp(e.target);cio.unobserve(e.target);}}),{threshold:.5});
  app.querySelectorAll("[data-count]").forEach(el=>cio.observe(el));

  // mega menu toggle on click for touch/keyboard
  app.querySelectorAll(".dd>a").forEach(a=>a.addEventListener("click",e=>{if(matchMedia("(hover:none)").matches&&!a.parentElement.classList.contains("open")){e.preventDefault();a.parentElement.classList.add("open");}}));

  // burger
  const mnav=app.querySelector("[data-mnav]");
  app.querySelector("[data-burger]")?.addEventListener("click",()=>{mnav.classList.add("open");mnav.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";});
  const closeNav=()=>{mnav.classList.remove("open");mnav.setAttribute("aria-hidden","true");document.body.style.overflow="";};
  app.querySelector("[data-burger-close]")?.addEventListener("click",closeNav);
  mnav.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeNav));
  app.querySelectorAll("[data-acc]").forEach(b=>b.addEventListener("click",()=>b.parentElement.classList.toggle("open")));

  // faq
  app.querySelectorAll(".q button").forEach(b=>b.addEventListener("click",()=>{const q=b.parentElement,open=!q.classList.contains("open");q.classList.toggle("open",open);b.setAttribute("aria-expanded",open);}));

  // fab
  const fab=app.querySelector("[data-fab]"),fb=app.querySelector("[data-fab-btn]");
  fb.addEventListener("click",e=>{e.stopPropagation();const o=!fab.classList.contains("open");fab.classList.toggle("open",o);fb.setAttribute("aria-expanded",o);fb.innerHTML=ic(o?"close":"chat");});
  document.onclick=e=>{if(!fab.contains(e.target)&&fab.classList.contains("open")){fab.classList.remove("open");fb.innerHTML=ic("chat");}};

  // modal
  const modal=app.querySelector("[data-modal-root]");
  app.querySelectorAll("[data-modal]").forEach(b=>b.addEventListener("click",e=>{e.preventDefault();openModal(b.dataset.topic);}));
  modal.querySelector("[data-modal-close]").addEventListener("click",closeModal);
  modal.addEventListener("click",e=>{if(e.target===modal)closeModal();});

  // forms
  app.querySelectorAll("[data-carousel]").forEach(bindCarousel);
  app.querySelectorAll("[data-form]").forEach(bindForm);
  app.querySelector("[data-quick]")?.addEventListener("submit",e=>{
    e.preventDefault();const v=e.target.phone.value.trim();
    if(v.replace(/\D/g,"").length<9){e.target.phone.focus();e.target.style.borderColor="#c0392b";return;}
    e.target.style.borderColor="";openModal("",v);
  });

  // news filter / pager
  app.querySelector("[data-news-filter]")?.addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;state.newsCat=b.dataset.cat;state.newsPage=1;rerenderMain();});
  app.querySelector("[data-pager]")?.addEventListener("click",e=>{const b=e.target.closest("button");if(!b||b.disabled)return;state.newsPage=+b.dataset.p;rerenderMain();window.scrollTo({top:0,behavior:"smooth"});});

  // links
  const lq=app.querySelector("[data-link-q]");
  lq?.addEventListener("input",()=>{state.linkQ=lq.value;app.querySelector("[data-link-list]").innerHTML=linksList();});
  app.querySelector("[data-link-filter]")?.addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;state.linkCat=b.dataset.cat;app.querySelectorAll("[data-link-filter] button").forEach(x=>x.classList.toggle("on",x===b));app.querySelector("[data-link-list]").innerHTML=linksList();});
}
function rerenderMain(){const y=window.scrollY;render();window.scrollTo(0,y);}
function openModal(topic,phone){
  const modal=app.querySelector("[data-modal-root]");
  const holder=modal.querySelector("[data-modal-form]");
  holder.innerHTML=formHTML({sel:topic,noMsg:true});
  const f=holder.querySelector("form");bindForm(f);
  if(phone) f.phone.value=phone;
  modal.classList.add("open");document.body.style.overflow="hidden";
  setTimeout(()=>(phone?f.name:modal.querySelector(".modal-x")).focus(),50);
}
function closeModal(){const m=app.querySelector("[data-modal-root]");m.classList.remove("open");document.body.style.overflow="";}
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeModal();const f=app.querySelector("[data-fab]");if(f){f.classList.remove("open");}}});

function bindCarousel(c){
  const tr=c.querySelector(".f-rel-track"),bs=c.querySelectorAll(".f-rel-btn");
  const step=()=>{const card=tr.querySelector(".f-scard");return card?card.getBoundingClientRect().width+14:300;};
  const upd=()=>{bs[0].disabled=tr.scrollLeft<4;bs[1].disabled=tr.scrollLeft+tr.clientWidth>=tr.scrollWidth-4;};
  bs.forEach(b=>b.addEventListener("click",()=>tr.scrollBy({left:step()*+b.dataset.dir,behavior:"smooth"})));
  tr.addEventListener("scroll",upd,{passive:true});addEventListener("resize",upd);upd();
  let down=false,x0=0,s0=0,moved=false;
  tr.addEventListener("pointerdown",e=>{if(e.pointerType!=="mouse")return;down=true;moved=false;x0=e.clientX;s0=tr.scrollLeft;tr.classList.add("drag");});
  addEventListener("pointermove",e=>{if(!down)return;const dx=e.clientX-x0;if(Math.abs(dx)>4)moved=true;tr.scrollLeft=s0-dx;});
  addEventListener("pointerup",()=>{if(!down)return;down=false;tr.classList.remove("drag");});
  tr.addEventListener("click",e=>{if(moved){e.preventDefault();e.stopPropagation();moved=false;}},true);
  tr.addEventListener("dragstart",e=>e.preventDefault());
}
function bindForm(f){
  f.addEventListener("submit",e=>{
    e.preventDefault();let ok=true;
    f.querySelectorAll("[data-req]").forEach(fd=>{const inp=fd.querySelector("input");const v=inp.value.trim();const bad=fd.dataset.req==="phone"?v.replace(/\D/g,"").length<9:v.length<2;fd.classList.toggle("err",bad);if(bad)ok=false;});
    const c=f.querySelector(".consent");const cb=c.querySelector("input");c.classList.toggle("err",!cb.checked);if(!cb.checked)ok=false;
    if(!ok){f.querySelector(".err input")?.focus();return;}
    f.classList.add("sent");
  });
  f.querySelectorAll("input").forEach(i=>i.addEventListener("input",()=>i.closest(".field,.consent")?.classList.remove("err")));
}
function countUp(el){
  const end=+el.dataset.count;if(!end)return;
  if(matchMedia("(prefers-reduced-motion:reduce)").matches){el.textContent=fmtN(end);return;}
  const dur=1300,st=performance.now();
  const step=now=>{const p=Math.min(1,(now-st)/dur);const v=Math.round(end*(1-Math.pow(1-p,3)));el.textContent=fmtN(v);if(p<1)requestAnimationFrame(step);};
  requestAnimationFrame(step);
}

window.addEventListener("hashchange",render);
render();
})();
