'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';

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
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted z-10">
        🔍
      </span>
      <Input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="搜索文章标题、来源..."
        className="pl-12"
      />
    </form>
  );
}
