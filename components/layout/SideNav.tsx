'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { SourceIcon } from '@/components/icons/SourceIcon';

interface SideNavProps {
  sources: { name: string; count: number }[];
  hotArticles: { id: string; title: string; hotScore: number }[];
}

export function SideNav({ sources, hotArticles }: SideNavProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={cn(
      'fixed left-0 top-16 bottom-0 bg-white border-r border-gray-200 transition-all duration-300 z-40',
      collapsed ? 'w-16' : 'w-[240px]'
    )}>
      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-4 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 text-xs"
      >
        {collapsed ? '→' : '←'}
      </button>

      {/* Navigation */}
      <nav className="p-4 space-y-4">
        {/* Time Navigation */}
        <div className={cn('space-y-1', collapsed && 'hidden')}>
          <h3 className="text-xs font-medium text-gray-400 uppercase">时间</h3>
          <a href="#" className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100">
            今日热门
          </a>
          <a href="#" className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100">
            昨日热门
          </a>
          <a href="#" className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100">
            本周热门
          </a>
          <a href="#" className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100">
            上月热门
          </a>
        </div>

        {/* Source Stats */}
        <div className={cn('space-y-2', collapsed && 'hidden')}>
          <h3 className="text-xs font-medium text-gray-400 uppercase">来源统计</h3>
          {sources.slice(0, 10).map((source) => (
            <div key={source.name} className="flex items-center gap-2 px-3 py-1.5">
              <SourceIcon source={source.name} size={16} />
              <span className="text-sm text-gray-600 truncate flex-1">{source.name}</span>
              <span className="text-xs text-gray-400">{source.count}</span>
            </div>
          ))}
        </div>

        {/* Hot Top 5 */}
        <div className={cn('space-y-2', collapsed && 'hidden')}>
          <h3 className="text-xs font-medium text-gray-400 uppercase">热门 Top 5</h3>
          {hotArticles.slice(0, 5).map((article, i) => (
            <a key={article.id} href="#" className="block px-3 py-2 rounded-lg hover:bg-gray-50">
              <span className="text-xs text-orange-500 mr-1">{i + 1}</span>
              <span className="text-sm text-gray-700 line-clamp-2">{article.title}</span>
            </a>
          ))}
        </div>
      </nav>
    </aside>
  );
}
