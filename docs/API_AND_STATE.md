# AI Daily - API 与状态管理

> 数据接口设计和状态管理方案

---

## 1. 类型定义

### 1.1 核心类型

```typescript
// lib/types/index.ts

// ==================== 文章相关 ====================

export type ArticleCategory = 'hot' | 'deep' | 'new' | 'breaking';

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

export interface Article {
  id: string;
  title: string;
  summary: string;
  category: ArticleCategory;
  source: ArticleSource;
  sourceLabel: string;
  publishedAt: string;  // ISO 8601
  viewCount: number;
  commentCount: number;
  tags: string[];
  thumbnail?: string;
  url?: string;
}

// ==================== 筛选相关 ====================

export type TimeFilter = 'today' | 'yesterday' | 'week' | 'month';

export type SortOption = 'hot' | 'newest' | 'relevant' | 'comments';

export interface FilterState {
  keyword?: string;
  timeRange: TimeFilter;
  sources: ArticleSource[];
  tags: string[];
  sortBy: SortOption;
}

// 默认筛选状态
export const DEFAULT_FILTERS: FilterState = {
  timeRange: 'today',
  sources: [],
  tags: [],
  sortBy: 'hot',
};

// ==================== 搜索建议 ====================

export interface SearchSuggestion {
  text: string;
  icon: string;
}

export interface SearchSuggestions {
  trending: SearchSuggestion[];
  recent: SearchSuggestion[];
}

// ==================== API 响应 ====================

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: {
    code: string;
    message: string;
  };
}

export interface ArticleListResponse {
  articles: Article[];
  total: number;
  hasMore: boolean;
}

// ==================== 热门数据 ====================

export interface TrendingTags {
  tags: string[];
  updated: string;
}

export interface TrendingSearches {
  keywords: string[];
  updated: string;
}
```

---

## 2. API 接口设计

### 2.1 基础配置

```typescript
// lib/api.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

// 通用请求函数
async function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new ApiError(
        response.status,
        response.statusText,
        await response.json().catch(() => undefined)
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new NetworkError('Network request failed');
  }
}

// API 错误类
export class ApiError extends Error {
  constructor(
    public status: number,
    statusText: string,
    public body?: unknown
  ) {
    super(`API Error: ${status} ${statusText}`);
    this.name = 'ApiError';
  }
}

// 网络错误类
export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NetworkError';
  }
}
```

### 2.2 文章 API

```typescript
// lib/api/articles.ts

import { request } from '../api';
import type { FilterState, ArticleListResponse } from '@/lib/types';

/**
 * 获取文章列表
 */
export async function fetchArticles(
  filters: FilterState
): Promise<ArticleListResponse> {
  return request<ArticleListResponse>('/articles', {
    method: 'POST',
    body: JSON.stringify(filters),
  });
}

/**
 * 获取单篇文章详情
 */
export async function fetchArticle(
  id: string
): Promise<Article> {
  return request<Article>(`/articles/${id}`);
}
```

### 2.3 搜索建议 API

```typescript
// lib/api/search.ts

import { request } from '../api';
import type { SearchSuggestions, SearchSuggestion } from '@/lib/types';

/**
 * 获取搜索建议
 */
export async function fetchSearchSuggestions(
  keyword?: string
): Promise<SearchSuggestions> {
  const params = keyword ? `?keyword=${encodeURIComponent(keyword)}` : '';
  return request<SearchSuggestions>(`/search/suggestions${params}`);
}

/**
 * 获取热门搜索
 */
export async function fetchTrendingSearches(): Promise<string[]> {
  return request<string[]>('/search/trending');
}

/**
 * 搜索文章
 */
export async function searchArticles(
  keyword: string,
  filters?: Partial<FilterState>
): Promise<ArticleListResponse> {
  return request<ArticleListResponse>('/search', {
    method: 'POST',
    body: JSON.stringify({ keyword, ...filters }),
  });
}
```

### 2.4 热门数据 API

```typescript
// lib/api/trending.ts

import { request } from '../api';

/**
 * 获取热门标签
 */
export async function fetchTrendingTags(): Promise<string[]> {
  return request<string[]>('/trending/tags');
}

/**
 * 获取可用来源列表
 */
export async function fetchSources(): Promise<
  Array<{ value: string; label: string }>
> {
  return request<Array<{ value: string; label: string }>>('/sources');
}
```

### 2.5 用户历史 API（可选）

```typescript
// lib/api/history.ts

import { request } from '../api';

/**
 * 获取搜索历史
 */
export async function fetchSearchHistory(): Promise<string[]> {
  return request<string[]>('/history/search');
}

/**
 * 添加搜索历史
 */
export async function addSearchHistory(keyword: string): Promise<void> {
  return request<void>('/history/search', {
    method: 'POST',
    body: JSON.stringify({ keyword }),
  });
}

/**
 * 清除搜索历史
 */
export async function clearSearchHistory(): Promise<void> {
  return request<void>('/history/search', {
    method: 'DELETE',
  });
}
```

---

## 3. Mock 数据（开发用）

```typescript
// lib/mock/data.ts

import type { Article, FilterState, ArticleListResponse } from '@/lib/types';

// Mock 文章数据
export const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'OpenAI 发布 GPT-4.5：更强大的对话能力和更低的延迟',
    summary: 'OpenAI 今日宣布推出 GPT-4.5 预览版，这是迄今为止最智能的对话模型...',
    category: 'hot',
    source: 'openai',
    sourceLabel: 'OpenAI',
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    viewCount: 2300,
    commentCount: 128,
    tags: ['LLM', 'GPT-4', '产品'],
  },
  {
    id: '2',
    title: '斯坦福最新研究：AI 模型推理能力的边界在哪里？',
    summary: '斯坦福大学 AI 实验室发布了一项关于大语言模型推理能力的突破性研究...',
    category: 'deep',
    source: 'mit',
    sourceLabel: 'MIT Tech Review',
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    viewCount: 1800,
    commentCount: 256,
    tags: ['研究', 'LLM', '学术'],
  },
  {
    id: '3',
    title: 'Midjourney V6 正式发布：支持中文提示词和更精准的图像控制',
    summary: 'AI 图像生成工具 Midjourney 今日发布 V6 版本，带来多项重磅更新...',
    category: 'new',
    source: 'product-hunt',
    sourceLabel: 'Product Hunt',
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    viewCount: 3500,
    commentCount: 512,
    tags: ['AI绘画', '工具'],
  },
  {
    id: '4',
    title: 'Google Gemini Ultra 登场：多模态能力全面超越 GPT-4',
    summary: 'Google 今日发布 Gemini Ultra 模型，在多项基准测试中超越 GPT-4...',
    category: 'breaking',
    source: 'techcrunch',
    sourceLabel: 'TechCrunch',
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    viewCount: 5100,
    commentCount: 892,
    tags: ['LLM', 'Google'],
  },
];

// Mock 搜索建议
export const MOCK_SEARCH_SUGGESTIONS = {
  trending: [
    { text: 'GPT-4.5', icon: '🔥' },
    { text: 'Claude 3', icon: '🔥' },
    { text: 'Gemini Ultra', icon: '🔥' },
  ],
  recent: [
    { text: 'AI 绘画工具', icon: '🕐' },
    { text: '开源大模型', icon: '🕐' },
  ],
};

// Mock API 响应
export function mockFetchArticles(
  filters: FilterState
): ArticleListResponse {
  let articles = [...MOCK_ARTICLES];

  // 关键词筛选
  if (filters.keyword) {
    const keyword = filters.keyword.toLowerCase();
    articles = articles.filter(
      (a) =>
        a.title.toLowerCase().includes(keyword) ||
        a.summary.toLowerCase().includes(keyword) ||
        a.tags.some((t) => t.toLowerCase().includes(keyword))
    );
  }

  // 来源筛选
  if (filters.sources.length > 0) {
    articles = articles.filter((a) => filters.sources.includes(a.source));
  }

  // 标签筛选
  if (filters.tags.length > 0) {
    articles = articles.filter((a) =>
      filters.tags.some((t) => a.tags.includes(t))
    );
  }

  // 时间筛选
  const now = Date.now();
  const timeRanges = {
    today: 24 * 60 * 60 * 1000,
    yesterday: 48 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
  };
  const cutoff = now - timeRanges[filters.timeRange];
  articles = articles.filter(
    (a) => new Date(a.publishedAt).getTime() > cutoff
  );

  // 排序
  switch (filters.sortBy) {
    case 'hot':
      articles.sort((a, b) => b.viewCount - a.viewCount);
      break;
    case 'newest':
      articles.sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
      break;
    case 'comments':
      articles.sort((a, b) => b.commentCount - a.commentCount);
      break;
    case 'relevant':
    default:
      // 保持原顺序
      break;
  }

  return {
    articles,
    total: articles.length,
    hasMore: false,
  };
}

// Mock 延迟
export function mockDelay(ms: number = 500): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
```

---

## 4. 状态管理方案

### 4.1 整体架构

采用 **React Context + Hooks** 的轻量级状态管理方案：

```
┌─────────────────────────────────────────────────────────┐
│                      App                                 │
│  ┌───────────────────────────────────────────────────┐  │
│  │          FilterProvider (Context)                  │  │
│  │  ┌─────────────────────────────────────────────┐  │  │
│  │  │   filterState + filterActions               │  │  │
│  │  └─────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │          SearchProvider (Context)                  │  │
│  │  ┌─────────────────────────────────────────────┐  │  │
│  │  │   searchState + searchActions               │  │  │
│  │  └─────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### 4.2 筛选状态管理

```typescript
// contexts/FilterContext.tsx

'use client';

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { FilterState, TimeFilter, SortOption, ArticleSource } from '@/lib/types';
import { DEFAULT_FILTERS } from '@/lib/types';

interface FilterContextValue {
  // 状态
  filters: FilterState;
  isActive: boolean;  // 是否有激活的筛选
  isPanelOpen: boolean;

  // 操作
  updateFilter: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => void;
  updateFilters: (updates: Partial<FilterState>) => void;
  applyFilters: () => void;
  clearFilters: () => void;
  togglePanel: () => void;
  openPanel: () => void;
  closePanel: () => void;

  // URL 同步
  syncFromURL: () => void;
  syncToURL: () => void;
}

const FilterContext = createContext<FilterContextValue | undefined>(undefined);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // 检查是否有激活的筛选
  const isActive = useMemo(() => {
    return !!(
      filters.keyword ||
      filters.sources.length > 0 ||
      filters.tags.length > 0 ||
      filters.timeRange !== 'today' ||
      filters.sortBy !== 'hot'
    );
  }, [filters]);

  // 更新单个筛选条件
  const updateFilter = useCallback(<K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  // 批量更新筛选条件
  const updateFilters = useCallback((updates: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  }, []);

  // 应用筛选（触发搜索）
  const applyFilters = useCallback(() => {
    // 这里会触发 useArticles 的重新获取
    syncToURL();
    closePanel();
  }, []);

  // 清除所有筛选
  const clearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    syncToURL();
  }, []);

  // 面板操作
  const togglePanel = useCallback(() => {
    setIsPanelOpen((prev) => !prev);
  }, []);

  const openPanel = useCallback(() => {
    setIsPanelOpen(true);
  }, []);

  const closePanel = useCallback(() => {
    setIsPanelOpen(false);
  }, []);

  // 从 URL 同步筛选状态
  const syncFromURL = useCallback(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const updates: Partial<FilterState> = {};

    if (params.has('q')) updates.keyword = params.get('q') || undefined;
    if (params.has('time')) updates.timeRange = params.get('time') as TimeFilter;
    if (params.has('sort')) updates.sortBy = params.get('sort') as SortOption;
    if (params.has('sources')) updates.sources = params.get('sources')?.split(',') as ArticleSource[];
    if (params.has('tags')) updates.tags = params.get('tags')?.split(',') || [];

    if (Object.keys(updates).length > 0) {
      setFilters((prev) => ({ ...prev, ...updates }));
    }
  }, []);

  // 同步筛选状态到 URL
  const syncToURL = useCallback(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams();

    if (filters.keyword) params.set('q', filters.keyword);
    if (filters.timeRange !== 'today') params.set('time', filters.timeRange);
    if (filters.sortBy !== 'hot') params.set('sort', filters.sortBy);
    if (filters.sources.length > 0) params.set('sources', filters.sources.join(','));
    if (filters.tags.length > 0) params.set('tags', filters.tags.join(','));

    const queryString = params.toString();
    const newUrl = queryString ? `?${queryString}` : window.location.pathname;

    window.history.replaceState({}, '', newUrl);
  }, [filters]);

  const value = useMemo(
    () => ({
      filters,
      isActive,
      isPanelOpen,
      updateFilter,
      updateFilters,
      applyFilters,
      clearFilters,
      togglePanel,
      openPanel,
      closePanel,
      syncFromURL,
      syncToURL,
    }),
    [
      filters,
      isActive,
      isPanelOpen,
      updateFilter,
      updateFilters,
      applyFilters,
      clearFilters,
      togglePanel,
      openPanel,
      closePanel,
      syncFromURL,
      syncToURL,
    ]
  );

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
}

// Hook
export function useFilters() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within FilterProvider');
  }
  return context;
}
```

### 4.3 搜索状态管理

```typescript
// contexts/SearchContext.tsx

'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface SearchContextValue {
  keyword: string;
  setKeyword: (keyword: string) => void;
  clearKeyword: () => void;
  searchHistory: string[];
  addToHistory: (keyword: string) => void;
  removeFromHistory: (keyword: string) => void;
  clearHistory: () => void;
}

const SearchContext = createContext<SearchContextValue | undefined>(undefined);

const HISTORY_STORAGE_KEY = 'ai-daily-search-history';
const MAX_HISTORY_ITEMS = 10;

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [keyword, setKeyword] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // 更新搜索关键词
  const handleSetKeyword = useCallback((value: string) => {
    setKeyword(value);
  }, []);

  // 清除关键词
  const clearKeyword = useCallback(() => {
    setKeyword('');
  }, []);

  // 添加到搜索历史
  const addToHistory = useCallback((kw: string) => {
    if (!kw.trim()) return;

    setSearchHistory((prev) => {
      const filtered = prev.filter((item) => item !== kw);
      const updated = [kw, ...filtered].slice(0, MAX_HISTORY_ITEMS);

      // 持久化
      if (typeof window !== 'undefined') {
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
      }

      return updated;
    });
  }, []);

  // 从历史中移除
  const removeFromHistory = useCallback((kw: string) => {
    setSearchHistory((prev) => {
      const updated = prev.filter((item) => item !== kw);
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // 清除历史
  const clearHistory = useCallback(() => {
    setSearchHistory([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(HISTORY_STORAGE_KEY);
    }
  }, []);

  const value = {
    keyword,
    setKeyword: handleSetKeyword,
    clearKeyword,
    searchHistory,
    addToHistory,
    removeFromHistory,
    clearHistory,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within SearchProvider');
  }
  return context;
}
```

### 4.4 文章数据管理

```typescript
// hooks/useArticles.ts

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useFilters } from '@/contexts/FilterContext';
import { useSearch } from '@/contexts/SearchContext';
import type { Article } from '@/lib/types';

// 开发环境使用 Mock，生产环境使用真实 API
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export function useArticles() {
  const { filters } = useFilters();
  const { keyword } = useSearch();

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // 获取文章
  const fetchArticlesData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      if (USE_MOCK) {
        const { mockFetchArticles, mockDelay } = await import('@/lib/mock/data');
        await mockDelay(500); // 模拟网络延迟
        const response = mockFetchArticles({ ...filters, keyword });
        setArticles(response.articles);
      } else {
        const { fetchArticles } = await import('@/lib/api/articles');
        const response = await fetchArticles({ ...filters, keyword });
        setArticles(response.articles);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      console.error('Failed to fetch articles:', err);
    } finally {
      setLoading(false);
    }
  }, [filters, keyword]);

  // 刷新
  const refetch = useCallback(() => {
    fetchArticlesData();
  }, [fetchArticlesData]);

  // 筛选条件变化时重新获取
  useEffect(() => {
    fetchArticlesData();
  }, [fetchArticlesData]);

  return {
    articles,
    loading,
    error,
    refetch,
    total: articles.length,
  };
}
```

---

## 5. Provider 配置

```typescript
// app/providers.tsx

'use client';

import { FilterProvider } from '@/contexts/FilterContext';
import { SearchProvider } from '@/contexts/SearchContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SearchProvider>
      <FilterProvider>
        {children}
      </FilterProvider>
    </SearchProvider>
  );
}
```

---

## 6. 使用示例

### 6.1 页面中使用

```tsx
// app/page.tsx

'use client';

import { useFilters } from '@/contexts/FilterContext';
import { useSearch } from '@/contexts/SearchContext';
import { useArticles } from '@/hooks/useArticles';
import { Header } from '@/components/layout/Header';
import { FilterPanel } from '@/components/filters/FilterPanel';
import { ArticleList } from '@/components/article/ArticleList';

export default function HomePage() {
  const { isPanelOpen } = useFilters();
  const { keyword } = useSearch();
  const { articles, loading, error } = useArticles();

  return (
    <>
      <Header />
      <FilterPanel isOpen={isPanelOpen} />
      <main>
        <ArticleList
          articles={articles}
          loading={loading}
          error={error}
        />
      </main>
    </>
  );
}
```

### 6.2 组件中使用

```tsx
// components/filters/FilterPanel.tsx

'use client';

import { useFilters } from '@/contexts/FilterContext';

export function FilterPanel() {
  const {
    filters,
    isPanelOpen,
    updateFilter,
    applyFilters,
    clearFilters,
    closePanel,
  } = useFilters();

  return (
    <div className={cn(!isPanelOpen && 'hidden')}>
      {/* 时间筛选 */}
      <select
        value={filters.timeRange}
        onChange={(e) => updateFilter('timeRange', e.target.value)}
      >
        <option value="today">今日</option>
        <option value="week">本周</option>
      </select>

      {/* 操作按钮 */}
      <button onClick={applyFilters}>应用筛选</button>
      <button onClick={clearFilters}>清除全部</button>
    </div>
  );
}
```

---

## 7. URL 参数规范

| 参数 | 说明 | 示例 |
|------|------|------|
| `q` | 搜索关键词 | `?q=GPT-4` |
| `time` | 时间范围 | `?time=week` |
| `sources` | 来源列表 | `?sources=openai,google` |
| `tags` | 标签列表 | `?tags=LLM,开源` |
| `sort` | 排序方式 | `?sort=newest` |

**示例 URL:**
```
/?q=GPT-4&time=week&sources=openai,google&tags=LLM&sort=newest
```
