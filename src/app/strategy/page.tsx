import type { Metadata } from 'next'
import { StrategyPage } from '@/components/pages/StrategyPage'

export const metadata: Metadata = {
  title: 'الاستراتيجية',
  description: 'The vision, mission and five strategic pillars behind where SEEM PRIME operates and how it executes.',
}

export default function Page() {
  return <StrategyPage />
}
