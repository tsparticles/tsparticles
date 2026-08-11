# 大きな円のプリセット

`presets/presets/bigCircles` ワークスペースからの公式プリセット。

## インストール

```bash
pnpm add @tsparticles/engine @tsparticles/preset-big-circles
```

## すぐに使用可能 (手動開始/停止)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadBigCirclesPreset } from "@tsparticles/preset-big-circles";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadBigCirclesPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "big-circles",
    },
  });
}

export function stop(): void {
  container?.pause();
}

export function resume(): void {
  container?.play();
}
```

大きなアニメーション円を備えたミニマルでモダンなデザインに最適です。

デモ: <https://particles.js.org/demos/recipes/big-circles>
