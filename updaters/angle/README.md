[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Angle Updater

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-updater-angle/badge)](https://www.jsdelivr.com/package/npm/tsparticles-updater-angle)
[![npmjs](https://badge.fury.io/js/tsparticles-updater-angle.svg)](https://www.npmjs.com/package/tsparticles-updater-angle)
[![npmjs](https://img.shields.io/npm/dt/tsparticles-updater-angle)](https://www.npmjs.com/package/tsparticles-updater-angle)

[tsParticles](https://github.com/matteobruni/tsparticles) updater plugin for rotate animations.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.updater.angle.min.js` file will export the function to load the updater plugin:

```javascript
loadAngleUpdater;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the updater plugin like this:

```javascript
loadAngleUpdater(tsParticles);

tsParticles.load("tsparticles", {
  /* options */
});
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install tsparticles-updater-angle
```

or

```shell
$ yarn add tsparticles-updater-angle
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("tsparticles-engine");
const { loadAngleUpdater } = require("tsparticles-updater-angle");

loadAngleUpdater(tsParticles);
```

or

```javascript
import { tsParticles } from "tsparticles-engine";
import { loadAngleUpdater } from "tsparticles-updater-angle";

loadAngleUpdater(tsParticles);
```
