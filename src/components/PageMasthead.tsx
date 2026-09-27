'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { Plate } from '@/components/Plate'
import { css } from '@/lib/css'
import type { Framed } from '@/lib/media'
import { routes } from '@/lib/routes'
import { useSite } from '@/lib/site'
import { heroTitle, kicker, KICKER_RULE } from '@/lib/typography'

/**
 * The masthead every inner page opens with: a full-screen photograph, a breadcrumb back to the
 * home page, the page title and its lead, set on the foot of the frame. Anything a page adds
 * below the lead — its contents line — comes in as children and closes the frame.
 *
 * It is cut to the home hero's proportions so every page opens the same way: a screen tall, the
 * bar clear over the photograph, the breadcrumb where the home page sets its kicker, the title
 * at the home page's scale, and the contents line along the foot where the home page runs its
 * index.
 *
 * The photograph is the page's opening shot, not texture under the type: the scrim only weights
 * the top for the bar and the foot for the title, and the frame opens as the page arrives — an
 * inset window widening to the edges, the picture settling out of a slight push. Each page picks
 * a different photograph; see `pagePlates` in `src/lib/media.ts`.
 */
export function PageMasthead({
  crumbLabel,
  homeLabel,
  current,
  title,
  lead,
  leadWidth = '52ch',
  plate,
  children,
}: {
  crumbLabel: string
  homeLabel: string
  current: string
  title: string
  lead: string
  leadWidth?: string
  plate?: Framed
  children?: ReactNode
}) {
  const { ar } = useSite()

  return (
    <section
      aria-labelledby="pg-h"
      data-tone="dark"
      style={css(
        'position:relative;overflow:clip;display:flex;align-items:flex-end;' +
          'min-height:clamp(600px,100svh,1200px);background:#041815;color:#ffffff',
      )}
    >
      {plate ? (
        <span data-masthead-plate="" style={css('position:absolute;inset:0')}>
          <Plate frame={plate} scrim="cinema" depth={120} priority />
        </span>
      ) : null}
      <div
        data-masthead-copy=""
        style={css(
          'position:relative;box-sizing:border-box;width:100%;max-width:1400px;margin:0 auto;' +
            'padding:clamp(96px,14vh,150px) clamp(16px,3vw,32px) clamp(18px,3vh,30px)',
        )}
      >
        <nav
          aria-label={crumbLabel}
          data-sc=""
          style={css(kicker(ar, 'rgba(255,255,255,.62)') + ';display:flex;gap:10px;margin-block-end:clamp(16px,2.4vh,26px)')}
        >
          <span aria-hidden="true" style={css(KICKER_RULE + ';margin-inline-end:4px')} />
          <Link href={routes.home} style={css('color:rgba(255,255,255,.74);text-decoration:none')}>
            {homeLabel}
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" style={css('color:#ffffff')}>
            {current}
          </span>
        </nav>

        <h1 id="pg-h" data-sc="rise" style={css(heroTitle(ar))}>
          {title}
        </h1>
        <p
          data-sc=""
          style={css(
            'margin:clamp(22px,3.4vh,36px) 0 0;max-width:' +
              leadWidth +
              ';font-weight:300;font-size:clamp(16px,1.8vw,20px);line-height:1.6;color:rgba(255,255,255,.82);text-wrap:pretty',
          )}
        >
          {lead}
        </p>
        {children}
      </div>
    </section>
  )
}
