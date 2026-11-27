# V5 E3 contract and boundary verification

Status: **verified for E3** (2026-11-17). This closes E3's shared-contract,
logical-boundary, public-import and C0-decision gates. Runtime lifecycle,
Particle/color implementation, and package extraction remain owned by E4–E9.

## Domain graph

```text
Types / Enums / pure Utils / Options interfaces
                    ↓
            Options loaders
                    ↓
 Engine registration → Container lifecycle → Particle and collections
                    ↓                    ↓
          Canvas ownership       Rendering and browser adapters
                    ↓                    ↓
            public root entrypoint composes runtime values and types
```

Internal Core code uses direct sibling imports. The five selective type barrels
are intended for the public type aggregation; Core modules may not import the
engine entrypoints or re-import a Core domain barrel. The engine remains one
package with only `.` and `./lazy` public runtime subpaths. `package.json#exports`
blocks deep imports.

## Public and internal surface

| Surface                      | Decision                                                                                                                               | Verification                                                                    |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `@tsparticles/engine`        | Runtime API and explicitly listed runtime utilities; implementation classes remain type-only unless already required as runtime values | ESM, CJS, browser-condition and declaration builds passed                       |
| `@tsparticles/engine/lazy`   | Supported lazy runtime entry                                                                                                           | ESM and CJS smoke imports passed                                                |
| Core domain barrels          | Selective type exports for the root type aggregation; not package subpaths                                                             | Engine type build passed; boundary rule forbids internal barrel back-edges      |
| `@tsparticles/engine/Core/*` | Unsupported consumer deep import                                                                                                       | Node package self-reference probe rejected with `ERR_PACKAGE_PATH_NOT_EXPORTED` |
| Removed public symbols       | None in E3                                                                                                                             | Public consumer fixture compiles against root exports                           |

The consumer fixture in `utils/tests/src/tests/PublicEngineContracts.ts` uses
`IOptionLoader`, a derived `AnimationOptions`, `CustomEventListener`, `IPlugin`,
and the engine root. It exercises a custom loader and plugin at runtime.

## Options contract and mutation inventory

| Area                     | Current behavior retained for v5                                                                                                                   | Ownership / follow-up                                             |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Input and loaded options | `ISourceOptions` and `RecursivePartial` describe input; `Options` and `ParticlesOptions` are mutable loaded objects scoped to the owning Container | E4 refresh/invalidation; E5 particle/group/Retina semantics       |
| Primitive values         | `undefined` is ignored; `null` is a no-op in `OptionLoader`; `false` and `0` are loaded values                                                     | Preserve during E4/E5                                             |
| Object fields            | Existing `deepExtend` behavior merges nested records and preserves extension keys                                                                  | Characterization coverage in `OptionsLoad`; no cache/freeze in E3 |
| Groups                   | Group entries merge into the per-container group object                                                                                            | E5; no shared resolved template                                   |
| Paint                    | Existing single/list conversion and replacement behavior is preserved                                                                              | E5 color/output integration                                       |
| Hook order               | Presets/palettes are resolved by the owning engine before source fields; plugin and updater option hooks run in registration order                 | E4/E5 integration tests                                           |
| Mutation sites           | Public option instances and their nested fields are mutable; plugin/updater hooks can mutate their owning container's loaded instances             | No cross-container sharing or readonly migration in E3            |

No JSON serialization cache, shared mutable option template, or global option
registry is introduced. `OptionsLoad` and `PluginOptions` remain the behavioral
characterization suites; the E3 consumer fixture verifies public extension
types compile through the published root surface.

## Registration and capability policy

| Capability                | Identity / duplicate policy                                                                                          | Registration window and lifetime                                                    |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Plugin loaders            | `Set` identity deduplicates the same loader function; failed loaders are removed from the executed set and may retry | Queue before init; loaders may register nested loaders while running; engine-scoped |
| Plugins                   | `id` deduplicates; first registered plugin wins                                                                      | Added only while a registered loader is executing; engine-scoped                    |
| Color managers            | Map key replacement                                                                                                  | Before engine initialization; engine-scoped                                         |
| Easing functions          | Existing key is retained; duplicate add is ignored                                                                   | Before initialization; engine-scoped                                                |
| Effects, shapes, updaters | Map key replacement; each family retains its specialized initializer type                                            | Before initialization; engine-scoped                                                |
| Palettes                  | Map key replacement                                                                                                  | Before initialization; engine-scoped                                                |
| Presets                   | Existing key is retained unless `override` is true                                                                   | Before initialization; engine-scoped                                                |
| Configs                   | Key is `key`, then `name`, then `default`; same key replaces                                                         | Before initialization; engine-scoped                                                |

Execution remains specialized by capability. There is no universal per-frame
descriptor, dependency sorter, hot-unload API, or cross-engine registry. Mutable
registries are engine-owned; Container instances/resources are Container-owned;
particle state is particle-owned. E4 closes partial initialization and disposal.

## Color C0 evidence

C0 is a contract checkpoint, not the OKLCH implementation. `V5-COLOR-DECISIONS.md`
records normalized OKLCH units, independent alpha, legacy input compatibility,
shortest-path hue animation, rectangular OKLab mixing, gamut/output policy and
HDR separation. The E0 `color-matrix.json`, `color-reference.png`, HDR and browser
captures are retained as the compatibility baseline. They are not treated as
independent OKLCH conversion vectors; C1 must add those before conversion code
lands. C2/C3 must add current input precedence and random-call characterization
before changing animation or manager signatures.

## Boundary and package probes

Command results are recorded in [the E3 verification log](evidence/e3/verification.txt).

- `@tsparticles/engine` ESM and CJS root imports passed.
- `@tsparticles/engine/lazy` ESM and CJS imports passed.
- `--conditions=browser` root import passed.
- Consumer deep import was rejected by package exports.
- `engine:build:ci` passed (20 Nx tasks, including TypeScript targets, cycle check,
  and bundle generation).
- The dependency rule rejects Core-to-entrypoint and Core-to-domain-barrel edges;
  the checkpoint's forbidden Core-to-root probe was rejected and removed.
- E3 adds no runtime API or package subpath. Current Rollup measurements are
  retained in `evidence/e3/bundle-sizes.json`; against the 2026-11-14 E1 record,
  factory, initialization and minimal consumer gzip are +534, +531 and +609
  bytes, and the engine minified distribution gzip is +1,811 bytes. The E2
  interim report attributed +273 gzip bytes to service isolation. The remaining
  cumulative delta is not an E3-only measurement: the comparison revisions are
  three days apart and E3 changes only source locations/import paths and type
  aggregation, while E2 runtime work is already present. E9 owns the matched
  final distribution comparison; E3's no-package-split decision adds no
  distribution surface or runtime definitions.

## Assigned work still open after E3

The file inventory in `V5-ENGINE-AUDIT.md` covers all `engine/src` files and is
kept synchronized with the logical moves. Detailed implementation review stays
with each later owner: lifecycle/disposal (E4), canvas/rendering and color output
(E5), collections/spatial behavior (E6), Particle/Retina (E5), ecosystem closure
(E8), and package/subpath measurement (E9). E3 does not accept those later-stage
runtime contracts or color rollout gates.
