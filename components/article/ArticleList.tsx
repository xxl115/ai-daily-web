'use client';

import { ArticleCard } from './ArticleCard';
import type { Article } from '@/lib/types';

interface ArticleListProps {
  articles: Article[];
  loading?: boolean;
  error?: Error | null;
  onArticleClick?: (article: Article) => void;
}

export function ArticleList({
  articles,
  loading = false,
  error = null,
  onArticleClick,
}: ArticleListProps) {
  if (error) {
    return <ArticleListError error={error} />;
  }

  if (loading) {
    return <ArticleListLoading />;
  }

  if (articles.length === 0) {
    return <ArticleListEmpty />;
  }

  return (
    <div className="space-y-4">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          onClick={() => onArticleClick?.(article)}
        />
      ))}
    </div>
  );
}

interface ArticleListEmptyProps {
  keyword?: string;
}

function ArticleListEmpty({ keyword }: ArticleListEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-12 text-center">
      <svg
        className="mb-4 h-16 w-16 text-gray-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h3 className="text-lg font-semibold text-dark">
        {keyword ? `未找到 "${keyword}" 的相关内容` : '暂无内容'}
      </h3>
      <p className="mt-2 text-sm text-gray-500">
        {keyword
          ? '尝试更换关键词或调整筛选条件'
          : '发布的内容将在这里显示'}
      </p>
    </div>
  );
}

interface ArticleListErrorProps {
  error: Error;
  onRetry?: () => void;
}

function ArticleListError({ error, onRetry }: ArticleListErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-12 text-center">
      <svg
        className="mb-4 h-16 w-16 text-red-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.932-3.13L12.066 6.667c-.77-1.463-2.484-1.463-3.254 0L6.05 16.878c-.57 1.463 1.392 3.13 1.932 3.13z"
        />
      </svg>
      <h3 className="text-lg font-semibold text-dark">加载失败</h3>
      <p className="mt-2 text-sm text-gray-500">{error.message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600"
        >
          重新加载
        </button>
      )}
    </div>
  );
}

function ArticleListLoading() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-6">
          <div className="h-24 w-32 animate-pulse rounded-xl bg-gray-100" />
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="flex gap-2">
              <div className="h-5 w-16 animate-pulse rounded-full bg-gray-100" />
              <div className="h-5 w-20 animate-pulse rounded-full bg-gray-100" />
            </div>
            <div className="h-6 w-full animate-pulse rounded bg-gray-100" />
            <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
            <div className="mt-2 flex gap-4">
              <div className="h-5 w-12 animate-pulse rounded bg-gray-100" />
              <div className="h-5 w-12 animate-pulse rounded bg-gray-100" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
