'use client'

import { useCallback, useEffect } from 'react'
import type { RefObject } from 'react'
import { reduceMotion } from '@/lib/hooks'

/**
 * The home page's continuous motion. It is written straight to the DOM rather than through
 * React state: these values change on every scroll frame, and re-rendering a page this size
 * sixty times a second to move a background plate would be absurd.
 */

/**
 * A JS-driven marquee, not a CSS animation — this lets the ticker ease to a stop under the
 * pointer rather than snapping, and keeps the loop seam invisible by wrapping at the halfway
 * point of the duplicated strip.
 */
export function useMarquee(
  trackRef: RefObject<HTMLDivElement | null>,
  wrapRef: RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    const track = trackRef.current
    const wrap = wrapRef.current
    if (!track || !wrap || reduceMotion()) return

    let x = 0
    let last = 0
    let target = 1
    let eased = 1
    let raf = 0

    const stop = () => {
      target = 0
    }
    const go = () => {
      target = 1
    }
    wrap.addEventListener('pointerenter', stop)
    wrap.addEventListener('pointerleave', go)

    const tick = (now: number) => {
      if (!track.isConnected) return
      if (!last) last = now
      const dt = Math.min(48, now - last)
      last = now
      eased += (target - eased) * 0.08
      const half = track.scrollWidth / 2 || 1
      x -= dt * 0.045 * eased
      if (-x >= half) x += half
      track.style.transform = 'translate3d(' + x.toFixed(1) + 'px,0,0)'
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      wrap.removeEventListener('pointerenter', stop)
      wrap.removeEventListener('pointerleave', go)
    }
  }, [trackRef, wrapRef])
}

/** The hairline under "scroll to explore", breathing on a 1.8s cycle. */
export function useCue(cueRef: RefObject<HTMLSpanElement | null>) {
  useEffect(() => {
    const cue = cueRef.current
    if (!cue || reduceMotion()) return

    let t0 = 0
    let raf = 0
    const tick = (now: number) => {
      if (!cue.isConnected) return
      if (!t0) t0 = now
      const p = ((now - t0) % 1800) / 1800
      cue.style.opacity = (0.25 + 0.75 * Math.sin(p * Math.PI)).toFixed(2)
      cue.style.transform = 'translateY(' + (p * 8).toFixed(1) + 'px)'
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [cueRef])
}

type ParallaxRefs = {
  heroPlateRef: RefObject<HTMLSpanElement | null>
  bannerPlateRef: RefObject<HTMLSpanElement | null>
  driftRef: RefObject<HTMLSpanElement | null>
}

/** Returns the per-frame pass the home page's scroll driver calls. */
export function useHomeParallax({ heroPlateRef, bannerPlateRef, driftRef }: ParallaxRefs) {
  return useCallback(() => {
    const y = window.scrollY || 0
    const vh = window.innerHeight

    // The hero plate drifts slower than the page, so the opening has depth.
    const hero = heroPlateRef.current
    if (hero) hero.style.transform = 'translate3d(0,' + (y * 0.16).toFixed(1) + 'px,0) scale(1.08)'

    const drift = driftRef.current
    if (drift) {
      const rect = drift.getBoundingClientRect()
      drift.style.transform = 'translate3d(0,' + ((vh / 2 - rect.top) * -0.05).toFixed(1) + 'px,0)'
    }

    const banner = bannerPlateRef.current
    if (banner?.parentElement) {
      const rect = banner.parentElement.getBoundingClientRect()
      banner.style.transform =
        'translate3d(0,' + ((vh - rect.top) * -0.06).toFixed(1) + 'px,0) scale(1.12)'
    }

    // Cards drift on opposing lanes and their ember rule draws in as they arrive.
    const mid = vh / 2
    document.querySelectorAll<HTMLElement>('[data-eco-card]').forEach((card, i) => {
      const rect = card.getBoundingClientRect()
      const offset = Math.max(-1, Math.min(1, (rect.top + rect.height / 2 - mid) / vh))
      const lane = (i % 2 === 0 ? 1 : -1) * 14
      card.style.setProperty('--lane', (offset * lane).toFixed(1) + 'px')
      if (!card.style.transform.includes('translateY')) card.style.transform = 'translateY(var(--lane,0))'

      const rule = card.querySelector<HTMLElement>('[data-ecorule]')
      if (rule) {
        const drawn = Math.max(0, Math.min(1, (vh * 0.9 - rect.top) / (rect.height * 0.6)))
        rule.style.transform = 'scaleX(' + drawn.toFixed(3) + ')'
      }
      const num = card.querySelector<HTMLElement>('[data-econum]')
      if (num) {
        const lit = Math.max(0, Math.min(1, (vh * 0.92 - rect.top) / (rect.height * 0.5)))
        num.style.opacity = (0.35 + 0.65 * lit).toFixed(2)
      }
    })

    // The stakeholder row nearest the centre line takes focus.
    const rows = [...document.querySelectorAll<HTMLElement>('[data-stakerow]')]
    if (rows.length) {
      let best = -1
      let bestDistance = Infinity
      rows.forEach((row, i) => {
        const rect = row.getBoundingClientRect()
        if (rect.bottom < 0 || rect.top > vh) return
        const distance = Math.abs(rect.top + rect.height / 2 - mid)
        if (distance < bestDistance) {
          bestDistance = distance
          best = i
        }
      })
      rows.forEach((row, i) => {
        const on = i === best
        row.style.background = on ? 'var(--tint)' : 'transparent'
        row.style.paddingInlineStart = on ? '18px' : '0px'
        const bar = row.querySelector<HTMLElement>('[data-stakebar]')
        if (bar) bar.style.transform = 'scaleY(' + (on ? 1 : 0) + ')'
        const no = row.querySelector<HTMLElement>('[data-stakeno]')
        if (no) no.style.color = on ? '#dc4b1c' : 'var(--muted)'
      })
    }

    const fill = document.querySelector<HTMLElement>('[data-roadfill]')
    if (fill?.parentElement) {
      const rect = fill.parentElement.getBoundingClientRect()
      const drawn = Math.max(0, Math.min(1, (vh * 0.85 - rect.top) / (rect.height + vh * 0.25)))
      fill.style.width = (drawn * 100).toFixed(1) + '%'
    }
  }, [heroPlateRef, bannerPlateRef, driftRef])
}
