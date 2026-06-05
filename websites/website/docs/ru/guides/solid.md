---
title: Интеграция с SolidJS
description: Пошаговое руководство по интеграции tsParticles в приложение SolidJS с использованием официальной обёртки @tsparticles/solid.
---

# Интеграция с SolidJS

В этом руководстве рассматривается интеграция tsParticles в проект **SolidJS** с использованием официальной обёртки `@tsparticles/solid`. Тонкозернистая реактивность SolidJS хорошо работает с tsParticles — изменения опций вызывают целевые обновления canvas без полной переинициализации.

## Установка

Установите обёртку SolidJS и выбранную сборку движка:

```bash
npm install @tsparticles/solid tsparticles
```

Для меньшей сборки используйте `@tsparticles/slim`:

```bash
npm install @tsparticles/solid @tsparticles/slim
```

## Базовое использование

SolidJS работает полностью в браузере (без SSR), поэтому вам не нужно защищаться от серверного рендеринга. Однако движок должен быть инициализирован асинхронно перед рендерингом частиц.

Используйте `initParticlesEngine` внутри `onMount` для загрузки функций движка, затем условно рендерите компонент `<Particles>` с `<Show>`:

```tsx
import { loadFull } from "tsparticles";
import { createSignal, Show, onMount } from "solid-js";
import type { Component } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

const App: Component = () => {
  const [initialized, setInitialized] = createSignal(false);

  onMount(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    }).then(() => setInitialized(true));
  });

  const options: ISourceOptions = {
    fullScreen: { zIndex: -1 },
    background: { color: "#0d47a1" },
    particles: {
      number: { value: 80 },
      links: { enable: true, color: "#ffffff" },
      move: { enable: true },
      size: { value: 3 },
    },
  };

  return (
    <Show when={initialized()}>
      <Particles id="tsparticles" options={options} />
    </Show>
  );
};

export default App;
```

Компонент `<Show>` гарантирует, что элемент `<Particles>` вставляется в DOM только после готовности движка.

## Инициализация движка

Функция `initParticlesEngine` принимает колбэк, который получает экземпляр `Engine`. Используйте этот колбэк для регистрации функций, необходимых вашей конфигурации:

```tsx
import { initParticlesEngine } from "@tsparticles/solid";
import { loadFull } from "tsparticles";
import { loadSlim } from "@tsparticles/slim";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";
import type { Engine } from "@tsparticles/engine";

// Минимально — только базовые формы и движение
initParticlesEngine((engine: Engine) => loadSlim(engine)).then(() => {
  console.log("Движок готов (slim)");
});

// Полный — все функции включены
initParticlesEngine((engine: Engine) => loadFull(engine)).then(() => {
  console.log("Движок готов (full)");
});

// Только пресет — только функции, необходимые для конкретного пресета
initParticlesEngine((engine: Engine) => loadConfettiPreset(engine)).then(() => {
  console.log("Пресет конфетти загружен");
});
```

Вызовите `initParticlesEngine` один раз в вашем приложении — обычно в `onMount` корневого компонента. Экземпляр движка кешируется, поэтому последующие вызовы возвращаются немедленно.

## Условный рендеринг

Используйте управляющий поток `<Show>` SolidJS для отложенного рендеринга до инициализации движка:

```tsx
import { createSignal, Show, onMount } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import { loadFull } from "tsparticles";
import type { Engine } from "@tsparticles/engine";
import type { Component } from "solid-js";

const App: Component = () => {
  const [ready, setReady] = createSignal(false);

  onMount(() => {
    initParticlesEngine((engine: Engine) => loadFull(engine)).then(() => setReady(true));
  });

  return (
    <Show when={ready()} fallback={<p>Загрузка частиц...</p>}>
      <Particles
        id="tsparticles"
        options={{
          fullScreen: { zIndex: -1 },
          particles: { number: { value: 50 }, move: { enable: true } },
        }}
      />
    </Show>
  );
};
```

Проп `fallback` показывает индикатор загрузки во время инициализации движка.

## Использование пресетов

Используйте `@tsparticles/configs` для быстрых, готовых конфигураций:

```bash
npm install @tsparticles/configs
```

```tsx
import configs from "@tsparticles/configs";
import { loadFull } from "tsparticles";
import { createSignal, Show, onMount } from "solid-js";
import type { Component } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import type { Engine } from "@tsparticles/engine";

const App: Component = () => {
  const [ready, setReady] = createSignal(false);

  onMount(() => {
    initParticlesEngine((engine: Engine) => loadFull(engine)).then(() => setReady(true));
  });

  return (
    <Show when={ready()}>
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <Particles id="basic" options={configs.basic} />
        <Particles id="bubbles" options={configs.bubbles} />
      </div>
    </Show>
  );
};

export default App;
```

Доступные конфиги: `basic`, `bubbles`, `snow`, `stars`, `fireworks`, `confetti`, `links` и другие.

## Интерактивные частицы

Добавьте взаимодействия по клику и наведению, настроив раздел `interactivity`:

```tsx
import { loadFull } from "tsparticles";
import { createSignal, Show, onMount } from "solid-js";
import type { Component } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

const App: Component = () => {
  const [ready, setReady] = createSignal(false);

  onMount(() => {
    initParticlesEngine((engine: Engine) => loadFull(engine)).then(() => setReady(true));
  });

  const options: ISourceOptions = {
    fullScreen: { zIndex: -1 },
    particles: {
      number: { value: 60 },
      links: { enable: true, distance: 150 },
      move: { enable: true, speed: 2 },
      size: { value: { min: 1, max: 4 } },
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

  return (
    <Show when={ready()}>
      <Particles id="interactive" options={options} />
    </Show>
  );
};

export default App;
```

- **Режимы наведения**: `grab`, `bubble`, `repulse`, `attract`, `slow`, `connect`
- **Режимы клика**: `push`, `remove`, `repulse`, `bubble`, `attract`, `pause`

## Пользовательская конфигурация

Полная пользовательская конфигурация с множеством форм частиц, цветовых палитр и настроек движения:

```tsx
import { loadFull } from "tsparticles";
import { createSignal, Show, onMount } from "solid-js";
import type { Component } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

const App: Component = () => {
  const [ready, setReady] = createSignal(false);

  onMount(() => {
    initParticlesEngine((engine: Engine) => loadFull(engine)).then(() => setReady(true));
  });

  const options: ISourceOptions = {
    fullScreen: { zIndex: -1 },
    background: { color: "#0a0a23" },
    fpsLimit: 60,
    particles: {
      color: {
        value: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"],
      },
      move: {
        enable: true,
        speed: 1.5,
        direction: "none",
        random: true,
        straight: false,
        outModes: "bounce",
        attract: { enable: true, rotateX: 600, rotateY: 1200 },
      },
      number: {
        value: 40,
        density: { enable: true },
      },
      opacity: {
        value: { min: 0.3, max: 0.8 },
        animation: {
          enable: true,
          speed: 0.5,
          sync: false,
        },
      },
      size: {
        value: { min: 2, max: 8 },
        animation: {
          enable: true,
          speed: 2,
          sync: false,
        },
      },
      links: {
        enable: true,
        distance: 200,
        color: "#ffffff",
        opacity: 0.3,
        width: 1,
      },
      shape: {
        type: ["circle", "square", "triangle", "polygon"],
        options: {
          polygon: { sides: 6 },
        },
      },
      twinkle: {
        particles: {
          enable: true,
          frequency: 0.05,
          opacity: 1,
        },
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" },
        onClick: { enable: true, mode: "bubble" },
      },
      modes: {
        repulse: { distance: 120 },
        bubble: { distance: 200, size: 10, opacity: 0.8 },
      },
    },
    detectRetina: true,
  };

  return (
    <Show when={ready()}>
      <Particles id="custom" options={options} />
    </Show>
  );
};

export default App;
```

## Полный пример TypeScript

Полный типизированный компонент с ссылкой на контейнер, инициализацией движка и ручным управлением:

```tsx
import { loadFull } from "tsparticles";
import { createSignal, Show, onMount } from "solid-js";
import type { Component } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

const App: Component = () => {
  const [ready, setReady] = createSignal(false);
  const [container, setContainer] = createSignal<Container | undefined>(undefined);
  const [paused, setPaused] = createSignal(false);

  onMount(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    }).then(() => setReady(true));
  });

  const options: ISourceOptions = {
    fullScreen: { zIndex: -1 },
    background: { color: "#1a1a2e" },
    particles: {
      color: { value: "#e94560" },
      number: { value: 80 },
      links: { enable: true, color: "#e94560", distance: 150 },
      move: { enable: true, speed: 2 },
      size: { value: { min: 1, max: 5 } },
    },
  };

  const particlesLoaded = (c: Container) => {
    setContainer(c);
  };

  const togglePause = () => {
    const c = container();
    if (c) {
      if (paused()) {
        c.play();
      } else {
        c.pause();
      }
      setPaused(!paused());
    }
  };

  return (
    <Show when={ready()}>
      <Particles id="full-example" options={options} particlesLoaded={particlesLoaded} />
      <button
        onClick={togglePause}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 10,
          padding: "8px 16px",
        }}
      >
        {paused() ? "Возобновить" : "Пауза"}
      </button>
    </Show>
  );
};

export default App;
```

## Динамические опции с сигналами

Одно из преимуществ SolidJS — тонкозернистая реактивность: вы можете использовать сигналы для управления опциями частиц, и canvas будет эффективно обновляться:

```tsx
import { loadFull } from "tsparticles";
import { createSignal, Show, onMount } from "solid-js";
import type { Component } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

const App: Component = () => {
  const [ready, setReady] = createSignal(false);
  const [color, setColor] = createSignal("#ff0000");
  const [particleCount, setParticleCount] = createSignal(60);

  onMount(() => {
    initParticlesEngine((engine: Engine) => loadFull(engine)).then(() => setReady(true));
  });

  // опции — обычный объект; он будет реактивно читаться
  // через внутреннее отслеживание компонента Particles
  const options = (): ISourceOptions => ({
    fullScreen: { zIndex: -1 },
    background: { color: "#000" },
    particles: {
      color: { value: color() },
      number: { value: particleCount() },
      links: { enable: true, color: color() },
      move: { enable: true },
    },
  });

  return (
    <Show when={ready()}>
      <Particles id="dynamic" options={options()} particlesLoaded={() => {}} />
      <div style={{ position: "fixed", top: 16, right: 16, zIndex: 10 }}>
        <label>
          Цвет:
          <input type="color" value={color()} onInput={(e) => setColor(e.currentTarget.value)} />
        </label>
        <label>
          Количество:
          <input
            type="range"
            min={10}
            max={200}
            value={particleCount()}
            onInput={(e) => setParticleCount(Number(e.currentTarget.value))}
          />
          {particleCount()}
        </label>
      </div>
    </Show>
  );
};

export default App;
```

Поскольку `options` — это функция, которая обращается к сигналам, при каждом изменении `color()` или `particleCount()` компонент `<Particles>` получает новый объект опций и применяет только изменённые свойства к существующему canvas.

## Пресет с пользовательскими переопределениями

Загрузите пресет, затем объедините с пользовательскими переопределениями для индивидуального эффекта:

```tsx
import { loadSnowPreset } from "@tsparticles/preset-snow";
import { createSignal, Show, onMount } from "solid-js";
import type { Component } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

const App: Component = () => {
  const [ready, setReady] = createSignal(false);

  onMount(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSnowPreset(engine);
    }).then(() => setReady(true));
  });

  const options: ISourceOptions = {
    preset: "snow",
    fullScreen: { zIndex: -1 },
    background: { color: "#0d0d2b" },
    particles: {
      // Переопределяем цвет снега на синий
      color: { value: "#88ccff" },
      // Увеличиваем количество хлопьев
      number: { value: 300 },
    },
  };

  return (
    <Show when={ready()}>
      <Particles id="custom-snow" options={options} />
    </Show>
  );
};

export default App;
```

Пресет предоставляет значения по умолчанию для каждой опции, а ваши переопределения объединяются поверх — нужно указать только те свойства, которые вы хотите изменить.

## Устранение неполадок

| Симптом                        | Причина                                   | Исправление                                                               |
| ------------------------------ | ----------------------------------------- | ------------------------------------------------------------------------- |
| Пустой DOM-элемент             | Движок не инициализирован до рендеринга   | Оберните `<Particles>` в `<Show when={initialized()}>`                    |
| Частицы не видны               | Отсутствует `move.enable` или `number.value` | Убедитесь, что `particles.move.enable: true` и `particles.number.value > 0` |
| Canvas позади контента         | Отсутствует `zIndex` в fullScreen         | Используйте `fullScreen: { zIndex: -1 }`                                  |
| Изменение опций не отражается  | Ссылка на объект не меняется              | Оберните опции в функцию или store; избегайте статических объектов        |
| Движок не найден               | Отсутствует импорт `loadFull` или `loadSlim` | Установите `tsparticles` или `@tsparticles/slim` и вызовите `loadFull(engine)` |

## Следующие шаги

- Изучите [площадку Configs](/playground/configs) для готовых конфигураций.
- Прочтите [Справочник параметров](/options/) для полного списка параметров.
- Просмотрите [исходный код SolidJS](https://github.com/tsparticles/solid) на GitHub для внутренностей обёртки.
