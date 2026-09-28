'use client'

import { ClosingAperture } from '@/components/home/ClosingAperture'
import { HeroCinema } from '@/components/home/HeroCinema'
import { Horizon2030 } from '@/components/home/Horizon2030'
import { PlatformIndex } from '@/components/home/PlatformIndex'
import { SectorReel } from '@/components/home/SectorReel'
import { SeemStages } from '@/components/home/SeemStages'
import { Statement } from '@/components/home/Statement'
import { PageShell } from '@/components/PageShell'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'

/**
 * The home page as one journey through the ecosystem, told in photographs:
 *
 *   the square opens onto the sectors  →  what we do, in three verbs  →  eight sectors along
 *   one line  →  the platforms already built  →  the four stages behind every decision  →
 *   the road to 2030, across the city  →  the square again, and the door
 *
 * No photograph appears twice on the page.
 *
 * Each section owns its own motion (see `src/components/home/`); this file only sets the order.
 */
export function HomePage() {
  return (
    <PageShell page="home" counterDuration={1600}>
      <SiteHeader active="" overHero />
      <HeroCinema />
      <Statement />
      <SectorReel />
      <PlatformIndex />
      <SeemStages />
      <Horizon2030 />
      <ClosingAperture />
      <SiteFooter />
    </PageShell>
  )
}
