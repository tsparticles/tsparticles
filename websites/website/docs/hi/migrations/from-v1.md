# Migrate from v1.x

Migrating from `v1.x` to current usually requires a full dependency refresh and config verification.

The biggest practical blockers are:

1. Old package/import patterns.
2. `tsParticles.load(...)` call shape.
3. Option key updates in modern schemas.

## Load API migration

Modern `load` accepts one params object:

Before (legacy positional style):

```ts
await tsParticles.load("tsparticles", oldOptions);
```

After:

```ts
await tsParticles.load({
  id: "tsparticles",
  options: oldOptions,
});
```

If you load from JSON:

```ts
await tsParticles.load({
  id: "tsparticles",
  url: "/particles.json",
});
```

## Options migration highlights

Start by searching these keys in your configs:

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

Example rewrite:

```ts
// before
particles: {
  color: { value: ["#ff6b6b", "#4ecdc4"] },
  stroke: { width: 0 }
}

// after
particles: {
  paint: {
    fill: { value: ["#ff6b6b", "#4ecdc4"] },
    stroke: { width: 0 }
  }
}
```

## Recommended steps

1. Replace old package names with the current `@tsparticles/*` packages.
2. Start from `@tsparticles/engine` + `@tsparticles/slim`, then add required plugins.
3. Convert old `load` calls to the object-based `load({ ... })` signature.
4. Validate option keys against current docs and fix renamed/removed fields.
5. Run visual and performance checks in desktop and mobile targets.

## Checklist

- Remove obsolete imports from older package structure.
- Confirm interactions, links, and custom shapes still behave as expected.
- For legacy `particles.js` style configs, consider the compatibility layer.

## Useful option docs

- Option rename matrix: [`/migrations/option-rename-matrix`](/migrations/option-rename-matrix)
- `particles.paint`: [`/options/particles-paint`](/options/particles-paint)
- `particles.color` migration note: [`/options/particles-color`](/options/particles-color)
- `particles.stroke` migration note: [`/options/particles-stroke`](/options/particles-stroke)

## References

- Legacy compatibility and particles.js bridge: [`/migrations/particles-js`](/migrations/particles-js)
- Installation matrix: [`/guide/installation`](/guide/installation)
- Root repository releases: <https://github.com/tsparticles/tsparticles/releases>
