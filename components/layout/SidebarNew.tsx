'use client';

import { Article } from '@/lib/types';
import { timeAgo } from '@/lib/utils';
import Link from 'next/link';

interface SidebarNewProps {
  articles: Article[];
}

export function SidebarNew({ articles }: SidebarNewProps) {
  // 获取热门文章 Top 5
  const hotArticles = [...articles]
    .sort((a, b) => b.hotScore - a.hotScore)
    .slice(0, 5);

  // 获取热门来源
  const sourceStats = articles.reduce((acc, article) => {
    acc[article.source] = (acc[article.source] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topSources = Object.entries(sourceStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6);

  return (
    <aside className="w-full lg:w-80 shrink-0 space-y-6">
      {/* 热门文章 */}
      <div className="bg-background-card rounded-2xl border border-gray-200 shadow-sm p-6 hover-lift">
        <h3 className="font-display font-semibold mb-5 flex items-center gap-2">
          <span className="text-xl">🔥</span>
          <span className="text-lg">热门文章</span>
        </h3>
        <div className="space-y-4">
          {hotArticles.map((article, index) => (
            <Link
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="flex gap-3 items-start">
                <span className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold ${
                  index === 0 ? 'gradient-brand text-white' :
                  index === 1 ? 'bg-accent-blue text-white' :
                  index === 2 ? 'bg-accent-purple text-white' :
                  'bg-background-secondary text-text-muted'
                }`}>
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium line-clamp-2 group-hover:text-brand transition-colors">
                    {article.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 text-xs text-text-muted">
                    <span>{article.source}</span>
                    <span>·</span>
                    <span>⭐ {article.hotScore}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 热门来源 */}
      <div className="bg-background-card rounded-2xl border border-gray-200 shadow-sm p-6 hover-lift">
        <h3 className="font-display font-semibold mb-5 flex items-center gap-2">
          <span className="text-xl">📁</span>
          <span className="text-lg">热门来源</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {topSources.map(([source, count]) => (
            <span
              key={source}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-xs font-medium text-text-secondary transition-colors cursor-pointer border border-gray-200"
            >
              {source} <span className="text-text-muted">({count})</span>
            </span>
          ))}
        </div>
      </div>

      {/* 快速导航 */}
      <div className="bg-background-card rounded-2xl border border-gray-200 shadow-sm p-6 hover-lift">
        <h3 className="font-display font-semibold mb-5 flex items-center gap-2">
          <span className="text-xl">🔗</span>
          <span className="text-lg">快速链接</span>
        </h3>
        <div className="space-y-2">
          <Link
            href="/timeline"
            className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-all group"
          >
            <span className="flex items-center gap-3 text-text-secondary group-hover:text-text-primary">
              <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                📅
              </span>
              <span className="font-medium">时间线视图</span>
            </span>
            <span className="text-text-muted group-hover:text-brand transition-colors">→</span>
          </Link>
          <a
            href="https://github.com/xxl115/ai-daily-collector"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-all group"
          >
            <span className="flex items-center gap-3 text-text-secondary group-hover:text-text-primary">
              <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                ⭐
              </span>
              <span className="font-medium">GitHub</span>
            </span>
            <span className="text-text-muted group-hover:text-brand transition-colors">→</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
