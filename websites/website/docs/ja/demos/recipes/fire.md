# 火のプリセット

`presets/presets/fire` ワークスペースからの公式プリセット。

## インストール

```bash
pnpm add @tsparticles/engine @tsparticles/preset-fire
```

## すぐに使用可能 (手動開始/停止)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadFirePreset } from "@tsparticles/preset-fire";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadFirePreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "fire",
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

ドラマチックでエネルギーの高いデザインやエフェクトのデモンストレーションに最適です。

デモ: <https://particles.js.org/demos/recipes/fire>
