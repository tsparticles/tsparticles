# V5-02 — Engine-owned random and logging services

Status: E2 accepted; final cross-package and release verification belongs to E10. See the [execution sequence](V5-EXECUTION.md) and the acceptance record below.

## Ownership

`Core/Engine.ts`, `Utils/{MathUtils,LogUtils,ColorUtils,Utils}.ts`, types and
exports, PluginManager, Container, Particle, option loaders, and workspace
consumers that use these services directly or through helpers. Include related
tests, examples, and changelogs. Keep the folder layout in this phase and
preserve other contributors' changes.

## Proposed contract

- Engine methods are `setRandom(rnd = Math.random)`, `getRandomFn()`,
  `getRandom()`, `setLogger(logger: Partial<ILogger>)`, and `getLogger(): ILogger`.
- Match v4 defaults with `Math.random` and console logging, preserving
  `TSP-xxxx` codes, levels, and wrapping. Each engine owns a mutable logger
  object. Leave the object passed by the user intact.
- Preserve the RNG clamp `[0, 1 - Number.EPSILON]`. Document the finite-value
  requirement and preserve existing range semantics.
- Service changes apply to subsequent calls from existing and future containers
  on that engine. Avoid capturing stale RNG callbacks.
- Remove module-level setters/getters and global aliases. Avoid `currentEngine`,
  ambient variables, singleton fallbacks, and swapping the global RNG during a frame.

## Work

1. Inventory transitive usage. RNG affects ranges, directions, positions, array
   selection, colors, animations, paths, emitters, collisions, and noise. Logging
   affects fetch, images/audio, plugins, and lifecycle. Also search for direct
   `Math.random` and `console` calls. Distinguish tooling and pure utilities from
   runtime code owned by an engine.
2. Give plugins a minimal documented way to access context through the engine,
   container, or plugin manager. Avoid casts that expose private fields.
3. For helpers that use randomness, choose one convention before migration:
   pass a stable RNG provider explicitly or use engine services. Keep pure math
   helpers exportable as pure functions. Pass just the callback where it suffices.
4. Migrate all calls, including async continuations. A fetch error must reach the
   originating engine's logger even while another engine is running.
5. Audit `_animationLoop` and `setAnimationFunctions`, which are also shared
   configurable state. Prefer per-engine scheduling with browser defaults and
   local cancellation tests. If deferred, record the limitation and reason.
6. Audit mutable plugin caches and registries. Scope deduplication per engine
   where it affects registration or customized random values. Analyze immutable
   data caches separately from DOM resource caches.
7. Migrate tests that use global setters or manual resets. Update public
   signatures, `ILogger` exports, changelogs, and the migration guide.

## Acceptance tests

- Alternate particle creation, colors/ranges, emission, and ticks across A and B
  with different deterministic sequences. Each sequence advances only for its engine.
- Change or reset A's RNG and verify B is unaffected. Test boundary semantics.
- Test partial loggers, defaults for other levels, preserved messages and codes,
  and unchanged inputs and other engines. Cover async errors and destroy while waiting.
- Check browser and ESM/CJS lazy entrypoints, plus generators, for residual
  dependencies on global services.
- If the scheduler migrates, pause and destroy cancel only the owning engine's handles.
- Run the full suite, lint and formatting checks, and all affected consumer
  builds. Record the service cost in the intermediate bundle report.

## Deliverables

Provide an old-to-new API map, helper convention, test results, and a justified
inventory of remaining shared state. Update the index and public documentation.

## Source-review acceptance additions

Apply G1/G4/G6 from the [source review](V5-CODE-REVIEW.md). Include mutable
registries in emitters and noise/runtime utilities; define invalid RNG results,
seed/random-call semantics and scheduler time domains. Immutable definitions and
browser resources need distinct ownership rules, not automatic per-engine copies.

## E2 acceptance — 2026-11-15

Implemented in the working tree:

- `Engine` now owns a stable RNG provider, logger, frame scheduler and scheduled-frame cancellation map. `Container` retains its owning engine, so plugin code and async work resolve services from the correct instance.
- RNG is explicitly threaded through math/range/position/option selection, colors and animation, Particle initialization, emitters, paths, shapes, updaters, interactions and noise. Invalid random outputs are normalized to zero; finite outputs clamp to `[0, 1 - Number.EPSILON]`. A provider acquired earlier observes later `setRandom` changes. The callback is consumed once per random request; stable call counts are not a cross-version contract. Custom scheduler timestamps must share `requestAnimationFrame`’s high-resolution time domain.
- Logger construction is local to an engine; partial overrides preserve other levels and the supplied object. Fetch, image and runtime error paths use the owner logger.
- Animation requests are tracked per engine, and each handle retains the cancellation callback that created it. Cancellation therefore remains correct if that engine's scheduler is later replaced.
- Removed the module-level RNG/logger/scheduler API and migrated examples, wrappers, tests, and all localized plugin-customization guides. See the [migration guide](V5-MIGRATION.md) for the old-to-new API map.
- Engine-scoped registries include PluginManager, emitter/absorber managers keyed by PluginManager, per-engine plugin instances, and color managers registered from the engine's loader. Global `ColorUtils.styleCache` and polygon geometry entries cache deterministic values; error-message tables are shared code definitions. Card/GIF/image caches retain browser resources, and full-screen style caching retains document-derived CSS. Sounds' muted flag represents browser user-activation state and remains shared at module scope; this is the remaining mutable global requiring separate ownership review for multi-window use.

Verification: the engine build passed for browser/CJS/ESM/types, lint and circular-dependency checks. Direct builds passed for all 75 changed library packages, plus the Lit, Angular and Web Components wrappers/demo; the website docs build passed. Each changed package build runs its source lint/format steps; a final Prettier check passed for every changed file except the changelog, whose established bullet formatting is intentionally preserved. The primary suite passes (51 files / 688 tests), including 127 focused E2 tests and async logger ownership coverage. Installed ESM, CJS and browser-condition root/lazy probes passed against a packed package with ambient browser globals poisoned; each created independent engine state. Evidence: [installed E2 package checks](evidence/e2/installed-package.json). The pnpm lifecycle reports `ERR_PNPM_UNEXPECTED_STORE` because installed `node_modules` links use a different pnpm store, but continues the invoked scripts. Nx task orchestration stalls before producing output in this environment. The engine-only bundle cost is recorded in the [interim bundle report](V5-BUNDLE-REPORT.md): +1,295 raw / +273 gzip / +274 Brotli bytes versus E1.

The sounds plugin's `muted` latch intentionally tracks the first user activation in its JavaScript realm. Engines in the same window share that browser event; separate windows have separate realms, and duplicate bundle copies each observe the activation event. This is browser-owned state, not engine configuration or a mutable engine registry. No E2 acceptance item remains open.

### Downstream build follow-up — 2026-11-15

The first Nx run exposed remaining framework-wrapper references to the retired
module-level `getLogger()` API. React, Vue, Solid, Preact, Inferno, Qwik and
Svelte now log through the engine that owns each load or container; their test
mocks follow the engine-owned API. Inferno fixtures now include their owning
engine for theme-error coverage. The requested wrapper/demo/package build run
then passed all 199 tasks, and all 10 wrapper test targets passed. The primary
test package build also passed lint, formatting and 688 tests.
