export type AboutCopy = typeof AR

const AR = {
  home: 'الرئيسية',
  crumbLabel: 'مسار التنقل',
  navAbout: 'من نحن',
  positioning: 'شركة لبناء المنظومات الاقتصادية',
  aboutLead:
    'سيم برايم شركة استثمارية وتشغيلية استراتيجية متخصصة في تطوير وتشغيل والاستثمار في منصات الأعمال القابلة للتوسع.',
  aboutBody:
    'نبني منظومات أعمال متكاملة تربط بين رأس المال والتقنية والعمليات والشراكات الاستراتيجية لتسريع النمو الاقتصادي المستدام.',
  storyH: 'منظومة واحدة تربط رأس المال بالتشغيل',
  metaCity: 'جدة، المملكة العربية السعودية',
  metaEst: 'تأسست 2025',
  kpiH: 'الأهداف الاستراتيجية بحلول 2030',
  targetLine: '40 منصة · مليار ريال · 200 فرصة عمل',
  tagline: ['تمكين الأعمال', 'تسريع النمو', 'بناء المنظومات الاقتصادية'],
  promiseLine: 'من الاستراتيجية .. إلى التنفيذ .. إلى الأثر المستدام',
  valuesH: 'القيم المؤسسية',
  values: [
    ['الريادة والابتكار', 'رؤية مستقبلية وحلول نوعية.'],
    ['الشراكة والثقة', 'نزاهة وشفافية ونجاح مشترك.'],
    ['التميز التشغيلي', 'تنفيذ منضبط ومعايير عالمية.'],
    ['الاستدامة', 'أثر اقتصادي واجتماعي وبيئي.'],
    ['التركيز على النتائج', 'نتائج قابلة للقياس ومساءلة.'],
    ['المسؤولية والحوكمة', 'حوكمة والتزام وقرارات مسؤولة.'],
  ],
  stakeH: 'أصحاب المصلحة',
  stakeLead: 'منظومة واحدة، وخمس جهات تنتفع بها — لكل منها ما يعود عليه من نموّنا.',
  stakeholders: [
    ['المستثمرون', 'عوائد استثمارية مستدامة'],
    ['الجهات الحكومية', 'دعم التنويع الاقتصادي'],
    ['الشركات', 'منصات للنمو والتوسع'],
    ['رواد الأعمال', 'الوصول إلى الأسواق'],
    ['المجتمع', 'فرص عمل وتنمية مستدامة'],
  ],
  galH: 'الأثر كما يُرى على الأرض',
  galBody: 'صور من مصانعنا، منصاتنا، ومواقع تشغيلنا — الأثر الذي نتحدث عنه، موثّقاً كما هو.',
  gallery: [
    ['التصنيع', 'مصنع جازان — خطوط الإنتاج', 'ضع صورة المصنع أو خط الإنتاج'],
    ['التشغيل', 'الميدان اليومي', 'ضع صورة من العمليات التشغيلية'],
    ['الضيافة', 'التجربة كما يعيشها العميل', 'ضع صورة من تجربة العميل'],
  ],
}

const EN: AboutCopy = {
  home: 'Home',
  crumbLabel: 'Breadcrumb',
  navAbout: 'About',
  positioning: 'An Economic Ecosystem Builder',
  aboutLead:
    'SEEM PRIME is a strategic investment and operating company specializing in developing, operating and investing in scalable business platforms.',
  aboutBody:
    'We build integrated business ecosystems that connect capital, technology, operations and strategic partnerships to accelerate sustainable economic growth.',
  storyH: 'One ecosystem connecting capital to operations',
  metaCity: 'Jeddah, Kingdom of Saudi Arabia',
  metaEst: 'Established 2025',
  kpiH: 'Strategic targets by 2030',
  targetLine: '40 platforms · SR 1B · 200 jobs',
  tagline: ['Empowering businesses', 'Accelerating growth', 'Building economic ecosystems'],
  promiseLine: 'From strategy .. to execution .. to sustainable impact',
  valuesH: 'Corporate values',
  values: [
    ['Leadership & innovation', 'Vision-led, with transformative solutions.'],
    ['Partnership & trust', 'Integrity, transparency, mutual success.'],
    ['Operational excellence', 'Disciplined execution, world-class standards.'],
    ['Sustainability', 'Economic, social and environmental value.'],
    ['Results orientation', 'Measurable outcomes and accountability.'],
    ['Responsibility & governance', 'Governance, compliance, responsible decisions.'],
  ],
  stakeH: 'Stakeholders',
  stakeLead: 'One ecosystem, five groups it serves — each with a distinct return from how we grow.',
  stakeholders: [
    ['Investors', 'Attractive long-term returns'],
    ['Government', 'Economic diversification'],
    ['Businesses', 'Growth platforms'],
    ['Entrepreneurs', 'Market access'],
    ['Communities', 'Jobs & sustainable development'],
  ],
  galH: 'The impact, as it looks on the ground',
  galBody:
    'Images from our factories, platforms and operating sites — the impact we describe, documented as it is.',
  gallery: [
    ['Manufacturing', 'Jazan facility — production lines', 'Drop a factory or production-line photo'],
    ['Operations', 'The daily field', 'Drop a photo from operations'],
    ['Hospitality', 'The experience as the customer lives it', 'Drop a customer-experience photo'],
  ],
}

export const ABOUT = { ar: AR, en: EN }

/** Artwork supplied so far. Remaining frames keep their placeholder caption. */
export const GALLERY_IMAGES: (string | undefined)[] = [
  '/ds/img/about-manufacturing.webp',
  undefined,
  undefined,
]
