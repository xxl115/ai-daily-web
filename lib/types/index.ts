// 文章数据类型
export interface Article {
  id: string;
  title: string;
  url: string;
  source: string;
  hotScore: number;
  publishedAt: string;
  summary?: string;
  related?: Article[];
}

// API 响应类型
export interface ApiResponse<T> {
  success: boolean;
  total?: number;
  sources?: SourceStats[];
  data: T;
}

export interface SourceStats {
  name: string;
  count: number;
}

// 筛选器类型
export interface ArticleFilters {
  source?: string;
  keyword?: string;
  limit?: number;
}
