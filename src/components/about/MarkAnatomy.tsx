'use client'

import { useRef } from 'react'
import { MARK_PATHS } from '@/components/Mark'
import { ABOUT } from '@/lib/content/about'
import { HOME } from '@/lib/content/home'
import { css } from '@/lib/css'
import { reduceMotion, useScrollDriver } from '@/lib/hooks'
import { useSite } from '@/lib/site'
import { display, dispFont, kicker, KICKER_RULE, ordinal } from '@/lib/typography'

/** Where the drawing holds still beside the steps. Elsewhere it simply draws itself on arrival. */
export const NAME_QUERY = '(min-width: 1000px) and (min-height: 600px)'

/** The letters as the artwork groups its paths, in reading order: S, E, E, M. */
const LETTERS = [
  [0, 1, 6, 7],
  [3, 8],
  [4, 9],
  [5, 10],
]

/** The frame, as one stroke along the centre of the artwork's ring, so it can be drawn. */
const FRAME = 'M1.165 1.165 H118.835 V118.835 H1.165 Z'

/** Every bar in the mark starts and ends on one of these lines — the grid the letters are cut from. */
const ROWS = [9.24, 17.16, 28.99, 36.86, 48.62, 56.54, 63.47, 71.42, 83.2, 91.11, 102.88, 110.8]
const COLS = [9.24, 56.58, 63.47, 110.9]

/** The sheet, in the mark's own units: the square at 0–120, with room around it for callouts. */
const VX = -44
const VY = -48
const VS = 208
const pctX = (x: number) => (((x - VX) / VS) * 100).toFixed(2) + '%'
const pctY = (y: number) => (((y - VY) / VS) * 100).toFixed(2) + '%'

/**
 * Each letter's callout, above the square for the top row and below it for the bottom. The
 * drawing is physical — the mark reads S E / E M in both languages — so each callout hangs off
 * its own side of the centre axis and grows outward, never into its neighbour.
 */
const CALLOUTS = [
  { x: 56, y: -9, up: true, left: false },
  { x: 64, y: -9, up: true, left: true },
  { x: 56, y: 129, up: false, left: false },
  { x: 64, y: 129, up: false, left: true },
]

/** Registration marks at the sheet's corners: [x, y, horizontal reach, vertical reach]. */
const TICKS: [number, number, number, number][] = [
  [-36, -40, 7, 7],
  [156, -40, -7, 7],
  [-36, 152, 7, -7],
  [156, 152, -7, -7],
]

const clamp01 = (n: number) => Math.max(0, Math.min(1, n))
const span = (p: number, a: number, b: number) => clamp01((p - a) / (b - a))

/**
 * Chapter two: the name, read off the mark. The square is drawn the way it was designed — as a
 * construction on a sheet: the frame first, then each letter traced in outline and filled,
 * S, E, E, M, each one naming the stage it stands for, and last the grid of bars every letter
 * is cut from. On a wide screen the drawing holds still while the three notes beside it scroll
 * past, and each note builds its part; elsewhere it draws itself as it arrives.
 */
export function MarkAnatomy() {
  const { lang, ar } = useSite()
  const t = ABOUT[lang]
  const seem = HOME[lang].seem

  const figRef = useRef<HTMLElement>(null)
  const stepsRef = useRef<HTMLOListElement>(null)
  const frameRef = useRef<SVGPathElement>(null)
  const sheetRef = useRef<SVGGElement>(null)
  const letterRefs = useRef<SVGGElement[]>([])
  const guideRefs = useRef<SVGLineElement[]>([])
  const calloutRefs = useRef<HTMLSpanElement[]>([])
  const dimRef = useRef<HTMLSpanElement>(null)

  useScrollDriver({
    onFrame: () => {
      const fig = figRef.current
      const steps = stepsRef.current
      if (!fig || !steps) return
      const vh = window.innerHeight || 800
      const figRect = fig.getBoundingClientRect()
      if (figRect.bottom < -vh || figRect.top > vh * 2) return

      const items = [...steps.querySelectorAll<HTMLElement>('[data-name-step]')]
      let p = 1.2
      let active = -1
      if (!reduceMotion() && items.length) {
        if (window.matchMedia(NAME_QUERY).matches) {
          // The notes scroll past the held drawing: 0 as the first crosses the reading line, 1 at the last.
          const line = vh * 0.56
          const centre = (el: HTMLElement) => {
            const r = el.getBoundingClientRect()
            return r.top + r.height / 2
          }
          const first = centre(items[0])
          const last = centre(items[items.length - 1])
          p = (line - first) / Math.max(1, last - first)
          let best = Infinity
          items.forEach((item, i) => {
            const d = Math.abs(centre(item) - line)
            if (d < best) {
              best = d
              active = i
            }
          })
        } else {
          p = -0.6 + 1.8 * clamp01((vh * 0.94 - figRect.top) / (vh * 0.7))
        }
      }

      items.forEach((item, i) => item.toggleAttribute('data-on', active < 0 || i === active))

      const sheet = sheetRef.current
      if (sheet) sheet.style.opacity = span(p, -0.6, -0.25).toFixed(3)
      const dim = dimRef.current
      if (dim) dim.style.opacity = span(p, -0.3, 0).toFixed(3)

      const frame = frameRef.current
      if (frame) {
        const d = span(p, -0.5, -0.04)
        frame.style.strokeDashoffset = (1 - d).toFixed(4)
        frame.toggleAttribute('data-hot', d > 0.001 && d < 0.999)
      }

      letterRefs.current.forEach((letter, j) => {
        const d = span(p, 0.1 + 0.1 * j, 0.26 + 0.1 * j)
        const f = span(p, 0.18 + 0.1 * j, 0.32 + 0.1 * j)
        letter.style.strokeDashoffset = (1 - d).toFixed(4)
        letter.style.fillOpacity = f.toFixed(3)
        letter.toggleAttribute('data-hot', d > 0.001 && f < 0.999)
        const callout = calloutRefs.current[j]
        if (callout) callout.style.opacity = span(p, 0.2 + 0.1 * j, 0.32 + 0.1 * j).toFixed(3)
      })

      guideRefs.current.forEach((guide, k) => {
        guide.style.strokeDashoffset = (1 - span(p, 0.66 + k * 0.01, 0.8 + k * 0.01)).toFixed(4)
      })
    },
  })

  return (
    <section id="name" aria-labelledby="nm-h" style={css('position:relative;background:var(--page)')}>
      <div
        style={css(
          'max-width:1400px;margin:0 auto;padding:clamp(96px,12vw,170px) clamp(16px,3vw,32px) clamp(64px,8vw,120px)',
        )}
      >
        <div data-name-grid="">
          <div data-name-copy="">
            <p data-sc="" style={css(kicker(ar, 'var(--muted)') + ';margin-block-end:clamp(22px,3vw,34px)')}>
              <span aria-hidden="true" style={css(KICKER_RULE)} />
              <span style={css("font-family:'IBM Plex Mono',monospace;font-weight:400;letter-spacing:.06em")}>
                {ordinal(1)}
              </span>
              {t.chapters[1]}
            </p>
            <h2
              id="nm-h"
              data-sc="rise"
              style={css(
                'margin:0;max-width:13ch;' +
                  display(ar, ar ? 'clamp(34px,4.6vw,70px)' : 'clamp(36px,4.8vw,74px)') +
                  ';color:var(--ink)',
              )}
            >
              {t.nameH}
            </h2>
            <p
              data-sc=""
              style={css(
                'margin:clamp(18px,2.4vw,28px) 0 0;max-width:42ch;font-weight:300;font-size:clamp(16px,1.6vw,19px);' +
                  'line-height:1.62;color:var(--body)',
              )}
            >
              {t.nameLead}
            </p>

            <ol ref={stepsRef} data-name-steps="">
              {t.anatomy.map(([part, text], i) => (
                <li key={part} data-name-step="" data-on="">
                  <span
                    style={css(
                      "display:block;font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.06em;color:var(--muted)",
                    )}
                  >
                    {ordinal(i)}
                  </span>
                  <span
                    data-name-part=""
                    style={css(
                      'display:block;margin-block:10px 10px;' +
                        display(ar, ar ? 'clamp(24px,2.4vw,34px)' : 'clamp(24px,2.4vw,36px)', 300) +
                        ';color:var(--ink)',
                    )}
                  >
                    {part}
                  </span>
                  <span style={css('display:block;max-width:40ch;font-size:16px;line-height:1.6;color:var(--body)')}>
                    {text}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div data-name-side="">
            <figure ref={figRef} data-name-fig="" aria-label={t.figureLabel} style={css('margin:0')}>
              <svg viewBox={`${VX} ${VY} ${VS} ${VS}`} aria-hidden="true" data-bp="">
                <g ref={sheetRef} data-bp-sheet="">
                  {Array.from({ length: 21 }, (_, k) => VX + 4 + k * 10).map((x) => (
                    <line key={'gx' + x} x1={x} y1={VY + 4} x2={x} y2={VY + VS - 4} data-bp-grid="" />
                  ))}
                  {Array.from({ length: 20 }, (_, k) => VY + 8 + k * 10).map((y) => (
                    <line key={'gy' + y} x1={VX + 4} y1={y} x2={VX + VS - 4} y2={y} data-bp-grid="" />
                  ))}
                  <line x1={60} y1={VY + 4} x2={60} y2={VY + VS - 4} data-bp-axis="" />
                  <line x1={VX + 4} y1={60} x2={VX + VS - 4} y2={60} data-bp-axis="" />
                  {TICKS.map(([x, y, dx, dy]) => (
                    <path key={x + ':' + y} d={`M${x + dx} ${y} H${x} V${y + dy}`} data-bp-tick="" />
                  ))}
                  {/* The stamp's width, dimensioned along the top. */}
                  <path d="M0 -34 V-24 M120 -34 V-24 M0 -29 H120" data-bp-dim="" />
                </g>

                <g data-bp-guides="">
                  {ROWS.map((y, k) => (
                    <line
                      key={'r' + y}
                      ref={(node) => {
                        if (node) guideRefs.current[k] = node
                      }}
                      x1={ar ? VX + VS - 6 : VX + 6}
                      y1={y}
                      x2={ar ? VX + 6 : VX + VS - 6}
                      y2={y}
                      pathLength={1}
                    />
                  ))}
                  {COLS.map((x, k) => (
                    <line
                      key={'c' + x}
                      ref={(node) => {
                        if (node) guideRefs.current[ROWS.length + k] = node
                      }}
                      x1={x}
                      y1={VY + 6}
                      x2={x}
                      y2={VY + VS - 6}
                      pathLength={1}
                    />
                  ))}
                </g>

                <path ref={frameRef} d={FRAME} pathLength={1} data-bp-frame="" />
                {LETTERS.map((paths, j) => (
                  <g
                    key={j}
                    ref={(node) => {
                      if (node) letterRefs.current[j] = node
                    }}
                    data-bp-letter=""
                  >
                    {paths.map((k) => (
                      <path key={k} d={MARK_PATHS[k]} pathLength={1} fillRule="evenodd" />
                    ))}
                  </g>
                ))}
              </svg>

              <span
                ref={dimRef}
                data-bp-note=""
                style={css('left:' + pctX(60) + ';top:' + pctY(-34) + ';transform:translate(-50%,-100%)')}
              >
                <span dir="ltr">{t.stamp}</span>
              </span>
              {CALLOUTS.map(({ x, y, up, left }, j) => (
                <span
                  key={j}
                  ref={(node) => {
                    if (node) calloutRefs.current[j] = node
                  }}
                  data-bp-callout=""
                  style={css(
                    (left ? 'left:' + pctX(x) : 'right:calc(100% - ' + pctX(x) + ')') +
                      ';top:' +
                      pctY(y) +
                      (up ? ';transform:translateY(-100%)' : ''),
                  )}
                >
                  <span data-bp-letter-name="" style={css("font-family:'Sora',sans-serif")}>
                    {seem[j][0]}
                  </span>
                  <span style={css('font-family:' + dispFont(ar))}>{seem[j][1]}</span>
                </span>
              ))}
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}
