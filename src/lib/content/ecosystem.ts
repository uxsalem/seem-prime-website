/**
 * Ecosystem page copy. Arabic is the primary language; English is the parallel cut, not a gloss.
 *
 * The page presents the four platforms one at a time, each laid on the one before it, then pulls
 * back to show what the four stand on: one base, and four shared cores running through every
 * platform. It closes on the door. The platforms' names, sectors and lines, the four strands, the
 * 2030 target and the closing copy are the approved framework copy; the handful of strings that
 * are new are marked `// draft`, for the client to confirm before launch.
 */

export type EcosystemCopy = typeof AR

const AR = {
  home: 'الرئيسية',
  crumbLabel: 'مسار التنقل',
  navEcosystem: 'منظومتنا',
  ecosystemH: 'منظومة أعمالنا',
  ecosystemLead: 'منصات متكاملة تصنع قيمة اقتصادية مستدامة.',
  contentsLabel: 'فصول الصفحة', // draft
  /** The contents line: the platforms, then the ecosystem they make: [group, chapters]. */
  groups: [
    ['المنصات', ['JAZ Choklat', 'eat.plus', 'ZL.TOURS', 'HOMERA']],
    ['المنظومة', ['منظومة واحدة', 'ابنِ معنا']], // draft
  ] as [string, string[]][],

  // --- The platforms --------------------------------------------------------------------------

  platformsKicker: 'المنصات', // draft
  deckH: 'أربع منصات، ومنظومة واحدة', // draft
  deckLead: 'تُبنى كل منصة طبقةً فوق طبقة حتى تقوم بذاتها، وتقوم المنصات الأربع على منظومة واحدة.', // draft
  /**
   * [sector, what the platform is, name, its line]. The name is the client's mark and reads the
   * same in both languages.
   */
  platforms: [
    ['الأغذية', 'تصنيع الأغذية الفاخرة', 'JAZ Choklat', 'من اختيار المكوّن حتى اكتمال التجربة.'],
    ['اللوجستيات', 'التجارة والتوصيل في الميل الأخير', 'eat.plus', 'أنظمة تشغيل حديثة وحلول متكاملة.'],
    ['السياحة', 'سوق التجارب السياحية', 'ZL.TOURS', 'تجارب داخل المملكة وإقليميًا.'],
    ['العقار', 'منصة عقارية وضيافة', 'HOMERA', 'إدارة وتشغيل العقارات وحلول الضيافة.'],
  ],
  /** What each platform's second picture shows, in the same order. */
  details: ['التجربة المكتملة', 'الميل الأخير', 'وجهات وتجارب', 'الضيافة'], // draft
  sectorLabel: 'القطاع', // draft
  ecoLink: 'تواصل بشأن هذه المنصة',

  // --- One ecosystem --------------------------------------------------------------------------

  modelH: 'ما تقوم عليه كل منصة', // draft
  modelBody:
    'نبني ونشغّل ونستثمر داخل منظومة واحدة، فتتبادل منصاتنا الخبرة وتتضاعف فرص النجاح المشترك.',
  /** The four shared cores, named as the framework names its four strands: [strand, what it brings]. */
  cores: [
    ['رأس المال', 'الخبرة الاستثمارية'],
    ['التقنية', 'التحول الرقمي والابتكار'],
    ['العمليات', 'التميز التشغيلي'],
    ['الشراكات الاستراتيجية', 'النمو والوصول إلى الأسواق'],
  ],
  coresLabel: 'أربعة محاور مشتركة تمرّ بكل منصة', // draft
  target: '40 منصة أعمال بحلول 2030',
  targetLine: 'منظومة صُمّمت لتتّسع لمنصات أكثر.', // draft
  modelLabel: 'نموذج المنظومة: أربع منصات فوق قاعدة واحدة، تمرّ بها أربعة محاور مشتركة، ومتّسع لمنصات أكثر', // draft

  // --- Build with us --------------------------------------------------------------------------

  closeH: 'هل تبحث عن شراكة أو استثمار؟',
  closeBody:
    'نرحّب بالمستثمرين، والشركاء، والجهات الحكومية. أخبرنا بما تبحث عنه وسيتواصل معك فريقنا مباشرة.',
  cta: 'تواصل معنا',
  second: 'نموذج الأعمال',
  partnersLine: 'شراكات استراتيجية تصنع منظومتنا',
  logoPh: 'ضع شعار الشريك',
  address: 'حي الخالدية — جدة، المملكة العربية السعودية',
}

const EN: EcosystemCopy = {
  home: 'Home',
  crumbLabel: 'Breadcrumb',
  navEcosystem: 'Ecosystem',
  ecosystemH: 'Our business ecosystem',
  ecosystemLead: 'Integrated platforms creating sustainable economic value.',
  contentsLabel: 'On this page', // draft
  groups: [
    ['The platforms', ['JAZ Choklat', 'eat.plus', 'ZL.TOURS', 'HOMERA']],
    ['The ecosystem', ['One ecosystem', 'Build with us']], // draft
  ],

  platformsKicker: 'The platforms', // draft
  deckH: 'Four platforms, one ecosystem', // draft
  deckLead: 'Each platform is built layer by layer until it stands on its own, and all four stand on one ecosystem.', // draft
  platforms: [
    ['Food', 'Premium food manufacturing', 'JAZ Choklat', 'From ingredient to finished experience.'],
    ['Logistics', 'Last-mile commerce', 'eat.plus', 'Modern operating systems, integrated.'],
    ['Tourism', 'Tourism marketplace', 'ZL.TOURS', 'Experiences across the Kingdom and region.'],
    ['Real estate', 'Real estate & hospitality', 'HOMERA', 'Property operations and hospitality.'],
  ],
  details: ['The finished experience', 'The last mile', 'Destinations and experiences', 'Hospitality'], // draft
  sectorLabel: 'Sector', // draft
  ecoLink: 'Enquire about this platform',

  modelH: 'What every platform stands on', // draft
  modelBody:
    'We build, operate and invest inside one ecosystem, so our platforms exchange expertise and multiply shared success.',
  cores: [
    ['Capital', 'Investment expertise'],
    ['Technology', 'Digital transformation'],
    ['Operations', 'Operational excellence'],
    ['Strategic partnerships', 'Growth and market access'],
  ],
  coresLabel: 'Four shared cores run through every platform', // draft
  target: '40 business platforms by 2030',
  targetLine: 'An ecosystem built to carry more.', // draft
  modelLabel:
    'A model of the ecosystem: four platforms stacked on one base, four shared cores running through them, and room for more', // draft

  closeH: 'Looking to partner or invest?',
  closeBody:
    'We welcome investors, partners and government entities. Tell us what you are looking for and our team will come back to you directly.',
  cta: 'Contact us',
  second: 'Business model',
  partnersLine: 'Strategic partnerships that build our ecosystem',
  logoPh: 'Drop a partner logo',
  address: 'Al Khalidiyah District — Jeddah, Kingdom of Saudi Arabia',
}

export const ECOSYSTEM = { ar: AR, en: EN }

/**
 * Each platform's address on the page, in the order every page lists them. The home page's
 * platform index links straight to them.
 */
export const PLATFORM_IDS = ['jaz-choklat', 'eat-plus', 'zl-tours', 'homera'] as const

/** The page's other chapters: the platforms as a whole, the ecosystem they stand on, the door. */
export const ECOSYSTEM_IDS = { platforms: 'platforms', model: 'one-ecosystem', close: 'build-with-us' } as const

/** Where each platform sits among the eight strategic sectors, as `HOME.sectors` lists them. */
export const PLATFORM_SECTORS = [2, 3, 4, 5]
