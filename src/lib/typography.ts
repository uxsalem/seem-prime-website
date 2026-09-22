/**
 * Every page in the original build repeated the same handful of style builders verbatim. They
 * are collected here once: each takes the `ar` flag (Arabic sets a heavier weight, looser
 * leading, no letter-spacing and no uppercasing) and returns a CSS declaration string for
 * `css()` to parse.
 */

export const ACCENT = '#dc4b1c'

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

/** Masthead H1 on the inner pages. */
export const pgH1Style = (ar: boolean) =>
  'margin:0;max-width:22ch;font-family:' +
  dispFont(ar) +
  ';font-weight:' +
  (ar ? '600' : '300') +
  ';font-size:clamp(30px,4.6vw,66px);line-height:' +
  (ar ? '1.26' : '1.04') +
  ';letter-spacing:' +
  (ar ? '0' : '-.025em') +
  ';color:#ffffff;text-wrap:pretty'

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

/**
 * The home page runs its H2 a size larger than the inner pages. Returned without a margin or a
 * colour so call sites can lead with their own (the statement banner centres itself).
 */
export const homeH2Core = (ar: boolean) =>
  'font-family:' +
  dispFont(ar) +
  ';font-weight:' +
  (ar ? '600' : '300') +
  ';font-size:clamp(26px,3.8vw,54px);line-height:' +
  (ar ? '1.3' : '1.06') +
  ';letter-spacing:' +
  (ar ? '0' : '-.02em') +
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
