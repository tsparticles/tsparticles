# Bundle: Fireworks

`@tsparticles/fireworks` provides a simplified API for creating fireworks effects with a single function call. Supports sounds, custom colors, and instance control (pause/play).

## Included features

**Shapes:** line, circle (from basic)

**Internal plugins:** emitters, emitters-shape-square, blend (blending), sounds

**Updaters:** destroy, life, paint, rotate

**API:** `fireworks(options)` — returns a controllable instance

## When to use

- New Year or celebration effect
- Celebration UI
- You don't want to configure the engine manually

## Installation

### npm/pnpm/yarn

```bash
pnpm add @tsparticles/fireworks
```

```ts
import { fireworks } from "@tsparticles/fireworks";

// Basic effect
const instance = await fireworks({
  colors: ["#ffffff", "#ff0000", "#00ff00", "#0000ff"],
  sounds: true,
});

// Instance control
instance?.pause();
instance?.play();

// On a specific canvas
await fireworks("my-canvas", {
  rate: 3,
  speed: { min: 10, max: 25 },
  sounds: false,
});
```

### CDN (script tag)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/fireworks@4/tsparticles.fireworks.bundle.min.js"></script>
<script>
  // Immediate fireworks
  fireworks();
</script>
```

### Main parameters

| Parameter    | Type         | Default | Description          |
| ------------ | ------------ | ------- | -------------------- |
| `colors`     | string[]     | —       | Explosion colors     |
| `rate`       | number       | —       | Fireworks per second |
| `speed`      | { min, max } | —       | Particle speed       |
| `sounds`     | boolean      | true    | Enable sound effects |
| `gravity`    | number       | —       | Gravity (default: 0) |
| `opacity`    | number       | —       | Opacity (0-1)        |
| `brightness` | { min, max } | —       | Explosion brightness |

## Common mistakes

- Thinking `tsParticles` is exported by `@tsparticles/fireworks` — it is not.
- Calling `fireworks()` in a loop without managing the instance — the effect is already continuous.
- Not stopping the instance when leaving the page — call `instance?.pause()` or `instance?.stop()`.

## See also

- [Bundle overview](/guide/bundles)
- [Confetti bundle](/guide/bundles-confetti)
