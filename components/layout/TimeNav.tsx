'use client';

import { cn } from '@/lib/utils';

type Period = 'today' | 'yesterday' | 'week' | 'month';

interface TimeNavProps {
  value: Period;
  onChange: (period: Period) => void;
}

const periods: { value: Period; label: string }[] = [
  { value: 'today', label: '今天' },
  { value: 'yesterday', label: '昨天' },
  { value: 'week', label: '本周' },
  { value: 'month', label: '本月' },
];

export function TimeNav({ value, onChange }: TimeNavProps) {
  return (
    <div className="flex gap-1">
      {periods.map((period) => (
        <button
          key={period.value}
          onClick={() => onChange(period.value)}
          className={cn(
            'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
            value === period.value
              ? 'bg-black text-white'
              : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
          )}
        >
          {period.label}
        </button>
      ))}
    </div>
  );
}
