[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Fill Color Updater

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/updater-fill-color/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/updater-fill-color)
[![npmjs](https://badge.fury.io/js/@tsparticles/updater-fill-color.svg)](https://www.npmjs.com/package/@tsparticles/updater-fill-color)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/updater-fill-color)](https://www.npmjs.com/package/@tsparticles/updater-fill-color) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) updater plugin for color animations.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.updater.fill-color.min.js` file will export the function to load the updater plugin:

```javascript
loadFillColorUpdater;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the updater plugin like this:

```javascript
(async () => {
  await loadFillColorUpdater(tsParticles);

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
$ npm install @tsparticles/updater-fill-color
```

or

```shell
$ yarn add @tsparticles/updater-fill-color
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadFillColorUpdater } = require("@tsparticles/updater-fill-color");

(async () => {
  await loadFillColorUpdater(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadFillColorUpdater } from "@tsparticles/updater-fill-color";

(async () => {
  await loadFillColorUpdater(tsParticles);
})();
```
