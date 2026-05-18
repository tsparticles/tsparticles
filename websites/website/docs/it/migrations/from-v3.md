# Migra da v3.x

Da `v3.x`, i rischi principali in migrazione sono la **compatibilità delle opzioni** e i **cambi dei pacchetti**.

## Cambi prioritari

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

## Cambi dei pacchetti

Alcuni pacchetti di `v3.x` sono stati rinominati o ristrutturati:

| Pacchetto v3                        | Pacchetto attuale               | Note                                           |
| ----------------------------------- | ------------------------------- | ---------------------------------------------- |
| `@tsparticles/move-base`            | `@tsparticles/plugin-move`      | Uniti in un singolo plugin                     |
| `@tsparticles/move-parallax`        | `@tsparticles/plugin-move`      | Uniti in un singolo plugin                     |
| `@tsparticles/updater-color`        | `@tsparticles/updater-paint`    | Sostituito dal sistema paint                   |
| `@tsparticles/updater-stroke-color` | `@tsparticles/updater-paint`    | Sostituito dal sistema paint                   |
| `@tsparticles/plugin-hsv-color`     | `@tsparticles/plugin-hsv-color` | Spostato in `plugins/colors/hsv/`, stesso nome |

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
4. Verifica che plugin/shape personalizzati siano caricati prima di `tsParticles.load(...)`.
5. Ricontrolla interazioni e scene critiche per le performance.

## Risorse

- Matrice rename: [`/migrations/option-rename-matrix`](/it/migrations/option-rename-matrix)
- `particles.paint`: [`/options/particles-paint`](/it/options/particles-paint)
