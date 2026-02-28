const GRADIENTS = [
  'from-primary/10 to-secondary/10',
  'from-secondary/10 to-primary/10',
  'from-green-100 to-blue-100',
  'from-orange-100 to-red-100',
] as const;

export function getGradientBg(index: number): string {
  return GRADIENTS[index % GRADIENTS.length];
}
