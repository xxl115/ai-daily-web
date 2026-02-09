'use client';

import { Article } from '@/lib/types';
import { ArticleCardCompactPH } from './ArticleCardCompactPH';

interface ArticleListPHProps {
  articles: Article[];
  loading?: boolean;
  onArticleClick?: (article: Article) => void;
  onAiClick?: (article: Article) => void;
}

export function ArticleListPH({ articles, loading, onAiClick }: ArticleListPHProps) {
  if (loading) {
    return (
      <div className="py-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex items-stretch gap-4 py-4 border-b border-gray-100 -mx-4 px-4">
            {/* Icon skeleton */}
            <div className="shrink-0">
              <div className="w-16 h-16 bg-gray-200 rounded-xl animate-pulse" />
            </div>
            {/* Content skeleton */}
            <div className="flex-1 min-w-0 space-y-2 py-1">
              <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
              <div className="h-3 bg-gray-200 rounded w-1/3 animate-pulse" />
            </div>
            {/* Buttons skeleton */}
            <div className="shrink-0 flex items-center gap-2 w-32">
              <div className="h-9 w-14 bg-gray-200 rounded-lg animate-pulse" />
              <div className="h-9 w-14 bg-gray-200 rounded-lg animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        <div className="text-5xl mb-4">📭</div>
        <p className="text-lg font-medium mb-1">暂无文章</p>
        <p className="text-sm">请稍后再试</p>
      </div>
    );
  }

  return (
    <div className="py-4">
      {articles.map((article, index) => (
        <ArticleCardCompactPH
          key={article.id}
          article={article}
          index={index}
        />
      ))}
    </div>
  );
}
