'use client';

import { Article } from '@/lib/types';
import { ArticleCardCompactPH } from './ArticleCardCompactPH';
import { Skeleton } from '../ui/Skeleton';

interface ArticleListPHProps {
  articles: Article[];
  loading?: boolean;
  onArticleClick?: (article: Article) => void;
  onAiClick?: (article: Article) => void;
}

export function ArticleListPH({ articles, loading, onArticleClick, onAiClick }: ArticleListPHProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-[6px] border border-gray-200 p-[10px]">
            <div className="flex items-center gap-3">
              <Skeleton className="w-8 h-8 rounded-md" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
              <Skeleton className="h-6 w-16" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        <div className="text-6xl mb-4">📭</div>
        <p className="text-xl mb-2">暂无文章</p>
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
          onAiClick={onAiClick}
          onClick={() => onArticleClick?.(article)}
        />
      ))}
    </div>
  );
}
