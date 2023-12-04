[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Absorbers Plugin

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/plugin-absorbers/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/plugin-absorbers)
[![npmjs](https://badge.fury.io/js/@tsparticles/plugin-absorbers.svg)](https://www.npmjs.com/package/@tsparticles/plugin-absorbers)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/plugin-absorbers)](https://www.npmjs.com/package/@tsparticles/plugin-absorbers) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) plugin for particles absorbers.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.plugin.absorbers.min.js` file will export the function to load the plugin:

```javascript
loadAbsorbersPlugin;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the plugin like this:

```javascript
(async () => {
  await loadAbsorbersPlugin(tsParticles);

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
$ npm install @tsparticles/plugin-absorbers
```

or

```shell
$ yarn add @tsparticles/plugin-absorbers
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadAbsorbersPlugin } = require("@tsparticles/plugin-absorbers");

(async () => {
  await loadAbsorbersPlugin(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadAbsorbersPlugin } from "@tsparticles/plugin-absorbers";

(async () => {
  await loadAbsorbersPlugin(tsParticles);
})();
```
