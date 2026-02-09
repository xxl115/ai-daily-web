'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Article } from '@/lib/types';
import { fetchArticleById, fetchSummary, getMockArticles } from '@/lib/api';
import { timeAgo, getScoreColor, escapeHtml } from '@/lib/utils';
import { cn } from '@/lib/utils/cn';
import { Skeleton } from '@/components/ui/Skeleton';

export default function ArticleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [showFullSummary, setShowFullSummary] = useState(false);

  useEffect(() => {
    if (params.id) {
      loadArticle(params.id as string);
    }
  }, [params.id]);

  const loadArticle = async (id: string) => {
    setLoading(true);
    try {
      const data = await fetchArticleById(id);
      if (data) {
        setArticle(data);
      } else {
        // Fallback: find from mock data
        const mockArticles = getMockArticles();
        const found = mockArticles.find(a => a.id === id);
        setArticle(found || null);
      }
    } catch {
      const mockArticles = getMockArticles();
      setArticle(mockArticles[0] || null);
    } finally {
      setLoading(false);
    }
  };

  const loadSummary = async () => {
    if (!article?.url) return;

    setLoadingSummary(true);
    try {
      const data = await fetchSummary(article.url);
      setSummary(data);
    } catch {
      setSummary('摘要生成失败，请稍后再试。');
    } finally {
      setLoadingSummary(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <header className="border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <Link href="/" className="text-text-secondary hover:text-text-primary">
              ← 返回
            </Link>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-64 w-full" />
        </main>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <p className="text-xl mb-2">文章不存在</p>
          <Link href="/" className="text-primary hover:underline">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 bg-white/95 backdrop-blur z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            ← 返回
          </Link>
          <div className="flex gap-2">
            <button
              onClick={() => navigator.clipboard.writeText(article.url)}
              className="px-4 py-2 bg-background-card border border-gray-200 rounded-lg text-sm hover:bg-background-hover transition-colors"
            >
              📋 复制链接
            </button>
            <button
              onClick={() => window.open(article.url, '_blank', 'noopener,noreferrer')}
              className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition-colors"
            >
              🔗 打开原文
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-primary/20 text-primary-light rounded-full text-sm font-medium">
              {article.source}
            </span>
            <span className={cn('flex items-center gap-1 text-sm font-medium', getScoreColor(article.hotScore))}>
              ⭐ {article.hotScore}
            </span>
            <span className="text-text-muted text-sm">
              🕐 {timeAgo(article.publishedAt)}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold leading-tight">
            {escapeHtml(article.title)}
          </h1>
        </div>

        {/* AI Summary Section */}
        <div className="bg-background-card rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">🤖</span>
            <span className="font-semibold">AI 摘要</span>
          </div>

          {loadingSummary ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          ) : summary ? (
            <div className="text-text-secondary leading-relaxed">
              <p className={showFullSummary ? '' : 'line-clamp-3'}>
                {summary}
              </p>
              {summary.length > 200 && (
                <button
                  onClick={() => setShowFullSummary(!showFullSummary)}
                  className="text-primary hover:underline mt-2 text-sm"
                >
                  {showFullSummary ? '收起' : '展开全文'}
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={loadSummary}
              disabled={loadingSummary}
              className="text-primary hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingSummary ? '生成中...' : '生成 AI 摘要'}
            </button>
          )}
        </div>

        {/* Related Articles */}
        {article.related && article.related.length > 0 && (
          <div className="bg-background-card rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">🔗</span>
              <span className="font-semibold">相关文章</span>
            </div>
            <div className="space-y-3">
              {article.related.slice(0, 5).map((related) => (
                <div
                  key={related.id}
                  onClick={() => router.push(`/article/${related.id}`)}
                  className="p-4 bg-background-hover rounded-lg border border-gray-200 hover:border-primary/50 cursor-pointer transition-all"
                >
                  <div className="text-sm text-text-muted mb-1">
                    {related.source} · {timeAgo(related.publishedAt)}
                  </div>
                  <div className="font-medium">{escapeHtml(related.title)}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
