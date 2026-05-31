'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Article {
  id: string;
  title: string;
  description?: string;
}

export default function AdminDashboard() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/articles')
      .then(res => res.json())
      .then(data => {
        setArticles(data.articles || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Админ-панель VetClub</h1>
          <div className="flex gap-3">
            <Link
              href="/admin/articles/new"
              className="px-4 py-2 bg-[#2e7d32] text-white rounded-lg hover:bg-[#1b5e20] font-medium"
            >
              + Новая статья
            </Link>
            <button
              onClick={() => {
                document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                window.location.href = '/admin/login';
              }}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Выйти
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <div className="text-sm font-medium text-gray-700">
              Всего статей: {articles.length}
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Название</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {articles.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{article.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="font-medium">{article.title}</div>
                      {article.description && (
                        <div className="text-gray-500 text-xs mt-1">{article.description}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <Link
                        href={`/admin/articles/${article.id}`}
                        className="text-[#2e7d32] hover:text-[#1b5e20] font-medium"
                      >
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
    </div>
  );
}
