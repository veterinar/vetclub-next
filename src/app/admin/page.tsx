export default function AdminPage() {
  return (
    <html lang="ru">
      <head>
        <title>Админ-панель — VetClub</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`body{margin:0;padding:0;overflow:hidden}`}</style>
      </head>
      <body>
        <iframe
          src="/admin-app/index.html"
          style={{ width: '100vw', height: '100vh', border: 'none' }}
          title="VetClub Admin"
        />
      </body>
    </html>
  );
}
