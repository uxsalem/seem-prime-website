import type { PLATFORM_IDS } from '@/lib/content/ecosystem'

/**
 * Home page copy. Arabic is the primary language; English is the parallel cut, not a gloss.
 *
 * The page is carried by its photography, so the copy is deliberately spare: a day in the
 * ecosystem, one positioning line, a name and a line per sector. Almost every string is lifted
 * from the approved copy; the handful that are new are marked `// draft`, for the client to
 * confirm before launch. A one-sentence line carries no full stop at its end, in either language.
 */

export type HomeCopy = typeof AR

/** One scene of the hero's day. */
type Scene = {
  /** The main line, then the line under it, then what the sector does. */
  title: string
  sub: string
  body: string
  /**
   * Whose scene it is, when the button does not already say: the ecosystem itself, what a
   * platform grows, or the platforms a sector gathers. Empty where the button names the platform,
   * so no scene names one twice.
   */
  brand: string
  cta: string
}

/** Where a scene of the hero's day sits in the day, and in the ecosystem. */
type Hour = {
  /** The scene's hour on a 24-hour clock, «05:00», or «24» for the whole day; it is read out on a 12-hour one. */
  clock: string
  /** The scene's place in `sectors`; the first scene is the ecosystem itself, not one sector of it. */
  sector: number | null
  /** The platform whose address on the ecosystem page the scene opens onto; without one, the page itself. */
  platform?: (typeof PLATFORM_IDS)[number]
}

/**
 * The hero's day, the same in both languages: the whole day first, then a sector at the hour it
 * meets someone's day, from dawn to evening. Every language's `day` follows this order.
 */
export const DAY: Hour[] = [
  { clock: '24', sector: null },
  { clock: '05:00', sector: 4, platform: 'homera' },
  { clock: '07:30', sector: 2, platform: 'eat-plus' },
  { clock: '09:30', sector: 7, platform: 'qanif' },
  { clock: '12:00', sector: 0, platform: 'jaz-chocolate' },
  { clock: '14:30', sector: 3, platform: 'zl-tours' },
  { clock: '16:30', sector: 6, platform: 'catering-supply' },
  { clock: '18:00', sector: 1 },
  { clock: '20:30', sector: 5, platform: 'catering-supply' },
]

const AR = {
  heroLabel: 'المقدمة',
  /** The page's title for assistive technology and search; on screen, each scene sets its own. */
  heroTitle: 'سيم برايم: منظومة تُرافق يومك',
  /** The first scene's name in the index, where the others name their sectors. */
  ecosystemName: 'منظومة سيم',
  /** The two halves of the day, set small beside each scene's hour on a 12-hour clock. */
  am: 'ص',
  pm: 'م',
  /**
   * The client's copy for the hero, scene by scene, in `DAY`'s order. Spelling slips in the
   * supplied text are corrected: «إمدادك» takes its hamza, «شركاءنا» is the object of «نمكّن»,
   * «وناسه» drops a damma the genitive cannot carry, «بمعايير عالية» gets its space, and the
   * line after «تذوّق قطعة من الفرح» loses its trailing «..». Qanif is written in Latin, as
   * everywhere else on the Arabic pages. No venture carries SEEM's name: SEEM is the group. Nefaah
   * is not in the supplied text: the October 19 review asked for its name beside eat.plus, so it
   * stands with it at 7:30 and in the list at 18:00.
   */
  day: [
    {
      title: 'منظومة تُرافق يومك',
      sub: '',
      body: 'تتكامل مشاريع سيم لتكون جزءاً من نمط حياتك، فنربط خيرات الأرض بالإنتاج المحلي ونقرّب المنتجات والخدمات إليك، لنبني منظومة ترتقي بجودة الحياة وتنمو مع المجتمع برؤية تراعي الاستدامة والبيئة',
      brand: 'SEEM',
      cta: 'استكشف منظومتنا',
    },
    {
      title: 'نَم على حلمك',
      sub: 'تحت سقفك، ينام القلب قبل العين',
      body: 'نقدم الفرص العقارية من خلال منظومة متكاملة تجمع التسويق العقاري والحلول التمويلية والتسهيلات لتلبية تطلعات الأفراد والمستثمرين، وندعم خيارات السكن والتملّك والاستثمار بما يعزز جودة الحياة ويسهم في تنمية مجتمعات أكثر استقراراً وازدهاراً',
      brand: '',
      cta: 'اكتشف HOMERA',
    },
    {
      title: 'اطلب الحي كله',
      sub: 'من مطابخ الحي إلى بابك: شيفات مستقلون وفود ترك وبقالات الحي في مكان واحد',
      body: 'نقرّب منتجات أهل الحي من عملائهم، ونفتح للأسر والطهاة المستقلين وأصحاب العربات فرصاً أوسع للنمو والوصول',
      // Logistics holds two platforms, so the line names both and the button neither.
      brand: 'eat.plus · Nefaah',
      cta: 'اكتشف المنصتين', // draft
    },
    {
      title: 'اشرب ما زُرع هنا',
      sub: 'بُنك الصباحي وكاكاوك من قلب جازان',
      body: 'نعتز بخيرات أرضنا ومعرفة مزارعينا، ونطور الزراعة المحلية بممارسات تحافظ على التربة والمياه وتضمن استمرار الإنتاج للأجيال القادمة',
      brand: 'كاكاو وبن سعودي',
      cta: 'اكتشف Qanif',
    },
    {
      title: 'تذوّق قطعة من الفرح',
      sub: 'نصنع ما يُفرح كل يوم',
      body: 'نستثمر في مقومات جازان لنبني صناعة محلية بمعايير عالية، وننقل المعرفة ونطور المهارات المحلية بما يدعم استدامة الإنتاج ويصنع منتجاً يفخر به أهله',
      brand: '',
      cta: 'اكتشف JAZ Chocolate',
    },
    {
      title: 'عِش المكان مع أهله',
      sub: 'تجارب تعرّفك على ثقافة المكان وطبيعته وناسه',
      body: 'نربط الزوار بأهل المكان وثقافته، ونفتح فرصاً للمجتمعات المحلية عبر تجارب أصيلة تحترم تراثنا وتحافظ على طبيعة مواقعنا',
      brand: '',
      cta: 'اكتشف ZL.TOURS',
    },
    {
      title: 'احتياجك يصلك دائماً',
      sub: 'إمدادك ثابت مهما تقلّب السوق',
      body: 'نبني شراكات طويلة مع الموردين المحليين ترفع كفاءة الإمداد، فتستمر أعمال شركائنا بثبات ويقل الهدر في كل مرحلة من السلسلة',
      brand: '',
      cta: 'اكتشف Catering & Supply',
    },
    {
      title: 'تسوّق من كل منصاتنا',
      sub: 'منتجاتنا وخدماتنا على بُعد ضغطة',
      body: 'نجمع منتجات المنظومة وخدماتها في قنوات رقمية متكاملة تسهّل البيع والشراء، ونمكّن مشاريعنا وشركاءنا من النمو والوصول إلى عملاء أكثر',
      brand: 'JAZ · ZL.TOURS · HOMERA · eat.plus · Nefaah',
      cta: 'استكشف منظومتنا',
    },
    {
      title: 'احتفِ بنكهة المكان',
      sub: 'موائد فاخرة وأنيقة تُروى حكايتها',
      // Two sentences, so both keep their full stops.
      body: 'نرتقي بمفهوم التموين والضيافة ليكون جزءًا من جودة الحياة وثقافة اللقاء، من خلال تجارب تجمع الناس وتعكس كرم الضيافة وتنوّع المذاق. ونربط هذا الدور بتنمية الكفاءات ودعم المنتجات المحلية والاستخدام المسؤول للموارد، بما يخلق قيمة تمتد إلى المجتمع والاقتصاد والبيئة.',
      brand: '',
      cta: 'اكتشف Catering & Supply',
    },
  ] as Scene[],
  exploreCta: 'استكشف منظومتنا',
  cta: 'تواصل معنا',
  metaScroll: 'انزل لاستكشاف المنظومة',
  scenes: 'مشاهد من يوم في المنظومة',
  sceneLabel: 'عرض مشهد',
  pause: 'إيقاف العرض',
  play: 'تشغيل العرض',

  /** The positioning line, one verb per photograph: [words, capsule after them or -1]. */
  statement: [
    ['نطوّر', 0],
    ['ونشغّل', 1],
    ['ونستثمر', 2],
    ['في منصات الأعمال القابلة للتوسع', -1],
  ] as [string, number][],
  aboutBody:
    'نبني منظومات أعمال متكاملة تربط بين رأس المال والتقنية والعمليات والشراكات الاستراتيجية لتسريع النمو الاقتصادي المستدام',
  proof: [
    ['المقر', 'جدة، المملكة العربية السعودية'],
    ['التأسيس', '2025'],
    ['القطاعات', 'ثمانية قطاعات استراتيجية'],
  ],
  moreAbout: 'المزيد عنا',

  reelH: 'ثمانية قطاعات في منظومة واحدة', // draft
  sectorsLead: 'ندخل حيث يتقدّم الطلب، ونبني منصة تخدم القطاع بأكمله لا مشروعاً واحداً فيه',
  sectors: ['الصناعة', 'التجارة الإلكترونية', 'اللوجستيات', 'السياحة', 'العقار', 'التموين', 'التوريد', 'الزراعة'],
  sectorLines: [
    'القدرة التصنيعية وسلاسل الإمداد', // draft
    'المتاجر الإلكترونية ومنصات البيع الرقمية', // draft
    'التجارة والتوصيل في الميل الأخير',
    'تجارب داخل المملكة وإقليميًا',
    'إدارة وتشغيل العقارات وحلول الضيافة',
    'التموين الفاخر وإدارة الضيافة والمرافق', // draft
    'توريد المنتجات والمواد من المصدر إلى العميل', // draft
    'زراعة البن والكاكاو', // draft
  ],
  reelMore: 'اطّلع على الاستراتيجية', // draft

  ecosystemH: 'منظومة أعمالنا',
  platforms: [
    ['تصنيع الأغذية الفاخرة', 'JAZ Chocolate', 'من اختيار المكوّن حتى اكتمال التجربة'],
    ['التجارة والتوصيل في الميل الأخير', 'eat.plus', 'أنظمة تشغيل حديثة وحلول متكاملة'],
    ['تطبيق توصيل الطعام والبقالة', 'Nefaah', 'المطاعم والبقالة في تطبيق واحد'], // draft
    ['سوق التجارب السياحية', 'ZL.TOURS', 'تجارب داخل المملكة وإقليميًا'],
    ['منصة عقارية وضيافة', 'HOMERA', 'إدارة وتشغيل العقارات وحلول الضيافة'],
    ['منتجع ريفي', 'Qanif', 'إقامة وتجارب عائلية في قلب الطبيعة'], // draft
    ['خدمات التوريد والتموين الفاخر', 'Catering & Supply', 'من التوريد إلى المائدة'], // draft
  ],
  morePlatforms: 'كل المنصات',

  seemH: 'أربع مراحل تحكم كل قرار',
  seemLead: 'الاسم نفسه هو منهجنا: أربعة أسئلة نطرحها على كل منصة، وأربع نتائج نقيسها',
  seem: [
    ['S', 'الاستراتيجية', 'إلى أين نتجه؟', 'استراتيجية واضحة'],
    ['E', 'التمكين', 'هل نحن جاهزون للتنفيذ؟', 'جاهزية عالية'],
    ['E', 'التنفيذ', 'كيف نحوّل الخطط إلى واقع؟', 'تنفيذ منضبط'],
    ['M', 'القياس والتحسين', 'هل حققنا الأثر؟', 'أثر مستدام'],
  ],
  promiseLine: 'من الاستراتيجية إلى التنفيذ إلى الأثر المستدام',

  bannerH: 'من الفكرة إلى منصة تعمل وتنمو',
  bannerBody:
    'نبني ونشغّل ونستثمر داخل منظومة واحدة، فتتبادل منصاتنا الخبرة وتتضاعف فرص النجاح المشترك',
}

const EN: HomeCopy = {
  heroLabel: 'Introduction',
  heroTitle: 'SEEM PRIME: an ecosystem for your whole day', // draft
  ecosystemName: 'SEEM ecosystem', // draft
  am: 'AM',
  pm: 'PM',
  /** The client wrote the hero in Arabic; every English scene is a draft translation of it. */
  day: [
    {
      title: 'An ecosystem for your whole day',
      sub: '',
      body: 'SEEM’s ventures fit together into the way you live: we connect the land’s bounty to local production and bring products and services closer to you, building an ecosystem that raises the quality of life and grows with the community, with sustainability and the environment in mind',
      brand: 'SEEM',
      cta: 'Explore the ecosystem',
    },
    {
      title: 'Sleep in your dream home',
      sub: 'Under your own roof, the heart falls asleep before the eyes',
      body: 'We bring real estate opportunities through an integrated ecosystem of property marketing, financing solutions and facilitation that meets the ambitions of individuals and investors, and we support the choice to live, own and invest in ways that raise the quality of life and help communities grow more stable and prosperous',
      brand: '',
      cta: 'Discover HOMERA',
    },
    {
      title: 'Order the whole neighborhood',
      sub: 'From the neighborhood’s kitchens to your door: independent chefs, food trucks and local grocers in one place',
      body: 'We bring the neighborhood’s products closer to its customers, and give families, independent cooks and food-truck owners more room to grow and reach people',
      brand: 'eat.plus · Nefaah',
      cta: 'Discover both platforms',
    },
    {
      title: 'Drink what was grown here',
      sub: 'Your morning coffee and cocoa, from the heart of Jazan',
      body: 'We take pride in our land’s bounty and our farmers’ knowledge, and develop local agriculture with practices that protect the soil and the water and keep production going for generations to come',
      brand: 'Saudi cocoa and coffee',
      cta: 'Discover Qanif',
    },
    {
      title: 'Taste a piece of joy',
      sub: 'We make what brings joy, every day',
      body: 'We invest in what Jazan has to offer to build local industry to high standards, passing on knowledge and developing local skills so that production lasts and makes something its people are proud of',
      brand: '',
      cta: 'Discover JAZ Chocolate',
    },
    {
      title: 'Live the place with its people',
      sub: 'Experiences that introduce you to a place’s culture, its nature and its people',
      body: 'We connect visitors with the people of a place and its culture, and open opportunities for local communities through authentic experiences that respect our heritage and protect the nature of our sites',
      brand: '',
      cta: 'Discover ZL.TOURS',
    },
    {
      title: 'What you need, always on its way',
      sub: 'Your supply holds steady, however the market turns',
      body: 'We build long partnerships with local suppliers that make supply more efficient, so our partners’ businesses run steadily and less is wasted at every link of the chain',
      brand: '',
      cta: 'Discover Catering & Supply',
    },
    {
      title: 'Shop all our platforms',
      sub: 'Our products and services, a tap away',
      body: 'We bring the ecosystem’s products and services together in integrated digital channels that make buying and selling easier, and help our ventures and partners grow and reach more customers',
      brand: 'JAZ · ZL.TOURS · HOMERA · eat.plus · Nefaah',
      cta: 'Explore the ecosystem',
    },
    {
      title: 'Celebrate the taste of the place',
      sub: 'Fine, elegant tables, each with a story to tell',
      body: 'We make catering and hospitality part of the quality of life and the culture of gathering, through experiences that bring people together and reflect generous hospitality and a variety of flavors. We tie this role to developing talent, supporting local produce and using resources responsibly, creating value that reaches society, the economy and the environment.',
      brand: '',
      cta: 'Discover Catering & Supply',
    },
  ],
  exploreCta: 'Explore the ecosystem',
  cta: 'Contact us',
  metaScroll: 'Scroll to explore the ecosystem',
  scenes: 'Scenes from a day in the ecosystem',
  sceneLabel: 'Show the scene:',
  pause: 'Pause the scenes',
  play: 'Play the scenes',

  statement: [
    ['We develop', 0],
    ['operate', 1],
    ['and invest', 2],
    ['in scalable business platforms', -1],
  ],
  aboutBody:
    'We build integrated business ecosystems that connect capital, technology, operations and strategic partnerships to accelerate sustainable economic growth',
  proof: [
    ['Head office', 'Jeddah, Saudi Arabia'],
    ['Established', '2025'],
    ['Sectors', 'Eight strategic sectors'],
  ],
  moreAbout: 'More about us',

  reelH: 'Eight sectors in one ecosystem', // draft
  sectorsLead:
    'We enter where demand is moving, and build a platform that serves the whole sector rather than one venture inside it',
  sectors: [
    'Industry',
    'E-commerce',
    'Logistics',
    'Tourism',
    'Real estate',
    'Catering',
    'Supply',
    'Agriculture',
  ],
  sectorLines: [
    'Manufacturing capacity and supply chains', // draft
    'Online stores and digital marketplaces', // draft
    'Last-mile commerce',
    'Experiences across the Kingdom and region',
    'Property operations and hospitality',
    'VIP catering, hospitality and facilities', // draft
    'Products and materials, from source to client', // draft
    'Coffee and cocoa farming', // draft
  ],
  reelMore: 'See the strategy', // draft

  ecosystemH: 'Our business ecosystem',
  platforms: [
    ['Premium food manufacturing', 'JAZ Chocolate', 'From ingredient to finished experience'],
    ['Last-mile commerce', 'eat.plus', 'Modern operating systems, integrated'],
    ['Food and grocery delivery app', 'Nefaah', 'Restaurants and groceries in one app'], // draft
    ['Tourism marketplace', 'ZL.TOURS', 'Experiences across the Kingdom and region'],
    ['Real estate & hospitality', 'HOMERA', 'Property operations and hospitality'],
    ['Countryside resort', 'Qanif', 'Family stays and experiences in the countryside'], // draft
    ['Supply and VIP catering', 'Catering & Supply', 'From supply to the table'], // draft
  ],
  morePlatforms: 'All platforms',

  seemH: 'Four stages behind every decision',
  seemLead:
    'The name is the method: four questions we put to every platform, and four outcomes we measure',
  seem: [
    ['S', 'Strategy', 'Where are we going?', 'Clear strategy'],
    ['E', 'Enablement', 'Are we ready to execute?', 'Strong readiness'],
    ['E', 'Execution', 'How do we turn plans into reality?', 'Disciplined execution'],
    ['M', 'Measurement & improvement', 'Did we achieve the impact?', 'Sustainable impact'],
  ],
  promiseLine: 'From strategy to execution to sustainable impact',

  bannerH: 'From an idea to a platform that runs and grows',
  bannerBody:
    'We build, operate and invest inside one ecosystem, so our platforms exchange expertise and multiply shared success',
}

export const HOME = { ar: AR, en: EN }
