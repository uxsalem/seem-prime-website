'use client'

import { useEffect } from 'react'
import type { RefObject } from 'react'
import { reduceMotion } from '@/lib/hooks'

/**
 * The motion shared by every page, as opposed to the one-off choreography a single page owns
 * (`src/components/pages/home-motion.ts`). Two things live here: the parallax that every
 * photographic plate drifts on, and the pointer glow that follows the cursor across a card.
 *
 * Both are written straight to the DOM. They change on every frame the reader moves, and
 * routing those values through React state would re-render whole pages to nudge a background.
 */

type Plate = { el: HTMLElement; depth: number }

const plates = new Set<Plate>()
let frame = 0
let listening = false

/**
 * One pass over every plate on the page. A plate drifts against its own section rather than
 * against the document, so a masthead 4000px down opens at the same offset as the hero does at
 * the top. Travel is clamped to a share of the section's height — the plate is inset by 10% on
 * each edge, so it can never expose one.
 */
function pass() {
  frame = 0
  const vh = window.innerHeight || 800
  for (const plate of plates) {
    const host = plate.el.parentElement
    if (!host) continue
    const rect = host.getBoundingClientRect()
    if (rect.bottom < -vh * 0.5 || rect.top > vh * 1.5) continue
    const progress = (vh - rect.top) / (vh + rect.height)
    const depth = Math.min(plate.depth, rect.height * 0.16)
    plate.el.style.transform = 'translate3d(0,' + ((progress - 0.5) * depth).toFixed(1) + 'px,0)'
  }
}

function schedule() {
  if (frame) return
  frame = requestAnimationFrame(pass)
}

function listen() {
  if (listening) return
  listening = true
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule, { passive: true })
}

function release() {
  if (!listening || plates.size) return
  listening = false
  window.removeEventListener('scroll', schedule)
  window.removeEventListener('resize', schedule)
  cancelAnimationFrame(frame)
  frame = 0
}

/**
 * Drifts a plate against the section it fills. `depth` is the total travel in pixels across a
 * full pass of the section; the default suits a full-height hero.
 */
export function usePlateParallax(ref: RefObject<HTMLElement | null>, depth = 130) {
  useEffect(() => {
    const el = ref.current
    if (!el || reduceMotion()) return
    const plate: Plate = { el, depth }
    plates.add(plate)
    listen()
    schedule()
    return () => {
      plates.delete(plate)
      release()
    }
  }, [ref, depth])
}

/**
 * Tracks the pointer across any `[data-spot]` card and writes its position as `--mx`/`--my`,
 * which the stylesheet turns into a soft ember glow under the cursor. One delegated listener
 * covers every card on the page, and touch devices — where there is no cursor to follow — are
 * left alone.
 */
export function useSpotlight() {
  useEffect(() => {
    if (reduceMotion()) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let pending: { card: HTMLElement; x: number; y: number } | null = null
    let raf = 0

    const paint = () => {
      raf = 0
      if (!pending) return
      const { card, x, y } = pending
      card.style.setProperty('--mx', x.toFixed(1) + '%')
      card.style.setProperty('--my', y.toFixed(1) + '%')
    }

    const onMove = (event: PointerEvent) => {
      const target = event.target as Element | null
      const card = target?.closest?.<HTMLElement>('[data-spot]')
      if (!card) return
      const rect = card.getBoundingClientRect()
      pending = {
        card,
        x: ((event.clientX - rect.left) / rect.width) * 100,
        y: ((event.clientY - rect.top) / rect.height) * 100,
      }
      if (!raf) raf = requestAnimationFrame(paint)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])
}
