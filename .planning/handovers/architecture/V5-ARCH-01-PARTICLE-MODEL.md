# V5-ARCH-01 — Particle state, behavior, and serialization

Status pending evaluation. Owner 07 with 06, public contracts in 03, consumers
in 08. Agree on the contract in 03 before changing 06.

## Evidence and problem

`engine/src/Core/Particle.ts` holds public data, vectors with behavior,
`ParticlesOptions`, private Container/PluginManager references, modifiers, and
caches. `init()` coordinates Retina, updaters, drawers, and plugins.
`destroy()` emits hooks and events. `draw()` uses the container renderer.
Options and initialization already have external helpers. `getPosition()`
reuses a private cache, whose aliasing semantics matter.

The class is a valid runtime facade. A persistable state format also needs to
account for reachable objects, resources, and extension state. Prototype
methods do not allocate a closure per particle. Measure memory before claiming
savings from moving methods into functions.

## Alternatives

| Alternative                                                   | Expected benefit                                              | Cost or constraint                                                                      |
| ------------------------------------------------------------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Existing class with cohesive internal helpers                 | Minimal migration and stable plugin API                       | State remains coupled to runtime dependencies                                           |
| Class/runtime facade with explicit snapshot                   | Export and tests over controlled data without rewriting loops | Requires a selected, versioned format and restore procedure                             |
| Plain state with functions/systems and optional plugin facade | Clearer separation and potential reuse in other runtimes      | Field/method, vector, extension state, and pooling migration, plus possible indirection |
| Typed arrays/SoA and handles                                  | Potentially lower memory and batch transfers                  | Highest ecosystem impact and a separate experiment                                      |

Start with a small runtime facade and evaluate an explicit snapshot. Extract
behavior where it improves dependencies or testability. Adopt plain state only
with a use case and supporting profiles. A nested object per particle can increase memory.

## Responsibilities

- Particle/state owns particle identity and data and provides minimal extension
  access. Prefer pure functions for derived getters when inputs suffice.
- Domain helpers handle init/reset and calculations with explicit state and
  context. Avoid ambient engine access and per-particle closures.
- ParticlesManager owns collection, IDs, pool, groups, spatial index, and phase
  coordination. Consider batch orchestration there. Keep color, bounds, options,
  and rendering with their appropriate owners.
- Renderer/drawer owns drawing and graphics resources. Preserve hook order,
  arguments, and once-only lifecycle execution.

Map each field and method to ownership, mutability, frequency, consumers, and
snapshot inclusion. Distinguish simulation state, shared configuration,
recomputable data, temporary caches, and external resources.

## Serialization contract

Choose a use case: inspection/export, worker transfer, or save/resume. Specify
support for JSON, structured clone, or transferable buffers explicitly.
Deterministic scene resumption and worker support need more than a Particle snapshot.

For a proposed `ParticleSnapshot`, define version, numerical coordinates,
units/Retina, configuration and resource IDs, included/excluded fields, and input
validation. Keep Container, functions, canvas contexts, and runtime references
out of the payload. Resolve resources in the destination context without
transporting the engine or sharing mutable objects across engines.

Extensions may hold nonserializable state. Evaluate opt-in versioned codecs
per capability with ARCH-04. Define an error, exclusion, or reconstruction when
a codec is missing. Avoid silent state loss and a generic public-field serializer.

For restore, define creation with a new owner, vector and cache reconstruction,
ID conflicts, collection/grid/bucket updates, and hook execution. Preserve
restored data through initialization and avoid drawing RNG samples again.
Exact replay also requires clock, restorable RNG state, collection order, and
container/plugin state. Arbitrary RNG functions may be nonrestorable. Without
those contracts, promise snapshots only for declared data.

## Experiments and acceptance

1. Compare the class, class with snapshot, and plain-state prototype in the same
   [IMP-05](../improvements/V5-IMP-05-PARTICLE-STATE.md) scenario. Measure heap per
   particle, init, churn/pool, update/draw, and consumer bundle. Measure snapshot
   cost separately from the frame.
2. Verify fields and methods used by move/outModes, collisions/fluid, links,
   emitters, absorbers, modifiers, and shapes with resources. Document migration
   for removed methods and keep adapters optional where possible.
3. If adopted, test payload round trips, invalid input or version, absence of
   runtime references, and missing codecs. Test structured clone if supported.
4. Verify reset and reuse across groups, one-time disposal and hooks, and two
   isolated engines. If resumption is supported, compare deterministic subsequent
   ticks in a scene with explicitly supported extensions.

Record ownership, the chosen alternative and rationale, serialization scope,
and evidence in ARCH-01. Full runtime serialization and an ECS rewrite remain
optional design choices.
