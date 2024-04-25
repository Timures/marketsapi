# Разработка frontend для Marketsapi
- Для разработки временно использовался [appwrite.io](https://appwrite.io/) как мокбэкенда (согласно задаче бэк не требовался)
- Описание АПИ в папке /docs

## Stack
- Nuxt 3, Vue 3, Composition Api, TypeScript, Pinia
- NodeJS 18.16.1
- Yarn

## Реализованный Функционал: 

- Регистрация - Создана страница регистрации с запросом в мокбэкенд, так как это мокбэкенд, после регистрации данные в профиль нужно добавлять вручную, в реальном бэкенде это происходит автоматический

- Авторизация - Создана страница авторизации с запросом в мокбэкенд, для теста создан профиль test@test.ru пароль 12341234

- Личный кабинет (закрытая страница Кабинет пользователя): 
Данные по тарифу - выводятся из профиля авторизованного пользователя, 
смена тарифа - через модальное окно (выводятся только тарифы выше уровнем), 
смена емейла/пароля - через модальное окно, меняется только пароль по дизайну, 
проверка данных по выбранному тарифу - данные по тарифу выводятся из профиля авторизованного пользователя. 

- Блок с FAQ на главной странице (она же единственная страница не считая ЛК) - загружается из мокбэкенда (appwrite.io).

- Интерактивный блок на главной странице - создан интерактивный блок, с отправкой запроса на бэкенд (testEndpoint выбранного маркета) post/get, также есть загрузка примеров по языкам программирования из мокбэкенда. 

## Важно
- Запускать в yarn dev (установка и запуск описано в блоке Development Server) так как в appwrite.io разрешены запросы только localhost
- Данные пользователя хранятся в localCookie браузера пользователя, чтобы при обновлении страницы не входить заново
- Конвертация дней в тарифах зашита в пропорциях к basic: pro = 2 (1 к 2), mega = 3 (1 к 3), ultra = 5 (1 к 5) т.е 10 дней basic конвертируется в 2 дня ultra (10/5)
- Тарифы: 
- - Добавлен параметр is_promo, при включении этого параметра показываются цены из promo_price, promo_price_year


## Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
