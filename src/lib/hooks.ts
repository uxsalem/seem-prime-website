'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'

/** `useLayoutEffect` that does not warn during SSR. */
export const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

export const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Keeps a callback current without re-subscribing the listeners that call it. */
function useLatest<T>(value: T) {
  const ref = useRef(value)
  useIsomorphicLayoutEffect(() => {
    ref.current = value
  })
  return ref
}

/** Width of the reading-progress hairline, as a percentage of the page's scrollable height. */
export function progressWidth() {
  const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
  return (Math.min(1, (window.scrollY || 0) / max) * 100).toFixed(2) + '%'
}

type ScrollDriverOptions = {
  /** Runs on every scroll/resize event — cheap, per-frame work only. */
  onFrame?: () => void
  /** Runs at most every 60ms, with a trailing call, as the original pages did. */
  onSettle?: () => void
}

/**
 * The scroll spine every page shared: a passive scroll + resize listener that drives the
 * progress bar (and any per-frame parallax) immediately, while throttling the heavier
 * reveal/section passes to ~16fps with a trailing call so the last position always lands.
 */
export function useScrollDriver({ onFrame, onSettle }: ScrollDriverOptions) {
  const frameRef = useLatest(onFrame)
  const settleRef = useLatest(onSettle)

  useEffect(() => {
    let last = 0
    let trail: ReturnType<typeof setTimeout> | undefined

    const handler = () => {
      frameRef.current?.()
      const now = Date.now()
      const wait = 60 - (now - last)
      if (wait > 0) {
        clearTimeout(trail)
        trail = setTimeout(() => {
          last = 0
          handler()
        }, wait + 10)
        return
      }
      last = now
      settleRef.current?.()
    }

    window.addEventListener('scroll', handler, { passive: true })
    window.addEventListener('resize', handler, { passive: true })
    handler()

    return () => {
      window.removeEventListener('scroll', handler)
      window.removeEventListener('resize', handler)
      clearTimeout(trail)
    }
  }, [frameRef, settleRef])
}

/**
 * Reveals `[data-sc]` elements once they cross 94% of the viewport by stamping `data-in`, and
 * starts any `[data-count]` counters inside them. A 500ms poll catches elements that arrive
 * without a scroll event (fonts settling, images resizing the page, a pinned block releasing).
 */
export function useReveal(onReveal?: (node: Element) => void) {
  const revealRef = useLatest(onReveal)

  const pass = useRef(() => {})
  pass.current = () => {
    const h = window.innerHeight || 800
    document.querySelectorAll('[data-sc]:not([data-in])').forEach((node) => {
      if (node.getBoundingClientRect().top < h * 0.94) {
        node.setAttribute('data-in', '1')
        revealRef.current?.(node)
      }
    })
  }

  useEffect(() => {
    const run = () => pass.current()
    run()
    const poll = setInterval(run, 500)
    return () => clearInterval(poll)
  }, [])

  return pass
}

/** Eases a `[data-count]` element from 0 to its target, once, honouring reduced motion. */
export function runCounter(el: Element, duration: number) {
  if (el.hasAttribute('data-counted')) return
  const target = parseFloat(el.getAttribute('data-count') || '')
  if (!Number.isFinite(target)) return
  const suffix = el.getAttribute('data-suffix') || ''
  const settle = () => {
    el.textContent = target + suffix
    el.setAttribute('data-counted', '1')
  }
  if (reduceMotion()) {
    settle()
    return
  }
  let t0: number | null = null
  const step = (now: number) => {
    if (!el.isConnected) return
    if (t0 === null) t0 = now
    const p = Math.min(1, (now - t0) / duration)
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 4))) + suffix
    if (p < 1) {
      requestAnimationFrame(step)
      return
    }
    settle()
  }
  requestAnimationFrame(step)
}

/** Tracks a media query as React state. */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia(query)
    const sync = () => setMatches(mql.matches)
    sync()
    mql.addEventListener('change', sync)
    return () => mql.removeEventListener('change', sync)
  }, [query])
  return matches
}

/**
 * Scrolls a snap rail by one card. In Arabic the rail reads right-to-left, so "next" is a
 * negative offset.
 */
export function scrollRail(el: HTMLElement | null, direction: 1 | -1, ar: boolean) {
  if (!el) return
  const card = el.firstElementChild
  const step = (card ? card.getBoundingClientRect().width : 280) + 16
  el.scrollBy({ left: step * direction * (ar ? -1 : 1), behavior: 'smooth' })
}
