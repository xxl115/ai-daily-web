'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Article } from '@/lib/types';
import { fetchArticles, getMockArticles } from '@/lib/api';
import { SearchBar } from '@/components/layout/SearchBar';
import { Sidebar } from '@/components/layout/Sidebar';
import { ArticleCardCompact } from '@/components/article/ArticleCardCompact';
import { SourceFilter } from '@/components/filters/SourceFilter';
import { Skeleton } from '@/components/ui/Skeleton';

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSource, setSelectedSource] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setLoading(true);
    try {
      const data = await fetchArticles(100);
      if (data.length > 0) {
        setArticles(data);
      } else {
        // Fallback to mock data
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
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-white/10 sticky top-0 bg-background-primary/95 backdrop-blur z-50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center text-xl">
                🤖
              </div>
              <h1 className="text-xl font-bold">AI Daily</h1>
            </Link>
            <nav className="flex gap-6 text-sm">
              <Link href="/" className="text-text-primary font-medium">
                首页
              </Link>
              <Link href="/timeline" className="text-text-secondary hover:text-text-primary transition-colors">
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

      {/* Main Content - 左右分栏布局 */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* 左侧：主内容区 */}
          <div className="flex-1 min-w-0">
            {/* 搜索和统计 */}
            <div className="mb-6 space-y-4">
              <SearchBar onSearch={setSearchKeyword} />

              {/* 统计信息 */}
              <div className="flex items-center gap-4 text-sm text-text-muted">
                <span>今日采集 <strong className="text-text-primary">{articles.length}</strong> 篇</span>
                <span>·</span>
                <span>热点文章 <strong className="text-text-primary">{hotArticles}</strong> 篇</span>
              </div>
            </div>

            {/* 筛选器 */}
            <SourceFilter
              articles={articles}
              selectedSource={selectedSource || '全部'}
              onSelectSource={setSelectedSource}
            />

            {/* 文章列表 */}
            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="bg-background-card rounded-xl border border-white/10 p-5">
                    <div className="flex gap-4">
                      <Skeleton className="w-12 h-12 rounded-lg shrink-0" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-1/3" />
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
              <div className="space-y-3 sm:space-y-4">
                {filteredArticles.map((article) => (
                  <ArticleCardCompact
                    key={article.id}
                    article={article}
                  />
                ))}
              </div>
            )}
          </div>

          {/* 右侧：侧边栏（平板及以上显示） */}
          <div className="hidden md:block">
            <Sidebar articles={articles} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-20">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-text-muted text-sm">
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
