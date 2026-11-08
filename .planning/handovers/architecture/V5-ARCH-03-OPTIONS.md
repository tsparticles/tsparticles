# V5-ARCH-03 — Options pipeline and resolved configuration

Status pending evaluation. Owner 03 for contracts and audit, 07 for per-particle
cost, 04 for refresh/lifecycle, and 08 for extensions. Related to ARCH-01/02/04.

## Evidence and starting recommendation

`Options` and `ParticlesOptions` use classes and loaders. `OptionLoader.load()`
delegates to `doLoad()`, and `loadParticlesOptions()` creates a new instance
per call. `Options` retains PluginManager/Container and applies presets, palettes,
and plugin hooks. `Particle.resolveParticleOptions()` combines base data,
shape/effect selection, and overrides. Updaters also have `loadOptions` hooks.
Downstream packages extend option classes and `IOptionLoader`.

Investigate coupling between input, resolution, and runtime, as well as repeated
merges. Compare alternatives against existing defaults and typed loading.

## Models to compare

| Layer                  | Responsibility                                                   | Mutability and dependencies                                                   |
| ---------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Public input           | Partial values, shorthand, presets, and user-defined data        | Leave input intact and distinguish JS input from its JSON-serializable subset |
| Resolved configuration | Defaults, precedence, normalization, and extension options       | Stable snapshot per version, shareable only when immutable                    |
| Runtime state          | Sampled random values, animations, Retina, and dynamic overrides | Per owner or particle, with explicit services and separate mutable state      |

Separate responsibilities incrementally and retain useful loaders and adapters.
Compare optimized classes, typed normalization functions, and a hybrid with
resolved templates. DOM-independent resolution may help ARCH-02. Verify every
required hook's Container dependency before making that claim.

## Semantics to define before implementation

1. Use source and characterization tests to establish precedence among
   defaults, multiple/nested presets, palettes, input, groups, shapes/effects,
   per-particle overrides, themes, and hooks. Publish field-level conflict examples.
2. Define missing values, `undefined`/`null`, `false`, zero, ranges, arrays,
   shorthand, collection replacement/merge, unknown keys, and invalid input.
   Evaluate engine logger diagnostics during load, outside the frame.
3. Define missing/cyclic presets and unloaded capabilities. Use explicit
   errors or fallbacks and ensure termination.
4. Inventory mutations of `actualOptions` and `particle.options` across core,
   plugins, and applications. Keep them supported or migrate to explicit
   updates/overrides with replacement APIs and guidance. TypeScript `readonly`
   does not enforce deep immutability at runtime. Keep freezing out of the frame.
5. Separate range normalization from RNG sampling. A cache must preserve
   independent samples, sequence, and draw count unless an explicit tested
   decision changes them. Distinguish input, Retina, and coordinate units.

## Extensions, types, and schema

Evaluate ARCH-04 capability contributions to defaults and normalization with
explicit context, deterministic order, and ownership. Scope plugin options to
engines that register them. Compare existing augmentation with a typed
capability map while preserving specific option types and avoiding `any`.

Evaluate a shared source for types, defaults, normalization, schema, and docs.
The current schema is `engine/schema/options.schema.json`. Compare build-time
generation with opt-in runtime validation. Keep unnecessary schemas and heavy
validators out of the engine. Test schema drift, cases outside schema
expressiveness, and plugin options.

## Templates and invalidation

Use T1 from [IMP-05](../improvements/V5-IMP-05-PARTICLE-STATE.md). Normalize stable
data once and copy only mutable data. Define configuration identity/revision,
cache size and scope, and invalidation for refresh, theme, groups, overrides,
resize/Retina, and lifecycle-supported changes to plugin contributions. If
registration closes after init, document that constraint.

Avoid `JSON.stringify` keys in hot paths and sharing mutable classes with
Container/PluginManager references across particles or engines. Where free
mutation remains supported, invalidate reliably or bypass templates. Bound
caches for high-cardinality overrides.

## Experiments and acceptance

- Characterize precedence and boundary values before migration. Compare
  classes, functions, and hybrids with the same inputs, hooks, and RNG.
- Preserve input and avoid mutable aliasing across particles, groups, and
  engines. Verify refresh, theme, resize, and pool reuse avoid stale options.
- Compile consumers with derived option classes, `IOptionLoader.load()`, and
  custom updaters/plugins, or verify their intentional migration.
- Measure init/refresh, bulk creation, allocations/heap per particle,
  update/draw, and bundle size for minimal scenes, shared configurations,
  many overrides, and optional families present and absent.
- Verify schema, defaults, and diagnostics for cyclic presets, missing
  plugins, invalid input, and restoration of configuration tied to snapshots.

Record pipeline and precedence, ARCH-03 decision, mutability and invalidation
contract, measurements, and migration. Justify class changes by measured or
contract benefits and account for cost shifted into the frame.
