# Cycle de vie des conteneurs

Un `Container` est l'instance d'exécution renvoyée par `tsParticles.load(...)`.

## Cycle de vie de base

```ts
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

container = await tsParticles.load({ id: "tsparticles", options });
container.pause();
container.play();
container.destroy();
```

## Modèle recommandé

- `start` : créer/recréer un conteneur avec les options actuelles.
- `stop` : `pause()` lorsqu'il n'est pas visible ou n'est pas nécessaire.
- `resume` : `play()` lorsque l'utilisateur souhaite récupérer l'animation.
- `destroy` : ressources gratuites lors du démontage de la route/du composant.

## Référence source

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Container.md>
