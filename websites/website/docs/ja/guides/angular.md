---
title: Angular インテグレーション
description: "@tsparticles/angular を使用して tsParticles を Angular アプリケーションに統合するためのステップバイステップガイド。"
---

# Angular インテグレーション

`@tsparticles/angular` パッケージは、tsParticles の Angular コンポーネント、モジュール、およびサービスを提供します。このガイドでは、従来の `NgModule` アプローチと Angular 17+ のスタンドアロンコンポーネントの両方をカバーします。

---

## インストール

```bash
npm install @tsparticles/angular @tsparticles/engine
```

すべての機能が必要な場合は、完全なバンドルをインストールしてください:

```bash
npm install tsparticles
```

オプションのプリセットパッケージ:

```bash
npm install @tsparticles/preset-confetti
npm install @tsparticles/preset-fireworks
npm install @tsparticles/preset-snow
npm install @tsparticles/preset-stars
```

---

## 基本的な使い方 (NgModule)

### 1. モジュールのインポート

```typescript
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NgParticlesModule } from "@tsparticles/angular";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgParticlesModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

### 2. エンジンの初期化

```typescript
import { Component, OnInit } from "@angular/core";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { loadFull } from "tsparticles";
import { NgParticlesService } from "@tsparticles/angular";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(private readonly ngParticlesService: NgParticlesService) {}

  ngOnInit(): void {
    void this.ngParticlesService.init(async (engine: Engine) => {
      await loadFull(engine);
    });
  }

  particlesOptions: ISourceOptions = {
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

  particlesLoaded(container: Container): void {
    console.log("Particles container loaded", container);
  }
}
```

### 3. テンプレート

```html
<ngx-particles
  id="tsparticles"
  [options]="particlesOptions"
  (particlesLoaded)="particlesLoaded($event)"
></ngx-particles>
```

---

## エンジン初期化の詳細

`NgParticlesService.init()` メソッドは、通常 `AppComponent.ngOnInit()` で1回だけ呼び出す必要があります。アプリケーションが必要とするプラグイン/プリセットをロードするコールバックを受け取ります。

```typescript
import { Component, OnInit } from "@angular/core";
import { NgParticlesService } from "@tsparticles/angular";
import type { Engine } from "@tsparticles/engine";

@Component({ ... })
export class AppComponent implements OnInit {
  constructor(private readonly ngParticlesService: NgParticlesService) {}

  ngOnInit(): void {
    void this.ngParticlesService.init(async (engine: Engine) => {
      // バンドルを小さくするために必要なものだけをロード
      await loadBasic(engine);       // 基本シェイプ + 移動
      await loadEmittersPlugin(engine); // エミッターシェイプ
    });
  }
}
```

`tsparticles` から利用可能なローダー関数:

| 関数                | 説明                                             |
| ------------------- | ------------------------------------------------ |
| `loadFull(engine)`  | すべての機能（最大のバンドル）                   |
| `loadBasic(engine)` | コアシェイプ（円、四角、多角形など）             |
| `loadSlim(engine)`  | ほとんどの機能からレアに使われるプラグインを除外 |
| `loadAll(engine)`   | `loadFull` の非推奨エイリアス                    |

---

## クラッカーエフェクト

```bash
npm install @tsparticles/preset-confetti
```

```typescript
import { loadConfettiPreset } from "@tsparticles/preset-confetti";

// NgParticlesService.init コールバック内:
await loadConfettiPreset(engine);
```

```typescript
particlesOptions: ISourceOptions = {
  preset: "confetti",
  background: {
    color: "transparent",
  },
};
```

または、便利な `<ngx-confetti>` コンポーネントを使用:

```typescript
// app.module.ts
import { NgParticlesModule } from "@tsparticles/angular";

@NgModule({
  imports: [NgParticlesModule],
})
export class AppModule {}
```

```html
<ngx-confetti
  [options]="{
    particleCount: 200,
    colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00']
  }"
></ngx-confetti>
```

---

## 花火エフェクト

```bash
npm install @tsparticles/preset-fireworks
```

```typescript
import { loadFireworksPreset } from "@tsparticles/preset-fireworks";

// NgParticlesService.init コールバック内:
await loadFireworksPreset(engine);
```

```typescript
particlesOptions: ISourceOptions = {
  preset: "fireworks",
  background: {
    color: "#000000",
  },
};
```

または、`<ngx-fireworks>` コンポーネントを使用:

```html
<ngx-fireworks
  [options]="{
    explosion: 8,
    intensity: 30,
    flickering: 50,
    traceLength: 3
  }"
></ngx-fireworks>
```

> 花火の自動開始は避けてください。不要なリソース使用を防ぐため、ユーザーアクション（クリック、スクロール）にバインドしてください。

---

## カスタムパーティクル設定

インタラクティビティを備えた本格的なカスタムパーティクル設定:

```typescript
import { Component, OnInit } from "@angular/core";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { loadFull } from "tsparticles";
import { NgParticlesService } from "@tsparticles/angular";

@Component({
  selector: "app-particles",
  templateUrl: "./particles.component.html",
})
export class ParticlesComponent implements OnInit {
  constructor(private readonly ngParticlesService: NgParticlesService) {}

  ngOnInit(): void {
    void this.ngParticlesService.init(async (engine: Engine) => {
      await loadFull(engine);
    });
  }

  particlesOptions: ISourceOptions = {
    background: {
      color: "#0d0d0d",
    },
    fpsLimit: 60,
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
        },
      },
      color: {
        value: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"],
      },
      shape: {
        type: ["circle", "square", "triangle"],
      },
      opacity: {
        value: 0.8,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          sync: false,
        },
      },
      size: {
        value: { min: 2, max: 8 },
        random: true,
        anim: {
          enable: true,
          speed: 4,
          size_min: 1,
          sync: false,
        },
      },
      links: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.3,
        width: 1,
        triangles: {
          enable: true,
          color: "#ffffff",
          opacity: 0.05,
        },
      },
      move: {
        enable: true,
        speed: 3,
        direction: "none",
        random: true,
        straight: false,
        outModes: "bounce",
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 600,
        },
      },
      life: {
        duration: {
          value: 5,
          random: true,
        },
        count: 0,
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
        resize: {
          enable: true,
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
    detectRetina: true,
  };

  particlesLoaded(container: Container): void {
    console.log("Container loaded", container);
  }
}
```

```html
<ngx-particles
  id="tsparticles"
  [options]="particlesOptions"
  (particlesLoaded)="particlesLoaded($event)"
></ngx-particles>
```

---

## イベント

`ngx-particles` コンポーネントは `particlesLoaded` イベントを発行します:

```typescript
import type { Container } from "@tsparticles/engine";

// コンポーネントのメソッド
onParticlesLoaded(container: Container): void {
  // コンテナ API へのアクセス
  container.pause();
  container.play();
  container.destroy();
  container.exportImage().then((blob) => { /* ... */ });
}
```

```html
<ngx-particles
  id="tsparticles"
  [options]="particlesOptions"
  (particlesLoaded)="onParticlesLoaded($event)"
></ngx-particles>
```

コンテナ参照により、一時停止、再開、破棄、エクスポートなど、完全なプログラム制御が可能になります。

---

## テンプレート構文と条件付きレンダリング

Angular の構造ディレクティブを使用してコンポーネントを切り替えます:

```html
<button (click)="showParticles = !showParticles">Toggle Particles</button>

<ngx-particles
  *ngIf="showParticles"
  id="tsparticles"
  [options]="particlesOptions"
  (particlesLoaded)="particlesLoaded($event)"
></ngx-particles>
```

```typescript
export class AppComponent {
  showParticles = true;
  // ...
}
```

`*ngIf` が `false` と評価されると、コンポーネント（キャンバスとすべてのパーティクルインスタンスを含む）が破棄されます。再作成すると、すべてが最初から再初期化されます。

---

## スタンドアロンコンポーネント (Angular 17+)

Angular 17+ では、スタンドアロンコンポーネントに `NgParticlesModule` を直接インポートできます:

```typescript
import { Component, OnInit } from "@angular/core";
import { NgParticlesModule, NgParticlesService } from "@tsparticles/angular";
import { loadFull } from "tsparticles";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

@Component({
  selector: "app-particles",
  standalone: true,
  imports: [NgParticlesModule],
  template: `
    <ngx-particles
      id="tsparticles"
      [options]="particlesOptions"
      (particlesLoaded)="particlesLoaded($event)"
    ></ngx-particles>
  `,
})
export class ParticlesComponent implements OnInit {
  constructor(private readonly ngParticlesService: NgParticlesService) {}

  ngOnInit(): void {
    void this.ngParticlesService.init(async (engine: Engine) => {
      await loadFull(engine);
    });
  }

  particlesOptions: ISourceOptions = {
    background: { color: "#000" },
    particles: {
      number: { value: 50 },
      color: { value: "#fff" },
      shape: { type: "circle" },
      move: { enable: true, speed: 2 },
    },
  };

  particlesLoaded(container: Container): void {
    console.log("Loaded", container);
  }
}
```

`NgModule` ラッパーは不要です — コンポーネントの `imports` 配列に `NgParticlesModule` をインポートするだけです。

---

## 完全なコンポーネント例

### app.component.ts

```typescript
import { Component, OnInit } from "@angular/core";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { NgParticlesService } from "@tsparticles/angular";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "tsParticles Angular Demo";

  constructor(private readonly ngParticlesService: NgParticlesService) {}

  ngOnInit(): void {
    void this.ngParticlesService.init(async (engine: Engine) => {
      await loadSlim(engine);
    });
  }

  particlesOptions: ISourceOptions = {
    autoPlay: true,
    background: {
      color: "#1e1e2e",
      image: "",
      position: "50% 50%",
      repeat: "no-repeat",
      size: "cover",
    },
    backgroundMask: {
      cover: {
        color: "#1e1e2e",
      },
      enable: false,
    },
    fullScreen: {
      enable: true,
      zIndex: -1,
    },
    detectRetina: true,
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
        speed: 1,
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
  };

  particlesLoaded(container: Container): void {
    console.log("Particles loaded", container);
  }
}
```

### app.component.html

```html
<div style="position: relative; width: 100%; height: 100vh;">
  <ngx-particles
    id="tsparticles"
    [options]="particlesOptions"
    (particlesLoaded)="particlesLoaded($event)"
  ></ngx-particles>

  <div
    style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; text-align: center;"
  >
    <h1>{{ title }}</h1>
    <p>Particles are running in the background.</p>
  </div>
</div>
```

### app.component.css

```css
:host {
  display: block;
  width: 100%;
  height: 100%;
}
```

---

## API リファレンス

| コンポーネント | セレクタ        | 説明                                     |
| -------------- | --------------- | ---------------------------------------- |
| Particles      | `ngx-particles` | 完全なパーティクルシステムコンポーネント |
| Confetti       | `ngx-confetti`  | プリ設定されたクラッカーエフェクト       |
| Fireworks      | `ngx-fireworks` | プリ設定された花火エフェクト             |

### `ngx-particles` 入力

| 入力      | タイプ           | デフォルト      | 説明                                                                      |
| --------- | ---------------- | --------------- | ------------------------------------------------------------------------- |
| `id`      | `string`         | `"tsparticles"` | キャンバス要素 ID                                                         |
| `options` | `ISourceOptions` | `{}`            | パーティクル設定                                                          |
| `url`     | `string`         | —               | リモート JSON 設定 URL                                                    |
| `theme`   | `string`         | —               | Theme name (requires `@tsparticles/plugin-themes`; safe no-op otherwise). |

### `ngx-particles` 出力

| 出力              | ペイロード  | 説明                                     |
| ----------------- | ----------- | ---------------------------------------- |
| `particlesLoaded` | `Container` | コンテナが初期化されたときに発行されます |

---

## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## トラブルシューティング

- **空白/表示されないキャンバス** — 親要素に定義された高さがあることを確認してください（例: `height: 100vh`）。キャンバスはコンテナの寸法を継承します。
- **`NgParticlesService.init()` が複数回呼ばれた場合** — 1回だけ呼び出してください。通常は `AppComponent.ngOnInit()` で行います。後続の呼び出しは安全ですが冗長です。
- **モジュールが見つからない** — `@tsparticles/angular` が `package.json` の依存関係にリストされ、`NgParticlesModule` をインポートしていることを確認してください。
- **`NullInjectorError: No provider for NgParticlesService`** — コンポーネントを提供するモジュールで `NgParticlesModule` をインポート（または再エクスポート）する必要があります。
