/**
 * API Route for server-side search
 * Reads pre-built search-index.json
 */

export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

let indexCache: any = null;

function loadIndex() {
  if (indexCache) return indexCache;
  const indexPath = path.join(process.cwd(), 'public', 'search-index.json');
  const raw = fs.readFileSync(indexPath, 'utf-8');
  indexCache = JSON.parse(raw);
  return indexCache;
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q') || '';

  if (!query.trim()) {
    return NextResponse.json({ results: [], count: 0 });
  }

  try {
    const index = loadIndex();
    
    // MiniSearch stores fields in storedFields
    const storedFields = index.storedFields || {};
    const docs = Object.entries(storedFields);
    
    const terms = query
      .toLowerCase()
      .replace(/[^\w\u0400-\u04FF]/g, ' ')
      .split(/\s+/)
      .filter((t: string) => t.length > 2);

    const results: any[] = [];
    
    for (const [id, fields] of docs) {
      const f = fields as any;
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

    return NextResponse.json({ 
      results: results.slice(0, 20), 
      count: results.length 
    });
  } catch (error) {
    console.error('[Search API] Error:', error);
    return NextResponse.json(
      { results: [], count: 0, error: 'Search failed' },
      { status: 500 }
    );
  }
}
