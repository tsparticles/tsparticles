# V5-02 — Random e logger appartenenti all'engine

Stato: da eseguire. Dipendenza: 01 completato.

## Responsabilità

`Core/Engine.ts`, `Utils/{MathUtils,LogUtils,ColorUtils,Utils}.ts`, tipi/export,
PluginManager, Container/Particle/option loaders e ogni consumer workspace che
usa questi servizi direttamente o tramite helper. Test, esempi e changelog relativi.
Non riorganizzare cartelle in questa fase; non annullare modifiche altrui.

## Contratto proposto

- Metodi engine: `setRandom(rnd = Math.random)`, `getRandomFn()`, `getRandom()`,
  `setLogger(logger: Partial<ILogger>)`, `getLogger(): ILogger`.
- Default equivalenti alla v4: RNG Math.random e logger console con stessa
  gestione codici `TSP-xxxx`, livelli e wrapping. Ogni engine possiede il proprio
  oggetto logger mutabile; il logger passato dall'utente non viene modificato.
- Conservare il clamp RNG corrente `[0, 1 - Number.EPSILON]`. Documentare il
  requisito di valori finiti e non cambiare incidentalmente semantiche di range.
- Una modifica ai servizi si applica alle successive chiamate dei container
  dell'engine, anche già creati. Non catturare copie obsolete del callback RNG.
- Rimuovere i setter/getter di modulo e gli alias globali. Nessun `currentEngine`,
  variabile ambientale, fallback singleton o swap del RNG globale durante un frame.

## Lavoro

1. Inventario transitivo: RNG → range, direzioni/posizioni, scelta array, colori,
   animazioni, path, emitter, collisioni, noise; logger → fetch, immagini/audio,
   plugin e lifecycle. Cercare anche `Math.random` e `console` diretti; distinguere
   tooling e utility pure da runtime con engine proprietario.
2. Rendere disponibile il contesto ai plugin attraverso engine/container/plugin
   manager con un accesso pubblico minimo documentato. Evitare cast su campi privati.
3. Per helper con casualità passare esplicitamente un provider RNG stabile oppure
   usare servizi dell'engine; scegliere una convenzione unica e fissarla prima
   della migrazione. Helper matematici puri restano funzioni pure esportabili.
   Non passare tutto Engine a funzioni che richiedono solo un callback.
4. Migrare tutte le chiamate, incluse async continuation: gli errori dopo un fetch
   devono andare al logger dell'engine originario anche se nel frattempo lavora B.
5. Audit `_animationLoop` / `setAnimationFunctions`: è altro stato configurabile
   condiviso. Decisione preferita: spostarlo per engine conservando i default browser,
   con test di cancellazione locale. Se viene rinviato, segnalarlo esplicitamente
   come limite e motivare; non descrivere l'intero runtime come isolato.
6. Audit cache/registri mutabili dei plugin: eventuale deduplicazione deve essere
   per engine quando influenza registrazioni o valori casuali personalizzati.
   Cache di dati immutabili e cache di risorse DOM richiedono analisi distinta.
7. Migrare test che oggi chiamano setter globali o fanno reset manuali. Aggiornare
   firme pubbliche, export di `ILogger`, changelog e guida di migrazione.

## Prove di accettazione

- A e B con sequenze deterministiche diverse: alternare creazione particelle,
  colori/range, emissione e tick; ogni sequenza avanza solo per il proprio engine.
- Cambiare o resettare RNG di A non cambia B; testare la semantica dei limiti.
- Logger parziali: default degli altri livelli, nessuna mutazione di B o input;
  preservati messaggi/codici. Test su errore async e destroy durante attesa.
- Nessuna dipendenza residua dai servizi globali, inclusi browser/lazy e generatori.
- Se scheduler migrato: pause/destroy cancella solo handle dell'engine proprietario.
- Suite completa, lint/format e build di tutti i consumer coinvolti. Report bundle
  intermedio: descrivere il costo dei servizi senza nasconderlo nei passaggi dopo.

## Consegna

Mappa vecchie → nuove API, convenzione helper, esiti di test e inventario stato
condiviso residuo con motivazione. Aggiornare indice e documentazione pubblica.
