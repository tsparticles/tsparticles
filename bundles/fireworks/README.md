[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Fireworks Bundle

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-fireworks/badge)](https://www.jsdelivr.com/package/npm/tsparticles-fireworks) [![npmjs](https://badge.fury.io/js/tsparticles-fireworks.svg)](https://www.npmjs.com/package/tsparticles-fireworks) [![npmjs](https://img.shields.io/npm/dt/tsparticles-fireworks)](https://www.npmjs.com/package/tsparticles-fireworks) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/matteobruni/tsparticles) fireworks bundle loads all the features necessary to create beautiful fireworks effects with ease.

**Included Packages**

- [tsparticles-engine](https://github.com/matteobruni/tsparticles/tree/main/engine)
- [tsparticles-move-base](https://github.com/matteobruni/tsparticles/tree/main/move/base)
- [tsparticles-plugin-emitters](https://github.com/matteobruni/tsparticles/tree/main/plugins/emitters)
- [tsparticles-plugin-sounds](https://github.com/matteobruni/tsparticles/tree/main/plugins/sounds)
- [tsparticles-shape-circle](https://github.com/matteobruni/tsparticles/tree/main/shapes/circle)
- [tsparticles-shape-line](https://github.com/matteobruni/tsparticles/tree/main/shapes/line)
- [tsparticles-updater-color](https://github.com/matteobruni/tsparticles/tree/main/updaters/color)
- [tsparticles-updater-destroy](https://github.com/matteobruni/tsparticles/tree/main/updaters/destroy)
- [tsparticles-updater-life](https://github.com/matteobruni/tsparticles/tree/main/updaters/life)
- [tsparticles-updater-opacity](https://github.com/matteobruni/tsparticles/tree/main/updaters/opacity)
- [tsparticles-updater-out-modes](https://github.com/matteobruni/tsparticles/tree/main/updaters/outModes)
- [tsparticles-updater-rotate](https://github.com/matteobruni/tsparticles/tree/main/updaters/rotate)
- [tsparticles-updater-size](https://github.com/matteobruni/tsparticles/tree/main/updaters/size)
- [tsparticles-updater-stroke-color](https://github.com/matteobruni/tsparticles/tree/main/updaters/strokeColor)

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has two different files:

- One is a bundle file with all the scripts included in a single file
- One is a file including just the `fireworks` function to load the tsParticles fireworks bunddle, all dependencies must be
  included manually

#### Bundle

Including the `tsparticles.fireworks.bundle.min.js` file will out of the box.

This is the easiest usage, since it's a single file with all the features loaded.

You can still add additional packages, loading them like all the other packages.

#### Not Bundle

This installation requires more work since all dependencies must be included in the page. Some lines above are all
specified in the **Included Packages** section.

### Usage

Once the scripts are loaded you can set up `tsParticles` like the following examples:

````javascript

** Easiest Way **

```javascript
fireworks()
````

** Async Way, best practice **

```javascript
(async () => {
  await fireworks();
})();
```

** Fireworks Options **

```javascript
fireworks({
  colors: ["#ffffff", "#ff0000"],
});
```

#### Options

The `fireworks` has only a single `options` object parameter, with the following properties:

- `brightness` Number or { min: number; max: number; }: The brightness offset applied to the particles color, from -100 to 100.
- `colors` String or _Array&lt;String&gt;_: An array of color strings, in the HEX format... you know, like `#bada55`.
- `gravity` Number or { min: number; max: number; }: The gravity applied to the fireworks particles.
- `minHeight` Number or { min: number; max: number; }: The minimum height for fireworks explosions (the lesser, the higher).
- `rate` Number or { min: number; max: number; }: The rate of the fireworks explosions.
- `saturation` Number or { min: number; max: number; }: The saturation offset applied to the particles color, from -100 to 100.
- `sounds` Boolean: Whether to play sounds or not.
- `speed` Number or { min: number; max: number; }: The speed of the fireworks particles.
- `splitCount` Number or { min: number; max: number; }: The number of particles to split the emitter in.
