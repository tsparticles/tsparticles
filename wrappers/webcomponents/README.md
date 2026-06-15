[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# @tsparticles/webcomponents

[![npm](https://img.shields.io/npm/v/@tsparticles/webcomponents)](https://www.npmjs.com/package/@tsparticles/webcomponents) [![npm](https://img.shields.io/npm/dm/@tsparticles/webcomponents)](https://www.npmjs.com/package/@tsparticles/webcomponents) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

Official [tsParticles](https://github.com/tsparticles/tsparticles) Web Component.

## Installation

```shell
npm install @tsparticles/webcomponents @tsparticles/engine
```

or

```shell
yarn add @tsparticles/webcomponents @tsparticles/engine
```

## Usage

```ts
import { tsParticles } from "@tsparticles/engine";
import { initParticlesEngine } from "@tsparticles/webcomponents";
import { loadSlim } from "@tsparticles/slim";

globalThis.tsParticles = tsParticles;

await initParticlesEngine(async engine => {
  await loadSlim(engine);
});
```

Then use the custom element:

```html
<web-particles id="tsparticles" url="https://foo.bar/particles.json"></web-particles>

<!-- or -->

<web-particles id="tsparticles-options"></web-particles>

<script>
  const element = document.getElementById("tsparticles-options");

  element.options = {
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

  element.addEventListener("particlesLoaded", event => {
    console.log(event.detail);
  });
</script>
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

## Reactivity

- Changing the `id` property or `data-id` attribute destroys the current container and creates a new one with the new id.
- Changing `options` or `url` destroys the current container and reloads particles with the new configuration.
- Changing `data-theme` applies the theme via `loadTheme` without a full reload (safe no-op if `@tsparticles/plugin-themes` is not loaded).

## Cleanup

The element automatically destroys the particles container when it is removed from the DOM. No orphan animations remain.

```

```
