# Ribbons 捆绑包

来自 `bundles/ribbons` 工作区的官方捆绑包。

网站：<https://ribbons.js.org>

## 安装

```bash
pnpm add @tsparticles/engine @tsparticles/ribbons
```

## 即用型（全页）

```ts
import { ribbons } from "@tsparticles/ribbons";

await ribbons({
  count: 5,
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

## 固定位置（单点）

默认情况下，每个彩带粒子在画布整个宽度上的随机x位置生成。使用 `emitterSize` 控制生成区域 — 将其设置为 `{ width: 0, height: 0 }` 可使所有彩带从同一点开始：

```ts
import { ribbons } from "@tsparticles/ribbons";

await ribbons({
  positionX: 50,
  emitterSize: { width: 0, height: 0 },
});
```

这对于从按钮或页面上的特定元素触发彩带非常有用。
