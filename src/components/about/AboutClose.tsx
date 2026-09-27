'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { ABOUT, JEDDAH } from '@/lib/content/about'
import { STRATEGY } from '@/lib/content/strategy'
import { css, cssWith, vars } from '@/lib/css'
import { reduceMotion, useScrollDriver } from '@/lib/hooks'
import { EMAIL, PHONE_DISPLAY, PHONE_HREF, routes } from '@/lib/routes'
import { useSite } from '@/lib/site'
import { BRONZE, display } from '@/lib/typography'

const clamp01 = (n: number) => Math.max(0, Math.min(1, n))
const span = (p: number, a: number, b: number) => clamp01((p - a) / (b - a))
const arch = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

/** Each ring's diameter, as a share of the drawing: the Kingdom, the region, and 2030 at the edge. */
const RINGS = [0.42, 0.71, 1]

/**
 * Chapter five, and the close: where the company stands and how far it means to reach. The
 * roadmap's phases are drawn as rings around one point — Jeddah, 2025 — widening to the
 * Kingdom, the region, and 2030 at the rim, with a slow ripple leaving the centre once they are
 * drawn. Beside it, the page's one call to action.
 */
export function AboutClose() {
  const { lang, ar, arrow } = useSite()
  const t = ABOUT[lang]
  const phases = STRATEGY[lang].roadmap
  const ringsRef = useRef<HTMLDivElement>(null)

  useScrollDriver({
    onFrame: () => {
      const box = ringsRef.current
      if (!box) return
      const vh = window.innerHeight || 800
      const r = box.getBoundingClientRect()
      if (r.bottom < -vh || r.top > vh * 1.5) return
      const p = reduceMotion() ? 1 : clamp01((vh * 0.92 - r.top) / (vh * 0.62))
      box.style.setProperty('--core', span(p, 0, 0.2).toFixed(3))
      box.querySelectorAll<HTMLElement>('[data-ring]').forEach((ring, k) => {
        ring.style.setProperty('--s', (0.18 + 0.82 * arch(span(p, 0.08 + 0.16 * k, 0.5 + 0.16 * k))).toFixed(4))
        ring.style.setProperty('--o', span(p, 0.08 + 0.16 * k, 0.3 + 0.16 * k).toFixed(3))
      })
      box.querySelectorAll<HTMLElement>('[data-ring-label]').forEach((label, k) => {
        label.style.opacity = span(p, 0.36 + 0.16 * k, 0.56 + 0.16 * k).toFixed(3)
      })
      box.toggleAttribute('data-live', p >= 1)
    },
  })

  return (
    <section
      id="reach"
      aria-labelledby="rc-h"
      data-tone="dark"
      style={css('position:relative;overflow:clip;background:#041815;color:#ffffff')}
    >
      <div data-reach="" style={css('max-width:1400px;margin:0 auto;padding:clamp(96px,12vw,170px) clamp(16px,3vw,32px)')}>
        <div style={css('display:flex;flex-direction:column;justify-content:center')}>
          <h2
            id="rc-h"
            data-sc="rise"
            style={css(
              'margin:0;max-width:15ch;' +
                display(ar, ar ? 'clamp(34px,4.8vw,74px)' : 'clamp(36px,5vw,78px)') +
                ';color:#ffffff;text-wrap:balance',
            )}
          >
            {t.closeH}
          </h2>
          <p
            data-sc=""
            style={css(
              'margin:clamp(20px,2.6vw,30px) 0 clamp(30px,4vw,44px);max-width:46ch;font-weight:300;' +
                'font-size:clamp(16px,1.6vw,19px);line-height:1.62;color:rgba(255,255,255,.78)',
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
              'display:flex;flex-wrap:wrap;gap:12px clamp(18px,3vw,34px);margin-block-start:clamp(36px,5vw,60px);' +
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

        <div ref={ringsRef} data-rings="" role="img" aria-label={t.reachLabel}>
          <span data-rings-axis="" aria-hidden="true" />
          {RINGS.map((d, k) => (
            <span
              key={k}
              data-ring=""
              data-last={k === RINGS.length - 1 ? '' : undefined}
              aria-hidden="true"
              style={cssWith('', vars({ '--d': d }))}
            />
          ))}
          {[0, 1, 2].map((k) => (
            <span key={'pulse' + k} data-ring-pulse="" aria-hidden="true" style={cssWith('', vars({ '--k': k }))} />
          ))}
          {RINGS.map((d, k) => {
            const [year, phase] = phases[k + 1]
            return (
              <span
                key={'label' + k}
                data-ring-label=""
                aria-hidden="true"
                style={css('top:' + ((1 - d) * 50).toFixed(2) + '%')}
              >
                <span style={css("font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.06em;color:" + BRONZE)}>
                  {year}
                </span>
                <span style={css('font-size:13px;line-height:1.35;color:rgba(255,255,255,.86)')}>{phase}</span>
              </span>
            )
          })}
          <span data-ring-core="" aria-hidden="true">
            <span data-ring-dot="" />
            <span style={css('display:block;margin-block-start:14px;' + display(ar, ar ? '24px' : '22px', 400) + ';color:#ffffff')}>
              {t.city}
            </span>
            <span
              style={css(
                "display:block;margin-block-start:6px;font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.06em;color:" +
                  BRONZE,
              )}
            >
              {phases[0][0]} · {phases[0][1]}
            </span>
            <span
              dir="ltr"
              style={css(
                "display:block;margin-block-start:4px;font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.04em;color:rgba(255,255,255,.5)",
              )}
            >
              {JEDDAH}
            </span>
          </span>
        </div>
      </div>
    </section>
  )
}
