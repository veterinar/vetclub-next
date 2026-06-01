/**
 * Admin Auth — Server-side auth check
 * Use in Server Components to protect admin pages
 */

import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function requireAuth() {
  // Try cookies() first
  const cookieStore = await cookies();
  let adminToken = cookieStore.get('admin_token')?.value;
  
  // Fallback: parse from header
  if (!adminToken) {
    const hdrs = await headers();
    const cookieHeader = hdrs.get('cookie') || '';
    const match = cookieHeader.match(/admin_token=([^;]+)/);
    if (match) adminToken = decodeURIComponent(match[1]);
  }
  
  const expectedToken = process.env.ADMIN_SECRET_TOKEN || 'vetclub-admin-token';

  if (!adminToken || adminToken !== expectedToken) {
    redirect('/admin/login');
  }
}
