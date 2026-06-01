import { AuthProvider } from 'react-admin';

const API_URL = '/api/admin';

export const authProvider: AuthProvider = {
  // Called when user submits login form
  login: async ({ username, password }: { username: string; password: string }) => {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login: username, password }),
      credentials: 'include',
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || 'Неверный логин или пароль');
    }

    // Store auth flag in localStorage for React Admin state
    localStorage.setItem('admin_auth', 'true');
  },

  // Called when user clicks logout
  logout: async () => {
    localStorage.removeItem('admin_auth');
    // Also clear cookie by calling logout API
    await fetch(`${API_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
    }).catch(() => {});
  },

  // Called when route changes — checks if user is authenticated
  checkAuth: async () => {
    const res = await fetch(`${API_URL}/debug`, {
      credentials: 'include',
    });

    if (!res.ok) {
      localStorage.removeItem('admin_auth');
      throw new Error('Не авторизован');
    }

    const data = await res.json();
    if (!data.cookieMatch) {
      localStorage.removeItem('admin_auth');
      throw new Error('Не авторизован');
    }
  },

  // Called when API returns error — checks if auth error
  checkError: (error: { status?: number }) => {
    if (error.status === 401 || error.status === 403) {
      localStorage.removeItem('admin_auth');
      return Promise.reject();
    }
    return Promise.resolve();
  },

  // Called to get user identity (permissions, etc.)
  getIdentity: () =>
    Promise.resolve({
      id: 'admin',
      fullName: 'Администратор',
    }),

  // Called to check permissions
  getPermissions: () => Promise.resolve('admin'),
};
