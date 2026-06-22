const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, PageNumber, PageBreak, LevelFormat, ExternalHyperlink
} = require('docx');
const fs = require('fs');

// ── helpers ──────────────────────────────────────────────────────────────────
const brd  = { style: BorderStyle.SINGLE, size: 4, color: '2E7D32' };
const brdT = { style: BorderStyle.SINGLE, size: 1, color: 'BBBBBB' };
const nob  = { style: BorderStyle.NONE,   size: 0, color: 'FFFFFF' };

const mkBrd = (c='BBBBBB') => ({ style: BorderStyle.SINGLE, size: 2, color: c });
const allBrd = (c='BBBBBB') => ({ top:mkBrd(c), bottom:mkBrd(c), left:mkBrd(c), right:mkBrd(c) });
const noBrd  = () => ({ top:{style:BorderStyle.NONE,size:0,color:'FFFFFF'}, bottom:{style:BorderStyle.NONE,size:0,color:'FFFFFF'}, left:{style:BorderStyle.NONE,size:0,color:'FFFFFF'}, right:{style:BorderStyle.NONE,size:0,color:'FFFFFF'} });

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 140 },
    children: [new TextRun({ text, bold: true, size: 40, color: '1B5E20', font: 'Arial' })]
  });
}
function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 100 },
    children: [new TextRun({ text, bold: true, size: 30, color: '2E7D32', font: 'Arial' })]
  });
}
function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 60 },
    children: [new TextRun({ text, bold: true, size: 24, color: '388E3C', font: 'Arial' })]
  });
}
function p(text, opts={}) {
  return new Paragraph({
    spacing: { before: 60, after: 100 },
    alignment: opts.center ? AlignmentType.CENTER : AlignmentType.BOTH,
    children: [new TextRun({ text, size: 22, font: 'Arial', ...opts })]
  });
}
function pb() { return new Paragraph({ children: [new PageBreak()] }); }
function sp(n=1) { return new Paragraph({ spacing:{before:0,after:n*80}, children:[new TextRun('')] }); }

function step(num, emoji, title, desc) {
  return new Table({
    width: { size: 9026, type: WidthType.DXA },
    columnWidths: [900, 8126],
    rows: [new TableRow({
      children: [
        new TableCell({
          borders: noBrd(),
          width: { size: 900, type: WidthType.DXA },
          shading: { fill: '1B5E20', type: ShadingType.CLEAR },
          verticalAlign: 'center',
          margins: { top: 160, bottom: 160, left: 120, right: 120 },
          children: [
            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: emoji, size: 32 })] }),
            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${num}`, bold: true, size: 28, color: 'FFFFFF', font: 'Arial' })] })
          ]
        }),
        new TableCell({
          borders: noBrd(),
          width: { size: 8126, type: WidthType.DXA },
          shading: { fill: 'F1F8E9', type: ShadingType.CLEAR },
          margins: { top: 120, bottom: 120, left: 200, right: 120 },
          children: [
            new Paragraph({ children: [new TextRun({ text: title, bold: true, size: 26, font: 'Arial', color: '1B5E20' })] }),
            new Paragraph({ spacing:{before:40,after:0}, children: [new TextRun({ text: desc, size: 22, font: 'Arial' })] })
          ]
        })
      ]
    })]
  });
}

function infoBox(title, lines, color='E8F5E9', bcolor='2E7D32') {
  return new Table({
    width: { size: 9026, type: WidthType.DXA },
    columnWidths: [9026],
    rows: [new TableRow({
      children: [new TableCell({
        borders: { top:mkBrd(bcolor), bottom:mkBrd(bcolor), left:{style:BorderStyle.SINGLE,size:12,color:bcolor}, right:mkBrd(bcolor) },
        width: { size: 9026, type: WidthType.DXA },
        shading: { fill: color, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 220, right: 180 },
        children: [
          ...(title ? [new Paragraph({ children: [new TextRun({ text: title, bold: true, size: 22, font: 'Arial', color: bcolor })] })] : []),
          ...lines.map(l => new Paragraph({ spacing:{before:30,after:30}, children:[new TextRun({text:l,size:21,font:'Arial'})] }))
        ]
      })]
    })]
  });
}

function codeBox(lines) {
  const arr = Array.isArray(lines) ? lines : lines.split('\n');
  return new Table({
    width: { size: 9026, type: WidthType.DXA },
    columnWidths: [9026],
    rows: [new TableRow({
      children: [new TableCell({
        borders: allBrd('AAAAAA'),
        shading: { fill: '263238', type: ShadingType.CLEAR },
        margins: { top:120, bottom:120, left:200, right:200 },
        children: arr.map(l => new Paragraph({
          spacing:{before:0,after:0},
          children:[new TextRun({text:l||' ',font:'Courier New',size:18,color:'A5D6A7'})]
        }))
      })]
    })]
  });
}

function twoRow(label, val, flip=false) {
  const [lc,vc] = flip ? ['C8E6C9','FFFFFF'] : ['E8F5E9','FFFFFF'];
  return new Table({
    width:{size:9026,type:WidthType.DXA},
    columnWidths:[3200,5826],
    rows:[new TableRow({
      children:[
        new TableCell({ borders:allBrd('BBBBBB'), width:{size:3200,type:WidthType.DXA}, shading:{fill:'C8E6C9',type:ShadingType.CLEAR}, margins:{top:80,bottom:80,left:120,right:120}, children:[new Paragraph({children:[new TextRun({text:label,bold:true,size:20,font:'Arial'})]})] }),
        new TableCell({ borders:allBrd('BBBBBB'), width:{size:5826,type:WidthType.DXA}, margins:{top:80,bottom:80,left:120,right:120}, children:[new Paragraph({children:[new TextRun({text:val,size:20,font:'Arial'})]})] })
      ]
    })]
  });
}

function checkRow(done, text) {
  return new Paragraph({
    spacing:{before:40,after:40},
    children:[
      new TextRun({text: done ? '✅  ' : '⬜  ', size:22}),
      new TextRun({text, size:22, font:'Arial'})
    ]
  });
}

// ── DOCUMENT ─────────────────────────────────────────────────────────────────
const doc = new Document({
  numbering:{
    config:[
      {reference:'num',levels:[{level:0,format:LevelFormat.DECIMAL,text:'%1.',alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:720,hanging:360}}}}]},
      {reference:'bul',levels:[{level:0,format:LevelFormat.BULLET,text:'•',alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:720,hanging:360}}}}]}
    ]
  },
  sections:[{
    properties:{page:{size:{width:11906,height:16838},margin:{top:1300,right:1200,bottom:1300,left:1440}}},
    headers:{
      default: new Header({ children:[new Paragraph({
        alignment:AlignmentType.RIGHT,
        border:{bottom:{style:BorderStyle.SINGLE,size:4,color:'2E7D32',space:4}},
        children:[new TextRun({text:'Астық Мерке — Домен, SEO және сайтты беру нұсқаулығы',size:18,font:'Arial',color:'2E7D32',italics:true})]
      })]})
    },
    footers:{
      default: new Footer({ children:[new Paragraph({
        alignment:AlignmentType.CENTER,
        children:[
          new TextRun({text:'© 2026 Астық Мерке  |  Бет ',size:18,font:'Arial',color:'888888'}),
          new TextRun({children:[PageNumber.CURRENT],size:18,font:'Arial',color:'888888'})
        ]
      })]})
    },
    children:[

      // ══════════ ТИТУЛ ══════════
      sp(3),
      new Paragraph({alignment:AlignmentType.CENTER, children:[new TextRun({text:'🌾',size:80})]}),
      sp(1),
      new Paragraph({alignment:AlignmentType.CENTER, spacing:{before:0,after:80}, children:[new TextRun({text:'АСТЫҚ МЕРКЕ',bold:true,size:60,font:'Arial',color:'1B5E20'})]}),
      new Paragraph({alignment:AlignmentType.CENTER, spacing:{before:0,after:200}, children:[new TextRun({text:'Сайтты интернетке шығару және пайдаланушыға беру',size:28,font:'Arial',color:'388E3C',italics:true})]}),

      new Table({
        width:{size:8000,type:WidthType.DXA}, columnWidths:[8000],
        rows:[new TableRow({children:[new TableCell({
          borders:allBrd('2E7D32'),
          shading:{fill:'E8F5E9',type:ShadingType.CLEAR},
          margins:{top:200,bottom:200,left:300,right:300},
          children:[
            new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({text:'ТОЛЫҚ НҰСҚАУЛЫҚ',bold:true,size:32,font:'Arial',color:'1B5E20'})]}),
            sp(1),
            new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({text:'Домен алу  •  Верселге қосу  •  Google-ге шығару  •  SEO',size:22,font:'Arial',color:'555555',italics:true})]}),
            sp(1),
            new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({text:'Жасаған: Боранқұлов Ерасыл  |  2026',bold:true,size:24,font:'Arial',color:'2E7D32'})]}),
          ]
        })]})]
      }),
      pb(),

      // ══════════ МАЗМҰНЫ ══════════
      h1('МАЗМҰНЫ'),
      sp(1),
      ...[
        '1. Не істеу керек? — Жалпы шолу',
        '2. Домен атын сатып алу (astykmerke.kz немесе .com)',
        '3. Доменді Верселге қосу',
        '4. Google-ге шығару (SEO)',
        '5. Google Search Console тіркеу',
        '6. Сайтты пайдаланушыға беруден бұрын тексеру',
        '7. Жиі кездесетін мәселелер және шешімдері',
      ].map(t => new Paragraph({spacing:{before:40,after:40},children:[new TextRun({text:t,size:22,font:'Arial'})]})),
      pb(),

      // ══════════ 1. ЖАЛПЫ ШОЛУ ══════════
      h1('1. НЕ ІСТЕУ КЕРЕК? — ЖАЛПЫ ШОЛУ'),
      p('Сайт қазір vercel.app домені арқылы жұмыс жасайды. Кәсіби көрініс үшін және Google-де табылу үшін мына үш қадамды орындау керек:'),
      sp(1),

      new Table({
        width:{size:9026,type:WidthType.DXA}, columnWidths:[500,2500,6026],
        rows:[
          new TableRow({children:[
            new TableCell({borders:allBrd('1B5E20'),shading:{fill:'1B5E20',type:ShadingType.CLEAR},margins:{top:100,bottom:100,left:120,right:120},children:[new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({text:'№',bold:true,size:22,font:'Arial',color:'FFFFFF'})]})]}),
            new TableCell({borders:allBrd('1B5E20'),shading:{fill:'1B5E20',type:ShadingType.CLEAR},margins:{top:100,bottom:100,left:120,right:120},children:[new Paragraph({children:[new TextRun({text:'Қадам',bold:true,size:22,font:'Arial',color:'FFFFFF'})]})]}),
            new TableCell({borders:allBrd('1B5E20'),shading:{fill:'1B5E20',type:ShadingType.CLEAR},margins:{top:100,bottom:100,left:120,right:120},children:[new Paragraph({children:[new TextRun({text:'Нәтиже',bold:true,size:22,font:'Arial',color:'FFFFFF'})]})]})
          ]}),
          ...([
            ['1','🌐 Домен алу','astykmerke.kz сілтемемен сайт ашылады'],
            ['2','🔗 Верселге қосу','Домен сайтпен байланысады'],
            ['3','📈 Google SEO','Google-де іздеуде табылады'],
          ]).map(([n,k,v],i) => new TableRow({children:[
            new TableCell({borders:allBrd('BBBBBB'),shading:{fill:i%2===0?'F9FBF9':'FFFFFF',type:ShadingType.CLEAR},margins:{top:80,bottom:80,left:120,right:120},children:[new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({text:n,bold:true,size:22,font:'Arial'})]})]  }),
            new TableCell({borders:allBrd('BBBBBB'),shading:{fill:i%2===0?'F9FBF9':'FFFFFF',type:ShadingType.CLEAR},margins:{top:80,bottom:80,left:120,right:120},children:[new Paragraph({children:[new TextRun({text:k,bold:true,size:22,font:'Arial'})]})]  }),
            new TableCell({borders:allBrd('BBBBBB'),shading:{fill:i%2===0?'F9FBF9':'FFFFFF',type:ShadingType.CLEAR},margins:{top:80,bottom:80,left:120,right:120},children:[new Paragraph({children:[new TextRun({text:v,size:22,font:'Arial'})]})]  }),
          ]}))
        ]
      }),
      sp(1),
      infoBox('💡 Ескерту',['Бұл нұсқаулықтағы барлық қадамдар тегін немесе жылына 5000-8000 тг ғана тұрады.','Верселдің өзі — тегін. Тек домен атын сатып алу ақылы.'],'FFF8E1','F57F17'),
      pb(),

      // ══════════ 2. ДОМЕН АЛУ ══════════
      h1('2. ДОМЕН АТЫН САТЫП АЛУ'),
      p('Домен — бұл сіздің сайтыңыздың мекенжайы. Мысалы: astykmerke.kz немесе astykmerke.com. Оны арнайы сайттардан жылдық жазылым арқылы сатып аласыз.'),
      sp(1),
      h2('2.1 Қайсысын таңдау керек?'),
      sp(1),
      new Table({
        width:{size:9026,type:WidthType.DXA}, columnWidths:[2000,2500,2000,2526],
        rows:[
          new TableRow({children:[
            ...['Домен','Бағасы','Ұсынылатын сайт','Кімге жарайды'].map(t => new TableCell({borders:allBrd('1B5E20'),shading:{fill:'1B5E20',type:ShadingType.CLEAR},margins:{top:80,bottom:80,left:120,right:120},children:[new Paragraph({children:[new TextRun({text:t,bold:true,size:20,font:'Arial',color:'FFFFFF'})]})]}))
          ]}),
          ...([
            ['astykmerke.kz','~5 000–8 000 тг/жыл','nic.kz','🇰🇿 Қазақстандық сайттар үшін — ең жақсы'],
            ['astykmerke.com','~4 000–6 000 тг/жыл','namecheap.com','Халықаралық аудитория үшін'],
            ['astykmerke.kz + .com','~10 000 тг/жыл','Екеуі де','Толық қорғаныс үшін'],
          ]).map(([a,b,c,d],i) => new TableRow({children:[
            [a,b,c,d].map(v => new TableCell({borders:allBrd('BBBBBB'),shading:{fill:i%2===0?'F9FBF9':'FFFFFF',type:ShadingType.CLEAR},margins:{top:80,bottom:80,left:120,right:120},children:[new Paragraph({children:[new TextRun({text:v,size:20,font:'Arial'})]})]  }))
          ].flat()}))
        ]
      }),
      sp(2),

      h2('2.2 nic.kz арқылы .kz домен алу (Толық нұсқаулық)'),
      sp(1),
      step('1','🌐','nic.kz сайтына кіріңіз','Браузерде nic.kz деп жазып, сайтқа өтіңіз.'),
      sp(1),
      step('2','🔍','Домен тексеріңіз','"Домен іздеу" жолына  astykmerke  деп жазыңыз, .kz таңдаңыз, "Тексеру" батырмасын басыңыз.'),
      sp(1),
      step('3','✅','Бос болса — себетке салыңыз','"Домен бос" деген жазу шықса → "Себетке қосу" батырмасын басыңыз.'),
      sp(1),
      step('4','👤','Тіркелу / Кіру','Аккаунтыңыз болмаса — тіркеліңіз. Email мен парольді жазыңыз.'),
      sp(1),
      step('5','💳','Төлем жасаңыз','Карта немесе Kaspi арқылы төлем жасаңыз. ~5 000–8 000 тг.'),
      sp(1),
      step('6','📧','Email тексеріңіз','nic.kz сізге растау хаты жібереді. Хатты ашып, растаңыз.'),
      sp(1),
      step('7','⚙️','DNS баптауына дайындалыңыз','Домен сатып алынды! Енді оны Верселге қосу керек (3-бөлімде).'),
      sp(1),

      infoBox('💡 Кеңес — Namecheap.com арқылы .com домен алу',['1. namecheap.com сайтына кіріңіз','2. Іздеу жолына astykmerke деп жазыңыз','3. .com опциясын таңдап, "Add to cart" басыңыз','4. Visa/Mastercard немесе PayPal арқылы төлеңіз (~$10/жыл)','5. Аккаунтыңызға домен қосылады'],'E3F2FD','1565C0'),
      pb(),

      // ══════════ 3. ВЕРСЕЛГЕ ҚОСУ ══════════
      h1('3. ДОМЕНДІ ВЕРСЕЛГЕ ҚОСУ'),
      p('Домен сатып алынған соң оны Версел сайтымен байлау керек. Бұл процесс 5-10 минут алады, бірақ DNS жаңарту 24-48 сағат ішінде іске қосылады.'),
      sp(1),
      h2('3.1 Верселге домен қосу'),
      sp(1),
      step('1','🔑','Верселге кіріңіз','vercel.com сайтына кіріп, аккаунтыңызға кіріңіз (GitHub арқылы).'),
      sp(1),
      step('2','📁','Жобаңызды таңдаңыз','Dashboard-да merke-agro жобасын басыңыз.'),
      sp(1),
      step('3','⚙️','Settings → Domains','Жоғарыдағы Settings батырмасын басыңыз → сол жақ мәзірден "Domains" таңдаңыз.'),
      sp(1),
      step('4','✏️','Домен жазыңыз','"Add" өрісіне  astykmerke.kz  деп жазыңыз → "Add" батырмасын басыңыз.'),
      sp(1),
      step('5','📋','DNS жазбаларын көшіріңіз','Версел сізге 2 жазба береді. Оларды көшіріңіз:'),
      sp(1),
      infoBox('Версел беретін DNS жазбалары (мысал):',['Тип: A       Атауы: @          Мәні: 76.76.19.61','Тип: CNAME   Атауы: www        Мәні: cname.vercel-dns.com'],'FFF3E0','E65100'),
      sp(1),
      step('6','🌐','nic.kz панеліне кіріңіз','nic.kz → Аккаунт → Доменным → astykmerke.kz → DNS жазбалары.'),
      sp(1),
      step('7','➕','DNS жазбаларды қосыңыз','Версел берген A жазбасын және CNAME жазбасын сол жерге қосыңыз.'),
      sp(1),
      step('8','⏳','Күтіңіз','DNS жаңарту 1-48 сағат алады. Версел автоматты SSL сертификат береді (🔒 https://).'),
      sp(1),
      step('9','✅','Тексеріңіз','Браузерде  https://astykmerke.kz  деп жазыңыз — сайтыңыз ашылуы керек!'),
      sp(1),

      infoBox('⏰ Уақыт шеңбері',[
        '• Домен сатып алу: 10-15 минут',
        '• Верселге қосу: 5 минут',
        '• DNS жаңарту: 1-48 сағат (көбінесе 2-4 сағат)',
        '• SSL сертификат (https://): автоматты, бірнеше минут',
      ],'E8F5E9','2E7D32'),
      pb(),

      // ══════════ 4. SEO ══════════
      h1('4. GOOGLE-ГЕ ШЫҒАРУ (SEO)'),
      p('SEO (Search Engine Optimization) — сайтыңызды Google іздеуінде жоғары орынға шығару тәсілі. Пайдаланушы «мерке агро», «астық мерке», «Жамбыл агрофирма» деп іздегенде сіздің сайтыңыз шығуы үшін мынаны жасау керек:'),
      sp(1),

      h2('4.1 index.html файлына SEO тегтерін қосу'),
      p('index.html файлын ашып, <head> ... </head> бөліміне мына кодты қосыңыз:'),
      sp(1),
      codeBox([
        '<!-- ═══ SEO META ТЕГТЕР ═══ -->',
        '',
        '<!-- Негізгі сипаттама — Google осыны көрсетеді -->',
        '<meta name="description" content="Астық Мерке — Қазақстанның',
        '  агро кешені. Таза астық, ет, сүт өнімдері.',
        '  Жамбыл облысы, Мерке ауданы. 1936 жылдан бері."/>',
        '',
        '<!-- Кілт сөздер -->',
        '<meta name="keywords" content="астық мерке, агро кешен,',
        '  қазақстан, мерке, астық, диірмен, жамбыл, агрофирма,',
        '  бидай, арпа, ет өнімдері, сүт өнімдері"/>',
        '',
        '<!-- Индекстеуге рұқсат -->',
        '<meta name="robots" content="index, follow"/>',
        '',
        '<!-- Сайттың негізгі мекенжайы -->',
        '<link rel="canonical" href="https://astykmerke.kz"/>',
        '',
        '<!-- Open Graph — WhatsApp/Telegram-да сілтеме жіберілгенде -->',
        '<meta property="og:title"       content="Астық Мерке — Агро Кешені"/>',
        '<meta property="og:description" content="Қазақстанның ең ірі',
        '  агро кешендерінің бірі. Таза табиғи өнімдер."/>',
        '<meta property="og:url"         content="https://astykmerke.kz"/>',
        '<meta property="og:type"        content="website"/>',
        '',
        '<!-- Тіл -->',
        '<meta http-equiv="content-language" content="kk, ru, en"/>',
      ]),
      sp(1),
      infoBox('📌 Қай жерге қосу керек?',[
        'index.html файлын ашыңыз.',
        '<head> тегінен кейінгі бірінші жолдарға қосыңыз.',
        'Сақтап, GitHub-қа push жасаңыз — Версел автоматты жаңартады.',
      ],'FFF8E1','F57F17'),
      sp(1),

      h2('4.2 GitHub-қа жіберу'),
      p('Кодты өзгерткен соң iTerm-де мына команданы жазыңыз:'),
      sp(1),
      codeBox([
        'cd ~/merke-agro-site',
        'git add -A',
        'git commit -m "SEO meta тегтер қосылды"',
        'git pull --rebase origin main && git push',
      ]),
      pb(),

      // ══════════ 5. GOOGLE SEARCH CONSOLE ══════════
      h1('5. GOOGLE SEARCH CONSOLE ТІРКЕУ'),
      p('Google Search Console — Google-ге «менің сайтым бар, мені индекстей гөр» деп айтатын тегін құрал. Тіркелмесе, Google сайтыңызды табуы айлар алуы мүмкін. Тіркелсе — 1-4 аптада табылады.'),
      sp(1),
      step('1','🌐','Search Console ашыңыз','Браузерде: search.google.com/search-console деп жазыңыз.'),
      sp(1),
      step('2','📧','Google аккаунтымен кіріңіз','Gmail аккаунтыңызбен кіріңіз.'),
      sp(1),
      step('3','➕','Жаңа мүлік қосыңыз','"Add property" → "URL prefix" таңдаңыз → https://astykmerke.kz деп жазыңыз → "Continue".'),
      sp(1),
      step('4','✅','Верификация (дәлелдеу)','Google сізге HTML тег береді. Мысалы:'),
      sp(1),
      codeBox(['<meta name="google-site-verification" content="AbCdEf123456"/>','',"Бұл тегті index.html-дің <head> бөліміне қойып, GitHub-қа push жасаңыз."]),
      sp(1),
      step('5','🔍','Верификация жасаңыз','Search Console-ге қайтып келіп "Verify" батырмасын басыңыз.'),
      sp(1),
      step('6','🗺️','Sitemap жіберіңіз','Left menu → Sitemaps → https://astykmerke.kz/sitemap.xml → "Submit".'),
      sp(1),
      step('7','⏳','Күтіңіз','Google 1-4 аптада сайтыңызды индекстейді. Search Console-де барысын бақылай аласыз.'),
      sp(1),
      infoBox('📊 Search Console арқылы не білуге болады?',[
        '• Пайдаланушылар қандай сөзбен іздеп кіреді',
        '• Сайтыңыздың Google-дегі орны (позициясы)',
        '• Қанша адам сайтқа кіргені (трафик)',
        '• Техникалық қателер болса — хабарлайды',
      ],'E8F5E9','2E7D32'),
      pb(),

      // ══════════ 6. ТЕКСЕРУ ══════════
      h1('6. САЙТТЫ ПАЙДАЛАНУШЫҒА БЕРУДЕН БҰРЫН ТЕКСЕРУ'),
      p('Сайтты басқа адамға бермес бұрын төмендегі тізімді толық орындаңыз. Барлығы жұмыс жасаса — беруге дайынсыз.'),
      sp(1),

      h2('6.1 Функционалдық тексеру'),
      sp(1),
      new Table({
        width:{size:9026,type:WidthType.DXA}, columnWidths:[600,8426],
        rows:[
          new TableRow({children:[
            new TableCell({borders:allBrd('1B5E20'),shading:{fill:'1B5E20',type:ShadingType.CLEAR},margins:{top:80,bottom:80,left:120,right:120},children:[new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({text:'✓',bold:true,size:22,font:'Arial',color:'FFFFFF'})]})]}),
            new TableCell({borders:allBrd('1B5E20'),shading:{fill:'1B5E20',type:ShadingType.CLEAR},margins:{top:80,bottom:80,left:120,right:120},children:[new Paragraph({children:[new TextRun({text:'Не тексеру керек',bold:true,size:20,font:'Arial',color:'FFFFFF'})]})]})
          ]}),
          ...([
            ['Басты бет ашылады ма?','astykmerke.kz немесе vercel URL ашыңыз'],
            ['Үш тіл ауысады ма?','ҚАЗ / РУС / ENG батырмаларын басыңыз'],
            ['Барлық бөлімдер жүктеледі ме?','Ферма, Тарих, Өнімдер, Команда, FAQ, Байланыс'],
            ['Байланыс формасы жіберіледі ме?','Тест email жазып, "Жіберу" басыңыз'],
            ['Админ панелі ашылады ма?','⚙️ → merke2026 → кіру'],
            ['Деректерді өзгертіп сақтаса болады ма?','Кез келген мәтінді өзгертіп "Сақтау" басыңыз'],
            ['Dark mode жұмыс жасайды ма?','🌙 батырмасын басыңыз'],
          ]).map(([k,v],i) => new TableRow({children:[
            new TableCell({borders:allBrd('BBBBBB'),shading:{fill:i%2===0?'F9FBF9':'FFFFFF',type:ShadingType.CLEAR},margins:{top:80,bottom:80,left:120,right:120},children:[new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({text:'⬜',size:22})]})]}),
            new TableCell({borders:allBrd('BBBBBB'),shading:{fill:i%2===0?'F9FBF9':'FFFFFF',type:ShadingType.CLEAR},margins:{top:80,bottom:80,left:120,right:120},children:[
              new Paragraph({children:[new TextRun({text:k,bold:true,size:20,font:'Arial'})]}),
              new Paragraph({spacing:{before:20,after:0},children:[new TextRun({text:v,size:19,font:'Arial',color:'666666'})]})
            ]})
          ]}))
        ]
      }),
      sp(2),

      h2('6.2 Мобильді тексеру'),
      p('Компьютерден тексеру жеткіліксіз. Телефоннан да міндетті түрде тексеріңіз:'),
      sp(1),
      ...(['📱 iPhone немесе Android телефонда сайтты ашыңыз','☰ Бургер мәзірі жұмыс жасайды ма?','Мәтіндер оқылады ма? (тым кіші емес пе?)','Суреттер/карточкалар дұрыс орналасқан ба?','Форм толтырып жіберуге болады ма?'].map(t => new Paragraph({spacing:{before:40,after:40},children:[new TextRun({text:t,size:22,font:'Arial'})]}))),
      sp(2),

      h2('6.3 Пайдаланушыға берген кезде не айту керек?'),
      sp(1),
      infoBox('Пайдаланушыға беретін ақпарат парағы:',[
        '🌐 Сайт мекенжайы: https://astykmerke.kz',
        '⚙️ Админ панелге кіру: ⚙️ батырмасын басу → пароль: merke2026',
        '📝 Мазмұн өзгерту: Админ → керекті бөлімді таңдау → Сақтау',
        '⏱️ Өзгерістер қашан көрінеді: 1-2 минуттан кейін',
        '📞 Мәселе болса хабарласу: [Ерасыл телефоны]',
      ],'E8F5E9','2E7D32'),
      sp(1),
      infoBox('⚠️ МАҢЫЗДЫ: Парольді ауыстырыңыз!',[
        'Сайтты бергенде merke2026 парольін жаңа адамға айтыңыз.',
        'Немесе js/app.js файлында const PASS = "merke2026" жолын тауып,',
        'парольді жаңасына ауыстырып, GitHub-қа push жасаңыз.',
      ],'FFEBEE','C62828'),
      pb(),

      // ══════════ 7. МӘСЕЛЕЛЕР ══════════
      h1('7. ЖИІ КЕЗДЕСЕТІН МӘСЕЛЕЛЕР ЖӘНЕ ШЕШІМДЕРІ'),
      sp(1),

      ...([
        ['❓ Домен ашылмайды', 'DNS жаңартылуын күтіңіз (1-48 сағат). Браузердің кэшін тазалаңыз: Ctrl+Shift+R немесе Command+Shift+R.', 'E3F2FD','1565C0'],
        ['❓ https:// жұмыс жасамайды', 'Версел автоматты SSL береді. Версел панелінде Domains бөліміне қараңыз — SSL статусын тексеріңіз.', 'E3F2FD','1565C0'],
        ['❓ Өзгертулер сайтта көрінбейді', 'Байланыс жылдамдығына байланысты 1-2 минут күтіңіз. Немесе браузерде Ctrl+Shift+R (жаңарту) басыңыз.', 'FFF8E1','F57F17'],
        ['❓ Форм жіберілмейді', 'GITHUB_TOKEN Версел орта айнымалысында бар-жоғын тексеріңіз. Версел → Settings → Environment Variables.', 'FFEBEE','C62828'],
        ['❓ Google-де табылмайды', 'Search Console-ге тіркеліп, sitemap жіберіңіз. 1-4 апта күтіңіз — бұл қалыпты жағдай.', 'FFF8E1','F57F17'],
        ['❓ Мобильде мәзір жұмыс жасамайды', '☰ батырмасын бір рет басыңыз. Егер ашылмаса — беттi жаңартыңыз (pull down to refresh).', 'E8F5E9','2E7D32'],
      ]).flatMap(([q,a,c,bc]) => [
        infoBox(q,[a],c,bc),
        sp(1),
      ]),
      pb(),

      // ══════════ ҚОРЫТЫНДЫ ══════════
      h1('ҚОРЫТЫНДЫ'),
      p('Осы нұсқаулықты орындасаңыз, «Астық Мерке» сайты толыққанды кәсіби деңгейде жұмыс жасайды:'),
      sp(1),
      ...([
        '✅ Өз доменіңіз болады: astykmerke.kz',
        '✅ Google-де табылады — іздеушілер сайтты таба алады',
        '✅ https:// — қауіпсіз байланыс, браузер ескертпейді',
        '✅ Мазмұнды өзгерту оңай — Админ панелі арқылы',
        '✅ Мобильде, планшетте, компьютерде жақсы жұмыс жасайды',
      ]).map(t => new Paragraph({spacing:{before:60,after:60},children:[new TextRun({text:t,size:24,font:'Arial',bold:true,color:'2E7D32'})]})),
      sp(2),
      new Paragraph({alignment:AlignmentType.CENTER, children:[new TextRun({text:'— Нұсқаулық аяқталды —', size:22, font:'Arial', color:'888888', italics:true})]}),
    ]
  }]
});

// ── САҚТАУ ───────────────────────────────────────────────────────────────────
const OUT = '/Users/yerasyl/merke-agro-site/Астык_Мерке_Домен_SEO_Нускаулык.docx';
Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(OUT, buf);
  console.log('✅ Файл жасалды:', OUT);
}).catch(e => console.error('❌', e.message));
