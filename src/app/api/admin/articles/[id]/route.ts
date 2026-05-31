/**
 * Article API — GET / POST / DELETE
 * Node.js runtime for filesystem access
 */

export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const articlesDir = path.join(process.cwd(), 'src', 'data', 'articles');

function getArticlePath(id: string): string {
  return path.join(articlesDir, `${id}.json`);
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const filePath = getArticlePath(id);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    const article = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return NextResponse.json({ article });
  } catch {
    return NextResponse.json({ error: 'Failed to load article' }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const article = await request.json();

    // Ensure directory exists
    if (!fs.existsSync(articlesDir)) {
      fs.mkdirSync(articlesDir, { recursive: true });
    }

    const filePath = getArticlePath(id);
    fs.writeFileSync(filePath, JSON.stringify(article, null, 2), 'utf-8');

    return NextResponse.json({ success: true, id });
  } catch {
    return NextResponse.json({ error: 'Failed to save article' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const filePath = getArticlePath(id);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    fs.unlinkSync(filePath);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
  }
}
