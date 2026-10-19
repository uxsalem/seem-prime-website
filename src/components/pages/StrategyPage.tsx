'use client'

import { PageMasthead } from '@/components/PageMasthead'
import { PageShell } from '@/components/PageShell'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { ActIndex } from '@/components/strategy/ActIndex'
import { Colonnade } from '@/components/strategy/Colonnade'
import { FocusPull } from '@/components/strategy/FocusPull'
import { ValueLoop } from '@/components/strategy/ValueLoop'
import { ValueSum } from '@/components/strategy/ValueSum'
import { STRATEGY } from '@/lib/content/strategy'
import { pagePlates } from '@/lib/media'
import { useSite } from '@/lib/site'

export function StrategyPage() {
  const { lang } = useSite()
  const t = STRATEGY[lang]

  return (
    <PageShell page="strategy">
      <SiteHeader active="strategy" overHero />

      <PageMasthead
        title={t.pageH}
        lead={t.pageLead}
        leadWidth="54ch"
        plate={pagePlates.strategy.masthead}
      >
        <ActIndex />
      </PageMasthead>

      <FocusPull />
      <Colonnade />
      <ValueLoop />
      <ValueSum />
      <SiteFooter />
    </PageShell>
  )
}
