# V5-01 — Rimuovere il singleton e rendere espliciti gli engine

Stato: da eseguire. Dipendenza: leggere `README.md`; acquisire prima la baseline
bundle descritta nell'indice. **Prima modifica runtime della v5.**

## Responsabilità

`engine/src/{index.ts,index.lazy.ts,browser.ts,initEngine.ts}`, `Core/Engine.ts`,
export pubblici e manifest engine; entrypoint bundle/feature browser e lazy;
`cli/utils/{rollup-plugin,rolldown-plugin,webpack-config}/`, wrapper, demo, template,
generatori e output di codice MCP che importano l'istanza. Test relativi.
L'ownership è funzionale: scoprire gli ulteriori consumer con `rg`, senza limitarsi
alla lista. Non annullare modifiche di altri agent. Non ristrutturare ancora il core.

## Lavoro

1. Salvare baseline e matrice consumer/entrypoint; cercare `tsParticles`, `initEngine`,
   `__tsParticlesInternals` e import engine anche nei template e stringhe di codegen.
2. Esporre `createEngine(): Engine`: sempre nuova istanza, nessun lookup globale,
   nessun accesso DOM e nessun plugin caricato alla creazione. Rimuovere la factory
   interna `initEngine` se non serve più; non conservarne il comportamento singleton.
3. Rimuovere export dell'istanza, dichiarazione globale `var tsParticles: Engine`
   e riuso globale. Aggiornare commenti che descrivono Engine come singleton.
   Non rendere pubblica la classe come valore se basta la factory.
4. Adeguare `.`, `./lazy`, condizioni `browser`, import/require e dist manifest:
   moduli standard puri; bootstrap CDN esplicito con namespace factory/loader.
   Definire il nome del namespace nel report e usarlo in esempi e generatori.
   Verificare `sideEffects` contro il comportamento degli entrypoint dedicati.
5. Verificare il collegamento dei plugin CDN: il registry `__tsParticlesInternals`
   non deve trattenere un engine predefinito o servizi personalizzati condivisi.
   Separare eventuali definizioni di moduli riusabili dai registri mutabili per engine.
   Testare due bundle script e più engine nella stessa pagina senza auto-creazione.
6. Migrare wrapper/provider a engine esplicito (prop, provider o servizio DI secondo
   il framework), riusabile da più componenti per scelta dell'app. Nessuna istanza
   di modulo come sostituto del vecchio singleton. Cleanup del componente distrugge
   il suo container, senza distruggere risorse appartenenti ad altri consumer.
7. Migrare bundle convenience (`confetti`, `fireworks`, `particles`, `ribbons`, `pjs`):
   API legata a engine esplicito o factory per istanza; niente engine nascosto a
   import-time. Documentare la firma scelta e mantenere il percorso semplice.
8. Allineare CLI/create, template, MCP codegen, demo, README modificati e test.
   Non introdurre nuove dipendenze senza i comandi workspace previsti dalle skill.
9. Registrare breaking change nei changelog appropriati; non cambiare versioni
   o pubblicare pacchetti in questo passaggio.

## Audit plugin e contratto browser sin dall'inizio

Avviare gli inventari descritti in 08 e 09 prima di migrare API: passare Engine al
loader sembra già il modello comune, ma verificare anche stato di modulo,
augmentations e servizi usati nel runtime. Correggere qui le incompatibilità con
la rimozione del singleton; 08 chiude l'audit dopo i refactor del core.

Fissare qui il contratto browser minimo (namespace/factory/loader, script autonomi
vs engine esterno, versioni e ordine script). Verificare le policy IIFE e la
risoluzione degli external: eliminare soltanto l'assegnazione globale non basta.
09 rifinisce distribuzione, deduplicazione e lazy sugli artefatti definitivi.

## Prove di accettazione

- Due factory call restituiscono engine distinti con items, eventi, plugin,
  preset/config e inizializzazione indipendenti. Stesso loader su A e B funziona.
- Inizializzazioni concorrenti sullo stesso engine non duplicano i loader; loader
  concorrenti su engine diversi non si bloccano a vicenda e non condividono promesse
  o flag che saltano la registrazione sul secondo engine.
- Distruzione/refresh di A non altera B. Canvas distinti sono la prova primaria;
  per lo stesso canvas definire e testare rifiuto/ownership, senza doppio controllo.
- Import senza `window`/`document` di ESM, CJS e condizione browser non crea engine
  né scrive su globals. Verificare anche il pacchetto pubblicabile, non solo source.
- Nessun import del vecchio oggetto rimasto nei consumer attivi o nel codice
  generato. Non confondere il nome locale dell'app con un singleton esportato.
- Wrapper: due provider con engine diversi, smontaggio/rimontaggio, reload props,
  tema opzionale, SSR dove supportato. Smoke dei convenience bundle e codegen.
- Build consumer e suite passano; guida iniziale before/after allegata.

## Consegna

Aggiornare `V5-BUNDLE-REPORT.md`, matrice delle API migrate e stato in indice.
Fornire comandi/esiti e problemi riproducibili. A questo punto random/logger sono
ancora condivisi: dichiararlo fino al completamento di 02, senza rivendicare
isolamento completo. Il checkout deve compilare e i consumer devono funzionare.

## Approfondimenti di performance e dimensioni

Consultare [V5-IMP-01-MEASUREMENT](improvements/V5-IMP-01-MEASUREMENT.md), [V5-IMP-02-BUNDLE-GRAPH](improvements/V5-IMP-02-BUNDLE-GRAPH.md).
Registrare gli esiti dei candidati assegnati come richiesto dal [piano miglioramenti](V5-IMPROVEMENTS.md).
