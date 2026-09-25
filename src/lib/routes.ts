/** The one place the site's URLs are named. */
export const routes = {
  home: '/',
  about: '/about',
  strategy: '/strategy',
  ecosystem: '/ecosystem',
  contact: '/contact',
} as const

export type RouteKey = keyof typeof routes

/**
 * The business model and the roadmap were pages of their own; they are chapters of the strategy
 * page now. Links to them land on the chapter, and so do the old URLs (see `next.config.ts`).
 */
export const chapters = {
  model: '/strategy#model',
  roadmap: '/strategy#roadmap',
} as const

/**
 * The abstract brand plates the build shipped with. The heroes, mastheads, banners and closing
 * bands are photographic now — see `src/lib/media.ts` — but these are kept named and on disk,
 * because a graphic plate is still the right answer for a surface that must not compete with
 * the type over it.
 */
export const plates = {
  glassCapsule: '/ds/img/glass-capsule-green.png',
  greenFins: '/ds/img/architecture-green-fins.png',
  bladeSplit: '/ds/img/blade-split-green-white.png',
  diagonalPlanes: '/ds/img/diagonal-glass-planes.png',
  whiteGreenPlanes: '/ds/img/white-green-planes.png',
} as const

export const EMAIL = 'info@seem.sa'
export const PHONE_HREF = 'tel:+966536800016'
export const PHONE_DISPLAY = '+966 53 680 0016'
