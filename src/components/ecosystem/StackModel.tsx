import type { ReactNode } from 'react'
import { MARK_PATHS } from '@/components/Mark'
import { vars } from '@/lib/css'

/**
 * The ecosystem as a model: a floor per platform on a podium lettered SEEM PRIME, with four
 * shared cores rising through every floor.
 *
 * It is drawn the way an architect draws a model, in an oblique projection: fronts stay true,
 * depth runs up and toward the reading end at a fixed slant, and there is no vanishing point. A
 * plan point `(u, v)` on a level — `u` across, `v` into the depth, positive toward the viewer —
 * lands at `(cx + u − dir·DX·v, y + DY·v)`. Because the projection is an affine map, a platform's
 * full-screen card becomes its floor through one `matrix()` (see `floorMatrix`), and the rest of
 * the model is drawn in SVG from the same numbers, so the two meet exactly.
 */

/** Sideways travel per unit of depth. */
export const DX = 0.3
/** Upward travel per unit of depth: how far the floors are laid back. */
export const DY = 0.36
/** The podium is wider and deeper than the floors it carries. */
const PODIUM_W = 1.2
const PODIUM_D = 1.36
/** The open space between two floors, as a share of a floor's drawn depth. */
const GAP = 0.42
/** How far along a floor's width each core stands, in reading order. */
const CORE_AT = [-0.375, -0.125, 0.125, 0.375]

/** A level of the model: its face's centre on screen, its plan, and how thick it is drawn. */
export type Level = { y: number; w: number; d: number; t: number }

export type StackGeo = {
  /** The card each floor is cut from: the stage when pinned, a virtual one when the model is still. */
  W: number
  H: number
  /** Depth recedes toward the reading end: right in English, left in Arabic. */
  dir: 1 | -1
  cx: number
  /** A floor's size as a share of its card. */
  s: number
  podium: Level
  floors: Level[]
  /** Each core's x, in reading order. */
  cores: number[]
  /** From one floor to the next. */
  pitch: number
}

type Box = { left: number; right: number; top: number; bottom: number }

/**
 * The model's geometry, as large as fits `box` — from the back edge of the top floor to the foot
 * of the podium — for `count` floors cut from a `W × H` card.
 */
export function stackGeometry(W: number, H: number, dir: 1 | -1, box: Box, count: number): StackGeo {
  // Vertically the stack spans a floor and a gap per platform plus the podium; across, the podium.
  const tall = DY * H * (PODIUM_D + count * (1 + GAP))
  const wide = PODIUM_W * W + DX * PODIUM_D * H
  const guess = Math.min((box.bottom - box.top - 18) / tall, (box.right - box.left) / wide)
  const tp = Math.max(12, Math.round(0.045 * guess * W))
  const s = Math.max(0.05, Math.min((box.bottom - box.top - tp) / tall, (box.right - box.left) / wide))

  const w = s * W
  const d = s * H
  const fd = DY * d
  const pd = DY * PODIUM_D * d
  const t = Math.max(4, Math.round(0.014 * w))
  const pitch = (1 + GAP) * fd

  const podium: Level = { y: box.bottom - tp - pd / 2, w: PODIUM_W * w, d: PODIUM_D * d, t: tp }
  const first = podium.y - pd / 2 - GAP * fd - fd / 2
  const floors = Array.from({ length: count }, (_, k) => ({ y: first - k * pitch, w, d, t }))
  const cx = (box.left + box.right) / 2

  return { W, H, dir, cx, s, podium, floors, cores: CORE_AT.map((at) => cx + dir * at * w), pitch }
}

/**
 * The model at rest, for the still figure: `count` floors cut from a 1000 × 625 card, a view box
 * drawn around the whole of it, and each floor's picture placed the way a card is laid down when
 * the model is pinned.
 */
export function stillGeometry(dir: 1 | -1, count: number) {
  const W = 1000
  const H = 625
  const geo = stackGeometry(W, H, dir, { left: 0, right: W, top: -W * 4, bottom: W * 4 }, count)
  const { podium, floors, cx } = geo
  const reach = podium.w / 2 + (DX * podium.d) / 2 + 6
  const roof = floors[floors.length - 1]
  const top = roof.y - (DY * roof.d) / 2 - 6
  const bottom = podium.y + (DY * podium.d) / 2 + podium.t + 6
  const viewBox = [cx - reach, top, 2 * reach, bottom - top].map(r).join(' ')
  const floorTransforms = geo.floors.map((_, k) => {
    const m = floorMatrix(geo, k)
    return `matrix(${m.a} 0 ${m.c} ${m.d} ${r(W / 2 + m.e - (m.a * W) / 2 - (m.c * H) / 2)} ${r(H / 2 + m.f - (m.d * H) / 2)})`
  })
  return { geo, viewBox, floorTransforms }
}

/** Where a plan point on `level` lands on screen. */
export function at(geo: StackGeo, level: Level, u: number, v: number): [number, number] {
  return [geo.cx + u - geo.dir * DX * v, level.y + DY * v]
}

/**
 * The `matrix()` that lays floor `k`'s card down as that floor, about the card's centre (its
 * transform origin). `e` and `f` are relative to the card's own centre, which is the stage's.
 */
export function floorMatrix(geo: StackGeo, k: number) {
  const { s, dir, cx, W, H } = geo
  return { a: s, c: -DX * s * dir, d: DY * s, e: cx - W / 2, f: geo.floors[k].y - H / 2 }
}

const r = (n: number) => Math.round(n * 10) / 10
const poly = (points: [number, number][]) => points.map(([x, y]) => r(x) + ',' + r(y)).join(' ')

/** A level's face, and the two faces that give it thickness: the front, and the side at the reading end. */
function faces(geo: StackGeo, level: Level) {
  const { w, d, t } = level
  const fl = at(geo, level, -w / 2, d / 2)
  const fr = at(geo, level, w / 2, d / 2)
  const br = at(geo, level, w / 2, -d / 2)
  const bl = at(geo, level, -w / 2, -d / 2)
  const down = ([x, y]: [number, number]): [number, number] => [x, y + t]
  const [near, far] = geo.dir === 1 ? [fr, br] : [fl, bl]
  return {
    top: [fl, fr, br, bl] as [number, number][],
    front: [fl, fr, down(fr), down(fl)] as [number, number][],
    side: [near, far, down(far), down(near)] as [number, number][],
    back: [bl, br] as [number, number][],
  }
}

/** A core's opening on a level: a small square in plan, so a parallelogram on screen. */
function collar(geo: StackGeo, level: Level, j: number) {
  const u = geo.cores[j] - geo.cx
  const h = level.w * 0.018
  return poly([at(geo, level, u - h, h), at(geo, level, u + h, h), at(geo, level, u + h, -h), at(geo, level, u - h, -h)])
}

/** One stretch of a core, from the level below to the level above, drawn bottom to top. */
function coreSpan(geo: StackGeo, j: number, i: number, from: Level, to: Level) {
  const x = r(geo.cores[j])
  const line = { x1: x, y1: r(from.y), x2: x, y2: r(to.y) }
  return (
    <g key={`c${j}-${i}`}>
      <line {...line} data-core-glow="" />
      <line {...line} pathLength={1} data-core-seg="" data-core={j} data-seg={i} />
      <line
        {...line}
        pathLength={1}
        data-core-pulse=""
        data-dir={j % 2 ? 'down' : 'up'}
        style={vars({ '--seg': j % 2 ? geo.floors.length - 1 - i : i, '--core': j })}
      />
    </g>
  )
}

/** The podium's top face, as the plane the mark is laid on. */
function markOnPodium(geo: StackGeo) {
  const { podium, dir, cx } = geo
  const m = podium.d * 0.5
  const k = m / 120
  const e = cx - 60 * k + dir * DX * 60 * k
  const f = podium.y - 60 * DY * k
  return (
    <g transform={`matrix(${k} 0 ${-dir * DX * k} ${DY * k} ${r(e)} ${r(f)})`} data-podium-mark="">
      {MARK_PATHS.map((path, i) => (
        <path key={i} d={path} fillRule="evenodd" />
      ))}
    </g>
  )
}

/** A faint drafting grid on the ground plane under the podium, fading out from its centre. */
function ground(geo: StackGeo, id: string) {
  const { podium } = geo
  const base: Level = { ...podium, y: podium.y + podium.t }
  const half = podium.w * 0.95
  const deep = podium.d * 0.95
  const step = podium.w / 8
  const lines: [number, number][][] = []
  for (let v = -deep; v <= deep + 0.5; v += step) lines.push([at(geo, base, -half, v), at(geo, base, half, v)])
  for (let u = -half; u <= half + 0.5; u += step) lines.push([at(geo, base, u, -deep), at(geo, base, u, deep)])
  const [gx, gy] = at(geo, base, 0, 0)
  return (
    <g>
      <defs>
        <radialGradient id={`${id}-fade`} cx={r(gx)} cy={r(gy)} r={r(podium.w * 0.9)} gradientUnits="userSpaceOnUse">
          <stop offset="0.35" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id={`${id}-mask`}>
          <rect x={-geo.W} y={-geo.H} width={geo.W * 3} height={geo.H * 3} fill={`url(#${id}-fade)`} />
        </mask>
      </defs>
      <g mask={`url(#${id}-mask)`} data-ground="">
        {lines.map(([[x1, y1], [x2, y2]], i) => (
          <line key={i} x1={r(x1)} y1={r(y1)} x2={r(x2)} y2={r(y2)} />
        ))}
      </g>
    </g>
  )
}

/**
 * The model's drawing, split by height. Layer 0 is the ground, the podium and the cores up to the
 * first floor; layer `k + 1` is floor `k`'s thickness, its openings and the cores up to the next
 * floor. Pinned, each layer is its own SVG, stacked between the platform cards so every floor
 * hides what is behind it; still, the floors' pictures are drawn between the layers inside one
 * SVG.
 */
export function modelLayers(geo: StackGeo, id: string): ReactNode[] {
  const { podium, floors, cores } = geo
  const layers: ReactNode[] = []

  const p = faces(geo, podium)
  layers.push(
    <g key="podium">
      {ground(geo, id)}
      <polygon points={poly(p.side)} data-face="podium-side" />
      <polygon points={poly(p.front)} data-face="podium-front" />
      <polygon points={poly(p.top)} data-face="podium-top" />
      <polyline points={poly([p.front[0], p.front[1]])} data-face-edge="" />
      <polyline points={poly(p.back)} data-face-back="" />
      {markOnPodium(geo)}
      {cores.map((_, j) => (
        <polygon key={j} points={collar(geo, podium, j)} data-collar="" data-level="0" data-core={j} />
      ))}
      {cores.map((_, j) => coreSpan(geo, j, 0, podium, floors[0]))}
    </g>,
  )

  floors.forEach((floor, k) => {
    const f = faces(geo, floor)
    const above = k < floors.length - 1 ? floors[k + 1] : null
    layers.push(
      <g key={'floor' + k} data-floor-faces={k}>
        <polygon points={poly(f.side)} data-face="side" />
        <polygon points={poly(f.front)} data-face="front" />
        <polyline points={poly([f.front[0], f.front[1]])} data-face-edge="" />
        <polyline points={poly(f.back)} data-face-back="" />
        {cores.map((_, j) => (
          <polygon key={j} points={collar(geo, floor, j)} data-collar="" data-level={k + 1} data-core={j} />
        ))}
        {above ? cores.map((_, j) => coreSpan(geo, j, k + 1, floor, above)) : null}
      </g>,
    )
  })

  return layers
}

/** The corner of a level where its label's leader starts: the middle of its side at the reading end. */
export function labelAnchor(geo: StackGeo, level: Level): [number, number] {
  const [x, y] = at(geo, level, (geo.dir * level.w) / 2, 0)
  return [x, y + level.t / 2]
}

/** How far past the model's reading-end edge the labels start. */
export function labelEdge(geo: StackGeo) {
  const { podium, dir, cx } = geo
  return cx + dir * (podium.w / 2 + (DX * podium.d) / 2 + 28)
}

/** Where the lettering on the podium's front sits, and where each core's name hangs under it. */
export function podiumFront(geo: StackGeo) {
  const { podium } = geo
  const [x, y] = at(geo, podium, 0, podium.d / 2)
  return { x, y: y + podium.t / 2, foot: y + podium.t }
}
