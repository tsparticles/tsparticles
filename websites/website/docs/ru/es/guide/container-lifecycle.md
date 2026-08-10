# Ciclo de vida del contenedor

Un `Container` es la instancia de tiempo de ejecución devuelta por `tsParticles.load(...)`.

## Ciclo de vida básico

```ts
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

container = await tsParticles.load({ id: "tsparticles", options });
container.pause();
container.play();
container.destroy();
```

## Patrón recomendado

- `start`: crear/recrear contenedor con las opciones actuales.
- `stop`: `pause()` cuando no es visible o no es necesario.
- `resume`: `play()` cuando el usuario desea recuperar la animación.
- `destroy`: recursos gratuitos en desmontaje de ruta/componente.

## Referencia fuente

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Container.md>
