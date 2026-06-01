'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Eye, EyeOff, LogIn } from 'lucide-react';

export default function AdminLogin() {
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const err = searchParams.get('error');
    if (err === 'invalid') setError('Неверный логин или пароль');
    if (err === 'error') setError('Ошибка авторизации');
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Админ-панель VetClub</h1>
          <p className="text-sm text-gray-500 mt-1">Вход для администраторов</p>
        </div>
        
        {/* Regular HTML form — browser handles cookie + redirect */}
        <form action="/api/admin/login" method="POST" className="space-y-4">
          {/* Login field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Логин
            </label>
            <input
              type="text"
              name="login"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4caf50] focus:border-transparent text-sm"
              placeholder="Введите логин"
              required
              autoComplete="username"
            />
          </div>

          {/* Password field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Пароль
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="w-full px-4 py-2.5 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4caf50] focus:border-transparent text-sm"
                placeholder="Введите пароль"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Show password checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="show-password"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
              className="h-4 w-4 text-[#2e7d32] border-gray-300 rounded focus:ring-[#4caf50]"
            />
            <label
              htmlFor="show-password"
              className="ml-2 text-sm text-gray-600 cursor-pointer select-none"
            >
              Показать пароль
            </label>
          </div>
          
          {/* Error message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          
          {/* Submit button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#2e7d32] text-white rounded-lg hover:bg-[#1b5e20] font-medium transition-colors"
          >
            <LogIn size={18} />
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}
