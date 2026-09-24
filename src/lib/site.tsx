'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

export type Lang = 'ar' | 'en'
export type Theme = 'light' | 'dark'

export const LANG_KEY = 'seemprime-lang'
export const THEME_KEY = 'seemprime-theme'
/** Session flag: the home page's opening aperture has already played in this tab. */
export const INTRO_KEY = 'seemprime-intro'

type SiteValue = {
  lang: Lang
  theme: Theme
  /** `lang === 'ar'` — the branch nearly every style builder keys off. */
  ar: boolean
  dir: 'rtl' | 'ltr'
  /** `←` in Arabic, `→` in English: forward, in the reading direction. */
  arrow: string
  toggleLang: () => void
  toggleTheme: () => void
}

const SiteContext = createContext<SiteValue | null>(null)

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme)
  document.documentElement.style.colorScheme = theme
}

/**
 * Language and theme were per-page state in the `.dc.html` build, each page re-reading
 * localStorage on mount. As a single Next app they live here, so a toggle survives navigation
 * without a round trip to storage.
 */
export function SiteProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ar')
  const [theme, setTheme] = useState<Theme>('light')

  // Read the stored preference after hydration, so server and first client render agree.
  useEffect(() => {
    try {
      const storedLang = window.localStorage.getItem(LANG_KEY)
      if (storedLang === 'en' || storedLang === 'ar') setLang(storedLang)
      const storedTheme = window.localStorage.getItem(THEME_KEY)
      setTheme(storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : 'light')
    } catch {
      setTheme('light')
    }
  }, [])

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  const toggleLang = useCallback(() => {
    setLang((current) => {
      const next: Lang = current === 'ar' ? 'en' : 'ar'
      try {
        window.localStorage.setItem(LANG_KEY, next)
      } catch {
        /* private mode — the toggle still works for this session */
      }
      return next
    })
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === 'light' ? 'dark' : 'light'
      try {
        window.localStorage.setItem(THEME_KEY, next)
      } catch {
        /* private mode — the toggle still works for this session */
      }
      return next
    })
  }, [])

  const value = useMemo<SiteValue>(() => {
    const ar = lang === 'ar'
    return { lang, theme, ar, dir: ar ? 'rtl' : 'ltr', arrow: ar ? '←' : '→', toggleLang, toggleTheme }
  }, [lang, theme, toggleLang, toggleTheme])

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
}

export function useSite(): SiteValue {
  const value = useContext(SiteContext)
  if (!value) throw new Error('useSite must be used inside <SiteProvider>')
  return value
}

/**
 * Runs before first paint so a stored dark theme never flashes light. Kept deliberately tiny
 * and dependency-free; it mirrors `applyTheme` above.
 *
 * It also decides, before anything paints, whether the home page opens on its aperture: only
 * when the tab lands on the home page, once per tab, never under reduced motion. Deciding here
 * rather than after hydration is what lets the opening run in CSS from the first frame instead
 * of flashing the finished hero first.
 */
export const THEME_BOOTSTRAP = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('${THEME_KEY}');if(t!=='light'&&t!=='dark')t='light';d.setAttribute('data-theme',t);d.style.colorScheme=t;var l=localStorage.getItem('${LANG_KEY}');if(l==='en'||l==='ar'){d.lang=l;d.dir=l==='ar'?'rtl':'ltr'}}catch(e){d.setAttribute('data-theme','light')}try{if(location.pathname==='/'&&!sessionStorage.getItem('${INTRO_KEY}')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)d.setAttribute('data-intro','play')}catch(e){}})()`
