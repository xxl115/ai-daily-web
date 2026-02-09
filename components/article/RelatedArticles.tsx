'use client';

import { useRouter } from 'next/navigation';
import { Article } from '@/lib/types';
import { timeAgo, escapeHtml } from '@/lib/utils';

interface RelatedArticlesProps {
  articles?: Article[];
}

export function RelatedArticles({ articles = [] }: RelatedArticlesProps) {
  const router = useRouter();

  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <div className="bg-background-card rounded-xl border border-white/10 p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">🔗</span>
        <span className="font-semibold">相关文章</span>
      </div>
      <div className="space-y-3">
        {articles.slice(0, 5).map((article) => (
          <div
            key={article.id}
            onClick={() => router.push(`/article/${article.id}`)}
            className="p-4 bg-background-hover rounded-lg border border-white/10 hover:border-primary/50 cursor-pointer transition-all"
          >
            <div className="text-sm text-text-muted mb-1">
              {article.source} · {timeAgo(article.publishedAt)}
            </div>
            <div className="font-medium">{escapeHtml(article.title)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
