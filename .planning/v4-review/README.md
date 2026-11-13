# tsParticles v4 review and release plan

Reviewed on November 8, 2026, against branch `v4`, commit `5d59d1dbbd`, version `4.5.3`. The first pass focused on engine lifecycle, rendering, SVG movement, interactions, and bundle distribution. The second pass covered wrappers, the CLI, and the MCP server. Include presets and demos in verification when they rely on an affected contract.

The follow-up release target is **4.6.0** on the v4 line. The 4.5.4 patch added regression coverage for the nine core runtime findings and fixed several MCP findings. The remaining reconciliation and release gates are tracked in the [4.6.0 plan](RELEASE-4.6.md); do not infer closure from this historical review alone.

| Document                                                  | Coverage                                                                                    |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| [Correctness and regressions](CORRECTNESS.md)             | Nine runtime defects with reproduction steps, compatible fixes, and acceptance tests        |
| [Performance and bundle size](PERFORMANCE-AND-BUNDLES.md) | Bundle composition and runtime performance hypotheses, experiments, and acceptance criteria |
| [Wrappers, CLI, and MCP server](WRAPPER-CLI-MCP.md)       | Integration, build, scaffolding, and code generation defects                                |
| [4.6.0 release plan](RELEASE-4.6.md)                      | Remaining findings, execution order, and v5 readiness gates                                 |
| [v5 handovers](../handovers/README.md)                    | Criteria to carry into the next major and recheck after the v4 fixes                        |

## Release scope

**4.6.0 is a compatibility-focused minor release.** Preserve existing signatures, exports, subpaths, the v4 singleton and globals, valid options and their precedence, registration and hook order on successful paths, and CDN artifact names and loading behavior. Preserve the existing browser entry points. Evaluate changes that require API or architectural migration in the v5 plans.

**P1** indicates a stall, incomplete startup, or loss of a valid feature. **P2** indicates a narrower defect or a fix that first needs a defined compatibility contract.

| Order | Work items             | Required outcome                                                                                                                    |
| ----- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 1     | V4-B01, V4-B02, V4-B04 | Registration completes before the first load, startup and cancellation settle consistently, and OffscreenCanvas works without a DOM |
| 2     | V4-B03, V4-B05, V4-B07 | A single queued frame, the same updater instance for initialization and drawing, and independent anonymous hosts                    |
| 3     | V4-B06, V4-B08, V4-B09 | Resilient remote SVG, order-independent collisions, and stable, finite density                                                      |
| 4     | V4-S01–S03             | Consumer bundle composition and optional-feature costs are measured before any compatible changes                                   |
| 5     | V4-P01–P03             | Independent runtime experiments proceed only if they pass parity and measurement gates                                              |

V4-B04 depends on the error handling in V4-B02. Use the V4-P01 benchmark harness for V4-B08, especially for mixed radii. Each PR includes a regression test and runs the existing tests for its area.

The [integration plan](WRAPPER-CLI-MCP.md) covers the wrapper, CLI, and MCP work. CLI and MCP fixes can proceed in parallel with the core. The wrappers build on the v4 fixes for host identity and startup handling.

## Evidence and release gates

- Runtime reproductions used the source at the reviewed commit outside the repository, with esbuild 0.28.2, Node 26.13.0, jsdom, a test canvas, and a controlled scheduler where applicable. Collisions and SVG also had component-level checks. The worker check simulated an environment without `document` and used a test OffscreenCanvas. Turn the isolated reproductions into regression tests in the test package.
- The initial test attempt at the reviewed commit could not resolve workspace imports because `engine/dist` was missing. After rebuilding through Nx, `pnpm nx run @tsparticles/tests:test:ci` passes all 644 tests across 47 files; `pnpm nx run @tsparticles/tests:build` also passes lint, formatting, and the full package suite.
- The 4.5.4 patch implementation adds regression coverage for worker listener setup, concurrent and retried plugin initialization, cancellation/frame scheduling, anonymous hosts, mixed-radius collisions, density rounding, and the other fixed runtime contracts. MCP traversal/default-selection and inherited-property handling were already fixed after this review was created; the remaining code-generation dependency fix is covered by its tests. CLI tests pass (36 tests total). MCP tests pass 256 tests; the one HTTP test requiring a listener on `0.0.0.0` is blocked by the sandbox (`listen EPERM`).
- The broad build covered 241 projects. The test and Electron targets passed on retry; the Next.js demo still requires fetching Inter from Google Fonts, and the Angular demo's `ng build` aborts with an internal deadlock in this environment. Keep these as environment-limited release checks.
- Clean-artifact measurements for V4-S01–S03 and the performance experiments V4-P01–P03 remain gated on their stated consumer, parity, and measurement criteria. No bundle or performance changes were made without that evidence.
- For runtime PRs, run targeted tests, the package suite, lint, and formatting checks. For engine changes, also rebuild consumers outside the CLI, website, and palette categories as specified in `AGENTS.md`. For packaging, smoke-test built packages outside the monorepo, including ESM, CJS, browser, and CDN.
- Before release, compare v4 scenes with fixed seeds, inputs, and schedulers. Verify rendering and loading in real browsers. When a fix intentionally changes the output of a failing case, document the new expected result separately from parity for scenes that already work.
