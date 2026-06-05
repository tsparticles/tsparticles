---
title: Интеграция с Nuxt
description: Пошаговое руководство по интеграции tsParticles в приложение Nuxt 3 / Nuxt 4.
---

# Интеграция с Nuxt

В этом руководстве рассматривается интеграция tsParticles в проект **Nuxt 3** (и Nuxt 4) с использованием официальной обёртки `@tsparticles/vue3`. Nuxt работает как на сервере, так и на клиенте, поэтому необходимо защитить компоненты частиц от SSR.

## Установка

Установите обёртку Vue 3 и выбранную сборку движка:

```bash
npm install @tsparticles/vue3 tsparticles
```

Для меньшей сборки установите `@tsparticles/slim` вместо `tsparticles`:

```bash
npm install @tsparticles/vue3 @tsparticles/slim
```

## Базовое использование

Nuxt по умолчанию рендерит компоненты на сервере. Поскольку tsParticles требует браузерный API `canvas`, необходимо обернуть компонент `<vue-particles>` в тег `<client-only>`:

```vue
<template>
  <div class="page">
    <client-only>
      <vue-particles id="tsparticles" :options="options" @particles-loaded="particlesLoaded" />
    </client-only>
    <h1>Моё приложение Nuxt</h1>
  </div>
</template>

<script setup lang="ts">
import type { ISourceOptions, Container } from "@tsparticles/engine";

const options: ISourceOptions = {
  fullScreen: {
    zIndex: -1,
  },
  background: {
    color: "#0d47a1",
  },
  particles: {
    number: { value: 80 },
    links: { enable: true, color: "#ffffff" },
    move: { enable: true },
    size: { value: 3 },
  },
};

const particlesLoaded = (container?: Container) => {
  console.log("Контейнер частиц готов", container?.id);
};
</script>

<style scoped>
.page {
  position: relative;
}
</style>
```

Обёртка `<client-only>` гарантирует, что компонент `<vue-particles>` монтируется только в браузере, предотвращая несоответствия гидратации.

## Конфигурация

Используйте полноценный тип `ISourceOptions` для типобезопасной конфигурации. Вы можете определить опции встроенно или импортировать их из отдельного файла конфигурации:

```vue
<script setup lang="ts">
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  fpsLimit: 60,
  background: {
    color: "#000000",
  },
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
      },
    },
    color: {
      value: ["#ff0000", "#00ff00", "#0000ff"],
    },
    shape: {
      type: ["circle", "square", "triangle"],
    },
    opacity: {
      value: 0.8,
    },
    size: {
      value: { min: 1, max: 8 },
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
      speed: 3,
      direction: "none",
      random: false,
      straight: false,
      outModes: "bounce",
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "repulse",
      },
      onClick: {
        enable: true,
        mode: "push",
      },
    },
  },
};
</script>
```

## Эффект снега

Создайте зимний эффект снегопада с помощью пресета snow:

```bash
npm install @tsparticles/preset-snow
```

```vue
<template>
  <client-only>
    <vue-particles id="snow" :options="options" @particles-loaded="onLoad" />
  </client-only>
</template>

<script setup lang="ts">
import { loadSnowPreset } from "@tsparticles/preset-snow";
import { tsParticles } from "@tsparticles/engine";
import type { Container } from "@tsparticles/engine";

// Загрузка пресета перед монтированием компонента
await loadSnowPreset(tsParticles);

const options = {
  preset: "snow",
  fullScreen: { zIndex: -1 },
  background: {
    color: "#1a1a2e",
  },
};

const onLoad = (container?: Container) => {
  console.log("Эффект снега готов", container?.id);
};
</script>
```

Поскольку пресет загружается с помощью `await` верхнего уровня в `<script setup>`, он гарантированно будет готов до рендеринга компонента.

## Интерактивные частицы

Включите взаимодействия по клику и наведению, добавив режимы интерактивности:

```vue
<template>
  <client-only>
    <vue-particles id="interactive" :options="options" />
  </client-only>
</template>

<script setup lang="ts">
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  fullScreen: { zIndex: -1 },
  particles: {
    number: { value: 50 },
    links: {
      enable: true,
      distance: 150,
    },
    move: {
      enable: true,
      speed: 2,
    },
    size: {
      value: { min: 1, max: 4 },
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "grab", // частицы соединяются с курсором
      },
      onClick: {
        enable: true,
        mode: "push", // добавление частиц по клику
      },
    },
    modes: {
      grab: {
        distance: 200,
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
```

Доступные режимы взаимодействия: `grab`, `bubble`, `connect`, `repulse`, `push`, `remove`, `attract` и `slow`.

## Обработка событий

Компонент `<vue-particles>` генерирует несколько событий жизненного цикла:

```vue
<template>
  <client-only>
    <vue-particles
      id="event-demo"
      :options="options"
      @particles-loaded="onLoaded"
      @particles-init="onInit"
      @particles-destroy="onDestroy"
    />
  </client-only>
</template>

<script setup lang="ts">
import type { Container, Engine } from "@tsparticles/engine";

const options = {
  fullScreen: { zIndex: -1 },
  particles: {
    number: { value: 60 },
    links: { enable: true },
    move: { enable: true },
  },
};

const onInit = (engine: Engine) => {
  console.log("Движок инициализирован", engine);
};

const onLoaded = (container: Container) => {
  console.log("Контейнер загружен", container.id);
};

const onDestroy = () => {
  console.log("Контейнер уничтожен");
};
</script>
```

| Событие              | Полезные данные | Описание                                                        |
| -------------------- | --------------- | --------------------------------------------------------------- |
| `@particles-init`    | `Engine`        | Срабатывает один раз при инициализации движка tsParticles       |
| `@particles-loaded`  | `Container`     | Срабатывает каждый раз при загрузке или перезагрузке контейнера |
| `@particles-destroy` | отсутствует     | Срабатывает при уничтожении контейнера                          |

## Полный пример TypeScript

Полный типизированный компонент с явными импортами и управлением жизненным циклом:

```vue
<template>
  <div class="particles-wrapper">
    <client-only>
      <vue-particles
        id="full-example"
        :options="options"
        @particles-loaded="onParticlesLoaded"
        @particles-init="onParticlesInit"
      />
    </client-only>
    <div class="controls">
      <button @click="togglePause">{{ paused ? "Возобновить" : "Пауза" }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { loadFull } from "tsparticles";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

const containerRef = ref<Container | undefined>(undefined);
const paused = ref(false);

const options: ISourceOptions = {
  fullScreen: { zIndex: -1 },
  background: { color: "#0a0a23" },
  particles: {
    color: { value: "#00ff00" },
    number: { value: 80 },
    links: { enable: true, color: "#00ff00", distance: 150 },
    move: { enable: true, speed: 1.5 },
    size: { value: { min: 1, max: 4 } },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "repulse" },
    },
    modes: {
      repulse: { distance: 120 },
    },
  },
};

const onParticlesInit = async (engine: Engine) => {
  await loadFull(engine);
};

const onParticlesLoaded = (container: Container) => {
  containerRef.value = container;
};

const togglePause = () => {
  if (containerRef.value) {
    if (paused.value) {
      containerRef.value.play();
    } else {
      containerRef.value.pause();
    }
    paused.value = !paused.value;
  }
};
</script>

<style scoped>
.particles-wrapper {
  position: relative;
  min-height: 100vh;
}
.controls {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 10;
}
</style>
```

## Интеграция со страницей

Добавьте фон с частицами на конкретную страницу Nuxt, разместив компонент в шаблоне страницы:

```vue
<template>
  <div>
    <client-only>
      <vue-particles id="page-particles" :options="options" />
    </client-only>

    <div class="content">
      <h1>О странице</h1>
      <p>Этот контент находится над canvas частиц.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  fullScreen: { zIndex: -1 },
  background: { color: "#1a1a2e" },
  particles: {
    number: { value: 50 },
    color: { value: "#e94560" },
    links: { enable: true, color: "#e94560" },
    move: { enable: true },
  },
};
</script>

<style scoped>
.content {
  position: relative;
  z-index: 1;
  padding: 2rem;
  color: white;
}
</style>
```

Если вы хотите, чтобы частицы были на **каждой** странице, добавьте компонент в `layouts/default.vue` вместо отдельных страниц.

## Заметки о Nuxt 4

Nuxt 4 сохраняет обратную совместимость с шаблонами `<client-only>` и `<script setup>` Nuxt 3. Все примеры выше работают без изменений в Nuxt 4.

Ключевые соображения для Nuxt 4:

- **Nitropack 2**: Серверный движок обновлён, но это не влияет на клиентские компоненты, такие как `<vue-particles>`.
- **Vue 3.5+**: Nuxt 4 поставляется с более новой версией Vue — `@tsparticles/vue3` совместим с Vue 3.3+ без проблем.
- **Более строгие проверки SSR**: Если вы видите предупреждения гидратации, убедитесь, что `<vue-particles>` всегда находится внутри `<client-only>` и никогда не рендерится на сервере.
- **Гибридный рендеринг**: При использовании правил маршрутов с `ssr: false` для некоторых страниц, можно опустить `<client-only>` на этих страницах, но безопаснее всегда его использовать.

Если вы обновляетесь с Nuxt 2 и пакета `@tsparticles/vue` (vue 2), необходимо перейти на `@tsparticles/vue3` для Nuxt 3 / 4 — API несовместимы.

## Галерея пресетов

Комбинируйте шаблон выше с любым из этих официальных пресетов:

| Пресет    | Пакет                           | Эффект                 |
| --------- | ------------------------------- | ---------------------- |
| Confetti  | `@tsparticles/preset-confetti`  | Яркий взрыв конфетти   |
| Fireworks | `@tsparticles/preset-fireworks` | Взрывы фейерверка      |
| Snow      | `@tsparticles/preset-snow`      | Падающие снежинки      |
| Stars     | `@tsparticles/preset-stars`     | Мерцающее ночное небо  |
| Links     | `@tsparticles/preset-links`     | Сеть соединённых узлов |
| Bubbles   | `@tsparticles/preset-bubbles`   | Плавающие пузыри       |

```vue
<template>
  <client-only>
    <vue-particles id="preset-demo" :options="{ preset: 'stars' }" />
  </client-only>
</template>

<script setup lang="ts">
import { loadStarsPreset } from "@tsparticles/preset-stars";
import { tsParticles } from "@tsparticles/engine";

await loadStarsPreset(tsParticles);
</script>
```

## Устранение неполадок

| Симптом                                             | Причина                                 | Исправление                                                          |
| --------------------------------------------------- | --------------------------------------- | -------------------------------------------------------------------- |
| Пустой экран / ошибка гидратации                    | `<vue-particles>` отрендерен на сервере | Обернуть в `<client-only>`                                           |
| Пресет не действует                                 | Пресет не загружен до монтирования      | Вызвать `loadXPreset()` с `await` верхнего уровня в `<script setup>` |
| Canvas не заполняет область просмотра               | `fullScreen` не включён                 | Добавить `fullScreen: { zIndex: -1 }` в опции                        |
| Элементы управления не ставят на паузу/возобновляют | Не установлена ссылка на контейнер      | Присвоить контейнер в обработчике `@particles-loaded`                |

## Следующие шаги

- Изучите [Интерактивные демо](/demos/) для готовых конфигураций Vue.
- Прочтите [Справочник параметров](/options/) для полного списка параметров частиц.
- Посетите страницу [Пресеты](/demos/presets) для дополнительных готовых эффектов.
