import type { SortOption } from '@/lib/types';

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'hot', label: '🔥 热度优先' },
  { value: 'newest', label: '🕐 最新发布' },
  { value: 'relevant', label: '📊 相关性' },
  { value: 'comments', label: '💬 评论最多' },
] as const;
