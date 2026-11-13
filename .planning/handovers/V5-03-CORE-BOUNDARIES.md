# V5-03 — Domain folders and a minimal public API surface

Status pending. Start inventories in E0; execute contracts and internal boundaries
in E3 after E2. Physical package extraction is evaluated here and finalized in E9.
See the [execution sequence](V5-EXECUTION.md).

## Ownership

Core structure and imports, `exports.ts`, `export-types.ts`, engine package
exports, dependency checks, and consumers importing reclassified symbols.
Keep existing algorithms and lifecycle in this phase and preserve other agents' changes.

## Required review of the entire engine

Create `V5-ENGINE-AUDIT.md` with every file under `engine/src/`, including small
or already modular areas. Record file/area, responsibility, exports/consumers,
shared state, dependencies/cost, owner/handover, decision, and verification
evidence. Include each new file regardless of its size.

| Area                                                                  | Review ownership                                           |
| --------------------------------------------------------------------- | ---------------------------------------------------------- |
| Entry, Engine, and initialization                                     | 01, with services in 02 and API/imports in 03              |
| PluginManager, registries, and loaders                                | 01–03, with extension impact in 08                         |
| Container and lifecycle                                               | 04                                                         |
| CanvasManager and RenderManager                                       | 05                                                         |
| ParticlesManager and SpatialHashGrid                                  | 06                                                         |
| Particle and Retina                                                   | 07                                                         |
| EventListeners and EventDispatcher                                    | 04, with canvas verification in 05                         |
| Math/Color/Log/Error/Type/Options utilities, ranges/vectors/constants | Full review in 02/03, with relevant optimizations in 04–07 |
| Option classes and interfaces, types/enums, exports                   | 03, with compatibility tests in 08                         |
| Browser/lazy and distribution                                         | Migration in 01 and refinement in 09                       |

Handover 03 owns remaining areas and explicitly assigns files outside the table.
A decision to keep a file is valid when it records the technical reason, consumers,
and verification. The final gate requires full coverage of the matrix.

## Proposed starting structure

```text
engine/src/Core/
  Engine/
    index.ts             # selective domain entrypoint
    Engine.ts
    ...                  # internal services and registration
  Container/
    index.ts
    Container.ts
    ...                  # internal lifecycle helpers
  Canvas/
    index.ts
    CanvasManager.ts
    ...                  # internal canvas and style helpers
  Rendering/
    index.ts
    RenderManager.ts
  Particles/
    index.ts
    Particle.ts
    ParticlesManager.ts
```

Use the observed graph to place `Interfaces/`, `Utils/`, and `Retina`. Move
files where the domain boundary warrants it. Record final names in STRUCTURE.

## Work

1. Inventory exports and uses, including application APIs, plugin contracts,
   runtime values required for inheritance, and internal details. Option classes
   extended by plugins, `IOptionLoader.load()`, animation APIs, and
   Container/Particle types are sensitive.
2. Design an acyclic graph and distinguish runtime imports from `import type`.
   Keep domain exports explicit. Within a domain, import siblings directly
   without reimporting the domain barrel or engine root.
3. Introduce folders and update `.js` imports, emitted declarations, TypeDoc,
   and tests. Keep necessary public types in the root exports. List intentional
   API removals and document alternatives.
4. Keep new domain entrypoints selective. Internal helpers can export symbols
   to siblings and keep them out of the index.
5. Enforce boundaries using the existing dependency or ESLint configuration.
   Block deep imports across domains and from consumers. `package.json#exports`
   limits public subpaths. Internal relative and physical imports need separate checks.
6. Verify the root and `./lazy` entries in source and `package.dist.json`.
   Add subpaths only for real consumer needs and with inclusion measurements.
7. Propose optional feature extraction with recoverable bytes, migration and
   default behavior costs, and a plugin contract before implementing it in 04/05.

## Acceptance tests

- Check for new runtime cycles. Verify the selected rule catches a forbidden
  deep import and allows a valid public import.
- Compile representative TypeScript consumers through public APIs, including
  a plugin option loader, a derived class, callback types, and a custom plugin.
- Smoke-test the built package across ESM/CJS root and `/lazy`, browser root,
  and type resolution.
  Check that type-only classes do not become runtime exports.
- Compare bundle sizes with 02 and justify any added cost. Measure the output
  graph to substantiate savings.
- Pass downstream builds, suites, lint, and formatting checks.

## Deliverables

Complete `V5-ENGINE-AUDIT.md` with ownership and current review status for every
file, extending the inventory started in E0. Later owners close their reviews.

Provide the public/internal matrix, domain graph, enforced rules, API removal list,
and measurements. Update ARCHITECTURE/STRUCTURE and status. Later handovers use the
new paths. References to original names identify ownership.

## Performance and size plans

See [V5-IMP-02-BUNDLE-GRAPH](improvements/V5-IMP-02-BUNDLE-GRAPH.md).
Record assigned outcomes as specified in the [improvement plan](V5-IMPROVEMENTS.md).

## Architecture evaluations

Consult all four [architecture plans](V5-ARCHITECTURE.md). Draft coordinated
Particle state, option, and extension capability contracts before changing
them. Compare internal boundaries, subpaths, and separate packages. Record
initial decisions and constraints for 04–08 with alternatives and real
consumers. Revisit contracts explicitly when later verification reveals
incompatibilities.

## Required color migration

Follow [V5-COLOR — OKLCH](V5-COLORS-OKLCH.md). In C0/C1, define units, alpha,
color manager contracts, h/c/l animation, legacy input, and conversion boundaries
before propagating types. Coordinate ARCH-01/03/04 and give 05 the necessary
Particle contracts.
