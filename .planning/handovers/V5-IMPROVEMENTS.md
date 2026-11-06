# V5 — Piano di miglioramento performance e bundle size

Parte integrante del piano v5. I sei documenti seguenti approfondiscono opportunità
emerse nel sorgente e specificano esperimenti, alternative, rischi e criteri di
accettazione. L'analisi è richiesta; la scelta di implementare una variante dipende
dalle misure. Nessuna riduzione è già dimostrata.

| Documento                                                                              | Responsabile                          | Risultato richiesto                                     |
| -------------------------------------------------------------------------------------- | ------------------------------------- | ------------------------------------------------------- |
| [IMP-01 — Misure e baseline](improvements/V5-IMP-01-MEASUREMENT.md)                    | 01 e 10; tutti gli owner per le prove | Scenari riproducibili e registro delle decisioni        |
| [IMP-02 — Grafo bundle e browser](improvements/V5-IMP-02-BUNDLE-GRAPH.md)              | 03/09 con 01/05/07/08                 | Import selettivi, optional feature, lazy e duplicazioni |
| [IMP-03 — Collection delle particelle](improvements/V5-IMP-03-PARTICLE-COLLECTIONS.md) | 06                                    | Conteggi gruppi, rimozioni, bucket e pool               |
| [IMP-04 — Indice spaziale](improvements/V5-IMP-04-SPATIAL-INDEX.md)                    | 06 e consumer in 08                   | Lookup/chiavi, celle, output query e cell size          |
| [IMP-05 — Stato per particella](improvements/V5-IMP-05-PARTICLE-STATE.md)              | 07 con 02/03/08                       | Options, getter/vettori, memoria e cache                |
| [IMP-06 — Rendering e lifecycle](improvements/V5-IMP-06-RENDER-LIFECYCLE.md)           | 04/05 e consumer in 08                | Hook/layer, stato canvas, resize e cleanup              |

## Esecuzione e tracciamento

Gli IMP si eseguono dentro gli [handover principali](README.md), secondo ownership
e dipendenze indicate; non aggiungono una fase di riscrittura dopo il gate finale.
Gli owner leggono i documenti assegnati prima di iniziare il proprio handover.
La numerazione IMP identifica approfondimenti tecnici, non nuovi passaggi sequenziali.

Ogni candidato B/P/S/T/R deve avere nel registro un esito: implementato e verificato,
scartato con evidenza oppure rinviato con motivazione e impatto sul budget. Il solo
rinvio non soddisfa un requisito o un budget obbligatorio del piano. Il gate 10
controlla i risultati, la copertura dell'analisi e i residui; non richiede di applicare
un'ottimizzazione che le misure hanno dimostrato inutile.

Le evidenze iniziali si riferiscono al checkout 4.5.1 analizzato. Gli agent devono
riverificarle sul codice aggiornato: una precedente fase potrebbe avere già
risolto il costo o cambiato il contratto. Non duplicare refactor né test esistenti.

## Collegamento alle scelte architetturali

Le quattro [valutazioni architetturali](V5-ARCHITECTURE.md) usano le misure IMP
per confrontare modelli alternativi. IMP-05 alimenta ARCH-01/03 (Particle e options),
IMP-02 alimenta ARCH-02 (pacchetti) e IMP-06 alimenta ARCH-04 (lifecycle delle
estensioni). I risultati architetturali confluiscono nel registro dedicato; non
aggiungere una seconda implementazione o ripetere le stesse misure per chiudere
entrambi i piani.
