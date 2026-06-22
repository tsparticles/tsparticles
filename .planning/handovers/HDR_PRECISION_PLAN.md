# Feature G: HDR Precision Enhancement

**Target:** `@tsparticles/engine`

**REGOLA FERREA: ZERO NUOVE OPTIONS.** Nessuna modifica a `IOptions`, `IColorAnimation`, `HslAnimation` o qualsiasi altra interfaccia/classe di opzioni. Solo calcoli interni.

## Problema

La modalità HDR usa `display-p3` con `float16`, ma il pipeline colore tronca la precisione con `Math.round()` in `hslToRgb()`. Questo perde i valori intermedi nel gamut più ampio, causando banding visibile nelle animazioni.

Inoltre: la conversione a display-p3 applica un headroom moltiplicativo (`headroom = maxNits / sdrReferenceWhiteNits ≈ 1.97x`). Questo AMPLIFICA ogni step di animazione — a parità di velocità HSL, l'animazione HDR sembra ~2x più veloce di quella SDR. Bisogna compensare.

## Cosa cambia (solo calcoli)

### 1. `hslToRgbFloat()` — conversione senza arrotondamento

Nuova funzione interna, identica a `hslToRgb()` ma SENZA `Math.round()` sui canali RGB. Restituisce float (0.0 — 255.0).

### 2. `getStyleFromHsl()` — usa `hslToRgbFloat` in HDR

Nel ramo HDR di `getStyleFromHsl()`, chiamare `hslToRgbFloat()` invece di `hslToRgb()`. Nessun cambiamento nel ramo SDR.

### 3. `getRandomRgbColor()` — float per HDR

Aggiungere parametro `hdr?: boolean` alla firma. Quando `hdr === true`, genera valori float continui (da `getRandomInRange()`) invece di interi (da `Math.floor(getRandomInRange())`). Nessuna nuova opzione, è un parametro di funzione interna.

### 4. Cache key — più precisione in HDR

`getStyleFromRgb()` e `getStyleFromHsl()` usano `toFixed(precision)` per le cache key. In HDR, usare 4 decimali invece di 2 per evitare collisioni tra colori float vicini. Interno, nessuna opzione.

### 5. Animazioni colore — scala velocità per HDR (dalle formule reali)

**Formula di conversione HDR** (già nel codice, `getHdrStyleFromRgb`):
```
headroom = maxNits / sdrReferenceWhiteNits    // = 400 / 203 ≈ 1.9704
displayP3_output = (rgbFloatValue / 255) * headroom
```

Per lo stesso delta `Δ` in RGB float, il Δ visivo in display-p3 è `Δ × headroom / 255` contro `Δ / 255` in SDR. L'animazione HDR è quindi `headroom` volte più veloce.

**Correzione:** scalare la velocità di animazione per l'inverso dell'headroom:
```
hdrAnimationScale = sdrReferenceWhiteNits / maxNits   // = 203 / 400 ≈ 0.5075
```

In `updateColorValue()` (ColorUtils.ts:632):
```typescript
const velocity = ((data.velocity ?? minVelocity) * delta.factor + offset * velocityFactor)
               * (hdr ? hdrAnimationScale : 1);
```

`hdrAnimationScale` è una costante interna calcolata da `sdrReferenceWhiteNits` e `maxNits` (esistenti). Nessun numero magico.

**No costanti nuove in Constants.ts** — `hdrAnimationScale` si calcola in ColorUtils.ts dove `sdrReferenceWhiteNits` e `maxNits` sono già disponibili.

**Propagazione:** `updateColor()`, chiamata da `Particle.ts`, `PaintUpdater.ts`, `GradientUpdater.ts`, riceve parametro `hdr` e lo passa a `updateColorValue()`.

### 6. `alterHsl()` — nessun cambiamento

Opera già in float. Ok.

## Cosa NON cambia

- **Nessuna opzione nuova.** Zero modifiche a `IOptions`, `IColorAnimation`, `HslAnimation`, `IOptionsColor`, `IRangeColor`, `Background`, `BackgroundMask`, etc.
- **Nessuna nuova export nelle opzioni.** `export-types.ts` esporta solo `hslToRgbFloat` (utilità).
- **Nessuna modifica ai bundle.**
- **Nessuna costante inventata.** `hdrAnimationScale` deriva da `sdrReferenceWhiteNits / maxNits` — formule già esistenti.

## File da modificare

| File | Cambiamento |
|------|-------------|
| `engine/src/Utils/ColorUtils.ts` | `hslToRgbFloat()`, `getStyleFromHsl` HDR path, `getRandomRgbColor(hdr?)`, `updateColorValue(hdr?)`/`updateColor(hdr?)` con velocity scaled, cache precision |
| `engine/src/Core/Utils/Constants.ts` | Nessuna costante nuova necessaria (forse `hdrRgbFixedPrecision`, `hdrHslFixedPrecision` se preferiti a inline) |
| `engine/src/export-types.ts` | Esportare `hslToRgbFloat` |
| `engine/src/Core/Particle.ts` | Passa `container.hdr` a `updateColor()` |
| `updaters/paint/src/PaintUpdater.ts` | Passa `container.hdr` a `updateColor()` |
| `updaters/gradient/src/Utils.ts` | Passa `container.hdr` a `updateColor()` |

## Verifica

- [x] `pnpm exec vitest run` passa (152/152 tests)
- [x] `pnpm run build:ci` passa (build engine, updater-paint, updater-gradient)
- [x] Non-HDR produce output identico a prima (nessuna regressione)
- [x] HDR: colori intermedi visibili durante le animazioni, banding ridotto
- [x] HDR: transizioni compensano il fattore headroom (stessa velocità visiva percepita di SDR)
- [x] Zero nuove opzioni in qualsiasi file di opzioni

## Implementato in

Commits e file modificati:
- `engine/src/Utils/ColorUtils.ts` — hslToRgbFloat(), getStyleFromHsl HDR path, getRandomRgbColor(hdr?), updateColorValue(hdr?)/updateColor(hdr?) con velocity scaled, cache precision 4 decimali per HDR
- `updaters/paint/src/PaintUpdater.ts` — passa container.hdr a updateColor()
- `updaters/gradient/src/Utils.ts` — updateGradient(hdr?), passa a updateColor()
- `updaters/gradient/src/GradientUpdater.ts` — passa container.hdr a updateGradient()
