/**
 * API-функции для административной панели.
 *
 * @module api/admin
 */

import { apiClient } from './client';
import type {
  Article,
  ArticleListResponse,
  AuthResponse,
  LoginCredentials,
  SingleArticleResponse,
} from '@/types';

/**
 * Аутентификация администратора.
 *
 * @param creds - Логин и пароль
 * @returns Ответ с флагом success или ошибкой
 */
export async function adminLogin(
  creds: LoginCredentials,
): Promise<AuthResponse> {
  return apiClient<AuthResponse>('/api/admin/login', {
    method: 'POST',
    body: JSON.stringify(creds),
    credentials: 'include',
  });
}

/**
 * Проверяет наличие валидной сессии администратора.
 *
 * @returns true если cookie валидна
 */
export async function adminCheckAuth(): Promise<boolean> {
  try {
    const data = await apiClient<AuthResponse>('/api/admin/debug', {
      credentials: 'include',
    });
    return !!data.cookieMatch;
  } catch {
    return false;
  }
}

/**
 * Завершает сессию администратора (удаляет cookie).
 */
export async function adminLogout(): Promise<void> {
  await apiClient('/api/admin/logout', {
    method: 'POST',
    credentials: 'include',
  });
}

/**
 * Загружает полный список статей (для админки).
 *
 * @returns Массив статей, отсортированных по id
 */
export async function fetchArticles(): Promise<Article[]> {
  const data = await apiClient<ArticleListResponse>('/api/admin/articles', {
    credentials: 'include',
  });
  return data.articles || [];
}

/**
 * Загружает одну статью по идентификатору.
 *
 * @param id - Идентификатор статьи
 * @returns Объект статьи или null при ошибке / отсутствии
 */
export async function fetchArticle(id: string): Promise<Article | null> {
  try {
    const data = await apiClient<SingleArticleResponse>(
      `/api/admin/articles/${id}`,
      { credentials: 'include' },
    );
    return data.article || null;
  } catch {
    return null;
  }
}

/**
 * Создаёт или обновляет статью (UPSERT).
 *
 * @param article - Полная модель статьи
 */
export async function saveArticle(article: Article): Promise<void> {
  await apiClient(`/api/admin/articles/${article.id}`, {
    method: 'POST',
    body: JSON.stringify(article),
    credentials: 'include',
  });
}

/**
 * Удаляет статью по идентификатору.
 *
 * @param id - Идентификатор статьи
 */
export async function deleteArticle(id: string): Promise<void> {
  await apiClient(`/api/admin/articles/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
}
