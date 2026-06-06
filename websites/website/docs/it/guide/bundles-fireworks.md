# Bundle: Fireworks

`@tsparticles/fireworks` espone un'API semplificata per creare effetti fuochi d'artificio con una singola chiamata. Supporta suoni, colori personalizzati e controllo dell'istanza (pause/play).

## Funzionalità incluse

**Forme:** linea, cerchio (da basic)

**Plugin interni:** emettitori, emettitori-shape-square, blend (miscelazione), suoni (sounds)

**Updater:** destroy, life, paint, rotate

**API:** `fireworks(options)`, restituisce un'istanza controllabile

## Quando usarlo

- Effetto Capodanno o festa
- Celebration UI
- Non vuoi configurare l'engine manualmente

## Installazione

### Con npm/pnpm/yarn

```bash
pnpm add @tsparticles/fireworks
```

```ts
import { fireworks } from "@tsparticles/fireworks";

// Effetto base
const instance = await fireworks({
  colors: ["#ffffff", "#ff0000", "#00ff00", "#0000ff"],
  sounds: true,
});

// Controllo istanza
instance?.pause();
instance?.play();

// Su un canvas specifico
await fireworks("my-canvas", {
  rate: 3,
  speed: { min: 10, max: 25 },
  sounds: false,
});
```

### Con CDN (tag `<script>`)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/fireworks@4/tsparticles.fireworks.bundle.min.js"></script>
<script>
  // Fuochi d'artificio immediati
  fireworks();
</script>
```

### Parametri principali

| Parametro    | Tipo         | Default | Descrizione            |
| ------------ | ------------ | ------- | ---------------------- |
| `colors`     | string[]     | —       | Colori esplosione      |
| `rate`       | number       | —       | Fuochi al secondo      |
| `speed`      | { min, max } | —       | Velocità particelle    |
| `sounds`     | boolean      | true    | Abilita effetti sonori |
| `gravity`    | number       | —       | Gravità (default: 0)   |
| `opacity`    | number       | —       | Opacità (0-1)          |
| `brightness` | { min, max } | —       | Luminosità esplosione  |

## Errori comuni

- Pensare che `tsParticles` sia esportato da `@tsparticles/fireworks` — non lo è.
- Chiamare `fireworks()` in loop senza gestire l'istanza: l'effetto è già continuo, non serve un intervallo.
- Non fermare l'istanza quando l'utente cambia pagina: chiama `instance?.pause()` o `instance?.stop()`.

## Vedi anche

- [Panoramica bundle](/it/guide/bundles)
- [Bundle confetti](/it/guide/bundles-confetti)
