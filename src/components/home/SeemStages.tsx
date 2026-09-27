'use client'

import { useRef, useState } from 'react'
import { ImageSlot } from '@/components/ImageSlot'
import { HOME } from '@/lib/content/home'
import { css } from '@/lib/css'
import { useScrollDriver } from '@/lib/hooks'
import { seemFrames } from '@/lib/media'
import { useSite } from '@/lib/site'
import { BRONZE, display, ordinal } from '@/lib/typography'

/** Pinned, scroll-advanced panels where there is room for four side by side. */
export const STAGES_QUERY = '(min-width: 1000px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)'

const clamp01 = (n: number) => Math.max(0, Math.min(1, n))

/**
 * The SEEM model — the company name as its method — as four standing panels. One photograph
 * per stage, cropped to a sliver while the stage waits; the open stage widens into a window
 * and its question arrives. On a wide screen the section pins and the reader's scroll walks
 * the four stages in order; a click takes any stage directly and holds it for a moment so the
 * scroll pass does not snatch it back. Narrow screens and reduced motion get the four stages
 * stacked, every one of them open.
 */
export function SeemStages() {
  const { lang, ar } = useSite()
  const t = HOME[lang]

  const [open, setOpen] = useState(0)
  const lock = useRef(0)
  const pinRef = useRef<HTMLDivElement>(null)

  useScrollDriver({
    onFrame: () => {
      if (Date.now() < lock.current) return
      const pin = pinRef.current
      if (!pin || !window.matchMedia(STAGES_QUERY).matches) return
      const vh = window.innerHeight || 800
      const rect = pin.getBoundingClientRect()
      const p = clamp01(-rect.top / Math.max(1, rect.height - vh))
      const next = Math.min(3, Math.floor(p * 4))
      setOpen((current) => (current === next ? current : next))
    },
  })

  return (
    <section id="seem" aria-labelledby="sm-h" data-tone="dark" style={css('position:relative;background:#041815;color:#ffffff')}>
      <div
        data-seem-head=""
        style={css(
          'max-width:1400px;margin:0 auto;padding:clamp(88px,11vw,150px) clamp(16px,3vw,32px) clamp(28px,4vw,48px)',
        )}
      >
        <h2
          id="sm-h"
          data-sc="rise"
          style={css('margin:0;max-width:16ch;' + display(ar, ar ? 'clamp(32px,4.4vw,64px)' : 'clamp(34px,4.6vw,68px)') + ';color:#ffffff')}
        >
          {t.seemH}
        </h2>
        <p
          data-sc=""
          style={css(
            'margin:0;max-width:38ch;font-weight:300;font-size:clamp(16px,1.6vw,18px);line-height:1.62;color:rgba(255,255,255,.72)',
          )}
        >
          {t.seemLead}
        </p>
      </div>

      <div ref={pinRef} data-seem-pin="">
        <div data-seem-stick="">
          <div data-seem-row="">
            {t.seem.map(([letter, name, question, outcome], i) => {
              const on = open === i
              return (
                <button
                  key={`${letter}-${i}`}
                  type="button"
                  data-seem-panel=""
                  data-on={on ? '' : undefined}
                  aria-pressed={on}
                  onClick={() => {
                    lock.current = Date.now() + 1800
                    setOpen(i)
                  }}
                >
                  <span data-seem-img="">
                    <ImageSlot frame={seemFrames[i]} alt="" placeholder={name} size="md" sizes="(min-width: 1000px) 50vw, 100vw" />
                  </span>
                  <span data-seem-shade="" />
                  <span data-seem-top="">
                    <span data-seem-letter="">{letter}</span>
                    <span style={css("font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.06em;color:" + BRONZE)}>
                      {ordinal(i)}
                    </span>
                  </span>
                  <span data-seem-body="">
                    <span
                      data-seem-name=""
                      style={css(
                        (ar ? "font-family:'IBM Plex Sans Arabic',sans-serif;font-size:15px;font-weight:600" : "font-family:'Sora',sans-serif;font-size:11px;font-weight:500;letter-spacing:.2em;text-transform:uppercase") +
                          ';color:rgba(255,255,255,.86)',
                      )}
                    >
                      {name}
                    </span>
                    <span data-seem-more="">
                      <span data-seem-inner="">
                        <span style={css('display:block;' + display(ar, ar ? 'clamp(24px,2.4vw,36px)' : 'clamp(24px,2.5vw,38px)', 300) + ';color:#ffffff')}>
                          {question}
                        </span>
                        <span
                          style={css(
                            "display:flex;align-items:center;gap:12px;margin-block-start:18px;font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.04em;color:rgba(255,255,255,.78)",
                          )}
                        >
                          <span aria-hidden="true" style={css('width:24px;height:1px;background:#dc4b1c')} />
                          <span data-lbl="">{outcome}</span>
                        </span>
                      </span>
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
          <p
            data-seem-promise=""
            data-lbl=""
            style={css(
              "margin:0;font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.06em;color:rgba(255,255,255,.56)",
            )}
          >
            {t.promiseLine}
          </p>
        </div>
      </div>
    </section>
  )
}
