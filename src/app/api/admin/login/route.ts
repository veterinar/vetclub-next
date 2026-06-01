/**
 * Admin Login API
 * Validates login + password, sets auth cookie
 */

export const runtime = 'nodejs';

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { login, password } = await request.json();
    
    // Validate input
    if (!login || !password) {
      return NextResponse.json(
        { error: 'Введите логин и пароль' },
        { status: 400 }
      );
    }

    // Check credentials against env variables
    const adminLogin = process.env.ADMIN_LOGIN || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    
    if (login === adminLogin && password === adminPassword) {
      const token = process.env.ADMIN_SECRET_TOKEN || 'vetclub-admin-token';
      
      const response = NextResponse.json({ success: true });
      response.cookies.set('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      });
      
      return response;
    }
    
    return NextResponse.json(
      { error: 'Неверный логин или пароль' },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Ошибка запроса' },
      { status: 400 }
    );
  }
}
