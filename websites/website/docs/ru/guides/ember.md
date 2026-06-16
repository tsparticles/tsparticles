---
title: Ember Guide
description: Полное руководство по интеграции tsParticles с приложениями Ember.js.
---

# Ember Guide

## Содержание

1. [Установка](#установка)
2. [Инициализация движка](#инициализация-движка)
3. [Базовое использование](#базовое-использование)
4. [Пользовательская конфигурация](#пользовательская-конфигурация)
5. [Обработка событий](#обработка-событий)
6. [Условный рендеринг](#условный-рендеринг)
7. [Пример на TypeScript](#пример-на-typescript)

---

## Установка

Установите Ember-аддон и движок tsParticles через ember-cli:

```bash
ember install @tsparticles/ember
```

Это установит аддон и его зависимость `tsparticles`. При необходимости можно добавить пакеты пресетов:

```bash
npm install @tsparticles/slim
```

---

## Инициализация движка

Аддон экспортирует утилиту `initParticlesEngine`, которую нужно вызвать один раз на уровне приложения. Она принимает асинхронный колбэк, в котором загружаются необходимые функции, пресеты или формы.

```typescript
import { initParticlesEngine } from "@tsparticles/ember/utils/init-particles-engine";
import { loadFull } from "tsparticles";

// Вызовите это во время загрузки приложения
if (typeof window !== "undefined") {
  void initParticlesEngine(async (engine) => {
    await loadFull(engine);
  });
}
```

Типичные места для этого вызова — хук `beforeModel` маршрута приложения, конструктор контроллера приложения или инициализатор экземпляра. Синглтон движка инициализируется один раз и используется всеми компонентами `<Particles>` в вашем приложении.

---

## Базовое использование

После инициализации движка используйте компонент `<Particles>` в любом шаблоне. Передайте конфигурацию частиц через аргумент `@options`.

```hbs
{{! app/templates/application.hbs }}

<Particles @options={{this.options}} />
```

```typescript
// app/controllers/application.ts
import Controller from "@ember/controller";
import type { ISourceOptions } from "@tsparticles/engine";

export default class ApplicationController extends Controller {
  options: ISourceOptions = {
    fpsLimit: 60,
    particles: {
      number: { value: 80 },
      color: { value: "#00d4ff" },
      shape: { type: "circle" },
      opacity: { value: 0.6 },
      size: { value: { min: 2, max: 5 } },
      links: {
        enable: true,
        distance: 150,
        color: "#00d4ff",
        opacity: 0.3,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1.5,
        direction: "none",
        random: true,
        outModes: { default: "bounce" },
      },
    },
    background: { color: "#0d1117" },
  };
}
```

---

## Пользовательская конфигурация

Создайте более насыщенную конфигурацию с интерактивностью, множеством форм и адаптивной плотностью.

```typescript
import Controller from "@ember/controller";
import type { ISourceOptions } from "@tsparticles/engine";

export default class IndexController extends Controller {
  options: ISourceOptions = {
    fullScreen: { enable: true, zIndex: -1 },
    fpsLimit: 60,
    particles: {
      number: {
        value: 60,
        density: { enable: true, width: 800, height: 800 },
      },
      color: {
        value: ["#ff6b6b", "#feca57", "#48dbfb", "#ff9ff3", "#54a0ff"],
      },
      shape: {
        type: ["circle", "triangle", "polygon"],
        options: {
          polygon: { sides: 6 },
        },
      },
      opacity: { value: { min: 0.4, max: 0.8 } },
      size: { value: { min: 3, max: 8 } },
      links: {
        enable: true,
        distance: 200,
        color: "#ffffff",
        opacity: 0.15,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: true,
        straight: false,
        outModes: { default: "out" },
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "attract" },
        onClick: { enable: true, mode: "repulse" },
      },
      modes: {
        attract: { distance: 200, duration: 0.4, factor: 1 },
        repulse: { distance: 200, duration: 0.4 },
      },
    },
    background: { color: "#0f0f23" },
  };
}
```

```hbs
<Particles @options={{this.options}} />
```

---

## Обработка событий

Компонент `<Particles>` генерирует действие `@particlesLoaded`, когда контейнер завершил инициализацию и первый кадр отрисован. Используйте это для доступа к экземпляру `Container` для программного управления.

```typescript
import Controller from "@ember/controller";
import { action } from "@ember/object";
import type { Container, ISourceOptions } from "@tsparticles/engine";

export default class ApplicationController extends Controller {
  options: ISourceOptions = {
    /* ... */
  };

  @action
  loadedCallback(container: Container) {
    console.log("Частицы загружены", container?.id);

    // Пример программного управления:
    setTimeout(() => {
      container.pause();
      console.log("Частицы приостановлены через 5 секунд");
    }, 5000);
  }
}
```

```hbs
<Particles @options={{this.options}} @particlesLoaded={{this.loadedCallback}} />
```

Вы также можете использовать шаблон колбэка встроенно с хелпером шаблона, если предпочитаете не определять отдельное действие.

---

## Условный рендеринг

Используйте хелпер `{{if}}` вместе с `@tracked` свойством для управления рендерингом компонента `<Particles>`. Это полезно, когда инициализация движка асинхронна и вы хотите избежать рендеринга компонента до готовности движка.

```typescript
import Controller from "@ember/controller";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { initParticlesEngine } from "@tsparticles/ember/utils/init-particles-engine";
import { loadSlim } from "@tsparticles/slim";

export default class ApplicationController extends Controller {
  @tracked engineReady = false;

  options: ISourceOptions = {
    particles: {
      number: { value: 50 },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.6 },
      size: { value: { min: 1, max: 4 } },
      move: { enable: true, speed: 1, outModes: { default: "bounce" } },
    },
    background: { color: "#1a1a2e" },
  };

  constructor(...args: any[]) {
    super(...args);
    if (typeof window !== "undefined") {
      void initParticlesEngine(async (engine: Engine) => {
        await loadSlim(engine);
      }).then(() => {
        this.engineReady = true;
      });
    }
  }
}
```

```hbs
{{#if this.engineReady}}
  <Particles @options={{this.options}} @particlesLoaded={{this.loadedCallback}} />
{{else}}
  <p>Загрузка частиц...</p>
{{/if}}
```

Декоратор `@tracked` гарантирует автоматический повторный рендеринг шаблона после разрешения промиса.

---


## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## Пример на TypeScript

Ниже представлен полный типизированный контроллер приложения Ember, демонстрирующий интеграцию с slim-пресетом, интерактивностью и управлением жизненным циклом.

```typescript
// app/controllers/application.ts
import Controller from "@ember/controller";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { initParticlesEngine } from "@tsparticles/ember/utils/init-particles-engine";
import { loadSlim } from "@tsparticles/slim";

export default class ApplicationController extends Controller {
  @tracked private engineReady = false;

  private container?: Container;

  private readonly options: ISourceOptions = {
    fullScreen: { enable: true, zIndex: -1 },
    fpsLimit: 60,
    particles: {
      number: { value: 80, density: { enable: true } },
      color: { value: "#6366f1" },
      shape: { type: "circle" },
      opacity: { value: { min: 0.3, max: 0.7 } },
      size: { value: { min: 2, max: 6 } },
      links: {
        enable: true,
        distance: 160,
        color: "#6366f1",
        opacity: 0.25,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1.2,
        direction: "none",
        random: false,
        straight: false,
        outModes: { default: "bounce" },
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
        onClick: { enable: true, mode: "push" },
      },
      modes: {
        grab: { distance: 180, links: { opacity: 0.6 } },
        push: { quantity: 3 },
      },
    },
    background: { color: "#0a0a1a" },
  };

  constructor(...args: any[]) {
    super(...args);
    if (typeof window !== "undefined") {
      void initParticlesEngine(async (engine: Engine) => {
        await loadSlim(engine);
      }).then(() => {
        this.engineReady = true;
      });
    }
  }

  @action
  private handleParticlesLoaded(container?: Container): void {
    this.container = container;
    console.log("Частицы загружены в контейнер:", container?.id);
  }
}
```

```hbs
{{! app/templates/application.hbs }}

{{#if this.engineReady}}
  <div class="app-container">
    <h1>tsParticles + Ember</h1>
    <Particles @options={{this.options}} @particlesLoaded={{this.handleParticlesLoaded}} />
  </div>
{{else}}
  <div class="loading">
    <p>Инициализация движка частиц...</p>
  </div>
{{/if}}
```

---

Теперь у вас есть всё необходимое для интеграции tsParticles в приложение Ember.js. Каждый пример самодостаточен и готов к копированию в ваш проект.
