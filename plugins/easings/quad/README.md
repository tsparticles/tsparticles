[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Easing Quad Plugin

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-plugin-easing-quad/badge)](https://www.jsdelivr.com/package/npm/tsparticles-plugin-easing-quad)
[![npmjs](https://badge.fury.io/js/tsparticles-plugin-easing-quad.svg)](https://www.npmjs.com/package/tsparticles-plugin-easing-quad)
[![npmjs](https://img.shields.io/npm/dt/tsparticles-plugin-easing-quad)](https://www.npmjs.com/package/tsparticles-plugin-easing-quad) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/matteobruni/tsparticles) plugin for adding the easing quad support.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.plugin.easing.quad.min.js` file will export the function to load the plugin:

```text
loadEasingQuadPlugin
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the plugin like this:

```javascript
(async () => {
  await loadEasingQuadPlugin();

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
$ npm install tsparticles-plugin-easing-quad
```

or

```shell
$ yarn add tsparticles-plugin-easing-quad
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("tsparticles-engine");
const { loadEasingQuadPlugin } = require("tsparticles-plugin-easing-quad");

(async () => {
  await loadEasingQuadPlugin();
})();
```

or

```javascript
import { tsParticles } from "tsparticles-engine";
import { loadEasingQuadPlugin } from "tsparticles-plugin-easing-quad";

(async () => {
  await loadEasingQuadPlugin();
})();
```
