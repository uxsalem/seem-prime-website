/** The one place the site's URLs are named. */
export const routes = {
  home: '/',
  about: '/about',
  model: '/model',
  strategy: '/strategy',
  ecosystem: '/ecosystem',
  roadmap: '/roadmap',
  contact: '/contact',
} as const

export type RouteKey = keyof typeof routes

/** Brand plates, shared by the hero, the statement banner and the closing CTA. */
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
