/**
 * Logout API — clears admin_token cookie
 */

import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.redirect(
    new URL('/admin/login', process.env.VERCEL_URL || 'http://localhost:3000')
  );
  response.cookies.set('admin_token', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });
  return response;
}

export async function GET() {
  return POST();
}
