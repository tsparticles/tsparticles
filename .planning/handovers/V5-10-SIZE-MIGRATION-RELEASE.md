# V5-10 — Size, migration, and release readiness gates

Status pending. Requires verified completion of 01–09.

## Ownership

Bundle reports, budgets, and CI checks, integration and package consumer tests,
distributed manifests, changelogs, READMEs, guides, translations, demos,
templates, code generation, and final planning. Coordinate regression fixes
with earlier owners and preserve other contributors' changes. Publishing,
deployment, and version bumps belong to the separate release workflow.

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

## Deliverables

Provide final status for every V5 requirement, a reproducible report, and
reproduction steps for remaining issues. Keep v5 open while any required gate
is unmet. Record environment limitations as such. Leave commits, tags,
versioning, publishing, and deployment to the separate release workflow.

## Performance and size plans

See [V5-IMP-01-MEASUREMENT](improvements/V5-IMP-01-MEASUREMENT.md).
Record assigned outcomes as specified in the [improvement plan](V5-IMPROVEMENTS.md).

## Consumers installed outside the monorepo

Reuse fixtures from the [v4 wrapper, CLI, and MCP plan](../v4-review/WRAPPER-CLI-MCP.md)
when available. Verify wrapper mount, errors, and teardown against the v5
contract, scaffolding commands from the publishable package, and compilation of
MCP snippets in consumer projects. Include an isolated install to catch
undeclared direct imports and templates that build only in the workspace.
