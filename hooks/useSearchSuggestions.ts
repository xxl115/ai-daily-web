import { useState, useEffect } from 'react';
import type { SearchSuggestion } from '@/lib/types';
import { apiClient } from '@/lib/api/client';

export interface SearchSuggestions {
  trending: SearchSuggestion[];
  recent: SearchSuggestion[];
}

export function useSearchSuggestions(query?: string): SearchSuggestions {
  const [suggestions, setSuggestions] = useState<SearchSuggestions>({
    trending: [],
    recent: [],
  });

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const result = await apiClient.getSearchSuggestions(query);
        setSuggestions(result);
      } catch (err) {
        console.error('Failed to fetch suggestions:', err);
      }
    };

    fetchSuggestions();
  }, [query]);

  return suggestions;
}
