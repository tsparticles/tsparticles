# Plugins & Customization

tsParticles can be extended at runtime with custom shapes, presets, plugins, and more. You can either create extensions inline (app-local) or build full npm packages using the CLI scaffolding tool.

## Quick decision map

- Use a **custom shape** when you only need a new drawing primitive.
- Use a **custom preset** when you want to reuse one full options object.
- Use a **plugin** when you need runtime logic (container lifecycle, custom behavior, option parsing).

## All extension types at a glance

| Type                                                    | What it does                                                             | How to use                                                            |
| ------------------------------------------------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| [Plugin](/guide/plugins-customization-plugin)           | Container/runtime feature module (emitters, absorbers, polygon mask)     | Enable with your plugin options and lifecycle hooks                   |
| [Shape](/guide/plugins-customization-shape)             | Particle drawing primitive (`particles.shape.type`)                      | Set `particles.shape.type` to your shape id                           |
| [Preset](/guide/plugins-customization-preset)           | Reusable full options profile (`preset`)                                 | Set root `preset`                                                     |
| [Updater](/guide/plugins-customization-updater)         | Per-frame particle property updater (tilt, roll, opacity, size)          | Runs automatically where `isEnabled` returns `true`                   |
| [Effect](/guide/plugins-customization-effect)           | Particle rendering effect (`particles.effect`)                           | Set `particles.effect.type` to your effect id                         |
| [Interaction](/guide/plugins-customization-interaction) | Behavior between particles and events (mouse/touch or particle-particle) | Enable in `interactivity.events` / optional custom mode checks        |
| [Path](/guide/plugins-customization-path)               | Motion path generator for particle movement (`particles.move.path`)      | Set `particles.move.path.generator` to your path id                   |
| [Palette](/guide/plugins-customization-palette)         | Reusable style/colors profile (`particles.palette`)                      | Set `particles.palette` to your palette id                            |
| [Custom Bundle](/guide/plugins-customization-bundle)    | Grouped loader that registers many features at once                      | Call `await loadMyBundle(tsParticles)` before `tsParticles.load(...)` |

## Composition strategy

- Start from one **bundle** (`slim` is usually enough).
- Add missing capabilities as small focused modules (interaction/updater/path/effect/shape).
- Use **preset** for behavior reuse and **palette** for visual identity reuse.
- Keep app-local custom extensions first, publish only when reused across projects.

## Practical rules

- Keep extension names unique (for example `app-*` or company prefix).
- Start app-local, extract to a package only when reused in multiple projects.
- Keep a tiny config fixture while developing (faster regressions checks).
- If a feature is missing, verify the required package is loaded (shape, interaction, updater, plugin).

## Engine runtime services

Randomness, logging and animation scheduling belong to an engine instance. Create an engine and configure its services before loading containers:

### Custom random number generator

Replace the internal random function with your own (useful for seeded/controlled randomness in custom plugins):

```js
const engine = createEngine();

engine.setRandom(() => {
  // Return a finite number. Values are clamped to [0, 1); non-finite values become 0.
  return Math.random();
});

const container = await engine.load({ id: "particles", options });
const value = engine.getRandom();

// Helpers can receive the stable provider; it uses the engine's current source.
const randomFn = engine.getRandomFn();
```

The source is called once for each random request. A fixed source sequence is useful for repeatable runs, but random call counts are not a cross-version compatibility contract.

### Custom logger

Replace the internal logger with your own (useful for silent modes or custom log handling):

```js
engine.setLogger({
  debug: (msg) => {},
  error: (msg) => console.error("[myApp]", msg),
  info: (msg) => {},
  log: (msg) => {},
  trace: (msg) => {},
  verbose: (msg) => {},
  warning: (msg) => {},
});

const logger = engine.getLogger();
```

Each engine has its own logger object and frame scheduler. A service change applies to later calls from its containers. Plugins can reach the owner through `container.engine` or `container.pluginManager.engine`.

Custom schedulers are configured on the engine:

```ts
engine.setAnimationFunctions(requestFrame, cancelFrame);
```

Custom scheduler timestamps must use the same high-resolution time domain as `requestAnimationFrame`.

## Next steps

Choose an extension type above for step-by-step guides with inline code and package creation instructions.
