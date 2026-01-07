[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Hex Color Plugin

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/plugin-hex-color/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/plugin-hex-color)
[![npmjs](https://badge.fury.io/js/@tsparticles/plugin-hex-color.svg)](https://www.npmjs.com/package/@tsparticles/plugin-hex-color)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/plugin-hex-color)](https://www.npmjs.com/package/@tsparticles/plugin-hex-color) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) plugin for adding the hex color support.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.plugin.hexColor.min.js` file will export the function to load the plugin:

```text
loadHexColorPlugin
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the plugin like this:

```javascript
(async () => {
  await loadHexColorPlugin();

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
$ npm install @tsparticles/plugin-hex-color
```

or

```shell
$ yarn add @tsparticles/plugin-hex-color
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadHexColorPlugin } = require("@tsparticles/plugin-hex-color");

(async () => {
  await loadHexColorPlugin();
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadHexColorPlugin } from "@tsparticles/plugin-hex-color";

(async () => {
  await loadHexColorPlugin();
})();
```
