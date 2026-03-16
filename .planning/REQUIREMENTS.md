# Requirements: tsParticles

**Defined:** auto-init
**Core Value:** Provide a small, high-performance, and extensible particle engine that developers can integrate into web projects with minimal configuration.

## v1 Requirements

### Developer Experience

- [ ] **DEV-01**: Scripts to install and build the workspace work with `pnpm` (`pnpm i`, `pnpm run build`) on a developer machine with Node 18+.
- [ ] **DEV-02**: Developer quickstart: `demo/vanilla` runs locally with a single command and clear README.

### Stability & CI

- [ ] **CI-01**: CI pipeline builds all packages and runs tests (`pnpm run build:ci` succeeds in CI).
- [ ] **CI-02**: Lint and format checks are enforced in pre-commit hooks (husky) and CI.

### Performance

- [ ] **PERF-01**: Particle update loop reduces per-frame heap allocations in the hot path by refactoring one identified example in `engine/src/Utils/`.
- [ ] **PERF-02**: Add a simple benchmark that measures updates per second for a configurable particle count.

### Documentation

- [ ] **DOC-01**: Typedoc-generated API docs are buildable (`pnpm run build:docs`) and published locally for reviewers.
- [ ] **DOC-02**: Add at least 2 end-to-end demo examples in `demo/vanilla` showcasing core plugin usage.

## v2 Requirements

- **DX-01**: Starter templates for common frameworks (React, Vue) demonstrating integration.

## Out of Scope

| Feature                 | Reason                                             |
| ----------------------- | -------------------------------------------------- |
| Native mobile SDKs      | Web-first focus for initial roadmap                |
| Paid plugin marketplace | Commercialization beyond initial open-source scope |

## Traceability

| Requirement | Phase   | Status  |
| ----------- | ------- | ------- |
| DEV-01      | Phase 1 | Pending |
| DEV-02      | Phase 1 | Pending |
| CI-01       | Phase 1 | Pending |
| CI-02       | Phase 1 | Pending |
| PERF-01     | Phase 2 | Pending |
| PERF-02     | Phase 2 | Pending |
| DOC-01      | Phase 1 | Pending |
| DOC-02      | Phase 1 | Pending |

---

_Requirements defined: auto-init_
