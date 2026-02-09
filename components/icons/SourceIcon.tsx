'use client';

import * as SimpleIcons from 'simple-icons';
import { getSourceIcon } from '@/lib/constants/source-icons';

interface SourceIconProps {
  source: string;
  size?: number;
  className?: string;
}

function getIconSvg(slug: string): string {
  const iconModule = SimpleIcons as unknown as Record<string, { svg: string; hex: string }>;
  if (iconModule[slug]) {
    return iconModule[slug].svg;
  }
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>';
}

export function SourceIcon({ source, size = 24, className }: SourceIconProps) {
  const config = getSourceIcon(source);

  if (config.name) {
    const iconSvg = getIconSvg(config.name);
    const encodedIcon = encodeURIComponent(iconSvg);
    const color = config.color || '#6B7280';

    return (
      <img
        src={`data:image/svg+xml,${encodedIcon}`}
        alt={source}
        width={size}
        height={size}
        className={className}
        style={{ color }}
      />
    );
  }

  // 回退到文字图标
  return (
    <div
      className={`flex items-center justify-center font-bold text-xs ${className || ''}`}
      style={{
        width: size,
        height: size,
        borderRadius: '6px',
        backgroundColor: config.color ? `${config.color}20` : '#E5E7EB',
        color: config.color || '#6B7280',
      }}
    >
      {config.fallback || source.substring(0, 2).toUpperCase()}
    </div>
  );
}
