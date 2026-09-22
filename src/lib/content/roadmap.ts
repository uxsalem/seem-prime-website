export type RoadmapCopy = typeof AR

const AR = {
  home: 'الرئيسية',
  crumbLabel: 'مسار التنقل',
  navRoadmap: 'خارطة الطريق',
  roadmapH: 'خارطة الطريق حتى 2030',
  roadLead: 'أربع مراحل من التأسيس إلى الريادة، وخمسة أهداف قابلة للقياس.',
  phasesH: 'من التأسيس إلى الريادة',
  roadmap: [
    ['2025', 'التأسيس'],
    ['2026-2028', 'التوسع داخل المملكة'],
    ['2029', 'التوسع الإقليمي'],
    ['2030', 'الريادة في بناء المنظومات الاقتصادية'],
  ],
  kpiH: 'الأهداف الاستراتيجية بحلول 2030',
  kpiNote: 'الحجم الذي نبني نحوه — موزّعاً على منصات المنظومة وقطاعاتها.',
  kpis: [
    ['40', 'منصة أعمال', ''],
    ['1', 'محفظة استثمارية', 'مليار ريال'],
    ['200', 'فرصة عمل', ''],
    ['50', 'شراكة استراتيجية', ''],
    ['10%', 'نمو سنوي', 'سنوياً'],
  ],
}

const EN: RoadmapCopy = {
  home: 'Home',
  crumbLabel: 'Breadcrumb',
  navRoadmap: 'Roadmap',
  roadmapH: 'The roadmap to 2030',
  roadLead: 'Four phases from foundation to leadership, and five measurable targets.',
  phasesH: 'From foundation to leadership',
  roadmap: [
    ['2025', 'Foundation'],
    ['2026-2028', 'Saudi expansion'],
    ['2029', 'Regional expansion'],
    ['2030', 'Leading economic ecosystem platform'],
  ],
  kpiH: 'Strategic targets by 2030',
  kpiNote: 'The scale we are building toward — deployed across the ecosystem’s platforms and sectors.',
  kpis: [
    ['40', 'Business platforms', ''],
    ['1', 'Investment portfolio', 'SR billion'],
    ['200', 'Jobs created', ''],
    ['50', 'Strategic partnerships', ''],
    ['10%', 'Annual growth', 'per year'],
  ],
}

export const ROADMAP = { ar: AR, en: EN }
