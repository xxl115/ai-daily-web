'use client';

import { Article } from '@/lib/types';
import * as SimpleIcons from 'simple-icons';
import { memo } from 'react';

interface ArticleCardMagazineProps {
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

export const ArticleCardMagazine = memo(function ArticleCardMagazine({
  article,
  index,
}: ArticleCardMagazineProps) {
  const iconSvg = getSourceIcon(article.source);
  const encodedIcon = iconSvg ? encodeURIComponent(iconSvg) : null;

  return (
    <article className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-sm hover:border-[#FF6B4A]/50 transition-all duration-300">
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B4A]/0 via-[#FF6B4A]/5 to-[#FF6B4A]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative p-6">
        <div className="flex gap-5">
          {/* Left: Rank + Icon */}
          <div className="shrink-0 flex flex-col items-center gap-3">
            {/* Rank */}
            {index !== undefined && (
              <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/80 to-white/20">
                {(index + 1).toString().padStart(2, '0')}
              </span>
            )}

            {/* Icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl flex items-center justify-center border border-white/20 shadow-xl group-hover:scale-110 transition-transform duration-300">
              {encodedIcon ? (
                <img
                  src={`data:image/svg+xml,${encodedIcon}`}
                  alt={article.source}
                  className="w-12 h-12"
                />
              ) : (
                <span className="text-2xl font-bold text-white/80">
                  {article.source.slice(0, 2)}
                </span>
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
              className="block text-xl font-bold text-white mb-2 leading-snug group-hover:text-[#FF6B4A] transition-colors"
            >
              {article.title}
            </a>

            {/* Summary */}
            {article.summary && (
              <p className="text-sm text-white/60 mb-3 line-clamp-2 leading-relaxed">
                {article.summary}
              </p>
            )}

            {/* Meta */}
            <div className="flex items-center gap-3 text-xs">
              <span className="px-3 py-1 bg-white/10 rounded-full text-white/80 font-medium">
                {article.source}
              </span>
              <span className="text-white/40">
                {new Date(article.publishedAt).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}
              </span>
            </div>
          </div>

          {/* Right: Stats */}
          <div className="shrink-0 flex flex-col items-end gap-2">
            {/* Hot Score */}
            <div className="text-center">
              <div className="text-3xl font-black text-[#FF6B4A]">
                {article.hotScore}
              </div>
              <div className="text-xs text-white/40 uppercase tracking-wider">热度</div>
            </div>

            {/* Action Button */}
            <button className="mt-2 px-4 py-2 bg-white/10 hover:bg-[#FF6B4A] rounded-xl text-white/80 hover:text-white text-sm font-medium transition-all duration-300 flex items-center gap-2 group-hover:shadow-lg group-hover:shadow-[#FF6B4A]/20">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              查看
            </button>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
    </article>
  );
});
