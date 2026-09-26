'use client'

import { useEffect, useRef, useState } from 'react'
import { ImageSlot } from '@/components/ImageSlot'
import { STRATEGY } from '@/lib/content/strategy'
import { css, cssWith, vars } from '@/lib/css'
import { reduceMotion, useScrollDriver } from '@/lib/hooks'
import { roadFrames } from '@/lib/media'
import { useSite } from '@/lib/site'
import { BRONZE, display, kicker, KICKER_RULE, ordinal } from '@/lib/typography'

/** Pinned where the counter can hold the screen, and motion is welcome. */
export const ROAD_QUERY = '(min-width: 1000px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)'

const clamp01 = (n: number) => Math.max(0, Math.min(1, n))

/**
 * Where the counter turns over to the next year, as a share of the pin. 2025 holds a little
 * longer at the start and 2030 for the last third, so the page lands on it and stays.
 */
const TURNS = [0.14, 0.28, 0.4, 0.52, 0.68]

/** The phase a year belongs to: the foundation, three years at home, the region, 2030. */
const phaseOf = (year: number) => (year <= 2025 ? 0 : year <= 2028 ? 1 : year === 2029 ? 2 : 3)

/** How many years each phase spans, for the ruler. */
const SPANS = [1, 3, 1, 1]
/** The units wheel runs 5 → 0; the tens wheel only turns as the units roll over into 2030. */
const UNITS = ['5', '6', '7', '8', '9', '0']
const TENS = ['2', '3']

/**
 * Chapter five: the road to 2030, counted. The year stands on the screen as a mechanical
 * counter, and scrolling clicks its wheels over — 2025, 2026, 2027, 2028, 2029 — each year
 * holding long enough to be read, with the phase it belongs to named beneath it and its picture
 * behind it:
 * Jeddah's coast for the foundation, a plant in the Kingdom for the expansion at home, an
 * evening destination for the region. At the last turn the tens wheel goes over with the units,
 * the way an odometer turns a decade, and the counter lands on 2030 in the light the home page
 * gives the sun, over Riyadh at first light. A ruler along the foot keeps the four phases in
 * proportion to the years they take.
 *
 * Narrow screens and reduced motion get the four phases as a sequence of pictures instead,
 * each with its years set large over it.
 */
export function RoadTo2030() {
  const { lang, ar } = useSite()
  const t = STRATEGY[lang]

  const [year, setYear] = useState(2025)
  const [warm, setWarm] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)

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

  // The counter clicks over at each turn and rolls there on its own, so it is never left
  // between two figures; scrolling back rolls it back.
  useScrollDriver({
    onFrame: () => {
      const pin = pinRef.current
      if (!pin) return
      const vh = window.innerHeight || 800
      const rect = pin.getBoundingClientRect()
      if (rect.bottom < -vh || rect.top > vh * 1.5) return
      if (reduceMotion() || !window.matchMedia(ROAD_QUERY).matches) return
      const p = clamp01(-rect.top / Math.max(1, rect.height - vh))
      const next = 2025 + TURNS.filter((at) => p >= at).length
      setYear((current) => (current === next ? current : next))
    },
  })

  const phase = phaseOf(year)
  const turned = year - 2025

  return (
    <section
      ref={sectionRef}
      id="roadmap"
      aria-labelledby="rd-h"
      data-tone="dark"
      style={css('position:relative;background:#041815;color:#ffffff')}
    >
      <div ref={pinRef} data-odo-pin="">
        <div
          data-odo-stick=""
          style={cssWith('', vars({ '--fill': (year - 2024) / 6, '--sun': year === 2030 ? 1 : 0 }))}
        >
          <div data-odo-head="">
            <p data-sc="" style={css(kicker(ar, 'rgba(255,255,255,.78)') + ';margin-block-end:clamp(16px,2.4vh,26px)')}>
              <span aria-hidden="true" style={css(KICKER_RULE)} />
              <span style={css("font-family:'IBM Plex Mono',monospace;font-weight:400;letter-spacing:.06em;color:" + BRONZE)}>
                {ordinal(4)}
              </span>
              {t.acts[2][1][0]}
            </p>
            <h2
              id="rd-h"
              data-sc="rise"
              style={css(
                'margin:0;max-width:16ch;' +
                  display(ar, ar ? 'clamp(30px,3.4vw,52px)' : 'clamp(32px,3.6vw,56px)') +
                  ';color:#ffffff;text-wrap:balance',
              )}
            >
              {t.roadH}
            </h2>
            <p
              data-sc=""
              data-odo-lead=""
              style={css(
                'margin:clamp(14px,2vh,22px) 0 0;max-width:40ch;font-weight:300;font-size:clamp(15px,1.4vw,18px);line-height:1.6;color:rgba(255,255,255,.78)',
              )}
            >
              {t.roadLead}
            </p>
          </div>

          {/* The phases. Pinned, their pictures stack behind the counter and cross as the years turn;
              laid flat, each is a picture of its own with its years over it. */}
          <ol data-odo-phases="">
            {t.roadmap.map(([years, name], i) => (
              <li key={years} data-odo-phase="" data-on={phase === i ? '' : undefined}>
                <span data-odo-photo="" aria-hidden="true">
                  {warm || i === 0 ? (
                    <ImageSlot frame={roadFrames[i]} alt="" placeholder="" size="full" sizes="100vw" />
                  ) : null}
                </span>
                <span data-odo-cap="">
                  <span dir="ltr" data-odo-years="">
                    {years.replace('-', '–')}
                  </span>
                  <span
                    style={css(
                      'display:block;margin-block-start:10px;max-width:18ch;' +
                        display(ar, ar ? 'clamp(24px,5vw,36px)' : 'clamp(24px,5vw,38px)', 300) +
                        ';color:#ffffff',
                    )}
                  >
                    {name}
                  </span>
                </span>
              </li>
            ))}
          </ol>
          <span data-odo-shade="" aria-hidden="true" />
          <span data-odo-grain="" className="sp-grain" aria-hidden="true" />

          {/* The counter: two fixed figures and two wheels. */}
          <div data-odo-count="" aria-hidden="true">
            <span dir="ltr" data-odo-year="">
              <span>2</span>
              <span>0</span>
              <span data-odo-wheel="">
                <span data-odo-strip="" style={cssWith('', vars({ '--turn': turned === 5 ? 1 : 0 }))}>
                  {TENS.map((d) => (
                    <span key={d}>{d}</span>
                  ))}
                </span>
              </span>
              <span data-odo-wheel="">
                <span data-odo-strip="" style={cssWith('', vars({ '--turn': turned }))}>
                  {UNITS.map((d, k) => (
                    <span key={k}>{d}</span>
                  ))}
                </span>
              </span>
            </span>
            <span data-odo-now="">
              {t.roadmap.map(([, name], i) => (
                <span key={i} data-odo-name="" data-on={phase === i ? '' : undefined}>
                  <span
                    style={css(
                      "display:flex;align-items:baseline;gap:12px;font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.06em;color:rgba(255,255,255,.66)",
                    )}
                  >
                    <span data-lbl="">{t.phaseLabel}</span>
                    <span style={css('color:' + BRONZE)}>{ordinal(i) + ' / ' + ordinal(t.roadmap.length - 1)}</span>
                  </span>
                  <span
                    style={css(
                      'display:block;margin-block-start:12px;max-width:20ch;' +
                        display(ar, ar ? 'clamp(26px,2.6vw,42px)' : 'clamp(26px,2.7vw,44px)', 300) +
                        ';color:#ffffff;text-wrap:balance',
                    )}
                  >
                    {name}
                  </span>
                </span>
              ))}
            </span>
          </div>

          {/* The ruler: the phases in proportion to their years, filled to the year on the counter. */}
          <ol data-odo-ruler="">
            <span data-odo-fill="" aria-hidden="true" />
            {t.roadmap.map(([years, name], i) => (
              <li
                key={years}
                data-odo-seg=""
                data-on={phase === i ? '' : undefined}
                data-past={phase > i ? '' : undefined}
                style={cssWith('', vars({ '--span': SPANS[i] }))}
              >
                <span dir="ltr" style={css("font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.04em")}>
                  {years.replace('-', '–')}
                </span>
                <span data-odo-seg-name="">{name}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
