'use client';

import { Article } from '@/lib/types';
import { ProductCard } from './ProductCard';
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
      <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="product-card p-5">
            <div className="flex items-start gap-4">
              <Skeleton className="w-[60px] h-[60px] rounded-[12px]" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-6 w-24" />
              </div>
              <Skeleton className="w-12 h-12" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">📭</div>
        <p className="text-xl mb-2 text-[#21293C]">暂无文章</p>
        <p className="text-sm text-[#718096]">请稍后再试</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {articles.map((article, index) => (
        <ProductCard
          key={article.id}
          article={article}
          rank={index + 1}
          onClick={() => onArticleClick?.(article)}
          onAiClick={onAiClick}
        />
      ))}
    </div>
  );
}
