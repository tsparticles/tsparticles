# ROADMAP: tsParticles

## Overview

| # | Phase | Version | Goal |
|---|-------|---------|------|
| 1 | GIF Shape, Background Canvas, BgMask Dynamic, Draw Layer System, Particle Modifier, HDR Precision | 4.3.0 | ✅ Released |
| 2 | HDR Color Fix & Rendering Modes, Code Review Fixes | 4.4.0 | 🚧 In progress |
| 3 | Fluid Particle Interaction, MCP `generate_code` tool | 4.5.0 | 📋 Planned |

## Phase Details

### Phase 2: HDR Color Fix & Rendering Modes (4.4.0)

**Status:** 🚧 In progress. See `.planning/handovers/4.4.0_PLAN.md`.

- HDR color fidelity fixes: tone mapping, linear-space mixing, configurable `peakNits`, display listeners, `hdrMode` presets (`natural`/`vivid`/`cinematic`/`dynamic`). See `HDR_COLOR_FIX_PLAN.md`.
- Code review fixes from the wrapper audit (implemented). See `FIX-PROMPT.md`.

### Phase 3: Fluid Particle Interaction & MCP `generate_code` (4.5.0)

**Status:** 📋 Planned. See `.planning/handovers/4.5.0_PLAN.md`.

The previous 4.4.0 v3 fluid implementation was completed and reverted — code did not produce fluid behavior. Moved to 4.5.0 with the v5 redesign (fluid as collision mode). See `FLUID_INTERACTION_PLAN.md` for retrospective and design. MCP server gains the deterministic `generate_code` tool. See `MCP_GENERATE_CODE_PLAN.md`.
