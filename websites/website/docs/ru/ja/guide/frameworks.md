# Framework 統合

`tsParticles` は複数の wrappers に対応していますが、runtime フローは常に同じです。

1. engine を一度だけ初期化する
2. 必要な機能だけを読み込む（`@tsparticles/slim`、`@tsparticles/all`、またはカスタム plugins）
3. options を指定して wrapper コンポーネントを描画する

## クイックチェックリスト

- すべての `@tsparticles/*` のバージョンを揃える。
- loader はアプリ起動時に一度だけ実行する。
- 小さな options オブジェクトから始めて段階的に拡張する。
- SSR framework ではクライアント側だけでマウントする。

## wrappers ガイドから始める

wrappers の全体マトリクス（React、Next.js、Vue/Nuxt、Angular、Svelte、Solid など）は次を参照してください。

- [`/guide/wrappers`](/ja/guide/wrappers)

## コア統合の例

### React

> [!IMPORTANT]
> Place `ParticlesProvider` at your app root (e.g., `main.tsx` or `layout.tsx`), not inside a component that may unmount.
> The `init` callback runs only once for the entire app lifecycle.

```tsx
import { useMemo } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import type { Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const init = async (engine: Engine): Promise<void> => {
  await loadSlim(engine);
};

export function ParticlesBackground() {
  const options = useMemo(
    () => ({
      particles: {
        move: { enable: true },
        number: { value: 60 },
      },
    }),
    [],
  );

  return (
    <ParticlesProvider init={init}>
      <Particles id="tsparticles" options={options} />
    </ParticlesProvider>
  );
}
```

### Vue 3

```ts
import { createApp } from "vue";
import Particles from "@tsparticles/vue3";
import type { Engine } from "@tsparticles/engine";
import App from "./App.vue";

async function registerParticles(engine: Engine): Promise<void> {
  const [{ loadSlim }] = await Promise.all([import("@tsparticles/slim")]);

  await loadSlim(engine);
}

const app = createApp(App);

app.use(Particles, { init: registerParticles });
app.mount("#app");
```

### Angular

```ts
import { Component, OnInit } from "@angular/core";
import type { ISourceOptions } from "@tsparticles/engine";
import { NgParticlesService } from "@tsparticles/angular";
import { loadSlim } from "@tsparticles/slim";

@Component({
  selector: "app-root",
  template: `<ngx-particles [id]="id" [options]="options"></ngx-particles>`,
})
export class AppComponent implements OnInit {
  id = "tsparticles";
  options: ISourceOptions = {
    particles: {
      move: { enable: true },
      number: { value: 70 },
    },
  };

  constructor(private readonly particlesService: NgParticlesService) {}

  ngOnInit(): void {
    void this.particlesService.init(async (engine) => {
      await loadSlim(engine);
    });
  }
}
```

## 実践ガイド

- 多くのアプリでは `@tsparticles/slim` を基本構成として使う。
- options が増えてきたら専用の設定ファイルに分離する。
- 重いシーンでは開始/停止コントロールを UI に用意する。

## 参照ソース

- wrappers ソース: <https://github.com/tsparticles/tsparticles/tree/main/wrappers>
- framework デモ ソース: <https://github.com/tsparticles/tsparticles/tree/main/demo>
- engine package: <https://github.com/tsparticles/tsparticles/tree/main/engine>
- bundles: <https://github.com/tsparticles/tsparticles/tree/main/bundles>
