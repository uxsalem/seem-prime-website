'use client'

import { ImageSlot } from '@/components/ImageSlot'
import { PageMasthead } from '@/components/PageMasthead'
import { PageShell } from '@/components/PageShell'
import { SiteCta } from '@/components/SiteCta'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { ABOUT, GALLERY_FRAMES } from '@/lib/content/about'
import { css, cssWith, vars } from '@/lib/css'
import { pagePlates } from '@/lib/media'
import { useSite } from '@/lib/site'
import { ACCENT, capStyle, dispFont, h2Style, ordinal } from '@/lib/typography'

const GALLERY_AREAS = ['a', 'b', 'c']
const GALLERY_HEIGHTS = ['clamp(320px,40vw,460px)', 'clamp(180px,20vw,214px)', 'clamp(180px,20vw,214px)']

/**
 * Registration brackets quote the stamp's clear space. Physical corners — not logical ones —
 * keep the four marks symmetrical in both reading directions.
 */
const REG_TICKS = [
  'top:-9px;left:-9px;border-top-width:1px;border-left-width:1px',
  'top:-9px;right:-9px;border-top-width:1px;border-right-width:1px',
  'bottom:-9px;left:-9px;border-bottom-width:1px;border-left-width:1px',
  'bottom:-9px;right:-9px;border-bottom-width:1px;border-right-width:1px',
]

export function AboutPage() {
  const { lang, ar } = useSite()
  const t = ABOUT[lang]

  const disp = dispFont(ar)
  const cap = capStyle(ar)
  const h2 = h2Style(ar)
  const h2OnBrand = h2Style(ar, '#ffffff')

  return (
    <PageShell page="about">
      <SiteHeader active="about" />

      <PageMasthead
        crumbLabel={t.crumbLabel}
        homeLabel={t.home}
        current={t.navAbout}
        title={t.positioning}
        lead={t.aboutLead}
        leadWidth="56ch"
        plate={pagePlates.about.masthead}
      />

      {/* --- Story --- */}
      <section aria-labelledby="st-h" style={css('background:var(--page)')}>
        <div
          data-split=""
          style={css(
            'max-width:1200px;margin:0 auto;padding:clamp(56px,8vw,96px) clamp(16px,3vw,32px);align-items:stretch',
          )}
        >
          <div style={css('display:flex;flex-direction:column')}>
            <h2 id="st-h" data-sc="" style={css(h2)}>
              {t.storyH}
            </h2>
            <p
              data-sc=""
              style={css(
                'margin:18px 0 0;max-width:58ch;font-weight:300;font-size:clamp(16px,1.7vw,18px);' +
                  'line-height:1.62;color:var(--body)',
              )}
            >
              {t.aboutBody}
            </p>
            <div
              data-sc=""
              style={css(
                'display:flex;flex-wrap:wrap;gap:clamp(20px,3vw,44px);margin-block-start:auto;' +
                  'padding-block-start:clamp(28px,4vw,44px)',
              )}
            >
              <div
                style={css(
                  'display:flex;flex-direction:column;gap:6px;padding-block-start:14px;' +
                    'border-block-start:2px solid var(--ink)',
                )}
              >
                <span data-lbl="" style={css(cap)}>
                  {t.metaEst}
                </span>
                <span style={css('font-size:14px;color:var(--ink)')}>{t.metaCity}</span>
              </div>
              <div
                style={css(
                  'display:flex;flex-direction:column;gap:6px;padding-block-start:14px;' +
                    'border-block-start:2px solid #dc4b1c',
                )}
              >
                <span data-lbl="" style={css(cap)}>
                  {t.kpiH}
                </span>
                <span style={css('font-size:14px;color:var(--ink)')}>{t.targetLine}</span>
              </div>
            </div>
          </div>

          <div
            data-sc="x"
            style={css(
              'position:relative;overflow:clip;border-start-end-radius:clamp(28px,5vw,44px);' +
                'background:linear-gradient(160deg,#0c3e3d 0%,#062621 58%,#041815 100%);' +
                'box-shadow:0 24px 56px rgba(4,24,21,.18)',
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

      {/* --- Corporate values --- */}
      <section aria-labelledby="vl-h" data-tone="dark" style={css('background:#062621;color:#ffffff')}>
        <div
          style={css('max-width:1400px;margin:0 auto;padding:clamp(56px,8vw,110px) clamp(16px,3vw,32px)')}
        >
          <div
            style={css(
              'display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:20px;' +
                'margin-block-end:clamp(32px,4.4vw,58px)',
            )}
          >
            <div>
              <h2 id="vl-h" data-sc="" style={css(h2OnBrand)}>
                {t.valuesH}
              </h2>
            </div>
            <span
              data-lbl=""
              style={css(
                "font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.08em;color:rgba(255,255,255,.5)",
              )}
            >
              06 — 06
            </span>
          </div>

          <div data-sc="" style={css('position:relative')}>
            {REG_TICKS.map((tick, i) => (
              <span
                key={i}
                aria-hidden="true"
                style={css(
                  'position:absolute;width:16px;height:16px;border:0 solid ' + ACCENT + ';' + tick,
                )}
              />
            ))}
            <div
              data-vgrid6=""
              style={css('background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.16)')}
            >
              {t.values.map(([title, blurb], i) => (
                <div
                  key={title}
                  className="sp-value-cell"
                  style={css(
                    'position:relative;background:#062621;' +
                      'padding:clamp(30px,3.4vw,46px) clamp(24px,3vw,40px) clamp(24px,3vw,40px);' +
                      'display:flex;flex-direction:column;gap:clamp(14px,1.8vw,20px);' +
                      'transition:background .22s cubic-bezier(.2,.7,.3,1)',
                  )}
                >
                  <span
                    aria-hidden="true"
                    style={css(
                      'position:absolute;inset-block-start:0;inset-inline-start:0;width:44px;height:3px;' +
                        'background:rgba(255,255,255,.34)',
                    )}
                  />
                  <span
                    style={css(
                      "font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.06em;color:rgba(255,255,255,.5)",
                    )}
                  >
                    {ordinal(i)}
                  </span>
                  <h3
                    style={css(
                      'margin:0;font-family:' +
                        disp +
                        ';font-weight:600;font-size:clamp(17px,2vw,22px);line-height:' +
                        (ar ? '1.35' : '1.2') +
                        ';color:#ffffff',
                    )}
                  >
                    {title}
                  </h3>
                  <p style={css('margin:0;font-size:15px;line-height:1.62;color:rgba(255,255,255,.72)')}>
                    {blurb}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- Stakeholders --- */}
      <section aria-labelledby="sk-h" style={css('background:var(--page)')}>
        <div
          data-split=""
          style={css('max-width:1200px;margin:0 auto;padding:clamp(56px,8vw,96px) clamp(16px,3vw,32px)')}
        >
          <div>
            <h2 id="sk-h" data-sc="" style={css(h2)}>
              {t.stakeH}
            </h2>
            <p
              data-sc=""
              style={css(
                'margin:18px 0 0;max-width:44ch;font-weight:300;font-size:16px;line-height:1.62;color:var(--muted)',
              )}
            >
              {t.stakeLead}
            </p>
          </div>
          <div style={css('border-block-start:1px solid var(--line2)')}>
            {t.stakeholders.map(([who, value], i) => (
              <div
                key={who}
                data-sc=""
                data-stagger=""
                style={cssWith(
                  'display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:16px;' +
                    'align-items:baseline;padding:18px 0;border-block-end:1px solid var(--line)',
                  vars({ '--i': i }),
                )}
              >
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

      {/* --- Gallery --- */}
      <section aria-labelledby="gl-h" style={css('background:var(--sunken)')}>
        <div
          style={css('max-width:1400px;margin:0 auto;padding:clamp(56px,8vw,96px) clamp(16px,3vw,32px)')}
        >
          <h2 id="gl-h" data-sc="" style={css(h2)}>
            {t.galH}
          </h2>
          <p
            data-sc=""
            style={css(
              'margin:18px 0 clamp(28px,3.4vw,40px);max-width:58ch;font-weight:300;' +
                'font-size:clamp(16px,1.7vw,18px);line-height:1.62;color:var(--body)',
            )}
          >
            {t.galBody}
          </p>
          <div data-gal="">
            {t.gallery.map(([meta, title, placeholder], i) => (
              <figure
                key={title}
                data-sc=""
                data-stagger=""
                style={cssWith(
                  'grid-area:' + GALLERY_AREAS[i] + ';margin:0;display:flex;flex-direction:column;gap:12px',
                  vars({ '--i': i }),
                )}
              >
                <div
                  data-sc="mask"
                  className="sp-zoom"
                  style={css(
                    'position:relative;flex:1 1 auto;min-height:' +
                      GALLERY_HEIGHTS[i] +
                      ';overflow:clip;background:var(--card);border:1px solid var(--line)',
                  )}
                >
                  <ImageSlot
                    frame={GALLERY_FRAMES[i]}
                    alt={title}
                    placeholder={placeholder}
                    size={i === 0 ? 'full' : 'sm'}
                  />
                  <span
                    aria-hidden="true"
                    style={css(
                      'position:absolute;inset-block-end:0;inset-inline-start:0;width:56px;height:3px;background:#dc4b1c',
                    )}
                  />
                </div>
                <figcaption style={css('display:flex;flex-wrap:wrap;align-items:baseline;gap:12px')}>
                  <span data-lbl="" style={css(cap)}>
                    {meta}
                  </span>
                  <span style={css('font-size:15px;color:var(--ink)')}>{title}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <SiteCta page="about" />
      <SiteFooter />
    </PageShell>
  )
}
