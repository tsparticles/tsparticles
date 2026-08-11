# Bundle: tsparticles (Full)

`tsparticles` (npm: `tsparticles`, loader: `loadFull`) è il bundle ufficiale completo. Include tutte le funzionalità del bundle Slim più emettitori, assorbitori, forme di testo, animazioni avanzate (wobble, roll, tilt, twinkle, destroy).

## Funzionalità incluse

Eredita tutto da `@tsparticles/slim` più:

**Forme aggiuntive:** text (testo con font personalizzati)

**Interazioni esterne aggiuntive:**

- drag (trascinamento particelle con mouse)
- trail (scia dietro il mouse)

**Updater aggiuntivi:**

- destroy (distruzione particelle con animazione)
- roll (rotolamento)
- tilt (inclinazione 3D)
- twinkle (scintillio intermittente)
- wobble (oscillazione)

**Plugin:**

- absorbers (assorbitori — buchi neri che risucchiano particelle)
- emitters (emettitori — fonti continue di particelle)
- emitters-shape-circle, emitters-shape-square (forme per emettitori)

## Quando usarlo

- Servono emettitori (particelle che spuntano continuamente)
- Servono assorbitori (particelle che vengono risucchiate)
- Servono forme di testo con font personalizzati
- Servono animazioni avanzate (wobble, tilt, roll, twinkle)
- Buon punto di arrivo prima di passare a plugin individuali

## Installazione

### Con npm/pnpm/yarn

```bash
pnpm add @tsparticles/engine tsparticles
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

await loadFull(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    background: { color: "#000" },
    particles: {
      number: { value: 50 },
      shape: { type: "text", options: { text: ["🔥", "✨", "⭐"] } },
      size: { value: 24 },
      move: { enable: true, speed: 1 },
      wobble: { enable: true, distance: 10 },
    },
    emitters: {
      direction: "top",
      rate: { quantity: 2, delay: 0.3 },
    },
  },
});
```

### Con CDN (tag `<script>`)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles@4/tsparticles.bundle.min.js"></script>
<script>
  (async () => {
    await loadFull(tsParticles);

    await tsParticles.load({
      id: "tsparticles",
      options: {
        particles: {
          number: { value: 80 },
          move: { enable: true, speed: 2 },
        },
        absorbers: [{ color: "#ff0000", size: { value: 50 } }],
      },
    });
  })();
</script>
```

## Differenza tra `tsparticles` e `@tsparticles/all`

| Aspetto      | `tsparticles` (full)                                    | `@tsparticles/all`                                                                    |
| ------------ | ------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Dimensione   | Contenuta                                               | Molto grande                                                                          |
| Forme        | circle, square, star, polygon, line, image, emoji, text | Tutte le forme (cuore, carte, frecce, spirali, cog, rounded-rect, ecc.)               |
| Interazioni  | Slim + drag + trail                                     | Tutte (cannon, light, pop, particle, repulse)                                         |
| Path         | Solo easing quad                                        | 14 generatori di path                                                                 |
| Effetti      | Nessuno                                                 | 5 effetti (bubble, filter, shadow, ecc.)                                              |
| Esportazioni | Nessuna                                                 | Image, JSON, Video                                                                    |
| Plugin extra | absorbers, emitters                                     | Tutti (sounds, themes, trail, zoom, polygon-mask, canvas-mask, background-mask, ecc.) |
| Easing       | Quad                                                    | 15 easing                                                                             |

## Errori comuni

- Confondere `tsparticles` con `@tsparticles/all` — non sono lo stesso pacchetto.
- Chiamare `tsParticles.load()` prima di `loadFull(tsParticles)`.
- Il package npm è `tsparticles` (non `@tsparticles/full`), il loader è `loadFull`.

## Vedi anche

- [Panoramica bundle](/it/guide/bundles)
- [Guida all'installazione](/it/guide/installation)
