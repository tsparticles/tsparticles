---
title: Интеграция с Vue 3
description: Пошаговое руководство по интеграции tsParticles в приложения Vue 3 с использованием @tsparticles/vue3.
---

# Интеграция с Vue 3

Пакет `@tsparticles/vue3` предоставляет нативный компонент Vue 3 и систему плагинов для tsParticles. Это руководство охватывает всё, от базовой настройки до продвинутых паттернов, таких как динамическое переключение тем и пользовательские пресеты.

---

## Установка

```bash
npm install @tsparticles/vue3 @tsparticles/engine
```

Опционально установите пресет или полную сборку:

```bash
# Полная сборка (все функции)
npm install tsparticles

# Конкретные пресеты
npm install @tsparticles/preset-confetti
npm install @tsparticles/preset-fireworks
npm install @tsparticles/preset-snow
npm install @tsparticles/preset-stars

# Утилитарные конфиги
npm install @tsparticles/configs
```

---

## Базовое использование

Зарегистрируйте плагин в точке входа вашего приложения, затем используйте компонент `<vue-particles>` в любом месте.

### Точка входа (`main.ts`)

```typescript
import { createApp } from "vue";
import App from "./App.vue";
import type { Engine } from "@tsparticles/engine";
import { ParticlesPlugin } from "@tsparticles/vue3";
import { loadFull } from "tsparticles";

const app = createApp(App);

app.use(ParticlesPlugin, {
  init: async (engine: Engine) => {
    await loadFull(engine);
  },
});

app.mount("#app");
```

### Компонент (`App.vue`)

```vue
<script setup lang="ts">
import type { ISourceOptions } from "@tsparticles/engine";

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
      direction: "none",
      random: false,
      straight: false,
      outModes: "out",
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
};
</script>

<template>
  <vue-particles id="tsparticles" :options="options" />
</template>
```

---

## Использование `particlesInit` с компонентом

Если вы предпочитаете не использовать глобальный плагин, передайте колбэк `init` напрямую:

```vue
<script setup lang="ts">
import type { Engine } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

const particlesInit = async (engine: Engine): Promise<void> => {
  await loadFull(engine);
};
</script>

<template>
  <vue-particles id="tsparticles" :options="options" :init="particlesInit" />
</template>
```

---

## События

Компонент генерирует несколько событий жизненного цикла:

```vue
<script setup lang="ts">
import type { Container } from "@tsparticles/engine";

const particlesLoaded = async (container: Container): Promise<void> => {
  console.log("Контейнер частиц загружен", container);
};

const particlesInit = async (engine: Engine): Promise<void> => {
  console.log("Движок инициализирован");
  await loadFull(engine);
};
</script>

<template>
  <vue-particles id="tsparticles" :options="options" :init="particlesInit" @particles-loaded="particlesLoaded" />
</template>
```

---

## Эффект конфетти

Используйте пресет конфетти для праздников:

```bash
npm install @tsparticles/preset-confetti
```

```vue
<script setup lang="ts">
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";

const particlesInit = async (engine: Engine): Promise<void> => {
  await loadConfettiPreset(engine);
};

const options: ISourceOptions = {
  preset: "confetti",
  background: {
    color: "transparent",
  },
};
</script>

<template>
  <vue-particles id="confetti" :options="options" :init="particlesInit" />
</template>
```

Для одноразового взрыва загрузите пресет, затем вызовите `tsParticles.load()` программно внутри метода.

---

## Эффект фейерверка

Пресет фейерверка создаёт зрелищные взрывы частиц:

```bash
npm install @tsparticles/preset-fireworks
```

```vue
<script setup lang="ts">
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import { loadFireworksPreset } from "@tsparticles/preset-fireworks";

const particlesInit = async (engine: Engine): Promise<void> => {
  await loadFireworksPreset(engine);
};

const options: ISourceOptions = {
  preset: "fireworks",
  background: {
    color: "#000000",
  },
};
</script>

<template>
  <vue-particles id="fireworks" :options="options" :init="particlesInit" />
</template>
```

> **Совет:** Пресет фейерверка требует много ресурсов. Запускайте его по взаимодействию пользователя (например, по клику на кнопку), переключая `v-if`, привязанный к компоненту.

---

## Эффект снега

Симулируйте падение снега с помощью пресета snow:

```bash
npm install @tsparticles/preset-snow
```

```vue
<script setup lang="ts">
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import { loadSnowPreset } from "@tsparticles/preset-snow";

const particlesInit = async (engine: Engine): Promise<void> => {
  await loadSnowPreset(engine);
};

const options: ISourceOptions = {
  preset: "snow",
  background: {
    color: "#1a1a2e",
  },
};
</script>

<template>
  <vue-particles id="snow" :options="options" :init="particlesInit" />
</template>
```

---

## Интерактивные частицы

Добавьте режимы взаимодействия при наведении и клике:

```vue
<script setup lang="ts">
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  background: {
    color: "#0d0d0d",
  },
  particles: {
    number: {
      value: 100,
    },
    color: {
      value: "#00ff00",
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 0.6,
    },
    size: {
      value: { min: 1, max: 4 },
    },
    links: {
      enable: true,
      distance: 120,
      color: "#00ff00",
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
        links: {
          opacity: 0.5,
        },
      },
      push: {
        quantity: 4,
      },
    },
  },
};
</script>

<template>
  <vue-particles id="interactive" :options="options" />
</template>
```

Доступные режимы взаимодействия: `grab`, `repulse`, `bubble`, `connect`, `push`, `remove`, `trail`, `attract`, `light`.

---

## Переключение темы

Динамически меняйте темы частиц во время выполнения, обновляя реактивный объект опций:

```vue
<script setup lang="ts">
import { ref } from "vue";
import type { ISourceOptions } from "@tsparticles/engine";

const isDark = ref(true);

const options = ref<ISourceOptions>({
  background: {
    color: "#000000",
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
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
});

const toggleTheme = () => {
  isDark.value = !isDark.value;
  options.value = {
    ...options.value,
    background: {
      color: isDark.value ? "#000000" : "#f0f0f0",
    },
    particles: {
      ...options.value.particles,
      color: {
        value: isDark.value ? "#ffffff" : "#333333",
      },
      links: {
        ...(options.value.particles?.links as object),
        color: isDark.value ? "#ffffff" : "#333333",
      },
    },
  };
};
</script>

<template>
  <div>
    <button @click="toggleTheme">Переключить на {{ isDark ? "светлую" : "тёмную" }}</button>
    <vue-particles id="theme-particles" :options="options" />
  </div>
</template>
```

Альтернативно, используйте встроенную опцию [themes](https://particles.js.org/docs/interfaces/Options_Interfaces_IOptions.IOptions.html#themes) и свойство `theme` на контейнере для переключения без конфигурации.

---

## Пользовательский пресет из @tsparticles/configs

Пакет `@tsparticles/configs` экспортирует готовые объекты конфигурации:

```bash
npm install @tsparticles/configs
```

```vue
<script setup lang="ts">
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import { loadLinksPreset } from "@tsparticles/preset-links";
import particlesConfig from "@tsparticles/configs/particles.json";

const particlesInit = async (engine: Engine): Promise<void> => {
  await loadLinksPreset(engine);
};

const options: ISourceOptions = {
  ...particlesConfig,
  background: {
    color: "#1e1e2e",
  },
};
</script>

<template>
  <vue-particles id="config-particles" :options="options" :init="particlesInit" />
</template>
```

Просмотрите доступные конфиги в пакете `@tsparticles/configs` для готовых к использованию макетов.

---

## Подходы к инициализации движка

Есть два способа инициализировать движок:

### 1. Глобальный плагин (рекомендуется)

```typescript
// main.ts
import { createApp } from "vue";
import App from "./App.vue";
import type { Engine } from "@tsparticles/engine";
import { ParticlesPlugin } from "@tsparticles/vue3";
import { loadFull } from "tsparticles";

createApp(App)
  .use(ParticlesPlugin, {
    init: async (engine: Engine) => {
      await loadFull(engine);
    },
  })
  .mount("#app");
```

Затем движок доступен глобально, и все экземпляры `<vue-particles>` используют его.

### 2. Инициализация на уровне компонента

Передайте колбэк `:init` каждому экземпляру `<vue-particles>`. Полезно, когда разным компонентам нужны разные наборы плагинов:

```vue
<template>
  <vue-particles id="a" :options="optionsA" :init="initA" />
  <vue-particles id="b" :options="optionsB" :init="initB" />
</template>
```

### 3. Particles Provider (Composition API)

Используйте провайдер для программного доступа к движку:

```vue
<script setup lang="ts">
import { useParticles } from "@tsparticles/vue3";
import { loadFull } from "tsparticles";

const { init } = useParticles();

await init(async (engine: Engine) => {
  await loadFull(engine);
});
</script>
```

---

## Именованные экспорты + TypeScript

Полный пример TypeScript со всеми частями вместе:

```vue
<script setup lang="ts">
import { ref } from "vue";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

const particlesContainer = ref<Container | null>(null);

const options: ISourceOptions = {
  background: {
    color: "#0d47a1",
  },
  fpsLimit: 60,
  particles: {
    number: {
      value: 50,
    },
    color: {
      value: "#ffd700",
    },
    shape: {
      type: ["circle", "triangle", "polygon"],
    },
    opacity: {
      value: 0.7,
      random: true,
    },
    size: {
      value: { min: 2, max: 8 },
      random: true,
    },
    links: {
      enable: true,
      distance: 200,
      color: "#ffd700",
      opacity: 0.3,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: true,
      straight: false,
      outModes: "bounce",
      attract: {
        enable: false,
      },
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "bubble",
      },
      onClick: {
        enable: true,
        mode: "repulse",
      },
    },
    modes: {
      bubble: {
        distance: 200,
        size: 12,
        duration: 0.3,
      },
      repulse: {
        distance: 200,
      },
    },
  },
  detectRetina: true,
};

const particlesInit = async (engine: Engine): Promise<void> => {
  await loadFull(engine);
};

const particlesLoaded = async (container: Container): Promise<void> => {
  particlesContainer.value = container;
  console.log("Контейнер готов", container);
};
</script>

<template>
  <vue-particles id="tsparticles" :options="options" :init="particlesInit" @particles-loaded="particlesLoaded" />
</template>
```

---

## Справочник API

| Проп      | Тип                                | По умолчанию      | Описание                        |
| --------- | ----------------------------------- | ----------------- | ------------------------------- |
| `id`      | `string`                            | `"tsparticles"`   | ID элемента canvas              |
| `options` | `ISourceOptions`                    | `{}`              | Конфигурация частиц             |
| `init`    | `(engine: Engine) => Promise<void>` | —                 | Колбэк инициализации движка     |
| `url`     | `string`                            | —                 | URL для загрузки JSON конфиг.   |

| Событие              | Полезные данные | Описание                                    |
| -------------------- | --------------- | ------------------------------------------- |
| `@particles-loaded`  | `Container`     | Срабатывает при полной инициализации контейнера |
| `@particles-init`    | `Engine`        | Срабатывает после инициализации движка       |

---

## Устранение неполадок

- **Ошибка: `tsparticles is not defined`** — Убедитесь, что `tsparticles` (или необходимые пресеты) загружены внутри колбэка `init` до рендеринга компонента.
- **Canvas не отображается** — Проверьте, что родительский контейнер имеет ненулевую высоту. Добавьте CSS-правило, например, `#tsparticles { height: 100vh; }`.
- **Проблемы производительности** — Снизьте `fpsLimit`, уменьшите `particles.number.value` или отключите `detectRetina` на маломощных устройствах.
- **SSR (Nuxt)** — Компонент `<vue-particles>` только для клиента. Оберните его в `<ClientOnly>` или используйте директиву `client:only`.
