# イソギンチャクのプリセット

`presets/presets/seaAnemone` ワークスペースからの公式プリセット。

## インストール

```bash
pnpm add @tsparticles/engine @tsparticles/preset-sea-anemone
```

## すぐに使用可能 (手動開始/停止)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSeaAnemonePreset } from "@tsparticles/preset-sea-anemone";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadSeaAnemonePreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "seaAnemone",
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

水中をイメージした有機的で流れるようなアニメーションに最適です。

デモ: <https://particles.js.org/demos/recipes/sea-anemone>
