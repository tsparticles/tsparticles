# Ribbons バンドル

`bundles/ribbons` ワークスペースの公式バンドル。

## インストール

```bash
pnpm add @tsparticles/engine @tsparticles/ribbons
```

## すぐに使える（全ページ）

```ts
import { ribbons } from "@tsparticles/ribbons";

await ribbons({
  count: 5,
  spread: 0,
  colors: ["#FF0055", "#00D1FF", "#FFD23F", "#61FF7E", "#B284FF"],
});
```

## 特定のキャンバスに限定

```ts
import { ribbons } from "@tsparticles/ribbons";
import type { Container } from "@tsparticles/engine";

const canvas = document.getElementById("ribbons-canvas") as HTMLCanvasElement;

const fire = await ribbons.create(canvas, {
  count: 5,
  colors: ["#FF0055", "#00D1FF", "#FFD23F"],
});

export function start(): Promise<Container | undefined> {
  return fire();
}

export function stop(): void {
  fire.pause();
}

export function resume(): void {
  fire.play();
}
```

装飾的な流れる背景、お祝いのカスケード、カラフルなアニメーショントレイルに最適です。
