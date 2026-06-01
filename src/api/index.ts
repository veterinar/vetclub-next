/**
 * Единый реэкспорт API-функций.
 *
 * @module api
 */

export { apiClient, ApiError } from './client';
export { searchApiQuery } from './search';
export {
  adminLogin,
  adminCheckAuth,
  adminLogout,
  fetchArticles,
  fetchArticle,
  saveArticle,
  deleteArticle,
} from './admin';
