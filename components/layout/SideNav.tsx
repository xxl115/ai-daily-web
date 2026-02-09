'use client';

import { cn } from '@/lib/utils';
import { SourceIcon } from '@/components/icons/SourceIcon';

interface SideNavProps {
  sources: { name: string; count: number }[];
  hotArticles: { id: string; title: string; hotScore: number }[];
  currentPeriod?: 'today' | 'yesterday' | 'week' | 'month';
}

export function SideNav({ sources, hotArticles, currentPeriod = 'today' }: SideNavProps) {
  const getButtonStyle = (period: string) => {
    const isActive = period === currentPeriod;
    return isActive
      ? 'bg-[#FF6B4A] text-white'
      : 'bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB] transition-colors cursor-pointer';
  };

  const periods = [
    { key: 'today', label: '今日热门' },
    { key: 'yesterday', label: '昨日热门' },
    { key: 'week', label: '本周热门' },
    { key: 'month', label: '上月热门' },
  ];

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[240px] bg-white border-r border-[#E5E7EB] z-40 overflow-y-auto">
      {/* Logo / Title */}
      <div className="h-16 flex items-center px-4 border-b border-[#E5E7EB]">
        <h1 className="text-lg font-bold text-[#111827]">AI Daily</h1>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        {/* Time Navigation - Big Buttons */}
        <div className="space-y-2">
          {periods.map((period) => (
            <div key={period.key} className={`px-3 py-2 rounded-lg ${getButtonStyle(period.key)}`}>
              <span className="text-sm font-medium">{period.label}</span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-[#E5E7EB] my-4" />

        {/* Source Stats */}
        <div className="space-y-2">
          <h3 className="text-xs font-medium text-[#9CA3AF] uppercase px-3 mb-2">数据来源</h3>
          {sources.slice(0, 10).map((source) => (
            <div key={source.name} className="flex items-center gap-2 px-3 py-1.5">
              <SourceIcon source={source.name} size={16} />
              <span className="text-sm text-[#6B7280] truncate flex-1">{source.name}</span>
              <span className="text-xs text-[#9CA3AF]">{source.count}</span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-[#E5E7EB] my-4" />

        {/* Hot Top 5 */}
        <div className="space-y-2">
          <h3 className="text-xs font-medium text-[#9CA3AF] uppercase px-3 mb-2">热门 Top 5</h3>
          {hotArticles.slice(0, 5).map((article, i) => (
            <a
              key={article.id}
              href="#"
              className="block px-3 py-2 rounded-lg hover:bg-[#F3F4F6] transition-colors"
            >
              <div className="flex items-start gap-2">
                <span className="text-xs text-[#FF6B4A] font-medium w-4">{i + 1}</span>
                <span className="text-sm text-[#111827] line-clamp-2">{article.title}</span>
              </div>
            </a>
          ))}
        </div>
      </nav>
    </aside>
  );
}
