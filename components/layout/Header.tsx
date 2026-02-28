'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { SearchSuggestionsDropdown } from '@/components/layout/SearchSuggestions';
import { FilterTags } from '@/components/filters/FilterTags';
import type { FilterState, SearchSuggestion } from '@/lib/types';

interface HeaderProps {
  filters?: FilterState;
  activeFilterCount?: number;
  onToggleFilter?: () => void;
  onFilterChange?: (filters: FilterState) => void;
  onSearch?: (keyword: string) => void;
}

export function Header({
  filters = { timeRange: 'today', sources: [], tags: [], sortBy: 'hot' },
  activeFilterCount = 0,
  onToggleFilter,
  onFilterChange,
  onSearch,
}: HeaderProps) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [suggestions] = useState({
    trending: [
      { text: 'GPT-4.5', icon: '🔥' },
      { text: 'Claude 3', icon: '🔥' },
      { text: 'Gemini Ultra', icon: '🔥' }
    ] as SearchSuggestion[],
    recent: [
      { text: 'AI 绘画工具', icon: '🕐' },
      { text: '开源大模型', icon: '🕐' }
    ] as SearchSuggestion[],
  });

  const handleSearch = useCallback((keyword: string) => {
    setSearchKeyword(keyword);
    onSearch?.(keyword);
  }, [onSearch]);

  const handleSuggestionSelect = useCallback((suggestion: SearchSuggestion) => {
    if (suggestion.text) {
      handleSearch(suggestion.text);
    }
    setShowSuggestions(false);
  }, [handleSearch]);

  const handleRemoveFilter = useCallback((filterKey: keyof FilterState, value: string) => {
    if (!onFilterChange) return;

    const updatedFilters = { ...filters };

    if (filterKey === 'keyword') {
      delete updatedFilters[filterKey];
    } else if (filterKey === 'timeRange') {
      updatedFilters[filterKey] = 'today';
    } else if (filterKey === 'sources') {
      updatedFilters.sources = updatedFilters.sources.filter((s: string) => s !== value);
    } else if (filterKey === 'tags') {
      updatedFilters.tags = updatedFilters.tags.filter((t: string) => t !== value);
    } else if (filterKey === 'sortBy') {
      updatedFilters[filterKey] = 'hot';
    }

    onFilterChange(updatedFilters);
  }, [filters, onFilterChange]);

  const handleClearAllFilters = useCallback(() => {
    if (!onFilterChange) return;
    onFilterChange({ timeRange: 'today', sources: [], tags: [], sortBy: 'hot' });
  }, [onFilterChange]);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Logo />

          <div className="flex-1 max-w-2xl relative">
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                placeholder="搜索 AI 新闻、产品、工具..."
                className="w-full pl-12 pr-24 py-3 bg-gray-100 border-2 border-transparent rounded-xl focus:border-primary focus:bg-white focus:outline-none transition-all duration-200 text-dark placeholder-gray-400"
                autoComplete="off"
              />
              <SearchSuggestionsDropdown
                isOpen={showSuggestions}
                keyword={searchKeyword}
                suggestions={suggestions}
                onSelect={handleSuggestionSelect}
              />
            </div>
          </div>

          <HeaderActions
            activeFilterCount={activeFilterCount}
            onToggleFilter={onToggleFilter}
          />
        </div>

        <FilterTags
          filters={filters}
          onRemove={handleRemoveFilter}
          onClearAll={handleClearAllFilters}
        />
      </div>
    </header>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
        <span className="text-sm font-bold text-white">AI</span>
      </div>
      <span className="text-xl font-bold text-dark">AI Daily</span>
    </div>
  );
}

interface HeaderActionsProps {
  activeFilterCount: number;
  onToggleFilter?: () => void;
}

function HeaderActions({ activeFilterCount, onToggleFilter }: HeaderActionsProps) {
  return (
    <div className="flex items-center gap-3">
      <Button variant="ghost" size="md" onClick={onToggleFilter}>
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        <span className="max-xs:hidden sm:inline">高级筛选</span>
        {activeFilterCount > 0 && (
          <span className="bg-primary text-white flex h-5 items-center justify-center rounded-full px-1.5 py-0.5 text-xs">
            {activeFilterCount}
          </span>
        )}
      </Button>

      <a
        href="https://github.com/youngzhangj/ai-daily-web"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600"
      >
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
        GitHub
      </a>
    </div>
  );
}
