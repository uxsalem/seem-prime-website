import type { Lang } from '@/lib/site'

/**
 * The site's photography, named once.
 *
 * Each entry carries the full-bleed file, a lighter cut for cards and rails, a 20px blur-up
 * placeholder to paint under the frame while the real file arrives, the focal point a crop
 * should hold on to, and alt text in both languages. Call sites reference a `Photo`, never a
 * path, so re-shooting a subject is a one-line change here.
 */
export type Photo = {
  /** Full-bleed cut — plates, mastheads, banners. */
  src: string
  /** ~880px cut — cards, rails, gallery tiles. */
  sm: string
  /** A 20px WebP, inlined: the frame is never empty, even on the first paint. */
  lqip: string
  /** Default `object-position` / `background-position` for a crop. */
  focus: string
  alt: Record<Lang, string>
}

const img = (name: string) => ({ src: `/ds/img/${name}.webp`, sm: `/ds/img/${name}-sm.webp` })

export const photos = {
  /** Riyadh at first light, read from the base of a green-glass curve. The brand's own palette. */
  facade: {
    ...img('riyadh-dawn-facade'),
    lqip: 'data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAABwAwCdASoUAAgAPulgqE0pJaOiMAgBIB0JZwDG9BuHjIn7QSAA/eKfh3Kbh17NrnhLnRDZSVu3PCOZyLgThUb8KGXBVIAA',
    focus: '38% 60%',
    alt: {
      ar: 'واجهة زجاجية منحنية بلون أخضر داكن تطل على أفق الرياض عند الفجر',
      en: 'A curved dark-green glass facade opening onto the Riyadh skyline at first light',
    },
  },
  /** A working hall: robotics, coil stock, people on the floor, the desert beyond the doors. */
  manufacturing: {
    ...img('advanced-manufacturing'),
    lqip: 'data:image/webp;base64,UklGRoAAAABXRUJQVlA4IHQAAADwAwCdASoUAAsAPulgqE0pJaOiMAgBIB0JZQAAUOWuQW7A0mvZgKqAAP7cmPWEeSwXQtEvvNsoF1fSFxUG9deSb73FjEfRHPQWAY8G/muq83BtT2/EVE6gARI/vg1QUkEawN5Et3FybgXBj+hEMq/Bl5SAAA==',
    focus: '42% 50%',
    alt: {
      ar: 'صالة تصنيع متقدمة بأذرع آلية وخطوط إنتاج وفريق تشغيل',
      en: 'An advanced manufacturing hall — robotic arms, production lines and an operating crew',
    },
  },
  /** Terraces stepping down to a Red Sea bay at golden hour. Tourism and hospitality. */
  hospitality: {
    ...img('red-sea-hospitality'),
    lqip: 'data:image/webp;base64,UklGRn4AAABXRUJQVlA4IHIAAABQBACdASoUAAsAPulgqE0pJaOiMAgBIB0JQBOmUGWUEAAeIGorn9ltxhcAAP7p310G+upF99Jp12uQ2K2UA+6bAZGLLGDPq6CP4KPDNZOIynBGqvRzqzGPQ3gGfO+kDNGVRqbUL43EuAJhxEssmLwAAAA=',
    focus: '55% 50%',
    alt: {
      ar: 'منتجع ساحلي متدرّج يطل على خليج على البحر الأحمر عند الغروب',
      en: 'A terraced coastal resort above a Red Sea bay at sunset',
    },
  },
  /** A new downtown at golden hour, read from a terrace. Capital, density, the road to 2030. */
  skyline: {
    ...img('skyline-golden-hour'),
    lqip: 'data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAADQAwCdASoUAAsAPulgqE2pJaQiMAgBIB0JQBOgApCUKgWBLA7OcwAA/uOGfaU39kCIuWFQ8MB3Fhj/8N7L15ds/E0OkR5qAKMy2KCs2lGQq8vSSOO81yRGXPxNvcvkkaRvM8sT3+lsAA==',
    focus: '46% 46%',
    alt: {
      ar: 'أفق مدينة حديثة عند الغروب من شرفة مطلة على الطرق والأبراج',
      en: 'A modern downtown skyline at golden hour, seen from a terrace above the arterials',
    },
  },
  /** The original plant photograph, kept for the operations frame it was shot for. */
  plant: {
    ...img('about-manufacturing'),
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
 * the whole picture — which is how eight strategic sectors run off four photographs without
 * eight frames looking like the same one: a close crop of a robot arm and a wide read of the
 * hall it stands in are different images to a reader, even when the file is the same.
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
 * The masthead plate each inner page opens on, and the plate its closing band lands on. They
 * are deliberately never the same photograph twice on one page: the reader should feel they
 * have travelled somewhere between the title and the call to action.
 */
export const pagePlates = {
  about: {
    masthead: { photo: photos.manufacturing, focus: '46% 46%' },
    cta: { photo: photos.facade, focus: '14% 55%' },
  },
  model: {
    masthead: { photo: photos.facade, focus: '16% 58%' },
    cta: { photo: photos.manufacturing, focus: '62% 52%' },
  },
  strategy: {
    masthead: { photo: photos.skyline, focus: '40% 40%' },
    cta: { photo: photos.hospitality, focus: '58% 48%' },
  },
  ecosystem: {
    masthead: { photo: photos.hospitality, focus: '48% 46%' },
    cta: { photo: photos.skyline, focus: '58% 52%' },
  },
  roadmap: {
    masthead: { photo: photos.facade, focus: '6% 62%' },
    cta: { photo: photos.skyline, focus: '30% 38%' },
  },
  contact: {
    masthead: { photo: photos.skyline, focus: '76% 44%' },
    cta: { photo: photos.facade, focus: '20% 50%' },
  },
} as const satisfies Record<string, { masthead: Framed; cta: Framed }>

/** The four portfolio platforms, in the order every page lists them. */
export const platformFrames: Framed[] = [
  { photo: photos.manufacturing, focus: '40% 50%' },
  { photo: photos.skyline, focus: '48% 44%' },
  { photo: photos.hospitality, focus: '52% 50%' },
  { photo: photos.facade, focus: '16% 58%', zoom: 1.35, origin: '22% 58%' },
]

/** `Develop · Operate · Invest · Monetize` — one plate per stage of the business model. */
export const stageFrames: Framed[] = [
  { photo: photos.facade, focus: '10% 56%' },
  { photo: photos.manufacturing, focus: '34% 52%' },
  { photo: photos.skyline, focus: '52% 40%' },
  { photo: photos.hospitality, focus: '60% 50%' },
]

/**
 * The eight strategic sectors, off four photographs. Each frame closes on a different part of
 * its source — the robot arm, the aisle, the terrace, the towers — so the rail reads as a
 * commissioned set rather than one picture used eight times.
 */
export const sectorFrames: Framed[] = [
  { photo: photos.manufacturing, focus: '46% 48%' },
  { photo: photos.manufacturing, zoom: 2.7, origin: '16% 44%' },
  { photo: photos.hospitality, zoom: 2.9, origin: '12% 56%' },
  { photo: photos.manufacturing, zoom: 2.1, origin: '62% 72%' },
  { photo: photos.hospitality, focus: '56% 46%' },
  { photo: photos.facade, zoom: 1.7, origin: '16% 62%' },
  { photo: photos.skyline, zoom: 2.2, origin: '52% 28%' },
  { photo: photos.skyline, zoom: 2.4, origin: '80% 66%' },
]

/** The home page's two full-bleed moments: the opening, and the statement it closes on. */
export const homeHero: Framed = { photo: photos.facade, focus: '8% 50%' }
export const homeBanner: Framed = { photo: photos.skyline, focus: '44% 44%' }
