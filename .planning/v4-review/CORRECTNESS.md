# v4 runtime defects and remediation plan

The numerical examples below provide minimal inputs for regression tests. The proposed changes use existing v4 APIs. See the [plan index](README.md) for priorities and sequencing.

## V4-B01 · P1 · Concurrent first loads see different plugin registrations

**Reproduced.** Register an async loader that waits at a barrier before adding a plugin. Start two `engine.load()` calls with distinct IDs while the loader is paused. The second load completes with zero plugins. After the barrier is released, the first completes with one plugin. `PluginManager.init()` returns immediately while loaders are running, and the second `Engine.init()` treats that return as completion. The manager also sets its initialized flag when a loader fails. [Engine](../../engine/src/Core/Engine.ts#L98), [PluginManager](../../engine/src/Core/Utils/PluginManager.ts#L270).

**Patch.** Share a single initialization promise among external callers. Preserve nested `register()` calls within the batch to avoid deadlock. Define rejection behavior before implementing the fix. All callers should see the same error, and a subsequent load must wait for a complete registry. A retry is acceptable if it handles loaders that already ran and any partial writes consistently.

**Acceptance.** In [LoadOrdering](../../utils/tests/src/tests/LoadOrdering.ts), verify the same plugins in both containers, one execution per loader on the successful path, and deterministic batch rejection. Cover nested registration and preserve ordering for concurrent loads with the same ID.

## V4-B02 · P1 · Startup can hang or emit an event for a destroyed container

**Reproduced.** A rejecting `plugin.start()` hook triggers an `unhandledRejection`. `Engine.load()` stays pending, and `items` retains a container with `started = true`. If startup is paused in a hook, calling `destroy()` and then releasing the hook still emits `containerStarted`, even though the load returns `undefined`. The async timer callback runs independently of the outer promise. `Engine.load()` inserts the new container before awaiting startup. [Container](../../engine/src/Core/Container.ts#L559), [Engine](../../engine/src/Core/Engine.ts#L182).

**Patch.** Handle errors and cancellation within the same startup operation. Invalidate the operation on `stop`, `destroy`, and restart, and check that it is current after each await. On error, release resources and remove only the failed instance. Settle the caller's cancellation even if a third-party hook keeps waiting. Preserve the public promise, delay, and cancellation semantics already covered by tests. Protect newer loads and their canvases from cleanup performed by an older load.

**Acceptance.** Extend [StartCancellation](../../utils/tests/src/tests/StartCancellation.ts) and [ContainerLifecycle](../../utils/tests/src/tests/ContainerLifecycle.ts) with hooks that reject or pause during `init` and `start`, calls to `stop` and `destroy` at different stages, concurrent starts, and replacement by the same ID. Check for late startup events, duplicate cleanup, and leftover listeners or frames. Verify existing event order and outcomes on successful startup.

## V4-B03 · P1 · Repeated play calls queue multiple animation loops

**Reproduced.** With a container already playing, two `play()` calls add two scheduler requests. `draw()` overwrites the only stored handle. Each callback can schedule another, and `pause()` cancels only the last known handle. [Container](../../engine/src/Core/Container.ts#L331), [pause/play](../../engine/src/Core/Container.ts#L463), [nextFrame](../../engine/src/Core/Container.ts#L672).

**Patch.** Keep at most one active request per container and clear its handle when the callback begins. Preserve the timestamp reset requested by `force`, documented hooks, and the single frame that updates a paused scene.

**Acceptance.** With a fake scheduler, check pending callbacks and updates per tick after repeated `play()`, `play(true)`, pause, visibility changes, resize, stop, and destroy. Preserve the first delta and `autoPlay: false` behavior.

## V4-B04 · P1 · An explicit OffscreenCanvas fails to start without a DOM

**Reproduced in a simulated environment.** With an explicit canvas, resize disabled, and no `document`, `Engine.load()` stays pending and the startup callback fails with `document is not defined`. Canvas selection accepts OffscreenCanvas, then the lifecycle directly accesses `document` to track visibility. The pending promise follows the mechanism in V4-B02. [Engine](../../engine/src/Core/Engine.ts#L195), [EventListeners](../../engine/src/Core/Utils/EventListeners.ts#L103).

**Patch.** Enable DOM hooks according to the surface and environment while preserving hooks on a page. Also check Retina, resize, scheduling, observers, and teardown on the paths the worker uses. Keep the caller's surface and existing overloads.

**Acceptance.** Run a browser smoke test in a dedicated worker with a transferred canvas, covering load, ticks, and teardown. Repeat with an OffscreenCanvas created in the worker. On a page, verify visibility, resize, styling, canvas reuse, and release. Limit the support claim to the core and features exercised in the worker.

## V4-B05 · P1 · Particle initialization and drawing use different updater instances

**Reproduced.** A custom initializer with a counter runs twice during startup. `init(particle)` uses instance 2, and `afterDraw(particle)` uses instance 1. `Container.init()` creates updaters before renderer setup, then `ParticlesManager` recreates them. An updater with its own state can encounter missing values during drawing. [Container](../../engine/src/Core/Container.ts#L388), [CanvasManager](../../engine/src/Core/CanvasManager.ts#L231), [ParticlesManager](../../engine/src/Core/ParticlesManager.ts#L548), [RenderManager](../../engine/src/Core/RenderManager.ts#L419).

**Patch.** Consolidate initialization within each internal cycle and synchronize renderer caches when an existing path recreates updaters. Verify the ordering required by options, resize, and drawer initialization. Preserve the public method and hook semantics.

**Acceptance.** Use a test updater with per-particle state shared across init, update, before/afterDraw, and destruction. Repeat for start, redraw, and refresh. Verify shape and effect drawers with aliases, plus gradient, orbit, and paint. Count initializer calls on cold startup to measure any savings.

## V4-B06 · P1 · A remote SVG can stop animation before the fetch completes

**Reproduced in the generator.** Configure a URL and hold the `fetch` response. The first `generate()` call tries to read the length of a missing path. On the normal path, Move calls the generator during a frame, and the loop logs the exception without scheduling the next frame. The fetch from `init()` also leaves the HTTP status unchecked and its rejection unhandled. [SVGPathGenerator](../../paths/svg/src/SVGPathGenerator.ts#L103), [fetch](../../paths/svg/src/SVGPathGenerator.ts#L181), [Move](../../plugins/move/src/MovePluginInstance.ts#L55), [loop](../../engine/src/Core/Container.ts#L697).

**Patch.** Track readiness inside the generator. Return a neutral contribution while paths are pending, leaving the particle index and state untouched and allowing the frame to continue. Handle HTTP and parse errors, empty paths, and results that arrive after a reset or configuration change. Keep `IMovePathGenerator` synchronous and preserve inline data support.

**Acceptance.** In [PathGenerators](../../utils/tests/src/tests/PathGenerators.ts), control the fetch and exercise ticks before and after readiness, HTTP and parsing errors, stale responses, and inline data. Once data arrives, particles follow the path without a refresh. Frames continue after an error.

## V4-B07 · P2 · Two HTML elements without IDs replace one another

**Reproduced.** Call `load({ element, options })` on two distinct HTML hosts without an `id` attribute. Both internal IDs are `""`, the first container is destroyed, and `items` contains just one. The fallback uses `??`, while a missing HTML ID is an empty string. [Engine](../../engine/src/Core/Engine.ts#L131), [host resolution](../../engine/src/Utils/Utils.ts#L601).

**Patch.** Distinguish an explicit ID from an element's implicit empty value. Give anonymous hosts a stable internal ID based on element identity without changing the HTML attribute. Preserve replacement on the same host and the precedence of `params.id`.

**Acceptance.** Cover two independent anonymous hosts, reloads on the same host, concurrent requests, explicit IDs including empty ones, and a directly supplied HTML canvas. Verify removal of generated canvases and reuse of caller-supplied ones.

## V4-B08 · P1 · Collisions between unequal radii depend on creation order

**Reproduced with the real Collider and grid.** Use radii 5 and 20 with centers 15 units apart in `destroy` mode. The smaller particle survives with the lower ID and is destroyed when the IDs are reversed. The broad phase uses `2 * radius1` and skips the reverse check by ID, while contact requires `radius1 + radius2`. [Collider](../../interactions/particles/collisions/src/Collider.ts#L62).

**Patch.** Make pair selection symmetric and resolve each pair once. Evaluate a conservative distance per frame based on current radii, with safe updates when radii change. Preserve the order and cost of scenes with uniform radii and preserve the `fluid` solver.

**Acceptance.** In [CollisionResolve](../../utils/tests/src/tests/CollisionResolve.ts), cover both orders, exact contact and misses, resize/DPR and animated radii, bounce/absorb/destroy, and one resolution per pair. Profile uniform and mixed radii before accepting the broad phase.

## V4-B09 · P2 · Reapplying the same density can alternate the particle count

**Reproduced.** On a 100×100 canvas at DPR 1 with `number.value = 3` and a density reference of 200×100, the target is 1.5. Four observations at startup and after repeated `setDensity()` calls yield `1, 2, 1, 2`. Both `push()` and `removeAt()` effectively round the fractional difference up. Code inspection also shows that a zero reference dimension can produce an infinite target and a nonterminating insertion loop. [Density and limits](../../engine/src/Core/ParticlesManager.ts#L392), [factor](../../engine/src/Core/ParticlesManager.ts#L530), [density options](../../engine/src/Options/Classes/Particles/Number/ParticlesDensity.ts).

**Patch.** Normalize the target once to a finite integer before calculating the difference. Define a rounding policy that accounts for effective limits and existing visual results. Define a fallback for nonpositive reference dimensions and nonfinite values. Preserve `wait`/`delete` precedence, plugin counts, and groups.

**Acceptance.** In [ParticleGroups](../../utils/tests/src/tests/ParticleGroups.ts), applying identical inputs twice yields the same count and no extra events. Test DPR 1 and 2, resize, fractional targets, global and group limits, plugin contributions, and termination with degenerate inputs.
