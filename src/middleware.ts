import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Legacy article redirects
  const articleMatch = pathname.match(/^\/content\/view\/(\d+)\/\d+\/?$/);
  if (articleMatch) {
    return NextResponse.redirect(new URL(`/articles/${articleMatch[1]}`, request.url));
  }

  const oldArticleMatch = pathname.match(/^\/article\/(\d+)\/?$/);
  if (oldArticleMatch) {
    return NextResponse.redirect(new URL(`/articles/${oldArticleMatch[1]}`, request.url));
  }

  // Category redirects
  const categoryMatch = pathname.match(/^\/content\/category\/\d+\/\d+\/(\d+)\/?$/);
  if (categoryMatch) {
    return NextResponse.redirect(new URL(`/category/${categoryMatch[1]}`, request.url));
  }

  // Component redirects
  if (pathname.startsWith('/component/option,com_fireboard')) {
    return NextResponse.redirect(new URL('/forum/', request.url));
  }
  if (pathname.startsWith('/component/option,com_neorecruit')) {
    return NextResponse.redirect(new URL('/jobs/', request.url));
  }
  if (pathname.startsWith('/component/option,com_classifieds')) {
    return NextResponse.redirect(new URL('/classifieds/', request.url));
  }
  if (pathname.startsWith('/component/option,com_sobi2')) {
    return NextResponse.redirect(new URL('/directory/', request.url));
  }
  if (pathname.startsWith('/component/option,com_search')) {
    return NextResponse.redirect(new URL('/search/', request.url));
  }
  if (pathname.startsWith('/component/option,com_contact')) {
    return NextResponse.redirect(new URL('/contact/', request.url));
  }

  // Static page redirects
  if (pathname === '/content/view/64/76/' || pathname === '/content/view/64/76') {
    return NextResponse.redirect(new URL('/clinics/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/content/:path*', '/article/:path*', '/component/:path*'],
};
