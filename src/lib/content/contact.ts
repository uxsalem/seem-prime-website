export type ContactCopy = typeof AR

const AR = {
  contactH: 'تواصل معنا',
  contactBody:
    'نرحّب بالمستثمرين، والشركاء، والجهات الحكومية، ووسائل الإعلام. أرسل لنا رسالتك وسيتواصل معك فريقنا.',
  linesLabel: 'قنوات التواصل', // draft
  emailLabel: 'البريد الإلكتروني', // draft
  phoneLabel: 'الهاتف', // draft
  officeH: 'المكتب الرئيسي في جدة',
  officeLabel: 'المكتب الرئيسي',
  address: 'حي الخالدية — جدة، المملكة العربية السعودية',
  hoursLabel: 'ساعات العمل',
  hours: [
    ['الأحد — الخميس', '09:00 — 18:00'],
    ['الجمعة — السبت', 'مغلق'],
  ],
  fName: 'الاسم الكامل *',
  fEmail: 'البريد الإلكتروني *',
  fPhone: 'رقم الجوال',
  fType: 'جهة التواصل',
  fMsg: 'الرسالة *',
  optPartner: 'شراكة',
  optInvest: 'استثمار',
  optMedia: 'إعلام وصحافة',
  optOther: 'أخرى',
  send: 'أرسل الرسالة',
  sending: 'جارٍ الإرسال…',
  okMsg: 'تم إرسال رسالتك. سنتواصل معك قريبًا.',
  errMsg: 'تعذّر الإرسال — تأكد من تعبئة الاسم والبريد والرسالة ثم أعد المحاولة.',
  voicesH: 'ما يقوله شركاؤنا',
  voicesLead:
    'مساحة مخصصة لشهادات الشركاء والمستثمرين — تُستبدل بالنصوص والصور الفعلية عند توفّرها.',
  quotePh: 'أضف نص الشهادة هنا.',
  personPh: 'ضع صورة الشخص',
  voices: [
    ['الاسم', 'مستثمر'],
    ['الاسم', 'شريك استراتيجي'],
    ['الاسم', 'جهة حكومية'],
  ],
  railPrev: 'السابق',
  railNext: 'التالي',
}

const EN: ContactCopy = {
  contactH: 'Contact us',
  contactBody:
    'We welcome investors, partners, government entities and the media. Send us your message and our team will be in touch.',
  linesLabel: 'Ways to reach us', // draft
  emailLabel: 'Email', // draft
  phoneLabel: 'Phone', // draft
  officeH: 'Head office in Jeddah',
  officeLabel: 'Head office',
  address: 'Al Khalidiyah District — Jeddah, Kingdom of Saudi Arabia',
  hoursLabel: 'Office hours',
  hours: [
    ['Sunday — Thursday', '09:00 — 18:00'],
    ['Friday — Saturday', 'Closed'],
  ],
  fName: 'Full name *',
  fEmail: 'Email *',
  fPhone: 'Phone',
  fType: 'Inquiry type',
  fMsg: 'Message *',
  optPartner: 'Partnership',
  optInvest: 'Investment',
  optMedia: 'Media & press',
  optOther: 'Other',
  send: 'Send message',
  sending: 'Sending…',
  okMsg: 'Your message has been sent. We will be in touch shortly.',
  errMsg: 'We could not send that — please check your name, email and message, then try again.',
  voicesH: 'What our partners say',
  voicesLead:
    'Space reserved for partner and investor testimonials — replaced with real quotes and portraits once supplied.',
  quotePh: 'Add the testimonial text here.',
  personPh: 'Drop the person’s photo',
  voices: [
    ['Name', 'Investor'],
    ['Name', 'Strategic partner'],
    ['Name', 'Government entity'],
  ],
  railPrev: 'Previous',
  railNext: 'Next',
}

export const CONTACT = { ar: AR, en: EN }

/** The office and the form below the masthead, for the opening's contact line. */
export const OFFICE_ID = 'office'
