# 紙吹雪キャノンプリセット

`presets/presets/confettiCannon` ワークスペースからの公式プリセット。

このプリセットで紙吹雪をトリガーするには、キャンバス領域上でマウスをドラッグします。

## インストール

```bash
pnpm add @tsparticles/engine @tsparticles/preset-confetti-cannon
```

## すぐに使用可能 (手動開始/停止)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadConfettiCannonPreset } from "@tsparticles/preset-confetti-cannon";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadConfettiCannonPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "confettiCannon",
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

デモ: <https://particles.js.org/demos/recipes/confetti-cannon>

ソースドキュメント: <https://github.com/tsparticles/tsparticles/tree/main/presets/confettiCannon#readme>
