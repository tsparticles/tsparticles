# Versioning & Migration

Usa questa sezione per navigare tra le versioni principali di `tsParticles`, seguire le release e capire il versioning.

## Guide alla migrazione

- [`Migra da v3.x`](/it/migrations/from-v3)
- [`Migra da v2.x`](/it/migrations/from-v2)
- [`Migra da v1.x`](/it/migrations/from-v1)

## Percorso rapido

- Da `v3.x`: inizia da [`/it/migrations/from-v3`](/it/migrations/from-v3) (focus: chiavi opzione + cambi pacchetti).
- Da `v2.x`: inizia da [`/it/migrations/from-v2`](/it/migrations/from-v2) (focus: API `load(...)` + opzioni).
- Da `v1.x`: inizia da [`/it/migrations/from-v1`](/it/migrations/from-v1) (focus: pacchetti, loader, opzioni).

## Dove di solito si rompe la migrazione

Le migrazioni tra major version si rompono in due punti:

1. **Forma dell'API Load** (vecchi parametri posizionali vs nuovo parametro oggetto).
2. **Schema delle opzioni** (chiavi rinominate/spostate).

Se l'app compila ma il rendering è errato, inizia dalle opzioni.

## Ricerca rapida

- [Matrice rename opzioni](/it/migrations/option-rename-matrix) — mapping tra chiavi legacy e attuali.

## Utile anche

- [Changelog](/it/migrations/changelog) — ultime note di release.
- [Release e Versioning](/it/migrations/releases) — regole di allineamento versioni e checklist di rilascio.
- [Migrazione da particles.js](/it/migrations/particles-js) — migrare da `particles.js` o `canvas-confetti`.
