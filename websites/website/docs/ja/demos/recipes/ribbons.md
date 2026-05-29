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

## 固定位置（単一点）

デフォルトでは、各リボン粒子はキャンバス幅全体のランダムなx位置に生成されます。`emitterSize`を使用して生成領域を制御します — `{ width: 0, height: 0 }`に設定すると、すべてのリボンが同じ点から始まります：

```ts
import { ribbons } from "@tsparticles/ribbons";

await ribbons({
  position: { x: 50, y: 0 },
  emitterSize: { width: 0, height: 0 },
});
```

これは、ボタンやページ上の特定の要素からリボンをトリガーするのに便利です。
