import type { ArticleSource } from '@/lib/types';

export const SOURCES: Record<string, { label: string; icon?: string }> = {
  openai: { label: 'OpenAI' },
  google: { label: 'Google AI' },
  anthropic: { label: 'Anthropic' },
  mit: { label: 'MIT Tech Review' },
  wired: { label: 'Wired' },
  verge: { label: 'The Verge' },
  techcrunch: { label: 'TechCrunch' },
  'product-hunt': { label: 'Product Hunt' },
};

export const SOURCE_OPTIONS: { value: ArticleSource; label: string }[] = [
  { value: 'openai', label: 'OpenAI' },
  { value: 'google', label: 'Google AI' },
  { value: 'anthropic', label: 'Anthropic' },
  { value: 'mit', label: 'MIT Tech Review' },
  { value: 'wired', label: 'Wired' },
  { value: 'verge', label: 'The Verge' },
  { value: 'techcrunch', label: 'TechCrunch' },
  { value: 'product-hunt', label: 'Product Hunt' },
];
