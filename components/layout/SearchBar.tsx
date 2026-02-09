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
    <form onSubmit={handleSubmit} className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
        🔍
      </span>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="搜索文章标题、来源..."
        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B4A]/20 focus:border-[#FF6B4A] transition-all shadow-sm"
      />
    </form>
  );
}
