[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Easing Sine Plugin

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-plugin-easing-sine/badge)](https://www.jsdelivr.com/package/npm/tsparticles-plugin-easing-sine)
[![npmjs](https://badge.fury.io/js/tsparticles-plugin-easing-sine.svg)](https://www.npmjs.com/package/tsparticles-plugin-easing-sine)
[![npmjs](https://img.shields.io/npm/dt/tsparticles-plugin-easing-sine)](https://www.npmjs.com/package/tsparticles-plugin-easing-sine) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/matteobruni/tsparticles) plugin for adding the easing sine support.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.plugin.easing.sine.min.js` file will export the function to load the plugin:

```text
loadEasingSinePlugin
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the plugin like this:

```javascript
loadEasingSinePlugin();

tsParticles.load("tsparticles", {
  /* options */
});
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install tsparticles-plugin-easing-sine
```

or

```shell
$ yarn add tsparticles-plugin-easing-sine
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("tsparticles-engine");
const { loadEasingSinePlugin } = require("tsparticles-plugin-easing-sine");

loadEasingSinePlugin();
```

or

```javascript
import { tsParticles } from "tsparticles-engine";
import { loadEasingSinePlugin } from "tsparticles-plugin-easing-sine";

loadEasingSinePlugin();
```
