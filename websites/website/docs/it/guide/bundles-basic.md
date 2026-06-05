# Bundle: Basic

`@tsparticles/basic` è il bundle più leggero. Include solo l'essenziale: cerchi che si muovono con opacità e dimensione animabili.

## Funzionalità incluse

**Forme:** cerchio

**Updater (animazioni):**
- paint (colore)
- opacity (opacità)
- out-modes (comportamento all'uscita dallo schermo)
- size (dimensione)

**Plugin:**
- move (movimento)
- blend (miscelazione colore)
- Colori HEX, HSL, RGB

**Non include:**
- Interazioni mouse/touch (click, hover, ecc.)
- Collegamenti tra particelle (links)
- Altre forme (quadrati, stelle, immagini, poligoni, ecc.)
- Emettitori, assorbitori, suoni
- Rotazione, vita, rollio, tilt, wobble

## Quando usarlo

- La dimensione del bundle è la priorità assoluta
- Servono solo pallini che si muovono
- Non servono interazioni o forme complesse

## Installazione

### Con npm/pnpm/yarn

```bash
pnpm add @tsparticles/engine @tsparticles/basic
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadBasic } from "@tsparticles/basic";

await loadBasic(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    background: { color: "#ffffff" },
    particles: {
      number: { value: 50 },
      color: { value: ["#5bc0eb", "#fde74c", "#9bc53d"] },
      size: {
        value: { min: 300, max: 400 },
        animation: { enable: true, speed: 100 },
      },
      move: { enable: true, speed: 10 },
    },
  },
});
```

### Con CDN (tag `<script>`)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/basic@4/tsparticles.basic.bundle.min.js"></script>
<script>
  (async () => {
    await loadBasic(tsParticles);
    await tsParticles.load({
      id: "tsparticles",
      options: {
        particles: {
          number: { value: 50 },
          move: { enable: true, speed: 1.5 },
        },
      },
    });
  })();
</script>
```

## Errori comuni

- Aspettarsi funzionalità che non sono incluse (es. `links`, interazioni mouse), che richiedono bundle superiori.
- Chiamare `tsParticles.load()` prima di `loadBasic(tsParticles)`: le forme e gli updater non sono ancora registrati.
- Installare solo `@tsparticles/engine` senza un bundle: l'engine da solo non disegna nulla.

## Vedi anche

- [Panoramica bundle](/it/guide/bundles)
- [Guida all'installazione](/it/guide/installation)
