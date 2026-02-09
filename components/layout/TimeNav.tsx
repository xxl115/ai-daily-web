'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

type Period = 'today' | 'yesterday' | 'week' | 'month';

interface TimeNavProps {
  value: Period;
  onChange: (period: Period) => void;
}

const periods: { value: Period; label: string }[] = [
  { value: 'today', label: '今日热门' },
  { value: 'yesterday', label: '昨日热门' },
  { value: 'week', label: '本周热门' },
  { value: 'month', label: '上月热门' },
];

export function TimeNav({ value, onChange }: TimeNavProps) {
  return (
    <div className="flex gap-1">
      {periods.map((period) => (
        <button
          key={period.value}
          onClick={() => onChange(period.value)}
          className={cn(
            'px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
            value === period.value
              ? 'bg-[#FF6B4A] text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          )}
        >
          {period.label}
        </button>
      ))}
    </div>
  );
}
