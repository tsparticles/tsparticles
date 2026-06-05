# Web Components

Используйте tsParticles с нативными веб-компонентами через пакет `@tsparticles/webcomponents`. Этот подход не требует фреймворка — только чистый JavaScript и пользовательские элементы.

## Установка

### Через CDN

Подключите ядро tsParticles и сборку веб-компонентов:

```html
<script src="https://cdn.jsdelivr.net/npm/tsparticles@4/tsparticles.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/webcomponents@4/tsparticles.webcomponents.min.js"></script>
```

### Через npm + сборка

```bash
npm install @tsparticles/webcomponents tsparticles
```

Затем импортируйте в ваш JavaScript-бандл:

```javascript
import { initParticlesEngine, defineParticlesElement } from "@tsparticles/webcomponents";
```

## Инициализация движка

Перед тем как элемент `<web-particles>` сможет рендериться, движок должен быть инициализирован с необходимыми функциями. Вызовите `initParticlesEngine` с колбэком, который загружает нужные плагины:

```javascript
import { initParticlesEngine } from "@tsparticles/webcomponents";

const { loadFull } = await import("tsparticles");

await initParticlesEngine(async (engine) => {
  await loadFull(engine);
});
```

> **Зачем `loadFull`?** Он регистрирует все встроенные формы (круг, квадрат, многоугольник, изображение и т.д.), взаимодействия (наведение, клик) и обновления (прозрачность, размер, цвет и т.д.). Для меньшей сборки используйте `tsparticles-slim` или выбирайте отдельные плагины.

## Определение пользовательского элемента

После инициализации движка зарегистрируйте пользовательский элемент `<web-particles>`:

```javascript
import { defineParticlesElement } from "@tsparticles/webcomponents";

defineParticlesElement();
```

Это регистрирует тег `web-particles` в `CustomElementRegistry` браузера. Безопасно вызывать несколько раз — дублирующие регистрации игнорируются.

## Базовое использование

После выполнения `initParticlesEngine` и `defineParticlesElement` используйте элемент напрямую в HTML:

```html
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>tsParticles Web Components</title>
  </head>
  <body>
    <web-particles id="tsparticles"></web-particles>

    <script type="module">
      import { initParticlesEngine, defineParticlesElement } from "@tsparticles/webcomponents";

      const { loadFull } = await import("tsparticles");

      await initParticlesEngine(async (engine) => {
        await loadFull(engine);
      });

      defineParticlesElement();

      const el = document.getElementById("tsparticles");
      el.options = {
        background: { color: "#0d47a1" },
        particles: {
          number: { value: 80 },
          links: { enable: true, color: "#ffffff" },
          move: { enable: true, speed: 2 },
        },
      };
    </script>
  </body>
</html>
```

## Пользовательская конфигурация

Элемент `<web-particles>` принимает конфигурацию через свойство `options` (объект JavaScript) или через JSON в атрибуте `options`.

### Через JavaScript-свойство

```javascript
const el = document.querySelector("web-particles");
el.options = {
  background: { color: "#000000" },
  fpsLimit: 60,
  particles: {
    color: { value: ["#ff0000", "#00ff00", "#0000ff"] },
    links: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
    },
    move: {
      enable: true,
      speed: 3,
      outModes: "bounce",
    },
    number: { value: 60 },
    opacity: { value: 0.6 },
    shape: { type: ["circle", "square"] },
    size: { value: { min: 2, max: 6 } },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "repulse" },
      onClick: { enable: true, mode: "push" },
    },
    modes: {
      repulse: { distance: 200 },
      push: { quantity: 4 },
    },
  },
};
```

### Через HTML-атрибут (JSON)

```html
<web-particles
  id="tsparticles"
  options='{
    "background": { "color": "#0d47a1" },
    "particles": {
      "number": { "value": 50 },
      "links": { "enable": true, "color": "#ffffff" },
      "move": { "enable": true, "speed": 2 }
    }
  }'
></web-particles>
```

> При использовании атрибута `options` значение должно быть валидным JSON. Для сложных конфигураций предпочтительнее присваивание свойства.

## Динамическое создание

Вы можете создавать элементы `<web-particles>` полностью в JavaScript и добавлять их в DOM в любое время:

```javascript
import { initParticlesEngine, defineParticlesElement } from "@tsparticles/webcomponents";

const { loadFull } = await import("tsparticles");

await initParticlesEngine(async (engine) => {
  await loadFull(engine);
});

defineParticlesElement();

function createParticles(container, config) {
  const el = document.createElement("web-particles");
  el.id = "dynamic-particles";
  el.style.position = "absolute";
  el.style.width = "100%";
  el.style.height = "100%";
  el.style.top = "0";
  el.style.left = "0";
  el.options = config;
  container.appendChild(el);
  return el;
}

// Использование
const particles = createParticles(document.body, {
  background: { color: "#1a1a2e" },
  particles: {
    number: { value: 100 },
    links: { enable: true, color: "#e94560" },
    move: { enable: true, speed: 1 },
  },
});
```

## Расширение пользовательского элемента

Вы можете создать подкласс `ParticlesElement` для создания собственного пользовательского элемента со встроенной конфигурацией:

```javascript
import { initParticlesEngine, ParticlesElement } from "@tsparticles/webcomponents";

const { loadFull } = await import("tsparticles");

await initParticlesEngine(async (engine) => {
  await loadFull(engine);
});

class MyParticlesBackground extends ParticlesElement {
  constructor() {
    super();
    this.style.position = "fixed";
    this.style.top = "0";
    this.style.left = "0";
    this.style.width = "100%";
    this.style.height = "100%";
    this.style.zIndex = "-1";
  }

  connectedCallback() {
    this.options = {
      background: { color: "#0d47a1" },
      particles: {
        number: { value: 80 },
        links: { enable: true, color: "#ffffff" },
        move: { enable: true, speed: 2 },
      },
    };
    super.connectedCallback();
  }
}

customElements.define("my-particles-bg", MyParticlesBackground);
```

Использование:

```html
<my-particles-bg></my-particles-bg>
```

## Доступ к контейнеру и управление

Пользовательский элемент предоставляет экземпляр `Container` tsParticles для императивного управления:

```javascript
const el = document.querySelector("web-particles");

// Доступ к контейнеру (доступен после connectedCallback)
const container = el.container;
container?.pause();
container?.play();

// Уничтожение и очистка
el.dispose();
```

## Полный пример

Полная HTML-страница с использованием модуля веб-компонентов через CDN-скрипты:

```html
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>tsParticles Web Components Демо</title>
    <style>
      body {
        margin: 0;
        overflow: hidden;
      }
      web-particles {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
      .content {
        position: relative;
        z-index: 1;
        color: white;
        text-align: center;
        padding-top: 20vh;
        font-family: sans-serif;
      }
    </style>
  </head>
  <body>
    <div class="content">
      <h1>tsParticles + Web Components</h1>
      <p>Нативные пользовательские элементы, фреймворк не требуется.</p>
    </div>

    <web-particles id="tsparticles"></web-particles>

    <script type="module">
      import {
        initParticlesEngine,
        defineParticlesElement,
      } from "https://cdn.jsdelivr.net/npm/@tsparticles/webcomponents@4/tsparticles.webcomponents.min.js";

      const tsParticles = window.tPparticles;

      await initParticlesEngine(async (engine) => {
        await tsParticles.loadFull(engine);
      });

      defineParticlesElement();

      const el = document.getElementById("tsparticles");
      el.options = {
        background: { color: "#0d47a1" },
        fpsLimit: 60,
        particles: {
          number: { value: 100 },
          color: { value: "#ffffff" },
          links: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
          },
          move: {
            enable: true,
            speed: 2,
            outModes: "out",
          },
          size: {
            value: { min: 1, max: 4 },
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "grab" },
            onClick: { enable: true, mode: "push" },
          },
          modes: {
            grab: { distance: 200, links: { opacity: 0.5 } },
            push: { quantity: 4 },
          },
        },
      };
    </script>
  </body>
</html>
```

## Справочник API

| Экспорт / Свойство              | Тип                      | Описание                                                  |
| ------------------------------- | ------------------------ | --------------------------------------------------------- |
| `initParticlesEngine(callback)` | `function`               | Инициализация движка tsParticles с загрузчиками плагинов  |
| `defineParticlesElement()`      | `function`               | Регистрация пользовательского элемента `<web-particles>`  |
| `ParticlesElement`              | `class`                  | Базовый класс для расширения пользовательскими элементами |
| `element.options`               | `ISourceOptions`         | Получить/установить объект конфигурации частиц            |
| `element.container`             | `Container \| undefined` | Ссылка только для чтения на базовый `Container`           |
| `element.dispose()`             | `function`               | Уничтожить экземпляр частиц и очистить ресурсы            |
