[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Infection Plugin

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/plugin-infection/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/plugin-infection)
[![npmjs](https://badge.fury.io/js/@tsparticles/plugin-infection.svg)](https://www.npmjs.com/package/@tsparticles/plugin-infection)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/plugin-infection)](https://www.npmjs.com/package/@tsparticles/plugin-infection) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) plugin for particles infection simulation effect.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.plugin.infection.min.js` file will export the function to load the plugin:

```text
loadInfectionPlugin
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the plugin like this:

```javascript
(async () => {
  await loadInfectionPlugin(tsParticles);

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
$ npm install @tsparticles/plugin-infection
```

or

```shell
$ yarn add @tsparticles/plugin-infection
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadInfectionPlugin } = require("@tsparticles/plugin-infection");

(async () => {
  await loadInfectionPlugin(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadInfectionPlugin } from "@tsparticles/plugin-infection";

(async () => {
  await loadInfectionPlugin(tsParticles);
})();
```
