---
phase: 01-core-stabilization
plan: 04
title: Phase 1 research: Validation Architecture & Risks
---

# Phase 1 — Core Stabilization: Research

## Executive summary

This phase focuses on documenting the validation architecture and making explicit where requirement CORE-02 (fixes in core utilities: memoize, deepExtend) is satisfied. The deliverable is a concise research summary that captures what we will validate in Phase 1, the testing stack, constraints, and a mapping from requirement IDs to artifacts or next steps.

## Stack & constraints

- Monorepo: pnpm + Nx workspace
- Test runner: Vitest (utils/tests package), Node + jsdom for DOM-related fixtures
- Language: TypeScript (>=5.x)
- CI: Nx Cloud / GitHub Actions (tests should be runnable via pnpm / nx commands)

## Risks & pitfalls

- Unbounded memoize/cache usage can cause memory growth in hot paths — use conservative defaults or require explicit options.
- Stable argument serialization for memoize may be expensive for complex objects; offer keyFn override and tests to justify default.
- Tests that rely on long-lived canvases or DOM interactions can be flaky in CI — prefer deterministic fixtures and headless environments.

## Validation Architecture

Purpose: define how we will verify Phase 1 outcomes (unit tests, CI checks, metrics) so downstream planners can rely on these guarantees.

- Unit tests: Per-package Vitest suites (utils/tests) provide deterministic unit tests for utilities (memoize, deepExtend). Tests run locally via: pnpm --filter @tsparticles/tests test -- "utils/tests/src/tests/memoize.test.ts" and should be included in CI.
- CI gating: Nx/git workflows must include the utils/tests target in CI (affected or full) — failing tests block merges.
- Deterministic fixtures: Demo and integration tests should use deterministic canvas fixtures (already added in previous plans) to avoid flakiness.
- Metrics: Track test coverage for utils package and monitor regression via CI artifacts. Add simple test coverage threshold for utils package in CI to catch regressions.
- Acceptance criteria: All memoize & deepExtend unit tests pass in CI and locally; no regressions in behavior for existing call sites (memoize(fn) remains compatible).

## Requirement mapping

- CORE-01: Stabilize core APIs — covered by memoize & deepExtend implementations + tests (see utils/tests/src/tests/memoize.test.ts and engine/src/Utils/Utils.ts)
- CORE-02: Fix issues in Utils.ts (memoize, deepExtend) — evidence and mapping provided in CORE-02-AUDIT.md
- TEST-01: CI/test coverage and deterministic fixtures — covered by utils/tests and fixtures added in earlier plans (see .planning/phases/01-core-stabilization/01-core-01-SUMMARY.md)

## References

- engine/src/Utils/Utils.ts — memoize & deepExtend implementations
- utils/tests/src/tests/memoize.test.ts — unit tests covering memoize behavior
- .planning/phases/01-core-stabilization/CORE-02-AUDIT.md — audit mapping for CORE-02
