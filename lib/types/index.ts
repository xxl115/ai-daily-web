// ==================== 文章相关 ====================

/** 文章分类类型 */
export type ArticleCategory = 'hot' | 'deep' | 'new' | 'breaking';

/** 文章来源类型 */
export type ArticleSource =
  | 'openai'
  | 'google'
  | 'anthropic'
  | 'mit'
  | 'wired'
  | 'verge'
  | 'techcrunch'
  | 'product-hunt'
  | string;

/** 文章数据结构 */
export interface Article {
  id: string;
  title: string;
  summary: string;
  category: ArticleCategory;
  source: ArticleSource;
  publishedAt: string;
  viewCount: number;
  commentCount: number;
  tags: string[];
  thumbnail?: string;
  url?: string;
}

// ==================== 筛选相关 ====================

/** 时间筛选类型 */
export type TimeFilter = 'today' | 'yesterday' | 'week' | 'month';

/** 排序方式类型 */
export type SortOption = 'hot' | 'newest' | 'relevant' | 'comments';

/** 筛选状态 */
export interface FilterState {
  keyword?: string;
  timeRange: TimeFilter;
  sources: ArticleSource[];
  tags: string[];
  sortBy: SortOption;
}

// ==================== 搜索建议 ====================

/** 搜索建议项 */
export interface SearchSuggestion {
  text: string;
  icon: string;
}

/** 搜索建议数据 */
export interface SearchSuggestions {
  trending: SearchSuggestion[];
  recent: SearchSuggestion[];
}

// ==================== 组件 Props ====================

/** 按钮变体 */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

/** 按钮尺寸 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/** 徽章变体 */
export type BadgeVariant = 'hot' | 'deep' | 'new' | 'breaking' | 'default';

/** 徽章尺寸 */
export type BadgeSize = 'sm' | 'md';

/** 标签尺寸 */
export type TagSize = 'sm' | 'md';

/** 骨架屏变体 */
export type SkeletonVariant = 'text' | 'rect' | 'circle';

/** 视图类型 */
export type ViewType = 'list' | 'grid';

// ==================== API 相关类型 ====================

/** 分类信息 */
export interface CategoryInfo {
  id: ArticleCategory;
  name: string;
  emoji: string;
  description: string;
  bgClass?: string;
  textClass?: string;
}

/** 来源信息 */
export interface SourceInfo {
  id: string;
  name: string;
  count: number;
}
