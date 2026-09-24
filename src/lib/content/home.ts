/**
 * Home page copy. Arabic is the primary language; English is the parallel cut, not a gloss.
 *
 * The page is carried by its photography, so the copy is deliberately spare: the tagline, one
 * positioning line, a name and a line per sector. Almost every string is lifted from the
 * approved framework copy; the handful that are new are marked `// draft`, for the client to
 * confirm before launch.
 */

export type HomeCopy = typeof AR

const AR = {
  heroLabel: 'المقدمة',
  positioning: 'شركة لبناء المنظومات الاقتصادية',
  h1a: 'نُمكّن الأعمال،',
  h1b: 'نُسرّع النمو،',
  h1c: 'ونبني المنظومات الاقتصادية',
  exploreCta: 'استكشف منظومتنا',
  cta: 'تواصل معنا',
  metaScroll: 'انزل لاستكشاف المنظومة',
  scenes: 'مشاهد من قطاعات المنظومة',
  sceneLabel: 'عرض مشهد',
  pause: 'إيقاف العرض',
  play: 'تشغيل العرض',

  aboutKicker: 'من نحن',
  /** The positioning line, one verb per photograph: [words, capsule after them or -1]. */
  statement: [
    ['نطوّر', 0],
    ['ونشغّل', 1],
    ['ونستثمر', 2],
    ['في منصات الأعمال القابلة للتوسع.', -1],
  ] as [string, number][],
  aboutBody:
    'نبني منظومات أعمال متكاملة تربط بين رأس المال والتقنية والعمليات والشراكات الاستراتيجية لتسريع النمو الاقتصادي المستدام.',
  proof: [
    ['المقر', 'جدة، المملكة العربية السعودية'],
    ['التأسيس', '2025'],
    ['القطاعات', 'ثمانية قطاعات استراتيجية'],
    ['الأفق', '2030'],
  ],
  moreAbout: 'المزيد عنا',

  sectorsKicker: 'القطاعات الاستراتيجية',
  reelH: 'ثمانية قطاعات، وأفقٌ واحد', // draft
  sectorsLead: 'ندخل حيث يتقدّم الطلب، ونبني منصة تخدم القطاع بأكمله لا مشروعاً واحداً فيه.',
  sectors: ['الصناعة', 'التقنية', 'الأغذية', 'اللوجستيات', 'السياحة', 'العقار', 'الخدمات المالية', 'الترفيه'],
  sectorLines: [
    'القدرة التصنيعية وسلاسل الإمداد', // draft
    'المنصات الرقمية والذكاء الاصطناعي', // draft
    'تصنيع الأغذية الفاخرة',
    'التجارة والتوصيل في الميل الأخير',
    'تجارب داخل المملكة وإقليميًا',
    'إدارة وتشغيل العقارات وحلول الضيافة',
    'المدفوعات والخدمات المالية الرقمية', // draft
    'الوجهات والفعاليات والتجارب', // draft
  ],
  reelMore: 'اطّلع على الاستراتيجية', // draft

  platformsKicker: 'المنصات', // draft
  ecosystemH: 'منظومة أعمالنا',
  platforms: [
    ['تصنيع الأغذية الفاخرة', 'JAZ Choklat', 'من اختيار المكوّن حتى اكتمال التجربة.'],
    ['التجارة والتوصيل في الميل الأخير', 'eat.plus', 'أنظمة تشغيل حديثة وحلول متكاملة.'],
    ['سوق التجارب السياحية', 'ZL.TOURS', 'تجارب داخل المملكة وإقليميًا.'],
    ['منصة عقارية وضيافة', 'HOMERA', 'إدارة وتشغيل العقارات وحلول الضيافة.'],
  ],
  morePlatforms: 'كل المنصات',

  seemKicker: 'نموذج SEEM',
  seemH: 'أربع مراحل تحكم كل قرار',
  seemLead: 'الاسم نفسه هو منهجنا: أربعة أسئلة نطرحها على كل منصة، وأربع نتائج نقيسها.',
  seem: [
    ['S', 'الاستراتيجية', 'إلى أين نتجه؟', 'استراتيجية واضحة'],
    ['E', 'التمكين', 'هل نحن جاهزون للتنفيذ؟', 'جاهزية عالية'],
    ['E', 'التنفيذ', 'كيف نحوّل الخطط إلى واقع؟', 'تنفيذ منضبط'],
    ['M', 'القياس والتحسين', 'هل حققنا الأثر؟', 'أثر مستدام'],
  ],
  promiseLine: 'من الاستراتيجية .. إلى التنفيذ .. إلى الأثر المستدام',

  roadKicker: 'خارطة الطريق',
  roadH: 'أربع مراحل حتى الريادة',
  roadmap: [
    ['2025', 'التأسيس'],
    ['2026-2028', 'التوسع داخل المملكة'],
    ['2029', 'التوسع الإقليمي'],
    ['2030', 'الريادة في بناء المنظومات الاقتصادية'],
  ],
  moreRoad: 'خارطة الطريق كاملة',
  kpiH: 'الأهداف الاستراتيجية بحلول 2030',
  kpis: [
    ['40', 'منصة أعمال', ''],
    ['1', 'محفظة استثمارية', 'مليار ريال'],
    ['200', 'فرصة عمل', ''],
    ['50', 'شراكة استراتيجية', ''],
    ['10%', 'نمو سنوي', 'سنوياً'],
  ],

  bannerH: 'من الفكرة إلى منصة تعمل وتنمو',
  bannerBody:
    'نبني ونشغّل ونستثمر داخل منظومة واحدة، فتتبادل منصاتنا الخبرة وتتضاعف فرص النجاح المشترك.',
}

const EN: HomeCopy = {
  heroLabel: 'Introduction',
  positioning: 'An Economic Ecosystem Builder',
  h1a: 'Empowering business,',
  h1b: 'accelerating growth,',
  h1c: 'building economic ecosystems',
  exploreCta: 'Explore the ecosystem',
  cta: 'Contact us',
  metaScroll: 'Scroll to explore the ecosystem',
  scenes: 'Scenes from the ecosystem’s sectors',
  sceneLabel: 'Show the scene:',
  pause: 'Pause the scenes',
  play: 'Play the scenes',

  aboutKicker: 'Who we are',
  statement: [
    ['We develop', 0],
    ['operate', 1],
    ['and invest', 2],
    ['in scalable business platforms.', -1],
  ],
  aboutBody:
    'We build integrated business ecosystems that connect capital, technology, operations and strategic partnerships to accelerate sustainable economic growth.',
  proof: [
    ['Head office', 'Jeddah, Saudi Arabia'],
    ['Established', '2025'],
    ['Sectors', 'Eight strategic sectors'],
    ['Horizon', '2030'],
  ],
  moreAbout: 'More about us',

  sectorsKicker: 'Strategic focus sectors',
  reelH: 'Eight sectors. One horizon.', // draft
  sectorsLead:
    'We enter where demand is moving, and build a platform that serves the whole sector rather than one venture inside it.',
  sectors: [
    'Industry',
    'Technology',
    'Food',
    'Logistics',
    'Tourism',
    'Real estate',
    'Financial services',
    'Entertainment',
  ],
  sectorLines: [
    'Manufacturing capacity and supply chains', // draft
    'Digital platforms and AI', // draft
    'Premium food manufacturing',
    'Last-mile commerce',
    'Experiences across the Kingdom and region',
    'Property operations and hospitality',
    'Payments and digital finance', // draft
    'Destinations, events and experiences', // draft
  ],
  reelMore: 'See the strategy', // draft

  platformsKicker: 'Platforms', // draft
  ecosystemH: 'Our business ecosystem',
  platforms: [
    ['Premium food manufacturing', 'JAZ Choklat', 'From ingredient to finished experience.'],
    ['Last-mile commerce', 'eat.plus', 'Modern operating systems, integrated.'],
    ['Tourism marketplace', 'ZL.TOURS', 'Experiences across the Kingdom and region.'],
    ['Real estate & hospitality', 'HOMERA', 'Property operations and hospitality.'],
  ],
  morePlatforms: 'All platforms',

  seemKicker: 'The SEEM model',
  seemH: 'Four stages behind every decision',
  seemLead:
    'The name is the method: four questions we put to every platform, and four outcomes we measure.',
  seem: [
    ['S', 'Strategy', 'Where are we going?', 'Clear strategy'],
    ['E', 'Enablement', 'Are we ready to execute?', 'Strong readiness'],
    ['E', 'Execution', 'How do we turn plans into reality?', 'Disciplined execution'],
    ['M', 'Measurement & improvement', 'Did we achieve the impact?', 'Sustainable impact'],
  ],
  promiseLine: 'From strategy .. to execution .. to sustainable impact',

  roadKicker: 'Roadmap',
  roadH: 'Four phases to leadership',
  roadmap: [
    ['2025', 'Foundation'],
    ['2026-2028', 'Saudi expansion'],
    ['2029', 'Regional expansion'],
    ['2030', 'Leading economic ecosystem platform'],
  ],
  moreRoad: 'The full roadmap',
  kpiH: 'Strategic targets by 2030',
  kpis: [
    ['40', 'Business platforms', ''],
    ['1', 'Investment portfolio', 'SR billion'],
    ['200', 'Jobs created', ''],
    ['50', 'Strategic partnerships', ''],
    ['10%', 'Annual growth', 'per year'],
  ],

  bannerH: 'From an idea to a platform that runs and grows',
  bannerBody:
    'We build, operate and invest inside one ecosystem, so our platforms exchange expertise and multiply shared success.',
}

export const HOME = { ar: AR, en: EN }

/**
 * Which platform already operates in which sector — the reel names it under the sector's line.
 * Platform names are the client's marks and read the same in both languages.
 */
export const SECTOR_PLATFORMS: Record<number, string> = {
  2: 'JAZ Choklat',
  3: 'eat.plus',
  4: 'ZL.TOURS',
  5: 'HOMERA',
}
