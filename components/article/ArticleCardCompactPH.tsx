'use client';

import { Article } from '@/lib/types';
import * as SimpleIcons from 'simple-icons';
import { memo } from 'react';

interface ArticleCardCompactPHProps {
  article: Article;
  index?: number;
}

const sourceIconMap: Record<string, string> = {
  'Hacker News': 'ycombinator',
  'GitHub': 'github',
  'Product Hunt': 'producthunt',
  'V2EX': 'v2ex',
  'OpenAI': 'openai',
  'OpenAI Blog': 'openai',
  'Dev.to': 'devdotto',
  'TechCrunch': 'techcrunch',
  'The Verge': 'theverge',
  '36氪': 'thirtysixkr',
  '掘金': 'juejin',
  '知乎': 'zhihu',
  '微信公众号': 'wechat',
  'MIT Tech Review': 'mittechnologyreview',
  'Wired': 'wired',
  'VentureBeat': 'venturebeat',
  'Ars Technica': 'arstechnica',
};

function getSourceIcon(source: string): string | null {
  const iconSlug = sourceIconMap[source];
  if (!iconSlug) return null;

  const iconModule = (SimpleIcons as unknown as Record<string, { svg: string; hex: string }>);
  if (iconModule[iconSlug]) {
    return iconModule[iconSlug].svg;
  }
  return null;
}

export const ArticleCardCompactPH = memo(function ArticleCardCompactPH({
  article,
  index,
}: ArticleCardCompactPHProps) {
  const iconSvg = getSourceIcon(article.source);
  const encodedIcon = iconSvg ? encodeURIComponent(iconSvg) : null;

  return (
    <div className="group bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-gray-300 transition-all duration-200 cursor-pointer">
      <div className="flex gap-4">
        {/* Left: Rank + Source Icon */}
        <div className="shrink-0 flex items-center gap-3">
          {/* Rank Number */}
          {index !== undefined && (
            <span className="text-lg font-bold text-gray-400 w-6 text-center">
              {index + 1}
            </span>
          )}

          {/* Source Icon - 64x64px */}
          <div className="w-16 h-16 bg-white rounded-xl overflow-hidden border border-gray-200 flex items-center justify-center shadow-sm">
            {encodedIcon ? (
              <img
                src={`data:image/svg+xml,${encodedIcon}`}
                alt={article.source}
                className="w-10 h-10"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#FF6B4A] to-pink-500 text-white text-sm font-bold">
                {article.source.slice(0, 2)}
              </div>
            )}
          </div>
        </div>

        {/* Middle: Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-lg font-semibold text-gray-900 leading-snug hover:text-[#FF6B4A] transition-colors line-clamp-2 mb-2"
          >
            {article.title}
          </a>

          {/* Description/Summary */}
          {article.summary && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
              {article.summary}
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="px-2 py-0.5 bg-gray-100 rounded-md font-medium">
              {article.source}
            </span>
            <span>·</span>
            <span>{new Date(article.publishedAt).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}</span>
          </div>
        </div>

        {/* Right: Engagement Buttons */}
        <div className="shrink-0 flex flex-col gap-2">
          {/* Comments Button */}
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-sm font-medium text-gray-700">{Math.floor(Math.random() * 50)}</span>
          </button>

          {/* Upvote Button */}
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF6B4A] text-white hover:bg-[#f55a3a] transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 4l-8 8h6v8h4v-8h6z" />
            </svg>
            <span className="text-sm font-semibold">{article.hotScore}</span>
          </button>
        </div>
      </div>
    </div>
  );
});
