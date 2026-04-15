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
npm install @tsparticles/ember
# or
yarn add @tsparticles/ember
# or
pnpm add @tsparticles/ember
# or
ember install @tsparticles/ember
```

If you want the full bundle loader in examples below:

```bash
npm install tsparticles
```

## Usage

Initialize the engine once in your app lifecycle, then render `<Particles />` where needed.

```ts
import Controller from '@ember/controller';
import type { Engine } from '@tsparticles/engine';
import { loadFull } from 'tsparticles';
import { initParticlesEngine } from '@tsparticles/ember/utils/init-particles-engine';

export default class ApplicationController extends Controller {
  public constructor(...args: unknown[]) {
    super(...args);

    void initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    });
  }
}
```

```hbs
<Particles @options={{this.options}} @particlesLoaded={{this.loadedCallback}} />
```

The component accepts these named args:

- `@options`: particles options object
- `@url`: remote JSON config URL
- `@particlesLoaded`: callback invoked with the loaded container

### Template import syntax (`.gjs`)

```js
import type { Engine } from "@tsparticles/engine";
import { loadFull } from "tsparticles";
import Particles from "@tsparticles/ember/components/particles";
import { initParticlesEngine } from "@tsparticles/ember/utils/init-particles-engine";

void initParticlesEngine(async (engine: Engine) => {
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
  <Particles @options={{options}} />
</template>;
```

### Using presets

```bash
npm install @tsparticles/preset-confetti
```

```ts
import type { Engine } from '@tsparticles/engine';
import { initParticlesEngine } from '@tsparticles/ember/utils/init-particles-engine';
import { loadConfettiPreset } from '@tsparticles/preset-confetti';

void initParticlesEngine(async (engine: Engine) => {
  await loadConfettiPreset(engine);
});
```

```hbs
<Particles @options={{hash preset='confetti'}} />
```
