[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles External Grab Interaction

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-interaction-external-grab/badge)](https://www.jsdelivr.com/package/npm/tsparticles-interaction-external-grab)
[![npmjs](https://badge.fury.io/js/tsparticles-interaction-external-grab.svg)](https://www.npmjs.com/package/tsparticles-interaction-external-grab)
[![npmjs](https://img.shields.io/npm/dt/tsparticles-interaction-external-grab)](https://www.npmjs.com/package/tsparticles-interaction-external-grab) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/matteobruni/tsparticles) interaction plugin for grab effect around mouse or HTML
elements.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.interaction.external.grab.min.js` file will export the function to load the interaction
plugin:

```javascript
loadExternalGrabInteraction;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the interaction plugin like this:

```javascript
loadExternalGrabInteraction(tsParticles);

tsParticles.load("tsparticles", {
  /* options */
});
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install tsparticles-interaction-external-grab
```

or

```shell
$ yarn add tsparticles-interaction-external-grab
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("tsparticles-engine");
const { loadExternalGrabInteraction } = require("tsparticles-interaction-external-grab");

loadExternalGrabInteraction(tsParticles);
```

or

```javascript
import { tsParticles } from "tsparticles-engine";
import { loadExternalGrabInteraction } from "tsparticles-interaction-external-grab";

loadExternalGrabInteraction(tsParticles);
```
