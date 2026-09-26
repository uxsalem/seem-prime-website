'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { Mark } from '@/components/Mark'
import { css } from '@/lib/css'
import { chapters, EMAIL, PHONE_DISPLAY, PHONE_HREF, routes } from '@/lib/routes'
import { useSite } from '@/lib/site'
import { capStyle } from '@/lib/typography'

const FT = {
  ar: {
    footerText: 'شركة استثمارية وتشغيلية استراتيجية تبني وتشغّل منصات أعمال قابلة للتوسع.',
    fCompany: 'الشركة',
    fContact: 'التواصل',
    address: 'حي الخالدية — جدة، المملكة العربية السعودية',
    nlLabel: 'النشرة البريدية',
    nlBody: 'تحديثات دورية عن منصاتنا واستثماراتنا.',
    nlPlaceholder: 'بريدك الإلكتروني',
    nlBtn: 'اشترك',
    nlOk: 'تم الاشتراك. شكراً لك.',
    rights: 'سيم برايم. جميع الحقوق محفوظة.',
    tagline: ['تمكين الأعمال', 'تسريع النمو', 'بناء المنظومات الاقتصادية'],
    links: [
      ['من نحن', routes.about],
      ['الاستراتيجية', routes.strategy],
      ['نموذج الأعمال', chapters.model],
      ['خارطة الطريق', chapters.roadmap],
      ['منظومتنا', routes.ecosystem],
      ['تواصل معنا', routes.contact],
    ],
  },
  en: {
    footerText:
      'A strategic investment and operating company building and operating scalable business platforms.',
    fCompany: 'Company',
    fContact: 'Contact',
    address: 'Al Khalidiyah District — Jeddah, Kingdom of Saudi Arabia',
    nlLabel: 'Newsletter',
    nlBody: 'Periodic updates on our platforms and investments.',
    nlPlaceholder: 'Your email address',
    nlBtn: 'Subscribe',
    nlOk: 'Subscribed. Thank you.',
    rights: 'SEEM PRIME. All rights reserved.',
    tagline: ['Empowering businesses', 'Accelerating growth', 'Building economic ecosystems'],
    links: [
      ['About', routes.about],
      ['Strategy', routes.strategy],
      ['Business model', chapters.model],
      ['Roadmap', chapters.roadmap],
      ['Ecosystem', routes.ecosystem],
      ['Contact us', routes.contact],
    ],
  },
} as const

const FOOTER_LINK = 'font-size:14px;color:#ffffff;text-decoration:none;opacity:.82'

export function SiteFooter() {
  const { lang, ar } = useSite()
  const t = FT[lang]
  const [subscribed, setSubscribed] = useState(false)

  const cap = capStyle(ar, 'rgba(255,255,255,.62)')

  const subscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: POST to the newsletter provider. Until then the confirmation is local-only.
    setSubscribed(true)
    e.currentTarget.reset()
  }

  return (
    <footer data-tone="dark" style={css('position:relative;overflow:clip;background:#041815;color:#ffffff')}>
      <div
        style={css(
          'position:relative;max-width:1400px;margin:0 auto;padding:clamp(56px,7vw,96px) clamp(16px,3vw,32px) 0',
        )}
      >
        <div
          data-fcols=""
          style={css('display:grid;gap:clamp(28px,4vw,48px);padding-block-end:clamp(36px,5vw,56px)')}
        >
          <div style={css('display:flex;flex-direction:column;gap:18px')}>
            <div style={css('display:flex;align-items:center;gap:12px;color:#ffffff')}>
              <Mark size={40} />
              <span
                style={css(
                  "font-family:'Sora',sans-serif;font-weight:600;font-size:13px;letter-spacing:.34em;text-transform:uppercase",
                )}
              >
                SEEM PRIME
              </span>
            </div>
            <p
              style={css(
                'margin:0;max-width:34ch;font-weight:300;font-size:14px;line-height:1.62;color:rgba(255,255,255,.74)',
              )}
            >
              {t.footerText}
            </p>
          </div>

          <div style={css('display:flex;flex-direction:column;gap:12px')}>
            <span data-lbl="" style={css(cap)}>
              {t.fCompany}
            </span>
            {t.links.map(([label, href]) => (
              <Link key={href} href={href} className="sp-op" style={css(FOOTER_LINK)}>
                {label}
              </Link>
            ))}
          </div>

          <div style={css('display:flex;flex-direction:column;gap:12px')}>
            <span data-lbl="" style={css(cap)}>
              {t.fContact}
            </span>
            <span style={css('max-width:26ch;font-size:14px;line-height:1.6;color:rgba(255,255,255,.74)')}>
              {t.address}
            </span>
            <a href={`mailto:${EMAIL}`} className="sp-op" style={css(FOOTER_LINK)}>
              {EMAIL}
            </a>
            <a
              href={PHONE_HREF}
              className="sp-op"
              style={css("font-family:'IBM Plex Mono',monospace;" + FOOTER_LINK)}
            >
              <span dir="ltr">{PHONE_DISPLAY}</span>
            </a>
          </div>

          <div style={css('display:flex;flex-direction:column;gap:12px')}>
            <span data-lbl="" style={css(cap)}>
              {t.nlLabel}
            </span>
            <p
              style={css(
                'margin:0;max-width:30ch;font-size:14px;line-height:1.6;color:rgba(255,255,255,.74)',
              )}
            >
              {t.nlBody}
            </p>
            <form onSubmit={subscribe} style={css('display:flex;flex-wrap:wrap;gap:8px')}>
              <input
                name="nl_email"
                type="email"
                required
                placeholder={t.nlPlaceholder}
                aria-label={t.nlPlaceholder}
                style={css(
                  'box-sizing:border-box;flex:1 1 150px;min-width:0;height:46px;padding:0 14px;' +
                    'background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.18);' +
                    'border-radius:999px;font-family:inherit;font-size:14px;color:#ffffff',
                )}
              />
              <button
                type="submit"
                className="sp-nudge"
                style={css(
                  'all:unset;box-sizing:border-box;cursor:pointer;height:46px;padding:0 22px;border-radius:999px;' +
                    'background:#ffffff;color:#041815;font-family:inherit;font-size:14px;font-weight:500;' +
                    'display:flex;align-items:center;transition:transform .18s cubic-bezier(.2,.7,.3,1)',
                )}
              >
                {t.nlBtn}
              </button>
            </form>
            {subscribed ? (
              <span role="status" style={css('font-size:13px;color:#8fc4bb')}>
                {t.nlOk}
              </span>
            ) : null}
          </div>
        </div>

        {/* The wordmark as the framework sets it — spaced caps — at the scale of the page. */}
        <div
          aria-hidden="true"
          dir="ltr"
          style={css(
            "margin:clamp(8px,2vw,24px) 0 clamp(18px,3vw,36px);font-family:'Sora',sans-serif;font-weight:600;" +
              'font-size:clamp(26px,8.6vw,146px);line-height:.9;letter-spacing:.34em;white-space:nowrap;' +
              'text-align:center;margin-inline-end:-.34em;color:transparent;-webkit-text-stroke:1px rgba(255,255,255,.14);user-select:none',
          )}
        >
          SEEM PRIME
        </div>

        <div
          style={css(
            'display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px;' +
              'padding:22px 0;border-block-start:1px solid rgba(255,255,255,.18)',
          )}
        >
          <span style={css('font-size:13px;color:rgba(255,255,255,.62)')}>
            © {new Date().getFullYear()} {t.rights}
          </span>
          <span style={css('font-size:13px;color:rgba(255,255,255,.62)')}>{t.tagline.join(' · ')}</span>
        </div>
      </div>
    </footer>
  )
}
