import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const articlesDir = path.join(process.cwd(), 'data', 'articles');
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.json'));
  
  const articles = files.map(file => {
    const id = file.replace('.json', '');
    const article = JSON.parse(fs.readFileSync(path.join(articlesDir, file), 'utf-8'));
    return {
      id,
      title: article.title,
      description: article.description,
    };
  });
  
  return NextResponse.json({ articles });
}
