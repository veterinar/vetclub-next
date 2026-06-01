/**
 * Debug auth endpoint — checks cookie status
 */

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
    cookiePrefix: adminToken ? adminToken.slice(0, 10) : null,
    expectedPrefix: expectedToken.slice(0, 10),
    env: {
      hasSecretToken: !!process.env.ADMIN_SECRET_TOKEN,
      hasPassword: !!process.env.ADMIN_PASSWORD,
      nodeEnv: process.env.NODE_ENV,
    },
  });
}
