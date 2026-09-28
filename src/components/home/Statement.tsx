'use client'

import Link from 'next/link'
import { Fragment, useRef } from 'react'
import { ImageSlot } from '@/components/ImageSlot'
import { HOME } from '@/lib/content/home'
import { css, cssWith, vars } from '@/lib/css'
import { reduceMotion, useScrollDriver } from '@/lib/hooks'
import { verbFrames } from '@/lib/media'
import { routes } from '@/lib/routes'
import { useSite } from '@/lib/site'
import { capStyle, display } from '@/lib/typography'

const clamp01 = (n: number) => Math.max(0, Math.min(1, n))

/**
 * The positioning line, read at the pace of the scroll: each word lights as the reader reaches
 * it, and each of the three verbs opens a capsule — the identity's glass cut-out — onto the
 * work it names. The capsules hold their width from the start and open on a clip, so the line
 * never re-wraps under the reader's eye.
 */
export function Statement() {
  const { lang, ar, arrow } = useSite()
  const t = HOME[lang]
  const lineRef = useRef<HTMLHeadingElement>(null)

  useScrollDriver({
    onFrame: () => {
      const line = lineRef.current
      if (!line) return
      const words = line.querySelectorAll<HTMLElement>('[data-w]')
      const caps = line.querySelectorAll<HTMLElement>('[data-cap]')
      if (reduceMotion()) {
        words.forEach((w) => (w.style.opacity = '1'))
        caps.forEach((c) => c.setAttribute('data-open', ''))
        return
      }
      const vh = window.innerHeight || 800
      const rect = line.getBoundingClientRect()
      const p = clamp01((vh * 0.84 - rect.top) / (rect.height + vh * 0.38))
      const lit = p * (words.length + 1.4)
      words.forEach((w, i) => {
        w.style.opacity = (0.16 + 0.84 * clamp01(lit - i)).toFixed(3)
      })
      caps.forEach((c) => {
        if (lit > Number(c.dataset.at) + 0.5) c.setAttribute('data-open', '')
        else c.removeAttribute('data-open')
      })
    },
  })

  let word = -1

  return (
    <section id="about" aria-labelledby="st-h" style={css('position:relative;background:var(--page)')}>
      <div
        style={css(
          'max-width:1400px;margin:0 auto;padding:clamp(104px,15vw,220px) clamp(16px,3vw,32px) clamp(72px,10vw,150px)',
        )}
      >
        <h2
          ref={lineRef}
          id="st-h"
          style={css(
            'margin:0;max-width:19ch;' +
              display(ar, ar ? 'clamp(34px,5.5vw,86px)' : 'clamp(36px,5.8vw,92px)') +
              ';line-height:' +
              (ar ? '1.42' : '1.12') +
              ';color:var(--ink)',
          )}
        >
          {t.statement.map(([text, cap], s) => {
            const words = text.split(' ')
            return (
              <Fragment key={s}>
                {words.map((w, i) => {
                  word += 1
                  return (
                    <Fragment key={i}>
                      <span data-w="">{w}</span>{' '}
                    </Fragment>
                  )
                })}
                {cap >= 0 ? (
                  <>
                    <span data-cap="" data-at={word} aria-hidden="true">
                      <ImageSlot frame={verbFrames[cap]} alt="" placeholder="" size="xs" />
                    </span>{' '}
                  </>
                ) : null}
              </Fragment>
            )
          })}
        </h2>

        <div data-stmt-foot="" style={css('margin-block-start:clamp(56px,8vw,112px)')}>
          <p
            data-sc=""
            style={css(
              'margin:0;max-width:46ch;font-weight:300;font-size:clamp(17px,1.7vw,21px);line-height:1.62;color:var(--body)',
            )}
          >
            {t.aboutBody}
          </p>

          <div style={css('display:flex;flex-direction:column;gap:clamp(22px,3vw,34px)')}>
            <dl data-sc="" data-proof="" style={css('margin:0')}>
              {t.proof.map(([label, value], i) => (
                <div
                  key={label}
                  data-stagger=""
                  style={cssWith(
                    'display:flex;flex-direction:column;gap:6px;padding-block-start:14px;border-block-start:1px solid var(--line2)',
                    vars({ '--i': i }),
                  )}
                >
                  <dt data-lbl="" style={css(capStyle(ar))}>
                    {label}
                  </dt>
                  <dd style={css('margin:0;font-size:15px;line-height:1.5;color:var(--ink)')}>{value}</dd>
                </div>
              ))}
            </dl>
            <Link
              data-sc=""
              href={routes.about}
              className="sp-nav"
              style={css(
                'position:relative;align-self:flex-start;display:inline-flex;align-items:center;gap:10px;' +
                  'padding-block:6px;font-size:15px;font-weight:500;color:var(--ink);text-decoration:none',
              )}
            >
              {t.moreAbout}
              <span aria-hidden="true">{arrow}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
