/**
 * Articles List API
 * Returns all articles with basic info
 */

export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const articlesDir = path.join(process.cwd(), 'src', 'data', 'articles');
    const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.json'));

    const articles = files.map(file => {
      const id = file.replace('.json', '');
      const raw = fs.readFileSync(path.join(articlesDir, file), 'utf-8');
      const article = JSON.parse(raw);
      return {
        id,
        title: article.title || 'Без названия',
        description: article.description || '',
        category: article.category || '',
        slug: article.slug || `/articles/${id}`,
      };
    });

    return NextResponse.json({ articles });
  } catch {
    return NextResponse.json({ articles: [] });
  }
}
