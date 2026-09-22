import type { Metadata } from 'next'
import { AboutPage } from '@/components/pages/AboutPage'

export const metadata: Metadata = {
  title: 'من نحن',
  description: 'SEEM PRIME is a strategic investment and operating company in Jeddah building integrated business ecosystems.',
}

export default function Page() {
  return <AboutPage />
}
