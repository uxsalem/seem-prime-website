import type { CSSProperties, ReactNode } from 'react'
import { vars } from '@/lib/css'

/**
 * The five pillars, each drawn as the sentence that explains it. Every figure is a 120-unit
 * square of hairlines and bars, and every part of it runs on one progress value, `--f`, that the
 * colonnade's scroll pass writes on the figure: a part given a window `[a, b]` reads its own
 * local progress `--l` from it (see `[data-fw]` in globals.css), so the drawing plays forward
 * and back with the reader rather than on a clock.
 *
 * The drawings run left to right; in Arabic the stylesheet turns them, so each one reads in the
 * direction of the page.
 */

/** A part that moves with the figure's progress between `a` and `b`, plus any values of its own. */
const w = (a: number, b: number, extra: Record<string, number | string> = {}): CSSProperties =>
  vars({ '--a': a, '--b': b, ...extra })

/** 01 · Develop economic platforms — layer by layer, until each stands on its own. */
function Layers() {
  // Bars cut like the mark's own: square at one end, slanted at the other.
  const bars = [88, 76, 64, 52, 40]
  return (
    <>
      <line x1="12" y1="100" x2="108" y2="100" data-fl="ground" />
      {/* The scaffold goes up first and comes down once the stack can stand. */}
      <g data-fw="" data-fig-in="" style={w(0, 0.08)}>
        <g data-fw="" data-fig-out="" style={w(0.74, 0.92)}>
          <line x1="22" y1="100" x2="22" y2="32" data-fl="guide" />
          <line x1="102" y1="100" x2="102" y2="32" data-fl="guide" />
          {bars.map((y) => (
            <g key={y}>
              <line x1="22" y1={y + 4.5} x2="30" y2={y + 4.5} data-fl="guide" />
              <line x1="94" y1={y + 4.5} x2="102" y2={y + 4.5} data-fl="guide" />
            </g>
          ))}
        </g>
      </g>
      {bars.map((y, k) => (
        <polygon
          key={y}
          points={`38,${y} 94,${y} 94,${y + 9} 30,${y + 9}`}
          data-fw=""
          data-fig-grow="x"
          data-accent={k === bars.length - 1 ? '' : undefined}
          style={w(0.06 + 0.13 * k, 0.2 + 0.13 * k)}
        />
      ))}
    </>
  )
}

/**
 * The sector's growth, as a logistic curve over the figure's width. Everything derived from it is
 * rounded: `Math.exp` differs in its last digits between engines, and the server and the browser
 * have to write the same markup.
 */
const round = (n: number, places = 3) => Number(n.toFixed(places))
const sector = (x: number) => round(102 - 84 / (1 + Math.exp(-(x - 64) / 11)))
const CURVE = Array.from({ length: 49 }, (_, i) => 12 + i * 2)
  .map((x, i) => (i ? 'L' : 'M') + x + ' ' + sector(x).toFixed(2))
  .join(' ')
/** How far along the curve, as a share of its length, the line has come by `x`. */
const ALONG = (() => {
  const lengths = [0]
  for (let i = 1; i < 97; i++) lengths.push(lengths[i - 1] + Math.hypot(1, sector(12 + i) - sector(11 + i)))
  const total = lengths[lengths.length - 1]
  return (x: number) => round(lengths[Math.max(0, Math.min(96, Math.round(x - 12)))] / total, 4)
})()
const SHARE = Array.from({ length: 10 }, (_, k) => {
  const x = 26 + k * 8.6
  // Our share of the sector at this point: small at entry, larger as the sector grows.
  const share = 0.24 + 0.46 * (k / 9)
  return { x: round(x, 1), h: round(share * (102 - sector(x))) }
})

/** 02 · Invest in high-growth sectors — enter early, raise the share as the sector grows. */
function Share() {
  // Each bar rises as the drawing line passes over it.
  const at = (x: number) => round(0.05 + 0.7 * ALONG(x), 4)
  return (
    <>
      <line x1="12" y1="102" x2="108" y2="102" data-fl="ground" />
      {SHARE.map(({ x, h }) => (
        <rect
          key={x}
          x={x - 2}
          y={round(102 - h)}
          width="4"
          height={h}
          data-fw=""
          data-fig-grow="y"
          data-accent=""
          style={w(round(at(x) - 0.01, 4), round(at(x) + 0.1, 4))}
        />
      ))}
      <path d={CURVE} pathLength={1} data-fl="line" data-fw="" data-fig-draw="" style={w(0.05, 0.75)} />
      {/* Where we come in: early, low on the curve. */}
      <g data-fw="" data-fig-in="" style={w(0.07, 0.15)}>
        <line x1="26" y1={sector(26) + 4} x2="26" y2="102" data-fl="guide" />
        <circle cx="26" cy={sector(26)} r="3" data-fl="ring" />
      </g>
    </>
  )
}

/** 03 · Build strategic partnerships — meet halfway; the benefit runs both ways. */
function Halfway() {
  return (
    <>
      <rect x="12" y="52" width="16" height="16" data-fl="box" data-fw="" data-fig-fill="" style={w(0.8, 0.94)} />
      <rect x="92" y="52" width="16" height="16" data-fl="box" data-fw="" data-fig-fill="" style={w(0.8, 0.94)} />
      <line x1="28" y1="60" x2="60" y2="60" pathLength={1} data-fl="line" data-fw="" data-fig-draw="" style={w(0.1, 0.46)} />
      <line x1="92" y1="60" x2="60" y2="60" pathLength={1} data-fl="line" data-fw="" data-fig-draw="" style={w(0.1, 0.46)} />
      <rect x="56" y="56" width="8" height="8" data-fw="" data-fig-pop="" data-accent="" style={w(0.44, 0.54)} />
      {/* One gain leaves for each side. */}
      <circle cx="60" cy="60" r="2.4" data-fw="" data-fig-travel="" data-accent="" style={w(0.54, 0.84, { '--dx': -38 })} />
      <circle cx="60" cy="60" r="2.4" data-fw="" data-fig-travel="" data-accent="" style={w(0.54, 0.84, { '--dx': 38 })} />
    </>
  )
}

/** Where each review lands at first, above or below the centre line. */
const SPREAD = [-26, 18, -10, 30, -22, 8, -30, 20, -14, 26, -6, 16]

/** 04 · Deliver operational excellence — reviews pull performance toward its centre. */
function Centre() {
  return (
    <>
      <rect x="12" y="26" width="96" height="68" data-fw="" data-fig-band="" style={w(0.1, 0.92)} />
      <line x1="12" y1="60" x2="108" y2="60" data-fw="" data-fig-limit="" data-fl="guide" style={w(0.1, 0.92, { '--s': -1 })} />
      <line x1="12" y1="60" x2="108" y2="60" data-fw="" data-fig-limit="" data-fl="guide" style={w(0.1, 0.92, { '--s': 1 })} />
      <line x1="12" y1="60" x2="108" y2="60" data-fl="line" />
      {SPREAD.map((dy, k) => (
        <circle
          key={k}
          cx={16 + k * 8}
          cy="60"
          r="2.3"
          data-fw=""
          data-fig-settle=""
          style={w(0.1 + 0.05 * k, 0.4 + 0.05 * k, { '--dy': dy })}
        />
      ))}
    </>
  )
}

/** The grid's squares in the order one line threads them, and how far along it each sits. */
const THREAD = [
  [30, 30, 0],
  [60, 30, 30],
  [90, 30, 60],
  [90, 60, 90],
  [60, 60, 120],
  [30, 60, 150],
  [30, 90, 180],
  [60, 90, 210],
  [90, 90, 240],
]

/** 05 · Drive digital transformation — through the whole ecosystem, not one platform. */
function Thread() {
  const at = (s: number) => 0.16 + (0.7 * s) / 240
  return (
    <>
      <path d="M30 30 H90 V60 H30 V90 H90" pathLength={1} data-fl="line" data-fw="" data-fig-draw="" style={w(0.16, 0.86)} />
      {THREAD.map(([x, y, s], k) => (
        <rect
          key={k}
          x={x - 7}
          y={y - 7}
          width="14"
          height="14"
          data-fl="box"
          data-fw=""
          data-fig-fill=""
          data-accent={k === 0 ? '' : undefined}
          style={k === 0 ? w(0.03, 0.12) : w(at(s) - 0.02, at(s) + 0.04)}
        />
      ))}
    </>
  )
}

const FIGURES: (() => ReactNode)[] = [Layers, Share, Halfway, Centre, Thread]

export function PillarFigure({ k }: { k: number }) {
  const Figure = FIGURES[k]
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false" data-fig-svg="">
      <Figure />
    </svg>
  )
}
