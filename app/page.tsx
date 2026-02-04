import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center text-2xl">
                🤖
              </div>
              <h1 className="text-2xl font-bold">AI Daily</h1>
            </div>
            <nav className="flex gap-6">
              <Link href="/" className="text-text-secondary hover:text-text-primary transition-colors">
                首页
              </Link>
              <Link href="/timeline" className="text-text-secondary hover:text-text-primary transition-colors">
                时间线
              </Link>
              <a href="https://github.com/xxl115/ai-daily-collector" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary transition-colors">
                GitHub
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-background-card rounded-xl p-6 border border-white/10">
            <div className="text-text-muted text-sm mb-1">今日采集</div>
            <div className="text-3xl font-bold">-</div>
          </div>
          <div className="bg-background-card rounded-xl p-6 border border-white/10">
            <div className="text-text-muted text-sm mb-1">热点文章</div>
            <div className="text-3xl font-bold">-</div>
          </div>
          <div className="bg-background-card rounded-xl p-6 border border-white/10">
            <div className="text-text-muted text-sm mb-1">数据来源</div>
            <div className="text-3xl font-bold">-</div>
          </div>
          <div className="bg-background-card rounded-xl p-6 border border-white/10">
            <div className="text-text-muted text-sm mb-1">最后更新</div>
            <div className="text-3xl font-bold">-</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          <button className="px-5 py-2 bg-primary text-white rounded-full text-sm font-medium whitespace-nowrap">
            全部
          </button>
          <button className="px-5 py-2 bg-background-card border border-white/10 text-text-secondary rounded-full text-sm font-medium whitespace-nowrap hover:bg-background-hover transition-colors">
            Hacker News
          </button>
          <button className="px-5 py-2 bg-background-card border border-white/10 text-text-secondary rounded-full text-sm font-medium whitespace-nowrap hover:bg-background-hover transition-colors">
            V2EX
          </button>
          <button className="px-5 py-2 bg-background-card border border-white/10 text-text-secondary rounded-full text-sm font-medium whitespace-nowrap hover:bg-background-hover transition-colors">
            GitHub
          </button>
        </div>

        {/* Articles Grid - Loading State */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-background-card rounded-xl border border-white/10 p-6 animate-pulse">
              <div className="h-4 bg-background-hover rounded mb-3 w-20"></div>
              <div className="h-6 bg-background-hover rounded mb-4"></div>
              <div className="h-4 bg-background-hover rounded w-1/2"></div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        <div className="text-center py-20 text-text-muted">
          <div className="text-6xl mb-4">🚧</div>
          <p className="text-xl mb-2">正在建设中...</p>
          <p className="text-sm">AI Daily Web UI 正在开发中</p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-text-muted text-sm">
          <p>数据来源: Hacker News, V2EX, GitHub Trending, AI Blogs, Dev.to</p>
          <p className="mt-2">
            Powered by{' '}
            <a href="https://github.com/xxl115/ai-daily-collector" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              AI Daily Collector
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
