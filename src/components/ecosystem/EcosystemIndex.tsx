'use client'

import { ECOSYSTEM, ECOSYSTEM_IDS, PLATFORM_IDS } from '@/lib/content/ecosystem'
import { css } from '@/lib/css'
import { glide } from '@/lib/hooks'
import { useSite } from '@/lib/site'
import { BRONZE, ordinal } from '@/lib/typography'

/** Every address on the page, numbered straight through: the four platforms, then the model and the door. */
const IDS: string[] = [...PLATFORM_IDS, ECOSYSTEM_IDS.model, ECOSYSTEM_IDS.close]

/**
 * The opening's contents line. The page is the four platforms and then what they make together,
 * so the six stops are grouped that way, the way the strategy page groups its chapters under the
 * promise line's beats, and each is a jump to its place.
 */
export function EcosystemIndex() {
  const { lang } = useSite()
  const t = ECOSYSTEM[lang]

  const starts = t.groups.map((_, g) => t.groups.slice(0, g).reduce((n, [, items]) => n + items.length, 0))

  return (
    <nav aria-label={t.contentsLabel} data-acts="" data-eco-acts="" data-sc="">
      {t.groups.map(([group, items], g) => (
        <div key={group} data-act="">
          <span data-act-name="">{group}</span>
          <div data-act-links="" style={css('grid-template-columns:repeat(' + items.length + ',minmax(0,1fr))')}>
            {items.map((item, i) => {
              const n = starts[g] + i
              const id = IDS[n]
              return (
                <a key={id} href={'#' + id} data-chapter="" onClick={(event) => glide(event, id)}>
                  <span data-chapter-line="" aria-hidden="true" />
                  <span style={css("font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.06em;color:" + BRONZE)}>
                    {ordinal(n)}
                  </span>
                  <span data-chapter-label="">{item}</span>
                </a>
              )
            })}
          </div>
        </div>
      ))}
    </nav>
  )
}
