# Руководство по миграции на v5 — рабочий черновик E10

Статус: E10 выполняется (2026-11-25). Проверки E9 установленных пакетов и браузера прошли для текущего кандидата. В руководстве описаны реализованные контракты v5 для engine, wrappers, bundles и цветов. Пределы размера E0 остаются диагностическими ориентирами согласно обновлённому критерию размера E10; они не считаются пройденными. Критерии runtime, выделения памяти и удержания ресурсов остаются открытыми: p95 кадров M6/500 с принудительным HDR всё ещё выше фиксированного предела E0.

Сгенерированный MCP пример TypeScript и CLI scaffold Vanilla проходят проверку типов и запуск в Chrome с пересобранными пакетами кандидата; CLI scaffold также проходит production-сборку. Все девять семейств упакованных шаблонов не содержат удалённых вариантов Vue 2, Nuxt 2 или Nuxt 3. Открытыми остаются генерируемые комбинации помимо Vanilla, React, Vue 3, Solid и Lit, переводы сверх первых черновиков на итальянском, испанском, французском и немецком, расширенная проверка потребителей и HDR/browser-проверка на оборудовании. Черновики и статус языков находятся в [`migration-drafts/`](README.md). Это внутренние материалы, не готовые руководства для публикации.

Стандартные и локализованные Vanilla-руководства на текущем сайте побайтно совпадают и используют опубликованные CDN-пакеты v4. Примеры с singleton остаются документацией v4 до готовности страницы миграции v5; они не считаются проверкой потребителей v5.

## Владение engine

Замените импорт singleton `tsParticles` на `createEngine()`. Храните возвращённый экземпляр на уровне приложения, передавайте его каждому loader и явно предоставляйте wrappers и providers. Локальная переменная может по-прежнему называться `tsParticles`. При teardown компонента управляется принадлежащий ему container; нельзя уничтожать другие containers той же engine.

Настройка генератора случайных чисел, logger и планирования анимации теперь принадлежит экземпляру в реализации E2. Регистрируйте пользовательские plugins в `container.engine` (или `container.pluginManager.engine`), чтобы runtime-сервисы использовали engine-владельца.

## Удалённые интеграции фреймворков

| Интеграция                            | Целевая миграция                           | Удаление / проверка              |
| ------------------------------------- | ------------------------------------------ | -------------------------------- |
| Vue 2 wrapper, demo и ссылки starter  | Перейдите на Vue 3 и `@tsparticles/vue3`   | Удалены в E1; перепроверены в E9 |
| Nuxt 2 wrapper, demo и ссылки starter | Перейдите на Nuxt 4 и `@tsparticles/nuxt4` | Удалены в E1; перепроверены в E9 |
| Nuxt 3 wrapper, demo и ссылки starter | Перейдите на Nuxt 4 и `@tsparticles/nuxt4` | Удалены в E1; перепроверены в E9 |

Обновление фреймворка — это миграция приложения, а не простая смена имени пакета. Поиск ссылок E0 находится в [`../../e0/retirement-references.txt`](../../e0/retirement-references.txt). При удалении проверьте installers, генерируемые строки, документацию и переводы. Матрица также включает поддерживаемых потребителей, которым нужны явные engines.

## Устаревшие API

Удалена `colorMix()`, возвращавшая RGB. Также удалены устаревшие engine helpers `getStyleFromRgb()` и `getStyleFromHsl()`, `getStyleFromHsv()` плагина HSV и локальный форматтер пакета OKLCH `getStyleFromOklch()`. Преобразуйте RGB через `rgbToOklch()`, HSL через `rgbToOklch(hslToRgbFloat(color))`, а параметры HSV разрешайте зарегистрированным менеджером HSV через `rangeColorToOklch(engine.pluginManager, { value: { hsv: color } })`. Передавайте канонический результат в engine `getStyleFromOklch()`, который учитывает целевой gamut и HDR. Если на выходе действительно нужен только RGB, используйте `mapOklchToSrgb(result).rgb`.

### Hooks жизненного цикла interactor

Базовые классы interactor предоставляют пустую реализацию `reset()`. Базовый класс внешнего interactor также предоставляет пустой `clear()`. Manager выбирает пользовательские hooks после инициализации interactors, включая инициализацию redraw. Сохраняйте overrides, которые хранят состояние или выполняют работу при reset; при `noImplicitOverride` добавляйте модификатор TypeScript `override`.

См. [список устаревших API](../../e9/deprecated-migrations.md): удалённые форматтеры цветов, параметры Confetti и Ribbons и сохранённая opt-in совместимость particles.js. При переходе компилятора на Stencil 5 удалите `applyPolyfills()` и дождитесь `defineCustomElements()`, если регистрация должна завершиться до hydration. Wrapper tsParticles для Stencil использует Stencil 4 и пока объявляет `applyPolyfills()`.

## Цвета, параметры и публичные контракты

Входные цвета по-прежнему поддерживают RGB, HSL, HSV, HWB, Lab, LCH, OKLab, CSS-строки, массивы и диапазоны. Анимация частиц теперь использует OKLCH: замените старые HSL-компоненты `{ h, s, l }` на `{ h, c, l }`. Hue остаётся углом; chroma и lightness используют числовую шкалу OKLCH v5, alpha остаётся отдельным значением opacity. Не копируйте насыщенность HSL в chroma. Преобразуйте цвет на границе ввода или передайте поддерживаемый CSS/RGB, чтобы его разобрала engine. Менеджеры расширения цвета должны соблюдать текущий контракт OKLCH; см. [решения по цвету](../../../V5-COLOR-DECISIONS.md) о входах, gamut mapping, alpha и HDR.

## API с явной engine, реализованные в E1

```ts
import { createEngine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const engine = createEngine();
await loadSlim(engine);
const container = await engine.load({ id: "particles", options: {} });
container?.destroy();
```

Входы root, `/lazy` и browser module не создают engines и не публикуют объекты в `globalThis`. Классические Rollup-скрипты предоставляют namespace фабрик и loaders:

```js
const engine = tsParticles.createEngine();
await tsParticles.loadSlim(engine);
await engine.load({ id: "particles", options: {} });
```

Standalone bundle содержит определения engine; внешним feature-скриптам сначала нужны соответствующая engine и зависимости. Согласуйте версии пакетов. Namespace содержит определения, а не engine. Загрузка другого bundle не уничтожает ранее созданную engine. Один canvas может иметь только одного владельца, в том числе при копиях engine из разных bundles. Уничтожьте владельца перед передачей canvas. Одинаковые ID у разных canvas остаются независимыми.

Используйте отдельную engine, когда нужны изолированные реестры plugins, источники случайных чисел, loggers, schedulers или владение containers. Регистрируйте каждую нужную feature во всех engines, где она используется:

```ts
import { createEngine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const editor = createEngine();
const preview = createEngine();
await Promise.all([loadSlim(editor), loadSlim(preview)]);

const editorContainer = await editor.load({ id: "editor", options: {} });
const previewContainer = await preview.load({ id: "preview", options: {} });

editorContainer?.destroy();
previewContainer?.destroy();
```

Пакеты удобства экспортируют `createConfetti(engine)`, `createFireworks(engine)`, `createParticles(engine)` и `createRibbons(engine)`. Возвращаемая функция привязана к engine и сохраняет `init`, `create` и `version`:

```ts
import { createEngine } from "@tsparticles/engine";
import { createConfetti } from "@tsparticles/confetti";

const confetti = createConfetti(createEngine());
await confetti({ count: 30, spread: 70 });
```

`initPjs(engine)` возвращает `{ particlesJS, pJSDom, Particles }` и не помещает эти API в `globalThis`. `loadConfigs(engine)` явно регистрирует каталог и палитры в этой engine.

| Семейство wrapper                             | Владение и регистрация engine                                                                                                                                                 |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| React / Next.js                               | Передайте `engine` в `ParticlesProvider` и предоставьте registrar `init`, загружающий нужные plugins.                                                                         |
| Vue 3                                         | Установите particles provider с `{ engine, init }`; вызывайте `useParticlesProvider()` в дочерних компонентах.                                                                |
| Angular                                       | Передайте engine в `service.init(engine, registrar)` и используйте отдельный service provider для каждой независимой engine. Компоненты удобства получают `engine` как input. |
| Preact, Solid, Inferno, Svelte, Stencil, Riot | Передайте engine через API компонента/provider и вызовите `initParticlesEngine(engine, registrar)`, если доступно.                                                            |
| Qwik                                          | Создавайте и регистрируйте на клиенте, храните engine через `noSerialize`; не создавайте её при SSR.                                                                          |
| Custom elements                               | Устанавливайте `.engine` как свойство, а не сериализуемый HTML-атрибут.                                                                                                       |
| Nuxt 4                                        | Используйте `engine` и `registerParticles` из настроенного модуля инициализации.                                                                                              |

Сигнатуры и ограничения SSR описаны в README каждого wrapper. Не создавайте неявную module-level engine внутри provider.

Teardown компонента уничтожает только принадлежащий ему container. Приложение управляет сроком жизни общей engine: завершите ожидающие загрузки и уничтожьте containers до её удаления. Runtime-сервисы принадлежат каждой engine; настройте их до загрузки container:

```ts
const engine = createEngine();
engine.setRandom(myRandomFn);
engine.setLogger(myLogger);
engine.setAnimationFunctions(requestFrame, cancelFrame);
const container = await engine.load({ id: "particles", options });
```

Удалены прежние глобальные API `setParticlesRandom`, `getParticlesRandom`, `getParticlesRandomFn`, `setParticlesLogger` и `getParticlesLogger`. Используйте `engine.setRandom`, `engine.getRandom`, `engine.getRandomFn`, `engine.setLogger` и `engine.getLogger`. Пользовательские plugins получают владельца через `container.engine` или `container.pluginManager.engine`. Runtime helpers принимают явный источник случайных чисел; используйте стабильный `getRandomFn()` engine-владельца, чтобы последующая смена источника действовала только на неё. Планирование анимации также относится к engine; scheduler отменяет созданные им кадры container.

### Порядок инициализации

В wrappers с `initParticlesEngine` вызывайте `initParticlesEngine(engine, registrar)` при инициализации приложения. Компоненты могут монтироваться раньше: они ждут инициализации этой engine и не создают неявную engine. Для jQuery используйте `$.particles(engine).init(registrar)`. Providers React/Vue и инициализация Angular service выполняют аналогичный шаг. Ошибка регистрации отклоняет текущие ожидания, после чего инициализацию можно повторить.

## Точки входа модулей и браузера

Импортируйте корень пакета для стандартного ESM API. Используйте `/lazy`, если нужен отложенный entry point; динамическая загрузка не возвращает старый singleton. Проверки установленного пакета охватывают ESM `import`, CJS `require` и условие `browser` для root и `/lazy`.

В классическом браузерном выводе Rollup namespace содержит фабрики и feature loaders. Создайте engine после загрузки namespace-скрипта и передайте её каждому loader. Внешним feature-скриптам нужны соответствующая engine и общие зависимости; используйте согласованные версии и порядок из browser README bundle. Standalone bundle содержит выбранные features. Ни browser entry point, ни импорт корня пакета автоматически не создаёт engine.

## Границы пакетов и удалённые singleton API

Импортируйте runtime-типы и `createEngine` из `@tsparticles/engine`, затем только нужные feature-пакеты, например `@tsparticles/slim` или отдельный пакет interaction, shape либо updater. Пакеты удобства — отдельные adapters. Предпочитайте объявленные exports внутренним путям `dist` или исходникам другого пакета. Отчёт E10 по установленным пакетам — источник истины для проверок `exports`, деклараций и разрешения модулей.

Экспортируемый singleton engine и глобальные helpers изменения engine удалены. Замените `setParticlesRandom`, `getParticlesRandom`, `getParticlesRandomFn`, `setParticlesLogger` и `getParticlesLogger` соответствующими методами engine-владельца container. Если приложение использовало `tsParticles.load`, `tsParticles.loadJSON` или `tsParticles.dom`, вызывайте эти операции на явной engine или сохраните возвращённый container. Не обращайтесь к `window.tsParticles` из импортированного ESM/CJS-пакета; классические browser bundles отдельно предоставляют документированный namespace.
