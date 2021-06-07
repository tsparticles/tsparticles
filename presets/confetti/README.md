[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Confetti Preset

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-preset-confetti/badge)](https://www.jsdelivr.com/package/npm/tsparticles) [![npmjs](https://badge.fury.io/js/tsparticles-preset-confetti.svg)](https://www.npmjs.com/package/tsparticles-preset-confetti) [![npmjs](https://img.shields.io/npm/dt/tsparticles-preset-confetti)](https://www.npmjs.com/package/tsparticles-preset-confetti)

[tsParticles](https://github.com/matteobruni/tsparticles) preset for white and red confetti launched from the screen center on a transparent background.

## Sample

![demo](https://raw.githubusercontent.com/matteobruni/tsparticles/v1/presets/confetti/images/sample.png)

## How to use it

### CDN / Vanilla JS / jQuery

The first step is installing [tsParticles](https://github.com/matteobruni/tsparticles) following the instructions for
vanilla javascript in the main project [here](https://github.com/matteobruni/tsparticles)

Once installed you need one more script to be included in your page (or you can download that
from [jsDelivr](https://www.jsdelivr.com/package/npm/tsparticles-preset-confetti):

```html

<script src="https://cdn.jsdelivr.net/npm/tsparticles-preset-confetti"></script>
```

This script **MUST** be placed after the `tsParticles` one.

#### Bundle

A bundled script can also be used, this will include every needed plugin needed by the preset.

```html

<script src="https://cdn.jsdelivr.net/npm/tsparticles-preset-confetti/dist/tsparticles.preset.confetti.bundle.min.js"></script>
```

### Usage

Once the scripts are loaded you can set up `tsParticles` like this:

```javascript
loadConfettiPreset(tsParticles);

tsParticles.load("tsparticles", {
    preset: "confetti",
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
    preset: "confetti",
});
```

Like in the sample above, the circles will be replaced by squares.

### React.js / Preact / Inferno

_The syntax for `React.js`, `Preact` and `Inferno` is the same_.

This sample uses the class component syntax, but you can use hooks as well (if the library supports it).

```javascript
import Particles from "react-tsparticles";
import {Main} from "tsparticles";
import {loadConfettiPreset} from "tsparticles-preset-confetti";

export class ParticlesContainer extends React.PureComponent<IProps> {
    // this customizes the component tsParticles installation
    customInit(main: Main) {
        // this adds the preset to tsParticles, you can safely use the
        loadConfettiPreset(main);
    }

    render() {
        const options = {
            preset: "confetti",
        };

        return <Particles options={options} init={this.customInit}/>;
    }
}
```

### Vue (2.x and 3.x)

_The syntax for `Vue.js 2.x` and `3.x` is the same_

```vue

<Particles id="tsparticles" :particlesInit="particlesInit" url="http://foo.bar/particles.json"/>
```

```js
function particlesInit(main: Main) {
    loadConfettiPreset(main);
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
    loadConfettiPreset(main);
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
    loadConfettiPreset(main);
};
```
