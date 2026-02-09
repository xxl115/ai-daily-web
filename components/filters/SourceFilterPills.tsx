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
    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
      <button
        onClick={() => onSelectSource(null)}
        className={cn(
          'flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap',
          selectedSource === null
            ? 'bg-gradient-to-r from-[#FF6B4A] to-[#F97316] text-white shadow-lg shadow-[#FF6B4A]/20'
            : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80 border border-white/10'
        )}
      >
        全部
      </button>
      {sources.map(({ name }) => (
        <button
          key={name}
          onClick={() => onSelectSource(name === selectedSource ? null : name)}
          className={cn(
            'flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap',
            selectedSource === name
              ? 'bg-gradient-to-r from-[#FF6B4A] to-[#F97316] text-white shadow-lg shadow-[#FF6B4A]/20'
              : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80 border border-white/10'
          )}
        >
          {name}
        </button>
      ))}
    </div>
  );
}
