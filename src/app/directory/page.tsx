export default function DirectoryPage() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Справочник организаций</h1>
      <p className="text-gray-600 mb-4">Ветеринарные клиники, аптеки, лаборатории</p>
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-md mx-auto">
        <p className="text-sm text-amber-700">Справочник временно недоступен. Идёт миграция данных.</p>
      </div>
    </div>
  );
}