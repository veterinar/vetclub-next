'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  adminLogin,
  adminCheckAuth,
  adminLogout,
  fetchArticles,
  fetchArticle,
  saveArticle,
  deleteArticle,
} from '@/api/admin';
import type { Article, LoginCredentials } from '@/types';

export function useAdminAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminCheckAuth().then((ok) => {
      setAuthenticated(ok);
      setLoading(false);
    });
  }, []);

  const login = useCallback(async (creds: LoginCredentials) => {
    const res = await adminLogin(creds);
    if (res.success) {
      setAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(async () => {
    await adminLogout();
    setAuthenticated(false);
  }, []);

  return { authenticated, loading, login, logout };
}

export function useAdminArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await fetchArticles();
    setArticles(data);
    setLoading(false);
  }, []);

  const remove = useCallback(async (id: string) => {
    await deleteArticle(id);
    setArticles((prev) => prev.filter((a) => a.id !== id));
  }, []);

  return { articles, loading, load, remove };
}
