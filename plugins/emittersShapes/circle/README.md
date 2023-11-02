[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Emitters Shape Circle Plugin

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/plugin-emitters-shape-circle/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/plugin-emitters-shape-circle)
[![npmjs](https://badge.fury.io/js/@tsparticles/plugin-emitters-shape-circle.svg)](https://www.npmjs.com/package/@tsparticles/plugin-emitters-shape-circle)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/plugin-emitters-shape-circle)](https://www.npmjs.com/package/@tsparticles/plugin-emitters-shape-circle) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) plugin for adding the emitters shape circle support.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.plugin.emitters.shape.circle.min.js` file will export the function to load the plugin:

```text
loadEmittersShapeCirclePlugin
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the plugin like this:

```javascript
(async () => {
  await loadEmittersPlugin(tsParticles);
  await loadEmittersShapeCirclePlugin(tsParticles);

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
$ npm install @tsparticles/plugin-emitters-shape-circle
```

or

```shell
$ yarn add @tsparticles/plugin-emitters-shape-circle
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadEmittersPlugin } = require("@tsparticles/plugin-emitters");
const { loadEmittersShapeCirclePlugin } = require("@tsparticles/plugin-emitters-shape-circle");

(async () => {
  await loadEmittersPlugin(tsParticles);
  await loadEmittersShapeCirclePlugin(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadEmittersPlugin } from "@tsparticles/plugin-emitters";
import { loadEmittersShapeCirclePlugin } from "@tsparticles/plugin-emitters-shape-circle";

(async () => {
  await loadEmittersPlugin(tsParticles);
  await loadEmittersShapeCirclePlugin(tsParticles);
})();
```
