import AdminApp from './AdminApp';

export default function AdminPage() {
  return (
    <html lang="ru">
      <head>
        <title>Админ-панель — VetClub</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        <div style={{ height: '100vh' }}>
          <AdminApp />
        </div>
      </body>
    </html>
  );
}
