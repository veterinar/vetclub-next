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
  const articles = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
  
  const results = articles.filter((a: { title: string; description?: string }) => 
    a.title.toLowerCase().includes(query) || 
    (a.description?.toLowerCase() || '').includes(query)
  );
  
  return NextResponse.json({ results });
}
