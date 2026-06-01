/**
 * Типы для статей ветеринарского портала.
 *
 * @module types/article
 */

/**
 * Полная модель статьи.
 * Используется для хранения и отображения статей.
 */
export interface Article {
  /** Уникальный идентификатор статьи */
  id: string;
  /** Заголовок статьи */
  title: string;
  /** Meta-заголовок для SEO */
  metaTitle?: string;
  /** Краткое описание / meta-description */
  description?: string;
  /** Ключевые слова для SEO */
  keywords?: string;
  /** Категория статьи */
  category?: string;
  /** URL-slug для маршрутизации */
  slug?: string;
  /** HTML-содержимое статьи */
  content?: string;
  /** Дополнительные произвольные поля */
  [key: string]: unknown;
}

/**
 * Облегчённая модель статьи для списков / индексов.
 * Содержит минимум полей для отображения в списке.
 */
export interface ArticleIndex {
  /** Уникальный идентификатор статьи */
  id: string;
  /** Заголовок статьи */
  title: string;
  /** Краткое описание */
  description?: string;
  /** URL страницы статьи */
  url: string;
}
