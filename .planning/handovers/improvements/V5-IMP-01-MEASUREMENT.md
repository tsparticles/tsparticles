# V5-IMP-01 — Baseline e protocollo di confronto

Stato: da eseguire. Owner: 01 per baseline; 04–09 per esperimenti; 10 per chiusura.
Questo protocollo fa parte del piano v5 e vale per tutti i documenti IMP.

## Scopo

Rendere riproducibili le decisioni: una riduzione del bundle, del tempo di frame
o delle allocazioni deve essere distinguibile dal rumore e dai cambi di toolchain.
La baseline resta quella richiesta nell'indice principale, senza una seconda
misurazione incompatibile. Raccoglierla prima di modificare il runtime.

## Scenari da preparare

| ID  | Scenario                                                 | Scopo                                             |
| --- | -------------------------------------------------------- | ------------------------------------------------- |
| M1  | Import di un helper matematico puro effettivamente usato | Individuare dipendenze runtime involontarie       |
| M2  | Creazione engine senza load                              | Separare costo della factory dal rendering        |
| M3  | Scena minima con movimento e shape base                  | Costo minimo di una scena funzionante             |
| M4  | Links e collisioni classiche a densità differenti        | Query spaziali e costo interazioni                |
| M5  | Fluid con options/seed fissi                             | Carico denso e sensibilità all'ordine delle query |
| M6  | Gruppi, emitter/absorber e cicli add/remove              | Conteggi, pool e retention dopo churn             |
| M7  | Molti z-layer e modifiche di profondità                  | Bucket, sort e ordine di disegno                  |
| M8  | HDR/background mask/layer e resize                       | Pipeline render e funzionalità opzionali          |
| M9  | Due engine contemporanei con plugin diversi              | Costi per istanza e isolamento                    |
| M10 | CDN completo e engine + feature external, incluse lazy   | Costo reale della pagina e startup                |

Per M3–M8 usare almeno tre quantità esplicite di particelle, ad esempio 100, 1000,
5000 se sostenibili sull'ambiente scelto. Non ridurre N tra prima e dopo; se uno
scenario satura il browser, registrarlo e scegliere anche un carico confrontabile.

## Procedura

1. Registrare commit, dirty diff, Node/pnpm, bundler/minificatore, browser/versione,
   sistema, macchina, viewport, devicePixelRatio, feature abilitate e formato output.
2. Riutilizzare configurazioni e sequenze RNG deterministiche. Separare timing
   della simulazione da wall-clock e non cambiare ordine delle chiamate random
   soltanto per ottenere benchmark migliori.
3. Separare cold load, caricamento asset, inizializzazione particelle, steady-state,
   resize e teardown. Eseguire warmup e più campioni; indicare durate/campioni nel
   report, usare mediana, p95 e dispersione. Alternare baseline e variante quando
   possibile, evitando confronti tra browser o macchine differenti.
4. Misurare update e draw separatamente; FPS da solo può essere limitato da vsync.
   Riportare costo totale frame, long frame e GC con overhead di profiling dichiarato.
5. Misurare heap/memoria dopo cicli ripetuti, distinguendo oggetti trattenuti dai
   pool da leak. Heap istantaneo e GC forzato non sono prove sufficienti da soli.
6. Bundle: raw/min/gzip/Brotli, entry e chunk totali della stessa scena, modulo di
   provenienza e duplicazioni. Cold cache e warm cache sono risultati distinti.
7. Salvare risultati in `../V5-BUNDLE-REPORT.md` e nel registro esperimenti; definire
   budget per scenario prima dei refactor di dimensioni, come da indice principale.

## Registro esperimenti

Per ogni IMP conservare una scheda con: ID, ipotesi, file revisionati, scenario,
variante minima, costo prima/dopo, ripetizioni, esito funzionale, costo API/plugin,
limiti della misura, decisione e link al diff. Stati ammessi: da misurare, in analisi,
implementato e verificato, scartato con evidenza, rinviato con motivazione.

L'analisi delle opportunità è parte obbligatoria della revisione. Implementare le
varianti utili sulla base dei risultati, senza chiedere approvazioni aggiuntive per
routine reversibili già nel perimetro. Cambiamenti pubblici richiedono migrazione
coerente con il contratto v5 e con i criteri dell'handover owner.

## Chiusura

Nessun numero inventato o percentuale prevista trattata come risultato. Un candidato
scartato può essere chiuso con dati; una misura assente resta aperta. Il gate 10
controlla che ogni IMP abbia esito e che i budget globali restino soddisfatti.
