[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Manual Particles Plugin

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/plugin-manual-particles/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/plugin-manual-particles)
[![npmjs](https://badge.fury.io/js/@tsparticles/plugin-manual-particles.svg)](https://www.npmjs.com/package/@tsparticles/plugin-manual-particles)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/plugin-manual-particles)](https://www.npmjs.com/package/@tsparticles/plugin-manual-particles) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) plugin for handling manual particles feature.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.plugin.manualParticles.min.js` file will export the function to load the plugin:

```javascript
loadManualParticlesPlugin;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the plugin like this:

```javascript
(async () => {
  await loadManualParticlesPlugin(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      /* options */
    },
  });
})();
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install @tsparticles/plugin-manual-particles
```

or

```shell
$ yarn add @tsparticles/plugin-manual-particles
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadManualParticlesPlugin } = require("@tsparticles/plugin-manual-particles");

(async () => {
  await loadManualParticlesPlugin(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadManualParticlesPlugin } from "@tsparticles/plugin-manual-particles";

(async () => {
  await loadManualParticlesPlugin(tsParticles);
})();
```
