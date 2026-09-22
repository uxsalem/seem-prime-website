export type EcosystemCopy = typeof AR

const AR = {
  home: 'الرئيسية',
  crumbLabel: 'مسار التنقل',
  navEcosystem: 'منظومتنا',
  ecosystemH: 'منظومة أعمالنا',
  ecosystemLead: 'منصات متكاملة تصنع قيمة اقتصادية مستدامة.',
  platforms: [
    ['تصنيع الأغذية الفاخرة', 'JAZ Choklat', 'من اختيار المكوّن حتى اكتمال التجربة.'],
    ['التجارة والتوصيل في الميل الأخير', 'eat.plus', 'أنظمة تشغيل حديثة وحلول متكاملة.'],
    ['سوق التجارب السياحية', 'ZL.TOURS', 'تجارب داخل المملكة وإقليميًا.'],
    ['منصة عقارية وضيافة', 'HOMERA', 'إدارة وتشغيل العقارات وحلول الضيافة.'],
  ],
  platformPh: [
    'صورة من مصنع جاز',
    'صورة من منصة eat.plus',
    'صورة من تجربة ZL.TOURS',
    'صورة من مشاريع HOMERA',
  ],
  ecoLink: 'تواصل بشأن هذه المنصة',
  partnersLine: 'شراكات استراتيجية تصنع منظومتنا',
  logoPh: 'ضع شعار الشريك',
}

const EN: EcosystemCopy = {
  home: 'Home',
  crumbLabel: 'Breadcrumb',
  navEcosystem: 'Ecosystem',
  ecosystemH: 'Our business ecosystem',
  ecosystemLead: 'Integrated platforms creating sustainable economic value.',
  platforms: [
    ['Premium food manufacturing', 'JAZ Choklat', 'From ingredient to finished experience.'],
    ['Last-mile commerce', 'eat.plus', 'Modern operating systems, integrated.'],
    ['Tourism marketplace', 'ZL.TOURS', 'Experiences across the Kingdom and region.'],
    ['Real estate & hospitality', 'HOMERA', 'Property operations and hospitality.'],
  ],
  platformPh: [
    'A photo from the JAZ facility',
    'A photo from the eat.plus platform',
    'A photo from a ZL.TOURS experience',
    'A photo from a HOMERA property',
  ],
  ecoLink: 'Enquire about this platform',
  partnersLine: 'Strategic partnerships that build our ecosystem',
  logoPh: 'Drop a partner logo',
}

export const ECOSYSTEM = { ar: AR, en: EN }
