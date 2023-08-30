[![banner](https://particles.js.org/jsons/banner3.png)](https://particles.js.org)

# tsParticles Export JSON Plugin

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/plugin-export-json/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/plugin-export-json)
[![npmjs](https://badge.fury.io/js/@tsparticles/plugin-export-json.svg)](https://www.npmjs.com/package/@tsparticles/plugin-export-json)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/plugin-export-json)](https://www.npmjs.com/package/@tsparticles/plugin-export-json) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) plugin for adding the export json support.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.plugin.export.json.min.js` file will export the function to load the plugin:

```text
loadExportJSONPlugin
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the plugin like this:

```javascript
(async () => {
  await loadExportJSONPlugin();

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
$ npm install @tsparticles/plugin-export-json
```

or

```shell
$ yarn add @tsparticles/plugin-export-json
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadExportJSONPlugin } = require("@tsparticles/plugin-export-json");

(async () => {
  await loadExportJSONPlugin();
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadExportJSONPlugin } from "@tsparticles/plugin-export-json";

(async () => {
  await loadExportJSONPlugin();
})();
```
