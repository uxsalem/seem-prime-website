'use client'

import { useCallback, useRef, useState } from 'react'
import { ImageSlot } from '@/components/ImageSlot'
import { PageMasthead } from '@/components/PageMasthead'
import { PageShell } from '@/components/PageShell'
import { SiteCta } from '@/components/SiteCta'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { STRATEGY } from '@/lib/content/strategy'
import { css, cssWith, vars } from '@/lib/css'
import { scrollRail, useMediaQuery, useScrollDriver } from '@/lib/hooks'
import { useSite } from '@/lib/site'
import { ACCENT, bodyFont, dispFont, h2Style, lbl, ordinal } from '@/lib/typography'

const TICKS = [0, 1, 2, 3, 4]
const COLUMN_SEGMENTS = [0, 1, 2, 3, 4, 5, 6]

const RAIL_BTN =
  'all:unset;box-sizing:border-box;cursor:pointer;width:44px;height:44px;border-radius:999px;' +
  'border:1px solid var(--line2);display:flex;align-items:center;justify-content:center;font-size:16px;' +
  'color:var(--ink);background:var(--card);transition:border-color .18s,transform .18s'

export function StrategyPage() {
  const { lang, ar } = useSite()
  const t = STRATEGY[lang]

  const [openPillar, setOpenPillar] = useState(0)
  const [vm, setVm] = useState(0)

  const pinRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLSpanElement>(null)
  const railRef = useRef<HTMLDivElement>(null)

  // Above 900px and with motion allowed, the vision/mission block pins and crossfades. Below
  // that it is a plain stack, so nothing depends on scrolling to become readable.
  const vmPinned = useMediaQuery('(min-width: 900px) and (prefers-reduced-motion: no-preference)')

  /** Words ignite in sequence across the pinned travel. */
  const updateVm = useCallback(() => {
    const pin = pinRef.current
    if (!pin) return
    const bar = barRef.current
    const vh = window.innerHeight || 800
    const rect = pin.getBoundingClientRect()
    const pinned =
      window.matchMedia('(min-width: 900px)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const travel = rect.height - vh

    if (!pinned || travel < 160) {
      pin.querySelectorAll<HTMLElement>('[data-vmword]').forEach((el) => {
        el.style.opacity = '1'
      })
      if (bar) bar.style.transform = 'scaleX(1)'
      return
    }

    const p = Math.max(0, Math.min(1, -rect.top / travel))
    const idx = p < 0.5 ? 0 : 1
    const local = idx === 0 ? p / 0.5 : (p - 0.5) / 0.5

    pin.querySelectorAll<HTMLElement>('[data-vmtext]').forEach((node) => {
      const own = Number(node.getAttribute('data-vmtext'))
      const words = node.querySelectorAll<HTMLElement>('[data-vmword]')
      const n = words.length || 1
      words.forEach((el, i) => {
        const lit = own === idx ? Math.max(0, Math.min(1, local * (n + 7) - i)) : own < idx ? 1 : 0
        el.style.opacity = (0.18 + 0.82 * lit).toFixed(3)
      })
    })

    if (bar) bar.style.transform = 'scaleX(' + p.toFixed(4) + ')'
    setVm((current) => (idx === current ? current : idx))
  }, [])

  useScrollDriver({ onSettle: updateVm })

  const disp = dispFont(ar)
  const label = lbl(ar)
  const h2 = h2Style(ar)

  const statements = [
    { no: '01', label: t.visionLabel, text: t.vision },
    { no: '02', label: t.missionLabel, text: t.mission },
  ]

  return (
    <PageShell page="strategy">
      <SiteHeader active="strategy" />

      <PageMasthead
        crumbLabel={t.crumbLabel}
        homeLabel={t.home}
        current={t.navStrategy}
        title={t.pageH}
        lead={t.pageLead}
        leadWidth="54ch"
      />

      {/* --- Vision and mission --- */}
      <section
        aria-labelledby="st-h"
        style={css('background:#062621;color:#ffffff;border-block-start:1px solid rgba(255,255,255,.16)')}
      >
        <div ref={pinRef} data-vmpin="">
          <div data-vmstick="">
            <div
              style={css(
                'width:100%;max-width:1280px;margin:0 auto;padding:clamp(24px,4.5vh,72px) clamp(16px,3vw,32px)',
              )}
            >
              <div
                style={css(
                  'display:flex;align-items:center;justify-content:space-between;gap:20px;' +
                    'margin-block-end:clamp(16px,3vh,44px)',
                )}
              >
                <h2
                  id="st-h"
                  style={css(
                    'position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;' +
                      'clip:rect(0 0 0 0);white-space:nowrap;border:0',
                  )}
                >
                  {t.strategyH}
                </h2>
                <span style={css('display:flex;gap:8px')}>
                  {TICKS.map((i) => (
                    <span
                      key={i}
                      aria-hidden="true"
                      style={css(
                        'width:' +
                          (i === 0 ? '26px' : '13px') +
                          ';height:1px;background:' +
                          (i === 0 ? ACCENT : 'rgba(255,255,255,.32)'),
                      )}
                    />
                  ))}
                </span>
              </div>

              <div data-vmstage="">
                {statements.map((s, i) => (
                  <div
                    key={s.no}
                    data-vmtext={i}
                    style={css(
                      'opacity:' +
                        (!vmPinned || i === vm ? '1' : '0') +
                        ';transition:opacity .45s cubic-bezier(.2,.7,.3,1)',
                    )}
                  >
                    <div
                      style={css(
                        'display:flex;align-items:center;gap:14px;margin-block-end:clamp(20px,2.6vw,32px)',
                      )}
                    >
                      <span
                        style={css(
                          "font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.08em;color:" +
                            (i === 0 ? ACCENT : 'rgba(255,255,255,.6)'),
                        )}
                      >
                        {s.no}
                      </span>
                      <span
                        aria-hidden="true"
                        style={css('width:34px;height:1px;background:rgba(255,255,255,.4)')}
                      />
                      <span data-lbl="" style={css('font-family:' + disp + label + 'rgba(255,255,255,.7)')}>
                        {s.label}
                      </span>
                    </div>
                    <p
                      style={css(
                        'margin:0;max-width:min(100%,1040px);font-family:' +
                          bodyFont(ar) +
                          ';font-weight:' +
                          (ar ? '400' : '300') +
                          ';font-size:clamp(26px,4.6vw,64px);line-height:' +
                          (ar ? '1.42' : '1.1') +
                          ';letter-spacing:' +
                          (ar ? '0' : '-.03em') +
                          ';color:#ffffff;text-wrap:pretty',
                      )}
                    >
                      {s.text
                        .split(/\s+/)
                        .filter(Boolean)
                        .map((word, w) => (
                          <span
                            key={w}
                            data-vmword=""
                            style={css('display:inline-block;margin-inline-end:.26em')}
                          >
                            {word}
                          </span>
                        ))}
                    </p>
                  </div>
                ))}
              </div>

              <div
                style={css(
                  'margin-block-start:clamp(18px,3vh,52px);height:1px;background:rgba(255,255,255,.16)',
                )}
              >
                <span
                  ref={barRef}
                  data-vmbar=""
                  aria-hidden="true"
                  style={css(
                    'display:block;height:1px;background:#dc4b1c;transform-origin:' +
                      (ar ? 'right center' : 'left center'),
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Strategic pillars ---
          Five pillars carrying one discipline is a colonnade: five equal columns on one ground
          line under one beam. The selected column fills bottom-up, segment by segment, which is
          literally pillar 01's copy — and it shares the accordion's state, so the two stay in
          sync. */}
      <section aria-labelledby="pl-h" style={css('background:var(--page)')}>
        <div
          data-split=""
          style={css('max-width:1200px;margin:0 auto;padding:clamp(56px,8vw,96px) clamp(16px,3vw,32px)')}
        >
          <div>
            <h2 id="pl-h" data-sc="" style={css(h2)}>
              {t.pillarsH}
            </h2>
            <div data-sc="" style={css('margin-block-start:clamp(28px,4vw,48px);max-width:620px')}>
              <span aria-hidden="true" style={css('display:block;height:3px;background:var(--line3)')} />
              <div
                role="group"
                aria-label={t.pillarsH}
                style={css(
                  'display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:clamp(6px,1.2vw,16px);' +
                    'height:clamp(210px,29vh,330px)',
                )}
              >
                {t.pillars.map(([text], i) => {
                  const on = openPillar === i
                  return (
                    <button
                      key={text}
                      type="button"
                      aria-pressed={on}
                      aria-label={text}
                      onClick={() => setOpenPillar(on ? -1 : i)}
                      style={css(
                        'all:unset;box-sizing:border-box;cursor:pointer;min-width:0;height:100%;' +
                          'display:flex;flex-direction:column-reverse;gap:3px;padding-block-end:0',
                      )}
                    >
                      <span
                        aria-hidden="true"
                        style={css(
                          'flex:0 0 auto;height:3px;margin-block-end:3px;order:1;background:' +
                            (on ? ACCENT : 'transparent'),
                        )}
                      />
                      {COLUMN_SEGMENTS.map((k) => (
                        <span
                          key={k}
                          aria-hidden="true"
                          style={css(
                            'flex:1 1 0;border:1px solid ' +
                              (on ? 'transparent' : 'var(--line2)') +
                              ';background:' +
                              (on ? '#062621' : 'transparent'),
                          )}
                        />
                      ))}
                    </button>
                  )
                })}
              </div>
              <span aria-hidden="true" style={css('display:block;height:1px;background:var(--line3)')} />
              <div
                aria-hidden="true"
                style={css(
                  'display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:clamp(6px,1.2vw,16px);' +
                    'margin-block-start:10px',
                )}
              >
                {t.pillars.map(([text], i) => (
                  <span
                    key={text}
                    style={css(
                      "font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.06em;" +
                        'text-align:center;color:' +
                        (openPillar === i ? ACCENT : 'var(--muted)'),
                    )}
                  >
                    {ordinal(i)}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div style={css('border-block-start:1px solid var(--line2)')}>
            {t.pillars.map(([text, note], i) => {
              const open = openPillar === i
              return (
                <div
                  key={text}
                  data-sc=""
                  data-stagger=""
                  style={cssWith('border-block-end:1px solid var(--line)', vars({ '--i': i }))}
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenPillar(open ? -1 : i)}
                    style={css(
                      'all:unset;box-sizing:border-box;cursor:pointer;width:100%;display:flex;' +
                        'align-items:center;gap:16px;padding:20px 0;position:relative',
                    )}
                  >
                    {open ? (
                      <span
                        aria-hidden="true"
                        style={css(
                          'position:absolute;inset-block:0;inset-inline-start:0;width:3px;background:#dc4b1c',
                        )}
                      />
                    ) : null}
                    <span
                      style={css(
                        "font-family:'IBM Plex Mono',monospace;font-size:12px;color:var(--muted);" +
                          'padding-inline-start:14px',
                      )}
                    >
                      {ordinal(i)}
                    </span>
                    <span
                      style={css(
                        "flex:1 1 auto;font-family:'Sora',sans-serif;font-weight:600;" +
                          'font-size:clamp(16px,1.9vw,20px);line-height:1.35;color:var(--ink);text-align:start',
                      )}
                    >
                      {text}
                    </span>
                    <span
                      aria-hidden="true"
                      style={css(
                        'display:block;width:9px;height:9px;border-inline-end:1.5px solid ' +
                          (open ? 'var(--ink)' : 'var(--muted)') +
                          ';border-block-end:1.5px solid ' +
                          (open ? 'var(--ink)' : 'var(--muted)') +
                          ';transform:rotate(' +
                          (open ? '-135deg' : '45deg') +
                          ')',
                      )}
                    />
                  </button>
                  {open ? (
                    <p
                      style={css(
                        'margin:0;padding:0 0 22px 0;padding-inline-start:40px;max-width:56ch;' +
                          'font-size:15px;line-height:1.62;color:var(--body)',
                      )}
                    >
                      {note}
                    </p>
                  ) : null}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* --- Sectors --- */}
      <section aria-labelledby="sec-h" style={css('background:var(--sunken)')}>
        <div
          style={css('max-width:1400px;margin:0 auto;padding:clamp(56px,8vw,96px) clamp(16px,3vw,32px)')}
        >
          <div
            style={css(
              'display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:24px;' +
                'margin-block-end:clamp(28px,3.4vw,40px)',
            )}
          >
            <div>
              <h2 id="sec-h" data-sc="" style={css(h2)}>
                {t.sectorsH}
              </h2>
            </div>
            <div style={css('display:flex;gap:10px')}>
              <button
                type="button"
                onClick={() => scrollRail(railRef.current, -1, ar)}
                aria-label={t.railPrev}
                style={css(RAIL_BTN)}
              >
                {ar ? '→' : '←'}
              </button>
              <button
                type="button"
                onClick={() => scrollRail(railRef.current, 1, ar)}
                aria-label={t.railNext}
                style={css(RAIL_BTN)}
              >
                {ar ? '←' : '→'}
              </button>
            </div>
          </div>

          <div ref={railRef} data-rail="">
            {t.sectors.map((text, i) => (
              <div
                key={text}
                data-sc=""
                data-stagger=""
                style={cssWith(
                  'flex:0 0 clamp(230px,25vw,300px);display:flex;flex-direction:column;gap:16px;' +
                    'padding:clamp(16px,1.8vw,20px);box-sizing:border-box;background:var(--card);' +
                    'border:1px solid var(--line);border-radius:14px;box-shadow:var(--sh)',
                  vars({ '--i': i }),
                )}
              >
                <div
                  style={css(
                    'position:relative;aspect-ratio:16/10;overflow:clip;background:var(--sunken);' +
                      'border:1px solid var(--line)',
                  )}
                >
                  <ImageSlot placeholder={t.sectorPh + text} />
                </div>
                <div style={css('display:flex;align-items:center;justify-content:space-between;gap:12px')}>
                  <span
                    data-lbl=""
                    style={css(
                      "font-family:'Sora',sans-serif;font-weight:600;font-size:15px;letter-spacing:.06em;" +
                        'text-transform:uppercase;color:var(--ink)',
                    )}
                  >
                    {text}
                  </span>
                  <span
                    style={css("font-family:'IBM Plex Mono',monospace;font-size:12px;color:var(--muted)")}
                  >
                    {ordinal(i)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteCta page="strategy" />
      <SiteFooter />
    </PageShell>
  )
}
