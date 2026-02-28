import { cn } from '@/lib/utils/cn';
import { CATEGORY_BADGE } from '@/lib/constants';
import type { BadgeVariant, BadgeSize } from '@/lib/types';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
};

const defaultVariantClasses = {
  emoji: '',
  bgClass: 'bg-gray-100',
  textClass: 'text-gray-600',
};

export function Badge({
  children,
  variant = 'default',
  size = 'sm',
  className,
}: BadgeProps) {
  const config =
    variant !== 'default' ? CATEGORY_BADGE[variant] : defaultVariantClasses;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-medium',
        config.bgClass,
        config.textClass,
        sizeClasses[size],
        className
      )}
    >
      {variant !== 'default' && <span>{config.emoji}</span>}
      {children}
    </span>
  );
}
