/**
 * API-функции для поиска по статьям.
 *
 * @module api/search
 */

import { apiClient } from './client';
import type { SearchResult } from '@/types';

/**
 * Выполняет поисковый запрос к API.
 *
 * @param query - Поисковая строка
 * @returns Массив результатов поиска
 *
 * @example
 * ```ts
 * const results = await searchApiQuery('кошка диабет');
 * // => [{ id: '42', title: '...', slug: '...' }, ...]
 * ```
 */
export async function searchApiQuery(query: string): Promise<SearchResult[]> {
  if (!query.trim()) return [];

  const data = await apiClient<{ results: SearchResult[] }>('/api/search', {
    params: { q: query },
  });

  return data.results || [];
}
