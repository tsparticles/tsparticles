# Path

Path generators control particle movement by returning a velocity vector each frame. They are used with `particles.move.path.generator`. Paths depend on `@tsparticles/plugin-move`.

## Quick app-local creation

```ts
import { loadMovePlugin } from "@tsparticles/plugin-move";
import { Vector, type Engine } from "@tsparticles/engine";

export async function loadAppPath(engine: Engine): Promise<void> {
  await loadMovePlugin(engine);

  await engine.pluginManager.register((e) => {
    e.pluginManager.addPathGenerator?.("app-sway", () =>
      Promise.resolve({
        generate: (particle) => {
          const wave = Math.sin(particle.position.y * 0.02);
          return Vector.create(wave, 0);
        },
        init: () => {},
        reset: () => {},
        update: () => {},
      }),
    );
  });
}

await loadAppPath(tsParticles);

const options = {
  particles: {
    move: {
      enable: true,
      path: {
        enable: true,
        generator: "app-sway",
      },
    },
  },
};
```

## Creating a reusable package

### Using the CLI

```bash
npx @tsparticles/cli-create path <destination>
```

### Generated files

```
src/
  index.ts          — Load function + path generator class
  index.lazy.ts     — Lazy async loader
  browser.ts        — Browser global registration
```

### Package structure

The path generator class implements `IPathGenerator`:

```ts
export class MyPathGenerator implements IPathGenerator {
  init(container: Container): void {}

  generate(particle: Particle): Vector {
    return Vector.create(0, 0);
  }

  reset(particle: Particle): void {}

  update(particle: Particle, delta: IDelta): void {}
}
```

The load function registers the generator:

```ts
export async function loadMyPath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);
  await engine.pluginManager.register((e) => {
    e.pluginManager.addPathGenerator?.("my-path", () => new MyPathGenerator());
  });
}
```

### Using your package

```ts
import { loadMyPath } from "@tsparticles/path-my-path";
import { loadMovePlugin } from "@tsparticles/plugin-move";

await loadMovePlugin(tsParticles);
await loadMyPath(tsParticles);

const options = {
  particles: {
    move: {
      enable: true,
      path: {
        enable: true,
        generator: "my-path",
      },
    },
  },
};
```

Add `@tsparticles/plugin-move` as a dependency in your `package.json`.

## Contributing to the official repository

- Place your package in: `paths/<name>/`
- Lint and build with: `pnpm run build`
- Open a pull request on GitHub
