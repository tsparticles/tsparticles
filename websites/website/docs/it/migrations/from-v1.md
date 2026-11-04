# Migra da v1.x

Per passare da `v1.x` alla versione attuale servono di solito un aggiornamento completo delle dipendenze e una verifica della configurazione.

I blocchi pratici più comuni sono:

1. Vecchi pacchetti e pattern di import.
2. La forma della chiamata `tsParticles.load(...)`.
3. Le chiavi opzione aggiornate negli schemi moderni.

## Migrazione dell'API load

La `load` moderna accetta un unico oggetto di parametri.

Prima (stile posizionale legacy):

```ts
await tsParticles.load("tsparticles", oldOptions);
```

Dopo:

```ts
await tsParticles.load({
  id: "tsparticles",
  options: oldOptions,
});
```

Se carichi da JSON:

```ts
await tsParticles.load({
  id: "tsparticles",
  url: "/particles.json",
});
```

## Migrazione delle opzioni principali

Inizia cercando queste chiavi nelle configurazioni:

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

Esempio di riscrittura:

```ts
// prima
particles: {
  color: { value: ["#ff6b6b", "#4ecdc4"] },
  stroke: { width: 0 }
}

// dopo
particles: {
  paint: {
    fill: { color: { value: ["#ff6b6b", "#4ecdc4"] } },
    stroke: { width: 0 }
  }
}
```

## Passaggi consigliati

1. Sostituisci i vecchi nomi dei pacchetti con i pacchetti `@tsparticles/*` attuali.
2. Parti da `@tsparticles/engine` + `@tsparticles/slim`, poi aggiungi i plugin necessari.
3. Converti le vecchie chiamate `load` nella firma basata su oggetto `load({ ... })`.
4. Verifica le chiavi opzione con la documentazione attuale e correggi i campi rinominati o rimossi.
5. Esegui controlli visivi e di performance su desktop e mobile.

## Checklist

- Rimuovi gli import obsoleti della vecchia struttura dei pacchetti.
- Verifica che interazioni, link e forme personalizzate funzionino ancora come previsto.
- Per le configurazioni in stile `particles.js`, valuta il livello di compatibilità.

## Documentazione opzioni utile

- Matrice rename opzioni: [`/migrations/option-rename-matrix`](/it/migrations/option-rename-matrix)
- `particles.paint`: [`/options/particles-paint`](/it/options/particles-paint)
- Nota di migrazione `particles.color`: [`/options/particles-color`](/it/options/particles-color)
- Nota di migrazione `particles.stroke`: [`/options/particles-stroke`](/it/options/particles-stroke)

## Riferimenti

- Compatibilità legacy e bridge particles.js: [`/migrations/particles-js`](/it/migrations/particles-js)
- Matrice di installazione: [`/guide/installation`](/it/guide/installation)
- Release del repository: <https://github.com/tsparticles/tsparticles/releases>
