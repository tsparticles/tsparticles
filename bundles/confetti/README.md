[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Confetti Bundle

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-confetti/badge)](https://www.jsdelivr.com/package/npm/tsparticles-confetti) [![npmjs](https://badge.fury.io/js/tsparticles-confetti.svg)](https://www.npmjs.com/package/tsparticles-confetti) [![npmjs](https://img.shields.io/npm/dt/tsparticles-confetti)](https://www.npmjs.com/package/tsparticles-confetti) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/matteobruni/tsparticles) confetti bundle loads all the features necessary to create beautiful confetti effects with ease.

**Included Packages**

- [tsparticles-engine](https://github.com/matteobruni/tsparticles/tree/main/engine)
- [tsparticles-move-base](https://github.com/matteobruni/tsparticles/tree/main/move/base)
- [tsparticles-plugin-emitters](https://github.com/matteobruni/tsparticles/tree/main/plugins/emitters)
- [tsparticles-plugin-motion](https://github.com/matteobruni/tsparticles/tree/main/plugins/motion)
- [tsparticles-shape-cards](https://github.com/matteobruni/tsparticles/tree/main/shapes/cards)
- [tsparticles-shape-circle](https://github.com/matteobruni/tsparticles/tree/main/shapes/circle)
- [tsparticles-shape-heart](https://github.com/matteobruni/tsparticles/tree/main/shapes/heart)
- [tsparticles-shape-image](https://github.com/matteobruni/tsparticles/tree/main/shapes/image)
- [tsparticles-shape-polygon](https://github.com/matteobruni/tsparticles/tree/main/shapes/polygon)
- [tsparticles-shape-square](https://github.com/matteobruni/tsparticles/tree/main/shapes/square)
- [tsparticles-shape-star](https://github.com/matteobruni/tsparticles/tree/main/shapes/star)
- [tsparticles-shape-text](https://github.com/matteobruni/tsparticles/tree/main/shapes/text)
- [tsparticles-updater-color](https://github.com/matteobruni/tsparticles/tree/main/updaters/color)
- [tsparticles-updater-life](https://github.com/matteobruni/tsparticles/tree/main/updaters/life)
- [tsparticles-updater-opacity](https://github.com/matteobruni/tsparticles/tree/main/updaters/opacity)
- [tsparticles-updater-out-modes](https://github.com/matteobruni/tsparticles/tree/main/updaters/outModes)
- [tsparticles-updater-roll](https://github.com/matteobruni/tsparticles/tree/main/updaters/roll)
- [tsparticles-updater-rotate](https://github.com/matteobruni/tsparticles/tree/main/updaters/rotate)
- [tsparticles-updater-size](https://github.com/matteobruni/tsparticles/tree/main/updaters/size)
- [tsparticles-updater-tilt](https://github.com/matteobruni/tsparticles/tree/main/updaters/tilt)
- [tsparticles-updater-wobble](https://github.com/matteobruni/tsparticles/tree/main/updaters/wobble)

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has two different files:

- One is a bundle file with all the scripts included in a single file
- One is a file including just the `confetti` function to load the tsParticles confetti bunddle, all dependencies must be
  included manually

#### Bundle

Including the `tsparticles.confetti.bundle.min.js` file will out of the box.

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
confetti()
````

** Async Way, best practice **

```javascript
(async () => {
  await confetti();
})();
```

** Confetti Options **

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
    x: 0.5,
    y: 0.5,
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

#### Options

The `confetti` first parameter can be an id and the second parameter a single `options` object, or just the single options object without the id, which will be `confetti` by default. The `options` object has the following properties:

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
  - `position.x` _Number (default: 50)_: The `x` position on the page, with `0` being the left edge and `100` being the
    right edge.
  - `position.y` _Number (default: 50)_: The `y` position on the page, with `0` being the top edge and `100` being the
    bottom edge.
- `colors` _Array&lt;String&gt;_: An array of color strings, in the HEX format... you know, like `#bada55`.
- `shapes` _Array&lt;String&gt;_: An array of shapes for the confetti. The possible values are:
  - `circle`
  - `square`
  - `star`
  - `polygon`
  - `image`
  - `heart`
  - `hearts`
  - `spades`
  - `clubs`
  - `diamonds`
  - `text`
    The default is to use both shapes in an even mix. You can even change the mix by providing a value such
    as `['circle', 'circle', 'square']` to use two third circles and one third squares.
- `scalar` _Number (default: 1)_: Scale factor for each confetti particle. Use decimals to make the confetti smaller. Go
  on, try teeny tiny confetti, they are adorable!
- `zIndex` _Integer (default: 100)_: The confetti should be on top, after all. But if you have a crazy high page, you
  can set it even higher.
- `disableForReducedMotion` _Boolean (default: true)_: Disables confetti entirely for users
  that [prefer reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion).

And for those asking, yes you can paste your canvas-confetti code and migrate to tsParticles Confetti without changing a thing
