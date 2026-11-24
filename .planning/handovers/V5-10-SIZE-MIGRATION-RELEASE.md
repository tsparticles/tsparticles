# V5-10 — Size, migration, and final currently scoped verification

Status pending. Execute in E10 after verified E0–E9 gates and completion of
all technical handovers 01–09. See the [execution sequence](V5-EXECUTION.md).

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

## Final checklist

- [ ] Explicit engines only. Custom RNG and logging are isolated. Any scheduler
      or cache limitations are documented and resolved or recorded as open gates.
- [ ] Registries, events, async initialization, and teardown are isolated across engines.
- [ ] Full engine review, including ParticlesManager and Particle, and plugin and browser matrices complete.
- [ ] Plugin APIs, option inheritance, and consumers using built packages verified.
- [ ] The minimal scene and slim are smaller in gzip and Brotli, with all
      budgets met. Report ESM/CJS lazy subpath sizes separately where consumers
      use those entrypoints.
- [ ] Draw/update/allocation regressions are either resolved or explained and accepted.
- [ ] Targeted tests, full suite (`pnpm exec vitest`, plus a finite run if needed),
      lint, and formatting pass. Verify Nx targets before running them.
- [ ] Complete the rebuild outside CLI/website/palette required by AGENTS, builds
      for affected CLI/generators/consumers, and `pnpm run build:ci`.
- [ ] Real browser smoke tests pass and guides/demos/templates/generated code work.
- [ ] Breaking-change changelog and migration guide are complete, with English and translations aligned.
- [ ] V5-LEG retirement, V5-ARCH evaluations, and V5-COLOR migration gates pass.

## Deliverables

Provide final status for every currently specified V5 requirement, a
reproducible report, and reproduction steps for remaining issues. Keep v5 open
while any required gate is unmet. Record environment limitations as such.
Completing E10 does not establish overall v5 validation or authorize release.
After E10, agree the additional pre-release verification and planning needed;
that scope is not yet specified. Release and publication tasks are excluded.

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
Unresolved mandatory checks keep E10 open. The [optional E11 backlog](V5-11-OPTIONAL-PLUGINS.md)
is explicitly excluded from E10 completion; if later investigation
finds a correctness defect, return it to the responsible mandatory gate.

## E5 acceptance exceptions requiring final E10 verification — 2026-11-23

The user explicitly accepts the remaining M4/500 deviation and closes E5,
with final verification in E10: “Accettare lo scostamento e chiudere E5, con
verifica finale in E10”. This is an E5 acceptance exception; do not change
the original budgets or report the measured exceedances as passing.

- [ ] Rerun M4/500 with the final source and matched same-browser controls.
      Current quiet nine-repetition E5 update is 3.70 ms vs E0 ceiling 3.52;
      frame p95 is 7.50 vs matched E4 6.50 (screen 7.15). The full matrix
      instead has update 3.50/p95 7.70; retain dispersion and all reports.
- [ ] Recheck the inherited E4 M6/500 release item. Current E5 p95 is 2.10 ms
      vs E0 ceiling 1.87; a fresh prior-E5 corrected-RNG control gives 2.30.
      Historical unseeded M6 runs are not comparable deterministic evidence.
- [ ] Recheck the earlier E4 M8/500 item against final output; current E5
      extended p95 1.40 passes the 1.65 ceiling, but does not close E10 early.
- [ ] Review final consumer, distribution and all-chunk size deltas. The user
      waived bundle growth for E5; this is not a claim that the 2% targets pass.
- [ ] Complete the currently scoped supported-browser and physical HDR checks with
      their recorded support-policy limitations. E5 headless readback does not
      certify display output or GPU completion.

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

- [ ] Rerun the final M3–M8 matrix against original E0 ceilings with matched
      controls; retain the first-pass flags and confirmation dispersion.
- [ ] Investigate the absolute update/draw flags in E7's Chrome 158 and Chrome
      for Testing 157 reports, including differences between browser products
      and the original Google Chrome measurements. Fresh E6 controls also exceed
      several ceilings; this does not waive those ceilings.
- [ ] Recheck SDR/HDR M6/M8 update/render/p95 and retention on final artifacts.
      E7's relative flags pass repeated confirmation; the original final checks
      and inherited M6 obligations still require final verification.
- [ ] Recheck final minimal/all-chunk and standalone payloads against original
      size targets. E7 increments are +130 gzip/+140 Brotli bytes for minimal
      and +164/+265 for All; helper bytes and chunk counts are unchanged.

Evidence: [E7 acceptance](evidence/e7/closure/README.md),
[verification](evidence/e7/closure/verification.json), `evidence/e7/budget-screen.json`,
`confirmation-budget-screen.json`, `runtime-confirmation-chrome157.json`,
`extended-confirmation-comparison.json` and `payload-comparison.json` under
`evidence/e7/`. E8/E9 and the remaining E10 gates are not closed by this decision.
