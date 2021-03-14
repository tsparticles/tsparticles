[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsparticles-preset-bigCircles

[tsParticles](https://github.com/matteobruni/tsparticles) preset for big colored circles on a white background.

## Sample

![demo](https://raw.githubusercontent.com/matteobruni/tsparticles/dev/presets/bigCircles/images/sample.png)

## How to use it

### CDN / Vanilla JS / jQuery

First of all install [tsParticles](https://github.com/matteobruni/tsparticles) following the instructions for vanilla javascript in the main project [here](https://github.com/matteobruni/tsparticles)

Once installed you need one more script to be included in your page (or you can download that from [jsDelivr](https://www.jsdelivr.com/package/npm/tsparticles-preset-big-circles):

```html
<script src="https://cdn.jsdelivr.net/npm/tsparticles-preset-big-circles"></script>
```

This script **MUST** be placed after the `tsParticles` one.

Once the scripts are loaded you can set up `tsParticles` like this:

```javascript
tsParticles.load("tsparticles", {
  preset: "bigCircles", // also "big-circles" is accepted
});
```

**Important ⚠️**
You can override all the options defining the properties like in any standard `tsParticles` installation.

```javascript
tsParticles.load("tsparticles", {
  particles: {
    shape: {
      type: "square",
    },
  },
  preset: "bigCircles", // also "big-circles" is accepted
});
```

Like in the sample above, the circles will be replaced by squares.

### React.js / Preact / Inferno

_The syntax for `React.js`, `Preact` and `Inferno` is the same_.

I'll show a simplified sample you can find in this repository; it uses class component, but you can choose any syntax you prefer.

```javascript
import Particles from "react-tsparticles";
import { Main } from "tsparticles";
import { loadPreset } from "tsparticles-preset-big-circles";

export class ParticlesContainer extends React.PureComponent<IProps> {
  // this customizes the component tsParticles installation
  customInit(tsParticles: Main) {
    // this adds the preset to tsParticles, you can safely use the
    loadPreset(tsParticles);
  }

  render() {
    const options = {
      preset: "bigCircles", // also "big-circles" is accepted
    };

    return <Particles options={options} init={this.customInit} />;
  }
}
```

### Vue (2.x and 3.x)

### Angular

### Svelte
