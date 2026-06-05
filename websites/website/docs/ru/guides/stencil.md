---
title: Stencil Guide
description: Полное руководство по интеграции tsParticles с компонентами Stencil.
---

# Stencil Guide

## Содержание

1. [Установка](#установка)
2. [Регистрация пользовательских элементов](#регистрация-пользовательских-элементов)
3. [Базовое использование](#базовое-использование)
4. [Инициализация движка](#инициализация-движка)
5. [Пользовательская конфигурация](#пользовательская-конфигурация)
6. [Жизненный цикл компонента](#жизненный-цикл-компонента)
7. [Пример на TypeScript](#пример-на-typescript)

---

## Установка

Установите обёртку Stencil и движок tsParticles через npm:

```bash
npm install @tsparticles/stencil tsparticles
```

Опционально установите пакет пресета для уменьшения ручной конфигурации:

```bash
npm install @tsparticles/slim
```

---

## Регистрация пользовательских элементов

Пакет `@tsparticles/stencil` предоставляет функцию `defineCustomElements`, которая регистрирует пользовательский элемент `<stencil-particles>` в браузере. Вызовите её один раз перед использованием компонента где-либо в вашем приложении.

```tsx
import { defineCustomElements } from "@tsparticles/stencil/loader";

// Регистрация элемента <stencil-particles>
defineCustomElements();
```

Для проектов Stencil, использующих ленивую загрузку, вызовите это внутри `componentWillLoad` или в корневом компоненте вашего приложения, чтобы гарантировать доступность элемента до рендеринга.

---

## Базовое использование

После регистрации пользовательского элемента вы можете использовать `<stencil-particles>` в JSX с пропом `options` и колбэком `init` для загрузки необходимых функций движка.

```tsx
import { Component, h } from "@stencil/core";
import type { ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const options: ISourceOptions = {
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

@Component({ tag: "my-particles" })
export class MyParticles {
  render() {
    return (
      <stencil-particles
        container-id="tsparticles"
        options={options}
        init={async (engine) => {
          await loadSlim(engine);
        }}
      />
    );
  }
}
```

---

## Инициализация движка

Проп `init` получает экземпляр движка и позволяет загрузить необходимые функции. Это рекомендуемое место для вызова `loadSlim`, `loadFull` или отдельных плагинов обновлений/взаимодействий.

```tsx
import { loadSlim } from "@tsparticles/slim";
import { loadFull } from "tsparticles";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";

// Вариант A: лёгкий (круги, базовое движение, связи)
init={async engine => { await loadSlim(engine); }}

// Вариант B: полный набор (все формы, эффекты, пресеты)
init={async engine => { await loadFull(engine); }}

// Вариант C: пресеты (конфетти, фейерверк, снег, звёзды)
init={async engine => { await loadConfettiPreset(engine); }}
```

Экземпляр движка также доступен после инициализации через атрибут `container-id`, позволяя программно управлять системой частиц позже при необходимости.

---

## Пользовательская конфигурация

Ниже представлена полная конфигурация с интерактивностью, множеством типов форм и режимами наведения/клика.

```tsx
import { Component, h } from "@stencil/core";
import type { ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const fullOptions: ISourceOptions = {
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
  background: {
    color: "#0f0f23",
  },
};

@Component({ tag: "app-particles" })
export class AppParticles {
  render() {
    return (
      <stencil-particles
        container-id="tsparticles"
        options={fullOptions}
        init={async (engine) => {
          await loadSlim(engine);
        }}
      />
    );
  }
}
```

---

## Жизненный цикл компонента

В Stencil рекомендуемый хук жизненного цикла для одноразовой настройки — `componentWillLoad`. Используйте его для регистрации пользовательских элементов и управления состоянием инициализации, чтобы компонент `<stencil-particles>` рендерился только после подготовки движка.

```tsx
import { Component, h, State } from "@stencil/core";
import type { ISourceOptions } from "@tsparticles/engine";
import { defineCustomElements } from "@tsparticles/stencil/loader";
import { loadSlim } from "@tsparticles/slim";

@Component({ tag: "app-root" })
export class AppRoot {
  @State() private engineReady = false;

  private options: ISourceOptions = {
    particles: {
      number: { value: 50 },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.6 },
      size: { value: { min: 1, max: 4 } },
      move: {
        enable: true,
        speed: 1,
        outModes: { default: "bounce" },
      },
    },
    background: { color: "#1a1a2e" },
  };

  componentWillLoad() {
    defineCustomElements();
    this.engineReady = true;
  }

  render() {
    return (
      <div>
        <h1>tsParticles + Stencil</h1>
        {this.engineReady && (
          <stencil-particles
            container-id="tsparticles"
            options={this.options}
            init={async (engine) => {
              await loadSlim(engine);
            }}
          />
        )}
      </div>
    );
  }
}
```

Использование `@State()` гарантирует повторный рендер компонента, когда движок становится готов, а условный рендеринг предотвращает монтирование контейнера частиц до определения пользовательского элемента.

---

## Пример на TypeScript

Вот полный типизированный компонент приложения Stencil, который интегрирует tsParticles с slim-пресетом, интерактивностью при наведении и пользовательской тёмной темой.

```tsx
import { Component, h, State, Prop } from "@stencil/core";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { defineCustomElements } from "@tsparticles/stencil/loader";
import { loadSlim } from "@tsparticles/slim";

@Component({
  tag: "app-home",
  styleUrl: "app-home.css",
  shadow: true,
})
export class AppHome {
  @State() private initialized = false;

  @Prop() readonly title: string = "Добро пожаловать";

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

  componentWillLoad() {
    defineCustomElements();
    this.initialized = true;
  }

  private handleInit = async (engine: Engine): Promise<void> => {
    await loadSlim(engine);
  };

  private handleLoaded = async (container?: Container): Promise<void> => {
    this.container = container;
    console.log("Контейнер частиц загружен:", container?.id);
  };

  render() {
    return (
      <div class="home">
        <h1>{this.title}</h1>
        <p>На базе tsParticles и Stencil</p>

        {this.initialized && (
          <stencil-particles
            container-id="tsparticles"
            options={this.options}
            init={this.handleInit}
            particlesLoaded={this.handleLoaded}
          />
        )}
      </div>
    );
  }
}
```

Событие `particlesLoaded` срабатывает после рендеринга первого кадра, предоставляя доступ к экземпляру `Container` для программного управления (воспроизведение, пауза, остановка, переключение тем).

---

Теперь у вас есть всё необходимое для интеграции tsParticles в приложение Stencil. Каждый пример самодостаточен и готов к копированию в ваш проект.
