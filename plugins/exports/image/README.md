[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Export Image Plugin

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/plugin-export-image/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/plugin-export-image)
[![npmjs](https://badge.fury.io/js/@tsparticles/plugin-export-image.svg)](https://www.npmjs.com/package/@tsparticles/plugin-export-image)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/plugin-export-image)](https://www.npmjs.com/package/@tsparticles/plugin-export-image) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) plugin for adding the export image support.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.plugin.export.image.min.js` file will export the function to load the plugin:

```text
loadExportImagePlugin
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the plugin like this:

```javascript
(async () => {
  await loadExportImagePlugin();

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
$ npm install @tsparticles/plugin-export-image
```

or

```shell
$ yarn add @tsparticles/plugin-export-image
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadExportImagePlugin } = require("@tsparticles/plugin-export-image");

(async () => {
  await loadExportImagePlugin();
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadExportImagePlugin } from "@tsparticles/plugin-export-image";

(async () => {
  await loadExportImagePlugin();
})();
```
