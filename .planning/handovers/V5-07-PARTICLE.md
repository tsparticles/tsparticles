# V5-07 — Full Particle review

Status pending. Requires completion of 06. All of `Particle.ts` is in scope.

## Ownership

Particle, initialization and state helpers, integration with Retina, options,
modifiers, drawers, and updaters, plugin contracts, and related tests.
Preserve other contributors' changes and invariants established in 06.

## Work

1. Inventory fields, methods, getters, and helpers across the file. Cover
   construction/init, options and group/shape/effect overrides, position and
   velocity, size and color, bounds, destruction, reset, and extension state.
   Distinguish required state from optional capabilities currently in core.
2. Review option construction and hook initialization in order, including
   defaults, presets/overrides, Retina, modifiers, shapes/effects, and
   updaters/plugins. Reduce redundant merges and work while preserving
   precedence and leaving shared inputs intact.
3. Review all Retina behavior at both container and particle level, including
   pixel ratio, reduce factor, dimensions, and random ranges. Verify resize updates.
4. Review repeated allocations and calculations in getters, updates, and
   rendering, vector handling, and color conversion. Require a benefit beyond
   extracting methods for any new per-particle closures or objects.
5. Evaluate extracting optional state or capabilities into helpers or plugins
   using bundle and memory evidence. For each change, provide a consumer
   migration and equivalent bundle defaults. Account for each feature.
6. Verify pool reuse and destroy/reset. Clear stale shape, effect, modifier,
   collision, and plugin data before incompatible reuse.
7. Preserve the minimal public access plugins need and their TypeScript
   extensions. Move internal implementations behind selective entrypoints.

## Acceptance tests

- Deterministically test option/group precedence, position and velocity init,
  random ranges and colors, Retina, bounds, destruction, and pool reset/reuse.
- Document and preserve hook/modifier/updater/drawer order. Verify that error
  paths and restarts do not duplicate destroy or particleCreated callbacks.
- Check representative consumers including move/outModes,
  size/opacity/color/rotate, collisions, links, emitters/absorbers, custom
  shapes/effects, and plugins with extended state.
- Measure memory per particle and allocations as well as update/draw cost.
  Verify isolation across groups, containers, and engines with different RNG/loggers.
- Compare min/gzip/Brotli for the same scene against 06 and the baseline.
  Run the full suite, lint/format, and downstream builds.

## Deliverables

Provide a field/method map, review decisions, changed APIs and migrations, and
measurements. Update the engine matrix from 03 with ownership and evidence for
every area.

## Performance and size plans

See [V5-IMP-05-PARTICLE-STATE](improvements/V5-IMP-05-PARTICLE-STATE.md).
Record assigned outcomes as specified in the [improvement plan](V5-IMPROVEMENTS.md).

## Valutazioni architetturali

Applicare [ARCH-01 — Modello Particle](architecture/V5-ARCH-01-PARTICLE-MODEL.md),
[ARCH-03 — Options](architecture/V5-ARCH-03-OPTIONS.md) e
[ARCH-04 — Estensioni](architecture/V5-ARCH-04-EXTENSIONS.md).
Confrontare classe, snapshot esplicito e stato plain, definendo quale livello di
serializzazione è utile e supportato. Distinguere spostamento dei metodi da vera
separazione delle dipendenze; coordinare stato mutabile, template options, codec
opzionali e reset con 06/08. Registrare anche le alternative mantenute o scartate.

## Migrazione colore obbligatoria

Consultare [V5-COLOR — OKLCH](V5-COLORS-OKLCH.md).
Completare C3: IOklch e IParticleOklchAnimation, fill/stroke/back color e modifier,
reset/pool, paint/gradient e animazioni h/c/l. Vietati alias s → c e doppio stato
HSL persistente; applicare il contratto legacy e alpha definito in C0.
