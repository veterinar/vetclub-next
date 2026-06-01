export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const adminToken = cookieStore.get('admin_token')?.value;
  const expectedToken = process.env.ADMIN_SECRET_TOKEN || 'vetclub-admin-token';

  return NextResponse.json({
    hasCookie: !!adminToken,
    cookieMatch: adminToken === expectedToken,
  });
}
