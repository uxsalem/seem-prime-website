'use client'

import Link from 'next/link'
import { ImageSlot } from '@/components/ImageSlot'
import { PLATFORM_IDS } from '@/lib/content/ecosystem'
import { HOME } from '@/lib/content/home'
import { css, cssWith, vars } from '@/lib/css'
import { platformFrames } from '@/lib/media'
import { routes } from '@/lib/routes'
import { useSite } from '@/lib/site'
import { display, markType, ordinal } from '@/lib/typography'

/**
 * The platforms as an index rather than a row of cards: each line opens on the platform's own
 * mark, the name set large and the rest of the line quiet. The marks stand one under another
 * down the reading edge and stay where they are, on every screen, so a reader meets each platform
 * by its logo as well as its name.
 */
export function PlatformIndex() {
  const { lang, ar, arrow } = useSite()
  const t = HOME[lang]

  return (
    <section id="ecosystem" aria-labelledby="pl-h" style={css('position:relative;background:var(--page)')}>
      <div style={css('max-width:1400px;margin:0 auto;padding:clamp(88px,12vw,170px) clamp(16px,3vw,32px)')}>
        <div
          style={css(
            'display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:24px;' +
              'margin-block-end:clamp(36px,5vw,72px)',
          )}
        >
          <h2
            id="pl-h"
            data-sc="rise"
            style={css('margin:0;' + display(ar, ar ? 'clamp(32px,4.4vw,64px)' : 'clamp(34px,4.6vw,68px)') + ';color:var(--ink)')}
          >
            {t.ecosystemH}
          </h2>
          <Link
            data-sc=""
            href={routes.ecosystem}
            className="sp-nav"
            style={css(
              'position:relative;display:inline-flex;align-items:center;gap:10px;padding-block:6px;' +
                'font-size:15px;font-weight:500;color:var(--ink);text-decoration:none',
            )}
          >
            {t.morePlatforms}
            <span aria-hidden="true">{arrow}</span>
          </Link>
        </div>

        <ol data-plist="" style={css('margin:0;padding:0;list-style:none;border-block-start:1px solid var(--line2)')}>
          {t.platforms.map(([sector, name, blurb], i) => (
            <li key={name} data-sc="" data-stagger="" style={cssWith('border-block-end:1px solid var(--line2)', vars({ '--i': i }))}>
              <Link href={routes.ecosystem + '#' + PLATFORM_IDS[i]} data-prow="">
                <span data-pthumb="" aria-hidden="true">
                  <ImageSlot frame={platformFrames[i]} alt="" placeholder={name} />
                </span>
                <span data-ptitle="">
                  <span style={css("font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.06em;color:var(--muted)")}>
                    {ordinal(i)}
                  </span>
                  <span
                    data-pname=""
                    style={css(markType(name, 'clamp(34px,6vw,96px)', { leading: '1', tracking: '-.035em' }) + ';color:var(--ink)')}
                  >
                    {name}
                  </span>
                </span>
                <span data-pmeta="">
                  <span data-lbl="" style={css("font-family:'Sora',sans-serif;font-size:11px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:var(--muted)")}>
                    {sector}
                  </span>
                  <span style={css('font-size:15px;line-height:1.55;color:var(--body)')}>{blurb}</span>
                </span>
                <span data-parrow="" aria-hidden="true">
                  {arrow}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
