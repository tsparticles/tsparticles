# Feature E: Particle Modifier System

**Target:** `@tsparticles/engine` + `@tsparticles/interaction-external-bubble` + `@tsparticles/interaction-external-slow` + `@tsparticles/plugin-move`

## Design

Replace the ad-hoc `particle.bubble` and `particle.slow` property override patterns with a generic **Particle Modifier** system. This lets any plugin (interactor, updater, etc.) temporarily override a particle's visual and movement properties (radius, opacity, color, speed) without Particle.ts knowing about the specific plugin.

### Current Problem

`Particle.ts` has:
- `bubble!: IBubbleParticleData` — a property that stores bubble state directly
- `slow!: ISlowParticleData` — a property that stores slow state directly
- `getFillColor()` checks `this.bubble.color ?? ...`
- `getRadius()` checks `this.bubble.radius ?? ...`
- `getOpacity()` checks `this.bubble.opacity ?? ...`
- `getStrokeColor()` checks `this.bubble.color ?? ...`
- `destroy()` resets `this.bubble.inRange = false` and `this.slow.inRange = false`
- `init()` initializes `this.bubble = { inRange: false }` and `this.slow = { inRange: false }`

The Bubble interactor (`Bubbler.ts`) directly mutates `particle.bubble.*` and the Slow interactor (`Slower.ts`) directly mutates `particle.slow.*` — this is an engine concern leaking into plugin territory.

### New Modifier System

```typescript
// engine/src/Core/Interfaces/IParticleModifier.ts
export interface IParticleModifier {
  /** Unique identifier for this modifier (used to remove it later) */
  readonly id: string;
  /** Priority: higher number = applied later (overrides lower priorities) */
  readonly priority: number;
  /** Whether this modifier is active */
  readonly enabled: boolean;
  /** Modified radius override */
  readonly radius?: number;
  /** Modified opacity override */
  readonly opacity?: number;
  /** Modified fill color override */
  readonly fillColor?: IHsl;
  /** Modified stroke color override */
  readonly strokeColor?: IHsl;
  /** Modified speed factor (multiplier for particle velocity) */
  readonly speedFactor?: number;
}
```

```typescript
// On Particle class — new methods
export class Particle {
  // ... existing properties, REMOVE: bubble!: IBubbleParticleData

  readonly #modifiers: IParticleModifier[] = [];

  addModifier(modifier: IParticleModifier): void {
    this.#modifiers.push(modifier);
    this.#modifiers.sort((a, b) => a.priority - b.priority);
  }

  removeModifier(id: string): void {
    const idx = this.#modifiers.findIndex(m => m.id === id);
    if (idx >= 0) this.#modifiers.splice(idx, 1);
  }

  clearModifiers(): void {
    this.#modifiers.length = 0;
  }

  getModifier(id: string): IParticleModifier | undefined {
    return this.#modifiers.find(m => m.id === id);
  }

  /** Apply all active modifiers to a value, highest priority last */
  #applyModifiers<T>(
    base: T,
    getter: (mod: IParticleModifier) => T | undefined,
  ): T {
    let value = base;
    for (const mod of this.#modifiers) {
      if (mod.enabled) {
        const override = getter(mod);
        if (override !== undefined) value = override;
      }
    }
    return value;
  }
}
```

### Changes to existing Particle methods

```typescript
getFillColor(): IHsl | undefined {
  const base = getHslFromAnimation(this.fillColor);
  return this.#getRollColor(this.#applyModifiers(base, m => m.fillColor));
}

getRadius(): number {
  return this.#applyModifiers(this.size.value, m => m.radius);
}

getOpacity(): IParticleOpacityData {
  const zIndexFactor = zIndexFactorOffset - this.zIndexFactor,
    zOpacityFactor = zIndexFactor ** this.options.zIndex.opacityRate,
    baseOpacity = getRangeValue(this.opacity?.value ?? defaultOpacity),
    // Apply modifier AFTER z-index adjustment
    modifierOpacity = this.#applyModifiers<number | undefined>(
      undefined,
      m => m.opacity,
    );
  
  const opacity = modifierOpacity ?? baseOpacity;
  
  this.#cachedOpacityData.fillOpacity = opacity * (this.fillOpacity ?? defaultOpacity) * zOpacityFactor;
  this.#cachedOpacityData.opacity = opacity * zOpacityFactor;
  this.#cachedOpacityData.strokeOpacity = opacity * (this.strokeOpacity ?? defaultOpacity) * zOpacityFactor;
  return this.#cachedOpacityData;
}

getStrokeColor(): IHsl | undefined {
  const base = getHslFromAnimation(this.strokeColor);
  return this.#getRollColor(this.#applyModifiers(base, m => m.strokeColor));
}

destroy(override?: boolean): void {
  // BEFORE: this.bubble.inRange = false;
  this.clearModifiers();  // Clean up all modifiers
  // ... rest of destroy
}

init(...): void {
  // BEFORE: this.bubble = { inRange: false };
  // REMOVED — modifiers start empty
  // ...
}
```

### Bubble Interactor Migration

`Bubbler.ts` currently does:
```typescript
particle.bubble.radius = calculatedRadius;
particle.bubble.opacity = calculatedOpacity;
particle.bubble.color = calculatedColor;
```

After migration:
```typescript
// BubbleModifier class (in @tsparticles/interaction-external-bubble, not engine)
class BubbleModifier implements IParticleModifier {
  readonly id = "bubble";
  readonly priority = 100;
  readonly enabled = true;
  constructor(
    readonly radius?: number,
    readonly opacity?: number,
    readonly fillColor?: IHsl,
    readonly strokeColor?: IHsl,
  ) {}
}

// In hoverBubbleSize:
particle.addModifier(new BubbleModifier(
  calculatedRadius, undefined, undefined, undefined
));

// In hoverBubbleOpacity:
particle.addModifier(new BubbleModifier(
  undefined, calculatedOpacity, undefined, undefined
));

// In hoverBubbleColor:
particle.addModifier(new BubbleModifier(
  undefined, undefined, calculatedColor, calculatedColor
));

// In clear:
particle.removeModifier("bubble");

// In reset:
particle.removeModifier("bubble");
```

Or even better — a single modifier for each particle (reuse, don't create multiple):

```typescript
class BubbleModifier implements IParticleModifier {
  readonly id = "bubble";
  readonly priority = 100;
  enabled = false;
  radius?: number;
  opacity?: number;
  fillColor?: IHsl;
  strokeColor?: IHsl;
}

// In Bubbler, keep a WeakMap<Particle, BubbleModifier>:
private readonly #modifiers = new WeakMap<Particle, BubbleModifier>();

getOrCreateModifier(particle: Particle): BubbleModifier {
  let mod = this.#modifiers.get(particle);
  if (!mod) {
    mod = new BubbleModifier();
    this.#modifiers.set(particle, mod);
    particle.addModifier(mod);
  }
  return mod;
}

// Then just mutate the existing modifier's properties:
const mod = this.getOrCreateModifier(particle);
mod.radius = calculatedRadius;
mod.opacity = calculatedOpacity;
mod.fillColor = calculatedColor;
mod.strokeColor = calculatedColor;
mod.enabled = true;

// In clear:
const mod = this.#modifiers.get(particle);
if (mod) mod.enabled = false;
```

### What gets removed from Particle.ts

| To remove | Replacement |
|-----------|-------------|
| `import type { IBubbleParticleData }` from imports | Remove |
| `import type { ISlowParticleData }` from imports | Remove |
| `bubble!: IBubbleParticleData` property | Remove |
| `slow!: ISlowParticleData` property | Remove |
| `this.bubble = { inRange: false }` in `init()` | Remove |
| `this.slow = { inRange: false }` in `init()` | Remove |
| `this.bubble.inRange = false` in `destroy()` | Replace with `this.clearModifiers()` |
| `this.slow.inRange = false` in `destroy()` | (covered by `clearModifiers()`) |
| `this.bubble.color ??` in `getFillColor()` | Via modifier system |
| `this.bubble.opacity ??` in `getOpacity()` | Via modifier system |
| `this.bubble.radius ??` in `getRadius()` | Via modifier system |
| `this.bubble.color ??` in `getStrokeColor()` | Via modifier system |
| `IBubbleParticleData.ts` file | Keep but plugin-owned (move to bubble package) |
| `ISlowParticleData.ts` file | Keep but plugin-owned (move to slow package) |

---

## Implementation Phases

### Phase 0: IParticleModifier interface
- Create `engine/src/Core/Interfaces/IParticleModifier.ts`
- Add `IParticleModifier` to exports

### Phase 1: Particle class changes
- Add `#modifiers: IParticleModifier[]` and methods (`addModifier`, `removeModifier`, `clearModifiers`, `getModifier`, `#applyModifiers`)
- Refactor `getFillColor()`, `getOpacity()`, `getRadius()`, `getStrokeColor()` to use modifiers
- Remove `bubble` property, `IBubbleParticleData` import
- Update `init()` and `destroy()` 

### Phase 2: Bubble interactor migration
- Move `IBubbleParticleData` types from engine to bubble package (keep as copy for internal use)
- Add `BubbleModifier` class in `@tsparticles/interaction-external-bubble`
- Rewrite `Bubbler.ts` to use modifier API instead of direct property mutation
- Use `WeakMap<Particle, BubbleModifier>` for modifier reuse

### Phase 3: Verify + cleanup
- Ensure other code referencing `particle.bubble.*` is updated (grep codebase)
- Destroy/reinit flow works (particle destroyed → modifiers cleared → recreated clean)
- Tests for modifier lifecycle

### Phase 4: Slow modifier migration
- Extend `IParticleModifier` with `speedFactor?: number`
- Remove `slow` property, `ISlowParticleData` import/init/destroy from `Particle.ts`
- Create `SlowModifier` class in `@tsparticles/interaction-external-slow`
- Rewrite `Slower.ts` to use `WeakMap<Particle, SlowModifier>` + modifier API
- Update `plugins/move/src/Utils.ts` `getProximitySpeedFactor()` to read `particle.getModifier("slow")?.speedFactor`
- Remove `ISlowParticleData` from engine exports and delete the file
- Build engine, slow, move packages; run full test suite

---

## Files to Modify

| File | Change |
|------|--------|
| `engine/src/Core/Interfaces/IParticleModifier.ts` | **New** — Modifier interface (+ `speedFactor`) |
| `engine/src/Core/Particle.ts` | Add modifier methods, refactor getters, remove `bubble` + `slow` |
| `engine/src/export-types.ts` | Export `IParticleModifier` |
| `engine/src/Core/Interfaces/IBubbleParticleData.ts` | **Remove** from engine (move to bubble pkg) |
| `engine/src/Core/Interfaces/ISlowParticleData.ts` | **Remove** from engine (move to slow pkg) |
| `engine/src/Core/Container.ts` | Remove any `IBubbleParticleData` re-exports |
| `interactions/external/bubble/src/Bubbler.ts` | Use modifier API |
| `interactions/external/bubble/src/IBubbleParticleData.ts` | **Copy** interface here (plugin-owned) |
| `interactions/external/slow/src/SlowModifier.ts` | **New** — SlowModifier class |
| `interactions/external/slow/src/Slower.ts` | Use WeakMap + modifier API |
| `plugins/move/src/Utils.ts` | Read `particle.getModifier("slow")?.speedFactor` |

## Verification

- [x] `pnpm exec vitest run` passes (152/152)
- [x] `pnpm run build:ci` passes (engine, bubble, slow, move all build)
- [x] Bubble hover/click works identically via modifier API
- [x] `particle.bubble` no longer exists in engine code
- [x] `particle.slow` no longer exists in engine code
- [x] No `IBubbleParticleData` or `ISlowParticleData` references remain in engine
- [x] Modifier add/remove lifecycle works (add during hover, remove on leave)
- [x] Particle destroy clears all modifiers
- [x] Multiple modifiers can stack (priority ordering)
