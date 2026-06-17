// ============================================================
// МЕРКЕ АГРО — APP LOGIC
// ============================================================

// ===== STATE =====
let D = null;          // active data object (loaded from GitHub or DEF)
let L = 'kk';         // current language
let adminLang = 'kk'; // admin panel language tab
let editingProd = -1, editingTeam = -1, editingNews = -1, editingFaq = -1;
const PASS = 'merke2026';
const REPO_OWNER = 'yeaska0';
const REPO_NAME = 'merke-agro';
const DATA_FILE = 'data.json';

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  const saved = localStorage.getItem('merke_lang');
  if (saved) L = saved;
  if (localStorage.getItem('merke_dark') === '1') {
    document.body.classList.add('dark');
    document.getElementById('dark-btn').textContent = '☀️';
  }
});

// ===== DATA LOAD =====
async function loadData() {
  try {
    const url = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/${DATA_FILE}?t=${Date.now()}`;
    const r = await fetch(url);
    if (r.ok) D = await r.json();
    else D = deepClone(DEF);
  } catch {
    D = deepClone(DEF);
  }
  render();
}

function deepClone(obj) { return JSON.parse(JSON.stringify(obj)); }

// ===== RENDER =====
function render() {
  renderHero();
  renderAbout();
  renderStatsBar();
  renderProducts();
  renderWhy();
  renderTeam();
  renderNews();
  renderCerts();
  renderFaq();
  renderContact();
  renderFooter();
  setLang(L);
}

function t(obj) { return obj[L] || obj['kk'] || ''; }

// ===== HERO =====
function renderHero() {
  const h = D.hero;
  el('hbadge').textContent = t(h).badge || '';
  el('hero-title').innerHTML = {
    kk:'<span>МЕРКЕ АГРО</span> КОМПЛЕКС',
    ru:'<span>МЕРКЕ АГРО</span> КОМПЛЕКС',
    en:'<span>MERKE AGRO</span> COMPLEX'
  }[L];
  el('hero-desc').textContent = t(h).desc || '';

  el('hv1t').textContent = {kk:'Астық өндіру',ru:'Производство зерна',en:'Grain Production'}[L];
  el('hv1d').textContent = {kk:'5000+ га егістік',ru:'5000+ га пашни',en:'5000+ ha arable'}[L];
  el('hv2t').textContent = {kk:'Мал шаруашылығы',ru:'Животноводство',en:'Livestock'}[L];
  el('hv2d').textContent = {kk:'500+ мал басы',ru:'500+ голов скота',en:'500+ head'}[L];
  el('hv3t').textContent = {kk:'Сүт өнімдері',ru:'Молочные продукты',en:'Dairy'}[L];
  el('hv3d').textContent = {kk:'Дәстүрлі рецептпен',ru:'По традиционным рецептам',en:'Traditional recipes'}[L];

  const sEl = el('hero-stats');
  sEl.innerHTML = '';
  (D.stats || []).forEach(s => {
    sEl.innerHTML += `<div class="hstat"><div class="hnum">${s.num}</div><div class="hlbl">${s[L]||s.kk}</div></div>`;
  });
}

// ===== ABOUT =====
function renderAbout() {
  const a = D.about;
  el('ab-year').textContent = a.year || '';
  el('ab-lbl').textContent = t(a).lbl || '';
  el('ab-tag').textContent = t(a).tag || '';
  el('ab-title').textContent = t(a).title || '';
  el('ab-desc').textContent = t(a).desc || '';
  const feats = el('ab-feats');
  feats.innerHTML = '';
  (t(a).feats || []).forEach(f => {
    feats.innerHTML += `<div class="featrow"><div class="fico">${f.i}</div><div><div class="ftitle">${f.t}</div><div class="fdesc">${f.d}</div></div></div>`;
  });
}

// ===== STATS BAR =====
function renderStatsBar() {
  const sb = el('statsbar');
  sb.innerHTML = '';
  (D.stats || []).forEach(s => {
    sb.innerHTML += `<div class="sbar-item"><div class="sbar-num">${s.num}</div><div class="sbar-lbl">${s[L]||s.kk}</div></div>`;
  });
}

// ===== PRODUCTS =====
function renderProducts() {
  el('pt-tag').textContent = {kk:'🛍️ Өнімдер',ru:'🛍️ Продукция',en:'🛍️ Products'}[L];
  el('pt-title').textContent = {kk:'Біздің өнімдер',ru:'Наша продукция',en:'Our Products'}[L];
  el('pt-desc').textContent = {kk:'Тікелей фермадан — сапалы, табиғи өнімдер',ru:'Прямо с фермы — качественные натуральные продукты',en:'Directly from the farm — quality natural products'}[L];
  const g = el('pgrid');
  g.innerHTML = '';
  (D.products || []).forEach(p => {
    const pt = p[L] || p.kk;
    const tags = (pt.tags||'').split(',').map(tg => `<span class="ptag">${tg.trim()}</span>`).join('');
    g.innerHTML += `<div class="pcard">
      <div class="pchead ${p.color||'grain'}">
        <div class="pcico">${p.icon||'🌾'}</div>
        <span class="pctg">${p.color==='grain'?{kk:'Астық',ru:'Зерно',en:'Grain'}[L]:p.color==='meat'?{kk:'Ет',ru:'Мясо',en:'Meat'}[L]:{kk:'Сүт',ru:'Молоко',en:'Dairy'}[L]}</span>
      </div>
      <div class="pcbody">
        <h3>${pt.title||''}</h3>
        <p>${pt.desc||''}</p>
        <div class="ptags">${tags}</div>
        <div class="pfoot">
          <span class="pprice">${pt.price||''}</span>
          <button class="pbtn" onclick="goTo('contact')">${{kk:'Тапсырыс',ru:'Заказать',en:'Order'}[L]}</button>
        </div>
      </div>
    </div>`;
  });
}

// ===== WHY US =====
function renderWhy() {
  const w = D.why;
  el('wy-tag').textContent = t(w).tag || '';
  el('wy-title').textContent = t(w).title || '';
  const g = el('wgrid');
  g.innerHTML = '';
  (t(w).items || []).forEach(it => {
    g.innerHTML += `<div class="wcard"><div class="wico">${it.i}</div><h4>${it.t}</h4><p>${it.d}</p></div>`;
  });
}

// ===== TEAM =====
function renderTeam() {
  el('tm-tag').textContent = {kk:'👥 Команда',ru:'👥 Команда',en:'👥 Team'}[L];
  el('tm-title').textContent = {kk:'Біздің команда',ru:'Наша команда',en:'Our Team'}[L];
  el('tm-desc').textContent = {kk:'Тәжірибелі мамандар командасы',ru:'Команда опытных специалистов',en:'Our team of experienced specialists'}[L];
  const g = el('tgrid');
  g.innerHTML = '';
  (D.team || []).forEach(m => {
    const mt = m[L] || m.kk;
    g.innerHTML += `<div class="tmcard">
      <div class="tmav">${m.icon||'👤'}</div>
      <h3>${m.name||''}</h3>
      <div class="tmrole">${mt.role||''}</div>
      <div class="tmdesc">${mt.desc||''}</div>
      <span class="tmsince">${{kk:'Бастап',ru:'С',en:'Since'}[L]} ${m.since||''}</span>
    </div>`;
  });
}

// ===== NEWS =====
function renderNews() {
  el('nw-tag').textContent = {kk:'📰 Жаңалықтар',ru:'📰 Новости',en:'📰 News'}[L];
  el('nw-title').textContent = {kk:'Соңғы жаңалықтар',ru:'Последние новости',en:'Latest News'}[L];
  const g = el('ngrid');
  g.innerHTML = '';
  (D.news || []).forEach(n => {
    const nt = n[L] || n.kk;
    g.innerHTML += `<div class="ncard">
      <div class="nchead">
        <div class="ncico">${n.icon||'📰'}</div>
        <span class="ncdate">${nt.date||''}</span>
      </div>
      <div class="ncbody"><h3>${nt.title||''}</h3><p>${nt.desc||''}</p></div>
    </div>`;
  });
}

// ===== GALLERY =====
function renderGallery() {
  el('gl-tag').textContent = {kk:'📸 Галерея',ru:'📸 Галерея',en:'📸 Gallery'}[L];
  el('gl-title').textContent = {kk:'Фото галерея',ru:'Фотогалерея',en:'Photo Gallery'}[L];
}

// ===== CERTS =====
function renderCerts() {
  el('ce-tag').textContent = {kk:'📜 Сертификаттар',ru:'📜 Сертификаты',en:'📜 Certifications'}[L];
  el('ce-title').textContent = {kk:'Сертификаттар мен стандарттар',ru:'Сертификаты и стандарты',en:'Certifications & Standards'}[L];
  el('ce1').textContent = {kk:'Азық-түлік қауіпсіздігі стандарты',ru:'Стандарт безопасности пищевых продуктов',en:'Food safety management standard'}[L];
  el('ce2').textContent = {kk:'Қауіптер мен бақылау нүктелері анализі',ru:'Анализ рисков и критических точек',en:'Hazard analysis critical control points'}[L];
  el('ce3').textContent = {kk:'Мемлекеттік стандарт',ru:'Государственный стандарт',en:'State quality standard'}[L];
  el('ce4h').textContent = {kk:'Эко сертификат',ru:'Эко сертификат',en:'Eco Certified'}[L];
  el('ce4').textContent = {kk:'Органикалық өндіріс',ru:'Органическое производство',en:'Organic production'}[L];
}

// ===== FAQ =====
function renderFaq() {
  el('fq-tag').textContent = {kk:'❓ FAQ',ru:'❓ FAQ',en:'❓ FAQ'}[L];
  el('fq-title').textContent = {kk:'Жиі қойылатын сұрақтар',ru:'Часто задаваемые вопросы',en:'Frequently Asked Questions'}[L];
  const list = el('faqlist');
  list.innerHTML = '';
  (D.faq || []).forEach((f, i) => {
    const ft = f[L] || f.kk;
    list.innerHTML += `<div class="faqitem" id="faq-${i}">
      <div class="faqq" onclick="toggleFaq(${i})">${ft.q||''}<span class="arr">▼</span></div>
      <div class="faqa">${ft.a||''}</div>
    </div>`;
  });
}
function toggleFaq(i) {
  const item = el(`faq-${i}`);
  item.classList.toggle('open');
}

// ===== CONTACT =====
function renderContact() {
  const c = D.contact || {};
  el('ct-tag').textContent = {kk:'📞 Байланыс',ru:'📞 Контакты',en:'📞 Contact'}[L];
  el('ct-title').textContent = {kk:'Бізбен байланысыңыз',ru:'Свяжитесь с нами',en:'Get in Touch'}[L];
  el('ci1h').textContent = {kk:'Мекенжай',ru:'Адрес',en:'Address'}[L];
  el('ci1v').textContent = c[`addr_${L}`] || c.addr_kk || '';
  el('ci2h').textContent = {kk:'Телефон',ru:'Телефон',en:'Phone'}[L];
  el('ci2v').textContent = `${c.phone1||''} | ${c.phone2||''}`;
  el('ci3h').textContent = {kk:'Email',ru:'Email',en:'Email'}[L];
  el('ci3v').textContent = `${c.email1||''} | ${c.email2||''}`;
  el('ci4h').textContent = {kk:'Жұмыс уақыты',ru:'Режим работы',en:'Working Hours'}[L];
  el('ci4v').textContent = `${c.wd||''} / ${c.ws||''}`;
  el('ci-map').textContent = c[`addr_${L}`] || c.addr_kk || '';
  // form labels
  el('fl1').textContent = {kk:'Аты-жөніңіз',ru:'Ваше имя',en:'Your Name'}[L];
  el('fl2').textContent = {kk:'Телефон',ru:'Телефон',en:'Phone'}[L];
  el('fl3').textContent = {kk:'Тақырып',ru:'Тема',en:'Subject'}[L];
  el('fl4').textContent = {kk:'Хабарлама',ru:'Сообщение',en:'Message'}[L];
  el('fl5').textContent = {kk:'Жіберу',ru:'Отправить',en:'Send'}[L];
  el('fo1').textContent = {kk:'Тапсырыс беру',ru:'Сделать заказ',en:'Place an Order'}[L];
  el('fo2').textContent = {kk:'Жеткізу туралы сұрақ',ru:'Вопрос по доставке',en:'Delivery Question'}[L];
  el('fo3').textContent = {kk:'Серіктестік',ru:'Партнёрство',en:'Partnership'}[L];
  el('fo4').textContent = {kk:'Басқа',ru:'Другое',en:'Other'}[L];
  el('finp-subj').selectedIndex = 0;
}

// ===== FOOTER =====
function renderFooter() {
  const c = D.contact || {};
  el('fdesc').textContent = {kk:'Қазақстандағы ең ірі агро кешендерінің бірі. Табиғи өнімдер, заманауи технология.',ru:'Один из крупнейших агрокомплексов Казахстана. Натуральные продукты, современные технологии.',en:'One of Kazakhstan\'s largest agro complexes. Natural products, modern technology.'}[L];
  el('fc1h').textContent = {kk:'Бөлімдер',ru:'Разделы',en:'Sections'}[L];
  el('fc1l').innerHTML = ['about','products','team','contact'].map(s => `<li onclick="goTo('${s}')">${{about:{kk:'Ферма',ru:'Ферма',en:'Farm'},products:{kk:'Өнімдер',ru:'Продукция',en:'Products'},team:{kk:'Команда',ru:'Команда',en:'Team'},contact:{kk:'Байланыс',ru:'Контакты',en:'Contact'}}[s][L]}</li>`).join('');
  el('fc2h').textContent = {kk:'Өнімдер',ru:'Продукция',en:'Products'}[L];
  el('fc2l').innerHTML = [{kk:'Астық',ru:'Зерно',en:'Grain'},{kk:'Ет',ru:'Мясо',en:'Meat'},{kk:'Сүт',ru:'Молоко',en:'Dairy'}].map(x => `<li>${x[L]}</li>`).join('');
  el('fc3h').textContent = {kk:'Байланыс',ru:'Контакты',en:'Contacts'}[L];
  el('fc3l').innerHTML = `<li>${c.phone1||''}</li><li>${c.phone2||''}</li><li>${c.email1||''}</li>`;
  el('fcopy').textContent = `© 2026 Мерке Агро Комплекс. ${L==='kk'?'Барлық құқықтар қорғалған':L==='ru'?'Все права защищены':'All rights reserved'}.`;
  el('floc').textContent = {kk:'Мерке, Жамбыл облысы',ru:'Мерке, Жамбылская область',en:'Merke, Zhambyl Region'}[L];
}

// ===== LANG =====
function setLang(lang) {
  L = lang;
  localStorage.setItem('merke_lang', L);
  document.querySelectorAll('.lbtn').forEach((b, i) => {
    b.classList.toggle('active', ['kk','ru','en'][i] === L);
  });
  // nav links
  el('nl1').textContent = {kk:'Ферма туралы',ru:'О ферме',en:'About'}[L];
  el('nl-hist').textContent = {kk:'Тарих',ru:'История',en:'History'}[L];
  el('nl2').textContent = {kk:'Өнімдер',ru:'Продукция',en:'Products'}[L];
  el('nl3').textContent = {kk:'Команда',ru:'Команда',en:'Team'}[L];
  el('nl4').textContent = {kk:'Жаңалықтар',ru:'Новости',en:'News'}[L];
  el('nl5').textContent = {kk:'FAQ',ru:'FAQ',en:'FAQ'}[L];
  el('nl6').textContent = {kk:'Байланыс',ru:'Контакты',en:'Contact'}[L];
  el('nl-cta').textContent = {kk:'Хабарласу',ru:'Связаться',en:'Contact Us'}[L];
  el('hb1').textContent = {kk:'Өнімдерді көру',ru:'Смотреть продукцию',en:'View Products'}[L];
  el('hb2').textContent = {kk:'Бізбен байланысу',ru:'Связаться с нами',en:'Contact Us'}[L];
  render();
}

// ===== DARK MODE =====
function toggleDark() {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  el('dark-btn').textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('merke_dark', isDark ? '1' : '0');
}

// ===== NAVIGATION =====
function goTo(id) {
  const target = document.getElementById(id);
  if (target) target.scrollIntoView({behavior:'smooth',block:'start'});
}

// ===== CONTACT FORM =====
async function submitForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.bsub');
  const suc = el('fsuc');
  btn.disabled = true;
  btn.textContent = '⏳...';
  const data = {
    name: el('finp-name').value,
    phone: el('finp-phone').value,
    subject: el('finp-subj').value,
    message: el('finp-msg').value,
    date: new Date().toISOString(),
    lang: L,
  };
  try {
    const r = await fetch('/api/submit', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data) });
    const json = await r.json();
    if (json.success) {
      suc.textContent = {kk:'✅ Хабарламаңыз жіберілді! Жақын арада хабарласамыз.',ru:'✅ Сообщение отправлено! Скоро свяжемся с вами.',en:'✅ Message sent! We will contact you soon.'}[L];
      suc.classList.add('show');
      e.target.reset();
      setTimeout(() => suc.classList.remove('show'), 6000);
    } else throw new Error(json.error);
  } catch {
    suc.textContent = {kk:'⚠️ Қате! Телефон арқылы хабарласыңыз.',ru:'⚠️ Ошибка! Свяжитесь по телефону.',en:'⚠️ Error! Please contact us by phone.'}[L];
    suc.classList.add('show');
  } finally {
    btn.disabled = false;
    btn.textContent = {kk:'Жіберу',ru:'Отправить',en:'Send'}[L];
  }
}

// ===== ADMIN LOGIN =====
function showLogin() {
  el('lsub').textContent = {kk:'Сайтты басқару үшін кіріңіз',ru:'Войдите для управления сайтом',en:'Log in to manage the website'}[L];
  el('lbtn-ok').textContent = {kk:'Кіру',ru:'Войти',en:'Login'}[L];
  el('lbtn-no').textContent = {kk:'Болдырмау',ru:'Отмена',en:'Cancel'}[L];
  el('merr').style.display = 'none';
  el('pwdinput').value = '';
  el('loginModal').classList.add('show');
  setTimeout(() => el('pwdinput').focus(), 100);
}
function hideLogin() {
  el('loginModal').classList.remove('show');
}
function doLogin() {
  if (el('pwdinput').value === PASS) {
    hideLogin();
    openAdmin();
  } else {
    const errEl = el('merr');
    errEl.textContent = {kk:'Қате пароль',ru:'Неверный пароль',en:'Wrong password'}[L];
    errEl.style.display = 'block';
    el('pwdinput').value = '';
    setTimeout(() => el('pwdinput').focus(), 50);
  }
}

// ===== ADMIN PANEL =====
function openAdmin() {
  el('adminPanel').classList.add('show');
  showSec('dash');
  loadAdminDash();
  loadAdminFarm();
  loadAdminStats();
  loadAdminProds();
  loadAdminTeam();
  loadAdminNews();
  loadAdminFaq();
  loadAdminCont();
  loadMessages();
}
function closeAdmin() {
  el('adminPanel').classList.remove('show');
}

function showSec(id) {
  document.querySelectorAll('.asec').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.ani').forEach(n => n.classList.remove('active'));
  el(`sec-${id}`).classList.add('active');
  const idx = ['dash','farm','astats','aprods','ateam','anews','afaq','acont','msgs'].indexOf(id);
  document.querySelectorAll('.ani')[idx]?.classList.add('active');
}

// ===== ADMIN NAV LANGUAGE TABS =====
function switchLT(btn, lang) {
  const tabs = btn.closest('.ltabs').querySelectorAll('.ltab');
  tabs.forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  adminLang = lang;
  const sec = btn.closest('.asec');
  if (!sec) return;
  const id = sec.id;
  if (id === 'sec-farm') loadAdminFarm();
  if (id === 'sec-astats') loadAdminStats();
  if (id === 'sec-aprods') loadAdminProds();
  if (id === 'sec-ateam') loadAdminTeam();
  if (id === 'sec-anews') loadAdminNews();
  if (id === 'sec-afaq') loadAdminFaq();
}

// ===== DASHBOARD =====
function loadAdminDash() {
  el('d-prods').textContent = (D.products || []).length;
  el('d-news').textContent = (D.news || []).length;
  el('d-team').textContent = (D.team || []).length;
  el('d-faq').textContent = (D.faq || []).length;
}

// ===== FARM EDIT =====
function loadAdminFarm() {
  const al = adminLang;
  el('f-badge').value = (D.hero[al] || D.hero.kk).badge || '';
  el('f-hdesc').value = (D.hero[al] || D.hero.kk).desc || '';
  el('f-year').value = D.about.year || '';
  el('f-area').value = D.about.area || '';
  el('f-atitle').value = (D.about[al] || D.about.kk).title || '';
  el('f-adesc').value = (D.about[al] || D.about.kk).desc || '';
  const feats = (D.about[al] || D.about.kk).feats || [];
  el('feats-edit').innerHTML = feats.map((f, i) => `
    <div style="display:grid;grid-template-columns:40px 1fr 1fr;gap:.4rem;margin-bottom:.4rem">
      <input value="${f.i}" id="fi${i}" style="text-align:center;padding:.3rem;border:1px solid var(--border);border-radius:6px;background:var(--bg2);color:var(--text);font-family:inherit"/>
      <input value="${f.t}" id="ft${i}" placeholder="Тақырып" style="padding:.3rem .6rem;border:1px solid var(--border);border-radius:6px;background:var(--bg2);color:var(--text);font-family:inherit"/>
      <input value="${f.d}" id="fd${i}" placeholder="Сипаттама" style="padding:.3rem .6rem;border:1px solid var(--border);border-radius:6px;background:var(--bg2);color:var(--text);font-family:inherit"/>
    </div>`).join('');
}
function saveFarm() {
  const al = adminLang;
  if (!D.hero[al]) D.hero[al] = {};
  D.hero[al].badge = el('f-badge').value;
  D.hero[al].desc = el('f-hdesc').value;
  D.about.year = el('f-year').value;
  D.about.area = el('f-area').value;
  if (!D.about[al]) D.about[al] = {};
  D.about[al].title = el('f-atitle').value;
  D.about[al].desc = el('f-adesc').value;
  const feats = (D.about[al] || D.about.kk).feats || [];
  D.about[al].feats = feats.map((f, i) => ({
    i: el(`fi${i}`)?.value || f.i,
    t: el(`ft${i}`)?.value || f.t,
    d: el(`fd${i}`)?.value || f.d,
  }));
  render();
  save('farm-saved');
}

// ===== STATS EDIT =====
function loadAdminStats() {
  const al = adminLang;
  const c = el('stats-edit');
  c.innerHTML = '';
  (D.stats || []).forEach((s, i) => {
    c.innerHTML += `<div class="afrow" style="margin-bottom:.6rem">
      <div class="afg"><label>Сан ${i+1}</label><input id="sn${i}" value="${s.num||''}"/></div>
      <div class="afg"><label>Мәтін (${al.toUpperCase()})</label><input id="sl${i}" value="${s[al]||s.kk||''}"/></div>
    </div>`;
  });
}
function saveStats() {
  const al = adminLang;
  (D.stats || []).forEach((s, i) => {
    if (el(`sn${i}`)) s.num = el(`sn${i}`).value;
    if (el(`sl${i}`)) s[al] = el(`sl${i}`).value;
  });
  render();
  save('stats-saved');
}

// ===== PRODUCTS EDIT =====
function loadAdminProds() {
  const list = el('prods-list');
  list.innerHTML = '';
  (D.products || []).forEach((p, i) => {
    const pt = p[adminLang] || p.kk;
    list.innerHTML += `<div class="ali-row">
      <div class="ali-ico">${p.icon||'🌾'}</div>
      <div class="ali-body"><div class="ali-title">${pt.title||''}</div><div class="ali-sub">${pt.price||''}</div></div>
      <div class="ali-btns">
        <button class="aedit" onclick="editProd(${i})">${{kk:'Өңдеу',ru:'Ред.',en:'Edit'}[adminLang]}</button>
        <button class="adel" onclick="delProd(${i})">✕</button>
      </div>
    </div>`;
  });
}
function editProd(i) {
  editingProd = i;
  const p = D.products[i];
  const pt = p[adminLang] || p.kk;
  el('pe-icon').value = p.icon || '';
  el('pe-color').value = p.color || '';
  el('pe-title').value = pt.title || '';
  el('pe-desc').value = pt.desc || '';
  el('pe-tags').value = pt.tags || '';
  el('pe-price').value = pt.price || '';
  el('prod-edit-form').classList.add('show');
}
function addProd() {
  editingProd = -1;
  el('pe-icon').value = '🌾';
  el('pe-color').value = 'grain';
  el('pe-title').value = '';
  el('pe-desc').value = '';
  el('pe-tags').value = '';
  el('pe-price').value = '';
  el('prod-edit-form').classList.add('show');
}
function saveProd() {
  const al = adminLang;
  const obj = {
    icon: el('pe-icon').value,
    color: el('pe-color').value,
    kk: editingProd >= 0 ? (D.products[editingProd].kk || {}) : {},
    ru: editingProd >= 0 ? (D.products[editingProd].ru || {}) : {},
    en: editingProd >= 0 ? (D.products[editingProd].en || {}) : {},
  };
  obj[al] = { title: el('pe-title').value, desc: el('pe-desc').value, tags: el('pe-tags').value, price: el('pe-price').value };
  if (editingProd >= 0) D.products[editingProd] = obj;
  else D.products.push(obj);
  loadAdminProds();
  loadAdminDash();
  cancelProdEdit();
  render();
  save();
}
function delProd(i) {
  if (!confirm({kk:'Жоюға сенімдісіз бе?',ru:'Вы уверены?',en:'Are you sure?'}[adminLang])) return;
  D.products.splice(i, 1);
  loadAdminProds();
  loadAdminDash();
  render();
  save();
}
function cancelProdEdit() { el('prod-edit-form').classList.remove('show'); editingProd = -1; }

// ===== TEAM EDIT =====
function loadAdminTeam() {
  const list = el('team-list');
  list.innerHTML = '';
  (D.team || []).forEach((m, i) => {
    const mt = m[adminLang] || m.kk;
    list.innerHTML += `<div class="ali-row">
      <div class="ali-ico">${m.icon||'👤'}</div>
      <div class="ali-body"><div class="ali-title">${m.name||''}</div><div class="ali-sub">${mt.role||''}</div></div>
      <div class="ali-btns">
        <button class="aedit" onclick="editTeam(${i})">${{kk:'Өңдеу',ru:'Ред.',en:'Edit'}[adminLang]}</button>
        <button class="adel" onclick="delTeam(${i})">✕</button>
      </div>
    </div>`;
  });
}
function editTeam(i) {
  editingTeam = i;
  const m = D.team[i];
  const mt = m[adminLang] || m.kk;
  el('te-icon').value = m.icon || '';
  el('te-name').value = m.name || '';
  el('te-role').value = mt.role || '';
  el('te-since').value = m.since || '';
  el('te-desc').value = mt.desc || '';
  el('team-edit-form').classList.add('show');
}
function addTeam() {
  editingTeam = -1;
  el('te-icon').value = '👤';
  el('te-name').value = '';
  el('te-role').value = '';
  el('te-since').value = '';
  el('te-desc').value = '';
  el('team-edit-form').classList.add('show');
}
function saveTeam() {
  const al = adminLang;
  const base = editingTeam >= 0 ? D.team[editingTeam] : { kk:{}, ru:{}, en:{} };
  const obj = { ...base, icon: el('te-icon').value, name: el('te-name').value, since: el('te-since').value };
  obj[al] = { role: el('te-role').value, desc: el('te-desc').value };
  if (editingTeam >= 0) D.team[editingTeam] = obj;
  else D.team.push(obj);
  loadAdminTeam();
  loadAdminDash();
  cancelTeamEdit();
  render();
  save();
}
function delTeam(i) {
  if (!confirm({kk:'Жоюға сенімдісіз бе?',ru:'Вы уверены?',en:'Are you sure?'}[adminLang])) return;
  D.team.splice(i, 1);
  loadAdminTeam();
  loadAdminDash();
  render();
  save();
}
function cancelTeamEdit() { el('team-edit-form').classList.remove('show'); editingTeam = -1; }

// ===== NEWS EDIT =====
function loadAdminNews() {
  const list = el('news-list');
  list.innerHTML = '';
  (D.news || []).forEach((n, i) => {
    const nt = n[adminLang] || n.kk;
    list.innerHTML += `<div class="ali-row">
      <div class="ali-ico">${n.icon||'📰'}</div>
      <div class="ali-body"><div class="ali-title">${nt.title||''}</div><div class="ali-sub">${nt.date||''}</div></div>
      <div class="ali-btns">
        <button class="aedit" onclick="editNews(${i})">${{kk:'Өңдеу',ru:'Ред.',en:'Edit'}[adminLang]}</button>
        <button class="adel" onclick="delNews(${i})">✕</button>
      </div>
    </div>`;
  });
}
function editNews(i) {
  editingNews = i;
  const n = D.news[i];
  const nt = n[adminLang] || n.kk;
  el('ne-icon').value = n.icon || '';
  el('ne-date').value = nt.date || '';
  el('ne-title').value = nt.title || '';
  el('ne-desc').value = nt.desc || '';
  el('news-edit-form').classList.add('show');
}
function addNews() {
  editingNews = -1;
  el('ne-icon').value = '📰';
  el('ne-date').value = '';
  el('ne-title').value = '';
  el('ne-desc').value = '';
  el('news-edit-form').classList.add('show');
}
function saveNews() {
  const al = adminLang;
  const base = editingNews >= 0 ? D.news[editingNews] : { kk:{}, ru:{}, en:{} };
  const obj = { ...base, icon: el('ne-icon').value };
  obj[al] = { date: el('ne-date').value, title: el('ne-title').value, desc: el('ne-desc').value };
  if (editingNews >= 0) D.news[editingNews] = obj;
  else D.news.push(obj);
  loadAdminNews();
  loadAdminDash();
  cancelNewsEdit();
  render();
  save();
}
function delNews(i) {
  if (!confirm({kk:'Жоюға сенімдісіз бе?',ru:'Вы уверены?',en:'Are you sure?'}[adminLang])) return;
  D.news.splice(i, 1);
  loadAdminNews();
  loadAdminDash();
  render();
  save();
}
function cancelNewsEdit() { el('news-edit-form').classList.remove('show'); editingNews = -1; }

// ===== FAQ EDIT =====
function loadAdminFaq() {
  const list = el('faq-list');
  list.innerHTML = '';
  (D.faq || []).forEach((f, i) => {
    const ft = f[adminLang] || f.kk;
    list.innerHTML += `<div class="ali-row">
      <div class="ali-ico">❓</div>
      <div class="ali-body"><div class="ali-title">${ft.q||''}</div></div>
      <div class="ali-btns">
        <button class="aedit" onclick="editFaq(${i})">${{kk:'Өңдеу',ru:'Ред.',en:'Edit'}[adminLang]}</button>
        <button class="adel" onclick="delFaq(${i})">✕</button>
      </div>
    </div>`;
  });
}
function editFaq(i) {
  editingFaq = i;
  const f = D.faq[i];
  const ft = f[adminLang] || f.kk;
  el('fqe-q').value = ft.q || '';
  el('fqe-a').value = ft.a || '';
  el('faq-edit-form').classList.add('show');
}
function addFaq() {
  editingFaq = -1;
  el('fqe-q').value = '';
  el('fqe-a').value = '';
  el('faq-edit-form').classList.add('show');
}
function saveFaq() {
  const al = adminLang;
  const base = editingFaq >= 0 ? D.faq[editingFaq] : { kk:{}, ru:{}, en:{} };
  const obj = { ...base };
  obj[al] = { q: el('fqe-q').value, a: el('fqe-a').value };
  if (editingFaq >= 0) D.faq[editingFaq] = obj;
  else D.faq.push(obj);
  loadAdminFaq();
  loadAdminDash();
  cancelFaqEdit();
  render();
  save();
}
function delFaq(i) {
  if (!confirm({kk:'Жоюға сенімдісіз бе?',ru:'Вы уверены?',en:'Are you sure?'}[adminLang])) return;
  D.faq.splice(i, 1);
  loadAdminFaq();
  loadAdminDash();
  render();
  save();
}
function cancelFaqEdit() { el('faq-edit-form').classList.remove('show'); editingFaq = -1; }

// ===== CONTACT EDIT =====
function loadAdminCont() {
  const c = D.contact || {};
  el('c-phone1').value = c.phone1 || '';
  el('c-phone2').value = c.phone2 || '';
  el('c-email1').value = c.email1 || '';
  el('c-email2').value = c.email2 || '';
  el('c-addr-kk').value = c.addr_kk || '';
  el('c-addr-ru').value = c.addr_ru || '';
  el('c-addr-en').value = c.addr_en || '';
  el('c-wd').value = c.wd || '';
  el('c-ws').value = c.ws || '';
}
function saveCont() {
  if (!D.contact) D.contact = {};
  D.contact.phone1 = el('c-phone1').value;
  D.contact.phone2 = el('c-phone2').value;
  D.contact.email1 = el('c-email1').value;
  D.contact.email2 = el('c-email2').value;
  D.contact.addr_kk = el('c-addr-kk').value;
  D.contact.addr_ru = el('c-addr-ru').value;
  D.contact.addr_en = el('c-addr-en').value;
  D.contact.wd = el('c-wd').value;
  D.contact.ws = el('c-ws').value;
  render();
  save('cont-saved');
}

// ===== LIVE UPDATE (hero badge/desc) =====
function liveUpdate() {
  const al = adminLang;
  if (!D.hero[al]) D.hero[al] = {};
  D.hero[al].badge = el('f-badge').value;
  D.hero[al].desc = el('f-hdesc').value;
  renderHero();
}

// ===== MESSAGES =====
async function loadMessages() {
  try {
    const url = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/submissions.json?t=${Date.now()}`;
    const r = await fetch(url);
    if (!r.ok) { el('msgs-list').innerHTML = '<p style="color:var(--mu);padding:1rem">Хабарламалар жоқ</p>'; return; }
    const msgs = await r.json();
    el('msgs-count').textContent = `Барлығы: ${msgs.length} хабарлама`;
    const badge = el('msg-badge');
    if (msgs.length > 0) { badge.textContent = msgs.length; badge.style.display = 'inline'; }
    if (!msgs.length) { el('msgs-list').innerHTML = '<p style="color:var(--mu);padding:1rem">Хабарламалар жоқ</p>'; return; }
    el('msgs-list').innerHTML = [...msgs].reverse().map(m => `
      <div class="msg-card">
        <div class="msg-head">
          <span class="msg-name">👤 ${m.name||'—'}</span>
          <span class="msg-date">${m.date ? new Date(m.date).toLocaleDateString('kk-KZ') : ''}</span>
        </div>
        <div class="msg-subj">📋 ${m.subject||'—'}</div>
        <div class="msg-txt">${m.message||''}</div>
        <div class="msg-phone">📞 ${m.phone||''}</div>
      </div>`).join('');
  } catch {
    el('msgs-list').innerHTML = '<p style="color:var(--mu);padding:1rem">Жүктеу қатесі</p>';
  }
}

// ===== SAVE TO GITHUB via /api/save =====
async function save(savedId) {
  const el2 = savedId ? document.getElementById(savedId) : null;
  if (el2) { el2.textContent = '⏳ Жариялануда...'; el2.classList.add('show'); }
  try {
    const r = await fetch('/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(D)
    });
    const json = await r.json();
    if (!json.success) throw new Error(json.error || 'Қате');
    if (el2) {
      el2.textContent = '✅ Сайтқа жарияланды!';
      setTimeout(() => { el2.classList.remove('show'); el2.textContent = '✅ Сақталды'; }, 4000);
    }
  } catch(e) {
    if (el2) el2.classList.remove('show');
    alert('Қате: ' + e.message);
  }
}

// ===== HELPERS =====
function el(id) { return document.getElementById(id); }
