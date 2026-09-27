'use client'

import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { ContactLines } from '@/components/contact/ContactLines'
import { ImageSlot } from '@/components/ImageSlot'
import { PageMasthead } from '@/components/PageMasthead'
import { PageShell } from '@/components/PageShell'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { CONTACT, OFFICE_ID } from '@/lib/content/contact'
import { css, cssWith, vars } from '@/lib/css'
import { pagePlates } from '@/lib/media'
import { scrollRail } from '@/lib/hooks'
import { EMAIL, PHONE_DISPLAY, PHONE_HREF } from '@/lib/routes'
import { useSite } from '@/lib/site'
import { bodyFont, capStyle, h2Style } from '@/lib/typography'

const INPUT_STYLE =
  'box-sizing:border-box;width:100%;height:48px;padding:0 14px;background:var(--page);' +
  'border:1px solid var(--line2);border-radius:8px;font-family:inherit;font-size:15px;color:var(--ink)'

const RAIL_BTN =
  'all:unset;box-sizing:border-box;cursor:pointer;width:44px;height:44px;border-radius:999px;' +
  'border:1px solid var(--line2);display:flex;align-items:center;justify-content:center;font-size:16px;' +
  'color:var(--ink);background:var(--card);transition:border-color .18s,transform .18s'

const FIELD_LABEL = 'display:flex;flex-direction:column;gap:8px'
const FIELD_CAPTION = 'font-size:13px;font-weight:500;color:var(--body)'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function ContactPage() {
  const { lang, ar, arrow } = useSite()
  const t = CONTACT[lang]

  const [status, setStatus] = useState<Status>('idle')
  const railRef = useRef<HTMLDivElement>(null)

  const cap = capStyle(ar)
  const h2 = h2Style(ar)

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    // A bot filling the off-screen `website` field is dropped without a word.
    if (String(data.get('website') || '')) return
    if (
      !String(data.get('full_name') || '').trim() ||
      !String(data.get('email') || '').trim() ||
      !String(data.get('message') || '').trim()
    ) {
      setStatus('error')
      return
    }
    setStatus('sending')
    // TODO: POST these fields to the real endpoint (a route handler or a form service) and set
    // the status from its response. Until one exists the confirmation is local-only.
    setTimeout(() => {
      setStatus('sent')
      form.reset()
    }, 900)
  }

  return (
    <PageShell page="contact">
      <SiteHeader active="" overHero />

      <PageMasthead
        crumbLabel={t.crumbLabel}
        homeLabel={t.home}
        current={t.contactH}
        title={t.contactH}
        lead={t.contactBody}
        plate={pagePlates.contact.masthead}
      >
        <ContactLines />
      </PageMasthead>

      {/* --- Contact form --- */}
      <section id={OFFICE_ID} aria-labelledby="fm-h" style={css('background:var(--page)')}>
        <div
          data-split=""
          style={css('max-width:1200px;margin:0 auto;padding:clamp(56px,8vw,96px) clamp(16px,3vw,32px)')}
        >
          <div>
            <h2 id="fm-h" data-sc="" style={css(h2)}>
              {t.officeH}
            </h2>
            <div
              data-sc=""
              style={css(
                'display:flex;flex-direction:column;gap:18px;margin-block-start:clamp(26px,3.4vw,40px);' +
                  'padding-block-start:24px;border-block-start:1px solid var(--line2)',
              )}
            >
              <div style={css('display:flex;flex-direction:column;gap:4px')}>
                <span data-lbl="" style={css(cap)}>
                  {t.officeLabel}
                </span>
                <span style={css('font-size:15px;line-height:1.5;color:var(--ink)')}>{t.address}</span>
              </div>
              <a href={`mailto:${EMAIL}`} style={css('font-size:15px')}>
                {EMAIL}
              </a>
              <a href={PHONE_HREF} style={css("font-family:'IBM Plex Mono',monospace;font-size:15px")}>
                <span dir="ltr">{PHONE_DISPLAY}</span>
              </a>
            </div>

            <div
              data-sc=""
              style={css(
                'display:flex;flex-direction:column;gap:12px;margin-block-start:clamp(26px,3.4vw,40px);' +
                  'padding-block-start:24px;border-block-start:1px solid var(--line2)',
              )}
            >
              <span data-lbl="" style={css(cap)}>
                {t.hoursLabel}
              </span>
              {t.hours.map(([day, time]) => (
                <div
                  key={day}
                  style={css(
                    'display:flex;align-items:baseline;justify-content:space-between;gap:16px;max-width:34ch',
                  )}
                >
                  <span style={css('font-size:15px;color:var(--body)')}>{day}</span>
                  <span
                    style={css(
                      // A time reads as digits, so it is set in mono and forced LTR; "Closed" is prose.
                      /\d/.test(time)
                        ? "font-family:'IBM Plex Mono',monospace;font-size:14px;color:var(--muted);direction:ltr"
                        : 'font-family:' + bodyFont(ar) + ';font-size:14px;color:var(--muted)',
                    )}
                  >
                    {time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <form
            data-sc="x"
            onSubmit={submit}
            style={css(
              'display:flex;flex-direction:column;gap:16px;padding:clamp(22px,3vw,36px);box-sizing:border-box;' +
                'background:var(--card);border:1px solid var(--line);border-radius:14px;box-shadow:var(--sh)',
            )}
          >
            <div style={css('position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)')}>
              <label htmlFor="website">Website</label>
              <input id="website" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            <div data-cols="2">
              <label style={css(FIELD_LABEL)}>
                <span style={css(FIELD_CAPTION)}>{t.fName}</span>
                <input name="full_name" required style={css(INPUT_STYLE)} />
              </label>
              <label style={css(FIELD_LABEL)}>
                <span style={css(FIELD_CAPTION)}>{t.fEmail}</span>
                <input name="email" type="email" required dir="ltr" style={css(INPUT_STYLE)} />
              </label>
              <label style={css(FIELD_LABEL)}>
                <span style={css(FIELD_CAPTION)}>{t.fPhone}</span>
                <input name="phone" type="tel" dir="ltr" style={css(INPUT_STYLE)} />
              </label>
              <label style={css(FIELD_LABEL)}>
                <span style={css(FIELD_CAPTION)}>{t.fType}</span>
                <select name="inquiry" style={css(INPUT_STYLE)}>
                  <option>{t.optPartner}</option>
                  <option>{t.optInvest}</option>
                  <option>{t.optMedia}</option>
                  <option>{t.optOther}</option>
                </select>
              </label>
            </div>

            <label style={css(FIELD_LABEL)}>
              <span style={css(FIELD_CAPTION)}>{t.fMsg}</span>
              <textarea
                name="message"
                rows={5}
                required
                style={css(
                  'box-sizing:border-box;width:100%;padding:12px 14px;background:var(--page);' +
                    'border:1px solid var(--line2);border-radius:8px;font-family:inherit;font-size:15px;' +
                    'line-height:1.6;color:var(--ink);resize:vertical',
                )}
              />
            </label>

            <button
              type="submit"
              className="sp-submit"
              style={css(
                'all:unset;box-sizing:border-box;cursor:pointer;height:58px;padding:0 36px;border-radius:999px;' +
                  'background:#062621;color:#ffffff;font-family:inherit;font-size:16px;font-weight:600;' +
                  'display:flex;align-items:center;justify-content:center;gap:12px;width:fit-content;' +
                  'box-shadow:0 12px 30px rgba(4,24,21,.22);' +
                  'transition:background .2s,transform .2s cubic-bezier(.2,.7,.3,1),box-shadow .2s',
              )}
            >
              {status === 'sending' ? t.sending : t.send}
              <span aria-hidden="true" style={css('font-size:17px')}>
                {arrow}
              </span>
            </button>

            {status === 'sent' ? (
              <p
                role="status"
                style={css(
                  'margin:0;padding:14px 16px;background:#e2efeb;border:1px solid rgba(4,24,21,.12);' +
                    'border-radius:8px;font-size:14px;color:#062621',
                )}
              >
                {t.okMsg}
              </p>
            ) : null}
            {status === 'error' ? (
              <p
                role="alert"
                style={css(
                  'margin:0;padding:14px 16px;background:#fbe2d9;border:1px solid rgba(185,59,19,.28);' +
                    'border-radius:8px;font-size:14px;color:#b93b13',
                )}
              >
                {t.errMsg}
              </p>
            ) : null}
          </form>
        </div>
      </section>

      {/* --- Testimonials --- */}
      <section aria-labelledby="vo-h" style={css('background:var(--sunken)')}>
        <div
          style={css('max-width:1400px;margin:0 auto;padding:clamp(56px,8vw,96px) clamp(16px,3vw,32px)')}
        >
          <div
            style={css(
              'display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:24px;' +
                'margin-block-end:clamp(28px,3.4vw,40px)',
            )}
          >
            <div>
              <h2 id="vo-h" data-sc="" style={css(h2)}>
                {t.voicesH}
              </h2>
              <p
                data-sc=""
                style={css(
                  'margin:18px 0 0;max-width:52ch;font-weight:300;font-size:16px;line-height:1.62;color:var(--muted)',
                )}
              >
                {t.voicesLead}
              </p>
            </div>
            <div style={css('display:flex;gap:10px')}>
              <button
                type="button"
                onClick={() => scrollRail(railRef.current, -1, ar)}
                aria-label={t.railPrev}
                style={css(RAIL_BTN)}
              >
                {ar ? '→' : '←'}
              </button>
              <button
                type="button"
                onClick={() => scrollRail(railRef.current, 1, ar)}
                aria-label={t.railNext}
                style={css(RAIL_BTN)}
              >
                {ar ? '←' : '→'}
              </button>
            </div>
          </div>

          <div ref={railRef} data-rail="">
            {t.voices.map(([name, role], i) => (
              <figure
                key={i}
                data-sc=""
                data-stagger=""
                style={cssWith(
                  'flex:0 0 clamp(280px,32vw,400px);margin:0;display:flex;flex-direction:column;' +
                    'background:var(--card);border:1px solid var(--line);border-radius:14px;overflow:clip;' +
                    'box-shadow:var(--sh)',
                  vars({ '--i': i }),
                )}
              >
                <div
                  style={css(
                    'position:relative;aspect-ratio:4/3;overflow:clip;' +
                      'border-block-end:1px solid var(--line);background:var(--sunken)',
                  )}
                >
                  <ImageSlot placeholder={t.personPh} />
                </div>
                <blockquote
                  style={css(
                    'margin:0;padding:clamp(20px,2.4vw,28px);display:flex;flex-direction:column;gap:16px;' +
                      'flex:1 1 auto',
                  )}
                >
                  <p
                    style={css(
                      'margin:0;flex:1 1 auto;font-weight:300;font-size:clamp(15px,1.7vw,17px);' +
                        'line-height:1.62;color:var(--body)',
                    )}
                  >
                    {t.quotePh}
                  </p>
                  <span aria-hidden="true" style={css('width:28px;height:3px;background:#dc4b1c')} />
                  <figcaption style={css('display:flex;flex-direction:column;gap:4px')}>
                    <span
                      style={css(
                        "font-family:'Sora',sans-serif;font-weight:600;font-size:15px;color:var(--ink)",
                      )}
                    >
                      {name}
                    </span>
                    <span
                      data-lbl=""
                      style={css(
                        'font-size:13px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)',
                      )}
                    >
                      {role}
                    </span>
                  </figcaption>
                </blockquote>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </PageShell>
  )
}
