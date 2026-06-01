import { apiClient } from '@/api/client';
import type { Article, ArticleListResponse, SingleArticleResponse } from '@/types';

export async function getAllArticles(): Promise<Article[]> {
  const data = await apiClient<ArticleListResponse>('/api/admin/articles', {
    credentials: 'include',
  });
  return data.articles || [];
}

export async function getArticleById(id: string): Promise<Article | null> {
  try {
    const data = await apiClient<SingleArticleResponse>(`/api/admin/articles/${id}`, {
      credentials: 'include',
    });
    return data.article || null;
  } catch {
    return null;
  }
}
