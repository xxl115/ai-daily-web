import { useState, useCallback } from 'react';
import type { SearchSuggestion } from '@/lib/types';

export interface UseSearchReturn {
  keyword: string;
  setKeyword: (keyword: string) => void;
  searchHistory: string[];
  addToHistory: (keyword: string) => void;
  clearHistory: () => void;
}

const MAX_HISTORY = 10;

export function useSearch(): UseSearchReturn {
  const [keyword, setKeyword] = useState<string>('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const addToHistory = useCallback((newKeyword: string) => {
    setSearchHistory((prev) => {
      const filtered = prev.filter((item) => item !== newKeyword);
      return [newKeyword, ...filtered].slice(0, MAX_HISTORY);
    });
  }, []);

  const clearHistory = useCallback(() => {
    setSearchHistory([]);
  }, []);

  return {
    keyword,
    setKeyword,
    searchHistory,
    addToHistory,
    clearHistory,
  };
}
