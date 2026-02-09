'use client';

import { Article } from '@/lib/types';
import { ArticleCard } from './ArticleCard';
import { Skeleton } from '../ui/Skeleton';

interface ArticleListProps {
  articles: Article[];
  loading?: boolean;
  onArticleClick?: (article: Article) => void;
}

export function ArticleList({ articles, loading, onArticleClick }: ArticleListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-background-card rounded-xl border border-gray-200 p-6 space-y-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-20 text-text-muted">
        <div className="text-6xl mb-4">📭</div>
        <p className="text-xl mb-2">暂无文章</p>
        <p className="text-sm">请稍后再试</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article, index) => (
        <ArticleCard
          key={article.id}
          article={article}
          index={index + 1}
          onClick={() => onArticleClick?.(article)}
        />
      ))}
    </div>
  );
}
