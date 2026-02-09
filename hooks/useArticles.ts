'use client';

import { useState, useEffect, useCallback } from 'react';
import { Article } from '@/lib/types';
import { fetchArticles, getMockArticles } from '@/lib/api';

interface UseArticlesOptions {
  limit?: number;
  autoRefetch?: boolean;
  refetchInterval?: number;
}

export function useArticles(options: UseArticlesOptions = {}) {
  const { limit = 100, autoRefetch = false, refetchInterval = 5 * 60 * 1000 } = options;

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadArticles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchArticles(limit);
      if (data.length > 0) {
        setArticles(data);
      } else {
        // Fallback to mock data
        setArticles(getMockArticles());
      }
    } catch (err) {
      console.error('Failed to load articles:', err);
      setError('Failed to load articles');
      setArticles(getMockArticles());
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    loadArticles();

    if (autoRefetch && refetchInterval > 0) {
      const interval = setInterval(loadArticles, refetchInterval);
      return () => clearInterval(interval);
    }
  }, [loadArticles, autoRefetch, refetchInterval]);

  return {
    articles,
    loading,
    error,
    refetch: loadArticles,
  };
}
