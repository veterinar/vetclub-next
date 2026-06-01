import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Admin auth check disabled — handled client-side by admin app
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/api/:path*'],
};
