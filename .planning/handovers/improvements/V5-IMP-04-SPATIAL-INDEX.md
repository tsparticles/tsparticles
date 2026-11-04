# V5-IMP-04 — SpatialHashGrid e costo delle query

Stato: da analizzare. Priorità alta. Owner: 06; consumer verificati in 08.
Prerequisito: [IMP-01](V5-IMP-01-MEASUREMENT.md).

## Evidenze e obiettivo

La griglia analizzata usa `Map<string, Particle[]>`, chiavi derivate dalle coordinate,
clear a ogni frame e lookup `has` poi `get` in insert. Le query accettano già un array
output opzionale e usano pool di Circle/Rectangle. Conservare le ottimizzazioni già
presenti, inclusa la sicurezza delle query annidate; misurare il collo di bottiglia.

### S1 — Lookup e chiavi

Prima variante: un solo get e creazione della cella se assente. Poi confrontare
chiavi stringa attuali con mappe nidificate o encoding numerico. Per encoding
numerico definire limiti, negativi, precisione e collisioni; non usare bit packing
con overflow silenzioso. Supportare le coordinate ammesse oggi e le scene in resize.

Misurare costo di generazione chiave, lookup, inserimento, memoria e bundle. Una
mappa nidificata evita stringhe ma aggiunge oggetti/lookup; conservare la soluzione
più semplice quando il vantaggio non è dimostrato.

### S2 — Riutilizzo celle

Confrontare clear completo con riuso limitato degli array delle celle attive.
Definire lista delle celle usate nel frame e rilascio riferimenti delle particelle.
Una griglia che si espande o si sposta non deve conservare per sempre ogni cella
visitata; budget/cap o eviction devono essere espliciti e misurati.

Verificare cambio cellSize, resize, destroy e due container. Misurare sia scena
stabile sia movimento attraverso molte celle, conteggio celle e heap dopo churn.

### S3 — Output delle query

Inventariare i consumer di queryCircle/queryRectangle e verificare se sfruttano
`out`. Proporre buffer riusabili per chiamante solo quando il risultato non viene
conservato o riutilizzato da un'altra query. Esplicitare append vs reset dell'array:
non cambiare il comportamento pubblico senza migrare i consumer.

Testare query annidate da callback e plugin, output persistito, query vuote e
particelle rimosse. La riusabilità di un buffer non autorizza un buffer scratch
unico globale che viene sovrascritto durante chiamate rientranti.

### S4 — Dimensione celle e ordine risultati

Misurare celle visitate e candidati controllati su M4/M5: distribuzioni uniformi,
cluster densi, raggi piccoli/grandi e pixel ratio differenti. Valutare la politica
cellSize attuale prima di aggiungere adattività. Un tuning dinamico può costare
ricostruzioni e rendere risultati/tempi meno prevedibili.

Conservare insieme dei vicini, gestione bordi e, dove rilevante, ordine dei risultati:
collisioni/fluid con cap maxNeighbors possono cambiare esito se l'ordine cambia.
Confrontare output deterministici e comportamento visivo prima di promuovere una variante.

## Consegna

Tabella S1–S4 con profili, alternative, delta bundle/heap/query time e test sui
consumer. Includere casi negativi/lontani/bordi, query annidate, resize/cellSize e
collisioni/fluid/links. Nessun cambio predefinito di algoritmo spaziale basato su
un solo benchmark sintetico; validare anche una scena completa M3/M4/M5.
