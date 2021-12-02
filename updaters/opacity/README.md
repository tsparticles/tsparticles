[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Opacity Updater

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-updater-opacity/badge)](https://www.jsdelivr.com/package/npm/tsparticles-updater-opacity)
[![npmjs](https://badge.fury.io/js/tsparticles-updater-opacity.svg)](https://www.npmjs.com/package/tsparticles-updater-opacity)
[![npmjs](https://img.shields.io/npm/dt/tsparticles-updater-opacity)](https://www.npmjs.com/package/tsparticles-updater-opacity)

[tsParticles](https://github.com/matteobruni/tsparticles) updater plugin for opacity animations.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.updater.opacity.min.js` file will export the function to load the updater plugin:

```javascript
loadOpacityUpdater;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the updater plugin like this:

```javascript
loadOpacityUpdater(tsParticles);

tsParticles.load("tsparticles", {
  /* options */
});
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install tsparticles-updater-opacity
```

or

```shell
$ yarn add tsparticles-updater-opacity
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("tsparticles-engine");
const { loadOpacityUpdater } = require("tsparticles-updater-opacity");

loadOpacityUpdater(tsParticles);
```

or

```javascript
import { tsParticles } from "tsparticles-engine";
import { loadOpacityUpdater } from "tsparticles-updater-opacity";

loadOpacityUpdater(tsParticles);
```
