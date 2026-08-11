# Ciclo di vita del contenitore

A `Container` è l'istanza di runtime restituita da `tsParticles.load(...)`.

## Ciclo di vita di base

```ts
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

container = await tsParticles.load({ id: "tsparticles", options });
container.pause();
container.play();
container.destroy();
```

## Modello consigliato

- `start`: crea/ricrea contenitore con le opzioni correnti.
- `stop`: `pause()` quando non visibile o non necessario.
- `resume`: `play()` quando l'utente desidera riavere l'animazione.
- `destroy`: risorse gratuite sullo smontaggio di percorsi/componenti.

## Riferimento alla fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Container.md>
