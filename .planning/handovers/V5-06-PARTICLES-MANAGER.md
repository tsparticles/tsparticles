# V5-06 — Revisione completa di ParticlesManager

Stato: da eseguire. Dipendenza: 05 completato. Revisione obbligatoria, non limitata
agli adattamenti richiesti da Container o CanvasManager.

## Responsabilità

Dominio ParticlesManager e relativa gestione collection/pool, gruppi, density,
limiti, bucket z-order, spatial index e pipeline update/draw. Includere
`Core/Utils/SpatialHashGrid.ts`, contratti dei consumer e test associati.
I percorsi originali identificano le responsabilità dopo gli spostamenti di 03.
Coordinare modifiche ai contratti Particle con 07; non annullare modifiche altrui.

## Lavoro

1. Mappare tutte le responsabilità di `ParticlesManager.ts`, i campi e gli invarianti:
   collezione attiva, pool, contatori/id, gruppi, bucket e griglia. Valutare ogni
   metodo per dipendenze obbligatorie, duplicazione, costo di allocazione e API.
2. Rivedere add/push/remove/removeAt/removeQuantity, clear/destroy/redraw, density
   e limit mode: semplificare percorsi ripetuti preservando gruppi e hook plugin.
   Distinguere inizializzazione una tantum da lavoro per frame.
3. Rivedere pool e reset: nessuno stato di gruppo, plugin o engine deve sopravvivere
   a un riuso incompatibile. Evitare pool globali e nuove retention di container.
4. Rivedere le due fasi update, rimozioni differite, ordinamento z e aggiornamento
   bucket/griglia. Documentare l'ordine osservabile di updater/interactor/plugin;
   non unificare passaggi che richiedono snapshot diversi senza test di equivalenza.
5. Valutare allocazioni temporanee, incluso il Set delle particelle da rimuovere,
   copie di array e iterazioni ripetute. Riutilizzare strutture solo con cleanup
   corretto, senza cambiare risultati quando i plugin aggiungono/rimuovono particelle.
6. Rivedere SpatialHashGrid e i suoi range/vettori: query, bordi, reset/resize e
   riferimenti restituiti ai plugin. Misurare costi e verificare consumer collisioni,
   links, absorber e interazioni esterne prima di cambiare i contratti.
7. Suddividere in helper interni coesi quando utile; ridurre inclusioni e duplicazioni
   reali. Misurare bundle e prestazioni separatamente, senza ottimizzazioni basate
   solo sulle righe o aggiunta di manager obbligatori per mascherare complessità.

## Prove di accettazione

- Add/remove e conteggi coerenti con gruppi, density, limiti e resize; assenti
  duplicati, elementi distrutti ancora nella griglia e riferimenti residui nel pool.
- Z-order stabile e bucket corretti dopo variazioni di profondità e rimozioni;
  query spaziali corrette sui bordi e dopo resize/clear/redraw.
- Hook che aggiungono/rimuovono durante update non saltano o aggiornano due volte
  particelle; stesso ordine e risultati delle scene deterministiche di baseline.
- Test di collisioni classiche/fluid, links, emitter, absorber, gruppi e interattività;
  riuso pool tra gruppi con options differenti e isolamento tra container/engine.
- Benchmark a più conteggi e densità: update, draw, allocazioni e memoria dopo
  churn ripetuto. Identico scenario e RNG seed alla baseline; riportare varianza.
- Suite completa, lint/format, build downstream e delta min/gzip/Brotli registrati.

## Consegna

Inventario metodi/invarianti revisionati, semplificazioni applicate e parti mantenute
con motivazione. Report bundle/runtime e contratti da verificare in 07/08.
Aggiornare matrice di copertura dell'intero engine e stato in indice.

## Approfondimenti di performance e dimensioni

Consultare [V5-IMP-03-PARTICLE-COLLECTIONS](improvements/V5-IMP-03-PARTICLE-COLLECTIONS.md), [V5-IMP-04-SPATIAL-INDEX](improvements/V5-IMP-04-SPATIAL-INDEX.md).
Registrare gli esiti dei candidati assegnati come richiesto dal [piano miglioramenti](V5-IMPROVEMENTS.md).
