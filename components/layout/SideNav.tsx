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
      <div className="h-14 flex items-center px-4 border-b border-gray-200">
        <h1 className="text-base font-bold text-gray-900">AI Daily</h1>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-6 overflow-y-auto" style={{ height: 'calc(100vh - 3.5rem)' }}>
        {/* Time Navigation */}
        <div>
          <h3 className="text-xs font-medium text-gray-400 uppercase mb-2">时间</h3>
          <div className="space-y-1">
            {periods.map((period) => {
              const isActive = period.key === currentPeriod;
              return (
                <button
                  key={period.key}
                  onClick={() => onPeriodChange?.(period.key as any)}
                  className={cn(
                    'w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive ? 'bg-[#FF6B4A] text-white' : 'text-gray-600 hover:bg-gray-100'
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
          <h3 className="text-xs font-medium text-gray-400 uppercase mb-2">来源统计</h3>
          <div className="space-y-1">
            {sources.slice(0, 10).map((source) => (
              <div key={source.name} className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-50">
                <SourceIcon source={source.name} size={14} />
                <span className="text-sm text-gray-600 truncate flex-1">{source.name}</span>
                <span className="text-xs text-gray-400">{source.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hot Top 5 */}
        <div>
          <h3 className="text-xs font-medium text-gray-400 uppercase mb-2">热门 Top 5</h3>
          <div className="space-y-1">
            {hotArticles.slice(0, 5).map((article, i) => (
              <a
                key={article.id}
                href="#"
                className="block px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-2">
                  <span className="text-xs text-[#FF6B4A] font-medium w-3 shrink-0">{i + 1}</span>
                  <span className="text-sm text-gray-700 line-clamp-2">{article.title}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
}
