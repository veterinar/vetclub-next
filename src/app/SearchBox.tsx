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

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
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
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск по статьям..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 disabled:opacity-50"
        >
          {loading ? '...' : 'Поиск'}
        </button>
      </form>

      {results.length > 0 && (
        <div className="mt-4 grid gap-2">
          {results.map((r) => (
            <Link
              key={r.id}
              href={`/articles/${r.id}`}
              className="block p-3 rounded border border-gray-200 hover:border-emerald-400"
            >
              <div className="font-medium text-emerald-800">{r.title}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
