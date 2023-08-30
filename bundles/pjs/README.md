[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Particles.js Compatibility Package

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/particles.js/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/particles.js) [![npmjs](https://badge.fury.io/js/@tsparticles/particles.js.svg)](https://www.npmjs.com/package/@tsparticles/particles.js) [![npmjs](https://img.shields.io/npm/dt/@tsparticles/particles.js)](https://www.npmjs.com/package/@tsparticles/particles.js) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) particles.js compatibility library.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has two different files:

- One is a bundle file with all the scripts included in a single file
- One is a file including just the `initPjs` function to load the tsParticles/particles.js compatibility

#### Bundle

Including the `tsparticles.pjs.bundle.min.js` file will work exactly like `v1`, you can start using the `tsParticles`,
the `particlesJS` instance, or the `Particles` object in the same way.

#### Not Bundle

This installation requires more work since all dependencies must be included in the page. Some lines above are all
specified in the **Included Packages** section.

### Usage

Once the scripts are loaded you can set up `tsParticles` or `particlesJS` like this:

```javascript
const { particlesJS } = initPjs(tsParticles); // not needed if using the bundle script, required for any other installation

particlesJS("tsparticles", {
  /* options */
});

// or

tsParticles.load({
  id: "tsparticles",
  options: {
    /* options */
  },
});
```

#### Options

Here you can use ParticlesJS or tsParticles options, they will work both fine.

### Alternative Usage

```javascript
const { Particles } = initPjs(tsParticles); // not needed if using the bundle script, required for any other installation

Particles.init({
  /* options */
});
```

#### Particles Options (only for Particles.init)

| Option             | Type               | Default   | Description                                                           |
| ------------------ | ------------------ | --------- | --------------------------------------------------------------------- |
| `selector`         | string             | -         | _Required:_ The CSS selector of your canvas element                   |
| `maxParticles`     | integer            | `100`     | _Optional:_ Maximum amount of particles                               |
| `sizeVariations`   | integer            | `3`       | _Optional:_ Amount of size variations                                 |
| `speed`            | integer            | `0.5`     | _Optional:_ Movement speed of the particles                           |
| `color`            | string or string[] | `#000000` | _Optional:_ Color(s) of the particles and connecting lines            |
| `minDistance`      | integer            | `120`     | _Optional:_ Distance in `px` for connecting lines                     |
| `connectParticles` | boolean            | `false`   | _Optional:_ `true`/`false` if connecting lines should be drawn or not |
| `responsive`       | array              | `null`    | _Optional:_ Array of objects containing breakpoints and options       |

##### Responsive Options

| Option       | Type    | Default | Description                                               |
| ------------ | ------- | ------- | --------------------------------------------------------- |
| `breakpoint` | integer | -       | _Required:_ Breakpoint in `px`                            |
| `options`    | object  | -       | _Required:_ Options object, that overrides default values |

#### Methods

| Method            | Description                         |
| ----------------- | ----------------------------------- |
| `pauseAnimation`  | Pauses/stops the particle animation |
| `resumeAnimation` | Continues the particle animation    |
| `destroy`         | Destroys the plugin                 |
