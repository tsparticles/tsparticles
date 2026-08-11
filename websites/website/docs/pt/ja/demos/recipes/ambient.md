# アンビエントプリセット

`presets/presets/ambient` ワークスペースからの公式プリセット。

## インストール

```bash
pnpm add @tsparticles/engine @tsparticles/preset-ambient
```

## すぐに使用可能 (手動開始/停止)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadAmbientPreset } from "@tsparticles/preset-ambient";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadAmbientPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "ambient",
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

視覚的なノイズが少なく、柔らかく連続した背景に最適です。

デモ: <https://particles.js.org/demos/recipes/ambient>
