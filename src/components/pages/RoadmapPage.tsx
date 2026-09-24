'use client'

import { PageMasthead } from '@/components/PageMasthead'
import { PageShell } from '@/components/PageShell'
import { SiteCta } from '@/components/SiteCta'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { ROADMAP } from '@/lib/content/roadmap'
import { css, cssWith, vars } from '@/lib/css'
import { pagePlates } from '@/lib/media'
import { useSite } from '@/lib/site'
import { ACCENT, h2Style, ordinal } from '@/lib/typography'

export function RoadmapPage() {
  const { lang, ar } = useSite()
  const t = ROADMAP[lang]

  const h2 = h2Style(ar)
  const h2OnBrand = h2Style(ar, '#ffffff')

  return (
    <PageShell page="roadmap" counterDuration={1400}>
      <SiteHeader active="roadmap" />

      <PageMasthead
        crumbLabel={t.crumbLabel}
        homeLabel={t.home}
        current={t.navRoadmap}
        title={t.roadmapH}
        lead={t.roadLead}
        plate={pagePlates.roadmap.masthead}
      />

      {/* --- Phases --- */}
      <section aria-labelledby="rd-h" style={css('background:var(--page)')}>
        <div
          style={css('max-width:1200px;margin:0 auto;padding:clamp(56px,8vw,96px) clamp(16px,3vw,32px)')}
        >
          <h2 id="rd-h" data-sc="" style={css(h2)}>
            {t.phasesH}
          </h2>
          <div data-cols="4" style={css('margin-block-start:clamp(32px,4vw,52px)')}>
            {t.roadmap.map(([year, phase], i) => {
              const last = i === 3
              return (
                <div
                  key={year}
                  data-sc=""
                  data-stagger=""
                  style={cssWith(
                    'display:flex;flex-direction:column;gap:16px;padding-block-start:20px;' +
                      'border-block-start:2px solid ' +
                      (last ? ACCENT : 'var(--line2)'),
                    vars({ '--i': i }),
                  )}
                >
                  <span
                    aria-hidden="true"
                    style={css(
                      'display:block;width:' +
                        (last ? '44px' : '22px') +
                        ';height:10px;border-radius:999px;background:' +
                        (last ? ACCENT : 'var(--muted)') +
                        ';opacity:' +
                        (last ? '1' : '.5'),
                    )}
                  />
                  <span
                    style={css(
                      "font-family:'IBM Plex Mono',monospace;font-size:clamp(15px,1.8vw,19px);" +
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
      </section>

      {/* --- 2030 targets --- */}
      <section aria-labelledby="kp-h" data-tone="dark" style={css('background:#062621;color:#ffffff')}>
        <div
          style={css('max-width:1200px;margin:0 auto;padding:clamp(56px,8vw,96px) clamp(16px,3vw,32px)')}
        >
          <h2 id="kp-h" data-sc="" style={css(h2OnBrand)}>
            {t.kpiH}
          </h2>
          <p
            data-sc=""
            style={css(
              'margin:18px 0 clamp(34px,4vw,56px);max-width:56ch;font-weight:300;' +
                'font-size:clamp(16px,1.7vw,18px);line-height:1.62;color:rgba(255,255,255,.74)',
            )}
          >
            {t.kpiNote}
          </p>

          <div data-cols="5">
            {t.kpis.map(([value, kpiLabel, unit], i) => {
              // The investment portfolio is the figure the page is built around, so it alone
              // carries the ember.
              const lead = i === 1
              const numeric = /^([\d.]+)(.*)$/.exec(value)
              return (
                <div
                  key={kpiLabel}
                  data-sc=""
                  data-stagger=""
                  style={cssWith(
                    'display:flex;flex-direction:column;gap:14px;padding-block-start:20px;' +
                      'border-block-start:1px solid rgba(255,255,255,.18)',
                    vars({ '--i': i }),
                  )}
                >
                  <span
                    style={css(
                      "font-family:'IBM Plex Mono',monospace;font-size:11px;color:rgba(255,255,255,.62)",
                    )}
                  >
                    {ordinal(i)}
                  </span>
                  <div style={css('display:flex;align-items:baseline;gap:8px;flex-wrap:wrap')}>
                    <span
                      data-count={numeric?.[1] ?? ''}
                      data-suffix={numeric?.[2] ?? ''}
                      style={css(
                        "font-family:'Sora',sans-serif;font-weight:300;font-size:clamp(40px,5vw,64px);" +
                          'line-height:1;letter-spacing:-.03em;font-variant-numeric:tabular-nums;color:' +
                          (lead ? ACCENT : '#ffffff'),
                      )}
                    >
                      {value}
                    </span>
                    <span
                      data-lbl=""
                      style={css(
                        "font-family:'IBM Plex Mono',monospace;font-size:12px;color:rgba(255,255,255,.62)",
                      )}
                    >
                      {unit}
                    </span>
                  </div>
                  <span
                    aria-hidden="true"
                    style={css(
                      'width:28px;height:3px;background:' + (lead ? ACCENT : 'rgba(255,255,255,.34)'),
                    )}
                  />
                  <span
                    data-lbl=""
                    style={css(
                      'font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.74)',
                    )}
                  >
                    {kpiLabel}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <SiteCta page="roadmap" />
      <SiteFooter />
    </PageShell>
  )
}
