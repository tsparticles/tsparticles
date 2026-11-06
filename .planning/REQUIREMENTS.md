# Requirements: tsParticles

**Defined:** auto-init
**Core Value:** Provide a small, high-performance, and extensible particle engine that developers can integrate into web projects with minimal configuration.

## v5 major requirements — planned 2026-11-03

These requirements supersede the auto-initialized backlog for current execution.
See [handover index](handovers/README.md) for dependencies and acceptance checks.
No v5 implementation or bundle baseline has been validated yet.

| ID      | Requirement                                                                                                            | Handover                | Status  |
| ------- | ---------------------------------------------------------------------------------------------------------------------- | ----------------------- | ------- |
| V5-ENG  | Explicit engine factory; no singleton; independent registries and lifecycle; consumers migrated                        | 01                      | Planned |
| V5-SVC  | Per-engine random/logger, helper/plugin chains and async errors; shared-state audit                                    | 02                      | Planned |
| V5-MOD  | Full engine/src review inventory; selective facades, boundaries and public plugin types                                | 03; closure 10          | Planned |
| V5-CTR  | Complete Container/events lifecycle review, deterministic tests and measured costs                                     | 04                      | Planned |
| V5-CAN  | Complete CanvasManager/RenderManager review with OffscreenCanvas/HDR preserved                                         | 05                      | Planned |
| V5-PMG  | Complete ParticlesManager/SpatialHashGrid review: collection, pool, groups, density, limits, buckets and update phases | 06                      | Planned |
| V5-PAR  | Complete Particle/Retina review: init, options, state, modifiers, lifecycle and per-particle costs                     | 07                      | Planned |
| V5-PLG  | Per-package impact audit of all extension families; multi-engine registration/runtime compatibility                    | 01/02 initial; 08 final | Planned |
| V5-BRW  | Browser/CDN bootstrap, namespaces, externals, lazy and multiple bundles without singleton                              | 01 initial; 09 final    | Planned |
| V5-LEG  | Retire obsolete framework integrations, deprecated compatibility APIs and browser support with negligible usage        | 09; closure 10          | Planned |
| V5-SIZE | Reproducible baseline/budgets, smaller minimal scene/slim in gzip/Brotli, total chunks accounted for                   | 01 baseline; 04–10      | Planned |
| V5-MIG  | Built-package, wrappers, CLI/MCP, demos, migration docs, translations and full validation                              | 01–10                   | Planned |

**V5-LEG scope and acceptance:** remove the Vue 2, Nuxt 2 and Nuxt 3 wrappers from
the v5 workspace and distribution, together with their demos, starter-template
variants, installer detection, package references, documentation and translations.
Remove public APIs explicitly marked `@deprecated` when a supported replacement is
documented, and update migration guidance. Review browser targets using Browserslist
data for the v5 release: drop targets older than the agreed 5–6 year window when
their usage share is negligible, and remove compatibility code needed only by those
targets. Record the share threshold and target list in handover 09 before changing
the shared browser configuration. Keep feature detection and fallbacks for optional
capabilities that remain in supported browsers (for example OffscreenCanvas); age
alone is not grounds to remove those. Validate package/workspace references and
browser bundles, and include the removals in the v5 migration notes and final gate.

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

Numeric budgets are set from a clean baseline before size refactoring; source line
counts and moved chunks do not satisfy V5-SIZE. See index for the comparison matrix.

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
