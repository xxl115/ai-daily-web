'use client';

import { useState } from 'react';

interface SearchBarProps {
  onSearch?: (keyword: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [keyword, setKeyword] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(keyword);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div
        className={`
          relative flex items-center bg-white border rounded-lg overflow-hidden transition-all duration-200
          ${isFocused
            ? 'border-orange-400 ring-2 ring-orange-100'
            : 'border-slate-300 hover:border-slate-400'
          }
        `}
      >
        <span className="absolute left-4 text-slate-400 pointer-events-none">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>

        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="搜索文章标题、来源..."
          className="w-full pl-12 pr-4 py-2.5 bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none text-sm"
        />
      </div>
    </form>
  );
}
