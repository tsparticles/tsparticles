# 花火プリセット

`presets/presets/fireworks` ワークスペースからの公式プリセット。

## インストール

```bash
pnpm add @tsparticles/engine @tsparticles/preset-fireworks
```

## すぐに使用可能 (手動開始/停止)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadFireworksPreset } from "@tsparticles/preset-fireworks";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadFireworksPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "fireworks",
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

影響力の高いプリセット: 明示的なユーザー操作 (CTA クリック) があった場合にのみ実行されます。

デモ: <https://particles.js.org/demos/recipes/fireworks>
