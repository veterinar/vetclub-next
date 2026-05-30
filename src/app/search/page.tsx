export default function SearchPage() {
  return (
    <div className="content-box">
      <div className="component-heading mb-4">Поиск по сайту</div>
      <form className="flex gap-2">
        <input
          type="text"
          placeholder="Введите запрос..."
          className="flex-1 px-2 py-1 text-xs border border-gray-200"
        />
        <button type="submit" className="px-4 py-1 bg-[#488dd3] text-white text-xs">
          Поиск
        </button>
      </form>
      <p className="text-xs text-gray-500 mt-2">Поиск по статьям и материалам сайта</p>
    </div>
  );
}
