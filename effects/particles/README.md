[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Particles Effect

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/effect-particles/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/effect-particles)
[![npmjs](https://badge.fury.io/js/@tsparticles/effect-particles.svg)](https://www.npmjs.com/package/@tsparticles/effect-particles)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/effect-particles)](https://www.npmjs.com/package/@tsparticles/effect-particles) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) additional particles effect.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.effect.particles.min.js` file will export the function to load the effect:

```text
loadParticlesEffect
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the effect like this:

```javascript
(async () => {
  await loadParticlesEffect(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      /* options */
      /* here you can use particles.effect.type: "particles" */
    },
  });
})();
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install @tsparticles/effect-particles
```

or

```shell
$ yarn add @tsparticles/effect-particles
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadParticlesEffect } = require("@tsparticles/effect-particles");

(async () => {
  await loadParticlesEffect(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadParticlesEffect } from "@tsparticles/effect-particles";

(async () => {
  await loadParticlesEffect(tsParticles);
})();
```
