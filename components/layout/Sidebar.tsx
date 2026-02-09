'use client';

import { Article } from '@/lib/types';

interface SidebarProps {
  sources: Array<{ name: string; count: number }>;
  hotArticles: Article[];
  total: number;
  hot: number;
}

export function Sidebar({ sources, hotArticles, total, hot }: SidebarProps) {
  return (
    <div className="space-y-6">
      {/* Stats Card */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">今日数据</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">文章总数</span>
            <span className="text-lg font-bold text-slate-900">{total}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">热门文章</span>
            <span className="text-lg font-bold text-orange-500">{hot}</span>
          </div>
        </div>
      </div>

      {/* Hot Articles */}
      {hotArticles.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">热门榜单</h3>
          <div className="space-y-4">
            {hotArticles.map((article, index) => (
              <a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="flex gap-3">
                  <span className="text-sm font-bold text-orange-500 w-5 shrink-0">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 group-hover:text-orange-500 transition-colors line-clamp-2 leading-snug">
                      {article.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                      <span>{article.source}</span>
                      <span>·</span>
                      <span>{article.hotScore} 票</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Sources */}
      {sources.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">数据来源</h3>
          <div className="space-y-2">
            {sources.map((source) => (
              <div
                key={source.name}
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <span className="text-sm text-slate-700">{source.name}</span>
                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                  {source.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Newsletter Card */}
      <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-sm p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <span className="text-lg">📧</span>
          </div>
          <div>
            <h4 className="font-semibold text-white text-sm">订阅 AI Daily</h4>
            <p className="text-xs text-white/80 mt-0.5">每天获取最新 AI 资讯</p>
          </div>
        </div>
        <input
          type="email"
          placeholder="your@email.com"
          className="w-full px-4 py-2.5 rounded-lg bg-white/20 backdrop-blur-sm text-white placeholder:text-white/60 mb-3 focus:outline-none focus:ring-2 focus:ring-white/40 border border-white/20 text-sm"
        />
        <button className="w-full bg-white text-orange-500 py-2.5 rounded-lg text-sm font-semibold hover:bg-white/90 transition-all shadow-md">
          立即订阅
        </button>
      </div>
    </div>
  );
}
