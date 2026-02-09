'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Article } from '@/lib/types';
import { fetchArticles, getMockArticles } from '@/lib/api';
import { StatsBar } from '@/components/layout/StatsBar';
import { SearchBar } from '@/components/layout/SearchBar';
import { SourceFilter } from '@/components/filters/SourceFilter';
import { ArticleList } from '@/components/article/ArticleList';

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

  const sourcesCount = new Set(articles.map(a => a.source)).size;
  const hotArticles = articles.filter(a => a.hotScore >= 100).length;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-white/10 sticky top-0 bg-background-primary/95 backdrop-blur z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="mb-6">
          <SearchBar onSearch={setSearchKeyword} />
        </div>

        {/* Stats */}
        <StatsBar
          total={articles.length}
          hot={hotArticles}
          sources={sourcesCount}
          lastUpdate={articles[0]?.publishedAt}
        />

        {/* Filters */}
        <SourceFilter
          articles={articles}
          selectedSource={selectedSource || '全部'}
          onSelectSource={setSelectedSource}
        />

        {/* Articles */}
        <ArticleList
          articles={filteredArticles}
          loading={loading}
          onArticleClick={(article) => window.open(article.url, '_blank', 'noopener,noreferrer')}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-20">
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
