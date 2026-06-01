/**
 * Admin Login API
 * Validates login + password, sets auth cookie, redirects
 */

export const runtime = 'nodejs';

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Try form data first, then JSON
    let login = '';
    let password = '';
    
    const contentType = request.headers.get('content-type') || '';
    
    if (contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await request.formData();
      login = (formData.get('login') as string) || '';
      password = (formData.get('password') as string) || '';
    } else {
      const json = await request.json();
      login = json.login || '';
      password = json.password || '';
    }

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
      
      const response = NextResponse.redirect(new URL('/admin', request.url));
      response.cookies.set('admin_token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24,
        path: '/',
      });
      
      return response;
    }
    
    // Invalid credentials — redirect back with error
    const response = NextResponse.redirect(new URL('/admin/login?error=invalid', request.url));
    return response;
  } catch {
    return NextResponse.redirect(new URL('/admin/login?error=error', request.url));
  }
}
