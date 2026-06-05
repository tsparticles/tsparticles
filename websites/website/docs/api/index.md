---
title: API Reference
description: TypeScript API reference for tsParticles — engine, options, container, plugins, and typedoc-generated documentation.
---

# API Reference

The tsParticles API is organized into layers. Use this page to find the right section.

## Quick Links

| Section                                                                                  | Description                                                 |
| ---------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| [Full API docs (typedoc)](/docs/)                                                        | Auto-generated reference for all packages                   |
| [Engine](/docs/modules/tsParticles_Engine.html)                                          | Core engine — `Engine`, `Container`, `tsParticles` instance |
| [Options](/docs/interfaces/tsParticles_Engine.Options_Interfaces_IOptions.IOptions.html) | Complete options interface tree                             |
| [Container](/docs/classes/tsParticles_Engine.Core_Container.Container.html)              | Runtime container — play, pause, refresh, export            |
| [IPlugin](/docs/modules/Core_Interfaces_IPlugin.html)                                    | Plugin interface for custom extensions                      |

## Engine

The `@tsparticles/engine` package exports the core classes:

- **`tsParticles`** — global singleton instance
- **`Engine`** — the engine class used to create and manage containers
- **`Container`** — a single particle canvas instance
- **`load`** — the main entry point for creating particles

## Options

The options object is a plain TypeScript interface. Key nested types:

- `IOptions` — root options (background, particles, interactivity, plugins)
- `IParticlesOptions` — per-particle options (move, shape, size, color, etc.)
- `IInteractivity` — click, hover, and scroll events + modes

Browse the [Options Reference](/options/) or the
full [Options type](/docs/interfaces/tsParticles_Engine.Options_Interfaces_IOptions.IOptions.html).

## Container API

The `Container` class controls a running particle instance:

| Method                   | Description                                          |
| ------------------------ | ---------------------------------------------------- |
| `play()`                 | Resume animation                                     |
| `pause()`                | Stop animation                                       |
| `refresh()`              | Destroy and re-create particles with current options |
| `export(type)`           | Export current frame as image/canvas blob            |
| `addListener(event, cb)` | Subscribe to container events                        |

## Plugin System

tsParticles supports custom plugins, shapes, updaters, interactions, and paths.

- [Plugin guide](/guide/plugins-customization-plugin)
- [Shape guide](/guide/plugins-customization-shape)
- [Updater guide](/guide/plugins-customization-updater)
- [Interaction guide](/guide/plugins-customization-interaction)
- [IPlugin typedoc](/docs/modules/Core_Interfaces_IPlugin.html)

## Bundles

Choose the right import for your project:

| Bundle               | Included                                                  |
| -------------------- | --------------------------------------------------------- |
| `@tsparticles/basic` | Core + circle shape + color + size + opacity + move       |
| `@tsparticles/slim`  | Basic + interactivity + polygons + images + emoji + stars |
| `tsparticles` (full) | Slim + absorbers + emitters + trail + sounds + all shapes |
| `@tsparticles/all`   | Everything including ships + fireworks + confetti         |

Package-level [Dependency Graph](/guide/dependency-graph).

## Migration & Versioning

- [Migration overview](/migrations/)
- [Changelog](/migrations/changelog)
- [Releases](/migrations/releases)
