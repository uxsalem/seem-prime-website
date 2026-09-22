import type { Metadata } from 'next'
import { EcosystemPage } from '@/components/pages/EcosystemPage'

export const metadata: Metadata = {
  title: 'منظومتنا',
  description: 'The SEEM PRIME portfolio: JAZ Choklat, eat.plus, ZL.TOURS and HOMERA.',
}

export default function Page() {
  return <EcosystemPage />
}
