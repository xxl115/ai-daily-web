'use client';

interface StatsBarProps {
  total?: number;
  hot?: number;
  sources?: number;
  lastUpdate?: string;
}

export function StatsBar({ total = 0, hot = 0, sources = 0, lastUpdate }: StatsBarProps) {
  const formatTime = lastUpdate
    ? new Date(lastUpdate).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    : '-';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-background-card rounded-xl p-4 sm:p-6 border border-white/10 hover:bg-background-hover transition-colors">
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-base sm:text-lg">
            📊
          </div>
          <div className="text-text-muted text-xs sm:text-sm">今日采集</div>
        </div>
        <div className="text-2xl sm:text-3xl font-bold">{total || '-'}</div>
      </div>

      <div className="bg-background-card rounded-xl p-4 sm:p-6 border border-white/10 hover:bg-background-hover transition-colors">
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-green-500/20 flex items-center justify-center text-base sm:text-lg">
            🔥
          </div>
          <div className="text-text-muted text-xs sm:text-sm">热点文章</div>
        </div>
        <div className="text-2xl sm:text-3xl font-bold">{hot || '-'}</div>
      </div>

      <div className="bg-background-card rounded-xl p-4 sm:p-6 border border-white/10 hover:bg-background-hover transition-colors">
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-orange-500/20 flex items-center justify-center text-base sm:text-lg">
            📁
          </div>
          <div className="text-text-muted text-xs sm:text-sm">数据来源</div>
        </div>
        <div className="text-2xl sm:text-3xl font-bold">{sources || '-'}</div>
      </div>

      <div className="bg-background-card rounded-xl p-4 sm:p-6 border border-white/10 hover:bg-background-hover transition-colors">
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-base sm:text-lg">
            ⏰
          </div>
          <div className="text-text-muted text-xs sm:text-sm">最后更新</div>
        </div>
        <div className="text-2xl sm:text-3xl font-bold">{formatTime}</div>
      </div>
    </div>
  );
}
