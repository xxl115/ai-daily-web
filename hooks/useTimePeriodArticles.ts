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

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
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
  });
}
