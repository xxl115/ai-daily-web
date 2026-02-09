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
    <div className="flex gap-2 overflow-x-auto pb-2">
      <button
        onClick={() => onSelectSource(null)}
        className={cn(
          'flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all',
          selectedSource === null
            ? 'bg-[#FF6B4A] text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        )}
      >
        全部
      </button>
      {sources.map(({ name, count }) => (
        <button
          key={name}
          onClick={() => onSelectSource(name === selectedSource ? null : name)}
          className={cn(
            'flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5',
            selectedSource === name
              ? 'bg-[#FF6B4A] text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          )}
        >
          <span>{name}</span>
          <span className="text-xs opacity-70">({count})</span>
        </button>
      ))}
    </div>
  );
}
