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
    <div className="group bg-white border border-gray-200 rounded-lg p-2.5 gap-1.5 hover:shadow-sm hover:-translate-y-px transition-all duration-200">
      <div className="flex gap-1.5">
        {/* Left: Source Icon - 32x32px */}
        <div className="shrink-0 pt-0.5">
          <div className="w-8 h-8 bg-white rounded-md overflow-hidden border border-gray-100 flex items-center justify-center">
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
            className="block text-base font-medium text-gray-900 leading-snug hover:text-brand-orange transition-colors line-clamp-2 mb-1"
          >
            {article.title}
          </a>

          {/* Meta - 12px */}
          <p className="text-xs text-gray-500">
            {article.source} · {new Date(article.publishedAt).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}
          </p>
        </div>

        {/* Right: Hot Score + 🔥 */}
        <div className="shrink-0 flex flex-col items-end gap-0.5">
          <div className="text-xl font-bold text-gray-900">
            {article.hotScore}
          </div>
          <span className="text-sm">🔥</span>
        </div>
      </div>
    </div>
  );
});
