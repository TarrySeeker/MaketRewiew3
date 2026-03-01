# Интернет-магазин "Инструмент"

Современный интернет-магазин ручного и электроинструмента на Next.js 15 + Supabase.

## Технологии

- **Frontend:** Next.js 15 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS 3
- **Database:** Supabase (PostgreSQL)
- **State:** Zustand (корзина + localStorage)
- **Icons:** Lucide React

## Дизайн

Брутальный индустриальный стиль:
- Тёмная тема (background: #0a0a0a)
- Оранжевый акцент (#ff6b00)
- Шрифты: Inter (основной), Space Grotesk (заголовки)

## Установка

```bash
npm install
```

## Настройка

1. Создайте проект на [supabase.com](https://supabase.com)
2. Выполните SQL из `schema.sql` в SQL Editor
3. Скопируйте `.env.local.example` → `.env.local` и заполните ключи:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

CDEK_CLIENT_ID=your-cdek-client-id
CDEK_CLIENT_SECRET=your-cdek-secret
CDEK_API_URL=https://api.edu.cdek.ru/v2
CDEK_SHIPMENT_POINT=SZ-SUR26-4
```

## Запуск

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

## Структура

### Публичная часть

- `/` — Главная (hero, категории, преимущества)
- `/catalog` — Каталог всех категорий
- `/catalog/[slug]` — Товары категории
- `/product/[id]` — Карточка товара
- `/cart` — Корзина
- `/checkout` — Оформление заказа
- `/about` — О компании
- `/contacts` — Контакты

### Админ-панель `/admin`

- `/admin` — Дашборд (статистика)
- `/admin/products` — CRUD товаров (поиск, добавление, редактирование, удаление)
- `/admin/categories` — CRUD категорий
- `/admin/orders` — Список заказов
- `/admin/login` — Вход (требует Supabase Auth)

## Первый вход в админку

1. Создайте пользователя в Supabase:
   - Authentication → Users → Invite user
   - Или через SQL:
   ```sql
   INSERT INTO auth.users (email, encrypted_password, email_confirmed_at)
   VALUES ('admin@example.com', crypt('password123', gen_salt('bf')), now());
   ```
2. Перейдите на `/admin/login`
3. Войдите с созданными учётными данными

## База данных

Схема в `schema.sql`:
- `categories` — Категории товаров (иерархия)
- `products` — Товары (title, price, brand, sku, stock, images, etc.)
- `orders` — Заказы (customer_info, items, total, status)
- `promo_codes` — Промокоды
- `cms_content` — Контент для главной (hero, тексты)

## Реализованные функции

- [x] СДЭК API интеграция (расчёт доставки, выбор ПВЗ, создание заказов)
- [x] Фильтры в каталоге (цена, бренд, сортировка)
- [x] Глобальный поиск товаров
- [x] SEO-оптимизация (generateMetadata, robots.txt, sitemap.xml)
- [x] Адаптивная вёрстка (mobile-first)
- [x] Корзина с localStorage
- [x] Полная админ-панель (товары, категории, заказы)

## TODO (будущие улучшения)

- [ ] Трекинг заказов СДЭК в режиме реального времени
- [ ] Промокоды в checkout
- [ ] Загрузка фото товаров в Supabase Storage из админки
- [ ] Email-уведомления о заказах
- [ ] Отзывы и рейтинги товаров
- [ ] Избранное (wishlist)
- [ ] Email-уведомления о заказах

## Деплой

### Vercel (рекомендуется)

```bash
vercel
```

Добавьте переменные окружения в Vercel Dashboard.

### Docker

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

## Лицензия

MIT
