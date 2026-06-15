// ============================================================
// МЕРКЕ АГРО — DEFAULT DATA (мәліметтерді осы жерде өзгертіңіз)
// ============================================================
const DEF = {
  hero:{
    kk:{badge:'Қазақстанның табиғи өнімдері',desc:'Таза табиғат, заманауи технология және ұрпақтан ұрпаққа жеткен тәжірибе. Астық, мал шаруашылығы және сүт өнімдері.'},
    ru:{badge:'Натуральные продукты Казахстана',desc:'Чистая природа, современные технологии и многолетний опыт. Зерно, животноводство и молочные продукты.'},
    en:{badge:'Natural Products of Kazakhstan',desc:'Pure nature, modern technology, and generations of expertise. Grain, livestock, and dairy products.'},
  },
  about:{
    year:'2004', area:'5000',
    kk:{tag:'Ферма туралы',lbl:'жылдан бері жұмыс жасаймыз',title:'Мерке — табиғат пен технологияның үйлесімі',desc:'Мерке Агро Комплекс — Жамбыл облысының құнарлы жерінде орналасқан ірі агрокомплекс. 2004 жылдан бері астық өсіру, мал бағу және сүт өнімдерін өндіру арқылы Қазақстан халқына таза, сапалы тағам ұсынамыз.',feats:[{i:'🌾',t:'Заманауи техника',d:'Еуропалық стандарттағы ауыл шаруашылық техникасы'},{i:'🌱',t:'Экологиялық таза өндіріс',d:'Химиялық тыңайтқышсыз, табиғи жолмен өсіру'},{i:'📜',t:'Халықаралық сертификат',d:'ISO 22000 және HACCP сертификаттары бар'},{i:'🚚',t:'Тікелей жеткізу',d:'Қазақстан бойынша тікелей жеткізу қызметі'}]},
    ru:{tag:'О ферме',lbl:'работаем с этого года',title:'Мерке — гармония природы и технологий',desc:'Мерке Агро Комплекс — крупный агрокомплекс на плодородных землях Жамбылской области. С 2004 года производим зерно, занимаемся животноводством и молочным производством.',feats:[{i:'🌾',t:'Современная техника',d:'Сельхозтехника европейского стандарта'},{i:'🌱',t:'Экологически чистое производство',d:'Выращивание без химических удобрений'},{i:'📜',t:'Международные сертификаты',d:'Сертификаты ISO 22000 и HACCP'},{i:'🚚',t:'Прямая доставка',d:'Служба доставки по всему Казахстану'}]},
    en:{tag:'About Farm',lbl:'operating since this year',title:'Merke — Where Nature Meets Technology',desc:'Merke Agro Complex is a large agro complex on the fertile lands of Zhambyl region. Since 2004 we produce grain, raise livestock and manufacture dairy products.',feats:[{i:'🌾',t:'Modern Equipment',d:'European-standard agricultural machinery'},{i:'🌱',t:'Eco-Friendly Production',d:'Grown without chemical fertilizers'},{i:'📜',t:'International Certifications',d:'ISO 22000 and HACCP certified'},{i:'🚚',t:'Direct Delivery',d:'Delivery service across Kazakhstan'}]},
  },
  stats:[
    {num:'5000+',kk:'га егістік жер',ru:'га пахотных земель',en:'ha arable land'},
    {num:'20+',kk:'жыл тәжірибе',ru:'лет опыта',en:'years experience'},
    {num:'100%',kk:'табиғи өнім',ru:'натуральный продукт',en:'natural product'},
    {num:'500+',kk:'мал басы',ru:'голов скота',en:'head of livestock'},
  ],
  products:[
    {icon:'🌾',color:'grain',kk:{title:'Астық өнімдері',desc:'Жоғары сапалы дәнді дақылдар. Заманауи техникамен жиналған бидай, арпа, сұлы, күнбағыс.',tags:'Бидай,Арпа,Сұлы,Күнбағыс',price:'Бағасы: 65₸/кг бастап'},ru:{title:'Зерновые продукты',desc:'Высококачественные зерновые культуры. Пшеница, ячмень, овёс, подсолнечник.',tags:'Пшеница,Ячмень,Овёс,Подсолнечник',price:'Цена: от 65₸/кг'},en:{title:'Grain Products',desc:'High-quality grain crops. Wheat, barley, oats, sunflower.',tags:'Wheat,Barley,Oats,Sunflower',price:'Price: from ₸65/kg'}},
    {icon:'🥩',color:'meat',kk:{title:'Мал шаруашылығы өнімдері',desc:'Табиғи жайылымда өскен малдың таза еті. Ірі қара, қой, жылқы еті — ГОСТ стандартына сай.',tags:'Сиыр еті,Қой еті,Жылқы еті,Қазы',price:'Бағасы: 1800₸/кг бастап'},ru:{title:'Мясная продукция',desc:'Чистое мясо скота на натуральных пастбищах. Говядина, баранина, конина — стандарт ГОСТ.',tags:'Говядина,Баранина,Конина,Казы',price:'Цена: от 1800₸/кг'},en:{title:'Meat Products',desc:'Pure meat from naturally pastured livestock. Beef, lamb, horse meat — GOST certified.',tags:'Beef,Lamb,Horse meat,Kazy',price:'Price: from ₸1800/kg'}},
    {icon:'🥛',color:'dairy',kk:{title:'Сүт өнімдері',desc:'Табиғи сүттен дайындалған дәстүрлі қазақ сүт өнімдері. Сертификатталған, сапалы.',tags:'Сүт,Қымыз,Айран,Сары май',price:'Бағасы: 180₸/л бастап'},ru:{title:'Молочные продукты',desc:'Традиционные казахские молочные продукты из натурального молока. Сертифицировано.',tags:'Молоко,Кумыс,Айран,Масло',price:'Цена: от 180₸/л'},en:{title:'Dairy Products',desc:'Traditional Kazakh dairy products from natural milk. Certified quality.',tags:'Milk,Kumiss,Ayran,Butter',price:'Price: from ₸180/liter'}},
  ],
  why:{
    kk:{tag:'Неліктен біз?',title:'Бізді таңдаудың 5 себебі',items:[{i:'🏆',t:'20+ жыл тәжірибе',d:'Ауыл шаруашылығының барлық саласы бойынша терең тәжірибе'},{i:'🌿',t:'100% табиғи',d:'Химиясыз, табиғи жолмен өсіріліп, өндірілген өнімдер'},{i:'🚚',t:'Жылдам жеткізу',d:'Барлық аймаққа 24-48 сағат ішінде жеткізу'},{i:'💰',t:'Тиімді баға',d:'Тікелей өндірушіден — делдалсыз, ең тиімді бағамен'},{i:'📜',t:'Сертификатталған',d:'ISO 22000, HACCP және ГОСТ стандарттарына сай'}]},
    ru:{tag:'Почему мы?',title:'5 причин выбрать нас',items:[{i:'🏆',t:'20+ лет опыта',d:'Глубокий опыт во всех отраслях сельского хозяйства'},{i:'🌿',t:'100% натуральное',d:'Продукты, выращенные и произведённые без химии'},{i:'🚚',t:'Быстрая доставка',d:'Доставка во все регионы за 24-48 часов'},{i:'💰',t:'Выгодные цены',d:'От производителя напрямую — без посредников'},{i:'📜',t:'Сертифицировано',d:'Соответствует стандартам ISO 22000, HACCP и ГОСТ'}]},
    en:{tag:'Why Us?',title:'5 Reasons to Choose Us',items:[{i:'🏆',t:'20+ Years Experience',d:'Deep expertise across all agricultural sectors'},{i:'🌿',t:'100% Natural',d:'Products grown and produced without chemicals'},{i:'🚚',t:'Fast Delivery',d:'Delivery to all regions within 24-48 hours'},{i:'💰',t:'Best Prices',d:'Direct from producer — no middlemen'},{i:'📜',t:'Certified',d:'Compliant with ISO 22000, HACCP and GOST'}]},
  },
  team:[
    {icon:'👨‍💼',name:'Асқар Бекқали',since:'2004',kk:{role:'Бас директор',desc:'20 жылдан астам тәжірибесі бар аграрлық маман'},ru:{role:'Генеральный директор',desc:'Аграрный специалист с более чем 20-летним опытом'},en:{role:'CEO',desc:'Agricultural expert with 20+ years experience'}},
    {icon:'👩‍🔬',name:'Айгүл Сейткали',since:'2010',kk:{role:'Бас агроном',desc:'Өсімдік шаруашылығы бойынша жетекші маман'},ru:{role:'Главный агроном',desc:'Ведущий специалист по растениеводству'},en:{role:'Chief Agronomist',desc:'Lead crop science specialist'}},
    {icon:'👨‍🌾',name:'Дастан Жұмабек',since:'2015',kk:{role:'Мал шаруашылық менеджері',desc:'Ветеринариялық дәрігер, фермерлік менеджер'},ru:{role:'Менеджер животноводства',desc:'Ветеринарный врач, менеджер фермы'},en:{role:'Livestock Manager',desc:'Veterinary doctor and farm manager'}},
    {icon:'👩‍💼',name:'Назерке Омарова',since:'2018',kk:{role:'Сату менеджері',desc:'Өнімдерді сату және маркетинг бойынша маман'},ru:{role:'Менеджер по продажам',desc:'Специалист по продажам и маркетингу'},en:{role:'Sales Manager',desc:'Sales and marketing specialist'}},
  ],
  news:[
    {icon:'🌾',ni:'ni1',kk:{date:'15 Маусым 2026',title:'2026 жылғы егін науқаны рекордпен аяқталды',desc:'Биыл 5000 гектар жерден рекордтық астық жиналды. Өнімділік өткен жылмен салыстырғанда 18%-ға өсті. Жаңа техника сатып алу нәтижесінде жинау мерзімі 30%-ға қысқарды.'},ru:{date:'15 июня 2026',title:'Уборочная кампания 2026 завершилась рекордом',desc:'В этом году с 5000 гектаров собран рекордный урожай. Урожайность выросла на 18%. Новая техника сократила сроки уборки на 30%.'},en:{date:'June 15, 2026',title:'2026 Harvest Sets New Record',desc:'A record harvest was collected from 5,000 hectares. Yield increased by 18%. New equipment reduced harvesting time by 30%.'}},
    {icon:'🐄',ni:'ni2',kk:{date:'2 Маусым 2026',title:'Жаңа 500 басты мал фермасы іске қосылды',desc:'Заманауи технологиямен жабдықталған 500 бас малға арналған жаңа ферма кешені ашылды. Автоматты азықтандыру және сауу жүйелері орнатылды.'},ru:{date:'2 июня 2026',title:'Открыта новая ферма на 500 голов',desc:'Введён комплекс на 500 голов с современным оборудованием. Установлены автоматические системы кормления и доения.'},en:{date:'June 2, 2026',title:'New 500-Head Farm Launched',desc:'A complex for 500 head with modern technology commissioned. Automated feeding and milking systems installed.'}},
    {icon:'🏆',ni:'ni3',kk:{date:'20 Мамыр 2026',title:'«ҚазАгро-2026» көрмесінде алтын медаль алдық',desc:'Республикалық агро жәрмеңкесінде сүт өнімдері бойынша бірінші орынды иеленіп, алтын медальмен марапатталдық. Бұл — біздің 5-ші жылдық жеңісіміз.'},ru:{date:'20 мая 2026',title:'Золотая медаль на «КазАгро-2026»',desc:'На республиканской ярмарке заняли 1-е место по молочной продукции. Это наша 5-я победа подряд.'},en:{date:'May 20, 2026',title:'Gold Medal at KazAgro-2026',desc:'1st place in dairy products at the national agro fair. Our 5th consecutive victory.'}},
  ],
  faq:[
    {kk:{q:'Өнімдерді қандай жерде сатып алуға болады?',a:'Өнімдерімізді тікелей фермадан немесе Алматы, Тараз, Шымкент қалаларындағы дистрибьюторлар арқылы сатып алуға болады.'},ru:{q:'Где купить вашу продукцию?',a:'Продукцию можно купить на ферме или через дистрибьюторов в Алматы, Таразе и Шымкенте.'},en:{q:'Where can I buy your products?',a:'Products can be purchased directly from the farm or through distributors in Almaty, Taraz, and Shymkent.'}},
    {kk:{q:'Жеткізу қызметі бар ма?',a:'Иә, Қазақстанның барлық аймақтарына жеткізу бар. Бағасы тапсырыс көлеміне байланысты.'},ru:{q:'Есть ли доставка?',a:'Да, доставка по всем регионам Казахстана. Стоимость зависит от объёма заказа.'},en:{q:'Is delivery available?',a:'Yes, we deliver to all regions of Kazakhstan. Price depends on order volume.'}},
    {kk:{q:'Өнімдеріңізде сертификат бар ма?',a:'Иә, барлық өнімдеріміз ISO 22000, HACCP сертификаттарына ие және ГОСТ стандарттарына сай.'},ru:{q:'Есть ли сертификаты?',a:'Да, вся продукция сертифицирована по ISO 22000, HACCP и соответствует стандартам ГОСТ.'},en:{q:'Are your products certified?',a:'Yes, all products are ISO 22000, HACCP certified and GOST compliant.'}},
    {kk:{q:'Топтама (оптом) сатып алуға болады ма?',a:'Иә, 1 тоннадан бастап тапсырыс берсеңіз, арнайы баға ұсынамыз.'},ru:{q:'Возможна оптовая покупка?',a:'Да, при заказе от 1 тонны предлагаем специальные цены.'},en:{q:'Is wholesale possible?',a:'Yes, for orders from 1 ton we offer special pricing.'}},
    {kk:{q:'Ферманы аралауға болады ма?',a:'Иә, алдын ала хабарлассаңыз ферманы экскурсия форматында аралауға болады. Оқушылар үшін тегін.'},ru:{q:'Можно посетить ферму?',a:'Да, после предварительной договорённости. Для школьников — бесплатно.'},en:{q:'Can we visit the farm?',a:'Yes, contact us in advance. Free excursions for school groups.'}},
  ],
  contact:{
    phone1:'+7 (726) 234-56-78',phone2:'+7 (700) 123-45-67',
    email1:'info@merkeagro.kz',email2:'sales@merkeagro.kz',
    addr_kk:'Жамбыл облысы, Мерке ауданы, Агро кешені №1',
    addr_ru:'Жамбылская область, район Мерке, Агрокомплекс №1',
    addr_en:'Zhambyl Region, Merke District, Agro Complex No.1',
    wd:'Дүйсенбі–Жұма: 08:00–18:00',ws:'Сенбі: 09:00–14:00',
  },
};