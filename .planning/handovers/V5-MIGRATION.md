# V5 migration guide — E10 working draft

Status: E10 in progress (2026-11-25). E9 installed-package and browser checks
passed for the current candidate. This guide describes implemented v5 engine,
wrapper, bundle, and color contracts. The E0 size ceilings remain visible as
diagnostic references under the updated E10 size criterion; they are not
represented as passing. Runtime, allocation, and retention criteria remain
active, with the M6/500 forced-HDR frame p95 still above the fixed E0 ceiling.

The vanilla TypeScript MCP-generated example and CLI scaffold pass isolated
type-checking and Chrome initialization using rebuilt candidate packages; the
CLI scaffold also passes its production build. All nine packed template
families contain zero retired Vue 2, Nuxt 2, or Nuxt 3 variants. Generated
framework combinations beyond Vanilla and React, translated guides, broader
consumer review, and the HDR/browser hardware gate remain open. Keep this as an internal
draft; it is not the completed release migration guide.

The live website's default and nine localized Vanilla guides are byte-identical
and pin the currently published v4 CDN packages. Their singleton examples are
kept as v4 documentation until the v5 migration page is ready for publication;
they do not count as v5 consumer checks.

## Engine ownership

Replace imports of the `tsParticles` singleton with `createEngine()`. Keep the
returned instance in application scope, pass it to each loader, and supply it
explicitly to wrappers/providers. A local variable may still be called
`tsParticles`. Component teardown owns its container; it must not destroy
unrelated containers using the same engine.

Random/logger customization and animation scheduling are now instance-owned in
the E2 implementation. Keep custom plugins on `container.engine` (or
`container.pluginManager.engine`) so runtime services follow the owning engine.

## Retired framework integrations

| Integration                                 | Migration destination                                  | Removal / verification          |
| ------------------------------------------- | ------------------------------------------------------ | ------------------------------- |
| Vue 2 wrapper, demo and starter references  | Upgrade application to Vue 3 and `@tsparticles/vue3`   | Removed in E1; final recheck E9 |
| Nuxt 2 wrapper, demo and starter references | Upgrade application to Nuxt 4 and `@tsparticles/nuxt4` | Removed in E1; final recheck E9 |
| Nuxt 3 wrapper, demo and starter references | Upgrade application to Nuxt 4 and `@tsparticles/nuxt4` | Removed in E1; final recheck E9 |

Framework upgrades are application migrations, not drop-in package renames.
The E0 reference search is in `evidence/e0/retirement-references.txt`; inspect
installers, generated strings, documentation and translations during removal.
The matrix includes retained consumers that require explicit engines as well.

## Deprecated APIs

The RGB-returning `colorMix()` was removed. The deprecated engine
`getStyleFromRgb()` and `getStyleFromHsl()` helpers, the HSV plugin's
`getStyleFromHsv()`, and the OKLCH plugin's package-local `getStyleFromOklch()`
formatter were also removed. Convert RGB with `rgbToOklch()`, HSL with
`rgbToOklch(hslToRgbFloat(color))`, and resolve HSV options through the
registered HSV color manager with `rangeColorToOklch(engine.pluginManager,
{ value: { hsv: color } })`. Pass the canonical result to the engine's
output-aware `getStyleFromOklch()`. The engine formatter handles destination
gamut mapping and HDR settings. For a genuine RGB-only output boundary, use
`mapOklchToSrgb(result).rgb`.

### Interactor lifecycle hooks

The interactor base classes supply a default no-op `reset()` implementation.
The external interactor base also supplies a default no-op `clear()`.
The manager selects custom hooks after interactor initialization, including
redraw initialization. Keep overrides that carry state or have reset-phase
work, and add the TypeScript `override` modifier when using
`noImplicitOverride`.

See the [deprecated API inventory](evidence/e9/deprecated-migrations.md) for
retired color formatters, Confetti and Ribbons options, and the retained opt-in
particles.js compatibility surface.
For applications upgrading their compiler to Stencil 5, remove
`applyPolyfills()` and await `defineCustomElements()` where registration must
finish before hydration. The current tsParticles Stencil wrapper uses Stencil
4 and still declares `applyPolyfills()`.

## Color, options and public contracts

Color inputs still accept supported RGB, HSL, HSV, HWB, Lab, LCH, OKLab, CSS
strings, arrays, and ranges. The particle animation contract is now OKLCH:
replace legacy HSL animation components `{ h, s, l }` with `{ h, c, l }`.
Hue remains an angle, chroma and lightness use the v5 OKLCH numeric scale, and
alpha remains a separate opacity value. Do not copy HSL saturation into chroma;
convert colors at the input boundary or retain a supported CSS/RGB input and let
the engine parse it. Managers that implement the color extension point must
follow the current OKLCH manager contract; see the [color decisions](V5-COLOR-DECISIONS.md)
for accepted inputs, gamut mapping, alpha, and HDR behavior.

## Explicit-engine APIs implemented in E1

```ts
import { createEngine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const engine = createEngine();
await loadSlim(engine);
const container = await engine.load({ id: "particles", options: {} });
container?.destroy();
```

Root, `/lazy` and the browser module condition do not create engines or publish
objects on `globalThis`. Classic Rollup scripts expose the factory/loader namespace:

```js
const engine = tsParticles.createEngine();
await tsParticles.loadSlim(engine);
await engine.load({ id: "particles", options: {} });
```

A standalone bundle includes engine definitions; external feature scripts require
the matching engine and dependencies first. Keep package versions aligned. The
namespace holds definitions, not an engine. Loading another bundle never destroys
an engine created previously. Same-canvas ownership is exclusive, even across
separately bundled engine copies. Destroy the owner before transferring a canvas.
Same IDs on distinct supplied canvases remain independent across engines.

Use a separate engine where an application needs separate plugin registries,
random sources, loggers, schedulers, or container ownership. Register every
required feature with each engine that will use it:

```ts
import { createEngine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const editor = createEngine();
const preview = createEngine();
await Promise.all([loadSlim(editor), loadSlim(preview)]);

const editorContainer = await editor.load({ id: "editor", options: {} });
const previewContainer = await preview.load({ id: "preview", options: {} });

editorContainer?.destroy();
previewContainer?.destroy();
```

Convenience packages export `createConfetti(engine)`, `createFireworks(engine)`,
`createParticles(engine)`, and `createRibbons(engine)`. The returned callable is
bound to that engine and retains `init`, `create`, and `version`:

```ts
import { createEngine } from "@tsparticles/engine";
import { createConfetti } from "@tsparticles/confetti";

const confetti = createConfetti(createEngine());
await confetti({ count: 30, spread: 70 });
```

`initPjs(engine)` resolves to `{ particlesJS, pJSDom, Particles }`; it does not
assign those compatibility APIs to `globalThis`. `loadConfigs(engine)` explicitly
registers the catalog and palettes on that engine.

| Wrapper family                                | Engine ownership and registration                                                                                                                                     |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| React / Next.js                               | Pass `engine` to `ParticlesProvider`; provide an `init` registrar that loads required plugins on it.                                                                  |
| Vue 3                                         | Install the particles provider with `{ engine, init }`; call `useParticlesProvider()` from descendants.                                                               |
| Angular                                       | Supply an engine to `service.init(engine, registrar)` and use a separate service provider for each independent engine. Convenience components take an `engine` input. |
| Preact, Solid, Inferno, Svelte, Stencil, Riot | Supply the engine through the component/provider API and initialize that engine with `initParticlesEngine(engine, registrar)` where exposed.                          |
| Qwik                                          | Create/register on the client and retain the engine with `noSerialize`; do not create an engine during server rendering.                                              |
| Custom elements                               | Assign `.engine` as a property; it is not a serialized HTML attribute.                                                                                                |
| Nuxt 4                                        | Use the configured initialization module's exported `engine` and `registerParticles`.                                                                                 |

Use the signatures in each wrapper README for framework-specific setup and SSR
constraints. Do not recreate an implicit module-level engine in a provider.

Component teardown destroys only its owned container. Applications own shared engine
lifetime and must settle pending loads and destroy containers before discarding it.
Runtime services are owned by each engine. Configure them before loading a
container:

```ts
const engine = createEngine();
engine.setRandom(myRandomFn);
engine.setLogger(myLogger);
engine.setAnimationFunctions(requestFrame, cancelFrame);
const container = await engine.load({ id: "particles", options });
```

The former global `setParticlesRandom`, `getParticlesRandom`,
`getParticlesRandomFn`, `setParticlesLogger`, and `getParticlesLogger` APIs
have been removed. Migrate those calls to `engine.setRandom`,
`engine.getRandom`, `engine.getRandomFn`, `engine.setLogger`, and
`engine.getLogger`. Custom plugins can access the owner via
`container.engine` or `container.pluginManager.engine`. Runtime helpers accept
an explicit random provider; use the owning engine's stable `getRandomFn()`
provider so later source changes take effect without affecting other engines.
Animation scheduling is also per engine; existing container frames are
cancelled by the scheduler that created them.

### Initialization ordering

For wrappers exposing `initParticlesEngine`, call `initParticlesEngine(engine, registrar)`
from application initialization. Components may mount before that call; they wait
for that engine's initialization and do not create or initialize an implicit engine.
Use `$.particles(engine).init(registrar)` for jQuery. React/Vue providers and
Angular service initialization perform the equivalent step. Failed registration
rejects current waiters and allows a subsequent initialization attempt.

## Module and browser entrypoints

Import the package root for the standard ESM API. Use a package's `/lazy`
subpath when its deferred entrypoint is needed; dynamic loading does not restore
the old singleton. The installed package checks cover ESM `import`, CJS `require`,
and the `browser` condition for root and `/lazy` entries.

For classic browser output, the Rollup namespace contains factories and feature
loaders. Create the engine after the namespace script loads and pass it to each
loader. External feature scripts depend on the matching engine and shared
dependencies; use a coherent version set and the order in the bundle's browser
README. A standalone bundle contains its selected features. Neither loading the
browser entrypoint nor importing a package root creates an engine automatically.

## Package boundaries and removed singleton APIs

Import runtime types and `createEngine` from `@tsparticles/engine`, then import
only the feature packages needed by the application (for example `@tsparticles/slim`
or a dedicated interaction/shape/updater package). Convenience packages are
separate adapters. Prefer their declared exports over importing another package's
internal `dist` or source paths. The E10 installed-package report is the authority
for current `exports`, declaration, and resolution checks.

The exported engine singleton and global engine mutation helpers were removed.
Replace `setParticlesRandom`, `getParticlesRandom`, `getParticlesRandomFn`,
`setParticlesLogger`, and `getParticlesLogger` with the corresponding methods on
the engine that owns the container. If application code used `tsParticles.load`,
`tsParticles.loadJSON`, or `tsParticles.dom`, call those operations on the explicit
engine or retain the returned container. Do not access `window.tsParticles` from
an imported ESM/CJS package; classic browser bundles expose the documented
namespace separately.
