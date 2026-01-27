import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,
  turbopack: {
    // Avoid Next inferring a higher workspace root due to stray lockfiles
    root: __dirname,
  },
}

export default nextConfig
