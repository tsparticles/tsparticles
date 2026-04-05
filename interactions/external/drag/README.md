[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles External Drag Interaction

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/interaction-external-drag/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/interaction-external-drag)
[![npmjs](https://badge.fury.io/js/@tsparticles/interaction-external-drag.svg)](https://www.npmjs.com/package/@tsparticles/interaction-external-drag)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/interaction-external-drag)](https://www.npmjs.com/package/@tsparticles/interaction-external-drag) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) interaction plugin for dragging particles across the canvas
with the mouse/pointer.

## Quick checklist

1. Install `@tsparticles/engine` (or use the CDN bundle below)
2. Call the package loader function(s) before `tsParticles.load(...)`
3. Apply the package options in your `tsParticles.load(...)` config

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

## Option mapping

- Event mode key: `interactivity.events.onHover.mode` or `interactivity.events.onClick.mode` with value `"drag"`
- Mode options key: `interactivity.modes.drag`

```json
{
  "interactivity": {
    "events": {
      "onHover": {
        "enable": true,
        "mode": "drag"
      }
    },
    "modes": {
      "drag": {}
    }
  }
}
```

## Common pitfalls

- Calling `tsParticles.load(...)` before `loadInteractivityPlugin(...)`
- Verify required peer packages before enabling advanced options
- Change one option group at a time to isolate regressions quickly

## Related docs

- All packages catalog: <https://github.com/tsparticles/tsparticles>
- Main docs: <https://particles.js.org/docs/>
