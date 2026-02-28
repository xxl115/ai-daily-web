import { useState, useEffect, useCallback } from 'react';
import type { Article, FilterState } from '@/lib/types';
import { apiClient } from '@/lib/api/client';

export interface UseArticlesReturn {
  articles: Article[];
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

// 可选的触发器参数，用于强制刷新数据
export function useArticles(filters?: FilterState, trigger?: number | string): UseArticlesReturn {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await apiClient.getArticles({
        keyword: filters?.keyword,
        timeRange: filters?.timeRange,
        sources: filters?.sources,
        tags: filters?.tags,
        sortBy: filters?.sortBy,
        page: 1,
        pageSize: 20,
      });

      setArticles(result.articles);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      console.error('Failed to fetch articles:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles, trigger]);

  return {
    articles,
    loading,
    error,
    refetch: fetchArticles,
  };
}
