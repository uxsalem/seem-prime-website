import type { Metadata, Viewport } from 'next'
import { SiteProvider, THEME_BOOTSTRAP } from '@/lib/site'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'SEEM PRIME | سيم برايم',
    template: '%s | SEEM PRIME',
  },
  description:
    'SEEM PRIME is a strategic investment and operating company in Jeddah that builds, operates and invests in scalable business platforms.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Arabic and light are the defaults; the bootstrap script below corrects `lang`, `dir` and
    // `data-theme` from localStorage before first paint, which is why hydration is suppressed here.
    <html lang="ar" dir="rtl" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP }} />
      </head>
      <body>
        <SiteProvider>{children}</SiteProvider>
      </body>
    </html>
  )
}
