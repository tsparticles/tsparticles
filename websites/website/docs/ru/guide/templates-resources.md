# Шаблоны и ресурсы

tsParticles предоставляет две категории шаблонов: **шаблоны-заготовки** (каркасы фреймворков) и **шаблоны сценариев** (готовые примеры приложений).

## Быстрый старт с CLI

Самый простой способ использовать любой шаблон — через CLI:

```bash
npm create tsparticles@latest
```

Или используйте конкретный пакет напрямую:

```bash
npm create particles@latest
npm create confetti@latest
npm create ribbons@latest
```

Для неинтерактивного использования:

```bash
npx tsparticles-create app my-project --template scaffold --framework react
npx tsparticles-create app my-project --template confetti --framework vanilla
```

## Шаблоны-заготовки

Шаблоны-заготовки предоставляют минимальный каркас проекта на Vite + TypeScript с предварительно настроенным tsParticles. Они доступны для следующих фреймворков:

| Фреймворк | Параметр CLI          | Пакет                            |
| --------- | --------------------- | -------------------------------- |
| Vanilla   | `--framework vanilla` | `@tsparticles/template-scaffold` |
| React     | `--framework react`   | `@tsparticles/template-scaffold` |
| Vue 3     | `--framework vue3`    | `@tsparticles/template-scaffold` |
| Angular   | `--framework angular` | `@tsparticles/template-scaffold` |
| Svelte    | `--framework svelte`  | `@tsparticles/template-scaffold` |
| Solid     | `--framework solid`   | `@tsparticles/template-scaffold` |

Пример:

```bash
npx tsparticles-create app my-react-app --template scaffold --framework react
cd my-react-app
npm install
npm run dev
```

## Шаблоны сценариев

Шаблоны сценариев — это готовые примеры приложений, демонстрирующие реальное использование tsParticles.

| Шаблон      | Описание                                     | Имя шаблона CLI | Пакет                             |
| ----------- | -------------------------------------------- | --------------- | --------------------------------- |
| Login       | Страница входа/регистрации с фоном из частиц | `login`         | `@tsparticles/template-login`     |
| Portfolio   | Личное портфолио с анимированным героем      | `portfolio`     | `@tsparticles/template-portfolio` |
| Landing     | Маркетинговый лендинг с эффектными частицами | `landing`       | `@tsparticles/template-landing`   |
| Tic Tac Toe | Крестики-нолики с праздничной конфетти       | `tictactoe`     | `@tsparticles/template-tictactoe` |
| Confetti    | Демо-пушка конфетти                          | `confetti`      | `@tsparticles/template-confetti`  |
| Ribbons     | Демо-анимация лент                           | `ribbons`       | `@tsparticles/template-ribbons`   |
| Particles   | Классическое демо в стиле particles.js       | `particles`     | `@tsparticles/template-particles` |

Пример:

```bash
npx tsparticles-create app my-portfolio --template portfolio --framework vanilla
cd my-portfolio
npm install
npm run dev
```

## npm create обёртки

Для шаблонов, привязанных к конкретным пакетам, можно использовать специальные обёртки npm create:

| Команда                         | Шаблон       | Фреймворк    | Устанавливаемый пакет    |
| ------------------------------- | ------------ | ------------ | ------------------------ |
| `npm create tsparticles@latest` | Интерактивно | Интерактивно | Выбор пользователя       |
| `npm create particles@latest`   | `particles`  | Vanilla      | `@tsparticles/particles` |
| `npm create confetti@latest`    | `confetti`   | Vanilla      | `@tsparticles/confetti`  |
| `npm create ribbons@latest`     | `ribbons`    | Vanilla      | `@tsparticles/ribbons`   |

## Справочник по CLI

```bash
tsparticles-create app [destination] [options]

Options:
  --template <name>     Используемый шаблон (scaffold|login|portfolio|landing|tictactoe|confetti|ribbons|particles)
  --framework <name>    Фреймворк (vanilla|react|vue3|angular|svelte|solid)
  --skip-install        Пропустить npm install после создания каркаса
  -h, --help            Показать справку
```

## Похожие страницы

- [`/guide/frameworks`](/ru/guide/frameworks)
- [`/guide/wrappers`](/ru/guide/wrappers)
- [`/demos/`](/ru/demos/)
