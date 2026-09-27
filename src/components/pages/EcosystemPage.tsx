'use client'

import { EcosystemClose } from '@/components/ecosystem/EcosystemClose'
import { EcosystemIndex } from '@/components/ecosystem/EcosystemIndex'
import { PlatformStack } from '@/components/ecosystem/PlatformStack'
import { PageMasthead } from '@/components/PageMasthead'
import { PageShell } from '@/components/PageShell'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { ECOSYSTEM } from '@/lib/content/ecosystem'
import { pagePlates } from '@/lib/media'
import { useSite } from '@/lib/site'

/**
 * The ecosystem page as the platforms, and then what they make together:
 *
 *   the opening shot and its contents line  →  four platforms, each a screen of its own, laid
 *   one on another  →  the camera pulls back: the four are the floors of one model, on one
 *   podium, with four cores through them and room above for more  →  the door, beside the
 *   partners' plates
 *
 * Each chapter owns its motion (see `src/components/ecosystem/`); this file only sets the order.
 */
export function EcosystemPage() {
  const { lang } = useSite()
  const t = ECOSYSTEM[lang]

  return (
    <PageShell page="ecosystem">
      <SiteHeader active="ecosystem" overHero />

      <PageMasthead
        crumbLabel={t.crumbLabel}
        homeLabel={t.home}
        current={t.navEcosystem}
        title={t.ecosystemH}
        lead={t.ecosystemLead}
        plate={pagePlates.ecosystem.masthead}
      >
        <EcosystemIndex />
      </PageMasthead>

      <PlatformStack />
      <EcosystemClose />
      <SiteFooter />
    </PageShell>
  )
}
