export interface SourceIconConfig {
  name: string | null;     // simple-icons 中的图标名称
  color?: string;          // 可选的品牌色
  fallback?: string;       // 回退文字
}

export const SOURCE_ICONS: Record<string, SourceIconConfig> = {
  'Hacker News': {
    name: 'ycombinator',
    color: '#FF6600',
    fallback: 'HN',
  },
  'GitHub': {
    name: 'github',
    color: '#24292E',
    fallback: 'GH',
  },
  'V2EX': {
    name: 'v2ex',
    color: '#fff',
    fallback: 'V2',
  },
  'Product Hunt': {
    name: 'producthunt',
    color: '#DA552F',
    fallback: 'PH',
  },
  'OpenAI Blog': {
    name: 'openai',
    color: '#000',
    fallback: 'AI',
  },
  'Dev.to': {
    name: 'devdotto',
    color: '#0A0A0A',
    fallback: 'DEV',
  },
  'TechCrunch': {
    name: 'techcrunch',
    color: '#0A9E01',
    fallback: 'TC',
  },
  'The Verge': {
    name: 'theverge',
    color: '#E5127D',
    fallback: 'TV',
  },
  '36氪': {
    name: 'thirtysixkr',
    color: '#FF6600',
    fallback: '36',
  },
  'AI Blogs': {
    name: null,
    color: '#6366F1',
    fallback: 'AI',
  },
  '掘金': {
    name: 'juejin',
    color: '#1E80FF',
    fallback: '掘',
  },
  '知乎': {
    name: 'zhihu',
    color: '#0084FF',
    fallback: '知',
  },
  '微信公众号': {
    name: 'wechat',
    color: '#07C160',
    fallback: '微信',
  },
  'MIT Tech Review': {
    name: 'mittechnologyreview',
    color: '#000',
    fallback: 'MIT',
  },
  'Wired': {
    name: 'wired',
    color: '#000',
    fallback: 'Wired',
  },
  'VentureBeat': {
    name: 'venturebeat',
    color: '#000',
    fallback: 'VB',
  },
  'Ars Technica': {
    name: 'arstechnica',
    color: '#FF4E00',
    fallback: 'Ars',
  },
};

export function getSourceIcon(source: string): SourceIconConfig {
  return SOURCE_ICONS[source] || {
    name: null,
    color: '#6B7280',
    fallback: source.substring(0, 2).toUpperCase(),
  };
}
