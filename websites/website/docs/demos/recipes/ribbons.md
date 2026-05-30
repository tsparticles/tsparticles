# Ribbons Bundle

Official bundle from the `bundles/ribbons` workspace.

Live website: <https://ribbons.js.org>

## Install

```bash
pnpm add @tsparticles/engine @tsparticles/ribbons
```

## Ready-to-use (full page)

```ts
import { ribbons } from "@tsparticles/ribbons";

await ribbons({
  count: 5,
  spread: 0,
  colors: ["#FF0055", "#00D1FF", "#FFD23F", "#61FF7E", "#B284FF"],
});
```

## Scoped to a specific canvas

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

Perfect for decorative flowing backgrounds, celebratory cascades, and colorful animated trails.

## Fixed position (single point)

By default each ribbon particle spawns at a random x position across the full canvas width. Use `emitterSize` to control the spawn area — set it to `{ width: 0, height: 0 }` to make all ribbons start from the same point:

```ts
import { ribbons } from "@tsparticles/ribbons";

await ribbons({
  position: { x: 50, y: 0 },
  emitterSize: { width: 0, height: 0 },
});
```

This is useful for triggering ribbons from a button or a specific element on your page.
