'use client'

import { useEffect, useRef, useState } from 'react'
import { ImageSlot } from '@/components/ImageSlot'
import { STRATEGY } from '@/lib/content/strategy'
import { css, cssWith, vars } from '@/lib/css'
import { reduceMotion, useScrollDriver } from '@/lib/hooks'
import { loopFrames } from '@/lib/media'
import { useSite } from '@/lib/site'
import { BRONZE, display, ordinal } from '@/lib/typography'

/** Pinned where the seal and its stage can share the screen, and motion is welcome. */
export const LOOP_QUERY = '(min-width: 1000px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)'

const clamp01 = (n: number) => Math.max(0, Math.min(1, n))
const span = (p: number, a: number, b: number) => clamp01((p - a) / (b - a))

/**
 * Each side of the seal takes a fifth of the pin: it draws over the first 0.12 of its turn and
 * holds for the rest, so every stage is read standing still. The last fifth is the return.
 */
const SIDE_START = [0.06, 0.26, 0.46, 0.66]
const SIDE_DRAW = 0.12
const RETURN_AT = 0.86

/** The drawn length of the seal's border at `p`, 0–1, one quarter per stage. */
const traced = (p: number) => SIDE_START.reduce((sum, a) => sum + span(p, a, a + SIDE_DRAW), 0) / 4
/** The stage being read at `p`: 0–3, or 4 once the loop has closed and the yield returns. */
const stageAt = (p: number) => (p >= RETURN_AT ? 4 : Math.max(0, SIDE_START.filter((a) => p >= a - 0.06).length - 1))

/** The seal's border, from its reading-start top corner round to itself again. */
const BORDER = { ltr: 'M0.5 0.5 H99.5 V99.5 H0.5 Z', rtl: 'M99.5 0.5 H0.5 V99.5 H99.5 Z' }

/**
 * Chapter three: the business model, as the company's own seal. The mark is a square frame
 * holding four letters; here the frame holds four stages instead, lettered along its sides like
 * a stamp — develop, operate, invest, monetize. On a wide screen the section pins and an ember
 * line runs the border side by side as the reader scrolls: each side it draws is a stage, its
 * picture in the window and its parts beside it. When the line comes back to the corner it
 * started from, the loop is closed, the yield returns to the ecosystem, and a spark keeps
 * running the border for as long as the seal is on screen — the model turning over.
 *
 * Narrow screens and reduced motion get the seal already drawn, and the four stages in turn.
 */
export function ValueLoop() {
  const { lang, ar } = useSite()
  const t = STRATEGY[lang]

  const [stage, setStage] = useState(0)
  const [warm, setWarm] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const sealRef = useRef<HTMLDivElement>(null)
  const traceRef = useRef<SVGPathElement>(null)

  // The four pictures are only fetched once the section is a screen away.
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setWarm(true)
        io.disconnect()
      },
      { rootMargin: '100% 0px' },
    )
    io.observe(section)
    return () => io.disconnect()
  }, [])

  useScrollDriver({
    onFrame: () => {
      const pin = pinRef.current
      const seal = sealRef.current
      const trace = traceRef.current
      if (!pin || !seal || !trace) return
      const vh = window.innerHeight || 800
      const rect = pin.getBoundingClientRect()
      if (rect.bottom < -vh || rect.top > vh * 1.5) return

      if (reduceMotion() || !window.matchMedia(LOOP_QUERY).matches) {
        trace.style.strokeDashoffset = '0'
        seal.style.setProperty('--t', '1')
        seal.removeAttribute('data-live')
        setStage((s) => (s === 0 ? s : 0))
        return
      }

      const p = clamp01(-rect.top / Math.max(1, rect.height - vh))
      const t = traced(p)
      trace.style.strokeDashoffset = (1 - t).toFixed(4)
      seal.style.setProperty('--t', t.toFixed(4))
      seal.toggleAttribute('data-live', p >= RETURN_AT && rect.bottom > vh * 0.2)
      const next = stageAt(p)
      setStage((s) => (s === next ? s : next))
    },
  })

  const pictured = stage === 4 ? 0 : stage

  return (
    <section
      ref={sectionRef}
      id="model"
      aria-labelledby="lp-h"
      data-tone="dark"
      style={css('position:relative;background:#041815;color:#ffffff')}
    >
      <div
        data-loop-head=""
        style={css('max-width:1400px;margin:0 auto;padding:clamp(96px,12vw,170px) clamp(16px,3vw,32px) clamp(28px,4vw,56px)')}
      >
        <h2
          id="lp-h"
          data-sc="rise"
          style={css(
            'margin:0;max-width:15ch;' +
              display(ar, ar ? 'clamp(34px,4.6vw,70px)' : 'clamp(36px,4.8vw,74px)') +
              ';color:#ffffff;text-wrap:balance',
          )}
        >
          {t.modelH}
        </h2>
        <p
          data-sc=""
          style={css(
            'margin:0;max-width:36ch;font-weight:300;font-size:clamp(16px,1.6vw,19px);line-height:1.62;color:rgba(255,255,255,.76)',
          )}
        >
          {t.modelLead}
        </p>
      </div>

      <div ref={pinRef} data-loop-pin="">
        <div data-loop-stick="">
          {/* What the stage holds. Laid flat, every stage is read in turn; pinned, only the one the line is on. */}
          <div data-loop-copy="">
            {t.model.map(([verb, items], i) => (
              <div key={verb} data-loop-panel="" data-on={stage === i ? '' : undefined}>
                <p
                  style={css(
                    "margin:0;display:flex;align-items:baseline;gap:12px;font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.06em;color:rgba(255,255,255,.6)",
                  )}
                >
                  <span data-lbl="">{t.stageLabel}</span>
                  <span style={css('color:' + BRONZE)}>{ordinal(i) + ' / ' + ordinal(t.model.length - 1)}</span>
                </p>
                <h3
                  style={css(
                    'margin:clamp(14px,2vh,22px) 0 clamp(22px,3.4vh,36px);' +
                      display(ar, ar ? 'clamp(44px,5.4vw,86px)' : 'clamp(46px,5.8vw,92px)') +
                      ';color:#ffffff',
                  )}
                >
                  {verb}
                </h3>
                <ul data-loop-items="">
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
            <div data-loop-panel="" data-return="" data-on={stage === 4 ? '' : undefined}>
              <p
                data-lbl=""
                style={css(
                  "margin:0;display:flex;align-items:center;gap:12px;font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.06em;color:" +
                    BRONZE,
                )}
              >
                <span aria-hidden="true" style={css('width:24px;height:2px;background:#dc4b1c')} />
                {t.returnTag}
              </p>
              <p
                style={css(
                  'margin:clamp(14px,2vh,22px) 0 0;max-width:18ch;' +
                    display(ar, ar ? 'clamp(30px,3.2vw,50px)' : 'clamp(30px,3.3vw,52px)') +
                    ';color:#ffffff;text-wrap:balance',
                )}
              >
                {t.returnLine}
              </p>
            </div>
          </div>

          <div ref={sealRef} data-seal="" aria-hidden="true">
            <div data-seal-win="">
              {loopFrames.map((frame, i) => (
                <span key={i} data-seal-img="" data-on={pictured === i ? '' : undefined}>
                  {warm || i === 0 ? (
                    <ImageSlot frame={frame} alt="" placeholder="" size="md" sizes="(min-width: 1000px) 40vw, 100vw" />
                  ) : null}
                </span>
              ))}
              <span data-seal-shade="" />
            </div>

            <svg viewBox="0 0 100 100" data-seal-lines="">
              <rect x="0.5" y="0.5" width="99" height="99" data-seal-track="" />
              <path ref={traceRef} d={ar ? BORDER.rtl : BORDER.ltr} pathLength={1} data-seal-trace="" />
              <path d={ar ? BORDER.rtl : BORDER.ltr} pathLength={1} data-seal-spark="" />
            </svg>

            {/* The four stages lettered along the band, each reading the way the line runs. */}
            {t.model.map(([verb], i) => (
              <span
                key={verb}
                data-seal-side={i}
                data-state={i === stage ? 'on' : i < stage ? 'done' : undefined}
                style={cssWith('', vars({ '--k': i }))}
              >
                <span data-seal-label="">
                  <span style={css("font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.06em;color:" + BRONZE)}>
                    {ordinal(i)}
                  </span>
                  <span data-seal-verb="">{verb}</span>
                </span>
              </span>
            ))}
            {[0, 1, 2, 3].map((k) => (
              <span key={k} data-seal-corner={k} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
