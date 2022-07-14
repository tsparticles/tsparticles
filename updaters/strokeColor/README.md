[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Stroke Color Updater

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-updater-stroke-color/badge)](https://www.jsdelivr.com/package/npm/tsparticles-updater-stroke-color)
[![npmjs](https://badge.fury.io/js/tsparticles-updater-stroke-color.svg)](https://www.npmjs.com/package/tsparticles-updater-stroke-color)
[![npmjs](https://img.shields.io/npm/dt/tsparticles-updater-stroke-color)](https://www.npmjs.com/package/tsparticles-updater-stroke-color) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/matteobruni/tsparticles) updater plugin for stroke color animations.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.updater.stroke-color.min.js` file will export the function to load the updater plugin:

```javascript
loadStrokeColorUpdater;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the updater plugin like this:

```javascript
loadStrokeColorUpdater(tsParticles);

tsParticles.load("tsparticles", {
  /* options */
});
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install tsparticles-updater-stroke-color
```

or

```shell
$ yarn add tsparticles-updater-stroke-color
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("tsparticles-engine");
const { loadStrokeColorUpdater } = require("tsparticles-updater-stroke-color");

loadStrokeColorUpdater(tsParticles);
```

or

```javascript
import { tsParticles } from "tsparticles-engine";
import { loadStrokeColorUpdater } from "tsparticles-updater-stroke-color";

loadStrokeColorUpdater(tsParticles);
```
