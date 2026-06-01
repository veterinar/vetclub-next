'use client';

import dynamic from 'next/dynamic';

// React Admin uses browser APIs (document, window)
// Must be loaded client-side only with SSR disabled
const AdminApp = dynamic(() => import('./AdminApp'), { ssr: false });

export default function AdminPage() {
  return (
    <div style={{ height: '100vh' }}>
      <AdminApp />
    </div>
  );
}
