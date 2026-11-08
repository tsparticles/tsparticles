# V5 — Architecture evaluations

The initial evaluations were written on 2026-11-06 against `4.5.2`.
Implementation decisions and measurements are pending. The original `4.5.1`
reconnaissance and these observations are historical evidence. Record the
actual commit and package version before experiments and compare variants
against the same baseline. See the [handover index](README.md).

## Decisions to evaluate

| Topic          | Starting recommendation                                                                                                         | Plan                                                  | Ownership                      |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------ |
| Particle       | Separate state and behavior where useful. Evaluate explicit snapshots before making the entire runtime object serializable.     | [ARCH-01](architecture/V5-ARCH-01-PARTICLE-MODEL.md)  | 06/07, contracts in 03/08      |
| Engine package | Start with internal boundaries and selective subpaths. Extract packages only for verified consumers and benefits.               | [ARCH-02](architecture/V5-ARCH-02-ENGINE-PACKAGES.md) | 03, verification in 09/10      |
| Options        | Separate input, resolved configuration, and runtime state. Compare existing loaders with normalization and shareable templates. | [ARCH-03](architecture/V5-ARCH-03-OPTIONS.md)         | 03/07, integration in 04/08    |
| Extensions     | Evaluate shared registration and lifecycle with typed capabilities, preserving specialized frame pipelines.                     | [ARCH-04](architecture/V5-ARCH-04-EXTENSIONS.md)      | 03/08, integration in 04–07/09 |

Evaluate serialization, package composition, option costs and semantics, and
extension consistency separately. Measure each change's bundle impact.

## Integration into the v5 sequence

These evaluations are part of the [01–10 handovers](README.md). Each evaluation
is required. Implement a proposed rewrite only when the evidence supports it.
The singleton, service isolation, coverage, and budget requirements still apply.

1. In 01/02, identify dependencies and constraints for explicit engines.
   Keep registries per engine and evaluate package splits in the later steps.
2. In 03, propose contracts for state, options, and extensions and compare
   package boundaries. Consult ARCH-01/03/04 together to avoid incompatible
   APIs. Draft contracts before considering a physical split.
3. In 04–07, verify the contracts in lifecycle and hot paths. In 06, agree on
   Particle and ParticlesManager responsibilities before changing collections.
   In 07, implement only selected and measured alternatives.
4. In 08, complete migration and verification across extension families.
   In 09, verify package distribution and composition.
5. In 10, close decisions and document actual breaking changes in the v4 → v5 guide.

## Decision log and completion

During execution, create `V5-ARCHITECTURE-DECISIONS.md` in the handover directory.
For ARCH-01–04, record the problem, affected contracts and consumers, alternatives,
decision and rationale, measurements/tests, API migration, risks, and final status.
Keeping the implementation is valid with evidence. Deferring a rewrite requires
a rationale and impact assessment. Unmet mandatory requirements and budgets remain open.

Share the baseline and experiment log from [IMP-01](improvements/V5-IMP-01-MEASUREMENT.md).
IMP owns optimizations, and ARCH owns model and contract decisions. Link evidence
and reuse experiments. API proposals describe possible future contracts.
