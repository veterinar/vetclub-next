'use client';

import { useState, useCallback, useRef } from 'react';
import type { SearchResult } from './types';
import { searchApiQuery } from '@/api/search';

/**
 * Хук для поиска статей.
 * Использует клиентский MiniSearch если доступен, иначе fallback на API.
 */
export function useSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const performSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      // Dynamic import of client-side search
      let res: SearchResult[] = [];
      try {
        const { searchArticles } = await import('@/lib/search/client-search');
        res = await searchArticles(q);
      } catch {
        // Client index not available, use API
      }

      if (res.length === 0) {
        res = await searchApiQuery(q);
      }

      setResults(res);
    } catch (err) {
      console.error('Search error:', err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChange = useCallback((value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      performSearch(value);
    }, 200);
  }, [performSearch]);

  const handleSubmit = useCallback((value: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    performSearch(value);
  }, [performSearch]);

  return { query, setQuery, results, loading, searched, handleChange, handleSubmit };
}
