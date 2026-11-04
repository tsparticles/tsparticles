# V5-IMP-02 — Grafo import, capacità opzionali e distribuzione browser

Stato: da analizzare. Priorità alta. Owner: 03 e 09; collaborazione 01, 05, 07, 08.
Prerequisiti: protocollo [IMP-01](V5-IMP-01-MEASUREMENT.md), contratto factory in 01.

## Evidenze iniziali e ipotesi

Nel checkout analizzato `exports.ts` riesporta utility, enum e classi option;
`Engine.load()` importa dinamicamente Container. I manifest espongono condizioni
browser e lazy, mentre browser entry e policy IIFE definiscono namespace e loader.
Sono punti da verificare sugli artefatti prodotti, non prove di byte superflui.

### B1 — Helper puri e radice package

Confrontare la fixture M1 con M2/M3. Individuare nel grafo i moduli inclusi per
importazioni runtime, cicli, side effect o selezione dell'entry browser. Verificare
se le nuove facciate selettive eliminano dipendenze o cambiano soltanto il source.
Confrontare import root e un eventuale subpath documentato solo se serve a un
consumer reale; evitare un subpath per ogni file. `export *` può essere eliminato
dal tree-shaking: non riscrivere l'API sulla sola base della sua presenza.

Accettazione: helper puro senza creazione engine/DOM; factory senza avvio scena;
fixture costruite con le condizioni browser reali. Tipi e API plugin restano
raggiungibili, senza export runtime accidentali delle classi oggi type-only.

### B2 — Separazione delle capacità opzionali

Mappare il costo transitivo di options, colore/HDR, fullscreen/style e background
nei consumer M3 e M8. Distinguere codice sempre necessario da codice utilizzato
solo quando una feature è abilitata. Valutare tre alternative: semplificare il ramo
esistente, helper puro eliminabile, plugin/capacità lazy esplicita.

Prima di un'estrazione elencare loader, options, default, fallback e bundle che la
abilitano. Tenere conto del costo del nuovo hook, della latenza e del codice comune
aggiuntivo. Non estrarre se il bundle minimo carica comunque tutto. Preservare HDR,
OffscreenCanvas e feature pubbliche; documentare gli eventuali cambi di integrazione.

Accettazione: byte recuperati nel consumer minimo e totale di M8 confrontabile,
feature riattivabile tramite percorso documentato, test dei bundle standard e custom.

### B3 — Lazy e condizioni exports

Verificare se `./lazy`, `browser` e l'entry selezionata dal bundler mantengono
l'intento lazy. Misurare moduli caricati alla creazione e dopo `load()`, richieste,
URL CDN, somma chunk e startup. Confrontare eager e lazy sulla stessa scena; chunk
più piccoli possono aumentare richieste e duplicazioni. Non cambiare formati o
conditional exports senza smoke del pacchetto distribuito ESM/CJS/browser.

### B4 — Duplicazione browser e bootstrap

Per M10 censire engine/helper duplicati in bundle completi e feature standalone,
bootstrap namespace, eventuali Proxy e mapping external. Confrontare modalità
supportate: bundle autocontenuto, engine condiviso con plugin external, combinazione
di più bundle. Una libreria runtime condivisa può ridurre il totale della pagina
ma richiede ordine script e versioni coerenti: registrarne il tradeoff.

Accettazione: due engine creati dall'app, registrazioni indipendenti, nessun default
engine nascosto, script ripetuti e version mismatch gestiti, lazy/CDN funzionanti.
Riduzioni conteggiate su pagina completa, senza confrontare prodotti con feature diverse.

## Sequenza e consegna

Analizzare B1 e B3 durante 03, rifinire B2 con 05/07 e B4 con 09. Validare runtime,
package exports e generatori tramite 08/09. Allegare grafi prima/dopo, attributi di
build, budget, matrice feature e migrazione; aggiornare il report comune e il gate 10.
