import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'AI Daily - 每日 AI 热点',
    template: '%s | AI Daily',
  },
  description: '汇集全球 AI 领域最新热点资讯，包括 Hacker News、V2EX、GitHub Trending、AI Blogs、Dev.to、36氪等平台的热门内容。',
  keywords: ['AI', '人工智能', '机器学习', '深度学习', 'ChatGPT', 'Hacker News', 'V2EX', 'GitHub'],
  authors: [{ name: 'AI Daily' }],
  creator: 'AI Daily',
  publisher: 'AI Daily',
  robots: 'index, follow',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'AI Daily',
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://ai-daily-web.vercel.app',
    title: 'AI Daily - 每日 AI 热点',
    description: '汇集全球 AI 领域最新热点资讯',
    siteName: 'AI Daily',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Daily - 每日 AI 热点',
    description: '汇集全球 AI 领域最新热点资讯',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FFFFFF',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
