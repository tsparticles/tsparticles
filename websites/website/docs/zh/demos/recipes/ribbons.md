# Ribbons 捆绑包

来自 `bundles/ribbons` 工作区的官方捆绑包。

## 安装

```bash
pnpm add @tsparticles/engine @tsparticles/ribbons
```

## 即用型（全页）

```ts
import { ribbons } from "@tsparticles/ribbons";

await ribbons({
  count: 5,
  spread: 0,
  colors: ["#FF0055", "#00D1FF", "#FFD23F", "#61FF7E", "#B284FF"],
});
```

## 限定在特定 Canvas 中

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

非常适合装饰性流动背景、庆祝性瀑布和彩色动画轨迹。
