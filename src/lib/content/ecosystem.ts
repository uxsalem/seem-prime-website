/**
 * Ecosystem page copy. Arabic is the primary language; English is the parallel cut, not a gloss.
 *
 * The page presents the platforms one at a time, each laid on the one before it, then pulls back
 * to show what they stand on: one base, and four shared cores running through every platform.
 * The first four platforms' names, sectors and lines and the four strands are the approved
 * framework copy; the handful of strings that are new, Qanif's and Catering & Supply's among them,
 * are marked `// draft`, for the client to confirm before launch. A one-sentence line carries no
 * full stop at its end, in either language.
 */

export type EcosystemCopy = typeof AR

const AR = {
  ecosystemH: 'منظومة أعمالنا',
  ecosystemLead: 'منصات متكاملة تصنع قيمة اقتصادية مستدامة',
  contentsLabel: 'فصول الصفحة', // draft
  /** The contents line: the platforms, then the ecosystem they make: [group, chapters]. */
  groups: [
    ['المنصات', ['JAZ Chocolate', 'eat.plus', 'ZL.TOURS', 'HOMERA', 'Qanif', 'Catering & Supply']],
    ['المنظومة', ['منظومة واحدة']], // draft
  ] as [string, string[]][],

  // --- The platforms --------------------------------------------------------------------------

  platformsLabel: 'المنصات', // draft
  deckH: 'ست منصات، ومنظومة واحدة', // draft
  deckLead: 'تُبنى كل منصة طبقةً فوق طبقة حتى تقوم بذاتها، وتقوم المنصات الست على منظومة واحدة', // draft
  /**
   * [sector, what the platform is, name, its line]. The name is the client's mark, and a Latin
   * mark reads the same in both languages. Qanif's logo carries both scripts, but the client wants
   * its name in Latin on both pages, and Catering & Supply's too. No venture carries SEEM's name:
   * SEEM is the group. A platform that spans two sectors names both.
   */
  platforms: [
    ['الصناعة', 'تصنيع الأغذية الفاخرة', 'JAZ Chocolate', 'من اختيار المكوّن حتى اكتمال التجربة'],
    ['اللوجستيات', 'التجارة والتوصيل في الميل الأخير', 'eat.plus', 'أنظمة تشغيل حديثة وحلول متكاملة'],
    ['السياحة', 'سوق التجارب السياحية', 'ZL.TOURS', 'تجارب داخل المملكة وإقليميًا'],
    ['العقار', 'منصة عقارية وضيافة', 'HOMERA', 'إدارة وتشغيل العقارات وحلول الضيافة'],
    ['السياحة والزراعة', 'منتجع ريفي', 'Qanif', 'إقامة وتجارب عائلية في قلب الطبيعة'], // draft
    ['التموين والتوريد', 'خدمات التوريد والتموين الفاخر', 'Catering & Supply', 'من التوريد إلى المائدة'], // draft
  ],
  /** What each platform's second picture shows, in the same order. */
  details: ['التجربة المكتملة', 'الميل الأخير', 'وجهات وتجارب', 'الضيافة', 'مساء في Qanif', 'فن التقديم'], // draft
  sectorLabel: 'القطاع', // draft
  sectorsLabel: 'القطاعان', // draft
  ecoLink: 'تواصل بشأن هذه المنصة',

  // --- One ecosystem --------------------------------------------------------------------------

  modelH: 'ما تقوم عليه كل منصة', // draft
  modelBody:
    'نبني ونشغّل ونستثمر داخل منظومة واحدة، فتتبادل منصاتنا الخبرة وتتضاعف فرص النجاح المشترك',
  /** The four shared cores, named as the framework names its four strands: [strand, what it brings]. */
  cores: [
    ['رأس المال', 'الخبرة الاستثمارية'],
    ['التقنية', 'التحول الرقمي والابتكار'],
    ['العمليات', 'التميز التشغيلي'],
    ['الشراكات الاستراتيجية', 'النمو والوصول إلى الأسواق'],
  ],
  coresLabel: 'أربعة محاور مشتركة تمرّ بكل منصة', // draft
  modelLabel: 'نموذج المنظومة: ست منصات فوق قاعدة واحدة، تمرّ بها أربعة محاور مشتركة', // draft
}

const EN: EcosystemCopy = {
  ecosystemH: 'Our business ecosystem',
  ecosystemLead: 'Integrated platforms creating sustainable economic value',
  contentsLabel: 'On this page', // draft
  groups: [
    ['The platforms', ['JAZ Chocolate', 'eat.plus', 'ZL.TOURS', 'HOMERA', 'Qanif', 'Catering & Supply']],
    ['The ecosystem', ['One ecosystem']], // draft
  ],

  platformsLabel: 'The platforms', // draft
  deckH: 'Six platforms, one ecosystem', // draft
  deckLead: 'Each platform is built layer by layer until it stands on its own, and all six stand on one ecosystem', // draft
  platforms: [
    ['Industry', 'Premium food manufacturing', 'JAZ Chocolate', 'From ingredient to finished experience'],
    ['Logistics', 'Last-mile commerce', 'eat.plus', 'Modern operating systems, integrated'],
    ['Tourism', 'Tourism marketplace', 'ZL.TOURS', 'Experiences across the Kingdom and region'],
    ['Real estate', 'Real estate & hospitality', 'HOMERA', 'Property operations and hospitality'],
    ['Tourism & agriculture', 'Countryside resort', 'Qanif', 'Family stays and experiences in the countryside'], // draft
    ['Catering & supply', 'Supply and VIP catering', 'Catering & Supply', 'From supply to the table'], // draft
  ],
  details: ['The finished experience', 'The last mile', 'Destinations and experiences', 'Hospitality', 'An evening at Qanif', 'The art of presentation'], // draft
  sectorLabel: 'Sector', // draft
  sectorsLabel: 'Sectors', // draft
  ecoLink: 'Enquire about this platform',

  modelH: 'What every platform stands on', // draft
  modelBody:
    'We build, operate and invest inside one ecosystem, so our platforms exchange expertise and multiply shared success',
  cores: [
    ['Capital', 'Investment expertise'],
    ['Technology', 'Digital transformation'],
    ['Operations', 'Operational excellence'],
    ['Strategic partnerships', 'Growth and market access'],
  ],
  coresLabel: 'Four shared cores run through every platform', // draft
  modelLabel: 'A model of the ecosystem: six platforms stacked on one base, four shared cores running through them', // draft
}

export const ECOSYSTEM = { ar: AR, en: EN }

/**
 * Each platform's address on the page, in the order every page lists them. The home page's
 * platform index links straight to them.
 */
export const PLATFORM_IDS = ['jaz-chocolate', 'eat-plus', 'zl-tours', 'homera', 'qanif', 'catering-supply'] as const

/** The page's other chapters: the platforms as a whole, and the ecosystem they stand on. */
export const ECOSYSTEM_IDS = { platforms: 'platforms', model: 'one-ecosystem' } as const

/**
 * Where each platform sits among the eight strategic sectors, as `HOME.sectors` lists them:
 * JAZ Chocolate in industry, eat.plus in logistics, ZL.TOURS in tourism, HOMERA in real estate,
 * Qanif in tourism, as a countryside resort, and in agriculture, where its coffee and cocoa are
 * grown, and Catering & Supply in catering and in supply, both of which it covers. The home page's
 * reel names every platform under each of its sectors, and each platform's card on the ecosystem
 * page numbers them.
 */
export const PLATFORM_SECTORS: number[][] = [[0], [2], [3], [4], [3, 7], [5, 6]]
