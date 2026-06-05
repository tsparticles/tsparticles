# Bundle: Confetti

`@tsparticles/confetti` provides a simplified API for creating confetti effects with a single function call. No need to interact with `tsParticles` directly.

## Included features

**Shapes:** circle, heart, cards (French suits: hearts, diamonds, clubs, spades), emoji, images, polygon, square, star

**Internal plugins:** emitters, motion (respects user's reduced motion preference)

**Updaters:** life, roll, rotate, tilt, wobble

**API:** `confetti(options)` or `confetti(canvasId, options)`

## When to use

- "Congratulations!" or "Happy Birthday!" button
- Quick celebration effect
- You don't want to configure the engine manually

## Installation

### npm/pnpm/yarn

```bash
pnpm add @tsparticles/confetti
```

```ts
import { confetti } from "@tsparticles/confetti";

// Basic effect
await confetti({
  particleCount: 100,
  spread: 70,
  origin: { x: 0.5, y: 0.5 },
});

// On a specific canvas
await confetti("my-canvas-id", {
  particleCount: 50,
  angle: 90,
  spread: 45,
  colors: ["#ff0000", "#00ff00", "#0000ff"],
});
```

### CDN (script tag)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@4/tsparticles.confetti.bundle.min.js"></script>
<script>
  confetti({
    particleCount: 100,
    spread: 70,
    colors: ["#bb0000", "#ffffff"],
  });
</script>
```

### Main parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `particleCount` | number | 50 | Number of confetti pieces |
| `spread` | number | 60 | Spread angle (degrees) |
| `angle` | number | 90 | Direction (degrees, 90 = down) |
| `startVelocity` | number | 30 | Initial velocity |
| `colors` | string[] | — | Confetti colors |
| `origin` | { x, y } | { 0.5, 0.5 } | Origin point (0-1) |
| `drift` | number | 0 | Horizontal drift |
| `shapes` | string[] | — | Shapes: "circle", "heart", "square", "star", "cards" |

## Common mistakes

- Thinking `tsParticles` is exported by `@tsparticles/confetti` — it is not.
- Reusing the same canvas ID unintentionally.
- Calling `confetti` in a loop without managing performance — use a reasonable interval or stop the animation when done.

## See also

- [Bundle overview](/guide/bundles)
- [Fireworks bundle](/guide/bundles-fireworks)
