'use client';

import { useState } from 'react';
import { Article } from '@/lib/types';
import { getMockArticles } from '@/lib/api';
import { SearchBar } from '@/components/layout/SearchBar';
import { SourceFilterPills } from '@/components/filters/SourceFilterPills';
import { ArticleListPH } from '@/components/article/ArticleListPH';
import { SideNav } from '@/components/layout/SideNav';
import { StatsPanel } from '@/components/layout/StatsPanel';

type Period = 'today' | 'yesterday' | 'week' | 'month';

export default function HomePage() {
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [period, setPeriod] = useState<Period>('today');

  // Use mock data for now
  const articles = getMockArticles();
  const loading = false;

  const filteredArticles = articles.filter(article => {
    const matchSource = !selectedSource || article.source === selectedSource;
    const matchKeyword = !searchKeyword ||
      article.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      article.source.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchSource && matchKeyword;
  });

  // Calculate stats
  const sources = Array.from(new Set(articles.map(a => a.source)))
    .map(name => ({ name, count: articles.filter(a => a.source === name).length }))
    .sort((a, b) => b.count - a.count);

  const hotArticlesList = articles
    .filter(a => a.hotScore >= 100)
    .sort((a, b) => b.hotScore - a.hotScore)
    .slice(0, 5);

  const hotCount = articles.filter(a => a.hotScore >= 100).length;

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex">
      {/* Left Sidebar - 240px */}
      <SideNav
        sources={sources}
        hotArticles={hotArticlesList}
        currentPeriod={period}
        onPeriodChange={setPeriod}
      />

      {/* Main Content - max 760px */}
      <main className="flex-1 min-w-0 max-w-[760px]">
        <div className="px-6 py-8">
          {/* Period Title */}
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            {period === 'today' ? '今日热门' : period === 'yesterday' ? '昨日热门' : period === 'week' ? '本周热门' : '上月热门'}
          </h2>

          {/* Search Bar */}
          <div className="mb-6">
            <SearchBar onSearch={setSearchKeyword} />
          </div>

          {/* Source Filter Pills */}
          <div className="mb-6">
            <SourceFilterPills
              articles={articles}
              selectedSource={selectedSource}
              onSelectSource={setSelectedSource}
            />
          </div>

          {/* Articles List */}
          <ArticleListPH
            articles={filteredArticles}
            loading={loading}
          />
        </div>
      </main>

      {/* Right Sidebar - 320px */}
      <StatsPanel
        total={articles.length}
        hot={hotCount}
        sources={sources.length}
      />
    </div>
  );
}
