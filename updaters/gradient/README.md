[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Gradient Updater

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/updater-gradient/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/updater-gradient)
[![npmjs](https://badge.fury.io/js/@tsparticles/updater-gradient.svg)](https://www.npmjs.com/package/@tsparticles/updater-gradient)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/updater-gradient)](https://www.npmjs.com/package/@tsparticles/updater-gradient) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) updater plugin for gradient animations.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.updater.gradient.min.js` file will export the function to load the updater plugin:

```text
loadGradientUpdater
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the updater plugin like this:

```javascript
(async () => {
  await loadGradientUpdater(tsParticles);

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
$ npm install @tsparticles/updater-gradient
```

or

```shell
$ yarn add @tsparticles/updater-gradient
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadGradientUpdater } = require("@tsparticles/updater-gradient");

(async () => {
  await loadGradientUpdater(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadGradientUpdater } from "@tsparticles/updater-gradient";

(async () => {
  await loadGradientUpdater(tsParticles);
})();
```
