'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Article, ApiResponse, TimePeriod } from '@/lib/types';
import { getPeriodParam } from '@/lib/constants/time-periods';

interface FetchArticlesOptions {
  period: TimePeriod;
  limit?: number;
}

async function fetchArticles({
  period,
  limit = 100,
}: FetchArticlesOptions): Promise<ApiResponse<Article[]>> {
  const periodParam = getPeriodParam(period);
  const url = `https://ai-daily-collector.xxl185.workers.dev/api/hotspots?limit=${limit}&period=${periodParam}`;

  const response = await fetch(url, {
    next: { revalidate: 300 } // Cache for 5 minutes
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result: ApiResponse<any[]> = await response.json();

  // Transform API data to Article format
  if (result.success && result.data) {
    const transformedData: Article[] = result.data.map((item: any, index: number) => ({
      id: item.id || `${item.source}-${index}`,
      title: item.title,
      url: item.url,
      source: item.source,
      hotScore: item.hot_score || 0,
      publishedAt: item.published_at || item.timestamp || new Date().toISOString(),
      summary: item.summary,
    }));

    return {
      success: true,
      data: transformedData,
      message: result.message,
    };
  }

  return {
    success: false,
    data: [],
    message: result.message || 'Failed to fetch articles',
  };
}

export function useTimePeriodArticles(
  period: TimePeriod,
  enabled = true
): UseQueryResult<ApiResponse<Article[]>, Error> {
  return useQuery({
    queryKey: ['articles', period],
    queryFn: () => fetchArticles({ period }),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 分钟
    gcTime: 10 * 60 * 1000, // 10 分钟
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
