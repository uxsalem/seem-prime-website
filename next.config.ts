import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The business model is a chapter of the strategy page now, and its old address lands on it.
  // The roadmap's chapter was taken off the strategy page, so its old address lands on the page.
  async redirects() {
    return [
      { source: '/model', destination: '/strategy#model', permanent: true },
      { source: '/roadmap', destination: '/strategy', permanent: true },
    ]
  },
}

export default nextConfig
