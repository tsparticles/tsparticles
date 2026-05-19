# Migrate from v3.x

From `v3.x`, the biggest migration risk is usually **options compatibility**.

## Priority changes

- `particles.color` moved to `particles.paint.fill`.
- `particles.stroke` moved to `particles.paint.stroke`.
- New palette-centric flows can populate paint values automatically.

If colors look wrong after upgrade, check those keys first.

## Option mapping examples

Before (`v3.x` style):

```ts
const options = {
  particles: {
    color: {
      value: "#ff0000",
    },
    stroke: {
      width: 2,
      color: "#000000",
    },
  },
};
```

After (current):

```ts
const options = {
  particles: {
    paint: {
      fill: {
        value: "#ff0000",
      },
      stroke: {
        width: 2,
        color: "#000000",
      },
    },
  },
};
```

## Load API note

Current API uses a single params object:

```ts
await tsParticles.load({
  id: "tsparticles",
  options,
});
```

If your `v3.x` project still contains legacy positional calls from older snippets, migrate them now.

Before (legacy positional):

```ts
await tsParticles.load("tsparticles", options);
```

After (object params):

```ts
await tsParticles.load({
  id: "tsparticles",
  options,
});
```

## Package renaming

Some `v3.x` packages have been renamed or restructured:

| v3 package                          | Current package                 | Note                                                        |
| ----------------------------------- | ------------------------------- | ----------------------------------------------------------- |
| `@tsparticles/move-base`            | `@tsparticles/plugin-move`      | Merged into single plugin                                   |
| `@tsparticles/move-parallax`        | `@tsparticles/plugin-move`      | Merged into single plugin                                   |
| `@tsparticles/updater-color`        | `@tsparticles/updater-paint`    | Replaced by paint system                                    |
| `@tsparticles/updater-stroke-color` | `@tsparticles/updater-paint`    | Replaced by paint system                                    |
| `@tsparticles/plugin-hsv-color`     | `@tsparticles/plugin-hsv-color` | Moved to `plugins/colors/hsv/`, still the same package name |
| (not needed in v3 - built-in)       | `@tsparticles/plugin-interactivity` | Required for all interaction plugins (grab, bubble, repulse, etc.) to work |

## Recommended steps

1. Align all `@tsparticles/*` packages to the same latest version line.
2. Replace deprecated option keys (`particles.color`, `particles.stroke`) with `particles.paint.*`.
3. Update renamed packages in `package.json` (see table above).
4. If you use interaction plugins (grab, bubble, repulse, etc.), install `@tsparticles/plugin-interactivity` and load it with `await loadInteractivityPlugin(tsParticles)` before loading any interaction plugin.
5. Verify custom plugins/shapes are loaded before `tsParticles.load(...)`.
6. Re-test interactions and performance-sensitive scenes.

## Granular loader functions

Some packages expose individual loader functions to load only what you need, reducing bundle size.

### Plugins

- **`@tsparticles/plugin-absorbers`**: `loadAbsorbersPluginSimple` (absorber lifecycle and drawing only), `loadAbsorbersInteraction` (click/hover interaction only), or `loadAbsorbersPlugin` (both).
- **`@tsparticles/plugin-emitters`**: `loadEmittersPluginSimple` (emitter lifecycle and drawing only), `loadEmittersInteraction` (click/hover interaction only), or `loadEmittersPlugin` (both).

### Shapes

- **`@tsparticles/shape-polygon`**: `loadGenericPolygonShape` (polygon) or `loadTriangleShape` (triangle) individually, or `loadPolygonShape` for both.
- **`@tsparticles/shape-cards`**: `loadClubsSuitShape`, `loadDiamondsSuitShape`, `loadHeartsSuitShape`, `loadSpadesSuitShape` (individual suits), `loadCardSuitsShape` (all suits), `loadFullCardsShape` (card images), or `loadCardsShape` (all).

All other shape packages (arrow, circle, cog, emoji, heart, image, infinity, line, matrix, path, rounded-polygon, rounded-rect, spiral, square, squircle, star, text) export a single `load*Shape` function directly.

## Checklist

- Keep one version line across engine, bundles, wrappers, presets, and plugins.
- Replace deprecated imports with package-level imports when needed.
- Validate SSR wrappers (Next/Nuxt) still initialize only on client side.

## Useful option docs

- Option rename matrix: [`/migrations/option-rename-matrix`](/migrations/option-rename-matrix)
- `particles.paint`: [`/options/particles-paint`](/options/particles-paint)
- `particles.color` migration note: [`/options/particles-color`](/options/particles-color)
- `particles.stroke` migration note: [`/options/particles-stroke`](/options/particles-stroke)

## References

- Versioning notes: [`/migrations/releases`](/migrations/releases)
- Root repository releases: <https://github.com/tsparticles/tsparticles/releases>
