[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles External Connect Interaction

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/interaction-external-connect/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/interaction-external-connect)
[![npmjs](https://badge.fury.io/js/@tsparticles/interaction-external-connect.svg)](https://www.npmjs.com/package/@tsparticles/interaction-external-connect)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/interaction-external-connect)](https://www.npmjs.com/package/@tsparticles/interaction-external-connect) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) interaction plugin for connect effect around mouse or HTML
elements.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.interaction.external.connect.min.js` file will export the function to load the interaction
plugin:

```javascript
loadExternalConnectInteraction;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the interaction plugin like this:

```javascript
(async () => {
  await loadExternalConnectInteraction(tsParticles);

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
$ npm install @tsparticles/interaction-external-connect
```

or

```shell
$ yarn add @tsparticles/interaction-external-connect
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadExternalConnectInteraction } = require("@tsparticles/interaction-external-connect");

(async () => {
  await loadExternalConnectInteraction(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadExternalConnectInteraction } from "@tsparticles/interaction-external-connect";

(async () => {
  await loadExternalConnectInteraction(tsParticles);
})();
```
