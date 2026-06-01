/**
 * Глобальные константы приложения.
 *
 * @module constants
 */

/** Базовый путь к Admin API */
export const ADMIN_API_BASE = '/api/admin' as const;

/** Базовый путь к Search API */
export const SEARCH_API_BASE = '/api/search' as const;

/** Директория со статьями (относительно process.cwd()) */
export const ARTICLES_DIR = '/data/articles' as const;

/** Логин администратора по умолчанию (для UI-подсказок) */
export const DEFAULT_ADMIN_LOGIN = 'admin' as const;

/** Название сайта */
export const SITE_NAME = 'VetClub.ru' as const;

/** Описание сайта (meta / SEO) */
export const SITE_DESCRIPTION = 'Ветеринария для профессионалов' as const;
