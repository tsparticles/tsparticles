[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Easing Elastic Plugin

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/plugin-easing-elastic/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/plugin-easing-elastic)
[![npmjs](https://badge.fury.io/js/@tsparticles/plugin-easing-elastic.svg)](https://www.npmjs.com/package/@tsparticles/plugin-easing-elastic)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/plugin-easing-elastic)](https://www.npmjs.com/package/@tsparticles/plugin-easing-elastic) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) plugin for adding the easing elastic support.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.plugin.easing.elastic.min.js` file will export the function to load the plugin:

```text
loadEasingElasticPlugin
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the plugin like this:

```javascript
(async () => {
  await loadEasingElasticPlugin();

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
$ npm install @tsparticles/plugin-easing-elastic
```

or

```shell
$ yarn add @tsparticles/plugin-easing-elastic
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadEasingElasticPlugin } = require("@tsparticles/plugin-easing-elastic");

(async () => {
  await loadEasingElasticPlugin();
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadEasingElasticPlugin } from "@tsparticles/plugin-easing-elastic";

(async () => {
  await loadEasingElasticPlugin();
})();
```
