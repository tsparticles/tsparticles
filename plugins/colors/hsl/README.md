[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles HSL Color Plugin

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/plugin-hsl-color/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/plugin-hsl-color)
[![npmjs](https://badge.fury.io/js/@tsparticles/plugin-hsl-color.svg)](https://www.npmjs.com/package/@tsparticles/plugin-hsl-color)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/plugin-hsl-color)](https://www.npmjs.com/package/@tsparticles/plugin-hsl-color) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) plugin for adding the HSL color support.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.plugin.hslColor.min.js` file will export the function to load the plugin:

```text
loadHslColorPlugin
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the plugin like this:

```javascript
(async () => {
  await loadHslColorPlugin();

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
$ npm install @tsparticles/plugin-hsl-color
```

or

```shell
$ yarn add @tsparticles/plugin-hsl-color
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadHslColorPlugin } = require("@tsparticles/plugin-hsl-color");

(async () => {
  await loadHslColorPlugin();
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadHslColorPlugin } from "@tsparticles/plugin-hsl-color";

(async () => {
  await loadHslColorPlugin();
})();
```
