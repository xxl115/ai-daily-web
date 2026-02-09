'use client';

import * as SimpleIcons from 'simple-icons';

interface SourceIconProps {
  source: string;
  size?: number;
  className?: string;
}

const iconMap: Record<string, string> = {
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
  'MIT Tech Review': 'mittechnologyreview',
  'Wired': 'wired',
  'VentureBeat': 'venturebeat',
  'Ars Technica': 'arstechnica',
};

function getIconSvg(slug: string): string {
  const iconGetter = (SimpleIcons as unknown as Record<string, () => { svg: string }>)[slug];
  if (iconGetter) {
    return iconGetter().svg;
  }
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>';
}

export function SourceIcon({ source, size = 24, className }: SourceIconProps) {
  const iconSlug = iconMap[source] || 'generic';
  const iconSvg = getIconSvg(iconSlug);
  const encodedIcon = encodeURIComponent(iconSvg);

  return (
    <img
      src={`data:image/svg+xml,${encodedIcon}`}
      alt={source}
      width={size}
      height={size}
      className={className}
      style={{ color: '#6B7280' }}
    />
  );
}
