'use client'

import { useRef } from 'react'
import { Plate } from '@/components/Plate'
import { ABOUT } from '@/lib/content/about'
import { css, cssWith, vars } from '@/lib/css'
import { reduceMotion, useScrollDriver } from '@/lib/hooks'
import { aboutCreed } from '@/lib/media'
import { useSite } from '@/lib/site'
import { BRONZE, display, dispFont, ordinal } from '@/lib/typography'

const clamp01 = (n: number) => Math.max(0, Math.min(1, n))

/**
 * Chapter three: the six values as the framework states them, each a sentence that begins
 * with what we do — set large enough to be read as a creed rather than scanned as a grid. The
 * section opens under green glass, the identity's own material, and each statement comes up
 * to full strength as it reaches the reading line; the ones already read stay half-lit.
 */
export function ValuesCreed() {
  const { lang, ar } = useSite()
  const t = ABOUT[lang]
  const listRef = useRef<HTMLOListElement>(null)

  useScrollDriver({
    onFrame: () => {
      const list = listRef.current
      if (!list) return
      const rows = list.querySelectorAll<HTMLElement>('[data-creed-row]')
      if (reduceMotion()) {
        rows.forEach((row) => row.style.setProperty('--lit', '1'))
        return
      }
      const vh = window.innerHeight || 800
      const box = list.getBoundingClientRect()
      if (box.bottom < -vh || box.top > vh * 1.5) return
      const line = vh * 0.6
      rows.forEach((row) => {
        const r = row.getBoundingClientRect()
        const d = (r.top + r.height / 2 - line) / (vh * 0.34)
        const lit = d > 0 ? clamp01(1 - d) : Math.max(0.46, clamp01(1 + d * 0.5))
        row.style.setProperty('--lit', lit.toFixed(3))
      })
    },
  })

  return (
    <section
      id="values"
      aria-labelledby="vl-h"
      data-tone="dark"
      style={css('position:relative;overflow:clip;background:#041815;color:#ffffff')}
    >
      <div data-creed-band="" aria-hidden="true">
        <Plate frame={aboutCreed} scrim="creed" depth={90} />
      </div>

      <div
        style={css(
          'position:relative;max-width:1400px;margin:0 auto;' +
            'padding:clamp(200px,34vh,360px) clamp(16px,3vw,32px) clamp(80px,10vw,150px)',
        )}
      >
        <h2
          id="vl-h"
          data-sc="rise"
          style={css(
            'margin:0;max-width:16ch;' +
              display(ar, ar ? 'clamp(36px,5.4vw,84px)' : 'clamp(38px,5.6vw,88px)') +
              ';color:#ffffff;text-wrap:balance',
          )}
        >
          {t.valuesH}
        </h2>

        <ol ref={listRef} data-creed="">
          {t.values.map(([name, line], i) => (
            <li key={name} data-creed-row="" style={cssWith('', vars({ '--lit': 1 }))}>
              <div data-creed-label="">
                <span data-creed-rule="" aria-hidden="true" />
                <span style={css("font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.06em;color:" + BRONZE)}>
                  {ordinal(i)}
                </span>
                <span
                  style={css(
                    (ar
                      ? "font-family:'IBM Plex Sans Arabic',sans-serif;font-size:15px;font-weight:600"
                      : "font-family:'Sora',sans-serif;font-size:11px;font-weight:500;letter-spacing:.18em;text-transform:uppercase") +
                      ';color:rgba(255,255,255,.86)',
                  )}
                >
                  {name}
                </span>
              </div>
              <p
                data-creed-line=""
                style={css(
                  'margin:0;max-width:34ch;font-family:' +
                    dispFont(ar) +
                    ';font-weight:' +
                    (ar ? '400' : '300') +
                    ';font-size:' +
                    (ar ? 'clamp(22px,2.5vw,38px)' : 'clamp(22px,2.6vw,40px)') +
                    ';line-height:' +
                    (ar ? '1.62' : '1.24') +
                    ';letter-spacing:' +
                    (ar ? '0' : '-.015em') +
                    ';color:#ffffff;text-wrap:pretty',
                )}
              >
                {line}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
