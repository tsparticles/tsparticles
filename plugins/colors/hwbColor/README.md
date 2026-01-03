[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles HWB Color Plugin

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/plugin-hwb-color/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/plugin-hwb-color)
[![npmjs](https://badge.fury.io/js/@tsparticles/plugin-hwb-color.svg)](https://www.npmjs.com/package/@tsparticles/plugin-hwb-color)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/plugin-hwb-color)](https://www.npmjs.com/package/@tsparticles/plugin-hwb-color) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) plugin for adding the HWB color support.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.plugin.hwbColor.min.js` file will export the function to load the plugin:

```text
loadHwbColorPlugin
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the plugin like this:

```javascript
(async () => {
  await loadHwbColorPlugin();

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
$ npm install @tsparticles/plugin-hwb-color
```

or

```shell
$ yarn add @tsparticles/plugin-hwb-color
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadHwbColorPlugin } = require("@tsparticles/plugin-hwb-color");

(async () => {
  await loadHwbColorPlugin();
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadHwbColorPlugin } from "@tsparticles/plugin-hwb-color";

(async () => {
  await loadHwbColorPlugin();
})();
```
