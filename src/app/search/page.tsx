import type { Metadata } from 'next';
import SearchForm from './SearchForm';

export const metadata: Metadata = {
  title: 'Поиск по сайту — VetClub.ru',
  description: 'Поиск по статьям и материалам сайта VetClub.ru. Ветеринарные статьи, терапия, хирургия, дерматология, офтальмология, диагностика.',
  openGraph: {
    title: 'Поиск по сайту — VetClub.ru',
    description: 'Поиск по 118+ статьям по ветеринарии',
  },
};

export default function SearchPage() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Поиск по сайту</h1>
      <SearchForm />
    </div>
  );
}
