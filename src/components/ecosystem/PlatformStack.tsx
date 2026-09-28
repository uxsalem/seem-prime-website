'use client'

import Link from 'next/link'
import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { ImageSlot } from '@/components/ImageSlot'
import {
  floorMatrix,
  labelAnchor,
  labelEdge,
  modelLayers,
  podiumFront,
  stackGeometry,
  stillGeometry,
  type StackGeo,
} from '@/components/ecosystem/StackModel'
import { ECOSYSTEM, ECOSYSTEM_IDS, PLATFORM_IDS, PLATFORM_SECTORS } from '@/lib/content/ecosystem'
import { css, cssWith, vars } from '@/lib/css'
import { glide, useIsomorphicLayoutEffect, useScrollDriver } from '@/lib/hooks'
import { ecosystemPlatforms } from '@/lib/media'
import { routes } from '@/lib/routes'
import { useSite } from '@/lib/site'
import { BRONZE, display, markType, ordinal } from '@/lib/typography'

/** Pinned where a card can hold the screen and the model has room beside its copy, and motion is welcome. */
export const STACK_QUERY = '(min-width: 1000px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)'

const clamp01 = (n: number) => Math.max(0, Math.min(1, n))
/** Where `p` sits between `a` and `b`, as 0–1. */
const span = (p: number, a: number, b: number) => clamp01((p - a) / (b - a))
/** Gather, travel, settle: `--ease-arch` for values the scroll drives rather than the clock. */
const arch = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const mix = (a: number, b: number, t: number) => a + (b - a) * t
const px = (n: number) => n.toFixed(1) + 'px'

const COUNT = ecosystemPlatforms.length

/**
 * The pin, in screens of scroll. The title card holds; each platform rises over the one before it
 * and holds, the last a little longer; then the camera pulls back and the deck is a model; the
 * floors take their thickness, the chapter's copy arrives, the cores rise through the floors, and
 * last the camera looks up at the floors still to come. A platform more is a stretch of scroll
 * more, never a faster deck: the pin is as tall as its travel (`--travel`, set on it below).
 */
const TITLE = 0.3
const PER = 0.75
/** Where the camera starts to pull back: every platform in, and the last one read. */
const PULL_AT = TITLE + (COUNT - 1) * PER + 0.81
const TRAVEL = PULL_AT + 2.64
/** A point on the pin, in screens, as a share of its travel: what the scroll pass measures. */
const at = (screens: number) => screens / TRAVEL
const DECK = at(TITLE)
const STEP = at(PER)
const RISE = at(0.36)
const PULL: [number, number] = [at(PULL_AT), at(PULL_AT + 0.72)]
const FACES: [number, number] = [at(PULL_AT + 0.57), at(PULL_AT + 0.78)]
const COPY: [number, number] = [at(PULL_AT + 0.48), at(PULL_AT + 0.96)]
const CORES: [number, number] = [at(PULL_AT + 0.96), at(PULL_AT + 1.68)]
const ROOM: [number, number] = [at(PULL_AT + 1.74), at(PULL_AT + 2.28)]
/** How far the camera looks up at the end, in floors. */
const PAN = 1.5
/** How far each core rises behind the one before it, in floors. */
const LAG = 0.06
/** A core rises a floor at a time, each core a step behind the one before: all four finish together. */
const RISEN = COUNT + LAG * 3
const cardAt = (k: number) => DECK + k * STEP
/** Where each platform can be read, card risen and copy in: its address. */
const readAt = (k: number) => cardAt(k) + RISE + at(0.18)
const MODEL_AT = COPY[1] + at(0.06)

/**
 * A chapter per platform, and one for what they stand on.
 *
 * The platforms arrive one at a time, each a full screen of its own — its picture, its name set
 * large, its line, and a framed detail of what it leads to — and each is laid over the one
 * before it the way a floor is laid on the floor below, while the one beneath settles back. Once
 * the last is down, the camera pulls back and the deck turns out to have been a building: the
 * cards lie back into the floors of a model, drawn as an architect draws one, on a podium
 * lettered SEEM PRIME. Four cores rise out of the podium through every floor — capital,
 * technology, operations, partnerships — and once they are up, light keeps moving along them,
 * up two and down two, for as long as the model is on screen. Last, the camera looks up: the
 * cores carry on past the top floor, through two floors drawn but not yet built.
 *
 * Everything moves on transforms the scroll pass writes. Each card becomes its floor through a
 * single `matrix()`, and the model around the floors is drawn in SVG from the same geometry, so
 * the two meet exactly (see `StackModel.tsx`). Narrow screens and reduced motion get the
 * platforms in turn and the model at rest beneath them.
 */
export function PlatformStack() {
  const { lang, ar, arrow } = useSite()
  const t = ECOSYSTEM[lang]
  const uid = useId().replace(/:/g, '')
  const dir: 1 | -1 = ar ? -1 : 1

  const [geo, setGeo] = useState<StackGeo | null>(null)
  // Platforms whose pictures are mounted. Pinned, the stage clips the cards still to rise, so the
  // browser's lazy loading would wait until each is already moving: the first is mounted once the
  // stage is halfway up the screen, each next one as the card before it starts to rise, and each
  // loads as soon as it is mounted. Laid flat, every one is mounted and loads lazily as usual.
  const [mounted, setMounted] = useState(0)
  const mountedRef = useRef(0)
  // The model at rest draws its floors with SVG images, which load even inside a hidden figure,
  // so they are only mounted once that figure is laid out and a screen away.
  const [stillNear, setStillNear] = useState(false)

  const pinRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<HTMLElement[]>([])
  const layerRefs = useRef<SVGSVGElement[]>([])
  const labelsRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLElement>(null)
  const stillRef = useRef<HTMLElement>(null)
  const markRefs = useRef<HTMLSpanElement[]>([])
  const geoRef = useRef<StackGeo | null>(null)
  const pinnedRef = useRef(false)
  const liveRef = useRef(false)

  const mountUpTo = useCallback((n: number) => {
    const next = Math.min(COUNT, n)
    if (next <= mountedRef.current) return
    mountedRef.current = next
    setMounted(next)
  }, [])

  // Laid flat, light runs along the model's cores while the model is on screen.
  useEffect(() => {
    const figure = stillRef.current
    if (!figure) return
    const live = new IntersectionObserver(([entry]) => figure.toggleAttribute('data-live', entry.isIntersecting))
    const near = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setStillNear(true)
        near.disconnect()
      },
      { rootMargin: '100% 0px' },
    )
    live.observe(figure)
    near.observe(figure)
    return () => {
      live.disconnect()
      near.disconnect()
    }
  }, [])

  // The scroll pass. It reads nothing but refs, so the layout pass can call it too, to repaint a
  // stage that has just been measured before anyone scrolls.
  const paint = useCallback(() => {
    const pin = pinRef.current
    const stage = stageRef.current
    const g = geoRef.current
    if (!pin || !stage || !g || !pinnedRef.current) return
    const vh = window.innerHeight || 800
    const rect = pin.getBoundingClientRect()
    if (rect.bottom < -vh || rect.top > vh * 1.5) return
    const p = clamp01(-rect.top / Math.max(1, rect.height - vh))
    const { H } = g

    if (rect.top < vh * 0.5) mountUpTo(1 + ecosystemPlatforms.filter((_, k) => p >= cardAt(k)).length)

    const pull = arch(span(p, PULL[0], PULL[1]))
    const pan = arch(span(p, ROOM[0], ROOM[1])) * PAN * g.pitch

    const intro = introRef.current
    if (intro) {
      const under = span(p, cardAt(0), cardAt(0) + RISE)
      intro.style.opacity = (1 - span(under, 0.6, 1)).toFixed(3)
      intro.style.transform = 'translate3d(0,' + px(-0.06 * H * arch(under)) + ',0)'
    }

    cardRefs.current.forEach((card, k) => {
      const rise = arch(span(p, cardAt(k), cardAt(k) + RISE))
      const next = k < COUNT - 1 ? arch(span(p, cardAt(k + 1), cardAt(k + 1) + RISE)) : 0
      // On the deck: risen from below the stage, then settling back under the next platform.
      const q = 1 - 0.07 * next
      const ty = (1 - rise) * H - 0.035 * H * next
      // In the model: laid back as its floor.
      const m = floorMatrix(g, k)
      card.style.transform =
        'matrix(' +
        [mix(q, m.a, pull), 0, mix(0, m.c, pull), mix(q, m.d, pull), mix(0, m.e, pull), mix(ty, m.f, pull) + pan]
          .map((n) => n.toFixed(4))
          .join(',') +
        ')'

      const photo = card.querySelector<HTMLElement>('[data-card-photo]')
      if (photo) photo.style.transform = 'translate3d(0,' + px(-(1 - rise) * 0.12 * H) + ',0)'
      const shade = card.querySelector<HTMLElement>('[data-card-shade]')
      // Lower floors sit a shade further back once the model is drawn.
      if (shade) shade.style.opacity = mix(0.62 * next, 0.06 * (COUNT - 1 - k), pull).toFixed(3)
      const scrim = card.querySelector<HTMLElement>('[data-card-scrim]')
      if (scrim) scrim.style.opacity = (1 - pull).toFixed(3)
      const copy = card.querySelector<HTMLElement>('[data-card-copy]')
      if (copy) {
        const arrive = span(p, cardAt(k) + RISE * 0.55, cardAt(k) + RISE + 0.02)
        copy.style.opacity = (arrive * (1 - span(next, 0, 0.45)) * (1 - span(pull, 0, 0.22))).toFixed(3)
        copy.style.transform = 'translate3d(0,' + px(26 * (1 - arrive)) + ',0)'
        // The detail unveils from its foot a beat behind the copy, its picture settling as it opens.
        const open = arch(span(arrive, 0.2, 1))
        const win = copy.querySelector<HTMLElement>('[data-detail-win]')
        if (win) {
          win.style.clipPath = 'inset(' + ((1 - open) * 100).toFixed(2) + '% 0 0 0)'
          win.style.setProperty('--settle', (1.14 - 0.14 * open).toFixed(4))
        }
      }
    })

    // The model around the floors: the podium rises into place with the pull, the floors take
    // their thickness once they have landed, and the cores rise through them.
    const faces = span(p, FACES[0], FACES[1])
    const cores = span(p, CORES[0], CORES[1]) * RISEN
    const room = span(p, ROOM[0] + 0.02, ROOM[1])
    layerRefs.current.forEach((layer, i) => {
      const lift = i === 0 ? (1 - pull) * 0.3 * H : 0
      layer.style.transform = 'translate3d(0,' + px(lift + pan) + ',0)'
      layer.style.opacity = (i === 0 ? span(pull, 0.25, 0.9) : 1).toFixed(3)
      layer.style.setProperty('--faces', faces.toFixed(3))
      layer.style.setProperty('--room', room.toFixed(3))
    })
    stage.querySelectorAll<SVGLineElement>('[data-model-layer] [data-core-seg]').forEach((seg) => {
      const i = Number(seg.dataset.seg)
      const j = Number(seg.dataset.core)
      seg.style.strokeDashoffset = (1 - clamp01(cores - i - j * LAG)).toFixed(4)
    })
    stage.querySelectorAll<SVGPolygonElement>('[data-model-layer] [data-collar]').forEach((c) => {
      c.toggleAttribute('data-lit', cores - Number(c.dataset.core) * LAG >= Number(c.dataset.level) - 0.02)
    })

    const labels = labelsRef.current
    if (labels) {
      labels.style.transform = 'translate3d(0,' + px(pan) + ',0)'
      labels.querySelectorAll<HTMLElement>('[data-floor-label]').forEach((label, k) => {
        label.style.opacity = span(p, COPY[0] + 0.012 * k, COPY[0] + 0.035 + 0.012 * k).toFixed(3)
      })
      labels.querySelectorAll<HTMLElement>('[data-core-label]').forEach((label, j) => {
        label.style.opacity = (span(p, CORES[0] + 0.01 * j, CORES[0] + 0.05 + 0.01 * j) * (1 - span(p, ROOM[0], ROOM[0] + 0.05))).toFixed(3)
      })
      const plinth = labels.querySelector<HTMLElement>('[data-plinth]')
      if (plinth) plinth.style.opacity = (faces * (1 - span(p, ROOM[0], ROOM[0] + 0.05))).toFixed(3)
      const target = labels.querySelector<HTMLElement>('[data-target]')
      if (target) target.style.opacity = span(p, ROOM[0] + 0.04, ROOM[1]).toFixed(3)
    }

    const copy = copyRef.current
    if (copy) {
      const arrive = span(p, COPY[0], COPY[1])
      copy.style.opacity = arrive.toFixed(3)
      copy.style.transform = 'translate3d(0,' + px(24 * (1 - arrive)) + ',0)'
    }

    const rail = railRef.current
    if (rail) {
      const out = span(p, PULL[0] - 0.03, PULL[0] + 0.01)
      rail.style.opacity = ((1 - out) * span(p, cardAt(0), cardAt(0) + RISE * 0.6)).toFixed(3)
      rail.style.visibility = out < 1 ? 'visible' : 'hidden'
      const now = ecosystemPlatforms.filter((_, k) => p >= cardAt(k) + RISE * 0.5).length - 1
      rail.querySelectorAll<HTMLElement>('[data-rail-item]').forEach((item, k) => {
        const end = k < COUNT - 1 ? cardAt(k + 1) + RISE * 0.5 : PULL[0]
        item.style.setProperty('--fill', span(p, cardAt(k) + RISE * 0.5, end).toFixed(4))
        if (k !== now) item.removeAttribute('aria-current')
        else if (!item.hasAttribute('aria-current')) item.setAttribute('aria-current', 'true')
      })
    }

    // Light moves along the cores only once they stand, and only while the model is on screen.
    const live = cores >= RISEN && rect.bottom > vh * 0.2
    if (live !== liveRef.current) {
      liveRef.current = live
      stage.toggleAttribute('data-live', live)
    }
  }, [mountUpTo])

  // Pin or lay flat, measure the stage, and put each chapter's address where it can be read.
  useIsomorphicLayoutEffect(() => {
    const pin = pinRef.current
    const stage = stageRef.current
    if (!pin || !stage) return

    const clear = (el: Element | null | undefined, ...props: string[]) =>
      props.forEach((prop) => (el as HTMLElement | null)?.style?.removeProperty(prop))

    const measure = () => {
      const pinned = window.matchMedia(STACK_QUERY).matches
      pinnedRef.current = pinned
      const marks = markRefs.current
      if (!pinned) {
        geoRef.current = null
        setGeo(null)
        mountUpTo(COUNT)
        clear(introRef.current, 'opacity', 'transform')
        cardRefs.current.forEach((card) => {
          clear(card, 'transform')
          card.querySelectorAll('[data-card-photo],[data-card-shade],[data-card-scrim],[data-card-copy]').forEach((el) =>
            clear(el, 'transform', 'opacity'),
          )
          clear(card.querySelector('[data-detail-win]'), 'clip-path', '--settle')
        })
        clear(copyRef.current, 'opacity', 'transform')
        stage.removeAttribute('data-live')
        liveRef.current = false
        // Laid flat, each address is simply where its platform, or the model, starts.
        const top = pin.getBoundingClientRect().top
        const targets = [...cardRefs.current, copyRef.current]
        marks.forEach((mark, i) => {
          const target = targets[i]
          if (target) mark.style.top = px(target.getBoundingClientRect().top - top)
        })
        return
      }

      const W = stage.clientWidth
      const H = stage.clientHeight
      // The model takes the band between the chapter's copy and the floors' labels.
      const pad = Math.max(Math.min(Math.max(16, W * 0.03), 32), (W - 1400) / 2 + 32)
      const text = Math.min(400, 0.29 * (W - 2 * pad))
      const tags = Math.min(230, 0.18 * (W - 2 * pad))
      const gap = 44
      const [start, end] = [pad + text + gap, W - pad - tags - gap]
      const box = {
        left: ar ? W - end : start,
        right: ar ? W - start : end,
        top: Math.max(96, 0.12 * H),
        bottom: H - Math.max(58, 0.08 * H),
      }
      const next = stackGeometry(W, H, dir, box, COUNT)
      geoRef.current = next
      setGeo(next)
      const travel = pin.offsetHeight - (window.innerHeight || H)
      marks.forEach((mark, i) => {
        mark.style.top = px((i < COUNT ? readAt(i) : MODEL_AT) * travel)
      })
      paint()
    }

    measure()
    document.fonts?.ready.then(measure).catch(() => {})
    window.addEventListener('resize', measure)
    const mql = window.matchMedia(STACK_QUERY)
    mql.addEventListener('change', measure)
    return () => {
      window.removeEventListener('resize', measure)
      mql.removeEventListener('change', measure)
    }
  }, [ar, dir, mountUpTo, paint])

  // The layers render from the geometry after it is measured; paint them once they exist.
  useIsomorphicLayoutEffect(() => {
    paint()
  }, [geo, paint])

  useScrollDriver({ onFrame: paint })

  // A keyboard that reaches a platform's link while another platform holds the screen is taken
  // to the platform it is in.
  const follow = (k: number) => {
    if (!pinnedRef.current) return
    const mark = markRefs.current[k]
    const pin = pinRef.current
    if (!mark || !pin) return
    const target = pin.getBoundingClientRect().top + window.scrollY + mark.offsetTop
    if (Math.abs(window.scrollY - target) > 4) window.scrollTo({ top: target })
  }

  // Pinned, the model's labels are one picture to assistive technology, described in full; laid
  // flat, the figure's key is ordinary text.
  const described = [t.modelLabel, t.cores.map(([core]) => core).join(ar ? '، ' : ', '), t.target].join('. ')
  const pinned = geo !== null
  const still = useMemo(() => stillGeometry(dir, COUNT), [dir])
  const layers = useMemo(() => (geo ? modelLayers(geo, uid + '-pin') : []), [geo, uid])
  const stillLayers = useMemo(() => modelLayers(still.geo, uid + '-still'), [still, uid])

  const label = (ar ? "font-family:'IBM Plex Sans Arabic',sans-serif;font-size:14px;font-weight:600" : "font-family:'Sora',sans-serif;font-size:11px;font-weight:500;letter-spacing:.2em;text-transform:uppercase") + ';color:rgba(255,255,255,.86)'
  const mono = "font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.06em;color:" + BRONZE

  return (
    <section
      id={ECOSYSTEM_IDS.platforms}
      aria-labelledby="ps-h"
      data-stack=""
      data-tone="dark"
      style={css('position:relative;background:#041815;color:#ffffff')}
    >
      <div ref={pinRef} data-stack-pin="" style={vars({ '--travel': TRAVEL })}>
        {[...PLATFORM_IDS, ECOSYSTEM_IDS.model].map((id, i) => (
          <span
            key={id}
            id={id}
            ref={(node) => {
              if (node) markRefs.current[i] = node
            }}
            data-stack-mark=""
            aria-hidden="true"
          />
        ))}

        <div ref={stageRef} data-stack-stage="">
          {/* The title card the first platform rises over. */}
          <div ref={introRef} data-stack-intro="">
            <div data-intro-copy="">
              <h2
                id="ps-h"
                data-sc="rise"
                style={css(
                  'margin:0;max-width:13ch;' +
                    display(ar, ar ? 'clamp(36px,4.8vw,74px)' : 'clamp(38px,5vw,78px)') +
                    ';color:#ffffff;text-wrap:balance',
                )}
              >
                {t.deckH}
              </h2>
              <p
                data-sc=""
                style={css(
                  'margin:clamp(18px,2.4vw,28px) 0 0;max-width:40ch;font-weight:300;font-size:clamp(16px,1.6vw,19px);' +
                    'line-height:1.62;color:rgba(255,255,255,.76)',
                )}
              >
                {t.deckLead}
              </p>
            </div>

            {/* A directory, the way a building lists its floors: top floor first. */}
            <ol reversed data-directory="" data-sc="">
              {[...t.platforms].reverse().map(([, what, name], r) => {
                const k = COUNT - 1 - r
                return (
                  <li key={name}>
                    <a href={'#' + PLATFORM_IDS[k]} onClick={(event) => glide(event, PLATFORM_IDS[k])} data-dir-row="">
                      <span style={css(mono)}>{ordinal(k)}</span>
                      <span data-dir-name="" style={css(markType(name, 'clamp(22px,2.1vw,32px)') + ';color:#ffffff')}>
                        {name}
                      </span>
                      <span data-dir-what="">{what}</span>
                    </a>
                  </li>
                )
              })}
            </ol>
          </div>

          {/* The platforms, each a card over the one before it, and each a floor of the model. */}
          {ecosystemPlatforms.map(({ plate, detail }, k) => {
            const [sector, what, name, line] = t.platforms[k]
            const show = k < mounted
            return (
              <article
                key={name}
                ref={(node) => {
                  if (node) cardRefs.current[k] = node
                }}
                data-card=""
                aria-labelledby={`ps-${k}`}
                onFocus={() => follow(k)}
                style={cssWith('', vars({ '--k': k }))}
              >
                <span data-card-photo="" aria-hidden="true">
                  {show ? <ImageSlot frame={plate} alt="" placeholder="" size="full" sizes="100vw" eager={pinned} /> : null}
                </span>
                <span data-card-scrim="" aria-hidden="true" />
                <span data-card-shade="" aria-hidden="true" />
                <span data-card-grain="" className="sp-grain" aria-hidden="true" />
                <span data-card-edge="" aria-hidden="true" />

                <div data-card-copy="">
                  <p data-card-top="">
                    <span style={css(mono)}>{ordinal(k) + ' / ' + ordinal(COUNT - 1)}</span>
                    <span data-card-sector="">
                      <span data-lbl="" style={css(label)}>
                        {t.sectorLabel + ' ' + ordinal(PLATFORM_SECTORS[k])}
                      </span>
                      <span style={css(display(ar, ar ? '18px' : '17px', 400) + ';color:#ffffff')}>{sector}</span>
                    </span>
                  </p>

                  <figure data-card-detail="" style={css('margin:0')}>
                    <span data-detail-win="">
                      {show ? <ImageSlot frame={detail} alt={detail.photo.alt[lang]} placeholder="" eager={pinned} /> : null}
                    </span>
                    <figcaption data-detail-cap="">
                      <span aria-hidden="true" data-detail-rule="" />
                      {t.details[k]}
                    </figcaption>
                  </figure>

                  <div data-card-foot="">
                    <p data-lbl="" style={css('margin:0 0 clamp(10px,1.6vh,18px);' + label)}>
                      {what}
                    </p>
                    <h3
                      id={`ps-${k}`}
                      data-card-name=""
                      style={css(
                        'margin:0;' + markType(name, 'clamp(56px,9.6vw,156px)', { leading: '.94', tracking: '-.045em' }) + ';color:#ffffff',
                      )}
                    >
                      {name}
                    </h3>
                    <div data-card-line="">
                      <p
                        style={css(
                          'margin:0;max-width:30ch;' +
                            display(ar, 'clamp(20px,1.9vw,28px)', 300) +
                            ';line-height:' +
                            (ar ? '1.5' : '1.25') +
                            ';color:rgba(255,255,255,.9);text-wrap:pretty',
                        )}
                      >
                        {line}
                      </p>
                      <Link
                        href={routes.contact}
                        className="sp-nav"
                        style={css(
                          'position:relative;display:inline-flex;align-items:center;gap:10px;flex:0 0 auto;padding-block:6px;' +
                            'font-size:15px;font-weight:500;color:#ffffff;text-decoration:none',
                        )}
                      >
                        {t.ecoLink}
                        <span aria-hidden="true">{arrow}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}

          {/* Pinned, the model around the floors, one layer per height, stacked between the cards. */}
          {geo
            ? layers.map((layer, i) => (
                <svg
                  key={i}
                  ref={(node) => {
                    if (node) layerRefs.current[i] = node
                  }}
                  data-model-layer=""
                  viewBox={`0 0 ${geo.W} ${geo.H}`}
                  width={geo.W}
                  height={geo.H}
                  aria-hidden="true"
                  focusable="false"
                  style={cssWith('', vars({ '--z': i }))}
                >
                  {layer}
                </svg>
              ))
            : null}

          {geo ? (
            <div ref={labelsRef} data-model-labels="" role="img" aria-label={described}>
              {geo.floors.map((level, k) => {
                const [x, y] = labelAnchor(geo, level)
                const edge = labelEdge(geo)
                return (
                  <span key={k} data-floor-label="" style={css('top:' + px(y))}>
                    <span
                      data-leader=""
                      style={css('left:' + px(Math.min(x, edge)) + ';width:' + px(Math.abs(edge - x)))}
                    />
                    <span data-tag="" style={css(ar ? 'right:' + px(geo.W - edge + 12) : 'left:' + px(edge + 12))}>
                      <span style={css(mono)}>{ordinal(k)}</span>
                      <span style={css(markType(t.platforms[k][2], '19px', { weight: 400 }) + ';color:#ffffff')}>{t.platforms[k][2]}</span>
                      <span data-tag-sub="">{t.platforms[k][0]}</span>
                    </span>
                  </span>
                )
              })}

              {(() => {
                const [x, y] = labelAnchor(geo, geo.ghosts[0])
                const edge = labelEdge(geo)
                return (
                  <span data-target="" style={css('top:' + px(y))}>
                    <span
                      data-leader=""
                      data-planned=""
                      style={css('left:' + px(Math.min(x, edge)) + ';width:' + px(Math.abs(edge - x)))}
                    />
                    <span data-tag="" style={css(ar ? 'right:' + px(geo.W - edge + 12) : 'left:' + px(edge + 12))}>
                      <span dir="ltr" style={css(mono)}>
                        {ordinal(COUNT) + ' — 40'}
                      </span>
                      <span style={css(display(ar, ar ? '20px' : '19px', 400) + ';color:#ffffff')}>{t.target}</span>
                      <span data-tag-sub="">{t.targetLine}</span>
                    </span>
                  </span>
                )
              })()}

              {(() => {
                const front = podiumFront(geo)
                return (
                  <>
                    <span data-plinth="" style={css('left:' + px(front.x) + ';top:' + px(front.y))}>
                      SEEM PRIME
                    </span>
                    {geo.cores.map((x, j) => (
                      <span
                        key={j}
                        data-core-label=""
                        style={css('left:' + px(x) + ';top:' + px(front.foot + 14) + ';width:' + px(geo.floors[0].w * 0.24))}
                      >
                        <span data-core-tick="" />
                        {t.cores[j][0]}
                      </span>
                    ))}
                  </>
                )
              })()}
            </div>
          ) : null}

          {/* The model chapter's copy: over the model when pinned, above it when laid flat. */}
          <div ref={copyRef} data-model-copy="">
            <h2
              data-sc="rise"
              style={css(
                'margin:0;max-width:13ch;' +
                  display(ar, ar ? 'clamp(32px,3.4vw,54px)' : 'clamp(34px,3.6vw,58px)') +
                  ';color:#ffffff;text-wrap:balance',
              )}
            >
              {t.modelH}
            </h2>
            <p
              data-sc=""
              style={css(
                'margin:clamp(16px,2.4vh,26px) 0 0;max-width:36ch;font-weight:300;font-size:clamp(16px,1.4vw,18px);' +
                  'line-height:1.62;color:rgba(255,255,255,.8)',
              )}
            >
              {t.modelBody}
            </p>
            <p data-sc="" data-cores-note="">
              <span aria-hidden="true" data-cores-glyph="">
                <span />
                <span />
                <span />
                <span />
              </span>
              {t.coresLabel}
            </p>
          </div>

          {/* Laid flat, the model at rest, with a key in place of the labels. */}
          <figure ref={stillRef} data-model-still="" aria-label={t.modelLabel} style={css('margin:0')}>
            <svg viewBox={still.viewBox} aria-hidden="true" focusable="false" data-still-svg="">
              {stillLayers.map((layer, i) => (
                <g key={i}>
                  {layer}
                  {i < COUNT && stillNear ? (
                    <image
                      href={ecosystemPlatforms[i].plate.photo.sm}
                      width={still.geo.W}
                      height={still.geo.H}
                      preserveAspectRatio="xMidYMid slice"
                      transform={still.floorTransforms[i]}
                    />
                  ) : null}
                </g>
              ))}
            </svg>
            <figcaption data-still-key="">
              <ol reversed data-key-floors="">
                {[...t.platforms].reverse().map(([sector, , name], r) => (
                  <li key={name}>
                    <span style={css(mono)}>{ordinal(COUNT - 1 - r)}</span>
                    <span style={css(markType(name, '18px', { weight: 400 }) + ';color:#ffffff')}>{name}</span>
                    <span data-tag-sub="">{sector}</span>
                  </li>
                ))}
              </ol>
              <p data-key-cores="">
                <span data-lbl="" style={css(label)}>
                  SEEM PRIME
                </span>
                <span>{t.cores.map(([core]) => core).join(' · ')}</span>
              </p>
              <p data-key-target="">
                <span dir="ltr" style={css(mono)}>
                  {ordinal(COUNT) + ' — 40'}
                </span>
                <span>{t.target}</span>
              </p>
            </figcaption>
          </figure>

          {/* Pinned, a rail along the foot: where the deck is, and a way to any platform. */}
          <nav ref={railRef} aria-label={t.platformsLabel} data-stack-rail="">
            {t.platforms.map(([, , name], k) => (
              <a
                key={name}
                href={'#' + PLATFORM_IDS[k]}
                data-rail-item=""
                onClick={(event) => glide(event, PLATFORM_IDS[k])}
              >
                <span data-rail-line="" aria-hidden="true" />
                <span style={css(mono)}>{ordinal(k)}</span>
                <span data-rail-name="">{name}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  )
}
