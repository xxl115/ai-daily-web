'use client';

import { cn } from '@/lib/utils';

type Period = 'today' | 'yesterday' | 'week' | 'month';

interface TimeNavProps {
  value: Period;
  onChange: (period: Period) => void;
}

export function TimeNav({ value, onChange }: TimeNavProps) {
  const periods: { key: Period; label: string }[] = [
    { key: 'today', label: '今日' },
    { key: 'yesterday', label: '昨日' },
    { key: 'week', label: '本周' },
    { key: 'month', label: '本月' },
  ];

  return (
    <div className="flex gap-2">
      {periods.map((period) => (
        <button
          key={period.key}
          onClick={() => onChange(period.key)}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
            value === period.key
              ? "bg-[#FF6154] text-white shadow-sm"
              : "bg-white text-[#4A5568] hover:bg-[#F5F5F5] border border-[#e0e0e0]"
          )}
        >
          {period.label}
        </button>
      ))}
    </div>
  );
}
