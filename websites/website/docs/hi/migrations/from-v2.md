# Migrate from v2.x

Moving from `v2.x` to current usually has two main breaking areas:

1. `tsParticles.load(...)` signature migration.
2. Options key migrations (especially color/stroke keys).

## Load API migration (important)

In modern versions, `load` accepts a **single params object**.

Before (`v2.x` positional style):

```ts
await tsParticles.load("tsparticles", {
  particles: {
    number: {
      value: 80,
    },
  },
});
```

After (single object):

```ts
await tsParticles.load({
  id: "tsparticles",
  options: {
    particles: {
      number: {
        value: 80,
      },
    },
  },
});
```

You can also pass `element`, `url`, and `index` in the same object.

```ts
await tsParticles.load({
  element: document.getElementById("tsparticles") as HTMLElement,
  url: "/particles.json",
  index: 0,
});
```

## Options migration highlights

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

Before:

```ts
particles: {
  color: { value: "#00ffcc" },
  stroke: { width: 1, color: "#003344" }
}
```

After:

```ts
particles: {
  paint: {
    fill: { value: "#00ffcc" },
    stroke: { width: 1, color: "#003344" }
  }
}
```

## Recommended steps

1. Upgrade all `@tsparticles/*` packages together.
2. Check wrapper package versions (React/Vue/Angular/etc.) match the same major line.
3. Convert all old `tsParticles.load(id, options)` calls to object params.
4. Migrate known option keys (`color`, `stroke`) to `paint.fill`/`paint.stroke`.
5. Run a visual regression pass on your most complex configs.

## Checklist

- Ensure no mixed major versions in lockfile.
- Verify bundle choice (`basic`, `slim`, `all`) still matches enabled features.
- Re-test canvas lifecycle hooks (`loaded`, `particlesLoaded`, cleanup paths).

## Useful option docs

- Option rename matrix: [`/migrations/option-rename-matrix`](/migrations/option-rename-matrix)
- `particles.paint`: [`/options/particles-paint`](/options/particles-paint)
- `particles.color` migration note: [`/options/particles-color`](/options/particles-color)
- `particles.stroke` migration note: [`/options/particles-stroke`](/options/particles-stroke)

## References

- Version alignment rule: [`/migrations/releases`](/migrations/releases)
- Root repository releases: <https://github.com/tsparticles/tsparticles/releases>
