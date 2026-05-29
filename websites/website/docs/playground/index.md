# Playground

Split by use case:

- [`Configs Playground`](/playground/configs): richer demos with full editable options.
- [`Shapes Playground`](/playground/shapes): focused demos for particle `shape.type` with per-shape options when available.
- [`Presets Playground`](/playground/presets): official preset-name demos (`{ preset: "..." }`).
- [`Palettes Playground`](/playground/palettes): palette-focused demos from the presets project.
- [`Bundles Playground`](/playground/bundles): dedicated playgrounds for `@tsparticles/confetti`, `@tsparticles/fireworks`, `@tsparticles/particles`, and `@tsparticles/ribbons`.

Execution is always **user-triggered only** (no autoplay).

## Shared flow

The layout is consistent across playgrounds:

1. Canvas preview first.
2. Controls for Start/Pause/Resume/Destroy.
3. JSON editor for options.

4. Pick a demo from the menu.
5. Press `Start` to run it (no autoplay).
6. Edit the JSON in the editor.
7. Press `Start` again to reload with your new options.
8. Use `Pause`/`Resume` to control performance and CPU usage.

> Note: `Destroy` fully releases the container instance.

## Suggested workflow

- Prototype here until the effect is stable.
- Copy the final JSON into your project.
- Type it with `ISourceOptions` in application code.
