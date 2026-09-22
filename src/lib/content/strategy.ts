export type StrategyCopy = typeof AR

const AR = {
  home: 'الرئيسية',
  crumbLabel: 'مسار التنقل',
  navStrategy: 'الاستراتيجية',
  pageH: 'من الاستراتيجية إلى الأثر المستدام',
  pageLead: 'الرؤية والرسالة والركائز الخمس التي تحدّد أين نعمل وكيف ننفّذ.',
  strategyH: 'الرؤية والرسالة',
  visionLabel: 'الرؤية',
  missionLabel: 'الرسالة',
  vision:
    'أن تكون سيم برايم المنصة الاقتصادية الرائدة في بناء وتشغيل منظومات الأعمال المتكاملة التي تعظّم القيمة الاقتصادية، وتسرّع النمو، وتخلق فرصًا مستدامة في المملكة العربية السعودية والمنطقة.',
  mission:
    'نطوّر ونشغّل ونستثمر في منصات الأعمال المتخصصة من خلال توظيف التقنية، وبناء الشراكات الاستراتيجية، وربط سلاسل القيمة الاقتصادية؛ لتمكين الشركات ورواد الأعمال والمستثمرين من النمو وتحقيق أثر اقتصادي مستدام.',
  pillarsH: 'الركائز الاستراتيجية',
  pillars: [
    ['تطوير المنصات الاقتصادية', 'نؤسس ونشغّل كيانات متخصصة، طبقةً فوق طبقة، حتى تقوم بذاتها.'],
    ['الاستثمار في القطاعات الواعدة', 'ندخل مبكراً حيث يتقدّم الطلب، ونضاعف حصتنا مع نمو القطاع.'],
    ['بناء الشراكات الاستراتيجية', 'نلتقي مع الشريك في منتصف الطريق: خبرته وسوقنا، والمنفعة متبادلة.'],
    ['التميز التشغيلي', 'مؤشرات ومراجعات دورية تشدّ الأداء نحو مركزه لا نحو أطرافه.'],
    ['التحول الرقمي والابتكار', 'نمرّر التقنية والبيانات عبر المنظومة كلها، لا في منصة واحدة.'],
  ],
  sectorsH: 'القطاعات الاستراتيجية',
  sectors: ['الصناعة', 'التقنية', 'الأغذية', 'اللوجستيات', 'السياحة', 'العقار', 'الخدمات المالية', 'الترفيه'],
  sectorPh: 'ضع صورة من قطاع ',
  railPrev: 'السابق',
  railNext: 'التالي',
}

const EN: StrategyCopy = {
  home: 'Home',
  crumbLabel: 'Breadcrumb',
  navStrategy: 'Strategy',
  pageH: 'From strategy to sustainable impact',
  pageLead: 'The vision, the mission, and the five pillars that set where we operate and how we execute.',
  strategyH: 'Vision & mission',
  visionLabel: 'Vision',
  missionLabel: 'Mission',
  vision:
    'To be the leading platform for building and operating integrated economic ecosystems that maximize value, accelerate growth, and create sustainable opportunities across Saudi Arabia and the wider region.',
  mission:
    'We develop, operate and invest in specialized business platforms by leveraging technology, forging strategic partnerships and connecting economic value chains — to empower businesses, entrepreneurs and investors to grow and achieve sustainable economic impact.',
  pillarsH: 'Strategic pillars',
  pillars: [
    [
      'Develop economic platforms',
      'We found and operate specialised entities, layer by layer, until each stands on its own.',
    ],
    [
      'Invest in high-growth sectors',
      'We enter early where demand is moving, and raise our share as the sector grows.',
    ],
    [
      'Build strategic partnerships',
      'We meet partners halfway: their expertise, our market, benefit both ways.',
    ],
    [
      'Deliver operational excellence',
      'Indicators and standing reviews pull performance toward its centre, not its edges.',
    ],
    [
      'Drive digital transformation',
      'We run technology and data through the whole ecosystem, not one platform.',
    ],
  ],
  sectorsH: 'Strategic focus sectors',
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
  sectorPh: 'Drop a photo from ',
  railPrev: 'Previous',
  railNext: 'Next',
}

export const STRATEGY = { ar: AR, en: EN }
