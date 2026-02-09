'use client';

import { Article } from '@/lib/types';
import { useState } from 'react';

interface ArticleCardProps {
  article: Article;
  rank?: number;
}

export function ArticleCard({ article, rank }: ArticleCardProps) {
  const [hasVoted, setHasVoted] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow duration-200">
      <div className="flex gap-4">
        {/* THE CRITICAL FEATURE - Left-side floating circular vote button */}
        <button
          onClick={() => setHasVoted(!hasVoted)}
          className={`
            flex-shrink-0 w-[56px] h-[56px] rounded-full flex flex-col items-center justify-center
            transition-all duration-200 ease-out
            ${hasVoted
              ? 'bg-orange-500 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-orange-100 hover:text-orange-500'
            }
          `}
        >
          {/* Up arrow icon */}
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
          {/* Vote count */}
          <span className="text-sm font-bold leading-none mt-0.5">{article.hotScore}</span>
        </button>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Title with rank */}
          <h3 className="text-lg font-bold text-slate-900 mb-1.5 line-clamp-2 leading-snug">
            {rank && <span className="text-slate-400 mr-1.5">{rank}.</span>}
            {article.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-slate-600 mb-3 line-clamp-2 leading-relaxed">
            {article.summary || article.title}
          </p>

          {/* Tags row */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Source tag */}
            <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">
              {article.source}
            </span>

            {/* Additional tags if available */}
            {article.tags && article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium"
              >
                {tag}
              </span>
            ))}

            {/* Time ago */}
            <span className="text-xs text-slate-400">
              {new Date(article.publishedAt).toLocaleDateString('zh-CN', {
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>

        {/* Small icon thumbnail on the right */}
        <div className="flex-shrink-0">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-12 h-12 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center text-slate-400 hover:text-slate-600"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
