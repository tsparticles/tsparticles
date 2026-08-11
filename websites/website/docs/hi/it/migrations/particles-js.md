# Migrazione e compatibilità

Se stai eseguendo la migrazione da `particles.js`, utilizza questo ordine:

1. sostituisci il vecchio script/pacchetto con `@tsparticles/engine` + bundle (`@tsparticles/slim`)
2. sposta la vecchia configurazione e mappa i campi non supportati in modo incrementale
3. testare le interazioni (passaggio del mouse/clic/link) una per una

## Note sulla migrazione canonica

- Fonte ufficiale della guida alla migrazione: [`tsparticles/markdown/pjsMigration.md`](https://github.com/tsparticles/tsparticles/blob/main/markdown/pjsMigration.md)
- Esempi di compatibilità legacy sono disponibili nelle cartelle demo.

## Pacchetto di compatibilità

Se hai bisogno di un livello bridge durante la migrazione delle configurazioni legacy:

- npm: <https://www.npmjs.com/package/@tsparticles/pjs>
- jsDelivr: <https://www.jsdelivr.com/package/npm/@tsparticles/pjs>

Ulteriori letture:

- Articolo sulla migrazione: <https://dev.to/matteobruni/migrating-from-particles-js-to-tsparticles-2a6m>
- 5 motivi per cambiare: <https://dev.to/matteobruni/5-reasons-to-use-tsparticles-and-not-particles-js-1gbe>

## Suggerimenti comuni per la mappatura

- Il vecchio `particlesJS(...)` init diventa `tsParticles.load({ id, options })`.
- Molti valori legacy hanno ancora equivalenti diretti in `particles`, `interactivity` e `detectRetina`.
- La nuova architettura basata su plug-in implica che alcune funzionalità avanzate richiedono il caricamento esplicito del pacchetto.

## Lista di controllo della migrazione per la produzione

- Verifica la parità visiva su desktop e dispositivi mobili.
- Verificare l'impatto di CPU/GPU sui dispositivi di fascia bassa.
- Verificare che nessun tasto opzione venga ignorato silenziosamente.
- Blocca le versioni esatte del pacchetto prima della settimana di rilascio.

## Migrazione da canvas-confetti a `@tsparticles/confetti`

Se stai eseguendo la migrazione da `canvas-confetti`, la soluzione più semplice è sostituire le chiamate imperative con chiamate API `@tsparticles/confetti`.

## Mappatura tipica

- `confetti({...})` -> `await confetti({...})`
- tela personalizzata -> `const local = await confetti.create(canvas, defaults)` quindi `await local({...})`
- scatti ripetuti -> mantieni i tuoi timer/loop esistenti, chiama `await confetti(...)` in quei callback

## Esempio di conversione

Prima (stile `canvas-confetti`):

```ts
import confetti from "canvas-confetti";

confetti({
  particleCount: 90,
  spread: 70,
  origin: { x: 0.5, y: 0.6 },
});
```

Dopo (`@tsparticles/confetti`):

```ts
import { confetti } from "@tsparticles/confetti";

await confetti({
  count: 90,
  spread: 70,
  position: { x: 50, y: 60 },
});
```

## Note sul nome dell'opzione

- `particleCount` -> `count`
- `origin.x`/`origin.y` in `0..1` -> `position.x`/`position.y` in `0..100`
- `startVelocity`, `spread`, `angle` e `colors` mantengono la stessa semantica

Per API e helper completi, vedi: <https://github.com/tsparticles/tsparticles/tree/main/bundles/confetti#readme>
