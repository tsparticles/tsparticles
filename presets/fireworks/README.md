[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Fireworks Preset

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-preset-fireworks/badge)](https://www.jsdelivr.com/package/npm/tsparticles-preset-fireworks) [![npmjs](https://badge.fury.io/js/tsparticles-preset-fireworks.svg)](https://www.npmjs.com/package/tsparticles-preset-fireworks) [![npmjs](https://img.shields.io/npm/dt/tsparticles-preset-fireworks)](https://www.npmjs.com/package/tsparticles-preset-fireworks) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/matteobruni/tsparticles) preset for fireworks effect.

[![Slack](https://particles.js.org/images/slack.png)](https://join.slack.com/t/tsparticles/shared_invite/enQtOTcxNTQxNjQ4NzkxLWE2MTZhZWExMWRmOWI5MTMxNjczOGE1Yjk0MjViYjdkYTUzODM3OTc5MGQ5MjFlODc4MzE0N2Q1OWQxZDc1YzI) [![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Sample

[![demo](https://raw.githubusercontent.com/matteobruni/tsparticles/main/presets/fireworks/images/sample.png)](https://particles.js.org/samples/presets/fireworks)

## How to use it

### CDN / Vanilla JS / jQuery

The first step is installing [tsParticles](https://github.com/matteobruni/tsparticles) following the instructions for
vanilla javascript in the main project [here](https://github.com/matteobruni/tsparticles)

Once installed you need one more script to be included in your page (or you can download that
from [jsDelivr](https://www.jsdelivr.com/package/npm/tsparticles-preset-fireworks):

```html
<script src="https://cdn.jsdelivr.net/npm/tsparticles-engine@2/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles-move-base@2/tsparticles.move.base.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles-plugin-emitters@2/tsparticles.plugin.emitters.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles-shape-circle@2/tsparticles.shape.circle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles-shape-line@2/tsparticles.shape.line.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles-updater-angle@2/tsparticles.updater.angle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles-updater-color@2/tsparticles.updater.color.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles-updater-life@2/tsparticles.updater.life.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles-updater-opacity@2/tsparticles.updater.opacity.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles-updater-out-modes@2/tsparticles.updater.out-modes.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles-updater-size@2/tsparticles.updater.size.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles-updater-stroke-color@2/tsparticles.updater.stroke-color.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles-preset-fireworks@2/tsparticles.preset.fireworks.min.js"></script>
```

This script **MUST** be placed after the `tsParticles` one.

#### Bundle

A bundled script can also be used, this will include every needed plugin needed by the preset.

```html
<script src="https://cdn.jsdelivr.net/npm/tsparticles-preset-fireworks@2/tsparticles.preset.fireworks.bundle.min.js"></script>
```

### Usage

Once the scripts are loaded you can set up `tsParticles` like this:

```javascript
(async () => {
  await loadFireworksPreset(tsParticles); // this is required only if you are not using the bundle script

  await tsParticles.load("tsparticles", {
    preset: "fireworks",
  });
})();
```

#### Customization

**Important ⚠️**
You can override all the options defining the properties like in any standard `tsParticles` installation.

```javascript
tsParticles.load("tsparticles", {
  particles: {
    shape: {
      type: "square", // starting from v2, this require the square shape script
    },
  },
  preset: "fireworks",
});
```

Like in the sample above, the circles will be replaced by squares.

### React.js / Preact / Inferno

_The syntax for `React.js`, `Preact` and `Inferno` is the same_.

This sample uses the class component syntax, but you can use hooks as well (if the library supports it).

```typescript jsx
import Particles from "react-particles";
import type { Engine } from "tsparticles-engine";
import { loadFireworksPreset } from "tsparticles-preset-fireworks";

export class ParticlesContainer extends React.PureComponent<IProps> {
  // this customizes the component tsParticles installation
  async customInit(engine: Engine): Promise<void> {
    // this adds the preset to tsParticles, you can safely use the
    await loadFireworksPreset(engine);
  }

  render() {
    const options = {
      preset: "fireworks",
    };

    return <Particles options={options} init={this.customInit} />;
  }
}
```

### Vue (2.x and 3.x)

_The syntax for `Vue.js 2.x` and `3.x` is the same_

```vue
<Particles id="tsparticles" :particlesInit="particlesInit" :options="particlesOptions" />
```

```ts
const particlesOptions = {
  preset: "fireworks",
};

async function particlesInit(engine: Engine): Promise<void> {
  await loadFireworksPreset(engine);
}
```

### Angular

```html
<ng-particles [id]="id" [options]="particlesOptions" [particlesInit]="particlesInit"></ng-particles>
```

```ts
const particlesOptions = {
  preset: "fireworks",
};

async function particlesInit(engine: Engine): Promise<void> {
  await loadFireworksPreset(engine);
}
```

### Svelte

```sveltehtml

<Particles
        id="tsparticles"
        options={particlesOptions}
        particlesInit={particlesInit}
/>
```

```js
let particlesOptions = {
  preset: "fireworks",
};

let particlesInit = async (engine) => {
  await loadFireworksPreset(engine);
};
```

---

```mermaid
flowchart TD

subgraph m [Movers]
mb[Base]
end

e[tsParticles Engine] --> m

subgraph pl [Plugins]
ple[Emitters]
end

e --> pl

subgraph s [Shapes]
sc[Circle]
sl[Line]
end

e --> s

subgraph u [Updaters]
ua[Angle]
uc[Color]
ud[Destroy]
ul[Life]
uop[Opacity]
uou[Out Modes]
usi[Size]
ust[Stroke Color]
end

e --> u

subgraph pr [Presets]
prfw[Fireworks]
end

e --> pr

mb & ple & sc & sl & ua & uc & ud & ul & uop & uou & usi & ust --> prfw
```
