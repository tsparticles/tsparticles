[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Sounds Plugin

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/plugin-sounds/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/plugin-sounds)
[![npmjs](https://badge.fury.io/js/@tsparticles/plugin-sounds.svg)](https://www.npmjs.com/package/@tsparticles/plugin-sounds)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/plugin-sounds)](https://www.npmjs.com/package/@tsparticles/plugin-sounds) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) plugin for particles sounds effect.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.plugin.sounds.min.js` file will export the function to load the plugin:

```javascript
loadSoundsPlugin;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the plugin like this:

```javascript
(async () => {
  await loadSoundsPlugin(tsParticles);

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
$ npm install @tsparticles/plugin-sounds
```

or

```shell
$ yarn add @tsparticles/plugin-sounds
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadSoundsPlugin } = require("@tsparticles/plugin-sounds");

(async () => {
  await loadSoundsPlugin(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadSoundsPlugin } from "@tsparticles/plugin-sounds";

(async () => {
  await loadSoundsPlugin(tsParticles);
})();
```
