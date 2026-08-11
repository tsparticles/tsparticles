# ホタルプリセット

`presets/presets/firefly` ワークスペースからの公式プリセット。

キャンバス内でマウスを移動すると、インタラクティブなホタルの動作がアクティブになります。

## インストール

```bash
pnpm add @tsparticles/engine @tsparticles/preset-firefly
```

## すぐに使用可能 (手動開始/停止)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadFireflyPreset } from "@tsparticles/preset-firefly";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadFireflyPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "firefly",
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

ナチュラルヒーローセクション、ストーリーテリング、ポートフォリオ用のエレガントなプリセット。

デモ: <https://particles.js.org/demos/recipes/firefly>
