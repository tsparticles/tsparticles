[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Confetti Preset

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-preset-confetti/badge)](https://www.jsdelivr.com/package/npm/tsparticles-preset-confetti) [![npmjs](https://badge.fury.io/js/tsparticles-preset-confetti.svg)](https://www.npmjs.com/package/tsparticles-preset-confetti) [![npmjs](https://img.shields.io/npm/dt/tsparticles-preset-confetti)](https://www.npmjs.com/package/tsparticles-preset-confetti) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/matteobruni/tsparticles) preset for white and red confetti launched from the screen
center on a transparent background.

[![Slack](https://particles.js.org/images/slack.png)](https://join.slack.com/t/tsparticles/shared_invite/enQtOTcxNTQxNjQ4NzkxLWE2MTZhZWExMWRmOWI5MTMxNjczOGE1Yjk0MjViYjdkYTUzODM3OTc5MGQ5MjFlODc4MzE0N2Q1OWQxZDc1YzI) [![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Sample

[![demo](https://raw.githubusercontent.com/matteobruni/tsparticles/main/presets/confetti/images/sample.png)](https://particles.js.org/samples/presets/confetti)

## How to use it

### CDN / Vanilla JS / jQuery

The first step is installing [tsParticles](https://github.com/matteobruni/tsparticles) following the instructions for
vanilla javascript in the main project [here](https://github.com/matteobruni/tsparticles)

Once added the script you need one more script to be included in your page (or you can download that
from [jsDelivr](https://www.jsdelivr.com/package/npm/tsparticles-preset-confetti):

```html
<script src="https://cdn.jsdelivr.net/npm/tsparticles-engine@2/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles-move-base@2/tsparticles.move.base.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles-plugin-emitters@2/tsparticles.plugin.emitters.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles-shape-circle@2/tsparticles.shape.circle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles-shape-square@2/tsparticles.shape.square.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles-updater-angle@2/tsparticles.updater.angle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles-updater-color@2/tsparticles.updater.color.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles-updater-life@2/tsparticles.updater.life.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles-updater-opacity@2/tsparticles.updater.opacity.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles-updater-out-modes@2/tsparticles.updater.out-modes.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles-updater-roll@2/tsparticles.updater.roll.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles-updater-size@2/tsparticles.updater.size.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles-updater-tilt@2/tsparticles.updater.tilt.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles-updater-wobble@2/tsparticles.updater.wobble.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles-preset-confetti@2/tsparticles.preset.confetti.min.js"></script>
```

#### Bundle

A bundled script can also be used, this will include every needed plugin needed by the preset.

```html
<script src="https://cdn.jsdelivr.net/npm/tsparticles-preset-confetti@2/tsparticles.preset.confetti.bundle.min.js"></script>
```

### Usage

Once the scripts are loaded you can set up `tsParticles` like this:

```javascript
(async () => {
  await loadConfettiPreset(tsParticles); // this is required only if you are not using the bundle script

  await tsParticles.load("tsparticles", {
    preset: "confetti",
  });
})();
```

### Customization

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

#### Cannons

The preset has a single life cannon, with a short duration. The effect is immediate and ends few seconds after, but this
can be customized too.

The confetti cannons are made using the _Emitter_ plugin, which is already
documented [here](https://particles.js.org/docs/classes/Plugins_Emitters_Options_Classes_Emitter.Emitter.html).

These are the default cannon (emitter) options:

The default emitter options are these:

```json
{
  "startCount": 50,
  "position": {
    "x": 50,
    "y": 50
  },
  "size": {
    "width": 0,
    "height": 0
  },
  "rate": {
    "delay": 0,
    "quantity": 0
  },
  "life": {
    "duration": 0.1,
    "count": 1
  }
}
```

Let's see how to create the most common types of cannon animations:

##### Long lasting Cannon

To create a long-lasting cannon, the emitter life options need some changes.

The `life.duration` needs to be increased, the value is in `seconds`, so actually it lasts one tenth of a second.

If `life.duration` is set to `0`, the cannon will last forever.

The `life.count` parameter instead can be changed as well, but the animation will last for the specified
duration, `life.count` times, if the `life.duration` is set to `0`, the `life.count` is ignored since its first life
will last forever.

###### Sample

```javascript
tsParticles.load("tsparticles", {
  emitters: {
    life: {
      duration: 0,
    },
  },
  preset: "confetti",
});
```

This will create an infinite cannon shooting confetti from the center of the canvas.

##### Immortal Cannon - Fireworks

To create a fireworks effect, or an immortal cannon, the emitter life options, again, need some changes.

The `life.duration` can be kept to the default short value, but the `life.count` is what we need to change.

For an immortal cannon we can change `life.count` to `0` and the emitter will continue respawning every `life.delay`
seconds. Actually is not specified, if you want some delay between "explosions", set this value to something greater
than `0`.

For an improved effect, the `position` as well can be customized. For randomizing it, it can be set to `{}`, and it'll
have a random position every "explosion". If a coordinate is set, that will be used everytime, as a percentage of the
canvas size.

```javascript
tsParticles.load("tsparticles", {
  emitters: {
    life: {
      count: 0,
    },
    position: {
      // uncomment only one of these lines,
      // to have explosions on the x or y axis
      // centered on the other one
      // if everything is kept commented,
      // random positions will be used everytime the cannon fires
      // x: 50,
      // y: 50
    },
  },
  preset: "confetti",
});
```

###### Multiple Cannons

Now that we have played with a single cannon, what about multiple ones?

This needs more customization since the cannons array will overwrite the existing options.

First let's start overriding the emitters (cannons) options placing an array instead of an object.

Like this:

```javascript
tsParticles.load("tsparticles", {
  emitters: [],
  preset: "confetti",
});
```

If you test this, you won't see anything, because the emitters are set to an empty array, so there's nothing to show.

Now you can add emitters to the array, using the standard tsParticles emitters options.

###### Sample

```javascript
tsParticles.load("tsparticles", {
  emitters: [
    {
      life: {
        duration: 5,
        count: 1,
      },
      position: {
        x: 0,
        y: 30,
      },
      particles: {
        move: {
          direction: "top-right",
        },
      },
    },
    {
      life: {
        duration: 5,
        count: 1,
      },
      position: {
        x: 100,
        y: 30,
      },
      particles: {
        move: {
          direction: "top-left",
        },
      },
    },
  ],
  preset: "confetti",
});
```

This samples creates two cannons, one on the left and one on the right of the canvas, at 30% of canvas height, shooting
in opposite directions.

### React.js / Preact / Inferno

_The syntax for `React.js`, `Preact` and `Inferno` is the same_.

This sample uses the class component syntax, but you can use hooks as well (if the library supports it).

```typescript jsx
import Particles from "react-particles";
import type { Engine } from "tsparticles-engine";
import { loadConfettiPreset } from "tsparticles-preset-confetti";

export class ParticlesContainer extends React.PureComponent<IProps> {
  // this customizes the component tsParticles installation
  async customInit(engine: Engine): Promise<void> {
    // this adds the preset to tsParticles, you can safely use the
    await loadConfettiPreset(engine);
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
<Particles id="tsparticles" :particlesInit="particlesInit" :options="particlesOptions" />
```

```ts
const particlesOptions = {
  preset: "confetti",
};

async function particlesInit(engine: Engine): Promise<void> {
  await loadConfettiPreset(engine);
}
```

### Angular

```html
<ng-particles [id]="id" [options]="particlesOptions" [particlesInit]="particlesInit"></ng-particles>
```

```ts
const particlesOptions = {
  preset: "confetti",
};

async function particlesInit(engine: Engine): Promise<void> {
  await loadConfettiPreset(engine);
}
```

### Svelte

```sveltehtml

<Particles
        id="tsparticles"
        options={options}
        particlesInit={particlesInit}
/>
```

```js
let particlesOptions = {
  preset: "confetti",
};

let particlesInit = async (engine) => {
  await loadConfettiPreset(engine);
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
plm[Motion]
end

e --> pl

subgraph s [Shapes]
sc[Circle]
ssq[Square]
end

e --> s

subgraph u [Updaters]
ua[Angle]
uc[Color]
ul[Life]
uop[Opacity]
uou[Out Modes]
ur[Roll]
usi[Size]
uti[Tilt]
uw[Wobble]
end

e --> u

subgraph pr [Presets]
prc[Confetti]
end

mb & ple & plm & sc & ssq & ua & uc & ul & uop & uou & ur & usi & uti & uw --> prc
```
