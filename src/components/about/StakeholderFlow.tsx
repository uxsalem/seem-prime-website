'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { Mark } from '@/components/Mark'
import { ABOUT } from '@/lib/content/about'
import { css } from '@/lib/css'
import { reduceMotion, useScrollDriver } from '@/lib/hooks'
import { useSite } from '@/lib/site'
import { display, kicker, KICKER_RULE, ordinal } from '@/lib/typography'

/** Where the five lines fan out across the page. Narrower screens run one line down the reading edge. */
export const FLOW_QUERY = '(min-width: 1000px)'

const clamp01 = (n: number) => Math.max(0, Math.min(1, n))
const span = (p: number, a: number, b: number) => clamp01((p - a) / (b - a))

type Lines = { w: number; h: number; ys: number[] }

/**
 * Chapter four: who the ecosystem is for. Five lines leave the mark and fan out to the five
 * groups it serves, each landing on the return that group takes from it — drawn in turn as the
 * section arrives, then carrying a slow ember pulse outward for as long as it is on screen, so
 * the diagram reads as value leaving one source rather than a chart. On a narrow screen the
 * same line runs down the reading edge and lights each group as it passes.
 */
export function StakeholderFlow() {
  const { lang, ar } = useSite()
  const t = ABOUT[lang]
  const uid = useId().replace(/:/g, '')

  const flowRef = useRef<HTMLDivElement>(null)
  const linesRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLOListElement>(null)
  const pathRefs = useRef<SVGPathElement[]>([])
  const [lines, setLines] = useState<Lines | null>(null)
  const [flowing, setFlowing] = useState(false)
  const flowingRef = useRef(false)

  // The lines are drawn to the rows as laid out, so they are measured rather than assumed.
  useEffect(() => {
    const box = linesRef.current
    const list = listRef.current
    if (!box || !list) return
    const measure = () => {
      if (!window.matchMedia(FLOW_QUERY).matches) {
        setLines(null)
        return
      }
      const b = box.getBoundingClientRect()
      const ys = [...list.querySelectorAll<HTMLElement>('[data-flow-row]')].map((row) => {
        const r = row.getBoundingClientRect()
        return Math.round(r.top + r.height / 2 - b.top)
      })
      setLines({ w: Math.round(b.width), h: Math.round(b.height), ys })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(box)
    ro.observe(list)
    return () => ro.disconnect()
  }, [lang])

  useScrollDriver({
    onFrame: () => {
      const flow = flowRef.current
      const list = listRef.current
      if (!flow || !list) return
      const vh = window.innerHeight || 800
      const r = flow.getBoundingClientRect()
      if (r.bottom < -vh || r.top > vh * 1.5) return
      const p = reduceMotion() ? 1 : clamp01((vh * 0.86 - r.top) / (vh * 0.36 + r.height * 0.55))
      flow.style.setProperty('--p', p.toFixed(4))

      const rows = list.querySelectorAll<HTMLElement>('[data-flow-row]')
      const count = rows.length
      rows.forEach((row, i) => {
        const d = span(p, (i / count) * 0.62, (i / count) * 0.62 + 0.38)
        const path = pathRefs.current[i]
        if (path) path.style.strokeDashoffset = (1 - d).toFixed(4)
        row.toggleAttribute('data-lit', d > 0.97)
      })

      if (p >= 1 && !flowingRef.current && !reduceMotion()) {
        flowingRef.current = true
        setFlowing(true)
      }
    },
  })

  const curve = (y: number) => {
    if (!lines) return ''
    const { w, h } = lines
    // The source sits on the reading-start side: the right in Arabic.
    const x0 = ar ? w : 0
    const x1 = ar ? 0 : w
    const mid = x0 + (x1 - x0) * 0.5
    return `M${x0} ${h / 2} C${mid} ${h / 2} ${mid} ${y} ${x1} ${y}`
  }

  return (
    <section id="serve" aria-labelledby="sv-h" style={css('position:relative;background:var(--page)')}>
      <div
        style={css(
          'max-width:1400px;margin:0 auto;padding:clamp(96px,12vw,170px) clamp(16px,3vw,32px) clamp(88px,11vw,160px)',
        )}
      >
        <div data-flow-head="">
          <div>
            <p data-sc="" style={css(kicker(ar, 'var(--muted)') + ';margin-block-end:clamp(22px,3vw,34px)')}>
              <span aria-hidden="true" style={css(KICKER_RULE)} />
              <span style={css("font-family:'IBM Plex Mono',monospace;font-weight:400;letter-spacing:.06em")}>
                {ordinal(3)}
              </span>
              {t.chapters[3]}
            </p>
            <h2
              id="sv-h"
              data-sc="rise"
              style={css(
                'margin:0;max-width:15ch;' +
                  display(ar, ar ? 'clamp(34px,4.6vw,70px)' : 'clamp(36px,4.8vw,74px)') +
                  ';color:var(--ink);text-wrap:balance',
              )}
            >
              {t.stakeH}
            </h2>
          </div>
          <p
            data-sc=""
            style={css(
              'margin:0;max-width:34ch;font-weight:300;font-size:clamp(16px,1.6vw,19px);line-height:1.62;color:var(--body)',
            )}
          >
            {t.stakeLead}
          </p>
        </div>

        <div ref={flowRef} data-flow="">
          <div data-flow-src="">
            <span data-flow-mark="" aria-hidden="true">
              <Mark size={72} />
            </span>
            <span
              aria-hidden="true"
              style={css(
                "font-family:'Sora',sans-serif;font-size:10px;font-weight:600;letter-spacing:.3em;white-space:nowrap;color:var(--muted)",
              )}
            >
              SEEM PRIME
            </span>
          </div>

          <div ref={linesRef} data-flow-lines="" aria-hidden="true">
            {lines ? (
              <svg viewBox={`0 0 ${lines.w} ${lines.h}`} width={lines.w} height={lines.h}>
                {lines.ys.map((y, i) => (
                  <path
                    key={i}
                    id={`${uid}-line-${i}`}
                    ref={(node) => {
                      if (node) pathRefs.current[i] = node
                    }}
                    d={curve(y)}
                    pathLength={1}
                    data-flow-path=""
                  />
                ))}
                {flowing
                  ? lines.ys.map((_, i) => (
                      <circle key={'pulse' + i} r="3" data-flow-pulse="">
                        <animateMotion dur="3.4s" begin={i * 0.62 + 's'} repeatCount="indefinite">
                          <mpath href={`#${uid}-line-${i}`} />
                        </animateMotion>
                      </circle>
                    ))
                  : null}
              </svg>
            ) : null}
          </div>

          <div data-flow-listbox="">
            <span data-flow-spine="" aria-hidden="true">
              <span data-flow-spine-fill="" />
            </span>
            <ol ref={listRef} data-flow-list="">
              {t.stakeholders.map(([who, gain], i) => (
                <li key={who} data-flow-row="">
                  <span data-flow-dot="" aria-hidden="true" />
                  <span
                    data-flow-num=""
                    style={css("font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.06em;color:var(--muted)")}
                  >
                    {ordinal(i)}
                  </span>
                  <span data-flow-who="" style={css(display(ar, ar ? 'clamp(24px,2.5vw,38px)' : 'clamp(24px,2.6vw,40px)', 300))}>
                    {who}
                  </span>
                  <span data-flow-gain="" style={css('font-size:15px;line-height:1.5')}>
                    {gain}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
