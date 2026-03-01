# Requirements: tsparticles - presets

**Defined:** 2026-03-02
**Core Value:** Provide a curated set of high-quality particle presets that developers can drop into browser demos and apps to achieve rich visual effects quickly.

## v1 Requirements

### Build & Packaging

- [ ] **PKG-01**: Standardize preset build so each preset can produce a browser-friendly bundle and an npm package
- [ ] **PKG-02**: CI builds and publishes package artifacts to npm when releasing

### Developer Experience

- [ ] **DEV-01**: Add a preset template and clear docs for adding new presets (`CONTRIBUTING.md`)
- [ ] **DEV-02**: Add linting config at repo root for consistent style

### Quality & Tests

- [ ] **TST-01**: Add package-level tests to verify preset bundles build correctly (Vitest/Jest)

## v2 Requirements

- **MIGR-01**: Gradually migrate legacy webpack-based presets to a unified build (Vite/Rollup)
- **DOCS-01**: Improve demo examples and add interactive playground

## Out of Scope

| Feature                      | Reason                                            |
| ---------------------------- | ------------------------------------------------- |
| Real-time editor for presets | High complexity; not core to library distribution |

## Traceability

| Requirement | Phase   | Status  |
| ----------- | ------- | ------- |
| PKG-01      | Phase 1 | Pending |
| PKG-02      | Phase 2 | Pending |
| DEV-01      | Phase 1 | Pending |
| DEV-02      | Phase 1 | Pending |
| TST-01      | Phase 1 | Pending |

**Coverage:**

- v1 requirements: 5 total
- Mapped to phases: 5
- Unmapped: 0 ✓

---

_Requirements defined: 2026-03-02_
_Last updated: 2026-03-02 after initialization_
