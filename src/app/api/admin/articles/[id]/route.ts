import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const filePath = path.join(process.cwd(), 'data', 'articles', `${id}.json`);
  
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  
  const article = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return NextResponse.json({ article });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const article = await request.json();
    
    const articlesDir = path.join(process.cwd(), 'data', 'articles');
    const filePath = path.join(articlesDir, `${id}.json`);
    
    fs.writeFileSync(filePath, JSON.stringify(article, null, 2), 'utf-8');
    
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}