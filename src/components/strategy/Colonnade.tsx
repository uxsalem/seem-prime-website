'use client'

import { useRef } from 'react'
import { PillarFigure } from '@/components/strategy/PillarFigure'
import { STRATEGY } from '@/lib/content/strategy'
import { css, cssWith, vars } from '@/lib/css'
import { reduceMotion, useScrollDriver } from '@/lib/hooks'
import { useSite } from '@/lib/site'
import { display, ordinal } from '@/lib/typography'

/** Where the five pillars stand side by side. Narrower screens stack them. */
export const COLONNADE_QUERY = '(min-width: 1000px)'

const clamp01 = (n: number) => Math.max(0, Math.min(1, n))
const span = (p: number, a: number, b: number) => clamp01((p - a) / (b - a))

/**
 * Chapter two: how the strategy is carried, and where it stands. The five pillars are built as
 * a colonnade in the order a building goes up — the ground line first, then the eight sectors
 * laid along it as the plinth, then each pillar rising in turn, and last the beam across their
 * heads, lettered with the company's name. Inside each pillar its sentence is drawn: layers
 * until the platform stands alone, a share that grows with its sector, two sides meeting
 * halfway, reviews pulling to the centre, one line through every platform.
 *
 * The build runs on the scroll as the colonnade crosses the screen, so it plays back as well as
 * forward. On a narrow screen the pillars stack, and each draws itself as it arrives.
 */
export function Colonnade() {
  const { lang, ar } = useSite()
  const t = STRATEGY[lang]
  const colRef = useRef<HTMLDivElement>(null)

  useScrollDriver({
    onFrame: () => {
      const col = colRef.current
      if (!col) return
      const vh = window.innerHeight || 800
      const box = col.getBoundingClientRect()
      if (box.bottom < -vh || box.top > vh * 1.5) return
      const still = reduceMotion()
      const pillars = col.querySelectorAll<HTMLElement>('[data-col-pillar]')

      if (!window.matchMedia(COLONNADE_QUERY).matches) {
        // Stacked: each pillar builds on its own as it comes up the screen.
        col.style.setProperty('--ground', '1')
        col.style.setProperty('--beam', '1')
        pillars.forEach((pillar) => {
          const r = pillar.getBoundingClientRect()
          const f = still ? 1 : clamp01((vh * 0.92 - r.top) / (vh * 0.5))
          pillar.style.setProperty('--rise', f > 0 ? '1' : '0')
          pillar.querySelector<HTMLElement>('[data-fig]')?.style.setProperty('--f', f.toFixed(4))
        })
        col.querySelectorAll<HTMLElement>('[data-col-sector]').forEach((s) => s.style.setProperty('--in', '1'))
        return
      }

      // One build across the whole colonnade: from its head at 88% of the screen to 16%.
      const p = still ? 1 : clamp01((vh * 0.88 - box.top) / (vh * 0.72))
      col.style.setProperty('--ground', span(p, 0, 0.12).toFixed(4))
      col.querySelectorAll<HTMLElement>('[data-col-sector]').forEach((s, k) => {
        s.style.setProperty('--in', span(p, 0.04 + 0.025 * k, 0.14 + 0.025 * k).toFixed(3))
      })
      pillars.forEach((pillar, k) => {
        pillar.style.setProperty('--rise', span(p, 0.1 + 0.09 * k, 0.28 + 0.09 * k).toFixed(4))
        pillar.querySelector<HTMLElement>('[data-fig]')?.style.setProperty('--f', span(p, 0.14 + 0.09 * k, 0.56 + 0.09 * k).toFixed(4))
      })
      col.style.setProperty('--beam', span(p, 0.8, 0.95).toFixed(4))
    },
  })

  return (
    <section id="pillars" aria-labelledby="cl-h" style={css('position:relative;background:var(--page)')}>
      <div
        style={css(
          'max-width:1400px;margin:0 auto;padding:clamp(96px,12vw,170px) clamp(16px,3vw,32px) clamp(88px,11vw,150px)',
        )}
      >
        <div data-col-head="">
          <h2
            id="cl-h"
            data-sc="rise"
            style={css(
              'margin:0;max-width:16ch;' +
                display(ar, ar ? 'clamp(34px,4.6vw,70px)' : 'clamp(36px,4.8vw,74px)') +
                ';color:var(--ink);text-wrap:balance',
            )}
          >
            {t.pillarsH}
          </h2>
          <p
            data-sc=""
            style={css(
              'margin:0;max-width:36ch;font-weight:300;font-size:clamp(16px,1.6vw,19px);line-height:1.62;color:var(--body)',
            )}
          >
            {t.pillarsLead}
          </p>
        </div>

        <div ref={colRef} data-col="">
          {/* The beam, lettered the way the framework sets the name: spaced capitals. */}
          <div data-col-beam="" aria-hidden="true">
            <span data-col-beam-line="" />
            <span data-col-beam-name="">SEEM PRIME</span>
            <span data-col-beam-line="" />
          </div>

          <ol data-col-pillars="" aria-label={t.pillarsLabel}>
            {t.pillars.map(([name, note], k) => (
              <li key={name} data-col-pillar="" style={cssWith('', vars({ '--k': k }))}>
                <span data-col-edge="" aria-hidden="true" />
                <div data-col-body="">
                  <span
                    data-col-num=""
                    style={css("font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.06em;color:var(--muted)")}
                  >
                    {ordinal(k)}
                  </span>
                  <span data-fig="" aria-hidden="true">
                    <PillarFigure k={k} />
                  </span>
                  <h3
                    data-col-name=""
                    style={css('margin:0;' + display(ar, ar ? 'clamp(18px,1.5vw,22px)' : 'clamp(18px,1.55vw,23px)', 400) + ';color:var(--ink)')}
                  >
                    {name}
                  </h3>
                  <p data-col-note="" style={css('margin:0;font-size:15px;line-height:1.6;color:var(--body)')}>
                    {note}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <span data-col-ground="" aria-hidden="true" />

          {/* The plinth: the eight sectors the pillars stand on. */}
          <div data-col-plinth="">
            <span data-col-plinth-label="">{t.sectorsLabel}</span>
            <ol data-col-sectors="">
              {t.sectors.map((sector, k) => (
                <li key={sector} data-col-sector="">
                  <span style={css("font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.06em;color:var(--muted)")}>
                    {ordinal(k)}
                  </span>
                  {/* A word joiner after a hyphen keeps «E-commerce» one word, as wide as the rest of its column. */}
                  <span>{sector.replace(/-/g, '-\u2060')}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
