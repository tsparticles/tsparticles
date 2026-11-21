# V5 — E11 optional plugin performance and coverage backlog

Status: optional, pending profiling. Scheduled **after E10**, outside the mandatory
v5 release-readiness gate. This is an extension to the [execution sequence](V5-EXECUTION.md),
not permission to implement it now. It covers existing plugins omitted from the
previous detailed performance plans; new packages are only conditional extraction
candidates. Do not move mandatory fixes, migration, isolation, color fidelity or
[G1–G7](V5-CODE-REVIEW.md) into this optional backlog.

## Entry and decision protocol

- Use the verified E10 artifacts and contracts as the new experiment baseline;
  keep E0 comparisons for release-level costs. Apply IMP-01 measurement methods.
- Record profiles first: self/total CPU, allocation/heap, p95 frame/startup cost,
  workload dimensions and bundle bytes. These are source-supported hypotheses,
  not demonstrated bottlenecks or promised savings.
- Select one bounded experiment at a time. Order by measured benefit, then change
  risk; the ranking below is an initial recommendation. Reuse E5 color and E6/E7
  storage/rendering work instead of optimizing obsolete implementations.
- Preserve engine isolation, RNG semantics, plugin callbacks, visual output and
  supported formats. Use deterministic regression tests and realistic browser
  scenes, plus the shared lint/build/test checks for implementation changes.
- Keep `pending`, `selected`, `verified`, `rejected with evidence` and `deferred`
  statuses per candidate. Optional items do not block E10. A confirmed correctness
  issue returns to its mandatory owner and reopens the gate if necessary.

## Candidate order

| ID  | Candidate                                            | Initial priority               | Difficulty           | Cross-feature impact                      |
| --- | ---------------------------------------------------- | ------------------------------ | -------------------- | ----------------------------------------- |
| O1  | Links, triangles and cache lifetime                  | High                           | Medium–high          | Color, draw ordering, RNG and churn       |
| O2  | External interactions and DOM geometry               | High                           | Low–medium initially | Pointer semantics, selectors, layout      |
| O3  | Move, absorber forces and emitter setup              | High                           | Medium–high          | Simulation, mutable options and emission  |
| O4  | Noise and path sampling                              | Profile first                  | High                 | Seeds, field resolution and motion        |
| O5  | Masks and Poisson sampling                           | Profile first                  | Medium–high          | Startup memory, distributions and assets  |
| O6  | Collision/fluid consumer costs                       | Profile first                  | High                 | Numerical stability and query ordering    |
| O7  | Images/GIF, trails, gradients and effects            | Profile first                  | Medium–high          | GPU/canvas memory, alpha and capabilities |
| O8  | Remaining extension coverage and optional extraction | Lower unless profiles disagree | Variable             | Package graph and compatibility           |

### O1 — Links and triangles

Sources: `interactions/particles/links/src/{LinkInstance,Linker,Utils,CircleWarp}.ts`.
LinkInstance already batches compatible strokes; preserve that work. Triangle
rendering builds a Set from a temporary mapped array per particle. Frequency keys
map IDs, copy/sort and join arrays for pairs/triples. Color and frequency maps
have no size bound in this class and clear on init rather than per particle death.

Compare direct fixed-arity canonical keys, reusable membership data and bounded
style storage. Frequency eviction must not randomly change a still-live edge's
visibility: distinguish visual identity state from a recomputable style cache.
Measure N, edge count, degree, triangle density, warped neighbors and long emitter
churn. Preserve triangle multiplicity, blend/Z order, twinkle/RNG draws, recycled
IDs and E5 alpha/gamut behavior. Check retained map sizes after churn/refresh.

### O2 — External interactions

Sources: `interactions/external/connect/src/Connector.ts`, parallax/drag,
bubble/repulse/bounce/destroy implementations and plugin-interactivity.
Connect loops over `query.slice(i + 1)` for each candidate: indexed pair traversal
can remove repeated temporary arrays without claiming to remove quadratic pair
work. Parallax and drag materialize filtered particle arrays. Several div modes
query selectors and read geometry while handling interactions.

Start with allocation-free traversal preserving order, then profile geometry
reads before considering a cache. Invalidate for layout, scroll, CSS transforms,
selector changes, resize and pointer target changes; do not assume resize alone
captures layout changes. Test multiple pointers, enabled-state mutation, pointer
coordinates/DPR, external elements and removal during callbacks. Report candidate
count and layout cost, not only total particles.

### O3 — Movement, absorbers and emitters

Sources: `plugins/move/src/{Utils,MovePluginInstance}.ts`,
`plugins/absorbers/src/{AbsorberInstance,AbsorbersPluginInstance}.ts`, and
`plugins/emitters/src/EmitterInstance.ts`.
Move constructs a velocity Vector, defines an integration closure and can compute
`log(decay)` repeatedly per particle/frame. Spin builds a function-selection
object. Compare scalar/scratch computations and a shared decay coefficient within
one call before adding persistent caches; mutable options need invalidation.
Preserve near-unit decay accuracy, negative/zero decay, speed limits and the
existing equal-elapsed-time tests.

Absorbers allocate force vectors and revisit forces/attraction to build an orbit
field. Compare one immutable per-particle force snapshot reused across those
calculations, preserving mass-growth, splitting and recycle ordering. Do not
truncate long-range attraction with a spatial radius without an explicit new
behavior. Measure both particle count and absorber count.

Emitters conditionally deep-copy options for shape/color animation. Evaluate
resolved templates or smaller overrides using E5 ownership rules. Test mixed
shapes, sampled ranges, reduced motion, burst quantities, particle rejection and
pool reuse; never share mutable per-particle options merely to avoid copying.

### O4 — Noise and paths

Sources: `utils/noiseField/src/NoiseFieldGenerator.ts`,
`paths/curlNoise/src/CurlNoiseGenerator.ts`, grid/SVG paths and noise utilities.
NoiseField updates every cell of a three-dimensional Vector field, using two 4D
noise calls plus length/angle conversions per cell. Curl computes four 2D samples
per particle. Measure field cells/layers and occupancy separately from particles.

Compare direct x/y assignment from polar results, flat storage, occupied-cell
sampling and incremental field work independently. Reducing update frequency or
interpolating a coarser field changes output; require an explicit quality option
and error/visual bounds rather than calling it equivalent. Preserve seeds,
per-container ownership, returned scratch-vector lifetime, z sampling and resize.
G2 listener cleanup and G6 maze sampling correctness must already be closed.

### O5 — Masks and Poisson

Sources: `plugins/canvasMask/src/utils.ts`, `plugins/emittersShapes/canvas/src/EmittersCanvasShape.ts`,
`plugins/polygonMask/src/PolygonMaskInstance.ts`, `plugins/poisson/src/PoissonDisc.ts`
and `utils/canvasUtils/src/Utils.ts`.
CanvasMask builds/shuffles a full pixel-index array even when it emits few particles.
Canvas emitters use up to 100 rejection attempts per point. PolygonMask traverses
vertices for containment. Poisson uses nested grid arrays and splice on its active
list; its async run already yields periodically, so evaluate responsiveness rather
than proposing yielding as a missing feature.

Compare eligible-pixel tables, partial sampling, compact pixel storage, path/bounds
acceleration and active-list alternatives. Include sparse/empty masks, large images,
small output counts and resize. Preserve sampling distribution, alpha/P3, filter
callback semantics and random-call contracts. Precomputing arbitrary user filters
may change behavior. Bound memory and define invalidation; do not trade a small
CPU saving for an unbounded image-sized cache. G4 input validation comes first.

### O6 — Collision and fluid costs

Sources: `interactions/particles/collisions/src/{Collider,Fluid,Bounce}.ts`.
Classic collision queries allocate their result arrays; Fluid already reuses
neighbor storage and has multiple deliberate pressure/separation passes. Compare
caller-local output reuse and invariant arithmetic before any solver rewrite.
Measure visited cells, tested/accepted neighbors, density and convergence, including
sparse predicate queries. `maxNeighbors` limits accepted neighbors, not necessarily
all grid traversal. Any early termination API must preserve selection/order and
live predicate behavior. Keep E6 spatial snapshots and mixed-radius semantics.

Changing iterations or sharing neighborhoods across particles can change physics.
Such variants require separate numerical/visual acceptance, including walls,
coincident particles, settling and equal-time behavior. Avoid a new solver in the
same change as a query/data-layout optimization.

### O7 — Assets and drawing extensions

Inspect `shapes/image`, `shapes/gif`, gradient updater, trail plugin/effect,
filter/shadow effects and canvas utilities. Measure decode/recolor startup,
intermediate-surface memory, animated gradients/styles and retained frames.
Image/GIF implementations already cache and guard some async reuse paths; first
record which lifecycle and memory costs remain after E5/G3.

Consider bounded decoded/recolored assets or prepared drawing data only where
profiles show reuse. Preserve animation disposal/timing, custom drawing hooks,
color/alpha precision, export and supported canvas contexts. Count GPU/canvas
memory as well as JS heap. Worker/Offscreen support is verified per capability;
DOM-dependent features need an explicit support result rather than a claim that
all plugins run in workers.

### O8 — Coverage sweep and conditional new capabilities

After higher-priority profiles, cover infection, sounds, image/video/JSON exports,
motion, responsive/themes, light, less-used updaters/shapes/effects and presets.
Track cost as disabled, enabled idle, active, cold startup and teardown. A plugin
that only runs at setup should not receive a per-frame cache by default.
Compatibility and resource cleanup remain mandatory E8 work even if optimization
is deferred. Record unchanged/no-hotspot outcomes instead of manufacturing edits.

No wholly new visual plugin is justified by this source review alone. If profiles
justify extracting a capability, consider an opt-in profiling helper or a shared
asset/path utility only when at least two real consumers benefit. Prefer the
existing package when possible; specify API, loader, ownership, dependencies,
manifest/bundle changes, tests, docs and total bytes before proposing a new package.
Do not add adaptive quality, workers, GPU rendering or a replacement physics engine
as hidden prerequisites for v5.

## Deliverables

Create an E11 experiment report only when this optional phase is selected. Record
candidate decisions, baseline revision, workloads, measured benefits/regressions,
consumer verification and migration impact. A smaller selected subset is valid;
there is no obligation to implement all eight candidates or create new plugins.
