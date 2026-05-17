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

| v3 package | Current package | Note |
|---|---|---|
| `@tsparticles/move-base` | `@tsparticles/plugin-move` | Merged into single plugin |
| `@tsparticles/move-parallax` | `@tsparticles/plugin-move` | Merged into single plugin |
| `@tsparticles/updater-color` | `@tsparticles/updater-paint` | Replaced by paint system |
| `@tsparticles/updater-stroke-color` | `@tsparticles/updater-paint` | Replaced by paint system |
| `@tsparticles/plugin-hsv-color` | `@tsparticles/plugin-hsv-color` | Moved to `plugins/colors/hsv/`, still the same package name |

## Recommended steps

1. Align all `@tsparticles/*` packages to the same latest version line.
2. Replace deprecated option keys (`particles.color`, `particles.stroke`) with `particles.paint.*`.
3. Update renamed packages in `package.json` (see table above).
4. Verify custom plugins/shapes are loaded before `tsParticles.load(...)`.
5. Re-test interactions and performance-sensitive scenes.

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
