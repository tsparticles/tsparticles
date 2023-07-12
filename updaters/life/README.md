[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Life Updater

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-updater-life/badge)](https://www.jsdelivr.com/package/npm/tsparticles-updater-life)
[![npmjs](https://badge.fury.io/js/tsparticles-updater-life.svg)](https://www.npmjs.com/package/tsparticles-updater-life)
[![npmjs](https://img.shields.io/npm/dt/tsparticles-updater-life)](https://www.npmjs.com/package/tsparticles-updater-life) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/matteobruni/tsparticles) updater plugin for life animations.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.updater.life.min.js` file will export the function to load the updater plugin:

```javascript
loadLifeUpdater;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the updater plugin like this:

```javascript
(async () => {
  await loadLifeUpdater(tsParticles);

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
$ npm install tsparticles-updater-life
```

or

```shell
$ yarn add tsparticles-updater-life
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("tsparticles-engine");
const { loadLifeUpdater } = require("tsparticles-updater-life");

(async () => {
  await loadLifeUpdater(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "tsparticles-engine";
import { loadLifeUpdater } from "tsparticles-updater-life";

(async () => {
  await loadLifeUpdater(tsParticles);
})();
```
