'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ImageSlot } from '@/components/ImageSlot'
import { PLATFORM_IDS } from '@/lib/content/ecosystem'
import { HOME } from '@/lib/content/home'
import { css, cssWith, vars } from '@/lib/css'
import { reduceMotion } from '@/lib/hooks'
import { platformFrames } from '@/lib/media'
import { routes } from '@/lib/routes'
import { useSite } from '@/lib/site'
import { display, markType, ordinal } from '@/lib/typography'

/** The preview window's size; it floats centred a little ahead of the pointer. */
const PREVIEW_W = 300
const PREVIEW_H = 380

/**
 * The platforms as an index rather than a row of cards: the names set large, the rest of the
 * line quiet. Pointing at a platform floats a window of its mark beside the cursor — the list
 * stays typographic and each platform's own logo arrives only when asked for. Touch screens,
 * which have no pointer to follow, get the mark inline as a thumbnail instead.
 */
export function PlatformIndex() {
  const { lang, ar, arrow } = useSite()
  const t = HOME[lang]

  const listRef = useRef<HTMLOListElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  // The floating window is fixed to the viewport, so lazy loading would fetch its pictures with
  // the first paint. They are only mounted once the section is a screen away.
  const [warm, setWarm] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setWarm(true)
        io.disconnect()
      },
      { rootMargin: '100% 0px' },
    )
    io.observe(section)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const list = listRef.current
    const preview = previewRef.current
    if (!list || !preview) return
    if (reduceMotion() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const frames = [...preview.querySelectorAll<HTMLElement>('[data-pv]')]
    let x = 0
    let y = 0
    let tx = 0
    let ty = 0
    let raf = 0
    let shown = false
    let active = -1

    const place = () => {
      x += (tx - x) * 0.16
      y += (ty - y) * 0.16
      preview.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0)'
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.4 ? requestAnimationFrame(place) : 0
    }

    const onMove = (event: PointerEvent) => {
      const row = (event.target as Element | null)?.closest?.<HTMLElement>('[data-prow]')
      if (!row) return
      // Sit the window ahead of the pointer in the reading direction, never under the name.
      const lead = ar ? -PREVIEW_W - 40 : 40
      tx = Math.max(12, Math.min(window.innerWidth - PREVIEW_W - 12, event.clientX + lead))
      ty = Math.max(76, Math.min(window.innerHeight - PREVIEW_H - 12, event.clientY - PREVIEW_H / 2))
      if (!shown) {
        x = tx
        y = ty
        shown = true
        preview.setAttribute('data-show', '')
      }
      const i = Number(row.dataset.i)
      if (i !== active) {
        active = i
        frames.forEach((frame, k) => frame.toggleAttribute('data-on', k === i))
      }
      if (!raf) raf = requestAnimationFrame(place)
    }

    const hide = () => {
      if (!shown) return
      shown = false
      active = -1
      preview.removeAttribute('data-show')
      frames.forEach((frame) => frame.removeAttribute('data-on'))
    }

    list.addEventListener('pointermove', onMove)
    list.addEventListener('pointerleave', hide)
    window.addEventListener('scroll', hide, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      list.removeEventListener('pointermove', onMove)
      list.removeEventListener('pointerleave', hide)
      window.removeEventListener('scroll', hide)
    }
  }, [ar])

  return (
    <section ref={sectionRef} id="ecosystem" aria-labelledby="pl-h" style={css('position:relative;background:var(--page)')}>
      <div style={css('max-width:1400px;margin:0 auto;padding:clamp(88px,12vw,170px) clamp(16px,3vw,32px)')}>
        <div
          style={css(
            'display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:24px;' +
              'margin-block-end:clamp(36px,5vw,72px)',
          )}
        >
          <h2
            id="pl-h"
            data-sc="rise"
            style={css('margin:0;' + display(ar, ar ? 'clamp(32px,4.4vw,64px)' : 'clamp(34px,4.6vw,68px)') + ';color:var(--ink)')}
          >
            {t.ecosystemH}
          </h2>
          <Link
            data-sc=""
            href={routes.ecosystem}
            className="sp-nav"
            style={css(
              'position:relative;display:inline-flex;align-items:center;gap:10px;padding-block:6px;' +
                'font-size:15px;font-weight:500;color:var(--ink);text-decoration:none',
            )}
          >
            {t.morePlatforms}
            <span aria-hidden="true">{arrow}</span>
          </Link>
        </div>

        <ol ref={listRef} data-plist="" style={css('margin:0;padding:0;list-style:none;border-block-start:1px solid var(--line2)')}>
          {t.platforms.map(([sector, name, blurb], i) => (
            <li key={name} data-sc="" data-stagger="" style={cssWith('border-block-end:1px solid var(--line2)', vars({ '--i': i }))}>
              <Link href={routes.ecosystem + '#' + PLATFORM_IDS[i]} data-prow="" data-i={i}>
                <span data-pthumb="" aria-hidden="true">
                  <ImageSlot frame={platformFrames[i]} alt="" placeholder={name} />
                </span>
                <span data-pnum="" style={css("font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.06em;color:var(--muted)")}>
                  {ordinal(i)}
                </span>
                <span
                  data-pname=""
                  style={css(markType(name, 'clamp(34px,6vw,96px)', { leading: '1', tracking: '-.035em' }) + ';color:var(--ink)')}
                >
                  {name}
                </span>
                <span data-pmeta="">
                  <span data-lbl="" style={css("font-family:'Sora',sans-serif;font-size:11px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:var(--muted)")}>
                    {sector}
                  </span>
                  <span style={css('font-size:15px;line-height:1.55;color:var(--body)')}>{blurb}</span>
                </span>
                <span data-parrow="" aria-hidden="true">
                  {arrow}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>

      <div ref={previewRef} data-preview="" aria-hidden="true">
        {platformFrames.map((frame, i) => (
          <span key={i} data-pv="">
            {warm ? <ImageSlot frame={frame} alt="" placeholder="" /> : null}
          </span>
        ))}
      </div>
    </section>
  )
}
