/**
 * Articles List — Server Component
 * Displays all articles with management actions
 */

import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import {
  FileText,
  PlusCircle,
  Edit3,
  Trash2,
  Search,
} from 'lucide-react';

interface Article {
  id: string;
  title: string;
  description?: string;
  category?: string;
  slug?: string;
}

function loadArticles(): Article[] {
  const articlesDir = path.join(process.cwd(), 'src', 'data', 'articles');
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.json'));

  return files
    .map(file => {
      const raw = fs.readFileSync(path.join(articlesDir, file), 'utf-8');
      const article = JSON.parse(raw);
      const id = file.replace('.json', '');
      return {
        id,
        title: article.title || 'Без названия',
        description: article.description || '',
        category: article.category || '',
        slug: article.slug || `/articles/${id}`,
      };
    })
    .sort((a, b) => parseInt(b.id) - parseInt(a.id));
}

export default function ArticlesPage() {
  const articles = loadArticles();

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Статьи</h1>
          <p className="text-sm text-gray-500 mt-1">
            Всего {articles.length} {decline(articles.length, 'статья', 'статьи', 'статей')}
          </p>
        </div>
        <Link
          href="/admin/articles/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#2e7d32] text-white rounded-lg hover:bg-[#1b5e20] font-medium transition-colors"
        >
          <PlusCircle size={18} />
          Новая статья
        </Link>
      </div>

      {/* Articles Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Название
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Категория
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  URL
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {articles.map(article => (
                <ArticleRow key={article.id} article={article} />
              ))}
            </tbody>
          </table>
        </div>

        {articles.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <FileText size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium mb-2">Нет статей</p>
            <p className="text-sm mb-4">Создайте первую статью</p>
            <Link
              href="/admin/articles/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#2e7d32] text-white rounded-lg hover:bg-[#1b5e20] font-medium"
            >
              <PlusCircle size={18} />
              Новая статья
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function ArticleRow({ article }: { article: Article }) {
  return (
    <tr className="hover:bg-gray-50 transition-colors group">
      <td className="px-6 py-4 text-sm text-gray-500 font-mono">
        {article.id}
      </td>
      <td className="px-6 py-4">
        <div className="text-sm font-medium text-gray-900">
          {article.title}
        </div>
        {article.description && (
          <div className="text-xs text-gray-500 mt-0.5 line-clamp-1 max-w-md">
            {article.description}
          </div>
        )}
      </td>
      <td className="px-6 py-4">
        {article.category ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#f0fdf4] text-[#2e7d32]">
            {article.category}
          </span>
        ) : (
          <span className="text-xs text-gray-400">—</span>
        )}
      </td>
      <td className="px-6 py-4">
        <Link
          href={article.slug || `/articles/${article.id}`}
          target="_blank"
          className="text-xs text-blue-500 hover:text-blue-700 font-mono"
        >
          {article.slug || `/articles/${article.id}`}
        </Link>
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link
            href={`/admin/articles/${article.id}`}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-[#2e7d32] hover:bg-[#f0fdf4] rounded-lg font-medium transition-colors"
          >
            <Edit3 size={14} />
            Изменить
          </Link>
          <DeleteButton id={article.id} title={article.title} />
        </div>
      </td>
    </tr>
  );
}

function DeleteButton({ id, title }: { id: string; title: string }) {
  return (
    <form
      action={async () => {
        'use server';
      }}
      className="inline"
    >
      <DeleteButtonClient id={id} title={title} />
    </form>
  );
}

// Client component for delete functionality
import DeleteButtonClient from './DeleteButtonClient';

function decline(n: number, one: string, two: string, five: string): string {
  const m = n % 100;
  if (m >= 5 && m <= 20) return five;
  const m1 = m % 10;
  if (m1 === 1) return one;
  if (m1 >= 2 && m1 <= 4) return two;
  return five;
}
