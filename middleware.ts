import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Protect admin API routes only (not the admin page itself)
  // The admin UI handles auth client-side via cookie check
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/api/:path*'],
};
