# Updater

Updaters mutate particle properties every frame — they are responsible for effects like tilt, roll, twinkle, opacity changes, size animations, and out-of-bounds handling.

## Quick app-local creation

```ts
import type { Engine, IDelta, Particle } from "@tsparticles/engine";

export async function loadAppUpdater(engine: Engine): Promise<void> {
  await engine.pluginManager.register((e) => {
    e.pluginManager.addParticleUpdater("app-drift", () =>
      Promise.resolve({
        init: (): void => {},
        isEnabled: (): boolean => true,
        update: (particle: Particle, delta: IDelta): void => {
          particle.position.x += 0.02 * delta.factor;
        },
      }),
    );
  });
}

await loadAppUpdater(tsParticles);
```

## Creating a reusable package

### Using the CLI

```bash
npx @tsparticles/cli-create updater <destination>
```

### Generated files

```
src/
  Updater.ts        — IParticleUpdater class with init, isEnabled, update
  index.ts          — Load function + exports
  index.lazy.ts     — Lazy async loader
  browser.ts        — Browser global registration
```

### Package structure

The generated `Updater.ts` contains a class implementing `IParticleUpdater`:

```ts
export class MyUpdater implements IParticleUpdater {
  readonly name = "my-updater";

  init(particle: Particle): void {
    // initialize per-particle state
  }

  isEnabled(particle: Particle): boolean {
    return true;
  }

  update(particle: Particle, delta: IDelta): void {
    // mutate particle properties each frame
  }
}
```

### Using your package

```ts
import { loadMyUpdater } from "@tsparticles/updater-my-updater";

await loadMyUpdater(tsParticles);
```

Updaters run automatically on all particles where `isEnabled()` returns `true`. No extra options configuration is needed unless the updater defines custom options.

## Contributing to the official repository

- Place your package in: `updaters/<name>/`
- Lint and build with: `pnpm run build`
- Open a pull request on GitHub
