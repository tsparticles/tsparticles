[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Fountain Preset

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-preset-fountain/badge)](https://www.jsdelivr.com/package/npm/tsparticles-preset-fountain) [![npmjs](https://badge.fury.io/js/tsparticles-preset-fountain.svg)](https://www.npmjs.com/package/tsparticles-preset-fountain) [![npmjs](https://img.shields.io/npm/dt/tsparticles-preset-fountain)](https://www.npmjs.com/package/tsparticles-preset-fountain) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/matteobruni/tsparticles) preset creating random positioned falling colored particles
that break when hitting the ground.

[![Slack](https://particles.js.org/images/slack.png)](https://join.slack.com/t/tsparticles/shared_invite/enQtOTcxNTQxNjQ4NzkxLWE2MTZhZWExMWRmOWI5MTMxNjczOGE1Yjk0MjViYjdkYTUzODM3OTc5MGQ5MjFlODc4MzE0N2Q1OWQxZDc1YzI) [![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Sample

[![demo](https://raw.githubusercontent.com/matteobruni/tsparticles/main/presets/fountain/images/sample.png)](https://particles.js.org/samples/presets/fountain)

## How to use it

### CDN / Vanilla JS / jQuery

The first step is installing [tsParticles](https://github.com/matteobruni/tsparticles) following the instructions for
vanilla javascript in the main project [here](https://github.com/matteobruni/tsparticles)

Once installed you need one more script to be included in your page (or you can download that
from [jsDelivr](https://www.jsdelivr.com/package/npm/tsparticles-preset-fountain):

```html
<script src="https://cdn.jsdelivr.net/npm/tsparticles-engine@2/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles-move-base@2/tsparticles.move.base.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles-plugin-emitters@2/tsparticles.plugin.emitters.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles-shape-circle@2/tsparticles.shape.circle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles-updater-color@2/tsparticles.updater.color.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles-updater-opacity@2/tsparticles.updater.opacity.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles-updater-out-modes@2/tsparticles.updater.out-modes.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles-updater-size@2/tsparticles.updater.size.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles-preset-fountain@2/tsparticles.preset.fountain.min.js"></script>
```

This script **MUST** be placed after the `tsParticles` one.

#### Bundle

A bundled script can also be used, this will include every needed plugin needed by the preset.

```html
<script src="https://cdn.jsdelivr.net/npm/tsparticles-preset-fountain@2/tsparticles.preset.fountain.bundle.min.js"></script>
```

### Usage

Once the scripts are loaded you can set up `tsParticles` like this:

```javascript
(async () => {
  await loadFountainPreset(tsParticles); // this is required only if you are not using the bundle script

  await tsParticles.load("tsparticles", {
    preset: "fountain",
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
  preset: "fountain",
});
```

Like in the sample above, the circles will be replaced by squares.

### React.js / Preact / Inferno

_The syntax for `React.js`, `Preact` and `Inferno` is the same_.

This sample uses the class component syntax, but you can use hooks as well (if the library supports it).

```typescript jsx
import Particles from "react-particles";
import type { Engine } from "tsparticles-engine";
import { loadFountainPreset } from "tsparticles-preset-fountain";

export class ParticlesContainer extends React.PureComponent<IProps> {
  // this customizes the component tsParticles installation
  async customInit(engine: Engine): Promise<void> {
    // this adds the preset to tsParticles, you can safely use the
    await loadFountainPreset(engine);
  }

  render() {
    const options = {
      preset: "fountain",
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
  preset: "fountain",
};

async function particlesInit(engine: Engine): Promise<void> {
  await loadFountainPreset(engine);
}
```

### Angular

```html
<ng-particles [id]="id" [options]="particlesOptions" [particlesInit]="particlesInit"></ng-particles>
```

```ts
const particlesOptions = {
  preset: "fountain",
};

async function particlesInit(engine: Engine): Promise<void> {
  await loadFountainPreset(engine);
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
  preset: "fountain",
};

let particlesInit = async (engine) => {
  await loadFountainPreset(engine);
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
end

e --> s

subgraph u [Updaters]
uc[Color]
ud[Destroy]
uop[Opacity]
uou[Out Modes]
usi[Size]
end

e --> u

subgraph pr [Presets]
prfo[Fountain]
end

e --> pr

mb & ple & sc & uc & ud & uop & uou & usi --> prfo
```
