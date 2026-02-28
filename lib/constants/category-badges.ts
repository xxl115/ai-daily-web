import type { ArticleCategory } from '@/lib/types';

interface CategoryBadgeConfig {
  emoji: string;
  label: string;
  bgClass: string;
  textClass: string;
}

export const CATEGORY_BADGE: Record<ArticleCategory, CategoryBadgeConfig> = {
  hot: {
    emoji: '🔥',
    label: '热门',
    bgClass: 'bg-primary/10',
    textClass: 'text-primary',
  },
  deep: {
    emoji: '📰',
    label: '深度',
    bgClass: 'bg-secondary/10',
    textClass: 'text-secondary',
  },
  new: {
    emoji: '🆕',
    label: '新品',
    bgClass: 'bg-green-100',
    textClass: 'text-green-600',
  },
  breaking: {
    emoji: '⚡',
    label: '突发',
    bgClass: 'bg-orange-100',
    textClass: 'text-orange-600',
  },
};
