'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Mark } from '@/components/Mark'
import { css } from '@/lib/css'
import { routes } from '@/lib/routes'
import { useSite } from '@/lib/site'

const NAV = {
  ar: {
    navLabel: 'التنقل الرئيسي',
    about: 'من نحن',
    strategy: 'الاستراتيجية',
    ecosystem: 'منظومتنا',
    cta: 'تواصل معنا',
    switch: 'EN',
    switchLabel: 'Switch to English',
    dark: 'التبديل إلى الوضع الداكن',
    light: 'التبديل إلى الوضع المضيء',
  },
  en: {
    navLabel: 'Main navigation',
    about: 'About',
    strategy: 'Strategy',
    ecosystem: 'Ecosystem',
    cta: 'Contact us',
    switch: 'عربي',
    switchLabel: 'التبديل إلى العربية',
    dark: 'Switch to dark mode',
    light: 'Switch to light mode',
  },
} as const

// The business model and the roadmap are chapters of the strategy page, not stops of their own.
const LINKS = ['about', 'strategy', 'ecosystem'] as const
type NavKey = (typeof LINKS)[number]

const TOGGLE_BASE =
  'all:unset;box-sizing:border-box;cursor:pointer;height:44px;border-radius:999px;' +
  'border:1px solid currentColor;display:flex;align-items:center;opacity:.7'

export function SiteHeader({ active = '', overHero = false }: { active?: NavKey | ''; overHero?: boolean }) {
  const { lang, theme, toggleLang, toggleTheme } = useSite()
  const t = NAV[lang]
  const [scrolled, setScrolled] = useState(false)
  const [tone, setTone] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    // The bar takes the tone of whatever it is passing over: any section marked
    // `data-tone="dark"` under its middle line turns it to dark glass, so a cinematic section
    // is never capped by a white bar.
    const onScroll = () => {
      setScrolled((window.scrollY || 0) > 40)
      let dark = false
      document.querySelectorAll<HTMLElement>('[data-tone="dark"]').forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.top <= 36 && r.bottom > 36) dark = true
      })
      setTone(dark ? 'dark' : 'light')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // A page with a photographic hero starts transparent over it; every other page's bar is solid
  // from the first pixel, because there is nothing behind it to be glass over.
  const solid = overHero ? scrolled : true
  const dark = tone === 'dark'
  const onDark = !solid || dark

  const hdrStyle =
    'position:fixed;inset-block-start:0;inset-inline:0;z-index:60;backdrop-filter:' +
    (solid ? 'blur(14px) saturate(1.2)' : 'none') +
    ';transition:background .32s cubic-bezier(.2,.7,.3,1),border-color .32s,color .32s,' +
    'box-shadow .3s cubic-bezier(.2,.7,.3,1);box-shadow:' +
    (scrolled && !dark ? '0 10px 30px rgba(4,24,21,.08)' : 'none') +
    ';' +
    'background:' +
    (!solid ? 'transparent' : dark ? 'rgba(4,24,21,.72)' : 'var(--hdr)') +
    ';border-block-end:1px solid ' +
    (!solid ? 'transparent' : dark ? 'rgba(255,255,255,.1)' : 'var(--line)') +
    ';color:' +
    (onDark ? '#ffffff' : 'var(--ink)')

  const ctaStyle =
    'display:none;height:44px;padding:0 22px;border-radius:999px;align-items:center;font-size:14px;' +
    'font-weight:500;text-decoration:none;transition:transform .18s cubic-bezier(.2,.7,.3,1),background .18s;' +
    'background:' +
    (onDark ? '#ffffff' : '#062621') +
    ';color:' +
    (onDark ? '#041815' : '#ffffff')

  const themeGlyph =
    'display:block;width:16px;height:16px;border-radius:50%;border:1.5px solid currentColor;background:' +
    (theme === 'light'
      ? 'linear-gradient(90deg,currentColor 50%,transparent 50%)'
      : 'linear-gradient(90deg,transparent 50%,currentColor 50%)')

  return (
    <header data-hdr="" style={css(hdrStyle)}>
      <div
        style={css(
          'max-width:1400px;margin:0 auto;padding:0 clamp(16px,3vw,32px);height:' +
            (scrolled ? 'clamp(56px,6vw,66px)' : 'clamp(64px,7vw,80px)') +
            ';display:flex;align-items:center;gap:clamp(16px,3vw,44px);' +
            'transition:height .3s cubic-bezier(.2,.7,.3,1)',
        )}
      >
        <Link
          href={routes.home}
          aria-label="SEEM PRIME"
          className="sp-mark"
          style={css('display:flex;align-items:center;gap:12px;text-decoration:none;color:inherit')}
        >
          <Mark size={30} />
          <span
            style={css(
              "font-family:'Sora',sans-serif;font-weight:600;font-size:13px;letter-spacing:.3em;" +
                'text-transform:uppercase;white-space:nowrap;color:currentColor',
            )}
          >
            SEEM PRIME
          </span>
        </Link>

        <nav
          aria-label={t.navLabel}
          data-hdrnav=""
          style={css('display:none;margin-inline-start:auto;align-items:center;gap:clamp(14px,2vw,30px)')}
        >
          {LINKS.map((key) => {
            const on = active === key
            return (
              <Link
                key={key}
                href={routes[key]}
                aria-current={on ? 'page' : undefined}
                className={on ? undefined : 'sp-nav'}
                style={css(
                  'position:relative;font-size:14px;font-weight:500;color:inherit;text-decoration:none;' +
                    'padding-block:6px;transition:opacity .2s;opacity:' +
                    (on ? '1' : '.82') +
                    ';border-block-end:2px solid ' +
                    (on ? '#dc4b1c' : 'transparent'),
                )}
              >
                {t[key]}
              </Link>
            )
          })}
        </nav>

        <div style={css('display:flex;align-items:center;gap:8px;margin-inline-start:auto')}>
          <button
            type="button"
            className="sp-op"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? t.dark : t.light}
            style={css(TOGGLE_BASE + ';width:44px;justify-content:center')}
          >
            <span aria-hidden="true" style={css(themeGlyph)} />
          </button>
          <button
            type="button"
            className="sp-op"
            onClick={toggleLang}
            aria-label={t.switchLabel}
            style={css(
              TOGGLE_BASE +
                ";padding:0 16px;font-family:'Sora',sans-serif;font-size:12px;font-weight:600;letter-spacing:.12em",
            )}
          >
            {t.switch}
          </button>
          {/* Over a dark surface the pill is white, so its sheen has to be the ink rather than more white. */}
          <Link
            href={routes.contact}
            data-hdrcta=""
            data-solid={onDark ? '' : undefined}
            className="sp-nudge sp-sheen"
            style={css(ctaStyle)}
          >
            {t.cta}
          </Link>
        </div>
      </div>
    </header>
  )
}
