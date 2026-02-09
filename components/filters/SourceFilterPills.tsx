'use client';

import { Article } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

interface SourceFilterPillsProps {
  articles: Article[];
  selectedSource: string | null;
  onSelectSource: (source: string | null) => void;
}

export function SourceFilterPills({ articles, selectedSource, onSelectSource }: SourceFilterPillsProps) {
  const sources = useMemo(() => {
    const counts: Record<string, number> = {};
    articles.forEach((a) => {
      counts[a.source] = (counts[a.source] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [articles]);

  if (sources.length === 0) return null;

  return (
    <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
      <button
        onClick={() => onSelectSource(null)}
        className={cn(
          'flex-shrink-0 px-2.5 py-1 rounded-lg text-xs font-medium transition-all',
          selectedSource === null
            ? 'bg-black text-white'
            : 'text-gray-400 hover:text-gray-600'
        )}
      >
        全部
      </button>
      {sources.map(({ name }) => (
        <button
          key={name}
          onClick={() => onSelectSource(name === selectedSource ? null : name)}
          className={cn(
            'flex-shrink-0 px-2.5 py-1 rounded-lg text-xs font-medium transition-all whitespace-nowrap',
            selectedSource === name
              ? 'bg-black text-white'
              : 'text-gray-400 hover:text-gray-600'
          )}
        >
          {name}
        </button>
      ))}
    </div>
  );
}
