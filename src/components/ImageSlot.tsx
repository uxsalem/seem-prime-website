'use client'

import { useState } from 'react'
import { css } from '@/lib/css'
import type { Framed } from '@/lib/media'
import { useSite } from '@/lib/site'

/**
 * A fixed-frame image with a legible empty state — the Next equivalent of the `<image-slot>`
 * element the authoring tool provided. Where a photograph exists it is passed as `photo`;
 * everywhere else the slot states, in the reader's language, what belongs there, so unfilled
 * frames stay obvious rather than collapsing to a blank box.
 *
 * A filled slot paints its 20px blur-up first and eases the real file over it, and nests the
 * picture two spans deep so the three transforms it takes part in never fight: the frame's
 * reveal settles `[data-imgwrap]`, the frame's own crop holds `[data-imgcrop]` still, and a
 * hover on the card zooms `[data-img]`.
 *
 * Every call site wraps this in a `position:relative;overflow:clip` frame, so both states fill
 * their frame absolutely and crop against it.
 */
export function ImageSlot({
  frame,
  alt,
  placeholder,
  fit = 'cover',
  /** `sm` is the ~880px cut — right for cards, rails and gallery tiles. */
  size = 'sm',
}: {
  frame?: Framed
  alt?: string
  placeholder: string
  fit?: 'cover' | 'contain'
  size?: 'sm' | 'full'
}) {
  const { lang } = useSite()
  const [loaded, setLoaded] = useState(false)

  if (!frame) {
    return (
      <span
        style={css(
          'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:16px;' +
            'box-sizing:border-box;background:rgba(127,127,127,.08);border:1px dashed var(--line2);' +
            "text-align:center;font:13px/1.4 'IBM Plex Mono',monospace;color:var(--muted)",
        )}
      >
        {placeholder}
      </span>
    )
  }

  const { photo, zoom = 1 } = frame
  const at = frame.focus ?? photo.focus

  return (
    <span data-imgwrap="" style={css('position:absolute;inset:0;overflow:clip')}>
      <span
        data-imgcrop=""
        style={css(
          'position:absolute;inset:0' +
            (zoom === 1
              ? ''
              : ';transform:scale(' + zoom + ');transform-origin:' + (frame.origin ?? at)),
        )}
      >
        <span
          aria-hidden="true"
          style={css(
            'position:absolute;inset:-5%;background-image:url("' +
              photo.lqip +
              '");background-size:cover;background-position:' +
              at +
              ';filter:blur(18px)',
          )}
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- fluid frames, no intrinsic size to hand next/image */}
        <img
          data-img=""
          src={size === 'full' ? photo.src : photo.sm}
          alt={alt ?? photo.alt[lang]}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          ref={(node) => {
            if (node?.complete) setLoaded(true)
          }}
          style={css(
            'position:absolute;inset:0;width:100%;height:100%;object-fit:' +
              fit +
              ';object-position:' +
              at +
              ';opacity:' +
              (loaded ? '1' : '0') +
              ';transition:opacity .8s cubic-bezier(.2,.7,.3,1)',
          )}
        />
      </span>
    </span>
  )
}
