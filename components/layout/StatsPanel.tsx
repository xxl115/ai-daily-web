'use client';

interface StatsPanelProps {
  total: number;
  hot: number;
  sources: number;
}

export function StatsPanel({ total, hot, sources }: StatsPanelProps) {
  return (
    // Hide on medium screens, show on large screens
    <aside className="hidden xl:block fixed right-0 top-0 bottom-0 w-[320px] bg-white border-l border-[#E5E7EB] p-6 z-40 overflow-y-auto">
      {/* Stats Cards */}
      <div className="space-y-4">
        <div className="bg-[#F9FAFB] rounded-lg p-4 border border-[#E5E7EB]">
          <div className="text-3xl font-bold text-[#111827]">{total}</div>
          <div className="text-sm text-[#6B7280]">总文章数</div>
        </div>

        <div className="bg-[#F9FAFB] rounded-lg p-4 border border-[#E5E7EB]">
          <div className="text-3xl font-bold text-[#FF6B4A]">{hot}</div>
          <div className="text-sm text-[#6B7280]">热门文章</div>
        </div>

        <div className="bg-[#F9FAFB] rounded-lg p-4 border border-[#E5E7EB]">
          <div className="text-3xl font-bold text-[#111827]">{sources}</div>
          <div className="text-sm text-[#6B7280]">来源数</div>
        </div>
      </div>

      {/* Newsletter Subscribe - Gradient Background */}
      <div className="mt-8">
        <div className="bg-gradient-to-br from-[#FF6B4A] to-[#F97316] rounded-xl p-5 text-white">
          <h4 className="font-medium text-lg mb-2">订阅 AI Daily</h4>
          <p className="text-sm opacity-90 mb-4">每天获取最新的 AI 热点资讯</p>
          <input
            type="email"
            placeholder="输入你的邮箱"
            className="w-full px-4 py-2.5 rounded-lg text-[#111827] text-sm placeholder:text-[#6B7280] mb-3"
          />
          <button className="w-full bg-white text-[#FF6B4A] py-2.5 rounded-lg text-sm font-medium hover:bg-[#F3F4F6] transition-colors">
            立即订阅
          </button>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-8 pt-6 border-t border-[#E5E7EB]">
        <p className="text-xs text-[#9CA3AF] text-center">
          数据每小时更新 · 基于公开信息整理
        </p>
      </div>
    </aside>
  );
}
