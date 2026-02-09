'use client';

import { Article } from '@/lib/types';
import * as SimpleIcons from 'simple-icons';
import { timeAgo } from '@/lib/utils';

interface ArticleCardCompactPHProps {
  article: Article;
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
  'Dev.to': 'devdotto',
  'TechCrunch': 'techcrunch',
  'The Verge': 'theverge',
  '36氪': '36kr',
  '掘金': 'juejin',
  '知乎': 'zhihu',
  '微信公众号': 'wechat',
};

function getSourceIcon(source: string): string {
  const iconSlug = sourceIconMap[source] || 'generic';
  const icon = (SimpleIcons as unknown as Record<string, () => { svg: string }>)[iconSlug];
  if (icon) {
    return icon().svg;
  }
  // Return a default SVG if not found
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>';
}

function getScoreColor(score: number): string {
  if (score >= 100) return 'text-orange-500';
  if (score >= 50) return 'text-red-500';
  if (score >= 20) return 'text-blue-500';
  return 'text-gray-500';
}

export function ArticleCardCompactPH({ article, onAiClick }: ArticleCardCompactPHProps) {
  const iconSvg = getSourceIcon(article.source);
  const encodedIcon = encodeURIComponent(iconSvg);

  return (
    <div className="group bg-white rounded-[6px] border border-gray-200 p-[10px] gap-[6px] flex items-center hover:shadow-sm hover:translate-y-[-1px] transition-all duration-200 cursor-pointer">
      {/* Source Icon - 32x32px */}
      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gray-50 rounded-md overflow-hidden">
        <img
          src={`data:image/svg+xml,${encodedIcon}`}
          alt={article.source}
          className="w-6 h-6"
          style={{ color: '#6B7280' }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Title - 16px */}
        <h3
          className="text-[16px] font-medium text-gray-900 leading-tight truncate cursor-pointer hover:text-orange-500 transition-colors"
          onClick={() => window.open(article.url, '_blank', 'noopener,noreferrer')}
        >
          {article.title}
        </h3>
        {/* Meta - 12px */}
        <p className="text-[12px] text-gray-500 mt-[2px]">
          {article.source} · {timeAgo(article.publishedAt)}
        </p>
      </div>

      {/* Right Side - Heat Score + AI */}
      <div className="flex-shrink-0 flex items-center gap-2">
        {/* Heat Score - Large number + 🔥 */}
        <span className={`text-lg font-bold ${getScoreColor(article.hotScore)}`}>
          {article.hotScore}
        </span>
        <span className="text-orange-500">🔥</span>

        {/* AI Button - Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAiClick?.(article);
          }}
          className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors"
          title="AI 摘要"
        >
          <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
