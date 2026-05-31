/**
 * Client-side search using MiniSearch
 * Loads pre-built index from /search-index.json
 */

import type { SearchResult } from './build-index';

let searchIndex: any = null;
let loadPromise: Promise<void> | null = null;

/** Load search index from JSON */
async function loadIndex(): Promise<void> {
  if (searchIndex) return;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    try {
      const res = await fetch('/search-index.json');
      if (!res.ok) throw new Error('Failed to load search index');
      searchIndex = await res.json();
    } catch (err) {
      console.warn('[Search] Failed to load client index, using API fallback:', err);
      searchIndex = null;
    }
  })();

  return loadPromise;
}

/** Simple search through stored fields */
function clientSearch(query: string): SearchResult[] {
  if (!searchIndex || !searchIndex.storedFields) return [];
  
  const fields = searchIndex.storedFields;
  const docs = Object.entries(fields);
  
  const terms = query
    .toLowerCase()
    .replace(/[^\w\u0400-\u04FF]/g, ' ')
    .split(/\s+/)
    .filter((t: string) => t.length > 2);

  if (terms.length === 0) return [];

  const results: any[] = [];
  
  for (const [id, docFields] of docs) {
    const f = docFields as any;
    const text = `${f.title || ''} ${f.metaTitle || ''} ${f.description || ''} ${f.keywords || ''}`.toLowerCase();
    const score = terms.filter((t: string) => text.includes(t)).length;
    
    if (score > 0) {
      results.push({
        id,
        title: f.title || f.metaTitle || 'Без названия',
        metaTitle: f.metaTitle || f.title || '',
        description: f.description || '',
        slug: f.slug || `/articles/${id}`,
        match: terms.join(', '),
        score,
      });
    }
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, 20);
}

/** Search articles by query */
export async function searchArticles(query: string): Promise<SearchResult[]> {
  if (!query.trim()) return [];
  
  await loadIndex();
  
  // Try client-side search first
  const clientResults = clientSearch(query);
  if (clientResults.length > 0) return clientResults;
  
  // Fallback to API
  try {
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    return data.results || [];
  } catch (err) {
    console.error('[Search] API fallback failed:', err);
    return [];
  }
}

/** Check if index is loaded */
export function isIndexLoaded(): boolean {
  return searchIndex !== null;
}
