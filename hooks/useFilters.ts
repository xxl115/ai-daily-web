import { useState, useCallback, useEffect } from 'react';
import type { FilterState, TimeFilter, SortOption, ArticleSource } from '@/lib/types';

export interface UseFiltersReturn {
  filters: FilterState;
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  applyFilters: () => void;
  clearFilters: () => void;
  isActive: boolean;
  filtersUpdated: number; // 用于触发重新获取数据的计数器
}

const DEFAULT_FILTERS: FilterState = {
  timeRange: 'today',
  sources: [],
  tags: [],
  sortBy: 'hot',
};

export function useFilters(): UseFiltersReturn {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [filtersUpdated, setFiltersUpdated] = useState(0);

  const updateFilter = useCallback(
    <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
      setFiltersUpdated(prev => prev + 1);
    },
    []
  );

  const applyFilters = useCallback(() => {
    setFiltersUpdated(prev => prev + 1);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setFiltersUpdated(prev => prev + 1);
  }, []);

  const isActive = Boolean(
    filters.sources.length > 0 ||
    filters.tags.length > 0 ||
    filters.timeRange !== 'today' ||
    filters.sortBy !== 'hot'
  );

  return {
    filters,
    updateFilter,
    applyFilters,
    clearFilters,
    isActive,
    filtersUpdated,
  };
}
