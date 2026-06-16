# Web Components

`@tsparticles/webcomponents` パッケージを使用して、ネイティブの Web Components で tsParticles を使用します。このアプローチにはフレームワークは不要で、プレーンな JavaScript とカスタム要素のみで動作します。

## インストール

### CDN 経由

tsParticles コアと Web Components バンドルをインクルードします:

```html
<script src="https://cdn.jsdelivr.net/npm/tsparticles@4/tsparticles.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/webcomponents@4/tsparticles.webcomponents.min.js"></script>
```

### npm + ビルド経由

```bash
npm install @tsparticles/webcomponents tsparticles
```

次に、JavaScript バンドルにインポートします:

```javascript
import { initParticlesEngine, defineParticlesElement } from "@tsparticles/webcomponents";
```

## エンジンの初期化

`<web-particles>` 要素がレンダリングできるようになる前に、必要な機能でエンジンを初期化する必要があります。目的のプラグインをロードするコールバックを指定して `initParticlesEngine` を呼び出します:

```javascript
import { initParticlesEngine } from "@tsparticles/webcomponents";

const { loadFull } = await import("tsparticles");

await initParticlesEngine(async (engine) => {
  await loadFull(engine);
});
```

> **なぜ `loadFull` なのか？** すべての組み込みシェイプ（円、四角、多角形、画像など）、インタラクション（ホバー、クリック）、アップデーター（不透明度、サイズ、色など）を登録します。より小さなバンドルの場合は、`tsparticles-slim` を使用するか、個別のプラグインを選択してください。

## カスタム要素の定義

エンジンの初期化後、`<web-particles>` カスタム要素を登録します:

```javascript
import { defineParticlesElement } from "@tsparticles/webcomponents";

defineParticlesElement();
```

これにより、`web-particles` タグがブラウザの `CustomElementRegistry` に登録されます。複数回呼び出しても安全です — 重複した登録は無視されます。

## 基本的な使い方

`initParticlesEngine` と `defineParticlesElement` の両方が実行されたら、HTML で要素を直接使用します:

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>tsParticles Web Components</title>
  </head>
  <body>
    <web-particles id="tsparticles"></web-particles>

    <script type="module">
      import { initParticlesEngine, defineParticlesElement } from "@tsparticles/webcomponents";

      const { loadFull } = await import("tsparticles");

      await initParticlesEngine(async (engine) => {
        await loadFull(engine);
      });

      defineParticlesElement();

      const el = document.getElementById("tsparticles");
      el.options = {
        background: { color: "#0d47a1" },
        particles: {
          number: { value: 80 },
          links: { enable: true, color: "#ffffff" },
          move: { enable: true, speed: 2 },
        },
      };
    </script>
  </body>
</html>
```

## カスタム設定

`<web-particles>` 要素は、`options` プロパティ（JavaScript オブジェクト）または `options` 属性の JSON を介して設定を受け入れます。

### JavaScript プロパティ経由

```javascript
const el = document.querySelector("web-particles");
el.options = {
  background: { color: "#000000" },
  fpsLimit: 60,
  particles: {
    color: { value: ["#ff0000", "#00ff00", "#0000ff"] },
    links: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
    },
    move: {
      enable: true,
      speed: 3,
      outModes: "bounce",
    },
    number: { value: 60 },
    opacity: { value: 0.6 },
    shape: { type: ["circle", "square"] },
    size: { value: { min: 2, max: 6 } },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "repulse" },
      onClick: { enable: true, mode: "push" },
    },
    modes: {
      repulse: { distance: 200 },
      push: { quantity: 4 },
    },
  },
};
```

### HTML 属性（JSON）経由

```html
<web-particles
  id="tsparticles"
  options='{
    "background": { "color": "#0d47a1" },
    "particles": {
      "number": { "value": 50 },
      "links": { "enable": true, "color": "#ffffff" },
      "move": { "enable": true, "speed": 2 }
    }
  }'
></web-particles>
```

> `options` 属性を使用する場合、値は有効な JSON である必要があります。複雑な設定にはプロパティ割り当てが推奨されます。

## 動的な作成

`<web-particles>` 要素を完全に JavaScript で作成し、いつでも DOM に追加できます:

```javascript
import { initParticlesEngine, defineParticlesElement } from "@tsparticles/webcomponents";

const { loadFull } = await import("tsparticles");

await initParticlesEngine(async (engine) => {
  await loadFull(engine);
});

defineParticlesElement();

function createParticles(container, config) {
  const el = document.createElement("web-particles");
  el.id = "dynamic-particles";
  el.style.position = "absolute";
  el.style.width = "100%";
  el.style.height = "100%";
  el.style.top = "0";
  el.style.left = "0";
  el.options = config;
  container.appendChild(el);
  return el;
}

// 使用例
const particles = createParticles(document.body, {
  background: { color: "#1a1a2e" },
  particles: {
    number: { value: 100 },
    links: { enable: true, color: "#e94560" },
    move: { enable: true, speed: 1 },
  },
});
```

## カスタム要素の拡張

`ParticlesElement` をサブクラス化して、組み込み設定付きの独自のカスタム要素を作成できます:

```javascript
import { initParticlesEngine, ParticlesElement } from "@tsparticles/webcomponents";

const { loadFull } = await import("tsparticles");

await initParticlesEngine(async (engine) => {
  await loadFull(engine);
});

class MyParticlesBackground extends ParticlesElement {
  constructor() {
    super();
    this.style.position = "fixed";
    this.style.top = "0";
    this.style.left = "0";
    this.style.width = "100%";
    this.style.height = "100%";
    this.style.zIndex = "-1";
  }

  connectedCallback() {
    this.options = {
      background: { color: "#0d47a1" },
      particles: {
        number: { value: 80 },
        links: { enable: true, color: "#ffffff" },
        move: { enable: true, speed: 2 },
      },
    };
    super.connectedCallback();
  }
}

customElements.define("my-particles-bg", MyParticlesBackground);
```

使用例:

```html
<my-particles-bg></my-particles-bg>
```

## コンテナへのアクセスと制御

カスタム要素は、命令的な制御のための tsParticles `Container` インスタンスを公開します:

```javascript
const el = document.querySelector("web-particles");

// コンテナへのアクセス（connectedCallback 後に利用可能）
const container = el.container;
container?.pause();
container?.play();

// 破棄してクリーンアップ
el.dispose();
```

## 完全な例

CDN スクリプトで Web Components モジュールを使用した完全な HTML ページ:

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>tsParticles Web Components Demo</title>
    <style>
      body {
        margin: 0;
        overflow: hidden;
      }
      web-particles {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
      .content {
        position: relative;
        z-index: 1;
        color: white;
        text-align: center;
        padding-top: 20vh;
        font-family: sans-serif;
      }
    </style>
  </head>
  <body>
    <div class="content">
      <h1>tsParticles + Web Components</h1>
      <p>Native custom elements, no framework required.</p>
    </div>

    <web-particles id="tsparticles"></web-particles>

    <script type="module">
      import {
        initParticlesEngine,
        defineParticlesElement,
      } from "https://cdn.jsdelivr.net/npm/@tsparticles/webcomponents@4/tsparticles.webcomponents.min.js";

      const tsParticles = window.tPparticles;

      await initParticlesEngine(async (engine) => {
        await tsParticles.loadFull(engine);
      });

      defineParticlesElement();

      const el = document.getElementById("tsparticles");
      el.options = {
        background: { color: "#0d47a1" },
        fpsLimit: 60,
        particles: {
          number: { value: 100 },
          color: { value: "#ffffff" },
          links: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
          },
          move: {
            enable: true,
            speed: 2,
            outModes: "out",
          },
          size: {
            value: { min: 1, max: 4 },
          },
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
    </script>
  </body>
</html>
```


## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## API リファレンス

| エクスポート / プロパティ       | タイプ                   | 説明                                                       |
| ------------------------------- | ------------------------ | ---------------------------------------------------------- |
| `initParticlesEngine(callback)` | `function`               | プラグインローダーで tsParticles エンジンを初期化します    |
| `defineParticlesElement()`      | `function`               | `<web-particles>` カスタム要素を登録します                 |
| `ParticlesElement`              | `class`                  | カスタム要素を拡張するための基底クラス                     |
| `element.options`               | `ISourceOptions`         | パーティクル設定オブジェクトの取得/設定                    |
| `element.container`             | `Container \| undefined` | 基礎となる `Container` への読み取り専用参照                |
| `element.dispose()`             | `function`               | パーティクルインスタンスを破棄してリソースをクリーンアップ |
