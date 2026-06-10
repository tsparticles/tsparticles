# Bundle Reduction Plan — @tsparticles/engine v4.2

## Goal

Reduce `@tsparticles/engine` bundle size from **74 KB → ~54–58 KB** (minified UMD) — a **~22–27% reduction** — without
user-facing breaking changes.

## Status Overview

| Phase  | Area                                                 | Status     | Est. savings              | Actual savings (engine)        |
|--------|------------------------------------------------------|------------|---------------------------|--------------------------------|
| **1a** | Sealed `load`/`doLoad` pattern                       | ✅ **Done** | ~1.5–2 KB                 | ~2 KB (pre-existing)           |
| **1b** | `loadProperty` helper                                | ✅ **Done** | ~3.5–6 KB (workspace)     | ~0 KB (engine), ~3–4 KB (pkgs) |
| **2**  | Utils.ts cleanup                                     | ✅ **Done** | ~0.6–1 KB + 0 KB (engine) | ~1.7 KB (engine)               |
|        | ↳ 2a: `alt` from canvas                              | ✅ Done     | —                         | 898 B                          |
|        | ↳ 2b: `findItemFromSingleOrMultiple` → interactivity | ✅ Done     | —                         | ~350 B                         |
|        | ↳ 2c: inline `getSize` + `arrayRandomIndex`          | ✅ Done     | —                         | ~180 B                         |
|        | ↳ 2d: extract `@tsparticles/animation-utils`         | ✅ **Done** | 0 KB (engine)             | 0 B (engine), +5.2 KB new pkg  |
|        | ↳ 2e: simplify `updateAnimation` delay               | ✅ Done     | —                         | ~100 B                         |
|        | ↳ 2f: `alt` removal (partial)                        | ✅ Done     | —                         | ~200 B                         |
| **3**  | ParticlesManager z-buckets                           | 📋 Planned | ~1–2 KB                   | —                              |
| **4**  | Particle.ts refactor                                 | 📋 Planned | ~1–2 KB                   | —                              |
| **5**  | Cross-package helpers                                | 📋 Planned | ~0.5 KB (engine)          | —                              |
| **6**  | ColorUtils tweaks                                    | 📋 Planned | ~0.3–0.5 KB               | —                              |
| **7**  | Inline Property Defaults (eliminate constructors)    | ✅ **Done** | ~0.8–1.5 KB               | ~1 KB (workspace)              |
|        | **Total remaining**                                  |            | **~2.8–5 KB**             |                                |
|        | **Already saved**                                    | ✅ Done     | **~6 KB total**           | **68–69 KB minified UMD**      |

**Current state:** 74 KB baseline → **68–69 KB** minified UMD (~7–8% reduction).  
Engine dist: `tsparticles.engine.min.js` = 69 KB (engine-only savings; workspace-wide ~1 KB).  
Savings: ~6 KB total from Phases 1a + 2a–2f + 7.  
Remaining potential: ~2.8–5 KB from phases 3, 4, 5, 6.  
`@tsparticles/animation-utils`: new package (5.2 KB) with `initParticleNumericAnimationValue()`, `updateAnimation()`,
`checkDestroy()`.

## Key Directives

- **No breaking changes** to the public API surface.
- Internal breaking changes (private methods, unused exports) are acceptable.

---

## ✅ Phase 1a — Sealed `load`/`doLoad` Pattern (Completed)

### Files changed

- `engine/src/Utils/OptionsUtils.ts` — Added `OptionLoader<T>` abstract base class
- `engine/src/Options/Classes/*.ts` (29 files) — All option classes converted

### What was done

1. **Added `OptionLoader<T>`** abstract base class in `OptionsUtils.ts`:
  - `load(data?)` method handles null-checking once (`if (isNull(data)) return; this.doLoad(data)`)
  - `protected abstract doLoad(data)` — subclasses override this instead of `load()`
  - Data parameter is guaranteed non-nullable in `doLoad()`

2. **Converted all 29 option classes:**
  - Changed `extends` from nothing to `extends OptionLoader<Interface>`
  - Renamed `load()` → `doLoad()`
  - Removed `IOptionLoader` from `implements` clause (inherited from base class)
  - Removed `isNull(data)` guard from every `doLoad()` method
  - Removed unused `isNull` imports (~27 files)

3. **Inheritance chains simplified:**
  - `AnimationValueWithRandom extends ValueWithRandom` — no null guard in child
  - `RangedAnimationOptions extends AnimationOptions` — no null guard in child
  - `ParticlesBounceFactor extends ValueWithRandom` — inherits `doLoad`, no override needed

### Impact on external packages

- `IOptionLoader` interface unchanged (`load(data?: RecursivePartial<T>): void`)
- All plugin option classes implement `IOptionLoader` directly — unaffected
- Verified: 18 downstream packages (updaters, interactions, plugins) build cleanly after engine rebuild

### Actual changes

- **~45 null guards removed** across 29 files
- **~29 `implements IOptionLoader<T>` removed** (inherited from base)
- **~27 unused `isNull` imports removed**
- **`OptionLoader` exported** from `engine/src/exports.ts` (via `Utils/OptionsUtils.js` barrel)
- ESLint `sort-imports` violations fixed in 20 option class files (first-member-name sorting)

### Estimated savings

~1.5–2 KB (removes ~40-50 null guards at ~26 bytes each + consolidates `load` method into single base class)

---

## Bundle Analysis — Top Contributors (engine/dist/report.html)

| Rank | File                                            | Bytes  | %     | Notes                                               |
|------|-------------------------------------------------|--------|-------|-----------------------------------------------------|
| 1    | `Core/Particle.js`                              | 21,642 | 11.6% | Single largest file; `init()` alone is 166 lines    |
| 2    | `Core/ParticlesManager.js`                      | 18,127 | 9.7%  | Phase 3 target                                      |
| 3    | `Utils/Utils.js`                                | 17,344 | 9.3%  | `memoize`, `updateAnimation`, `deepExtend` heaviest |
| 4    | `Core/RenderManager.js`                         | 16,041 | 8.6%  |                                                     |
| 5    | `Utils/ColorUtils.js`                           | 13,987 | 7.5%  | Heavy but necessary; marginal gains possible        |
| 6    | `Core/Container.js`                             | 13,446 | 7.2%  |                                                     |
| 7    | `Core/CanvasManager.js`                         | 12,662 | 6.8%  |                                                     |
| 8    | `Options/Classes/Particles/ParticlesOptions.js` | 5,288  | 2.8%  | Part of 30.9KB options suite (16.6%)                |
| 9    | `Options/Classes/Options.js`                    | 4,482  | 2.4%  | Part of options suite                               |
| 16   | `Options/Classes/Particles/Move/Move.js`        | 3,032  | 1.6%  | Part of options suite                               |

**Options/Classes/** (29 files) totals **30,945 bytes (16.6%)** — the largest directory after Core.

---

## Phase 1 — Options Class Boilerplate Reduction

### Files

- `engine/src/Options/Classes/` — 29 files, ~30.9KB total in bundle

### Current pattern (repeated in every file)

Every options class follows this identical structure:

**AnimationOptions.ts** (95 lines):

```ts
export class AnimationOptions implements IAnimation, IOptionLoader<IAnimation> {
  count: RangeValue;
  decay: RangeValue;
  delay: RangeValue;
  enable;
  speed: RangeValue;
  sync;

  constructor() {
    this.count = 0;
    this.enable = false;
    this.speed = 1;
    this.decay = 0;
    this.delay = 0;
    this.sync = false;
  }

  load(data?: RecursivePartial<IAnimation>): void {
    if (isNull(data)) {
      return;
    }                    // ← guard identico in tutti i 29 file
    if (data.count !== undefined) {                   // ← pattern ripetuto per ogni campo
      this.count = setRangeValue(data.count);
    }
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
    if (data.speed !== undefined) {
      this.speed = setRangeValue(data.speed);
    }
    if (data.decay !== undefined) {
      this.decay = setRangeValue(data.decay);
    }
    if (data.delay !== undefined) {
      this.delay = setRangeValue(data.delay);
    }
    if (data.sync !== undefined) {
      this.sync = data.sync;
    }
  }
}
```

**ValueWithRandom.ts** (69 lines) — same pattern:

```ts
export class ValueWithRandom implements IValueWithRandom, IOptionLoader<IValueWithRandom> {
  value: RangeValue;

  constructor() {
    this.value = 0;
  }

  load(data?: RecursivePartial<IValueWithRandom>): void {
    if (isNull(data)) return;
    if (!isNull(data.value)) {
      this.value = setRangeValue(data.value);
    }
  }
}

export class AnimationValueWithRandom extends ValueWithRandom
  implements IOptionLoader<IAnimationValueWithRandom> {
  readonly animation = new AnimationOptions();

  override load(data?: RecursivePartial<IAnimationValueWithRandom>): void {
    super.load(data);
    if (isNull(data)) return;                        // ← guard duplicato anche nell'override
    if (data.animation !== undefined) {
      this.animation.load(data.animation);
    }
  }
}
```

**Count the repetition across 29 files:**

- `isNull(data)` guard: ~29 instances
- `if (data.x !== undefined) { this.x = data.x; }`: ~100+ instances
- `if (data.x !== undefined) { this.x = setRangeValue(data.x); }`: ~50+ instances
- Constructor with inline defaults: ~29 instances
- `[name: string]: unknown;` index signature: ~29 instances

### Change 1a — Sealed `load`/`doLoad` pattern (✅ Done)

See the [completed phase summary](#-phase-1a--sealed-loaddoload-pattern-completed) above for details.

**What was implemented:**

Introduced `OptionLoader<T>` abstract base class in `engine/src/Utils/OptionsUtils.ts`:

```ts
export abstract class OptionLoader<T> implements IOptionLoader<T> {
  /** Sealed — handles null check, delegates to doLoad. Do NOT override. */
  load(data?: RecursivePartial<T>): void {
    if (isNull(data)) return;
    this.doLoad(data);
  }

  /** Override this instead of load(). Data is guaranteed non-null. */
  protected abstract doLoad(data: RecursivePartial<T>): void;
}
```

All 29 engine option classes converted to `extends OptionLoader<T>` with `doLoad()` replacing `load()`.

**Before** — every class has null guard:

```ts
export class AnimationOptions implements IAnimation, IOptionLoader<IAnimation> {
  count: RangeValue;

  // ...

  constructor() {
    this.count = 0; /* ... */
  }

  load(data?: RecursivePartial<IAnimation>): void {
    if (isNull(data)) return;                          // ← 1 of ~45 identical guards
    if (data.count !== undefined) {
      this.count = setRangeValue(data.count);
    }
    // ...
  }
}
```

**After** — extend `OptionLoader`, override `doLoad`:

```ts
export class AnimationOptions extends OptionLoader<IAnimation> implements IAnimation {
  count: RangeValue;

  // ...

  constructor() {
    this.count = 0; /* ... */
  }

  doLoad(data: RecursivePartial<IAnimation>): void {   // ← no null guard, non-nullable param
    if (data.count !== undefined) {
      this.count = setRangeValue(data.count);
    }
    // ...
  }
}
```

**For inheritance chains**, the benefit is even larger:

```ts
// Parent:
export class ValueWithRandom extends OptionLoader<IValueWithRandom> implements IValueWithRandom {
  doLoad(data: RecursivePartial<IValueWithRandom>): void {
    if (!isNull(data.value)) {
      this.value = setRangeValue(data.value);
    }
  }
}

// Child — no null guard at all:
export class AnimationValueWithRandom extends ValueWithRandom {
  readonly animation = new AnimationOptions();

  override doLoad(data: RecursivePartial<IAnimationValueWithRandom>): void {
    super.doLoad(data);                                // ← no null check, data is guaranteed non-null
    if (data.animation !== undefined) {
      this.animation.load(data.animation);
    }
  }
}
```

**Actual changes**: ~45 null guards removed, ~27 unused `isNull` imports removed, `IOptionLoader` dropped from
implements clauses. Plugin packages unaffected (they implement `IOptionLoader` directly).

**Estimated savings**: ~1.5–2 KB

---

### ✅ Phase 1b — `loadProperty` Helpers (Completed)

**What was done:**

1. **Added 5 helper functions to `engine/src/Utils/OptionsUtils.ts`:**
   - `loadProperty(obj, key, value)` — simple assignment when `value !== undefined`
   - `loadRangeProperty(obj, key, value)` — `setRangeValue()` assignment
   - `loadNestedProperty(obj, key, value)` — calls `obj[key].load(value)`
   - `loadLazyProperty(obj, key, value, factory)` — lazy-init + `.load()`
   - `loadExtendProperty(obj, key, value)` — `deepExtend` merge

2. **Converted ~130 files** across all option classes in:
   - **Engine** (19 files) — `Options/Classes/`
   - **Updaters** (28 files) — wobble, size, roll, opacity, life, gradient, orbit, twinkle, destroy, tilt, rotate
   - **Plugins** (49 files) — zoom, trail, blend, background-mask, polygon-mask, infection, poisson, themes, absorbers, motion, canvas-mask, interactivity, emitters, sounds, manual-particles, responsive
   - **Interactions** (20 files) — links, attract, collisions, repulse, light, grab, bubble, repulse, connect, attract, bounce, drag, trail, slow, parallax, remove, destroy, cannon, push, particle
   - **Shapes** (1 file) — image/Preload
   - **Bundles** (3 files) — confetti, fireworks, ribbons
   - **Interactions** (1 file) — external/trail/TrailColorWeight

3. **Key decisions:**
   - `loadColorProperty`/`loadAnimatableColorProperty` deferred — circular dependency with `OptionsColor`/`AnimatableColor` would require engine restructuring.
   - Changed helper type constraints from `Record<string, unknown>` to `object` with internal casts to allow class instances (no index signature) as the first argument.
   - `loadRangeProperty` uses `keyof T` + internal cast instead of a second type parameter `K` to satisfy `@typescript-eslint/no-unnecessary-type-parameters`.
   - Unconditional nested `.load()` calls kept inline (the helper call is longer than the direct call).
   - Preserved all `OptionsColor.create()`, `AnimatableColor.create()`, `deepExtend()`, `isArray()`, `isNumber()` special patterns as-is.

4. **Verification:**
   - All 49 affected NX projects build successfully.
   - All 139 tests pass (7 test files).
   - Lint clean (no new ESLint violations).

### Raw code example (AnimationOptions.doLoad — before vs after)

**Before:**
```ts
doLoad(data: RecursivePartial<IAnimation>): void {
  if (data.count !== undefined) {
    this.count = setRangeValue(data.count);
  }
  if (data.enable !== undefined) {
    this.enable = data.enable;
  }
  if (data.speed !== undefined) {
    this.speed = setRangeValue(data.speed);
  }
  if (data.decay !== undefined) {
    this.decay = setRangeValue(data.decay);
  }
  if (data.delay !== undefined) {
    this.delay = setRangeValue(data.delay);
  }
  if (data.sync !== undefined) {
    this.sync = data.sync;
  }
}
```

**After:**
```ts
doLoad(data: RecursivePartial<IAnimation>): void {
  loadRangeProperty(this, "count", data.count);
  loadProperty(this, "enable", data.enable);
  loadRangeProperty(this, "speed", data.speed);
  loadRangeProperty(this, "decay", data.decay);
  loadRangeProperty(this, "delay", data.delay);
  loadProperty(this, "sync", data.sync);
}
```

**Scope note:** Phase 1b was applied conservatively — only for safe patterns where the helper preserves behavior exactly. Complex cases (`SingleOrMultiple`, array allocations, color factories, shape-switching logic) were left as-is.

**Actual impact:** ~0 KB in engine bundle (helpers add ~500 B but engine option classes save ~500 B). Main benefit is in external packages (~3-4 KB workspace-wide saved by eliminating repetitive if-undefined guards).

---

## Phase 2 — Utils.ts Cleanup

### File

- `engine/src/Utils/Utils.ts` (778 lines, 16.4KB bundle)

### ✅ 2a — Replace `memoize()` with inline cache (Completed)

**What was done**:

- Removed `memoize()` function (~99 lines), `MemoizeOptions` interface, and `minMemoizeSize` constant from
  `engine/src/Utils/Utils.ts`
- Inlined `computeFullScreenStyle` into `getFullScreenStyle` with a simple two-variable cache (`_cachedZIndex`,
  `_cachedStyle`)
- Removed `utils/tests/src/tests/memoize.test.ts` (the function is no longer in the public API)

**Savings**: **898 bytes** minified bundle (vs ~500 estimated). All 140 tests pass.

### 2b — Move `findItemFromSingleOrMultiple()` to consumer

**Current** in Utils.ts (lines 462-473, 12 lines):

```ts
export function findItemFromSingleOrMultiple<T>(
  obj: SingleOrMultiple<T>,
  callback: (obj: T, index: number) => boolean,
): T | undefined {
  if (isArray(obj)) return obj.find((t, index) => callback(t, index));
  const defaultIndex = 0;
  return callback(obj, defaultIndex) ? obj : undefined;
}
```

Used only by **`plugins/interactivity/src/utils.ts`** (2 call sites). Move there and remove export.

**Savings**: ~12 lines + 1 export removed from barrel.

### 2c — Inline `getSize()` and `arrayRandomIndex()`

**`getSize()`** (lines 604-606):

```ts
export function getSize(size: IDimensionWithMode, canvasSize: IDimension): IDimension {
  return getPositionOrSize(size, canvasSize) as IDimension;
}
```

Only 2 calls in `EmitterInstance.ts`. Inline at call sites.

**`arrayRandomIndex()`** (lines 215-217):

```ts
export function arrayRandomIndex(array: unknown[]): number {
  return Math.floor(getRandom() * array.length);
}
```

Only called from `itemFromArray()`. Inline there:

```ts
export function itemFromArray<T>(array: T[], index?: number, useIndex = true): T | undefined {
  return array[index !== undefined && useIndex ? index % array.length : Math.floor(getRandom() * array.length)];
}
```

### 2d — Extract `initParticleNumericAnimationValue()` to `@tsparticles/animation-utils`

**Current** (lines 354-430, 77 lines) — a large function used only by **2 updaters** (size, opacity).

```ts
export function initParticleNumericAnimationValue(
  options: RangedAnimationValueWithRandom,
  pxRatio: number,
): IParticleNumericValueAnimation {
  const valueRange = options.value,
    animationOptions = options.animation,
    res = {
      delayTime: getRangeValue(animationOptions.delay) * millisecondsToSeconds,
      enable: animationOptions.enable,
      value: getRangeValue(options.value) * pxRatio,
      max: getRangeMax(valueRange) * pxRatio,
      min: getRangeMin(valueRange) * pxRatio,
      loops: 0,
      maxLoops: getRangeValue(animationOptions.count),
      time: 0,
    };
  if (animationOptions.enable) {
    // ... mode handling (increase/decrease/random) ...
    // ... startValue handling (min/max/random) ...
  }
  res.initialValue = res.value;
  return res;
}
```

**Extract to `@tsparticles/animation-utils`** — a new utility package modeled on `@tsparticles/canvas-utils`.

This function doesn't need to be in the engine; it's consumed by external updaters (size, opacity) and potentially by
plugin authors. Moving it to a separate package:

- Removes ~77 lines from the already-large `Utils.ts`
- Avoids bundling this code when size/opacity updaters aren't used (tree-shaking benefit)
- Provides a clear home for shared animation helpers without coupling them to the engine's core

**`updateAnimation()` goes here too.** It's the complementary function (94 lines, used by tilt, size, rotate, opacity,
gradient — all external updaters, zero engine consumers). Both functions have the same dependency pattern on engine
types (`AnimationStatus`, `DestroyType`, `IParticleNumericValueAnimation`). The `Particle` dependency in
`updateAnimation` is fine — the package will have `@tsparticles/engine` as a peer dependency.

**New package:**

- Location: `utils/animationUtils/` (sibling to `utils/canvasUtils/`)
- Peer dependency: `@tsparticles/engine` (same model as canvas-utils)
- Exports: `initParticleNumericAnimationValue`, `updateAnimation`
- Importers: updaters/size, updaters/opacity, updaters/tilt, updaters/rotate, updaters/gradient
- Removes ~171 lines from `engine/src/Utils/Utils.ts`

### 2e — Reduce `updateAnimation()` (after moving to `@tsparticles/animation-utils`)

**Current** (lines 523-615, 94 lines). Used by 5 updaters (tilt, size, rotate, opacity, gradient).

The function has:

- Early-exit checks for destroyed/enable/loop count
- Delay time tracking (duplicated pattern — same `if` check twice)
- Value update by status (increasing/decreasing)
- Decay application
- Direction change handling
- Loop counting
- Destroy check
- Clamping

The two consecutive delay checks (lines 677-683) are identical:

```ts
if ((data.delayTime ?? minDelay) > minDelay && data.time < (data.delayTime ?? minDelay)) {
  data.time += delta.value;
}
if ((data.delayTime ?? minDelay) > minDelay && data.time < (data.delayTime ?? minDelay)) {
  return;
}
```

This is intentional (add time, then check again) but the `?? minDelay` repeated lookup generates extra compiled code.

**Simplify:**

```ts
const delayTime = data.delayTime ?? minDelay;

if (delayTime > 0 && data.time < delayTime) {
  data.time += delta.value;

  if (data.time < delayTime) {
    return;
  }
}
```

**Savings**: ~5 lines, small but the function is on the hot path.

### 2f — Move `safeIntersectionObserver()` (✅ Done)

**What was done:**

- Removed `safeIntersectionObserver()` from `engine/src/Utils/Utils.ts`
- Inlined it as a local function in `plugins/interactivity/src/InteractionManager.ts` (its only consumer)
- ~7 lines + 1 export removed from engine bundle

### Estimated savings (engine bundle)

~0.6–1 KB (2b–2c, 2e only — 2a and 2f are already done, 2d+2e moved to new package)

## Phase 3 — ParticlesManager: Z-Bucket Simplification

### File

- `engine/src/Core/ParticlesManager.ts` (729 lines, 18.1KB bundle)

### Current behavior — ordinamento per ID

I bucket contengono particelle con lo stesso z-index. All'interno di ogni bucket, l'ordine è determinato dal **particle
ID** (ascendente):

```ts
#getParticleInsertIndex(bucket
:
Particle[], particleId
:
number
):
number
{
  // binary search: trova la posizione dove particleId va inserito
  // per mantenere l'array ordinato per ID ascendente
}
```

Quando si disegna (`drawParticles`), ogni bucket viene iterato dal primo all'ultimo elemento. Quindi:

- **Particelle con ID più basso** (più vecchie) vengono disegnate **per prime**
- **Particelle con ID più alto** (più nuove) vengono disegnate **sopra**

Questo garantisce che a parità di z-index, le particelle più recenti siano sempre visivamente sopra quelle più vecchie —
un comportamento voluto e prevedibile.

### Perché il codice attuale è più complesso del necessario

L'inserimento con **binary search + splice** mantiene l'array ordinato per ID a ogni aggiunta. Analizziamo quando questa
complessità serve davvero.

#### I particle ID sono sempre crescenti

I particle ID vengono assegnati in `addParticle` con `this.#nextId++`:

```ts
addParticle(...)
:
Particle | undefined
{
  // ...
  const particle = this.#pool.pop() ?? new Particle(this.#pluginManager, this.#container);
  particle.init(this.#nextId, position, overrideOptions, group);
  // ...
  this.#array.push(particle);
  this.#insertParticleIntoBucket(particle);
  this.#nextId++;
}
```

Ogni nuovo particle ha sempre ID più alto di tutti quelli esistenti. Quindi:

- La binary search in `#insertParticleIntoBucket` trova sempre la posizione in **coda** dell'array
- `bucket.splice(coda, 0, particle)` ≈ `bucket.push(particle)` — stesso risultato

#### La z-index di un particle generalmente non cambia dopo l'init

Nell'engine, `position.z` viene impostato una volta in `#initPosition` e mai più toccato. Tuttavia, **due plugin esterni
** lo modificano durante la fase di **restore** dopo un'interazione:

1. **Repulser** (`interactions/external/repulse/src/Repulser.ts:370,375`):
   ```ts
   particle.position.z += dz * restoreSpeed;      // restore graduale
   particle.position.z = target.z;                 // finalizzazione
   ```

2. **Attractor** (`interactions/external/attract/src/Attractor.ts:237,242`):
   ```ts
   particle.position.z += dz * restoreSpeed;      // restore graduale
   particle.position.z = target.z;                 // finalizzazione
   ```

In entrambi i casi, quando un'interazione (attract/repulse) finisce, la particella viene riportata alla posizione
originale di riposo. Durante questa transizione, `position.z` cambia gradualmente ogni frame per un breve periodo.
`target.z` è la z originale della particella, quindi il cambio è **temporaneo e reversibile**.

**`#updateParticleBucket` PUÒ quindi eseguire il cambio bucket**, ma solo durante questi transienti di restore (pochi
frame). In condizioni normali, nessun particle cambia mai z-index.

#### Nota: i bucket non vengono ricreati a ogni frame

`#zBuckets` viene ricreato solo in due metodi:

- `init()` — quando il container viene (ri)inizializzato
- `clear()` — quando si resetta tutto

Non c'è ricreazione per-frame. I bucket persistono per tutta la vita del container.

### Proposed change

Si sostituisce la binary search con `push` + `findIndex`. I nuovi particle finiscono sempre in coda (stessa posizione
della binary search, perché gli ID sono sempre crescenti). Per i rari cambi di z-index, si fa un sort condizionale del
bucket se vogliamo mantenere l'ordine esatto.

**Osservazione fondamentale**: il codice attuale **fa già un sort** — è un sort incrementale, una riga alla volta, con
binary search + splice per ogni inserimento. La proposta sostituisce questo sort distribuito con:

- **Nessun sort** per i nuovi particle (99.9% dei casi) — solo `push` O(1)
- **Un sort esplicito** solo quando serve (cambio z-index) — `bucket.sort()` O(n log n)

Non stiamo aggiungendo sorting nuovo; lo stiamo riorganizzando dove è più efficiente.

#### Confronto costo lifetime

| Operazione | Frequenza | Codice attuale (binary search per ID) | Proposta (push + sort condizionale) |
|---|---|---|---|---|
| Nuovo particle | ~1000 per scena | O(log n) binary search + O(1) splice in coda | **O(1)** push |
| Cambio z-index | ~0–50 per attrattore/repulsore | O(log n) binary search + O(n) splice in mezzo | O(1) push + O(1)
check + **sort solo se out-of-place** |
| Rimozione | ~1000 per scena | O(log n) binary search + O(1) splice | O(n) findIndex + splice |

Il costo totale lifetime scende perché i nuovi particle (dominanti) passano da O(log n) a O(1), e il cambio z-index ha
un check O(1) che nella maggior parte dei casi evita il sort.

#### Codice proposto

```ts
#insertParticleIntoBucket(particle
:
Particle
):
void {
  const bucketIndex = this.#getBucketIndex(particle.position.z),
  bucket = this.#zBuckets[bucketIndex];
  if(!
bucket
)
return;
bucket.push(particle);
this.#particleBuckets.set(particle.id, bucketIndex);
}

#removeParticleFromBucket(particle
:
Particle
):
void {
  const bucketIndex = this.#particleBuckets.get(particle.id) ?? this.#getBucketIndex(particle.position.z),
  bucket = this.#zBuckets[bucketIndex];
  if(!
bucket
)
{
  this.#particleBuckets.delete(particle.id);
  return;
}
const idx = bucket.findIndex(p => p.id === particle.id);
if (idx >= 0) bucket.splice(idx, 1);
this.#particleBuckets.delete(particle.id);
}

#updateParticleBucket(particle
:
Particle
):
void {
  const newBucket = this.#getBucketIndex(particle.position.z),
  curBucket = this.#particleBuckets.get(particle.id);
  if(curBucket === undefined || curBucket === newBucket
)
return;

const old = this.#zBuckets[curBucket];
if (old) {
  const idx = old.findIndex(p => p.id === particle.id);
  if (idx >= 0) old.splice(idx, 1);
}

const bucket = this.#zBuckets[newBucket];
if (bucket) {
  bucket.push(particle);
  // sort solo se la particella è fuori posto (ID minore dell'ultimo nel bucket)
  // nel 99% dei casi è già in coda corretta — nessun sort
  if (particle.id < bucket[bucket.length - 2]?.id) {
    bucket.sort((a, b) => a.id - b.id);
  }
  this.#particleBuckets.set(particle.id, newBucket);
}
}
```

**Perché il check `particle.id < bucket[bucket.length - 2]?.id`**: dopo il push, la particella è all'ultima posizione.
Se è un ID recente (alto), è già nel posto giusto — superiore a tutti gli altri. Se invece è un ID vecchio (basso), è
fuori posto e serve il sort. Il check è O(1) — confronta solo l'ultimo elemento.

#### Nota: rimozione da O(log n) a O(n) — perché va bene

`findIndex` è O(n) mentre la binary search è O(log n). Tuttavia:

- `findIndex` itera un array di Particelle che in genere ha poche decine di elementi — O(50) ≈ istantaneo
- La rimozione avviene una volta per particle (quando muore) — non è su hot path per-frame
- Il bytecode risparmiato (binary search → `findIndex`) vale ampiamente il costo runtime trascurabile

### Codice eliminato

- `#getParticleInsertIndex` (23 righe) — intero metodo rimosso
- `#insertParticleIntoBucket` si riduce da 9 a 4 righe
- `#removeParticleFromBucket` si semplifica: `findIndex` per ID
- `#updateParticleBucket` si semplifica: `findIndex` + `push`
- Import eliminati: `double`, `empty`, `one`, `minIndex` (se non usati altrove in ParticlesManager.ts)

### Estimated savings

~1–2 KB

---

## Phase 4 — Particle.ts init() Refactor

### File

- `engine/src/Core/Particle.ts` (1056 lines, 21.6KB bundle)

### Current code

The `init()` method (lines 543-708) is **166 lines** — the single largest method in the entire bundle. It handles:

1. Setting default particle state flags (id, group, spawning, etc.)
2. Loading particles options via `loadParticlesOptions()`
3. Resolving effect/shape types from options
4. Handling override options for effect/shape
5. Loading effect/shape data
6. Re-loading options with overrides + effect/shape data
7. Initializing retina properties
8. Calling updater `preInit` hooks
9. Initializing position via `#initPosition`
10. Calculating initial velocity
11. Loading effect/shape drawer data
12. Calling updater `init` hooks
13. Calling `particleInit` on effect/shape drawers
14. Firing `particleCreated` plugin events

The method mixes **three distinct concerns**:

- State initialization (fields, options)
- Plugin/updater coordination (hooks, events)
- Position/velocity math

### Proposed change

Extract the plugin/updater coordination into separate module-level functions:

```ts
// Extracted from init():
function initParticleState(particle: Particle, id: number, group?: string): void {
  particle.id = id;
  particle.group = group;
  particle.justWarped = false;
  particle.effectClose = true;
  particle.shapeClose = true;
  particle.pathRotation = false;
  particle.lastPathTime = 0;
  particle.destroyed = false;
  particle.unbreakable = false;
  particle.isRotating = false;
  particle.rotation = 0;
  particle.misplaced = false;
  particle.retina = { maxDistance: {}, maxSpeed: 0, moveDrift: 0, moveSpeed: 0, sizeAnimationSpeed: 0 };
  particle.size = { value: 1, max: 1, min: 1, enable: false };
  particle.outType = ParticleOutType.normal;
  particle.ignoresResizeRatio = true;
}

function resolveParticleShape(particle: Particle, options: ParticlesOptions,
                              overrideOptions?: RecursivePartial<IParticlesOptions>): void {
  // ... 50 lines of shape/effect resolution ...
}

function initParticleDrawers(particle: Particle, container: Container): void {
  // ... 30 lines of drawer initialization ...
}
```

Then `init()` becomes:

```ts
init(id
:
number, position ? : ICoordinates, overrideOptions ? : RecursivePartial<IParticlesOptions>, group ? : string
):
void {
  const container = this.#container;

  initParticleState(this, id, group);

  const mainOptions = container.actualOptions,
  particlesOptions = loadParticlesOptions(this.#pluginManager, container, mainOptions.particles);

  resolveParticleShape(this, particlesOptions, overrideOptions);

  particlesOptions.load(overrideOptions);
  // ... effectData/shapeData options loading ...

  this.options = particlesOptions;
  container.retina.initParticle(this);

  runUpdaterPreInit(container.particleUpdaters, this
)
;
this.#initPosition(position);
this.initialVelocity = this.#calculateVelocity();
this.velocity = this.initialVelocity.copy();
this.zIndexFactor = this.position.z / container.zLayers;

initParticleDrawers(this, container);

runUpdaterInit(container.particleUpdaters, this);
runDrawerInit(container, this);
runParticleCreatedPlugins(container, this);
}
```

### Savings

~1–2 KB. While `init()` doesn't get shorter in total lines (the code moves, not disappears), the extracted functions can
be more aggressively optimized by the minifier since they're standalone and don't have access to `#private` fields. The
real saving comes from:

1. Minifier can inline short extracted functions
2. Removes duplication in shape/effect parallel paths
3. Clearer boundaries let the minifier optimize each function independently

### Additional candidate — Consolidate effect/shape parallel paths

The `init()` method has near-identical code for `effect` and `shape`:

```ts
if (this.effect === randomColorValue) {
  const availableEffects = [...this.#container.effectDrawers.keys()];
  this.effect = availableEffects[Math.floor(getRandom() * availableEffects.length)];
}
if (this.shape === randomColorValue) {
  const availableShapes = [...this.#container.shapeDrawers.keys()];
  this.shape = availableShapes[Math.floor(getRandom() * availableShapes.length)];
}
```

And:

```ts
if (this.effect) {
  effectDrawer = container.effectDrawers.get(this.effect);
}
if (effectDrawer?.loadEffect) {
  effectDrawer.loadEffect(this);
}
if (this.shape) {
  shapeDrawer = container.shapeDrawers.get(this.shape);
}
if (shapeDrawer?.loadShape) {
  shapeDrawer.loadShape(this);
}
```

A helper function could handle both:

```ts
function resolveDrawer<T>(
  type: string | undefined,
  drawers: Map<string, T>,
  loader?: (item: T, particle: Particle) => void,
  particle: Particle,
): T | undefined {
  if (!type) return undefined;
  const drawer = drawers.get(type);
  if (drawer && loader) loader(drawer, particle);
  return drawer;
}
```

But this may not save bytes if the helper is only used twice. The real win is removing the duplication in `init()`
itself.

---

## Phase 5 — Cross-Package Options Standardization

### Scope

15+ updater/plugin packages outside the engine that define their own option classes.

### Current pattern (repeated in every package)

Each updater defines:

1. **2-3 option classes** (e.g., `Twinkle.ts`, `TwinkleLinksValues.ts`, `TwinkleParticlesValues.ts`)
2. **A `loadOptions` method** in the updater class
3. **Type definitions** (either inline or in `Types.ts`)

Example — **Twinkle** (`updaters/twinkle/src/`):

```ts
// Options/Classes/Twinkle.ts (40 lines)
export class Twinkle implements ITwinkle, IOptionLoader<ITwinkle> {
  [name: string]: unknown;

  readonly links;
  readonly particles;

  constructor() {
    this.links = new TwinkleLinksValues();
    this.particles = new TwinkleParticlesValues();
  }

  load(data?: RecursivePartial<ITwinkle>): void {
    if (isNull(data)) return;
    this.links.load(data.links);
    this.particles.load(data.particles);
  }
}

// Types.ts
export type TwinkleParticlesOptions = ParticlesOptions & { twinkle?: Twinkle };
export type ITwinkleParticlesOptions = IParticlesOptions & { twinkle?: ITwinkle };

// TwinkleUpdater.ts
loadOptions(options
:
TwinkleParticlesOptions,
...
sources: RecursivePartial < ITwinkleParticlesOptions > []
):
void {
  options.twinkle ??= new Twinkle();
  for(const source of sources
)
{
  options.twinkle.load(source?.twinkle);
}
}
```

This exact pattern is duplicated across **rotate, twinkle, wobble, tilt, roll, orbit, size, opacity, color, stroke,
gradient, and more** — each with their own Option classes, Types, and `loadOptions` method.

### Proposed change

Provide **engine-level helpers** to eliminate the boilerplate:

```ts
// In engine/src/Utils/OptionsUtils.ts:

/**
 * Creates a single-option class factory for a simple property.
 * Eliminates 2-3 files of boilerplate per updater.
 */
export function createSimpleOption<T extends Record<string, any>>(
  defaults: T,
): new () => T & IOptionLoader<RecursivePartial<T>> {
  return class implements IOptionLoader<RecursivePartial<T>> {
    [name: string]: unknown;

    constructor() {
      Object.assign(this, defaults);
    }

    load(data?: RecursivePartial<T>): void {
      if (isNull(data)) return;
      for (const key of Object.keys(defaults)) {
        if ((data as any)[key] !== undefined) {
          (this as any)[key] = (data as any)[key];
        }
      }
    }
  } as any;
}

/**
 * Creates a loadOptions function for the common
 * "create if missing, then load" pattern.
 */
export function loadOptionProperty<T, K extends string>(
  options: Record<string, any>,
  key: K,
  OptionClass: new () => any,
  ...sources: (Record<string, any> | undefined)[]
): void {
  options[key] ??= new OptionClass();
  for (const source of sources) {
    (options[key] as any).load(source?.[key]);
  }
}
```

**Then a package like Wobble becomes:**

```ts
// Instead of 2 option class files + Types.ts:
import { createSimpleOption, loadOptionProperty } from "@tsparticles/engine";

export const Wobble = createSimpleOption({
  distance: 5,
  enable: false,
  speed: 10,
});

// In WobbleUpdater.ts:
loadOptions(options
:
WobbleParticlesOptions,
...
sources
):
void {
  loadOptionProperty(options, "wobble", Wobble, ...sources
)
;
}
```

Instead of:

- `Wobble.ts` (40 lines)
- `WobbleSpeed.ts` (30 lines)
- `Types.ts` (15 lines)
- `loadOptions` in updater (5 lines)
- **Total: ~90 lines**

You get:

- `createSimpleOption` call (3 lines)
- `loadOptionProperty` call (1 line)
- **Total: ~4 lines**

### Impact

This is the **biggest quality-of-life improvement** for maintainers. Each package saves ~80-90 lines of boilerplate
code. While the engine adds ~30 lines of helper code, each consuming package drops significantly in size.

### Estimated savings

~0.5–1 KB in engine (the helper code), plus ~0.3-1 KB per updater package (not in the engine bundle, but in the
workspace overall).

---

## ✅ Phase 7 — Inline Property Defaults (Eliminate Constructors) (Completed)

### Problem

All option classes in the engine define default values in constructors:

```ts
export class AnimationOptions extends OptionLoader<IAnimation> implements IAnimation {
  count: RangeValue;
  enable;
  speed: RangeValue;

  constructor() {
    super();
    this.count = 0;
    this.enable = false;
    this.speed = 1;
  }
}
```

This adds overhead: every constructor call adds bytecode for assignment statements. Moving defaults inline allows the
minifier to eliminate both the constructor and the assignment boilerplate:

```ts
export class AnimationOptions extends OptionLoader<IAnimation> implements IAnimation {
  count: RangeValue = 0;
  enable = false;
  speed: RangeValue = 1;
  // no constructor needed — inherited OptionLoader constructor handles super()
}
```

### ESLint blocker

The `@typescript-eslint/no-magic-numbers` rule flags inline class property initializers as magic numbers (`0`, `1`, etc.)
but silently allows the same values in constructor body assignments. The fix is adding `ignoreClassFieldInitialValues: true`
to the rule config in `cli/utils/eslint-config/src/eslint.config.ts`.

### Scope

- **Engine option classes** (27 files with constructors in `engine/src/Options/Classes/`) — all classes that define
  default values in constructors
- **ESLint shared config** — `cli/utils/eslint-config/src/eslint.config.ts`

### Changes per file category

| Category | Files | Change |
|----------|-------|--------|
| Simple numeric/boolean defaults | 15 files | Move to inline property; delete constructor |
| `new X()` sub-object assignments | 12 files | Move to `readonly` inline; delete constructor if no other work |
| Constructor with parameters (Options, ParticlesOptions, ColorAnimation) | 3 files | Keep constructor for parameter logic; move simple defaults inline |
| Sub-property assignments (Background, ParticlesOptions.paint) | 2 files | Keep constructor for nested init; move simple defaults inline |

### Files that can drop constructors entirely (13 files)

- `AnimationOptions.ts` (both `AnimationOptions` and `RangedAnimationOptions`)
- `ValueWithRandom.ts` (`ValueWithRandom` and `RangedAnimationValueWithRandom`)
- `ResizeEvent.ts`
- `ZIndex.ts`
- `Stroke.ts`
- `ParticlesNumberLimit.ts`
- `ParticlesNumber.ts`
- `ParticlesDensity.ts`
- `Spin.ts`
- `MovePath.ts`
- `MoveGravity.ts`
- `MoveCenter.ts`
- `MoveAngle.ts`

### Files with constructors that can be simplified (14 files)

- `Move.ts` — `new X()` in constructor for 6 sub-objects; move to `readonly` inline
- `Shape.ts` — constructor assigns `close`, `options`, `type`; move to inline
- `Effect.ts` — same as Shape
- `Fill.ts` — constructor assigns `enable`, `opacity`; move to inline
- `FullScreen.ts` — constructor assigns `enable`, `zIndex`; move to inline
- `ParticlesBounce.ts` — constructor assigns `new ParticlesBounceFactor()`; move to `readonly` inline
- `ParticlesBounceFactor.ts` — constructor assigns `this.value = 1`; move to inline
- `OutModes.ts` — constructor assigns `this.default`; move to inline
- `OptionsColor.ts` — constructor assigns `this.value = ""`; move to inline
- `AnimatableColor.ts` — constructor assigns `new HslAnimation()`; move to `readonly` inline
- `Background.ts` — constructor has `new OptionsColor()` + sub-property; keep constructor
- `Options.ts` — has parameters + `#private` field assignments + simple defaults; keep constructor but inline simple values
- `ParticlesOptions.ts` — has parameters + `#private` + sub-property ink; keep constructor but inline simple values
- `ColorAnimation.ts` — takes `min`/`max` parameters; keep constructor

### Estimated savings

~0.8–1.5 KB (engine bundle). Each eliminated constructor removes ~20–40 bytes of compiled code. For 20+ constructors,
the savings add up. The minifier can also better optimize inline property initializers vs constructor body assignments.

---

## Phase 6 — ColorUtils.ts Micro-Optimizations

### File

- `engine/src/Utils/ColorUtils.ts` (730 lines, 14KB bundle)

### 6a — Simplify `getCachedStyle`

**Current** (lines 64-80):

```ts
const styleCache = new Map<string, string>(),
  maxCacheSize = 1000;

function getCachedStyle(key: string, generator: () => string): string {
  let cached = styleCache.get(key);
  if (!cached) {
    cached = generator();
    if (styleCache.size >= maxCacheSize) {
      const keysToDelete = [...styleCache.keys()].slice(firstIndex, maxCacheSize * half);
      keysToDelete.forEach(k => styleCache.delete(k));
    }
    styleCache.set(key, cached);
  }
  return cached;
}
```

The eviction strategy is over-engineered for a cache that rarely hits 1000 entries. **Simplify:**

```ts
const styleCache = new Map<string, string>();

function getCachedStyle(key: string, generator: () => string): string {
  let cached = styleCache.get(key);
  if (!cached) {
    cached = generator();
    if (styleCache.size > 2000) styleCache.clear(); // simpler eviction
    styleCache.set(key, cached);
  }
  return cached;
}
```

### 6b — Extract inner `channel()` from `hslToRgb()`

**Current** (lines 286-342):

```ts
export function hslToRgb(hsl: IHsl): IRgb {
  // ...
  const channel = (temp1: number, temp2: number, temp3: number): number => {
    // ... 15 lines ...
  };
  // ...
  red = channel(temp2, temp1, hNormalized + phaseThird),
    green = channel(temp2, temp1, hNormalized),
    blue = channel(temp2, temp1, hNormalized - phaseThird);
}
```

The `channel` function is defined **inside** `hslToRgb`, so it's re-created on every call. Pull to module level:

```ts
// Module level:
function hslChannel(temp1: number, temp2: number, temp3: number): number {
  if (temp3 < 0) temp3++;
  if (temp3 > 1) temp3--;
  if (temp3 * 6 < 1) return temp1 + (temp2 - temp1) * 6 * temp3;
  if (temp3 * 2 < 1) return temp2;
  if (temp3 * 3 < 2) return temp1 + (temp2 - temp1) * (2 / 3 - temp3) * 6;
  return temp1;
}

export function hslToRgb(hsl: IHsl): IRgb {
  // ... same logic, calls hslChannel(...) instead of inner channel(...)
}
```

### 6c — Consolidate HDR/SDR style helpers

**Current** — 4 tiny functions:

```ts
function getHdrStyleFromRgb(color: IRgb, opacity?: number): string {
  return `color(display-p3 ${(color.r / rgbMax).toString()} ... )`;
}

function getSdrStyleFromRgb(color: IRgb, opacity?: number): string {
  return `rgba(${color.r.toString()}, ... )`;
}

function getHdrStyleFromHsl(color: IHsl, opacity?: number): string {
  return getHdrStyleFromRgb(hslToRgb(color), opacity);    // delegates to RGB version
}

function getSdrStyleFromHsl(color: IHsl, opacity?: number): string {
  return `hsla(${color.h.toString()}, ... )`;              // independent
}
```

`getHdrStyleFromHsl` just calls `getHdrStyleFromRgb(hslToRgb(color), opacity)` — a 1-line wrapper that could be inlined
directly in `getStyleFromHsl`:

```ts
export function getStyleFromHsl(color: IHsl, hdr: boolean, opacity?: number): string {
  const op = opacity ?? 1,
    key = `hsl-${color.h.toFixed(2)}-${color.s.toFixed(2)}-${color.l.toFixed(2)}-${hdr ? "hdr" : "sdr"}-${op}`;
  return getCachedStyle(key, () =>
    hdr ? getStyleFromRgb(hslToRgb(color), true, opacity) : `hsla(${color.h}, ${color.s}%, ${color.l}%, ${op})`
  );
}
```

Eliminates `getHdrStyleFromHsl` and `getSdrStyleFromHsl` entirely.

### Estimated savings

~0.3–0.5 KB

---

## Estimated Total Savings

| Phase | Area                                           | Est. savings (engine bundle)   | Effort | Status                 |
|-------|------------------------------------------------|--------------------------------|--------|------------------------|
| 1a    | Sealed `load`/`doLoad` pattern                 | ~1.5–2 KB                      | Medium | ✅ Done                 |
| 1b    | `loadProperty` helper (safe patterns only)     | ~0 KB (engine), ~3–4 KB (pkgs) | Medium | ✅ Done                 |
| 2     | Utils.ts cleanup (2a–2f)                       | ~1.7 KB (engine)               | Low    | ✅ Done                 |
| 2d    | → `@tsparticles/animation-utils` (new package) | 0 KB (engine)                  | Low    | ✅ Done                 |
| 3     | ParticlesManager z-buckets                     | ~1–2 KB                        | Low    | 📋 Planned             |
| 4     | Particle.ts refactor                           | ~1–2 KB                        | Medium | 📋 Planned             |
| 5     | Cross-package helpers                          | ~0.5 KB (engine)               | Medium | 📋 Planned             |
| 6     | ColorUtils tweaks                              | ~0.3–0.5 KB                    | Low    | 📋 Planned             |
| 7     | Inline property defaults                       | ~0.8–1.5 KB                    | Low    | ✅ Done (68 KB)         |
|       | **Total** (remaining)                          | **~2.8–5 KB**                  |        |                        |
|       | **Already saved**                              | **~6 KB**                      |        | **68 KB minified UMD** |

Current target: **74 KB → ~64–66 KB** remaining phases (3, 4, 5, 6).

---

## Post-Execution Verification

1. `pnpm exec vitest run` — all tests pass.
2. `pnpm run build` — all packages build.
3. Check `engine/dist/` UMD minified size (target: 60–66 KB).
4. `cd demo/vanilla && pnpm start` — visual smoke test.

---

## Relevant Files Index

| File                                           | Phase     | Impact                                                                                                                              |
|------------------------------------------------|-----------|-------------------------------------------------------------------------------------------------------------------------------------|
| `engine/src/Options/Classes/*.ts` (29 files)   | 1a–1b     | `load`/`doLoad` base class, `loadProperty` helper (19 files converted)                                                              |
| `engine/src/Utils/Utils.ts`                    | 2a–2f     | Remove `memoize`, move/inline dead code, extract `initParticleNumericAnimationValue` + `updateAnimation` to `utils/animationUtils/` |
| `engine/src/Core/ParticlesManager.ts`          | 3         | Remove binary search, simplify buckets                                                                                              |
| `engine/src/Core/Particle.ts`                  | 4         | Extract helpers from 166-line `init()`                                                                                              |
| `engine/src/Utils/OptionsUtils.ts`             | 1a, 1b, 5 | Add `OptionLoader`, `loadProperty`/`loadRangeProperty`/`loadNestedProperty`/`loadLazyProperty`/`loadExtendProperty`                 |
| `updaters/*/src/Options/Classes/*.ts`          | 1b        | ~28 files converted to use `loadProperty` helpers                                                                                   |
| `interactions/*/src/Options/Classes/*.ts`      | 1b        | ~20 files converted to use `loadProperty` helpers                                                                                   |
| `plugins/*/src/Options/Classes/*.ts`           | 1b        | ~49 files converted to use `loadProperty` helpers                                                                                   |
| `shapes/*/src/Options/Classes/*.ts`            | 1b        | 1 file converted (Preload)                                                                                                          |
| `bundles/*/src/Options/Classes/*.ts`           | 1b        | 3 files converted (confetti, fireworks, ribbons)                                                                                    |
| `engine/src/Utils/ColorUtils.ts`               | 6a–6c     | Simplify cache, extract channel(), inline wrappers                                                                                  |
| `utils/animationUtils/` (new package)          | 2d–2e     | New `@tsparticles/animation-utils` package — `initParticleNumericAnimationValue`, `updateAnimation`                                 |
| `engine/src/Options/Classes/*.ts` (27 files)   | 7         | Move constructor defaults to inline property declarations; eliminate constructors where possible                                    |
| `cli/utils/eslint-config/src/eslint.config.ts` | 7         | Add `ignoreClassFieldInitialValues: true` to `@typescript-eslint/no-magic-numbers`                                                  |
