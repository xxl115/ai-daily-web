'use client';

import { useState } from 'react';
import { Article } from '@/lib/types';
import { useTimePeriodArticles } from '@/hooks/useTimePeriodArticles';
import { SearchBar } from '@/components/layout/SearchBar';
import { SourceFilterPills } from '@/components/filters/SourceFilterPills';
import { ArticleListPH } from '@/components/article/ArticleListPH';
import { SideNav } from '@/components/layout/SideNav';
import { StatsPanel } from '@/components/layout/StatsPanel';

type Period = 'today' | 'yesterday' | 'week' | 'month';

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="text-5xl mb-4">⚠️</div>
      <p className="text-lg font-medium text-gray-900 mb-1">加载失败</p>
      <p className="text-sm text-gray-500 mb-4">{message}</p>
      <button
        onClick={onRetry}
        className="px-6 py-2 bg-[#FF6B4A] text-white rounded-lg text-sm font-medium hover:bg-[#f55a3a] transition-colors"
      >
        重试
      </button>
    </div>
  );
}

export default function HomePage() {
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [period, setPeriod] = useState<Period>('today');
  const [retryKey, setRetryKey] = useState(0);

  // Fetch articles from real API
  const { data, isLoading, error, refetch } = useTimePeriodArticles(period);

  const articles = data?.data ?? [];
  const loading = isLoading;

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

  const handleRetry = () => {
    setRetryKey(prev => prev + 1);
    refetch();
  };

  // Show error state
  if (error && !loading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex">
        <SideNav
          sources={[]}
          hotArticles={[]}
          currentPeriod={period}
          onPeriodChange={setPeriod}
        />
        <main className="flex-1 min-w-0 max-w-[760px]">
          <div className="px-6 py-8">
            <ErrorState
              message={error instanceof Error ? error.message : '无法获取数据，请稍后再试'}
              onRetry={handleRetry}
            />
          </div>
        </main>
        <StatsPanel total={0} hot={0} sources={0} />
      </div>
    );
  }

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
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {period === 'today' ? '今日热门' : period === 'yesterday' ? '昨日热门' : period === 'week' ? '本周热门' : '上月热门'}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              发现最新的 AI 资讯和趋势
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-5">
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
            key={`${period}-${retryKey}`}
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
