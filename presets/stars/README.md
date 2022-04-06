[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Stars Preset

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-preset-stars/badge)](https://www.jsdelivr.com/package/npm/tsparticles-preset-stars) [![npmjs](https://badge.fury.io/js/tsparticles-preset-stars.svg)](https://www.npmjs.com/package/tsparticles-preset-stars) [![npmjs](https://img.shields.io/npm/dt/tsparticles-preset-stars)](https://www.npmjs.com/package/tsparticles-preset-stars)

[tsParticles](https://github.com/matteobruni/tsparticles) preset for creating a starry night effect with blinking stars.

[![Slack](https://particles.js.org/images/slack.png)](https://join.slack.com/t/tsparticles/shared_invite/enQtOTcxNTQxNjQ4NzkxLWE2MTZhZWExMWRmOWI5MTMxNjczOGE1Yjk0MjViYjdkYTUzODM3OTc5MGQ5MjFlODc4MzE0N2Q1OWQxZDc1YzI) [![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Sample

[![demo](https://raw.githubusercontent.com/matteobruni/tsparticles/main/presets/stars/images/sample.png)](https://particles.js.org/samples/presets/stars)

## How to use it

### CDN / Vanilla JS / jQuery

The first step is installing [tsParticles](https://github.com/matteobruni/tsparticles) following the instructions for
vanilla javascript in the main project [here](https://github.com/matteobruni/tsparticles)

Once installed you need one more script to be included in your page (or you can download that
from [jsDelivr](https://www.jsdelivr.com/package/npm/tsparticles-preset-stars):

```html
<script src="https://cdn.jsdelivr.net/npm/tsparticles@1/tsparticles.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles-preset-stars@1/tsparticles.preset.stars.min.js"></script>
```

This script **MUST** be placed after the `tsParticles` one.

#### Bundle

A bundled script can also be used, this will include every needed plugin needed by the preset.

```html
<script src="https://cdn.jsdelivr.net/npm/tsparticles-preset-stars@1/tsparticles.preset.stars.bundle.min.js"></script>
```

### Usage

Once the scripts are loaded you can set up `tsParticles` like this:

```javascript
loadStarsPreset(tsParticles).then(() => {
  tsParticles.load("tsparticles", {
    preset: "stars",
  });
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
  preset: "stars",
});
```

Like in the sample above, the circles will be replaced by squares.

### React.js / Preact / Inferno

_The syntax for `React.js`, `Preact` and `Inferno` is the same_.

This sample uses the class component syntax, but you can use hooks as well (if the library supports it).

```typescript jsx
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadStarsPreset } from "tsparticles-preset-stars";

export class ParticlesContainer extends React.PureComponent<IProps> {
  // this customizes the component tsParticles installation
  async customInit(engine: Engine): Promise<void> {
    // this adds the preset to tsParticles, you can safely use the
    await loadStarsPreset(engine);
  }

  render() {
    const options = {
      preset: "stars",
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

```typescript
async function particlesInit(engine: Engine): Promise<void> {
  await loadStarsPreset(engine);
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

```typescript
async function particlesInit(engine: Engine): Promise<void> {
  await loadStarsPreset(engine);
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
let onParticlesInit = (event) => {
  const main = event.detail;
  loadStarsPreset(main);
};
```
