'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { SourceIcon } from '@/components/icons/SourceIcon';

interface SideNavProps {
  sources: { name: string; count: number }[];
  hotArticles: { id: string; title: string; hotScore: number }[];
  currentPeriod?: 'today' | 'yesterday' | 'week' | 'month';
}

export function SideNav({ sources, hotArticles, currentPeriod = 'today' }: SideNavProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 bottom-0 bg-white border-r border-[#E5E7EB] z-50 transition-all duration-300',
          // Desktop: collapsible
          'hidden lg:flex',
          collapsed ? 'w-16' : 'w-[240px]',
          // Mobile: drawer
          mobileOpen && 'lg:hidden flex w-[240px]'
        )}
      >
        {/* Logo / Title */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#E5E7EB]">
          {!collapsed && (
            <h1 className="text-lg font-bold text-[#111827]">AI Daily</h1>
          )}
          <button
            onClick={() => (window.innerWidth >= 1024 ? setCollapsed(!collapsed) : setMobileOpen(false))}
            className="p-1 rounded hover:bg-[#F3F4F6] text-[#6B7280]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {collapsed ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              )}
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 overflow-y-auto flex-1">
          {/* Time Navigation - Big Buttons */}
          <div className={cn('space-y-2', collapsed && 'hidden')}>
            {periods.map((period) => (
              <div key={period.key} className={`px-3 py-2 rounded-lg ${getButtonStyle(period.key)}`}>
                <span className="text-sm font-medium">{period.label}</span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className={cn('h-px bg-[#E5E7EB] my-4', collapsed && 'hidden')} />

          {/* Source Stats */}
          <div className={cn('space-y-2', collapsed && 'hidden')}>
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
          <div className={cn('h-px bg-[#E5E7EB] my-4', collapsed && 'hidden')} />

          {/* Hot Top 5 */}
          <div className={cn('space-y-2', collapsed && 'hidden')}>
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

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-6 left-6 z-30 w-12 h-12 bg-[#FF6B4A] text-white rounded-full shadow-lg flex items-center justify-center"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </>
  );
}
