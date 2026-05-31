'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        setError('Неверный пароль');
      }
    } catch {
      setError('Ошибка авторизации');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Админ-панель VetClub</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Пароль
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4caf50]"
              placeholder="Введите пароль"
              required
            />
          </div>
          
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-[#2e7d32] text-white rounded-lg hover:bg-[#1b5e20] disabled:opacity-50 font-medium"
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  );
}
