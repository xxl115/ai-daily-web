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
          <div key={i} className="flex items-stretch gap-3 py-3 border-b border-gray-100 -mx-4 px-4">
            {/* Rank + Icon skeleton */}
            <div className="flex items-center gap-3 flex-shrink-0 w-16">
              <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
              <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse" />
            </div>
            {/* Content skeleton */}
            <div className="flex-1 space-y-2 py-1">
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
              <div className="h-3 bg-gray-200 rounded w-1/3 animate-pulse" />
            </div>
            {/* Button skeleton */}
            <div className="w-20 h-10 bg-gray-200 rounded-lg animate-pulse flex-shrink-0" />
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
    <div>
      {articles.map((article, index) => (
        <ArticleCardCompactPH
          key={article.id}
          article={article}
          index={index}
          onAiClick={onAiClick}
        />
      ))}
    </div>
  );
}
