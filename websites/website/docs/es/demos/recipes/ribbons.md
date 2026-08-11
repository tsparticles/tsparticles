# Bundle Ribbons

Bundle oficial del espacio de trabajo `bundles/ribbons`.

Sitio web: <https://ribbons.js.org>

## Instalar

```bash
pnpm add @tsparticles/engine @tsparticles/ribbons
```

## Listo para usar (página completa)

```ts
import { ribbons } from "@tsparticles/ribbons";

await ribbons({
  count: 5,
  colors: ["#FF0055", "#00D1FF", "#FFD23F", "#61FF7E", "#B284FF"],
});
```

## Limitado a un canvas específico

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

Perfecto para fondos decorativos, cascadas festivas y estelas animadas de colores.

## Posición fija (punto único)

Por defecto, cada partícula de ribbon aparece en una posición x aleatoria en todo el ancho del canvas. Usa `emitterSize` para controlar el área de aparición — ajústalo a `{ width: 0, height: 0 }` para que todos los ribbons comiencen desde el mismo punto:

```ts
import { ribbons } from "@tsparticles/ribbons";

await ribbons({
  positionX: 50,
  emitterSize: { width: 0, height: 0 },
});
```

Útil para activar ribbons desde un botón o un elemento específico de tu página.

Demostración: <https://particles.js.org/demos/recipes/ribbons>
