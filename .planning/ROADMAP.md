# ROADMAP: tsParticles

## Overview

| # | Phase | Version | Goal |
|---|-------|---------|------|
| 1 | GIF Shape, Background Canvas, BgMask Dynamic, Draw Layer System, Particle Modifier, HDR Precision | 4.3.0 | ✅ Released |
| 2 | HDR Color Fix & Rendering Modes, Code Review Fixes | 4.4.0 | ✅ Released |
| 3 | Fluid Particle Interaction, MCP `generate_code` tool, Emitter Draw/Drag, Absorber Split, Error Codes, Workspace Test Coverage | 4.5.0 / 4.5.1 | ✅ Released |

## Phase Details

### Phase 2: HDR Color Fix & Rendering Modes (4.4.0)

**Status:** ✅ Released.

- HDR color fidelity fixes: tone mapping, linear-space mixing, configurable `peakNits`, display listeners, `hdrMode` presets (`natural`/`vivid`/`cinematic`/`dynamic`).
- Code review fixes from the wrapper audit (implemented).

### Phase 3: Fluid Particle Interaction, MCP `generate_code`, Emitter Draw/Drag & Workspace Test Coverage (4.5.0)

**Status:** ✅ Released as `4.5.0` (2026-10-25) and `4.5.1` (2026-11-02); final website gate executed
2026-11-03.

The previous 4.4.0 v3 fluid implementation was completed and reverted — code did not produce fluid behavior. Moved to 4.5.0 with the v5 redesign (fluid as collision mode). MCP server gains the deterministic `generate_code` tool. Emitters gain canvas drawing and mouse dragging. Workspace unit-test coverage is expanded beyond the engine particle tests (engine option `load()` classes, utils/updater math, configs presets, noise libs, false-green targets).
