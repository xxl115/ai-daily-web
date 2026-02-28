'use client';

import { Tag } from '@/components/ui/Tag';
import { cn } from '@/lib/utils';
import type { FilterState } from '@/lib/types';

interface FilterTagsProps {
  filters: FilterState;
  onRemove: (filterKey: keyof FilterState, value: string) => void;
  onClearAll: () => void;
}

export function FilterTags({ filters, onRemove, onClearAll }: FilterTagsProps) {
  const activeFilters = getActiveFilters(filters);

  if (activeFilters.length === 0) return null;

  return (
    <div className="mt-4 flex flex-wrap gap-2 items-center">
      <span className="mr-2 text-sm text-gray-500">当前筛选:</span>
      {activeFilters.map((filter) => (
        <FilterTag key={filter.label} {...filter} onRemove={onRemove} />
      ))}
    </div>
  );
}

interface FilterTagProps {
  label: string;
  filterKey: keyof FilterState;
  value: string;
  onRemove: (filterKey: keyof FilterState, value: string) => void;
}

function FilterTag({ label, filterKey, value, onRemove }: FilterTagProps) {
  return (
    <Tag active size="sm">
      {label}
      <button
        onClick={() => onRemove(filterKey, value)}
        className="ml-1.5 text-gray-400 hover:text-gray-600"
        aria-label={`移除 ${label}`}
      >
        ×
      </button>
    </Tag>
  );
}

function getActiveFilters(filters: FilterState) {
  const activeFilters: { label: string; filterKey: keyof FilterState; value: string }[] = [];

  if (filters.keyword) {
    activeFilters.push({ label: filters.keyword, filterKey: 'keyword', value: filters.keyword });
  }

  if (filters.timeRange !== 'today') {
    const timeLabels: Record<string, string> = {
      yesterday: '昨日',
      week: '本周',
      month: '本月',
    };
    activeFilters.push({ label: timeLabels[filters.timeRange], filterKey: 'timeRange', value: filters.timeRange });
  }

  if (filters.sources.length > 0) {
    filters.sources.forEach((source) => {
      const sourceLabels: Record<string, string> = {
        openai: 'OpenAI',
        google: 'Google',
        anthropic: 'Anthropic',
        mit: 'MIT',
        wired: 'Wired',
        verge: 'Verge',
        'product-hunt': 'Product Hunt',
      };
      activeFilters.push({ label: sourceLabels[source] || source, filterKey: 'sources', value: source });
    });
  }

  if (filters.tags.length > 0) {
    filters.tags.forEach((tag) => {
      activeFilters.push({ label: tag, filterKey: 'tags', value: tag });
    });
  }

  if (filters.sortBy !== 'hot') {
    const sortLabels: Record<string, string> = {
      newest: '最新发布',
      relevant: '相关性',
      comments: '评论最多',
    };
    activeFilters.push({ label: sortLabels[filters.sortBy], filterKey: 'sortBy', value: filters.sortBy });
  }

  return activeFilters;
}
