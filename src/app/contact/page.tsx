import type { Metadata } from 'next'
import { ContactPage } from '@/components/pages/ContactPage'

export const metadata: Metadata = {
  title: 'تواصل معنا',
  description: 'Reach the SEEM PRIME team in Jeddah — investors, partners, government entities and media welcome.',
}

export default function Page() {
  return <ContactPage />
}
