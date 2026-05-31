/**
 * Build search index from articles at build time
 * Runs server-side to create a searchable JSON index
 */

import MiniSearch from 'minisearch';
import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

export interface SearchDoc {
  id: string;
  title: string;
  metaTitle: string;
  description: string;
  keywords: string;
  content: string;
  category?: string;
  slug?: string;
}

export interface SearchResult {
  id: string;
  title: string;
  metaTitle: string;
  description: string;
  slug: string;
  match: string;
  score: number;
}

/** Strip HTML tags to plain text */
function stripHtml(html: string): string {
  const dom = new JSDOM(html);
  return dom.window.document.body?.textContent || '';
}

/** Load all articles from data/articles */
export function loadArticles(): SearchDoc[] {
  const articlesDir = path.join(process.cwd(), 'src/data/articles');
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.json'));

  return files.map(file => {
    const raw = fs.readFileSync(path.join(articlesDir, file), 'utf-8');
    const article = JSON.parse(raw);
    const cleanContent = stripHtml(article.content || '').slice(0, 5000);

    return {
      id: article.id || file.replace('.json', ''),
      title: article.title || '',
      metaTitle: article.metaTitle || article.title || '',
      description: article.description || '',
      keywords: article.keywords || '',
      content: cleanContent,
      category: article.category || '',
      slug: article.slug || `/articles/${article.id || file.replace('.json', '')}`,
    };
  });
}

/** Build MiniSearch index from articles */
export function buildIndex(docs: SearchDoc[]): MiniSearch<SearchDoc> {
  const miniSearch = new MiniSearch({
    fields: ['title', 'metaTitle', 'description', 'keywords', 'content'],
    storeFields: ['id', 'title', 'metaTitle', 'description', 'slug', 'keywords'],
    searchOptions: {
      boost: { title: 3, metaTitle: 2, keywords: 2, description: 1.5 },
      fuzzy: 0.25,
      prefix: true,
    },
    tokenize: (text: string) => {
      // Russian-aware tokenization: split on non-word chars, keep Cyrillic
      return text
        .toLowerCase()
        .replace(/[^\w\u0400-\u04FF]/g, ' ')
        .split(/\s+/)
        .filter(t => t.length > 2);
    },
  });

  miniSearch.addAll(docs);
  return miniSearch;
}

/** Export index as JSON for client-side use */
export function exportIndex(miniSearch: MiniSearch<SearchDoc>): string {
  return JSON.stringify(miniSearch.toJSON());
}

/** Save index to public directory */
export function saveIndex(json: string): void {
  const outPath = path.join(process.cwd(), 'public', 'search-index.json');
  fs.writeFileSync(outPath, json, 'utf-8');
}
