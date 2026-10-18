/**
 * Home page copy. Arabic is the primary language; English is the parallel cut, not a gloss.
 *
 * The page is carried by its photography, so the copy is deliberately spare: the tagline, one
 * positioning line, a name and a line per sector. Almost every string is lifted from the
 * approved framework copy; the handful that are new are marked `// draft`, for the client to
 * confirm before launch. A one-sentence line carries no full stop at its end, in either language.
 */

export type HomeCopy = typeof AR

const AR = {
  heroLabel: 'المقدمة',
  /** The tagline, a line per entry: a short line, then a long one, joined by و rather than commas. */
  h1: ['نُمكّن الأعمال ونُسرّع النمو', 'ونبني المنظومات الاقتصادية'],
  exploreCta: 'استكشف منظومتنا',
  cta: 'تواصل معنا',
  metaScroll: 'انزل لاستكشاف المنظومة',
  scenes: 'مشاهد من قطاعات المنظومة',
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
    ['القطاعات', 'تسعة قطاعات استراتيجية'],
    ['الأفق', '2030'],
  ],
  moreAbout: 'المزيد عنا',

  reelH: 'تسعة قطاعات في منظومة واحدة', // draft
  sectorsLead: 'ندخل حيث يتقدّم الطلب، ونبني منصة تخدم القطاع بأكمله لا مشروعاً واحداً فيه',
  sectors: ['الصناعة', 'التجارة الإلكترونية', 'اللوجستيات', 'السياحة', 'العقار', 'الترفيه', 'التموين', 'التوريد', 'الزراعة'],
  sectorLines: [
    'القدرة التصنيعية وسلاسل الإمداد', // draft
    'المتاجر الإلكترونية ومنصات البيع الرقمية', // draft
    'التجارة والتوصيل في الميل الأخير',
    'تجارب داخل المملكة وإقليميًا',
    'إدارة وتشغيل العقارات وحلول الضيافة',
    'الوجهات والفعاليات والتجارب', // draft
    'التموين الفاخر وإدارة الضيافة والمرافق', // draft
    'توريد المنتجات والمواد من المصدر إلى العميل', // draft
    'زراعة البن والكاكاو', // draft
  ],
  reelMore: 'اطّلع على الاستراتيجية', // draft

  ecosystemH: 'منظومة أعمالنا',
  platforms: [
    ['تصنيع الأغذية الفاخرة', 'JAZ Chocolate', 'من اختيار المكوّن حتى اكتمال التجربة'],
    ['التجارة والتوصيل في الميل الأخير', 'eat.plus', 'أنظمة تشغيل حديثة وحلول متكاملة'],
    ['سوق التجارب السياحية', 'ZL.TOURS', 'تجارب داخل المملكة وإقليميًا'],
    ['منصة عقارية وضيافة', 'HOMERA', 'إدارة وتشغيل العقارات وحلول الضيافة'],
    ['منتجع ريفي', 'قنيف', 'إقامة وتجارب عائلية في قلب الطبيعة'], // draft
    ['خدمات التوريد والتموين الفاخر', 'سيم للتوريدات', 'من التوريد إلى المائدة'], // draft
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
  // The English keeps its three beats: joined into the Arabic's two lines, it would wrap to four.
  h1: ['Empowering business,', 'accelerating growth,', 'building economic ecosystems'],
  exploreCta: 'Explore the ecosystem',
  cta: 'Contact us',
  metaScroll: 'Scroll to explore the ecosystem',
  scenes: 'Scenes from the ecosystem’s sectors',
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
    ['Sectors', 'Nine strategic sectors'],
    ['Horizon', '2030'],
  ],
  moreAbout: 'More about us',

  reelH: 'Nine sectors in one ecosystem', // draft
  sectorsLead:
    'We enter where demand is moving, and build a platform that serves the whole sector rather than one venture inside it',
  sectors: [
    'Industry',
    'E-commerce',
    'Logistics',
    'Tourism',
    'Real estate',
    'Entertainment',
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
    'Destinations, events and experiences', // draft
    'VIP catering, hospitality and facilities', // draft
    'Products and materials, from source to client', // draft
    'Coffee and cocoa farming', // draft
  ],
  reelMore: 'See the strategy', // draft

  ecosystemH: 'Our business ecosystem',
  platforms: [
    ['Premium food manufacturing', 'JAZ Chocolate', 'From ingredient to finished experience'],
    ['Last-mile commerce', 'eat.plus', 'Modern operating systems, integrated'],
    ['Tourism marketplace', 'ZL.TOURS', 'Experiences across the Kingdom and region'],
    ['Real estate & hospitality', 'HOMERA', 'Property operations and hospitality'],
    ['Countryside resort', 'Qanif', 'Family stays and experiences in the countryside'], // draft
    ['Supply and VIP catering', 'SEEM Supply', 'From supply to the table'], // draft
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
