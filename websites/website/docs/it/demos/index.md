# Demo pronta all'uso

Queste ricette utilizzano le preimpostazioni ufficiali disponibili nell'area di lavoro `presets/presets` (beta/alpha verso il rilascio).

## Avvio/arresto base pattern (nessuna riproduzione automatica)

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

## Ricette preimpostate

- Catalogo preimpostazioni: [`/demos/presets`](/it/demos/presets)
- Catalogo tavolozze: [`/demos/palettes`](/it/demos/palettes)
- Catalogo forme: [`/demos/shapes`](/it/demos/shapes)

- [`Ambient`](/it/demos/recipes/ambient)
- [`Big Circles`](/it/demos/recipes/big-circles)
- [`Bubbles`](/it/demos/recipes/bubbles)
- [`Confetti`](/it/demos/recipes/confetti)
- [`Confetti Cannon`](/it/demos/recipes/confetti-cannon)
- [`Confetti Explosions`](/it/demos/recipes/confetti-explosions)
- [`Confetti Falling`](/it/demos/recipes/confetti-falling)
- [`Confetti Parade`](/it/demos/recipes/confetti-parade)
- [`Fire`](/it/demos/recipes/fire)
- [`Firefly`](/it/demos/recipes/firefly)
- [`Fireworks`](/it/demos/recipes/fireworks)
- [`Fountain`](/it/demos/recipes/fountain)
- [`Hyperspace`](/it/demos/recipes/hyperspace)
- [`Links`](/it/demos/recipes/links)
- [`Matrix`](/it/demos/recipes/matrix)
- [`Sea Anemone`](/it/demos/recipes/sea-anemone)
- [`Snow`](/it/demos/recipes/snow)
- [`Squares`](/it/demos/recipes/squares)
- [`Stars`](/it/demos/recipes/stars)
- [`Ribbons`](/it/demos/recipes/ribbons)
- [`Triangles`](/it/demos/recipes/triangles)

Per testarli immediatamente nell'interfaccia utente, utilizza [`Playground`](/it/playground/) e avviali con `Start` solo quando necessario.

## Progetti dimostrativi quadro

Il monorepo include anche demo di integrazione eseguibili:

- Cartella di origine: <https://github.com/tsparticles/tsparticles/tree/main/demo>
- Le demo disponibili includono: `angular`, `astro`, `electron`, `inferno`, `ionic`, `jquery`, `lit`, `nextjs`, `nextjs-legacy`, `nuxt2`, `nuxt3`, `nuxt4`, `preact`, `react`, `riot`, `solid`, `svelte`, `svelte-kit`, `vanilla`, `vanilla_new`, `vite`, `vue2`, `vue3`, `webcomponents`.
