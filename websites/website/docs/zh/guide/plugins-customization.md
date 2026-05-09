# 插件与自定义

tsParticles 可以在运行时通过自定义形状、预设和插件进行扩展。

本指南聚焦快速路径：先不创建完整的独立包，直接在应用内添加自定义行为。

## 快速决策图

- 当你只需要新的绘制图元时，使用 **custom shape**。
- 当你想复用一个完整的 options 对象时，使用 **custom preset**。
- 当你需要运行时逻辑（容器生命周期、自定义行为、选项解析）时，使用 **plugin**。

## 扩展类型一览

tsParticles 的自定义能力不仅限于自定义插件。

- **Bundle**：分组加载器，一次注册多个特性（`slim`、`basic`、`all`）。
- **Effect**：粒子渲染效果（`particles.effect`）。
- **Interaction**：粒子与事件之间的交互行为；分为 `external`（鼠标/触摸）和 `particles`（粒子-粒子）。
- **Palette**：可复用的样式/颜色配置（`particles.palette`）。
- **Path**：粒子运动路径生成器（`particles.move.path`）。
- **Plugin**：容器/运行时功能模块（例如 emitters、absorbers、polygon mask）。
- **Preset**：可复用的完整选项配置（`preset`）。
- **Shape**：粒子绘制图元（`particles.shape.type`）。
- **Updater**：逐帧更新粒子属性的更新器（tilt、roll、twinkle、opacity、size 等）。

向用户解释这些类别后，他们会立刻理解自定义可以做到多深。

## 汇总表

| 类型        | 快速创建（应用内本地）                                                     | 使用方式                                                                |
| ----------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Bundle      | 组合自己的 `loadAppBundle(engine)` 并调用内部加载器                        | 在 `tsParticles.load(...)` 之前调用 `await loadAppBundle(tsParticles)`  |
| Effect      | 使用 `pluginManager.addEffect("app-*", drawer)` 注册                       | 将 `particles.effect.type` 设为你的 effect id                           |
| Interaction | 使用 `pluginManager.addInteractor("app-*", interactor)` 注册               | 在 `interactivity.events` 中启用 / 可选自定义模式判断                   |
| Palette     | 使用 `pluginManager.addPalette("app-*", palette)` 注册                     | 将 `particles.palette` 设为你的 palette id                              |
| Path        | 使用 `pluginManager.addPathGenerator("app-*", generator)` 注册             | 将 `particles.move.path.generator` 设为你的 path id                     |
| Plugin      | 创建 `IPlugin` + `IContainerPlugin` 并调用 `engine.addPlugin(...)`         | 通过插件选项和生命周期钩子启用                                          |
| Preset      | 使用 `tsParticles.addPreset("app-*", options)` 注册                        | 设置根级 `preset`                                                       |
| Shape       | 使用 `tsParticles.addShape("app-*", drawer)` 注册，或加载全部官方 shape 包 | 设置 `particles.shape.type` 以及每种 shape 的 `particles.shape.options` |
| Updater     | 使用 `pluginManager.addParticleUpdater("app-*", updater)` 注册             | 在 `isEnabled(...)` 返回 `true` 的粒子上自动运行                        |

## 按扩展类型快速本地创建与使用

所有示例都假设采用以下初始化顺序：

```ts
await loadSlim(tsParticles);
// register custom pieces
await tsParticles.load({ id: "tsparticles", options });
```

### Bundle

创建一个小型应用 bundle，只接入你需要的组件。

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

### 交互（external 和 particles）

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

`line` shape 是基于描边绘制的，因此请保持 `fill: false`，并配置 `particles.paint.stroke`。

上面的 `image.src` URL 复用了项目中现有配置（`utils/configs`）。

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

这些内容足以在本地原型化所有扩展类型，之后再提取到独立包中。

## 组合策略

- 从一个 **bundle** 开始（通常 `slim` 就足够）。
- 将缺失能力作为小而聚焦的模块补齐（interaction/updater/path/effect/shape）。
- 用 **preset** 复用行为，用 **palette** 复用视觉风格。
- 先保持应用内本地扩展，只有在跨项目复用时再发布。

## 实用规则

- 保持扩展名称唯一（例如 `app-*` 或公司前缀）。
- 先做应用内本地实现，只有在多个项目复用时再抽成包。
- 开发时保留一个小型配置 fixture（回归检查更快）。
- 如果某个功能缺失，先确认所需包已加载（shape、interaction、updater、plugin）。

## 参考来源

- Plugin 接口文档：<https://particles.js.org/docs/modules/Core_Interfaces_IPlugin.html>
- 扩展版 markdown 指南：<https://github.com/tsparticles/tsparticles/blob/main/markdown/Plugins.md>
