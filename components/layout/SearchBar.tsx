'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch?: (keyword: string) => void;
  className?: string;
  placeholder?: string;
}

export function SearchBar({ onSearch, className, placeholder = "搜索文章标题、来源..." }: SearchBarProps) {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(keyword);
  };

  return (
    <form onSubmit={handleSubmit} className={cn("relative max-w-md w-full", className)}>
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#718096]">
        <svg 
          className="w-4 h-4" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      </span>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-2.5 bg-transparent rounded-full text-[#21293C] placeholder:text-[#718096] focus:outline-none transition-all"
      />
    </form>
  );
}
