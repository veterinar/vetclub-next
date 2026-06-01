/**
 * Admin Auth — Server-side auth check
 * Use in Server Components to protect admin pages
 */

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function requireAuth() {
  const cookieStore = await cookies();
  const adminToken = cookieStore.get('admin_token')?.value;
  const expectedToken = process.env.ADMIN_SECRET_TOKEN || 'vetclub-admin-token';

  if (!adminToken || adminToken !== expectedToken) {
    redirect('/admin/login');
  }
}

// Debug helper
export async function getAuthDebug() {
  const cookieStore = await cookies();
  const adminToken = cookieStore.get('admin_token')?.value;
  const expectedToken = process.env.ADMIN_SECRET_TOKEN || 'vetclub-admin-token';
  
  return {
    hasCookie: !!adminToken,
    cookieValue: adminToken ? `${adminToken.slice(0, 8)}...` : null,
    expectedValue: `${expectedToken.slice(0, 8)}...`,
    match: adminToken === expectedToken,
  };
}
