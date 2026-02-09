import { ApiResponse, Article } from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://ai-daily-collector.xxl185.workers.dev';
const HOTSPOTS_API = `${API_BASE}/api/hotspots`;

export async function fetchArticles(limit: number = 100, period: 'today' | 'yesterday' | 'week' | 'month' = 'today'): Promise<Article[]> {
  try {
    const response = await fetch(`${HOTSPOTS_API}?limit=${limit}&period=${period}`);
    const data: ApiResponse<Article[]> = await response.json();

    if (data.success && data.data) {
      return data.data.map((item: any, index: number) => ({
        id: item.id || `${item.source}-${index}`,
        title: item.title,
        url: item.url,
        source: item.source,
        hotScore: item.hot_score || 0,
        publishedAt: item.published_at || item.timestamp || new Date().toISOString(),
        summary: item.summary,
      }));
    }

    return [];
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    return [];
  }
}

export async function fetchArticleById(id: string): Promise<Article | null> {
  try {
    const response = await fetch(`${API_BASE}/api/article/${id}`);
    const data = await response.json();

    if (data.success && data.data) {
      return data.data;
    }

    return null;
  } catch (error) {
    console.error('Failed to fetch article:', error);
    return null;
  }
}

export async function fetchSummary(url: string): Promise<string | null> {
  try {
    const response = await fetch(`${API_BASE}/api/summary?url=${encodeURIComponent(url)}`);
    const data = await response.json();

    if (data.success && data.summary) {
      return data.summary;
    }

    return null;
  } catch (error) {
    console.error('Failed to fetch summary:', error);
    return null;
  }
}

// 模拟数据（API 不可用时使用）
export function getMockArticles(): Article[] {
  return [
    {
      id: 'mock-1',
      title: 'Agent Skills - Build AI Agents That Work Together',
      url: 'https://news.ycombinator.com/item?id=1',
      source: 'Hacker News',
      hotScore: 331,
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: 'mock-2',
      title: 'Introducing GPT-5: The Next Leap in AI',
      url: 'https://openai.com/blog/gpt5',
      source: 'OpenAI Blog',
      hotScore: 285,
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
    },
    {
      id: 'mock-3',
      title: 'V2EX: AI 编程助手真的能提高效率吗？',
      url: 'https://www.v2ex.com/t/1',
      source: 'V2EX',
      hotScore: 168,
      publishedAt: new Date(Date.now() - 10800000).toISOString(),
    },
  ];
}
