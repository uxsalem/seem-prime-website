'use client'

import { STRATEGY } from '@/lib/content/strategy'
import { css, cssWith, vars } from '@/lib/css'
import { useSite } from '@/lib/site'
import { dispFont, display, ordinal } from '@/lib/typography'

/**
 * Chapter four: what a platform gets from the model — the value proposition, set as the sum it
 * is. The framework lists five capabilities, and the fifth is what the first four add up to, so
 * the page writes it out that way: four lines, each carrying a plus, a double rule drawn under
 * them the way a ledger closes a column, and the total beneath it. Nothing here is a quantity;
 * the arithmetic is the argument.
 */
export function ValueSum() {
  const { lang, ar } = useSite()
  const t = STRATEGY[lang]
  const parts = t.valueProp.slice(0, 4)
  const [total, totalLine] = t.valueProp[4]

  const name = (size: string) =>
    'margin:0;font-family:' +
    dispFont(ar) +
    ';font-weight:' +
    (ar ? '600' : '300') +
    ';font-size:' +
    size +
    ';line-height:' +
    (ar ? '1.35' : '1.1') +
    ';letter-spacing:' +
    (ar ? '0' : '-.02em') +
    ';color:var(--ink)'

  return (
    <section id="value" aria-labelledby="vs-h" style={css('position:relative;background:var(--page)')}>
      <div
        style={css('max-width:1400px;margin:0 auto;padding:clamp(96px,12vw,170px) clamp(16px,3vw,32px) clamp(96px,12vw,170px)')}
      >
        <div data-sum-head="">
          <h2
            id="vs-h"
            data-sc="rise"
            style={css(
              'margin:0;max-width:14ch;' +
                display(ar, ar ? 'clamp(34px,4.6vw,70px)' : 'clamp(36px,4.8vw,74px)') +
                ';color:var(--ink);text-wrap:balance',
            )}
          >
            {t.valueH}
          </h2>
          <p
            data-sc=""
            style={css(
              'margin:0;max-width:40ch;font-weight:300;font-size:clamp(16px,1.6vw,19px);line-height:1.62;color:var(--body)',
            )}
          >
            {t.valueLead}
          </p>
        </div>

        <ol data-sum="">
          {parts.map(([capability, line], i) => (
            <li key={capability} data-sum-row="" data-sc="" data-stagger="" style={cssWith('', vars({ '--i': i }))}>
              <span data-sum-op="" aria-hidden="true">
                {i === 0 ? '' : '+'}
              </span>
              <span data-sum-num="">{ordinal(i)}</span>
              <h3 data-sum-name="" style={css(name(ar ? 'clamp(22px,2.3vw,34px)' : 'clamp(22px,2.4vw,36px)'))}>
                {capability}
              </h3>
              <p data-sum-line="">{line}</p>
            </li>
          ))}
          <li data-sum-total="">
            <span data-sum-rule="" data-sc="rule" aria-hidden="true" />
            <div data-sum-row="" data-sc="">
              <span data-sum-op="" aria-hidden="true">
                =
              </span>
              <span data-sum-num="">{ordinal(4)}</span>
              <h3 data-sum-name="" style={css(name(ar ? 'clamp(30px,3.6vw,56px)' : 'clamp(32px,3.8vw,60px)'))}>
                {total}
              </h3>
              <p data-sum-line="">{totalLine}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>
  )
}
