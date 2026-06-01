'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FileText,
  PlusCircle,
  Edit3,
  Trash2,
  Loader2,
} from 'lucide-react';
import DeleteButtonClient from './DeleteButtonClient';

interface Article {
  id: string;
  title: string;
  description?: string;
  category?: string;
  slug?: string;
}

export default function ArticlesPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check auth + load articles
    fetch('/api/admin/debug', { cache: 'no-store', credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (!data.cookieMatch) {
          router.push('/admin/login');
          return;
        }
        return fetch('/api/admin/articles', { credentials: 'include' });
      })
      .then(res => res?.json())
      .then(data => {
        setArticles(data?.articles || []);
        setLoading(false);
      })
      .catch(() => {
        router.push('/admin/login');
      });
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-[#2e7d32]" />
      </div>
    );
  }

  return (
    <div className="p-8">
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

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {articles.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <FileText size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium mb-2">Нет статей</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase w-16">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Название</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Категория</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">URL</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase w-32">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {articles.map(article => (
                  <tr key={article.id} className="hover:bg-gray-50 group">
                    <td className="px-6 py-4 text-sm text-gray-500 font-mono">{article.id}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{article.title}</div>
                      {article.description && <div className="text-xs text-gray-500 mt-0.5 line-clamp-1 max-w-md">{article.description}</div>}
                    </td>
                    <td className="px-6 py-4">{article.category ? <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#f0fdf4] text-[#2e7d32]">{article.category}</span> : <span className="text-xs text-gray-400">—</span>}</td>
                    <td className="px-6 py-4">
                      <Link href={article.slug || `/articles/${article.id}`} target="_blank" className="text-xs text-blue-500 hover:text-blue-700 font-mono">{article.slug || `/articles/${article.id}`}</Link>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/admin/articles/${article.id}`} className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-[#2e7d32] hover:bg-[#f0fdf4] rounded-lg font-medium"><Edit3 size={14} />Изменить</Link>
                        <DeleteButtonClient id={article.id} title={article.title} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function decline(n: number, one: string, two: string, five: string): string {
  const m = n % 100;
  if (m >= 5 && m <= 20) return five;
  const m1 = m % 10;
  if (m1 === 1) return one;
  if (m1 >= 2 && m1 <= 4) return two;
  return five;
}
