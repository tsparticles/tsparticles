# Ribbons Bundle

Official bundle from the `bundles/ribbons` workspace.

## Install

```bash
pnpm add @tsparticles/engine @tsparticles/ribbons
```

## Ready-to-use (full page)

```ts
import { ribbons } from "@tsparticles/ribbons";

await ribbons({
  count: 1,
  spread: 0,
  gravity: 1,
  colors: ["#FF0055", "#00D1FF", "#FFD23F", "#61FF7E", "#B284FF"],
});
```

## Scoped to a specific canvas

```ts
import { ribbons } from "@tsparticles/ribbons";
import type { Container } from "@tsparticles/engine";

const canvas = document.getElementById("ribbons-canvas") as HTMLCanvasElement;

const fire = await ribbons.create(canvas, {
  count: 1,
  gravity: 1,
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
