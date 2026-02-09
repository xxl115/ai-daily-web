'use client';

import { useState, useCallback } from 'react';
import { apiClient } from '@/lib/api';

interface UseSummaryOptions {
  cacheKey?: string;
  cacheDuration?: number; // in milliseconds
}

interface SummaryState {
  summary: string | null;
  loading: boolean;
  error: string | null;
}

const summaryCache = new Map<string, { summary: string; timestamp: number }>();

export function useSummary(options: UseSummaryOptions = {}) {
  const { cacheDuration = 30 * 60 * 1000 } = options; // 30 minutes default

  const [state, setState] = useState<SummaryState>({
    summary: null,
    loading: false,
    error: null,
  });

  const generateSummary = useCallback(async (url: string, cacheKey?: string) => {
    const key = cacheKey || url;

    // Check cache
    const cached = summaryCache.get(key);
    if (cached && Date.now() - cached.timestamp < cacheDuration) {
      setState({ summary: cached.summary, loading: false, error: null });
      return cached.summary;
    }

    setState({ summary: null, loading: true, error: null });

    try {
      const response = await apiClient.getSummary(url);
      if (response.success && response.summary) {
        const summary = response.summary;
        // Cache the result
        summaryCache.set(key, { summary, timestamp: Date.now() });
        setState({ summary, loading: false, error: null });
        return summary;
      } else {
        throw new Error('Failed to generate summary');
      }
    } catch (err) {
      console.error('Failed to generate summary:', err);
      setState({ summary: null, loading: false, error: 'Failed to generate summary' });
      return null;
    }
  }, [cacheDuration]);

  const clearCache = useCallback((key?: string) => {
    if (key) {
      summaryCache.delete(key);
    } else {
      summaryCache.clear();
    }
  }, []);

  return {
    ...state,
    generateSummary,
    clearCache,
  };
}
