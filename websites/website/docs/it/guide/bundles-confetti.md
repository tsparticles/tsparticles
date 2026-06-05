# Bundle: Confetti

`@tsparticles/confetti` espone un'API semplificata per creare effetti coriandoli con una singola chiamata a funzione. Non richiede di interagire con `tsParticles` direttamente.

## Funzionalità incluse

**Forme:** cerchio, cuore, carte (semi francesi: cuori, quadri, fiori, picche), emoji, immagini, poligono, quadrato, stella

**Plugin interni:** emettitori, motion (rispetta le preferenze utente di riduzione animazioni)

**Updater:** life, roll, rotate, tilt, wobble

**API:** `confetti(options)` o `confetti(canvasId, options)`

## Quando usarlo

- Bottone "Congratulazioni!" o "Compleanno!"
- Effetto celebrazione rapido
- Non vuoi configurare l'engine manualmente

## Installazione

### Con npm/pnpm/yarn

```bash
pnpm add @tsparticles/confetti
```

```ts
import { confetti } from "@tsparticles/confetti";

// Effetto base
await confetti({
  particleCount: 100,
  spread: 70,
  origin: { x: 0.5, y: 0.5 },
});

// Su un canvas specifico
await confetti("my-canvas-id", {
  particleCount: 50,
  angle: 90,
  spread: 45,
  colors: ["#ff0000", "#00ff00", "#0000ff"],
});
```

### Con CDN (tag `<script>`)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@4/tsparticles.confetti.bundle.min.js"></script>
<script>
  confetti({
    particleCount: 100,
    spread: 70,
    colors: ["#bb0000", "#ffffff"],
  });
</script>
```

### Parametri principali

| Parametro       | Tipo     | Default      | Descrizione                                         |
| --------------- | -------- | ------------ | --------------------------------------------------- |
| `particleCount` | number   | 50           | Numero di coriandoli                                |
| `spread`        | number   | 60           | Angolo di diffusione (gradi)                        |
| `angle`         | number   | 90           | Direzione (gradi, 90 = giù)                         |
| `startVelocity` | number   | 30           | Velocità iniziale                                   |
| `colors`        | string[] | —            | Colori dei coriandoli                               |
| `origin`        | { x, y } | { 0.5, 0.5 } | Punto di origine (0-1)                              |
| `drift`         | number   | 0            | Deriva orizzontale                                  |
| `shapes`        | string[] | —            | Forme: "circle", "heart", "square", "star", "cards" |

## Errori comuni

- Pensare che `tsParticles` sia esportato da `@tsparticles/confetti` — non lo è.
- Riutilizzare lo stesso ID canvas senza volerlo.
- Chiamare `confetti` in loop senza gestire le performance: usa un intervallo ragionevole o ferma l'animazione quando non serve.

## Vedi anche

- [Panoramica bundle](/it/guide/bundles)
- [Bundle fireworks](/it/guide/bundles-fireworks)
