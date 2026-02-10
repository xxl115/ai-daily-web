'use client';

import { SearchBar } from './SearchBar';

interface HeaderProps {
  onSearch?: (keyword: string) => void;
}

export function Header({ onSearch }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#e0e0e0] header-ph">
      <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between h-full">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#FF6154] rounded-lg flex items-center justify-center">
            <svg 
              className="w-5 h-5 text-white" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="font-bold text-xl text-[#21293C]">AI Daily</span>
        </div>
        
        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <SearchBar 
            onSearch={onSearch}
            className="search-bar-ph"
            placeholder="搜索 AI 产品..."
          />
        </div>
        
        {/* Navigation Links */}
        <nav className="flex items-center gap-6">
          <a 
            href="/" 
            className="text-[#4A5568] hover:text-[#21293C] font-medium transition-colors"
          >
            发现
          </a>
          <a 
            href="/topics" 
            className="text-[#4A5568] hover:text-[#21293C] font-medium transition-colors"
          >
            话题
          </a>
          <button className="btn-primary-ph">
            发布产品
          </button>
        </nav>
      </div>
    </header>
  );
}
