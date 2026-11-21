# V5 — Dependency-driven implementation sequence

Replanned on 2026-11-13. E0–E4 are complete; E5–E10 remain pending. This is the
execution order; the existing handover numbers 01–10 identify areas of ownership,
not chronological steps. Keep their filenames and links stable. Their detailed
scope and acceptance checks still apply. This sequence replaces the earlier
linear 01 → 10 schedule.

## Ordering rationale

The first runtime change is explicit engine creation. Registration, wrappers,
services, async work, and browser bootstrap all need an unambiguous engine owner.
Service isolation follows immediately: two factory instances alone do not provide
independent runtimes. Do not combine this migration with folder moves or color work.

After ownership is stable, settle shared contracts before changing lifecycle and
particle representation. Establish Particle/options/reset invariants before
optimizing the collections that store and recycle those objects. Implement the
required color behavior before tuning rendering caches and batching, otherwise
those optimizations would target the outgoing HSL model. Distribution must work
throughout; its final size/composition work comes after the runtime graph settles.

Difficulty estimates are relative engineering assessments, not delivery dates.
High impact means many consumers must migrate together; high difficulty can also
come from local numerical, lifecycle, or ordering correctness. Smaller independent
changes should remain separate even when they belong to the same stage.

## Source review additions

The [source-based coverage review](V5-CODE-REVIEW.md) adds G1–G7 to the existing
stages: non-core registries, extension disposal, async failure boundaries, clock
and numeric domains, spatial snapshots, sampling and public lifetime/mutability.
Capture these rows in E0 and close them with their owning stage. Existing tests
and optimizations cited in the review remain regression requirements.

The mandatory sequence still ends at E10. [E11](V5-11-OPTIONAL-PLUGINS.md) is an
optional follow-up for measured plugin improvements after E10; it does not defer
mandatory fixes or make new plugins a release prerequisite.

## Stages and exit gates

Follow E0–E10 in order. Within each stage, use the subdivisions below. A gate is
complete only with its evidence and the shared checks in the [index](README.md).

| Stage | Deliverable                                                 | Difficulty  | Impact                                     | Technical handovers                         | Exit gate                                                                                             |
| ----- | ----------------------------------------------------------- | ----------- | ------------------------------------------ | ------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| E0    | Baseline, inventories, supported-consumer scope             | Medium      | Workspace-wide planning                    | 01, 03, 08, 09; IMP-01                      | Reproducible baseline, numeric budgets, owner matrices, retirement list and browser policy recorded   |
| E1    | Explicit engines and migration of supported consumers       | High        | Workspace-wide API and distribution        | 01; early 08/09                             | No implicit engine; working package/CDN consumers; independent registries and resource ownership      |
| E2    | Engine-owned services and mutable-state isolation           | High        | Utilities, plugins, async paths            | 02; ongoing 08                              | Independent RNG/loggers; scheduler/cache disposition and deterministic multi-engine checks            |
| E3    | Shared contracts and domain boundaries                      | High        | Public types, options, extensions, imports | 03; ARCH-01–04; C0                          | Recorded decisions, representative typed consumers, acyclic boundaries and color contract             |
| E4    | Container lifecycle and extension integration               | High        | Init, refresh, events, cleanup             | 04; ARCH-03/04; lifecycle part of IMP-06    | Stable hook order, cancellation, ownership and refresh/reset behavior                                 |
| E5    | Particle/options model and complete OKLCH migration         | Very high   | Particle, all color consumers, canvas/HDR  | 07 + color portions of 05/08; C1–C4; IMP-05 | One canonical color model; all affected consumers migrated; numerical, animation and browser evidence |
| E6    | Collections, pooling, update phases and spatial index       | High        | Simulation and interaction families        | 06; IMP-03/04                               | Preserved order/reset/query semantics and measured improvements on the final particle model           |
| E7    | Rendering and remaining canvas optimizations                | High        | Draw pipeline, layers, capabilities        | Remaining 05; rendering part of IMP-06      | Complete canvas review; verified visual parity, resource cleanup and measured runtime/size effects    |
| E8    | Complete ecosystem compatibility audit                      | Medium–high | Every extension and integration            | 08                                          | Per-package outcomes; external custom consumers and multi-engine integration verified                 |
| E9    | Final package composition, distribution and support cleanup | High        | Package exports, bundles, CDN, tooling     | 09; ARCH-02; IMP-02; C5 distribution        | Built/installed consumers, bundler matrix, total payloads and retirement closure verified             |
| E10   | Release readiness and migration gate                        | Medium–high | Entire release                             | 10; IMP-01; C5 closure                      | All requirements, budgets, docs and CI gates closed; no implicit release authorization                |

### E0 — Prepare evidence without changing the runtime

1. Capture the actual revision, diff, toolchain and reproducible bundle/runtime
   scenarios before any removal. Include the pending V4-S01 measurements and
   color/visual fixtures. Define budgets using IMP-01 and the index.
2. Start the full engine inventory from 03 and package/consumer inventories from
   08/09 now. Assign review owners; do not claim complete analysis yet.
3. Classify retained and retired integrations. Vue 2, Nuxt 2 and Nuxt 3 are
   already in the retirement scope. Record deprecated APIs and replacements;
   decide their removal stage before migrating consumers. Record Browserslist
   data, targets and usage threshold before relying on a reduced support policy.
4. Outline factory, loader, wrapper ownership and browser bootstrap contracts
   needed by E1. Defer broad Particle/options redesign to E3.

Gate: the baseline is reproducible and the migration scope is explicit. Missing
measurements remain blockers, not assumed savings. E0 is preparation, not a
replacement for the mandatory full-engine review in later stages.

### E1–E2 — Establish ownership before redesign

In E1, implement factory/entrypoints and migrate supported wrappers, convenience
bundles, loaders, CLI/MCP generation and examples in cohesive changes. Remove
retired integrations with their references and migration guidance in a separate
change after E0, before spending effort adapting them to the factory. Remove
other deprecated APIs with the stage that changes their owning contract.

Keep every completed change buildable; propagate affected signatures and package
manifests with the implementation. Browser bootstrap and installed-consumer smoke
checks belong here, even though distribution optimization is E9.

In E2, choose the context-passing convention first, then migrate RNG/logger helper
chains and asynchronous callers. Classify scheduler state, plugin caches and
browser-resource caches separately. E1 is an intermediate state: document shared
services until E2 passes. Do not advertise complete isolation at the E1 gate.

### E3 — Decide contracts, then organize code

1. Evaluate ARCH-01/03/04 together: Particle state and optional snapshots,
   input/resolved/runtime options, extension registration, capabilities and
   lifecycle. Use small typed prototypes and representative plugin consumers.
   Mandatory evaluation does not mandate serialization or a unified runtime.
2. Complete C0 decisions for color units, alpha, h/c/l, input compatibility,
   gamut/output capabilities and HDR. Establish reset/ownership contracts for
   E5/E6 and resource/lifecycle contracts for E4/E7. Unresolved HDR blocks the
   affected color rollout.
3. Evaluate ARCH-02 and record logical domains and candidate selective subpaths.
   Apply justified internal moves/import rules in mechanical changes separate
   from behavior changes. Keep algorithms unchanged in those changes.
4. Defer physical package extraction and final export/bundle tuning to E9 unless
   a demonstrated consumer need makes an earlier extraction necessary. Record
   that dependency explicitly before changing the sequence.

Gate: contracts have decisions and validation evidence, not just interface
sketches. If later evidence changes a contract, reopen its decision and migrate
consumers before closing the dependent stage.

### E4 — Stabilize lifecycle

Apply selected options/extension contracts to Container init, refresh and teardown.
Verify cancellation and frame scheduling, plugin hook order, events, worker paths,
canvas ownership and cross-engine isolation. Adapt Particle/canvas signatures only
as needed here; leave their full review to E5/E7. This provides a stable lifecycle
for subsequent model changes.

### E5 — Deliver the model and color change as coherent increments

Scope: OKLCH is the canonical model for all resolved engine/extension colors,
not just particles. Follow the [boundary rules and closure inventory](V5-COLORS-OKLCH.md#e5-scope-clarification--2026-11-21).
Use direct CSS `oklch(...)` as the default supported output, including P3
canvases. Follow the [output implementation rules](V5-COLORS-OKLCH.md#output-rule-for-implementers);
manual RGB output needs a documented fallback/API/HDR requirement. Complete
unresolved runtime RGB/HSL state and the native manager contract here, before
E6–E10.

Agent starting point: use the [E5 entry checklist](V5-E5-STATUS.md#agent-entry-checklist)
and its implementation tasks. Historical checkpoint results do not waive these
requirements; all existing lifecycle and performance gates also remain open
until verified.

1. **E5a: Particle and options foundations (07).** Apply selected ARCH-01/03
   decisions to initialization, precedence, mutable state, Retina and reset.
   Verify against the existing manager/pool. Keep pool algorithms unchanged.
   Establish color-facing types with the C0 contract; do not propagate incomplete
   breaking signatures into a buildable checkpoint.
2. **E5b: Pure color math (C1, 03/05).** Add verified conversions/types and
   independent reference fixtures. These may be additive before switching callers.
3. **E5c: Canonical runtime and output (C2/C3, 05/07/08).** Switch manager outputs,
   Particle state/options, paint/gradient, modifiers and output adapters together
   with all directly affected consumers. Cover static output first, then animation
   and HDR/gamut behavior. Use small additive preparations where possible; a
   signature switch and its required consumer changes form one buildable increment.
   Do not leave persistent HSL and OKLCH particle models as a migration shortcut.
4. **E5d: Consumer closure and state costs (C4, 07/08).** Complete links, bubble,
   caches, backgrounds, hidden surfaces, images/SVG, custom managers, schema,
   generators and migration examples. Evaluate IMP-05 on the resulting state,
   rather than optimizing state that the color migration will replace.

C2 and C3 are coupled at the integration boundary; static rendering does not mean
C2 is complete while manager/Particle signatures are incompatible. E5 must close
C1–C4 with numerical, deterministic tick and real-browser evidence. Later E8 is
independent audit coverage, not the first opportunity to repair color consumers.

### E6–E7 — Optimize stable simulation and rendering contracts

In E6, review all of ParticlesManager and SpatialHashGrid. Separate collection/
counts/removal changes, pool policy, update ordering and spatial-query experiments.
Use E5 reset/state contracts and test interaction consumers with each change.
Avoid combining an index replacement with a change to particle representation.

In E7, complete the full CanvasManager/RenderManager review, including areas not
changed by OKLCH. Tune hooks, layers, styles, caches, intermediate surfaces and
optional capabilities against final color/state and update-order semantics.
Recheck resize/Retina, cleanup, custom updater identity, export and worker paths.
Performance candidates require evidence; retaining current code is valid.

### E8–E10 — Verify coverage, delivery and release readiness

E8 closes the matrix maintained since E0, including unchanged packages and
representative external option loaders, derived classes and custom extensions.
E9 verifies final package boundaries, optional features, lazy/standalone/external
composition and all supported bundlers. Recheck legacy retirement across workspace,
installers, docs/translations and shipped artifacts; do not wait until E9 to define
which consumers or browsers earlier stages must support.

E10 compares final artifacts with E0 using the same scenarios, closes audit and
decision logs, runs the prescribed CI checks and validates the migration guide.
Missed mandatory budgets, unsupported evidence or unresolved requirements keep the
gate open. Versioning, commits and publication follow their separate authorization.

### E11 — Optional plugin improvements after E10

Select candidates from [the optional backlog](V5-11-OPTIONAL-PLUGINS.md) using the
verified E10 baseline. Initial priorities are links/triangles, external interaction
allocations and movement/absorber/emitter calculations, followed by profiling of
noise, masks, fluid, assets and remaining extensions. Each item has difficulty,
impact, source evidence and acceptance constraints. Implement only measured wins;
new capability packages need a separate demonstrated consumer benefit.

## Rules shared by every stage

- Migrate affected plugins, wrappers, manifests, tests and examples with each
  breaking change. Handovers 08/09 are continuous responsibilities plus final gates.
- Update the engine/package matrices, decision logs, migration guide and measured
  deltas at every checkpoint. Compare both with E0 and the immediately preceding
  verified checkpoint; handover numbers no longer identify measurement baselines.
- Separate mechanical moves, behavior changes and performance experiments so that
  regression causes and size effects remain attributable.
- Apply the index verification requirements to each runtime checkpoint. Full-engine
  source coverage, architecture evaluations, all IMP candidates and C0–C5 remain
  mandatory; no item is dropped by changing its execution stage.
- Keep required migrations separate from conditional optimizations. A rejected
  optimization needs evidence; an unimplemented mandatory requirement remains open.

## Progress

- [x] E0 — Baseline and scope — see [completed evidence and limitations](V5-BUNDLE-REPORT.md)
- [x] E1 — Explicit engines — factory, supported consumers, browser bootstrap and package checks accepted; M6 budget exceedance carried to E10
- [x] E2 — Isolated services — engine ownership, consumer migration, entrypoints and tests accepted; see [E2 evidence](V5-02-ENGINE-SERVICES.md)
- [x] E3 — Contracts and boundaries — decisions, consumer probes, boundary rules and C0 recorded in [E3 verification](V5-E3-VERIFICATION.md)
- [x] E4 — Lifecycle — lifecycle regressions, compressed sizes, matched headless timing and forced-GC retention pass; M6/500 and M8/500 p95 exceedances carried to E10 ([status](evidence/e4/measurement-status.md))
- [ ] E5 — Particle/options and OKLCH — in progress; see [checkpoint](V5-E5-STATUS.md)
- [ ] E6 — Collections and spatial index
- [ ] E7 — Rendering optimization and review closure
- [ ] E8 — Ecosystem audit closure
- [ ] E9 — Distribution and support closure
- [ ] E10 — Release readiness

Next action: complete the canonical-manager contract and per-file color-boundary
inventory in the E5 scope clarification, alongside Particle lifecycle/consumer
closure and the remaining supported-syntax, schema and custom-manager audit
listed in the
[E5 checkpoint](V5-E5-STATUS.md). Independent cusp references and sRGB/P3
browser pixel readback now pass, including extended Display-P3 float16 values;
HDR luminance/tone-mapping conformance and particle cost measurements remain
open. Group color precedence and delayed SVG completion after reuse cases have
regressions. Split destroy offsets and Fireworks split chroma now use canonical
OKLCH h/c/l units, with a passing split-offset regression. E4 timing budget
follow-up remains recorded for E10; later-stage
source reviews remain assigned in the engine audit.
E1 factory and explicit wrapper ownership are accepted; the final suite passes
23 projects / 1,099 tests, separate CDN copies pass real-browser isolation and
canvas reuse checks, the Web Components demo renders in Chrome, and Webpack
standalone/external composition checks pass. E2 services are also accepted.
The M6 frame-p95 exceedance remains an explicit E10 budget item.
See [the current implementation checkpoint](V5-E1-ENGINE.md).
See [the retirement checkpoint](V5-E1-RETIREMENT.md),
[decisions](V5-DECISIONS.md), [engine audit](V5-ENGINE-AUDIT.md),
[plugin audit](V5-PLUGIN-AUDIT.md) and [consumer matrix](V5-MIGRATION-MATRIX.md).

Optional follow-up (not part of E10 completion):

- [ ] E11 — Select, profile and evaluate plugin improvements if pursued.
