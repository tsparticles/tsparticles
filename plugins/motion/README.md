[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Motion Plugin

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/plugin-motion/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/plugin-motion)
[![npmjs](https://badge.fury.io/js/@tsparticles/plugin-motion.svg)](https://www.npmjs.com/package/@tsparticles/plugin-motion)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/plugin-motion)](https://www.npmjs.com/package/@tsparticles/plugin-motion) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) plugin for handling motion sickness CSS value.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.plugin.motion.min.js` file will export the function to load the plugin:

```javascript
loadMotionPlugin;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the plugin like this:

```javascript
(async () => {
  await loadMotionPlugin(tsParticles);

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
$ npm install @tsparticles/plugin-motion
```

or

```shell
$ yarn add @tsparticles/plugin-motion
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadMotionPlugin } = require("@tsparticles/plugin-motion");

(async () => {
  await loadMotionPlugin(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadMotionPlugin } from "@tsparticles/plugin-motion";

(async () => {
  await loadMotionPlugin(tsParticles);
})();
```
