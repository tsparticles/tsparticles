---
title: Интеграция с Svelte
description: Пошаговое руководство по интеграции tsParticles в приложения Svelte и SvelteKit с использованием @tsparticles/svelte.
---

# Интеграция с Svelte

Пакет `@tsparticles/svelte` предоставляет нативный компонент Svelte для tsParticles. Это руководство охватывает Svelte (с Vite) и SvelteKit, включая реактивные опции, обработку событий и несколько экземпляров.

---

## Установка

```bash
npm install @tsparticles/svelte @tsparticles/engine
```

Для полной сборки или пресетов:

```bash
npm install tsparticles
npm install @tsparticles/preset-snow
npm install @tsparticles/preset-stars
npm install @tsparticles/preset-confetti
npm install @tsparticles/preset-fireworks
```

---

## Базовое использование

```svelte
<script lang="ts">
  import Particles from "@tsparticles/svelte";
  import { loadFull } from "tsparticles";
  import type { Engine, ISourceOptions } from "@tsparticles/engine";

  let engineInitialised = false;

  const particlesInit = async (engine: Engine): Promise<void> => {
    await loadFull(engine);
    engineInitialised = true;
  };

  const options: ISourceOptions = {
    background: {
      color: "#0d47a1",
    },
    fpsLimit: 120,
    particles: {
      number: {
        value: 80,
      },
      color: {
        value: "#ffffff",
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.5,
      },
      size: {
        value: { min: 1, max: 5 },
      },
      links: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2,
        outModes: "out",
      },
    },
  };
</script>

<Particles
  id="tsparticles"
  options={options}
  on:init={particlesInit}
/>
```

---

## Инициализация движка

Передайте обработчик события `on:init` для загрузки плагинов и пресетов, необходимых вашему приложению:

```svelte
<script lang="ts">
  import Particles from "@tsparticles/svelte";
  import { loadFull } from "tsparticles";
  import type { Engine } from "@tsparticles/engine";

  const handleInit = async (event: CustomEvent<Engine>) => {
    const engine = event.detail;
    await loadFull(engine);
  };
</script>

<Particles
  id="tsparticles"
  options={options}
  on:init={handleInit}
/>
```

Альтернативно, используйте утилиту `initParticlesEngine` перед монтированием:

```svelte
<script lang="ts">
  import Particles, { initParticlesEngine } from "@tsparticles/svelte";
  import { loadFull } from "tsparticles";
  import { onMount } from "svelte";

  let ready = false;

  onMount(async () => {
    await initParticlesEngine(async (engine) => {
      await loadFull(engine);
    });
    ready = true;
  });
</script>

{#if ready}
  <Particles id="tsparticles" options={options} />
{/if}
```

---

## Эффект снега

```bash
npm install @tsparticles/preset-snow
```

```svelte
<script lang="ts">
  import Particles from "@tsparticles/svelte";
  import { loadSnowPreset } from "@tsparticles/preset-snow";
  import type { Engine, ISourceOptions } from "@tsparticles/engine";

  const handleInit = async (event: CustomEvent<Engine>) => {
    await loadSnowPreset(event.detail);
  };

  const options: ISourceOptions = {
    preset: "snow",
    background: {
      color: "#1a1a2e",
    },
  };
</script>

<Particles
  id="snow"
  {options}
  on:init={handleInit}
/>
```

Настройте поведение пресета, объединив дополнительные опции:

```svelte
<script lang="ts">
  const options: ISourceOptions = {
    preset: "snow",
    background: { color: "#0f0f23" },
    particles: {
      move: {
        speed: 1.5,  // замедленный снегопад
      },
      opacity: {
        value: 0.8,  // более заметные хлопья
      },
    },
  };
</script>
```

---

## Эффект звёзд

```bash
npm install @tsparticles/preset-stars
```

```svelte
<script lang="ts">
  import Particles from "@tsparticles/svelte";
  import { loadStarsPreset } from "@tsparticles/preset-stars";
  import type { Engine, ISourceOptions } from "@tsparticles/engine";

  const handleInit = async (event: CustomEvent<Engine>) => {
    await loadStarsPreset(event.detail);
  };

  const options: ISourceOptions = {
    preset: "stars",
    background: {
      color: "#000000",
    },
  };
</script>

<Particles
  id="stars"
  {options}
  on:init={handleInit}
/>
```

---

## Интерактивные частицы

Добавьте взаимодействие по наведению мыши и клику:

```svelte
<script lang="ts">
  import Particles from "@tsparticles/svelte";
  import { loadFull } from "tsparticles";
  import type { Engine, ISourceOptions } from "@tsparticles/engine";

  const handleInit = async (event: CustomEvent<Engine>) => {
    await loadFull(event.detail);
  };

  const options: ISourceOptions = {
    background: {
      color: "#0d0d0d",
    },
    particles: {
      number: { value: 100 },
      color: { value: "#00d8ff" },
      shape: { type: "circle" },
      opacity: { value: 0.6 },
      size: { value: { min: 1, max: 4 } },
      links: {
        enable: true,
        distance: 120,
        color: "#00d8ff",
        opacity: 0.3,
        width: 1,
      },
      move: {
        enable: true,
        speed: 3,
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab",
        },
        onClick: {
          enable: true,
          mode: "push",
        },
      },
      modes: {
        grab: {
          distance: 180,
          links: { opacity: 0.5 },
        },
        push: {
          quantity: 4,
        },
      },
    },
  };
</script>

<Particles
  id="interactive"
  {options}
  on:init={handleInit}
/>
```

---

## Обработка событий

```svelte
<script lang="ts">
  import Particles from "@tsparticles/svelte";
  import { loadFull } from "tsparticles";
  import type { Container, Engine } from "@tsparticles/engine";

  let container: Container;

  const handleInit = async (event: CustomEvent<Engine>) => {
    await loadFull(event.detail);
  };

  const handleLoaded = (event: CustomEvent<Container>) => {
    container = event.detail;
    console.log("Контейнер загружен", container);
  };

  const pause = () => container?.pause();
  const resume = () => container?.play();
  const destroy = () => container?.destroy();
</script>

<div>
  <button on:click={pause}>Пауза</button>
  <button on:click={resume}>Возобновить</button>
  <button on:click={destroy}>Уничтожить</button>
</div>

<Particles
  id="tsparticles"
  options={options}
  on:init={handleInit}
  on:particlesLoaded={handleLoaded}
/>
```

| Событие               | Деталь       | Срабатывает                            |
| --------------------- | ------------ | -------------------------------------- |
| `on:init`             | `Engine`     | После инициализации движка             |
| `on:particlesLoaded`  | `Container`  | После полной готовности контейнера     |

---

## Пример на TypeScript

Полный типизированный компонент:

```svelte
<script lang="ts">
  import Particles from "@tsparticles/svelte";
  import { loadFull } from "tsparticles";
  import type {
    Container,
    Engine,
    ISourceOptions,
  } from "@tsparticles/engine";

  let particlesContainer: Container | undefined;

  const options: ISourceOptions = {
    background: {
      color: "#1e1e2e",
    },
    fpsLimit: 60,
    particles: {
      color: {
        value: "#cdd6f4",
      },
      links: {
        color: "#cdd6f4",
        distance: 150,
        enable: true,
        opacity: 0.3,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1.5,
      },
      number: {
        value: 60,
      },
      opacity: {
        value: 0.6,
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "repulse",
        },
      },
      modes: {
        repulse: {
          distance: 100,
        },
      },
    },
    detectRetina: true,
  };

  const handleInit = async (event: CustomEvent<Engine>) => {
    await loadFull(event.detail);
  };

  const handleLoaded = (event: CustomEvent<Container>) => {
    particlesContainer = event.detail;
  };
</script>

<Particles
  id="tsparticles"
  {options}
  on:init={handleInit}
  on:particlesLoaded={handleLoaded}
/>
```

---

## Динамические опции

Реактивные опции обновляют частицы без пересоздания экземпляра:

```svelte
<script lang="ts">
  import Particles from "@tsparticles/svelte";
  import { loadFull } from "tsparticles";
  import type { Engine, ISourceOptions } from "@tsparticles/engine";

  let color = "#ff0000";

  const handleInit = async (event: CustomEvent<Engine>) => {
    await loadFull(event.detail);
  };

  $: options = {
    background: {
      color: "#000000",
    },
    particles: {
      color: {
        value: color,
      },
      links: {
        color: color,
        enable: true,
        distance: 150,
      },
      number: {
        value: 60,
      },
      move: {
        enable: true,
        speed: 2,
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
  } satisfies ISourceOptions;
</script>

<div>
  <label>
    Цвет частиц:
    <input type="color" bind:value={color} />
  </label>
</div>

<Particles
  id="dynamic"
  {options}
  on:init={handleInit}
/>
```

Реактивное объявление `$:` пересчитывает `options` при каждом изменении `color`, и компонент `Particles` автоматически применяет новую конфигурацию.

---

## Несколько экземпляров

Отобразите несколько независимых систем частиц на одной странице:

```svelte
<script lang="ts">
  import Particles from "@tsparticles/svelte";
  import { loadFull } from "tsparticles";
  import type { Engine, ISourceOptions } from "@tsparticles/engine";

  const handleInit = async (event: CustomEvent<Engine>) => {
    await loadFull(event.detail);
  };

  const fireOptions: ISourceOptions = {
    background: { color: "#1a0000" },
    particles: {
      color: { value: "#ff4500" },
      number: { value: 40 },
      move: { enable: true, speed: 1 },
      size: { value: { min: 2, max: 6 } },
      opacity: { value: 0.8 },
    },
  };

  const waterOptions: ISourceOptions = {
    background: { color: "#000d1a" },
    particles: {
      color: { value: "#00bfff" },
      number: { value: 60 },
      move: { enable: true, speed: 0.5, direction: "top" },
      size: { value: { min: 1, max: 3 } },
      opacity: { value: 0.5 },
    },
  };
</script>

<div style="display: grid; grid-template-columns: 1fr 1fr; height: 100vh;">
  <div style="position: relative;">
    <Particles id="fire" options={fireOptions} on:init={handleInit} />
  </div>
  <div style="position: relative;">
    <Particles id="water" options={waterOptions} on:init={handleInit} />
  </div>
</div>
```

Каждый компонент `<Particles>` получает свой собственный `id`, canvas и контекст движка.

---

## Использование в SvelteKit

В SvelteKit canvas требует браузерного окружения. Отключите SSR для компонента:

```svelte
<script lang="ts">
  import { browser } from "$app/environment";
  import { onMount } from "svelte";

  let Component: typeof import("@tsparticles/svelte").default;

  onMount(async () => {
    if (browser) {
      const module = await import("@tsparticles/svelte");
      Component = module.default;
    }
  });
</script>

{#if Component}
  <svelte:component this={Component} id="tsparticles" options={options} />
{/if}
```

Или оберните импорт в клиентский компонент. Для SvelteKit 2+ также можно использовать исключения SSR `vite-plugin-svelte`.

---

## Справочник API

| Проп      | Тип             | По умолчанию      | Описание                      |
| --------- | --------------- | ----------------- | ----------------------------- |
| `id`      | `string`        | `"tsparticles"`   | ID элемента canvas            |
| `options` | `ISourceOptions`| `{}`              | Объект конфигурации частиц    |
| `url`     | `string`        | —                 | URL удалённой JSON конфиг.    |

| Событие               | Деталь       | Описание                                                     |
| --------------------  | ------------ | ------------------------------------------------------------ |
| `on:init`             | `Engine`     | Срабатывает при инициализации движка (используйте для загрузки плагинов) |
| `on:particlesLoaded`  | `Container`  | Срабатывает при полной готовности контейнера                 |

---

## Устранение неполадок

- **Canvas не виден** — Убедитесь, что родительский контейнер имеет явные размеры (`height: 100%`, `height: 100vh` или фиксированное значение в пикселях).
- **`loadFull is not a function`** — Проверьте, что `tsparticles` установлен и вы импортируете `loadFull` из `tsparticles` (не из `@tsparticles/engine`).
- **Реактивность не работает** — Убедитесь, что `options` — реактивная переменная (`$:` или `let`, привязанная к реактивному источнику). Обычные `const` значения не будут обновляться.
- **SvelteKit пустой экран** — Импортируйте `@tsparticles/svelte` динамически или используйте защиту `browser` как показано в разделе SvelteKit выше.
- **Ошибки TypeScript для `event.detail`** — Используйте типы `CustomEvent<Engine>` и `CustomEvent<Container>` для обработчиков событий.
