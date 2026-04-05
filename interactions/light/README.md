[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles Light Interaction

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/interaction-light/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/interaction-light)
[![npmjs](https://badge.fury.io/js/@tsparticles/interaction-light.svg)](https://www.npmjs.com/package/@tsparticles/interaction-light)
[![npmjs](https://img.shields.io/npm/dt/@tsparticles/interaction-light)](https://www.npmjs.com/package/@tsparticles/interaction-light) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

[tsParticles](https://github.com/tsparticles/tsparticles) interaction plugin for light effect.

## Quick checklist

1. Install `@tsparticles/engine` (or use the CDN bundle below)
2. Call `loadInteractivityPlugin(tsParticles)` and `loadLightInteraction(tsParticles)` before `tsParticles.load(...)`
3. Enable `"light"` in interactivity events and configure `interactivity.modes.light`

## How to use it

### CDN / Vanilla JS / jQuery

The CDN/Vanilla version JS has one required file in vanilla configuration:

Including the `tsparticles.interaction.light.min.js` file will export the function to load the interaction plugin:

```text
loadLightInteraction
```

### Usage

Once the scripts are loaded you can set up `tsParticles` and the interaction plugin like this:

```javascript
(async () => {
  await loadInteractivityPlugin(tsParticles);
  await loadLightInteraction(tsParticles);

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
$ npm install @tsparticles/interaction-light
```

or

```shell
$ yarn add @tsparticles/interaction-light
```

Then you need to import it in the app, like this:

```javascript
const { tsParticles } = require("@tsparticles/engine");
const { loadInteractivityPlugin } = require("@tsparticles/plugin-interactivity");
const { loadLightInteraction } = require("@tsparticles/interaction-light");

(async () => {
  await loadInteractivityPlugin(tsParticles);
  await loadLightInteraction(tsParticles);
})();
```

or

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadInteractivityPlugin } from "@tsparticles/plugin-interactivity";
import { loadLightInteraction } from "@tsparticles/interaction-light";

(async () => {
  await loadInteractivityPlugin(tsParticles);
  await loadLightInteraction(tsParticles);
})();
```

## Option mapping

- Event mode key: `interactivity.events.onHover.mode` or `interactivity.events.onClick.mode` with value `"light"`
- Mode options key: `interactivity.modes.light`

### `interactivity.modes.light` properties

| Key | Type | Default | Notes |
| --- | --- | --- | --- |
| `area.radius` | `number` | `1000` | Light interaction radius |
| `area.gradient.start` | `color` | | Gradient start color |
| `area.gradient.stop` | `color` | | Gradient stop color |
| `shadow.color` | `color` | `"#000000"` | Shadow/tint color |
| `shadow.length` | `number` | `2000` | Shadow projection length |

```json
{
  "interactivity": {
    "events": {
      "onHover": {
        "enable": true,
        "mode": "light"
      }
    },
    "modes": {
      "light": {
        "area": {
          "radius": 700,
          "gradient": {
            "start": "#ffffff",
            "stop": "#000000"
          }
        },
        "shadow": {
          "color": "#000000",
          "length": 1400
        }
      }
    }
  }
}
```

## Common pitfalls

- Calling `tsParticles.load(...)` before both `loadInteractivityPlugin(...)` and `loadLightInteraction(...)`
- Verify required peer packages before enabling advanced options
- Change one option group at a time to isolate regressions quickly

## Related docs

- All packages catalog: <https://github.com/tsparticles/tsparticles>
- Main docs: <https://particles.js.org/docs/>
