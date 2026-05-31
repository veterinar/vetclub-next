/**
 * API Route for server-side search
 * Used as fallback if client index fails to load
 */

import { NextRequest, NextResponse } from 'next/server';
import { loadArticles, buildIndex } from '@/lib/search/build-index';

// Build index once at module level
let indexBuilt = false;
let searchFn: ReturnType<typeof buildIndex> | null = null;

function ensureIndex() {
  if (!indexBuilt) {
    const articles = loadArticles();
    searchFn = buildIndex(articles);
    indexBuilt = true;
  }
  return searchFn!;
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q') || '';

  if (!query.trim()) {
    return NextResponse.json({ results: [], count: 0 });
  }

  try {
    const ms = ensureIndex();
    const results = ms.search(query, {
      boost: { title: 3, metaTitle: 2, keywords: 2, description: 1.5 },
      fuzzy: 0.25,
      prefix: true,
    });

    const mapped = results.slice(0, 20).map(r => ({
      id: r.id,
      title: r.title || r.metaTitle || 'Без названия',
      metaTitle: r.metaTitle || r.title || '',
      description: r.description || '',
      slug: r.slug || `/articles/${r.id}`,
      match: r.terms?.join(', ') || '',
      score: r.score,
    }));

    return NextResponse.json({ results: mapped, count: mapped.length });
  } catch (error) {
    console.error('[Search API] Error:', error);
    return NextResponse.json(
      { results: [], count: 0, error: 'Search failed' },
      { status: 500 }
    );
  }
}
