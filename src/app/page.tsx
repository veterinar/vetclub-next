import articlesData from '@/data/index.json';
import Link from 'next/link';

const mostRead = [
  { id: '58', title: 'Диагностика и лечение мочекаменной болезни у котов', catid: '63' },
  { id: '385', title: 'Гериатрия в ветеринарии. Особенности ухода и лечения старых собак и кошек', catid: '73' },
  { id: '387', title: 'Национальная ветеринарная конференция 2013', catid: '57' },
  { id: '382', title: 'Новый закон "О ветеринарии" должен вступить в силу 1 января 2014 года', catid: '57' },
  { id: '40', title: 'Личные странички ветеринарных врачей', catid: '1' },
  { id: '90', title: 'Нарушения пигментации шерсти у собак', catid: '63' },
  { id: '366', title: 'Диагностика зуда в области головы и шеи у кошек', catid: '67' },
  { id: '83', title: 'Добавили возможность ведения блогов', catid: '1' },
  { id: '101', title: 'Консультации ветеринарных врачей', catid: '63' },
  { id: '346', title: 'В Москве разработан новый проект закона о содержании кошек и собак', catid: '57' },
  { id: '350', title: 'УЗИ мочеполовой системы у кошек', catid: '71' },
  { id: '76', title: 'Лечение дерматологических заболеваний у животных', catid: '67' },
  { id: '381', title: 'Опухоли желудочно-кишечного тракта у кошек и собак', catid: '64' },
  { id: '333', title: 'Пироплазмоз собак (бабезиоз). Характеристики мазков крови при бабезиозе (пироплазмозе) у собак', catid: '71' },
  { id: '390', title: 'Уремия (уремический синдром) у кошек', catid: '63' },
  { id: '361', title: 'Синдром вздутия и заворота желудка', catid: '64' },
  { id: '363', title: 'Неврит «конского хвоста» у собаки', catid: '73' },
  { id: '383', title: 'Увеит у собак и кошек. Клинические признаки, диагностика и лечение увеитов', catid: '65' },
  { id: '25', title: 'Сибирская язва. Санитарные правила СП 3.1.089-96. Ветеринарные правила ВП 13.3.1320-96"', catid: '60' },
  { id: '354', title: 'Профилактика и лечение заболеваний периодонта у собак и кошек. Часть 2.', catid: '91' },
];

const archives = [
  { year: '2010', month: '08', name: 'August, 2010' },
  { year: '2010', month: '05', name: 'May, 2010' },
  { year: '2010', month: '01', name: 'January, 2010' },
  { year: '2009', month: '11', name: 'November, 2009' },
  { year: '2009', month: '03', name: 'March, 2009' },
  { year: '2009', month: '02', name: 'February, 2009' },
  { year: '2008', month: '12', name: 'December, 2008' },
];

export default function HomePage() {
  // Get latest 10 articles for frontpage
  const latestArticles = articlesData.slice(0, 10);

  return (
    <div className="space-y-6">
      {/* Registration Module */}
      <div className="bg-emerald-50 border border-emerald-200 rounded p-4">
        <h2 className="font-bold text-emerald-800 mb-2">О регистрации на сайте</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          Проект VetClub.ru — первая в России социальная сеть ветеринарных врачей, 
          сообщество профессионалов с закрытм членством. Членами клуба становятся практикующие 
          ветеринарные врачи, менеджеры ветеринарных клиник, и ветфельдшеры. 
          При регистрации все поля формы являются обязательными. 
          Активация пользователя проводится администратором после проверки данных.
        </p>
      </div>

      {/* Latest Articles */}
      <div className="bg-white border border-gray-200 rounded p-4">
        <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-100 pb-2">Последние публикации</h2>
        <div className="space-y-3">
          {latestArticles.map((article) => (
            <article key={article.id} className="border-b border-gray-100 pb-3 last:border-0">
              <h3 className="font-semibold text-sm text-emerald-800 mb-1">
                <Link href={`/content/view/${article.id}/1/`} className="hover:underline">
                  {article.title}
                </Link>
              </h3>
              {article.description && (
                <p className="text-xs text-gray-500 line-clamp-2">{article.description}</p>
              )}
            </article>
          ))}
        </div>
      </div>

      {/* Most Read */}
      <div className="bg-white border border-gray-200 rounded p-4">
        <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-100 pb-2">Популярные</h2>
        <div className="space-y-2">
          {mostRead.map((article) => (
            <div key={article.id} className="flex items-start gap-2 text-sm">
              <span className="text-emerald-600 font-bold mt-0.5">→</span>
              <Link 
                href={`/content/view/${article.id}/${article.catid}/`} 
                className="text-emerald-800 hover:underline"
              >
                {article.title}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Archives */}
      <div className="bg-white border border-gray-200 rounded p-4">
        <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-100 pb-2">Архив новостей</h2>
        <div className="space-y-1">
          {archives.map((archive) => (
            <div key={`${archive.year}-${archive.month}`} className="text-sm">
              <Link 
                href={`/content/category/1/14/57/`} 
                className="text-emerald-800 hover:underline"
              >
                {archive.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
