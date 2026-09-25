'use client'

import type { MouseEvent } from 'react'
import { ABOUT, CHAPTER_IDS } from '@/lib/content/about'
import { css } from '@/lib/css'
import { reduceMotion } from '@/lib/hooks'
import { useSite } from '@/lib/site'
import { BRONZE, ordinal } from '@/lib/typography'

/**
 * The opening's contents line: the five chapters along the foot of the frame, each a jump to
 * its section. A pointer glides there; a keyboard takes the browser's own jump, which also
 * moves focus to the chapter.
 */
export function ChapterIndex() {
  const { lang } = useSite()
  const t = ABOUT[lang]

  const glide = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    // `detail` is 0 when the link was activated from the keyboard.
    if (event.detail === 0 || reduceMotion()) return
    const target = document.getElementById(id)
    if (!target) return
    event.preventDefault()
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav aria-label={t.chaptersLabel} data-chapters="" data-sc="">
      {t.chapters.map((label, i) => (
        <a
          key={CHAPTER_IDS[i]}
          href={'#' + CHAPTER_IDS[i]}
          data-chapter=""
          onClick={(event) => glide(event, CHAPTER_IDS[i])}
        >
          <span data-chapter-line="" aria-hidden="true" />
          <span style={css("font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.06em;color:" + BRONZE)}>
            {ordinal(i)}
          </span>
          <span data-chapter-label="">{label}</span>
        </a>
      ))}
    </nav>
  )
}
