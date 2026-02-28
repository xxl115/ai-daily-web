import type { Article, FilterState, SearchSuggestion, CategoryInfo, SourceInfo } from '@/lib/types';

// ==================== 类型定义 ====================

interface BaseResponse<T = unknown> {
  success: boolean;
  message?: string;
}

interface ArticleListData {
  date: string;
  timeRange: string;
  total: number;
  page: number;
  pageSize: number;
  articles: Article[];
}

interface ArticleListResponse extends BaseResponse<ArticleListData> {
  data: ArticleListData;
}

interface SuggestionsData {
  trending: SearchSuggestion[];
  recent: SearchSuggestion[];
}

interface SuggestionsResponse extends BaseResponse<SuggestionsData> {
  data: SuggestionsData;
}

interface CategoriesResponse extends BaseResponse<CategoryInfo[]> {
  data: CategoryInfo[];
}

interface SourcesResponse extends BaseResponse<SourceInfo[]> {
  data: SourceInfo[];
}

interface StatsInfo {
  date: string;
  articles: number;
  views?: number;
  comments?: number;
}

interface StatsData {
  today: StatsInfo;
  total: StatsInfo;
}

interface StatsResponse extends BaseResponse<StatsData> {
  data: StatsData;
}

// ==================== API 配置 ====================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
const ENABLE_MOCK = process.env.NEXT_PUBLIC_ENABLE_MOCK === 'true';

// Mock 数据
const MOCK_ARTICLES: Article[] = [
  {
    id: 'arxiv-a1b2c3d4',
    title: 'ShotFinder: Imagination-Driven Open-Domain Video Shot Retrieval',
    summary: '本文提出ShotFinder，一种基于网络搜索的想象驱动开放域视频片段检索方法...',
    category: 'deep',
    source: 'arxiv',
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    viewCount: 2340,
    commentCount: 45,
    tags: ['研究', '视频', 'LLM'],
    url: 'http://arxiv.org/abs/260123456'
  },
  {
    id: 'openai-a5b6c7d8',
    title: 'OpenAI 发布 GPT-4.5：更强大的对话能力和更低的延迟',
    summary: 'OpenAI 今日宣布推出 GPT-4.5 预览版，这是迄今为止最智能的对话模型...',
    category: 'hot',
    source: 'openai',
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    viewCount: 5200,
    commentCount: 328,
    tags: ['LLM', 'GPT-4', '产品'],
    url: 'https://openai.com/blog/gpt-45'
  },
  {
    id: 'midjourney-a9b0c1d2',
    title: 'Midjourney V6 正式发布：支持中文提示词和更精准的图像控制',
    summary: 'AI 图像生成工具 Midjourney 今日发布 V6 版本，带来多项重磅更新...',
    category: 'new',
    source: 'product-hunt',
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    viewCount: 3500,
    commentCount: 512,
    tags: ['AI绘画', '工具', '产品发布'],
    url: 'https://midjourney.com/blog/v6'
  },
  {
    id: 'google-a3b4c5d6',
    title: 'Google Gemini Ultra 登场：多模态能力全面超越 GPT-4',
    summary: 'Google 今日发布 Gemini Ultra 模型，在多项基准测试中超越 GPT-4...',
    category: 'breaking',
    source: 'google',
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    viewCount: 8100,
    commentCount: 892,
    tags: ['LLM', 'Google', '多模态'],
    url: 'https://blog.google/technology/ai/gemini-ultra'
  },
];

// ==================== API 客户端 ====================

class ApiClient {
  private baseUrl: string;
  private enableMock: boolean;

  constructor(baseUrl: string = API_BASE_URL, enableMock: boolean = ENABLE_MOCK) {
    this.baseUrl = baseUrl;
    this.enableMock = enableMock;
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Request failed: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * 获取文章列表
   */
  async getArticles(params?: {
    keyword?: string;
    timeRange?: FilterState['timeRange'];
    sources?: string[];
    tags?: string[];
    sortBy?: FilterState['sortBy'];
    page?: number;
    pageSize?: number;
  }): Promise<ArticleListData> {
    // 如果启用 Mock，直接返回
    if (this.enableMock) {
      return {
        date: new Date().toISOString().split('T')[0],
        timeRange: params?.timeRange || 'today',
        total: MOCK_ARTICLES.length,
        page: params?.page || 1,
        pageSize: params?.pageSize || 20,
        articles: MOCK_ARTICLES,
      };
    }

    // 构建查询参数
    const queryParams = new URLSearchParams({
      timeRange: params?.timeRange || 'today',
      sortBy: params?.sortBy || 'hot',
      page: String(params?.page || 1),
      pageSize: String(params?.pageSize || 20),
    });

    if (params?.keyword) {
      queryParams.append('keyword', params.keyword);
    }
    if (params?.sources?.length) {
      queryParams.append('sources', params.sources.join(','));
    }
    if (params?.tags?.length) {
      queryParams.append('tags', params.tags.join(','));
    }

    const response = await this.request<ArticleListResponse>(
      `/api/v2/articles?${queryParams}`
    );

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to fetch articles');
    }

    return response.data;
  }

  /**
   * 获取搜索建议
   */
  async getSearchSuggestions(query?: string): Promise<SuggestionsData> {
    // 如果启用 Mock，返回模拟数据
    if (this.enableMock) {
      const trending: SearchSuggestion[] = [
        { text: 'GPT-4', icon: '🤖' },
        { text: 'Claude', icon: '🧠' },
        { text: 'AI绘画', icon: '🎨' },
        { text: '多模态模型', icon: '👁️' },
        { text: 'Agent工作流', icon: '🤝' },
      ];

      const recent: SearchSuggestion[] = [
        { text: 'Cursor IDE', icon: '⌨️' },
        { text: 'Gemini Ultra', icon: '🔍' },
      ];

      // 如果有查询词，过滤匹配的结果
      if (query) {
        const filteredTrending = trending.filter(s =>
          s.text.toLowerCase().includes(query.toLowerCase())
        );
        return { trending: filteredTrending, recent };
      }

      return { trending, recent };
    }

    const endpoint = query ? `/api/v2/suggestions?q=${encodeURIComponent(query)}` : '/api/v2/suggestions';
    const response = await this.request<SuggestionsResponse>(endpoint);

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to fetch suggestions');
    }

    return response.data;
  }

  /**
   * 获取分类列表
   */
  async getCategories(): Promise<CategoryInfo[]> {
    // 如果启用 Mock，返回模拟数据
    if (this.enableMock) {
      return [
        {
          id: 'hot',
          name: '热门',
          emoji: '🔥',
          description: '高热度内容',
          bgClass: 'bg-primary/10',
          textClass: 'text-primary',
        },
        {
          id: 'deep',
          name: '深度',
          emoji: '📰',
          description: '深度研究内容',
          bgClass: 'bg-secondary/10',
          textClass: 'text-secondary',
        },
        {
          id: 'new',
          name: '新品',
          emoji: '🆕',
          description: '最新发布内容',
          bgClass: 'bg-green-100',
          textClass: 'text-green-600',
        },
        {
          id: 'breaking',
          name: '突发',
          emoji: '⚡',
          description: '突发新闻',
          bgClass: 'bg-orange-100',
          textClass: 'text-orange-600',
        },
      ];
    }

    const response = await this.request<CategoriesResponse>('/api/v2/categories');

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to fetch categories');
    }

    return response.data;
  }

  /**
   * 获取来源列表
   */
  async getSources(): Promise<SourceInfo[]> {
    // 如果启用 Mock，返回模拟数据
    if (this.enableMock) {
      return [
        { id: 'openai', name: 'OpenAI', count: 12 },
        { id: 'google', name: 'Google AI', count: 8 },
        { id: 'anthropic', name: 'Anthropic', count: 5 },
        { id: 'mit', name: 'MIT Tech Review', count: 3 },
        { id: 'arxiv', name: 'ArXiv AI', count: 15 },
        { id: 'product-hunt', name: 'Product Hunt', count: 7 },
      ];
    }

    const response = await this.request<SourcesResponse>('/api/v2/sources');

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to fetch sources');
    }

    return response.data;
  }

  /**
   * 获取统计信息
   */
  async getStats(): Promise<StatsData> {
    // 如果启用 Mock，返回模拟数据
    if (this.enableMock) {
      return {
        today: {
          date: new Date().toISOString().split('T')[0],
          articles: 12,
          views: 3500,
          comments: 120,
        },
        total: {
          date: new Date().toISOString().split('T')[0],
          articles: 45,
          views: 12500,
          comments: 320,
        },
      };
    }

    const response = await this.request<StatsResponse>('/api/v2/stats');

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to fetch stats');
    }

    return response.data;
  }
}

// ==================== 导出单例 ====================

export const apiClient = new ApiClient();

export default ApiClient;
