'use client'

import Link from 'next/link'
import { STRATEGY } from '@/lib/content/strategy'
import { css, cssWith, vars } from '@/lib/css'
import { EMAIL, PHONE_DISPLAY, PHONE_HREF, routes } from '@/lib/routes'
import { useSite } from '@/lib/site'
import { BRONZE, display } from '@/lib/typography'

/** Every wheel carries the figures twice, so each one spins a full turn before it settles. */
const FACES = Array.from({ length: 20 }, (_, k) => String(k % 10))

/**
 * Chapter six, and the close: what 2030 is measured by. The counter above landed on the year;
 * here each target is a counter of its own, its wheels spinning a full turn and settling on the
 * figure as it arrives — the place values last and slowest, the way a register comes to rest.
 * Nothing counts through invented intermediate values: the wheels only ever show whole figures
 * in passing, and the target is written out in full for assistive technology.
 *
 * Below them, the page's one call to action.
 */
export function Targets2030() {
  const { lang, ar, arrow } = useSite()
  const t = STRATEGY[lang]

  return (
    <section
      id="targets"
      aria-labelledby="tg-h"
      data-tone="dark"
      style={css('position:relative;overflow:clip;background:#041815;color:#ffffff')}
    >
      <div
        style={css(
          'max-width:1400px;margin:0 auto;padding:clamp(96px,12vw,170px) clamp(16px,3vw,32px) clamp(64px,8vw,110px)',
        )}
      >
        <div data-tg-head="">
          <h2
            id="tg-h"
            data-sc="rise"
            style={css(
              'margin:0;max-width:16ch;' +
                display(ar, ar ? 'clamp(34px,4.6vw,70px)' : 'clamp(36px,4.8vw,74px)') +
                ';color:#ffffff;text-wrap:balance',
            )}
          >
            {t.kpiH}
          </h2>
          <p
            data-sc=""
            style={css(
              'margin:0;max-width:36ch;font-weight:300;font-size:clamp(16px,1.6vw,19px);line-height:1.62;color:rgba(255,255,255,.76)',
            )}
          >
            {t.kpiNote}
          </p>
        </div>

        <ol data-tg-list="">
          {t.kpis.map(([value, label, unit], i) => {
            const [, digits = value, suffix = ''] = /^(\d+)(.*)$/.exec(value) ?? []
            return (
              <li key={label} data-tg="" data-sc="" data-stagger="" style={cssWith('', vars({ '--i': i }))}>
                <span data-sr="">{[value, unit, label].filter(Boolean).join(' ')}</span>
                <span data-tg-figure="" aria-hidden="true" dir="ltr">
                  {digits.split('').map((d, j) => (
                    <span key={j} data-tg-wheel="">
                      <span
                        data-tg-strip=""
                        style={cssWith(
                          '',
                          vars({ '--to': 10 + Number(d), '--j': digits.length - 1 - j }),
                        )}
                      >
                        {FACES.map((face, k) => (
                          <span key={k}>{face}</span>
                        ))}
                      </span>
                    </span>
                  ))}
                  {suffix ? <span data-tg-suffix="">{suffix}</span> : null}
                </span>
                <span data-tg-rule="" aria-hidden="true" />
                <span aria-hidden="true" style={css('display:flex;flex-direction:column;gap:4px')}>
                  {unit ? (
                    <span data-lbl="" style={css("font-family:'IBM Plex Mono',monospace;font-size:12px;color:" + BRONZE)}>
                      {unit}
                    </span>
                  ) : null}
                  <span style={css('font-size:15px;line-height:1.45;color:rgba(255,255,255,.84)')}>{label}</span>
                </span>
              </li>
            )
          })}
        </ol>

        {/* The close: the page's one call to action, under the figures it is asking the reader to share. */}
        <div data-tg-close="">
          <h2
            data-sc="rise"
            style={css(
              'margin:0;max-width:15ch;' +
                display(ar, ar ? 'clamp(34px,4.8vw,74px)' : 'clamp(36px,5vw,78px)') +
                ';color:#ffffff;text-wrap:balance',
            )}
          >
            {t.closeH}
          </h2>
          <div>
            <p
              data-sc=""
              style={css(
                'margin:0 0 clamp(28px,3.6vw,40px);max-width:46ch;font-weight:300;font-size:clamp(16px,1.6vw,19px);line-height:1.62;color:rgba(255,255,255,.78)',
              )}
            >
              {t.closeBody}
            </p>
            <div data-sc="" style={css('display:flex;flex-wrap:wrap;align-items:center;gap:14px 26px')}>
              <Link
                href={routes.contact}
                className="sp-lift sp-sheen"
                data-solid=""
                style={css(
                  'box-sizing:border-box;display:inline-flex;align-items:center;gap:12px;height:56px;padding:0 32px;' +
                    'border-radius:999px;background:#ffffff;color:#041815;font-size:15px;font-weight:600;text-decoration:none;' +
                    '--lift-sh:0 20px 42px rgba(0,0,0,.4);transition:transform .2s cubic-bezier(.2,.7,.3,1),box-shadow .2s',
                )}
              >
                {t.cta}
                <span aria-hidden="true">{arrow}</span>
              </Link>
              <Link
                href={routes.ecosystem}
                className="sp-nav"
                style={css('position:relative;padding-block:6px;font-size:15px;font-weight:500;color:#ffffff;text-decoration:none')}
              >
                {t.second}
              </Link>
            </div>
            <div
              data-sc=""
              style={css(
                'display:flex;flex-wrap:wrap;gap:12px clamp(18px,3vw,34px);margin-block-start:clamp(36px,5vw,56px);' +
                  'padding-block-start:20px;border-block-start:1px solid rgba(255,255,255,.18);' +
                  "font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.04em;color:rgba(255,255,255,.72)",
              )}
            >
              <a href={`mailto:${EMAIL}`} className="sp-op" style={css('color:#ffffff;text-decoration:none;opacity:.82')}>
                {EMAIL}
              </a>
              <a href={PHONE_HREF} className="sp-op" style={css('color:#ffffff;text-decoration:none;opacity:.82')}>
                <span dir="ltr">{PHONE_DISPLAY}</span>
              </a>
              <span data-lbl="">{t.address}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
