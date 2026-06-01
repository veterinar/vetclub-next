export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const articlesDir = path.join(process.cwd(), 'src', 'data', 'articles');

export async function GET() {
  try {
    const files = fs.readdirSync(articlesDir).filter((f) => f.endsWith('.json'));
    const articles = files.map((file) => {
      const id = file.replace('.json', '');
      const raw = fs.readFileSync(path.join(articlesDir, file), 'utf-8');
      const article = JSON.parse(raw);
      return {
        id,
        title: article.title || 'Без названия',
        metaTitle: article.metaTitle || '',
        description: article.description || '',
        keywords: article.keywords || '',
        category: article.category || '',
        slug: article.slug || `/articles/${id}`,
        content: article.content || '',
      };
    });

    return NextResponse.json({ articles });
  } catch {
    return NextResponse.json({ articles: [] });
  }
}
