'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Article } from '@/lib/types';
import { fetchArticles, getMockArticles } from '@/lib/api';
import { format, isToday, isYesterday, startOfDay, subDays } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { StatsBar } from '@/components/layout/StatsBar';
import { ArticleCard } from '@/components/article/ArticleCard';

type TimeView = 'day' | 'week' | 'month';

export default function TimelinePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<TimeView>('day');

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setLoading(true);
    try {
      const data = await fetchArticles(100);
      setArticles(data.length > 0 ? data : getMockArticles());
    } catch {
      setArticles(getMockArticles());
    } finally {
      setLoading(false);
    }
  };

  // Group articles by date
  const groupedArticles = useMemo(() => {
    const groups: Record<string, Article[]> = {};

    articles.forEach(article => {
      const date = new Date(article.publishedAt);
      let dateKey: string;

      if (view === 'day') {
        dateKey = format(date, 'yyyy-MM-dd');
      } else if (view === 'week') {
        const weekStart = startOfDay(subDays(date, date.getDay()));
        dateKey = format(weekStart, 'yyyy年第w周');
      } else {
        dateKey = format(date, 'yyyy-MM');
      }

      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(article);
    });

    // Sort groups by date descending
    const sortedGroups = Object.entries(groups).sort((a, b) =>
      new Date(b[0]).getTime() - new Date(a[0]).getTime()
    );

    // Sort articles within each group by hotScore descending
    sortedGroups.forEach(([_, items]) => {
      items.sort((a, b) => b.hotScore - a.hotScore);
    });

    return sortedGroups;
  }, [articles, view]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isToday(date)) return '今天';
    if (isYesterday(date)) return '昨天';
    return format(date, 'M月d日 EEEE', { locale: zhCN });
  };

  const sourcesCount = new Set(articles.map(a => a.source)).size;
  const hotArticles = articles.filter(a => a.hotScore >= 100).length;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 bg-white/95 backdrop-blur z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center text-xl">
                🤖
              </div>
              <h1 className="text-xl font-bold">AI Daily</h1>
            </Link>
            <nav className="flex gap-6 text-sm">
              <Link href="/" className="text-text-secondary hover:text-text-primary transition-colors">
                首页
              </Link>
              <Link href="/timeline" className="text-text-primary font-medium">
                时间线
              </Link>
              <a
                href="https://github.com/xxl115/ai-daily-collector"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                GitHub
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <StatsBar
          total={articles.length}
          hot={hotArticles}
          sources={sourcesCount}
        />

        {/* View Toggle */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">📅 AI 时间线</h2>
          <div className="flex gap-2">
            {(['day', 'week', 'month'] as TimeView[]).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  view === v
                    ? 'bg-primary text-white'
                    : 'bg-background-card border border-gray-200 text-text-secondary hover:bg-background-hover'
                }`}
              >
                {v === 'day' ? '日' : v === 'week' ? '周' : '月'}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        {loading ? (
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-l-2 border-gray-200 pl-6 space-y-4">
                <div className="h-6 bg-background-hover rounded w-40 animate-pulse"></div>
                {[1, 2].map((j) => (
                  <div key={j} className="bg-background-card rounded-xl p-6 border border-gray-200 animate-pulse">
                    <div className="h-4 bg-background-hover rounded w-20 mb-3"></div>
                    <div className="h-6 bg-background-hover rounded w-full mb-2"></div>
                    <div className="h-4 bg-background-hover rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : groupedArticles.length === 0 ? (
          <div className="text-center py-20 text-text-muted">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-xl mb-2">暂无文章</p>
            <p className="text-sm">请稍后再试</p>
          </div>
        ) : (
          <div className="space-y-8">
            {groupedArticles.map(([dateStr, items]) => (
              <div key={dateStr} className="border-l-2 border-gray-200 pl-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{formatDate(dateStr)}</h3>
                  <span className="text-text-muted text-sm">{items.length} 篇</span>
                </div>
                <div className="space-y-4">
                  {items.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      onClick={() => window.open(article.url, '_blank', 'noopener,noreferrer')}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-text-muted text-sm">
          <p>数据来源: Hacker News, V2EX, GitHub Trending, AI Blogs, Dev.to, 36氪</p>
          <p className="mt-2">
            Powered by{' '}
            <a
              href="https://github.com/xxl115/ai-daily-collector"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              AI Daily Collector
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
