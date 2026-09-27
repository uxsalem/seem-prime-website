'use client'

import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { ImageSlot } from '@/components/ImageSlot'
import { ABOUT } from '@/lib/content/about'
import { css } from '@/lib/css'
import { useScrollDriver } from '@/lib/hooks'
import { aboutStrands, aboutWhole, srcSet } from '@/lib/media'
import { useSite } from '@/lib/site'
import { BRONZE, display, ordinal } from '@/lib/typography'

/** Pinned where four windows fit around a sentence with room to travel, and motion is welcome. */
export const CONVERGE_QUERY = '(min-width: 1000px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)'

const clamp01 = (n: number) => Math.max(0, Math.min(1, n))
/** Where `p` sits between `a` and `b`, as 0–1. */
const span = (p: number, a: number, b: number) => clamp01((p - a) / (b - a))
/** Gather, travel, settle: `--ease-arch` for values the scroll drives rather than the clock. */
const arch = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const mix = (a: number, b: number, t: number) => a + (b - a) * t
const px = (n: number) => n.toFixed(1) + 'px'
/** The square sits this far below the middle of the stage, clear of the bar. */
const DROP = 22

/** The stage, measured once per resize: the square's centre and half-side, and each window's place in it. */
type Geometry = {
  w: number
  h: number
  cx: number
  cy: number
  q: number
  /** Converged top-left, the corner it starts out at, and its physical column and row. */
  at: { x: number; y: number; sx: number; sy: number; col: number; row: number }[]
}

/**
 * Chapter one: what the company does, as the one sentence the framework puts it in — and as a
 * picture of it. Capital, technology, operations and partnership open as four windows set apart
 * at the corners of the screen, around the sentence that names them. Scrolling brings them in:
 * each travels to its quarter of a square, the four close into one frame — the SEEM square —
 * and each photograph gives way to its piece of a single city. Then the square opens to the
 * edges, and what was four is one ecosystem.
 *
 * Everything moves on transforms and clip-paths the scroll pass writes directly. Narrow
 * screens and reduced motion get the same story laid flat: the sentence, the four windows as a
 * square, and the city they make.
 */
export function Convergence() {
  const { lang, ar } = useSite()
  const t = ABOUT[lang]

  const pinRef = useRef<HTMLDivElement>(null)
  const stickRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const endRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLSpanElement>(null)
  const shadeRef = useRef<HTMLSpanElement>(null)
  const quadRefs = useRef<HTMLDivElement[]>([])
  const geo = useRef<Geometry | null>(null)
  // The city is only seen halfway through the journey, so its full cut is not fetched with the
  // first screen: the pieces mount once the stage has arrived, a long scroll before they show.
  const [warm, setWarm] = useState(false)
  const warmRef = useRef(false)

  // The scroll pass. It reads nothing but refs, so it is safe to call from the layout pass too:
  // a change of language re-measures the stage and has to repaint it before anyone scrolls.
  const paint = useCallback(() => {
    const g = geo.current
    const pin = pinRef.current
    const stick = stickRef.current
    if (!g || !pin || !stick) return
    const vh = window.innerHeight || 800
    const rect = pin.getBoundingClientRect()
    if (rect.bottom < -vh || rect.top > vh * 1.5) return
    const p = clamp01(-rect.top / Math.max(1, rect.height - vh))
    if (!warmRef.current && rect.top < vh * 0.3) {
      warmRef.current = true
      setWarm(true)
    }

    const { w, h, cx, cy, q } = g
    // The square opens to the edges; until then its union is the square itself.
    const e = arch(span(p, 0.68, 0.9))
    const seam = 2 * (1 - span(p, 0.63, 0.69))
    const L = mix(cx - q, 0, e)
    const R = mix(cx + q, w, e)
    const T = mix(cy - q, 0, e)
    const B = mix(cy + q, h, e)
    const zoom = (1.1 - 0.1 * span(p, 0.3, 0.94)).toFixed(4)
    const labels = 1 - span(p, 0.5, 0.58)

    quadRefs.current.forEach((quad, i) => {
      const a = g.at[i]
      // Two beats: each window first gathers to its row along the screen's edge, clear of the
      // sentence; once the sentence has gone, the four close in across the middle.
      const rise = arch(span(p, 0.08 + i * 0.04, 0.3 + i * 0.04))
      const join = arch(span(p, 0.34 + i * 0.025, 0.56 + i * 0.025))
      quad.style.transform =
        'translate3d(' + px((a.sx - a.x) * (1 - join)) + ',' + px((a.sy - a.y) * (1 - rise)) + ',0)'

      const left = a.col ? cx + seam / 2 : L
      const right = a.col ? R : cx - seam / 2
      const top = a.row ? cy + seam / 2 : T
      const bottom = a.row ? B : cy - seam / 2
      const win = quad.querySelector<HTMLElement>('[data-conv-win]')
      if (win) win.style.clipPath = 'inset(' + px(top) + ' ' + px(w - right) + ' ' + px(h - bottom) + ' ' + px(left) + ')'

      const subject = quad.querySelector<HTMLElement>('[data-conv-subject]')
      if (subject) subject.style.opacity = (1 - span(p, 0.5 + i * 0.025, 0.6 + i * 0.025)).toFixed(3)
      const label = quad.querySelector<HTMLElement>('[data-conv-label]')
      if (label) label.style.opacity = labels.toFixed(3)
      const img = quad.querySelector<HTMLElement>('[data-conv-piece] img')
      if (img) img.style.transform = 'scale(' + zoom + ')'

      // Each strand lights in the sentence as its window sets off.
      stick.querySelector(`[data-noun="${i}"]`)?.toggleAttribute('data-on', rise > 0.002)
    })

    const copy = copyRef.current
    if (copy) {
      const out = span(p, 0.27, 0.36)
      copy.style.opacity = (1 - out).toFixed(3)
      copy.style.transform = 'translate3d(0,' + px(-28 * out) + ',0)'
    }
    const frame = frameRef.current
    if (frame) frame.style.opacity = (span(p, 0.56, 0.62) * (1 - span(p, 0.66, 0.71))).toFixed(3)
    const shade = shadeRef.current
    if (shade) shade.style.opacity = span(p, 0.72, 0.87).toFixed(3)
    const end = endRef.current
    if (end) {
      const arrive = span(p, 0.78, 0.92)
      end.style.opacity = arrive.toFixed(3)
      end.style.transform = 'translate3d(0,' + px(28 * (1 - arrive)) + ',0)'
    }
  }, [])

  // Lay the stage out for the pinned journey, or hand everything back to the flat layout.
  useEffect(() => {
    const stick = stickRef.current
    if (!stick) return

    const clear = (el: HTMLElement | null | undefined, ...props: string[]) =>
      props.forEach((prop) => el?.style.removeProperty(prop))

    const measure = () => {
      const quads = quadRefs.current
      if (!window.matchMedia(CONVERGE_QUERY).matches) {
        geo.current = null
        quads.forEach((quad) => {
          clear(quad, 'transform')
          clear(quad.querySelector<HTMLElement>('[data-conv-win]'), 'clip-path')
          clear(quad.querySelector<HTMLElement>('[data-conv-subject]'), 'left', 'top', 'width', 'height', 'opacity')
          clear(quad.querySelector<HTMLElement>('[data-conv-label]'), 'left', 'right', 'top', 'bottom', 'max-width', 'opacity')
          clear(quad.querySelector<HTMLElement>('[data-conv-piece] img'), 'transform')
        })
        clear(copyRef.current, 'opacity', 'transform', '--col')
        clear(endRef.current, 'opacity', 'transform')
        clear(frameRef.current, 'left', 'top', 'width', 'height', 'opacity')
        clear(shadeRef.current, 'opacity')
        quads.forEach((_, i) => stick.querySelector(`[data-noun="${i}"]`)?.setAttribute('data-on', ''))
        return
      }

      const w = stick.clientWidth
      const h = stick.clientHeight
      // The square: as large as the screen allows while the four windows still clear the
      // sentence when they sit apart at the corners.
      const s = Math.round(Math.min(h * 0.58, h - 300, w * 0.38, 580))
      const q = s / 2
      const cx = w / 2
      const cy = h / 2 + DROP
      const edge = Math.max(32, (w - 1400) / 2 + 32)
      const top = 150
      const bottom = 112

      const at = quads.map((_, i) => {
        // Reading order runs from the reading-start corner: top-right first in Arabic.
        const col = ar ? 1 - (i % 2) : i % 2
        const row = Math.floor(i / 2)
        return {
          x: cx - q + col * q,
          y: cy - q + row * q,
          sx: col ? w - edge - q : edge,
          sy: row ? h - bottom - q : top,
          col,
          row,
        }
      })
      geo.current = { w, h, cx, cy, q, at }

      quads.forEach((quad, i) => {
        const a = at[i]
        const subject = quad.querySelector<HTMLElement>('[data-conv-subject]')
        if (subject) {
          subject.style.left = px(a.x)
          subject.style.top = px(a.y)
          subject.style.width = px(q)
          subject.style.height = px(q)
        }
        const label = quad.querySelector<HTMLElement>('[data-conv-label]')
        if (label) {
          // The caption rides on its window's reading-start edge, on the outside of the square —
          // above the top row, below the bottom one — so no caption crosses a window in transit.
          if (a.row) {
            label.style.top = px(a.y + q + 16)
            label.style.bottom = 'auto'
          } else {
            label.style.bottom = px(h - a.y + 16)
            label.style.top = 'auto'
          }
          label.style.maxWidth = px(Math.max(q, 240))
          if (ar) {
            label.style.right = px(w - a.x - q)
            label.style.left = 'auto'
          } else {
            label.style.left = px(a.x)
            label.style.right = 'auto'
          }
        }
      })

      // The sentence gets the column the windows leave between them.
      copyRef.current?.style.setProperty('--col', px(Math.max(420, w - 2 * (edge + q) - 96)))

      // The frame quotes the mark's own: it sits just outside the letters it holds.
      const frame = frameRef.current
      if (frame) {
        const o = Math.round(s * 0.09)
        frame.style.left = px(cx - q - o)
        frame.style.top = px(cy - q - o)
        frame.style.width = px(s + 2 * o)
        frame.style.height = px(s + 2 * o)
      }
      paint()
    }

    measure()
    window.addEventListener('resize', measure)
    const mql = window.matchMedia(CONVERGE_QUERY)
    mql.addEventListener('change', measure)
    return () => {
      window.removeEventListener('resize', measure)
      mql.removeEventListener('change', measure)
    }
  }, [ar, paint])

  useScrollDriver({ onFrame: paint })

  const { photo: whole } = aboutWhole
  const wholeAt = aboutWhole.focus ?? whole.focus

  return (
    <section
      id="what"
      aria-labelledby="cv-h"
      data-conv=""
      data-tone="dark"
      style={css('position:relative;background:#041815;color:#ffffff')}
    >
      <div ref={pinRef} data-conv-pin="">
        <div ref={stickRef} data-conv-stick="">
          <div ref={copyRef} data-conv-copy="">
            <h2
              id="cv-h"
              data-sc="rise"
              style={css(
                'margin:0;' +
                  display(ar, ar ? 'clamp(26px,2.9vw,44px)' : 'clamp(26px,2.8vw,42px)') +
                  ';line-height:' +
                  (ar ? '1.6' : '1.24') +
                  ';color:rgba(255,255,255,.58);text-wrap:balance',
              )}
            >
              {t.sentence.map(([text, strand], i) =>
                strand < 0 ? (
                  <Fragment key={i}>{text}</Fragment>
                ) : (
                  <span key={i} data-noun={strand}>
                    {text}
                    <sup data-noun-i="" aria-hidden="true">
                      {ordinal(strand)}
                    </sup>
                  </span>
                ),
              )}
            </h2>
          </div>

          <div data-conv-quads="">
            {aboutStrands.map((frame, i) => {
              const [name, brings] = t.strands[i]
              return (
                <div
                  key={i}
                  ref={(node) => {
                    if (node) quadRefs.current[i] = node
                  }}
                  data-conv-q=""
                >
                  <div data-conv-win="">
                    <span data-conv-piece="" aria-hidden="true">
                      <span
                        style={css(
                          'position:absolute;inset:0;background-image:url("' +
                            whole.lqip +
                            '");background-size:cover;background-position:' +
                            wholeAt +
                            ';filter:blur(24px)',
                        )}
                      />
                      {warm ? (
                        // eslint-disable-next-line @next/next/no-img-element -- a stage-sized piece of one picture, sized by the viewport
                        <img
                          src={whole.src}
                          srcSet={srcSet(whole)}
                          sizes="100vw"
                          alt=""
                          decoding="async"
                          style={css(
                            'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:' +
                              wholeAt +
                              // One scale about the square's centre for all four, so they meet as a single picture.
                              ';transform-origin:50% calc(50% + ' +
                              DROP +
                              'px)',
                          )}
                        />
                      ) : null}
                    </span>
                    <span data-conv-subject="">
                      <ImageSlot frame={frame} alt="" placeholder={name} />
                    </span>
                  </div>
                  <p data-conv-label="">
                    <span style={css('display:flex;align-items:baseline;gap:10px')}>
                      <span style={css("font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.06em;color:" + BRONZE)}>
                        {ordinal(i)}
                      </span>
                      <span style={css(display(ar, ar ? '20px' : '19px', 400) + ';color:#ffffff')}>{name}</span>
                    </span>
                    <span style={css('display:block;margin-block-start:6px;font-size:13px;line-height:1.45;color:rgba(255,255,255,.64)')}>
                      {brings}
                    </span>
                  </p>
                </div>
              )
            })}
          </div>

          <span ref={frameRef} data-conv-frame="" aria-hidden="true" />
          <span ref={shadeRef} data-conv-shade="" aria-hidden="true">
            <span className="sp-grain" />
          </span>

          <div data-conv-whole="" aria-hidden="true">
            <ImageSlot frame={aboutWhole} alt="" placeholder="" size="md" sizes="(min-width: 700px) 92vw, 100vw" />
          </div>

          <div ref={endRef} data-conv-end="">
            <p
              style={css(
                'margin:0;' + display(ar, ar ? 'clamp(44px,7vw,112px)' : 'clamp(46px,7.4vw,120px)') + ';color:#ffffff',
              )}
            >
              {t.wholeH}
            </p>
            <p
              style={css(
                'margin:clamp(16px,2.2vw,26px) 0 0;max-width:44ch;font-weight:300;font-size:clamp(16px,1.6vw,19px);' +
                  'line-height:1.62;color:rgba(255,255,255,.84)',
              )}
            >
              {t.wholeBody}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
