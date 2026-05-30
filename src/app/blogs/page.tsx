export default function BlogsPage() {
  return (
    <div className="content-box">
      <div className="component-heading mb-4">Блоги</div>
      <p className="text-xs text-gray-600 mb-4">Персональные блоги ветеринарных врачей</p>
      <div className="bg-amber-50 border border-amber-200 rounded p-3">
        <p className="text-xs text-amber-700">Блоги временно недоступны. Идёт миграция данных.</p>
      </div>
    </div>
  );
}
