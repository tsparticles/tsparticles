# Demo Ready-to-Use

These recipes use the official presets available in the `presets/presets` workspace (beta/alpha toward release).

## Pattern base start/stop (no autoplay)

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

## Preset recipes

- Presets catalog: [`/demos/presets`](/demos/presets)
- Palettes catalog: [`/demos/palettes`](/demos/palettes)
- Shapes catalog: [`/demos/shapes`](/demos/shapes)

- [`Ambient`](/demos/recipes/ambient)
- [`Big Circles`](/demos/recipes/big-circles)
- [`Bubbles`](/demos/recipes/bubbles)
- [`Confetti`](/demos/recipes/confetti)
- [`Confetti Cannon`](/demos/recipes/confetti-cannon)
- [`Confetti Explosions`](/demos/recipes/confetti-explosions)
- [`Confetti Falling`](/demos/recipes/confetti-falling)
- [`Confetti Parade`](/demos/recipes/confetti-parade)
- [`Fire`](/demos/recipes/fire)
- [`Firefly`](/demos/recipes/firefly)
- [`Fireworks`](/demos/recipes/fireworks)
- [`Fountain`](/demos/recipes/fountain)
- [`Hyperspace`](/demos/recipes/hyperspace)
- [`Links`](/demos/recipes/links)
- [`Matrix`](/demos/recipes/matrix)
- [`Sea Anemone`](/demos/recipes/sea-anemone)
- [`Snow`](/demos/recipes/snow)
- [`Squares`](/demos/recipes/squares)
- [`Stars`](/demos/recipes/stars)
- [`Ribbons`](/demos/recipes/ribbons)
- [`Triangles`](/demos/recipes/triangles)

To test them immediately in UI, use the [`Playground`](/playground/) and start them with `Start` only when needed.

## Framework demo projects

The monorepo also includes runnable integration demos:

- Source folder: <https://github.com/tsparticles/tsparticles/tree/main/demo>
- Available demos include: `angular`, `astro`, `electron`, `inferno`, `ionic`, `jquery`, `lit`, `nextjs`, `nextjs-legacy`, `nuxt2`, `nuxt3`, `nuxt4`, `preact`, `react`, `riot`, `solid`, `svelte`, `svelte-kit`, `vanilla`, `vanilla_new`, `vite`, `vue2`, `vue3`, `webcomponents`.
