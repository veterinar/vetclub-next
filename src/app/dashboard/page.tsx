export default function AdminPage() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}>
      <iframe
        src="/admin-app/index.html"
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="VetClub Admin"
      />
    </div>
  );
}
