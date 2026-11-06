# ROADMAP: tsParticles

## Overview

| #   | Phase                                                                                                                         | Version       | Goal        |
| --- | ----------------------------------------------------------------------------------------------------------------------------- | ------------- | ----------- |
| 1   | GIF Shape, Background Canvas, BgMask Dynamic, Draw Layer System, Particle Modifier, HDR Precision                             | 4.3.0         | ✅ Released |
| 2   | HDR Color Fix & Rendering Modes, Code Review Fixes                                                                            | 4.4.0         | ✅ Released |
| 3   | Fluid Particle Interaction, MCP `generate_code` tool, Emitter Draw/Drag, Absorber Split, Error Codes, Workspace Test Coverage | 4.5.0 / 4.5.1 | ✅ Released |

## Current execution — v5 major

**Status:** planned on dedicated branch `v5`; packages remain at `4.5.1`.
The first runtime change removes the singleton. Measurement of the unmodified
baseline precedes that change. Follow [handover index](handovers/README.md).

| Step | Scope                                                               | Handover                                        |
| ---- | ------------------------------------------------------------------- | ----------------------------------------------- |
| 1    | Explicit engines, initial plugin audit and working browser contract | [01](handovers/V5-01-ENGINE-INSTANCES.md)       |
| 2    | Per-engine services and shared-state audit                          | [02](handovers/V5-02-ENGINE-SERVICES.md)        |
| 3    | Full engine inventory, domain boundaries and review ownership       | [03](handovers/V5-03-CORE-BOUNDARIES.md)        |
| 4    | Container and events                                                | [04](handovers/V5-04-CONTAINER.md)              |
| 5    | CanvasManager and RenderManager                                     | [05](handovers/V5-05-CANVAS-RENDERING.md)       |
| 6    | ParticlesManager and SpatialHashGrid                                | [06](handovers/V5-06-PARTICLES-MANAGER.md)      |
| 7    | Particle and Retina                                                 | [07](handovers/V5-07-PARTICLE.md)               |
| 8    | Ecosystem plugin impact and compatibility audit                     | [08](handovers/V5-08-PLUGIN-IMPACT.md)          |
| 9    | Browser/CDN distribution refinement                                 | [09](handovers/V5-09-BROWSER-BUNDLES.md)        |
| 10   | Complete coverage, budget and migration gate                        | [10](handovers/V5-10-SIZE-MIGRATION-RELEASE.md) |

Performance and bundle-size candidates are tracked in [V5-IMPROVEMENTS.md](handovers/V5-IMPROVEMENTS.md) and enter implementation only when the relevant measurements support them.

The [architecture plan](handovers/V5-ARCHITECTURE.md), added on 2026-11-06,
provides four dedicated evaluations: Particle state/serialization, engine package
boundaries, options resolution and a common extension architecture. Contracts are
proposed in step 03, verified in 04–09 and closed with evidence in step 10; no
additional sequential phase or mandatory full rewrite is introduced.

No implementation step is complete yet. Historical fluid references to “v5” below
identify a solver-plan revision, not this product major release.

## Phase Details — released 4.x history

### Phase 2: HDR Color Fix & Rendering Modes (4.4.0)

**Status:** ✅ Released.

- HDR color fidelity fixes: tone mapping, linear-space mixing, configurable `peakNits`, display listeners, `hdrMode` presets (`natural`/`vivid`/`cinematic`/`dynamic`).
- Code review fixes from the wrapper audit (implemented).

### Phase 3: Fluid Particle Interaction, MCP `generate_code`, Emitter Draw/Drag & Workspace Test Coverage (4.5.0)

**Status:** ✅ Released as `4.5.0` (2026-10-25) and `4.5.1` (2026-11-02); final website gate executed
2026-11-03.

The previous 4.4.0 v3 fluid implementation was completed and reverted — code did not produce fluid behavior. Moved to 4.5.0 with the v5 redesign (fluid as collision mode). MCP server gains the deterministic `generate_code` tool. Emitters gain canvas drawing and mouse dragging. Workspace unit-test coverage is expanded beyond the engine particle tests (engine option `load()` classes, utils/updater math, configs presets, noise libs, false-green targets).
