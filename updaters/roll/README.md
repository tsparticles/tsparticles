[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Roll Updater

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-updater-roll/badge)](https://www.jsdelivr.com/package/npm/tsparticles-updater-roll)
[![npmjs](https://badge.fury.io/js/tsparticles-updater-roll.svg)](https://www.npmjs.com/package/tsparticles-updater-roll)
[![npmjs](https://img.shields.io/npm/dt/tsparticles-updater-roll)](https://www.npmjs.com/package/tsparticles-updater-roll) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/matteobruni/tsparticles) updater plugin for roll animations.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.updater.roll.min.js` file will export the function to load the updater plugin:

```javascript
loadRollUpdater;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the updater plugin like this:

```javascript
loadRollUpdater(tsParticles);

tsParticles.load("tsparticles", {
  /* options */
});
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install tsparticles-updater-roll
```

or

```shell
$ yarn add tsparticles-updater-roll
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("tsparticles-engine");
const { loadRollUpdater } = require("tsparticles-updater-roll");

loadRollUpdater(tsParticles);
```

or

```javascript
import { tsParticles } from "tsparticles-engine";
import { loadRollUpdater } from "tsparticles-updater-roll";

loadRollUpdater(tsParticles);
```
