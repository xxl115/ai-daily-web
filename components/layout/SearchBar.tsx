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
    <form onSubmit={handleSubmit} className={`relative transition-all duration-300 ${isFocused ? 'scale-[1.02]' : ''}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B4A]/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className={`relative flex items-center bg-white/5 backdrop-blur-sm border rounded-2xl overflow-hidden transition-all duration-300 ${
        isFocused
          ? 'border-[#FF6B4A]/50 shadow-lg shadow-[#FF6B4A]/10'
          : 'border-white/10 hover:border-white/20'
      }`}>
        <span className="absolute left-5 text-white/40 text-lg pointer-events-none">
          🔍
        </span>

        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="搜索文章标题、来源..."
          className="w-full pl-14 pr-6 py-4 bg-transparent text-white placeholder:text-white/30 focus:outline-none text-base"
        />

        {/* Animated border bottom */}
        <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#FF6B4A] to-purple-500 transition-all duration-300 ${
          isFocused ? 'w-full' : 'w-0'
        }`} />
      </div>
    </form>
  );
}
