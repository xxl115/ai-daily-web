'use client';

import { Article } from '@/lib/types';
import { timeAgo, getScoreColor, getSourceColor } from '@/lib/utils';
import { useState } from 'react';
import Link from 'next/link';

interface ArticleCardCompactProps {
  article: Article;
  onClick?: () => void;
}

export function ArticleCardCompact({ article, onClick }: ArticleCardCompactProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(article.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // 获取来源图标（用首字母或 emoji）
  const getSourceIcon = (source: string) => {
    const emojiMap: Record<string, string> = {
      'Hacker News': 'Y',
      'V2EX': 'V',
      'GitHub': 'G',
      'OpenAI Blog': '🤖',
      '36氪': '3',
      'Dev.to': 'D',
    };
    return emojiMap[source] || source.charAt(0).toUpperCase();
  };

  return (
    <Link
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="group bg-background-card hover:bg-background-hover rounded-xl border border-white/10 hover:border-primary/30 transition-all duration-200"
    >
      <div className="p-4 sm:p-5">
        <div className="flex gap-3 sm:gap-4">
          {/* 左侧：来源图标 */}
          <div className={cn(
            'w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-lg flex items-center justify-center text-base sm:text-lg font-bold',
            getSourceColor(article.source)
          )}>
            {getSourceIcon(article.source)}
          </div>

          {/* 中间：内容区域 */}
          <div className="flex-1 min-w-0">
            {/* 标题 */}
            <h3 className="font-semibold text-sm sm:text-base mb-1.5 line-clamp-2 group-hover:text-primary-light transition-colors">
              {article.title}
            </h3>

            {/* 标签行 */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-text-muted mb-2">
              <span className="text-text-secondary font-medium">{article.source}</span>
              <span>·</span>
              <span>{timeAgo(article.publishedAt)}</span>
            </div>

            {/* 描述（如果有） */}
            {article.summary && (
              <p className="text-xs text-text-muted line-clamp-2 hidden sm:block">
                {article.summary}
              </p>
            )}
          </div>

          {/* 右侧：热度分数和操作 */}
          <div className="flex flex-col items-end gap-2 shrink-0">
            {/* 热度分数 */}
            <div className={cn(
              'flex items-center gap-1 px-2.5 py-1 rounded-lg text-sm font-semibold',
              getScoreColor(article.hotScore)
            )}>
              <span>⭐</span>
              <span>{article.hotScore}</span>
            </div>

            {/* 复制按钮 */}
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg hover:bg-background-primary transition-colors text-text-muted hover:text-text-primary"
              title={copied ? '已复制' : '复制链接'}
            >
              {copied ? '✓' : '📋'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

// 需要导入 cn 函数
import { cn } from '@/lib/utils/cn';
