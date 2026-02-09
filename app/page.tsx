'use client';

import { useState, useEffect } from 'react';
import { SideNav } from '@/components/layout/SideNav';
import { TimeNav } from '@/components/layout/TimeNav';
import { Article } from '@/lib/types';
import { fetchArticles, getMockArticles } from '@/lib/api';
import { SearchBar } from '@/components/layout/SearchBar';
import { SourceFilterPills } from '@/components/filters/SourceFilterPills';
import { ArticleListPH } from '@/components/article/ArticleListPH';
import { StatsPanel } from '@/components/layout/StatsPanel';

type Period = 'today' | 'yesterday' | 'week' | 'month';

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [period, setPeriod] = useState<Period>('today');

  useEffect(() => {
    loadArticles();
  }, [period]); // Reload when period changes

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

  const sources = Array.from(new Set(articles.map(a => a.source)))
    .map(name => ({ name, count: articles.filter(a => a.source === name).length }))
    .sort((a, b) => b.count - a.count);

  const hotArticlesList = articles
    .filter(a => a.hotScore >= 100)
    .sort((a, b) => b.hotScore - a.hotScore)
    .slice(0, 5);

  const hotArticles = articles.filter(a => a.hotScore >= 100).length;

  // Period labels
  const periodLabels: Record<Period, string> = {
    today: '今日热门',
    yesterday: '昨日热门',
    week: '本周热门',
    month: '上月热门',
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex">
      {/* Left Sidebar - 240px */}
      <SideNav sources={sources} hotArticles={hotArticlesList} currentPeriod={period} />

      {/* Main Content - flexible width */}
      <main className="flex-1 min-w-0">
        <div className="max-w-[760px] mx-auto px-6 py-8">
          {/* Search Bar - Full width */}
          <div className="mb-6">
            <SearchBar onSearch={setSearchKeyword} />
          </div>

          {/* Period Title */}
          <h2 className="text-xl font-bold text-[#111827] mb-4">
            {periodLabels[period]}
          </h2>

          {/* Time Navigation */}
          <div className="mb-6">
            <TimeNav value={period} onChange={setPeriod} />
          </div>

          {/* Source Filter Pills */}
          <SourceFilterPills
            articles={articles}
            selectedSource={selectedSource}
            onSelectSource={setSelectedSource}
          />

          {/* Articles List */}
          <div className="mt-6">
            <ArticleListPH
              articles={filteredArticles}
              loading={loading}
              onArticleClick={(article) => window.open(article.url, '_blank', 'noopener,noreferrer')}
            />
          </div>
        </div>
      </main>

      {/* Right Sidebar - 320px */}
      <StatsPanel total={articles.length} hot={hotArticles} sources={sources.length} />
    </div>
  );
}
