# ROADMAP: tsParticles

## Overview

Phases derived from v1 requirements. Each requirement maps to a phase.

| #   | Phase                       | Goal                                                    | Requirements                   |
| --- | --------------------------- | ------------------------------------------------------- | ------------------------------ |
| 1   | Developer Experience & Docs | Make it easy to get started and contribute              | DEV-01, DEV-02, DOC-01, DOC-02 |
| 2   | CI & Performance            | Ensure builds/tests are reliable and optimize hot paths | CI-01, CI-02, PERF-01, PERF-02 |

## Phase Details

### Phase 1: Developer Experience & Docs

Goal: New contributors can install, build, run demos, and understand core APIs.
Requirements: DEV-01, DEV-02, DOC-01, DOC-02
Success criteria:

1. `pnpm i` and `pnpm run build` succeed locally on standard Node version.
2. Demo site `demo/vanilla` runs and demonstrates plugin usage.
3. Typedoc-generated docs render without errors.

### Phase 2: CI & Performance

Goal: CI catches regressions and core engine hot paths are measurably improved.
Requirements: CI-01, CI-02, PERF-01, PERF-02
Success criteria:

1. CI builds and tests pass in CI environment.
2. Lint/format enforced in CI and pre-commit hooks.
3. Benchmark shows measurable allocation reduction in targeted hot path.
