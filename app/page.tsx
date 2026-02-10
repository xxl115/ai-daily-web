'use client';

import { useState, useEffect } from 'react';
import { Article } from '@/lib/types';
import { fetchArticles, getMockArticles } from '@/lib/api';
import { SearchBar } from '@/components/layout/SearchBar';
import { SourceFilterPills } from '@/components/filters/SourceFilterPills';
import { ArticleListPH } from '@/components/article/ArticleListPH';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { TimeNav } from '@/components/layout/TimeNav';

type Period = 'today' | 'yesterday' | 'week' | 'month';

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [period, setPeriod] = useState<Period>('today');

  useEffect(() => {
    loadArticles();
  }, [period]);

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

  const hotArticles = articles.filter(a => a.hotScore >= 100).length;

  const periodLabels: Record<Period, string> = {
    today: '今日热门 AI 产品',
    yesterday: '昨日热门',
    week: '本周热门',
    month: '上月热门',
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header - Product Hunt Style */}
      <Header onSearch={setSearchKeyword} />
      
      <main className="max-w-[1200px] mx-auto pt-8 pb-12">
        <div className="flex gap-8 px-4">
          {/* Left Content - Product List (2/3 width) */}
          <div className="flex-1">
            {/* Page Title */}
            <h1 className="text-2xl font-bold text-[#21293C] mb-6">
              {periodLabels[period]}
            </h1>
            
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
          
          {/* Right Sidebar (1/3 width) */}
          <aside className="w-[320px] flex-shrink-0">
            <Sidebar 
              stats={{
                total: articles.length,
                hot: hotArticles,
                sources: sources.length,
              }}
            />
          </aside>
        </div>
      </main>
    </div>
  );
}
