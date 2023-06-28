[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Rotate Updater

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-updater-rotate/badge)](https://www.jsdelivr.com/package/npm/tsparticles-updater-rotate)
[![npmjs](https://badge.fury.io/js/tsparticles-updater-rotate.svg)](https://www.npmjs.com/package/tsparticles-updater-rotate)
[![npmjs](https://img.shields.io/npm/dt/tsparticles-updater-rotate)](https://www.npmjs.com/package/tsparticles-updater-rotate) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/matteobruni/tsparticles) updater plugin for rotate animations.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.updater.rotate.min.js` file will export the function to load the updater plugin:

```javascript
loadRotateUpdater;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the updater plugin like this:

```javascript
(async () => {
  await loadRotateUpdater(tsParticles);

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
$ npm install tsparticles-updater-rotate
```

or

```shell
$ yarn add tsparticles-updater-rotate
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("tsparticles-engine");
const { loadRotateUpdater } = require("tsparticles-updater-rotate");

(async () => {
  await loadRotateUpdater(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "tsparticles-engine";
import { loadRotateUpdater } from "tsparticles-updater-rotate";

(async () => {
  await loadRotateUpdater(tsParticles);
})();
```
