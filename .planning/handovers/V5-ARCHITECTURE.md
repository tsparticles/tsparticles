# V5 — Valutazioni architetturali

Aggiornamento: 2026-11-06. Stato: valutazioni iniziali su checkout `4.5.2`;
nessuna modifica runtime, misura di miglioramento o decisione finale di implementazione.
La baseline `4.5.1` citata negli handover originali è storica: prima degli esperimenti
registrare commit e versione effettivi, mantenendo confronti sullo stesso checkout.

## Scelte da valutare

| Tema             | Valutazione di partenza                                                                                                            | Piano dedicato                                        | Owner                        |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ---------------------------- |
| Particle         | Separare stato e comportamento dove utile; snapshot esplicito prima di imporre un oggetto runtime interamente serializzabile       | [ARCH-01](architecture/V5-ARCH-01-PARTICLE-MODEL.md)  | 06/07, contratti in 03/08    |
| Pacchetto engine | Prima confini interni e subpath selettivi; estrarre pacchetti solo con consumatori e benefici verificati                           | [ARCH-02](architecture/V5-ARCH-02-ENGINE-PACKAGES.md) | 03, prove in 09/10           |
| Options          | Distinguere input, configurazione risolta e stato runtime; confrontare loader attuali con normalizzazione e template condivisibili | [ARCH-03](architecture/V5-ARCH-03-OPTIONS.md)         | 03/07, integrazione 04/08    |
| Estensioni       | Registrazione e lifecycle comuni con capacità tipizzate; preservare pipeline specializzate nel frame                               | [ARCH-04](architecture/V5-ARCH-04-EXTENSIONS.md)      | 03/08, integrazione 04–07/09 |

Le raccomandazioni rispondono a problemi differenti: serializzabilità, composizione
dei pacchetti, costo e semantica delle options, coerenza delle estensioni. Non assumere
che una riscrittura unica risolva tutti e quattro o riduca automaticamente il bundle.

## Inserimento nell'esecuzione v5

Questi piani sono parte degli [handover 01–10](README.md), non quattro nuove fasi
da avviare dopo il gate. Le valutazioni sono obbligatorie; la riscrittura proposta
da ciascuna alternativa richiede evidenze. Restano validi gli obiettivi già fissati
su singleton, isolamento dei servizi, copertura e budget.

1. In 01/02 rilevare dipendenze e vincoli dei nuovi engine senza introdurre
   un registro globale o anticipare uno split di pacchetti.
2. In 03 definire i contratti proposti di stato, options ed estensioni e confrontare
   i confini dei pacchetti. Consultare insieme ARCH-01/03/04 per evitare API incompatibili.
   Prima una bozza di contratti; lo split fisico segue la verifica delle dipendenze.
3. In 04–07 verificare i contratti nei lifecycle e nei percorsi caldi. In 06 concordare
   la divisione Particle/ParticlesManager prima di cambiare le collection; in 07
   implementare soltanto le alternative selezionate e misurate.
4. In 08 chiudere migrazione e verifica di tutte le famiglie di estensione;
   in 09 verificare distribuzione e composizione dei pacchetti risultanti.
5. In 10 chiudere le decisioni e includere le rotture effettive nella guida v4 → v5.

## Registro e criteri di chiusura

Produrre `V5-ARCHITECTURE-DECISIONS.md` nella cartella degli handover durante
l'esecuzione, con una voce ARCH-01–04: problema, contratti/consumer interessati,
alternative confrontate, scelta e motivazione, misure/test, API da migrare, rischi
e stato finale. Per ogni tema è ammesso mantenere l'implementazione attuale con
evidenza oppure rinviare la riscrittura con motivazione e impatto sui requisiti.
Nessun rinvio chiude un budget o requisito obbligatorio non soddisfatto.

Gli esperimenti condividono la baseline e il registro delle misure di
[IMP-01](improvements/V5-IMP-01-MEASUREMENT.md). Gli IMP restano responsabili delle
ottimizzazioni; gli ARCH delle scelte di modello e dei contratti. Collegare le
evidenze senza duplicare esperimenti. Una proposta di API nei piani non è un'API disponibile.
