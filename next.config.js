/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // 性能优化
  compress: true,
  poweredByHeader: false,
  // 实验性功能
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig
