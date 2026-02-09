'use client';

import { useEffect, useState } from 'react';
import { Article } from '@/lib/types';
import { cn } from '@/lib/utils/cn';

interface SourceFilterProps {
  articles: Article[];
  selectedSource: string;
  onSelectSource: (source: string) => void;
}

export function SourceFilter({ articles, selectedSource, onSelectSource }: SourceFilterProps) {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const sourceCounts: Record<string, number> = {};
    articles.forEach(article => {
      sourceCounts[article.source] = (sourceCounts[article.source] || 0) + 1;
    });
    setCounts(sourceCounts);
  }, [articles]);

  const sources = ['全部', ...Object.keys(counts).sort((a, b) => (counts[b] || 0) - (counts[a] || 0))];

  return (
    <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
      {sources.map((source) => {
        const isActive = selectedSource === source;
        const count = source === '全部' ? articles.length : (counts[source] || 0);

        return (
          <button
            key={source}
            onClick={() => onSelectSource(source === '全部' ? '' : source)}
            className={cn(
              'px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all',
              isActive
                ? 'bg-brand text-white shadow-sm'
                : 'bg-white border border-gray-300 text-text-secondary hover:bg-gray-50 hover:border-gray-400'
            )}
          >
            {source}
            <span className={cn(
              'ml-2 px-2 py-0.5 rounded-full text-xs',
              isActive ? 'bg-white/25' : 'bg-gray-200 text-gray-600'
            )}>
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
