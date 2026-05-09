# Плагины и настройка

tsParticles можно расширять во время выполнения с помощью пользовательских фигур, пресетов и плагинов.

Это руководство описывает быстрый путь: добавить пользовательское поведение прямо в приложение, не создавая сначала отдельный полноценный пакет.

## Быстрая карта выбора

- Используйте **пользовательскую shape**, когда нужна только новая примитивная форма отрисовки.
- Используйте **пользовательский preset**, когда хотите повторно использовать один полный объект параметров.
- Используйте **plugin**, когда нужна логика времени выполнения (жизненный цикл контейнера, пользовательское поведение, разбор параметров).

## Все типы расширений с первого взгляда

Настройка tsParticles шире, чем только пользовательские плагины.

- **Bundle**: групповой загрузчик, который регистрирует сразу много возможностей (`slim`, `basic`, `all`).
- **Effect**: эффект рендеринга частиц (`particles.effect`).
- **Interaction**: поведение между частицами и событиями; разделяется на `external` (мышь/касание) и `particles` (частица-частица).
- **Palette**: переиспользуемый профиль стиля/цветов (`particles.palette`).
- **Path**: генератор траектории движения частиц (`particles.move.path`).
- **Plugin**: модуль возможностей контейнера/времени выполнения (например emitters, absorbers, polygon mask).
- **Preset**: переиспользуемый полный профиль параметров (`preset`).
- **Shape**: примитив отрисовки частиц (`particles.shape.type`).
- **Updater**: покадровый обновлятор свойств частиц (tilt, roll, twinkle, opacity, size и другое).

Если объяснить пользователям эти категории, они сразу понимают, насколько глубокой может быть настройка.

## Сводная таблица

| Тип         | Быстрое создание (внутри приложения)                                                                     | Как использовать                                                                                 |
| ----------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Bundle      | Соберите свой `loadAppBundle(engine)` и вызовите внутренние загрузчики                                   | Вызовите `await loadAppBundle(tsParticles)` перед `tsParticles.load(...)`                        |
| Effect      | Зарегистрируйте через `pluginManager.addEffect("app-*", drawer)`                                         | Установите `particles.effect.type` в id вашего effect                                            |
| Interaction | Зарегистрируйте через `pluginManager.addInteractor("app-*", interactor)`                                 | Включите в `interactivity.events` / при необходимости добавьте проверки пользовательских режимов |
| Palette     | Зарегистрируйте через `pluginManager.addPalette("app-*", palette)`                                       | Установите `particles.palette` в id вашей palette                                                |
| Path        | Зарегистрируйте через `pluginManager.addPathGenerator("app-*", generator)`                               | Установите `particles.move.path.generator` в id вашего path                                      |
| Plugin      | Создайте `IPlugin` + `IContainerPlugin` и вызовите `engine.addPlugin(...)`                               | Включайте через параметры плагина и хуки жизненного цикла                                        |
| Preset      | Зарегистрируйте через `tsParticles.addPreset("app-*", options)`                                          | Задайте корневой `preset`                                                                        |
| Shape       | Зарегистрируйте через `tsParticles.addShape("app-*", drawer)` или загрузите все официальные shape-пакеты | Установите `particles.shape.type` и параметры для shape в `particles.shape.options`              |
| Updater     | Зарегистрируйте через `pluginManager.addParticleUpdater("app-*", updater)`                               | Автоматически работает для частиц, где `isEnabled(...)` возвращает `true`                        |

## Быстрое локальное создание в приложении + использование по типам расширений

Во всех фрагментах предполагается такой порядок настройки:

```ts
await loadSlim(tsParticles);
// register custom pieces
await tsParticles.load({ id: "tsparticles", options });
```

### Bundle

Создайте небольшой bundle приложения, который подключает именно те части, которые вам нужны.

```ts
import type { Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export async function loadAppBundle(engine: Engine): Promise<void> {
  await loadSlim(engine);

  await Promise.all([
    loadAppShape(engine),
    loadAppPreset(),
    loadAppPalette(engine),
    loadAppEffect(engine),
    loadAppPath(engine),
    loadAppUpdater(engine),
    loadAppInteraction(engine),
    loadAppPlugin(engine),
  ]);
}

await loadAppBundle(tsParticles);
```

### Effect

```ts
import type { Engine } from "@tsparticles/engine";

export async function loadAppEffect(engine: Engine): Promise<void> {
  await engine.pluginManager.register((e) => {
    e.pluginManager.addEffect("app-fade", () =>
      Promise.resolve({
        drawBefore: ({ context }) => {
          context.save();
          context.globalAlpha *= 0.85;
        },
        drawAfter: ({ context }) => {
          context.restore();
        },
      }),
    );
  });
}

await loadAppEffect(tsParticles);

const options = {
  particles: {
    effect: {
      type: "app-fade",
    },
  },
};
```

### Взаимодействия (external и particles)

```ts
import {
  ExternalInteractorBase,
  loadInteractivityPlugin,
  type IInteractivityData,
} from "@tsparticles/plugin-interactivity";
import type { Engine, IDelta } from "@tsparticles/engine";

class AppHoverPauseInteractor extends ExternalInteractorBase {
  readonly maxDistance = 0;

  clear(): void {}

  init(): void {}

  interact(interactivityData: IInteractivityData, _delta: IDelta): void {
    if (interactivityData.pointer?.position) {
      this.container.pause();
    }
  }

  isEnabled(interactivityData: IInteractivityData): boolean {
    return !!interactivityData.pointer?.position;
  }

  reset(): void {
    this.container.play();
  }
}

export async function loadAppInteraction(engine: Engine): Promise<void> {
  await loadInteractivityPlugin(engine);

  await engine.pluginManager.register((e) => {
    e.pluginManager.addInteractor?.("app-hover-pause", (container) => {
      return Promise.resolve(new AppHoverPauseInteractor(container));
    });
  });
}

await loadAppInteraction(tsParticles);

const options = {
  interactivity: {
    events: {
      onHover: {
        enable: true,
      },
    },
  },
};
```

### Palette

```ts
import type { Engine, IPalette } from "@tsparticles/engine";

const appPalette: IPalette = {
  name: "App Sunset",
  blendMode: "multiply",
  colors: {
    fill: {
      enable: true,
      value: ["#ff6b6b", "#ffd166", "#4ecdc4"],
    },
  },
};

export async function loadAppPalette(engine: Engine): Promise<void> {
  await engine.pluginManager.register((e) => {
    e.pluginManager.addPalette("app-sunset", appPalette);
  });
}

await loadAppPalette(tsParticles);

const options = {
  particles: {
    palette: "app-sunset",
  },
};
```

### Path

```ts
import { loadMovePlugin } from "@tsparticles/plugin-move";
import { Vector, type Engine } from "@tsparticles/engine";

export async function loadAppPath(engine: Engine): Promise<void> {
  await loadMovePlugin(engine);

  await engine.pluginManager.register((e) => {
    e.pluginManager.addPathGenerator?.("app-sway", () =>
      Promise.resolve({
        generate: (particle) => {
          const wave = Math.sin(particle.position.y * 0.02);

          return Vector.create(wave, 0);
        },
        init: () => {},
        reset: () => {},
        update: () => {},
      }),
    );
  });
}

await loadAppPath(tsParticles);

const options = {
  particles: {
    move: {
      enable: true,
      path: {
        enable: true,
        generator: "app-sway",
      },
    },
  },
};
```

### Plugin

```ts
import type { Container, Engine, IContainerPlugin, IPlugin, ISourceOptions, Options } from "@tsparticles/engine";

class AppPluginInstance implements IContainerPlugin {
  private readonly container: Container;

  constructor(container: Container) {
    this.container = container;
  }

  async init(): Promise<void> {
    this.container.retina.pixelRatio = Math.max(this.container.retina.pixelRatio, 1);
  }
}

class AppPlugin implements IPlugin {
  readonly id = "app-plugin";

  async getPlugin(container: Container): Promise<IContainerPlugin> {
    return new AppPluginInstance(container);
  }

  loadOptions(_options: Options, source?: ISourceOptions): void {
    if (source?.appPlugin === false) {
      return;
    }
  }

  needsPlugin(source?: ISourceOptions): boolean {
    return source?.appPlugin !== false;
  }
}

export async function loadAppPlugin(engine: Engine): Promise<void> {
  await engine.addPlugin(new AppPlugin());
}

await loadAppPlugin(tsParticles);

const options = {
  appPlugin: true,
};
```

### Preset

```ts
import { tsParticles } from "@tsparticles/engine";

export async function loadAppPreset(): Promise<void> {
  tsParticles.addPreset("app-hero", {
    fpsLimit: 60,
    particles: {
      number: { value: 80 },
      move: { enable: true, speed: 2 },
      links: { enable: true, distance: 140 },
    },
  });
}

await loadAppPreset();

const options = {
  preset: "app-hero",
};
```

### Shape

```ts
import type { Engine } from "@tsparticles/engine";
import { loadArrowShape } from "@tsparticles/shape-arrow";
import { loadCardsShape } from "@tsparticles/shape-cards";
import { loadCircleShape } from "@tsparticles/shape-circle";
import { loadCogShape } from "@tsparticles/shape-cog";
import { loadEmojiShape } from "@tsparticles/shape-emoji";
import { loadHeartShape } from "@tsparticles/shape-heart";
import { loadImageShape, type ImageEngine } from "@tsparticles/shape-image";
import { loadInfinityShape } from "@tsparticles/shape-infinity";
import { loadLineShape } from "@tsparticles/shape-line";
import { loadMatrixShape } from "@tsparticles/shape-matrix";
import { loadPathShape } from "@tsparticles/shape-path";
import { loadPolygonShape } from "@tsparticles/shape-polygon";
import { loadRoundedPolygonShape } from "@tsparticles/shape-rounded-polygon";
import { loadRoundedRectShape } from "@tsparticles/shape-rounded-rect";
import { loadSpiralShape } from "@tsparticles/shape-spiral";
import { loadSquareShape } from "@tsparticles/shape-square";
import { loadSquircleShape } from "@tsparticles/shape-squircle";
import { loadStarShape } from "@tsparticles/shape-star";
import { loadTextShape } from "@tsparticles/shape-text";

export async function loadAppShape(engine: Engine): Promise<void> {
  await Promise.all([
    loadArrowShape(engine),
    loadCardsShape(engine),
    loadCircleShape(engine),
    loadCogShape(engine),
    loadEmojiShape(engine),
    loadHeartShape(engine),
    loadImageShape(engine as ImageEngine),
    loadInfinityShape(engine),
    loadLineShape(engine),
    loadMatrixShape(engine),
    loadPathShape(engine),
    loadPolygonShape(engine),
    loadRoundedPolygonShape(engine),
    loadRoundedRectShape(engine),
    loadSpiralShape(engine),
    loadSquareShape(engine),
    loadSquircleShape(engine),
    loadStarShape(engine),
    loadTextShape(engine),
  ]);
}

await loadAppShape(tsParticles);

const options = {
  particles: {
    paint: {
      stroke: {
        width: 2,
      },
    },
    shape: {
      type: [
        "arrow",
        "card",
        "circle",
        "club",
        "cog",
        "diamond",
        "emoji",
        "heart",
        "hearts",
        "image",
        "images",
        "infinity",
        "line",
        "matrix",
        "path",
        "polygon",
        "rounded-polygon",
        "rounded-rect",
        "spade",
        "spades",
        "spiral",
        "edge",
        "square",
        "squircle",
        "star",
        "text",
        "character",
        "char",
        "multiline-text",
        "triangle",
        "clubs",
        "diamonds",
      ],
      options: {
        image: {
          src: "https://particles.js.org/images/hdr/fruits/cherry.png",
          width: 32,
          height: 32,
          replaceColor: false,
        },
        line: {
          close: false,
          fill: false,
        },
        path: {
          close: true,
          d: "M 0,-14 L 10,14 L -10,14 Z",
        },
        polygon: {
          sides: 6,
        },
        "rounded-polygon": {
          sides: 6,
          radius: 0.25,
        },
        "rounded-rect": {
          width: 20,
          height: 14,
          radius: 3,
        },
        spiral: {
          innerRadius: 1,
          lineSpacing: 1,
        },
        star: {
          sides: 5,
          inset: 2,
        },
        text: {
          value: ["TS", "Particles"],
          font: "Verdana",
        },
      },
    },
  },
};
```

Shape `line` рисуется через stroke, поэтому оставьте `fill: false` и настройте `particles.paint.stroke`.

URL в `image.src` выше повторно используется из существующих конфигураций проекта (`utils/configs`).

### Updater

```ts
import type { Engine, IDelta, Particle } from "@tsparticles/engine";

export async function loadAppUpdater(engine: Engine): Promise<void> {
  await engine.pluginManager.register((e) => {
    e.pluginManager.addParticleUpdater("app-drift", () =>
      Promise.resolve({
        init: (): void => {},
        isEnabled: (): boolean => true,
        update: (particle: Particle, delta: IDelta): void => {
          particle.position.x += 0.02 * delta.factor;
        },
      }),
    );
  });
}

await loadAppUpdater(tsParticles);

// no extra options required: updater runs when isEnabled(...) is true
```

Этого достаточно, чтобы локально прототипировать каждый тип расширения, а затем вынести их в отдельные пакеты.

## Стратегия композиции

- Начните с одного **bundle** (`slim` обычно достаточно).
- Добавляйте недостающие возможности как небольшие целевые модули (interaction/updater/path/effect/shape).
- Используйте **preset** для повторного использования поведения, а **palette** - для повторного использования визуального стиля.
- Сначала держите пользовательские расширения локально в приложении, публикуйте только при повторном использовании между проектами.

## Практические правила

- Используйте уникальные имена расширений (например `app-*` или префикс компании).
- Начинайте локально в приложении, выносите в пакет только при повторном использовании в нескольких проектах.
- Держите небольшой конфигурационный fixture во время разработки (быстрее проверки регрессий).
- Если функциональности не хватает, проверьте, что загружен нужный пакет (shape, interaction, updater, plugin).

## Источники

- Документация интерфейса plugin: <https://particles.js.org/docs/modules/Core_Interfaces_IPlugin.html>
- Расширенное markdown-руководство: <https://github.com/tsparticles/tsparticles/blob/main/markdown/Plugins.md>
