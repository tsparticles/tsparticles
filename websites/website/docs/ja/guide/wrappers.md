# Wrappers

このページは wrappers のハブです。ここで適切な package を選び、個別ページで installation と usage の詳細を確認できます。

ソースフォルダー: <https://github.com/tsparticles/tsparticles/tree/main/wrappers>

## wrappers ページ

### まずは主要なもの

- [`Angular`](/ja/guide/wrappers-angular)
- [`React`](/ja/guide/wrappers-react)
- [`Svelte`](/ja/guide/wrappers-svelte)
- [`Vue`](/ja/guide/wrappers-vue3)

### React エコシステム

- [`React`](/ja/guide/wrappers-react)
- [`Next.js`](/ja/guide/wrappers-nextjs)

### Vue エコシステム

- [`Vue 2`](/ja/guide/wrappers-vue2)
- [`Vue 3`](/ja/guide/wrappers-vue3)
- [`Nuxt 2`](/ja/guide/wrappers-nuxt2)
- [`Nuxt 3`](/ja/guide/wrappers-nuxt3)
- [`Nuxt 4`](/ja/guide/wrappers-nuxt4)

### その他（アルファベット順）

- [`Angular Confetti`](/ja/guide/wrappers-angular-confetti)
- [`Angular Fireworks`](/ja/guide/wrappers-angular-fireworks)
- [`Astro`](/ja/guide/wrappers-astro)
- [`Ember`](/ja/guide/wrappers-ember)
- [`Inferno`](/ja/guide/wrappers-inferno)
- [`jQuery`](/ja/guide/wrappers-jquery)
- [`Lit`](/ja/guide/wrappers-lit)
- [`Preact`](/ja/guide/wrappers-preact)
- [`Qwik`](/ja/guide/wrappers-qwik)
- [`Riot`](/ja/guide/wrappers-riot)
- [`Solid`](/ja/guide/wrappers-solid)
- [`Stencil`](/ja/guide/wrappers-stencil)
- [`Web Components`](/ja/guide/wrappers-webcomponents)
- [`WordPress`](/ja/guide/wrappers-wordpress)

## 共通の統合フロー

どの framework でも手順は同じです。

1. wrapper + `@tsparticles/engine` をインストール
2. 機能を一度だけロード（`@tsparticles/slim`、`@tsparticles/all`、またはカスタム plugins）
3. options を渡して wrapper コンポーネントを描画

## 公式 wrappers（アルファベット順）

このセクションの並び順ルール:

- package 名のアルファベット順
- 例外は mapping ノートに明示（例: WordPress は完全な WordPress 環境が必要）

- `@tsparticles/angular`: Angular コンポーネント wrapper（`<ngx-particles />`）  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/angular#readme> - ローカルガイド: [`/guide/wrappers-angular`](/ja/guide/wrappers-angular)
- `@tsparticles/astro`: Astro コンポーネント wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/astro#readme> - ローカルガイド: [`/guide/wrappers-astro`](/ja/guide/wrappers-astro)
- `@tsparticles/ember`: Ember wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/ember#readme> - ローカルガイド: [`/guide/wrappers-ember`](/ja/guide/wrappers-ember)
- `@tsparticles/inferno`: Inferno コンポーネント wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/inferno#readme> - ローカルガイド: [`/guide/wrappers-inferno`](/ja/guide/wrappers-inferno)
- `@tsparticles/jquery`: jQuery plugin wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/jquery#readme> - ローカルガイド: [`/guide/wrappers-jquery`](/ja/guide/wrappers-jquery)
- `@tsparticles/lit`: Lit コンポーネント package  
  Source: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/lit> - ローカルガイド: [`/guide/wrappers-lit`](/ja/guide/wrappers-lit)
- `@tsparticles/nextjs`: `@tsparticles/react` 上の Next.js wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/nextjs#readme> - ローカルガイド: [`/guide/wrappers-nextjs`](/ja/guide/wrappers-nextjs)
- `@tsparticles/nuxt2`: Nuxt 2 module（クライアント側登録）  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/nuxt2#readme> - ローカルガイド: [`/guide/wrappers-nuxt2`](/ja/guide/wrappers-nuxt2)
- `@tsparticles/nuxt3`: Nuxt 3 module（クライアント側登録）  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/nuxt3#readme> - ローカルガイド: [`/guide/wrappers-nuxt3`](/ja/guide/wrappers-nuxt3)
- `@tsparticles/nuxt4`: Nuxt 4 module（クライアント側登録）  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/nuxt4#readme> - ローカルガイド: [`/guide/wrappers-nuxt4`](/ja/guide/wrappers-nuxt4)
- `@tsparticles/preact`: Preact コンポーネント wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/preact#readme> - ローカルガイド: [`/guide/wrappers-preact`](/ja/guide/wrappers-preact)
- `@tsparticles/qwik`: Qwik コンポーネント wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/qwik#readme> - ローカルガイド: [`/guide/wrappers-qwik`](/ja/guide/wrappers-qwik)
- `@tsparticles/react`: React コンポーネント wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/react#readme> - ローカルガイド: [`/guide/wrappers-react`](/ja/guide/wrappers-react)
- `@tsparticles/riot`: Riot wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/riot#readme> - ローカルガイド: [`/guide/wrappers-riot`](/ja/guide/wrappers-riot)
- `@tsparticles/solid`: Solid コンポーネント wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/solid#readme> - ローカルガイド: [`/guide/wrappers-solid`](/ja/guide/wrappers-solid)
- `@tsparticles/stencil`: Stencil コンポーネント wrapper（`<stencil-particles />`）  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/stencil#readme> - ローカルガイド: [`/guide/wrappers-stencil`](/ja/guide/wrappers-stencil)
- `@tsparticles/svelte`: Svelte コンポーネント wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/svelte#readme> - ローカルガイド: [`/guide/wrappers-svelte`](/ja/guide/wrappers-svelte)
- `@tsparticles/vue2`: Vue 2 コンポーネント wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/vue2#readme> - ローカルガイド: [`/guide/wrappers-vue2`](/ja/guide/wrappers-vue2)
- `@tsparticles/vue3`: Vue 3 コンポーネント wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/vue3#readme> - ローカルガイド: [`/guide/wrappers-vue3`](/ja/guide/wrappers-vue3)
- `@tsparticles/webcomponents`: Web Components wrapper（`<web-particles />`）  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/webcomponents#readme> - ローカルガイド: [`/guide/wrappers-webcomponents`](/ja/guide/wrappers-webcomponents)
- `@tsparticles/wordpress`: 公式 WordPress plugin package  
  Source: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/wordpress> - ローカルガイド: [`/guide/wrappers-wordpress`](/ja/guide/wrappers-wordpress)
- `angular-confetti`: `@tsparticles/confetti` 用 Angular wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/angular-confetti#readme> - ローカルガイド: [`/guide/wrappers-angular-confetti`](/ja/guide/wrappers-angular-confetti)
- `angular-fireworks`: `@tsparticles/fireworks` 用 Angular wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/angular-fireworks#readme> - ローカルガイド: [`/guide/wrappers-angular-fireworks`](/ja/guide/wrappers-angular-fireworks)

## WordPress / Elementor に関するメモ

- `@tsparticles/wordpress` は公式 plugin package で、完全な WordPress 環境が必要です。
- Elementor には公式の standalone `tsParticles` plugin package はありません。
- README では Premium Addons for Elementor 経由の統合が案内されています。
  <https://premiumaddons.com/particles-section-addon-for-elementor-page-builder/>

## wrapper から demo へのマッピング

この表を使うと、wrapper package から実行可能な monorepo demo へすぐに移動できます。

この表の並び順ルール:

- wrapper package 名のアルファベット順
- demo 非対応 wrapper の明示的な例外（`@tsparticles/wordpress`）

demo ソースフォルダー: <https://github.com/tsparticles/tsparticles/tree/main/demo>

| Wrapper package              | Demo project                          |
| ---------------------------- | ------------------------------------- |
| `@tsparticles/angular`       | `demo/angular`                        |
| `@tsparticles/astro`         | `demo/astro`                          |
| `@tsparticles/ember`         | `demo/ember`                          |
| `@tsparticles/inferno`       | `demo/inferno`                        |
| `@tsparticles/jquery`        | `demo/jquery`                         |
| `@tsparticles/lit`           | `demo/lit`                            |
| `@tsparticles/nextjs`        | `demo/nextjs`, `demo/nextjs-legacy`   |
| `@tsparticles/nuxt2`         | `demo/nuxt2`                          |
| `@tsparticles/nuxt3`         | `demo/nuxt3`                          |
| `@tsparticles/nuxt4`         | `demo/nuxt4`                          |
| `@tsparticles/preact`        | `demo/preact`                         |
| `@tsparticles/qwik`          | `demo/qwik`                           |
| `@tsparticles/react`         | `demo/react`                          |
| `@tsparticles/riot`          | `demo/riot`                           |
| `@tsparticles/solid`         | `demo/solid`                          |
| `@tsparticles/stencil`       | `demo/stencil`                        |
| `@tsparticles/svelte`        | `demo/svelte`, `demo/svelte-kit`      |
| `@tsparticles/vue2`          | `demo/vue2`                           |
| `@tsparticles/vue3`          | `demo/vue3`                           |
| `@tsparticles/webcomponents` | `demo/webcomponents`                  |
| `@tsparticles/wordpress`     | 非対応（完全な WordPress 環境が必要） |
| `angular-confetti`           | `demo/angular`                        |
| `angular-fireworks`          | `demo/angular`                        |

## 最小パターン

### React / Next.js スタイルの Provider

> [!IMPORTANT]
> Place `ParticlesProvider` at your app root (e.g., `main.tsx` or `layout.tsx`), not inside a component that may unmount.
> The `init` callback runs only once for the entire app lifecycle.

```tsx
import Particles, { ParticlesProvider } from "@tsparticles/react";
import type { Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const init = async (engine: Engine): Promise<void> => {
  await loadSlim(engine);
};

export function Background() {
  return (
    <ParticlesProvider init={init}>
      <Particles id="tsparticles" options={{ particles: { move: { enable: true } } }} />
    </ParticlesProvider>
  );
}
```

### Vue / Nuxt スタイルの登録関数

```ts
import type { Engine } from "@tsparticles/engine";

export async function registerParticles(engine: Engine): Promise<void> {
  const [{ loadSlim }] = await Promise.all([import("@tsparticles/slim")]);

  await loadSlim(engine);
}
```

### Angular の一度だけの初期化

```ts
import { NgParticlesService } from "@tsparticles/angular";
import { loadSlim } from "@tsparticles/slim";

constructor(private readonly particlesService: NgParticlesService) {}

ngOnInit(): void {
  void this.particlesService.init(async engine => {
    await loadSlim(engine);
  });
}
```

## 関連ページ

- [`/guide/frameworks`](/ja/guide/frameworks)
- [`/guide/getting-started`](/ja/guide/getting-started)
- [`/demos/`](/ja/demos/)
