/**
 * Утилиты поиска: debounce, highlight, snippet extraction
 */

export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

export function highlightText(text: string, query: string): string {
  if (!query.trim() || !text) return text;
  const terms = query
    .toLowerCase()
    .replace(/[^\w\u0400-\u04FF]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 2);
  if (terms.length === 0) return text;
  const regex = new RegExp(
    `(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
    'gi'
  );
  return text.replace(regex, '<mark class="search-highlight">$1</mark>');
}

export function extractSnippet(text: string, query: string, maxLen = 160): string {
  if (!text) return '';
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= maxLen) return clean;

  const terms = query
    .toLowerCase()
    .replace(/[^\w\u0400-\u04FF]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 2);
  if (terms.length === 0) return clean.slice(0, maxLen) + '...';

  const lower = clean.toLowerCase();
  let bestPos = 0;
  let bestScore = -1;

  for (let i = 0; i <= lower.length - 20; i++) {
    const slice = lower.slice(i, i + 40);
    const score = terms.filter((t) => slice.includes(t)).length;
    if (score > bestScore) {
      bestScore = score;
      bestPos = i;
    }
  }

  const start = Math.max(0, bestPos - 40);
  const end = Math.min(clean.length, bestPos + maxLen);
  let snippet = clean.slice(start, end);
  if (start > 0) snippet = '...' + snippet;
  if (end < clean.length) snippet = snippet + '...';
  return snippet;
}

export function declineWord(n: number, one: string, two: string, five: string): string {
  const m = n % 100;
  if (m >= 5 && m <= 20) return five;
  const m1 = m % 10;
  if (m1 === 1) return one;
  if (m1 >= 2 && m1 <= 4) return two;
  return five;
}
