# V5-IMP-01 — Baseline and comparison protocol

Status pending. Handover 01 owns the baseline, 04–09 own experiments, and 10
owns completion. This protocol applies to all IMP plans.

## Purpose

Make decisions reproducible. Distinguish changes in bundle size, frame time,
and allocations from measurement noise and toolchain changes. Use the single
baseline required by the main index and collect it before modifying runtime.

## Scenarios

| ID  | Scenario                                                         | Purpose                                                |
| --- | ---------------------------------------------------------------- | ------------------------------------------------------ |
| M1  | Import and use a pure math helper                                | Find unintended runtime dependencies                   |
| M2  | Create an engine without loading a scene                         | Separate factory cost from rendering                   |
| M3  | Minimal moving scene with a basic shape                          | Measure the cost of a working minimal scene            |
| M4  | Links and classic collisions at different densities              | Measure spatial query and interaction costs            |
| M5  | Fluid with fixed options and seed                                | Measure dense workloads and sensitivity to query order |
| M6  | Groups, emitters/absorbers, and add/remove cycles                | Measure counts, pool, and retention after churn        |
| M7  | Many Z layers and depth changes                                  | Measure buckets, sorting, and draw order               |
| M8  | HDR, background mask, layers, and resize                         | Measure the render pipeline and optional features      |
| M9  | Two concurrent engines with different plugins                    | Measure per-instance costs and isolation               |
| M10 | Standalone CDN and engine with external features, including lazy | Measure full page and startup costs                    |

For M3–M8, use at least three explicit particle counts, such as 100, 1,000,
and 5,000 if the environment supports them. Keep N fixed across comparisons.
If a scenario saturates the browser, record it and also test a comparable workload.

## Procedure

1. Record the commit, working-tree diff, Node/pnpm, bundler/minifier,
   browser/version, system, machine, viewport, devicePixelRatio, enabled
   features, and output format.
2. Reuse deterministic configurations and RNG sequences. Separate simulation
   time from wall-clock time and preserve random call order.
3. Separate cold load, asset loading, particle initialization, steady state,
   resize, and teardown. Warm up and take repeated samples. Record run lengths,
   sample counts, median, p95, and dispersion. Alternate baseline and variant
   where possible and compare on the same browser and machine.
4. Measure update and draw separately. Vsync can cap FPS. Report total frame
   cost, long frames, GC, and profiling overhead.
5. Measure heap/memory after repeated cycles and distinguish pool retention from
   leaks. Supplement instantaneous heap and forced GC with other evidence.
6. Record raw/min/gzip/Brotli, entry and total chunks for the same scene, source
   modules, and duplicates. Report cold and warm cache results separately.
7. Save results in `../V5-BUNDLE-REPORT.md` and the experiment log. Define budgets
   per scenario before size refactors, as specified by the main index.

## Experiment log

For each IMP, record ID, hypothesis, reviewed files, scenario, minimal variant,
before/after cost, repetitions, functional result, API/plugin cost, measurement
limitations, decision, and diff link. Valid statuses are pending measurement,
under analysis, implemented and verified, rejected with evidence, and deferred
with rationale.

Reviewing the opportunities is mandatory. Implement useful variants based on
results. Reversible in-scope work can proceed under existing authorization.
Public changes require migration consistent with the v5 contract and owning handover.

## Completion

Report measured values and label estimates as such. Evidence can close a rejected
candidate. Missing measurements keep it open. Gate 10 checks that every IMP has
an outcome and that global budgets remain satisfied.
