[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Triangles Preset

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-preset-triangles/badge)](https://www.jsdelivr.com/package/npm/tsparticles-preset-triangles) [![npmjs](https://badge.fury.io/js/tsparticles-preset-links.svg)](https://www.npmjs.com/package/tsparticles-preset-links) [![npmjs](https://img.shields.io/npm/dt/tsparticles-preset-triangles)](https://www.npmjs.com/package/tsparticles-preset-triangles)

[tsParticles](https://github.com/matteobruni/tsparticles) preset for creating a particles web created by link lines
between them.

## Sample

[![demo](https://raw.githubusercontent.com/matteobruni/tsparticles/main/presets/triangles/images/sample.png)](https://particles.js.org/samples/presets/triangles)

## How to use it

### CDN / Vanilla JS / jQuery

The first step is installing [tsParticles](https://github.com/matteobruni/tsparticles) following the instructions for
vanilla javascript in the main project [here](https://github.com/matteobruni/tsparticles)

Once installed you need one more script to be included in your page (or you can download that
from [jsDelivr](https://www.jsdelivr.com/package/npm/tsparticles-preset-triangles):

```html
<script src="https://cdn.jsdelivr.net/npm/tsparticles@1/tsparticles.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles-preset-triangles@1/tsparticles.preset.triangles.min.js"></script>
```

This script **MUST** be placed after the `tsParticles` one.

#### Bundle

A bundled script can also be used, this will include every needed plugin needed by the preset.

```html
<script src="https://cdn.jsdelivr.net/npm/tsparticles-preset-triangles@1/tsparticles.preset.triangles.bundle.min.js"></script>
```

### Usage

Once the scripts are loaded you can set up `tsParticles` like this:

```javascript
loadTrianglesPreset(tsParticles);

tsParticles.load("tsparticles", {
  preset: "triangles",
});
```

#### Customization

**Important ⚠️**
You can override all the options defining the properties like in any standard `tsParticles` installation.

```javascript
tsParticles.load("tsparticles", {
  particles: {
    shape: {
      type: "square",
    },
  },
  preset: "triangles",
});
```

Like in the sample above, the circles will be replaced by squares.

### React.js / Preact / Inferno

_The syntax for `React.js`, `Preact` and `Inferno` is the same_.

This sample uses the class component syntax, but you can use hooks as well (if the library supports it).

```javascript
import Particles from "react-tsparticles";
import { Main } from "tsparticles";
import { loadTrianglesPreset } from "tsparticles-preset-triangles";

export class ParticlesContainer extends React.PureComponent<IProps> {
  // this customizes the component tsParticles installation
  customInit(main: Main) {
    // this adds the preset to tsParticles, you can safely use the
    loadTrianglesPreset(main);
  }

  render() {
    const options = {
      preset: "triangles",
    };

    return <Particles options={options} init={this.customInit} />;
  }
}
```

### Vue (2.x and 3.x)

_The syntax for `Vue.js 2.x` and `3.x` is the same_

```vue
<Particles id="tsparticles" :particlesInit="particlesInit" url="http://foo.bar/particles.json" />
```

```js
function particlesInit(main: Main) {
  loadTrianglesPreset(main);
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
  loadTrianglesPreset(main);
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
  loadTrianglesPreset(main);
};
```
