'use client';

import { useState } from 'react';

interface SearchBarProps {
  onSearch?: (keyword: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(keyword);
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-md">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
        🔍
      </span>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="搜索文章标题、来源..."
        className="w-full pl-12 pr-4 py-3 bg-background-card border border-white/10 rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
      />
    </form>
  );
}
