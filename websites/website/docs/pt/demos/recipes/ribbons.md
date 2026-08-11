# Bundle Ribbons

Bundle oficial do espaço de trabalho `bundles/ribbons`.

Site: <https://ribbons.js.org>

## Instalar

```bash
pnpm add @tsparticles/engine @tsparticles/ribbons
```

## Pronto para usar (página inteira)

```ts
import { ribbons } from "@tsparticles/ribbons";

await ribbons({
  count: 5,
  colors: ["#FF0055", "#00D1FF", "#FFD23F", "#61FF7E", "#B284FF"],
});
```

## Limitado a um canvas específico

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

Perfeito para fundos decorativos, cascatas festivas e rastros coloridos animados.

## Posição fixa (ponto único)

Por padrão, cada partícula de ribbon aparece em uma posição x aleatória em toda a largura do canvas. Use `emitterSize` para controlar a área de spawn — defina como `{ width: 0, height: 0 }` para fazer todos os ribbons partirem do mesmo ponto:

```ts
import { ribbons } from "@tsparticles/ribbons";

await ribbons({
  positionX: 50,
  emitterSize: { width: 0, height: 0 },
});
```

Útil para disparar ribbons a partir de um botão ou elemento específico da sua página.

Demonstração: <https://particles.js.org/demos/recipes/ribbons>
