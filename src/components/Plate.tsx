'use client'

import { useRef, useState } from 'react'
import { css } from '@/lib/css'
import { srcSet, type Framed } from '@/lib/media'
import { usePlateParallax } from '@/lib/motion'
import { useSite } from '@/lib/site'

/**
 * A full-bleed photograph behind a section of type.
 *
 * Three layers, in order: the 20px blur-up so the frame is never an empty green rectangle, the
 * photograph itself easing in once it decodes, and a brand scrim that buys the copy its
 * contrast back. The whole stack drifts against the section on scroll, and the photograph
 * itself breathes on a slow Ken Burns cycle, so a still image never reads as a flat backdrop.
 *
 * The plate is decorative by definition — the section it sits behind carries the meaning — so
 * it is hidden from assistive technology rather than narrated.
 */

/** How much brand green the copy needs between itself and the photograph. */
export type Scrim = 'hero' | 'masthead' | 'cinema' | 'banner' | 'close' | 'stage' | 'creed' | 'none'

const GREEN = '4,24,21'

function scrimLayers(scrim: Scrim, ar: boolean): string[] {
  const start = ar ? 'left' : 'right'
  switch (scrim) {
    // Copy sits low and to the reading edge: weight the foot, wash the edge, leave the sky.
    case 'hero':
      return [
        `linear-gradient(to top,rgba(${GREEN},.9) 0%,rgba(${GREEN},.6) 28%,rgba(${GREEN},.24) 62%,transparent 100%)`,
        `linear-gradient(to ${start},rgba(${GREEN},.58) 0%,rgba(${GREEN},.2) 42%,transparent 72%)`,
      ]
    // A title block, not a view: the photograph stays as texture under the type.
    case 'masthead':
      return [
        `linear-gradient(to top,rgba(${GREEN},.92) 0%,rgba(${GREEN},.76) 42%,rgba(${GREEN},.54) 100%)`,
        `linear-gradient(to ${start},rgba(${GREEN},.5),transparent 66%)`,
      ]
    // A page opening: the photograph is the subject, the title sits on its foot.
    case 'cinema':
      return [
        `linear-gradient(to bottom,rgba(${GREEN},.56) 0%,transparent 24%)`,
        `linear-gradient(to top,rgba(${GREEN},.92) 0%,rgba(${GREEN},.62) 30%,rgba(${GREEN},.14) 62%,transparent 80%)`,
        `linear-gradient(to ${start},rgba(${GREEN},.46) 0%,transparent 62%)`,
      ]
    // A closing band: the call to action sits low and to the reading edge.
    case 'close':
      return [
        `linear-gradient(to top,rgba(${GREEN},.94) 0%,rgba(${GREEN},.7) 36%,rgba(${GREEN},.3) 100%)`,
        `linear-gradient(to ${start},rgba(${GREEN},.5) 0%,transparent 64%)`,
      ]
    // Centred copy over the full width, so the weight has to be even.
    case 'banner':
      return [
        `linear-gradient(to top,rgba(${GREEN},.93) 0%,rgba(${GREEN},.7) 46%,rgba(${GREEN},.42) 100%)`,
      ]
    // Stacked and crossfaded behind the business-model stage; the panel over it is already dark.
    case 'stage':
      return [`linear-gradient(to top,rgba(${GREEN},.88),rgba(${GREEN},.52))`]
    // A band the section opens under: the picture holds at the top, then gives way entirely to
    // the green the long copy below it is set on.
    case 'creed':
      return [
        `linear-gradient(to bottom,rgba(${GREEN},.46) 0%,rgba(${GREEN},.3) 26%,rgba(${GREEN},.78) 62%,rgb(${GREEN}) 100%)`,
        `linear-gradient(to ${start},rgba(${GREEN},.52) 0%,transparent 64%)`,
      ]
    default:
      return []
  }
}

export function Plate({
  frame,
  scrim = 'none',
  depth = 130,
  priority = false,
  /** Stacked plates crossfade rather than swap; the hidden ones sit at 0. */
  show = true,
  still = false,
}: {
  frame: Framed
  scrim?: Scrim
  depth?: number
  priority?: boolean
  show?: boolean
  still?: boolean
}) {
  const { ar } = useSite()
  const plateRef = useRef<HTMLSpanElement>(null)
  const [loaded, setLoaded] = useState(false)

  usePlateParallax(plateRef, depth)

  const { photo } = frame
  const at = frame.focus ?? photo.focus

  return (
    <span
      aria-hidden="true"
      style={css(
        'position:absolute;inset:0;pointer-events:none;opacity:' +
          (show ? '1' : '0') +
          ';transition:opacity .9s cubic-bezier(.2,.7,.3,1)',
      )}
    >
      <span
        ref={plateRef}
        style={css('position:absolute;inset:-10% 0;overflow:clip;will-change:transform')}
      >
        {/* The plate's inner frame, beneath the parallax layer: a masthead's settle rides it. */}
        <span style={css('position:absolute;inset:0')}>
        <span
          style={css(
            'position:absolute;inset:-6%;background-image:url("' +
              photo.lqip +
              '");background-size:cover;background-position:' +
              at +
              ';filter:blur(26px)',
          )}
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- a fluid plate has no intrinsic box to hand next/image */}
        <img
          src={photo.src}
          srcSet={srcSet(photo)}
          sizes="100vw"
          alt=""
          className={still ? undefined : 'sp-kb'}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setLoaded(true)}
          ref={(node) => {
            if (node?.complete) setLoaded(true)
          }}
          style={css(
            'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:' +
              at +
              ';opacity:' +
              (loaded ? '1' : '0') +
              ';transition:opacity 1s cubic-bezier(.2,.7,.3,1)',
          )}
        />
        </span>
      </span>

      {scrimLayers(scrim, ar).map((layer) => (
        <span key={layer} style={css('position:absolute;inset:0;background:' + layer)} />
      ))}
      {scrim === 'none' ? null : <span className="sp-grain" />}
    </span>
  )
}
