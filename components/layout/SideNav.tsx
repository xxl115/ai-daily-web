'use client';

import { cn } from '@/lib/utils';
import { SourceIcon } from '@/components/icons/SourceIcon';

interface SideNavProps {
  sources: { name: string; count: number }[];
  hotArticles: { id: string; title: string; hotScore: number }[];
  currentPeriod?: 'today' | 'yesterday' | 'week' | 'month';
  onPeriodChange?: (period: 'today' | 'yesterday' | 'week' | 'month') => void;
}

export function SideNav({ sources, hotArticles, currentPeriod = 'today', onPeriodChange }: SideNavProps) {
  const periods = [
    { key: 'today', label: '今日热门', icon: '🔥' },
    { key: 'yesterday', label: '昨日热门', icon: '📅' },
    { key: 'week', label: '本周热门', icon: '📊' },
    { key: 'month', label: '上月热门', icon: '🏆' },
  ];

  return (
    <aside className="w-[240px] bg-white/5 backdrop-blur-xl border-r border-white/10 flex-shrink-0">
      {/* Logo / Title */}
      <div className="h-16 flex items-center px-5 border-b border-white/10">
        <div className="w-8 h-8 bg-gradient-to-br from-[#FF6B4A] to-purple-500 rounded-lg flex items-center justify-center shadow-lg shadow-[#FF6B4A]/20">
          <span className="text-white text-sm font-bold">AI</span>
        </div>
        <h1 className="ml-3 text-base font-bold text-white">AI Daily</h1>
      </div>

      {/* Navigation */}
      <nav className="p-5 space-y-6 overflow-y-auto" style={{ height: 'calc(100vh - 4rem)' }}>
        {/* Time Navigation */}
        <div>
          <h3 className="text-xs font-semibold text-white/40 uppercase mb-3 tracking-widest">时间</h3>
          <div className="space-y-1">
            {periods.map((period) => {
              const isActive = period.key === currentPeriod;
              return (
                <button
                  key={period.key}
                  onClick={() => onPeriodChange?.(period.key as any)}
                  className={cn(
                    'w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-3',
                    isActive
                      ? 'bg-gradient-to-r from-[#FF6B4A] to-[#F97316] text-white shadow-lg shadow-[#FF6B4A]/20'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  )}
                >
                  <span className="text-base">{period.icon}</span>
                  <span>{period.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Source Stats */}
        <div>
          <h3 className="text-xs font-semibold text-white/40 uppercase mb-3 tracking-widest">数据来源</h3>
          <div className="space-y-1">
            {sources.slice(0, 10).map((source) => (
              <div key={source.name} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <SourceIcon source={source.name} size={16} />
                </div>
                <span className="text-sm text-white/70 group-hover:text-white transition-colors flex-1 truncate">{source.name}</span>
                <span className="text-xs font-semibold text-white/30">{source.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hot Top 5 */}
        <div>
          <h3 className="text-xs font-semibold text-white/40 uppercase mb-3 tracking-widest">热门 Top 5</h3>
          <div className="space-y-1">
            {hotArticles.slice(0, 5).map((article, i) => (
              <a
                key={article.id}
                href="#"
                className="block px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors group"
              >
                <div className="flex items-start gap-3">
                  <span className="text-sm font-bold text-[#FF6B4A] w-4 shrink-0">{i + 1}</span>
                  <span className="text-sm text-white/60 group-hover:text-white transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
}
