/**
 * Типы для административной панели (API и формы).
 *
 * @module types/admin
 */

import type { Article } from './article';

/**
 * Учётные данные для входа в админ-панель.
 */
export interface LoginCredentials {
  /** Логин администратора */
  login: string;
  /** Пароль администратора */
  password: string;
}

/**
 * Ответ API на запросы авторизации.
 */
export interface AuthResponse {
  /** Успешность операции */
  success?: boolean;
  /** Сообщение об ошибке */
  error?: string;
  /** Флаг совпадения cookie (debug-эндпоинт) */
  cookieMatch?: boolean;
}

/**
 * Ответ API со списком статей.
 */
export interface ArticleListResponse {
  /** Массив статей */
  articles: Article[];
}

/**
 * Ответ API с одной статьёй.
 */
export interface SingleArticleResponse {
  /** Объект статьи */
  article: Article;
}
