'use client'

import Link from 'next/link'
import { useCallback, useRef, useState } from 'react'
import { PageShell } from '@/components/PageShell'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { HOME } from '@/lib/content/home'
import { css, cssWith, vars } from '@/lib/css'
import { useScrollDriver } from '@/lib/hooks'
import { plates, routes } from '@/lib/routes'
import { useSite } from '@/lib/site'
import { ACCENT, bodyFont, capStyle, dispFont, homeH2Core, lbl, ordinal } from '@/lib/typography'
import { useCue, useHomeParallax, useMarquee } from './home-motion'

/** The four KPIs the stat band leads with, out of the five on the roadmap page. */
const BAND_KPIS = [0, 3, 2, 4]

export function HomePage() {
  const { lang, ar, arrow } = useSite()
  const t = HOME[lang]

  const [seemOpen, setSeemOpen] = useState(0)
  // A click on a SEEM cell briefly locks out the scroll driver so the two never fight.
  const seemLock = useRef(0)

  const disp = dispFont(ar)
  const body = bodyFont(ar)
  const label = lbl(ar)
  const cap = capStyle(ar)
  const h2Core = homeH2Core(ar)
  const h2 = 'margin:0;' + h2Core + ';color:var(--ink)'
  const h2OnBrand = 'margin:0;' + h2Core + ';color:#ffffff'
  const bannerH = 'margin:0 auto;max-width:22ch;' + h2Core + ';color:#ffffff'
  const ruleOrigin = ar ? 'right center' : 'left center'

  const marqueeRef = useRef<HTMLDivElement>(null)
  const marqueeWrapRef = useRef<HTMLDivElement>(null)
  const cueRef = useRef<HTMLSpanElement>(null)
  const heroPlateRef = useRef<HTMLSpanElement>(null)
  const bannerPlateRef = useRef<HTMLSpanElement>(null)
  const driftRef = useRef<HTMLSpanElement>(null)

  useMarquee(marqueeRef, marqueeWrapRef)
  useCue(cueRef)

  const parallax = useHomeParallax({ heroPlateRef, bannerPlateRef, driftRef })

  // The four SEEM letters advance with the reader instead of waiting for a click.
  const advanceSeem = useCallback(() => {
    if (Date.now() < seemLock.current) return
    const section = document.getElementById('seem')
    if (!section) return
    const rect = section.getBoundingClientRect()
    const vh = window.innerHeight
    const progress = (vh - rect.top) / (rect.height + vh)
    if (progress <= 0 || progress >= 1) return
    setSeemOpen((current) => {
      const next = Math.max(0, Math.min(3, Math.floor(progress * 4)))
      return next === current ? current : next
    })
  }, [])

  useScrollDriver({
    onFrame: () => {
      parallax()
      advanceSeem()
    },
  })

  // One continuous strip of the brand's own beats and sectors, duplicated so the loop seams.
  const strip = [...t.tagline, ...t.sectors]
  const ticker = [...strip, ...strip]

  return (
    <PageShell page="home" counterDuration={1500}>
      <SiteHeader active="" overHero />

      {/* --- Hero --- */}
      <section
        id="top"
        aria-label={t.heroLabel}
        style={css(
          'position:relative;min-height:clamp(620px,94vh,980px);display:flex;align-items:flex-end;' +
            'overflow:clip;background:#062621',
        )}
      >
        <span
          ref={heroPlateRef}
          aria-hidden="true"
          style={css(
            'position:absolute;inset:-8% 0;background-image:url("' +
              plates.glassCapsule +
              '");background-size:cover;background-position:center;transform:scale(1.08);will-change:transform',
          )}
        />
        <span
          aria-hidden="true"
          style={css(
            'position:absolute;inset:0;background:linear-gradient(to ' +
              (ar ? 'left' : 'right') +
              ',rgba(4,24,21,.92) 0%,rgba(4,24,21,.6) 46%,rgba(4,24,21,.28) 100%)',
          )}
        />
        <span
          aria-hidden="true"
          style={css('position:absolute;inset-block:0;inset-inline-end:0;width:3px;background:#dc4b1c')}
        />
        <span
          aria-hidden="true"
          style={css(
            'position:absolute;inset-block-start:0;inset-inline:0;height:9px;' +
              'background-image:repeating-linear-gradient(90deg,rgba(255,255,255,.2) 0 1px,transparent 1px 28px);' +
              'mask-image:linear-gradient(90deg,transparent,#000 14%,#000 86%,transparent)',
          )}
        />
        <div
          style={css(
            'position:relative;width:100%;max-width:1200px;margin:0 auto;' +
              'padding:clamp(120px,16vh,180px) clamp(16px,3vw,32px) clamp(40px,6vw,72px)',
          )}
        >
          <h1
            data-sc=""
            style={css(
              'margin:0;max-width:22ch;font-family:' +
                disp +
                ';font-weight:' +
                (ar ? '600' : '300') +
                ';font-size:' +
                (ar ? 'clamp(29px,4.8vw,62px)' : 'clamp(34px,5.6vw,80px)') +
                ';line-height:' +
                (ar ? '1.4' : '1.02') +
                ';letter-spacing:' +
                (ar ? '0' : '-.028em') +
                ';color:#ffffff',
            )}
          >
            <span style={css('display:block')}>{t.h1a}</span>
            <span style={css('display:block')}>{t.h1b}</span>
            <span style={css('display:block;position:relative')}>
              {t.h1c}
              <span
                aria-hidden="true"
                style={css(
                  'position:absolute;inset-block-end:-2px;inset-inline-start:0;width:100%;height:3px;' +
                    'background:linear-gradient(to right,#dc4b1c,transparent)',
                )}
              />
            </span>
          </h1>

          <p
            data-sc=""
            style={css(
              'margin:clamp(22px,3vw,34px) 0 clamp(28px,4vw,44px);max-width:58ch;font-weight:300;' +
                'font-size:clamp(16px,1.7vw,19px);line-height:1.62;color:rgba(255,255,255,.86)',
            )}
          >
            {t.promise}
          </p>

          <div
            data-sc=""
            style={css('display:flex;flex-wrap:wrap;gap:14px;margin-block-end:clamp(32px,5vw,56px)')}
          >
            <Link
              href={routes.contact}
              className="sp-lift"
              style={css(
                'box-sizing:border-box;display:inline-flex;align-items:center;gap:10px;height:54px;padding:0 32px;' +
                  'border-radius:999px;background:#ffffff;color:#041815;font-size:15px;font-weight:500;' +
                  'text-decoration:none;transition:transform .2s cubic-bezier(.2,.7,.3,1),box-shadow .2s',
              )}
            >
              {t.cta}
            </Link>
            <Link
              href={routes.ecosystem}
              className="sp-ghost"
              style={css(
                'box-sizing:border-box;display:inline-flex;align-items:center;gap:10px;height:54px;padding:0 32px;' +
                  'border-radius:999px;border:1px solid rgba(255,255,255,.34);color:#ffffff;font-size:15px;' +
                  'font-weight:500;text-decoration:none;' +
                  'transition:background .2s,border-color .2s,transform .2s cubic-bezier(.2,.7,.3,1)',
              )}
            >
              {t.exploreCta}
              <span aria-hidden="true">{arrow}</span>
            </Link>
          </div>

          <div
            data-sc=""
            data-lbl=""
            style={css(
              'display:flex;flex-wrap:wrap;align-items:center;gap:clamp(16px,3vw,36px);padding-block-start:22px;' +
                "border-block-start:1px solid rgba(255,255,255,.18);font-family:'IBM Plex Mono',monospace;" +
                'font-size:12px;letter-spacing:.04em;color:rgba(255,255,255,.7)',
            )}
          >
            <span style={css('display:flex;align-items:center;gap:10px')}>
              <span
                ref={cueRef}
                aria-hidden="true"
                style={css('display:block;width:1px;height:22px;background:rgba(255,255,255,.6)')}
              />
              {t.metaScroll}
            </span>
            <span>{t.metaCity}</span>
            <span>{t.metaEst}</span>
          </div>
        </div>
      </section>

      {/* --- Ticker --- */}
      <section
        aria-label={t.tickerLabel}
        style={css(
          'position:relative;overflow:clip;background:#041815;color:#ffffff;' +
            'border-block:1px solid rgba(255,255,255,.14)',
        )}
      >
        <div ref={marqueeWrapRef} style={css('padding-block:clamp(14px,1.8vw,20px)')}>
          <div ref={marqueeRef} data-mq="">
            {ticker.map((text, i) => (
              <span
                key={i}
                style={css(
                  'display:inline-flex;align-items:center;gap:clamp(18px,2.4vw,30px);' +
                    'padding-inline-end:clamp(18px,2.4vw,30px);white-space:nowrap;font-family:' +
                    disp +
                    ';font-size:clamp(13px,1.5vw,16px);font-weight:500;letter-spacing:' +
                    (ar ? '0' : '.06em') +
                    ';text-transform:' +
                    (ar ? 'none' : 'uppercase') +
                    ';color:rgba(255,255,255,.82)',
                )}
              >
                <span
                  aria-hidden="true"
                  style={css(
                    'flex:0 0 auto;width:5px;height:5px;border-radius:999px;background:' +
                      (i % 4 === 0 ? ACCENT : 'rgba(255,255,255,.34)'),
                  )}
                />
                {text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* --- Stat band --- */}
      <section id="figures" aria-label={t.kpiH} style={css('background:#062621;color:#ffffff')}>
        <div
          data-cols="4"
          style={css('max-width:1200px;margin:0 auto;padding:clamp(44px,5.4vw,72px) clamp(16px,3vw,32px)')}
        >
          {BAND_KPIS.map((source, i) => {
            const [value, statLabel, unit] = t.kpis[source]
            const numeric = /^([\d.]+)(.*)$/.exec(value)
            return (
              <div
                key={source}
                data-sc=""
                data-stagger=""
                style={cssWith(
                  'position:relative;display:flex;flex-direction:column;gap:12px;' +
                    'padding-inline-start:clamp(14px,1.8vw,22px);border-inline-start:1px solid rgba(255,255,255,.18)',
                  vars({ '--i': i }),
                )}
              >
                <div style={css('display:flex;align-items:baseline;gap:8px')}>
                  <span
                    data-count={numeric?.[1] ?? ''}
                    data-suffix={numeric?.[2] ?? ''}
                    style={css(
                      "font-family:'Sora',sans-serif;font-weight:300;font-size:clamp(42px,5.4vw,72px);" +
                        'line-height:1;letter-spacing:-.03em;font-variant-numeric:tabular-nums',
                    )}
                  >
                    {value}
                  </span>
                  <span
                    data-lbl=""
                    style={css(
                      "font-family:'IBM Plex Mono',monospace;font-size:13px;color:rgba(255,255,255,.62)",
                    )}
                  >
                    {unit}
                  </span>
                </div>
                <span
                  aria-hidden="true"
                  style={css(
                    'width:28px;height:3px;background:' + (i === 0 ? ACCENT : 'rgba(255,255,255,.34)'),
                  )}
                />
                <span
                  data-lbl=""
                  style={css(
                    'font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.74)',
                  )}
                >
                  {statLabel}
                </span>
              </div>
            )
          })}
        </div>
      </section>

      {/* --- About --- */}
      <section id="about" aria-labelledby="ab-h" style={css('background:var(--page)')}>
        <div
          data-split=""
          style={css(
            'max-width:1200px;margin:0 auto;padding:clamp(56px,8vw,104px) clamp(16px,3vw,32px);align-items:stretch',
          )}
        >
          <div style={css('display:flex;flex-direction:column')}>
            <h2
              id="ab-h"
              data-sc=""
              style={css(
                'margin:0 0 clamp(18px,2.4vw,26px);max-width:20ch;font-family:' +
                  disp +
                  ';font-weight:' +
                  (ar ? '600' : '300') +
                  ';font-size:clamp(30px,4.4vw,64px);line-height:' +
                  (ar ? '1.24' : '1.04') +
                  ';letter-spacing:' +
                  (ar ? '0' : '-.025em') +
                  ';color:var(--ink);text-wrap:pretty',
              )}
            >
              {t.positioning}
            </h2>
            <p
              data-sc=""
              style={css(
                'margin:0 0 22px;max-width:52ch;font-weight:400;font-size:clamp(17px,1.9vw,21px);' +
                  'line-height:1.5;color:var(--ink)',
              )}
            >
              {t.aboutLead}
            </p>
            <p
              data-sc=""
              style={css(
                'margin:0 0 22px;max-width:58ch;font-weight:300;font-size:clamp(15px,1.6vw,17px);' +
                  'line-height:1.62;color:var(--muted)',
              )}
            >
              {t.aboutBody}
            </p>

            <div
              data-sc=""
              data-cols="2"
              style={css('gap:clamp(14px,2vw,22px);margin-block-end:clamp(26px,3.4vw,38px)')}
            >
              {t.proof.map(([proofLabel, value], i) => (
                <div
                  key={proofLabel}
                  data-stagger=""
                  style={cssWith(
                    'display:flex;flex-direction:column;gap:6px;padding-block-start:14px;border-block-start:2px solid ' +
                      (i === 0 ? ACCENT : 'var(--line2)'),
                    vars({ '--i': i }),
                  )}
                >
                  <span data-lbl="" style={css(cap)}>
                    {proofLabel}
                  </span>
                  <span style={css('font-size:15px;line-height:1.5;color:var(--ink)')}>{value}</span>
                </div>
              ))}
            </div>

            <div data-sc="" style={css('margin-block-start:auto')}>
              <Link
                href={routes.about}
                style={css('display:inline-flex;align-items:center;gap:8px;font-size:15px;font-weight:500')}
              >
                {t.moreAbout}
                <span aria-hidden="true">{arrow}</span>
              </Link>
            </div>
          </div>

          <div
            data-sc="x"
            style={css(
              'position:relative;overflow:clip;border-start-end-radius:clamp(28px,5vw,44px);' +
                'background:linear-gradient(160deg,#0c3e3d 0%,#062621 58%,#041815 100%);box-shadow:var(--sh2)',
            )}
          >
            <span
              aria-hidden="true"
              style={css(
                'position:absolute;inset-block-start:0;inset-inline-start:0;width:180px;height:180px;' +
                  'background-image:repeating-linear-gradient(0deg,rgba(255,255,255,.07) 0 1px,transparent 1px 30px),' +
                  'repeating-linear-gradient(90deg,rgba(255,255,255,.07) 0 1px,transparent 1px 30px);' +
                  'mask-image:linear-gradient(135deg,#000 0%,transparent 78%)',
              )}
            />
            <span
              ref={driftRef}
              aria-hidden="true"
              style={css(
                'position:absolute;inset-block-end:-10px;inset-inline-start:clamp(24px,4vw,40px);' +
                  "font-family:'Sora',sans-serif;font-weight:700;font-size:clamp(72px,11vw,132px);line-height:1;" +
                  'letter-spacing:.18em;color:rgba(255,255,255,.06);white-space:nowrap;pointer-events:none',
              )}
            >
              SEEM
            </span>
            <div style={css('position:relative;display:flex;flex-direction:column;padding:clamp(28px,3.6vw,44px)')}>
              {t.tagline.map((text, i) => (
                <div
                  key={text}
                  data-stagger=""
                  style={cssWith(
                    'display:grid;grid-template-columns:auto minmax(0,1fr);align-items:baseline;' +
                      'gap:clamp(14px,2vw,22px);padding:clamp(18px,2.2vw,26px) 0;border-block-start:1px solid ' +
                      (i === 0 ? ACCENT : 'rgba(255,255,255,.18)'),
                    vars({ '--i': i }),
                  )}
                >
                  <span
                    style={css(
                      "font-family:'IBM Plex Mono',monospace;font-size:12px;color:" +
                        (i === 0 ? '#ffffff' : 'rgba(255,255,255,.62)'),
                    )}
                  >
                    {ordinal(i)}
                  </span>
                  <span
                    style={css(
                      'font-family:' +
                        disp +
                        ';font-weight:600;font-size:clamp(19px,2.4vw,28px);line-height:' +
                        (ar ? '1.35' : '1.18') +
                        ';letter-spacing:' +
                        (ar ? '0' : '-.01em') +
                        ';color:#ffffff',
                    )}
                  >
                    {text}
                  </span>
                </div>
              ))}
              <p
                style={css(
                  'margin:clamp(24px,3vw,34px) 0 0;padding-block-start:clamp(18px,2.2vw,24px);' +
                    'border-block-start:1px solid rgba(255,255,255,.18);max-width:36ch;font-weight:300;' +
                    'font-size:14px;line-height:1.62;color:rgba(255,255,255,.74)',
                )}
              >
                {t.promiseLine}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- The SEEM model ---
          The company name IS the method, so the four letters are the section: one divided
          monolith where the open cell lifts to green-800 and its letter fills solid. */}
      <section
        id="seem"
        aria-labelledby="sm-h"
        style={css('position:relative;overflow:clip;background:#041815;color:#ffffff')}
      >
        <span
          aria-hidden="true"
          style={css(
            'position:absolute;inset:0;' +
              'background-image:repeating-linear-gradient(90deg,rgba(255,255,255,.05) 0 1px,transparent 1px 64px);' +
              'mask-image:linear-gradient(180deg,#000,transparent 72%)',
          )}
        />
        <div
          style={css(
            'position:relative;max-width:1400px;margin:0 auto;padding:clamp(56px,8vw,110px) clamp(16px,3vw,32px)',
          )}
        >
          <div
            style={css(
              'display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:22px;' +
                'margin-block-end:clamp(32px,4.4vw,56px)',
            )}
          >
            <div>
              <h2 id="sm-h" data-sc="" style={css(h2OnBrand)}>
                {t.seemH}
              </h2>
            </div>
            <p
              data-sc=""
              style={css(
                'margin:0;max-width:38ch;font-weight:300;font-size:clamp(15px,1.6vw,17px);' +
                  'line-height:1.62;color:rgba(255,255,255,.72)',
              )}
            >
              {t.seemLead}
            </p>
          </div>

          <div
            data-seem=""
            style={css('background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.16)')}
          >
            {t.seem.map(([letter, name, question, outcome], i) => {
              const on = seemOpen === i
              return (
                <button
                  key={`${letter}-${i}`}
                  type="button"
                  aria-pressed={on}
                  onClick={() => {
                    seemLock.current = Date.now() + 1600
                    setSeemOpen(i)
                  }}
                  style={css(
                    'all:unset;box-sizing:border-box;cursor:pointer;display:flex;flex-direction:column;' +
                      'gap:clamp(12px,1.6vw,18px);min-height:clamp(260px,26vw,330px);' +
                      'padding:clamp(26px,3vw,40px) clamp(22px,2.6vw,34px);background:' +
                      (on ? '#0c3e3d' : '#041815') +
                      ';transition:background .24s cubic-bezier(.2,.7,.3,1)',
                  )}
                >
                  <span
                    aria-hidden="true"
                    style={css(
                      'display:block;width:' +
                        (on ? '64px' : '36px') +
                        ';height:3px;background:' +
                        (on ? ACCENT : 'rgba(255,255,255,.28)') +
                        ';transition:width .24s cubic-bezier(.2,.7,.3,1),background .24s',
                    )}
                  />
                  <span
                    style={css(
                      "font-family:'Sora',sans-serif;font-weight:300;font-size:clamp(48px,6vw,86px);" +
                        'line-height:.9;letter-spacing:-.03em;color:' +
                        (on ? '#ffffff' : 'transparent') +
                        ';-webkit-text-stroke:' +
                        (on ? '0' : '1px rgba(255,255,255,.4)') +
                        ';transition:color .24s',
                    )}
                  >
                    {letter}
                  </span>
                  <span data-lbl="" style={css('font-family:' + disp + label + 'rgba(255,255,255,.72)')}>
                    {name}
                  </span>
                  <span
                    style={css(
                      'font-family:' +
                        body +
                        ';font-weight:300;font-size:clamp(16px,1.9vw,22px);line-height:' +
                        (ar ? '1.5' : '1.24') +
                        ';text-align:start;color:' +
                        (on ? 'rgba(255,255,255,.92)' : 'rgba(255,255,255,.6)') +
                        ';transition:color .24s',
                    )}
                  >
                    {question}
                  </span>
                  <span
                    style={css(
                      'display:flex;align-items:center;gap:10px;margin-block-start:auto;' +
                        'padding-block-start:clamp(16px,2vw,22px)',
                    )}
                  >
                    <span
                      aria-hidden="true"
                      style={css(
                        'flex:0 0 auto;width:22px;height:1px;background:' +
                          (on ? ACCENT : 'rgba(255,255,255,.3)') +
                          ';transition:background .24s',
                      )}
                    />
                    <span
                      data-lbl=""
                      style={css(
                        "font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.04em;" +
                          'text-align:start;color:' +
                          (on ? '#ffffff' : 'rgba(255,255,255,.52)') +
                          ';transition:color .24s',
                      )}
                    >
                      {outcome}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* --- Ecosystem preview --- */}
      <section id="ecosystem" aria-labelledby="hp-h" style={css('background:var(--page)')}>
        <div
          style={css('max-width:1240px;margin:0 auto;padding:clamp(56px,8vw,104px) clamp(16px,3vw,32px)')}
        >
          <div
            style={css(
              'display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:20px;' +
                'margin-block-end:clamp(28px,3.6vw,48px)',
            )}
          >
            <div>
              <h2 id="hp-h" data-sc="" style={css(h2)}>
                {t.ecosystemH}
              </h2>
            </div>
            <Link
              data-sc=""
              href={routes.ecosystem}
              style={css('display:inline-flex;align-items:center;gap:8px;font-size:15px;font-weight:500')}
            >
              {t.morePlatforms}
              <span aria-hidden="true">{arrow}</span>
            </Link>
          </div>

          <div data-cols="4">
            {t.platforms.map(([sector, name, blurb], i) => (
              <Link
                key={name}
                data-eco-card=""
                data-sc="up"
                data-stagger=""
                className="sp-eco-card"
                href={routes.ecosystem}
                style={cssWith(
                  'position:relative;overflow:clip;display:flex;flex-direction:column;gap:12px;' +
                    'padding:clamp(22px,2.6vw,30px);box-sizing:border-box;background:var(--card);' +
                    'border:1px solid var(--line);border-radius:14px;box-shadow:var(--sh);text-decoration:none;' +
                    'transition:transform .22s cubic-bezier(.2,.7,.3,1),box-shadow .22s,border-color .22s',
                  vars({ '--i': i }),
                )}
              >
                <span
                  data-ecorule=""
                  aria-hidden="true"
                  style={css(
                    'position:absolute;inset-block-start:0;inset-inline-start:0;width:52px;height:3px;' +
                      'background:#dc4b1c;transform:scaleX(0);transform-origin:' +
                      ruleOrigin,
                  )}
                />
                <span
                  data-econum=""
                  aria-hidden="true"
                  style={css(
                    "font-family:'Sora',sans-serif;font-weight:300;font-size:clamp(32px,4vw,48px);" +
                      'line-height:1;color:transparent;-webkit-text-stroke:1px var(--line3);letter-spacing:-.02em',
                  )}
                >
                  {ordinal(i)}
                </span>
                <span
                  data-lbl=""
                  style={css(
                    "font-family:'Sora',sans-serif;font-size:11px;font-weight:500;letter-spacing:.18em;" +
                      'text-transform:uppercase;color:var(--muted)',
                  )}
                >
                  {sector}
                </span>
                <strong
                  style={css(
                    "font-family:'Sora',sans-serif;font-weight:600;font-size:clamp(18px,2.1vw,23px);" +
                      'line-height:1.2;color:var(--ink)',
                  )}
                >
                  {name}
                </strong>
                <span style={css('font-size:14px;line-height:1.6;color:var(--muted)')}>{blurb}</span>
                <span
                  data-eco-arrow=""
                  aria-hidden="true"
                  style={css(
                    'margin-block-start:auto;padding-block-start:14px;font-size:16px;color:#dc4b1c;opacity:0;' +
                      'transform:translateX(-6px);transition:opacity .22s,transform .22s cubic-bezier(.2,.7,.3,1)',
                  )}
                >
                  {arrow}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- Sectors --- */}
      <section id="sectors" aria-labelledby="sec-h" style={css('background:var(--sunken)')}>
        <div
          data-split=""
          style={css('max-width:1240px;margin:0 auto;padding:clamp(56px,8vw,104px) clamp(16px,3vw,32px)')}
        >
          <div>
            <h2 id="sec-h" data-sc="" style={css(h2)}>
              {t.sectorsH}
            </h2>
            <p
              data-sc=""
              style={css(
                'margin:18px 0 0;max-width:40ch;font-weight:300;font-size:clamp(15px,1.6vw,17px);' +
                  'line-height:1.62;color:var(--muted)',
              )}
            >
              {t.sectorsLead}
            </p>
          </div>
          <div style={css('display:flex;flex-wrap:wrap;gap:10px;align-content:flex-start')}>
            {t.sectors.map((text, i) => (
              <span
                key={text}
                data-sc=""
                data-stagger=""
                style={cssWith(
                  'display:inline-flex;align-items:center;gap:10px;padding:12px clamp(16px,1.8vw,22px);' +
                    'border-radius:999px;background:var(--card);border:1px solid var(--line);font-family:' +
                    disp +
                    ';font-size:clamp(14px,1.6vw,17px);font-weight:600;color:var(--ink);' +
                    'transition:transform .2s cubic-bezier(.2,.7,.3,1),border-color .2s,box-shadow .2s',
                  vars({ '--i': i }),
                )}
              >
                <span style={css("font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--muted)")}>
                  {ordinal(i)}
                </span>
                {text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* --- Roadmap --- */}
      <section
        id="roadmap"
        aria-labelledby="rd-h"
        style={css('position:relative;overflow:clip;background:var(--page)')}
      >
        <div
          style={css('max-width:1240px;margin:0 auto;padding:clamp(56px,8vw,104px) clamp(16px,3vw,32px)')}
        >
          <div
            style={css(
              'display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:20px;' +
                'margin-block-end:clamp(32px,4vw,56px)',
            )}
          >
            <div>
              <h2 id="rd-h" data-sc="" style={css(h2)}>
                {t.roadH}
              </h2>
            </div>
            <Link
              data-sc=""
              href={routes.roadmap}
              style={css('display:inline-flex;align-items:center;gap:8px;font-size:15px;font-weight:500')}
            >
              {t.moreRoad}
              <span aria-hidden="true">{arrow}</span>
            </Link>
          </div>

          <div data-sc="" style={css('position:relative;padding-block-start:clamp(20px,2.6vw,30px)')}>
            <span
              aria-hidden="true"
              style={css(
                'position:absolute;inset-block-start:0;inset-inline:0;height:1px;background:var(--line2)',
              )}
            />
            <span
              data-roadfill=""
              aria-hidden="true"
              style={css(
                'position:absolute;inset-block-start:0;inset-inline-start:0;height:1px;width:0;background:#dc4b1c',
              )}
            />
            <div data-cols="4">
              {t.roadmap.map(([year, phase], i) => {
                const last = i === 3
                return (
                  <div
                    key={year}
                    data-stagger=""
                    style={cssWith('display:flex;flex-direction:column;gap:14px', vars({ '--i': i }))}
                  >
                    <span
                      aria-hidden="true"
                      style={css(
                        'display:block;width:' +
                          (last ? '48px' : '22px') +
                          ';height:10px;border-radius:999px;background:' +
                          (last ? ACCENT : 'var(--line3)'),
                      )}
                    />
                    <span
                      style={css(
                        "font-family:'IBM Plex Mono',monospace;font-size:clamp(15px,1.8vw,20px);" +
                          'letter-spacing:-.01em;color:var(--ink)',
                      )}
                    >
                      {year}
                    </span>
                    <span
                      style={css(
                        'font-size:15px;line-height:1.5;color:' + (last ? 'var(--ink)' : 'var(--muted)'),
                      )}
                    >
                      {phase}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* --- Statement banner --- */}
      <section
        aria-labelledby="bn-h"
        style={css(
          'position:relative;overflow:clip;min-height:clamp(440px,60vh,620px);display:flex;' +
            'align-items:center;background:#041815',
        )}
      >
        <span
          ref={bannerPlateRef}
          aria-hidden="true"
          style={css(
            'position:absolute;inset:-10% 0;background-image:url("' +
              plates.bladeSplit +
              '");background-size:cover;background-position:center;will-change:transform',
          )}
        />
        <span
          aria-hidden="true"
          style={css(
            'position:absolute;inset:0;background:linear-gradient(to top,rgba(4,24,21,.92) 0%,' +
              'rgba(4,24,21,.66) 48%,rgba(4,24,21,.3) 100%)',
          )}
        />
        <div
          style={css(
            'position:relative;width:100%;max-width:1200px;margin:0 auto;' +
              'padding:clamp(48px,7vw,92px) clamp(16px,3vw,32px);text-align:center',
          )}
        >
          <h2 id="bn-h" data-sc="" style={css(bannerH)}>
            {t.bannerH}
          </h2>
          <p
            data-sc=""
            style={css(
              'margin:20px auto clamp(28px,3.4vw,40px);max-width:62ch;font-weight:300;' +
                'font-size:clamp(16px,1.7vw,18px);line-height:1.62;color:rgba(255,255,255,.86)',
            )}
          >
            {t.bannerBody}
          </p>
          <Link
            data-sc=""
            href={routes.contact}
            className="sp-lift"
            style={css(
              'box-sizing:border-box;display:inline-flex;align-items:center;gap:10px;height:54px;padding:0 32px;' +
                'border-radius:999px;background:#ffffff;color:#041815;font-size:15px;font-weight:500;' +
                'text-decoration:none;--lift-sh:0 18px 38px rgba(4,24,21,.44);' +
                'transition:transform .2s cubic-bezier(.2,.7,.3,1),box-shadow .2s',
            )}
          >
            {t.cta}
          </Link>
        </div>
      </section>

      {/* --- Stakeholders --- */}
      <section id="stakeholders" aria-labelledby="sk-h" style={css('background:var(--page)')}>
        <div
          data-split=""
          style={css('max-width:1200px;margin:0 auto;padding:clamp(56px,8vw,104px) clamp(16px,3vw,32px)')}
        >
          <div>
            <h2 id="sk-h" data-sc="" style={css(h2)}>
              {t.stakeH}
            </h2>
            <p
              data-sc=""
              style={css(
                'margin:18px 0 0;max-width:42ch;font-weight:300;font-size:16px;line-height:1.62;color:var(--muted)',
              )}
            >
              {t.stakeLead}
            </p>
          </div>
          <div style={css('border-block-start:1px solid var(--line2)')}>
            {t.stakeholders.map(([who, value], i) => (
              <div
                key={who}
                data-stakerow={i}
                data-sc=""
                data-stagger=""
                style={cssWith(
                  'position:relative;display:grid;grid-template-columns:auto minmax(0,.8fr) minmax(0,1.1fr);' +
                    'gap:16px;align-items:baseline;padding:18px 0;border-block-end:1px solid var(--line);' +
                    'transition:background .28s cubic-bezier(.2,.7,.3,1),' +
                    'padding-inline-start .28s cubic-bezier(.2,.7,.3,1)',
                  vars({ '--i': i }),
                )}
              >
                <span
                  data-stakebar=""
                  aria-hidden="true"
                  style={css(
                    'position:absolute;inset-block:0;inset-inline-start:0;width:2px;background:#dc4b1c;' +
                      'transform:scaleY(0);transform-origin:center',
                  )}
                />
                <span
                  data-stakeno=""
                  style={css(
                    "font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--muted);transition:color .28s",
                  )}
                >
                  {ordinal(i)}
                </span>
                <span
                  style={css(
                    "font-family:'Sora',sans-serif;font-weight:600;font-size:clamp(15px,1.7vw,18px);color:var(--ink)",
                  )}
                >
                  {who}
                </span>
                <span style={css('font-size:15px;line-height:1.5;color:var(--muted)')}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </PageShell>
  )
}
