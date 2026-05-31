/**
 * Edit Article — Server Component wrapper
 */

import fs from 'fs';
import path from 'path';
import { requireAuth } from '@/lib/admin-auth';
import ArticleEditor from './ArticleEditor';

interface Article {
  id: string;
  title: string;
  metaTitle?: string;
  description?: string;
  keywords?: string;
  content: string;
  category?: string;
  slug?: string;
}

function loadArticle(id: string): Article | null {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'articles', `${id}.json`);
    if (!fs.existsSync(filePath)) return null;
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return { ...data, id };
  } catch {
    return null;
  }
}

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAuth();
  const { id } = await params;
  const isNew = id === 'new';
  const article = isNew ? null : loadArticle(id);

  if (!isNew && !article) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-red-700 mb-2">
            Статья не найдена
          </h2>
          <p className="text-sm text-red-600">
            Статья с ID «{id}» не существует
          </p>
        </div>
      </div>
    );
  }

  return (
    <ArticleEditor
      id={id}
      isNew={isNew}
      initialData={article || undefined}
    />
  );
}
