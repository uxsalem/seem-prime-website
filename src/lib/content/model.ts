export type ModelCopy = typeof AR

const AR = {
  home: 'الرئيسية',
  crumbLabel: 'مسار التنقل',
  navModel: 'نموذج الأعمال',
  modelH2: 'منظومة واحدة، أربع مراحل لصناعة القيمة',
  modelLead: 'كل منصة تمرّ بالمراحل الأربع ذاتها، ثم تعود بعوائدها إلى المنظومة.',
  chainH: 'كيف تنتقل المنصة من التطوير إلى العائد',
  modelTag: 'العائد',
  model: [
    ['نطوّر', ['منصات الأعمال', 'المشروعات الجديدة', 'نماذج الأعمال']],
    ['نشغّل', ['إدارة المنصات', 'الخدمات المشتركة', 'تحسين الأداء']],
    ['نستثمر', ['الاستثمارات في الملكية', 'المشاريع المشتركة', 'الاستحواذات الاستراتيجية']],
    ['نحقق الإيرادات', ['عوائد الاستثمار', 'رسوم الإدارة والتشغيل', 'إيرادات المنصات', 'الخدمات الاستشارية']],
  ] as [string, string[]][],
  valueH: 'القيمة المضافة',
  partsLabel: 'مكوّنات',
  completeLabel: 'المنظومة مكتملة',
  valueLead:
    'نجمع بين الخبرة الاستثمارية، والتميز التشغيلي، والشراكات الاستراتيجية لبناء وتوسيع منصات أعمال عالية الأثر.',
  valueProp: [
    ['الخبرة الاستثمارية', 'الفرص الواعدة'],
    ['التميز التشغيلي', 'أداء عالٍ وقابلية توسع'],
    ['الشراكات الاستراتيجية', 'نمو ووصول للأسواق'],
    ['منصات قابلة للتوسع', 'منصات متكاملة'],
    ['قيمة اقتصادية مستدامة', 'قيمة دائمة'],
  ],
}

const EN: ModelCopy = {
  home: 'Home',
  crumbLabel: 'Breadcrumb',
  navModel: 'Business model',
  modelH2: 'One ecosystem, four stages of value',
  modelLead: 'Every platform moves through the same four stages, then returns its yield to the ecosystem.',
  chainH: 'How a platform travels from build to return',
  modelTag: 'The return',
  model: [
    ['Develop', ['Business platforms', 'New ventures', 'Business models']],
    ['Operate', ['Platform management', 'Shared services', 'Performance optimization']],
    ['Invest', ['Equity investments', 'Joint ventures', 'Strategic acquisitions']],
    ['Monetize', ['Investment returns', 'Management fees', 'Platform revenues', 'Advisory services']],
  ],
  valueH: 'Value proposition',
  partsLabel: 'combined',
  completeLabel: 'Complete',
  valueLead:
    'We combine investment expertise, operational excellence and strategic partnerships to develop, operate and scale high-impact business platforms.',
  valueProp: [
    ['Investment expertise', 'High-potential opportunities'],
    ['Operational excellence', 'Performance at scale'],
    ['Strategic partnerships', 'Growth and market access'],
    ['Scalable platforms', 'Integrated by design'],
    ['Sustainable economic value', 'Lasting stakeholder value'],
  ],
}

export const MODEL = { ar: AR, en: EN }
