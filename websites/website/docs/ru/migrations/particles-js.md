# Migration and compatibility

If you are migrating from `particles.js`, use this order:

1. replace old script/package with `@tsparticles/engine` + bundle (`@tsparticles/slim`)
2. move your old config and map unsupported fields incrementally
3. test interactions (hover/click/links) one by one

## Canonical migration notes

- Official migration guide source: [`tsparticles/markdown/pjsMigration.md`](https://github.com/tsparticles/tsparticles/blob/main/markdown/pjsMigration.md)
- Legacy compatibility examples are available in the demo folders.

## Compatibility package

If you need a bridge layer while migrating legacy configs:

- npm: <https://www.npmjs.com/package/@tsparticles/pjs>
- jsDelivr: <https://www.jsdelivr.com/package/npm/@tsparticles/pjs>

Further reading:

- Migration article: <https://dev.to/matteobruni/migrating-from-particles-js-to-tsparticles-2a6m>
- 5 reasons to switch: <https://dev.to/matteobruni/5-reasons-to-use-tsparticles-and-not-particles-js-1gbe>

## Common mapping tips

- Old `particlesJS(...)` init becomes `tsParticles.load({ id, options })`.
- Many legacy values still have direct equivalents under `particles`, `interactivity`, and `detectRetina`.
- New plugin-driven architecture means some advanced features require explicit package loading.

## Migration checklist for production

- Verify visual parity in desktop and mobile.
- Verify CPU/GPU impact on low-end devices.
- Verify no option keys are ignored silently.
- Pin exact package versions before release week.

## Migration from canvas-confetti to `@tsparticles/confetti`

If you are migrating from `canvas-confetti`, the easiest switch is replacing imperative calls with `@tsparticles/confetti` API calls.

### Typical mapping

- `confetti({...})` -> `await confetti({...})`
- custom canvas -> `const local = await confetti.create(canvas, defaults)` then `await local({...})`
- repeated shots -> keep your existing timers/loops, call `await confetti(...)` in those callbacks

### Example conversion

Before (`canvas-confetti` style):

```ts
import confetti from "canvas-confetti";

confetti({
  particleCount: 90,
  spread: 70,
  origin: { x: 0.5, y: 0.6 },
});
```

After (`@tsparticles/confetti`):

```ts
import { confetti } from "@tsparticles/confetti";

await confetti({
  count: 90,
  spread: 70,
  position: { x: 50, y: 60 },
});
```

### Option name notes

- `particleCount` -> `count`
- `origin.x`/`origin.y` in `0..1` -> `position.x`/`position.y` in `0..100`
- `startVelocity`, `spread`, `angle`, and `colors` keep the same semantics

For complete API and helpers, see: <https://github.com/tsparticles/tsparticles/tree/main/bundles/confetti#readme>
