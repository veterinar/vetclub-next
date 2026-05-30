export default function SearchPage() {
  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Поиск по сайту</h1>
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <form className="flex gap-2">
          <input
            type="text"
            placeholder="Введите запрос..."
            className="flex-1 px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-emerald-700 text-white rounded hover:bg-emerald-800"
          >
            Поиск
          </button>
        </form>
        <p className="text-sm text-gray-500 mt-4">Поиск по статьям и материалам сайта</p>
      </div>
    </div>
  );
}