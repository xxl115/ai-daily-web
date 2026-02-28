'use client';

import { Badge } from '@/components/ui/Badge';
import { Tag } from '@/components/ui/Tag';
import { formatCount, formatRelativeTime, getGradientBg, cn } from '@/lib/utils';
import { SOURCES } from '@/lib/constants';
import type { Article } from '@/lib/types';

interface ArticleCardProps {
  article: Article;
  onClick?: () => void;
}

export function ArticleCard({ article, onClick }: ArticleCardProps) {
  return (
    <article
      onClick={onClick}
      className="group cursor-pointer rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-200 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5"
    >
      <div className="flex gap-4">
        <Thumbnail category={article.category} index={Number(article.id)} />

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="mb-2 flex items-center gap-2">
            <Badge variant={article.category}>
              {article.category === 'hot' && '🔥 热门'}
              {article.category === 'deep' && '📰 深度'}
              {article.category === 'new' && '🆕 新品'}
              {article.category === 'breaking' && '⚡ 突发'}
            </Badge>
            <span className="text-xs text-gray-500">
              {SOURCES[article.source]?.label || article.source}
            </span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-500">
              {formatRelativeTime(article.publishedAt)}
            </span>
          </div>

          <h2 className="mb-2 line-clamp-1 text-lg font-semibold text-dark transition-colors group-hover:text-primary">
            {article.title}
          </h2>

          <p className="mb-3 line-clamp-2 text-sm text-gray-500">
            {article.summary}
          </p>

          <div className="mt-auto flex items-center gap-3">
            <Stat icon="👁" count={article.viewCount} />
            <Stat icon="💬" count={article.commentCount} />
            <div className="ml-auto flex gap-1">
              {article.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

interface ThumbnailProps {
  category: Article['category'];
  index: number;
}

function Thumbnail({ category, index }: ThumbnailProps) {
  const bgGradient = getGradientBg(index);

  const iconColor = {
    hot: 'text-primary/50',
    deep: 'text-secondary/50',
    new: 'text-green-500',
    breaking: 'text-orange-500',
  }[category] || 'text-gray-400';

  return (
    <div
      className={cn(
        'flex h-24 w-32 flex-shrink-0 items-center justify-center rounded-xl',
        'bg-gradient-to-br',
        bgGradient
      )}
    >
      <svg
        className={cn('h-12 w-12', iconColor)}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    </div>
  );
}

interface StatProps {
  icon: string;
  count: number;
}

function Stat({ icon, count }: StatProps) {
  return (
    <span className="flex items-center gap-1 text-sm text-gray-500">
      {icon}
      {formatCount(count)}
    </span>
  );
}
