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
  const [authChecked, setAuthChecked] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        const { id: resolvedId } = await params;
        if (!mounted) return;

        setId(resolvedId);
        const newArticle = resolvedId === 'new';
        setIsNew(newArticle);

        // Check auth
        const authRes = await fetch('/api/admin/debug', {
          cache: 'no-store',
          credentials: 'include',
        });
        const authData = await authRes.json();

        if (!mounted) return;

        if (!authData.cookieMatch) {
          window.location.href = '/admin/login';
          return;
        }

        setAuthChecked(true);

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
        const res = await fetch(`/api/admin/articles/${resolvedId}`, {
          credentials: 'include',
        });

        if (res.status === 404) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        const data = await res.json();
        if (data.article) {
          setArticle(data.article);
        }
        setLoading(false);
      } catch {
        if (mounted) {
          window.location.href = '/admin/login';
        }
      }
    }

    init();

    return () => {
      mounted = false;
    };
  }, [params]);

  if (!authChecked) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-[#2e7d32]" />
        <p className="text-sm text-gray-500">Проверка авторизации...</p>
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

  return <ArticleEditor id={id} isNew={isNew} initialData={article} />;
}
