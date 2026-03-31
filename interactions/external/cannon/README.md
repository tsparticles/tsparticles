[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles External Cannon Interaction

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/interaction-external-cannon/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/interaction-external-cannon)
[![npmjs](https://badge.fury.io/js/@tsparticles/interaction-external-cannon.svg)](https://www.npmjs.com/package/@tsparticles/interaction-external-cannon)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/interaction-external-cannon)](https://www.npmjs.com/package/@tsparticles/interaction-external-cannon) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) interaction plugin for a particles cannon
with the mouse/pointer.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.interaction.external.cannon.min.js` file will export the function to load the interaction
plugin:

```javascript
loadExternalCannonInteraction;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the interaction plugin like this:

```javascript
(async () => {
  await loadInteractivityPlugin(tsParticles);
  await loadExternalCannonInteraction(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "cannon",
          },
        },
      },
    },
  });
})();
```

### ESM / CommonJS

This package is compatible also with ES or CommonJS modules, firstly this needs to be installed, like this:

```shell
$ npm install @tsparticles/interaction-external-cannon
```

or

```shell
$ yarn add @tsparticles/interaction-external-cannon
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadInteractivityPlugin } = require("@tsparticles/plugin-interactivity");
const { loadExternalCannonInteraction } = require("@tsparticles/interaction-external-cannon");

(async () => {
  await loadInteractivityPlugin(tsParticles);
  await loadExternalCannonInteraction(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadInteractivityPlugin } from "@tsparticles/plugin-interactivity";
import { loadExternalCannonInteraction } from "@tsparticles/interaction-external-cannon";

(async () => {
  await loadInteractivityPlugin(tsParticles);
  await loadExternalCannonInteraction(tsParticles);
})();
```
