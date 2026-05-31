/**
 * Client-side search using MiniSearch
 * Loads pre-built index from /search-index.json
 */

import { MiniSearch } from 'minisearch';
import type { SearchDoc, SearchResult } from './build-index';

let miniSearch: MiniSearch<SearchDoc> | null = null;
let loadPromise: Promise<void> | null = null;

/** Load search index from JSON */
async function loadIndex(): Promise<void> {
  if (miniSearch) return;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    const res = await fetch('/search-index.json');
    if (!res.ok) throw new Error('Failed to load search index');
    const json = await res.json();

    miniSearch = MiniSearch.loadJSON(json, {
      fields: ['title', 'metaTitle', 'description', 'keywords', 'content'],
      storeFields: ['id', 'title', 'metaTitle', 'description', 'slug', 'keywords'],
      searchOptions: {
        boost: { title: 3, metaTitle: 2, keywords: 2, description: 1.5 },
        fuzzy: 0.25,
        prefix: true,
      },
      tokenize: (text: string) => {
        return text
          .toLowerCase()
          .replace(/[^\w\u0400-\u04FF]/g, ' ')
          .split(/\s+/)
          .filter(t => t.length > 2);
      },
    });
  })();

  return loadPromise;
}

/** Search articles by query */
export async function searchArticles(query: string): Promise<SearchResult[]> {
  if (!query.trim()) return [];
  await loadIndex();
  if (!miniSearch) return [];

  const results = miniSearch.search(query, {
    boost: { title: 3, metaTitle: 2, keywords: 2, description: 1.5 },
    fuzzy: 0.25,
    prefix: true,
  });

  return results.slice(0, 20).map(r => ({
    id: r.id,
    title: r.title || r.metaTitle || 'Без названия',
    metaTitle: r.metaTitle || r.title || '',
    description: r.description || '',
    slug: r.slug || `/articles/${r.id}`,
    match: (r.terms || []).join(', '),
    score: r.score,
  }));
}

/** Check if index is loaded */
export function isIndexLoaded(): boolean {
  return miniSearch !== null;
}
