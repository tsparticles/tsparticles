# ROADMAP: tsParticles

## Overview

| #   | Phase                                                                                                                         | Version       | Goal        |
| --- | ----------------------------------------------------------------------------------------------------------------------------- | ------------- | ----------- |
| 1   | GIF Shape, Background Canvas, BgMask Dynamic, Draw Layer System, Particle Modifier, HDR Precision                             | 4.3.0         | ✅ Released |
| 2   | HDR Color Fix & Rendering Modes, Code Review Fixes                                                                            | 4.4.0         | ✅ Released |
| 3   | Fluid Particle Interaction, MCP `generate_code` tool, Emitter Draw/Drag, Absorber Split, Error Codes, Workspace Test Coverage | 4.5.0 / 4.5.1 | ✅ Released |
| 4   | Close the v4 review findings and verify package, browser, and integration contracts                                           | 4.6.0         | ✅ Released |

## v4.6.0 release and follow-up

The 4.6.0 release is included in `v5` through merge `201b8e8d33` from `main`.
Collect the pending V4-S01 Rollup baseline and CDN engine-plus-feature
measurements with the [v5 baseline](handovers/README.md#required-baseline-before-the-first-runtime-change).
V4-S03 remains deferred pending cold first-use and standalone All measurements.

## Current execution — v5 major

Status on 2026-11-27: E0–E11 accepted for progression; physical HDR and translation sign-off are queued for final plan validation at the user's direction. See [E7 acceptance](handovers/evidence/e7/closure/README.md), with user-approved final absolute-budget checks in E10. E5 includes the user-approved
M4/500 runtime exception with final E10 verification, alongside the earlier
bundle-growth exception. See [E5 acceptance](handovers/evidence/e5/closure/README.md).

**Status.** E0–E11 accepted on branch `v5`, with package version `4.6.0`.
The size review is complete under the user's updated
criterion. Runtime verification retains priority. See the
[E10 acceptance update](handovers/V5-10-SIZE-MIGRATION-RELEASE.md#e10-acceptance-criteria-update--2026-11-24).

Use the [dependency-driven E0–E12 sequence and optional E13 backlog](handovers/V5-EXECUTION.md).
These are the currently scoped gates, not full v5 release readiness. E10 does
not authorize a release. The user will run physical HDR and language reviews at
the end of the full plan; these are tracked as final validations, not blockers to
E11/E12. Additional pre-release verification still needs its own scope and plan.
The planned E11/E12 follow-ups and optional E13 backlog below extend the roadmap
after E10. Handover filenames retain their topic IDs; they are not chronological.

1. **E0:** capture baseline/budgets, inventory consumers, define retirement and browser scope.
2. **E1:** remove singleton, migrate supported consumers and working browser bootstrap.
3. **E2:** isolate RNG/loggers and audit scheduler/caches per engine.
4. **E3:** decide Particle/options/extensions/color contracts, then establish internal boundaries.
5. **E4:** stabilize Container lifecycle, refresh, cancellation and hooks.
6. **E5:** implement Particle/options and OKLCH end to end, including affected plugins/output.
7. **E6:** review and optimize collections, pooling, update phases and spatial indexing.
8. **E7:** complete canvas review and optimize rendering against the final model.
9. **E8:** close ecosystem compatibility coverage accumulated throughout implementation.
10. **E9:** finalize packaging/CDN/lazy composition and verify legacy cleanup.
11. **E10:** close currently specified budgets, verification, and migration documentation.

The sequence includes difficulty, impact and exit gates. [Architecture evaluations](handovers/V5-ARCHITECTURE.md)
feed E3 contracts; [OKLCH C1–C4](handovers/V5-COLORS-OKLCH.md) form the coordinated E5
migration. [Performance candidates](handovers/V5-IMPROVEMENTS.md) require measured
benefits on stable contracts. Existing handover acceptance checks remain required.

Vue 2, Nuxt 2 and Nuxt 3 retirement is scoped in E0 and performed before migrating
retained integrations in E1. Remove deprecated APIs with their owning contract
changes. Record browser targets and usage threshold in E0 before removing support;
preserve fallbacks required by supported browsers. E9/E10 verify all workspace,
package, installer, template, documentation and translation cleanup.

The [source-based coverage review](handovers/V5-CODE-REVIEW.md) adds explicit
G1–G7 checks to the relevant E1–E8 stages, closed in E8. It covers resource
ownership, async failures, timing/numeric domains, spatial snapshots and sampling.

After E10, additional pre-release verification must first be scoped and planned.

### Follow-up work after E10

These are named work plans, not completed gates or permission to release. Keep
them on the v5 roadmap after E10 and define acceptance/status evidence as work is
scheduled. E11 is complete, E12 is planned, and E13 remains optional.

1. **E11 — Engine-owned utilities and configuration** — complete. Random,
   logger and color-manager configuration/lookup belong to each engine;
   ambient fallbacks and the legacy color-manager adapter are removed. See
   [E11 plan](handovers/V5-11-ENGINE-OWNED-UTILITIES.md).
2. **E12 — Engine-independent extensions** — planned. Introduce
   `@tsparticles/core` for extension-facing contracts and shared utilities;
   migrate extension packages to depend on `core`, leaving direct engine
   dependencies for bundles, wrappers and their demos. See
   [E12 plan](handovers/V5-12-ENGINE-INDEPENDENT-EXTENSIONS.md).
3. **E13 — Optional plugin improvements** — optional, measurement-led backlog;
   it does not replace mandatory fixes or block E10. Coordinate its timing with
   the separately scoped pre-release verification. See
   [E13 plan](handovers/V5-13-OPTIONAL-PLUGINS.md).

Separately, additional pre-release verification must be scoped and agreed after
E10. Completing E10, E11, E12, or optional E13 alone does not authorize a release.

No release or publication is part of the current E0–E13 roadmap. Historical
fluid references to “v5” below identify a solver-plan revision, not this product
major release.

## Phase Details — released 4.x history

### Phase 2: HDR Color Fix & Rendering Modes (4.4.0)

**Status:** ✅ Released.

- HDR color fidelity fixes: tone mapping, linear-space mixing, configurable `peakNits`, display listeners, `hdrMode` presets (`natural`/`vivid`/`cinematic`/`dynamic`).
- Code review fixes from the wrapper audit (implemented).

### Phase 3: Fluid Particle Interaction, MCP `generate_code`, Emitter Draw/Drag & Workspace Test Coverage (4.5.0)

**Status:** ✅ Released as `4.5.0` (2026-10-25) and `4.5.1` (2026-11-02); final website gate executed
2026-11-03.

The previous 4.4.0 v3 fluid implementation was completed and reverted — code did not produce fluid behavior. Moved to 4.5.0 with the v5 redesign (fluid as collision mode). MCP server gains the deterministic `generate_code` tool. Emitters gain canvas drawing and mouse dragging. Workspace unit-test coverage is expanded beyond the engine particle tests (engine option `load()` classes, utils/updater math, configs presets, noise libs, false-green targets).
