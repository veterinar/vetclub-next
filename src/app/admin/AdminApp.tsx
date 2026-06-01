'use client';

import { useState, useEffect } from 'react';

function LoadingScreen() {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f5f5f5',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: 48, height: 48,
          border: '4px solid #e0e0e0',
          borderTopColor: '#2e7d32',
          borderRadius: '50%',
          animation: 'adminSpin 1s linear infinite',
          margin: '0 auto 16px',
        }} />
        <p style={{ color: '#666', fontSize: 14 }}>Загрузка админ-панели...</p>
        <style>{'@keyframes adminSpin { to { transform: rotate(360deg); } }'}</style>
      </div>
    </div>
  );
}

function ErrorScreen({ error }: { error: string }) {
  return (
    <div style={{
      height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#fff5f5', fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{ textAlign: 'center', maxWidth: 400, padding: 20 }}>
        <p style={{ color: '#c00', fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Ошибка загрузки</p>
        <p style={{ color: '#666', fontSize: 13 }}>{error}</p>
      </div>
    </div>
  );
}

export default function AdminApp() {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    async function loadAdmin() {
      try {
        const [{ Admin, Resource }, auth, data, articles] = await Promise.all([
          import('react-admin'),
          import('./authProvider'),
          import('./dataProvider'),
          import('./resources/articles'),
        ]);

        const container = document.getElementById('admin-root');
        if (!container) return;

        const root = (window as any).__adminRoot;
        if (root) return;

        const { createRoot } = await import('react-dom/client');
        const adminRoot = createRoot(container);
        (window as any).__adminRoot = adminRoot;

        adminRoot.render(
          <Admin
            authProvider={auth.authProvider}
            dataProvider={data.dataProvider}
            basename="/admin"
            title="VetClub Admin"
            theme={{
              palette: {
                mode: 'light',
                primary: { main: '#2e7d32' },
                secondary: { main: '#4caf50' },
              },
            }}
          >
            <Resource
              name="articles"
              list={articles.ArticleList}
              edit={articles.ArticleEdit}
              create={articles.ArticleCreate}
              options={{ label: 'Статьи' }}
              recordRepresentation="title"
            />
          </Admin>
        );

        setReady(true);
      } catch (err: any) {
        console.error('Admin load error:', err);
        setError(err?.message || 'Не удалось загрузить админ-панель');
      }
    }

    loadAdmin();
  }, []);

  if (error) return <ErrorScreen error={error} />;

  return (
    <div id="admin-root" style={{ height: '100vh' }}>
      {!ready && <LoadingScreen />}
    </div>
  );
}
