'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface Article {
  id: string;
  title: string;
  description?: string;
  keywords?: string;
  content: string;
}

export default function EditArticle({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  const isNew = id === 'new';
  
  const [article, setArticle] = useState<Article>({
    id: isNew ? '' : id,
    title: '',
    description: '',
    keywords: '',
    content: '',
  });
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/admin/articles/${id}`)
        .then(res => res.json())
        .then(data => {
          if (data.article) {
            setArticle(data.article);
          }
          setLoading(false);
        })
        .catch(() => {
          setError('Ошибка загрузки статьи');
          setLoading(false);
        });
    }
  }, [id, isNew]);

  const handleSave = useCallback(async () => {
    setSaving(true);
    setError('');
    
    try {
      const res = await fetch(`/api/admin/articles/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article),
      });
      
      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        setError('Ошибка сохранения');
      }
    } catch {
      setError('Ошибка сохранения');
    }
    setSaving(false);
  }, [article, id, router]);

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
          <h1 className="text-2xl font-bold text-gray-900">
            {isNew ? 'Новая статья' : 'Редактирование статьи'}
          </h1>
          <div className="flex gap-3">
            <button
              onClick={() => router.push('/admin')}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Отмена
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 bg-[#2e7d32] text-white rounded-lg hover:bg-[#1b5e20] disabled:opacity-50 font-medium"
            >
              {saving ? 'Сохранение...' : 'Сохранить'}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ID
            </label>
            <input
              type="text"
              value={article.id}
              onChange={(e) => setArticle({ ...article, id: e.target.value })}
              disabled={!isNew}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4caf50] disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Название
            </label>
            <input
              type="text"
              value={article.title}
              onChange={(e) => setArticle({ ...article, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4caf50]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Описание
            </label>
            <input
              type="text"
              value={article.description || ''}
              onChange={(e) => setArticle({ ...article, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4caf50]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ключевые слова
            </label>
            <input
              type="text"
              value={article.keywords || ''}
              onChange={(e) => setArticle({ ...article, keywords: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4caf50]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Контент (HTML)
            </label>
            <textarea
              value={article.content}
              onChange={(e) => setArticle({ ...article, content: e.target.value })}
              rows={20}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4caf50] font-mono text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
