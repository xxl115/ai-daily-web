'use client';

import { Article } from '@/lib/types';
import { timeAgo } from '@/lib/utils';
import Link from 'next/link';

interface SidebarProps {
  articles: Article[];
}

export function Sidebar({ articles }: SidebarProps) {
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
    .slice(0, 8);

  return (
    <aside className="w-full lg:w-80 shrink-0">
      <div className="sticky top-24 space-y-6">
        {/* 热门文章 */}
        <div className="bg-background-card rounded-xl border border-white/10 p-5">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <span>🔥</span>
            <span>热门文章</span>
          </h3>
          <div className="space-y-3">
            {hotArticles.map((article, index) => (
              <Link
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="flex gap-3 items-start">
                  <span className="text-text-muted text-sm font-medium w-5">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
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
        <div className="bg-background-card rounded-xl border border-white/10 p-5">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <span>📁</span>
            <span>热门来源</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {topSources.map(([source, count]) => (
              <span
                key={source}
                className="px-3 py-1.5 bg-background-hover rounded-full text-xs font-medium text-text-secondary"
              >
                {source} <span className="text-text-muted">({count})</span>
              </span>
            ))}
          </div>
        </div>

        {/* 快速导航 */}
        <div className="bg-background-card rounded-xl border border-white/10 p-5">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <span>🔗</span>
            <span>快速链接</span>
          </h3>
          <div className="space-y-2 text-sm">
            <Link
              href="/timeline"
              className="flex items-center justify-between p-2 rounded-lg hover:bg-background-hover transition-colors group"
            >
              <span className="text-text-secondary group-hover:text-text-primary">📅 时间线视图</span>
              <span className="text-text-muted">→</span>
            </Link>
            <a
              href="https://github.com/xxl115/ai-daily-collector"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2 rounded-lg hover:bg-background-hover transition-colors group"
            >
              <span className="text-text-secondary group-hover:text-text-primary">⭐ GitHub</span>
              <span className="text-text-muted">→</span>
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
