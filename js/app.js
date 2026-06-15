// ============================================================
// МЕРКЕ АГРО — APP LOGIC
// ============================================================
// ============================================================
// STATE
// ============================================================
let D = JSON.parse(JSON.stringify(DEF));
let L = 'kk';
let adminLang = 'kk';
let editProdIdx = -1, editTeamIdx = -1, editNewsIdx = -1, editFaqIdx = -1;

const GH_OWNER = 'yeaska0', GH_REPO = 'merke-agro', GH_FILE = 'data.json';

async function loadData() {
  try {
    const r = await fetch(`https://raw.githubusercontent.com/${GH_OWNER}/${GH_REPO}/main/${GH_FILE}?t=${Date.now()}`);
    if (r.ok) D = await r.json();
  } catch(e) {}
  render(); setLang(L);
}

async function save(savedId) {
  const token = localStorage.getItem('ghToken');
  if (!token) {
    const t = prompt('GitHub токенін енгізіңіз:');
    if (!t) return;
    localStorage.setItem('ghToken', t);
  }
  const tok = localStorage.getItem('ghToken');
  const el = savedId ? document.getElementById(savedId) : null;
  if (el) { el.textContent = '⏳ Жариялануда...'; el.classList.add('show'); }
  try {
    const info = await fetch(`https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/${GH_FILE}`,
      { headers: { 'Authorization': `token ${tok}`, 'Accept': 'application/vnd.github.v3+json' } }).then(r=>r.json());
    if (info.message) throw new Error(info.message);
    const content = btoa(unescape(encodeURIComponent(JSON.stringify(D, null, 2))));
    const res = await fetch(`https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/${GH_FILE}`, {
      method: 'PUT',
      headers: { 'Authorization': `token ${tok}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Admin update ' + new Date().toISOString(), content, sha: info.sha })
    }).then(r=>r.json());
    if (!res.content) throw new Error(res.message || 'Қате');
    if (el) { el.textContent = '✅ Сайтқа жарияланды!'; setTimeout(()=>{ el.classList.remove('show'); el.textContent='✅ Сақталды'; }, 4000); }
  } catch(e) {
    if (el) { el.classList.remove('show'); }
    alert('Қате: ' + e.message);
  }
}

// ============================================================
// NAVIGATION
// ============================================================
function goTo(id) {
  const el = document.getElementById(id);
  if(el) { window.scrollTo({top: el.offsetTop - 67, behavior:'smooth'}); }
}

window.addEventListener('scroll', () => {
  document.getElementById('navbar').style.boxShadow = window.scrollY > 10 ? '0 2px 20px rgba(0,0,0,.09)' : 'none';
});

// ============================================================
// LANGUAGE
// ============================================================
function setLang(l) {
  L = l;
  document.querySelectorAll('.lbtn').forEach((b,i) => b.classList.toggle('active',['kk','ru','en'][i]===l));
  render();
}

// ============================================================
// RENDER ALL
// ============================================================
function render() {
  const l = L;
  const h = D.hero[l];
  const a = D.about[l];
  // Hero
  document.getElementById('hbadge').textContent = h.badge;
  document.getElementById('hero-title').innerHTML = l==='en'?'MERKE AGRO<br><span style="color:var(--go)">COMPLEX</span>':'МЕРКЕ АГРО<br><span style="color:var(--go)">КОМПЛЕКС</span>';
  document.getElementById('hero-desc').textContent = h.desc;
  const hbtns = {kk:['Өнімдерді қарау','Хабарласу'],ru:['Посмотреть продукцию','Связаться'],en:['View Products','Contact Us']};
  document.getElementById('hb1').textContent = hbtns[l][0];
  document.getElementById('hb2').textContent = hbtns[l][1];
  // Hero stats
  const hs = document.getElementById('hero-stats');
  hs.innerHTML = D.stats.map(s=>`<div class="hsc"><div class="sn">${s.num}</div><div class="sl">${s[l]}</div></div>`).join('');
  // Hero visual
  const hvt = {kk:['Астық өндірісі','Мал шаруашылығы','Сүт өнімдері'],ru:['Производство зерна','Животноводство','Молочные продукты'],en:['Grain Production','Livestock Farming','Dairy Products']};
  const hvd = {kk:['Бидай, арпа, сұлы — жоғары сапалы','Ірі қара, қой — сапалы ет өнімдері','Таза сүт, қымыз, айран, сары май'],ru:['Пшеница, ячмень, овёс — высокое качество','КРС, овцы — качественное мясо','Натуральное молоко, кумыс, айран, масло'],en:['Wheat, barley, oats — premium quality','Cattle, sheep — quality meat products','Fresh milk, kumiss, ayran, butter']};
  [1,2,3].forEach(i=>{ document.getElementById(`hv${i}t`).textContent=hvt[l][i-1]; document.getElementById(`hv${i}d`).textContent=hvd[l][i-1]; });
  // About
  document.getElementById('ab-tag').textContent = a.tag;
  document.getElementById('ab-year').textContent = D.about.year;
  document.getElementById('ab-lbl').innerHTML = a.lbl;
  document.getElementById('ab-title').textContent = a.title;
  document.getElementById('ab-desc').textContent = a.desc;
  document.getElementById('ab-feats').innerHTML = a.feats.map(f=>`<div class="feat"><div class="fi">${f.i}</div><div class="ft"><h4>${f.t}</h4><p>${f.d}</p></div></div>`).join('');
  // Stats bar
  document.getElementById('statsbar').innerHTML = D.stats.map(s=>`<div class="sbi"><div class="n">${s.num}</div><div class="l">${s[l]}</div></div>`).join('');
  // Products
  const pt = {kk:['Өнімдеріміз','Табиғи, сапалы өнімдер','Барлық өнімдеріміз Мерке жерінде өсіріліп, заманауи өндіріс орындарында дайындалады.'],ru:['Наша продукция','Натуральные, качественные продукты','Вся продукция выращивается на землях Мерке и изготавливается на современных объектах.'],en:['Our Products','Natural, Quality Products','All our products are grown on Merke land and prepared at modern facilities.']};
  document.getElementById('pt-tag').textContent = pt[l][0];
  document.getElementById('pt-title').textContent = pt[l][1];
  document.getElementById('pt-desc').textContent = pt[l][2];
  document.getElementById('pgrid').innerHTML = D.products.map(p=>`
    <div class="pcard">
      <div class="pimg ${p.color}">${p.icon}</div>
      <div class="pbody">
        <h3>${p[l].title}</h3>
        <p>${p[l].desc}</p>
        <div class="ptags">${p[l].tags.split(',').map(t=>`<span class="ptag">${t.trim()}</span>`).join('')}</div>
        <div class="pprice">💰 ${p[l].price}</div>
      </div>
    </div>`).join('');
  // Why
  const wy = D.why[l];
  document.getElementById('wy-tag').textContent = wy.tag;
  document.getElementById('wy-title').textContent = wy.title;
  document.getElementById('wgrid').innerHTML = wy.items.map(w=>`<div class="wcard"><div class="wicon">${w.i}</div><h3>${w.t}</h3><p>${w.d}</p></div>`).join('');
  // Team
  const tm = {kk:['Біздің команда','Тәжірибелі мамандар командасы','Мерке Агро Комплексін жетекшілейтін және дамытатын арнайы мамандар.'],ru:['Наша команда','Команда опытных специалистов','Специалисты, руководящие и развивающие Мерке Агро Комплекс.'],en:['Our Team','A Team of Experienced Specialists','The dedicated professionals who lead and develop Merke Agro Complex.']};
  document.getElementById('tm-tag').textContent = tm[l][0];
  document.getElementById('tm-title').textContent = tm[l][1];
  document.getElementById('tm-desc').textContent = tm[l][2];
  document.getElementById('tgrid').innerHTML = D.team.map(t=>`<div class="tcard"><div class="tav">${t.icon}</div><div class="tbody"><h3>${t.name}</h3><div class="role">${t[l].role}</div><div class="since">${{kk:'бастап',ru:'с',en:'since'}[l]} ${t.since}</div><div class="tdesc">${t[l].desc}</div></div></div>`).join('');
  // Gallery
  const gl = {kk:['Галерея','Фермамыздан суреттер'],ru:['Галерея','Фотографии с фермы'],en:['Gallery','Photos from our farm']};
  document.getElementById('gl-tag').textContent = gl[l][0];
  document.getElementById('gl-title').textContent = gl[l][1];
  // News
  const nw = {kk:['Жаңалықтар','Соңғы жаңалықтар'],ru:['Новости','Последние новости'],en:['News','Latest News']};
  document.getElementById('nw-tag').textContent = nw[l][0];
  document.getElementById('nw-title').textContent = nw[l][1];
  document.getElementById('ngrid').innerHTML = D.news.map((n,i)=>`
    <div class="ncard" onclick="openNews(${i})">
      <div class="nimg ${n.ni}">${n.icon}</div>
      <div class="nbody">
        <div class="ndate">${n[l].date}</div>
        <h3>${n[l].title}</h3>
        <p>${n[l].desc.substring(0,100)}...</p>
        <span class="nread">${{kk:'Толығырақ оқу →',ru:'Читать далее →',en:'Read more →'}[l]}</span>
      </div>
    </div>`).join('');
  // Certs
  const ce = {kk:['Сертификаттар','Халықаралық стандарттар'],ru:['Сертификаты','Международные стандарты'],en:['Certifications','International Standards']};
  document.getElementById('ce-tag').textContent = ce[l][0];
  document.getElementById('ce-title').textContent = ce[l][1];
  const ced = {kk:['Тамақ қауіпсіздігі менеджментінің халықаралық стандарты','Қауіпті факторларды талдау жүйесі','Қазақстандық ұлттық стандарт','Экологиялық таза өндіріс'],ru:['Международный стандарт управления безопасностью пищевых продуктов','Система анализа опасных факторов','Казахстанский национальный стандарт','Экологически чистое производство'],en:['International food safety management standard','Hazard analysis and critical control points','Kazakhstani national standard','Eco-friendly production certification']};
  const ceh = {kk:'Эко өнім',ru:'Эко продукт',en:'Eco Product'};
  document.getElementById('ce1').textContent = ced[l][0];
  document.getElementById('ce2').textContent = ced[l][1];
  document.getElementById('ce3').textContent = ced[l][2];
  document.getElementById('ce4h').textContent = ceh[l];
  document.getElementById('ce4').textContent = ced[l][3];
  // FAQ
  const fq = {kk:['Жиі қойылатын сұрақтар','FAQ'],ru:['Часто задаваемые вопросы','FAQ'],en:['Frequently Asked Questions','FAQ']};
  document.getElementById('fq-tag').textContent = fq[l][1];
  document.getElementById('fq-title').textContent = fq[l][0];
  document.getElementById('faqlist').innerHTML = D.faq.map((f,i)=>`
    <div class="fqi" id="fqi${i}">
      <div class="fqq" onclick="toggleFaq(${i})"><span>${f[l].q}</span><span class="fqarr">▼</span></div>
      <div class="fqa"><div class="fqai">${f[l].a}</div></div>
    </div>`).join('');
  // Contact
  const ct = {kk:['Байланыс','Бізбен байланысыңыз'],ru:['Контакты','Свяжитесь с нами'],en:['Contact','Get in Touch']};
  document.getElementById('ct-tag').textContent = ct[l][0];
  document.getElementById('ct-title').textContent = ct[l][1];
  const ch = {kk:['Мекенжай','Телефон','Email','Жұмыс уақыты'],ru:['Адрес','Телефон','Email','Режим работы'],en:['Address','Phone','Email','Working Hours']};
  [1,2,3,4].forEach(i=>document.getElementById(`ci${i}h`).textContent=ch[l][i-1]);
  document.getElementById('ci1v').textContent = D.contact[`addr_${l}`];
  document.getElementById('ci2v').innerHTML = `${D.contact.phone1}<br/>${D.contact.phone2}`;
  document.getElementById('ci3v').innerHTML = `${D.contact.email1}<br/>${D.contact.email2}`;
  document.getElementById('ci4v').innerHTML = `${D.contact.wd}<br/>${D.contact.ws}`;
  document.getElementById('ci-map').textContent = {kk:'Мерке, Жамбыл облысы',ru:'Мерке, Жамбылская область',en:'Merke, Zhambyl Region'}[l];
  // Form labels
  const fl = {kk:['Аты-жөніңіз','Телефон','Тақырып','Хабарлама','Жіберу'],ru:['Ваше имя','Телефон','Тема','Сообщение','Отправить'],en:['Your Name','Phone','Subject','Message','Send']};
  [1,2,3,4,5].forEach(i=>document.getElementById(`fl${i}`)[i===5?'textContent':'textContent']=fl[l][i-1]);
  const fo = {kk:['Өнімге тапсырыс','Ынтымақтастық','Баға сұрау','Басқа'],ru:['Заказ продукции','Сотрудничество','Запрос цены','Другое'],en:['Product Order','Partnership','Price Inquiry','Other']};
  [1,2,3,4].forEach(i=>document.getElementById(`fo${i}`).textContent=fo[l][i-1]);
  // Nav
  const nav = {kk:['Ферма туралы','Өнімдер','Команда','Жаңалықтар','FAQ','Байланыс','Хабарласу'],ru:['О ферме','Продукция','Команда','Новости','FAQ','Контакты','Связаться'],en:['About','Products','Team','News','FAQ','Contact','Contact Us']};
  [1,2,3,4,5,6].forEach(i=>document.getElementById(`nl${i}`).textContent=nav[l][i-1]);
  document.getElementById('nl-cta').textContent=nav[l][6];
  // Footer
  const fd = {kk:'Жамбыл облысының жүрегінде орналасқан, табиғи өнімдер өндіруші ірі агрокомплекс. 2004 жылдан бері халыққа қызмет етеміз.',ru:'Крупный агрокомплекс в сердце Жамбылской области, производящий натуральные продукты. Обслуживаем население с 2004 года.',en:'A large agro complex in the heart of Zhambyl region producing natural products. Serving since 2004.'};
  document.getElementById('fdesc').textContent = fd[l];
  document.getElementById('fc1h').textContent = {kk:'Өнімдер',ru:'Продукция',en:'Products'}[l];
  document.getElementById('fc1l').innerHTML = D.products.map(p=>`<li><a onclick="goTo('products')">${p[l].title}</a></li>`).join('');
  document.getElementById('fc2h').textContent = {kk:'Компания',ru:'Компания',en:'Company'}[l];
  document.getElementById('fc2l').innerHTML = [['about',{kk:'Ферма туралы',ru:'О ферме',en:'About Farm'}],['news',{kk:'Жаңалықтар',ru:'Новости',en:'News'}],['team',{kk:'Команда',ru:'Команда',en:'Team'}],['faq',{kk:'FAQ',ru:'FAQ',en:'FAQ'}]].map(([id,names])=>`<li><a onclick="goTo('${id}')">${names[l]}</a></li>`).join('');
  document.getElementById('fc3h').textContent = {kk:'Байланыс',ru:'Контакты',en:'Contact'}[l];
  document.getElementById('fc3l').innerHTML = `<li><a>${D.contact.phone1}</a></li><li><a>${D.contact.email1}</a></li><li><a onclick="goTo('contact')">${{kk:'Бізге жазу',ru:'Написать нам',en:'Write to us'}[l]}</a></li>`;
  document.getElementById('fcopy').textContent = `© 2026 ${l==='en'?'Merke Agro Complex':'Мерке Агро Комплекс'}. ${{kk:'Барлық құқықтар қорғалған.',ru:'Все права защищены.',en:'All rights reserved.'}[l]}`;
  document.getElementById('floc').textContent = {kk:'Мерке, Жамбыл облысы, Қазақстан',ru:'Мерке, Жамбылская область, Казахстан',en:'Merke, Zhambyl Region, Kazakhstan'}[l];
}

// ============================================================
// FAQ TOGGLE
// ============================================================
function toggleFaq(i) {
  const el = document.getElementById(`fqi${i}`);
  el.classList.toggle('open');
}

// ============================================================
// NEWS MODAL (simple alert replacement)
// ============================================================
function openNews(i) {
  const n = D.news[i][L];
  alert(`📰 ${n.title}\n\n${n.date}\n\n${n.desc}`);
}

// ============================================================
// CONTACT FORM
// ============================================================
async function submitForm(e) {
  e.preventDefault();
  const btn = document.getElementById('fl5');
  const el = document.getElementById('fsuc');
  const sending = {kk:'⏳ Жіберілуде...', ru:'⏳ Отправляем...', en:'⏳ Sending...'};
  const success = {kk:'✅ Хабарламаңыз жіберілді! Жақын арада хабарласамыз.', ru:'✅ Сообщение отправлено! Скоро свяжемся.', en:'✅ Message sent! We will contact you soon.'};
  const errMsg = {kk:'❌ Қате болды. Телефон арқылы хабарласыңыз.', ru:'❌ Ошибка. Свяжитесь по телефону.', en:'❌ Error. Please contact us by phone.'};
  btn.disabled = true;
  btn.textContent = sending[L];
  try {
    const payload = {
      name: document.getElementById('finp-name').value,
      phone: document.getElementById('finp-phone').value,
      subject: document.getElementById('finp-subj').value,
      message: document.getElementById('finp-msg').value
    };
    const r = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (r.ok) {
      el.textContent = success[L]; el.style.color = 'var(--g)';
      document.getElementById('cntform').reset();
    } else { el.textContent = errMsg[L]; el.style.color = '#c62828'; }
  } catch(err) {
    el.textContent = errMsg[L]; el.style.color = '#c62828';
  }
  el.style.display = 'block';
  btn.disabled = false;
  btn.textContent = {kk:'Жіберу',ru:'Отправить',en:'Send'}[L];
  setTimeout(()=>{ el.style.display='none'; }, 6000);
}

// ============================================================
// DARK MODE
// ============================================================
function toggleDark() {
  const isDark = document.body.classList.toggle('dark');
  document.getElementById('dark-btn').textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('darkMode', isDark ? '1' : '0');
}
(function() {
  if(localStorage.getItem('darkMode') === '1') {
    document.body.classList.add('dark');
    const btn = document.getElementById('dark-btn');
    if(btn) btn.textContent = '☀️';
  }
})();

// ============================================================
// ADMIN LOGIN
// ============================================================
const PASS = 'merke2026';
function showLogin() {
  const hints = {kk:`Кіру үшін: ${PASS}`,ru:`Для входа: ${PASS}`,en:`Password: ${PASS}`};
  document.getElementById('lsub').textContent = {kk:'Сайтты басқару үшін кіріңіз',ru:'Войдите для управления сайтом',en:'Log in to manage the website'}[L];
  document.getElementById('mhint').textContent = hints[L];
  document.getElementById('lbtn-ok').textContent = {kk:'Кіру',ru:'Войти',en:'Login'}[L];
  document.getElementById('lbtn-no').textContent = {kk:'Болдырмау',ru:'Отмена',en:'Cancel'}[L];
  document.getElementById('merr').style.display='none';
  document.getElementById('pwdinput').value='';
  document.getElementById('loginModal').classList.add('show');
  setTimeout(()=>document.getElementById('pwdinput').focus(), 100);
}
function hideLogin() { document.getElementById('loginModal').classList.remove('show'); }
function doLogin() {
  const v = document.getElementById('pwdinput').value;
  if(v === PASS) { hideLogin(); openAdmin(); }
  else {
    const err = document.getElementById('merr');
    err.textContent = {kk:'Қате құпия сөз!',ru:'Неверный пароль!',en:'Wrong password!'}[L];
    err.style.display='block';
  }
}

// ============================================================
// ADMIN PANEL
// ============================================================
function openAdmin() {
  document.getElementById('adminPanel').classList.add('show');
  loadAdminData();
  updateDashboard();
}
function closeAdmin() {
  document.getElementById('adminPanel').classList.remove('show');
  render();
}
function showSec(id) {
  document.querySelectorAll('.asec').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.ani').forEach(a=>a.classList.remove('active'));
  document.getElementById(`sec-${id}`).classList.add('active');
  const map = {dash:0,farm:1,astats:2,aprods:3,ateam:4,anews:5,afaq:6,acont:7,msgs:8};
  document.querySelectorAll('.ani')[map[id]].classList.add('active');
  if (id === 'msgs') loadMsgs();
}
function switchLT(btn, lang) {
  btn.closest('.asec').querySelectorAll('.ltab').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  adminLang = lang;
  loadAdminData();
}
function showSaved(id) {
  const el = document.getElementById(id);
  el.classList.add('show');
  setTimeout(()=>el.classList.remove('show'), 2500);
}
function updateDashboard() {
  document.getElementById('d-prods').textContent = D.products.length;
  document.getElementById('d-news').textContent = D.news.length;
  document.getElementById('d-team').textContent = D.team.length;
  document.getElementById('d-faq').textContent = D.faq.length;
}

function loadAdminData() {
  const l = adminLang;
  // Farm
  if(document.getElementById('f-badge')) {
    document.getElementById('f-badge').value = D.hero[l].badge;
    document.getElementById('f-hdesc').value = D.hero[l].desc;
    document.getElementById('f-year').value = D.about.year;
    document.getElementById('f-area').value = D.about.area;
    document.getElementById('f-atitle').value = D.about[l].title;
    document.getElementById('f-adesc').value = D.about[l].desc;
    document.getElementById('feats-edit').innerHTML = D.about[l].feats.map((f,i)=>`
      <div style="display:grid;grid-template-columns:60px 1fr 1fr;gap:.5rem;margin-bottom:.5rem;align-items:center">
        <input value="${f.i}" onchange="D.about['${l}'].feats[${i}].i=this.value" style="padding:6px;border:1.5px solid #ddd;border-radius:6px;font-size:14px;text-align:center"/>
        <input value="${f.t}" onchange="D.about['${l}'].feats[${i}].t=this.value" style="padding:6px;border:1.5px solid #ddd;border-radius:6px;font-size:13px"/>
        <input value="${f.d}" onchange="D.about['${l}'].feats[${i}].d=this.value" style="padding:6px;border:1.5px solid #ddd;border-radius:6px;font-size:13px"/>
      </div>`).join('');
  }
  // Stats
  if(document.getElementById('stats-edit')) {
    document.getElementById('stats-edit').innerHTML = D.stats.map((s,i)=>`
      <div class="acard" style="margin-bottom:.75rem">
        <div class="afrow">
          <div class="afg"><label>Сан (${i+1})</label><input value="${s.num}" onchange="D.stats[${i}].num=this.value"/></div>
          <div class="afg"><label>Жазба (${l.toUpperCase()})</label><input value="${s[l]}" onchange="D.stats[${i}]['${l}']=this.value"/></div>
        </div>
      </div>`).join('');
  }
  // Products list
  if(document.getElementById('prods-list')) {
    document.getElementById('prods-list').innerHTML = D.products.map((p,i)=>`
      <div class="aitem">
        <div class="aiinfo"><div class="aiico">${p.icon}</div><div><div class="ainame">${p[l].title}</div><div class="aisub">${p[l].tags}</div></div></div>
        <div class="aibtns"><button class="bedit" onclick="editProd(${i})">✏️ Өзгерту</button><button class="bdel" onclick="delProd(${i})">🗑️ Жою</button></div>
      </div>`).join('');
  }
  // Team list
  if(document.getElementById('team-list')) {
    document.getElementById('team-list').innerHTML = D.team.map((t,i)=>`
      <div class="aitem">
        <div class="aiinfo"><div class="aiico">${t.icon}</div><div><div class="ainame">${t.name}</div><div class="aisub">${t[l].role} · ${t.since}</div></div></div>
        <div class="aibtns"><button class="bedit" onclick="editTeam(${i})">✏️ Өзгерту</button><button class="bdel" onclick="delTeam(${i})">🗑️ Жою</button></div>
      </div>`).join('');
  }
  // News list
  if(document.getElementById('news-list')) {
    document.getElementById('news-list').innerHTML = D.news.map((n,i)=>`
      <div class="aitem">
        <div class="aiinfo"><div class="aiico">${n.icon}</div><div><div class="ainame">${n[l].title}</div><div class="aisub">${n[l].date}</div></div></div>
        <div class="aibtns"><button class="bedit" onclick="editNews(${i})">✏️ Өзгерту</button><button class="bdel" onclick="delNews(${i})">🗑️ Жою</button></div>
      </div>`).join('');
  }
  // FAQ list
  if(document.getElementById('faq-list')) {
    document.getElementById('faq-list').innerHTML = D.faq.map((f,i)=>`
      <div class="aitem">
        <div class="aiinfo" style="flex:1"><div class="ainame">${f[l].q}</div></div>
        <div class="aibtns"><button class="bedit" onclick="editFaq(${i})">✏️ Өзгерту</button><button class="bdel" onclick="delFaq(${i})">🗑️ Жою</button></div>
      </div>`).join('');
  }
  // Contact
  if(document.getElementById('c-phone1')) {
    document.getElementById('c-phone1').value = D.contact.phone1;
    document.getElementById('c-phone2').value = D.contact.phone2;
    document.getElementById('c-email1').value = D.contact.email1;
    document.getElementById('c-email2').value = D.contact.email2;
    document.getElementById('c-addr-kk').value = D.contact.addr_kk;
    document.getElementById('c-addr-ru').value = D.contact.addr_ru;
    document.getElementById('c-addr-en').value = D.contact.addr_en;
    document.getElementById('c-wd').value = D.contact.wd;
    document.getElementById('c-ws').value = D.contact.ws;
  }
}

function liveUpdate() {} // placeholder for real-time preview

// SAVE FARM
function saveFarm() {
  const l = adminLang;
  D.hero[l].badge = document.getElementById('f-badge').value;
  D.hero[l].desc = document.getElementById('f-hdesc').value;
  D.about.year = document.getElementById('f-year').value;
  D.about.area = document.getElementById('f-area').value;
  D.about[l].title = document.getElementById('f-atitle').value;
  D.about[l].desc = document.getElementById('f-adesc').value;
  save('farm-saved');
}
// SAVE STATS
function saveStats() { save('stats-saved'); }
// SAVE CONTACT
function saveCont() {
  D.contact.phone1 = document.getElementById('c-phone1').value;
  D.contact.phone2 = document.getElementById('c-phone2').value;
  D.contact.email1 = document.getElementById('c-email1').value;
  D.contact.email2 = document.getElementById('c-email2').value;
  D.contact.addr_kk = document.getElementById('c-addr-kk').value;
  D.contact.addr_ru = document.getElementById('c-addr-ru').value;
  D.contact.addr_en = document.getElementById('c-addr-en').value;
  D.contact.wd = document.getElementById('c-wd').value;
  D.contact.ws = document.getElementById('c-ws').value;
  save('cont-saved');
}

// PRODUCTS CRUD
function editProd(i) {
  editProdIdx = i; const l = adminLang; const p = D.products[i];
  document.getElementById('pe-icon').value = p.icon;
  document.getElementById('pe-color').value = p.color;
  document.getElementById('pe-title').value = p[l].title;
  document.getElementById('pe-desc').value = p[l].desc;
  document.getElementById('pe-tags').value = p[l].tags;
  document.getElementById('pe-price').value = p[l].price;
  document.getElementById('prod-edit-form').classList.add('show');
}
function addProd() {
  D.products.push({icon:'🌾',color:'grain',kk:{title:'Жаңа өнім',desc:'Сипаттама',tags:'Тег1,Тег2',price:'Бағасы'},ru:{title:'Новый продукт',desc:'Описание',tags:'Тег1,Тег2',price:'Цена'},en:{title:'New Product',desc:'Description',tags:'Tag1,Tag2',price:'Price'}});
  editProd(D.products.length-1); loadAdminData();
}
function saveProd() {
  const l = adminLang; const i = editProdIdx;
  D.products[i].icon = document.getElementById('pe-icon').value;
  D.products[i].color = document.getElementById('pe-color').value;
  D.products[i][l].title = document.getElementById('pe-title').value;
  D.products[i][l].desc = document.getElementById('pe-desc').value;
  D.products[i][l].tags = document.getElementById('pe-tags').value;
  D.products[i][l].price = document.getElementById('pe-price').value;
  save(null); cancelProdEdit(); loadAdminData(); updateDashboard();
}
function delProd(i) { if(confirm('Жою?')){ D.products.splice(i,1); save(null); loadAdminData(); updateDashboard(); } }
function cancelProdEdit() { document.getElementById('prod-edit-form').classList.remove('show'); editProdIdx=-1; }

// TEAM CRUD
function editTeam(i) {
  editTeamIdx = i; const l = adminLang; const t = D.team[i];
  document.getElementById('te-icon').value = t.icon;
  document.getElementById('te-name').value = t.name;
  document.getElementById('te-role').value = t[l].role;
  document.getElementById('te-since').value = t.since;
  document.getElementById('te-desc').value = t[l].desc;
  document.getElementById('team-edit-form').classList.add('show');
}
function addTeam() {
  D.team.push({icon:'👤',name:'Жаңа қызметкер',since:'2026',kk:{role:'Қызмет',desc:'Сипаттама'},ru:{role:'Должность',desc:'Описание'},en:{role:'Position',desc:'Description'}});
  editTeam(D.team.length-1); loadAdminData();
}
function saveTeam() {
  const l = adminLang; const i = editTeamIdx;
  D.team[i].icon = document.getElementById('te-icon').value;
  D.team[i].name = document.getElementById('te-name').value;
  D.team[i][l].role = document.getElementById('te-role').value;
  D.team[i].since = document.getElementById('te-since').value;
  D.team[i][l].desc = document.getElementById('te-desc').value;
  save(null); cancelTeamEdit(); loadAdminData(); updateDashboard();
}
function delTeam(i) { if(confirm('Жою?')){ D.team.splice(i,1); save(null); loadAdminData(); updateDashboard(); } }
function cancelTeamEdit() { document.getElementById('team-edit-form').classList.remove('show'); editTeamIdx=-1; }

// NEWS CRUD
function editNews(i) {
  editNewsIdx = i; const l = adminLang; const n = D.news[i];
  document.getElementById('ne-icon').value = n.icon;
  document.getElementById('ne-date').value = n[l].date;
  document.getElementById('ne-title').value = n[l].title;
  document.getElementById('ne-desc').value = n[l].desc;
  document.getElementById('news-edit-form').classList.add('show');
}
function addNews() {
  D.news.push({icon:'📰',ni:'ni1',kk:{date:'2026',title:'Жаңа жаңалық',desc:'Мазмұн'},ru:{date:'2026',title:'Новость',desc:'Содержание'},en:{date:'2026',title:'News',desc:'Content'}});
  editNews(D.news.length-1); loadAdminData();
}
function saveNews() {
  const l = adminLang; const i = editNewsIdx;
  D.news[i].icon = document.getElementById('ne-icon').value;
  D.news[i][l].date = document.getElementById('ne-date').value;
  D.news[i][l].title = document.getElementById('ne-title').value;
  D.news[i][l].desc = document.getElementById('ne-desc').value;
  save(null); cancelNewsEdit(); loadAdminData(); updateDashboard();
}
function delNews(i) { if(confirm('Жою?')){ D.news.splice(i,1); save(null); loadAdminData(); updateDashboard(); } }
function cancelNewsEdit() { document.getElementById('news-edit-form').classList.remove('show'); editNewsIdx=-1; }

// FAQ CRUD
function editFaq(i) {
  editFaqIdx = i; const l = adminLang; const f = D.faq[i];
  document.getElementById('fqe-q').value = f[l].q;
  document.getElementById('fqe-a').value = f[l].a;
  document.getElementById('faq-edit-form').classList.add('show');
}
function addFaq() {
  D.faq.push({kk:{q:'Жаңа сұрақ',a:'Жауап'},ru:{q:'Новый вопрос',a:'Ответ'},en:{q:'New question',a:'Answer'}});
  editFaq(D.faq.length-1); loadAdminData();
}
function saveFaq() {
  const l = adminLang; const i = editFaqIdx;
  D.faq[i][l].q = document.getElementById('fqe-q').value;
  D.faq[i][l].a = document.getElementById('fqe-a').value;
  save(null); cancelFaqEdit(); loadAdminData(); updateDashboard();
}
function delFaq(i) { if(confirm('Жою?')){ D.faq.splice(i,1); save(null); loadAdminData(); updateDashboard(); } }
function cancelFaqEdit() { document.getElementById('faq-edit-form').classList.remove('show'); editFaqIdx=-1; }

// ============================================================
// MESSAGES
// ============================================================
async function loadMsgs() {
  const el = document.getElementById('msgs-list');
  const ct = document.getElementById('msgs-count');
  el.innerHTML = '<div style="text-align:center;padding:2rem;color:var(--mu);font-size:14px">⏳ Жүктелуде...</div>';
  try {
    const r = await fetch(`https://raw.githubusercontent.com/${GH_OWNER}/${GH_REPO}/main/submissions.json?t=${Date.now()}`);
    if (!r.ok) { el.innerHTML = '<div style="text-align:center;padding:2rem;color:var(--mu);font-size:14px">📭 Хабарламалар жоқ</div>'; ct.textContent=''; return; }
    const msgs = await r.json();
    if (!msgs.length) { el.innerHTML = '<div style="text-align:center;padding:2rem;color:var(--mu);font-size:14px">📭 Хабарлама жоқ</div>'; ct.textContent=''; return; }
    const unread = msgs.filter(m=>!m.read).length;
    ct.textContent = `Барлығы: ${msgs.length} | Оқылмаған: ${unread}`;
    const badge = document.getElementById('msg-badge');
    if (unread > 0) { badge.textContent = unread; badge.style.display='inline'; }
    el.innerHTML = msgs.map((m,i)=>`
      <div style="background:${m.read?'#fff':'#f0faf0'};border:1px solid ${m.read?'#e0e0d8':'#a5d6a7'};border-radius:10px;padding:1rem 1.25rem;margin-bottom:.65rem">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:1rem;flex-wrap:wrap">
          <div style="flex:1">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:.35rem">
              ${!m.read?'<span style="background:#2e7d32;color:#fff;font-size:10px;font-weight:700;padding:2px 8px;border-radius:20px">ЖАҢА</span>':''}
              <span style="font-size:14px;font-weight:700;color:var(--dk)">${m.name}</span>
              <span style="font-size:12px;color:var(--mu)">· ${m.phone}</span>
            </div>
            <div style="font-size:12px;color:var(--mu);margin-bottom:.4rem">📌 ${m.subject} · 🕐 ${m.date}</div>
            <div style="font-size:13px;color:var(--tx);line-height:1.6">${m.message}</div>
          </div>
          <div style="display:flex;gap:.4rem;flex-shrink:0">
            <a href="tel:${m.phone}" style="background:var(--gp);color:var(--g);border:none;border-radius:6px;padding:5px 11px;font-size:12px;font-weight:600;text-decoration:none;display:inline-block">📞 Қоңырау</a>
          </div>
        </div>
      </div>`).join('');
  } catch(e) {
    el.innerHTML = '<div style="text-align:center;padding:2rem;color:#c62828;font-size:14px">❌ Жүктеу қатесі. Кейін қайталаңыз.</div>';
  }
}

// ============================================================
// INIT
// ============================================================
loadData();