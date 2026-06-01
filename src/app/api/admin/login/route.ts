export const runtime = 'nodejs';

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { login, password } = body;

    if (!login || !password) {
      return NextResponse.json(
        { error: 'Введите логин и пароль' },
        { status: 400 }
      );
    }

    const adminLogin = process.env.ADMIN_LOGIN || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (login === adminLogin && password === adminPassword) {
      const token = process.env.ADMIN_SECRET_TOKEN || 'vetclub-admin-token';

      const response = NextResponse.json({ success: true });
      response.cookies.set('admin_token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24,
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
