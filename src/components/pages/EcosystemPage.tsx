'use client'

import Link from 'next/link'
import { ImageSlot } from '@/components/ImageSlot'
import { PageMasthead } from '@/components/PageMasthead'
import { PageShell } from '@/components/PageShell'
import { SiteCta } from '@/components/SiteCta'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { ECOSYSTEM } from '@/lib/content/ecosystem'
import { css, cssWith, vars } from '@/lib/css'
import { routes } from '@/lib/routes'
import { useSite } from '@/lib/site'
import { dispFont, lbl, ordinal } from '@/lib/typography'

const PARTNER_SLOTS = [0, 1, 2, 3, 4]

export function EcosystemPage() {
  const { lang, ar, arrow } = useSite()
  const t = ECOSYSTEM[lang]

  const disp = dispFont(ar)
  const label = lbl(ar)

  return (
    <PageShell page="ecosystem">
      <SiteHeader active="ecosystem" />

      <PageMasthead
        crumbLabel={t.crumbLabel}
        homeLabel={t.home}
        current={t.navEcosystem}
        title={t.ecosystemH}
        lead={t.ecosystemLead}
      >
        <div
          data-sc=""
          style={css(
            'display:flex;flex-wrap:wrap;gap:clamp(14px,2.4vw,34px);margin-block-start:clamp(30px,4vw,48px);' +
              'padding-block-start:22px;border-block-start:1px solid rgba(255,255,255,.18)',
          )}
        >
          {t.platforms.map(([, name], i) => (
            <span
              key={name}
              style={css(
                "display:flex;align-items:baseline;gap:8px;font-family:'IBM Plex Mono',monospace;" +
                  'font-size:12px;color:rgba(255,255,255,.62)',
              )}
            >
              <span style={css('color:#dc4b1c')}>{ordinal(i)}</span>
              <span style={css("font-family:'Sora',sans-serif;font-size:14px;color:#ffffff")}>{name}</span>
            </span>
          ))}
        </div>
      </PageMasthead>

      {/* --- Platforms --- */}
      <section aria-label={t.ecosystemH} style={css('background:var(--page)')}>
        <div
          style={css(
            'max-width:1200px;margin:0 auto;padding:clamp(56px,8vw,96px) clamp(16px,3vw,32px);' +
              'display:flex;flex-direction:column;gap:clamp(44px,6vw,86px)',
          )}
        >
          {t.platforms.map(([sector, name, blurb], i) => (
            <article key={name} data-eco="" data-flip={i % 2 === 1 ? '1' : '0'}>
              <div
                data-art=""
                data-sc="x"
                style={css(
                  'position:relative;aspect-ratio:16/10;overflow:clip;background:var(--sunken);' +
                    'border:1px solid var(--line)',
                )}
              >
                <ImageSlot placeholder={t.platformPh[i]} />
                <span
                  aria-hidden="true"
                  style={css(
                    'position:absolute;inset-block-end:0;inset-inline-start:0;width:64px;height:3px;background:#dc4b1c',
                  )}
                />
              </div>
              <div data-sc="" style={css('display:flex;flex-direction:column;gap:14px')}>
                <span
                  aria-hidden="true"
                  style={css(
                    "font-family:'Sora',sans-serif;font-weight:300;font-size:clamp(40px,5vw,64px);line-height:1;" +
                      'color:transparent;-webkit-text-stroke:1px var(--line3);letter-spacing:-.02em',
                  )}
                >
                  {ordinal(i)}
                </span>
                <span data-lbl="" style={css('font-family:' + disp + label + 'var(--muted)')}>
                  {sector}
                </span>
                <h2
                  style={css(
                    'margin:0;font-family:' +
                      disp +
                      ';font-weight:600;font-size:clamp(22px,2.8vw,32px);line-height:' +
                      (ar ? '1.32' : '1.18') +
                      ';letter-spacing:' +
                      (ar ? '0' : '-.01em') +
                      ';color:var(--ink)',
                  )}
                >
                  {name}
                </h2>
                <p
                  style={css(
                    'margin:0;max-width:48ch;font-weight:300;font-size:clamp(15px,1.6vw,17px);' +
                      'line-height:1.62;color:var(--body)',
                  )}
                >
                  {blurb}
                </p>
                <Link
                  href={routes.contact}
                  style={css(
                    'display:inline-flex;align-items:center;gap:8px;font-size:14px;font-weight:500;width:fit-content',
                  )}
                >
                  {t.ecoLink}
                  <span aria-hidden="true">{arrow}</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* --- Partners --- */}
      <section
        aria-label={t.partnersLine}
        style={css('background:var(--sunken);border-block:1px solid var(--line)')}
      >
        <div
          style={css(
            'max-width:1200px;margin:0 auto;padding:clamp(36px,5vw,60px) clamp(16px,3vw,32px);' +
              'display:flex;flex-direction:column;gap:24px',
          )}
        >
          <span
            data-sc=""
            data-lbl=""
            style={css('font-family:' + disp + label + 'var(--body)' + ';text-align:center')}
          >
            {t.partnersLine}
          </span>
          <div style={css('display:flex;flex-wrap:wrap;gap:16px')}>
            {PARTNER_SLOTS.map((i) => (
              <div
                key={i}
                data-sc=""
                data-stagger=""
                style={cssWith(
                  'position:relative;flex:1 1 150px;height:88px;background:var(--card);border:1px solid var(--line)',
                  vars({ '--i': i }),
                )}
              >
                <ImageSlot placeholder={t.logoPh} fit="contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteCta page="ecosystem" />
      <SiteFooter />
    </PageShell>
  )
}
