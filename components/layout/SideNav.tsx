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
    { key: 'today', label: '今日热门' },
    { key: 'yesterday', label: '昨日热门' },
    { key: 'week', label: '本周热门' },
    { key: 'month', label: '上月热门' },
  ];

  return (
    <aside className="w-[240px] bg-white border-r border-gray-200 flex-shrink-0">
      {/* Logo / Title */}
      <div className="h-16 flex items-center px-5 border-b border-gray-100">
        <div className="w-7 h-7 bg-gradient-to-br from-[#FF6B4A] to-pink-500 rounded-lg flex items-center justify-center">
          <span className="text-white text-xs font-bold">AI</span>
        </div>
        <h1 className="ml-2 text-base font-bold text-gray-900">AI Daily</h1>
      </div>

      {/* Navigation */}
      <nav className="p-5 space-y-6 overflow-y-auto" style={{ height: 'calc(100vh - 4rem)' }}>
        {/* Time Navigation */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3 tracking-wide">时间</h3>
          <div className="space-y-1">
            {periods.map((period) => {
              const isActive = period.key === currentPeriod;
              return (
                <button
                  key={period.key}
                  onClick={() => onPeriodChange?.(period.key as any)}
                  className={cn(
                    'w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all',
                    isActive
                      ? 'bg-[#FF6B4A] text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50'
                  )}
                >
                  {period.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Source Stats */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3 tracking-wide">数据来源</h3>
          <div className="space-y-0.5">
            {sources.slice(0, 10).map((source) => (
              <div key={source.name} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <SourceIcon source={source.name} size={16} />
                <span className="text-sm text-gray-700 truncate flex-1">{source.name}</span>
                <span className="text-xs font-semibold text-gray-400">{source.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hot Top 5 */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3 tracking-wide">热门 Top 5</h3>
          <div className="space-y-0.5">
            {hotArticles.slice(0, 5).map((article, i) => (
              <a
                key={article.id}
                href="#"
                className="block px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-2">
                  <span className="text-xs font-bold text-[#FF6B4A] w-4 shrink-0">{i + 1}</span>
                  <span className="text-sm text-gray-700 line-clamp-2 leading-snug">{article.title}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
}
