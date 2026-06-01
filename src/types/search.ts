/**
 * Типы для поиска по статьям.
 *
 * @module types/search
 */

/**
 * Результат поисковой выдачи.
 * Возвращается клиенту при запросе через API или MiniSearch.
 */
export interface SearchResult {
  /** Уникальный идентификатор статьи */
  id: string;
  /** Заголовок найденной статьи */
  title: string;
  /** Краткое описание (сниппет) */
  description?: string;
  /** URL-slug для перехода к статье */
  slug: string;
  /** Meta-заголовок */
  metaTitle?: string;
  /** Фрагмент текста с совпадением (highlight) */
  match?: string;
}
