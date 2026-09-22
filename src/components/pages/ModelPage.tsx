'use client'

import { useCallback, useRef, useState } from 'react'
import { PageMasthead } from '@/components/PageMasthead'
import { PageShell } from '@/components/PageShell'
import { SiteCta } from '@/components/SiteCta'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { MODEL, STAGE_PLATES } from '@/lib/content/model'
import { css, cssWith, vars } from '@/lib/css'
import { useScrollDriver } from '@/lib/hooks'
import { useSite } from '@/lib/site'
import { ACCENT, capStyle, dispFont, h2Style, ordinal } from '@/lib/typography'

const SEGMENTS = [0, 1, 2, 3]

export function ModelPage() {
  const { lang, ar, arrow } = useSite()
  const t = MODEL[lang]

  const [stage, setStage] = useState(0)
  // A click sets the stage and briefly locks out the scroll driver so the two never fight.
  const lock = useRef(0)
  const pinRef = useRef<HTMLDivElement>(null)

  const pickStage = (i: number) => {
    lock.current = Date.now() + 1400
    setStage(i)
  }

  /**
   * While the block is pinned its own scroll travel drives the stage. The travel is measured
   * from the sticky child (height − stickyHeight − offset), never from the viewport, so the
   * four stages divide the pin evenly at every breakpoint.
   */
  const updateStage = useCallback(() => {
    if (Date.now() < lock.current) return
    const el = pinRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const vh = window.innerHeight || 800
    const stick = el.firstElementChild as HTMLElement | null
    let travel = 0
    if (stick && getComputedStyle(stick).position === 'sticky') {
      const offset = parseFloat(getComputedStyle(stick).insetBlockStart) || 0
      travel = rect.height - stick.offsetHeight - offset
    }
    const p =
      travel > vh * 0.4 ? -rect.top / travel : (vh * 0.72 - rect.top) / (rect.height + vh * 0.3)
    if (!Number.isFinite(p)) return
    setStage((current) => {
      const next = Math.max(0, Math.min(3, Math.floor(p * 4 + 0.0002)))
      return next === current ? current : next
    })
  }, [])

  useScrollDriver({ onSettle: updateStage })

  const disp = dispFont(ar)
  const cap = capStyle(ar, '#c4a878')
  const h2 = h2Style(ar)
  const [activeVerb, activeItems] = t.model[stage]

  return (
    <PageShell page="model">
      <SiteHeader active="model" />

      <PageMasthead
        crumbLabel={t.crumbLabel}
        homeLabel={t.home}
        current={t.navModel}
        title={t.modelH2}
        lead={t.modelLead}
      />

      {/* --- Value chain --- */}
      <section aria-labelledby="md-h" style={css('background:var(--page)')}>
        <div
          style={css('max-width:1400px;margin:0 auto;padding:clamp(56px,8vw,96px) clamp(16px,3vw,32px)')}
        >
          <h2 id="md-h" data-sc="" style={css(h2)}>
            {t.chainH}
          </h2>

          <div ref={pinRef} data-mpin="" style={css('margin-block-start:clamp(32px,4vw,52px)')}>
            <div data-mstick="">
              <div
                data-mstage=""
                style={css('display:grid;grid-template-columns:minmax(0,1fr);align-items:stretch')}
              >
                <div
                  data-sc=""
                  style={css(
                    'position:relative;overflow:clip;' +
                      'min-height:min(clamp(400px,44vw,560px),calc(100vh - 200px));background:#041815',
                  )}
                >
                  {STAGE_PLATES.map((url, i) => (
                    <span
                      key={url}
                      aria-hidden="true"
                      style={css(
                        'position:absolute;inset:0;background-image:url("' +
                          url +
                          '");background-size:cover;background-position:center;opacity:' +
                          (i === stage ? '1' : '0') +
                          ';transition:opacity .52s cubic-bezier(.2,.7,.3,1)',
                      )}
                    />
                  ))}
                  <span
                    aria-hidden="true"
                    style={css(
                      'position:absolute;inset:0;background:linear-gradient(to top,rgba(4,24,21,.86) 0%,' +
                        'rgba(4,24,21,.4) 46%,rgba(4,24,21,.12) 100%)',
                    )}
                  />
                  <span
                    aria-hidden="true"
                    style={css(
                      'position:absolute;inset-block:0;inset-inline-end:0;width:3px;background:#dc4b1c',
                    )}
                  />
                  <div
                    style={css(
                      'position:absolute;inset-inline:0;inset-block-end:0;margin:clamp(14px,2vw,26px);' +
                        'padding:clamp(20px,2.4vw,30px);border-radius:clamp(22px,3vw,32px);' +
                        'background:rgba(6,38,33,.55);backdrop-filter:blur(18px);' +
                        'border:1px solid rgba(255,255,255,.16);box-shadow:inset 0 1px 0 rgba(255,255,255,.24)',
                    )}
                  >
                    {stage === 3 ? (
                      <span data-lbl="" style={css('display:block;margin-block-end:8px;' + cap)}>
                        {t.modelTag}
                      </span>
                    ) : null}
                    <h3
                      style={css(
                        'margin:0 0 clamp(14px,1.8vw,20px);font-family:' +
                          disp +
                          ';font-weight:600;font-size:clamp(24px,3.2vw,40px);line-height:' +
                          (ar ? '1.3' : '1.06') +
                          ';letter-spacing:' +
                          (ar ? '0' : '-.02em') +
                          ';color:#ffffff',
                      )}
                    >
                      {activeVerb}
                    </h3>
                    <ul
                      data-glist=""
                      style={css('margin:0;padding:0;list-style:none;display:flex;flex-direction:column')}
                    >
                      {activeItems.map((item) => (
                        <li
                          key={item}
                          style={css(
                            'padding:10px 0;border-block-start:1px solid rgba(255,255,255,.16);' +
                              'font-size:clamp(13px,1.5vw,15px);line-height:1.5;color:rgba(255,255,255,.88)',
                          )}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div
                  data-sc="x"
                  style={css(
                    'position:relative;display:flex;flex-direction:column;background:var(--card);' +
                      'border:1px solid var(--line);box-shadow:var(--sh)',
                  )}
                >
                  <span
                    aria-hidden="true"
                    style={css(
                      'position:absolute;inset-block:0;inset-inline-start:0;width:1px;background:var(--line2)',
                    )}
                  />
                  <span
                    aria-hidden="true"
                    style={css(
                      'position:absolute;inset-inline-start:0;inset-block-start:0;width:3px;height:25%;background:' +
                        ACCENT +
                        ';transform:translateY(' +
                        stage * 100 +
                        '%);transition:transform .42s cubic-bezier(.2,.7,.3,1)',
                    )}
                  />
                  {t.model.map(([title], i) => {
                    const on = i === stage
                    return (
                      <button
                        key={title}
                        type="button"
                        aria-pressed={on}
                        onClick={() => pickStage(i)}
                        style={css(
                          'all:unset;box-sizing:border-box;cursor:pointer;display:grid;' +
                            'grid-template-columns:auto minmax(0,1fr) auto;align-items:center;' +
                            'gap:clamp(12px,1.6vw,20px);padding:clamp(18px,2.2vw,26px) clamp(18px,2.4vw,30px);' +
                            'border-block-end:1px solid var(--line);background:' +
                            (on ? 'var(--tint)' : 'transparent') +
                            ';transition:background .24s cubic-bezier(.2,.7,.3,1)',
                        )}
                      >
                        <span
                          style={css(
                            "font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.06em;color:" +
                              (on ? 'var(--ink)' : 'var(--muted)'),
                          )}
                        >
                          {ordinal(i)}
                        </span>
                        <span
                          style={css(
                            'font-family:' +
                              disp +
                              ';font-weight:600;font-size:clamp(18px,2.1vw,25px);line-height:' +
                              (ar ? '1.35' : '1.12') +
                              ';letter-spacing:' +
                              (ar ? '0' : '-.015em') +
                              ';text-align:start;color:' +
                              (on ? 'var(--ink)' : 'var(--body)'),
                          )}
                        >
                          {title}
                        </span>
                        <span
                          aria-hidden="true"
                          style={css(
                            'font-size:15px;color:' +
                              ACCENT +
                              ';opacity:' +
                              (on ? '1' : '0') +
                              ';transition:opacity .24s',
                          )}
                        >
                          {arrow}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Value proposition ---
          The percentages here were invented, so they said nothing. The honest structure is a
          COUNT: four capabilities assemble into one outcome. Each row's track is the same four
          segments, filled up to and including that row's own part — so by 04 the set is whole
          and the 05 panel shows the assembled bar. Nothing here is a made-up quantity. */}
      <section aria-labelledby="vp-h" style={css('background:var(--tint)')}>
        <div
          style={css('max-width:1240px;margin:0 auto;padding:clamp(56px,8vw,104px) clamp(16px,3vw,32px)')}
        >
          <div data-split="" style={css('margin-block-end:clamp(34px,4.6vw,62px)')}>
            <div>
              <h2 id="vp-h" data-sc="" style={css(h2)}>
                {t.valueH}
              </h2>
            </div>
            <p
              data-sc=""
              style={css(
                'align-self:end;margin:0;max-width:44ch;font-weight:300;' +
                  'font-size:clamp(16px,1.7vw,18px);line-height:1.62;color:var(--body)',
              )}
            >
              {t.valueLead}
            </p>
          </div>

          <div style={css('border-block-start:1px solid var(--line2)')}>
            {t.valueProp.slice(0, 4).map(([title, blurb], i) => (
              <div
                key={title}
                data-vrow=""
                data-sc=""
                data-stagger=""
                style={cssWith(
                  'display:grid;grid-template-columns:auto minmax(0,1fr);gap:6px clamp(12px,1.8vw,20px);' +
                    'align-items:center;padding-block:clamp(15px,1.9vw,22px);' +
                    'border-block-end:1px solid var(--line)',
                  vars({ '--i': i }),
                )}
              >
                <span
                  style={css(
                    "font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.06em;color:#8a6a3b",
                  )}
                >
                  {ordinal(i)}
                </span>
                <p
                  style={css(
                    'margin:0;display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 14px;min-width:0',
                  )}
                >
                  <strong
                    style={css(
                      'font-family:' +
                        disp +
                        ';font-weight:600;font-size:clamp(16px,1.9vw,21px);color:var(--ink)',
                    )}
                  >
                    {title}
                  </strong>
                  <span style={css('font-size:clamp(14px,1.5vw,16px);line-height:1.5;color:var(--muted)')}>
                    {blurb}
                  </span>
                </p>
                <span
                  data-vtrack=""
                  aria-hidden="true"
                  style={css('grid-column:2;display:flex;gap:4px;height:6px')}
                >
                  {SEGMENTS.map((k) => (
                    <span
                      key={k}
                      data-vseg=""
                      style={css(
                        'flex:1 1 0;border-radius:999px;transform-origin:' +
                          (ar ? 'right' : 'left') +
                          ' center;transition:transform .5s cubic-bezier(.16,.84,.44,1) ' +
                          (140 + k * 110) +
                          'ms;background:' +
                          (k <= i ? (k === i ? '#062621' : '#0c3e3d') : 'var(--line)') +
                          ';transform:scaleX(' +
                          (k <= i ? '0' : '1') +
                          ')',
                      )}
                    />
                  ))}
                </span>
                <span
                  data-lbl=""
                  style={css(
                    "grid-column:2;font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.06em;" +
                      'color:var(--muted);text-align:' +
                      (ar ? 'left' : 'right'),
                  )}
                >
                  {ordinal(i)} / 04 {t.partsLabel}
                </span>
              </div>
            ))}
          </div>

          <div
            data-sc=""
            style={css(
              'position:relative;overflow:clip;margin-block-start:clamp(14px,2vw,22px);display:flex;' +
                'flex-wrap:wrap;align-items:baseline;gap:8px clamp(14px,2vw,22px);' +
                'padding:clamp(20px,2.6vw,30px) clamp(24px,3.4vw,40px);border-radius:14px;background:#062621;' +
                'box-shadow:0 18px 44px rgba(4,24,21,.16)',
            )}
          >
            <span
              aria-hidden="true"
              style={css('position:absolute;inset-block:0;inset-inline-start:0;width:3px;background:#dc4b1c')}
            />
            <span
              style={css(
                "font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.06em;color:#c4a878",
              )}
            >
              05
            </span>
            <strong
              style={css(
                'font-family:' + disp + ';font-weight:600;font-size:clamp(18px,2.2vw,26px);color:#ffffff',
              )}
            >
              {t.valueProp[4][0]}
            </strong>
            <span style={css('font-size:clamp(14px,1.6vw,17px);line-height:1.5;color:rgba(255,255,255,.76)')}>
              {t.valueProp[4][1]}
            </span>
            <span
              aria-hidden="true"
              style={css('display:flex;gap:4px;flex:1 1 180px;min-width:120px;height:6px')}
            >
              {SEGMENTS.map((k) => (
                <span
                  key={k}
                  style={css(
                    'flex:1 1 0;border-radius:999px;background:' +
                      (k === 3 ? ACCENT : 'rgba(255,255,255,.55)'),
                  )}
                />
              ))}
            </span>
            <span
              data-lbl=""
              style={css(
                "font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.06em;" +
                  'white-space:nowrap;color:#c4a878',
              )}
            >
              {t.completeLabel}
            </span>
          </div>
        </div>
      </section>

      <SiteCta page="model" />
      <SiteFooter />
    </PageShell>
  )
}
