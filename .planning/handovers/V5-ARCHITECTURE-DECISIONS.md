# V5 architecture decisions — E3 contract checkpoint

Recorded 2026-11-17 against package version 4.6.0. E0, E1 and E2 are accepted.
These decisions set the contracts for E3 and constrain later implementation;
they do not claim that the E3 folder moves, audits, or runtime verification are
complete. Reopen a decision if consumer evidence or profiling contradicts it.

## ARCH-01 — Particle remains a runtime facade

**Decision.** Keep `Particle` as the runtime class and public type for v5. Keep
particle data and behavior together where methods require the Container,
PluginManager, renderer, or extension lifecycle. Extract pure calculations only
when it clarifies dependencies or enables isolated tests. Do not migrate the
collection to plain records, per-particle closures, typed arrays, or an ECS as
part of this work.

**Snapshot scope.** No public serialization, worker transfer, or save/resume
promise is introduced in v5. Particle objects retain runtime references and
extension state; a generic serializer would silently omit resources and plugin
state. If a consumer needs inspection, add a separately versioned data-only
snapshot with explicit fields and no restore implication. Revisit only with a
named consumer and a cost/benefit measurement.

**Contract.** Container/PluginManager references and canvas resources are
runtime-only. `getPosition()` and other cached getters retain their current
aliasing semantics unless a targeted API migration says otherwise. Reset,
pool reuse, disposal, and one-time hooks remain owned by E4/E5/E6. The
container-level path-generator lifetime from G2 is not a Particle reset.

**Evidence and follow-up.** Public plugin and updater APIs consume `Particle`;
the full consumer matrix and state-cost comparison remain for E5/E8. No memory
savings are claimed by keeping or extracting methods.

## ARCH-02 — One engine package, logical domains, no new subpaths yet

**Decision.** Keep one publishable `@tsparticles/engine` package. Organize
internal source around Engine, Container/lifecycle, Canvas, Rendering,
Particles, Options, Extensions, Types, and Utilities. Prefer selective domain
barrels for internal use; do not create package dependencies or public
subpaths in E3.

The current root and `/lazy` entrypoints remain the supported public import
paths. `package.json#exports` continues to block arbitrary consumer deep
imports. `Engine`, `Container`, `Particle`, managers, and other implementation
classes remain type-only from the root unless a concrete runtime consumer
requires them. Runtime definitions are exported explicitly. Do not export a
domain barrel merely because its files moved.

**Rationale.** Existing feature packages already import the engine root and
bundle composition tree-shakes optional capabilities. A split risks duplicate
engine registries/services, version skew, and additional release/type surfaces;
the current evidence does not show a consumer requiring a headless or
independently installed engine subpackage. E9 owns package extraction and
subpath measurement if new evidence appears.

**Boundary graph.** Base types and pure helpers sit below option loading and
engine services. Engine registration composes extension definitions. Container
owns container-scoped runtime instances and lifecycle. Particle and collection
logic depend on those contracts without importing the package root. Canvas and
Rendering depend on the runtime contracts; browser adapters are leaves. The
root entrypoint composes runtime exports and types but is never imported by an
internal domain.

**Enforcement plan.** Preserve `.js` relative imports and use direct sibling
imports, never a domain barrel from inside its own domain. Add an import-graph
check for forbidden root/barrel back-edges and external deep imports; keep
`package.json#exports` as the consumer boundary. E3 acceptance requires proving
the selected check rejects one forbidden edge and accepts one supported import.

## ARCH-03 — Keep typed loaders; make ownership and precedence explicit

**Decision.** Retain `ISourceOptions`/`RecursivePartial`, `IOptionLoader.load()`,
and the existing option classes through v5. `Options` and `ParticlesOptions`
remain per-container resolved mutable objects because they carry plugin,
updater, preset, palette, and Container-dependent contributions. Do not freeze
them or share them across engines/containers. Keep input data separate from
these loaded objects; normalization caches or shareable immutable templates
require later measurement and a complete invalidation contract.

**Load semantics.** Preserve established merge and loader order. `undefined`
means no new value; `OptionLoader.load(null)` remains a no-op. `false` and zero
are explicit values. Object fields and group entries keep the existing
`deepExtend` behavior; `paint` arrays replace the prior single/list form as
implemented today. Presets and palettes load through the owning engine's
PluginManager before the remaining source fields, followed by plugin and
updater option hooks in registration order. Do not silently change precedence,
array replacement, or unknown extension keys during organization work.

**Mutation and invalidation.** Loaded option objects remain mutable for
compatibility, but mutation is scoped to their owning Container. E3 records
actual mutation sites before proposing `readonly`, replacement APIs, or
resolved-template caching. E4 owns refresh/invalidation behavior; E5 owns
particle/group override and Retina semantics. No JSON-string cache keys or
unbounded high-cardinality caches.

**Compatibility.** Keep public derived option classes, `IOptionLoader.load()`,
and custom plugin/updater option hooks reachable. Type-only interfaces remain
type-only. Compile representative consumers before any signature change.

## ARCH-04 — Specialized capability registries, shared policy only

**Decision.** Keep specialized registry and execution APIs for plugins,
updaters, shapes, effects, interactions, modifiers, paths, presets, palettes,
easing, and color managers. Do not replace them with one universal hook
interface, runtime string switch, or general-purpose scheduler.

The current per-engine `PluginManager` is the composition owner. Registration
and loader state stay engine-scoped; Container instances and resources stay
container-scoped; per-particle mutable state stays particle-scoped. Immutable
definitions may be reused only when the API contract declares them immutable.
Existing init/update/draw/reset/dispose phases and ordering stay specialized.

**Common policy.** E3 will document identity, duplicate behavior, registration
window, async failure/retry, order, and lifetime per capability using the
existing manager. A typed descriptor may be added as metadata only if at least
two real capability families benefit without replacing their execution
contracts. Hot unload and automatic dependency sorting are outside v5 unless
the audit discovers an existing supported requirement.

**Rationale.** Existing APIs have materially different hooks and execution
costs. A common descriptor must not create empty methods, per-frame dispatch,
global scans, or type loss. E8 owns whole-ecosystem compatibility and two-engine
extension verification; E4 owns partial-init cleanup and disposal.

## E3 implementation and verification still required

- Complete the file-level review in `V5-ENGINE-AUDIT.md`, including public
  exports, consumers, shared state, dependency cost, decision, and evidence.
- Capture the current import graph, agree final internal paths, and enforce the
  boundary graph above without creating runtime cycles.
- Characterize option precedence, mutation sites, registration behavior, and
  extension hook order with current source/tests before changing implementation.
- Complete C0 decisions in `V5-COLOR-DECISIONS.md` and preserve the E0 color
  fixtures as the reference baseline.
- Rebuild the engine and representative downstream consumers after any moves;
  rerun public ESM/CJS/browser/type and custom plugin checks.
