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
 * The business model was a page of its own; it is a chapter of the strategy page now. Links to it
 * land on the chapter, and so does the old URL (see `next.config.ts`).
 */
export const chapters = {
  model: '/strategy#model',
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

/** The company's one published contact: its official email. It lists no phone number. */
export const EMAIL = 'info@seem.sa'
