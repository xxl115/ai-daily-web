'use client';

import { useState, useCallback } from 'react';
import { Header } from '@/components/layout/Header';
import { ArticleListContainer } from '@/components/ArticleListContainer';
import { FilterPanel } from '@/components/filters/FilterPanel';
import type { FilterState } from '@/lib/types';
import { useFilters } from '@/hooks';

export default function HomePage() {
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const { filters, updateFilter, clearFilters } = useFilters();
  
  const handleToggleFilter = useCallback(() => {
    setIsFilterPanelOpen(prev => !prev);
  }, []);
  
  const handleFilterChange = useCallback((newFilters: FilterState) => {
    if (newFilters.timeRange && newFilters.timeRange !== filters.timeRange) {
      updateFilter('timeRange', newFilters.timeRange);
    }
    if (newFilters.sortBy && newFilters.sortBy !== filters.sortBy) {
      updateFilter('sortBy', newFilters.sortBy);
    }
  }, [filters, updateFilter]);
  
  const handleClearFilters = useCallback(() => {
    clearFilters();
    setIsFilterPanelOpen(false);
  }, [clearFilters]);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderWrapper onToggleFilter={handleToggleFilter} />
      
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isFilterPanelOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white border-b border-gray-200">
          <div className="mx-auto max-w-6xl px-4 py-4">
            <FilterPanel
              isOpen={isFilterPanelOpen}
              filters={filters}
              onFiltersChange={handleFilterChange}
              onApply={handleToggleFilter}
              onClear={handleClearFilters}
            />
          </div>
        </div>
      </div>
      
      <ArticleListContainer initialView="list" />
    </div>
  );
}

function HeaderWrapper({ onToggleFilter }: { onToggleFilter: () => void }) {
  return (
    <Header
      filters={{ timeRange: 'today', sources: [], tags: [], sortBy: 'hot' }}
      activeFilterCount={0}
      onToggleFilter={onToggleFilter}
      onFilterChange={(filters) => console.log('Filters:', filters)}
      onSearch={(keyword) => console.log('Search:', keyword)}
    />
  );
}
