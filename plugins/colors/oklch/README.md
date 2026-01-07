[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles OKLCH Color Plugin

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/plugin-oklch-color/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/plugin-oklch-color)
[![npmjs](https://badge.fury.io/js/@tsparticles/plugin-oklch-color.svg)](https://www.npmjs.com/package/@tsparticles/plugin-oklch-color)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/plugin-oklch-color)](https://www.npmjs.com/package/@tsparticles/plugin-oklch-color) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) plugin for adding the OKLCH color support.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.plugin.oklchColor.min.js` file will export the function to load the plugin:

```text
loadOklchColorPlugin
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the plugin like this:

```javascript
(async () => {
  await loadOklchColorPlugin();

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
$ npm install @tsparticles/plugin-oklch-color
```

or

```shell
$ yarn add @tsparticles/plugin-oklch-color
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadOklchColorPlugin } = require("@tsparticles/plugin-oklch-color");

(async () => {
  await loadOklchColorPlugin();
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadOklchColorPlugin } from "@tsparticles/plugin-oklch-color";

(async () => {
  await loadOklchColorPlugin();
})();
```
