# 紙吹雪パレードプリセット

`presets/presets/confettiParade` ワークスペースからの公式プリセット。

## インストール

```bash
pnpm add @tsparticles/engine @tsparticles/preset-confetti-parade
```

## すぐに使用可能 (手動開始/停止)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadConfettiParadePreset } from "@tsparticles/preset-confetti-parade";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadConfettiParadePreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "confettiParade",
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

デモ: <https://particles.js.org/demos/recipes/confetti-parade>

ソースドキュメント: <https://github.com/tsparticles/tsparticles/tree/main/presets/confettiParade#readme>
