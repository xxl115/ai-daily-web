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
      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex gap-3">
              {/* Icon skeleton */}
              <div className="shrink-0">
                <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse" />
              </div>
              {/* Content skeleton */}
              <div className="flex-1 min-w-0 space-y-2">
                <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse" />
                <div className="h-3 bg-gray-200 rounded w-1/3 animate-pulse" />
              </div>
              {/* Hot score skeleton */}
              <div className="shrink-0 w-12 text-right">
                <div className="h-7 bg-gray-200 rounded animate-pulse w-full" />
              </div>
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
    <div className="space-y-3">
      {articles.map((article) => (
        <ArticleCardCompactPH
          key={article.id}
          article={article}
        />
      ))}
    </div>
  );
}
