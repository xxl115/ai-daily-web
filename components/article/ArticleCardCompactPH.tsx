'use client';

import { Article } from '@/lib/types';
import * as SimpleIcons from 'simple-icons';
import { memo } from 'react';

interface ArticleCardCompactPHProps {
  article: Article;
  index?: number;
  onAiClick?: (article: Article) => void;
  onClick?: () => void;
}

// Map source names to simple-icons slugs
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
  index = 0,
  onAiClick,
}: ArticleCardCompactPHProps) {
  const iconSvg = getSourceIcon(article.source);
  const encodedIcon = iconSvg ? encodeURIComponent(iconSvg) : null;

  const handleCardClick = () => {
    window.open(article.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="group flex items-start gap-3 py-3 px-4 hover:bg-gray-50 transition-colors cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Left: Rank + Icon */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {/* Rank Number - subtle */}
        <span className="text-xs font-medium text-gray-300 w-4 text-center">
          {index + 1}
        </span>

        {/* Product Icon - 48x48 rounded */}
        <div className="w-12 h-12 flex-shrink-0 bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm flex items-center justify-center">
          {encodedIcon ? (
            <img
              src={`data:image/svg+xml,${encodedIcon}`}
              alt={article.source}
              className="w-8 h-8"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-500 to-pink-500 text-white text-xs font-bold">
              {article.source.slice(0, 2)}
            </div>
          )}
        </div>
      </div>

      {/* Middle: Content */}
      <div className="flex-1 min-w-0 pt-1">
        {/* Title */}
        <h3 className="text-[15px] font-semibold text-gray-900 leading-snug mb-1 group-hover:text-orange-600 transition-colors">
          {article.title}
        </h3>

        {/* Tags */}
        <div className="flex items-center gap-2 text-[13px] text-gray-400">
          <span className="hover:text-gray-600 transition-colors">{article.source}</span>
        </div>
      </div>

      {/* Right: Upvote Button - Product Hunt style */}
      <div className="flex-shrink-0 pt-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="flex flex-col items-center gap-1 p-2 rounded-xl transition-all"
        >
          {/* Up Arrow Icon */}
          <svg className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
          {/* Vote Count */}
          <span className="text-sm font-semibold text-gray-500">
            {article.hotScore}
          </span>
        </button>
      </div>
    </div>
  );
});
