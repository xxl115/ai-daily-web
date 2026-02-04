import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Daily - 每日 AI 热点',
  description: '汇集全球 AI 领域最新热点资讯',
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
