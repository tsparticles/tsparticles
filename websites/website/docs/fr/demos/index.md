# Démo prête à l'emploi

Ces recettes utilisent les préréglages officiels disponibles dans l'espace de travail `presets/presets` (bêta/alpha vers la sortie).

## Démarrage/arrêt de la base du modèle (pas de lecture automatique)

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

## Recettes prédéfinies

- Catalogue de préréglages : [`/demos/presets`](/fr/demos/presets)
- Catalogue de palettes : [`/demos/palettes`](/fr/demos/palettes)
- Catalogue de formes : [`/demos/shapes`](/fr/demos/shapes)

- [`Ambient`](/fr/demos/recipes/ambient)
- [`Big Circles`](/fr/demos/recipes/big-circles)
- [`Bubbles`](/fr/demos/recipes/bubbles)
- [`Confetti`](/fr/demos/recipes/confetti)
- [`Confetti Cannon`](/fr/demos/recipes/confetti-cannon)
- [`Confetti Explosions`](/fr/demos/recipes/confetti-explosions)
- [`Confetti Falling`](/fr/demos/recipes/confetti-falling)
- [`Confetti Parade`](/fr/demos/recipes/confetti-parade)
- [`Fire`](/fr/demos/recipes/fire)
- [`Firefly`](/fr/demos/recipes/firefly)
- [`Fireworks`](/fr/demos/recipes/fireworks)
- [`Fountain`](/fr/demos/recipes/fountain)
- [`Hyperspace`](/fr/demos/recipes/hyperspace)
- [`Links`](/fr/demos/recipes/links)
- [`Matrix`](/fr/demos/recipes/matrix)
- [`Sea Anemone`](/fr/demos/recipes/sea-anemone)
- [`Snow`](/fr/demos/recipes/snow)
- [`Squares`](/fr/demos/recipes/squares)
- [`Stars`](/fr/demos/recipes/stars)
- [`Ribbons`](/fr/demos/recipes/ribbons)
- [`Triangles`](/fr/demos/recipes/triangles)

Pour les tester immédiatement dans l'interface utilisateur, utilisez le [`Playground`](/fr/playground/) et démarrez-les avec `Start` uniquement en cas de besoin.

## Projets de démonstration du framework

Le monorepo comprend également des démos d'intégration exécutables :

- Dossier source : <https://github.com/tsparticles/tsparticles/tree/main/demo>
- Les démos disponibles incluent : `angular`, `astro`, `electron`, `inferno`, `ionic`, `jquery`, `lit`, `nextjs`, `nextjs-legacy`, `nuxt2`, `nuxt3`, `nuxt4`, `preact`, `react`, `riot`, `solid`, `svelte`, `svelte-kit`, `vanilla`, `vanilla_new`, `vite`, `vue2`, `vue3`, `webcomponents`.
