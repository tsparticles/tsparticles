# V5-02 — Engine-owned random and logging services

Status pending. Execute in E2 after E1. See the [execution sequence](V5-EXECUTION.md).

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
