'use client';

import { useState, useCallback } from 'react';
import { ArticleList } from '@/components/article/ArticleList';
import { useFilters, useSearch } from '@/hooks';
import { useArticles as useArticlesV2 } from '@/hooks/useArticles_v2';
import { useDebounce } from '@/hooks/useDebounce';
import type { Article, ViewType } from '@/lib/types';

interface ArticleListContainerProps {
  initialView?: ViewType;
}

export function ArticleListContainer({ initialView = 'list' }: ArticleListContainerProps) {
  const { filters, filtersUpdated, clearFilters } = useFilters();
  const { keyword, setKeyword, addToHistory } = useSearch();
  const debouncedKeyword = useDebounce(keyword, 300);
  
  const { articles, loading, error, refetch } = useArticlesV2(
    debouncedKeyword ? { ...filters, keyword: debouncedKeyword } : filters,
    filtersUpdated
  );

  const [view, setView] = useState<ViewType>(initialView);

  const handleArticleClick = useCallback((article: Article) => {
    console.log('Article clicked:', article.id);
  }, []);

  const handleViewChange = useCallback((newView: ViewType) => {
    setView(newView);
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <ResultCount
        count={articles.length}
        loading={loading}
        view={view}
        onViewChange={handleViewChange}
      />

      <ArticleList
        articles={articles}
        loading={loading}
        error={error}
        onArticleClick={handleArticleClick}
      />
    </main>
  );
}

interface ResultCountProps {
  count: number;
  loading: boolean;
  view: ViewType;
  onViewChange: (view: ViewType) => void;
}

function ResultCount({ count, loading, view, onViewChange }: ResultCountProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <p className="text-gray-600">
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            加载中...
          </span>
        ) : (
          <>
            <span className="font-semibold text-dark">{count}</span> 条搜索结果
          </>
        )}
      </p>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">视图:</span>
        <ViewButton type="list" active={view === 'list'} onClick={() => onViewChange('list')} />
        <ViewButton type="grid" active={view === 'grid'} onClick={() => onViewChange('grid')} />
      </div>
    </div>
  );
}

interface ViewButtonProps {
  type: ViewType;
  active?: boolean;
  onClick: () => void;
}

function ViewButton({ type, active = false, onClick }: ViewButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg transition-colors ${
        active
          ? 'bg-primary text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
      aria-label={`${type === 'list' ? '列表' : '网格'}视图`}
    >
      {type === 'list' ? (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      ) : (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      )}
    </button>
  );
}
