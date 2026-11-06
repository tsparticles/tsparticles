# V5-IMP-05 — Costo per particella, options e cache

Stato: da analizzare. Priorità media/alta secondo i profili. Owner: 07; supporto 02/03/08.
Prerequisito: [IMP-01](V5-IMP-01-MEASUREMENT.md).

## Obiettivo e ricognizione

Particle integra options, vettori, colore, stato di animazione, modifier e hook;
Retina contribuisce a dimensioni/range. Separare costo di costruzione/riuso da
getter e calcoli eseguiti ogni frame. Non ogni campo o helper del file grande è
costoso: raccogliere conteggi di chiamate e dipendenze trattenute nel bundle.

### T1 — Options e merge

Su M6 misurare costruzione/merge per particella, precedenze tra base/gruppo/shape/
effect e override dinamici. Valutare un template normalizzato per configurazione
stabile e una copia dei soli campi mutabili, invece del merge completo ripetuto.
Prima definire ownership: niente oggetti options mutabili condivisi tra particelle.

Cache o template richiedono invalidazione su refresh/reset, temi, plugin option
loader e gruppi. Chiavi non basate su JSON.stringify nel percorso caldo; verificare
se identità/versione della configurazione sono contratti sufficienti. Non aggiungere
una cache se l'input può essere mutato senza un punto di invalidazione controllato.

### T2 — Getter, vettori e conversioni colore

Profilare chiamate ripetute a getPosition/bounds, normalizzazione/mix colore e
accesso a dimensioni. Confrontare calcolo una volta per fase con risultato scratch
per owner; aggiornamenti plugin durante frame possono invalidare dati intermedi.
Non restituire un oggetto mutabile condiviso al posto di un risultato indipendente
senza verificare tutti i consumer. Distinguere API pubblica da helper interni.

Accettazione: stessi risultati su HDR/sRGB, animazioni e modifiche plugin, meno
allocazioni/calcoli sul profilo, assenza di regressioni visive e di aliasing.

### T3 — Layout dello stato e capacità opzionali

Misurare heap per particella con M3 rispetto a M8, numero oggetti e costo init.
Valutare campi lazy per feature rare e inizializzazione coerente degli oggetti;
confrontare costo di branch e frammentazione con memoria recuperata. Evitare
un oggetto o closure aggiuntivo per ogni campo estratto in un helper.

Pooling e reset devono eliminare stato di plugin/shape precedente; optional state
non può restare attivo dopo riuso. Array tipizzati o una riscrittura data-oriented
sono un esperimento separato ad alto impatto sui plugin: giustificarli con profili,
prototipo limitato e migrazione, prima di farne un requisito architetturale v5.

### T4 — Cache colore e risorse

La styleCache osservata è già limitata a 2000: non proporre di “aggiungere un
limite” come se mancasse. Misurare hit/miss, cardinalità e churn nelle animazioni
HDR. Verificare se il caching costa più della conversione nei casi poco riusabili.
Non quantizzare ulteriormente colore o coordinate per ridurre chiavi senza
preservare precisione e risultati visivi.

Distinguere dati immutabili condivisibili da risultati che dipendono da engine,
RNG/logger e plugin. Scope/eviction/cleanup delle nuove cache devono essere espliciti.

## Consegna

Misure per particella e per fase, template/cache introdotti con invalidazione,
consumer delle API coinvolte e delta bundle. Test di reset/pool, override, modifier,
Retina, HDR e due engine. Chiudere T1–T4 in 07 e verificare le estensioni in 08.

## Contratti architetturali collegati

Le alternative di modello sono definite in
[ARCH-01 — Particle](../architecture/V5-ARCH-01-PARTICLE-MODEL.md) e
[ARCH-03 — Options](../architecture/V5-ARCH-03-OPTIONS.md). Usare T1–T3 come evidenza
per confrontare classe, snapshot e stato plain, pipeline di normalizzazione e
template risolti. Serializzabilità e immutabilità richiedono contratti espliciti;
non sono conseguenze automatiche dell'estrazione di helper o del riuso di options.
