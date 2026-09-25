import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The business model and the roadmap are chapters of the strategy page now; their old
  // addresses land on the chapter.
  async redirects() {
    return [
      { source: '/model', destination: '/strategy#model', permanent: true },
      { source: '/roadmap', destination: '/strategy#roadmap', permanent: true },
    ]
  },
}

export default nextConfig
