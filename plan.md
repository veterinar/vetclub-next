# План: Новая админка на React + AdminLTE 4

## Изучено
- AdminLTE v4: Bootstrap 5.3.8, TypeScript, jQuery-free, темная/светлая тема
- Структура: .app-wrapper > .app-header + .app-sidebar + .app-main + .app-footer
- CDN подключение: admin-lte@4.0.0, bootstrap@5.3.8, bootstrap-icons

## Архитектура новой админки
Вместо vanilla JS в iframe — полноценный React-компонент в Next.js:

### Layout: app/admin/layout.tsx
- Серверный компонент
- Подключает AdminLTE 4 через CDN (script/link теги)
- Оборачивает дочерние страницы в AdminLTE-структуру

### Страницы:
1. **app/admin/page.tsx** — Dashboard (статистика: кол-во статей, категории)
2. **app/admin/articles/page.tsx** — Список статей (таблица)
3. **app/admin/articles/[id]/page.tsx** — Редактирование статьи
4. **app/admin/login/page.tsx** — Вход (отдельная страница без layout)

### Компоненты:
- **components/admin/AdminLayout.tsx** — AdminLTE shell (header, sidebar, footer)
- **components/admin/Sidebar.tsx** — Боковое меню
- **components/admin/Header.tsx** — Топ-бар
- **components/admin/StatCard.tsx** — Карточка статистики
- **components/admin/ArticleTable.tsx** — Таблица статей
- **components/admin/ArticleEditor.tsx** — Редактор статьи

### Хуки:
- **hooks/useAuth.ts** — Проверка авторизации
- **hooks/useArticles.ts** — Загрузка/управление статьями

## Технические детали
- 'use client' для интерактивных компонентов
- AdminLTE 4 через CDN (быстрый старт без npm install)
- Bootstrap Icons для иконок
- Fetch API для запросов к /api/admin/*
- Cookie-based auth (admin_token)
