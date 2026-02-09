import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'danger';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        {
          'bg-primary/20 text-primary-light': variant === 'default',
          'bg-background-hover text-text-secondary': variant === 'secondary',
          'bg-success/20 text-success': variant === 'success',
          'bg-warning/20 text-warning': variant === 'warning',
          'bg-danger/20 text-danger': variant === 'danger',
        },
        className
      )}
      {...props}
    />
  );
}
