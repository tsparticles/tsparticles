[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles Poisson Disc Plugin

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/plugin-poisson/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/plugin-poisson)
[![npmjs](https://badge.fury.io/js/@tsparticles/plugin-poisson.svg)](https://www.npmjs.com/package/@tsparticles/plugin-poisson)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/plugin-poisson)](https://www.npmjs.com/package/@tsparticles/plugin-poisson) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) plugin for particles poisson disc effect.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.plugin.poisson.min.js` file will export the function to load the plugin:

```javascript
loadPoissonDiscPlugin;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the plugin like this:

```javascript
(async () => {
  await loadPoissonDiscPlugin(tsParticles);

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
$ npm install @tsparticles/plugin-poisson
```

or

```shell
$ yarn add @tsparticles/plugin-poisson
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadPoissonDiscPlugin } = require("@tsparticles/plugin-poisson");

(async () => {
  await loadPoissonDiscPlugin(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadPoissonDiscPlugin } from "@tsparticles/plugin-poisson";

(async () => {
  await loadPoissonDiscPlugin(tsParticles);
})();
```
