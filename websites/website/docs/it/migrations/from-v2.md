# Migra da v2.x

Il passaggio da `v2.x` alla versione attuale ha in genere due aree di rottura principali:

1. La migrazione della firma di `tsParticles.load(...)`.
2. La migrazione delle chiavi opzione (in particolare colore e stroke).

## Migrazione dell'API load (importante)

Nelle versioni moderne `load` accetta un **unico oggetto di parametri**.

Prima (stile posizionale `v2.x`):

```ts
await tsParticles.load("tsparticles", {
  particles: {
    number: {
      value: 80,
    },
  },
});
```

Dopo (oggetto singolo):

```ts
await tsParticles.load({
  id: "tsparticles",
  options: {
    particles: {
      number: {
        value: 80,
      },
    },
  },
});
```

Puoi passare anche `element`, `url` e `index` nello stesso oggetto.

```ts
await tsParticles.load({
  element: document.getElementById("tsparticles") as HTMLElement,
  url: "/particles.json",
  index: 0,
});
```

## Migrazione delle opzioni principali

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

Prima:

```ts
particles: {
  color: { value: "#00ffcc" },
  stroke: { width: 1, color: "#003344" }
}
```

Dopo:

```ts
particles: {
  paint: {
    fill: { color: { value: "#00ffcc" } },
    stroke: { width: 1, color: "#003344" }
  }
}
```

## Passaggi consigliati

1. Aggiorna tutti i pacchetti `@tsparticles/*` insieme.
2. Controlla che le versioni dei wrapper (React/Vue/Angular/ecc.) siano sulla stessa linea major.
3. Converti tutte le vecchie chiamate `tsParticles.load(id, options)` in parametri a oggetto.
4. Migra le chiavi note (`color`, `stroke`) in `paint.fill`/`paint.stroke`.
5. Esegui un controllo di regressione visiva sulle configurazioni più complesse.

## Checklist

- Assicurati che il lockfile non contenga versioni major miste.
- Verifica che il bundle scelto (`basic`, `slim`, `all`) corrisponda ancora alle funzionalità abilitate.
- Ricontrolla gli hook del ciclo di vita della canvas (`loaded`, `particlesLoaded`, cleanup).

## Documentazione opzioni utile

- Matrice rename opzioni: [`/migrations/option-rename-matrix`](/it/migrations/option-rename-matrix)
- `particles.paint`: [`/options/particles-paint`](/it/options/particles-paint)
- Nota di migrazione `particles.color`: [`/options/particles-color`](/it/options/particles-color)
- Nota di migrazione `particles.stroke`: [`/options/particles-stroke`](/it/options/particles-stroke)

## Riferimenti

- Regola di allineamento versioni: [`/migrations/releases`](/it/migrations/releases)
- Release del repository: <https://github.com/tsparticles/tsparticles/releases>
