'use client';

import { Article } from '@/lib/types';
import { timeAgo } from '@/lib/utils';
import * as SimpleIcons from 'simple-icons';
import { cn } from '@/lib/utils';

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

interface ProductCardProps {
  article: Article;
  onClick?: () => void;
  onAiClick?: (article: Article) => void;
  rank?: number;
}

export function ProductCard({ article, onClick, onAiClick, rank }: ProductCardProps) {
  const iconSvg = getSourceIcon(article.source);
  const encodedIcon = encodeURIComponent(iconSvg);
  
  const getScoreColor = (score: number): string => {
    if (score >= 100) return 'text-[#FF6154]';
    if (score >= 50) return 'text-red-500';
    if (score >= 20) return 'text-blue-500';
    return 'text-[#4A5568]';
  };

  return (
    <div 
      className="product-card p-5 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        {/* Product Icon - 60x60 */}
        <div className="w-[60px] h-[60px] rounded-[12px] overflow-hidden bg-[#F5F5F5] flex-shrink-0 flex items-center justify-center">
          <img
            src={`data:image/svg+xml,${encodedIcon}`}
            alt={article.source}
            className="w-10 h-10"
            style={{ color: '#6B7280' }}
          />
        </div>
        
        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-[18px] font-semibold text-[#21293C] mb-1 line-clamp-2">
            {article.title}
          </h3>
          <p className="text-[14px] text-[#4A5568] line-clamp-2 mb-3">
            {article.source} · {timeAgo(article.publishedAt)}
          </p>
          
          {/* Tags */}
          <div className="flex gap-2">
            <span className="tag-ph">
              {article.source}
            </span>
            {article.hotScore >= 100 && (
              <span className="tag-ph bg-[#FFF5F5] text-[#FF6154]">
                🔥 热门
              </span>
            )}
          </div>
        </div>
        
        {/* Vote/Heat Score Area */}
        <div className="flex flex-col items-center flex-shrink-0">
          <button 
            className="vote-button p-2"
            onClick={(e) => {
              e.stopPropagation();
            }}
            aria-label="投票"
          >
            <svg 
              className="w-5 h-5" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M12 4l-8 8h5v8h6v-8h5z" />
            </svg>
          </button>
          <span className={cn(
            "font-bold text-[16px]",
            getScoreColor(article.hotScore)
          )}>
            {article.hotScore}
          </span>
        </div>
      </div>
    </div>
  );
}
