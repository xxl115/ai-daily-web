'use client';

import { useState } from 'react';
import { Article } from '@/lib/types';
import { getMockArticles } from '@/lib/api';
import { SearchBar } from '@/components/layout/SearchBar';
import { SourceFilterPills } from '@/components/filters/SourceFilterPills';
import { ArticleListMagazine } from '@/components/article/ArticleListMagazine';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Ambient background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF6B4A]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative flex">
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
            {/* Hero Section with Magazine-style Typography */}
            <div className="mb-8 relative">
              <div className="absolute -top-20 -left-20 text-[180px] font-black text-white/5 leading-none select-none">
                {period === 'today' ? 'TODAY' : period === 'yesterday' ? 'YDAY' : period === 'week' ? 'WEEK' : 'MONTH'}
              </div>

              <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400 mb-2 tracking-tight">
                {period === 'today' ? '今日热门' : period === 'yesterday' ? '昨日热门' : period === 'week' ? '本周热门' : '上月热门'}
              </h1>

              <p className="text-lg text-gray-400 font-light max-w-md">
                发现最新的 AI 资讯和趋势
              </p>

              {/* Decorative line */}
              <div className="mt-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-[#FF6B4A] to-transparent" />
                <div className="w-2 h-2 bg-[#FF6B4A] rotate-45" />
              </div>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <SearchBar onSearch={setSearchKeyword} />
            </div>

            {/* Source Filter Pills */}
            <div className="mb-8">
              <SourceFilterPills
                articles={articles}
                selectedSource={selectedSource}
                onSelectSource={setSelectedSource}
              />
            </div>

            {/* Articles List */}
            <ArticleListMagazine
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
    </div>
  );
}
