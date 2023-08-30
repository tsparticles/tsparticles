[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Emitters Plugin

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/plugin-emitters/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/plugin-emitters)
[![npmjs](https://badge.fury.io/js/@tsparticles/plugin-emitters.svg)](https://www.npmjs.com/package/@tsparticles/plugin-emitters)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/plugin-emitters)](https://www.npmjs.com/package/@tsparticles/plugin-emitters) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) plugin for particles emitters.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.plugin.emitters.min.js` file will export the function to load the plugin:

```javascript
loadEmittersPlugin;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the plugin like this:

```javascript
(async () => {
  await loadEmittersPlugin(tsParticles);

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
$ npm install @tsparticles/plugin-emitters
```

or

```shell
$ yarn add @tsparticles/plugin-emitters
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadEmittersPlugin } = require("@tsparticles/plugin-emitters");

(async () => {
  await loadEmittersPlugin(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadEmittersPlugin } from "@tsparticles/plugin-emitters";

(async () => {
  await loadEmittersPlugin(tsParticles);
})();
```
