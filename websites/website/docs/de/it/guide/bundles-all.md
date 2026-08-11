# Bundle: All

`@tsparticles/all` carica **tutto** il repository tsParticles: ogni forma, interazione, updater, effetto, percorso, easing, plugin ed esportazione. È il bundle più grande, pensato per prototipazione e demo.

## Funzionalità incluse

Eredita tutto da `tsparticles` (full) più:

**Tutte le forme:** arrow, cards, cog, heart, infinity, matrix, path, ribbon, rounded-polygon, rounded-rect, spiral, squircle

**Tutte le interazioni:** cannon, light, particle, pop, particles-repulse

**Tutti gli effetti:** bubble, filter, particles, shadow, trail

**Tutti i path generator:** branches, brownian, curl-noise, curves, fractal-noise, grid, levy, perlin-noise, polygon, random, simplex-noise, spiral, svg, zig-zag

**Tutti gli easing:** back, bounce, circ, cubic, elastic, expo, gaussian, linear, quad, quart, quint, sigmoid, sine, smoothstep

**Tutti i plugin colore:** HEX, HSL, RGB, HSV, HWB, LAB, LCH, Named, OKLAB, OKLCH

**Tutti i plugin:** absorbers, background-mask, canvas-mask, emitters (con tutte le forme), easing (tutti), export-image, export-json, export-video, infection, manual-particles, motion, poisson-disc, polygon-mask, responsive, sounds, themes, trail, zoom

**Tutti gli updater:** destroy, gradient, life, opacity, orbit, out-modes, paint, roll, rotate, size, tilt, twinkle, wobble

## Quando usarlo

- Prototipazione rapida per esplorare le possibilità
- Demo e showcase
- Ambienti di sviluppo dove la dimensione non è importante
- **Sconsigliato in produzione**: preferisci bundle più mirati

## Installazione

### Con npm/pnpm/yarn

```bash
pnpm add @tsparticles/engine @tsparticles/all
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadAll } from "@tsparticles/all";

await loadAll(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    background: { color: "#000" },
    particles: {
      number: { value: 100 },
      shape: { type: "heart" },
      move: { enable: true, speed: 2 },
    },
  },
});
```

### Con CDN (tag `<script>`)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/all@4/tsparticles.all.bundle.min.js"></script>
<script>
  (async () => {
    await loadAll(tsParticles);

    await tsParticles.load({
      id: "tsparticles",
      options: {
        particles: {
          number: { value: 100 },
          move: { enable: true, speed: 2 },
        },
      },
    });
  })();
</script>
```

## Differenza tra `tsparticles` e `@tsparticles/all`

Vedi la tabella completa sulla [pagina bundles-full](/it/guide/bundles-full) per il confronto dettagliato.

## Errori comuni

- Usarlo in produzione — preferisci `@tsparticles/slim` o `tsparticles` per bundle più piccoli.
- Chiamare `tsParticles.load()` prima di `loadAll(tsParticles)`.

## Vedi anche

- [Panoramica bundle](/it/guide/bundles)
- [Guida all'installazione](/it/guide/installation)
