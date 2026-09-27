'use client'

import { CONTACT, OFFICE_ID } from '@/lib/content/contact'
import { css } from '@/lib/css'
import { glide } from '@/lib/hooks'
import { EMAIL, PHONE_DISPLAY, PHONE_HREF } from '@/lib/routes'
import { useSite } from '@/lib/site'
import { BRONZE } from '@/lib/typography'

/**
 * The opening's foot. Every other page closes its masthead on a contents line; what the contact
 * page holds is the ways to reach the company, so they take that line: write, call, or find the
 * office. It is the same device, with each channel's name where the chapters carry their number.
 */
export function ContactLines() {
  const { lang, ar } = useSite()
  const t = CONTACT[lang]

  const caption = ar
    ? 'font-size:12px;font-weight:600;color:' + BRONZE
    : "font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:" + BRONZE

  return (
    <address aria-label={t.linesLabel} data-chapters="" data-sc="" style={css('font-style:normal')}>
      <a href={`mailto:${EMAIL}`} data-chapter="">
        <span data-chapter-line="" aria-hidden="true" />
        <span style={css(caption)}>{t.emailLabel}</span>
        <span data-chapter-label="">
          <span dir="ltr">{EMAIL}</span>
        </span>
      </a>
      <a href={PHONE_HREF} data-chapter="">
        <span data-chapter-line="" aria-hidden="true" />
        <span style={css(caption)}>{t.phoneLabel}</span>
        <span data-chapter-label="">
          <span dir="ltr">{PHONE_DISPLAY}</span>
        </span>
      </a>
      <a href={'#' + OFFICE_ID} data-chapter="" onClick={(event) => glide(event, OFFICE_ID)}>
        <span data-chapter-line="" aria-hidden="true" />
        <span style={css(caption)}>{t.officeLabel}</span>
        <span data-chapter-label="">{t.address}</span>
      </a>
    </address>
  )
}
