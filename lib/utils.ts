import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeAgo(dateStr: string): string {
  if (!dateStr) return '未知时间';

  const diff = Date.now() - new Date(dateStr).getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return '刚刚';
  if (minutes < 60) return `${minutes}分钟前`;
  if (hours < 24) return `${hours}小时前`;
  if (days < 7) return `${days}天前`;

  const date = new Date(dateStr);
  return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
}

export function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

export function copyToClipboard(text: string): Promise<boolean> {
  return navigator.clipboard.writeText(text)
    .then(() => true)
    .catch(() => false);
}

export function getScoreColor(score: number): string {
  if (score >= 300) return 'text-red-400';
  if (score >= 200) return 'text-orange-400';
  if (score >= 100) return 'text-yellow-400';
  return 'text-text-muted';
}

export function getSourceColor(source: string): string {
  const colors: Record<string, string> = {
    'Hacker News': 'bg-orange-500/20 text-orange-400',
    'V2EX': 'bg-green-500/20 text-green-400',
    'GitHub': 'bg-purple-500/20 text-purple-400',
    'OpenAI Blog': 'bg-green-600/20 text-green-300',
    'Product Hunt': 'bg-orange-600/20 text-orange-300',
    '36氪': 'bg-blue-500/20 text-blue-400',
    '机器之心': 'bg-pink-500/20 text-pink-400',
  };

  return colors[source] || 'bg-gray-500/20 text-gray-400';
}
