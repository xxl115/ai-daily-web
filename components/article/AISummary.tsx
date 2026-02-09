'use client';

import { useState } from 'react';
import { Skeleton } from '../ui/Skeleton';

interface AISummaryProps {
  url?: string;
  summary?: string | null;
  loading?: boolean;
  onGenerate?: () => void;
}

export function AISummary({ url, summary, loading, onGenerate }: AISummaryProps) {
  const [showFullSummary, setShowFullSummary] = useState(false);

  if (!url) return null;

  return (
    <div className="bg-background-card rounded-xl border border-white/10 p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">🤖</span>
        <span className="font-semibold">AI 摘要</span>
      </div>

      {loading ? (
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      ) : summary ? (
        <div className="text-text-secondary leading-relaxed">
          <p className={showFullSummary ? '' : 'line-clamp-3'}>
            {summary}
          </p>
          {summary.length > 200 && (
            <button
              onClick={() => setShowFullSummary(!showFullSummary)}
              className="text-primary hover:underline mt-2 text-sm"
            >
              {showFullSummary ? '收起' : '展开全文'}
            </button>
          )}
        </div>
      ) : (
        <button
          onClick={onGenerate}
          disabled={loading}
          className="text-primary hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '生成中...' : '生成 AI 摘要'}
        </button>
      )}
    </div>
  );
}
