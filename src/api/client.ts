/**
 * Базовый HTTP-клиент для API-вызовов.
 * Обёртка над fetch с обработкой ошибок и JSON-парсингом.
 *
 * @module api/client
 */

/**
 * Кастомная ошибка API.
 * Содержит HTTP-статус и текст сообщения от сервера.
 */
export class ApiError extends Error {
  /**
   * @param status - HTTP-статус ответа
   * @param message - Текст ошибки от сервера
   */
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Конфигурация HTTP-запроса.
 * Расширяет стандартный RequestInit параметром query-string.
 */
interface RequestConfig extends RequestInit {
  /** Query-параметры, которые будут сериализованы в строку запроса */
  params?: Record<string, string>;
}

/**
 * Выполняет HTTP-запрос и парсит JSON-ответ.
 *
 * @typeParam T - Ожидаемый тип тела ответа
 * @param url     - Абсолютный или относительный URL
 * @param config  - Конфигурация запроса (method, body, params и т.д.)
 * @returns Распарсенный JSON-ответ типа T
 *
 * @throws {ApiError} При HTTP-статусе >= 400
 *
 * @example
 * ```ts
 * const data = await apiClient<{ items: Item[] }>('/api/items', {
 *   params: { page: '1' },
 * });
 * ```
 */
export async function apiClient<T>(
  url: string,
  config: RequestConfig = {},
): Promise<T> {
  const { params, ...init } = config;

  // Собираем query-string
  let fullUrl = url;
  if (params) {
    const qs = new URLSearchParams(params).toString();
    fullUrl += (url.includes('?') ? '&' : '?') + qs;
  }

  const response = await fetch(fullUrl, {
    headers: {
      'Content-Type': 'application/json',
      ...init.headers,
    },
    ...init,
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: 'Unknown error' })) as { error?: string };
    throw new ApiError(
      response.status,
      error.error || `HTTP ${response.status}`,
    );
  }

  // Обработка пустых ответов (204 No Content и т.п.)
  const text = await response.text();
  if (!text) return undefined as T;
  return JSON.parse(text) as T;
}
