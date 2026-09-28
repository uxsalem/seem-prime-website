/**
 * Every page in the original build repeated the same handful of style builders verbatim. They
 * are collected here once: each takes the `ar` flag (Arabic sets a heavier weight, looser
 * leading, no letter-spacing and no uppercasing) and returns a CSS declaration string for
 * `css()` to parse.
 */

export const ACCENT = '#dc4b1c'

/**
 * Bronze-300 from the identity's value palette. The golden-hour set lights every sector the same
 * warm way, and this is its colour in type: small indices and figures on the dark ground, where
 * ember would be too loud and white too flat.
 */
export const BRONZE = '#c4a878'

export const bodyFont = (ar: boolean) =>
  ar ? "'IBM Plex Sans Arabic',system-ui,sans-serif" : "'IBM Plex Sans',system-ui,sans-serif"

export const dispFont = (ar: boolean) =>
  ar ? "'IBM Plex Sans Arabic',system-ui,sans-serif" : "'Sora',system-ui,sans-serif"

/** The eyebrow/label tail: `…;font-size:11px;…;color:` — callers append the colour. */
export const lbl = (ar: boolean) =>
  ';font-size:11px;font-weight:500;letter-spacing:' +
  (ar ? 'normal' : '.18em') +
  ';text-transform:' +
  (ar ? 'none' : 'uppercase') +
  ';color:'

export const rootStyle = (ar: boolean) =>
  'background:var(--page);color:var(--body);font-family:' +
  bodyFont(ar) +
  ';font-size:16px;line-height:' +
  (ar ? '1.75' : '1.62') +
  ';-webkit-font-smoothing:antialiased'

/** Section H2, on the page surface or on a brand-green one. */
export const h2Style = (ar: boolean, color = 'var(--ink)') =>
  'margin:0;font-family:' +
  dispFont(ar) +
  ';font-weight:' +
  (ar ? '600' : '300') +
  ';font-size:clamp(26px,3.6vw,52px);line-height:' +
  (ar ? '1.3' : '1.08') +
  ';letter-spacing:' +
  (ar ? '0' : '-.02em') +
  ';color:' +
  color +
  ';text-wrap:pretty'

/** Mono caption over a light surface. */
export const capStyle = (ar: boolean, color = 'var(--muted)') =>
  "font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:" +
  (ar ? 'normal' : '.1em') +
  ';text-transform:' +
  (ar ? 'none' : 'uppercase') +
  ';color:' +
  color

/** Two-digit ordinal: `01`, `02`, … */
export const ordinal = (i: number) => '0' + (i + 1)

/**
 * Display type at any size: the family, the weight and the leading that belong together.
 * Latin runs Sora light and tight, the way the framework sets its big type; Arabic runs Plex
 * Arabic semibold with room between lines for its ascenders.
 */
export const display = (ar: boolean, size: string, latinWeight = 300) =>
  'font-family:' +
  dispFont(ar) +
  ';font-weight:' +
  (ar ? 600 : latinWeight) +
  ';font-size:' +
  size +
  ';line-height:' +
  (ar ? '1.28' : '1.02') +
  ';letter-spacing:' +
  (ar ? '0' : '-.03em')

/** Whether a string is written in Arabic script. */
export const arabic = (s: string) => /[\u0600-\u06FF]/.test(s)

/**
 * A platform's name at any size. The name is the client's mark, so it keeps its own script
 * whatever the page's language: a Latin mark runs Sora, set as `display` sets Latin, and a mark
 * written in Arabic runs Plex Arabic, with a little more leading for its ascenders and no
 * tracking, which would pull its joined letters apart. The options are the Latin setting; an
 * Arabic mark takes the regular weight beside light Latin and the semibold beside anything heavier.
 */
export const markType = (name: string, size: string, { weight = 300, leading = '1.02', tracking = '-.03em' } = {}) =>
  arabic(name)
    ? "font-family:'IBM Plex Sans Arabic',sans-serif;font-weight:" +
      (weight > 400 ? 600 : 400) +
      ';font-size:' +
      size +
      ';line-height:1.12;letter-spacing:0'
    : "font-family:'Sora',sans-serif;font-weight:" + weight + ';font-size:' + size + ';line-height:' + leading + ';letter-spacing:' + tracking

/**
 * The title a page opens on, over its photograph. The home page set the scale, and every inner
 * masthead shares it so no page opens louder than home. The measure matters as much as the size:
 * it stacks a long title into a block of two lines rather than one banner across the frame.
 */
export const heroTitle = (ar: boolean) =>
  'margin:0;max-width:' +
  (ar ? '20ch' : '15.5em') +
  ';' +
  display(ar, ar ? 'clamp(34px,5vw,76px)' : 'clamp(34px,4.5vw,66px)') +
  ';color:#ffffff;text-wrap:balance'
