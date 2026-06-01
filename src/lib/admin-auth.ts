/**
 * Admin Auth — Client-side helper
 * Use in Client Components to check auth status
 */

export async function checkAuth(): Promise<boolean> {
  try {
    const res = await fetch('/api/admin/debug', { cache: 'no-store' });
    const data = await res.json();
    return data.cookieMatch === true;
  } catch {
    return false;
  }
}
