'use client';

import { useState } from 'react';
import { Article } from '@/lib/types';
import { getMockArticles } from '@/lib/api';
import { SearchBar } from '@/components/layout/SearchBar';
import { SourceFilterPills } from '@/components/filters/SourceFilterPills';
import { ArticleFeed } from '@/components/article/ArticleFeed';
import { Sidebar } from '@/components/layout/Sidebar';

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
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">AI</span>
            </div>
            <span className="text-lg font-bold text-slate-900">AI Daily</span>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md">
            <SearchBar onSearch={setSearchKeyword} />
          </div>

          {/* Time Navigation */}
          <div className="flex items-center gap-1">
            {[
              { key: 'today', label: '今日' },
              { key: 'yesterday', label: '昨日' },
              { key: 'week', label: '本周' },
              { key: 'month', label: '本月' },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setPeriod(item.key as Period)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  period === item.key
                    ? 'bg-orange-500 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8 py-8">
          {/* Left: Main Feed */}
          <main className="flex-1 min-w-0">
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
              {period === 'today' ? '今日热门' : period === 'yesterday' ? '昨日热门' : period === 'week' ? '本周热门' : '本月热门'}
            </h1>

            {/* Source Filter Pills */}
            <div className="mb-6">
              <SourceFilterPills
                articles={articles}
                selectedSource={selectedSource}
                onSelectSource={setSelectedSource}
              />
            </div>

            {/* Product Feed */}
            <ArticleFeed
              articles={filteredArticles}
              loading={loading}
            />
          </main>

          {/* Right: Sidebar */}
          <aside className="w-80 flex-shrink-0 hidden lg:block">
            <Sidebar
              sources={sources}
              hotArticles={hotArticlesList}
              total={articles.length}
              hot={hotCount}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
