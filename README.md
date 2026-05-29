# VetClub Next.js

Рефакторинг VetClub.ru на Next.js + React + Tailwind CSS.

## Что сделано
- 118 статей перенесены из статических HTML-файлов Joomla
- Статическая генерация (SSG) всех страниц
- Tailwind CSS + Typography для стилей
- Готов к деплою на Vercel

## Структура
- `data/articles/` — JSON с содержимым статей
- `src/app/page.tsx` — список статей
- `src/app/articles/[id]/page.tsx` — страница статьи
- `scripts/extract-articles.ts` — скрипт парсинга статических файлов

## Деплой на Vercel

### Способ 1: GitHub + Vercel (рекомендуется)
1. Создать репозиторий на GitHub (например `vetclub-next`)
2. Запушить этот проект:
   ```bash
   git remote add origin https://github.com/veterinar/vetclub-next.git
   git push -u origin main
   ```
3. На Vercel: Import Git Repository → выбрать `vetclub-next`
4. Framework Preset: Next.js
5. Deploy

### Способ 2: Vercel CLI
```bash
npm i -g vercel
vercel login
vercel
```

## Разработка
```bash
npm install
npm run dev
```

## Будущие улучшения
- [ ] API Routes для поиска
- [ ] MongoDB/Supabase для данных
- [ ] Форум (перенос Fireboard)
- [ ] Регистрация и профили
- [ ] Комментарии
- [ ] Админ-панель
