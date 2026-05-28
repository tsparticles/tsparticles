# Bundle Ribbons

Bundle officiel de l'espace de travail `bundles/ribbons`.

## Installer

```bash
pnpm add @tsparticles/engine @tsparticles/ribbons
```

## Prêt à l'emploi (pleine page)

```ts
import { ribbons } from "@tsparticles/ribbons";

await ribbons({
  count: 5,
  spread: 0,
  colors: ["#FF0055", "#00D1FF", "#FFD23F", "#61FF7E", "#B284FF"],
});
```

## Limité à un canvas spécifique

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

Parfait pour les arrière-plans décoratifs, les cascades festives et les traînées colorées animées.
