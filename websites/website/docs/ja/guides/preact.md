---
title: Preact
description: 公式の @tsparticles/preact ラッパーを使用して tsParticles を Preact と統合します。
---

# Preact インテグレーション

`@tsparticles/preact` パッケージは、クラスコンポーネントと関数型コンポーネントの両方のパターンを含め、Preact とシームレスに動作する `<Particles>` コンポーネントを提供します。

## インストール

```bash
npm install @tsparticles/preact tsparticles
```

`@tsparticles/preact` パッケージには TypeScript 宣言が含まれています。追加の型パッケージは必要ありません。

## エンジンの初期化

パーティクルをレンダリングする前に、必要なプラグインでエンジンを初期化する必要があります。アプリがレンダリングされる前に、`initParticlesEngine` を1回呼び出します。

```typescript
import { initParticlesEngine } from "@tsparticles/preact";
import { loadFull } from "tsparticles";

void initParticlesEngine(async (engine) => {
  await loadFull(engine);
});
```

より小さなバンドルの場合は、必要な機能のみをロードします:

```typescript
import { initParticlesEngine } from "@tsparticles/preact";
import { loadBasic } from "@tsparticles/basic";
import { loadPolygonMaskPlugin } from "@tsparticles/plugin-polygon-mask";

void initParticlesEngine(async (engine) => {
  await loadBasic(engine);
  await loadPolygonMaskPlugin(engine);
});
```

`initParticlesEngine` は、すべてのプラグインが登録されると解決されるプロミスを返します。`<Particles>` コンポーネントは、初期化が完了するまでレンダリングされません。

## 基本的な使い方

エンジンが初期化されたら、アプリ内の任意の場所で `<Particles>` コンポーネントを使用します:

```jsx
import Particles from "@tsparticles/preact";
import configs from "@tsparticles/configs";

function App() {
  return <Particles id="tsparticles" options={configs.basic} />;
}
```

`id` 属性は、DOM 要素 ID と tsParticles が内部で使用するコンテナ識別子の両方を設定します。`options` プロップは、任意の有効な tsParticles 設定オブジェクトを受け入れます。

## プリセットの切り替え

`options` プロップを変更することで、プリセットを動的に切り替えます:

```jsx
import { useState } from "preact/hooks";
import Particles from "@tsparticles/preact";
import configs from "@tsparticles/configs";

function App() {
  const [preset, setPreset] = useState("basic");

  const presets = {
    basic: configs.basic,
    snow: configs.snow,
    stars: configs.stars,
    fireworks: configs.fireworks,
  };

  return (
    <div>
      <select onChange={(e) => setPreset(e.currentTarget.value)}>
        <option value="basic">Basic</option>
        <option value="snow">Snow</option>
        <option value="stars">Stars</option>
        <option value="fireworks">Fireworks</option>
      </select>
      <Particles id="tsparticles" key={preset} options={presets[preset]} />
    </div>
  );
}
```

`key` プロップを使用すると、Preact がコンポーネントを再マウントし、プリセットごとにパーティクルを完全に再起動します。

## クラスコンポーネント

クラスベースのコンポーネントの場合、`componentDidMount` でエンジンを初期化し、`componentDidUpdate` で状態を管理します:

```jsx
import { Component } from "preact";
import Particles, { initParticlesEngine } from "@tsparticles/preact";
import { loadFull } from "tsparticles";
import configs from "@tsparticles/configs";

export default class ParticlesApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      engineReady: false,
      options: configs.basic,
    };
  }

  componentDidMount() {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      this.setState({ engineReady: true });
    });
  }

  handlePresetChange = (e) => {
    const presets = {
      basic: configs.basic,
      snow: configs.snow,
      stars: configs.stars,
    };
    this.setState({ options: presets[e.currentTarget.value] || configs.basic });
  };

  render() {
    const { engineReady, options } = this.state;

    return (
      <div>
        <select onChange={this.handlePresetChange}>
          <option value="basic">Basic</option>
          <option value="snow">Snow</option>
          <option value="stars">Stars</option>
        </select>
        {engineReady && <Particles id="tsparticles" options={options} />}
      </div>
    );
  }
}
```

## 関数型コンポーネント

フックを使用する場合、`useState` と `useEffect` を使用してエンジンを初期化し、設定を管理します:

```jsx
import { useState, useEffect } from "preact/hooks";
import Particles, { initParticlesEngine } from "@tsparticles/preact";
import { loadFull } from "tsparticles";
import configs from "@tsparticles/configs";

export default function App() {
  const [engineReady, setEngineReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => setEngineReady(true));
  }, []);

  return <div>{engineReady && <Particles id="tsparticles" options={configs.snow} />}</div>;
}
```

## カスタム設定

プリセットを使用せずに、設定オブジェクトを直接定義します:

```jsx
import { useState, useEffect } from "preact/hooks";
import Particles, { initParticlesEngine } from "@tsparticles/preact";
import { loadFull } from "tsparticles";

export default function App() {
  const [engineReady, setEngineReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => setEngineReady(true));
  }, []);

  const options = {
    background: {
      color: "#0d1117",
    },
    fpsLimit: 120,
    particles: {
      color: {
        value: "#58a6ff",
      },
      links: {
        color: "#58a6ff",
        enable: true,
        opacity: 0.4,
        distance: 150,
      },
      move: {
        enable: true,
        speed: 2,
      },
      number: {
        value: 80,
        density: {
          enable: true,
        },
      },
      opacity: {
        value: 0.5,
      },
      size: {
        value: { min: 1, max: 4 },
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
      modes: {
        repulse: {
          distance: 100,
        },
        push: {
          quantity: 4,
        },
      },
    },
  };

  return <>{engineReady && <Particles id="tsparticles" options={options} />}</>;
}
```


## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## イベント処理

`particlesLoaded` コールバックを使用して、パーティクルが完全にレンダリングされた後に tsParticles の `Container` インスタンスにアクセスします:

```jsx
import { useCallback, useState, useEffect } from "preact/hooks";
import Particles, { initParticlesEngine } from "@tsparticles/preact";
import { loadFull } from "tsparticles";
import configs from "@tsparticles/configs";

export default function App() {
  const [engineReady, setEngineReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => setEngineReady(true));
  }, []);

  const handleParticlesLoaded = useCallback(async (container) => {
    console.log("Particles container ready:", container);
    container?.refresh();
  }, []);

  return (
    <div>
      {engineReady && <Particles id="tsparticles" options={configs.basic} particlesLoaded={handleParticlesLoaded} />}
    </div>
  );
}
```

`particlesLoaded` コールバックは `Container` インスタンスを受け取り、`refresh()`、`pause()`、`play()`、`destroy()` などのメソッドを呼び出すために使用できます。
