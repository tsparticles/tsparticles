---
title: Next.js インテグレーション
description: App Router を使用して tsParticles を Next.js アプリケーションに統合するためのステップバイステップガイド。
---

# Next.js インテグレーション

このガイドでは、**App Router**（Next.js 13+）を使用して tsParticles を Next.js プロジェクトに統合する方法を説明します。従来の Pages Router については、下部の [従来の Pages Router](#legacy-pages-router) セクションを参照してください。

## インストール

`@tsparticles/react` ラッパーと完全な `tsparticles` エンジン（またはより小さなビルド用のスリムバンドル）をインストールします:

```bash
npm install @tsparticles/react tsparticles
```

より小さな `@tsparticles/slim` バンドルを希望する場合:

```bash
npm install @tsparticles/react @tsparticles/slim
```

## 基本的な使い方（App Router）

Next.js App Router のコンポーネントはデフォルトでサーバーサイドです。tsParticles はブラウザの `canvas` API を必要とするため、コンポーネントに `"use client"` ディレクティブを指定する必要があります。

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useCallback, useMemo } from "react";
import type { Container, ISourceOptions } from "@tsparticles/engine";

export default function ParticlesBackground() {
  const particlesLoaded = useCallback((container?: Container) => {
    console.log("Particles loaded", container);
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { zIndex: -1 },
      background: { color: "#0d47a1" },
      particles: {
        number: { value: 80 },
        links: { enable: true, color: "#ffffff" },
        move: { enable: true },
        size: { value: 3 },
      },
    }),
    [],
  );

  return <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options} />;
}
```

これを `components/particles-background.tsx` として作成し、任意のページまたはレイアウトにインポートします。ファイルが `"use client"` で始まるため、クライアントでレンダリングされます — tsParticles が必要とするまさにその場所です。

## テーマ切り替え

tsParticles を Next.js のテーマトグルと組み合わせて、現在のテーマ状態からオプションを導出します:

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useMemo, useState, useCallback } from "react";
import type { Container, ISourceOptions } from "@tsparticles/engine";

export default function ThemeAwareParticles() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  const particlesLoaded = useCallback((_container?: Container) => {}, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { zIndex: -1 },
      background: {
        color: theme === "dark" ? "#000000" : "#ffffff",
      },
      particles: {
        color: { value: theme === "dark" ? "#ffffff" : "#000000" },
        number: { value: 100 },
        links: {
          enable: true,
          color: theme === "dark" ? "#ffffff" : "#000000",
        },
        move: { enable: true },
      },
    }),
    [theme],
  );

  return (
    <>
      <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options} />
      <button
        onClick={toggleTheme}
        style={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 10,
          padding: "8px 16px",
        }}
      >
        Switch to {theme === "dark" ? "Light" : "Dark"} Mode
      </button>
    </>
  );
}
```

`options` オブジェクトは `theme` が変更されるたびに `useMemo` を介して再作成されるため、キャンバスは自動的に更新されます。

## クラッカーエフェクト

`@tsparticles/preset-confetti` を使用して、ボタンクリックなどのイベントでお祝いのクラッカーを発生させます:

```bash
npm install @tsparticles/preset-confetti
```

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useCallback, useMemo, useState } from "react";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";
import type { Container, ISourceOptions, Engine } from "@tsparticles/engine";

export default function ConfettiButton() {
  const [active, setActive] = useState(false);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadConfettiPreset(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container?: Container) => {
      if (active && container) {
        await container.play();
      }
    },
    [active],
  );

  const options: ISourceOptions = useMemo(
    () => ({
      preset: "confetti",
      fullScreen: { zIndex: 1000 },
    }),
    [],
  );

  const handleCelebrate = useCallback(() => {
    setActive(true);
    setTimeout(() => setActive(false), 5000);
  }, []);

  return (
    <>
      {active && <Particles id="confetti" init={particlesInit} particlesLoaded={particlesLoaded} options={options} />}
      <button onClick={handleCelebrate} style={{ position: "fixed", top: 16, left: 16, zIndex: 10 }}>
        Celebrate!
      </button>
    </>
  );
}
```

`init` コールバックは、パーティクルが作成される前にクラッカープリセットをエンジンにロードします。

## 花火エフェクト

同様に、花火プリセットは壮観な花火ディスプレイを作成します:

```bash
npm install @tsparticles/preset-fireworks
```

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useCallback, useMemo, useRef } from "react";
import { loadFireworksPreset } from "@tsparticles/preset-fireworks";
import type { Container, Engine } from "@tsparticles/engine";

export default function FireworksBackground() {
  const containerRef = useRef<Container | undefined>(undefined);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFireworksPreset(engine);
  }, []);

  const particlesLoaded = useCallback((container?: Container) => {
    containerRef.current = container;
  }, []);

  const options = useMemo(
    () => ({
      preset: "fireworks" as const,
      fullScreen: { zIndex: -1 },
      background: {
        color: "#000",
      },
    }),
    [],
  );

  return <Particles id="fireworks" init={particlesInit} particlesLoaded={particlesLoaded} options={options} />;
}
```

## Container 参照を使用した完全な TypeScript の例

`Container` インスタンスにアクセスして、アニメーションをプログラムで制御します（再生、一時停止、破棄、画像エクスポート）:

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useCallback, useMemo, useRef } from "react";
import { loadFull } from "tsparticles";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

export default function ControllableParticles() {
  const containerRef = useRef<Container | undefined>(undefined);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback((container?: Container) => {
    containerRef.current = container;
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { zIndex: -1 },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: { enable: true, mode: "push" },
          onHover: { enable: true, mode: "repulse" },
        },
        modes: {
          push: { quantity: 4 },
          repulse: { distance: 100 },
        },
      },
      particles: {
        color: { value: "#ff0000" },
        links: {
          enable: true,
          color: "#ff0000",
          distance: 150,
        },
        move: { enable: true, speed: 2 },
        number: { value: 60 },
        size: { value: { min: 1, max: 5 } },
      },
    }),
    [],
  );

  const handlePause = useCallback(() => {
    containerRef.current?.pause();
  }, []);

  const handlePlay = useCallback(() => {
    containerRef.current?.play();
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <Particles id="tsparticles" init={particlesInit} particlesLoaded={particlesLoaded} options={options} />
      <div
        style={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 10,
          display: "flex",
          gap: 8,
        }}
      >
        <button onClick={handlePause}>Pause</button>
        <button onClick={handlePlay}>Play</button>
      </div>
    </div>
  );
}
```

重要なポイント:

- `particlesInit` はエンジンの機能をロードします（コンポーネントのマウントごとに1回のみ実行されます）。
- `particlesLoaded` はコンテナが完全に初期化されるたびに発生します。
- `containerRef` は `Container` インスタンスを保持するため、後でそのメソッドを呼び出すことができます。

## パフォーマンス: useMemo と useCallback

静的またはほとんど変更されないオプションは常に `useMemo` でラップし、イベントハンドラーは `useCallback` でラップして、キャンバスの不要な再レンダリングを防ぎます:

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useCallback, useMemo, useState } from "react";
import type { Container, ISourceOptions } from "@tsparticles/engine";

export default function PerformanceExample() {
  const [particlesCount, setParticlesCount] = useState(80);

  // 安定したコールバック — 依存関係が変更されない限り再作成されない
  const particlesLoaded = useCallback((container?: Container) => {
    console.log("Container ready", container?.id);
  }, []);

  // 安定したオプションオブジェクト — キャンバスの再初期化を防ぐ
  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { zIndex: -1 },
      particles: {
        number: { value: particlesCount },
        links: { enable: true },
        move: { enable: true },
      },
    }),
    [particlesCount],
  );

  return (
    <div>
      <Particles id="performance-particles" particlesLoaded={particlesLoaded} options={options} />
      <button onClick={() => setParticlesCount((c) => c + 20)}>Add 20 particles</button>
    </div>
  );
}
```

これらの最適化がないと、親が再レンダリングされるたびに新しい `options` オブジェクトが作成され、キャンバスが再作成されることになります。

## ページ統合

ページコンテンツに影響を与えずに、ページレイアウトにパーティクル背景を追加します:

```tsx
// app/layout.tsx（サーバーコンポーネント）
import dynamic from "next/dynamic";

const ParticlesBackground = dynamic(() => import("@/components/particles-background"), { ssr: false });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <ParticlesBackground />
        <main style={{ position: "relative", zIndex: 1 }}>{children}</main>
      </body>
    </html>
  );
}
```

`ssr: false` を指定した `dynamic()` を使用して、コンポーネントがサーバーサイドレンダリング中に実行されることがないようにします。パーティクルキャンバスは CSS の `z-index` を介してメインコンテンツの背後に配置されます。

## 複数のインスタンス

同じページに複数の独立した `Particles` コンポーネントを、それぞれ独自の設定でレンダリングできます:

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useCallback, useMemo } from "react";
import type { Container, ISourceOptions } from "@tsparticles/engine";

function ParticlesGallery() {
  const loaded = useCallback((c?: Container) => {}, []);

  const redOptions: ISourceOptions = useMemo(
    () => ({
      fullScreen: false,
      height: 200,
      background: { color: "#1a0000" },
      particles: {
        color: { value: "#ff0000" },
        number: { value: 30 },
        move: { enable: true },
      },
    }),
    [],
  );

  const blueOptions: ISourceOptions = useMemo(
    () => ({
      fullScreen: false,
      height: 200,
      background: { color: "#00001a" },
      particles: {
        color: { value: "#0000ff" },
        number: { value: 30 },
        move: { enable: true },
      },
    }),
    [],
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Particles id="red-canvas" particlesLoaded={loaded} options={redOptions} />
      <Particles id="blue-canvas" particlesLoaded={loaded} options={blueOptions} />
    </div>
  );
}
```

各 `Particles` コンポーネントは、独自のアニメーションループを持つ独立したキャンバスを作成します。`fullScreen: false` を設定し、それぞれに固定の高さを指定して、ドキュメントフロー内で共存できるようにします。

## 従来の Pages Router

Next.js の **Pages Router**（`pages/` ディレクトリ）を使用している場合、アプローチは似ていますが、`"use client"` ディレクティブは必要ありません。代わりに、ページコンポーネントで動的インポートを使用できます:

```tsx
// pages/index.tsx
import dynamic from "next/dynamic";
import type { NextPage } from "next";

const ParticlesComponent = dynamic(() => import("../components/particles-component"), { ssr: false });

const Home: NextPage = () => {
  return (
    <div>
      <ParticlesComponent />
      <h1>Welcome</h1>
    </div>
  );
};

export default Home;
```

コンポーネント自体（`components/particles-component.tsx`）はプレーンな React コンポーネントです:

```tsx
import Particles from "@tsparticles/react";
import { useCallback, useMemo } from "react";
import type { Container, ISourceOptions } from "@tsparticles/engine";

export default function ParticlesComponent() {
  const particlesLoaded = useCallback((container?: Container) => {}, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { zIndex: -1 },
      particles: {
        number: { value: 80 },
        links: { enable: true },
        move: { enable: true },
      },
    }),
    [],
  );

  return <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options} />;
}
```

Pages Router は `"use client"` を**必要としない**ことに注意してください。ページコンポーネントはデフォルトでクライアントレンダリングされるためです。

## トラブルシューティング

| 症状                           | 原因                                             | 修正                                                                            |
| ------------------------------ | ------------------------------------------------ | ------------------------------------------------------------------------------- |
| 空白の白いページ               | SSR が canvas 依存モジュールをレンダリング       | `dynamic(..., { ssr: false })` を使用するか、クライアントコンポーネントでラップ |
| キャンバスが表示されない       | コンテナの高さがゼロ                             | `fullScreen: { zIndex: -1 }` を設定するか、明示的な寸法を指定                   |
| オプションの変更が反映されない | 新しいオブジェクト参照が作成されていない         | 適切な依存配列を持つ `useMemo` を使用                                           |
| プリセットが動作しない         | コンテナ初期化前にプリセットがロードされていない | `init` コールバック内で `loadXPreset(engine)` を呼び出す                        |

## 次のステップ

- [インタラクティブデモ](/demos/) で既成の設定を参照してください。
- すべての利用可能なパラメーターについては、完全な [オプションリファレンス](/options/) をお読みください。
- 雪、星、ホタルなどのより多くのプリセットについては、[プリセット](/demos/presets) ページをチェックしてください。
