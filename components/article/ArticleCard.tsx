'use client';

import { Article } from '@/lib/types';
import { timeAgo, getScoreColor, getSourceColor, cn, copyToClipboard, escapeHtml } from '@/lib/utils';
import { useState } from 'react';

interface ArticleCardProps {
  article: Article;
  index?: number;
  onClick?: () => void;
}

export function ArticleCard({ article, index, onClick }: ArticleCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const success = await copyToClipboard(article.url);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      onClick={onClick}
      className="group bg-background-card rounded-xl border border-gray-200 p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/50 cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <span className={cn(
          'px-3 py-1 rounded-full text-xs font-medium',
          getSourceColor(article.source)
        )}>
          {article.source}
        </span>
        <div className={cn('flex items-center gap-1 text-sm font-medium', getScoreColor(article.hotScore))}>
          <span>⭐</span>
          <span>{article.hotScore}</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold mb-3 line-clamp-2 group-hover:text-primary-light transition-colors">
        {index && <span className="text-text-muted mr-2">{index}.</span>}
        {escapeHtml(article.title)}
      </h3>

      {/* Footer */}
      <div className="flex items-center justify-between text-text-muted text-sm">
        <span className="flex items-center gap-1">
          <span>🕐</span>
          <span>{timeAgo(article.publishedAt)}</span>
        </span>
        <button
          onClick={handleCopy}
          className="px-3 py-1 rounded-lg bg-background-hover hover:bg-background-card border border-gray-200 text-xs transition-colors"
        >
          {copied ? '✓ 已复制' : '📋 复制'}
        </button>
      </div>
    </div>
  );
}
