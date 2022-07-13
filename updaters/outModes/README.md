[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Out Modes Updater

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-updater-out-modes/badge)](https://www.jsdelivr.com/package/npm/tsparticles-updater-out-modes)
[![npmjs](https://badge.fury.io/js/tsparticles-updater-out-modes.svg)](https://www.npmjs.com/package/tsparticles-updater-out-modes)
[![npmjs](https://img.shields.io/npm/dt/tsparticles-updater-out-modes)](https://www.npmjs.com/package/tsparticles-updater-out-modes) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/matteobruni/tsparticles) updater plugin for out modes animations.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.updater.out-modes.min.js` file will export the function to load the updater plugin:

```javascript
loadOutModesUpdater;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the updater plugin like this:

```javascript
loadOutModesUpdater(tsParticles);

tsParticles.load("tsparticles", {
  /* options */
});
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install tsparticles-updater-out-modes
```

or

```shell
$ yarn add tsparticles-updater-out-modes
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("tsparticles-engine");
const { loadOutModesUpdater } = require("tsparticles-updater-out-modes");

loadOutModesUpdater(tsParticles);
```

or

```javascript
import { tsParticles } from "tsparticles-engine";
import { loadOutModesUpdater } from "tsparticles-updater-out-modes";

loadOutModesUpdater(tsParticles);
```
