'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { searchArticles } from '@/lib/search/client-search';
import type { SearchResult } from '@/lib/search/build-index';
import Link from 'next/link';

export default function SearchForm() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const performSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      // Try client-side first
      let res = await searchArticles(q);

      // Fallback to API if client index not loaded
      if (res.length === 0) {
        const apiRes = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        const data = await apiRes.json();
        res = data.results || [];
      }

      setResults(res);
    } catch (err) {
      console.error('Search error:', err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      performSearch(val);
    }, 200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    performSearch(query);
  };

  // Highlight matching terms in text
  const highlight = (text: string, queryStr: string) => {
    if (!queryStr.trim() || !text) return text;
    const terms = queryStr
      .toLowerCase()
      .replace(/[^\w\u0400-\u04FF]/g, ' ')
      .split(/\s+/)
      .filter(t => t.length > 2);

    if (terms.length === 0) return text;

    const regex = new RegExp(`(${terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-200 rounded px-0.5">{part}</mark>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  // Extract snippet around match
  const getSnippet = (text: string, queryStr: string, maxLen = 160) => {
    if (!text) return '';
    const clean = text.replace(/\s+/g, ' ').trim();
    if (clean.length <= maxLen) return clean;

    const terms = queryStr
      .toLowerCase()
      .replace(/[^\w\u0400-\u04FF]/g, ' ')
      .split(/\s+/)
      .filter(t => t.length > 2);

    if (terms.length === 0) return clean.slice(0, maxLen) + '...';

    const lower = clean.toLowerCase();
    let bestPos = 0;
    let bestScore = -1;

    for (let i = 0; i <= lower.length - 20; i++) {
      const slice = lower.slice(i, i + 40);
      const score = terms.filter(t => slice.includes(t)).length;
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
  };

  return (
    <div>
      {/* Search form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Введите запрос..."
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4caf50] focus:border-transparent text-gray-800 placeholder:text-gray-400"
            aria-label="Поиск по статьям"
          />
          {loading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-[#2e7d32] rounded-full animate-spin" />
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-[#2e7d32] text-white rounded-lg hover:bg-[#1b5e20] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          Поиск
        </button>
      </form>

      {/* Stats */}
      {searched && !loading && (
        <p className="text-sm text-gray-500 mt-3">
          {results.length > 0
            ? `Найдено ${results.length} ${decline(results.length, 'результат', 'результата', 'результатов')}`
            : query.trim()
              ? 'Ничего не найдено. Попробуйте другие слова.'
              : 'Введите запрос для поиска'}
        </p>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="mt-4 space-y-3">
          {results.map((r) => (
            <article
              key={r.id}
              className="group p-4 rounded-lg border border-gray-100 hover:border-[#4caf50]/30 hover:bg-[#f0fdf4]/50 transition-all"
            >
              <Link href={r.slug} className="block">
                <h3 className="text-base font-semibold text-gray-900 group-hover:text-[#2e7d32] transition-colors">
                  {highlight(r.title, query)}
                </h3>
                {r.description && (
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {highlight(getSnippet(r.description, query), query)}
                  </p>
                )}
                {!r.description && r.metaTitle && r.metaTitle !== r.title && (
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {highlight(getSnippet(r.metaTitle, query), query)}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-gray-400">
                    /articles/{r.id}
                  </span>
                  {r.match && (
                    <span className="text-xs text-[#2e7d32]/70 bg-[#f0fdf4] px-1.5 py-0.5 rounded">
                      совпадение: {r.match}
                    </span>
                  )}
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

// Russian word declension helper
function decline(n: number, one: string, two: string, five: string): string {
  const m = n % 100;
  if (m >= 5 && m <= 20) return five;
  const m1 = m % 10;
  if (m1 === 1) return one;
  if (m1 >= 2 && m1 <= 4) return two;
  return five;
}
