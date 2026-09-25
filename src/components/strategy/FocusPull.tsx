'use client'

import { useCallback, useEffect, useRef } from 'react'
import { ImageSlot } from '@/components/ImageSlot'
import { STRATEGY } from '@/lib/content/strategy'
import { css, cssWith, vars } from '@/lib/css'
import { useScrollDriver } from '@/lib/hooks'
import { strategyFocus } from '@/lib/media'
import { useSite } from '@/lib/site'
import { BRONZE, dispFont, kicker, KICKER_RULE, ordinal } from '@/lib/typography'

/** Pinned where the frame can hold the screen, and motion is welcome. */
export const FOCUS_QUERY = '(min-width: 1000px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)'

const clamp01 = (n: number) => Math.max(0, Math.min(1, n))
/** Where `p` sits between `a` and `b`, as 0–1. */
const span = (p: number, a: number, b: number) => clamp01((p - a) / (b - a))
/** Gather, travel, settle: `--ease-arch` for values the scroll drives rather than the clock. */
const arch = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

/** A lens's focus scale, in metres: the horizon at one end, the desk at the other. */
const SCALE = ['∞', '10', '5', '3', '2', '1.5', '1', '0.7']

/**
 * Chapter one: where the company is going, and what it does to get there — the vision and the
 * mission, told as one shot with the focus pulled between them. The frame is a desk before the
 * Riyadh skyline. The vision holds the horizon sharp while the laptop and its holograms go soft;
 * scrolling racks the focus forward until the work in hand is sharp and the city blurs, and the
 * mission takes its place. Each statement sits on the plane that is out of focus, so the type
 * never fights the subject, and a lens's focus scale tracks the pull from ∞ to arm's length.
 *
 * The two focus states are photographs of their own (`techFar`, `techNear`), so the pull is an
 * opacity crossfade and a slight breathing of the frame rather than a live blur. Narrow screens
 * and reduced motion get the two stills in turn, each above the statement it belongs to.
 */
export function FocusPull() {
  const { lang, ar } = useSite()
  const t = STRATEGY[lang]

  const pinRef = useRef<HTMLDivElement>(null)
  const farRef = useRef<HTMLSpanElement>(null)
  const nearRef = useRef<HTMLSpanElement>(null)
  const farCopyRef = useRef<HTMLDivElement>(null)
  const nearCopyRef = useRef<HTMLDivElement>(null)
  const shadeRef = useRef<HTMLSpanElement>(null)
  const farShadeRef = useRef<HTMLSpanElement>(null)
  const scaleRef = useRef<HTMLDivElement>(null)
  const pinned = useRef(false)

  const paint = useCallback(() => {
    const pin = pinRef.current
    if (!pin || !pinned.current) return
    const vh = window.innerHeight || 800
    const rect = pin.getBoundingClientRect()
    if (rect.bottom < -vh || rect.top > vh * 1.5) return
    const p = clamp01(-rect.top / Math.max(1, rect.height - vh))

    // The pull itself, and the lens breathing with it: focusing closer draws the frame in.
    const pull = arch(span(p, 0.36, 0.64))
    const breathe = 'scale(' + (1 + 0.045 * pull).toFixed(4) + ')'
    if (farRef.current) farRef.current.style.transform = breathe
    if (nearRef.current) {
      nearRef.current.style.transform = breathe
      nearRef.current.style.opacity = pull.toFixed(3)
    }
    if (shadeRef.current) shadeRef.current.style.opacity = pull.toFixed(3)
    if (farShadeRef.current) farShadeRef.current.style.opacity = (1 - 0.55 * pull).toFixed(3)
    scaleRef.current?.style.setProperty('--at', pull.toFixed(4))

    // The vision leaves before the frame is at its softest; the mission arrives once it has passed.
    const out = span(p, 0.33, 0.45)
    const far = farCopyRef.current
    if (far) {
      far.style.opacity = (1 - out).toFixed(3)
      far.style.transform = 'translate3d(0,' + (-28 * out).toFixed(1) + 'px,0)'
    }
    const arrive = span(p, 0.55, 0.67)
    const near = nearCopyRef.current
    if (near) {
      near.style.opacity = arrive.toFixed(3)
      near.style.transform = 'translate3d(0,' + (28 * (1 - arrive)).toFixed(1) + 'px,0)'
    }
  }, [])

  // Pin or lay flat. Leaving the pinned layout hands every written style back to the stylesheet.
  useEffect(() => {
    const measure = () => {
      pinned.current = window.matchMedia(FOCUS_QUERY).matches
      if (!pinned.current) {
        ;[farRef, nearRef, farCopyRef, nearCopyRef, shadeRef, farShadeRef].forEach((ref) => {
          ref.current?.style.removeProperty('transform')
          ref.current?.style.removeProperty('opacity')
        })
        scaleRef.current?.style.removeProperty('--at')
        return
      }
      paint()
    }
    measure()
    const mql = window.matchMedia(FOCUS_QUERY)
    mql.addEventListener('change', measure)
    return () => mql.removeEventListener('change', measure)
  }, [paint])

  useScrollDriver({ onFrame: paint })

  const statement =
    'margin:0;font-family:' +
    dispFont(ar) +
    ';font-weight:' +
    (ar ? '400' : '300') +
    ';font-size:' +
    (ar ? 'clamp(22px,2.5vw,38px)' : 'clamp(22px,2.35vw,36px)') +
    ';line-height:' +
    (ar ? '1.62' : '1.24') +
    ';letter-spacing:' +
    (ar ? '0' : '-.015em') +
    ';color:#ffffff;text-wrap:pretty'

  const label = (mark: string, name: string) => (
    <p data-fp-label="" style={css('display:flex;align-items:baseline;gap:12px;margin:0 0 clamp(14px,1.8vw,22px)')}>
      <span style={css("font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.06em;color:" + BRONZE)}>{mark}</span>
      <span
        data-lbl=""
        style={css(
          (ar
            ? "font-family:'IBM Plex Sans Arabic',sans-serif;font-size:15px;font-weight:600"
            : "font-family:'Sora',sans-serif;font-size:11px;font-weight:500;letter-spacing:.2em;text-transform:uppercase") +
            ';color:rgba(255,255,255,.86)',
        )}
      >
        {name}
      </span>
    </p>
  )

  const arm = SCALE[SCALE.length - 1] + ' ' + t.metre

  return (
    <section
      id="vision"
      aria-labelledby="fp-h"
      data-fp=""
      data-tone="dark"
      style={css('position:relative;background:#041815;color:#ffffff')}
    >
      <div ref={pinRef} data-fp-pin="">
        <div data-fp-stick="">
          <span ref={farRef} data-fp-layer="far" aria-hidden="true">
            <ImageSlot frame={strategyFocus.far} alt="" placeholder="" size="md" sizes="100vw" />
          </span>
          <span data-fp-cap="" aria-hidden="true">
            <span dir="ltr" style={css('color:' + BRONZE)}>∞</span>
            {t.focusFar}
          </span>

          <div ref={farCopyRef} data-fp-copy="far">
            <h2 id="fp-h" data-sc="" data-fp-kicker="" style={css(kicker(ar, 'rgba(255,255,255,.72)'))}>
              <span aria-hidden="true" style={css(KICKER_RULE)} />
              <span style={css("font-family:'IBM Plex Mono',monospace;font-weight:400;letter-spacing:.06em;color:" + BRONZE)}>
                {ordinal(0)}
              </span>
              {t.focusH}
            </h2>
            {label('∞', t.visionLabel)}
            <p data-fp-text="" style={css(statement)}>
              {t.vision}
            </p>
          </div>

          <span ref={nearRef} data-fp-layer="near" aria-hidden="true">
            <ImageSlot frame={strategyFocus.near} alt="" placeholder="" size="md" sizes="100vw" />
          </span>
          <span data-fp-cap="" aria-hidden="true">
            <span style={css('color:' + BRONZE)}>{arm}</span>
            {t.focusNear}
          </span>

          <div ref={nearCopyRef} data-fp-copy="near">
            {label(arm, t.missionLabel)}
            <p data-fp-text="" style={css(statement)}>
              {t.mission}
            </p>
          </div>

          <span ref={farShadeRef} data-fp-shade="far" aria-hidden="true" />
          <span ref={shadeRef} data-fp-shade="near" aria-hidden="true" />
          <span data-fp-grain="" className="sp-grain" aria-hidden="true" />

          {/* The focus scale: ∞ at the reading start, arm's length at the end, the index riding the pull. */}
          <div ref={scaleRef} data-fp-scale="" aria-hidden="true">
            <span data-fp-ruler="">
              {SCALE.map((n, i) => (
                <span key={n} data-fp-tick="" style={cssWith('', vars({ '--k': i / (SCALE.length - 1) }))}>
                  <span dir="ltr">{n}</span>
                </span>
              ))}
              <span data-fp-index="" />
            </span>
            <span data-fp-ends="">
              <span data-fp-end="far">{t.focusFar}</span>
              <span data-fp-end="near">{t.focusNear}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
