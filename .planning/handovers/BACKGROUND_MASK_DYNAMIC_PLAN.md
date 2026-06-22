# Background Mask Dynamic Source Plan (4.3.0)

## Summary

| | |
|---|---|
| **Target** | `@tsparticles/plugin-background-mask` |
| **Type** | Plugin enhancement |
| **Priority** | Più alta della Fluid Interaction (B) |
| **Key decision gate** | Nessuno — il plugin è già separato dall'engine |

### Progress

(all phases pending — fresh implementation)

- [ ] Phase 0: Baseline scan + pattern reference
- [ ] Phase 1: Type contract (cover.element + cover.draw)
- [ ] Phase 2: Runtime hook — canvasPaint layers
- [ ] Phase 3: Element resolution/cache
- [ ] Phase 4: Error/warning handling
- [ ] Phase 5: Tests
- [ ] Phase 6: Bundle impact + docs/examples
- [ ] Phase 7: Validation gate

---

## Context

Il `BackgroundMask` plugin (`@tsparticles/plugin-background-mask`) attualmente supporta solo una copertura statica ogni frame:

- `cover.color` — colore HEX/HSLA/RGB applicato come `paintBase()`
- `cover.image` — URL stringa caricata una volta in `HTMLImageElement` all'`init()`, poi dipinta via `paintImage()`
- `cover.opacity` — opacità della copertura

Il meccanismo di mask funziona così:

1. **`canvasClear()`** (chiamato da `RenderManager.clear()`) → se mask abilitato, chiama `canvasPaint()`
2. **`canvasPaint()`** → pulisce il canvas, poi dipinge la copertura statica (colore o immagine)
3. **`drawSettingsSetup()`** → imposta `globalCompositeOperation` (default `destination-out`)
4. **Particles** → vengono disegnate e "ritagliano" la copertura, rivelando ciò che c'è dietro il canvas

Questo flusso è stabile e non va modificato.

### Perché serve una sorgente dinamica

A differenza del `background` dell'engine (che ora ha `element` auto-draw + `draw` callback grazie al BACKGROUND_CANVAS_PLAN v2), il BackgroundMask non può usare sorgenti dinamiche come:

- Un **secondo canvas HTML** animato da codice esterno (simulazioni, WebGL, dati in tempo reale)
- Un **elemento video** (webcam, stream RTMP, video file locale)
- Una **`OffscreenCanvas`** renderizzata da un Worker
- Un **callback di disegno** personalizzato eseguito ogni frame (pattern procedurali, gradienti animati, simplex noise, dati sensor)

### Esempi d'uso concreti

| Sorgente | Effetto |
|----------|---------|
| Webcam (`HTMLVideoElement`) | Le particelle "scoprono" la webcam live |
| Canvas animato esterno | Un secondo canvas con animazioni viene rivelato dalle particelle |
| OffscreenCanvas + Worker | Pattern generati in un Worker appaiono sotto le particelle |
| Draw callback | Onde, vortex, gradienti animati, dati meteo in tempo reale |
| CSS selector string | Selettore dichiarativo per canvas/video/img già nel DOM |

## Product Goal

Aggiungere `element` e `draw` al `cover` del BackgroundMask, replicando il pattern architetturale già implementato e validato nel BACKGROUND_CANVAS_PLAN v2.

| Feature | Background (engine) | BackgroundMask (plugin) — NUOVO |
|---------|-------------------|-------------------------------|
| `element` auto-draw | `background.element` → disegnato dopo clear, prima di particles | `cover.element` → disegnato durante `canvasPaint()`, prima del composite |
| `draw` callback | `background.draw` → eseguito su contesto principale | `cover.draw` → eseguito su contesto principale durante `canvasPaint()` |
| Fallback | CSS style background | Static cover (color/image) |

La differenza fondamentale è il **posizionamento nel frame loop**:

- **Background** disegna le layer dinamiche **dopo** clear, **prima** del composite mode e delle particelle
- **BackgroundMask** disegna le layer dinamiche **durante** `canvasPaint()` (che è chiamato da `canvasClear()`), **prima** che `drawSettingsSetup()` attivi `destination-out`

L'ordine di rendering con la nuova feature (back to front):

1. **`clear()`** → canvas pixel clear, unchanged
2. **`canvasPaint()` modificato**:
   - Se `cover.element` impostato → `ctx.drawImage(element, 0, 0, w, h)` — auto-draw della sorgente esterna
   - Se `cover.draw` impostato → callback eseguito sul contesto principale
   - Se né element né draw → comportamento legacy: static cover (color o image URL)
3. **`drawSettingsSetup()`** → `globalCompositeOperation = composite` (default `destination-out`)
4. **Particles** → disegnate, "ritagliano" la copertura dinamica

### Principi chiave

- `element` e `draw` sono layer **indipendenti**, non accoppiati
- Se entrambi impostati: prima element auto-draw, poi draw callback
- Se impostati, la copertura statica (color/image) viene **skippata**
- `draw` riceve sempre il **contesto principale** del canvas
- Tutte le nuove opzioni sono opzionali e `undefined` di default
- Comportamento legacy invariato quando non si usano le nuove opzioni

## Hard Product Constraints (non-negoziabili)

1. Usare `cover.element` e `cover.draw`. Non introdurre `cover.canvas`.
2. Tutte le nuove opzioni sono opzionali e `undefined` di default.
3. **Layer order è sempre**: element auto-draw → draw callback → static cover fallback → composite mode → particles.
   - Se sia element che draw sono impostati, entrambi eseguiti ogni frame (element prima, draw dopo).
   - Se solo uno impostato, solo quel layer viene eseguito.
   - Se nessuno impostato, comportamento legacy (static cover).
4. La copertura statica esistente (`color`, `image`, `opacity`) deve continuare a funzionare identicamente.
5. **Nessun accoppiamento tra `element` e `draw`**: sono layer indipendenti.
6. `draw` riceve sempre il **contesto principale del canvas** (`OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D`), mai il contesto dell'element.
7. `element` type limitato a `CanvasImageSource`: `HTMLCanvasElement | OffscreenCanvas | HTMLVideoElement | HTMLImageElement | string` (CSS selector). Nessun `HTMLElement` generico.
8. Il delta per `draw` callback viene passato dall'ultimo delta disponibile. Se non disponibile (canvasPaint non riceve delta), usare `{ value: 0, factor: 1 }` come fallback.

## Scope and Non-Goals

### In scope

- Opzioni/tipi per `element` e `draw` su `IBackgroundMaskCover` / `BackgroundMaskCover`
- Logica di risoluzione elemento (direct reference + CSS selector)
- Auto-draw element tramite `ctx.drawImage()` in `canvasPaint()`
- Esecuzione draw callback in `canvasPaint()`
- Warning e safety guards (catch errori, once-per-key)
- Test + docs/esempi

### Out of scope (per questa versione)

- Modificare la firma di `IContainerPlugin.canvasPaint()` per ricevere `delta` (si usa un delta fittizio)
- Nuovi lifecycle hooks (`resize`, `destroy` specifici per il draw callback)
- Nuove modalità di composite oltre `globalCompositeOperation`
- Sincronizzazione automatica tra canvas esterni
- Re-architettare il plugin draw pipeline dell'engine
- Supporto per `OffscreenCanvas` trasferito da Worker (l'utente gestisce il transfer)
- Animazione/metadati video (playback gestito dall'utente)

## Bundle Size and Architecture Decision

### Perché non serve un decision gate complesso

A differenza del `background` dell'engine, `BackgroundMask` è **già un plugin separato** (`@tsparticles/plugin-background-mask`). Non c'è dibattito "engine vs plugin" — la feature vive direttamente nel plugin.

### Baseline attuale

- `plugins/backgroundMask/dist/tsparticles.plugin.background-mask.min.js`: ~5,730 bytes (reference)
- File sorgente del plugin: solo 4 file principali (plugin, instance, tipi, opzioni)

### Stima impatto

L'aggiunta di `element` e `draw` richiede:
- ~10 righe di tipo (interfacce/proprietà)
- ~30 righe di logica risoluzione elemento (già scritta e testata nell'engine)
- ~20 righe di modifica `canvasPaint()`
- ~10 righe di warning system

**Stima incremento**: < 0.5 KB minified. LOW impact.

### Misurazione consigliata

L'implementatore deve comunque misurare il delta prima del merge:

1. Build del plugin senza modifiche → registrare grandezza
2. Build del plugin con le modifiche → registrare grandezza
3. Calcolare delta
4. Documentare nel PR

### Decisione attesa

`engine-now` (keep in plugin, che è già separato). Nessuna estrazione necessaria.

## Release Suitability (4.3.0)

### Semver classification

**minor-safe** quando tutte le seguenti sono vere:
- API additiva solo (`cover.element`, `cover.draw` opzionali)
- Comportamento esistente rimane identico quando le nuove opzioni non sono usate
- Nessuna semantica esistente viene modificata
- Nessuna modifica obbligatoria ai wrapper

**non minor-safe** se qualsiasi default/comportamento esistente cambia per utenti correnti.

Questa feature è **minor-safe**: `cover` non ha `element` o `draw` oggi, quindi l'aggiunta è puramente additiva.

### Go/No-Go checklist

#### GO per 4.3.0 solo se tutto vero

- [ ] feature rimane strettamente additiva (`cover.element`/`cover.draw` opzionali)
- [ ] zero regressioni sul comportamento legacy della mask (test automatici + smoke manuale)
- [ ] bundle impact misurato e documentato
- [ ] docs/esempi aggiornati senza ambiguità
- [ ] nessuna issue blocker/high-severity sul plugin background-mask

#### NO-GO per 4.3.0 (deferire a 4.4.0) se qualcosa è vero

- [ ] l'implementazione richiede modifiche semantiche che sorprendono utenti esistenti
- [ ] instabilità irrisolta nel rendering loop / canvas layering paths
- [ ] finestra di verifica troppo corta per confidence

### Raccomandazione

**Target 4.3.0**. L'implementazione è semplice, il pattern è già validato, il plugin è isolato e non tocca l'engine.

## Final API Proposal

### `cover.element`

> Nota: `element` vive su `backgroundMask.cover.element`, non su `backgroundMask.element`.

- Type: `string | HTMLCanvasElement | OffscreenCanvas | HTMLVideoElement | HTMLImageElement`
- Optional: yes
- Default: `undefined`
- Semantics:
  - `string`: CSS selector risolto in ambienti DOM-capable (deve matchare un elemento drawable — canvas, video, o img)
  - `HTMLCanvasElement | OffscreenCanvas | HTMLVideoElement | HTMLImageElement`: riferimento diretto
  - Quando impostato, il contenuto visuale corrente dell'elemento viene disegnato sul canvas principale ogni frame via `ctx.drawImage()`, **prima** che il composite mode della mask venga applicato
  - L'elemento **non** è gestito dal plugin — il codice esterno gestisce il suo rendering/playback

### `cover.draw`

> Nota: `draw` vive su `backgroundMask.cover.draw`.

- Type: `(context: BackgroundDrawContext, delta: IDelta) => void`
- Optional: yes
- Default: `undefined`
- Semantics: callback eseguito ogni frame durante `canvasPaint()`. Riceve sempre il **contesto principale del canvas**, mai il contesto dell'elemento.

### Tipo esportato condiviso

```ts
type BackgroundDrawContext = OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D;
```

Già esportato da `@tsparticles/engine` — importabile dal plugin.

### Serialization note

- `element` esprimibile in JSON come CSS selector string per canvas/video/img nel DOM
- `draw` è function-only → solo JS/TS runtime config

### Esempio d'uso

```ts
// JS config — draw callback per pattern animato
await tsParticles.load({
  id: "tsparticles",
  options: {
    backgroundMask: {
      enable: true,
      cover: {
        draw: (ctx, delta) => {
          const t = delta.value * 0.001;
          ctx.fillStyle = `hsl(${(t * 50) % 360}, 70%, 50%)`;
          ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        },
      },
    },
  },
});
```

```ts
// JS config — element da secondo canvas
const animCanvas = document.getElementById("myAnimation") as HTMLCanvasElement;

await tsParticles.load({
  id: "tsparticles",
  options: {
    backgroundMask: {
      enable: true,
      cover: {
        element: animCanvas,
        opacity: 1,
      },
    },
  },
});
```

```jsonc
// JSON config — CSS selector per video element
{
  "backgroundMask": {
    "enable": true,
    "cover": {
      "element": "#webcam",
      "opacity": 0.8
    }
  }
}
```

## Behavior and Precedence (layered)

Ordine di rendering ogni frame (back to front):

```
clear()                          ← canvas pixel clear (unchanged)
cover.element auto-draw          ← NUOVO: ctx.drawImage(element) se element è impostato
cover.draw callback              ← NUOVO: eseguito su contesto principale
static cover (color/image)       ← FALLBACK: solo se né element né draw sono impostati
[globalCompositeOperation]       ← attivato da drawSettingsSetup() (unchanged)
particles                        ← unchanged (ritagliano la mask)
```

### Layer matrix

| `element` | `draw` | Behavior |
|-----------|--------|----------|
| unset     | unset  | Legacy: static cover (color/image) + particles |
| set       | unset  | Element auto-drawn come mask + particles |
| unset     | set    | Draw callback eseguito come mask + particles |
| set       | set    | Element auto-drawn + draw callback + particles |

### Key interpretation

- `element` è una **sorgente visuale** (auto-composita), non un target selector
- `draw` è **logica di rendering indipendente** sul contesto principale
- I due sono ortogonali: puoi usarne uno, entrambi, o nessuno
- Se nessuno usato → comportamento legacy invariato

## Plugin Integration Design

### 1) Options e type surface

Target files:

- `plugins/backgroundMask/src/Options/Interfaces/IBackgroundMaskCover.ts`
- `plugins/backgroundMask/src/Options/Classes/BackgroundMaskCover.ts`
- `plugins/backgroundMask/src/types.ts`

#### `IBackgroundMaskCover` modificata

```ts
import type { IOptionsColor, RecursivePartial } from "@tsparticles/engine";
import type { BackgroundDrawContext, IDelta } from "@tsparticles/engine"; // IDelta già in engine, BackgroundDrawContext già esportato

export interface IBackgroundMaskCover {
  color?: string | IOptionsColor;                      // esistente
  image?: string;                                       // esistente
  opacity: number;                                      // esistente (default 1)

  /** NUOVO: External element or CSS selector for dynamic mask source */
  element?: string | HTMLCanvasElement | OffscreenCanvas | HTMLVideoElement | HTMLImageElement;

  /** NUOVO: Custom draw callback for dynamic mask */
  draw?: (context: BackgroundDrawContext, delta: IDelta) => void;
}
```

#### `BackgroundMaskCover` modificata

```ts
import {
  type IOptionLoader, OptionsColor, type RecursivePartial,
  isNull, loadProperty,
  type BackgroundDrawContext, type IDelta,
} from "@tsparticles/engine";

export class BackgroundMaskCover implements IBackgroundMaskCover, IOptionLoader<IBackgroundMaskCover> {
  color?: OptionsColor;                         // esistente
  image?: string;                               // esistente
  opacity = 1;                                   // esistente

  element?: string | HTMLCanvasElement | OffscreenCanvas | HTMLVideoElement | HTMLImageElement;  // NUOVO
  draw?: (context: BackgroundDrawContext, delta: IDelta) => void;                                 // NUOVO

  load(data?: RecursivePartial<IBackgroundMaskCover>): void {
    if (isNull(data)) return;

    if (data.color !== undefined) {
      this.color = OptionsColor.create(this.color, data.color);
    }

    loadProperty(this, "image", data.image);
    loadProperty(this, "opacity", data.opacity);

    // NUOVO
    loadProperty(this, "element", data.element);
    loadProperty(this, "draw", data.draw);
  }
}
```

### 2) Runtime — BackgroundMaskPluginInstance

#### Nuovi campi privati

```ts
readonly #maskWarnings: Set<string> = new Set();
#maskElement?: HTMLCanvasElement | OffscreenCanvas | HTMLVideoElement | HTMLImageElement | null;
```

#### `init()` modificato

```ts
async init(): Promise<void> {
  await this.#initCover();
  this.#resolveMaskElement();
}
```

#### Nuovo `#resolveMaskElement()`

Adattato da `RenderManager.#resolveBackgroundElement()` (BACKGROUND_CANVAS_PLAN v2, Phase 11):

```ts
readonly #resolveMaskElement = (): void => {
  const cover = this.#container.actualOptions.backgroundMask?.cover;

  this.#maskElement = null;

  if (!cover?.element) {
    return;
  }

  if (typeof cover.element === "string") {
    if (typeof document !== "undefined") {
      const node = document.querySelector(cover.element);

      if (
        node instanceof HTMLCanvasElement ||
        node instanceof HTMLVideoElement ||
        node instanceof HTMLImageElement
      ) {
        this.#maskElement = node;
      } else if (node) {
        this.#maskWarnOnce(
          "mask-element-not-supported",
          `Mask cover element "${cover.element}" matched a non-drawable element (expected canvas, video, or img)`,
        );
      } else {
        this.#maskWarnOnce(
          "mask-element-not-found",
          `Mask cover element selector "${cover.element}" not found in the DOM`,
        );
      }
    }
  } else if (
    cover.element instanceof HTMLCanvasElement ||
    cover.element instanceof OffscreenCanvas ||
    cover.element instanceof HTMLVideoElement ||
    cover.element instanceof HTMLImageElement
  ) {
    this.#maskElement = cover.element;
  }
};
```

Regole di risoluzione:
1. Se `element` è un riferimento diretto (`HTMLCanvasElement | OffscreenCanvas | HTMLVideoElement | HTMLImageElement`): store diretto
2. Se `element` è `string` e DOM è disponibile: risolvere `document.querySelector(selector)`
   - Se risolto e drawable → store
   - Se risolto e non drawable → warn `mask-element-not-supported`, null
   - Se non risolto → warn `mask-element-not-found`, null
3. Se `element` è null dopo risoluzione → skip layer dinamico (nessun fallback necessario, si usa static cover)

Cache invalidation:
- Container init/start
- Options reload/reset/refresh

#### `canvasPaint()` modificato

```ts
canvasPaint(): boolean {
  if (!this.#container.actualOptions.backgroundMask?.enable) {
    return false;
  }

  const canvas = this.#container.canvas;

  canvas.render.canvasClear();

  const cover = this.#container.actualOptions.backgroundMask?.cover;
  let dynamicUsed = false;

  // Layer 0: auto-draw external element
  if (this.#maskElement) {
    dynamicUsed = true;

    try {
      const ctx = canvas.render["#context"] as
        | OffscreenCanvasRenderingContext2D
        | undefined;
      const size = canvas.render["#canvasManager"].size;

      ctx?.drawImage(this.#maskElement, 0, 0, size.width, size.height);
    } catch {
      this.#maskWarnOnce(
        "mask-element-draw-error",
        "Error drawing background mask cover element onto canvas",
      );
    }
  }

  // Layer 1: custom draw callback
  if (cover?.draw) {
    dynamicUsed = true;

    try {
      const ctx = canvas.render["#context"] as
        | OffscreenCanvasRenderingContext2D
        | CanvasRenderingContext2D
        | undefined;

      // Use a fallback delta since canvasPaint doesn't receive it
      const fallbackDelta = { value: 0, factor: 1 };

      cover.draw(ctx as BackgroundDrawContext, fallbackDelta);
    } catch {
      this.#maskWarnOnce(
        "mask-draw-error",
        "Error in mask cover.draw callback",
      );
    }
  }

  // Fallback: static cover (legacy behavior, unchanged)
  if (!dynamicUsed) {
    if (this.#coverImage) {
      canvas.render.paintImage(this.#coverImage.image, this.#coverImage.opacity);
    } else {
      canvas.render.paintBase(this.#coverColorStyle);
    }
  }

  return true;
}
```

**Importante**: `canvasPaint()` attualmente non riceve `delta`. La firma di `IContainerPlugin.canvasPaint()` è `() => boolean`. Soluzioni:
- **Adottata qui**: delta fittizio `{ value: 0, factor: 1 }`. Non ideale per animazioni temporizzate, ma permette al callback di non crashare.
- **Futuro**: modificare `IContainerPlugin.canvasPaint` per ricevere `delta?: IDelta` — breaking change minimo (parametro opzionale). Valutare dopo rilascio iniziale.

> **Attenzione all'accesso alle proprietà private**:
> Il codice sopra usa `canvas.render["#context"]` e `canvas.render["#canvasManager"].size` — questi sono campi privati di `RenderManager`. Alternativa: usare i metodi pubblici esistenti. Se il plugin non ha accesso diretto, l'implementatore dovrà esporre un metodo pubblico su `RenderManager` o passare contesto e size al plugin in altro modo. Verificare durante Phase 0.

#### Warning utility

```ts
readonly #maskWarnOnce = (key: string, message: string): void => {
  if (this.#maskWarnings.has(key)) {
    return;
  }

  this.#maskWarnings.add(key);
  console.warn(`[tsParticles BackgroundMask] ${message}`);
};
```

#### `destroy()` / cleanup

Aggiungere rilascio risorse:

```ts
// Nel metodo destroy o reset del plugin
this.#maskElement = null;
this.#maskWarnings.clear();
```

### 3) Nessuna modifica a `drawSettingsSetup()` / `drawSettingsCleanup()`

La `drawSettingsSetup()` rimane identica — imposta `globalCompositeOperation` sul contesto. Il dynamic layer viene disegnato **prima** che il composite mode venga attivato, perché `canvasPaint()` è chiamato durante `clear()`, che è **prima** di `drawSettingsSetup()`.

L'ordine nel frame loop (`RenderManager.drawParticles`) è:

1. `clear()` → plugin `canvasClear()` → plugin `canvasPaint()` → **disegniamo element/draw qui**
2. `#drawBackground(delta)` — solo engine background, non mask
3. `drawSettingsSetup()` → **qui si attiva destination-out**
4. Particles → **vengono ritagliate**

Questo è corretto: il contenuto dinamico è la "base" che le particelle rivelano tramite la composizione.

### 4) Safety e diagnostics

#### drawImage exception handling

- Wrap `drawImage()` in `try/catch`
- Non bloccare l'animazione loop
- Warn con messaggio deterministico

#### Callback exception handling

- Wrap callback in `try/catch`
- Non bloccare l'animazione loop
- Warn con messaggio deterministico

#### Warning policy

- Warn una volta per container per warning key
- Usare `Set<string>` sul plugin instance

| Key | Message | Quando |
|-----|---------|--------|
| `mask-element-not-found` | Selector non trovato nel DOM | CSS selector non matcha nulla |
| `mask-element-not-supported` | Elemento non drawable | Selector matcha un div o altro non drawable |
| `mask-element-draw-error` | drawImage fallisce | Elemento disconnesso, context lost, video non caricato |
| `mask-draw-error` | Callback draw lancia eccezione | Errore nel codice utente |

### 5) Environment constraints

- In ambienti non-DOM, CSS selector resolution è saltata safely
- Nessuna assunzione che dimensioni, DPR o formato dell'elemento esterno matchino il canvas interno
- Il ridimensionamento/cropping dell'elemento esterno è gestito da `drawImage()` — stenderà per default a fill del canvas. L'utente deve dimensionare gli elementi appropriatamente
- Per `HTMLVideoElement`: assicurarsi che i metadata video siano caricati (responsabilità utente). `drawImage(video, ...)` disegna il frame corrente; il playback video è gestito esternamente
- Per `OffscreenCanvas`: deve essere trasferito/controllato esternamente. Il plugin legge solo il contenuto pixel ogni frame
- `draw` callback che dipende da `delta` preciso riceverà `{ value: 0, factor: 1 }` — per animazioni temporizzate, usare `performance.now()` nel callback

## Compatibility Model

### Backward compatibility guarantees

- Configs esistenti rimangono behavior-identical quando le nuove opzioni non sono usate
- La copertura statica esistente (`color`, `image`, `opacity`) rimane invariata
- La feature è fully opt-in

### Breaking changes

**Nessun breaking change.** Tutte le aggiunte sono su campi opzionali (`element`, `draw`) che non esistevano prima. Nessuna semantica di `color`, `image`, `opacity` viene modificata.

### Wrapper compatibility

- Nessuna modifica richiesta ai wrapper
- Engine type exports: `BackgroundDrawContext` e `IDelta` già esportati da `@tsparticles/engine`
- JSON config: solo `element` (CSS selector string)
- JS/TS config: `element` (direct reference) e `draw` (function)

### JSON vs JS/TS expectations

- JSON: `element` solo come CSS selector string
- JS/TS: `element` (riferimento diretto o CSS selector) e `draw`
- Docs/esempi devono mostrare entrambi

## Test Plan

### Unit tests

1. **Options loading**
   - Nuovi campi `element` e `draw` accettati
   - Default rimangono `undefined`
   - Campi legacy (`color`, `image`, `opacity`) invariati
   - `element` e `draw` caricati correttamente via `load()`

2. **Element resolution logic**
   - CSS selector valido per canvas/video/img → elemento store come `#maskElement`
   - Selector non trovato → null + once warning (`mask-element-not-found`)
   - Selector matcha non-drawable → null + once warning (`mask-element-not-supported`)
   - Riferimento diretto (canvas/video/img/offscreen) → store diretto

3. **Layer execution logic in `canvasPaint()`**
   - Nessun `element`, nessun `draw` → nessun layer dinamico, static cover usato (legacy)
   - `element` solo → `drawImage` chiamato con elemento, nessun draw callback
   - `draw` solo → draw callback eseguito, nessun drawImage
   - `element` + `draw` → drawImage prima, poi draw callback
   - `element` invalido → drawImage skippato, draw callback non eseguito (se non impostato), static cover usato

4. **Error resilience**
   - throw dentro `draw` callback → non rompe il frame successivo
   - drawImage su elemento invalido/disconnesso → non rompe il frame successivo
   - Warning throttled (once-key behavior) per ogni chiave

5. **Legacy guard**
   - Config senza `element`/`draw` → zero cambiamenti nel comportamento
   - `canvasPaint()` con solo `color` → identico a prima
   - `canvasPaint()` con solo `image` → identico a prima

### Integration/manual smoke

1. Legacy mask (solo color/image) — visualmente invariato
2. `cover.draw` con callback semplice (gradiente) — animato sulla mask
3. `cover.element` con canvas esterno animato — contenuto del secondo canvas mostrato come mask
4. `cover.element` con video element — frame corrente del video come mask
5. `cover.element` + `cover.draw` insieme — layer ordinati correttamente
6. CSS selector invalido — skip silenzioso, static cover usato, warning una volta

## Acceptance Criteria (Definition of Done)

1. **API**
   - `cover.element` accetta `string | HTMLCanvasElement | OffscreenCanvas | HTMLVideoElement | HTMLImageElement`
   - `cover.draw` accetta `(context: BackgroundDrawContext, delta: IDelta) => void`
   - Entrambi opzionali, `undefined` di default
   - Nessun `cover.canvas` alias

2. **Layer rendering order**
   - `clear()` → unchanged
   - `cover.element` → auto-drawn via `drawImage` sul contesto principale (se impostato)
   - `cover.draw` → eseguito sul contesto principale (se impostato)
   - Static cover (color/image) → solo se né element né draw sono impostati (fallback legacy)
   - Composite mode → unchanged
   - Particles → unchanged

3. **Element independence**
   - element è auto-drawn senza richiedere un `draw` callback
   - element NON è usato come context provider per `draw`
   - `draw` riceve sempre il contesto principale del canvas
   - Il rendering dell'elemento è gestito completamente da codice esterno

4. **Stability**
   - Elemento invalido → skip silenzioso del layer auto-draw (static cover usato)
   - drawImage non blocca il rendering
   - draw callback non blocca il rendering
   - Warning deterministici e non ripetitivi (once-per-key)

5. **Performance/compatibility**
   - Comportamento invariato per config legacy (no element, no draw)
   - Nessun overhead misurabile quando le nuove feature sono disattivate
   - drawImage GPU-accelerato (~0.01-0.05ms per frame)

6. **Bundle impact**
   - Delta bundle misurato e documentato
   - Decisione registrata

## Execution Plan for Build Agent (phase-based)

### Phase 0 — Baseline scan + pattern reference

- Leggere BACKGROUND_CANVAS_PLAN.md (parti rilevanti: Phase 9-11, warning policy, element resolution)
- Identificare i punti di contatto nel `BackgroundMaskPluginInstance`:
  - `canvasPaint()` → dove inserire i layer dinamici
  - `init()` → dove chiamare `#resolveMaskElement()`
  - `#initCover()` → flusso esistente, non modificare
- Identificare come accedere a contesto e size del canvas dal plugin (verificare se `canvas.render["#context"]` è accessibile o serve metodo pubblico)
- Output: shortlist di pattern da copiare + eventuali modifiche necessarie a `RenderManager` per esporre contesto/size

### Phase 1 — Type contract (cover.element + cover.draw)

- **IBackgroundMaskCover.ts**: aggiungere `element` (`string | HTMLCanvasElement | OffscreenCanvas | HTMLVideoElement | HTMLImageElement`) e `draw` (`(context: BackgroundDrawContext, delta: IDelta) => void`)
- **BackgroundMaskCover.ts**: aggiungere proprietà, modificare `load()` per includere i nuovi campi
- **types.ts**: eventuali aggiornamenti (es. importare `BackgroundDrawContext` se non già presente)
- Output: compile passa per type surface aggiornata

### Phase 2 — Runtime hook — canvasPaint layers

- **BackgroundMaskPluginInstance.ts**:
  - Aggiungere campo `#maskElement: HTMLCanvasElement | OffscreenCanvas | HTMLVideoElement | HTMLImageElement | null`
  - Aggiungere campo `#maskWarnings: Set<string>`
  - Modificare `canvasPaint()` per gestire tre layer:
    1. Auto-draw element (`ctx.drawImage(...)`) se `#maskElement` è impostato
    2. Draw callback (`cover.draw(ctx, delta)`) se `cover.draw` è impostato
    3. Fallback static cover (color/image) — comportamento legacy, solo se nessun layer dinamico usato
  - Aggiungere `#maskWarnOnce(key, message)` utility
  - Usare delta fittizio `{ value: 0, factor: 1 }` per il draw callback
- Output: mask dinamica funzionante

### Phase 3 — Element resolution/cache

- **BackgroundMaskPluginInstance.ts**:
  - Aggiungere `#resolveMaskElement()` con logica adattata da `RenderManager.#resolveBackgroundElement()`:
    - Riferimento diretto (canvas, offscreen, video, img) → store
    - CSS selector string → `document.querySelector()` → validazione tipo → store o warn
    - null/undefined → `#maskElement = null`
  - Chiamare `#resolveMaskElement()` in `init()` (dopo `#initCover()`)
  - Azzerare `#maskElement` e `#maskWarnings` in `destroy()`
- Output: CSS selector e riferimenti diretti funzionano, cache invalidata a init

### Phase 4 — Error/warning handling

- Warning keys:
  - `mask-element-not-found`: selector non trovato
  - `mask-element-not-supported`: matched element non drawable
  - `mask-element-draw-error`: drawImage fallisce
  - `mask-draw-error`: callback lancia eccezione
- Tutti una volta per chiave (sistema `Set<string>`)
- drawImage e callback wrappati in `try/catch`
- Output: nessun log spam, messaggi chiari, animazione non bloccata

### Phase 5 — Tests

Aggiungere test per:

1. **Options**: caricamento `element` e `draw`, default undefined
2. **Element resolution**:
   - CSS selector canvas/video/img valido → `#maskElement` settato
   - Selector non trovato → null + warn
   - Non-drawable match → null + warn
   - Direct reference canvas/offscreen/video/img → store diretto
3. **canvasPaint layers**:
   - Solo element → drawImage chiamato
   - Solo draw → callback eseguito
   - Entrambi → drawImage prima, callback dopo
   - Nessuno → static cover (legacy)
   - Element invalido → drawImage skippato
4. **Error resilience**:
   - throw in callback non blocca
   - drawImage fallisce non blocca
   - warning non ripetitivo per chiave
5. **Legacy guard**: config senza element/draw → comportamento identico
- Output: test verdi

### Phase 6 — Bundle impact + docs/examples

- **Bundle impact**:
  - Build plugin senza modifiche → registrare grandezza (minified + gzip se disponibile)
  - Build plugin con modifiche → registrare grandezza
  - Calcolare delta
  - Documentare nel PR

- **Docs**:
  - Aggiornare `plugins/backgroundMask/README.md`:
    - Nuova sezione "Dynamic Mask Sources"
    - Documentare `cover.element` e `cover.draw`
    - Tabella layer rendering order
    - Esempi:
      1. Draw callback (gradiente animato)
      2. Canvas esterno come mask
      3. Video element come mask
      4. CSS selector
    - Compatibility notes
  - Output: docs aggiornate

### Phase 7 — Validation gate

- Build del plugin passa (`pnpm --filter @tsparticles/plugin-background-mask run build`)
- Test passano
- Legacy config testato manualmente (color + image funzionano come prima)
- Dynamic element testato manualmente (canvas esterno mostrato come mask)
- Draw callback testato manualmente (callback eseguito ogni frame)
- CSS selector testato manualmente
- Output: checklist finale completa

## Progress Checklist Template (for agent status updates)

### V1 (current implementation — fresh)

- [ ] Phase 0: baseline scan + pattern reference
- [ ] Phase 1: type contract (cover.element + cover.draw)
- [ ] Phase 2: runtime hook — canvasPaint layers
- [ ] Phase 3: element resolution + cache
- [ ] Phase 4: error/warning handling
- [ ] Phase 5: tests
- [ ] Phase 6: bundle impact + docs/examples
- [ ] Phase 7: validation gate

## Files to modify (summary)

| File | Change |
|------|--------|
| `plugins/backgroundMask/src/Options/Interfaces/IBackgroundMaskCover.ts` | Aggiungere `element` + `draw` |
| `plugins/backgroundMask/src/Options/Classes/BackgroundMaskCover.ts` | Aggiungere proprietà + `load()` |
| `plugins/backgroundMask/src/BackgroundMaskPluginInstance.ts` | `#maskElement`, `#resolveMaskElement()`, `canvasPaint()` modificato, `#maskWarnOnce()`, init/destroy |

Nessuna modifica all'engine. **Se** l'accesso a `canvas.render["#context"]` e `canvas.render["#canvasManager"].size` non è possibile da fuori, potrebbe servire un piccolo metodo pubblico su `RenderManager` (es. `getContextAndSize()`). Questo va valutato in Phase 0.

## Notes for Build Agent

- Mantenere l'implementazione additiva e minima
- Non alterare le semantiche esistenti di `canvasPaint()`, `init()`, `#initCover()`
- Non accoppiare `element` e `draw` — sono layer indipendenti
- `draw` riceve sempre il contesto principale, mai il contesto dell'elemento
- `drawImage()` con un video element disegna il frame corrente; nessun frame management aggiuntivo
- Preferire logica esplicita di fallback su "magic"
- Delta fittizio per `draw` callback — documentare questa limitazione
- Se l'accesso ai campi privati di `RenderManager` è bloccato, esporre un metodo pubblico minimal (es. `getDrawContext()`)
- Se una scelta è ambigua, scegliere il comportamento meno sorprendente e documentarlo nelle PR notes

## Future

### Modificare `IContainerPlugin.canvasPaint()` per ricevere delta

```ts
// Opzione futura
interface IContainerPlugin {
  canvasPaint?: (delta?: IDelta) => boolean; // delta opzionale per backward compat
}
```

Questo permetterebbe al `draw` callback di ricevere un delta reale. Valutare per 4.4.0.

### Draw callback con lifecycle hooks

Aggiungere supporto per `init`, `resize`, `destroy` nel draw callback:

```ts
interface BackgroundMaskDrawContext extends BackgroundDrawContext {
  init?: () => void;
  resize?: () => void;
  destroy?: () => void;
}
```

Non necessario per la versione iniziale.

### Multiple dynamic layers

Supportare array di elementi o callback:

```ts
cover: {
  elements: [...],
  draws: [...],
}
```

Non necessario per la versione iniziale — il singolo elemento + singolo draw copre la stragrande maggioranza dei casi d'uso.
