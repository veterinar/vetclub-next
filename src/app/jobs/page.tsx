export default function JobsPage() {
  return (
    <div className="text-center py-12">
      <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 012 12c5.523 0 10-4.477 10-10 0 5.523-4.477 10-10 10zM11 7a2 2 0 11-4 0 2 2 0 014 0zM21 13v-2a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Работа для ветврачей</h1>
      <p className="text-gray-600 mb-4">Вакансии для ветеринарных врачей и менеджеров клиник</p>
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-md mx-auto">
        <p className="text-sm text-amber-700">Раздел вакансий временно недоступен. Идёт миграция данных.</p>
      </div>
    </div>
  );
}