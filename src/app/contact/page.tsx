export default function ContactPage() {
  return (
    <div className="content-box">
      <div className="component-heading mb-4">Связаться с администратором</div>
      <form className="space-y-3 max-w-md">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Имя</label>
          <input type="text" className="w-full px-2 py-1 text-xs border border-gray-200" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
          <input type="email" className="w-full px-2 py-1 text-xs border border-gray-200" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Сообщение</label>
          <textarea rows={4} className="w-full px-2 py-1 text-xs border border-gray-200" />
        </div>
        <button type="submit" className="px-4 py-1 bg-[#2e7d32] text-white text-xs rounded">
          Отправить
        </button>
      </form>
    </div>
  );
}
