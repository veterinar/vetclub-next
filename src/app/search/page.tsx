export default function SearchPage() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Поиск по сайту</h1>
      <form className="flex gap-2">
        <input
          type="text"
          placeholder="Введите запрос..."
          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-#f1f8e90"
        />
        <button type="submit" className="px-6 py-2 bg-#2e7d32 text-white rounded-lg hover:bg-#1b5e20">
          Поиск
        </button>
      </form>
      <p className="text-sm text-gray-500 mt-2">Поиск по статьям и материалам сайта</p>
    </div>
  );
}