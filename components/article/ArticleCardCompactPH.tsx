'use client';

import { Article } from '@/lib/types';
import * as SimpleIcons from 'simple-icons';
import { memo } from 'react';

interface ArticleCardCompactPHProps {
  article: Article;
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
}: ArticleCardCompactPHProps) {
  const iconSvg = getSourceIcon(article.source);
  const encodedIcon = iconSvg ? encodeURIComponent(iconSvg) : null;

  return (
    <div className="group bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
      <div className="flex gap-3">
        {/* Left: Source Icon - 32x32px */}
        <div className="shrink-0">
          <div className="w-8 h-8 bg-white rounded-lg overflow-hidden border border-gray-100 flex items-center justify-center shadow-sm">
            {encodedIcon ? (
              <img
                src={`data:image/svg+xml,${encodedIcon}`}
                alt={article.source}
                className="w-6 h-6"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-500 to-pink-500 text-white text-[10px] font-bold">
                {article.source.slice(0, 2)}
              </div>
            )}
          </div>
        </div>

        {/* Middle: Content */}
        <div className="flex-1 min-w-0">
          {/* Title - 16px */}
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-base font-semibold text-gray-900 leading-snug hover:text-[#FF6B4A] transition-colors line-clamp-2 mb-1"
          >
            {article.title}
          </a>

          {/* Meta - 13px */}
          <p className="text-xs text-gray-500">
            {article.source} · {new Date(article.publishedAt).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}
          </p>
        </div>

        {/* Right: Hot Score + 🔥 */}
        <div className="shrink-0 flex flex-col items-end gap-1">
          <div className="text-2xl font-bold text-gray-900">
            {article.hotScore}
          </div>
          <span className="text-base">🔥</span>
        </div>
      </div>
    </div>
  );
});
