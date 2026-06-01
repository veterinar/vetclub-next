export const dynamic = 'force-dynamic';

export default function AdminPage() {
  return (
    <div style={{ margin: '-2rem', height: '100vh', width: '100vw' }}>
      <iframe
        src="/admin-app/index.html"
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="VetClub Admin"
      />
    </div>
  );
}
