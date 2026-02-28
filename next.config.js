/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: '**.cloudflareworkers.com',
      },
      {
        protocol: 'https',
        hostname: '**.workers.dev',
      },
    ],
  },
}

module.exports = nextConfig
