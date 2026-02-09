'use client';

import { Article } from '@/lib/types';
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
    <div className="flex gap-2 flex-wrap">
      <button
        onClick={() => onSelectSource(null)}
        className={`
          flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap
          ${selectedSource === null
            ? 'bg-orange-500 text-white'
            : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }
        `}
      >
        全部
      </button>
      {sources.map(({ name }) => (
        <button
          key={name}
          onClick={() => onSelectSource(name === selectedSource ? null : name)}
          className={`
            flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap
            ${selectedSource === name
              ? 'bg-orange-500 text-white'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }
          `}
        >
          {name}
        </button>
      ))}
    </div>
  );
}
