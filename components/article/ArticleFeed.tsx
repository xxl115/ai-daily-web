'use client';

import { Article } from '@/lib/types';
import { ArticleCard } from './ArticleCard';

interface ArticleFeedProps {
  articles: Article[];
  loading?: boolean;
}

export function ArticleFeed({ articles, loading }: ArticleFeedProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
            <div className="flex gap-4">
              <div className="w-16 h-16 bg-slate-200 rounded-lg" />
              <div className="flex-1 space-y-3">
                <div className="h-6 bg-slate-200 rounded w-3/4" />
                <div className="h-4 bg-slate-200 rounded w-1/2" />
                <div className="h-3 bg-slate-200 rounded w-1/3" />
              </div>
              <div className="w-20 h-10 bg-slate-200 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-slate-500">暂无文章</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {articles.map((article, index) => (
        <ArticleCard
          key={article.id}
          article={article}
          rank={index + 1}
        />
      ))}
    </div>
  );
}
