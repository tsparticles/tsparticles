# V5-10 — Size, migration, and final currently scoped verification

Status accepted — 2026-11-27. E0–E10 are accepted for progression through the
v5 plan. The user has moved physical HDR and native-language reviews to the
final plan validation queue; those results are not claimed as already measured
or signed off. See the
[execution sequence](V5-EXECUTION.md) and the
[E10 evidence checkpoint](evidence/e10/README.md).

## E10 acceptance criteria update — 2026-11-24

The user accepts justified v4-to-v5 payload growth. Keep the E0 size ceilings
and measured deltas visible as diagnostic references. Assess size acceptance
by explaining retained code and removing demonstrated avoidable growth, such
as duplicate runtime copies or accidentally retained features. Judge the
minimal, Slim, installed CJS and CDN graphs under this criterion as well.
The runtime, allocation and retention criteria still apply, with performance
taking priority over compressed size.

## Ownership

Bundle reports, budgets, and CI checks, integration and package consumer tests,
distributed manifests, changelogs, READMEs, guides, translations, demos,
templates, code generation, and final planning. Coordinate regression fixes
with earlier owners and preserve other contributors' changes. This handover
does not include or authorize a release, version bump, deployment, or package
publication. E10 closes only currently specified checks; after E10, agree a
separate plan for additional verification before considering any release.

## Work

1. Rebuild fresh artifacts through the baseline pipeline. Verify packing,
   `publishConfig`, and resolution in consumers installed from the packaged
   artifacts, including declarations and package exports.
2. Complete `V5-BUNDLE-REPORT.md` with raw/min/gzip/Brotli, actual entry and chunk
   sizes, absolute and percentage deltas, retained dependencies, budgets, and
   explanations. Record source maps and other assets separately from JS.
3. Automate size scenarios in a target or check consistent with Nx and the
   existing pipeline. Version budgets with toolchain and rationale. Keep
   agreed thresholds fixed when evaluating the refactor.
4. Finish the v4 → v5 guide covering the factory, multiple engines,
   per-engine plugin registration, random/logging and any scheduler changes,
   wrappers/providers, convenience bundles, browser/CDN and lazy, removed
   symbols, and new module boundaries.
5. Run documented examples and CLI/MCP-generated code. Search English guides,
   all nine translations, READMEs, and templates for v4 patterns. Distinguish
   historical migration examples from consumers that should use v5.
6. Align `package.json` and `package.dist.json` for changed packages, including
   publishable bundles. Update changelogs and TypeDoc. Test actual resolution
   before changing APIs to address packaging issues.
7. Update PROJECT/REQUIREMENTS/ROADMAP/STATE and relevant codebase analyses with
   verified facts. Preserve 4.x history and distinguish the former “v5” fluid
   solver revision from the product major release.

## Required additional coverage

Collect `V5-ENGINE-AUDIT.md`, `V5-PLUGIN-AUDIT.md`, and the browser matrix from 09. Verify complete coverage of engine source and extension packages, including
Particle, ParticlesManager, utilities, options, and palettes. Record evidence
for compatibility claims. Files or packages without an outcome keep the gate open.
G1–G7 dispositions are recorded as closed in E8's source-review acceptance;
this does not close the separate E10 architecture, legacy, browser, size, or
migration checks below.

## Final checklist

- [x] Explicit engines only. Custom RNG and logging are isolated. Any scheduler
      or cache limitations are documented and resolved or recorded as open gates.
- [x] Registries, events, async initialization, and teardown are isolated across engines.
- [x] Full engine review, including ParticlesManager and Particle, and plugin and browser matrices complete.
- [x] Plugin APIs, option inheritance, and consumers using built packages verified.
- [x] Explain the payload growth for minimal, Slim, CDN and installed consumers
      and resolve demonstrated avoidable retention or duplication. Report gzip
      and Brotli against E0 and measure ESM/CJS lazy entries separately.
      See [the size disposition](evidence/e10/README.md#size-disposition-under-the-updated-criterion).
- [x] Draw/update/allocation regressions are either resolved or explained and accepted. The callback-free renderer follow-up passes all 30 runtime rows; the quiet M4/500 frame p95 remains 0.05 ms above the historical E5 reference and the previously accepted E5 exception remains recorded.
- [x] Targeted tests, full Nx test matrix (85 projects), lint, and formatting pass.
      The unsandboxed Nx run completes all finite browser/server targets.
- [x] Rebuild the workspace, including CLI/generators/consumers, and
      `pnpm run build:ci` (457/457 tasks in the E10 checkpoint).
- [x] Real browser smoke tests pass and guides/demos/templates/generated code work. All 20 CLI consumers and the required demo/browser checks pass; physical HDR is in the final plan validation queue by user decision.
- [x] Breaking-change changelog and migration guide are complete, with English and translations structurally aligned. Human language sign-off for all nine drafts is in the final plan validation queue by user decision.
- [x] V5-LEG retirement, V5-ARCH evaluations, and V5-COLOR migration gates pass under the documented dispositions. Optional PJS and Stencil v4 compatibility surfaces remain intentional and have migration paths; physical HDR is queued for final validation.

## Deliverables

Provide final status for every currently specified V5 requirement, a
reproducible report, and reproduction steps for remaining checks. Physical HDR
verification and human language sign-off are explicitly queued for final plan
validation at the user's direction. Completing E10 does not establish overall
v5 validation or authorize release. After E10, continue the E11/E12 work and
agree any additional pre-release verification scope. Release and publication
tasks are excluded.

## Performance and size plans

See [V5-IMP-01-MEASUREMENT](improvements/V5-IMP-01-MEASUREMENT.md).
Record assigned outcomes as specified in the [improvement plan](V5-IMPROVEMENTS.md).

## Consumers installed outside the monorepo

Reuse the v4 wrapper, CLI, and MCP regression fixtures where applicable.
Verify wrapper mount, errors, and teardown against the v5
contract, scaffolding commands from the publishable package, and compilation of
MCP snippets in consumer projects. Include an isolated install to catch
undeclared direct imports and templates that build only in the workspace.

## Architecture evaluations

Collect `V5-ARCHITECTURE-DECISIONS.md` from the
[architecture plan](V5-ARCHITECTURE.md). Each ARCH-01–04 item needs a decision,
alternatives, evidence, consumer impact, and outcome. Explain retained
implementations and deferred rewrites. Required v5 gates still apply.
Verify migration guidance for actual changes to Particle state/methods,
packages/subpaths, options, and extensions. Incomplete evaluation keeps this gate open.

## Required color migration

Follow [V5-COLOR — OKLCH](V5-COLORS-OKLCH.md). Require C0–C5 completion,
`V5-COLOR-DECISIONS.md`, and `V5-COLOR-REPORT.md`. Verify the package matrix,
numerical and browser tests, budgets, and breaking migration guidance for
managers, animation, and offsets. Unverified gamut or HDR keeps V5-COLOR open.

## Legacy support retirement

Close [V5-LEG](../REQUIREMENTS.md) using the inventory and Browserslist evidence
from 09. Verify that retired Vue 2, Nuxt 2, and Nuxt 3 integrations are absent
from the workspace, distribution, demos, templates, installer, active docs,
translations, and bundles. Check migration guidance for retired deprecated APIs
and browser coverage. Confirm remaining supported fallback paths in built artifacts.

## Source-review acceptance additions

Collect G1–G7 dispositions from the [source review](V5-CODE-REVIEW.md), including
failure/lifecycle, timing/numeric, sampling and spatial regression evidence.
Unresolved mandatory checks keep E10 open. The [optional E13 backlog](V5-13-OPTIONAL-PLUGINS.md)
is explicitly excluded from E10 completion; if later investigation
finds a correctness defect, return it to the responsible mandatory gate.

## E5 acceptance exceptions requiring final E10 verification — 2026-11-23

The user explicitly accepts the remaining M4/500 deviation and closes E5,
with final verification in E10: “Accettare lo scostamento e chiudere E5, con
verifica finale in E10”. This is an E5 acceptance exception; do not change
the original budgets or report the measured exceedances as passing.

- [x] Recheck M4/500 with the final source and matched same-browser control.
      E10's nine-repetition quiet pair reports update 3.70 ms (E0 ceiling
      3.52), draw 2.40 ms (2.53), and frame p95 7.60 ms (E4 reference 6.50;
      E5 screen 7.15). Candidate and E6 control match on these medians. The
      update and p95 exceedances remain visible; no budget changed.
- [x] Recheck the inherited E4 M6/500 release item. E10's nine-repetition
      extended confirmation gives SDR/HDR p95 1.90/2.20 ms vs E0 1.87; matched
      E6 gives 1.90/2.30. HDR improves relative to control, but both absolute
      E0 rows still fail.
- [x] Recheck the earlier E4 M8/500 item against final output. Nine-repetition
      extended candidate p95 is 1.40 ms in SDR and HDR, below E0 ceilings 1.65
      and 1.54 respectively.
- [x] Review final consumer, distribution and all-chunk size deltas. The E10
      report records 17 size failures, including 3 CJS rows; the earlier E5 bundle-growth
      acceptance predates the updated E10 size criterion above.
- [x] Complete the currently scoped supported-browser checks with their recorded
      support-policy limitations. Physical HDR display/GPU validation is queued
      for the final plan validation at the user's direction; E5 headless readback
      is not reported as physical-display evidence.

Evidence and archived artifacts: `evidence/e5/closure/README.md`,
`verification.json`, `investigation/quiet-*.json`, `post-final/summary.json`
and `payloads/deltas.json`. All E5 source/consumer work, model decisions,
457-project build:ci, 85 test targets and 817 primary tests are complete;
no mandatory C1–C4 migration is deferred to E10.

## E7 accepted with final budget checks in E10 — 2026-11-24

The user explicitly accepts technical E7 closure and final verification in E10:
“sì va bene che E10 faccia i check finali”. E7's implementation, source review,
matched incremental comparisons and validation are complete. Original E0 absolute
ceilings are unchanged; neither recorded exceedances nor fresh E6 control
exceedances are reclassified as passing. This is a stage-acceptance deferral,
not a release-budget waiver or an extension of the earlier E5 exception.

- [x] Rerun the final M3–M8 matrix against original E0 ceilings with matched
      controls; retain the first-pass flags and confirmation dispersion. Seven
      initially flagged main-matrix rows pass their nine-repetition medians.
- [x] Investigate the absolute update/draw flags in E7's Chrome 158 and Chrome
      for Testing 157 reports, including differences between browser products
      and the original Google Chrome measurements. E7's cross-browser comparison
      records the findings; the callback-free E10 follow-up passes all 30 rows
      in Chrome 158. Historical exceedances and original ceilings remain recorded.
- [x] Recheck SDR/HDR M6/M8 update/render/p95 and retention on final artifacts.
      E10's nine-repetition matched measurements keep DOM/listeners stable and
      confirm two inherited M6/500 p95 failures; M8/500 passes.
- [x] Recheck final minimal/all-chunk and standalone payloads against original
      size targets. E10 records the absolute results; see the updated size
      acceptance criterion above.

Evidence: [E7 acceptance](evidence/e7/closure/README.md),
[verification](evidence/e7/closure/verification.json), `evidence/e7/budget-screen.json`,
`confirmation-budget-screen.json`, `runtime-confirmation-chrome157.json`,
`extended-confirmation-comparison.json` and `payload-comparison.json` under
`evidence/e7/`. E8/E9 and the remaining E10 gates are not closed by this decision.
