import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';
  
  if (!query) {
    return NextResponse.json({ results: [] });
  }
  
  const indexPath = path.join(process.cwd(), 'data', 'index.json');
  const slugMapPath = path.join(process.cwd(), 'data', 'slug-map.json');
  const articles = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
  const { idMap } = JSON.parse(fs.readFileSync(slugMapPath, 'utf-8'));
  
  const results = articles
    .filter((a: { title: string; description?: string }) => 
      a.title.toLowerCase().includes(query) || 
      (a.description?.toLowerCase() || '').includes(query)
    )
    .map((a: { id: string; title: string; description?: string }) => ({
      ...a,
      slug: idMap[a.id] || a.id,
    }));
  
  return NextResponse.json({ results });
}
