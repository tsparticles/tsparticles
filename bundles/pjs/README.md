[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Particles.js Compatibility Package

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-particles.js/badge)](https://www.jsdelivr.com/package/npm/tsparticles-particles.js) [![npmjs](https://badge.fury.io/js/tsparticles-particles.js.svg)](https://www.npmjs.com/package/tsparticles-particles.js) [![npmjs](https://img.shields.io/npm/dt/tsparticles-particles.js)](https://www.npmjs.com/package/tsparticles-particles.js)

[tsParticles](https://github.com/matteobruni/tsparticles) particles.js compatibility library.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has two different files:

- One is a bundle file with all the scripts included in a single file
- One is a file including just the `initPjs` function to load the tsParticles/particles.js compatibility

#### Bundle

Including the `tsparticles.pjs.bundle.min.js` file will work exactly like `v1`, you can start using the `tsParticles` or
the `particlesJS` instance in the same way.

This is the easiest usage, since it's a single file with the some of the `v1` features.

All new features will be added as external packages, this bundle is recommended for migrating from `v1` easily.

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

tsParticles.load("tsparticles", {
  /* options */
});
```
