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

  // Generate some fake topics based on article source
  const topics = [article.source, 'AI', 'Technology'].slice(0, Math.floor(Math.random() * 2) + 2);

  return (
    <div className="group flex items-stretch gap-4 py-4 border-b border-gray-100 hover:bg-gray-50/50 transition-colors cursor-pointer -mx-4 px-4">
      {/* Product Icon */}
      <div className="shrink-0">
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

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Title with rank */}
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-base font-semibold text-gray-900 leading-snug hover:text-[#FF6B4A] transition-colors mb-1"
        >
          {index !== undefined && `${index + 1}. `}{article.title}
        </a>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-2 line-clamp-1">
          {article.summary || article.source}
        </p>

        {/* Topics/Tags */}
        <div className="flex items-center gap-1 text-xs text-gray-500 flex-wrap">
          {topics.map((topic, i) => (
            <span key={i}>
              {i > 0 && <span className="mx-0.5">•</span>}
              <span className="hover:text-gray-700 transition-colors">{topic}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Engagement Buttons */}
      <div className="shrink-0 flex items-center gap-2">
        {/* Comments */}
        <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-gray-200 hover:bg-white hover:border-gray-300 transition-all text-sm">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="text-gray-700 font-medium">{Math.floor(Math.random() * 50)}</span>
        </button>

        {/* Upvotes */}
        <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-gray-200 hover:bg-[#FF6B4A] hover:text-white hover:border-[#FF6B4A] transition-all text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
          <span className="font-semibold">{article.hotScore}</span>
        </button>
      </div>
    </div>
  );
});
