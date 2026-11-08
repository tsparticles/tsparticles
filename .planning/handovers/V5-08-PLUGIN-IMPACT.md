# V5-08 — Audit plugins after singleton removal

Status pending. An initial audit is required in 01/02. This handover completes
verification after 07, once core contracts are stable.

## Ownership

All extension packages in `plugins/`, `interactions/`, `updaters/`, `shapes/`,
`effects/`, `paths/`, `presets/`, `palettes/`, and the runtime utilities they
consume. Include standard/lazy/browser entrypoints, implementations, caches,
and tests. Preserve packages that already work and other contributors' changes.

## Work

1. Create `V5-PLUGIN-AUDIT.md` with one row per package. Record explicit engine
   loaders, RNG/logging/scheduler dependencies, module state and caches,
   Engine/PluginManager/Container/Particle extensions, browser/lazy entrypoints,
   build/test results, and required action. Include all categories, including
   palettes and packages omitted by standard build filters.
2. Start from the observation that many loaders already accept an Engine, such
   as `loadCircleShape(engine)`. Verify the full call chain for isolation.
3. Search for imports of the old singleton, global lookups, loaded/initialized
   flags, shared promises, caches with custom values, and direct or transitive
   service use. Immutable definitions can be shared. Scope registrations,
   mutable managers, and contextual caches to their owning engine/container.
4. Check plugins that extend engine, plugin manager, or container APIs
   (move, interactivity, themes, export, and others). Ensure closures use the
   correct engine and extensions install on each registered engine.
5. Migrate consumers of APIs refined in 03–07. Check option loaders,
   inheritance, augmentations, type exports, and access to Particle fields.
6. Fix demonstrated defects and update tests, manifests, or changelogs as
   needed. Record compatibility evidence for packages that require no edits.

## Acceptance tests

- Run the same loader on A and B in reverse order and concurrently. Repeated
  calls on A must leave one registration and allow B to load.
- Use two engines with different plugin sets. Keep presets/palettes,
  paths/easings, custom shapes/updaters, and added APIs local.
- Interleave runtime with distinct RNG/loggers and async errors. Verify
  independence from import order, the first engine, and ambient state.
- Destroy or refresh a container while shared assets are still used. Verify
  those assets remain available and the other engine gains no registrations
  or listeners. Distinguish resource caches from state.
- Record an outcome for every package. Run compatibility builds across the set,
  targeted tests for each defect, integration scenarios by family, and the full suite.
- Verify bundle/lazy/browser behavior through the CDN path in 09 as well.

## Deliverables

Provide the per-package matrix, required changes, and reproducible remaining
issues. An unchanged package is a valid result with verification evidence.

## Performance and size plans

See [V5-IMP-02-BUNDLE-GRAPH](improvements/V5-IMP-02-BUNDLE-GRAPH.md), [V5-IMP-04-SPATIAL-INDEX](improvements/V5-IMP-04-SPATIAL-INDEX.md), [V5-IMP-05-PARTICLE-STATE](improvements/V5-IMP-05-PARTICLE-STATE.md), and [V5-IMP-06-RENDER-LIFECYCLE](improvements/V5-IMP-06-RENDER-LIFECYCLE.md).
Record assigned outcomes as specified in the [improvement plan](V5-IMPROVEMENTS.md).

## Valutazioni architetturali

Chiudere [ARCH-04 — Estensioni](architecture/V5-ARCH-04-EXTENSIONS.md) sulla base
dei contratti definiti in 03 e verificati in 04–07. Valutare registrazione/lifecycle
comuni con capacità tipizzate, mantenendo pipeline specializzate. Integrare
nell'audit i consumer di [ARCH-01](architecture/V5-ARCH-01-PARTICLE-MODEL.md) e
[ARCH-03](architecture/V5-ARCH-03-OPTIONS.md): campi/metodi Particle, eventuale
snapshot e codec, classi option, precedenze e mutabilità. Non imporre serializzazione
o una riscrittura universale a tutte le estensioni senza una decisione motivata.

## Migrazione colore obbligatoria

Consultare [V5-COLOR — OKLCH](V5-COLORS-OKLCH.md).
Completare C4 per tutti i manager e consumer della matrice colore, inclusi links,
bubble, gradient, split, trail coordinates, emitters, immagini/SVG e background.
La compilazione non sostituisce le prove di accuratezza, alpha e wide gamut.
