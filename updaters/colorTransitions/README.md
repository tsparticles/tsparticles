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
through the particle life progress. It requires the life updater (`@tsparticles/updater-life`, already included in
the `slim`/`full` bundles) with a finite `life.duration` to work, since the life progress is read from the particle
life state.

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim"; // includes the life updater
import { loadColorTransitionsUpdater } from "@tsparticles/updater-color-transitions";

await loadSlim(tsParticles);
await loadColorTransitionsUpdater(tsParticles);

const options = {
  particles: {
    life: {
      duration: { sync: true, value: 5 }, // seconds; the transition needs a finite duration
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
      },
    },
  },
};

await tsParticles.load({ options });
```

This is useful for effects like burning fire (yellow to red to black) or fading sparkles.

## Reporting Issues and Contributing

Refer to the [contributing guidelines](https://github.com/tsparticles/tsparticles/blob/main/CONTRIBUTING.md).
