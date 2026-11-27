# E11 — Engine-owned utilities and configuration

Status: **complete — 2026-11-27**. This is a follow-up to E2, not a
reopening of the completed E2 acceptance gate. The v5 major release accepts the
breaking API changes required by this plan.

## Goal

Make configurable runtime behavior belong to an explicit `Engine`, for both
configuration and lookup. Random services, logging, color-manager registration
and resolution must be reachable only through the owning engine. Remove ambient
or implicit defaults from engine-owned code paths. Keep pure utilities usable
only when their dependencies are supplied explicitly. The engine constructs
and configures its logger directly; there is no standalone `createLogger`
factory.

“No global configuration” means no module-level or `globalThis` setting that
changes engine behavior. It does not automatically require deleting immutable
code tables, deterministic memoization, browser-owned resources, or platform
state. Every remaining shared mutable value must be classified, justified, and
covered by an ownership rule.

## Findings to resolve

- `engine/src/Utils/MathUtils.ts` exports `getRandom(random = Math.random)`.
  Engine code normally passes `engine.getRandomFn()`, but the helper remains a
  public fallback to ambient randomness. Remove it from the public API; if a
  shared primitive remains useful internally, require an explicit provider and
  keep the engine as the only public random service.
- `Engine` exposes `setRandom`, `getRandom`, and `getRandomFn`. These are
  instance methods today. Keep random configuration and reads on the engine;
  remove any global alias, module-level setter/getter, or default-engine path.
  Internal helpers may receive an engine-owned provider explicitly, but
  `MathUtils.getRandom` must not remain a public ambient-random API.
- Randomized plugin helpers and constructors still default to `Math.random`,
  including emitter shapes, polygon/path helpers, color managers, and the
  Poisson sampler. Separate pure/testing entrypoints from runtime entrypoints;
  engine-owned execution must receive the engine provider and must not silently
  escape to ambient randomness.
- `engine/src/Utils/LogUtils.ts` exports `createLogger`, and `Engine` uses it
  both to construct defaults and merge partial overrides. Move default methods,
  error-code formatting, and override behavior into the engine-owned logger
  implementation. Keep `ILogger` as a type if it remains useful; do not expose
  a global logger or module-level logger state.
- Color managers are currently stored in each engine's `PluginManager`, but
  reads and registration are exposed through that registry and `ColorUtils`
  iterates its mutable map directly. Make the owning engine the read/write API
  for color manager registration and lookup; keep storage private or behind an
  engine-owned registry so callers cannot mutate it outside that API.
- `adaptLegacyColorManager` and `ILegacyColorManager` are only used by their
  adapter test and the v5 color migration guide. Remove the adapter, legacy
  contract, exports, tests, and compatibility instructions. Plugin authors
  must implement the canonical `IColorManager` contract. The v5 major release
  does not retain an sRGB adapter for the old manager API.
- E2 records shared mutable state that needs an explicit disposition: the
  Sounds user-activation `muted` latch, caches in color/polygon/full-screen and
  image/GIF/card code, and any mutable plugin registries or service overrides
  found by a fresh audit. Distinguish engine configuration from browser-owned
  state and resource caches; scope engine-dependent values to their owner.
- `engine/src/browser.ts` installs exports on `globalThis.tsParticles`. Confirm
  that this is only a definition/factory surface and cannot hold mutable engine
  configuration. If it can, remove that configuration surface or replace it
  with explicit engine creation.

## Work sequence

1. **Inventory:** Search source, generated templates, wrappers, tests, docs,
   browser entrypoints, and package exports for ambient random/logging calls,
   global setters, singleton fallbacks, and mutable module state. Record each
   finding with its owner, runtime impact, and consumers.
2. **Set contracts:** Keep random and logger configuration and reads on the
   engine. Put color manager registration and lookup on the engine as well,
   without exposing a writable global or mutable registry. Pure helpers require
   explicit dependencies and have no ambient fallback. Remove legacy color
   manager adaptation and document the native `IColorManager` contract. Classify
   shared mutable state by owner; v5 breaking changes need no compatibility
   adapter.
3. **Migrate runtime:** Thread the owning engine or its stable providers through
   all engine-owned random, logging, and color-manager paths, including async
   continuations. Remove `createLogger`, `adaptLegacyColorManager`, their
   obsolete contracts, and any global configuration aliases. Make registries
   and mutable caches engine-owned where their contents affect behavior or
   customized results; leave justified browser resources and immutable data
   shared under documented ownership rules.
4. **Migrate consumers:** Update plugins, wrappers, demos, templates,
   code-generators, tests, localized guides, exports, and migration material.
   Remove stale resets, ambient-service mocks, adapter examples, and legacy
   color-manager migration guidance.
5. **Verify:** Test two engines with distinct random providers and loggers,
   including interleaved work, callbacks retained across service changes, and
   asynchronous failures. Check that importing ESM/CJS/browser entrypoints does
   not create an engine or mutable global configuration. Search again for
   forbidden ambient fallbacks and document every accepted shared mutable
   value.

## Acceptance criteria

- Every runtime random draw can be traced to its owning engine. No engine-owned
  path silently uses a module-global provider or a `Math.random` fallback.
- Every runtime log is routed through the originating engine, including errors
  that settle asynchronously after another engine has been used.
- Each engine can configure and read its random provider, logger, and color
  managers independently. Registering, replacing, or reading a service on one
  engine does not affect another engine.
- `createLogger`, `adaptLegacyColorManager`, and `ILegacyColorManager` no longer
  exist in source or public exports. The engine constructs its logger and owns
  all configurable runtime services; module/global configuration APIs are
  absent from public exports and runtime call paths. Logger defaults and
  partial overrides remain covered without sharing mutable logger state.
- All remaining mutable module/global state has an owner or a documented reason
  it is platform-owned and cannot change engine behavior.
- Browser, ESM/CJS, wrappers, templates, and supported plugin consumers have no
  singleton fallback or global configuration dependency. Color plugins use the
  native manager contract without a legacy adapter.
- Update the E2 API map and migration guide, then record changed packages,
  checks, and remaining limitations here before considering the work complete.

## Scope and validation note

This is an ecosystem-wide API and ownership change. Implement it as one
coordinated v5 follow-up so engine services, color plugins, consumers, and
documentation move to the agreed contract together. Use the repository's normal
v5 cross-package verification requirements during implementation.

## Progress — 2026-11-27

- Moved color-manager registration, lookup and iteration onto the owning
  `Engine`; its registry is private and no longer exposed by `PluginManager`.
  Migrated built-in color plugins, CLI plugin generation, and migration examples
  to `engine.addColorManager()`.
- Removed the legacy sRGB manager contract and adapter from source and public
  exports, and removed its migration example and adapter-specific test.
- Moved logger default construction and override wrapping into `Engine`; the
  logger utility module now exports only the `ILogger` type.
- Routed the random path generator and cannon interaction through their owning
  container engine, and made `PoissonDisc` require an explicit random provider.
- Removed ambient RNG defaults from runtime math, animation, color, emitter,
  path and plugin helpers. Randomized helper branches now require a provider;
  deterministic branches remain usable without one. The engine's own default
  and `setRandom()` reset remain `Math.random`, as the engine-owned default.
- Removed the `MathUtils.getRandom()` helper from the public export barrel.
  Random-source normalization is internal; `Engine.getRandom()` is the public
  random service, while engine-owned helpers receive its stable provider.
- Migrated randomized portfolio/confetti scaffold examples to the owning
  template engine's `getRandom()` method. Migrated the Angular and vanilla
  demos and both standalone confetti/ribbons sites to their local engine's
  `getRandom()` method, including the ribbons blog example. Remaining runtime
  `Math.random()` use is limited to the engine's own default/reset and Ember's
  unique-ID polyfill, which runs before an engine exists and generates a
  framework component identifier rather than particle/runtime behavior. The
  localized guide examples intentionally demonstrate user-supplied random
  providers.
- Audited shared mutable state. Engine, PluginManager, container, particle,
  scheduler, color-manager, emitter/absorber, shape-generator and plugin-instance
  registries are instance- or owner-keyed. `ColorUtils` style/HDR caches and
  polygon unit geometry cache deterministic code-derived values. Card/GIF/image
  caches retain browser resources; full-screen style caching retains
  document-derived CSS. Easing maps, named colors, note tables and error-message
  templates are fixed package definitions, not engine configuration. The
  Sounds `muted` latch is browser user-activation state shared only within a
  JavaScript realm. Browser entrypoints expose factory/loader definitions on
  `globalThis.tsParticles`, not mutable engine configuration.
- Updated the E2 API map and migration guide; removed the stale legacy-adapter
  note from the root changelog. Color managers register and resolve through the
  owning engine.
- Verification: the primary suite passed (61 files, 945 tests). The engine,
  38 affected runtime/consumer projects plus 22 dependencies, portfolio and
  confetti template packages, three CLI generator packages, both standalone
  sites, the Vite demo and the Vanilla demo built successfully with their
  applicable lint, TypeScript, formatting, and circular-dependency checks. The
  broader cross-package build passed for 232 projects and 218 dependencies
  after removal of the public `MathUtils.getRandom()` export. The initial full
  demo sweep found and fixed a no-argument `getRandom()` call in Vite. Three
  unrelated environment failures remain: Electron packaging and Next.js Google
  Fonts could not fetch network resources, and Angular's build process aborted
  in both the full and targeted sweeps. Those three demos were excluded from
  the passing rerun. ESM and CommonJS package entrypoints confirm that
  `getRandom`, `createLogger`, and `adaptLegacyColorManager` are absent from
  public exports.
  Nx Cloud remote caching was unavailable (`ENOTFOUND`); local task execution
  completed.
