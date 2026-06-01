'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
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

export default function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [id, setId] = useState<string>('');
  const [isNew, setIsNew] = useState(false);
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    params.then(({ id: resolvedId }) => {
      setId(resolvedId);
      const newArticle = resolvedId === 'new';
      setIsNew(newArticle);

      // Check auth
      fetch('/api/admin/debug', { cache: 'no-store', credentials: 'include' })
        .then(res => res.json())
        .then(data => {
          if (!data.cookieMatch) {
            router.push('/admin/login');
            return;
          }
          if (newArticle) {
            setArticle({
              id: '',
              title: '',
              metaTitle: '',
              description: '',
              keywords: '',
              content: '',
              category: '',
              slug: '',
            });
            setLoading(false);
            return;
          }
          // Load existing article
          return fetch(`/api/admin/articles/${resolvedId}`, { credentials: 'include' });
        })
        .then(res => {
          if (!res) return;
          if (res.status === 404) {
            setNotFound(true);
            setLoading(false);
            return;
          }
          return res.json();
        })
        .then(data => {
          if (data?.article) {
            setArticle(data.article);
          }
          setLoading(false);
        })
        .catch(() => {
          router.push('/admin/login');
        });
    });
  }, [params, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-[#2e7d32]" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-red-700 mb-2">Статья не найдена</h2>
          <p className="text-sm text-red-600">Статья с ID «{id}» не существует</p>
        </div>
      </div>
    );
  }

  if (!article) return null;

  return (
    <ArticleEditor
      id={id}
      isNew={isNew}
      initialData={article}
    />
  );
}
