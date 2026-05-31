/**
 * Admin Dashboard — Server Component
 * Shows article stats and recent articles
 */

import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import {
  FileText,
  FolderOpen,
  TrendingUp,
  PlusCircle,
  Edit3,
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

  return files.map(file => {
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
  });
}

function getCategories(articles: Article[]): string[] {
  const cats = new Set(articles.map(a => a.category).filter((c): c is string => !!c));
  return Array.from(cats);
}

export default function AdminDashboard() {
  const articles = loadArticles();
  const categories = getCategories(articles);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Дашборд</h1>
        <Link
          href="/admin/articles/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#2e7d32] text-white rounded-lg hover:bg-[#1b5e20] font-medium transition-colors"
        >
          <PlusCircle size={18} />
          Новая статья
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={<FileText size={24} className="text-[#2e7d32]" />}
          label="Всего статей"
          value={articles.length}
        />
        <StatCard
          icon={<FolderOpen size={24} className="text-blue-500" />}
          label="Категорий"
          value={categories.length}
        />
        <StatCard
          icon={<TrendingUp size={24} className="text-purple-500" />}
          label="На сайте"
          value={articles.filter(a => a.slug).length}
        />
      </div>

      {/* Recent Articles */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Последние статьи</h2>
          <Link
            href="/admin/articles"
            className="text-sm text-[#2e7d32] hover:text-[#1b5e20] font-medium"
          >
            Все статьи →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Название
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Категория
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {articles.slice(-10).reverse().map(article => (
                <tr key={article.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-500 font-mono">
                    {article.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {article.title}
                    </div>
                    {article.description && (
                      <div className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                        {article.description}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {article.category ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                        {article.category}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/articles/${article.id}`}
                      className="inline-flex items-center gap-1 text-sm text-[#2e7d32] hover:text-[#1b5e20] font-medium transition-colors"
                    >
                      <Edit3 size={14} />
                      Редактировать
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <span className="text-sm text-gray-500">{label}</span>
      </div>
      <div className="text-3xl font-bold text-gray-900">{value}</div>
    </div>
  );
}
