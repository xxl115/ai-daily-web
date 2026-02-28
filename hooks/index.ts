export { useDebounce } from './useDebounce';

export { useFilters } from './useFilters';
export type { UseFiltersReturn } from './useFilters';

export { useSearch } from './useSearch';
export type { UseSearchReturn } from './useSearch';

// 旧的 useArticles（使用 Mock 数据）
export { useArticles } from './useArticles';
export type { UseArticlesReturn } from './useArticles';

// 新的 useArticlesV2（使用后端 API v2）
export { useArticles as useArticlesV2 } from './useArticles_v2';
export type { UseArticlesReturn as UseArticlesV2Return } from './useArticles_v2';

// 搜索建议 Hook
export { useSearchSuggestions } from './useSearchSuggestions';
