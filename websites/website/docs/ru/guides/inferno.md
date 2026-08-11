---
title: Inferno Guide
description: Полное руководство по интеграции tsParticles с приложениями Inferno.
---

# Inferno Guide

## Содержание

1. [Установка](#установка)
2. [Базовое использование](#базовое-использование)
3. [Инициализация движка](#инициализация-движка)
4. [Пользовательская конфигурация](#пользовательская-конфигурация)
5. [Использование пресетов](#использование-пресетов)
6. [Паттерн компонента](#паттерн-компонента)
7. [Пример на TypeScript](#пример-на-typescript)

---

## Установка

Установите обёртку Inferno и движок tsParticles через npm:

```bash
npm install @tsparticles/inferno tsparticles
```

Опционально установите slim-пресет для уменьшения размера сборки:

```bash
npm install @tsparticles/slim
```

---

## Базовое использование

Пакет `@tsparticles/inferno` экспортирует два элемента: `ParticlesProvider` и `Particles`. Оберните ваши компоненты частиц с `ParticlesProvider`, который принимает колбэк `init` для настройки движка, затем используйте `<Particles>` для отрисовки canvas частиц.

```tsx
import { render } from "inferno";
import { Particles, ParticlesProvider } from "@tsparticles/inferno";
import { loadSlim } from "@tsparticles/slim";

const options = {
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

function App() {
  return (
    <ParticlesProvider
      init={async (engine) => {
        await loadSlim(engine);
      }}
    >
      <Particles id="tsparticles" options={options} />
    </ParticlesProvider>
  );
}

render(<App />, document.getElementById("app"));
```

`ParticlesProvider` должен быть предком каждого компонента `<Particles>`. Он инициализирует движок один раз и предоставляет его через контекст всем дочерним элементам.

---

## Инициализация движка

`ParticlesProvider` принимает проп `init`, который получает экземпляр движка. Здесь вы загружаете функции, формы, пресеты или апдейты, необходимые вашему приложению.

```tsx
// Лёгкий — круглые частицы, базовое движение, связи
<ParticlesProvider init={async engine => {
  const { loadSlim } = await import("@tsparticles/slim");
  await loadSlim(engine);
}}>

// Полный набор — все формы, взаимодействия, эффекты
<ParticlesProvider init={async engine => {
  const { loadFull } = await import("tsparticles");
  await loadFull(engine);
}}>

// Конкретный пресет — конфетти, фейерверк, снег, звёзды
<ParticlesProvider init={async engine => {
  const { loadConfettiPreset } = await import("@tsparticles/preset-confetti");
  await loadConfettiPreset(engine);
}}>
```

Использование динамического `import()` внутри колбэка включает разделение кода: модули пресетов или функций загружаются только при монтировании компонента частиц.

---

## Пользовательская конфигурация

Ниже представлена полнофункциональная конфигурация с интерактивностью, множеством типов форм и тёмным градиентным фоном.

```tsx
import { render } from "inferno";
import { Particles, ParticlesProvider } from "@tsparticles/inferno";
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
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

function App() {
  return (
    <ParticlesProvider
      init={async (engine) => {
        const { loadSlim } = await import("@tsparticles/slim");
        await loadSlim(engine);
      }}
    >
      <Particles id="tsparticles" options={options} />
    </ParticlesProvider>
  );
}

render(<App />, document.getElementById("app"));
```

---

## Использование пресетов

Пакет `@tsparticles/configs` предлагает готовые конфигурации, которые можно передать напрямую в проп `options`. Комбинируйте их с соответствующим загрузчиком пресетов в колбэке `ParticlesProvider`.

```tsx
import { render } from "inferno";
import { Particles, ParticlesProvider } from "@tsparticles/inferno";
import configs from "@tsparticles/configs";

function App() {
  return (
    <ParticlesProvider
      init={async (engine) => {
        const { loadFull } = await import("tsparticles");
        await loadFull(engine);
      }}
    >
      <Particles id="tsparticles" options={configs.confetti} />
    </ParticlesProvider>
  );
}

render(<App />, document.getElementById("app"));
```

Вы можете заменить `configs.confetti` на любой доступный пресет: `configs.basic`, `configs.fireworks`, `configs.snow`, `configs.stars` и т.д.

---

## Паттерн компонента

Для больших приложений структурируйте логику частиц в отдельный компонент с колбэком `particlesLoaded` для доступа к экземпляру `Container`.

```tsx
import { render, Component } from "inferno";
import { Particles, ParticlesProvider } from "@tsparticles/inferno";
import type { Container, ISourceOptions } from "@tsparticles/engine";

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

class ParticlesBackground extends Component {
  private container?: Container;

  handleParticlesLoaded(container?: Container) {
    this.container = container;
    console.log("Частицы загружены:", container?.id);
  }

  render() {
    return (
      <ParticlesProvider
        init={async (engine) => {
          const { loadSlim } = await import("@tsparticles/slim");
          await loadSlim(engine);
        }}
      >
        <Particles id="tsparticles" options={options} particlesLoaded={this.handleParticlesLoaded} />
      </ParticlesProvider>
    );
  }
}

function App() {
  return (
    <div>
      <h1 style={{ position: "relative", zIndex: 1, color: "#fff" }}>tsParticles + Inferno</h1>
      <ParticlesBackground />
    </div>
  );
}

render(<App />, document.getElementById("app"));
```

---

## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## Пример на TypeScript

Вот полное типизированное приложение Inferno с адаптивной конфигурацией частиц и полноэкранным фоном.

```tsx
import { render } from "inferno";
import { Particles, ParticlesProvider } from "@tsparticles/inferno";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

const particlesOptions: ISourceOptions = {
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

function handleInit(engine: Engine): Promise<void> {
  return import("@tsparticles/slim").then(({ loadSlim }) => loadSlim(engine));
}

function handleParticlesLoaded(container?: Container): void {
  console.log("Контейнер tsParticles готов:", container?.id);
}

function App() {
  return (
    <ParticlesProvider init={handleInit}>
      <div style={{ position: "relative", zIndex: 1, color: "#fff", textAlign: "center", paddingTop: "2rem" }}>
        <h1>tsParticles + Inferno</h1>
        <p>Полноценная интеграция TypeScript</p>
      </div>
      <Particles id="tsparticles" options={particlesOptions} particlesLoaded={handleParticlesLoaded} />
    </ParticlesProvider>
  );
}

render(<App />, document.getElementById("app"));
```

---

Теперь у вас есть всё необходимое для интеграции tsParticles в приложение Inferno. Каждый пример самодостаточен и готов к копированию в ваш проект.
