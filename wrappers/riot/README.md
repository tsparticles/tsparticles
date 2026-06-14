[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# @tsparticles/riot

[![npm](https://img.shields.io/npm/v/@tsparticles/riot)](https://www.npmjs.com/package/@tsparticles/riot) [![npm](https://img.shields.io/npm/dm/@tsparticles/riot)](https://www.npmjs.com/package/@tsparticles/riot) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

Official [tsParticles](https://github.com/tsparticles/tsparticles) Riot component.

## Installation

```shell
npm install @tsparticles/riot
```

or

```shell
yarn add @tsparticles/riot
```

## Usage

Initialize the engine once before mounting the component.

```html
<script>
  import { initParticlesEngine } from "@tsparticles/riot";
  import { loadSlim } from "@tsparticles/slim";

  void initParticlesEngine(async (engine) => {
    await loadSlim(engine);
  });

  export default {
    /* ... */
  };
</script>

<riot-particles
  id="tsparticles"
  options={{
    background: {
      color: {
        value: "#000",
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
  }}
  particlesLoaded={(container) => console.log(container)}
/>

<!-- or -->

<riot-particles
  id="tsparticles"
  url="https://foo.bar/particles.json"
  particlesLoaded={(container) => console.log(container)}
/>
```

## Props

| Prop              | Type       | Description                                                                                                       |
| ----------------- | ---------- | ----------------------------------------------------------------------------------------------------------------- |
| `id`              | `string`   | The container id.                                                                                                 |
| `options`         | `object`   | The particles options object.                                                                                     |
| `url`             | `string`   | A remote URL to a JSON configuration file.                                                                        |
| `theme`           | `string`   | The theme name to apply. Requires `@tsparticles/plugin-themes`. Without the plugin, setting this prop is a safe no-op. |
| `particlesLoaded` | `function` | Callback invoked when particles are loaded, receives `(container?: Container)`.                                    |

## Reactivity

- Changing `id` destroys the current container and creates a new one with the new id.
- Changing `options` or `url` destroys the current container and reloads particles with the new configuration.
- Changing `theme` applies the theme via `loadTheme` without a full reload (safe no-op if `@tsparticles/plugin-themes` is not loaded).

> **Note**: Theme support requires the optional `@tsparticles/plugin-themes` package. Without it, `theme` changes are silently ignored and do not error.

## Cleanup

The component automatically destroys the particles container when it is removed from the DOM. No orphan animations remain.
