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
          width: 48,
          height: 48,
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

export default function AdminApp() {
  const [ready, setReady] = useState(false);
  const [AdminComponent, setAdminComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    // Only load React Admin on client side
    if (typeof window === 'undefined') return;

    let mounted = true;

    async function loadAdmin() {
      const [{ Admin, Resource }, auth, data, articles] = await Promise.all([
        import('react-admin'),
        import('./authProvider'),
        import('./dataProvider'),
        import('./resources/articles'),
      ]);

      if (!mounted) return;

      function AdminAppInner() {
        return (
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
      }

      setAdminComponent(() => AdminAppInner);
      setReady(true);
    }

    loadAdmin();

    return () => { mounted = false; };
  }, []);

  if (!ready || !AdminComponent) {
    return <LoadingScreen />;
  }

  return <AdminComponent />;
}
