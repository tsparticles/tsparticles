# ROADMAP: tsParticles (replaced)

## Overview

Single focused phase per owner's request.

| #   | Phase                                      | Goal                                                                                                                            |
| --- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| 1   | External Interaction: Drag & Drop Particle | Implement an external interaction allowing users to drag-and-drop particles one at a time into a canvas and interact with them. |

## Phase Details

### Phase 1: External Interaction: Drag & Drop Particle

Goal: Provide an external interaction that lets a user drag and drop single particles into the canvas, interact with them (select, move, drop), and expose a minimal API for external consumers to trigger and listen to these interactions.

Requirements: (derived from owner request)

- UI-01: Users can drag a particle from an external palette and drop it onto the canvas. Only one particle is dragged per interaction.
- UI-02: Dropped particle becomes interactive (can be selected and moved) until deselected.
- API-01: Emit events on drag-start, drag-end, drop, select, and move with particle identifiers and positions.
- QA-01: Add automated usability tests that simulate drag-and-drop and assert events fired.

Success criteria:

1. Functional demo shows drag-and-drop of one particle at a time into `demo/vanilla`.
2. Events are emitted and documented in a short API doc snippet.
3. Acceptance tests simulate a drag-and-drop and pass in CI.
