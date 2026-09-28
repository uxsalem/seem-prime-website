import type { Metadata } from 'next'
import { EcosystemPage } from '@/components/pages/EcosystemPage'

export const metadata: Metadata = {
  title: 'منظومتنا',
  description:
    'The SEEM PRIME portfolio — JAZ Chocolate, eat.plus, ZL.TOURS, HOMERA and Qanif Farm — and the one ecosystem the five platforms stand on.',
}

export default function Page() {
  return <EcosystemPage />
}
