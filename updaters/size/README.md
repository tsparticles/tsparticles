[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Size Updater

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-updater-size/badge)](https://www.jsdelivr.com/package/npm/tsparticles-updater-size)
[![npmjs](https://badge.fury.io/js/tsparticles-updater-size.svg)](https://www.npmjs.com/package/tsparticles-updater-size)
[![npmjs](https://img.shields.io/npm/dt/tsparticles-updater-size)](https://www.npmjs.com/package/tsparticles-updater-size) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/matteobruni/tsparticles) updater plugin for size animations.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.updater.size.min.js` file will export the function to load the updater plugin:

```javascript
loadSizeUpdater;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the updater plugin like this:

```javascript
loadSizeUpdater(tsParticles);

tsParticles.load("tsparticles", {
  /* options */
});
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install tsparticles-updater-size
```

or

```shell
$ yarn add tsparticles-updater-size
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("tsparticles-engine");
const { loadSizeUpdater } = require("tsparticles-updater-size");

loadSizeUpdater(tsParticles);
```

or

```javascript
import { tsParticles } from "tsparticles-engine";
import { loadSizeUpdater } from "tsparticles-updater-size";

loadSizeUpdater(tsParticles);
```
