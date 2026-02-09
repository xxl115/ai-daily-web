'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Article } from '@/lib/types';
import { fetchArticles, getMockArticles } from '@/lib/api';
import { SearchBar } from '@/components/layout/SearchBar';
import { SidebarNew } from '@/components/layout/SidebarNew';
import { ArticleCardPH } from '@/components/article/ArticleCardPH';
import { SourceFilter } from '@/components/filters/SourceFilter';
import { Skeleton } from '@/components/ui/Skeleton';

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSource, setSelectedSource] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setLoading(true);
    try {
      const data = await fetchArticles(100);
      if (data.length > 0) {
        setArticles(data);
      } else {
        setArticles(getMockArticles());
      }
    } catch (error) {
      console.error('Failed to load articles:', error);
      setArticles(getMockArticles());
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = articles.filter(article => {
    const matchSource = !selectedSource || article.source === selectedSource;
    const matchKeyword = !searchKeyword ||
      article.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      article.source.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchSource && matchKeyword;
  });

  const hotArticles = articles.filter(a => a.hotScore >= 100).length;

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <header className="border-b border-white/5 sticky top-0 z-50 glass">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 gradient-brand rounded-xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-105 transition-transform">
                🤖
              </div>
              <div>
                <h1 className="font-display font-bold text-xl gradient-text">AI Daily</h1>
                <p className="text-xs text-text-muted">每日 AI 热点资讯</p>
              </div>
            </Link>
            <nav className="flex gap-6 text-sm">
              <Link href="/" className="text-text-primary font-medium border-b-2 border-brand pb-1">
                首页
              </Link>
              <Link href="/timeline" className="text-text-secondary hover:text-text-primary transition-colors pb-1">
                时间线
              </Link>
              <a
                href="https://github.com/xxl115/ai-daily-collector"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-text-primary transition-colors pb-1"
              >
                GitHub
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="flex gap-8">
          {/* 左侧：主内容区 */}
          <div className="flex-1 min-w-0">
            {/* 搜索和统计 */}
            <div className="mb-6 space-y-4 animate-fade-in-up">
              <SearchBar onSearch={setSearchKeyword} />

              {/* 统计信息 */}
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse"></span>
                  <span className="text-text-muted">今日采集</span>
                  <strong className="text-text-primary font-display">{articles.length}</strong>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand"></span>
                  <span className="text-text-muted">热点文章</span>
                  <strong className="text-text-primary font-display">{hotArticles}</strong>
                </div>
              </div>
            </div>

            {/* 筛选器 */}
            <div className="mb-6 animate-fade-in-up stagger-1">
              <SourceFilter
                articles={articles}
                selectedSource={selectedSource || '全部'}
                onSelectSource={setSelectedSource}
              />
            </div>

            {/* 文章列表 */}
            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="bg-background-card rounded-2xl border border-white/5 p-6 animate-shimmer" style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className="flex gap-4">
                      <Skeleton className="w-16 h-16 rounded-xl shrink-0" />
                      <div className="flex-1 space-y-3">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                      <Skeleton className="w-16 h-8 rounded-lg shrink-0" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredArticles.length === 0 ? (
              <div className="text-center py-20 text-text-muted">
                <div className="text-6xl mb-4">📭</div>
                <p className="text-xl mb-2">暂无文章</p>
                <p className="text-sm">请稍后再试</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredArticles.map((article, index) => (
                  <div
                    key={article.id}
                    className="animate-fade-in-up hover-lift"
                    style={{ animationDelay: `${Math.min(index * 0.05, 0.5)}s` }}
                  >
                    <ArticleCardPH article={article} index={index} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 右侧：侧边栏 */}
          <div className="hidden lg:block animate-fade-in-up stagger-2">
            <SidebarNew articles={articles} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 mt-20 relative z-10">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-text-muted text-sm">
          <p>数据来源: Hacker News, V2EX, GitHub Trending, AI Blogs, Dev.to, 36氪</p>
          <p className="mt-2">
            Powered by{' '}
            <a
              href="https://github.com/xxl115/ai-daily-collector"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand hover:text-brand-light transition-colors"
            >
              AI Daily Collector
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
