# Interaction

Interactions define behavior between particles and events. They come in two categories:

- **External**: triggered by mouse, touch, or canvas events (e.g. attract, grab, repulse)
- **Particles**: triggered by particle-to-particle proximity (e.g. links, collisions)

Both extend `ExternalInteractorBase` or `ParticlesInteractorBase` from `@tsparticles/plugin-interactivity`.

## Quick app-local creation

```ts
import {
  ExternalInteractorBase,
  loadInteractivityPlugin,
  type IInteractivityData,
} from "@tsparticles/plugin-interactivity";
import type { Engine, IDelta } from "@tsparticles/engine";

class AppHoverPauseInteractor extends ExternalInteractorBase {
  readonly maxDistance = 0;

  clear(): void {}

  init(): void {}

  interact(interactivityData: IInteractivityData, _delta: IDelta): void {
    if (interactivityData.pointer?.position) {
      this.container.pause();
    }
  }

  isEnabled(interactivityData: IInteractivityData): boolean {
    return !!interactivityData.pointer?.position;
  }

  reset(): void {
    this.container.play();
  }
}

export async function loadAppInteraction(engine: Engine): Promise<void> {
  await loadInteractivityPlugin(engine);

  await engine.pluginManager.register((e) => {
    e.pluginManager.addInteractor?.("app-hover-pause", (container) => {
      return Promise.resolve(new AppHoverPauseInteractor(container));
    });
  });
}

await loadAppInteraction(tsParticles);

const options = {
  interactivity: {
    events: {
      onHover: { enable: true },
    },
  },
};
```

## Creating a reusable package

### Using the CLI

```bash
npx @tsparticles/cli-create interaction <destination>
```

The CLI prompts for an interaction type:

| Type        | Description                        | Package name pattern                        |
| ----------- | ---------------------------------- | ------------------------------------------- |
| `external`  | Mouse/touch event interactions     | `@tsparticles/interaction-external-{name}`  |
| `particles` | Particle-to-particle interactions  | `@tsparticles/interaction-particles-{name}` |
| `generic`   | Combined or standalone interaction | `@tsparticles/interaction-{name}`           |

### Generated files

```
src/
  index.ts          — Load function + interactor class(es)
  index.lazy.ts     — Lazy async loader
  browser.ts        — Browser global registration
```

The load function registers the interactor:

```ts
export async function loadMyInteraction(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);
  await engine.pluginManager.register((e) => {
    e.pluginManager.addInteractor?.("external-my-interaction", (container) => {
      return Promise.resolve(new MyExternalInteractor(container));
    });
  });
}
```

### Using your package

```ts
import { loadMyInteraction } from "@tsparticles/interaction-external-my-interaction";

await loadMyInteraction(tsParticles);
```

External interactions also depend on `@tsparticles/plugin-interactivity` for the base classes and event system.

## Contributing to the official repository

- External interactions go in: `interactions/external/<name>/`
- Particles interactions go in: `interactions/particles/<name>/`
- Combined interactions go in: `interactions/<name>/`
- Lint and build with: `pnpm run build`
- Open a pull request on GitHub
