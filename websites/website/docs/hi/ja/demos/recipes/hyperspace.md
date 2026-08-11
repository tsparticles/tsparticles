# ハイパースペースプリセット

プリセットの ufficiale dal ワークスペース `presets/presets/hyperspace`。

## インストール

```bash
pnpm add @tsparticles/engine @tsparticles/preset-hyperspace
```

## すぐに使用可能 (開始/停止マニュアル)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadHyperspacePreset } from "@tsparticles/preset-hyperspace";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadHyperspacePreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "hyperspace",
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

驚異的な効果とイントロのサウンドを実現します。

デモ: <https://particles.js.org/demos/recipes/hyperspace>
