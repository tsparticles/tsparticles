[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Slim Bundle

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-slim/badge)](https://www.jsdelivr.com/package/npm/tsparticles-slim) [![npmjs](https://badge.fury.io/js/tsparticles-slim.svg)](https://www.npmjs.com/package/tsparticles-slim) [![npmjs](https://img.shields.io/npm/dt/tsparticles-slim)](https://www.npmjs.com/package/tsparticles-slim)

[tsParticles](https://github.com/matteobruni/tsparticles) slim bundle loads some of the most used features to
a `tsparticles-engine` instance.

**Included Packages**

- tsparticles-engine
- tsparticles-interaction-external-attract
- tsparticles-interaction-external-bounce
- tsparticles-interaction-external-bubble
- tsparticles-interaction-external-connect
- tsparticles-interaction-external-grab
- tsparticles-interaction-external-pause
- tsparticles-interaction-external-push
- tsparticles-interaction-external-remove
- tsparticles-interaction-external-repulse
- tsparticles-interaction-particles-attract
- tsparticles-interaction-particles-collisions
- tsparticles-interaction-particles-links
- tsparticles-shape-circle
- tsparticles-shape-image
- tsparticles-shape-line
- tsparticles-shape-polygon
- tsparticles-shape-square
- tsparticles-shape-star
- tsparticles-shape-text
- tsparticles-updater-angle
- tsparticles-updater-color
- tsparticles-updater-life
- tsparticles-updater-opacity
- tsparticles-updater-out-modes
- tsparticles-updater-size
- tsparticles-updater-stroke-color

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has two different files:

- One is a bundle file with all the scripts included in a single file
- One is a file including just the `loadSlim` function to load the tsParticles slim preset, all dependencies must be
  included manually

#### Bundle

Including the `tsparticles.slim.bundle.min.js` file will work exactly like `v1`, you can start using the `tsParticles`
instance in the same way.

This is the easiest usage, since it's a single file with the some of the `v1` features.

All new features will be added as external packages, this bundle is recommended for migrating from `v1` easily.

#### Not Bundle

This installation requires more work since all dependencies must be included in the page. Some lines above are all
specified in the **Included Packages** section.

### Usage

Once the scripts are loaded you can set up `tsParticles` like this:

```javascript
loadSlim(tsParticles); // not needed if using the bundle script, required for any other installation

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
import { loadSlim } from "tsparticles-slim";

export class ParticlesContainer extends PureComponent<unknown> {
    // this customizes the component tsParticles installation
    customInit(main: Main) {
        // this adds the bundle to tsParticles
        loadSlim(main);
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
import { loadSlim } from "tsparticles-slim";

export function ParticlesContainer(props: unknown) {
    // this customizes the component tsParticles installation
    const customInit = useCallback((main: Main) => {
        // this adds the bundle to tsParticles
        loadSlim(main);
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
    loadSlim(main);
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
    loadSlim(main);
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
    loadSlim(main);
};
```
