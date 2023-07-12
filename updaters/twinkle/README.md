[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Twinkle Updater

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-updater-twinkle/badge)](https://www.jsdelivr.com/package/npm/tsparticles-updater-twinkle)
[![npmjs](https://badge.fury.io/js/tsparticles-updater-twinkle.svg)](https://www.npmjs.com/package/tsparticles-updater-twinkle)
[![npmjs](https://img.shields.io/npm/dt/tsparticles-updater-twinkle)](https://www.npmjs.com/package/tsparticles-updater-twinkle) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/matteobruni/tsparticles) updater plugin for twinkle animations.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.updater.twinkle.min.js` file will export the function to load the updater plugin:

```javascript
loadTwinkleUpdater;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the updater plugin like this:

```javascript
(async () => {
  await loadTwinkleUpdater(tsParticles);

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
$ npm install tsparticles-updater-twinkle
```

or

```shell
$ yarn add tsparticles-updater-twinkle
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("tsparticles-engine");
const { loadTwinkleUpdater } = require("tsparticles-updater-twinkle");

(async () => {
  await loadTwinkleUpdater(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "tsparticles-engine";
import { loadTwinkleUpdater } from "tsparticles-updater-twinkle";

(async () => {
  await loadTwinkleUpdater(tsParticles);
})();
```
