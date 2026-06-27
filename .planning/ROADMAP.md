# ROADMAP: tsParticles

## Overview

| # | Phase | Version | Goal |
|---|-------|---------|------|
| 1 | GIF Shape, Background Canvas, BgMask Dynamic, Draw Layer System, Particle Modifier, HDR Precision | 4.3.0 | ✅ Released |
| 2 | Fluid Particle Interaction (DDR-based liquid simulation) | 4.4.0 | In progress — see `.planning/handovers/4.4.0_PLAN.md` |

## Phase Details

### Phase 2: Fluid Particle Interaction (4.4.0)

**Target:** `@tsparticles/interaction-particles-fluid`

New particles interactor implementing position-only DDR (Density Displacement Resolution)
for real-time liquid simulation. Single-pass Gauss-Seidel solver with symmetric displacement.

**Constraints:**
- Zero modifications to `@tsparticles/engine`
- Follows `collisions` package pattern
- No per-particle state storage
- Relies on MovePlugin for baseline advection
