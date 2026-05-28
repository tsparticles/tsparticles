# Demonstração pronta para uso

Essas receitas usam as predefinições oficiais disponíveis no espaço de trabalho `presets/presets` (beta/alfa em direção ao lançamento).

## Início/parada base do padrão (sem reprodução automática)

```ts
import { tsParticles } from "@tsparticles/engine";
import type { Container, ISourceOptions } from "@tsparticles/engine";

let container: Container | undefined;

export async function start(id: string, options: ISourceOptions): Promise<void> {
  container?.destroy();
  container = await tsParticles.load({ id, options });
}

export function stop(): void {
  container?.pause();
}

export function resume(): void {
  container?.play();
}
```

## Receitas predefinidas

- Catálogo de predefinições: [`/demos/presets`](/pt/demos/presets)
- Catálogo de paletas: [`/demos/palettes`](/pt/demos/palettes)
- Catálogo de formas: [`/demos/shapes`](/pt/demos/shapes)

- [`Ambient`](/pt/demos/recipes/ambient)
- [`Big Circles`](/pt/demos/recipes/big-circles)
- [`Bubbles`](/pt/demos/recipes/bubbles)
- [`Confetti`](/pt/demos/recipes/confetti)
- [`Confetti Cannon`](/pt/demos/recipes/confetti-cannon)
- [`Confetti Explosions`](/pt/demos/recipes/confetti-explosions)
- [`Confetti Falling`](/pt/demos/recipes/confetti-falling)
- [`Confetti Parade`](/pt/demos/recipes/confetti-parade)
- [`Fire`](/pt/demos/recipes/fire)
- [`Firefly`](/pt/demos/recipes/firefly)
- [`Fireworks`](/pt/demos/recipes/fireworks)
- [`Fountain`](/pt/demos/recipes/fountain)
- [`Hyperspace`](/pt/demos/recipes/hyperspace)
- [`Links`](/pt/demos/recipes/links)
- [`Matrix`](/pt/demos/recipes/matrix)
- [`Sea Anemone`](/pt/demos/recipes/sea-anemone)
- [`Snow`](/pt/demos/recipes/snow)
- [`Squares`](/pt/demos/recipes/squares)
- [`Stars`](/pt/demos/recipes/stars)
- [`Ribbons`](/pt/demos/recipes/ribbons)
- [`Triangles`](/pt/demos/recipes/triangles)

Para testá-los imediatamente na UI, use [`Playground`](/pt/playground/) e inicie-os com `Start` somente quando necessário.

## Projetos de demonstração de estrutura

O monorepo também inclui demonstrações de integração executáveis:

- Pasta de origem: <https://github.com/tsparticles/tsparticles/tree/main/demo>
- As demonstrações disponíveis incluem: `angular`, `astro`, `electron`, `inferno`, `ionic`, `jquery`, `lit`, `nextjs`, `nextjs-legacy`, `nuxt2`, `nuxt3`, `nuxt4`, `preact`, `react`, `riot`, `solid`, `svelte`, `svelte-kit`, `vanilla`, `vanilla_new`, `vite`, `vue2`, `vue3`, `webcomponents`.
