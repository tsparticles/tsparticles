# Bundle: Particles

`@tsparticles/particles` espone un'API semplificata per creare sfondi particellari interattivi. È un'alternativa più ricca a `@tsparticles/basic` ma con API dedicata invece di configurare l'engine manualmente.

## Funzionalità incluse

**Forme:** cerchio (da basic)

**Plugin interni:** interactivity (collegamenti, collisioni)

**Interazioni:** links (collegamenti tra particelle), collisions (collisioni)

**API:** `particles(options)` o `particles(canvasId, options)`

## Quando usarlo

- Sfondo particellare per un sito web
- Sfondo con collegamenti tra particelle (stile "nodi")
- Non vuoi configurare l'engine manualmente

## Installazione

### Con npm/pnpm/yarn

```bash
pnpm add @tsparticles/particles
```

```ts
import { particles } from "@tsparticles/particles";

// Sfondo con collegamenti
await particles({
  count: 120,
  links: true,
  color: "#ffffff",
  linksColor: "#00d8ff",
  radius: 3,
  speed: 2,
  opacity: 0.8,
});

// Su un canvas specifico
await particles("my-canvas", {
  count: 80,
  shape: ["circle", "square"],
  links: true,
});

// Con colori personalizzati
await particles({
  count: 100,
  color: ["#ff6b6b", "#4ecdc4", "#45b7d1"],
  links: false,
});
```

### Con CDN (tag `<script>`)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/particles@4/tsparticles.particles.bundle.min.js"></script>
<script>
  particles({
    radius: 3,
    speed: 2,
    opacity: 0.8,
    links: true,
    linksWidth: 140,
    color: "#ffffff",
    linksColor: "#00d8ff",
  });
</script>
```

### Parametri principali

| Parametro | Tipo | Default | Descrizione |
|---|---|---|---|
| `count` | number | 50 | Numero particelle |
| `radius` | number | 3 | Raggio particelle |
| `speed` | number | 2 | Velocità movimento |
| `opacity` | number | 0.8 | Opacità (0-1) |
| `color` | string \| string[] | "#ffffff" | Colore/i particelle |
| `links` | boolean | false | Mostra collegamenti |
| `linksColor` | string | "#ffffff" | Colore collegamenti |
| `linksWidth` | number | 1 | Spessore collegamenti |
| `shape` | string[] | ["circle"] | Forme particelle |

## Errori comuni

- Pensare che `tsParticles` sia esportato da `@tsparticles/particles` — non lo è.
- Riutilizzare lo stesso ID canvas senza volerlo.
- Aspettarsi forme avanzate (stelle, poligoni) — il bundle particles è basato su basic e usa solo cerchi.

## Vedi anche

- [Panoramica bundle](/it/guide/bundles)
- [Guida per iniziare](/it/guide/getting-started)
