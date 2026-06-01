import { DataProvider, fetchUtils } from 'react-admin';

const API_URL = '/api/admin';

// Custom httpClient that includes credentials (cookies)
const httpClient = (url: string, options: RequestInit = {}) => {
  return fetchUtils.fetchJson(url, {
    ...options,
    credentials: 'include',
  });
};

export const dataProvider: DataProvider = {
  // Get list of articles
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;

    const res = await httpClient(`${API_URL}/${resource}`);
    const { articles } = res.json as { articles: any[] };

    // Sort
    const sorted = [...articles].sort((a, b) => {
      const aVal = a[field] || '';
      const bVal = b[field] || '';
      return order === 'ASC'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });

    // Pagination
    const start = (page - 1) * perPage;
    const paginated = sorted.slice(start, start + perPage);

    return {
      data: paginated,
      total: articles.length,
    };
  },

  // Get single article
  getOne: async (resource, params) => {
    const res = await httpClient(`${API_URL}/${resource}/${params.id}`);
    const { article } = res.json as { article: any };
    return { data: article };
  },

  // Get multiple articles
  getMany: async (resource, params) => {
    const res = await httpClient(`${API_URL}/${resource}`);
    const { articles } = res.json as { articles: any[] };
    const filtered = articles.filter((a) => params.ids.includes(a.id));
    return { data: filtered };
  },

  // Get many reference (for relations)
  getManyReference: async (resource, params) => {
    return dataProvider.getList(resource, {
      pagination: params.pagination,
      sort: params.sort,
      filter: { ...params.filter, [params.target]: params.id },
    });
  },

  // Create new article
  create: async (resource, params) => {
    const id = params.data.id || Date.now().toString();
    await httpClient(`${API_URL}/${resource}/${id}`, {
      method: 'POST',
      body: JSON.stringify(params.data),
    });
    return { data: { ...params.data, id } as any };
  },

  // Update article
  update: async (resource, params) => {
    const res = await httpClient(`${API_URL}/${resource}/${params.id}`, {
      method: 'POST',
      body: JSON.stringify(params.data),
    });
    return { data: params.data };
  },

  // Update many
  updateMany: async (resource, params) => {
    await Promise.all(
      params.ids.map((id) =>
        httpClient(`${API_URL}/${resource}/${id}`, {
          method: 'POST',
          body: JSON.stringify(params.data),
        })
      )
    );
    return { data: params.ids };
  },

  // Delete article
  delete: async (resource, params) => {
    const res = await httpClient(`${API_URL}/${resource}/${params.id}`, {
      method: 'DELETE',
    });
    return { data: { id: params.id } };
  },

  // Delete many
  deleteMany: async (resource, params) => {
    await Promise.all(
      params.ids.map((id) =>
        httpClient(`${API_URL}/${resource}/${id}`, { method: 'DELETE' })
      )
    );
    return { data: params.ids };
  },
};
