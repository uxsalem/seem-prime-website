'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { css } from '@/lib/css'
import { routes } from '@/lib/routes'
import { useSite } from '@/lib/site'
import { pgH1Style } from '@/lib/typography'

/**
 * The masthead every inner page opens with: a hairline rule, a breadcrumb back to the home
 * page, the page title and its lead. Anything a page adds below the lead comes in as children.
 */
export function PageMasthead({
  crumbLabel,
  homeLabel,
  current,
  title,
  lead,
  leadWidth = '52ch',
  children,
}: {
  crumbLabel: string
  homeLabel: string
  current: string
  title: string
  lead: string
  leadWidth?: string
  children?: ReactNode
}) {
  const { ar } = useSite()

  return (
    <section
      aria-labelledby="pg-h"
      style={css('position:relative;overflow:clip;background:#062621;color:#ffffff')}
    >
      <span
        aria-hidden="true"
        style={css(
          'position:absolute;inset-block-start:0;inset-inline:0;height:9px;' +
            'background-image:repeating-linear-gradient(90deg,rgba(255,255,255,.24) 0 1px,transparent 1px 28px);' +
            'mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)',
        )}
      />
      <div
        style={css(
          'max-width:1200px;margin:0 auto;' +
            'padding:clamp(120px,17vh,190px) clamp(16px,3vw,32px) clamp(48px,7vw,86px)',
        )}
      >
        <nav
          aria-label={crumbLabel}
          data-lbl=""
          style={css(
            'display:flex;align-items:center;gap:10px;margin-block-end:clamp(22px,3vw,32px);' +
              "font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.06em;color:rgba(255,255,255,.62)",
          )}
        >
          <Link href={routes.home} style={css('color:rgba(255,255,255,.74);text-decoration:none')}>
            {homeLabel}
          </Link>
          <span aria-hidden="true">/</span>
          <span style={css('color:#ffffff')}>{current}</span>
        </nav>

        <h1 id="pg-h" data-sc="" style={css(pgH1Style(ar))}>
          {title}
        </h1>
        <p
          data-sc=""
          style={css(
            'margin:clamp(18px,2.4vw,28px) 0 0;max-width:' +
              leadWidth +
              ';font-weight:300;font-size:clamp(16px,1.8vw,20px);line-height:1.6;color:rgba(255,255,255,.82)',
          )}
        >
          {lead}
        </p>
        {children}
      </div>
    </section>
  )
}
