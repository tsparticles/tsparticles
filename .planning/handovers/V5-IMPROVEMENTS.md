# V5 — Performance and bundle size improvement plan

These six plans are part of v5. They detail opportunities found in the source
and specify experiments, alternatives, risks, and acceptance criteria.
Analysis is required. Implementation decisions depend on measured results.
Savings have yet to be demonstrated.

| Document                                                                                 | Ownership                                | Required outcome                                                    |
| ---------------------------------------------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------- |
| [IMP-01 — Measurements and baseline](improvements/V5-IMP-01-MEASUREMENT.md)              | 01 and 10, with evidence from all owners | Reproducible scenarios and decision log                             |
| [IMP-02 — Bundle graph and browser distribution](improvements/V5-IMP-02-BUNDLE-GRAPH.md) | 03/09 with 01/05/07/08                   | Selective imports, optional features, lazy loading, and duplication |
| [IMP-03 — Particle collections](improvements/V5-IMP-03-PARTICLE-COLLECTIONS.md)          | 06                                       | Group counts, removal, buckets, and pool                            |
| [IMP-04 — Spatial index](improvements/V5-IMP-04-SPATIAL-INDEX.md)                        | 06 and consumers in 08                   | Lookups and keys, cells, query output, and cell size                |
| [IMP-05 — Per-particle state](improvements/V5-IMP-05-PARTICLE-STATE.md)                  | 07 with 02/03/08                         | Options, getters and vectors, memory, and caches                    |
| [IMP-06 — Rendering and lifecycle](improvements/V5-IMP-06-RENDER-LIFECYCLE.md)           | 04/05 and consumers in 08                | Hooks and layers, canvas state, resize, and cleanup                 |

## Execution and tracking

Run the IMP work in the [E0–E10 execution sequence](V5-EXECUTION.md).
IMP-01 starts in E0; IMP-02 analysis starts in E3 and closes in E9; IMP-05
runs on the final Particle/color state in E5; IMP-03/04 run in E6; IMP-06
splits lifecycle work in E4 from final rendering work in E7. Owners read their
assigned plans before starting. IMP and handover numbers identify technical
topics; E0–E10 defines execution order.

Record a decision for every B/P/S/T/R candidate: implemented and verified,
rejected with evidence, or deferred with rationale and budget impact.
Mandatory requirements and budgets remain open when deferred. Gate 10 checks
outcomes, analysis coverage, and remaining issues. Measurements may justify
rejecting an optimization.

Initial evidence comes from the reviewed 4.5.1 checkout. Recheck it against the
current code. An earlier phase may have removed a cost or changed a contract.
Reuse existing refactors and tests.

## Links to architecture decisions

The four [architecture evaluations](V5-ARCHITECTURE.md) use IMP evidence
to compare alternatives. IMP-05 informs ARCH-01/03 (Particle and options),
IMP-02 informs ARCH-02 (packages), and IMP-06 informs ARCH-04 (extension
lifecycle). Record decisions in the architecture log and reuse implementations
and measurements across plans.
