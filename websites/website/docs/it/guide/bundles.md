# Guida ai bundle

Questa pagina ti aiuta a scegliere il bundle `tsParticles` giusto e a configurarlo velocemente.

## Confronto pacchetti

| Pacchetto                | Ideale per                                                  | Stile di setup                                 |
| ------------------------ | ----------------------------------------------------------- | ---------------------------------------------- |
| `@tsparticles/basic`     | Setup ultra leggeri                                         | `tsParticles` + `await loadBasic(tsParticles)` |
| `@tsparticles/slim`      | La maggior parte di siti/app                                | `tsParticles` + `await loadSlim(tsParticles)`  |
| `tsparticles`            | Set completo di funzionalita ufficiali con controllo engine | `tsParticles` + `await loadFull(tsParticles)`  |
| `@tsparticles/all`       | Tutte le funzionalita, prototipazione rapida                | `tsParticles` + `await loadAll(tsParticles)`   |
| `@tsparticles/confetti`  | Effetti coriandoli con una chiamata                         | `await confetti(options)`                      |
| `@tsparticles/fireworks` | Effetti fuochi d'artificio con una chiamata                 | `await fireworks(options)`                     |
| `@tsparticles/particles` | API semplice per sfondo particellare                        | `await particles(options)`                     |

## Guide per bundle

- Basic: [`/guide/bundles-basic`](/it/guide/bundles-basic)
- Slim: [`/guide/bundles-slim`](/it/guide/bundles-slim)
- tsparticles (Full): [`/guide/bundles-full`](/it/guide/bundles-full)
- All: [`/guide/bundles-all`](/it/guide/bundles-all)
- Confetti: [`/guide/bundles-confetti`](/it/guide/bundles-confetti)
- Fireworks: [`/guide/bundles-fireworks`](/it/guide/bundles-fireworks)
- Particles: [`/guide/bundles-particles`](/it/guide/bundles-particles)

## Installazione

Installa il percorso pacchetto che corrisponde al tuo caso d'uso.

```bash
pnpm add @tsparticles/engine @tsparticles/basic
pnpm add @tsparticles/engine @tsparticles/slim
pnpm add @tsparticles/engine tsparticles
pnpm add @tsparticles/engine @tsparticles/all
pnpm add @tsparticles/confetti
pnpm add @tsparticles/fireworks
pnpm add @tsparticles/particles
```

Hai bisogno di link CDN e altre varianti dei package manager?

- Vedi [`/guide/installation`](/it/guide/installation).

## Esempi di setup

### Bundle con engine + loader (`basic`, `slim`, `full`, `all`)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

await loadSlim(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    particles: {
      number: { value: 80 },
      move: { enable: true, speed: 2 },
    },
  },
});
```

Per gli altri preset, cambia solo import/funzione del loader:

- `@tsparticles/basic` -> `loadBasic`
- `tsparticles` -> `loadFull`
- `@tsparticles/all` -> `loadAll`

### API mirate (`confetti`, `fireworks`, `particles`)

```ts
import { confetti } from "@tsparticles/confetti";
import { fireworks } from "@tsparticles/fireworks";
import { particles } from "@tsparticles/particles";

await confetti({ count: 80, spread: 60 });
await fireworks({ sounds: false });
await particles({ count: 100, links: true });
```

Queste API sono ideali quando vuoi integrare in fretta senza collegare manualmente molti plugin engine.

## Regole pratiche di scelta

1. Inizia da `@tsparticles/slim` nella maggior parte dei progetti.
2. Usa `@tsparticles/basic` se la dimensione del bundle e la priorita assoluta e le funzionalita richieste sono semplici.
3. Usa `tsparticles` quando ti serve una base full con molte funzionalita e `loadFull`.
4. Usa `@tsparticles/all` per prototipazione o quando ti servono molte funzionalita subito.
5. Usa `@tsparticles/confetti`, `@tsparticles/fireworks` o `@tsparticles/particles` quando la UI richiede un effetto mirato con setup minimo.

## Pagine correlate

- Bundle mirati nel playground: [`/playground/bundles`](/it/playground/bundles)
- Percorso per iniziare: [`/guide/getting-started`](/it/guide/getting-started)
- Matrice installazione: [`/guide/installation`](/it/guide/installation)
- Panoramica wrapper: [`/guide/wrappers`](/it/guide/wrappers)
