export type TimePeriod = 'today' | 'yesterday' | 'week' | 'month';

export interface TimeFilter {
  period: TimePeriod;
  label: string;
}

export const TIME_PERIODS: TimeFilter[] = [
  { period: 'today', label: '今日热门' },
  { period: 'yesterday', label: '昨日热门' },
  { period: 'week', label: '本周热门' },
  { period: 'month', label: '上月热门' },
];

export const DEFAULT_PERIOD: TimePeriod = 'today';

// 获取周期对应的 API 参数
export function getPeriodParam(period: TimePeriod): string {
  const params: Record<TimePeriod, string> = {
    today: 'today',
    yesterday: 'yesterday',
    week: 'week',
    month: 'month',
  };
  return params[period];
}
