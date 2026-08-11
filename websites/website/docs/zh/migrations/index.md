# Versioning & Migration

Use this section to navigate between major `tsParticles` versions, track releases, and understand versioning.

## Migration guides

- [`Migrate from v3.x`](/migrations/from-v3)
- [`Migrate from v2.x`](/migrations/from-v2)
- [`Migrate from v1.x`](/migrations/from-v1)

## Quick route

- Coming from `v3.x`: start with [`/migrations/from-v3`](/migrations/from-v3) (focus: option key changes + package renames).
- Coming from `v2.x`: start with [`/migrations/from-v2`](/migrations/from-v2) (focus: `load(...)` API + options).
- Coming from `v1.x`: start with [`/migrations/from-v1`](/migrations/from-v1) (focus: packages, loaders, options audit).

## Where migrations usually break

Most major migrations break in two places:

1. **Load API shape** (old positional params vs new object params).
2. **Options schema** (renamed/moved keys).

If your app compiles but renders wrong visuals, start from option mappings first.

## Fast lookup

- [Option Rename Matrix](/migrations/option-rename-matrix) — quick mapping of legacy vs current option keys.

## Also useful

- [Changelog](/migrations/changelog) — latest release notes.
- [Releases & Versioning](/migrations/releases) — version alignment rules and release checklist.
- [particles.js Migration](/migrations/particles-js) — migrating from legacy `particles.js` or `canvas-confetti`.
