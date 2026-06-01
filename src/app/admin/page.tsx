'use client';

import { useState, useEffect } from 'react';

function LoadingFallback() {
  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafafa' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 40, height: 40, border: '3px solid #e0e0e0', borderTopColor: '#2e7d32', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
        <p style={{ color: '#666', fontSize: 14 }}>Загрузка админ-панели...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [AdminComponent, setAdminComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    let mounted = true;
    import('./AdminApp').then((mod) => {
      if (mounted) setAdminComponent(() => mod.default);
    });
    return () => { mounted = false; };
  }, []);

  if (!AdminComponent) {
    return <LoadingFallback />;
  }

  return (
    <div style={{ height: '100vh' }}>
      <AdminComponent />
    </div>
  );
}
