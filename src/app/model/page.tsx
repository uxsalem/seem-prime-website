import type { Metadata } from 'next'
import { ModelPage } from '@/components/pages/ModelPage'

export const metadata: Metadata = {
  title: 'نموذج الأعمال',
  description: 'Develop, operate, invest, monetize — the four stages every SEEM PRIME platform moves through.',
}

export default function Page() {
  return <ModelPage />
}
