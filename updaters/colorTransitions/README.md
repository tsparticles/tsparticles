[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# @tsparticles/updater-color-transitions

tsParticles updater for transitioning particle colors across their lifetime with configurable color stops.

## How to use it

### CDN / Vanilla / jQuery

The CDN/Vanilla version JS has one exported function, `loadColorTransitionsUpdater`, which loads the updater in the
given `engine` instance.

```javascript
await loadColorTransitionsUpdater(engine);
```

or

```javascript
loadColorTransitionsUpdater(engine).then(() => {
  // the updater is loaded
});
```

### Bundle

The updater can be added to any bundle package using its exported `loadColorTransitionsUpdater` function.

## Options

The updater adds a `colorTransitions` property to the particles options, with a `lifetime` section driving the color
through finite particle life progress when available. The life updater is optional. Without a finite life clock,
the updater advances its own elapsed frame time, using `lifetime.duration` or a default duration of one second.
The transition clamps to its final stop when complete. Spawning and destroyed particles do not advance it.

The `lifetime.stops` list applies to both the fill and the stroke colors, matching how a single `paint` color applies
to both channels; random stop colors resolve once, so fill and stroke transition through the same colors. A channel
can override the shared stops with its own `lifetime.fill.stops` or `lifetime.stroke.stops` list; a channel without
stops of its own (or with an empty list) falls back to the shared stops. An optional `lifetime.duration` (in seconds,
like the life options) rescales the transition progress: a shorter value completes
the transition earlier in each life cycle, and the transition restarts with each finite life cycle or when the particle is initialized again.

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim"; // includes the life updater
import { loadColorTransitionsUpdater } from "@tsparticles/updater-color-transitions";

await loadSlim(tsParticles);
await loadColorTransitionsUpdater(tsParticles);

const options = {
  particles: {
    life: {
      duration: { sync: true, value: 5 }, // seconds; optional, the transition can also run without the life updater
      count: -1, // -1: particles respawn and the transition restarts
    },
    colorTransitions: {
      lifetime: {
        enable: true,
        sync: true, // when false, every particle starts the transition at a random progress
        stops: [
          { offset: 0, value: "#ffff00" }, // particles spawn bright yellow
          { offset: 0.5, value: "#ff0000" }, // and turn red at half of their life
          { offset: 1, value: "#000000" }, // fading to black when their life ends
        ],
        stroke: {
          stops: [
            { offset: 0, value: "#ffffff" }, // the stroke uses its own transition instead,
            { offset: 1, value: "#ff00ff" }, // from white to magenta
          ],
        },
      },
    },
  },
};

await tsParticles.load({ options });
```

This is useful for effects like burning fire (yellow to red to black) or fading sparkles.

## Reporting Issues and Contributing

Refer to the [contributing guidelines](https://github.com/tsparticles/tsparticles/blob/main/CONTRIBUTING.md).

Transition colors are exposed through the particle color getters, including connect gradients and links using `"mid"`. Bubble color modifiers and roll back-face colors still apply. Fill and stroke opacity factors multiply the overall particle opacity.
