# V5 migration guide — implementation draft

Status: E0 complete; E1 retirement verified and engine/consumer migration in progress. The engine/convenience APIs below are implemented in the working tree;
consumer verification is ongoing and E2 service APIs remain planned. Do not publish these instructions as a
completed v5 release guide until installed-consumer checks pass in E1/E9/E10.

## Engine ownership

Replace imports of the `tsParticles` singleton with `createEngine()` once E1
lands. Keep the returned instance in application scope, pass it to each loader
and supply it explicitly to wrappers/providers. A local variable may still be
called `tsParticles`. Component teardown owns its container; it must not destroy
unrelated containers using the same engine. Exact wrapper signatures and the
CDN bootstrap namespace remain pending implementation and tests.

Random/logger customization moves onto that instance in E2. Until then, factory
creation alone must not be described as complete runtime isolation.

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

The E0 TypeScript source scan of engine/extensions/wrappers/runtime utilities
found `applyPolyfills()` marked deprecated in the generated Stencil loader
declaration. That declaration does not document a replacement. Do not infer
an engine API removal from this marker: inspect the Stencil generation contract
in E1/E9. No `@deprecated` marker was found in `engine/src` by this scan.
This is scan evidence, not a claim that all compatibility aliases are unnecessary.

## Color, options and public contracts

Canonical OKLCH and h/c/l animation migration is mandatory in E5. Final examples,
legacy HSL animation conversion, custom color manager changes, gamut/alpha/HDR
behavior and any intentional option/API removals will be documented with their
implementation. The current runtime has not been migrated.

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
the matching engine/dependency scripts first. Keep package versions aligned. The
namespace holds definitions, not an engine. Loading another bundle never destroys
an engine created previously. Same-canvas ownership is exclusive, even across
separately bundled engine copies. Destroy the owner before transferring a canvas.
Same IDs on distinct supplied canvases remain independent across engines.

Convenience packages now export `createConfetti(engine)`, `createFireworks(engine)`,
`createParticles(engine)` and `createRibbons(engine)`. Their returned callables retain
`init`, `create` and `version`. Initialization failures can be retried. `initPjs(engine)`
returns `{ particlesJS, pJSDom, Particles }`; it no longer assigns globals.
`loadConfigs(engine)` explicitly registers the catalog and palettes.

React/Next and Vue providers take `engine`; Preact, Solid, Inferno, Svelte, Qwik,
Stencil and Riot components receive an engine prop. Angular service initialization
is `service.init(engine, registrar)`, with separate service providers for independent
engines. Angular convenience components also take an `engine` input and bind their callable API to it.
Custom elements receive `.engine` as a property, never as a serialized attribute.
Nuxt's configured initialization module exports both `engine` and `registerParticles`.
Qwik supplies an engine on the client via `noSerialize`, after loading its plugins.

Component teardown destroys only its owned container. Applications own shared engine
lifetime and must settle pending loads and destroy containers before discarding it.
RNG/logger isolation is **not implemented yet**; it is the next E2 stage.

### Initialization ordering

For wrappers exposing `initParticlesEngine`, call `initParticlesEngine(engine, registrar)`
from application initialization. Components may mount before that call; they wait
for that engine's initialization and do not create or initialize an implicit engine.
Use `$.particles(engine).init(registrar)` for jQuery. React/Vue providers and
Angular service initialization perform the equivalent step. Failed registration
rejects current waiters and allows a subsequent initialization attempt.
