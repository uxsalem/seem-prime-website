'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { Plate } from '@/components/Plate'
import { HOME } from '@/lib/content/home'
import { css, cssWith, vars } from '@/lib/css'
import { reduceMotion, useScrollDriver } from '@/lib/hooks'
import { homeHorizon } from '@/lib/media'
import { chapters } from '@/lib/routes'
import { useSite } from '@/lib/site'
import { BRONZE, display } from '@/lib/typography'

const clamp01 = (n: number) => Math.max(0, Math.min(1, n))

/**
 * The road to 2030, laid along a real horizon: a city of towers at sunset, turned in Arabic so
 * the sun always sits at the end of the reading line — where 2030 is. The four phases are
 * stations on that line, lit one by one as the ember rule draws toward the sun, and the 2030
 * targets count up along the foot of the frame, over the city they build toward.
 */
export function Horizon2030() {
  const { lang, ar, arrow } = useSite()
  const t = HOME[lang]
  const lineRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLSpanElement>(null)

  useScrollDriver({
    onFrame: () => {
      const line = lineRef.current
      if (!line) return
      const vh = window.innerHeight || 800
      const r = line.getBoundingClientRect()
      const p = reduceMotion() ? 1 : clamp01((vh * 0.92 - r.top) / (vh * 0.5))
      const fill = fillRef.current
      const track = fill?.parentElement
      if (!fill || !track) return
      // The stylesheet decides the axis — across the horizon on a wide screen, down the start
      // edge on a narrow one — so the pass only hands over how far along the line it has come.
      line.style.setProperty('--p', p.toFixed(4))
      // A station lights when the rule reaches its dot, wherever the layout has put that dot.
      const t = track.getBoundingClientRect()
      const across = t.width >= t.height
      line.querySelectorAll<HTMLElement>('[data-hz-node]').forEach((node) => {
        const dot = node.querySelector<HTMLElement>('[data-hz-dot]')
        if (!dot) return
        const d = dot.getBoundingClientRect()
        const at = across
          ? (ar ? t.right - (d.left + d.width / 2) : d.left + d.width / 2 - t.left) / Math.max(1, t.width)
          : (d.top + d.height / 2 - t.top) / Math.max(1, t.height)
        node.toggleAttribute('data-lit', p >= at - 0.004)
      })
    },
  })

  const last = t.roadmap.length - 1

  return (
    <section
      id="roadmap"
      aria-labelledby="hz-h"
      data-tone="dark"
      style={css(
        'position:relative;overflow:clip;display:flex;flex-direction:column;min-height:max(100svh,820px);' +
          'background:#041815;color:#ffffff',
      )}
    >
      <Plate frame={homeHorizon} scrim="horizon" depth={110} mirror={ar} />

      <div
        style={css(
          'position:relative;box-sizing:border-box;flex:1 1 auto;display:flex;flex-direction:column;width:100%;max-width:1400px;' +
            'margin:0 auto;padding:clamp(96px,12vw,150px) clamp(16px,3vw,32px) clamp(40px,5vw,64px)',
        )}
      >
        <div
          style={css('display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:20px 40px')}
        >
          <h2
            id="hz-h"
            data-sc="rise"
            style={css('margin:0;max-width:16ch;' + display(ar, ar ? 'clamp(32px,4.4vw,66px)' : 'clamp(34px,4.6vw,70px)') + ';color:#ffffff')}
          >
            {t.roadH}
          </h2>
          <Link
            data-sc=""
            href={chapters.roadmap}
            className="sp-nav"
            style={css(
              'position:relative;display:inline-flex;align-items:center;gap:10px;padding-block:6px;font-size:15px;font-weight:500;color:#ffffff;text-decoration:none',
            )}
          >
            {t.moreRoad}
            <span aria-hidden="true">{arrow}</span>
          </Link>
        </div>

        {/* The horizon itself: four stations, the last one the sun. */}
        <div ref={lineRef} data-hz-line="" style={css('position:relative;margin-block:auto;padding-block:clamp(48px,8vh,96px)')}>
          <span data-hz-track="" aria-hidden="true">
            <span ref={fillRef} data-hz-fill="" />
          </span>
          <ol data-hz-nodes="" style={css('margin:0;padding:0;list-style:none')}>
            {t.roadmap.map(([year, phase], i) => (
              <li key={year} data-hz-node="" data-last={i === last ? '' : undefined}>
                <span data-hz-dot="" aria-hidden="true" />
                <span
                  style={css(
                    i === last
                      ? "font-family:'Sora',sans-serif;font-weight:300;font-size:clamp(34px,3.8vw,58px);line-height:1;letter-spacing:-.02em;color:#ffffff"
                      : "font-family:'IBM Plex Mono',monospace;font-size:clamp(14px,1.4vw,17px);letter-spacing:.02em;color:#ffe2b8",
                  )}
                >
                  {year}
                </span>
                <span style={css('display:block;max-width:22ch;font-size:15px;line-height:1.45;color:rgba(255,255,255,.86)')}>
                  {phase}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div data-sc="" style={css('border-block-start:1px solid rgba(255,255,255,.2);padding-block-start:clamp(20px,2.6vw,30px)')}>
          <p
            data-lbl=""
            style={css(
              "margin:0 0 clamp(18px,2.4vw,28px);font-family:'Sora',sans-serif;font-size:11px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.66)",
            )}
          >
            {t.kpiH}
          </p>
          <div data-hz-kpis="">
            {t.kpis.map(([value, label, unit], i) => {
              const numeric = /^([\d.]+)(.*)$/.exec(value)
              return (
                <div key={label} data-stagger="" style={cssWith('display:flex;flex-direction:column;gap:8px;min-width:0', vars({ '--i': i }))}>
                  <span style={css('display:flex;align-items:baseline;gap:8px;white-space:nowrap')}>
                    <span
                      data-count={numeric?.[1] ?? ''}
                      data-suffix={numeric?.[2] ?? ''}
                      style={css(
                        "font-family:'Sora',sans-serif;font-weight:300;font-size:clamp(36px,4.2vw,66px);line-height:1;letter-spacing:-.03em;font-variant-numeric:tabular-nums;color:#ffffff",
                      )}
                    >
                      {value}
                    </span>
                    {unit ? (
                      <span data-lbl="" style={css("font-family:'IBM Plex Mono',monospace;font-size:12px;color:" + BRONZE)}>
                        {unit}
                      </span>
                    ) : null}
                  </span>
                  <span style={css('font-size:14px;line-height:1.45;color:rgba(255,255,255,.78)')}>{label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
