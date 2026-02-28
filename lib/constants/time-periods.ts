import type { TimeFilter } from '@/lib/types';

export const TIME_PERIODS: { value: TimeFilter; label: string }[] = [
  { value: 'today', label: '今日' },
  { value: 'yesterday', label: '昨日' },
  { value: 'week', label: '本周' },
  { value: 'month', label: '本月' },
] as const;
