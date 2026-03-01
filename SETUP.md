# Инструкция по настройке магазина "Инструмент"

## 1. Настройка Supabase

### Создание проекта
1. Зайдите на [supabase.com](https://supabase.com)
2. Создайте новый проект (или используйте существующий)
3. Перейдите в **SQL Editor**
4. Скопируйте весь код из `schema.sql`
5. Выполните SQL-скрипт

### Получение ключей
1. Перейдите в **Project Settings** → **API**
2. Скопируйте:
   - `Project URL` → будет `NEXT_PUBLIC_SUPABASE_URL`
   - `anon/public` key → будет `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → будет `SUPABASE_SERVICE_ROLE_KEY`

## 2. Настройка переменных окружения

Создайте файл `.env.local` в корне проекта:

```env
NEXT_PUBLIC_SUPABASE_URL=https://ваш-проект.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=ваш-anon-key
SUPABASE_SERVICE_ROLE_KEY=ваш-service-role-key

# СДЭК API (тестовые или боевые)
CDEK_CLIENT_ID=ваш-client-id
CDEK_CLIENT_SECRET=ваш-client-secret
CDEK_API_URL=https://api.edu.cdek.ru/v2
CDEK_SHIPMENT_POINT=ваш-код-точки-отправления
```

**Для тестового сервера СДЭК:**
```env
CDEK_CLIENT_ID=EMscd6r9JnFiQ3bLoyjJY6eM78JrJceI
CDEK_CLIENT_SECRET=PjLZkKBHEiLK3YsjtNrt3TGNG0ahs3dkqq
CDEK_API_URL=https://api.edu.cdek.ru/v2
CDEK_SHIPMENT_POINT=SZ-SUR26-4
```

> **Примечание:** `CDEK_SHIPMENT_POINT` — это код пункта отправления СДЭК (ваш склад/магазин). Получите его в личном кабинете СДЭК или используйте тестовый `SZ-SUR26-4`.

**Для боевого сервера СДЭК:**
- Получите ключи на [cdek.ru/clients/integrator.html](https://cdek.ru/clients/integrator.html)
- Используйте URL: `https://api.cdek.ru/v2`

## 3. Установка зависимостей

```bash
npm install
```

## 4. Запуск в dev-режиме

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

## 5. Первый вход в админку

### Способ 1: Через Supabase Dashboard
1. Зайдите в **Authentication** → **Users**
2. Нажмите **Invite user**
3. Введите email (например, `admin@example.com`)
4. Откройте письмо с приглашением и установите пароль

### Способ 2: Через SQL
```sql
-- Вставьте пользователя напрямую
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@example.com',
  crypt('password123', gen_salt('bf')),
  now(),
  now(),
  now()
);
```

### Вход
1. Откройте [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
2. Введите email и пароль
3. Вы попадёте в админ-панель

## 6. Добавление категорий и товаров

### Через админку
1. Зайдите в `/admin/categories`
2. Нажмите **Добавить категорию**
3. Заполните: название (например, "Электроинструмент"), slug (например, "elektroinstrument")
4. Зайдите в `/admin/products`
5. Нажмите **Добавить товар**
6. Заполните все поля, выберите категорию

### Через SQL (пример для быстрого теста)
```sql
-- Добавляем категорию
INSERT INTO categories (name, slug, sort_order)
VALUES ('Электроинструмент', 'elektroinstrument', 1);

-- Получаем ID категории
SELECT id FROM categories WHERE slug = 'elektroinstrument';

-- Добавляем товар (замените category_id на полученный)
INSERT INTO products (
  title,
  slug,
  sku,
  brand,
  price,
  old_price,
  description,
  category_id,
  stock,
  is_active
)
VALUES (
  'Дрель ударная Bosch PSB 500',
  'drel-bosch-psb-500',
  'BOSCH-PSB-500',
  'Bosch',
  4990,
  5990,
  'Профессиональная ударная дрель мощностью 500 Вт',
  'замените-на-id-категории',
  15,
  true
);
```

## 7. Тестирование СДЭК

1. Добавьте товары в корзину
2. Перейдите в checkout
3. Введите город (например, "Москва")
4. Выберите тариф доставки
5. Выберите пункт выдачи из списка
6. Оформите заказ

Заказ сохранится в таблице `orders` с информацией о доставке.

## 8. Деплой на Vercel

```bash
# Установите Vercel CLI
npm i -g vercel

# Деплой
vercel

# Добавьте переменные окружения в Vercel Dashboard:
# Settings → Environment Variables
```

## 9. Настройка домена в SEO

Отредактируйте файлы:
- `src/app/robots.ts` — замените `https://yourdomain.com`
- `src/app/sitemap.ts` — замените `https://yourdomain.com`
- `next.config.ts` — добавьте свой домен в `remotePatterns` для изображений

## Готово! 🎉

Теперь у вас полностью рабочий интернет-магазин инструментов с:
- СДЭК доставкой
- Фильтрами и поиском
- Админ-панелью
- SEO-оптимизацией

Если возникнут вопросы — смотрите `README.md` или пишите в issues.
