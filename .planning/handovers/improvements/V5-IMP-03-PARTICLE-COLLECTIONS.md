# V5-IMP-03 — Gruppi, rimozioni differite, pool e ordinamento

Stato: da analizzare. Priorità alta. Owner: 06; contratti Particle in 07 e plugin in 08.
Prerequisiti: [IMP-01](V5-IMP-01-MEASUREMENT.md), stato e lifecycle stabilizzati.

## Evidenze iniziali

ParticlesManager usa `filter(...).length` nei conteggi di density e limiti gruppo,
un Set creato nella prima fase update per accumulare rimozioni e un ordinamento
per id nei bucket in alcuni casi di inserimento. Profilare questi percorsi nel
codice risultante dagli handover precedenti prima di modificarli.

### P1 — Conteggi gruppi

Su M6 distinguere costo add/remove e density da costo per frame. Confrontare:
conteggio senza array intermedio; conteggi per gruppo mantenuti incrementalmente;
conteggio aggregato una volta per operazione massiva. L'array filtrato è evitabile
quando serve solo la lunghezza, ma una mappa introduce memoria e invalidazione.

Per contatori incrementali definire un unico punto di aggiornamento per add/remove,
init/redraw/clear/destroy, riuso pool e rifiuto di inserimento. Verificare se `group`
è modificabile dai plugin: supportare la mutazione o cambiare/documentare il
contratto prima di affidarsi a contatori potenzialmente stale.

Accettazione: gruppi e limite globale interagiscono correttamente, modalità wait e
delete preservate, nessun conteggio negativo o doppio decremento, throughput di
churn migliorato oltre il rumore. Non aggiungere cache su tutti i frame se aiuta
solo un setup raro senza beneficio apprezzabile.

### P2 — Rimozioni differite

Confrontare Set per frame, Set riusabile e lista riusabile con deduplicazione.
Definire il momento esatto in cui si rimuove una particella dalle collection,
dalla griglia e dai bucket, prima di cambiare il contenitore. Conservare le due
fasi update e l'ordine degli hook che ne dipendono.

Gestire early return/eccezioni, callback che distruggono o creano particelle e
riuso dalla pool. Un flag o generation stamp aggiunge stato per particella: misurare
memoria e byte, non solo GC. Buffer riusabili devono rilasciare riferimenti al termine
anche in caso di errore; nessun buffer globale tra container/engine.

Accettazione: nessuna rimozione doppia, particella saltata o callback di destroy
aggiuntiva; allocazioni/frame ridotte senza aumentare retention o tempo update.

### P3 — Bucket e z-order

Su M7 misurare frequenza reale del sort, bucket molto sbilanciati, id riusati e
particelle che cambiano profondità. Confrontare inserimento ordinato, sort differito
di soli bucket sporchi e gestione attuale. Il sort differito deve avvenire prima
che un consumer osservi l'ordine, non soltanto prima del draw se altre API lo usano.

Preservare stabilità a parità di profondità e semantica attuale per id. Non
sostituire gli array con linked list/strutture complesse senza misurare scansione,
rimozione, memoria e costi dei consumer. Lasciare il percorso attuale se il sort è raro.

### P4 — Pool e retention

Misurare heap dopo picchi e dopo più cicli M6/M9. Verificare quali oggetti vengono
riusati e quali stato/plugin/asset rimangono referenziati. Valutare un limite o una
politica di riduzione del pool solo se i picchi trattengono memoria significativa.
Misurare il costo di nuove allocazioni quando la scena torna al picco.

## Verifica e consegna

Regression su count/gruppi/density/limiti, reset, lifecycle, ordine hook e consumer
emitter/absorber/collisioni; benchmark identico di M3, M6, M7, M9. Allegare contatori
operazioni, allocazioni, heap, tempi e delta bundle. Documentare alternative scartate
con dati. L'handover 06 chiude P1–P4 e passa gli invarianti necessari a 07/08.
