import type { Metadata } from 'next'
import { EcosystemPage } from '@/components/pages/EcosystemPage'

export const metadata: Metadata = {
  title: 'منظومتنا',
  description:
    'The SEEM PRIME portfolio — JAZ Chocolate, eat.plus, ZL.TOURS, HOMERA, Qanif and Catering & Supply — and the one ecosystem the six platforms stand on.',
}

export default function Page() {
  return <EcosystemPage />
}
