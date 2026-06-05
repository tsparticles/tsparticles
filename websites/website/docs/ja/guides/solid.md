---
title: SolidJS インテグレーション
description: 公式の @tsparticles/solid ラッパーを使用して tsParticles を SolidJS アプリケーションに統合するためのステップバイステップガイド。
---

# SolidJS インテグレーション

このガイドでは、公式の `@tsparticles/solid` ラッパーを使用して **SolidJS** プロジェクトに tsParticles を統合する方法を説明します。SolidJS のきめ細かいリアクティビティモデルは tsParticles と相性が良く、オプションの変更が完全な再初期化なしでターゲットを絞ったキャンバス更新をトリガーします。

## インストール

SolidJS ラッパーと選択したエンジンバンドルをインストールします:

```bash
npm install @tsparticles/solid tsparticles
```

より小さなバンドルには、`@tsparticles/slim` を使用します:

```bash
npm install @tsparticles/solid @tsparticles/slim
```

## 基本的な使い方

SolidJS は完全にブラウザで実行されるため（SSR なし）、サーバーレンダリングに対するガードは必要ありません。ただし、パーティクルをレンダリングする前にエンジンを非同期で初期化する必要があります。

`onMount` 内で `initParticlesEngine` を使用してエンジン機能をロードし、`<Show>` で条件付きで `<Particles>` コンポーネントをレンダリングします:

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

`<Show>` コンポーネントは、エンジンの準備ができた後にのみ `<Particles>` 要素が DOM に挿入されるようにします。

## エンジンの初期化

`initParticlesEngine` 関数は、`Engine` インスタンスを受け取るコールバックを受け入れます。このコールバックを使用して、設定に必要な機能を登録します:

```tsx
import { initParticlesEngine } from "@tsparticles/solid";
import { loadFull } from "tsparticles";
import { loadSlim } from "@tsparticles/slim";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";
import type { Engine } from "@tsparticles/engine";

// 最小限 — 基本的なシェイプと移動のみ
initParticlesEngine((engine: Engine) => loadSlim(engine)).then(() => {
  console.log("Engine ready (slim)");
});

// 完全 — すべての機能を含む
initParticlesEngine((engine: Engine) => loadFull(engine)).then(() => {
  console.log("Engine ready (full)");
});

// プリセットのみ — 特定のプリセットに必要な機能のみ
initParticlesEngine((engine: Engine) => loadConfettiPreset(engine)).then(() => {
  console.log("Confetti preset loaded");
});
```

`initParticlesEngine` はアプリ内で1回呼び出します — 通常はルートコンポーネントの `onMount` で行います。エンジンインスタンスはキャッシュされるため、後続の呼び出しは即座に返ります。

## 条件付きレンダリング

SolidJS の `<Show>` 制御フローを使用して、エンジンが初期化されるまでレンダリングを延期します:

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
    <Show when={ready()} fallback={<p>Loading particles...</p>}>
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

`fallback` プロップは、エンジン初期化中にローディングインジケーターを表示します。

## プリセットの使用

クイックでデザイン済みの設定には `@tsparticles/configs` を使用します:

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

利用可能な設定には、`basic`、`bubbles`、`snow`、`stars`、`fireworks`、`confetti`、`links` などがあります。

## インタラクティブパーティクル

`interactivity` セクションを設定して、クリックとホバーのインタラクションを追加します:

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

- **ホバーモード**: `grab`、`bubble`、`repulse`、`attract`、`slow`、`connect`
- **クリックモード**: `push`、`remove`、`repulse`、`bubble`、`attract`、`pause`

## カスタム設定

複数のパーティクルシェイプ、カラーパレット、モーション設定を備えた完全なカスタム設定:

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

## 完全な TypeScript の例

コンテナ参照、エンジン初期化、手動コントロールを備えた完全な型付けコンポーネント:

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
        {paused() ? "Resume" : "Pause"}
      </button>
    </Show>
  );
};

export default App;
```

## シグナルを使用した動的オプション

SolidJS の強みの1つはきめ細かいリアクティビティです。シグナルを使用してパーティクルオプションを駆動すると、キャンバスが効率的に更新されます:

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

  // options は通常のオブジェクトです — Particle コンポーネントの内部追跡を通じてリアクティブに読み取られます
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
          Color:
          <input type="color" value={color()} onInput={(e) => setColor(e.currentTarget.value)} />
        </label>
        <label>
          Count:
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

`options` はシグナルにアクセスする関数であるため、`color()` または `particleCount()` が変更されるたびに、`<Particles>` コンポーネントは新しい options オブジェクトを受け取り、変更されたプロパティのみを既存のキャンバスに適用します。

## カスタムオーバーライド付きプリセット

プリセットをロードし、カスタムオーバーライドをマージして調整されたエフェクトを作成します:

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
      // 雪の色を青にオーバーライド
      color: { value: "#88ccff" },
      // フレークの数を増やす
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

プリセットはすべてのオプションにデフォルト値を提供し、オーバーライドはその上にマージされます — 変更したいプロパティのみを指定する必要があります。

## トラブルシューティング

| 症状                      | 原因                                   | 修正                                                                      |
| ---------------------------- | --------------------------------------- | ------------------------------------------------------------------------ |
| 空の DOM 要素            | レンダリング前にエンジンが初期化されていない | `<Particles>` を `<Show when={initialized()}>` でラップ                      |
| パーティクルが表示されない         | `move.enable` または `number.value` がない | `particles.move.enable: true` と `particles.number.value > 0` を確認    |
| キャンバスがコンテンツの背後 | fullScreen に `zIndex` がない          | `fullScreen: { zIndex: -1 }` を使用                                         |
| オプションの変更が反映されない | オブジェクト参照が変更されていない           | オプションを関数またはストアでラップ; 静的オブジェクトを避ける                |
| エンジンが見つからない     | `loadFull` または `loadSlim` のインポートがない | `tsparticles` または `@tsparticles/slim` をインストールし、`loadFull(engine)` を呼び出す |

## 次のステップ

- [Configs プレイグラウンド](/playground/configs) ですぐに使える設定を探索してください。
- パラメーターの完全なリストについては、[オプションリファレンス](/options/) をお読みください。
- GitHub の [SolidJS ソース](https://github.com/tsparticles/solid) でラッパーの内部を確認してください。
