# E12 — Engine-independent extensions through `@tsparticles/core`

Status: **planned**. This follow-up defines a package boundary to prevent
changes to engine internals from triggering builds of the extension ecosystem.
It is separate from E0–E10 and does not change their status or authorize a
release.

## Goal

Create one small shared package, provisionally named `@tsparticles/core`, for
the contracts, shared types, and reusable runtime utilities needed by the
engine and its extensions. The engine implements the contracts. Plugins,
updaters, effects, shapes, interactions, presets, palettes, and other extension
packages depend on `core` and must not depend on `engine`.

Only packages that compose or expose the actual engine depend on it: bundles,
wrappers, and their demos. A source change inside the engine should therefore
rebuild the engine and those direct engine consumers, without rebuilding all
extension packages. Changes to shared contracts or utilities in `core` are
expected to affect their consumers.

## Dependency contract

```text
engine ────────────────────────────────┐
plugins / updaters / effects / shapes ──┤
interactions / presets / palettes ──────┴── depend on @tsparticles/core

bundles / wrappers / demos ──────────────── depend on engine and selected extensions
```

Rules:

- `@tsparticles/core` has no dependency on `@tsparticles/engine` or on an
  extension package. Its runtime helpers must be engine-agnostic and accept
  required dependencies explicitly.
- The engine depends on `core`; concrete `Engine`, `Container`, `Particle`,
  and other runtime classes implement the shared interfaces, including the
  public contracts selected for `IEngine`, `IContainer`, and `IParticle`.
- Every extension-family package imports shared types and utilities from
  `@tsparticles/core`. It must have no engine dependency in source imports,
  `package.json`, `package.dist.json`, peer dependencies, or generated package
  metadata. The same rule applies to presets and palettes.
- Bundles and wrappers may depend on the engine to construct it and compose
  extensions. Their demos may depend on the engine where they exercise that
  integration. These are the intended engine edges.
- Do not use concrete engine classes as extension contracts. Use structural
  interfaces from `core`; keep implementation-only state and classes inside
  the engine.

## Package contents and API design

1. Inventory every symbol imported by extension packages from the engine,
   classifying it as a contract/type, enum or constant, reusable runtime
   utility, or engine implementation detail.
2. Put extension-facing interfaces and structural contracts in `core`,
   including the agreed engine, container, particle, loader, and capability
   contracts. Avoid references to concrete engine classes in those contracts.
3. Move or implement in `core` the shared runtime utilities that extensions
   need. Keep them pure or explicitly parameterized; do not give them hidden
   access to engine state. Keep engine-specific algorithms and lifecycle
   behavior in the engine.
4. Decide which runtime values belong in `core` (for example enums and small
   value classes) based on real extension imports. Keep exports selective and
   avoid deep-importing implementation files.
5. Retain engine-root re-exports where needed for the supported migration
   window, but make `core` the canonical import path for extensions.

The package is not assumed to be output-free: interfaces and type aliases
erase from JavaScript, while runtime utilities and values produce output. Keep
that output minimal and measure its inclusion in representative bundles.

## Work sequence

1. **Baseline and inventory:** Record the current Nx dependency graph and
   affected builds for an engine-only source change. Inventory all extension
   imports and manifest dependencies on the engine, including generated
   templates, CLI generators, tests, docs, and package distribution metadata.
2. **Design the boundary:** Finalize the package name, directory, exports,
   supported runtime targets, contract ownership, and list of runtime values
   to move. Confirm the dependency graph is acyclic: `core` has no engine edge;
   extensions depend on `core`; only bundles, wrappers, and their demos depend
   directly on the engine.
3. **Create `core`:** Add the workspace package, build/type output, package
   exports, and publish metadata following repository conventions. Move the
   first stable contracts and utilities, with the engine implementing them.
4. **Migrate extensions:** Change source imports and package manifests across
   plugins, updaters, effects, shapes, interactions, presets, palettes, and
   related extension families. Move any extension-required engine utility into
   `core` or replace it with an explicit contract; do not leave an engine
   dependency as a shortcut.
5. **Migrate composition and tooling:** Keep engine imports in bundles,
   wrappers, and their demos. Update package generators, templates, examples,
   tests, exports, docs, dependency constraints, and release metadata so newly
   generated and published extensions follow the same boundary.
6. **Enforce and measure:** Add a dependency rule that rejects engine imports
   and manifest edges from extension packages, while allowing the approved
   bundle/wrapper/demo edges. Compare Nx affected sets and task hashes before
   and after an engine-internal change, a `core` contract change, and an
   extension-only change. Measure package and bundle output for moved runtime
   utilities.
7. **Close migration:** Record the complete package-family matrix, removed
   engine edges, build evidence, compatibility notes, and any documented
   exceptions here and in the v5 status index.

## Acceptance criteria

- No plugin, updater, effect, shape, interaction, preset, palette, or other
  extension package has a source import or declared dependency on
  `@tsparticles/engine`.
- `@tsparticles/core` has no dependency on the engine and exports the stable
  contracts and shared utilities required by extensions.
- The engine's concrete classes implement the shared contracts; representative
  extension consumers compile against those interfaces without concrete engine
  classes.
- The only intended direct engine consumers are bundles, wrappers, and their
  demos. The dependency checker catches an engine import or manifest edge
  accidentally added to an extension.
- An engine-internal-only change does not mark extension packages affected in
  Nx. A change to a contract or shared runtime utility in `core` does mark its
  consumers affected. Bundle, wrapper, and demo builds remain affected by
  engine changes as expected.
- ESM, CJS, browser and declaration outputs resolve through the package's
  public exports. Moved runtime utilities work at runtime and do not introduce
  cycles or unwanted bundle growth.
- Workspace builds, relevant tests, lint, formatting, generated extension
  checks, and representative external-consumer checks pass under the v5
  verification requirements.

## Scope and validation note

This is a workspace-wide dependency migration, not merely a type relocation.
The intended optimization depends on removing engine edges from all extension
packages and relocating the runtime helpers those packages currently import
from the engine. Keep this follow-up separately scoped from E0–E10; it does not
change their acceptance status or authorize publication.
