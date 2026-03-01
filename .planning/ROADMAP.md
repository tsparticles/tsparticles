# Roadmap — tsparticles

**Created:** 2026-03-01

Phases: 3 | Requirements mapped: 6 | All v1 requirements covered ✓

| #   | Phase              | Goal                                       | Requirements              | Success Criteria                                                                                                                           |
| --- | ------------------ | ------------------------------------------ | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Core Stabilization | Make core engine reliable and well-tested  | CORE-01, CORE-02, TEST-01 | 1) Unit tests for core run reliably in CI; 2) Identified Utils issues fixed; 3) Flaky tests reduced to <1% failure rate                    |
| 2   | CI & Publishing    | Automate builds and publishing for bundles | PUBLISH-01                | 1) `npm-publish.yml` publishes canary on push to main; 2) Release artifacts produced for each bundle; 3) NX Cloud integration passes in CI |
| 3   | Docs & Demos       | Publish docs and stabilize demo deploys    | DOCS-01, DEMO-01          | 1) Typedoc artifacts published; 2) Demo site deploys via CI; 3) Example usage documented in README                                         |

---

Phase Details

**Phase 1: Core Stabilization**
Goal: Ensure core runtime is correct and covered by tests.
Requirements: CORE-01, CORE-02, TEST-01
Success criteria:

1. Unit tests covering engine core and utils pass reliably in CI.
2. Memoize/deepExtend issues addressed with tests.
3. Test fixtures for canvas/jsdom stabilized.

**Phase 2: CI & Publishing**
Goal: Make publishing repeatable and automated for bundles.
Requirements: PUBLISH-01
Success criteria:

1. CI builds bundles deterministically.
2. Publishing pipeline can release packages to npm using existing workflows.

**Phase 3: Docs & Demos**
Goal: Ship docs and demo deploys for adoption.
Requirements: DOCS-01, DEMO-01
Success criteria:

1. API docs generated and available as artifacts.
2. Demo site deployed and accessible; examples updated.
