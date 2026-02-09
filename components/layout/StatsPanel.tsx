'use client';

interface StatsPanelProps {
  total: number;
  hot: number;
  sources: number;
}

export function StatsPanel({ total, hot, sources }: StatsPanelProps) {
  return (
    <aside className="w-[320px] bg-white border-l border-gray-200 flex-shrink-0 p-6">
      {/* Stats Cards */}
      <div className="space-y-4 mb-8">
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <div className="text-3xl font-bold text-gray-900">{total}</div>
          <div className="text-sm text-gray-500 mt-1">文章总数</div>
        </div>

        <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
          <div className="text-3xl font-bold text-[#FF6B4A]">{hot}</div>
          <div className="text-sm text-gray-500 mt-1">热门文章</div>
        </div>

        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <div className="text-3xl font-bold text-blue-600">{sources}</div>
          <div className="text-sm text-gray-500 mt-1">来源数量</div>
        </div>
      </div>

      {/* Newsletter Subscribe */}
      <div className="bg-gradient-to-br from-[#FF6B4A] to-[#F97316] rounded-xl p-5 text-white">
        <h4 className="font-medium text-lg mb-2">订阅 AI Daily</h4>
        <p className="text-sm opacity-90 mb-4">每天获取最新的 AI 热点资讯</p>
        <input
          type="email"
          placeholder="输入邮箱"
          className="w-full px-3 py-2 rounded-lg text-gray-900 text-sm placeholder:text-gray-400 mb-2"
        />
        <button className="w-full bg-white text-[#FF6B4A] py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
          立即订阅
        </button>
      </div>
    </aside>
  );
}
