# Requirements: tsparticles

**Defined:** 2026-03-01
**Core Value:** Provide a stable, well-tested, and easy-to-consume particle engine with curated bundles for varying footprint needs.

## v1 Requirements

### Packaging & Publishing

- [ ] **PUBLISH-01**: CI builds and publishes selected bundles to npm automatically (via `.github/workflows/npm-publish.yml`).

### Stability & Correctness

- [ ] **CORE-01**: Core engine APIs are stable and covered by unit tests for critical hot paths (`engine/src/Core/*`, `engine/src/Utils/*`).
- [ ] **CORE-02**: Fix identified issues in `engine/src/Utils/Utils.ts` (memoize, deepExtend) and add unit tests.

### Documentation & Demos

- [ ] **DOCS-01**: Generate API documentation via `typedoc` and publish artifacts.
- [ ] **DEMO-01**: Ensure demo site builds and deploys via CI (demo/vanilla).

### Testing & CI

- [ ] **TEST-01**: Ensure `utils/tests` run deterministically in CI (stabilize canvas fixtures, run with appropriate workers).

## v2 Requirements

- **PERF-01**: Optimize hot loops and reduce per-frame allocations (benchmark-driven).
- **BUNDLE-01**: Introduce automated bundle size budget checks in CI.

## Out of Scope

| Feature               | Reason                                                |
| --------------------- | ----------------------------------------------------- |
| Native mobile SDKs    | Web-first library; mobile SDKs deferred to later work |
| Server-side analytics | Not core to engine functionality                      |

## Traceability

| Requirement | Phase   | Status  |
| ----------- | ------- | ------- |
| PUBLISH-01  | Phase 2 | Pending |
| CORE-01     | Phase 1 | Pending |
| CORE-02     | Phase 1 | Pending |
| DOCS-01     | Phase 3 | Pending |
| DEMO-01     | Phase 3 | Pending |
| TEST-01     | Phase 1 | Pending |

---

_Requirements defined: 2026-03-01_
