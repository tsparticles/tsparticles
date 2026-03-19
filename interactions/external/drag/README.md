[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles External Drag Interaction

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/interaction-external-drag/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/interaction-external-drag)
[![npmjs](https://badge.fury.io/js/@tsparticles/interaction-external-drag.svg)](https://www.npmjs.com/package/@tsparticles/interaction-external-drag)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/interaction-external-drag)](https://www.npmjs.com/package/@tsparticles/interaction-external-drag) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) interaction plugin for dragging particles across the canvas
with the mouse/pointer.

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.interaction.external.drag.min.js` file will export the function to load the interaction
plugin:

```javascript
loadExternalDragInteraction;
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the interaction plugin like this:

```javascript
(async () => {
  await loadInteractivityPlugin(tsParticles);
  await loadExternalDragInteraction(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "drag",
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
$ npm install @tsparticles/interaction-external-drag
```

or

```shell
$ yarn add @tsparticles/interaction-external-drag
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadInteractivityPlugin } = require("@tsparticles/plugin-interactivity");
const { loadExternalDragInteraction } = require("@tsparticles/interaction-external-drag");

(async () => {
  await loadInteractivityPlugin(tsParticles);
  await loadExternalDragInteraction(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadInteractivityPlugin } from "@tsparticles/plugin-interactivity";
import { loadExternalDragInteraction } from "@tsparticles/interaction-external-drag";

(async () => {
  await loadInteractivityPlugin(tsParticles);
  await loadExternalDragInteraction(tsParticles);
})();
```
