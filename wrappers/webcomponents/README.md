[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# @tsparticles/webcomponents

[![npm](https://img.shields.io/npm/v/@tsparticles/webcomponents)](https://www.npmjs.com/package/@tsparticles/webcomponents) [![npm](https://img.shields.io/npm/dm/@tsparticles/webcomponents)](https://www.npmjs.com/package/@tsparticles/webcomponents) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

Official [tsParticles](https://github.com/tsparticles/tsparticles) Web Component.

## Installation

```shell
npm install @tsparticles/webcomponents @tsparticles/engine @tsparticles/slim
```

or

```shell
yarn add @tsparticles/webcomponents @tsparticles/engine @tsparticles/slim
```

## Usage

```ts
import { createEngine } from "@tsparticles/engine";
import { defineParticlesElement, initParticlesEngine } from "@tsparticles/webcomponents";
import { loadSlim } from "@tsparticles/slim";

const engine = createEngine();

await initParticlesEngine(engine, async engine => {
  await loadSlim(engine);
});

defineParticlesElement();
```

Using the initialized `engine` from the setup above, create the element, assign
the engine property, and only then connect it to the document. Engine objects
cannot be serialized as HTML attributes:

```js
const urlElement = document.createElement("web-particles");
urlElement.id = "tsparticles";
urlElement.engine = engine;
urlElement.url = "https://foo.bar/particles.json";
document.body.append(urlElement);

// Or configure particles with an options object.
const optionsElement = document.createElement("web-particles");
optionsElement.id = "tsparticles-options";
optionsElement.engine = engine;
optionsElement.options = {
  background: {
    color: {
      value: "#0d47a1",
    },
  },
  particles: {
    links: {
      enable: true,
    },
    move: {
      enable: true,
    },
  },
};

optionsElement.addEventListener("particlesLoaded", event => {
  console.log(event.detail);
});
document.body.append(optionsElement);
```

## Observed Attributes

The `<web-particles>` custom element observes the following attributes for reactivity:

| Attribute    | Type     | Description                                                                                                    |
| ------------ | -------- | -------------------------------------------------------------------------------------------------------------- |
| `id`         | `string` | The container id. Changing triggers a full reload.                                                             |
| `options`    | `string` | JSON-serialized options object. Changing triggers a full reload.                                               |
| `url`        | `string` | A remote URL to a JSON configuration file. Changing triggers a full reload.                                    |
| `data-theme` | `string` | The theme name to apply. Applies via `loadTheme` without a full reload. Requires `@tsparticles/plugin-themes`. |

> **Note**: Theme support requires the optional `@tsparticles/plugin-themes` plugin. Without it, `data-theme` changes are silently ignored.

The `engine` property is required on every element. Assign it from JavaScript
before connecting the element; it is not an observed HTML attribute.

## Reactivity

- Changing the `id` property or `data-id` attribute destroys the current container and creates a new one with the new id.
- Changing `options` or `url` destroys the current container and reloads particles with the new configuration.
- Changing `data-theme` applies the theme via `loadTheme` without a full reload (safe no-op if `@tsparticles/plugin-themes` is not loaded).

## Cleanup

The element automatically destroys the particles container when it is removed from the DOM. No orphan animations remain.

```

```
