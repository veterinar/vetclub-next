/**
 * Build search index at build time
 * Run: npx tsx scripts/build-search-index.ts
 */

import { loadArticles, buildIndex, exportIndex, saveIndex } from '../src/lib/search/build-index';

console.log('🔍 Building search index...');

const articles = loadArticles();
console.log(`📄 Loaded ${articles.length} articles`);

const index = buildIndex(articles);
console.log(`✅ Index built: ${index.documentCount} documents`);

const json = exportIndex(index);
saveIndex(json);

const sizeKB = (json.length / 1024).toFixed(1);
console.log(`💾 Index saved to public/search-index.json (${sizeKB} KB)`);
