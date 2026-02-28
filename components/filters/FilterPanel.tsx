'use client';

import { Select, Button, Tag } from '@/components/ui';
import { TIME_PERIODS, SORT_OPTIONS, POPULAR_TAGS } from '@/lib/constants';
import type { FilterState, TimeFilter, SortOption, ArticleSource } from '@/lib/types';

interface FilterPanelProps {
  isOpen?: boolean;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onApply: () => void;
  onClear: () => void;
}

export function FilterPanel({
  isOpen = false,
  filters,
  onFiltersChange,
  onApply,
  onClear,
}: FilterPanelProps) {
  return (
    <div
      className={`bg-white border-b border-gray-200 overflow-hidden transition-all duration-300 ${
        isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <TimeFilter
            value={filters.timeRange}
            onChange={(value) => onFiltersChange({ ...filters, timeRange: value })}
          />
          <SourceFilter
            value={filters.sources}
            onChange={(value) => onFiltersChange({ ...filters, sources: value })}
          />
          <SortFilter
            value={filters.sortBy}
            onChange={(value) => onFiltersChange({ ...filters, sortBy: value })}
          />
          <FilterActions onApply={onApply} onClear={onClear} />
        </div>

        <div className="mt-6 border-t border-gray-100 pt-6">
          <TagFilter
            value={filters.tags}
            onChange={(value) => onFiltersChange({ ...filters, tags: value })}
          />
        </div>
      </div>
    </div>
  );
}

function TimeFilter({ value, onChange }: { value: TimeFilter; onChange: (value: TimeFilter) => void }) {
  return (
    <div>
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-dark">
        <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        时间范围
      </h3>
      <div className="space-y-2">
        {TIME_PERIODS.map((period) => (
          <label key={period.value} className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="timeFilter"
              value={period.value}
              checked={value === period.value}
              onChange={(e) => onChange(e.target.value as TimeFilter)}
              className="accent-primary"
            />
            <span className="text-sm text-gray-700">{period.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function SourceFilter({ value, onChange }: { value: ArticleSource[]; onChange: (value: ArticleSource[]) => void }) {
  const SOURCES = ['openai', 'google', 'anthropic'] as ArticleSource[];
  const SOURCE_LABELS: Record<string, string> = {
    openai: 'OpenAI',
    google: 'Google',
    anthropic: 'Anthropic',
  };

  return (
    <div>
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-dark">
        <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
        新闻来源
      </h3>
      <div className="relative">
        <select
          value=""
          onChange={() => {}}
          className="w-full cursor-pointer appearance-none rounded-lg border border-gray-200 bg-gray-100 px-3 py-2 text-sm focus:border-primary focus:outline-none"
        >
          <option value="">全部来源</option>
          <option value="openai">OpenAI</option>
          <option value="google">Google AI</option>
          <option value="anthropic">Anthropic</option>
          <option value="mit">MIT Tech Review</option>
          <option value="wired">Wired</option>
          <option value="verge">The Verge</option>
        </select>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {SOURCES.map((source) => (
          <button
            key={source}
            onClick={() => {
              const newValue = value.includes(source)
                ? value.filter((s) => s !== source)
                : [...value, source];
              onChange(newValue);
            }}
            className={`cursor-pointer rounded-full px-2 py-1 text-xs text-gray-600 transition-colors hover:bg-gray-200 ${
              value.includes(source) ? 'bg-primary text-white hover:bg-red-600' : 'bg-gray-100'
            }`}
          >
            {SOURCE_LABELS[source]}
          </button>
        ))}
      </div>
    </div>
  );
}

function SortFilter({ value, onChange }: { value: SortOption; onChange: (value: SortOption) => void }) {
  return (
    <div>
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-dark">
        <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
        </svg>
        排序方式
      </h3>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as SortOption)}
          className="w-full cursor-pointer appearance-none rounded-lg border border-gray-200 bg-gray-100 px-3 py-2 text-sm focus:border-primary focus:outline-none"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}

function FilterActions({ onApply, onClear }: { onApply: () => void; onClear: () => void }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="mb-1 flex items-center gap-2 text-sm font-semibold text-dark">
        <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
        操作
      </h3>
      <Button onClick={onApply}>
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        应用筛选
      </Button>
      <Button variant="secondary" onClick={onClear}>
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
        清除全部
      </Button>
    </div>
  );
}

function TagFilter({ value, onChange }: { value: string[]; onChange: (value: string[]) => void }) {
  return (
    <div>
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-dark">
        <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
        热门标签
      </h3>
      <div className="flex flex-wrap gap-2">
        {POPULAR_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => {
              const newValue = value.includes(tag)
                ? value.filter((t) => t !== tag)
                : [...value, tag];
              onChange(newValue);
            }}
            className={`cursor-pointer rounded-full px-3 py-1.5 text-sm transition-colors ${
              value.includes(tag)
                ? 'bg-primary text-white hover:bg-red-600'
                : 'bg-gray-100 text-gray-700 hover:bg-primary hover:text-white hover:scale-105'
            }`}
          >
            {tag}
          </button>
        ))}
        <button
          onClick={() => {}}
          className="cursor-pointer rounded-full bg-primary px-3 py-1.5 text-sm text-white hover:bg-red-600 transition-colors"
        >
          + 自定义
        </button>
      </div>
    </div>
  );
}
