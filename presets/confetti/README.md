[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Confetti Preset

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-preset-confetti/badge)](https://www.jsdelivr.com/package/npm/tsparticles) [![npmjs](https://badge.fury.io/js/tsparticles-preset-confetti.svg)](https://www.npmjs.com/package/tsparticles-preset-confetti) [![npmjs](https://img.shields.io/npm/dt/tsparticles-preset-confetti)](https://www.npmjs.com/package/tsparticles-preset-confetti)

[tsParticles](https://github.com/matteobruni/tsparticles) preset for white and red confetti launched from the screen
center on a transparent background.

## Sample

![demo](https://raw.githubusercontent.com/matteobruni/tsparticles/v1/presets/confetti/images/sample.png)

## How to use it

### CDN / Vanilla JS / jQuery

The first step is installing [tsParticles](https://github.com/matteobruni/tsparticles) following the instructions for
vanilla javascript in the main project [here](https://github.com/matteobruni/tsparticles)

Once added the script you need one more script to be included in your page (or you can download that
from [jsDelivr](https://www.jsdelivr.com/package/npm/tsparticles-preset-confetti):

```html
<script src="https://cdn.jsdelivr.net/npm/tsparticles"></script>
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

#### Alternative Usage

This module exports another method for using the confetti preset

```javascript
confetti("tsparticles", {
  /**
   * @deprecated use count property instead
   */
  particleCount: 50,
  /**
   * @deprecated use position property instead
   */
  origin: {
    x: 50,
    y: 50,
  },
  //------------------------------------------
  angle: 90,
  count: 50,
  position: {
    x: 50,
    y: 50,
  },
  spread: 45,
  startVelocity: 45,
  decay: 0.9,
  gravity: 1,
  drift: 0,
  ticks: 200,
  colors: ["#ffffff", "#ff0000"],
  shapes: ["square", "circle"],
  scalar: 1,
  zIndex: 100,
  disableForReducedMotion: true,
});
```

This method doesn't need to call the `loadConfettiPreset` method since it's called automatically.

##### Options

The `confetti` first parameter is the `tsParticles` container id and the second parameter is a single `options` object,
which has the following properties:

- `count` _Integer (default: 50)_: The number of confetti to launch. More is always fun... but be cool, there's a lot of
  math involved. (`particleCount` can be used too, but it's deprecated)
- `angle` _Number (default: 90)_: The angle in which to launch the confetti, in degrees: 90 is straight up.
- `spread` _Number (default: 45)_: How far off center the confetti can go, in degrees. 45 means the confetti will launch
  at the defined `angle` plus or minus 22.5 degrees.
- `startVelocity` _Number (default: 45)_: How fast the confetti will start going, in pixels.
- `decay` _Number (default: 0.9)_: How quickly the confetti will lose speed. Keep this number between 0 and 1, otherwise
  the confetti will gain speed. Better yet, just never change it.
- `gravity` _Number (default: 1)_: How quickly the particles are pulled down: 1 is full gravity, 0.5 is half gravity,
  etc., but there are no limits. You can even make particles go up if you'd like.
- `drift` _Number (default: 0)_: How much to the side the confetti will drift. The default is 0, meaning that they will
  fall straight down. Use a negative number for left and positive number for right.
- `ticks` _Number (default: 200)_: How many times the confetti will move. This is abstract... but play with it if the
  confetti disappear too quickly for you.
- `position` _Object_: Where to start firing confetti from. Feel free to launch off-screen if you'd like. (`origin` can
  be used too, but it's deprecated)
  - `position.x` _Number (default: 0.5)_: The `x` position on the page, with `0` being the left edge and `1` being the
    right edge.
  - `position.y` _Number (default: 0.5)_: The `y` position on the page, with `0` being the top edge and `1` being the
    bottom edge.
- `colors` _Array&lt;String&gt;_: An array of color strings, in the HEX format... you know, like `#bada55`.
- `shapes` _Array&lt;String&gt;_: An array of shapes for the confetti. The possible values are `square` and `circle`.
  The default is to use both shapes in an even mix. You can even change the mix by providing a value such
  as `['circle', 'circle', 'square']` to use two third circles and one third squares.
- `scalar` _Number (default: 1)_: Scale factor for each confetti particle. Use decimals to make the confetti smaller. Go
  on, try teeny tiny confetti, they are adorable!
- `zIndex` _Integer (default: 100)_: The confetti should be on top, after all. But if you have a crazy high page, you
  can set it even higher.
- `disableForReducedMotion` _Boolean (default: true)_: Disables confetti entirely for users
  that [prefer reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion).

#### Customization

**Important ⚠️**
You can override all the options defining the properties like in any standard `tsParticles` installation. This works
only with the classic `loadConfettiPreset` method, the `confetti` function has its own parameters.

```javascript
tsParticles.load("tsparticles", {
  particles: {
    color: {
      value: ["#0000ff", "#00ff00"],
    },
  },
  preset: "confetti",
});
```

Like in the sample above, the white and red colors will be replaced by blue and lime.

### React.js / Preact / Inferno

_The syntax for `React.js`, `Preact` and `Inferno` is the same_.

This sample uses the class component syntax, but you can use hooks as well (if the library supports it).

```javascript
import Particles from "react-tsparticles";
import { Main } from "tsparticles";
import { loadConfettiPreset } from "tsparticles-preset-confetti";

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
