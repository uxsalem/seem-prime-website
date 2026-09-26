import type { Metadata } from 'next'
import { StrategyPage } from '@/components/pages/StrategyPage'

export const metadata: Metadata = {
  title: 'الاستراتيجية',
  description:
    'The vision, the five pillars, the business model that turns them into value, and the road to 2030 — SEEM PRIME’s strategy on one page.',
}

export default function Page() {
  return <StrategyPage />
}
