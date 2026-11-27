[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# @tsparticles/ember

[![npm](https://img.shields.io/npm/v/@tsparticles/ember)](https://www.npmjs.com/package/@tsparticles/ember) [![npm](https://img.shields.io/npm/dm/@tsparticles/ember)](https://www.npmjs.com/package/@tsparticles/ember) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

Official Ember component for [tsParticles](https://github.com/tsparticles/tsparticles).

## Compatibility

- Ember.js v3.28+
- Ember CLI v3.28+
- Node.js v14+

## Installation

```bash
npm install @tsparticles/ember @tsparticles/engine
# or
yarn add @tsparticles/ember @tsparticles/engine
# or
pnpm add @tsparticles/ember @tsparticles/engine
# or
ember install @tsparticles/ember
npm install @tsparticles/engine
```

If you want the full bundle loader in examples below:

```bash
npm install tsparticles
```

## Usage

Initialize the engine once in your app lifecycle, then render `<Particles />` where needed.

```ts
import Controller from '@ember/controller';
import { createEngine, type Engine } from '@tsparticles/engine';
import { loadFull } from 'tsparticles';
import { initParticlesEngine } from '@tsparticles/ember/utils/init-particles-engine';

export default class ApplicationController extends Controller {
  public engine = createEngine();

  public constructor(...args: unknown[]) {
    super(...args);

    void initParticlesEngine(this.engine, async (engine: Engine) => {
      await loadFull(engine);
    });
  }
}
```

```hbs
<Particles
  @engine={{this.engine}}
  @options={{this.options}}
  @theme={{this.theme}}
  @particlesLoaded={{this.loadedCallback}}
/>
```

The component accepts these named args:

| Arg                | Type                              | Description                                                                                                        |
| ------------------ | --------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `@engine`          | `Engine`                          | Explicit tsParticles engine used to register plugins and create the container.                                     |
| `@options`         | `Options`                         | Particles options object                                                                                           |
| `@url`             | `string`                          | Remote JSON config URL                                                                                             |
| `@particlesLoaded` | `(container?: Container) => void` | Callback invoked when the container is loaded, receives `Container \| undefined`                                   |
| `@theme`           | `string` (optional)               | Theme name to apply. Requires `@tsparticles/plugin-themes` to be loaded. Without the plugin, this is a safe no-op. |

### Reactive behavior

The modifier reloads particles when `@options` or `@url` changes. Changes to `@theme` apply the theme via `loadTheme` without a full reload.

### Theme support

The `@theme` prop requires the optional `@tsparticles/plugin-themes` package to be registered with the engine. Without it, setting `@theme` is a safe no-op (no crash, no error).

### Cleanup

When the element is removed from the DOM (or the modifier is torn down), the particles container is automatically destroyed, stopping all animations and freeing resources. The destructor is registered once and runs exactly once to avoid memory leaks.

### Template import syntax (`.gjs`)

```js
import { createEngine, type Engine } from "@tsparticles/engine";
import { loadFull } from "tsparticles";
import Particles from "@tsparticles/ember/components/particles";
import { initParticlesEngine } from "@tsparticles/ember/utils/init-particles-engine";

const engine = createEngine();

void initParticlesEngine(engine, async (engine: Engine) => {
  await loadFull(engine);
});

const options = {
  particles: {
    links: {
      enable: true,
    },
    move: {
      enable: true,
    },
  },
};

<template>
  <Particles @engine={{engine}} @options={{options}} />
</template>;
```

### Using presets

```bash
npm install @tsparticles/preset-confetti
```

```ts
import Controller from '@ember/controller';
import { createEngine, type Engine } from '@tsparticles/engine';
import { initParticlesEngine } from '@tsparticles/ember/utils/init-particles-engine';
import { loadConfettiPreset } from '@tsparticles/preset-confetti';

export default class ApplicationController extends Controller {
  public engine = createEngine();

  public constructor(...args: unknown[]) {
    super(...args);

    void initParticlesEngine(this.engine, async (engine: Engine) => {
      await loadConfettiPreset(engine);
    });
  }
}
```

```hbs
<Particles @engine={{this.engine}} @options={{hash preset='confetti'}} />
```
