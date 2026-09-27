'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Mark } from '@/components/Mark'
import { HOME } from '@/lib/content/home'
import { css, cssWith, vars } from '@/lib/css'
import { reduceMotion, useScrollDriver } from '@/lib/hooks'
import { heroFrames, srcSet } from '@/lib/media'
import { routes } from '@/lib/routes'
import { INTRO_KEY, useSite } from '@/lib/site'
import { display, heroTitle, kicker, KICKER_RULE, ordinal } from '@/lib/typography'

/** How long each scene holds, from the moment its blade starts to cross. */
const DWELL = 6800
/** The blade's crossing. Kept in step with `sp-blade-*` in globals.css. */
const BLADE = 1500
/** The opening aperture, when it plays: the first scene holds this much longer. */
const INTRO = 1900

type FrameState = 'enter' | 'on' | 'under' | 'off'

/**
 * The home page's opening: the ecosystem, sector by sector, through one window.
 *
 * On a first visit the page opens on the SEEM square — the mark on deep green — and the square
 * becomes an aperture that widens to the full frame (pure CSS, keyed off `html[data-intro]`,
 * which the bootstrap script sets before first paint). From there the cinema cuts between the
 * sectors on a diagonal blade with an ember hairline riding its edge: the identity's one
 * signature transition, taken from the cut terminals of the mark's own letters.
 *
 * Scenes advance on a clock that only runs while the hero is on screen, the tab is visible and
 * nobody has paused it. The index along the foot names every sector and jumps to it. Scrolling
 * away closes the frame into an inset panel, so the next section arrives on the page rather
 * than under a hard cut. Reduced motion gets the first scene, still, with the index working.
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
  const driftRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const barsRef = useRef<HTMLSpanElement[]>([])

  const activeRef = useRef(0)
  const elapsedRef = useRef(0)
  const visibleRef = useRef(true)
  const settleRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const count = heroFrames.length

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

  // The next scene's photograph is fetched while this one holds, never all seven at once.
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

  // The clock. One rAF loop, alive only while playing; it writes the index progress directly.
  useEffect(() => {
    if (!playing || reduceMotion()) return
    let raf = 0
    let last = 0
    const tick = (now: number) => {
      const dt = last ? Math.min(64, now - last) : 0
      last = now
      if (visibleRef.current && document.visibilityState === 'visible') elapsedRef.current += dt
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

  // Scrolling away closes the frame into an inset panel and lets the copy go first.
  useScrollDriver({
    onFrame: () => {
      const section = sectionRef.current
      const stage = stageRef.current
      if (!section || !stage || reduceMotion()) return
      const h = section.offsetHeight || 1
      const p = Math.max(0, Math.min(1, (window.scrollY || 0) / (h * 0.86)))
      const inset = Math.min(56, window.innerWidth * 0.04) * p
      stage.style.clipPath = p > 0 ? 'inset(' + inset.toFixed(1) + 'px round ' + (p * 6).toFixed(1) + 'px)' : ''
      const drift = driftRef.current
      if (drift) drift.style.transform = 'translate3d(0,' + (p * h * 0.16).toFixed(1) + 'px,0)'
      const copy = copyRef.current
      if (copy) {
        copy.style.transform = 'translate3d(0,' + (p * -84).toFixed(1) + 'px,0)'
        copy.style.opacity = Math.max(0, 1 - p * 1.3).toFixed(3)
      }
    },
  })

  const stateOf = (i: number): FrameState => {
    if (i === active) return previous === null ? 'on' : 'enter'
    if (i === previous) return 'under'
    return 'off'
  }

  const current = heroFrames[active]

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-label={t.heroLabel}
      data-hero=""
      data-tone="dark"
      style={css(
        'position:relative;height:100svh;min-height:600px;max-height:1200px;overflow:clip;background:var(--page)',
      )}
    >
      {/* The ground the square opens out of, and the mark it opens from. Both only paint while
          the aperture runs; the mark sits over the stage so the photograph fills it from inside. */}
      <div data-hero-veil="" aria-hidden="true" />
      <span data-hero-mark="" aria-hidden="true">
        <Mark size={88} />
      </span>

      <div ref={stageRef} data-hero-stage="" aria-hidden="true">
        <div ref={driftRef} style={css('position:absolute;inset:-6% 0 0;will-change:transform')}>
          {heroFrames.map(({ frame }, i) => {
            const at = frame.focus ?? frame.photo.focus
            return (
              <div key={i} data-hframe="" data-state={stateOf(i)}>
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
            )
          })}
        </div>

        {/* The blade's edge: a light hairline with ember riding just behind it. */}
        {previous !== null ? (
          <span key={active} data-hblade="">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
              <line x1={ar ? 118.4 : -18.4} y1="0" x2={ar ? 100.4 : -0.4} y2="100" data-edge="ember" />
              <line x1={ar ? 118 : -18} y1="0" x2={ar ? 100 : 0} y2="100" data-edge="light" />
            </svg>
          </span>
        ) : null}

        <span data-hero-scrim="" />
        <span className="sp-grain" />
      </div>

      <div
        ref={copyRef}
        data-hero-copy=""
        style={css(
          'position:relative;z-index:3;box-sizing:border-box;height:100%;max-width:1400px;margin:0 auto;' +
            'display:flex;flex-direction:column;justify-content:flex-end;' +
            'padding:clamp(96px,14vh,150px) clamp(16px,3vw,32px) clamp(18px,3vh,30px);color:#ffffff;will-change:transform,opacity',
        )}
      >
        <p data-sc="" style={css(kicker(ar, 'rgba(255,255,255,.86)') + ';margin-block-end:clamp(16px,2.4vh,26px)')}>
          <span aria-hidden="true" style={css(KICKER_RULE)} />
          {t.positioning}
        </p>

        <h1 style={css(heroTitle(ar))}>
          {[t.h1a, t.h1b, t.h1c].map((line, i) => (
            <span key={i} data-sc="rise" data-stagger="" style={cssWith('display:block', vars({ '--i': i }))}>
              {line}
            </span>
          ))}
        </h1>

        <div
          data-sc=""
          style={css(
            'display:flex;flex-wrap:wrap;align-items:center;gap:14px 26px;margin-block-start:clamp(22px,3.4vh,36px)',
          )}
        >
          <Link
            href={routes.ecosystem}
            className="sp-lift sp-sheen"
            data-solid=""
            style={css(
              'box-sizing:border-box;display:inline-flex;align-items:center;gap:12px;height:54px;padding:0 30px;' +
                'border-radius:999px;background:#ffffff;color:#041815;font-size:15px;font-weight:500;' +
                'text-decoration:none;transition:transform .2s cubic-bezier(.2,.7,.3,1),box-shadow .2s',
            )}
          >
            {t.exploreCta}
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

        {/* The index: every scene named, the running one drawing its ember rule. */}
        <div
          data-sc=""
          style={css(
            'display:flex;align-items:flex-end;gap:clamp(12px,2vw,24px);margin-block-start:clamp(28px,6vh,64px)',
          )}
        >
          <div role="group" aria-label={t.scenes} data-hindex="" style={css('flex:1 1 auto;min-width:0')}>
            <p data-hnow="" style={css('margin:0 0 12px;display:flex;align-items:baseline;gap:12px')}>
              <span style={css("font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.06em;color:rgba(255,255,255,.62)")}>
                {ordinal(active)} / {ordinal(count - 1)}
              </span>
              <span style={css(display(ar, ar ? '18px' : '17px', 400) + ';color:#ffffff')}>{t.sectors[current.sector]}</span>
            </p>
            <div data-htracks="">
              {heroFrames.map(({ sector }, i) => (
                <button
                  key={i}
                  type="button"
                  data-htrack=""
                  aria-current={i === active ? 'true' : undefined}
                  aria-label={t.sceneLabel + ' ' + t.sectors[sector]}
                  onClick={() => go(i)}
                >
                  <span data-hline="">
                    <span
                      ref={(node) => {
                        if (node) barsRef.current[i] = node
                      }}
                      data-hfill=""
                    />
                  </span>
                  <span data-hlabel="">{t.sectors[sector]}</span>
                </button>
              ))}
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
