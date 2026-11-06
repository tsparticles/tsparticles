# V5-ARCH-03 — Pipeline delle options e configurazione risolta

Stato: da valutare. Owner: 03 per contratto e audit, 07 per costo per particella;
integrazione refresh/lifecycle in 04, estensioni in 08. Collegato a ARCH-01/02/04.

## Evidenze e valutazione iniziale

`Options` e `ParticlesOptions` usano classi e loader; `OptionLoader.load()` delega
a `doLoad()` e `loadParticlesOptions()` crea una nuova istanza per ogni invocazione.
`Options` conserva PluginManager/Container e applica preset, palette e hook plugin.
`Particle.resolveParticleOptions()` combina dati di base, selezione shape/effect e
override. Gli updater hanno a loro volta hook `loadOptions`. Le classi option e
l'interfaccia `IOptionLoader` sono estese da pacchetti downstream.

Il limite da indagare è l'accoppiamento fra input, risoluzione e runtime, insieme
al costo dei merge ripetuti. Le classi offrono già default e caricamento tipizzato:
sostituirle tutte con oggetti plain o schema runtime non è automaticamente migliore.

## Modello proposto da confrontare

| Livello                | Responsabilità                                                   | Mutabilità e dipendenze                                                     |
| ---------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Input pubblico         | Partial, shorthand, preset e valori definiti dall'utente         | Non mutarlo; distinguere input JS da sottoinsieme serializzabile JSON       |
| Configurazione risolta | Default, precedenze, normalizzazione e opzioni delle estensioni  | Snapshot stabile per versione; condivisibile solo se realmente immutabile   |
| Stato runtime          | Valori random campionati, animazioni, Retina e override dinamici | Per owner/particella; servizi espliciti e nessun riuso mutabile accidentale |

Direzione iniziale: separare queste responsabilità in modo incrementale, mantenendo
loader/adattatori dove utili. Confrontare classi attuali ottimizzate, funzioni di
normalizzazione tipizzate e modello ibrido con template risolti. Una risoluzione
indipendente dal DOM può favorire ARCH-02, ma non va dichiarata finché tutti gli
hook richiesti dipendono ancora dal Container.

## Semantica da fissare prima di cambiare implementazione

1. Ricostruire dal sorgente e da test caratterizzanti la precedenza completa di
   default, preset multipli/nidificati, palette, input, gruppi, shape/effect,
   override per particella, temi e hook. Non ricavare l'ordine dalla sola lista
   in questo piano; pubblicare una tabella con esempi di conflitto campo per campo.
2. Definire assenza/`undefined`/`null`, `false`, zero, range, array e shorthand,
   sostituzione o merge delle collection, chiavi sconosciute e input non valido.
   Valutare diagnostica al caricamento tramite logger dell'engine, fuori dal frame.
3. Definire il comportamento di preset ciclici/mancanti e capacità non caricate;
   errori o fallback espliciti, senza recursion infinita o default impliciti nuovi.
4. Censire mutazioni di `actualOptions` e `particle.options` in core/plugin/app.
   Decidere se restano supportate o diventano update/override espliciti; ogni
   rottura richiede guida e API sostitutiva. `readonly` TypeScript non garantisce
   immutabilità profonda a runtime; un freeze nel frame non è una soluzione.
5. Separare normalizzazione di range dal campionamento RNG: una cache non deve
   riutilizzare un campione fra particelle o cambiare sequenza/numero delle estrazioni
   senza una decisione e test espliciti. Distinguere unità input, Retina e coordinate.

## Estensioni, tipi e schema

Valutare contributi di default/normalizzazione delle capacità attraverso ARCH-04,
con contesto esplicito, ordine deterministico e ownership chiara. Nessun registro
globale per rendere disponibili le options di un plugin a engine che non lo carica.
Confrontare augmentation attuale e mappa tipizzata delle capacità senza introdurre
`any` o un'interfaccia universale che perda i tipi delle options specifiche.

Valutare una fonte comune per tipi, default, normalizzazione, schema e documentazione;
oggi esiste `engine/schema/options.schema.json`. Confrontare generazione in build
e validazione runtime opt-in: evitare di includere nell'engine tutti gli schemi o
un validatore pesante. Testare drift fra schema e comportamento e i casi non
esprimibili nello schema. La verifica deve coprire anche options dei plugin.

## Template e invalidazione

Sviluppare l'esperimento T1 di [IMP-05](../improvements/V5-IMP-05-PARTICLE-STATE.md):
normalizzare una volta la parte stabile e copiare solo i dati mutabili necessari.
Prima stabilire identità/revisione della configurazione, dimensione e scope della
cache e invalidazione su refresh, tema, gruppi, override, resize/Retina e variazioni
dei contributi plugin ammesse dal lifecycle. Se la registrazione è chiusa dopo
init, documentarlo invece di inventare una registrazione dinamica per la cache.

Nessuna chiave `JSON.stringify` nel percorso caldo; nessuna condivisione di classi
mutabili che incorporano Container/PluginManager tra particelle o engine. Se le
mutazioni libere rimangono supportate, il template va invalidato in modo affidabile
oppure escluso dal percorso interessato. Limitare cache di override ad alta cardinalità.

## Esperimenti e accettazione

- Test caratterizzanti delle precedenze e dei valori limite prima della migrazione;
  confronti di classi/funzioni/ibrido a parità di input, hook e RNG controllato.
- Nessuna mutazione dell'input; nessun aliasing mutabile fra particelle, gruppi o
  engine. Refresh/tema/resize e pool non riusano configurazioni superate.
- Consumer con classi derivate da option base, `IOptionLoader.load()` e custom
  updater/plugin compilano, oppure hanno una migrazione intenzionale verificata.
- Misurare init/refresh e creazione massiva, allocazioni/heap per particella,
  update/draw e bundle: scena minima, molte particelle con stessa config, molti
  override diversi e famiglie opzionali assenti/presenti.
- Verificare schema/default e diagnostica, compresi preset ciclici, plugin assente,
  input non valido e ripristino della configurazione associata a uno snapshot.

Consegna: pipeline e precedenze documentate, decisione ARCH-03, contratto di
mutabilità e invalidazione, misure e migrazione. Non riscrivere le classi solo per
ridurne il numero o spostare il costo dal costruttore al frame.
