'use client'

import Link from 'next/link'
import { Plate } from '@/components/Plate'
import { css } from '@/lib/css'
import { pagePlates } from '@/lib/media'
import { EMAIL, PHONE_DISPLAY, PHONE_HREF, routes } from '@/lib/routes'
import { useSite } from '@/lib/site'
import { dispFont } from '@/lib/typography'

export type CtaPage = 'about' | 'model' | 'strategy' | 'ecosystem' | 'roadmap'

const CTA = {
  ar: {
    primary: 'تواصل معنا',
    body: 'نرحّب بالمستثمرين، والشركاء، والجهات الحكومية. أخبرنا بما تبحث عنه وسيتواصل معك فريقنا مباشرة.',
    city: 'جدة، المملكة العربية السعودية',
    lines: {
      about: 'ابنِ مع من يبني المنظومة',
      model: 'ضع منصتك داخل نموذج يعمل',
      strategy: 'شاركنا في المرحلة القادمة',
      ecosystem: 'هل تبحث عن شراكة أو استثمار؟',
      roadmap: 'كن جزءاً من الطريق حتى 2030',
    },
    second: {
      about: ['منظومتنا', routes.ecosystem],
      model: ['منصات المحفظة', routes.ecosystem],
      strategy: ['نموذج الأعمال', routes.model],
      ecosystem: ['نموذج الأعمال', routes.model],
      roadmap: ['الاستراتيجية', routes.strategy],
    },
  },
  en: {
    primary: 'Contact us',
    body: 'We welcome investors, partners and government entities. Tell us what you are looking for and our team will come back to you directly.',
    city: 'Jeddah, Saudi Arabia',
    lines: {
      about: 'Build with the people building the ecosystem',
      model: 'Put your platform inside a model that works',
      strategy: 'Join us for the next phase',
      ecosystem: 'Looking to partner or invest?',
      roadmap: 'Be part of the road to 2030',
    },
    second: {
      about: ['Our ecosystem', routes.ecosystem],
      model: ['Portfolio platforms', routes.ecosystem],
      strategy: ['Business model', routes.model],
      ecosystem: ['Business model', routes.model],
      roadmap: ['Strategy', routes.strategy],
    },
  },
} as const

export function SiteCta({ page }: { page: CtaPage }) {
  const { lang, ar, arrow } = useSite()
  const t = CTA[lang]

  const disp = dispFont(ar)
  const [secondLabel, secondHref] = t.second[page]

  return (
    <section
      aria-labelledby="cta-h"
      data-tone="dark"
      style={css(
        'position:relative;overflow:clip;display:flex;align-items:flex-end;' +
          'min-height:clamp(520px,78vh,820px);background:#041815;color:#ffffff',
      )}
    >
      <Plate frame={pagePlates[page].cta} scrim="close" depth={130} />
      <span
        aria-hidden="true"
        style={css('position:absolute;inset-block:0;inset-inline-end:0;width:3px;background:#dc4b1c')}
      />

      <div
        style={css(
          'position:relative;width:100%;max-width:1400px;margin:0 auto;' +
            'padding:clamp(96px,12vw,160px) clamp(16px,3vw,32px) clamp(52px,7vw,92px)',
        )}
      >
        <h2
          id="cta-h"
          data-sc="rise"
          style={css(
            'margin:0;max-width:20ch;font-family:' +
              disp +
              ';font-weight:' +
              (ar ? '600' : '300') +
              ';font-size:clamp(32px,4.8vw,72px);line-height:' +
              (ar ? '1.26' : '1.02') +
              ';letter-spacing:' +
              (ar ? '0' : '-.025em') +
              ';color:#ffffff;text-wrap:pretty',
          )}
        >
          {t.lines[page]}
        </h2>
        <p
          data-sc=""
          style={css(
            'margin:clamp(16px,2.2vw,24px) 0 clamp(30px,4vw,44px);max-width:56ch;font-weight:300;' +
              'font-size:clamp(16px,1.7vw,19px);line-height:1.62;color:rgba(255,255,255,.84)',
          )}
        >
          {t.body}
        </p>

        <div data-sc="" style={css('display:flex;flex-wrap:wrap;align-items:center;gap:14px')}>
          <Link
            href={routes.contact}
            className="sp-lift sp-sheen"
            data-solid=""
            style={css(
              'box-sizing:border-box;display:inline-flex;align-items:center;gap:12px;height:58px;padding:0 36px;' +
                'border-radius:999px;background:#ffffff;color:#041815;font-family:inherit;font-size:16px;' +
                'font-weight:600;text-decoration:none;box-shadow:0 12px 30px rgba(4,24,21,.32);' +
                '--lift-sh:0 20px 42px rgba(4,24,21,.48);' +
                'transition:transform .2s cubic-bezier(.2,.7,.3,1),box-shadow .2s',
            )}
          >
            {t.primary}
            <span aria-hidden="true" style={css('font-size:17px')}>
              {arrow}
            </span>
          </Link>
          <Link
            href={secondHref}
            className="sp-ghost"
            style={css(
              'box-sizing:border-box;display:inline-flex;align-items:center;height:58px;padding:0 30px;' +
                'border-radius:999px;border:1px solid rgba(255,255,255,.36);color:#ffffff;font-family:inherit;' +
                'font-size:15px;font-weight:500;text-decoration:none;' +
                'transition:background .2s,border-color .2s,transform .2s cubic-bezier(.2,.7,.3,1)',
            )}
          >
            {secondLabel}
          </Link>
        </div>

        <div
          data-sc=""
          style={css(
            'display:flex;flex-wrap:wrap;gap:clamp(16px,3vw,34px);margin-block-start:clamp(32px,4.4vw,52px);' +
              'padding-block-start:22px;border-block-start:1px solid rgba(255,255,255,.2);' +
              "font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.04em;color:rgba(255,255,255,.72)",
          )}
        >
          <a href={`mailto:${EMAIL}`} className="sp-op" style={css('color:#ffffff;text-decoration:none;opacity:.86')}>
            {EMAIL}
          </a>
          <a href={PHONE_HREF} className="sp-op" style={css('color:#ffffff;text-decoration:none;opacity:.86')}>
            <span dir="ltr">{PHONE_DISPLAY}</span>
          </a>
          <span data-lbl="">{t.city}</span>
        </div>
      </div>
    </section>
  )
}
