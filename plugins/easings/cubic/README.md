[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Easing Cubic Plugin

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-plugin-easing-cubic/badge)](https://www.jsdelivr.com/package/npm/tsparticles-plugin-easing-cubic)
[![npmjs](https://badge.fury.io/js/tsparticles-plugin-easing-cubic.svg)](https://www.npmjs.com/package/tsparticles-plugin-easing-cubic)
[![npmjs](https://img.shields.io/npm/dt/tsparticles-plugin-easing-cubic)](https://www.npmjs.com/package/tsparticles-plugin-easing-cubic) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/matteobruni/tsparticles) plugin for adding the easing cubic support.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.plugin.easing.cubic.min.js` file will export the function to load the plugin:

```text
loadEasingCubicPlugin
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the plugin like this:

```javascript
loadEasingCubicPlugin();

tsParticles.load("tsparticles", {
  /* options */
});
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install tsparticles-plugin-easing-cubic
```

or

```shell
$ yarn add tsparticles-plugin-easing-cubic
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("tsparticles-engine");
const { loadEasingCubicPlugin } = require("tsparticles-plugin-easing-cubic");

loadEasingCubicPlugin();
```

or

```javascript
import { tsParticles } from "tsparticles-engine";
import { loadEasingCubicPlugin } from "tsparticles-plugin-easing-cubic";

loadEasingCubicPlugin();
```
