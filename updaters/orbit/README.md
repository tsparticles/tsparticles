[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Orbit Updater

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/updater-orbit/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/updater-orbit)
[![npmjs](https://badge.fury.io/js/@tsparticles/updater-orbit.svg)](https://www.npmjs.com/package/@tsparticles/updater-orbit)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/updater-orbit)](https://www.npmjs.com/package/@tsparticles/updater-orbit) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) updater plugin for orbit animations.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.updater.orbit.min.js` file will export the function to load the updater plugin:

```text
loadOrbitUpdater
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the updater plugin like this:

```javascript
(async () => {
  await loadOrbitUpdater(tsParticles);

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
$ npm install @tsparticles/updater-orbit
```

or

```shell
$ yarn add @tsparticles/updater-orbit
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadOrbitUpdater } = require("@tsparticles/updater-orbit");

(async () => {
  await loadOrbitUpdater(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadOrbitUpdater } from "@tsparticles/updater-orbit";

(async () => {
  await loadOrbitUpdater(tsParticles);
})();
```
