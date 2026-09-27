/**
 * About page copy. Arabic is the primary language; English is the parallel cut, not a gloss.
 *
 * The page tells the company in five chapters — what it does, its name, what it believes, who
 * it serves, and where it stands. Most of it is the approved framework copy: the positioning,
 * the one sentence, the six values, the five stakeholders. The English values are the
 * framework's full statements; their Arabic, and the handful of other new strings, are marked
 * `// draft` for the client to confirm before launch.
 */

export type AboutCopy = typeof AR

const AR = {
  home: 'الرئيسية',
  crumbLabel: 'مسار التنقل',
  navAbout: 'من نحن',
  // The masthead sets this over two lines; the no-break space keeps the noun and its adjective
  // together, so the break falls after «لبناء» and not before «الاقتصادية».
  positioning: 'شركة لبناء المنظومات\u00a0الاقتصادية',
  aboutLead:
    'سيم برايم شركة استثمارية وتشغيلية استراتيجية متخصصة في تطوير وتشغيل والاستثمار في منصات الأعمال القابلة للتوسع.',
  chaptersLabel: 'فصول الصفحة', // draft
  /** The five chapters, in the order the page runs them. */
  chapters: ['ما نفعله', 'اسمنا', 'قيمنا', 'من نخدم', 'من جدة'], // draft

  // --- 01 · What we do ------------------------------------------------------------------------

  /** The one sentence, cut where its four strands sit: [text, strand or -1]. */
  sentence: [
    ['نبني منظومات أعمال متكاملة تربط بين ', -1],
    ['رأس المال', 0],
    [' و', -1],
    ['التقنية', 1],
    [' و', -1],
    ['العمليات', 2],
    [' و', -1],
    ['الشراكات الاستراتيجية', 3],
    [' لتسريع النمو الاقتصادي المستدام.', -1],
  ] as [string, number][],
  /** Each strand's window: [name, what it brings]. */
  strands: [
    ['رأس المال', 'الخبرة الاستثمارية'],
    ['التقنية', 'التحول الرقمي والابتكار'],
    ['العمليات', 'التميز التشغيلي'],
    ['الشراكات الاستراتيجية', 'النمو والوصول إلى الأسواق'],
  ],
  wholeH: 'منظومة واحدة', // draft
  wholeBody:
    'نبني ونشغّل ونستثمر داخل منظومة واحدة، فتتبادل منصاتنا الخبرة وتتضاعف فرص النجاح المشترك.',

  // --- 02 · Our name --------------------------------------------------------------------------

  nameH: 'أربعة أحرف في مربع واحد', // draft
  nameLead: 'الاسم نفسه هو منهجنا: أربعة أسئلة نطرحها على كل منصة، وأربع نتائج نقيسها.',
  /** What the mark is made of, in the order the drawing builds it: [part, what it says]. */
  anatomy: [
    ['المربع', 'الوحدة والقوة والثبات: إطار واحد يحيط بكل ما نبنيه.'], // draft
    ['الأحرف الأربعة', 'الاستراتيجية، والتمكين، والتنفيذ، والقياس والتحسين: سؤال لكل حرف، نطرحه على كل منصة.'], // draft
    [
      'الأشرطة',
      'كل حرف مقطوع من الأشرطة نفسها وعلى الشبكة نفسها، ويُبنى طبقةً فوق طبقة، كما نبني المنصة حتى تقوم بذاتها.',
    ], // draft
  ],
  /** The mark as it was specified for the stamp. */
  stamp: '4.2 × 4.2 سم',
  figureLabel: 'علامة سيم: مربع يضم الأحرف S وE وE وM', // draft

  // --- 03 · Our values ------------------------------------------------------------------------

  valuesH: 'ما نؤمن به، ونلتزم به', // draft
  /** [value, the statement behind it]. The statements are drafted from the framework's English. */
  values: [
    ['الريادة والابتكار', 'نقود برؤية، ونتبنّى الابتكار، ونصنع باستمرار حلولاً نوعية تشكّل المستقبل.'], // draft
    ['الشراكة والثقة', 'نبني علاقات طويلة الأمد تقوم على النزاهة والشفافية والتعاون والنجاح المشترك.'], // draft
    ['التميز التشغيلي', 'نسعى إلى التميز عبر تنفيذ منضبط، وتحسين مستمر، ومعايير تشغيلية عالمية.'], // draft
    ['الاستدامة', 'نصنع قيمة اقتصادية واجتماعية وبيئية طويلة الأمد تدعم النمو المستدام للأجيال القادمة.'], // draft
    ['التركيز على النتائج', 'تحرّكنا النتائج القابلة للقياس، والمساءلة، وتقديم قيمة ملموسة لأصحاب المصلحة.'], // draft
    ['المسؤولية والحوكمة', 'نلتزم بأعلى معايير الأخلاقيات والحوكمة المؤسسية والامتثال واتخاذ القرارات المسؤولة.'], // draft
  ],

  // --- 04 · Who we serve ----------------------------------------------------------------------

  stakeH: 'منظومة واحدة، وخمس جهات تنتفع بها',
  stakeLead: 'لكل منها ما يعود عليه من نموّنا.',
  stakeholders: [
    ['المستثمرون', 'عوائد استثمارية مستدامة'],
    ['الجهات الحكومية', 'دعم التنويع الاقتصادي'],
    ['الشركات', 'منصات للنمو والتوسع'],
    ['رواد الأعمال', 'الوصول إلى الأسواق'],
    ['المجتمع', 'فرص عمل وتنمية مستدامة'],
  ],

  // --- 05 · From Jeddah -----------------------------------------------------------------------

  closeH: 'ابنِ مع من يبني المنظومة',
  closeBody:
    'نرحّب بالمستثمرين، والشركاء، والجهات الحكومية. أخبرنا بما تبحث عنه وسيتواصل معك فريقنا مباشرة.',
  cta: 'تواصل معنا',
  second: 'منظومتنا',
  city: 'جدة',
  address: 'حي الخالدية — جدة، المملكة العربية السعودية',
  reachLabel: 'من جدة إلى المنطقة: مراحل التوسع حتى 2030', // draft
}

const EN: AboutCopy = {
  home: 'Home',
  crumbLabel: 'Breadcrumb',
  navAbout: 'About',
  positioning: 'An Economic Ecosystem Builder',
  aboutLead:
    'SEEM PRIME is a strategic investment and operating company specializing in developing, operating and investing in scalable business platforms.',
  chaptersLabel: 'On this page', // draft
  chapters: ['What we do', 'Our name', 'Our values', 'Who we serve', 'From Jeddah'], // draft

  sentence: [
    ['We build integrated business ecosystems that connect ', -1],
    ['capital', 0],
    [', ', -1],
    ['technology', 1],
    [', ', -1],
    ['operations', 2],
    [' and ', -1],
    ['strategic partnerships', 3],
    [' to accelerate sustainable economic growth.', -1],
  ],
  strands: [
    ['Capital', 'Investment expertise'],
    ['Technology', 'Digital transformation'],
    ['Operations', 'Operational excellence'],
    ['Strategic partnerships', 'Growth and market access'],
  ],
  wholeH: 'One ecosystem', // draft
  wholeBody:
    'We build, operate and invest inside one ecosystem, so our platforms exchange expertise and multiply shared success.',

  nameH: 'Four letters in one square', // draft
  nameLead:
    'The name is the method: four questions we put to every platform, and four outcomes we measure.',
  anatomy: [
    ['The square', 'Unity, strength and stability: one frame around everything we build.'], // draft
    [
      'Four letters',
      'Strategy, enablement, execution, measurement: one question per letter, put to every platform.',
    ], // draft
    [
      'The bars',
      'Every letter is cut from the same bars on one grid, and built layer by layer — the way we build a platform until it stands on its own.',
    ], // draft
  ],
  stamp: '4.2 × 4.2 cm',
  figureLabel: 'The SEEM mark: a square holding the letters S, E, E and M', // draft

  valuesH: 'What we believe, and hold ourselves to', // draft
  values: [
    [
      'Leadership & innovation',
      'We lead with vision, embrace innovation, and continuously create transformative solutions that shape the future.',
    ],
    [
      'Partnership & trust',
      'We build long-term relationships founded on integrity, transparency, collaboration, and mutual success.',
    ],
    [
      'Operational excellence',
      'We pursue excellence through disciplined execution, continuous improvement, and world-class operational standards.',
    ],
    [
      'Sustainability',
      'We create long-term economic, social, and environmental value that supports sustainable growth for future generations.',
    ],
    [
      'Results orientation',
      'We are driven by measurable outcomes, accountability, and the delivery of tangible value to our stakeholders.',
    ],
    [
      'Responsibility & governance',
      'We uphold the highest standards of ethics, corporate governance, compliance, and responsible decision-making.',
    ],
  ],

  stakeH: 'One ecosystem, five groups it serves',
  stakeLead: 'Each with a distinct return from how we grow.',
  stakeholders: [
    ['Investors', 'Attractive long-term returns'],
    ['Government', 'Economic diversification'],
    ['Businesses', 'Growth platforms'],
    ['Entrepreneurs', 'Market access'],
    ['Communities', 'Jobs & sustainable development'],
  ],

  closeH: 'Build with the people building the ecosystem',
  closeBody:
    'We welcome investors, partners and government entities. Tell us what you are looking for and our team will come back to you directly.',
  cta: 'Contact us',
  second: 'Our ecosystem',
  city: 'Jeddah',
  address: 'Al Khalidiyah District — Jeddah, Kingdom of Saudi Arabia',
  reachLabel: 'From Jeddah to the region: the phases of expansion to 2030', // draft
}

export const ABOUT = { ar: AR, en: EN }

/** Where each chapter's section sits, for the opening's index. Same order as `chapters`. */
export const CHAPTER_IDS = ['what', 'name', 'values', 'serve', 'reach'] as const

/** Jeddah, to the minute. Set left-to-right in both languages: it is a coordinate, not prose. */
export const JEDDAH = '21°32′ N · 39°10′ E'
