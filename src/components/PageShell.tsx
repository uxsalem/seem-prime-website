'use client'

import { useCallback, useRef } from 'react'
import type { ReactNode } from 'react'
import { css } from '@/lib/css'
import { progressWidth, runCounter, useReveal, useScrollDriver } from '@/lib/hooks'
import { useSite } from '@/lib/site'
import { rootStyle } from '@/lib/typography'

/**
 * The frame every page shares: reading direction, the body type scale, the ember
 * reading-progress hairline, and the scroll pass that reveals `[data-sc]` blocks as they
 * arrive. `data-page` scopes the few global rules that differ between pages.
 *
 * Pages with their own scroll-driven work add a second `useScrollDriver` of their own; both
 * listeners are passive and share the same 60ms settle throttle.
 */
export function PageShell({
  page,
  counterDuration,
  children,
}: {
  page: string
  /** When set, `[data-count]` elements inside a revealed block ease up over this many ms. */
  counterDuration?: number
  children: ReactNode
}) {
  const { lang, dir, ar } = useSite()
  const progressRef = useRef<HTMLSpanElement>(null)

  const onReveal = useCallback(
    (node: Element) => {
      if (!counterDuration) return
      node.querySelectorAll('[data-count]').forEach((el) => runCounter(el, counterDuration))
    },
    [counterDuration],
  )

  const reveal = useReveal(onReveal)

  useScrollDriver({
    onFrame: () => {
      if (progressRef.current) progressRef.current.style.width = progressWidth()
    },
    onSettle: () => reveal.current(),
  })

  return (
    <div dir={dir} lang={lang} data-page={page} style={css(rootStyle(ar))}>
      <span
        ref={progressRef}
        aria-hidden="true"
        style={css(
          'position:fixed;inset-block-start:0;inset-inline-start:0;z-index:70;height:2px;width:0;background:#dc4b1c',
        )}
      />
      {children}
    </div>
  )
}
