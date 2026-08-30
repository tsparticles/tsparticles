# Plugin

Plugins are the most powerful extension point. They implement `IPlugin` and `IContainerPlugin` and can hook into the full container lifecycle: init, draw, update, particle creation, resize, and option parsing.

## Quick app-local creation

```ts
import type { Container, Engine, IContainerPlugin, IPlugin, ISourceOptions, Options } from "@tsparticles/engine";

class AppPluginInstance implements IContainerPlugin {
  private readonly container: Container;

  constructor(container: Container) {
    this.container = container;
  }

  async init(): Promise<void> {
    this.container.retina.pixelRatio = Math.max(this.container.retina.pixelRatio, 1);
  }
}

class AppPlugin implements IPlugin {
  readonly id = "app-plugin";

  async getPlugin(container: Container): Promise<IContainerPlugin> {
    return new AppPluginInstance(container);
  }

  loadOptions(_options: Options, source?: ISourceOptions): void {
    if (source?.appPlugin === false) {
      return;
    }
  }

  needsPlugin(source?: ISourceOptions): boolean {
    return source?.appPlugin !== false;
  }
}

export async function loadAppPlugin(engine: Engine): Promise<void> {
  await engine.addPlugin(new AppPlugin());
}

await loadAppPlugin(tsParticles);

const options = {
  appPlugin: true,
};
```

## Creating a reusable package

### Using the CLI

```bash
npx @tsparticles/cli-create plugin <destination>
```

The CLI prompts for a plugin type. Available types:

| Type             | Description                                             | Package name pattern                        |
| ---------------- | ------------------------------------------------------- | ------------------------------------------- |
| `generic`        | General-purpose plugin (`IPlugin`)                      | `@tsparticles/plugin-{name}`                |
| `emitters-shape` | Custom emitter shape for `@tsparticles/plugin-emitters` | `@tsparticles/plugin-emitters-shape-{name}` |
| `easing`         | Custom easing function                                  | `@tsparticles/plugin-easing-{name}`         |
| `export`         | Custom export format                                    | `@tsparticles/plugin-export-{name}`         |
| `color-manager`  | Custom color format parser                              | `@tsparticles/plugin-{name}-color`          |

### Generated files

```
src/
  Plugin.ts          — IPlugin implementation with id, getPlugin, loadOptions, needsPlugin
  PluginInstance.ts  — IContainerPlugin implementation with lifecycle hooks
  index.ts           — Load function + exports
  index.lazy.ts      — Lazy async loader for code-splitting
  browser.ts         — Browser global registration
```

### Using your package

```ts
import { loadMyPlugin } from "@tsparticles/plugin-my-plugin";

await loadMyPlugin(tsParticles);
```

## Contributing to the official repository

- Place your package in: `plugins/<name>/`
- Interactions with subtypes: `plugins/<subtype>/<name>/`
- Lint and build with: `pnpm run build`
- Open a pull request on GitHub
