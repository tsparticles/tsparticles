# Requirements: tsParticles

**Defined:** auto-init
**Core Value:** Provide a small, high-performance, and extensible particle engine that developers can integrate into web projects with minimal configuration.

## v5 major requirements — planned 2026-11-03

These requirements supersede the auto-initialized backlog for current execution.
See the [E0–E12 execution sequence and optional E13 backlog](handovers/V5-EXECUTION.md) for order and
dependencies and the [handover index](handovers/README.md) for acceptance checks.
The table below uses stable technical handover IDs, not execution stages.
The branch carries package version `4.6.0` as the source base for the v5 major.
E0–E10 are accepted for progression as of 2026-11-27. E11 and E12 remain planned
follow-up gates; release readiness is not established.

| ID       | Requirement                                                                                                            | Handover                               | Status                                                                      |
| -------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | --------------------------------------------------------------------------- |
| V5-ENG   | Explicit engine factory; no singleton; independent registries and lifecycle; consumers migrated                        | 01                                     | Accepted (E1/E10)                                                           |
| V5-SVC   | Per-engine random/logger, helper/plugin chains and async errors; shared-state audit                                    | 02                                     | Accepted (E2/E10)                                                           |
| V5-MOD   | Full engine/src review inventory; selective facades, boundaries and public plugin types                                | 03; closure 10                         | Accepted (E3/E10)                                                           |
| V5-CTR   | Complete Container/events lifecycle review, deterministic tests and measured costs                                     | 04                                     | Accepted (E4)                                                               |
| V5-CAN   | Complete CanvasManager/RenderManager review with OffscreenCanvas/HDR preserved                                         | 05                                     | Accepted (E5/E7/E10); physical HDR queued for final plan validation         |
| V5-PMG   | Complete ParticlesManager/SpatialHashGrid review: collection, pool, groups, density, limits, buckets and update phases | 06                                     | Accepted (E6)                                                               |
| V5-PAR   | Complete Particle/Retina review: init, options, state, modifiers, lifecycle and per-particle costs                     | 07                                     | Accepted (E7)                                                               |
| V5-PLG   | Per-package impact audit of all extension families; multi-engine registration/runtime compatibility                    | 01/02 initial; 08 final                | Accepted (E8)                                                               |
| V5-BRW   | Browser/CDN bootstrap, namespaces, externals, lazy and multiple bundles without singleton                              | 01 initial; 09 final                   | Accepted (E9/E10)                                                           |
| V5-LEG   | Retire obsolete framework integrations, deprecated compatibility APIs and browser support with negligible usage        | 09 scope E0; cleanup E1–E9; closure 10 | Accepted (E10); retained opt-in PJS and Stencil v4 surfaces documented      |
| V5-SIZE  | Reproducible gzip/Brotli baseline, all chunks accounted for, justified growth and demonstrated waste removed           | 01 baseline E0; 04–10                  | E10 size review complete                                                    |
| V5-ARCH  | Evaluate Particle state and serialization, engine packages, option resolution, and extension architecture              | 03/06–09, closure 10                   | Accepted (E10)                                                              |
| V5-COLOR | Adopt canonical OKLCH and h/c/l animation, with verified input compatibility, gamut, alpha, and HDR                    | 03/05/07–10                            | Accepted (E10); physical HDR queued for final plan validation               |
| V5-MIG   | Built-package, wrappers, CLI/MCP, demos, migration docs, translations and full validation                              | 01–10                                  | Accepted (E10); human translation sign-off queued for final plan validation |

At the user's direction, physical HDR verification and human-language sign-off
for the nine migration drafts are final-plan validation items. This records a
deferral, not test results or sign-off that have already been completed. E10
does not authorize release or publication. E11/E12 and any separately scoped
pre-release verification remain follow-up work.

**V5-LEG scope and acceptance:** remove the Vue 2, Nuxt 2 and Nuxt 3 wrappers from
the v5 workspace and distribution, together with their demos, starter-template
variants, installer detection, package references, documentation and translations.
Remove public APIs explicitly marked `@deprecated` when a supported replacement is
documented, and update migration guidance. Review browser targets using Browserslist
data for the v5 release: drop targets older than the agreed 5–6 year window when
their usage share is negligible, and remove compatibility code needed only by those
targets. Record the share threshold and target list under handover 09 in E0 before changing
the shared browser configuration. Keep feature detection and fallbacks for optional
capabilities that remain in supported browsers (for example OffscreenCanvas); age
alone is not grounds to remove those. Validate package/workspace references and
browser bundles, and include the removals in the v5 migration notes and final gate.
E10's recorded retirement disposition retains the opt-in PJS compatibility adapter
and Stencil v4's upstream-generated loader declaration because they are supported
compatibility surfaces with documented migration paths; they are not treated as
unowned removals. The deprecated Confetti, Ribbons, and color-formatting APIs were
removed.

Additional planning requirement (2026-11-06): **V5-ARCH** — evaluate Particle
state/serialization (06/07), engine package boundaries (03/09), options resolution
(03/07/08) and a common extension architecture (03/08). Compare alternatives and
record decisions, evidence and migration impact; closure in 10. Status: Planned.
See [architecture plan](handovers/V5-ARCHITECTURE.md). Evaluation is required;
splitting packages, serializing the entire runtime and rewriting all extension
families are not predetermined implementation requirements.

Additional requirement (2026-11-06): **V5-COLOR** — make `IOklch` and h/c/l
animations the canonical particle color model; preserve existing color-manager
input formats, floating-point precision and wide gamut until output; define
explicit conversion, gamut mapping, alpha, legacy-animation migration and separate
P3/HDR capabilities. Contracts in 03, implementation in 05/07/08, distribution in
09 and numerical/browser/performance gates in 10. Status: Planned. See the
[detailed color plan](handovers/V5-COLORS-OKLCH.md). This is a v5 requirement,
not merely an optional performance experiment.

The E0 numeric size ceilings remain diagnostic references. E10 accepts justified
payload growth and requires fixing demonstrated avoidable retention or duplication.
The existing runtime, allocation and retention criteria continue to apply.
See [the E10 acceptance criteria](handovers/V5-10-SIZE-MIGRATION-RELEASE.md#e10-acceptance-criteria-update--2026-11-24).

### Source-review acceptance clarification — 2026-11-13

[G1–G7](handovers/V5-CODE-REVIEW.md) refine the existing requirements, without
asserting that implementations or tests are complete: G1 supports ENG/SVC/PLG;
G2/G3/G7 support ENG/CTR/ARCH/PLG/MIG; G4/G6 support SVC/PAR/PLG; G5 supports
PMG/PLG. Record outcomes under their owning stages and close them in E10.
[Optional E13](handovers/V5-13-OPTIONAL-PLUGINS.md) is not a new mandatory release
requirement. New plugins are conditional proposals, not assumed missing features.

## Historical v1 Requirements (auto-initialized, not revalidated)

### Developer Experience

- [ ] **DEV-01**: Scripts to install and build the workspace work with `pnpm` (`pnpm i`, `pnpm run build`) on a developer machine with Node 18+.
- [ ] **DEV-02**: Developer quickstart: `demo/vanilla` runs locally with a single command and clear README.

### Stability & CI

- [ ] **CI-01**: CI pipeline builds all packages and runs tests (`pnpm run build:ci` succeeds in CI).
- [ ] **CI-02**: Lint and format checks are enforced in pre-commit hooks (husky) and CI.

### Performance

- [ ] **PERF-01**: Particle update loop reduces per-frame heap allocations in the hot path by refactoring one identified example in `engine/src/Utils/`.
- [ ] **PERF-02**: Add a simple benchmark that measures updates per second for a configurable particle count.

### Documentation

- [ ] **DOC-01**: Typedoc-generated API docs are buildable (`pnpm run build:docs`) and published locally for reviewers.
- [ ] **DOC-02**: Add at least 2 end-to-end demo examples in `demo/vanilla` showcasing core plugin usage.

## Historical v2 Requirements

- **DX-01**: Starter templates for common frameworks (React, Vue) demonstrating integration.

## Out of Scope

| Feature                 | Reason                                             |
| ----------------------- | -------------------------------------------------- |
| Native mobile SDKs      | Web-first focus for initial roadmap                |
| Paid plugin marketplace | Commercialization beyond initial open-source scope |

## Historical traceability

| Requirement | Phase   | Status  |
| ----------- | ------- | ------- |
| DEV-01      | Phase 1 | Pending |
| DEV-02      | Phase 1 | Pending |
| CI-01       | Phase 1 | Pending |
| CI-02       | Phase 1 | Pending |
| PERF-01     | Phase 2 | Pending |
| PERF-02     | Phase 2 | Pending |
| DOC-01      | Phase 1 | Pending |
| DOC-02      | Phase 1 | Pending |

---

_Requirements defined: auto-init_
