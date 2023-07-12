[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Destroy Updater

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-updater-destroy/badge)](https://www.jsdelivr.com/package/npm/tsparticles-updater-destroy)
[![npmjs](https://badge.fury.io/js/tsparticles-updater-destroy.svg)](https://www.npmjs.com/package/tsparticles-updater-destroy)
[![npmjs](https://img.shields.io/npm/dt/tsparticles-updater-destroy)](https://www.npmjs.com/package/tsparticles-updater-destroy) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/matteobruni/tsparticles) updater plugin for destroy animations.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.updater.destroy.min.js` file will export the function to load the updater plugin:

```javascript
loadDestroyUpdater;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the updater plugin like this:

```javascript
(async () => {
  await loadDestroyUpdater(tsParticles);

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
$ npm install tsparticles-updater-destroy
```

or

```shell
$ yarn add tsparticles-updater-destroy
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("tsparticles-engine");
const { loadDestroyUpdater } = require("tsparticles-updater-destroy");

(async () => {
  await loadDestroyUpdater(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "tsparticles-engine";
import { loadDestroyUpdater } from "tsparticles-updater-destroy";

(async () => {
  await loadDestroyUpdater(tsParticles);
})();
```
