'use client';

import { Article } from '@/lib/types';
import { ArticleCardMagazine } from './ArticleCardMagazine';

interface ArticleListMagazineProps {
  articles: Article[];
  loading?: boolean;
}

export function ArticleListMagazine({ articles, loading }: ArticleListMagazineProps) {
  if (loading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-32 bg-white/5 rounded-2xl border border-white/10" />
          </div>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4 opacity-50">📭</div>
        <p className="text-xl font-medium text-white/70 mb-2">暂无文章</p>
        <p className="text-sm text-white/50">请稍后再试</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {articles.map((article, index) => (
        <ArticleCardMagazine
          key={article.id}
          article={article}
          index={index}
        />
      ))}
    </div>
  );
}
