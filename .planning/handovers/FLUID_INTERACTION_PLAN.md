# Fluid Particle Interaction - Deep Technical Specification (v3)

## Summary

|                     |                                              |
|---------------------|----------------------------------------------|
| **Target**          | `@tsparticles/interaction-particles-fluid`   |
| **Steps**           | 7 (0–6)                                      |
| **Type**            | New package (particles interactor)           |
| **Load function**   | `loadParticlesFluidInteraction(engine)`      |
| **Key constraints** | Don't touch engine; no commit/PR             |

### Progress

- [ ] Step 0: Repository alignment + constraints
- [ ] Step 1: Package skeleton (noop)
- [ ] Step 2: Options contract + loaders
- [ ] Step 3: Baseline DDR solver
- [ ] Step 4: Constraints + stabilization
- [ ] Step 5: Interoperability + tuning
- [ ] Step 6: Docs, presets, release readiness

---

## What changed from v2

| Change | Reason |
|--------|--------|
| Removed `FluidGravity`, `FluidPointer`, `FluidDebug` sub-options | Gravity già in Move plugin, mouse repulse già come external interaction, debug non richiesto |
| Rimosso velocity reconstruction dopo DDR | Inconsistente col modello velocity-based di tsparticles; il particle-particle repulse modifica position senza aggiornare velocity |
| Rimosso `iterations` | Single-pass DDR è sufficiente; multi-pass richiederebbe container plugin che aggiunge complessità ingiustificata nel v1 |
| Rimosso `boundaryBounce`/`boundaryClamp` come opzioni | tsparticles ha già `outModes` per i bordi; la fluid interaction non deve reintrodurre boundary handling |
| Rimosso `viscosity` dal v1 | Opzione da rivalutare dopo baseline funzionante |
| Semplificata la struttura package | Niente FluidMath/FluidState/FluidPlugin separati; tutto nell'interactor |
| Semplificato il type design | Niente `FluidParticle.fluid.prevX/prevY` (non serve senza velocity reconstruction) |
| Rimossi preset multipli | Un preset di default sufficiente per v1 |
| Allineato pattern con Collider/Attractor esistenti | `maxDistance` come field pubblico, `clear()` noop, `reset()` noop |

---

## Execution governance (critical)

- implementation agent must NOT create commits;
- implementation agent must NOT open PRs;
- all changes left uncommitted for maintainer review.

---

## Strategy: Position-Only DDR

La differenza fondamentale col reference code:

```
Reference code:                        tsparticles Fluid:
  pass1: predict (vel → pos)      →    MovePlugin (vel → pos)
  pass2: DDR (position correction) →    FluidInteractor.interact() (position correction ONLY)
  pass3: velocity extraction       →    SKIP (velocity non aggiornata)
```

Nel reference, la velocity reconstruction è necessaria perché il loop successivo usa velocity per advect. In tsparticles, il MovePlugin usa già la velocity memorizzata sul particle per advect. La correzione DDR è puramente posizionale — modifica `particle.position` direttamente, come già fa il particle-particle repulse (`p2.position.addTo(...)`).

**Vantaggi**:
- Pattern già consolidato (particle repulse modifica position senza velocity)
- Nessun conflitto col MovePlugin
- Nessuna necessità di estendere Particle con `fluidPrevPosition`
- Stabile: DDR corregge ogni frame, eventuale drift dell'advect viene compensato

**Rischio accettato**: La velocity non aggiornata può causare oscillazioni sottili se moveSpeed è alta rispetto a stiffness. Mitigazione: default conservativi, utente può abbassare moveSpeed.

---

## Architecture decision

### Package

```
interactions/particles/fluid
```

Publishing target: `@tsparticles/interaction-particles-fluid`

Option key: `particles.fluid`

Loader: `loadParticlesFluidInteraction(engine)`

### Interactor type

`ParticlesInteractorBase` (particles interactor, non external)

Registrato come `"particlesFluid"` via `pluginManager.addInteractor`

---

## Proposed options model (v3 simplified)

```ts
export interface IFluid {
  enable?: boolean;
  radius?: number;           // default: 30
  stiffness?: number;        // default: 0.5 (k)
  nearStiffness?: number;    // default: 0.5 (k̃)
  restDensity?: number;      // default: 3 (ρ₀)
  maxNeighbors?: number;     // default: 64
  maxForce?: number;         // default: 2.5
}
```

### Defaults

```json
{
  "particles": {
    "fluid": {
      "enable": false,
      "radius": 30,
      "stiffness": 0.5,
      "nearStiffness": 0.5,
      "restDensity": 3,
      "maxNeighbors": 64,
      "maxForce": 2.5
    }
  }
}
```

### Semantics

- **radius**: distanza di interazione tra particelle. Più alto → più smooth ma più costoso.
- **stiffness**: coefficiente di pressione k in P = k(ρ - ρ₀). Più alto → più rigido.
- **nearStiffness**: coefficiente di near-pressione k̃ in P̃ = k̃·ρ̃. Più alto → anti-compressione locale (blob effect).
- **restDensity**: densità target ρ₀. Valori più alti → particelle più compresse.
- **maxNeighbors**: safety cap per performance.
- **maxForce**: clamp di sicurezza per evitare esplosioni numeriche.

### Nota sui valori

I default sono presi direttamente dal reference code e dovrebbero produrre un effetto fluido stabile su 300-600 particelle con moveSpeed 1-2.

---

## DDR Algorithm (implementation-grade)

### Per-frame pseudo-code

```
interact(particle, data, delta):
    if particle.destroyed or particle.spawning:
        return

    opts = particle.options.fluid
    if not opts.enable:
        return

    // 1. Query neighbors via spatial hash grid
    neighbors = container.particles.grid.queryCircle(particle.position, opts.radius)

    // 2. Density accumulation
    pressure = 0
    presnear = 0
    neighborCount = 0

    for each other in neighbors:
        if other is particle or other.destroyed or other.spawning:
            continue

        dx = other.position.x - particle.position.x
        dy = other.position.y - particle.position.y
        dist = sqrt(dx*dx + dy*dy)

        if dist < opts.radius and dist > epsilon:
            q = 1 - dist / opts.radius
            pressure += q * q          // quadratic kernel
            presnear += q * q * q      // cubic kernel
            store neighbor info (other, q, dx/dist, dy/dist)
            neighborCount++
            if neighborCount >= opts.maxNeighbors:
                break

    // 3. Pressure computation (DDR formula from reference)
    P = (pressure - opts.restDensity) * opts.stiffness
    Pnear = presnear * opts.nearStiffness

    // 4. Symmetric displacement
    for each stored neighbor:
        force = P + Pnear * neighbor.q
        force = clamp(force, -opts.maxForce, opts.maxForce)
        dx = neighbor.dx * force * 0.5
        dy = neighbor.dy * force * 0.5

        particle.position.x -= dx
        particle.position.y -= dy
        neighbor.other.position.x += dx
        neighbor.other.position.y += dy
```

### Constants

- `epsilon = 1e-6`

### Stability rules

1. Mai dividere per distanza < epsilon
2. Clampare force con maxForce
3. Skippare particle destroyed/spawning
4. Cap deterministico a maxNeighbors per truncation (non random sample)
5. Non riusare dati di neighbor tra frame diversi

---

## Type design

```ts
import type {
  IInteractivityParticlesOptions,
  InteractivityParticle,
  InteractivityParticlesOptions,
} from "@tsparticles/plugin-interactivity";
import type { Fluid } from "./Options/Classes/Fluid.js";
import type { IFluid } from "./Options/Interfaces/IFluid.js";

export type IParticlesFluidOptions = IInteractivityParticlesOptions & {
  fluid?: IFluid;
};

export type ParticlesFluidOptions = InteractivityParticlesOptions & {
  fluid?: Fluid;
};

export type FluidParticle = InteractivityParticle & {
  options: ParticlesFluidOptions;
};
```

Nessuno stato per-particle richiesto (no prevPosition, no density cache). Ogni frame ricalcola da zero.

---

## Package structure

```
interactions/particles/fluid/
  package.json
  tsconfig.base.json
  tsconfig.json
  tsconfig.types.json
  src/
    index.ts
    index.lazy.ts
    browser.ts
    Types.ts
    FluidInteractor.ts
    Options/
      Classes/
        Fluid.ts
      Interfaces/
        IFluid.ts
```

### Scaffold notes

- `package.json` identico a collisions (solo nome e descrizione diversi)
- `tsconfig.base.json` identico a collisions
- `src/index.ts` segue pattern collisions ma SENZA registrazione OverlapPlugin
- `src/FluidInteractor.ts` estende `ParticlesInteractorBase<Container, FluidParticle>`

### Files NOT to create (vs v2)

| File in v2 | Perché rimosso |
|------------|----------------|
| `Options/Classes/FluidGravity.ts` | Gestito da MovePlugin |
| `Options/Classes/FluidPointer.ts` | Gestito da external repulse |
| `Options/Classes/FluidDebug.ts` | Non richiesto |
| `FluidMath.ts` | Matematica inline nell'interactor |
| `FluidState.ts` | Nessuno stato per-frame necessario |
| `FluidPlugin.ts` / `FluidPluginInstance.ts` | Non serve orchestrazione plugin |
| `rollup.config.js`, `typedoc.json`, `.browserslistrc`, `.npmignore`, `eslint.config.js` | Non servono per package standard |

---

## FluidInteractor class skeleton

```ts
export class FluidInteraction extends ParticlesInteractorBase<Container, FluidParticle> {
  readonly maxDistance: number;

  constructor(container: Container) {
    super(container);
    this.maxDistance = 0;
  }

  clear(): void { /* noop */ }

  init(): void { /* noop */ }

  interact(p1: FluidParticle, _interactivityData: IInteractivityData, delta: IDelta): void {
    // DDR implementation
  }

  isEnabled(particle: FluidParticle): boolean {
    return particle.options.fluid?.enable ?? false;
  }

  loadParticlesOptions(
    options: ParticlesFluidOptions,
    ...sources: (RecursivePartial<IParticlesFluidOptions> | undefined)[]
  ): void {
    loadOptionProperty(options, "fluid", Fluid, ...sources);
  }

  reset(): void { /* noop */ }
}
```

### Why `maxDistance` is a public field (not getter)

Follows Collider pattern (`readonly maxDistance`). Set once during interact when options are read. The InteractionManager uses this for spatial grid cell sizing.

---

## Lifecycle mapping

| Hook | Called when | Action |
|------|-------------|--------|
| `init()` | Container init | Noop (options read lazily) |
| `isEnabled(p)` | Per-particle, per-frame | `particle.options.fluid?.enable` |
| `interact(p, data, delta)` | Phase 2, per-particle | DDR density → pressure → displacement |
| `clear(p, delta)` | Phase 2, per-particle (always) | Noop |
| `reset(data, p)` | Phase 1, per-particle (if enabled) | Noop |
| `loadParticlesOptions(...)` | Options loading | Load `fluid` key via `loadOptionProperty` |

---

## Interaction with existing systems

### move plugin

Fluid si basa sul MovePlugin per l'advezione baseline. MovePlugin esegue in Phase 1 (position += velocity * speed), DDR corregge in Phase 2. Consigliato moveSpeed 1-3 per fluid.

### collisions

Possono coesistere. Se entrambi abilitati:
- Collisions gestisce overlap fisici (bounce/absorb/destroy)
- Fluid aggiunge coesione e incompressibilità
- Rischio: over-constraint se stiffness alta. Default conservativo.

### attract / repulse (particle-particle)

Attract può creare flussi macroscopicamente direzionati mentre fluid preserva coerenza locale. Risk: jitter se attract + fluid stiffness sono entrambi alti.

### external repulse

Già presente come external interaction. Non serve pointer impulse nel fluid — l'utente usa `interactivity.modes.repulse` per interagire col fluido.

### gravity (move plugin)

Già presente. Non serve gravity nel fluid.

### emitters

Supportato. Particelle spawnate hanno `spawning = true` → saltate da DDR fino al frame successivo.

---

## Per-frame orchestration

Il DDR è un algoritmo single-pass Gauss-Seidel. Ogni particella, quando `interact()` viene chiamata:
1. Query i vicini nella griglia
2. Accumula densità
3. Applica spostamento simmetrico (modifica sé E il vicino)

Poiché `ParticlesManager.update()` itera le particelle in ordine d'array, quando particle j viene elaborata, particle i (già processata) potrebbe essere già stata spostata. Questo è esattamente il comportamento Gauss-Seidel desiderato.

**Non c'è necessità di container plugin per orchestrazione multi-pass** nel v1.

---

## Performance budget

| Scenario | Target |
|----------|--------|
| 300 particles, desktop | > 100 fps |
| 600 particles, desktop | ~ 60 fps |
| 1000 particles, desktop | Accettabile con radius ridotto |
| 300 particles, mobile | > 30 fps |

### Allocations

- Zero allocazioni nel main loop: il queryCircle ritorna array esistente della griglia
- Per-particle temporanei su variabili locali (nessun oggetto allocato)
- `maxNeighbors` cap evita array grandi

---

## Implementation sequence

### Step 0 — Repository alignment

1. Ispezionare interactions/particles/collisions come template
2. Confermare naming: `particlesFluid`, `@tsparticles/interaction-particles-fluid`, `loadParticlesFluidInteraction`
3. Verificare comandi build: `pnpm nx build interaction-particles-fluid`

### Step 1 — Package skeleton

1. Scaffold `interactions/particles/fluid/` (package.json, tsconfig.*, src/index.ts, src/index.lazy.ts, src/browser.ts)
2. `FluidInteractor.ts` noop che estende ParticlesInteractorBase
3. Build deve passare

### Step 2 — Options contract

1. `Options/Interfaces/IFluid.ts`
2. `Options/Classes/Fluid.ts` con load()
3. `Types.ts` con type extensions
4. `loadParticlesOptions()` nel FluidInteractor

### Step 3 — Baseline DDR solver

1. Implementare `interact()` con density accumulation + pressure displacement
2. Epsilon safety, force clamp, skip destroyed/spawning
3. Aggiornare `maxDistance` in base a `particle.options.fluid.radius`

### Step 4 — Constraints + stabilization

1. maxNeighbors cap
2. Boundary containment (optional: soft edge repulsion via outModes)
3. Test con 600 particelle, moveSpeed 2

### Step 5 — Interoperability

1. Test combinazioni: fluid+move, fluid+collisions, fluid+emitters, fluid+repulse
2. Documentare caveat trovati

### Step 6 — Docs + presets

1. README con install/load/options
2. Un preset di default funzionante
3. Troubleshooting: "nessun effetto fluido", "jitter", "performance bassa"

---

## Acceptance criteria

1. Effetto visivo chiaramente fluido (cluster locali, incompressibilità) — non semplice attract/repulse
2. Nessun NaN/Infinity in posizioni/velocity
3. Default stabili con 300-600 particelle su desktop
4. Nessuna modifica a engine
5. README con opzioni e caveat

---

## Open questions (da validare in implementazione)

1. Single-pass DDR è sufficiente, o serve multi-pass con plugin?
2. maxNeighbors=64 è un buon default o va alzato/abbassato?
3. Le opzioni di default producono un effetto fluido visualmente distinto?
4. Serve un `minRadius` per evitare interazioni con particelle troppo piccole?

---

## Rimosso dal v2: motivazioni dettagliate

### FluidGravity rimosso

La gravity è già gestita dal MovePlugin come opzione built-in (`particles.move.gravity`). Aggiungere una seconda gravity nel fluid causerebbe:
- Doppia applicazione (se entrambe enable)
- Confusione nell'utente (quale gravity usare?)
- Complessità ingiustificata

### FluidPointer rimosso

L'interazione con mouse/pointer è già coperta da:
- `interaction.external.repulse` → spinge via
- `interaction.external.attract` → attrae
- `interaction.external.push` → aggiunge particelle

Il fluid non deve reimplementare il pointer handling. L'utente configura l'interazione esterna desiderata e il fluid reagisce naturalmente perché le posizioni delle particelle vengono modificate dall'interazione esterna prima che il fluid le corregga.

### FluidDebug rimosso

Non richiesto dall'utente. Se servirà debugging in futuro, si può aggiungere come enhancement separato.

### Velocity reconstruction rimossa

Come analizzato nella sezione "Strategy", la velocity non viene aggiornata dopo DDR. Questo è coerente col pattern del particle-particle repulse. La posizione corretta determina il rendering, e il frame successivo riparte dalla velocity memorizzata (che riflette solo la componente di movimento non-fluid).

### boundaryBounce/boundaryClamp rimossi

tsparticles gestisce già i bordi tramite `particles.move.outModes`. Non serve reimplementare. Se l'utente vuole particelle confinate, usa `outModes: "bounce"` o `"clamp"`.

### Viscosity rimossa dal v1

La viscosità (media della velocità coi vicini) è un'enhancement che migliora la coesione ma non è necessaria per un primo rilascio funzionante. Sarà rivalutata post-v1.

---

## Appendice: DDR Formula Reference

La formula esatta dal reference code (adattata per tsparticles):

```
q = 1 - dist / radius

density += q²                    // density ρ
nearDensity += q³                // near-density ρ̃

P = (density - restDensity) * 0.5    // pressure (stiffness=0.5)
Pnear = nearDensity * 0.5             // near-pressure (nearStiffness=0.5)

force = P + Pnear * q
dx = (vx / dist) * force * 0.5       // symmetric displacement
dy = (vy / dist) * force * 0.5
```

Dove `(vx, vy) = neighbor.position - particle.position`.

Lo spostamento è simmetrico:
- particle.position -= (dx, dy)
- neighbor.position += (dx, dy)
