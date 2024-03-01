[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles All Bundle

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/all/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/all) [![npmjs](https://badge.fury.io/js/@tsparticles/all.svg)](https://www.npmjs.com/package/@tsparticles/all) [![npmjs](https://img.shields.io/npm/dt/@tsparticles/all)](https://www.npmjs.com/package/@tsparticles/all) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) all bundle loads all the features to a `@tsparticles/engine` instance.

**Included Packages**

- [tsparticles (and all its dependencies)](https://github.com/tsparticles/tsparticles/tree/main/bundles/full)
- [@tsparticles/interaction-external-particle](https://github.com/tsparticles/tsparticles/tree/main/interactions/external/particle)
- [@tsparticles/interaction-external-pop](https://github.com/tsparticles/tsparticles/tree/main/interactions/external/pop)
- [@tsparticles/interaction-light](https://github.com/tsparticles/tsparticles/tree/main/interactions/light)
- [@tsparticles/interaction-particles-repulse](https://github.com/tsparticles/tsparticles/tree/main/interactions/particles/repulse)
- [@tsparticles/path-curves](https://github.com/tsparticles/tsparticles/tree/main/paths/curves)
- [@tsparticles/path-perlin-noise](https://github.com/tsparticles/tsparticles/tree/main/paths/perlinNoise)
- [@tsparticles/path-polygon](https://github.com/tsparticles/tsparticles/tree/main/paths/polygon)
- [@tsparticles/path-simplex-noise](https://github.com/tsparticles/tsparticles/tree/main/paths/simplexNoise)
- [@tsparticles/path-svg](https://github.com/tsparticles/tsparticles/tree/main/paths/svg)
- [@tsparticles/plugin-canvas-mask](https://github.com/tsparticles/tsparticles/tree/main/plugins/canvasMask)
- [@tsparticles/plugin-easing-back](https://github.com/tsparticles/tsparticles/tree/main/plugins/easings/back)
- [@tsparticles/plugin-easing-circ](https://github.com/tsparticles/tsparticles/tree/main/plugins/easings/circ)
- [@tsparticles/plugin-easing-cubic](https://github.com/tsparticles/tsparticles/tree/main/plugins/easings/cubic)
- [@tsparticles/plugin-easing-expo](https://github.com/tsparticles/tsparticles/tree/main/plugins/easings/expo)
- [@tsparticles/plugin-easing-quart](https://github.com/tsparticles/tsparticles/tree/main/plugins/easings/quart)
- [@tsparticles/plugin-easing-quint](https://github.com/tsparticles/tsparticles/tree/main/plugins/easings/quint)
- [@tsparticles/plugin-easing-sine](https://github.com/tsparticles/tsparticles/tree/main/plugins/easings/sine)
- [@tsparticles/plugin-export-image](https://github.com/tsparticles/tsparticles/tree/main/plugins/exports/image)
- [@tsparticles/plugin-export-json](https://github.com/tsparticles/tsparticles/tree/main/plugins/exports/json)
- [@tsparticles/plugin-export-video](https://github.com/tsparticles/tsparticles/tree/main/plugins/exports/video)
- [@tsparticles/plugin-hsv-color](https://github.com/tsparticles/tsparticles/tree/main/plugins/hsvColor)
- [@tsparticles/plugin-infection](https://github.com/tsparticles/tsparticles/tree/main/plugins/infection)
- [@tsparticles/plugin-motion](https://github.com/tsparticles/tsparticles/tree/main/plugins/motion)
- [@tsparticles/plugin-polygon-mask](https://github.com/tsparticles/tsparticles/tree/main/plugins/polygonMask)
- [@tsparticles/plugin-sounds](https://github.com/tsparticles/tsparticles/tree/main/plugins/sounds)
- [@tsparticles/shape-arrow](https://github.com/tsparticles/tsparticles/tree/main/shapes/arrow)
- [@tsparticles/shape-bubble](https://github.com/tsparticles/tsparticles/tree/main/shapes/bubble)
- [@tsparticles/shape-cards](https://github.com/tsparticles/tsparticles/tree/main/shapes/cards)
- [@tsparticles/shape-cog](https://github.com/tsparticles/tsparticles/tree/main/shapes/cog)
- [@tsparticles/shape-heart](https://github.com/tsparticles/tsparticles/tree/main/shapes/heart)
- [@tsparticles/shape-path](https://github.com/tsparticles/tsparticles/tree/main/shapes/path)
- [@tsparticles/shape-rounded-polygon](https://github.com/tsparticles/tsparticles/tree/main/shapes/polygon)
- [@tsparticles/shape-rounded-rect](https://github.com/tsparticles/tsparticles/tree/main/shapes/rect)
- [@tsparticles/shape-spiral](https://github.com/tsparticles/tsparticles/tree/main/shapes/spiral)
- [@tsparticles/updater-gradient](https://github.com/tsparticles/tsparticles/tree/main/updaters/gradient)
- [@tsparticles/updater-orbit](https://github.com/tsparticles/tsparticles/tree/main/updaters/orbit)

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has two different files:

- One is a bundle file with all the scripts included in a single file
- One is a file including just the `loadAll` function to load the tsParticles all preset, all dependencies must be
  included manually

#### Bundle

Including the `tsparticles.all.bundle.min.js` file will work exactly like `v1`, you can start using the `tsParticles`
instance in the same way.

This is the easiest usage, since it's a single file with the some of the `v1` features.

All new features will be added as external packages, this bundle is recommended for migrating from `v1` easily.

#### Not Bundle

This installation requires more work since all dependencies must be included in the page. Some lines above are all
specified in the **Included Packages** section.

### Usage

Once the scripts are loaded you can set up `tsParticles` like this:

```javascript
(async () => {
  await loadAll(tsParticles);

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
import { loadAll } from "@tsparticles/all";

export class ParticlesContainer extends PureComponent<unknown> {
  // this customizes the component tsParticles installation
  async customInit(engine: Engine) {
    // this adds the bundle to tsParticles
    await loadAll(engine);
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
import { loadAll } from "@tsparticles/all";

export function ParticlesContainer(props: unknown) {
  // this customizes the component tsParticles installation
  const customInit = useCallback(async (engine: Engine) => {
    // this adds the bundle to tsParticles
    await loadAll(engine);
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

async function particlesInit(engine: Engine) {
  await loadAll(engine);
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

async function particlesInit(engine: Engine): void {
  await loadAll(engine);
}
```

### Svelte

```sveltehtml

<Particles
    id="tsparticles"
    options={options}
    particlesInit="{particlesInit}"
/>
```

```js
let options = {
  /* custom options */
};

let particlesInit = async (engine) => {
  await loadAll(engine);
};
```
