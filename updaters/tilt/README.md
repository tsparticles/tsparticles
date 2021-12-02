[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Tilt Updater

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-updater-tilt/badge)](https://www.jsdelivr.com/package/npm/tsparticles-updater-tilt)
[![npmjs](https://badge.fury.io/js/tsparticles-updater-tilt.svg)](https://www.npmjs.com/package/tsparticles-updater-tilt)
[![npmjs](https://img.shields.io/npm/dt/tsparticles-updater-tilt)](https://www.npmjs.com/package/tsparticles-updater-tilt)

[tsParticles](https://github.com/matteobruni/tsparticles) updater plugin for tilt animations.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.updater.tilt.min.js` file will export the function to load the updater plugin:

```javascript
loadTiltUpdater;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the updater plugin like this:

```javascript
loadTiltUpdater(tsParticles);

tsParticles.load("tsparticles", {
  /* options */
});
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install tsparticles-updater-tilt
```

or

```shell
$ yarn add tsparticles-updater-tilt
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("tsparticles-engine");
const { loadTiltUpdater } = require("tsparticles-updater-tilt");

loadTiltUpdater(tsParticles);
```

or

```javascript
import { tsParticles } from "tsparticles-engine";
import { loadTiltUpdater } from "tsparticles-updater-tilt";

loadTiltUpdater(tsParticles);
```
