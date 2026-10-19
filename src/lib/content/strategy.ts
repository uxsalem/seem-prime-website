/**
 * Strategy page copy. Arabic is the primary language; English is the parallel cut, not a gloss.
 *
 * The strategy, the business model and the roadmap used to be three pages. They are one now: the
 * vision, the pillars and the sectors first, then the model that turns them into value and what
 * it adds to every platform. The roadmap and its targets were taken off in October 2026, at
 * the client's request, and the page's closing call to action with them.
 *
 * Almost all of it is the approved framework copy. The value proposition's English statements
 * are the framework's; their Arabic, and the handful of other new strings, are marked
 * `// draft` for the client to confirm before launch. A one-sentence line carries no full stop at
 * its end, in either language.
 */

export type StrategyCopy = typeof AR

const AR = {
  pageH: 'من الاستراتيجية إلى الأثر المستدام',
  pageLead: 'الرؤية والركائز التي تحدّد أين نعمل، والنموذج الذي نحوّلها به إلى قيمة', // draft
  contentsLabel: 'فصول الصفحة', // draft
  /** The page's two beats, each with the chapters it holds: [act, chapters]. */
  acts: [
    ['الاستراتيجية', ['الرؤية والرسالة', 'الركائز والقطاعات']], // draft
    ['التنفيذ', ['نموذج الأعمال', 'القيمة المضافة']],
  ] as [string, string[]][],

  // --- 01 · Vision & mission ------------------------------------------------------------------

  focusH: 'الرؤية والرسالة',
  visionLabel: 'الرؤية',
  missionLabel: 'الرسالة',
  vision:
    'أن تكون سيم برايم المنصة الاقتصادية الرائدة في بناء وتشغيل منظومات الأعمال المتكاملة التي تعظّم القيمة الاقتصادية، وتسرّع النمو، وتخلق فرصًا مستدامة في المملكة العربية السعودية والمنطقة',
  mission:
    'نطوّر ونشغّل ونستثمر في منصات الأعمال المتخصصة من خلال توظيف التقنية، وبناء الشراكات الاستراتيجية، وربط سلاسل القيمة الاقتصادية؛ لتمكين الشركات ورواد الأعمال والمستثمرين من النمو وتحقيق أثر اقتصادي مستدام',
  /** What each statement brings into focus: the horizon, then the work in hand. */
  focusFar: 'الأفق', // draft
  focusNear: 'ما بين أيدينا', // draft
  metre: 'م',

  // --- 02 · Pillars & sectors -----------------------------------------------------------------

  pillarsH: 'خمس ركائز، وثمانية قطاعات، ومنظومة واحدة', // draft
  pillarsLead: 'خمس ركائز تحدّد كيف ننفّذ، على ثمانية قطاعات تحدّد أين نعمل', // draft
  pillarsLabel: 'الركائز الاستراتيجية',
  pillars: [
    ['تطوير المنصات الاقتصادية', 'نؤسس ونشغّل كيانات متخصصة، طبقةً فوق طبقة، حتى تقوم بذاتها'],
    ['الاستثمار في القطاعات الواعدة', 'ندخل مبكراً حيث يتقدّم الطلب، ونضاعف حصتنا مع نمو القطاع'],
    ['بناء الشراكات الاستراتيجية', 'نلتقي مع الشريك في منتصف الطريق: خبرته وسوقنا، والمنفعة متبادلة'],
    ['التميز التشغيلي', 'مؤشرات ومراجعات دورية تشدّ الأداء نحو مركزه لا نحو أطرافه'],
    ['التحول الرقمي والابتكار', 'نمرّر التقنية والبيانات عبر المنظومة كلها، لا في منصة واحدة'],
  ],
  sectorsLabel: 'القطاعات الاستراتيجية',
  sectors: ['الصناعة', 'التجارة الإلكترونية', 'اللوجستيات', 'السياحة', 'العقار', 'التموين', 'التوريد', 'الزراعة'],

  // --- 03 · Business model --------------------------------------------------------------------

  modelH: 'منظومة واحدة، أربع مراحل لصناعة القيمة',
  modelLead: 'كل منصة تمرّ بالمراحل الأربع ذاتها، ثم تعود بعوائدها إلى المنظومة',
  /** [verb, what the stage holds]. */
  model: [
    ['نطوّر', ['منصات الأعمال', 'المشروعات الجديدة', 'نماذج الأعمال']],
    ['نشغّل', ['إدارة المنصات', 'الخدمات المشتركة', 'تحسين الأداء']],
    ['نستثمر', ['الاستثمارات في الملكية', 'المشاريع المشتركة', 'الاستحواذات الاستراتيجية']],
    ['نحقق الإيرادات', ['عوائد الاستثمار', 'رسوم الإدارة والتشغيل', 'إيرادات المنصات', 'الخدمات الاستشارية']],
  ] as [string, string[]][],
  returnTag: 'العائد',
  returnLine: 'تعود العوائد إلى المنظومة، فتبدأ الدورة من جديد', // draft
  stageLabel: 'المرحلة', // draft

  // --- 04 · Value proposition -----------------------------------------------------------------

  valueH: 'ما نضيفه إلى كل منصة', // draft
  valueLead:
    'نجمع بين الخبرة الاستثمارية، والتميز التشغيلي، والشراكات الاستراتيجية لبناء وتوسيع منصات أعمال عالية الأثر',
  /** [capability, what it means]. The first four add up to the fifth. */
  valueProp: [
    ['الخبرة الاستثمارية', 'نحدّد الفرص الواعدة، ونطوّرها، ونستثمر فيها'], // draft
    ['التميز التشغيلي', 'نحوّل الرؤية الاستراتيجية إلى أعمال عالية الأداء وقابلة للتوسع'], // draft
    ['الشراكات الاستراتيجية', 'نبني شراكات طويلة الأمد تعزّز النمو والابتكار والوصول إلى الأسواق'], // draft
    ['منصات أعمال قابلة للتوسع', 'نطوّر منصات متكاملة مصمَّمة للنمو المستدام والتوسع على المدى الطويل'], // draft
    ['قيمة اقتصادية مستدامة', 'نصنع قيمة دائمة لجميع أصحاب المصلحة عبر أثر اقتصادي طويل الأمد'], // draft
  ],
}

const EN: StrategyCopy = {
  pageH: 'From strategy to sustainable impact',
  pageLead: 'The vision and pillars that set where we operate, and the model that turns them into value', // draft
  contentsLabel: 'On this page', // draft
  acts: [
    ['Strategy', ['Vision & mission', 'Pillars & sectors']], // draft
    ['Execution', ['Business model', 'Value proposition']],
  ],

  focusH: 'Vision & mission',
  visionLabel: 'Vision',
  missionLabel: 'Mission',
  vision:
    'To be the leading platform for building and operating integrated economic ecosystems that maximize value, accelerate growth, and create sustainable opportunities across Saudi Arabia and the wider region',
  mission:
    'We develop, operate and invest in specialized business platforms by leveraging technology, forging strategic partnerships and connecting economic value chains — to empower businesses, entrepreneurs and investors to grow and achieve sustainable economic impact',
  focusFar: 'The horizon', // draft
  focusNear: 'The work in hand', // draft
  metre: 'm',

  pillarsH: 'Five pillars, eight sectors, one ecosystem', // draft
  pillarsLead: 'Five pillars set how we execute; eight sectors set where we operate', // draft
  pillarsLabel: 'Strategic pillars',
  pillars: [
    ['Develop economic platforms', 'We found and operate specialised entities, layer by layer, until each stands on its own'],
    ['Invest in high-growth sectors', 'We enter early where demand is moving, and raise our share as the sector grows'],
    ['Build strategic partnerships', 'We meet partners halfway: their expertise, our market, benefit both ways'],
    ['Deliver operational excellence', 'Indicators and standing reviews pull performance toward its centre, not its edges'],
    ['Drive digital transformation', 'We run technology and data through the whole ecosystem, not one platform'],
  ],
  sectorsLabel: 'Strategic focus sectors',
  sectors: ['Industry', 'E-commerce', 'Logistics', 'Tourism', 'Real estate', 'Catering', 'Supply', 'Agriculture'],

  modelH: 'One ecosystem, four stages of value',
  modelLead: 'Every platform moves through the same four stages, then returns its yield to the ecosystem',
  model: [
    ['Develop', ['Business platforms', 'New ventures', 'Business models']],
    ['Operate', ['Platform management', 'Shared services', 'Performance optimization']],
    ['Invest', ['Equity investments', 'Joint ventures', 'Strategic acquisitions']],
    ['Monetize', ['Investment returns', 'Management fees', 'Platform revenues', 'Advisory services']],
  ],
  returnTag: 'The return',
  returnLine: 'The yield returns to the ecosystem, and the cycle begins again', // draft
  stageLabel: 'Stage', // draft

  valueH: 'What we bring to every platform', // draft
  valueLead:
    'We combine investment expertise, operational excellence and strategic partnerships to develop, operate and scale high-impact business platforms',
  valueProp: [
    ['Investment expertise', 'Identifying, developing, and investing in high-potential opportunities'],
    ['Operational excellence', 'Transforming strategic vision into high-performing, scalable businesses'],
    ['Strategic partnerships', 'Building long-term partnerships that foster growth, innovation, and market access'],
    ['Scalable business platforms', 'Developing integrated platforms designed for sustainable growth and long-term scalability'],
    ['Sustainable economic value', 'Creating lasting value for all stakeholders through long-term economic impact'],
  ],
}

export const STRATEGY = { ar: AR, en: EN }

/**
 * Where each chapter's section sits, in the order `acts` lists them. `model` is also where the
 * retired business model page now redirects (see `next.config.ts`).
 */
export const STRATEGY_IDS = ['vision', 'pillars', 'model', 'value'] as const
