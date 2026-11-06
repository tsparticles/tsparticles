# V5-ARCH-01 — Particle: stato, comportamento e serializzabilità

Stato: da valutare. Owner: 07 con 06; contratti pubblici in 03, consumer in 08.
Definire il contratto in 03 e concordarlo prima delle modifiche di 06.

## Evidenze e problema

`engine/src/Core/Particle.ts` contiene dati pubblici, vettori con comportamento,
`ParticlesOptions`, riferimenti privati a Container/PluginManager, modifier e cache.
`init()` coordina Retina, updater, drawer e plugin; `destroy()` emette hook ed eventi;
`draw()` usa il renderer del container. Esistono già helper esterni per options e init:
non partire dall'ipotesi che tutta la logica sia ancora un metodo della classe.
`getPosition()` riusa già una cache privata: rispettarne la semantica di aliasing.

La classe è una facciata runtime legittima, ma oggi non definisce un formato di
stato persistibile e indipendente dai servizi. Togliere i metodi non basta a
ottenerlo: anche oggetti raggiungibili, risorse e stato delle estensioni vanno trattati.
I metodi sul prototipo non sono una closure allocata per ogni particella; spostarli
in funzioni non dimostra, da solo, un risparmio di memoria.

## Alternative

| Alternativa                                                     | Beneficio atteso                                           | Costo e limite                                                                      |
| --------------------------------------------------------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Classe attuale, helper interni coesi                            | Migrazione minima e API plugin stabile                     | Stato e dipendenze runtime restano accoppiati                                       |
| Classe/facciata runtime con snapshot esplicito                  | Export e test su dati controllati, senza riscrivere i loop | Serve una selezione/versione del formato e una procedura di ripristino              |
| Stato plain + funzioni/sistemi, eventuale facciata per i plugin | Separazione più netta, possibile riuso in altri runtime    | Migrazione campi/metodi, vettori, extension state e pooling; rischio di indirezioni |
| Array tipizzati/SoA e handle                                    | Possibile riduzione memoria e trasferimenti batch          | Massimo impatto sull'ecosistema; esperimento distinto, non prerequisito v5          |

Direzione iniziale: mantenere una facciata runtime piccola e valutare uno snapshot
esplicito; estrarre comportamento quando migliora dipendenze o testabilità. Passare
a stato plain solo se un caso d'uso e i profili ne giustificano il costo. Una
facciata con un nuovo oggetto annidato per particella può anche aumentare la memoria.

## Divisione delle responsabilità

- Particle/state: identità e dati della singola particella; accesso minimo richiesto
  dalle estensioni. Getter derivati come funzioni pure quando gli input bastano.
- Helper di dominio: init/reset e calcoli che ricevono stato e contesto esplicito;
  nessun accesso ambientale all'engine e nessuna closure per particella.
- ParticlesManager: collection, id, pool, gruppi, indice spaziale e coordinamento
  delle fasi. Valutare metodi che orchestrano operazioni in batch; evitare di
  trasferirvi indiscriminatamente colore, bounds, options e rendering.
- Renderer/drawer: disegno e risorse grafiche; gli hook lifecycle devono conservare
  ordine, argomenti ed esecuzione una sola volta.

Produrre una matrice campo/metodo → owner, mutabilità, frequenza, consumer e
inclusione nello snapshot. Distinguere stato simulato, configurazione condivisa,
dati derivati ricostruibili, cache temporanee e risorse esterne.

## Contratto di serializzazione da definire

Scegliere il caso d'uso: ispezione/export, scambio con worker oppure salvataggio e
ripresa. JSON, structured clone e buffer trasferibili hanno contratti diversi:
indicare esplicitamente quali sono supportati. Uno snapshot di Particle non basta
per riprendere deterministicamente una scena o abilitare worker.

Per un formato proposto `ParticleSnapshot` definire versione, coordinate numeriche,
unità/Retina, identificatori di configurazione e risorse, campi inclusi/esclusi e
validazione in ingresso. Nessun Container, funzione, contesto canvas o riferimento
runtime nel payload. Le risorse si risolvono nel contesto di destinazione, senza
trasportare engine o condividere oggetti mutabili fra engine.

Le estensioni possono possedere stato non serializzabile: valutare codec opt-in
per capacità e versione coordinati con ARCH-04. Esplicitare errore, esclusione o
ricostruzione quando manca un codec; evitare perdita silenziosa di stato. Non
aggiungere un serializer generico per introspezione di qualunque campo pubblico.

Per restore definire creazione con nuovo owner, ricostruzione dei vettori e delle
cache, collisioni id, aggiornamento di collection/griglia/bucket e hook da eseguire.
Un restore non deve ripetere RNG/init e sovrascrivere lo stato ripristinato. Se si
promette replay esatto servono anche clock, stato RNG ripristinabile (una funzione
random arbitraria può non offrirlo), ordine collection e stato di container/plugin.
In assenza di questi contratti limitare la promessa a snapshot dei dati dichiarati.

## Esperimenti e accettazione

1. Confrontare classe, classe + snapshot e prototipo plain sullo stesso scenario
   [IMP-05](../improvements/V5-IMP-05-PARTICLE-STATE.md): heap/particella, init,
   churn/pool, update/draw e bundle consumer; costo snapshot separato dal frame.
2. Verificare accesso ai campi e metodi usati da move/outModes, collisioni/fluid,
   links, emitter, absorber, modifier e shape con risorse. Documentare la migrazione
   dei metodi eventualmente rimossi senza creare wrapper obbligatori inutili.
3. Se adottato, testare round-trip del payload, input/versioni non validi, assenza
   di riferimenti runtime e comportamento dichiarato per codec mancanti; verificare
   structured clone solo se è parte del contratto scelto.
4. Verificare reset e riuso fra gruppi, risorse/hook distrutti una volta e due engine
   isolati. Se supportata la ripresa, confrontare tick successivi deterministici
   su una scena e sulle estensioni esplicitamente supportate.

Consegna: matrice responsabilità, scelta motivata fra le alternative, perimetro
della serializzabilità e prove nel registro ARCH-01. La serializzazione completa
del runtime e una riscrittura ECS non sono requisiti impliciti della v5.
