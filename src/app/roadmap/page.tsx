import type { Metadata } from 'next'
import { RoadmapPage } from '@/components/pages/RoadmapPage'

export const metadata: Metadata = {
  title: 'خارطة الطريق',
  description: 'Four phases from foundation in 2025 to economic-ecosystem leadership in 2030, and five measurable targets.',
}

export default function Page() {
  return <RoadmapPage />
}
