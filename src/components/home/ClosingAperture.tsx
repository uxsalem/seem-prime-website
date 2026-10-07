'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { ImageSlot } from '@/components/ImageSlot'
import { Mark } from '@/components/Mark'
import { HOME } from '@/lib/content/home'
import { css } from '@/lib/css'
import { reduceMotion, useScrollDriver } from '@/lib/hooks'
import { homeClosing } from '@/lib/media'
import { EMAIL, PHONE_DISPLAY, PHONE_HREF, routes } from '@/lib/routes'
import { useSite } from '@/lib/site'
import { display } from '@/lib/typography'

const clamp01 = (n: number) => Math.max(0, Math.min(1, n))

/**
 * The close. The page opened by widening the SEEM square into the frame; it ends on the same
 * square, a window that opens as it arrives, beside the one line the whole page argues for. It
 * follows the SEEM stages on the same green, so a hairline across the measure marks where the
 * stages end.
 */
export function ClosingAperture() {
  const { lang, ar, arrow } = useSite()
  const t = HOME[lang]
  const winRef = useRef<HTMLDivElement>(null)

  useScrollDriver({
    onFrame: () => {
      const win = winRef.current
      if (!win) return
      const inner = win.querySelector<HTMLElement>('[data-cl-img]')
      if (reduceMotion()) {
        win.style.clipPath = ''
        if (inner) inner.style.transform = ''
        return
      }
      const vh = window.innerHeight || 800
      const r = win.getBoundingClientRect()
      const p = clamp01((vh - r.top) / (vh * 0.8))
      const inset = (1 - p) * 26
      win.style.clipPath = 'inset(' + inset.toFixed(2) + '% ' + inset.toFixed(2) + '% ' + inset.toFixed(2) + '% ' + inset.toFixed(2) + '%)'
      if (inner) inner.style.transform = 'scale(' + (1.22 - 0.22 * p).toFixed(4) + ')'
    },
  })

  return (
    <section aria-labelledby="cl-h" data-tone="dark" style={css('position:relative;overflow:clip;background:#041815;color:#ffffff')}>
      <div aria-hidden="true" style={css('max-width:1400px;margin:0 auto;padding:0 clamp(16px,3vw,32px)')}>
        <span style={css('display:block;height:1px;background:rgba(255,255,255,.14)')} />
      </div>
      <div
        data-closing=""
        style={css('max-width:1400px;margin:0 auto;padding:clamp(72px,9vw,124px) clamp(16px,3vw,32px) clamp(96px,12vw,170px)')}
      >
        <div style={css('display:flex;flex-direction:column;justify-content:center')}>
          <span aria-hidden="true" style={css('display:block;color:rgba(255,255,255,.9);margin-block-end:clamp(26px,3.4vw,40px)')}>
            <Mark size={44} />
          </span>
          <h2
            id="cl-h"
            data-sc="rise"
            style={css('margin:0;max-width:15ch;' + display(ar, ar ? 'clamp(34px,4.8vw,74px)' : 'clamp(36px,5vw,78px)') + ';color:#ffffff')}
          >
            {t.bannerH}
          </h2>
          <p
            data-sc=""
            style={css(
              'margin:clamp(20px,2.6vw,30px) 0 clamp(30px,4vw,44px);max-width:46ch;font-weight:300;' +
                'font-size:clamp(16px,1.6vw,19px);line-height:1.62;color:rgba(255,255,255,.78)',
            )}
          >
            {t.bannerBody}
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
              {t.exploreCta}
            </Link>
          </div>
          <div
            data-sc=""
            style={css(
              'display:flex;flex-wrap:wrap;gap:12px clamp(18px,3vw,34px);margin-block-start:clamp(36px,5vw,60px);' +
                'padding-block-start:20px;border-block-start:1px solid rgba(255,255,255,.18);' +
                "font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.04em",
            )}
          >
            <a href={`mailto:${EMAIL}`} className="sp-op" style={css('color:#ffffff;text-decoration:none;opacity:.82')}>
              {EMAIL}
            </a>
            <a href={PHONE_HREF} className="sp-op" style={css('color:#ffffff;text-decoration:none;opacity:.82')}>
              <span dir="ltr">{PHONE_DISPLAY}</span>
            </a>
          </div>
        </div>

        <div ref={winRef} data-cl-win="" aria-hidden="true">
          <span data-cl-img="" style={css('position:absolute;inset:0;will-change:transform')}>
            <ImageSlot frame={homeClosing} alt="" placeholder="" size="md" sizes="(min-width: 1000px) 44vw, 100vw" />
          </span>
        </div>
      </div>
    </section>
  )
}
