'use client';

interface StatsPanelProps {
  total: number;
  hot: number;
  sources: number;
}

export function StatsPanel({ total, hot, sources }: StatsPanelProps) {
  return (
    <aside className="w-[320px] bg-white border-l border-gray-200 flex-shrink-0">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">数据统计</h2>
          <p className="text-xs text-gray-500">实时更新</p>
        </div>

        {/* Stats Cards */}
        <div className="space-y-3">
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="text-3xl font-bold text-gray-900">{total}</div>
            <div className="text-sm text-gray-600 mt-1">文章总数</div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-4 border border-orange-200 shadow-sm">
            <div className="text-3xl font-bold text-[#FF6B4A]">{hot}</div>
            <div className="text-sm text-gray-600 mt-1">热门文章</div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-4 border border-blue-200 shadow-sm">
            <div className="text-3xl font-bold text-blue-600">{sources}</div>
            <div className="text-sm text-gray-600 mt-1">来源数量</div>
          </div>
        </div>

        {/* Newsletter Subscribe */}
        <div className="bg-gradient-to-br from-[#FF6B4A] to-[#F97316] rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <span className="text-lg">📧</span>
            </div>
            <div>
              <h4 className="font-semibold">订阅 AI Daily</h4>
              <p className="text-xs opacity-90 mt-0.5">每天获取最新 AI 资讯</p>
            </div>
          </div>
          <input
            type="email"
            placeholder="your@email.com"
            className="w-full px-4 py-2.5 rounded-lg text-gray-900 text-sm placeholder:text-gray-400 mb-3 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <button className="w-full bg-white text-[#FF6B4A] py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm">
            立即订阅
          </button>
          <p className="text-[10px] opacity-70 mt-2 text-center">
            随时可以取消订阅
          </p>
        </div>

        {/* Footer Info */}
        <div className="pt-4 border-t border-gray-100">
          <p className="text-[10px] text-gray-400 text-center">
            数据每小时更新 · 基于公开信息整理
          </p>
        </div>
      </div>
    </aside>
  );
}
