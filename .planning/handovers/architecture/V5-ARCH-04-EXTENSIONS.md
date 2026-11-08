# V5-ARCH-04 — Common extension architecture

Status pending evaluation. Owner 03 for contracts and 08 for audit/migration,
with integration in 04–07 and browser/bundle verification in 09.
Define the contract before lifecycle refactors and complete verification in 08.

## Evidence and problem

`PluginManager` already centralizes plugins, shape/effect/updater initializers,
presets, palettes, easing, and color managers. `GenericInitializer<T>` supplies
an async Container factory for shapes, effects, and updaters. Reuse those
responsibilities when evaluating a common registry.

Contracts differ. `IPlugin` selects and creates an `IContainerPlugin` and
loads options. `IParticleUpdater` has init/update/reset and drawing hooks.
`IShapeDrawer` has draw/loadShape/particleDestroy, and `IEffectDrawer` uses
drawBefore/drawAfter. Modifiers, interactions, and paths have other semantics.
Presets and palettes mostly contribute data. Verify lifecycle and order before
unifying APIs.

## Alternatives and initial direction

| Model                                       | Benefit                                            | Risk                                                                      |
| ------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------- |
| Current registries with shared utilities    | Minimal migration and specialized pipelines        | Policy and lifecycle differences still need documentation                 |
| Common descriptor with typed capabilities   | Consistent policy, composition, and explicit scope | May duplicate registries or load unused capabilities                      |
| One interface/class with all hooks optional | One nominal type                                   | Invalid combinations, type loss, and unnecessary dispatch                 |
| ECS/general scheduler for all extensions    | Possible batch systems                             | Broad rewrite and plugin order/state migration, outside required v5 scope |

Evaluate a common registration descriptor and specialized capabilities. Allow
extensions to contribute multiple capabilities without empty hooks.
Distinguish the general term “extension” from the existing `IPlugin` contract.

## Common contract to design

- Identity. Use a stable extension ID and individual capability keys. Define
  namespaces, aliases, and conflicts, distinguishing shape names from plugin IDs.
- Composition. Define per-engine factory/registration, requirements, option
  contributions, per-container factories, and typed runtime capabilities.
  Keep optional implementations out of the descriptor's mandatory imports.
- Scope. Share immutable definitions. Scope registration and services to
  engines, instances/resources to containers, and state and reset to particles.
- Policy. Define duplicates, idempotence, concurrency, retry, and behavior before
  and after init. Keep the current post-init restrictions or migrate them
  intentionally. Hot unload is outside required scope.
- Lifecycle. Define async init, activation, refresh/reset, and disposal with
  explicit resource ownership and cleanup after partial init. Keep reset and
  destroy semantics distinct.
- Order. Name phases and preserve stable order within them. Introduce priorities
  and dependencies only where needed, and diagnose cycles and missing
  dependencies at init. Preserve loader ordering unless explicitly migrated.

In 03, build a typed prototype covering an updater, a shape, an effect, and an
extension contributing options and several capabilities. Compare author
experience with the current API. Keep types available to consumers.

## Specialized capabilities and hot paths

Build a matrix for Plugin/Updater/Shape/Effect/Interactor/Path/Modifier and
preset/palette/easing/color manager contributions. Record registration,
activation, init, options, frame and particle hooks, resources, and teardown.
Include move and interactivity, which extend APIs through plugins.

Map hooks and init timing explicitly, including hooks without equivalents.
Preserve layers, canvas state, and bounds/HDR hooks when comparing draw with
drawBefore/drawAfter. Link options to ARCH-03 and state codecs to ARCH-01.
Codecs and snapshots remain opt-in within the chosen serialization contract.

The common registry operates during loading and init. Keep typed lists and
reusable instances per capability/phase in the frame. Avoid global scans,
universal type switches, string lookups, and extra hook or particle allocations
where possible. Record pipeline compilation costs and rebuild points.

## Migration and acceptance

1. Complete the matrix with real consumers and tests characterizing order.
   Compare shared utilities and descriptors on representative families first.
2. Select the model in 03 and migrate affected lifecycles in 04–07. Evaluate
   selective loader adapters without permanent duplication of registration or
   hook execution. Document breaking changes and replacement APIs.
3. In 08, update the matrix for every package. Compile a custom external
   extension and test the same extension on two engines with different
   services, reversed order, and concurrent loading.
4. Test conflicts/aliases, duplicates, async failures, partial cleanup, refresh,
   pool reuse, one-time destroy, and shared resources still in use. If supported,
   test missing/cyclic dependencies and missing/incompatible codecs.
5. Compare init and frame costs for a minimal scene, many registered but few
   active extensions, and slim/full. Measure allocations and payload with
   unused capabilities omitted. Keep the minimal bundle selective.

Record the ARCH-04 decision, lifecycle equivalence matrix, typed API/prototype,
measurements, and migration per family. Require consistent composition and
policy while preserving runtime differences.
