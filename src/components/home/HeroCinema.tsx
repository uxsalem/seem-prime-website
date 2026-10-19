'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { FocusEvent, TouchEvent } from 'react'
import { Mark } from '@/components/Mark'
import { DAY, HOME } from '@/lib/content/home'
import { css, cssWith, vars } from '@/lib/css'
import { reduceMotion, useScrollDriver } from '@/lib/hooks'
import { heroFrames, srcSet } from '@/lib/media'
import { routes } from '@/lib/routes'
import { INTRO_KEY, useSite } from '@/lib/site'
import { display, heroTitle, ordinal } from '@/lib/typography'

/** How long each scene holds, from the moment its blade starts to cross: long enough to read it. */
const DWELL = 9000
/** The blade's crossing. Kept in step with `sp-blade-*` in globals.css. */
const BLADE = 1500
/** The opening aperture, when it plays: the first scene holds this much longer. */
const INTRO = 1900

type FrameState = 'enter' | 'on' | 'under' | 'off'

/** A scene's door: its platform's address on the ecosystem page, or the page itself. */
const doorOf = (i: number) => {
  const { platform } = DAY[i]
  return platform ? routes.ecosystem + '#' + platform : routes.ecosystem
}

/**
 * A scene's hour on a 12-hour clock, as [hour, half of the day]: «20:30» reads «8:30» and the
 * evening's mark, «05:00» reads «5:00» and the morning's. «24», the whole day, has no half.
 */
const twelveOf = (i: number, am: string, pm: string): [string, string] => {
  const at = /^(\d{1,2}):(\d{2})$/.exec(DAY[i].clock)
  if (!at) return [DAY[i].clock, '']
  const h = Number(at[1])
  return [((h + 11) % 12) + 1 + ':' + at[2], h < 12 ? am : pm]
}

/**
 * The home page's opening: a day in the ecosystem, one hour and one sector at a time.
 *
 * On a first visit the page opens on the SEEM square — the mark on deep green — and the square
 * becomes an aperture that widens to the full frame (pure CSS, keyed off `html[data-intro]`,
 * which the bootstrap script sets before first paint). The first scene is the whole day; the
 * rest run from dawn to evening, each a sector at the hour it meets someone's day. A scene is a
 * whole frame: its photograph, its hour in outline in the far corner, on a 12-hour clock with its
 * half of the day beside it, and its copy — the main line, the line under it, what the sector
 * does, whose scene it is where the button does not already say, and its door. The sector itself
 * is named once, in the index. The cinema cuts between scenes on a diagonal blade with an ember
 * hairline riding its
 * edge, the identity's one signature transition, and the blade carries the copy with the
 * picture, so the incoming scene's lines glide in behind it as the old ones are pushed out.
 *
 * Scenes advance on a clock that only runs while the hero is on screen, the tab is visible and
 * nobody has paused it; it also holds while the pointer rests on the copy, or the keyboard is
 * inside the hero, so a scene can be read to the end. The index along the foot lays the day out
 * hour by hour and jumps to any scene; on a touch screen a swipe in the reading direction goes
 * forward. Scrolling away closes the frame into an inset panel. Reduced motion gets the first
 * scene, still, with the index working.
 */
export function HeroCinema() {
  const { lang, ar, arrow } = useSite()
  const t = HOME[lang]

  const [active, setActive] = useState(0)
  const [previous, setPrevious] = useState<number | null>(null)
  const [playing, setPlaying] = useState(true)
  const [loaded, setLoaded] = useState<ReadonlySet<number>>(() => new Set([0]))
  const [decoded, setDecoded] = useState<ReadonlySet<number>>(() => new Set())

  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const footRef = useRef<HTMLDivElement>(null)
  const barsRef = useRef<HTMLSpanElement[]>([])

  const activeRef = useRef(0)
  const elapsedRef = useRef(0)
  const visibleRef = useRef(true)
  const pointerHoldRef = useRef(false)
  const focusHoldRef = useRef(false)
  const touchRef = useRef<{ x: number; y: number } | null>(null)
  const settleRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const count = heroFrames.length
  const nameOf = (i: number) => {
    const sector = DAY[i].sector
    return sector === null ? t.ecosystemName : t.sectors[sector]
  }

  const load = useCallback((...indices: number[]) => {
    setLoaded((current) => {
      if (indices.every((i) => current.has(i % count))) return current
      const next = new Set(current)
      indices.forEach((i) => next.add(i % count))
      return next
    })
  }, [count])

  const go = useCallback(
    (to: number) => {
      const next = ((to % count) + count) % count
      if (next === activeRef.current) return
      setPrevious(activeRef.current)
      activeRef.current = next
      setActive(next)
      elapsedRef.current = 0
      load(next, next + 1)
      clearTimeout(settleRef.current)
      settleRef.current = setTimeout(() => setPrevious(null), BLADE + 80)
    },
    [count, load],
  )

  // The opening aperture is CSS; this only records that it has played and hands the frame back
  // to the scroll pass once it has finished, so a return to the page does not replay it.
  useEffect(() => {
    const root = document.documentElement
    if (root.getAttribute('data-intro') !== 'play') return
    elapsedRef.current = -INTRO
    try {
      sessionStorage.setItem(INTRO_KEY, '1')
    } catch {
      /* private mode — the intro simply plays again next visit */
    }
    const done = setTimeout(() => root.removeAttribute('data-intro'), INTRO + 700)
    return () => clearTimeout(done)
  }, [])

  // The next scene's photograph is fetched while this one holds, never all of them at once.
  useEffect(() => {
    const soon = setTimeout(() => load(active + 1), 1400)
    return () => clearTimeout(soon)
  }, [active, load])

  useEffect(() => () => clearTimeout(settleRef.current), [])

  // Only run the clock while someone can see it.
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const io = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting && entry.intersectionRatio > 0.25
    }, { threshold: [0, 0.25, 0.5] })
    io.observe(section)
    return () => io.disconnect()
  }, [])

  // The scenes' copy stands clear of the index along the foot, whatever height the index takes.
  useEffect(() => {
    const section = sectionRef.current
    const foot = footRef.current
    if (!section || !foot) return
    const ro = new ResizeObserver(() => section.style.setProperty('--hfoot', Math.ceil(foot.offsetHeight) + 'px'))
    ro.observe(foot)
    return () => ro.disconnect()
  }, [])

  // The clock. One rAF loop, alive only while playing; it writes the index progress directly.
  useEffect(() => {
    if (!playing || reduceMotion()) return
    let raf = 0
    let last = 0
    const tick = (now: number) => {
      const dt = last ? Math.min(64, now - last) : 0
      last = now
      const held = pointerHoldRef.current || focusHoldRef.current
      if (visibleRef.current && !held && document.visibilityState === 'visible') elapsedRef.current += dt
      const p = Math.max(0, Math.min(1, elapsedRef.current / DWELL))
      const bar = barsRef.current[activeRef.current]
      if (bar) bar.style.transform = 'scaleX(' + p.toFixed(4) + ')'
      if (elapsedRef.current >= DWELL) go(activeRef.current + 1)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [playing, go])

  // Empty every track but the running one; with motion off the current scene's track reads full.
  useEffect(() => {
    const still = reduceMotion()
    barsRef.current.forEach((bar, i) => {
      if (!bar) return
      if (i !== active) bar.style.transform = 'scaleX(0)'
      else if (still) bar.style.transform = 'scaleX(1)'
    })
  }, [active])

  // Scrolling away closes the frame into an inset panel and lets the copy go first. The
  // photographs drift and the copy lifts through custom properties, because every scene carries
  // its own of each.
  useScrollDriver({
    onFrame: () => {
      const section = sectionRef.current
      const stage = stageRef.current
      if (!section || !stage || reduceMotion()) return
      const h = section.offsetHeight || 1
      const p = Math.max(0, Math.min(1, (window.scrollY || 0) / (h * 0.86)))
      const inset = Math.min(56, window.innerWidth * 0.04) * p
      stage.style.clipPath = p > 0 ? 'inset(' + inset.toFixed(1) + 'px round ' + (p * 6).toFixed(1) + 'px)' : ''
      section.style.setProperty('--hdrift', (p * h * 0.16).toFixed(1) + 'px')
      section.style.setProperty('--hlift', (p * -84).toFixed(1) + 'px')
      section.style.setProperty('--hfade', Math.max(0, 1 - p * 1.3).toFixed(3))
    },
  })

  // The keyboard holds the clock while it is inside the hero; a click on the index does not.
  const onFocus = (event: FocusEvent<HTMLElement>) => {
    focusHoldRef.current = event.target.matches(':focus-visible')
  }
  const onBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) focusHoldRef.current = false
  }

  // A swipe in the reading direction goes forward: the next scene comes in from the side the
  // blade starts on, so the finger draws it across.
  const onTouchStart = (event: TouchEvent<HTMLElement>) => {
    const touch = event.touches[0]
    touchRef.current = touch ? { x: touch.clientX, y: touch.clientY } : null
  }
  const onTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const start = touchRef.current
    const touch = event.changedTouches[0]
    touchRef.current = null
    if (!start || !touch) return
    const dx = touch.clientX - start.x
    const dy = touch.clientY - start.y
    if (Math.abs(dx) < 56 || Math.abs(dx) < Math.abs(dy) * 1.5) return
    go(activeRef.current + ((ar ? dx < 0 : dx > 0) ? 1 : -1))
  }

  const stateOf = (i: number): FrameState => {
    if (i === active) return previous === null ? 'on' : 'enter'
    if (i === previous) return 'under'
    return 'off'
  }

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-label={t.heroLabel}
      data-hero=""
      data-tone="dark"
      data-paused={playing ? undefined : ''}
      onFocus={onFocus}
      onBlur={onBlur}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={css(
        'position:relative;height:100svh;min-height:600px;max-height:1200px;overflow:clip;background:var(--page)',
      )}
    >
      <h1 data-sr="">{t.heroTitle}</h1>

      {/* The ground the square opens out of, and the mark it opens from. Both only paint while
          the aperture runs; the mark sits over the stage so the photograph fills it from inside. */}
      <div data-hero-veil="" aria-hidden="true" />
      <span data-hero-mark="" aria-hidden="true">
        <Mark size={88} />
      </span>

      <div ref={stageRef} data-hero-stage="">
        {heroFrames.map((frame, i) => {
          const at = frame.focus ?? frame.photo.focus
          const scene = t.day[i]
          const [hour, half] = twelveOf(i, t.am, t.pm)
          // The first scene is the one on screen at load: its lines arrive through the page's
          // reveal, after the aperture when it plays. The others arrive behind the blade.
          const sc = (variant = '') => (i === 0 ? { 'data-sc': variant } : {})
          return (
            <div
              key={i}
              data-hframe=""
              data-state={stateOf(i)}
              role="group"
              aria-label={ordinal(i) + ' / ' + ordinal(count - 1) + ' · ' + nameOf(i)}
            >
              <div data-hphoto="" aria-hidden="true">
                <span
                  style={css(
                    'position:absolute;inset:-4%;background-image:url("' +
                      frame.photo.lqip +
                      '");background-size:cover;background-position:' +
                      at +
                      ';filter:blur(24px)',
                  )}
                />
                {loaded.has(i) ? (
                  // eslint-disable-next-line @next/next/no-img-element -- full-bleed scenes, sized by the viewport
                  <img
                    data-himg=""
                    src={frame.photo.src}
                    srcSet={srcSet(frame.photo)}
                    sizes="100vw"
                    alt=""
                    decoding="async"
                    loading={i === 0 ? 'eager' : 'lazy'}
                    fetchPriority={i === 0 ? 'high' : 'low'}
                    onLoad={() => setDecoded((d) => (d.has(i) ? d : new Set(d).add(i)))}
                    ref={(node) => {
                      if (node?.complete && node.naturalWidth) setDecoded((d) => (d.has(i) ? d : new Set(d).add(i)))
                    }}
                    style={css(
                      'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:' +
                        at +
                        ';opacity:' +
                        (decoded.has(i) ? '1' : '0') +
                        ';transition:opacity .9s cubic-bezier(.2,.7,.3,1)',
                    )}
                  />
                ) : null}
              </div>
              <span data-hero-scrim="" aria-hidden="true" />
              <span className="sp-grain" aria-hidden="true" />

              <div data-hscene="">
                {/* The hour, drawn in outline in the far corner, its half of the day set small beside
                    it: 24 for the whole day. */}
                <p data-hclock="" aria-hidden="true">
                  {hour}
                  {half ? <span data-hhalf="">{half}</span> : null}
                </p>

                <div
                  data-hcol=""
                  onPointerEnter={(event) => {
                    if (event.pointerType === 'mouse') pointerHoldRef.current = true
                  }}
                  onPointerLeave={() => {
                    pointerHoldRef.current = false
                  }}
                >
                  <h2 data-hg="" {...sc('rise')} data-stagger="" style={cssWith(heroTitle(ar), vars({ '--i': 0 }))}>
                    {scene.title}
                  </h2>

                  {scene.sub ? (
                    <p data-hg="" data-hsub="" {...sc()} data-stagger="" style={vars({ '--i': 1 })}>
                      {scene.sub}
                    </p>
                  ) : null}

                  <p data-hg="" data-hbody="" {...sc()} data-stagger="" style={vars({ '--i': 2 })}>
                    {scene.body}
                  </p>

                  {scene.brand ? (
                    <p data-hg="" data-hbrand="" {...sc()} data-stagger="" style={vars({ '--i': 3 })}>
                      {scene.brand}
                    </p>
                  ) : null}

                  <div data-hg="" data-hctas="" {...sc()} data-stagger="" style={vars({ '--i': 4 })}>
                    <Link
                      href={doorOf(i)}
                      className="sp-lift sp-sheen"
                      data-solid=""
                      style={css(
                        'box-sizing:border-box;display:inline-flex;align-items:center;gap:12px;height:54px;padding:0 30px;' +
                          'border-radius:999px;background:#ffffff;color:#041815;font-size:15px;font-weight:500;' +
                          'text-decoration:none;transition:transform .2s cubic-bezier(.2,.7,.3,1),box-shadow .2s',
                      )}
                    >
                      {scene.cta}
                      <span aria-hidden="true">{arrow}</span>
                    </Link>
                    <Link
                      href={routes.contact}
                      className="sp-nav"
                      style={css('position:relative;font-size:15px;font-weight:500;color:#ffffff;text-decoration:none;padding-block:6px')}
                    >
                      {t.cta}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {/* The blade's edge: a light hairline with ember riding just behind it. */}
        {previous !== null ? (
          <span key={active} data-hblade="" aria-hidden="true">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
              <line x1={ar ? 118.4 : -18.4} y1="0" x2={ar ? 100.4 : -0.4} y2="100" data-edge="ember" />
              <line x1={ar ? 118 : -18} y1="0" x2={ar ? 100 : 0} y2="100" data-edge="light" />
            </svg>
          </span>
        ) : null}
      </div>

      {/* The index: the day laid out hour by hour, the running scene drawing its ember rule. */}
      <div ref={footRef} data-hfoot="">
        <div data-sc="" style={css('display:flex;align-items:flex-end;gap:clamp(12px,2vw,24px)')}>
          <div role="group" aria-label={t.scenes} data-hindex="" style={css('flex:1 1 auto;min-width:0')}>
            <p data-hnow="" style={css('margin:0 0 12px;display:flex;align-items:baseline;gap:12px')}>
              <span style={css("font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.06em;color:rgba(255,255,255,.62)")}>
                {ordinal(active)} / {ordinal(count - 1)}
              </span>
              <span style={css(display(ar, ar ? '18px' : '17px', 400) + ';color:#ffffff')}>{nameOf(active)}</span>
            </p>
            <div data-htracks="">
              {heroFrames.map((_, i) => {
                const [hour, half] = twelveOf(i, t.am, t.pm)
                return (
                  <button
                    key={i}
                    type="button"
                    data-htrack=""
                    aria-current={i === active ? 'true' : undefined}
                    aria-label={t.sceneLabel + ' ' + nameOf(i)}
                    onClick={() => go(i)}
                  >
                    <span data-hhour="" aria-hidden="true">
                      {hour}
                      {half ? <span data-hhalf="">{half}</span> : null}
                    </span>
                    <span data-hline="">
                      <span
                        ref={(node) => {
                          if (node) barsRef.current[i] = node
                        }}
                        data-hfill=""
                      />
                    </span>
                    <span data-hlabel="">{nameOf(i)}</span>
                  </button>
                )
              })}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? t.pause : t.play}
            aria-pressed={!playing}
            className="sp-op"
            data-hpause=""
          >
            {playing ? (
              <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                <rect x="3.5" y="2.5" width="2.4" height="11" fill="currentColor" />
                <rect x="10.1" y="2.5" width="2.4" height="11" fill="currentColor" />
              </svg>
            ) : (
              // Media controls keep their direction in Arabic: play points the way the tape runs.
              <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                <path d="M4 2.5 L13 8 L4 13.5 Z" fill="currentColor" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  )
}
