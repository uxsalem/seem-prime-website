'use client'

import Link from 'next/link'
import { ImageSlot } from '@/components/ImageSlot'
import { ECOSYSTEM, ECOSYSTEM_IDS } from '@/lib/content/ecosystem'
import { css, cssWith, vars } from '@/lib/css'
import { chapters, EMAIL, PHONE_DISPLAY, PHONE_HREF, routes } from '@/lib/routes'
import { useSite } from '@/lib/site'
import { display, ordinal } from '@/lib/typography'

/** Seats for the partners' marks, in two rows of three. */
const PLATES = [0, 1, 2, 3, 4, 5]

/**
 * Chapter six, and the close: the door. After the long dark model the page comes out into the
 * light for its one call to action, set beside the plates the partners' marks will fill — the
 * model's floors were the platforms; these are the partnerships that build them. The plates keep
 * their captioned empty state until the logos are supplied.
 */
export function EcosystemClose() {
  const { lang, ar, arrow, theme } = useSite()
  const t = ECOSYSTEM[lang]

  return (
    <section
      id={ECOSYSTEM_IDS.close}
      aria-labelledby="bw-h"
      style={css('position:relative;background:var(--page)')}
    >
      <div
        style={css(
          'max-width:1400px;margin:0 auto;padding:clamp(96px,12vw,170px) clamp(16px,3vw,32px) clamp(88px,11vw,150px)',
        )}
      >
        <div data-eco-close="">
          <div>
            <h2
              id="bw-h"
              data-sc="rise"
              style={css(
                'margin:0;max-width:14ch;' +
                  display(ar, ar ? 'clamp(36px,5vw,78px)' : 'clamp(38px,5.2vw,82px)') +
                  ';color:var(--ink);text-wrap:balance',
              )}
            >
              {t.closeH}
            </h2>
            <p
              data-sc=""
              style={css(
                'margin:clamp(20px,2.6vw,30px) 0 clamp(30px,4vw,44px);max-width:46ch;font-weight:300;' +
                  'font-size:clamp(16px,1.6vw,19px);line-height:1.62;color:var(--body)',
              )}
            >
              {t.closeBody}
            </p>
            <div data-sc="" style={css('display:flex;flex-wrap:wrap;align-items:center;gap:14px 26px')}>
              {/* Ink on the page: dark green in the light theme, white in the dark one, so its sheen follows. */}
              <Link
                href={routes.contact}
                className="sp-lift sp-sheen"
                data-solid={theme === 'dark' ? '' : undefined}
                style={css(
                  'box-sizing:border-box;display:inline-flex;align-items:center;gap:12px;height:56px;padding:0 32px;' +
                    'border-radius:999px;background:var(--ink);color:var(--page);font-size:15px;font-weight:600;' +
                    'text-decoration:none;--lift-sh:0 20px 42px rgba(4,24,21,.28);' +
                    'transition:transform .2s cubic-bezier(.2,.7,.3,1),box-shadow .2s',
                )}
              >
                {t.cta}
                <span aria-hidden="true">{arrow}</span>
              </Link>
              <Link
                href={chapters.model}
                className="sp-nav"
                style={css('position:relative;padding-block:6px;font-size:15px;font-weight:500;color:var(--ink);text-decoration:none')}
              >
                {t.second}
              </Link>
            </div>
            <div
              data-sc=""
              style={css(
                'display:flex;flex-wrap:wrap;gap:12px clamp(18px,3vw,34px);margin-block-start:clamp(36px,5vw,56px);' +
                  'padding-block-start:20px;border-block-start:1px solid var(--line2);' +
                  "font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.04em;color:var(--muted)",
              )}
            >
              <a href={`mailto:${EMAIL}`} className="sp-op" style={css('color:var(--ink);text-decoration:none;opacity:.82')}>
                {EMAIL}
              </a>
              <a href={PHONE_HREF} className="sp-op" style={css('color:var(--ink);text-decoration:none;opacity:.82')}>
                <span dir="ltr">{PHONE_DISPLAY}</span>
              </a>
              <span data-lbl="">{t.address}</span>
            </div>
          </div>

          <div data-partners="">
            <p
              data-sc=""
              data-lbl=""
              style={css(
                "margin:0;font-family:'Sora',sans-serif;font-size:11px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(--muted)",
              )}
            >
              {t.partnersLine}
            </p>
            <ol data-plates="">
              {PLATES.map((i) => (
                <li key={i} data-sc="" data-stagger="" style={cssWith('', vars({ '--i': i }))}>
                  <span style={css("font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.06em;color:var(--muted)")}>
                    {ordinal(i)}
                  </span>
                  <span data-plate="">
                    <ImageSlot placeholder={t.logoPh} fit="contain" />
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
