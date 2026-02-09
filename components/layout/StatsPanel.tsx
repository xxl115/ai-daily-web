'use client';

interface StatsPanelProps {
  total: number;
  hot: number;
  sources: number;
}

const categories = [
  { name: '人工智能', count: 45, trend: 'up' },
  { name: '开发者工具', count: 32, trend: 'up' },
  { name: '产品设计', count: 28, trend: 'same' },
  { name: 'SaaS', count: 24, trend: 'down' },
  { name: '生产力', count: 21, trend: 'up' },
];

const trendingDiscussions = [
  { title: 'GPT-5 发布讨论', comments: 156, source: 'OpenAI Forum' },
  { title: '最佳 AI 编程工具对比', comments: 89, source: 'Hacker News' },
  { title: '2025 年 AI 发展趋势', comments: 67, source: 'Product Hunt' },
  { title: 'Claude vs ChatGPT 实战经验', comments: 45, source: 'V2EX' },
];

export function StatsPanel({ total, hot, sources }: StatsPanelProps) {
  return (
    <aside className="w-[320px] bg-white/5 backdrop-blur-xl border-l border-white/10 flex-shrink-0">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-lg font-bold text-white mb-1">数据统计</h2>
          <p className="text-xs text-white/40">实时更新</p>
        </div>

        {/* Stats Cards */}
        <div className="space-y-3">
          <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-5 border border-white/10 relative overflow-hidden group hover:border-white/20 transition-all">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B4A]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="text-4xl font-black text-white mb-1">{total}</div>
              <div className="text-sm text-white/50">文章总数</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#FF6B4A]/20 to-[#FF6B4A]/5 rounded-2xl p-5 border border-[#FF6B4A]/30 relative overflow-hidden group hover:border-[#FF6B4A]/50 transition-all">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B4A]/10 to-transparent" />
            <div className="relative flex items-center justify-between">
              <div>
                <div className="text-4xl font-black text-[#FF6B4A] mb-1">{hot}</div>
                <div className="text-sm text-white/50">热门文章</div>
              </div>
              <div className="text-5xl">🔥</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-2xl p-5 border border-blue-500/30 relative overflow-hidden group hover:border-blue-500/50 transition-all">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent" />
            <div className="relative">
              <div className="text-4xl font-black text-blue-400 mb-1">{sources}</div>
              <div className="text-sm text-white/50">来源数量</div>
            </div>
          </div>
        </div>

        {/* Trending Categories */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-3">热门分类</h3>
          <div className="space-y-2">
            {categories.map((cat) => (
              <a
                key={cat.name}
                href="#"
                className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all group border border-white/10 hover:border-white/20"
              >
                <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                  {cat.name}
                </span>
                <div className="flex items-center gap-2">
                  {cat.trend === 'up' && <span className="text-xs text-green-400">↑</span>}
                  {cat.trend === 'down' && <span className="text-xs text-red-400">↓</span>}
                  <span className="text-xs font-semibold text-white/40">{cat.count}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Trending Discussions */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-3">热门讨论</h3>
          <div className="space-y-3">
            {trendingDiscussions.map((disc, i) => (
              <a
                key={i}
                href="#"
                className="block group"
              >
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/10 hover:border-white/20">
                  <span className="text-sm font-bold text-[#FF6B4A] w-5 shrink-0">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white/60 group-hover:text-white transition-colors line-clamp-2 leading-snug">
                      {disc.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5 text-xs text-white/30">
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                        </svg>
                        {disc.comments}
                      </span>
                      <span>·</span>
                      <span>{disc.source}</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Newsletter Subscribe */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#FF6B4A] via-[#F97316] to-purple-600 p-6 shadow-2xl shadow-[#FF6B4A]/20">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full blur-2xl" />
          </div>

          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <span className="text-lg">📧</span>
              </div>
              <div>
                <h4 className="font-semibold text-white">订阅 AI Daily</h4>
                <p className="text-xs text-white/70 mt-0.5">每天获取最新 AI 资讯</p>
              </div>
            </div>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full px-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm text-white placeholder:text-white/40 mb-3 focus:outline-none focus:ring-2 focus:ring-white/30 border border-white/20 transition-all text-sm"
            />
            <button className="w-full bg-white text-[#FF6B4A] py-3 rounded-xl text-sm font-semibold hover:bg-white/90 transition-all shadow-lg flex items-center justify-center gap-2">
              <span>立即订阅</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            <p className="text-[10px] text-white/50 mt-2 text-center">
              随时可以取消订阅
            </p>
          </div>
        </div>

        {/* Footer Info */}
        <div className="pt-4 border-t border-white/10">
          <p className="text-[10px] text-white/30 text-center">
            数据每小时更新 · 基于公开信息整理
          </p>
        </div>
      </div>
    </aside>
  );
}
