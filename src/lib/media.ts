import type { Lang } from '@/lib/site'

/**
 * The site's photography, named once.
 *
 * Each entry carries the full-bleed file, a lighter cut for cards and rails, a 20px blur-up
 * placeholder to paint under the frame while the real file arrives, the focal point a crop
 * should hold on to, and alt text in both languages. Call sites reference a `Photo`, never a
 * path, so re-shooting a subject is a one-line change here.
 *
 * The art direction is one light across every sector: the set was shot at the same golden hour,
 * so a refinery, a warehouse, a coast and a cinema read as one landscape rather than a stock
 * collage. The brand's deep green is the ground they sit on — scrims, sections, the dark between
 * frames — never a tint laid over the pictures themselves.
 */
export type Photo = {
  /** Full-bleed cut — plates, mastheads, banners, the hero. */
  src: string
  /** The full cut's pixel width, for `srcset`. */
  w: number
  /** 1280px cut — framed windows up to ~1000px wide: the reel, the stage panels. */
  md?: string
  /** ~880px cut — cards, rails, gallery tiles. */
  sm: string
  /** A 20px WebP, inlined: the frame is never empty, even on the first paint. */
  lqip: string
  /** Default `object-position` / `background-position` for a crop. */
  focus: string
  alt: Record<Lang, string>
}

const img = (name: string, w: number) => ({ src: `/ds/img/${name}.webp`, w, sm: `/ds/img/${name}-sm.webp` })
/** The golden-hour set also ships a middle cut, for windows too large for a card cut. */
const set = (name: string, w: number) => ({ ...img(name, w), md: `/ds/img/${name}-md.webp` })
/** Tiles cut from a contact sheet only exist at card size, so both cuts are the same file. */
const tile = (name: string) => ({ src: `/ds/img/${name}-sm.webp`, w: 585, sm: `/ds/img/${name}-sm.webp` })

/**
 * Every cut a photograph has, as a `srcset`, so a frame the browser can size — a full-bleed
 * plate, a window with a known share of the viewport — fetches the cut it needs rather than the
 * largest one. Tiles have a single cut and get none.
 */
export const srcSet = (photo: Photo): string | undefined =>
  photo.src === photo.sm
    ? undefined
    : [photo.sm + ' 880w', photo.md ? photo.md + ' 1280w' : '', photo.src + ' ' + photo.w + 'w'].filter(Boolean).join(', ')

export const photos = {
  // --- The golden-hour set: one picture per sector --------------------------------------------

  /** Stone heritage houses above a palm-lined bay. The coast, the mountains, the sun on the sea. */
  coast: {
    ...set('saudi-coast-heritage', 1774),
    lqip: 'data:image/webp;base64,UklGRoIAAABXRUJQVlA4IHYAAADQAwCdASoUAAoAPu1iqU2ppaQiMAgBMB2JZACdMoACoGZY8zdbvwAA/j45ttSUwUavN954lYzZyzqGHHlbpBBJO9DQjQCyID5zz1IWe23UpK5tbnM/Nw+QZ3X+DlcfcUrmkhmAMaPoSkVTNfEpvCbjk0anAAAA',
    focus: '62% 50%',
    alt: {
      ar: 'بيوت حجرية تراثية تطل على خليج تحفّه النخيل عند الغروب، ورجل بالشماغ يتأمل البحر',
      en: 'Stone heritage houses above a palm-lined bay at sunset, a man in a shemagh looking out to sea',
    },
  },
  /** An engineer on a gantry above a processing plant, the range behind it. Industry at scale. */
  industry: {
    ...set('industrial-plant-dusk', 1774),
    lqip: 'data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAADwAwCdASoUAAoAPu1iqU2ppaQiMAgBMB2JZACdMoADYtHjGPiNVIwYAP7HdLwzonZxGtECa0o0lRXAMMTGZESoLxn+B+ljPmH2SK+kvmsSCYzof5OW0EMJg7aYktoDVqyfSbIJttAAAA==',
    focus: '58% 50%',
    alt: {
      ar: 'مهندس يحمل جهازاً لوحياً يطل على منشأة صناعية عند الغروب، والجبال خلفها',
      en: 'An engineer with a tablet overlooking a processing plant at sunset, mountains beyond',
    },
  },
  /** Loading bays, forklifts and a line of trucks, the highway running off to the city. */
  logistics: {
    ...set('logistics-hub-dusk', 1774),
    lqip: 'data:image/webp;base64,UklGRowAAABXRUJQVlA4IIAAAABwBACdASoUAAoAPu1iqU2ppaOiMAgBMB2JYgCdMoGv/gPg+I5wtTzieepC0AD+x20+0TsveKmV11YYktca9oWIrcnOnfapbkhwvI9VZ5w6nDg0RCDLnIQqHWq6U7UJhPYvfRKFUqMftRQOo/JSgVhwgAr6GU8hCraQWMqcCQAAAA==',
    focus: '60% 55%',
    alt: {
      ar: 'مركز لوجستي عند الغروب: أرصفة تحميل ورافعات شوكية وصف من الشاحنات، والمدينة والجبال في الأفق',
      en: 'A logistics hub at golden hour — loading bays, forklifts and a line of trucks, the city and mountains beyond',
    },
  },
  /** A stone-and-timber residence lit at dusk. Real estate, finished and lived in. */
  residence: {
    ...set('residence-golden-hour', 1774),
    lqip: 'data:image/webp;base64,UklGRn4AAABXRUJQVlA4IHIAAADQAwCdASoUAAoAPu1iqU2ppaQiMAgBMB2JYgCdABeW4/fGyGCGKSAA/bYATnKaHmBE6h0u8dk8pqW09hldRgDLR+IHwylGFXPIh3JaATK2dtuVerzKoENCV1+c7oQElGiW0i4AYFkN+578NhinpJsONAA=',
    focus: '62% 50%',
    alt: {
      ar: 'مسكن من الحجر والخشب مضاء عند الغروب، وأشجار الزيتون عند مدخله',
      en: 'A stone-and-timber residence lit at dusk, olive trees at the entrance',
    },
  },
  /**
   * A phone settling a payment at a contactless terminal. The source frame opens on a block
   * carrying the national emblem; the export crops it out of every cut.
   */
  payments: {
    ...set('payments-tap', 1402),
    lqip: 'data:image/webp;base64,UklGRq4AAABXRUJQVlA4IKIAAAAQBACdASoUAA0APu1iqU2ppaOiMAgBMB2JYgCdACLpDjh2scARd/mzAAD5S0GcZWrSV4IYtNEH3FkF67KY5QIrT7vlDm8hGQwg0sm5WI463vUWiCUPrP5SuYtmr1AcwxtjCH3Qjy80Uqd7k2TUGS3/edhNVRNf+pz80DfoO2gn/SHqD+WEOsQkIhlMYWNamuraGDIXfGd3fIuKpBN3EVwAAAA=',
    focus: '58% 46%',
    alt: {
      ar: 'هاتف يُتمّ دفعة عبر جهاز دفع لا تلامسي، وعلى شاشته «تم الدفع بنجاح»',
      en: 'A phone paying at a contactless terminal, the screen confirming the payment',
    },
  },
  /** A lounge by the fountains, a concert stage lit beyond. An evening destination. */
  leisure: {
    ...set('leisure-destination', 1774),
    lqip: 'data:image/webp;base64,UklGRpwAAABXRUJQVlA4IJAAAACQBACdASoUAAoAPu1iqU2ppaQiMAgBMB2JagCdMoRwDqAAMdfOIkP33sWf7QAA/rxygBzFB2WfWcBX4OGSHCcsuZHF+JYc48hRDIwVHqI5hpcDCW0WfqlxflXtRZ5+y67UL+Cry1wkcyqBqK4RweA4F94CxcGkyKruMUUCINgJOzf3iw/iFkM/yX0NN4mAAAA=',
    focus: '60% 50%',
    alt: {
      ar: 'وجهة مسائية: جلسات بجوار النوافير، ومسرح حفلات مضاء في الخلفية',
      en: 'An evening destination — a lounge by the fountains, a concert stage lit beyond',
    },
  },
  /** Code on a laptop before the Riyadh skyline, the cloud and the data drawn in the air. */
  technology: {
    ...set('riyadh-tech-horizon', 1672),
    lqip: 'data:image/webp;base64,UklGRoYAAABXRUJQVlA4IHoAAADQAwCdASoUAAsAPu1iqk2ppaQiMAgBMB2JQBOgAapdWRXrHUF3KAAA/oasoR+7EWnvCLbgoi/SvaMkpoVV2h3uAcqF+nhp74gaMZ+nk8sgO/d2UPhlh3lP6GERRfqLpT+Fmt7T6CgZSDv/3ZP0l7q2cKD2Wt9ApRqAAA==',
    focus: '60% 48%',
    alt: {
      ar: 'حاسوب محمول بشيفرة برمجية أمام أفق الرياض عند الغروب، وأيقونات السحابة والبيانات تطفو فوقه',
      en: 'A laptop of code before the Riyadh skyline at golden hour, cloud and data icons in the air above it',
    },
  },

  // --- Entertainment, cut from one contact sheet: six evenings, one sector --------------------

  concert: {
    ...tile('ent-concert'),
    lqip: 'data:image/webp;base64,UklGRpQAAABXRUJQVlA4IIgAAACQBACdASoUAA8APu1iqU2ppaOiMAgBMB2JbACdMoMpAE54iXP+zfOObgfnqGAA/sBREewKdCSj18tiAHREcgJd2LK29ELnD83PuCyW649zOSxLL+nvY6fz1IPCeTd1E+rSTda3HHCH+HeWjq+kDjGultWRZ0hul20jNss/aODKjZt/vdsHEAAA',
    focus: '50% 50%',
    alt: { ar: 'جمهور حفل أمام مسرح مضاء وألعاب نارية', en: 'A concert crowd under a lit stage and fireworks' },
  },
  coaster: {
    ...tile('ent-coaster'),
    lqip: 'data:image/webp;base64,UklGRrAAAABXRUJQVlA4IKQAAACQBACdASoUAA8APu1iqU2ppaOiMAgBMB2JZACdMoMljD9AZnVDQqDu6je573AA8iAP5JM7ciBPBxnYIcSDZa1eyEyoZsUGlwrJF9mrNR0c37YxP5jpCM9dPmS4kfqg0jJC2pPefhFhpz76leiCYQlm/mfMTrlsY745qYxnMi5vukFnz5R3daxTTkTdGVLAIe+jWefz3yOdSmo/636RcnHm+2OAAA==',
    focus: '60% 40%',
    alt: { ar: 'ركّاب يرفعون أيديهم على قطار أفعواني عند الغروب', en: 'Riders with their arms raised on a roller coaster at sunset' },
  },
  cinema: {
    ...tile('ent-cinema'),
    lqip: 'data:image/webp;base64,UklGRqgAAABXRUJQVlA4IJwAAACwBACdASoUAA8APu1iqU2ppaOiMAgBMB2JaACdMoR2WCx5XTRN/do5FJP/C1ngAP7sDywd60sXcxIpna6JC2fTBjaLQokFtOL9/H4nAc5sN2TfoiwaKhFQ3hTO8rH3j7zbfSxjYc9wY8eQTL0/u5awI7Tr7/1GjrpGBEOPpFPVgvQwimWSbaaNLZD1KMCwaJmohIOec7NeyGtLAAA=',
    focus: '50% 50%',
    alt: { ar: 'صالة سينما فاخرة وشاشتها مضاءة', en: 'A luxury cinema hall, the screen lit' },
  },
  dining: {
    ...tile('ent-dining'),
    lqip: 'data:image/webp;base64,UklGRqgAAABXRUJQVlA4IJwAAADQBACdASoUAA8APu1iqU2ppaOiMAgBMB2JaACdMoMYAE5N3Ge2Ku8qNONzzEKCAAD+o0pn2W0iDOMqYn489idcaNI/uUp48gk1TzdjQTipOLd8vc417un86KyvgddIJLiCNFn8E0L3Y0WGtphuS/JF6lUUkky5d+tVAMwQQthjl7SEX/yY23LrchmP1ztTQWSXoD3EvXWTIedlQAA=',
    focus: '36% 62%',
    alt: { ar: 'مائدة على الواجهة المائية عند الغروب، والشموع على الطاولة', en: 'Waterfront dining at dusk, candles on the table' },
  },
  esports: {
    ...tile('ent-esports'),
    lqip: 'data:image/webp;base64,UklGRngAAABXRUJQVlA4IGwAAACwAwCdASoUAA8APu1iqU2ppaOiMAgBMB2JagCdACPtiod5mR/0gAD+8Q6mi5OZ10ZrMwM6JvuJka+1vcbF6NwtDk9GNJFWfrX4X6MFaYZejPrMVwc9WF0MbXTR3438v0DLawJJvYnVENKAgAA=',
    focus: '50% 50%',
    alt: { ar: 'ساحة رياضات إلكترونية، ولاعبون أمام شاشاتهم وجمهور يملأ القاعة', en: 'An esports arena — players at their screens before a full hall' },
  },
  promenade: {
    ...tile('ent-promenade'),
    lqip: 'data:image/webp;base64,UklGRqwAAABXRUJQVlA4IKAAAACwAwCdASoUAA8APu1iqU2ppaOiMAgBMB2JagCdMoACcwBNoEA4uAD+0Ree5uy/RpM1u9V4H35OqylVsNDLY3cM/h8woAeMWkUTcK/Lae4CJlZ76ic4gtEDNMDzIn7jNuOzhU9vfbzjZXtiXrvfIuCkacrxYGuosqp2lzvRo/1s7J3M9dyJiFSw2kVwoxBfG8ocDODHXn5/NCDXxFxBAAAA',
    focus: '55% 50%',
    alt: { ar: 'عائلة تمشي في ممشى مضاء نحو عجلة دوّارة', en: 'A family walking a lit promenade toward a Ferris wheel' },
  },

  // --- The first set, still in service ---------------------------------------------------------

  /** Riyadh at first light, read from the base of a green-glass curve. The brand's own palette. */
  facade: {
    ...img('riyadh-dawn-facade', 1920),
    lqip: 'data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAABwAwCdASoUAAgAPulgqE0pJaOiMAgBIB0JZwDG9BuHjIn7QSAA/eKfh3Kbh17NrnhLnRDZSVu3PCOZyLgThUb8KGXBVIAA',
    focus: '38% 60%',
    alt: {
      ar: 'واجهة زجاجية منحنية بلون أخضر داكن تطل على أفق الرياض عند الفجر',
      en: 'A curved dark-green glass facade opening onto the Riyadh skyline at first light',
    },
  },
  /** A working hall: robotics, coil stock, people on the floor, the desert beyond the doors. */
  manufacturing: {
    ...img('advanced-manufacturing', 1672),
    lqip: 'data:image/webp;base64,UklGRoAAAABXRUJQVlA4IHQAAADwAwCdASoUAAsAPulgqE0pJaOiMAgBIB0JZQAAUOWuQW7A0mvZgKqAAP7cmPWEeSwXQtEvvNsoF1fSFxUG9deSb73FjEfRHPQWAY8G/muq83BtT2/EVE6gARI/vg1QUkEawN5Et3FybgXBj+hEMq/Bl5SAAA==',
    focus: '42% 50%',
    alt: {
      ar: 'صالة تصنيع متقدمة بأذرع آلية وخطوط إنتاج وفريق تشغيل',
      en: 'An advanced manufacturing hall — robotic arms, production lines and an operating crew',
    },
  },
  /** A packing line on the factory floor. Premium food manufacturing, boxed and leaving. */
  plant: {
    ...img('about-manufacturing', 1200),
    lqip: 'data:image/webp;base64,UklGRoAAAABXRUJQVlA4IHQAAABQBACdASoUAA0APulep00pJSOiMAgBIB0JZQDE2CBi8IvPaDz18VKhiHrgAP5kObGk1cRuM7ZXp4Efxd+AfP2iIOWZgBnWQKroMhcWkV6bZfKFwHx0RTbmPBEZoqvqhg8GxhC8S2IBzp1MWJVnLrg7fx0AAA==',
    focus: '50% 50%',
    alt: {
      ar: 'خط إنتاج داخل أحد مصانع المنظومة',
      en: 'A production line inside one of the ecosystem’s plants',
    },
  },
} as const satisfies Record<string, Photo>

export type PhotoKey = keyof typeof photos

/**
 * A photograph, framed for one slot.
 *
 * `focus` picks the base crop. `zoom` and `origin` take a detail out of the frame instead of
 * the whole picture: a close crop of a robot arm and a wide read of the hall it stands in are
 * different images to a reader, even when the file is the same.
 */
export type Framed = {
  photo: Photo
  /** `object-position` for the base crop. Defaults to the photograph's own focal point. */
  focus?: string
  /** How far into the frame to push. 1 keeps the whole photograph. */
  zoom?: number
  /** The point a zoom closes on, as a `transform-origin` pair. */
  origin?: string
}

/**
 * The eight strategic sectors, in the order the copy lists them — Industry, Technology, Food,
 * Logistics, Tourism, Real estate, Financial services, Entertainment. Every sector now has a
 * photograph of its own; Food is the one taken from the entertainment sheet, the waterfront
 * table, because the food platforms are what the sector ends at.
 */
export const sectorFrames: Framed[] = [
  { photo: photos.industry, focus: '64% 50%' },
  { photo: photos.technology, focus: '44% 50%' },
  { photo: photos.dining, focus: '30% 64%' },
  { photo: photos.logistics, focus: '58% 58%' },
  { photo: photos.coast, focus: '70% 52%' },
  { photo: photos.residence, focus: '60% 50%' },
  { photo: photos.payments, focus: '62% 46%' },
  { photo: photos.leisure, focus: '66% 50%' },
]

/**
 * The home page's opening sequence: one frame per sector the cinema cuts between, keyed to the
 * sector it shows. Food sits this one out — its only picture is a card-sized tile, and the hero
 * is full-bleed at every width.
 */
export const heroFrames: { sector: number; frame: Framed }[] = [
  { sector: 4, frame: { photo: photos.coast, focus: '50% 50%' } },
  { sector: 0, frame: { photo: photos.industry, focus: '62% 50%' } },
  { sector: 3, frame: { photo: photos.logistics, focus: '56% 52%' } },
  { sector: 5, frame: { photo: photos.residence, focus: '58% 52%' } },
  { sector: 1, frame: { photo: photos.technology, focus: '56% 46%' } },
  { sector: 7, frame: { photo: photos.leisure, focus: '58% 48%' } },
  { sector: 6, frame: { photo: photos.payments, focus: '60% 48%' } },
]

/** The three verbs of the positioning line, each with a picture of the work behind it. */
export const verbFrames: Framed[] = [
  { photo: photos.industry, focus: '70% 44%' },
  { photo: photos.logistics, focus: '72% 60%' },
  { photo: photos.technology, focus: '76% 38%' },
]

/** The four stages of the SEEM model on the home page: where, ready, done, and what it left. */
export const seemFrames: Framed[] = [
  { photo: photos.technology, focus: '60% 46%' },
  { photo: photos.logistics, focus: '52% 56%' },
  { photo: photos.industry, focus: '52% 50%' },
  { photo: photos.residence, focus: '62% 50%' },
]

/** The entertainment sector is too many evenings for one frame; the reel closes on a cluster. */
export const leisureTiles: Framed[] = [
  { photo: photos.concert },
  { photo: photos.promenade },
  { photo: photos.cinema },
  { photo: photos.coaster },
  { photo: photos.esports },
]

/** The four portfolio platforms, in the order every page lists them. */
export const platformFrames: Framed[] = [
  { photo: photos.plant, focus: '50% 50%' },
  { photo: photos.logistics, focus: '66% 60%' },
  { photo: photos.coast, focus: '72% 52%' },
  { photo: photos.residence, focus: '60% 50%' },
]

/** `Develop · Operate · Invest · Monetize` — one plate per stage of the business model. */
export const stageFrames: Framed[] = [
  { photo: photos.industry, focus: '60% 50%' },
  { photo: photos.logistics, focus: '56% 56%' },
  { photo: photos.technology, focus: '58% 46%' },
  { photo: photos.leisure, focus: '58% 50%' },
]

/**
 * The masthead plate each inner page opens on, and the plate its closing band lands on. They
 * are deliberately never the same photograph twice on one page: the reader should feel they
 * have travelled somewhere between the title and the call to action.
 */
export const pagePlates = {
  about: {
    masthead: { photo: photos.coast, focus: '30% 50%' },
    cta: { photo: photos.residence, focus: '64% 50%' },
  },
  model: {
    masthead: { photo: photos.industry, focus: '62% 50%' },
    cta: { photo: photos.logistics, focus: '60% 56%' },
  },
  strategy: {
    masthead: { photo: photos.technology, focus: '62% 42%' },
    cta: { photo: photos.coast, focus: '72% 50%' },
  },
  ecosystem: {
    masthead: { photo: photos.leisure, focus: '56% 50%' },
    cta: { photo: photos.industry, focus: '40% 50%' },
  },
  roadmap: {
    masthead: { photo: photos.logistics, focus: '20% 50%' },
    cta: { photo: photos.technology, focus: '70% 44%' },
  },
  contact: {
    masthead: { photo: photos.residence, focus: '56% 50%' },
    cta: { photo: photos.facade, focus: '20% 50%' },
  },
} as const satisfies Record<string, { masthead: Framed; cta: Framed }>

/**
 * The home page's closing moments. The horizon is the coast again — the page ends on the view
 * it opened with, turned so the sun always sits at 2030, the end of the reading line.
 */
export const homeHorizon: Framed = { photo: photos.coast, focus: '100% 40%' }
export const homeClosing: Framed = { photo: photos.technology, focus: '64% 46%' }
