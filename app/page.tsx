'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SideNav } from '@/components/layout/SideNav';
import { StatsPanel } from '@/components/layout/StatsPanel';
import { TimeNav } from '@/components/layout/TimeNav';
import { Article } from '@/lib/types';
import { fetchArticles, getMockArticles } from '@/lib/api';
import { SearchBar } from '@/components/layout/SearchBar';
import { SourceFilterPills } from '@/components/filters/SourceFilterPills';
import { ArticleListPH } from '@/components/article/ArticleListPH';

type Period = 'today' | 'yesterday' | 'week' | 'month';

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [period, setPeriod] = useState<Period>('today');

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

  const sources = Array.from(new Set(articles.map(a => a.source)))
    .map(name => ({ name, count: articles.filter(a => a.source === name).length }))
    .sort((a, b) => b.count - a.count);

  const hotArticlesList = articles
    .filter(a => a.hotScore >= 100)
    .sort((a, b) => b.hotScore - a.hotScore)
    .slice(0, 5);

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

      {/* Side Navigation */}
      <SideNav sources={sources} hotArticles={hotArticlesList} />

      {/* Main Content */}
      <main className="ml-[240px] mr-[320px] px-6 py-8">
        {/* Search */}
        <div className="mb-6">
          <SearchBar onSearch={setSearchKeyword} />
        </div>

        {/* Time Navigation */}
        <TimeNav value={period} onChange={setPeriod} />

        {/* Filters */}
        <SourceFilterPills
          articles={articles}
          selectedSource={selectedSource}
          onSelectSource={(source) => setSelectedSource(source)}
        />

        {/* Articles - PH Style */}
        <ArticleListPH
          articles={filteredArticles}
          loading={loading}
          onArticleClick={(article) => window.open(article.url, '_blank', 'noopener,noreferrer')}
        />
      </main>

      {/* Stats Panel */}
      <StatsPanel total={articles.length} hot={hotArticles} sources={sources.length} />
    </div>
  );
}
