'use client';

import { useState } from 'react';
import Link from 'next/link';

interface SearchResult {
  id: string;
  title: string;
  description?: string;
}

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    setOpen(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  return (
    <div className="mb-8">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по статьям..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-emerald-700 text-white rounded-xl hover:bg-emerald-800 disabled:opacity-50 font-medium transition-colors"
        >
          {loading ? '...' : 'Поиск'}
        </button>
      </form>

      {open && results.length > 0 && (
        <div className="mt-3 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-3 border-b border-gray-100 text-sm text-gray-500">
            Найдено: {results.length}
          </div>
          {results.map((r) => (
            <Link
              key={r.id}
              href={`/content/view/${r.id}/1/`}
              className="block p-4 border-b border-gray-50 last:border-0 hover:bg-emerald-50 transition-colors"
              onClick={() => setOpen(false)}
            >
              <div className="font-medium text-emerald-800">{r.title}</div>
            </Link>
          ))}
        </div>
      )}

      {open && !loading && results.length === 0 && query && (
        <div className="mt-3 p-4 bg-gray-50 rounded-xl text-sm text-gray-500">
          Ничего не найдено по запросу «{query}»
        </div>
      )}
    </div>
  );
}
