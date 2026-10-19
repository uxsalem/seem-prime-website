'use client'

import { AboutClose } from '@/components/about/AboutClose'
import { ChapterIndex } from '@/components/about/ChapterIndex'
import { Convergence } from '@/components/about/Convergence'
import { MarkAnatomy } from '@/components/about/MarkAnatomy'
import { StakeholderFlow } from '@/components/about/StakeholderFlow'
import { ValuesCreed } from '@/components/about/ValuesCreed'
import { PageMasthead } from '@/components/PageMasthead'
import { PageShell } from '@/components/PageShell'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { ABOUT } from '@/lib/content/about'
import { pagePlates } from '@/lib/media'
import { useSite } from '@/lib/site'

/**
 * The about page as five chapters, each with a moment of its own:
 *
 *   the opening shot and its contents line  →  what we do: four windows become one square,
 *   one city  →  our name: the mark drawn as a construction  →  our values: the creed, lit as
 *   it is read  →  who we serve: five lines out of one source  →  from Jeddah: rings widening to
 *   the Kingdom and the region, and the door
 *
 * Each chapter owns its motion (see `src/components/about/`); this file only sets the order.
 */
export function AboutPage() {
  const { lang } = useSite()
  const t = ABOUT[lang]

  return (
    <PageShell page="about">
      <SiteHeader active="about" overHero />

      <PageMasthead
        title={t.positioning}
        lead={t.aboutLead}
        leadWidth="56ch"
        plate={pagePlates.about.masthead}
      >
        <ChapterIndex />
      </PageMasthead>

      <Convergence />
      <MarkAnatomy />
      <ValuesCreed />
      <StakeholderFlow />
      <AboutClose />
      <SiteFooter />
    </PageShell>
  )
}
