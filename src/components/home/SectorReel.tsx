'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ImageSlot } from '@/components/ImageSlot'
import { PLATFORM_SECTORS } from '@/lib/content/ecosystem'
import { HOME } from '@/lib/content/home'
import { css } from '@/lib/css'
import { useScrollDriver } from '@/lib/hooks'
import { sectorFrames } from '@/lib/media'
import { routes } from '@/lib/routes'
import { useSite } from '@/lib/site'
import { BRONZE, arabic, display, markType, ordinal } from '@/lib/typography'

/** Pinned only where there is room to travel sideways, and only when motion is welcome. */
export const REEL_QUERY = '(min-width: 1000px) and (min-height: 560px) and (prefers-reduced-motion: no-preference)'

const clamp01 = (n: number) => Math.max(0, Math.min(1, n))

/**
 * The eight sectors as one sequence. On a wide screen the section pins and the reader travels
 * along a single line — vertical scroll becomes a lateral journey past eight windows of one size,
 * strung on the line like frames of a film, each opening as it arrives, the ember drawing itself
 * up to the middle of the screen. Everywhere else it is a plain swipe rail with the same frames
 * and captions. A sector with a platform names it under its line.
 */
export function SectorReel() {
  const { lang, ar, arrow } = useSite()
  const t = HOME[lang]

  const pinRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLSpanElement>(null)
  const numRef = useRef<HTMLSpanElement>(null)
  const nameRef = useRef<HTMLSpanElement>(null)
  const distRef = useRef(0)
  const nowRef = useRef(-1)
  // On the pinned reel the frames travel in from the side faster than lazy loading would fetch
  // them, so the set is warmed once the section is a screen away. The swipe rail needs none of
  // this: native lazy loading follows a scrolling rail on its own.
  const [warm, setWarm] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section || !window.matchMedia(REEL_QUERY).matches) return
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

  // Measure the journey: the pin is exactly as tall as the track is wider than the screen.
  useEffect(() => {
    const measure = () => {
      const pin = pinRef.current
      const track = trackRef.current
      if (!pin || !track) return
      if (!window.matchMedia(REEL_QUERY).matches) {
        distRef.current = 0
        pin.style.height = ''
        track.style.transform = ''
        track.querySelectorAll<HTMLElement>('[data-reel-img]').forEach((el) => (el.style.transform = ''))
        return
      }
      const dist = Math.max(0, track.scrollWidth - window.innerWidth)
      distRef.current = dist
      pin.style.height = dist + window.innerHeight + 'px'
    }
    measure()
    // The closing link's width depends on the display face, so measure again once it is in.
    document.fonts?.ready.then(measure).catch(() => {})
    window.addEventListener('resize', measure)
    window.addEventListener('load', measure)
    const mql = window.matchMedia(REEL_QUERY)
    mql.addEventListener('change', measure)
    return () => {
      window.removeEventListener('resize', measure)
      window.removeEventListener('load', measure)
      mql.removeEventListener('change', measure)
    }
  }, [])

  useScrollDriver({
    onFrame: () => {
      const pin = pinRef.current
      const track = trackRef.current
      const dist = distRef.current
      if (!pin || !track || !dist) return
      const vw = window.innerWidth
      const vh = window.innerHeight || 800
      const rect = pin.getBoundingClientRect()
      if (rect.bottom < -vh || rect.top > vh * 2) return
      // A beat of stillness at each end: the reel settles on its first frame before it moves
      // off, and holds on the last before it lets the page go.
      const p = clamp01((clamp01(-rect.top / Math.max(1, rect.height - vh)) - 0.05) / 0.9)
      const x = p * dist
      track.style.transform = 'translate3d(' + (ar ? x : -x).toFixed(1) + 'px,0,0)'

      // The ember horizon always ends at the middle of the screen: you are here.
      const fill = fillRef.current
      if (fill) fill.style.transform = 'scaleX(' + clamp01((x + vw / 2) / track.scrollWidth).toFixed(4) + ')'

      // The counter names the frame under the middle of the screen, where the ember ends: the
      // last one whose leading edge has crossed it, so the reel opens on its first sector.
      let best = 0
      track.querySelectorAll<HTMLElement>('[data-reel-frame]').forEach((frame, i) => {
        const r = frame.getBoundingClientRect()
        const centre = r.left + r.width / 2
        if (r.left < vw * 0.94 && r.right > vw * 0.06) frame.setAttribute('data-in', '')
        if (ar ? r.right >= vw / 2 : r.left <= vw / 2) best = i
        // Each window slides its picture against the travel, so the frames read as openings
        // onto a landscape that sits further back than the page.
        const shift = ((centre - vw / 2) / vw) * -7
        frame.querySelectorAll<HTMLElement>('[data-reel-img]').forEach((img) => {
          img.style.transform = 'translate3d(' + shift.toFixed(2) + '%,0,0)'
        })
      })

      if (best !== nowRef.current) {
        nowRef.current = best
        if (numRef.current) numRef.current.textContent = ordinal(best) + ' / ' + ordinal(t.sectors.length - 1)
        if (nameRef.current) nameRef.current.textContent = t.sectors[best]
      }
    },
  })

  // The HUD is written straight to the DOM by the scroll pass; a language switch must refresh it.
  useEffect(() => {
    nowRef.current = -1
  }, [lang])

  return (
    <section
      ref={sectionRef}
      id="sectors"
      aria-labelledby="rl-h"
      data-reel=""
      data-tone="dark"
      style={css('position:relative;background:#041815;color:#ffffff')}
    >
      <div
        style={css(
          'position:relative;max-width:1400px;margin:0 auto;padding:clamp(88px,11vw,150px) clamp(16px,3vw,32px) clamp(36px,5vw,64px)',
        )}
      >
        <div data-reel-head="">
          <h2
            id="rl-h"
            data-sc="rise"
            style={css(
              'margin:0;max-width:14ch;' + display(ar, ar ? 'clamp(34px,5vw,76px)' : 'clamp(38px,5.4vw,84px)') + ';color:#ffffff',
            )}
          >
            {t.reelH}
          </h2>
          <p
            data-sc=""
            style={css(
              'margin:0;max-width:40ch;font-weight:300;font-size:clamp(16px,1.6vw,19px);line-height:1.62;color:rgba(255,255,255,.72)',
            )}
          >
            {t.sectorsLead}
          </p>
        </div>
      </div>

      <div ref={pinRef} data-reel-pin="">
        <div data-reel-stick="">
          <div ref={trackRef} data-reel-track="">
            <span data-horizon="" aria-hidden="true">
              <span ref={fillRef} data-horizon-fill="" />
            </span>

            {t.sectors.map((sector, i) => {
              const k = PLATFORM_SECTORS.indexOf(i)
              const platform = k < 0 ? null : t.platforms[k][1]
              return (
                <figure key={i} data-reel-frame="" style={css('margin:0')}>
                  <div data-reel-win="">
                    <span data-reel-img="">
                      <ImageSlot frame={sectorFrames[i]} placeholder={sector} size="md" eager={warm} sizes="(min-width: 1000px) 41vw, min(78vw, 460px)" />
                    </span>
                  </div>
                  <figcaption data-reel-cap="">
                    <span style={css("font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.06em;color:" + BRONZE)}>
                      {ordinal(i)}
                    </span>
                    <span style={css('display:block;margin-block:6px 6px;' + display(ar, ar ? 'clamp(24px,2.4vw,36px)' : 'clamp(24px,2.5vw,38px)', 300) + ';color:#ffffff')}>
                      {sector}
                    </span>
                    <span style={css('display:block;max-width:34ch;font-size:14px;line-height:1.55;color:rgba(255,255,255,.66)')}>
                      {t.sectorLines[i]}
                    </span>
                    {platform ? (
                      <span
                        style={css(
                          'display:inline-flex;align-items:center;gap:8px;margin-block-start:12px;height:26px;padding:0 12px;border-radius:999px;border:1px solid rgba(255,255,255,.24);' +
                            markType(platform, arabic(platform) ? '13px' : '11px', { weight: 500, tracking: '.14em' }) +
                            ';color:rgba(255,255,255,.86)',
                        )}
                      >
                        <span aria-hidden="true" style={css('width:5px;height:5px;border-radius:999px;background:' + BRONZE)} />
                        {platform}
                      </span>
                    ) : null}
                  </figcaption>
                </figure>
              )
            })}

            <div data-reel-end="">
              <Link
                href={routes.strategy}
                className="sp-nav"
                style={css(
                  'position:relative;display:inline-flex;align-items:center;gap:14px;padding-block:8px;' +
                    display(ar, ar ? 'clamp(22px,2.2vw,32px)' : 'clamp(22px,2.3vw,34px)', 300) +
                    ';color:#ffffff;text-decoration:none',
                )}
              >
                {t.reelMore}
                <span aria-hidden="true">{arrow}</span>
              </Link>
            </div>
          </div>

          <p data-reel-hud="" aria-hidden="true">
            <span ref={numRef} style={css("font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.06em;color:" + BRONZE)}>
              {ordinal(0) + ' / ' + ordinal(t.sectors.length - 1)}
            </span>
            <span ref={nameRef} style={css(display(ar, '15px', 400) + ';color:#ffffff')}>
              {t.sectors[0]}
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
