'use client';

import { useEffect, useRef } from 'react';
import type { SearchSuggestion } from '@/lib/types';

interface SearchSuggestionsProps {
  isOpen: boolean;
  keyword?: string;
  suggestions: {
    trending: SearchSuggestion[];
    recent: SearchSuggestion[];
  };
  onSelect: (suggestion: SearchSuggestion) => void;
}

export function SearchSuggestionsDropdown({
  isOpen,
  keyword,
  suggestions,
  onSelect,
}: SearchSuggestionsProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onSelect({ text: '', icon: '' });
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onSelect]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="dropdown-menu active absolute top-full left-0 right-0 z-50 mt-2 w-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl transition-all"
    >
      {keyword && keyword.length > 0 ? (
        <DynamicSuggestions keyword={keyword} onSelect={onSelect} />
      ) : (
        <DefaultSuggestions suggestions={suggestions} onSelect={onSelect} />
      )}
    </div>
  );
}

interface DefaultSuggestionsProps {
  suggestions: {
    trending: SearchSuggestion[];
    recent: SearchSuggestion[];
  };
  onSelect: (suggestion: SearchSuggestion) => void;
}

function DefaultSuggestions({ suggestions, onSelect }: DefaultSuggestionsProps) {
  return (
    <div className="py-2">
      {suggestions.trending.length > 0 && (
        <div className="px-4 py-2 text-xs font-semibold uppercase text-gray-500">
          热门搜索
        </div>
      )}
      {suggestions.trending.map((item: SearchSuggestion, index: number) => (
        <SuggestionItem key={`trending-${index}`} item={item} onSelect={onSelect} />
      ))}

      {suggestions.recent.length > 0 && (
        <div className="mt-2 px-4 py-2 text-xs font-semibold uppercase text-gray-500">
          最近搜索
        </div>
      )}
      {suggestions.recent.map((item: SearchSuggestion, index: number) => (
        <SuggestionItem key={`recent-${index}`} item={item} onSelect={onSelect} />
      ))}
    </div>
  );
}

interface DynamicSuggestionsProps {
  keyword: string;
  onSelect: (suggestion: SearchSuggestion) => void;
}

function DynamicSuggestions({ keyword, onSelect }: DynamicSuggestionsProps) {
  const suggestions: SearchSuggestion[] = [
    { text: `"${keyword}" 相关新闻`, icon: '📰' },
    { text: `${keyword} 产品评测`, icon: '⭐' },
    { text: `${keyword} 使用教程`, icon: '📖' },
  ];

  return (
    <div className="py-2">
      {suggestions.map((item: SearchSuggestion, index: number) => (
        <SuggestionItem key={`dynamic-${index}`} item={item} onSelect={onSelect} />
      ))}
    </div>
  );
}

interface SuggestionItemProps {
  item: SearchSuggestion;
  onSelect: (suggestion: SearchSuggestion) => void;
}

function SuggestionItem({ item, onSelect }: SuggestionItemProps) {
  return (
    <button
      onClick={() => onSelect(item)}
      className="flex w-full cursor-pointer items-center gap-3 px-4 py-2 text-left transition-colors hover:bg-gray-50"
    >
      <span>{item.icon}</span>
      <span className="text-dark">{item.text}</span>
    </button>
  );
}
