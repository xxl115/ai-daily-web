'use client';

import { useState } from 'react';
import { Article } from '@/lib/types';
import { getMockArticles } from '@/lib/api';
import { SearchBar } from '@/components/layout/SearchBar';
import { TimeNav } from '@/components/layout/TimeNav';
import { SourceFilterPills } from '@/components/filters/SourceFilterPills';
import { ArticleListPH } from '@/components/article/ArticleListPH';

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

  return (
    <div className="min-h-screen bg-[#F7F7F5]">
      {/* Header - Fixed top */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-[740px] mx-auto px-4">
          {/* Top Row: Logo + Nav */}
          <div className="flex items-center justify-between h-14">
            <a href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">AI</span>
              </div>
              <span className="text-lg font-bold text-gray-900">AI Daily</span>
            </a>

            <nav className="flex items-center gap-4 text-sm">
              <a href="/" className="font-medium text-gray-900">首页</a>
              <a href="/timeline" className="text-gray-500 hover:text-gray-700">时间线</a>
            </nav>
          </div>

          {/* Second Row: Time Navigation */}
          <div className="pb-3">
            <TimeNav value={period} onChange={setPeriod} />
          </div>
        </div>
      </header>

      {/* Main Content - Single column centered */}
      <main className="max-w-[740px] mx-auto">
        {/* Search Bar */}
        <div className="px-4 py-4 border-b border-gray-200">
          <SearchBar onSearch={setSearchKeyword} />
        </div>

        {/* Source Filter Pills */}
        <div className="px-4 py-3 border-b border-gray-200">
          <SourceFilterPills
            articles={articles}
            selectedSource={selectedSource}
            onSelectSource={setSelectedSource}
          />
        </div>

        {/* Articles List */}
        <div className="bg-white border-x border-gray-200">
          <ArticleListPH
            articles={filteredArticles}
            loading={loading}
          />
        </div>
      </main>
    </div>
  );
}
