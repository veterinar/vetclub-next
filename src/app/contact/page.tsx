export default function ContactPage() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Связаться с администратором</h1>
      <form className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
          <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" className="w-full px-3 py-2 border border-gray-200 rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Сообщение</label>
          <textarea rows={4} className="w-full px-3 py-2 border border-gray-200 rounded-lg" />
        </div>
        <button type="submit" className="px-6 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800">
          Отправить
        </button>
      </form>
    </div>
  );
}