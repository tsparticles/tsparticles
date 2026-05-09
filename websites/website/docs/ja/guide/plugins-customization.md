# プラグインとカスタマイズ

tsParticles は、カスタム shape、preset、plugin を使って実行時に拡張できます。

このガイドでは、まず完全な standalone パッケージを作らずに、アプリ内で直接カスタム動作を追加する最短ルートに焦点を当てます。

## クイック判断マップ

- 新しい描画プリミティブだけが必要なら **custom shape** を使います。
- 完全な options オブジェクトを再利用したいなら **custom preset** を使います。
- 実行時ロジック（container のライフサイクル、カスタム動作、options の解析）が必要なら **plugin** を使います。

## 拡張タイプ一覧

tsParticles のカスタマイズは、custom plugin だけにとどまりません。

- **Bundle**: 多数の機能を一度に登録するグループ化ローダー（`slim`、`basic`、`all`）。
- **Effect**: パーティクル描画エフェクト（`particles.effect`）。
- **Interaction**: パーティクルとイベント間の挙動。`external`（マウス/タッチ）と `particles`（粒子同士）に分かれます。
- **Palette**: 再利用可能なスタイル/カラーのプロファイル（`particles.palette`）。
- **Path**: パーティクル移動用の軌道ジェネレーター（`particles.move.path`）。
- **Plugin**: container/runtime の機能モジュール（例: emitters、absorbers、polygon mask）。
- **Preset**: 再利用可能な完全 options プロファイル（`preset`）。
- **Shape**: パーティクル描画プリミティブ（`particles.shape.type`）。
- **Updater**: パーティクル属性をフレームごとに更新する updater（tilt、roll、twinkle、opacity、size など）。

これらの分類を説明すると、ユーザーはカスタマイズの深さをすぐに理解できます。

## 早見表

| 種別        | 素早い作成（アプリ内ローカル）                                                              | 使い方                                                                   |
| ----------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Bundle      | 独自の `loadAppBundle(engine)` を構成して内部ローダーを呼ぶ                                 | `tsParticles.load(...)` の前に `await loadAppBundle(tsParticles)` を呼ぶ |
| Effect      | `pluginManager.addEffect("app-*", drawer)` で登録                                           | `particles.effect.type` に effect id を設定                              |
| Interaction | `pluginManager.addInteractor("app-*", interactor)` で登録                                   | `interactivity.events` で有効化 / 必要に応じて独自 mode 判定             |
| Palette     | `pluginManager.addPalette("app-*", palette)` で登録                                         | `particles.palette` に palette id を設定                                 |
| Path        | `pluginManager.addPathGenerator("app-*", generator)` で登録                                 | `particles.move.path.generator` に path id を設定                        |
| Plugin      | `IPlugin` + `IContainerPlugin` を作成し `engine.addPlugin(...)` を呼ぶ                      | plugin options と lifecycle hooks で有効化                               |
| Preset      | `tsParticles.addPreset("app-*", options)` で登録                                            | ルートの `preset` を設定                                                 |
| Shape       | `tsParticles.addShape("app-*", drawer)` で登録、または公式 shape パッケージをすべて読み込み | `particles.shape.type` と shape ごとの `particles.shape.options` を設定  |
| Updater     | `pluginManager.addParticleUpdater("app-*", updater)` で登録                                 | `isEnabled(...)` が `true` の粒子で自動実行                              |

## 拡張タイプ別: アプリ内での素早い作成と利用

すべてのサンプルは次のセットアップ順を前提とします:

```ts
await loadSlim(tsParticles);
// register custom pieces
await tsParticles.load({ id: "tsparticles", options });
```

### Bundle

必要な要素だけを接続する最小の app bundle を作成します。

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

### Interactions（external と particles）

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

`line` shape は stroke 駆動なので、`fill: false` を維持し、`particles.paint.stroke` を設定してください。

上記の `image.src` URL は既存のプロジェクト設定（`utils/configs`）から再利用しています。

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

これで各拡張タイプをローカルで試作でき、後から専用パッケージへ切り出せます。

## 構成戦略

- まずは 1 つの **bundle** から始めます（通常は `slim` で十分）。
- 不足機能は小さく焦点を絞ったモジュール（interaction/updater/path/effect/shape）で追加します。
- 動作の再利用には **preset**、見た目の再利用には **palette** を使います。
- まずはアプリ内ローカルのカスタム拡張として保持し、複数プロジェクトで再利用する段階で公開します。

## 実践ルール

- 拡張名は一意に保ちます（例: `app-*` や会社プレフィックス）。
- まずアプリ内ローカルで始め、複数プロジェクトで再利用される段階でパッケージ化します。
- 開発中は小さな設定 fixture を維持します（回帰確認が高速化）。
- 機能が不足している場合は、必要なパッケージ（shape、interaction、updater、plugin）が読み込まれているか確認します。

## 参考資料

- Plugin インターフェース資料: <https://particles.js.org/docs/modules/Core_Interfaces_IPlugin.html>
- 拡張 markdown ガイド: <https://github.com/tsparticles/tsparticles/blob/main/markdown/Plugins.md>
