# Bundle: Slim

`@tsparticles/slim` è il bundle consigliato per la maggior parte dei progetti. Include tutto il necessario per creare animazioni di particelle moderne con interazioni mouse, forme multiple e collegamenti.

## Funzionalità incluse

Eredita tutto da `@tsparticles/basic` più:

**Forme:** cerchio, quadrato, stella, poligono, linea, immagine, emoji

**Interazioni esterne (mouse/touch):**
- attract
- bounce
- bubble
- connect
- destroy
- grab
- parallax
- pause
- push
- remove
- repulse
- slow

**Interazioni tra particelle:**
- attract
- collisions (collisioni)
- links (collegamenti tra particelle)

**Updater aggiuntivi:**
- life (vita/ciclo)
- rotate (rotazione)

**Plugin:**
- interactivity (plugin per abilitare le interazioni)
- easing-quad (easing quadratico per animazioni)
- Colori HEX, HSL, RGB

## Quando usarlo

- Punto di partenza consigliato per la maggior parte dei progetti
- Servono forme multiple (cerchi, stelle, poligoni, immagini)
- Servono interazioni mouse (click, hover, bubble, repulse)
- Servono collegamenti tra particelle (links)
- Buon equilibrio tra dimensione del bundle e funzionalità

## Installazione

### Con npm/pnpm/yarn

```bash
pnpm add @tsparticles/engine @tsparticles/slim
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

await loadSlim(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    background: { color: "#0b1020" },
    particles: {
      number: { value: 80 },
      links: { enable: true, distance: 150 },
      move: { enable: true, speed: 2 },
      shape: { type: ["circle", "star", "square"] },
    },
  },
});
```

### Con CDN (tag `<script>`)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
<script>
  (async () => {
    await loadSlim(tsParticles);

    await tsParticles.load({
      id: "tsparticles",
      options: {
        particles: {
          number: { value: 80 },
          links: { enable: true },
          move: { enable: true, speed: 2 },
        },
      },
    });
  })();
</script>
```

## Errori comuni

- Chiamare `tsParticles.load()` prima di `loadSlim(tsParticles)`.
- Mescolare versioni diverse tra engine e bundle — mantienili allineati.
- Aspettarsi funzionalità che sono solo in bundle superiori (emettitori, assorbitori, testo, wobble): servono `tsparticles` (full) o plugin individuali.

## Vedi anche

- [Panoramica bundle](/it/guide/bundles)
- [Guida all'installazione](/it/guide/installation)
