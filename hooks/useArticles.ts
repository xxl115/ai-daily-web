import { useState, useEffect, useCallback } from 'react';
import type { Article, FilterState } from '@/lib/types';

export interface UseArticlesReturn {
  articles: Article[];
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'OpenAI 发布 GPT-4.5：更强大的对话能力和更低的延迟',
    summary: 'OpenAI 今日宣布推出 GPT-4.5 预览版，这是迄今为止最智能的对话模型。新版本在推理能力、创意写作和多模态理解方面都有显著提升...',
    category: 'hot',
    source: 'openai',
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    viewCount: 2300,
    commentCount: 128,
    tags: ['LLM', 'GPT-4', '产品'],
  },
  {
    id: '2',
    title: '斯坦福最新研究：AI 模型推理能力的边界在哪里？',
    summary: '斯坦福大学 AI 实验室发布了一项关于大语言模型推理能力的突破性研究，深入分析了当前主流 AI 模型在复杂推理任务中的表现和局限性...',
    category: 'deep',
    source: 'mit',
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    viewCount: 1800,
    commentCount: 256,
    tags: ['研究', 'LLM', '学术'],
  },
  {
    id: '3',
    title: 'Midjourney V6 正式发布：支持中文提示词和更精准的图像控制',
    summary: 'AI 图像生成工具 Midjourney 今日发布 V6 版本，带来多项重磅更新，包括原生中文支持、角色一致性控制和更高的图像质量...',
    category: 'new',
    source: 'product-hunt',
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    viewCount: 3500,
    commentCount: 512,
    tags: ['AI绘画', '工具', '产品发布'],
  },
  {
    id: '4',
    title: 'Google Gemini Ultra 登场：多模态能力全面超越 GPT-4',
    summary: 'Google 今日发布 Gemini Ultra 模型，在多项基准测试中超越 GPT-4，支持 32k 上下文窗口和实时多模态交互...',
    category: 'breaking',
    source: 'google',
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    viewCount: 5100,
    commentCount: 892,
    tags: ['LLM', 'Google'],
  },
];

export function useArticles(filters?: FilterState): UseArticlesReturn {
  const [articles, setArticles] = useState<Article[]>(MOCK_ARTICLES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      let filtered = [...MOCK_ARTICLES];

      if (filters?.keyword) {
        const keyword = filters.keyword.toLowerCase();
        filtered = filtered.filter(
          (article) =>
            article.title.toLowerCase().includes(keyword) ||
            article.summary.toLowerCase().includes(keyword)
        );
      }

      if (filters?.sources?.length) {
        filtered = filtered.filter((article) =>
          filters.sources.includes(article.source)
        );
      }

      if (filters?.tags?.length) {
        filtered = filtered.filter((article) =>
          article.tags.some((tag) => filters.tags.includes(tag))
        );
      }

      setArticles(filtered);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return {
    articles,
    loading,
    error,
    refetch: fetchArticles,
  };
}
