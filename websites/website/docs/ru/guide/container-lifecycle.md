# Container Lifecycle

A `Container` is the runtime instance returned by `tsParticles.load(...)`.

## Basic lifecycle

```ts
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

container = await tsParticles.load({ id: "tsparticles", options });
container.pause();
container.play();
container.destroy();
```

## Recommended pattern

- `start`: create/recreate container with current options.
- `stop`: `pause()` when not visible or not needed.
- `resume`: `play()` when the user wants animation back.
- `destroy`: free resources on route/component teardown.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Container.md>
