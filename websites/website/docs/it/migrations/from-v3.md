# Migra da v3.x

Da `v3.x`, i rischi principali in migrazione sono la **compatibilità delle opzioni** e i **cambi dei pacchetti**.

## Cambi prioritari

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

## Cambi dei pacchetti

Alcuni pacchetti di `v3.x` sono stati rinominati o ristrutturati:

| Pacchetto v3                        | Pacchetto attuale                   | Note                                                                                        |
| ----------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------- |
| `@tsparticles/move-base`            | `@tsparticles/plugin-move`          | Uniti in un singolo plugin                                                                  |
| `@tsparticles/move-parallax`        | `@tsparticles/plugin-move`          | Uniti in un singolo plugin                                                                  |
| `@tsparticles/updater-color`        | `@tsparticles/updater-paint`        | Sostituito dal sistema paint                                                                |
| `@tsparticles/updater-stroke-color` | `@tsparticles/updater-paint`        | Sostituito dal sistema paint                                                                |
| `@tsparticles/plugin-hsv-color`     | `@tsparticles/plugin-hsv-color`     | Spostato in `plugins/colors/hsv/`, stesso nome                                              |
| (non necessario in v3 - integrato)  | `@tsparticles/plugin-interactivity` | Necessario per far funzionare qualsiasi plugin di interazione (grab, bubble, repulse, ecc.) |

## Esempi mappatura opzioni

Prima (stile `v3.x`):

```ts
const options = {
  particles: {
    color: {
      value: "#ff0000",
    },
    stroke: {
      width: 2,
      color: "#000000",
    },
  },
};
```

Dopo (attuale):

```ts
const options = {
  particles: {
    paint: {
      fill: {
        value: "#ff0000",
      },
      stroke: {
        width: 2,
        color: "#000000",
      },
    },
  },
};
```

## Migrazione API load

Prima (chiamata posizionale legacy):

```ts
await tsParticles.load("tsparticles", options);
```

Dopo (parametro oggetto):

```ts
await tsParticles.load({
  id: "tsparticles",
  options,
});
```

## Passaggi consigliati

1. Allinea tutti i pacchetti `@tsparticles/*` all'ultima versione disponibile.
2. Sostituisci le chiavi opzione deprecate (`particles.color`, `particles.stroke`) con `particles.paint.*`.
3. Aggiorna i pacchetti rinominati in `package.json` (vedi tabella sopra).
4. Se usi plugin di interazione (grab, bubble, repulse, ecc.), installa `@tsparticles/plugin-interactivity` e caricalo con `await loadInteractivityPlugin(tsParticles)` prima di caricare qualsiasi plugin di interazione.
5. Verifica che plugin/shape personalizzati siano caricati prima di `tsParticles.load(...)`.
6. Ricontrolla interazioni e scene critiche per le performance.

## Funzioni di caricamento granulari

Alcuni pacchetti espongono funzioni di caricamento individuali per caricare solo ciò che serve, riducendo le dimensioni del bundle.

### Plugin

- **`@tsparticles/plugin-absorbers`**: `loadAbsorbersPluginSimple` (solo ciclo di vita e disegno degli absorber), `loadAbsorbersInteraction` (solo interazione click/hover), o `loadAbsorbersPlugin` (entrambi).
- **`@tsparticles/plugin-emitters`**: `loadEmittersPluginSimple` (solo ciclo di vita e disegno degli emettitori), `loadEmittersInteraction` (solo interazione click/hover), o `loadEmittersPlugin` (entrambi).

### Forme

- **`@tsparticles/shape-polygon`**: `loadGenericPolygonShape` (poligono) o `loadTriangleShape` (triangolo) singolarmente, o `loadPolygonShape` per entrambi.
- **`@tsparticles/shape-cards`**: `loadClubsSuitShape`, `loadDiamondsSuitShape`, `loadHeartsSuitShape`, `loadSpadesSuitShape` (semi individuali), `loadCardSuitsShape` (tutti i semi), `loadFullCardsShape` (immagini carte), o `loadCardsShape` (tutti).

Tutti gli altri pacchetti di forme (arrow, circle, cog, emoji, heart, image, infinity, line, matrix, path, rounded-polygon, rounded-rect, spiral, square, squircle, star, text) esportano direttamente una singola funzione `load*Shape`.

## Risorse

- Matrice rename: [`/migrations/option-rename-matrix`](/it/migrations/option-rename-matrix)
- `particles.paint`: [`/options/particles-paint`](/it/options/particles-paint)
