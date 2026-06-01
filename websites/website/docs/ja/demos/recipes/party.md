# パーティープリセット

`presets/presets/party` ワークスペースからの公式プリセット。

## インストール

```bash
pnpm add @tsparticles/engine @tsparticles/preset-party
```

## すぐに使用可能 (手動開始/停止)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadPartyPreset } from "@tsparticles/preset-party";
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

await loadPartyPreset(tsParticles);

export async function start(): Promise<void> {
  container?.destroy();

  container = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "party",
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

お祝いのシーン、イベント、パーティーをテーマにしたオーバーレイに最適です。
