export default function ForumPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center">
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Форум</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Профессиональное сообщество ветеринарных врачей. 
          Обсуждение клинических случаев, консультации коллег, обмен опытом.
        </p>
        
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="font-semibold text-amber-800">Форум временно недоступен</span>
          </div>
          <p className="text-sm text-amber-700">
            Идёт миграция данных из старой системы. 
            Если у вас есть бэкап базы данных старого форума (Fireboard/Joomla), 
            пришлите его — восстановим обсуждения.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            { title: 'Клинические случаи', desc: 'Обсуждение диагнозов и лечения', count: '—' },
            { title: 'Консультации', desc: 'Вопросы коллегам по терапии', count: '—' },
            { title: 'Фармакология', desc: 'Препараты, дозировки, побочки', count: '—' },
            { title: 'Хирургия', desc: 'Операции, послеоперационный уход', count: '—' },
            { title: 'Диагностика', desc: 'УЗИ, рентген, лаборатория', count: '—' },
            { title: 'Нормативы', desc: 'Законы, правила, лицензии', count: '—' },
          ].map(cat => (
            <div key={cat.title} className="bg-white border border-gray-200 rounded-xl p-4 opacity-60">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">{cat.title}</span>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{cat.count}</span>
              </div>
              <p className="text-sm text-gray-500">{cat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
