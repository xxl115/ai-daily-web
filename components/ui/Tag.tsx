import { cn } from '@/lib/utils/cn';
import type { TagSize } from '@/lib/types';

export interface TagProps {
  children: React.ReactNode;
  active?: boolean;
  size?: TagSize;
  className?: string;
  onClick?: () => void;
}

const sizeClasses: Record<TagSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1.5 text-sm',
};

export function Tag({
  children,
  active = false,
  size = 'md',
  className,
  onClick,
}: TagProps) {
  const Component = onClick ? 'button' : 'span';

  return (
    <Component
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-medium transition-colors',
        'hover:bg-primary hover:text-white hover:scale-105',
        active ? 'bg-primary text-white hover:bg-red-600' : 'bg-gray-100 text-gray-700',
        sizeClasses[size],
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </Component>
  );
}
