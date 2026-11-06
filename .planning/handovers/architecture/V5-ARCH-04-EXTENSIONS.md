# V5-ARCH-04 — Architettura comune per le estensioni

Stato: da valutare. Owner: 03 per contratto, 08 per audit/migrazione;
integrazione in 04–07 e verifica bundle/browser in 09.
Definire il contratto prima dei refactor dei lifecycle; 08 ne chiude la verifica.

## Evidenze e problema

`PluginManager` centralizza già plugin, initializer shape/effect/updater, preset,
palette, easing e color manager. `GenericInitializer<T>` fornisce già una factory
async per Container a shape/effect/updater. Non serve aggiungere un secondo
registro che duplichi queste responsabilità.

I contratti sono però diversi: `IPlugin` seleziona e crea un `IContainerPlugin`
e carica options; `IParticleUpdater` ha init/update/reset e hook di disegno;
`IShapeDrawer` ha draw/loadShape/particleDestroy; `IEffectDrawer` usa drawBefore/
drawAfter e non espone lo stesso insieme di hook. Modifier, interazioni e path
hanno altre semantiche; preset e palette sono soprattutto contributi di dati.
Unificare i nomi non garantisce equivalenza di lifecycle o ordine.

## Alternative e direzione iniziale

| Modello                                               | Beneficio                                       | Rischio                                                                     |
| ----------------------------------------------------- | ----------------------------------------------- | --------------------------------------------------------------------------- |
| Registri attuali con utility comuni                   | Migrazione minima e pipeline già specializzate  | Differenze di policy e lifecycle rimangono da documentare                   |
| Descrittore comune con capacità tipizzate             | Policy coerenti, composizione e scope espliciti | Va progettato senza duplicare registri o caricare capacità inutili          |
| Unica interfaccia/classe con tutti gli hook opzionali | Un solo tipo nominale                           | Combinazioni invalide, perdita di tipi, branch e dispatch superflui         |
| ECS/general scheduler per tutte le estensioni         | Possibili sistemi batch                         | Riscrittura ampia, ordine e stato plugin da migrare; non richiesta dalla v5 |

Direzione iniziale: valutare un descrittore di registrazione comune e capacità
specializzate. Un'estensione può contribuire a più capacità; non deve implementare
hook vuoti per sembrare un updater o una shape. Distinguere il termine generale
“estensione” dall'attuale contratto specifico `IPlugin`.

## Contratto comune da progettare

- Identità: id stabile dell'estensione e chiavi delle singole capacità. Definire
  namespace, alias e conflitti senza confondere un nome shape con un id plugin.
- Composizione: factory/registrazione per engine, eventuali requisiti e contributi
  di options, factory di istanze per container e capacità runtime tipizzate.
  Il descrittore non deve importare tutte le implementazioni opzionali.
- Scope: definizioni immutabili condivisibili; registrazione e servizi per engine;
  istanze e risorse per container; stato per particella e reset espliciti.
- Policy: duplicati, idempotenza, concorrenza, retry dopo errore e comportamento
  prima/dopo init. Il manager attuale rifiuta diverse aggiunte dopo init: conservare
  o migrare intenzionalmente il vincolo; non introdurre hot unload come requisito.
- Lifecycle: init async, attivazione, refresh/reset e dispose con ownership delle
  risorse; cleanup anche dopo init parziale. Non equiparare reset al destroy.
- Ordine: fasi nominate e ordine stabile all'interno di ciascuna. Valutare priorità
  e dipendenze solo dove servono; se introdotte, diagnosticare cicli e requisiti
  mancanti all'init. Non cambiare implicitamente l'ordine oggi dato dai loader.

La proposta di API va resa concreta in 03 con un prototipo tipizzato: un updater,
una shape, un effetto e un'estensione che contribuisce options e più capacità.
Confrontarla con l'API attuale anche dal punto di vista di un autore di plugin.
Evitare un dizionario `unknown` in cui ogni consumer deve ricostruire i tipi.

## Capacità specializzate e percorsi caldi

Produrre una matrice per Plugin/Updater/Shape/Effect/Interactor/Path/Modifier e
contributi preset/palette/easing/color manager: registrazione, attivazione, init,
options, hook per particella/frame, risorse e teardown. Verificare anche move e
interactivity, che estendono le API tramite plugin, senza saltarli nell'audit.

Definire mapping espliciti, inclusi gli hook che non hanno un equivalente e i
tempi differenti di init. La somiglianza fra draw e drawBefore/drawAfter non ne
autorizza la fusione; conservare layer, stato canvas e hook di bounds/HDR.
Collegare i contributi options ad ARCH-03 e gli eventuali codec di stato ad ARCH-01.
Codec/snapshot restano opt-in rispetto al contratto di serializzazione scelto.

Il registro comune opera nel caricamento e nell'init. Durante il frame mantenere
o costruire liste tipizzate per capacità/fase e istanze riusabili: niente scansione
di tutte le estensioni, type switch universale, lookup di stringhe o nuove
allocazioni per ogni hook/particella se evitabili. Registrare quanto costa la
compilazione delle pipeline e quando devono essere ricostruite.

## Piano di migrazione e accettazione

1. Completare la matrice con consumer reali e test caratterizzanti dell'ordine.
   Confrontare utility comuni e descrittore senza cambiare subito tutte le famiglie.
2. Selezionare il modello in 03; migrare i lifecycle rilevanti in 04–07. Valutare
   adapter selettivi per i loader esistenti, senza supporto doppio permanente che
   registri o esegua due volte gli hook. Breaking change e API sostitutive esplicite.
3. In 08 aggiornare la matrice pacchetto per pacchetto: nessuna famiglia esclusa,
   custom extension esterna compilabile e stessa estensione su due engine con
   servizi distinti, ordine di caricamento invertito e caricamenti concorrenti.
4. Testare conflitti/alias, duplicati, errori async, cleanup parziale, refresh,
   riuso pool, destroy una volta e risorse condivise ancora in uso. Se supportati,
   testare dipendenze mancanti/cicliche e codec assenti o incompatibili.
5. Confrontare init e frame su scena minima, molte estensioni registrate ma poche
   attive e slim/full. Misurare allocazioni e payload con capacità non importate:
   il registro comune non deve trattenere tutto l'ecosistema nel bundle minimo.

Consegna: decisione ARCH-04, matrice di equivalenza dei lifecycle, API/prototipo,
misure e migrazione per famiglia. Un'architettura comune è utile se rende coerenti
composizione e policy preservando le differenze necessarie nel runtime.
