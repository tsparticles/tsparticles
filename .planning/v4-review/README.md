# tsParticles v4 review and release plan

Reviewed on November 8, 2026, on branch `v4`, commit `5d59d1dbbd`, version `4.5.3`. The first pass focused on engine lifecycle, rendering, SVG movement, interactions, and bundle distribution. The second pass covered wrappers, the CLI, and the MCP server. Include presets and demos in verification when they rely on an affected contract.

| Document                                                  | Coverage                                                                                      |
| --------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| [Correctness and regressions](CORRECTNESS.md)             | Nine runtime defects with reproduction steps, compatible fixes, and acceptance tests          |
| [Performance and bundle size](PERFORMANCE-AND-BUNDLES.md) | Browser resolution of `/lazy`, preliminary measurements, experiments, and acceptance criteria |
| [Wrappers, CLI, and MCP server](WRAPPER-CLI-MCP.md)       | Integration, build, scaffolding, and code generation defects                                  |
| [v5 handovers](../handovers/README.md)                    | Criteria to carry into the next major and recheck after the v4 fixes                          |

## Release scope

**Prefer a patch release.** Preserve existing signatures, exports, subpaths, the v4 singleton and globals, valid options and their precedence, registration and hook order on successful paths, bundle composition, and CDN artifact names and loading behavior. Consider a minor release only for a compatible addition with a measured benefit, such as a new opt-in entrypoint when existing formats prevent that benefit. Evaluate changes that require API or architectural migration in the v5 plans.

**P1** indicates a stall, incomplete startup, or loss of a valid feature. **P2** indicates a narrower defect or a fix that first needs a defined compatibility contract.

| Order | Work items             | Required outcome                                                                                                                    |
| ----- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 1     | V4-B01, V4-B02, V4-B04 | Registration completes before the first load, startup and cancellation settle consistently, and OffscreenCanvas works without a DOM |
| 2     | V4-B03, V4-B05, V4-B07 | A single queued frame, the same updater instance for initialization and drawing, and independent anonymous hosts                    |
| 3     | V4-B06, V4-B08, V4-B09 | Resilient remote SVG, order-independent collisions, and stable, finite density                                                      |
| 4     | V4-D01, V4-S01, V4-S02 | The `/lazy` contract is verified in a consumer and savings are measured on clean artifacts                                          |
| 5     | V4-P01–P03, V4-S03     | Independent experiments that proceed only if they pass parity and measurement gates                                                 |

V4-B04 depends on the error handling in V4-B02. Use the V4-P01 benchmark harness for V4-B08, especially for mixed radii. V4-D01 can proceed alongside the runtime fixes. Each PR includes a regression test and runs the existing tests for its area.

The [integration plan](WRAPPER-CLI-MCP.md) covers the wrapper, CLI, and MCP work. CLI and MCP fixes can proceed in parallel with the core. The wrappers build on the v4 fixes for host identity and startup handling.

## Evidence and release gates

- Runtime reproductions used the source at the reviewed commit outside the repository, with esbuild 0.28.2, Node 26.13.0, jsdom, a test canvas, and a controlled scheduler where applicable. Collisions and SVG also had component-level checks. The worker check simulated an environment without `document` and used a test OffscreenCanvas. Turn the isolated reproductions into regression tests in the test package.
- The target `NX_DAEMON=false NX_ISOLATE_PLUGINS=false NX_NO_CLOUD=true pnpm nx run @tsparticles/tests:test` reached Vitest, but 47 files failed before running assertions. The checkout links to a missing `engine/dist` artifact, so workspace imports fail to resolve. Rebuild dependencies through Nx before using the suite as a gate. The suite's functional status remains unverified.
- For runtime PRs, run targeted tests, the package suite, lint, and formatting checks. For engine changes, also rebuild consumers outside the CLI, website, and palette categories as specified in `AGENTS.md`. For packaging, smoke-test built packages outside the monorepo, including ESM, CJS, browser, and CDN.
- Before release, compare v4 scenes with fixed seeds, inputs, and schedulers. Verify rendering and loading in real browsers. When a fix intentionally changes the output of a failing case, document the new expected result separately from parity for scenes that already work.
