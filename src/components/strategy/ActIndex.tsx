'use client'

import { STRATEGY, STRATEGY_IDS } from '@/lib/content/strategy'
import { css } from '@/lib/css'
import { glide } from '@/lib/hooks'
import { useSite } from '@/lib/site'
import { BRONZE, ordinal } from '@/lib/typography'

/**
 * The opening's contents line. The page runs in two beats — the strategy, then its execution —
 * so the four chapters are grouped under the beat they belong to, and each is a jump to its
 * section.
 */
export function ActIndex() {
  const { lang } = useSite()
  const t = STRATEGY[lang]

  // Chapters are numbered straight through the page, not per act.
  const starts = t.acts.map((_, a) => t.acts.slice(0, a).reduce((n, [, chapters]) => n + chapters.length, 0))

  return (
    <nav aria-label={t.contentsLabel} data-acts="" data-sc="">
      {t.acts.map(([act, chapters], a) => (
        <div key={act} data-act="">
          <span data-act-name="">{act}</span>
          <div data-act-links="">
            {chapters.map((label, i) => {
              const n = starts[a] + i
              const id = STRATEGY_IDS[n]
              return (
                <a key={id} href={'#' + id} data-chapter="" onClick={(event) => glide(event, id)}>
                  <span data-chapter-line="" aria-hidden="true" />
                  <span style={css("font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.06em;color:" + BRONZE)}>
                    {ordinal(n)}
                  </span>
                  <span data-chapter-label="">{label}</span>
                </a>
              )
            })}
          </div>
        </div>
      ))}
    </nav>
  )
}
