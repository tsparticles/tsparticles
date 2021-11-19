[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Full Bundle

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles/badge)](https://www.jsdelivr.com/package/npm/tsparticles) [![npmjs](https://badge.fury.io/js/tsparticles.svg)](https://www.npmjs.com/package/tsparticles) [![npmjs](https://img.shields.io/npm/dt/tsparticles)](https://www.npmjs.com/package/tsparticles)

[tsParticles](https://github.com/matteobruni/tsparticles) full bundle loads all the v1 features to
a `tsparticles-engine` instance.

**Included Packages**

- tsparticles-engine
- tsparticles-slim (and all its dependencies)
- tsparticles-interaction-external-trail
- tsparticles-plugin-absorbers
- tsparticles-plugin-emitters
- tsparticles-plugin-polygon-mask
- tsparticles-updater-roll
- tsparticles-updater-tilt
- tsparticles-updater-wobble

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

A note about `tsparticles-slim` can be made: it's not mandatory to include all of its dependencies, the slim bundle file
is enough, and if this is done the `tsparticles-engine` is not needed, since it's already bundled in the slim bundle.

### Usage

Once the scripts are loaded you can set up `tsParticles` like this:

```javascript
loadFull(tsParticles); // not needed if using the bundle script, required for any other installation

tsParticles.load("tsparticles", {
    /* options */
});
```

### React.js / Preact / Inferno

_The syntax for `React.js`, `Preact` and `Inferno` is the same_.

This sample uses the class component syntax, but you can use hooks as well (if the library supports it).

*Class Components*

```typescript jsx
import React from "react";
import Particles from "react-tsparticles";
import type { Main } from "tsparticles-engine";
import { loadFull } from "tsparticles";

export class ParticlesContainer extends PureComponent<unknown> {
    // this customizes the component tsParticles installation
    customInit(main: Main) {
        // this adds the bundle to tsParticles
        loadFull(main);
    }

    render() {
        const options = {
            /* custom options */
        };

        return <Particles options={options} init={this.customInit}/>;
    }
}
```

*Hooks / Functional Components*

```typescript jsx
import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import type { Main } from "tsparticles-engine";
import { loadFull } from "tsparticles";

export function ParticlesContainer(props: unknown) {
    // this customizes the component tsParticles installation
    const customInit = useCallback((main: Main) => {
        // this adds the bundle to tsParticles
        loadFull(main);
    });

    const options = {
        /* custom options */
    };

    return <Particles options={options} init={this.customInit}/>;
}
```

### Vue (2.x and 3.x)

_The syntax for `Vue.js 2.x` and `3.x` is the same_

```vue

<Particles id="tsparticles" :particlesInit="particlesInit" url="http://foo.bar/particles.json"/>
```

```js
function particlesInit(main: Main) {
    loadFull(main);
}
```

### Angular

```html

<ng-particles
        [id]="id"
        [options]="particlesOptions"
        (particlesLoaded)="particlesLoaded($event)"
        (particlesInit)="particlesInit($event)"
></ng-particles>
```

```ts
function particlesInit(main: Main): void {
    loadFull(main);
}
```

### Svelte

```sveltehtml

<Particles
        id="tsparticles"
        url="http://foo.bar/particles.json"
        on:particlesInit="{onParticlesInit}"
/>
```

```js
let onParticlesInit = (main) => {
    loadFull(main);
};
```
