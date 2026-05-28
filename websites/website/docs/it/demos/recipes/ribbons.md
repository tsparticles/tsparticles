# Bundle Ribbons

Bundle ufficiale dall'area di lavoro `bundles/ribbons`.

## Installa

```bash
pnpm add @tsparticles/engine @tsparticles/ribbons
```

## Pronto all'uso (pagina intera)

```ts
import { ribbons } from "@tsparticles/ribbons";

await ribbons({
  count: 5,
  spread: 0,
  colors: ["#FF0055", "#00D1FF", "#FFD23F", "#61FF7E", "#B284FF"],
});
```

## Limitato a un canvas specifico

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

Perfetto per sfondi decorativi, cascate celebrative e scie colorate animate.
