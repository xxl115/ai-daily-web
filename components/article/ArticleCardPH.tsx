'use client';

import { Article } from '@/lib/types';
import { timeAgo } from '@/lib/utils';
import { useState } from 'react';
import Link from 'next/link';

interface ArticleCardPHProps {
  article: Article;
  index?: number;
}

// 来源颜色映射
const sourceColors: Record<string, string> = {
  'Hacker News': 'bg-gradient-to-br from-orange-500 to-yellow-500',
  'V2EX': 'bg-gradient-to-br from-gray-600 to-gray-800',
  'GitHub': 'bg-gradient-to-br from-gray-700 to-gray-900',
  'OpenAI Blog': 'bg-gradient-to-br from-emerald-500 to-teal-600',
  '36氪': 'bg-gradient-to-br from-red-500 to-pink-600',
  'Dev.to': 'bg-gradient-to-br from-red-600 to-red-800',
  'Product Hunt': 'bg-gradient-to-br from-orange-600 to-red-500',
  'AI Blogs': 'bg-gradient-to-br from-purple-500 to-indigo-600',
  'TechCrunch': 'bg-gradient-to-br from-green-500 to-emerald-600',
  'The Verge': 'bg-gradient-to-br from-blue-600 to-indigo-700',
};

// 来源图标映射
const sourceIcons: Record<string, string> = {
  'Hacker News': 'Y',
  'V2EX': 'V',
  'GitHub': 'G',
  'OpenAI Blog': 'AI',
  '36氪': '36',
  'Dev.to': 'D',
  'Product Hunt': 'PH',
  'AI Blogs': 'AI',
  'TechCrunch': 'TC',
  'The Verge': 'V',
};

export function ArticleCardPH({ article, index }: ArticleCardPHProps) {
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

  const getColorClass = (source: string) => {
    return sourceColors[source] || 'bg-gradient-to-br from-gray-600 to-gray-700';
  };

  const getIcon = (source: string) => {
    return sourceIcons[source] || source.substring(0, 2).toUpperCase();
  };

  return (
    <Link
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block relative"
    >
      <div className="glow-border hover-lift rounded-2xl bg-background-card border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 sm:p-6">
          <div className="flex gap-4">
            {/* 左侧：来源图标 */}
            <div className="shrink-0">
              <div className={`w-14 h-14 sm:w-16 sm:h-16 ${getColorClass(article.source)} rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                {getIcon(article.source)}
              </div>
            </div>

            {/* 中间：内容 */}
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-semibold text-base sm:text-lg mb-2 line-clamp-2 group-hover:text-brand transition-colors">
                {article.title}
              </h3>

              <div className="flex items-center gap-3 text-xs sm:text-sm text-text-secondary">
                <span className="font-medium">{article.source}</span>
                <span className="w-1 h-1 rounded-full bg-text-muted"></span>
                <span>{timeAgo(article.publishedAt)}</span>
              </div>

              {article.summary && (
                <p className="mt-2 text-xs sm:text-sm text-text-muted line-clamp-2 hidden sm:block">
                  {article.summary}
                </p>
              )}
            </div>

            {/* 右侧：热度分数 */}
            <div className="shrink-0 flex flex-col items-end justify-between">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-background-secondary rounded-lg">
                <span className="text-lg">⭐</span>
                <span className="font-display font-bold text-lg">{article.hotScore}</span>
              </div>

              <button
                onClick={handleCopy}
                className="mt-3 p-2 rounded-lg hover:bg-background-secondary transition-colors text-text-muted hover:text-text-primary"
                title={copied ? '已复制' : '复制链接'}
              >
                {copied ? (
                  <span className="text-accent-green">✓</span>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
