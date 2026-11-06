# V5-ARCH-02 — Confini e possibile divisione del pacchetto engine

Stato: da valutare. Owner: 03; consumer in 08, distribuzione in 09, gate in 10.
Dipende dalle bozze dei contratti ARCH-01/03/04 e dall'audit completo dell'engine.

## Evidenze e valutazione iniziale

`engine/src/` contiene runtime, opzioni, contratti di estensione, utility, matematica
e rendering browser. `engine/package.json` dichiara `sideEffects: false`, entry
ESM/CJS/browser e subpath `./lazy`; i bundle e i plugin consumano la root pubblica.
Alcune classi core sono esportate solo come tipi: conservarne intenzionalmente la
natura anche dopo lo split. Il nome della cartella o il numero di file non prova
che serva un nuovo pacchetto npm.

Direzione iniziale: confini interni e facciate selettive, poi confronto con subpath
e pacchetti separati. Lo split può rendere esplicite dipendenze e capacità opzionali,
ma non garantisce meno byte con tree shaking già efficace. Aumenta inoltre manifest,
release, risoluzione dei tipi e rischio di più copie del runtime.

## Alternative e candidati

Confrontare tre assetti sullo stesso consumer: pacchetto unico con domini interni,
subpath pubblici selettivi, pacchetti pubblicabili distinti. I nomi seguenti indicano
responsabilità candidate, non nuovi nomi npm già approvati.

| Candidato               | Condizione per estrarlo                                | Dipendenze da risolvere                                                                             |
| ----------------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| Matematica/utility pure | Uso indipendente dall'engine e costo incluso evitabile | Separare helper puri da RNG/log, DOM e funzioni dipendenti da Container                             |
| Contratti estensioni    | Consumer che richiedono solo tipi e API stabili        | Evitare un pacchetto “types” che reimporta engine e crea cicli; isolare eventuali valori runtime    |
| Normalizzazione options | Pipeline utilizzabile senza container/renderer         | Oggi Options/ParticlesOptions e loader ricevono PluginManager/Container; prima sciogliere il legame |
| Runtime simulazione     | Caso d'uso reale indipendente dal renderer             | Particle e lifecycle oggi chiamano drawer/render; verificare ARCH-01/04                             |
| Renderer/browser        | Capacità che un consumer può omettere o sostituire     | Canvas, Retina, resize, eventi, risorse e tipi DOM oggi attraversano più domini                     |

Una libreria di sole interfacce può non ridurre il JavaScript: misurare anche
benefici e costo sulle dichiarazioni e sulla manutenzione. Non chiamare “headless”
un runtime che conserva dipendenze browser obbligatorie.

## Grafo proposto da verificare

Direzione desiderata delle dipendenze: utility pure e contratti indipendenti alla
base; normalizzazione e simulazione sopra; adattatore browser/rendering dipendente
dal runtime; eventuale facciata `@tsparticles/engine` come composizione pubblica.
I contratti di base non devono dipendere dalla facciata che li riesporta. Valutare
port/interfacce minime per le risorse browser solo dove servono a consumer concreti.
Se il grafo non si separa senza astrazioni più costose del beneficio, mantenere il
dominio interno e documentare il vincolo.

## Piano di valutazione e migrazione

1. Dal grafo di 03 classificare import runtime/type-only e componenti cicliche;
   annotare consumer, costi trattenuti e dipendenze DOM o servizi per candidato.
2. Confrontare assetti su helper isolato, factory, scena minima, slim/full e lazy/CDN
   usando [IMP-02](../improvements/V5-IMP-02-BUNDLE-GRAPH.md). Registrare min/gzip/
   Brotli, chunk totali, copie runtime, costo richieste e complessità di installazione.
3. Per ogni estrazione scegliere fra modulo interno, subpath e pacchetto; richiedere
   un consumer reale, grafo senza cicli e vantaggio dimostrato in inclusione,
   separazione di runtime o manutenzione. Specificare costi e API da migrare.
4. Solo se adottata, creare/linkare la nuova struttura con le skill Nx e
   link-workspace-packages; non risolvere i collegamenti con alias tsconfig.
   Definire dependencies/peerDependencies in base all'ownership del runtime,
   versionamento, exports e manifest distribuiti, inclusi `bundles/*/package.dist.json`.
5. Valutare una facciata di compatibilità selettiva: nessun singleton reintrodotto,
   nessun caricamento di tutte le capacità per riesportarle e nessun duplicato dei
   servizi per engine. Documentare rimozioni e durata degli eventuali re-export.

## Accettazione e consegna

- Matrice dei candidati con decisione anche quando si mantiene un solo pacchetto;
  grafo runtime senza cicli nuovi, confini verificati e nessun deep import necessario.
- Se cambia il packaging, testare pacchetti preparati fuori dal workspace: ESM,
  CJS, browser e lazy, dichiarazioni/type augmentation e consumer plugin custom.
- Due engine e composizione di più bundle condividono soltanto risorse previste;
  niente copie accidentali di engine, registri o servizi. Testare anche dipendenze
  con versioni incompatibili e riportare il vincolo di versione scelto.
- Build downstream e budget v5 soddisfatti. Distinguere miglioramento dei confini
  da riduzione effettiva del payload; contare tutti i chunk necessari.

Consegna: decisione ARCH-02, grafo e misure confrontabili, elenco pacchetti/subpath
approvati e guida di import/migrazione. Non rendere lo split un requisito a priori.
