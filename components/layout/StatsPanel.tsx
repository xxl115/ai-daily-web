'use client';

interface StatsPanelProps {
  total: number;
  hot: number;
  sources: number;
}

export function StatsPanel({ total, hot, sources }: StatsPanelProps) {
  return (
    <aside className="fixed right-0 top-16 bottom-0 w-[320px] bg-white border-l border-gray-200 p-6 z-40 overflow-y-auto">
      <h3 className="text-sm font-medium text-gray-900 mb-4">统计数据</h3>
      
      <div className="space-y-4">
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="text-3xl font-bold text-gray-900">{total}</div>
          <div className="text-sm text-gray-500">文章总数</div>
        </div>
        
        <div className="bg-orange-50 rounded-xl p-4">
          <div className="text-3xl font-bold text-orange-500">{hot}</div>
          <div className="text-sm text-gray-500">热门文章</div>
        </div>
        
        <div className="bg-blue-50 rounded-xl p-4">
          <div className="text-3xl font-bold text-blue-500">{sources}</div>
          <div className="text-sm text-gray-500">来源数量</div>
        </div>
      </div>

      {/* Newsletter Subscribe */}
      <div className="mt-8 p-4 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl text-white">
        <h4 className="font-medium mb-2">订阅 AI Daily</h4>
        <p className="text-sm opacity-90 mb-3">每天获取最新的 AI 热点资讯</p>
        <input
          type="email"
          placeholder="输入邮箱"
          className="w-full px-3 py-2 rounded-lg text-gray-900 text-sm mb-2"
        />
        <button className="w-full bg-white text-orange-500 py-2 rounded-lg text-sm font-medium">
          订阅
        </button>
      </div>
    </aside>
  );
}
