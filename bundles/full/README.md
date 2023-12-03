[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Full Bundle

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles/badge)](https://www.jsdelivr.com/package/npm/tsparticles) [![npmjs](https://badge.fury.io/js/tsparticles.svg)](https://www.npmjs.com/package/tsparticles) [![npmjs](https://img.shields.io/npm/dt/tsparticles)](https://www.npmjs.com/package/tsparticles) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) full bundle loads all the v1 features to
a `@tsparticles/engine` instance.

**Included Packages**

- [@tsparticles/slim (and all its dependencies)](https://github.com/tsparticles/tsparticles/tree/main/bundles/slim)
- [@tsparticles/interaction-external-trail](https://github.com/tsparticles/tsparticles/tree/main/interactions/external/trail)
- [@tsparticles/plugin-absorbers](https://github.com/tsparticles/tsparticles/tree/main/plugins/absorbers)
- [@tsparticles/plugin-emitters](https://github.com/tsparticles/tsparticles/tree/main/plugins/emitters)
- [@tsparticles/shape-text](https://github.com/tsparticles/tsparticles/tree/main/shapes/text)
- [@tsparticles/updater-destroy](https://github.com/tsparticles/tsparticles/tree/main/updaters/destroy)
- [@tsparticles/updater-roll](https://github.com/tsparticles/tsparticles/tree/main/updaters/roll)
- [@tsparticles/updater-tilt](https://github.com/tsparticles/tsparticles/tree/main/updaters/tilt)
- [@tsparticles/updater-twinkle](https://github.com/tsparticles/tsparticles/tree/main/updaters/twinkle)
- [@tsparticles/updater-wobble](https://github.com/tsparticles/tsparticles/tree/main/updaters/wobble)

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has two different files:

- One is a bundle file with all the scripts included in a single file
- One is a file including just the `loadFull` function to load the tsParticles full preset, all dependencies must be
  included manually

#### Bundle

Including the `tsparticles.bundle.min.js` file will work exactly like `v1`, you can start using the `tsParticles`
instance in the same way.

This is the easiest usage, since it's a single file with the same `v1` features.

All new features will be added as external packages, this bundle is recommended for migrating from `v1` easily.

#### Not Bundle

This installation requires more work since all dependencies must be included in the page. Some lines above are all
specified in the **Included Packages** section.

A note about `@tsparticles/slim` can be made: it's not mandatory to include all of its dependencies, the slim bundle file
is enough, and if this is done the `@tsparticles/engine` is not needed, since it's already bundled in the slim bundle.

### Usage

Once the scripts are loaded you can set up `tsParticles` like this:

```javascript
(async () => {
  await loadFull(tsParticles); // not needed if using the bundle script, required for any other installation

  await tsParticles.load({
    id: "tsparticles",
    options: {
      /* options */
    },
  });
})();
```

### React.js / Preact / Inferno

_The syntax for `React.js`, `Preact` and `Inferno` is the same_.

This sample uses the class component syntax, but you can use hooks as well (if the library supports it).

_Class Components_

```typescript jsx
import React from "react";
import Particles from "react-particles";
import type { Engine } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

export class ParticlesContainer extends PureComponent<unknown> {
  // this customizes the component tsParticles installation
  async customInit(engine: Engine): Promise<void> {
    // this adds the bundle to tsParticles
    await loadFull(engine);
  }

  render() {
    const options = {
      /* custom options */
    };

    return <Particles options={options} init={this.customInit} />;
  }
}
```

_Hooks / Functional Components_

```typescript jsx
import React, { useCallback } from "react";
import Particles from "react-particles";
import type { Engine } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

export function ParticlesContainer(props: unknown) {
  // this customizes the component tsParticles installation
  const customInit = useCallback(async (engine: Engine) => {
    // this adds the bundle to tsParticles
    await loadFull(engine);
  });

  const options = {
    /* custom options */
  };

  return <Particles options={options} init={this.customInit} />;
}
```

### Vue (2.x and 3.x)

_The syntax for `Vue.js 2.x` and `3.x` is the same_

```vue
<Particles id="tsparticles" :particlesInit="particlesInit" :options="options" />
```

```js
const options = {
  /* custom options */
};

async function particlesInit(engine: Engine): Promise<void> {
  await loadFull(engine);
}
```

### Angular

```html
<ng-particles [id]="id" [options]="options" [particlesInit]="particlesInit"></ng-particles>
```

```ts
const options = {
  /* custom options */
};

async function particlesInit(engine: Engine): Promise<void> {
  await loadFull(engine);
}
```

### Svelte

```sveltehtml

<Particles
    id="tsparticles"
    options={options}
    particlesInit={particlesInit}
/>
```

```js
let options = {
  /* custom options */
};

let particlesInit = async (engine) => {
  await loadFull(engine);
};
```
