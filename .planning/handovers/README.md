# tsParticles v5 — piano di esecuzione

Data: 2026-11-03. Branch dedicato: `v5`. Baseline sorgenti: versione `4.5.1`.
Stato: **pianificato, nessuna modifica runtime eseguita**.

## Obiettivo e ordine

Eliminare il singleton `tsParticles`, consentire engine indipendenti e portare la
personalizzazione di random e log nell'engine. Ridurre il codice effettivamente
spedito ai consumatori e delimitare i moduli del core con cartelle e facciate
pubbliche piccole. **Tutto `engine/src/` va revisionato**, inclusi ParticlesManager,
Particle, Engine/PluginManager, Retina, eventi, utility, opzioni, tipi ed entrypoint.
La revisione di ogni area è obbligatoria; le riscritture vanno giustificate dalle
misure e dai contratti. Audit esplicito anche di tutti i plugin e della distribuzione
browser/CDN senza singleton. È una major: le rotture intenzionali vanno migrate e documentate.

| Ordine | Handover                                                  | Dipendenza                                 | Risultato                                                 |
| ------ | --------------------------------------------------------- | ------------------------------------------ | --------------------------------------------------------- |
| 1      | [Engine espliciti](V5-01-ENGINE-INSTANCES.md)             | Baseline preliminare                       | Nessuna istanza implicita; consumer e browser funzionanti |
| 2      | [Random e logger](V5-02-ENGINE-SERVICES.md)               | 01                                         | Servizi isolati per engine                                |
| 3      | [Confini e audit intero engine](V5-03-CORE-BOUNDARIES.md) | 02                                         | Inventario completo, facciate e responsabilità            |
| 4      | [Container](V5-04-CONTAINER.md)                           | 03                                         | Revisione lifecycle                                       |
| 5      | [Canvas e rendering](V5-05-CANVAS-RENDERING.md)           | 04                                         | Revisione canvas/render                                   |
| 6      | [ParticlesManager](V5-06-PARTICLES-MANAGER.md)            | 05                                         | Revisione collection, pool, update e griglia              |
| 7      | [Particle](V5-07-PARTICLE.md)                             | 06                                         | Revisione stato/init particella e Retina                  |
| 8      | [Impatto sui plugin](V5-08-PLUGIN-IMPACT.md)              | Audit iniziale in 01/02; chiusura dopo 07  | Compatibilità verificata per ogni pacchetto               |
| 9      | [Bundle browser/CDN](V5-09-BROWSER-BUNDLES.md)            | Contratto iniziale in 01; chiusura dopo 08 | Bootstrap e composizione senza singleton                  |
| 10     | [Gate v5](V5-10-SIZE-MIGRATION-RELEASE.md)                | 01–09                                      | Budget, integrazione e migrazione                         |

Eseguire in sequenza: i primi tre handover cambiano contratti e import condivisi.
Ogni handover indica responsabilità, test e prove richieste; non equivale al
permesso di dichiarare completati i passaggi successivi. Gli agent devono leggere
`AGENTS.md`, questo indice e il proprio handover prima di modificare i sorgenti.
Non annullare modifiche altrui; registrare file cambiati, decisioni, comandi ed esiti.
Non fare commit, pubblicare o avviare release come effetto automatico del piano.

## Evidenze del checkout

- `engine/src/index.ts` e `index.lazy.ts` chiamano `initEngine()` a import-time.
- `initEngine.ts` riusa `globalThis.tsParticles` se trova `pluginManager`.
- `index.lazy.ts` e `browser.ts` scrivono globals; `browser.ts` espone anche i
  getter/setter di random/log. Il solo `index.ts` non assegna direttamente globals.
- `MathUtils.ts` conserva `_random` e `_animationLoop` a livello di modulo;
  `LogUtils.ts` muta un oggetto `_logger` condiviso.
- `Engine` espone un `PluginManager` per istanza; buona parte della struttura
  necessaria esiste già. `Engine.load()` importa dinamicamente `Container`.
- `Engine`, `Container`, `CanvasManager`, `PluginManager` sono oggi esportati come
  **tipi** da `export-types.ts`. Non trasformarli incidentalmente in export runtime.
- Dimensioni sorgenti indicative: `Container.ts` 710 righe, `CanvasManager.ts` 671,
  `RenderManager.ts` 831, `ParticlesManager.ts` 818, `Particle.ts` 1178.
  Le righe non sono una misura del bundle.
- Esistono `wrappers/`, `templates/`, generatori in `cli/commands/create-utils/`
  e codice prodotto dal MCP: la migrazione non termina in `engine/`.
- Il build standard `tsparticles-build` usa Rollup. Webpack e Rolldown sono opt-in
  (`cli/commands/build/src/build.ts`); la presenza di una config non prova che venga eseguita.
- `CanvasManager` ha una WeakMap di trasferimenti HTMLCanvas → OffscreenCanvas:
  è stato legato alla risorsa browser e non va spostato ciecamente per engine.

## Contratto architetturale proposto

1. API primaria sincrona `createEngine(): Engine`, con una nuova istanza a ogni
   chiamata e nessuna inizializzazione DOM. Conservare l'inizializzazione async
   attraverso `engine.init()` / `engine.load()`; i loader ricevono l'engine.
2. Nessun export di un oggetto `tsParticles`, nessun fallback che cerca un engine
   in `globalThis`, nessun default engine nascosto nei wrapper. Una variabile locale
   dell'app può continuare a chiamarsi `tsParticles`.
3. `engine.setRandom()`, `getRandom()`, `getRandomFn()`, `setLogger()` e `getLogger()`
   sono il contratto proposto per i servizi. I dettagli delle firme e del passaggio
   del contesto agli helper sono definiti in 02, senza stato ambientale.
4. I browser script possono esporre factory e loader tramite un bootstrap esplicito;
   non creano un engine automaticamente. Gli import ESM/CJS e le risoluzioni
   `browser` devono restare utilizzabili senza scritture globali implicite.
5. Cartelle di dominio con `index.ts` selettivo; helper non riesportati e niente
   deep import tra domini. I tipi necessari ai plugin restano pubblici. La cartella
   non rende i file privati nel linguaggio: servono regole sugli import e package exports.
6. Refactor orientato alle dipendenze realmente incluse: niente wrapper class,
   factory di funzioni o nuove astrazioni per il solo scopo di accorciare un file.

Esempio di destinazione (proposta di API, non codice già disponibile):

```ts
import { createEngine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const first = createEngine();
const second = createEngine();
first.setRandom(() => 0.25);
second.setRandom(() => 0.75);
first.setLogger({ warning: (message) => console.warn(message) });
await loadSlim(first);
await loadSlim(second);
await first.load({ id: "first", options: {} });
await second.load({ id: "second", options: {} });
```

Il contratto è la scelta di partenza per gli agent. Se l'analisi dimostra che va
cambiato, documentare motivazione e migrazione prima di propagare una firma diversa.

## Baseline obbligatoria prima della prima modifica runtime

Parte iniziale di 01, non un refactor preliminare. Salvare in
`V5-BUNDLE-REPORT.md` commit di partenza, dirty diff, versioni Node/pnpm, build
invocati, formati e misure. Non prendere dist preesistenti come baseline verificata.

Misurare con la stessa toolchain, minificatore e compressione:

| Scenario                     | Cosa includere                                                 |
| ---------------------------- | -------------------------------------------------------------- |
| Import di un helper puro     | Bundle consumer di una sola funzione, senza engine o DOM       |
| Factory importata e invocata | Bundle consumer con creazione esplicita; distinguere init/load |
| Scena minima                 | Engine + soli loader necessari alla scena; options identiche   |
| Basic / slim / full / all    | Bundle distribuiti supportati, minificati                      |
| Lazy/CDN                     | Entry + tutti i chunk richiesti per avviare la stessa scena    |

Registrare byte raw/minificati, gzip, Brotli, numero dei chunk e dipendenze trattenute.
Per ESM confrontare anche bundle consumer browser con risoluzione reale di `exports`.
Un entry più piccolo con lo stesso codice spostato nei chunk non è un risparmio.
Definire dopo la baseline budget numerici per scenario e registrarli prima del
refactor di dimensioni. Non promettere percentuali senza misure. Gate minimo:
scena minima e slim ridotti in gzip e Brotli rispetto alla baseline; gli altri
scenari senza aumenti non spiegati e senza superare i budget concordati nel report.
Se un budget non è raggiunto, il gate rimane aperto con dati e motivazione.

## Verifica comune agli handover

- Scoprire i target con `pnpm nx show project <nome> --json`; non presumere target
  `lint` o `test` separati. Il target engine `build` risolve a `tsparticles-build`.
- Su questo sandbox Nx funziona con `NX_DAEMON=false NX_ISOLATE_PLUGINS=false`;
  la query senza queste variabili fallisce sui socket. Sono workaround locali.
- Per runtime modificato: test mirati e suite completa, lint/format dei file
  interessati, build dei consumer. Prima di proporre commit eseguire anche
  `pnpm exec vitest` come richiesto da `AGENTS.md`; registrare se avvia watch e
  completare una esecuzione finita con `pnpm exec vitest run`.
- Dopo modifiche engine, ricostruire tutti i pacchetti non CLI/non website/non
  palette come da `AGENTS.md`, verificando i nomi con `pnpm nx show projects --json`.
  In 01/02 includere inoltre CLI/generatori e altri consumer modificati: le
  esclusioni della verifica standard non li coprono.
- Build CI senza autofix (`pnpm run build:ci`) al gate finale. Non presentare
  errori preesistenti come risolti o come esenzione: riportare riproduzione e impatto.
- Test deterministici, fake scheduler o tick espliciti; verifiche browser per
  canvas/HDR. I mock jsdom non sostituiscono il controllo visivo.

## Miglioramenti candidati

Il [piano miglioramenti](V5-IMPROVEMENTS.md) è articolato in sei approfondimenti:
misure/baseline, grafo bundle e browser, collection particelle, indice spaziale,
stato per particella, rendering/lifecycle. Ogni documento specifica ownership,
alternative, vincoli, scenari e criteri di accettazione. Gli handover principali
rimandano agli approfondimenti di propria competenza; il gate 10 verifica anche
il registro delle decisioni e gli esiti delle opportunità analizzate.

## Valutazioni architetturali aggiunte il 2026-11-06

Il [piano architetturale](V5-ARCHITECTURE.md) raccoglie quattro valutazioni
obbligatorie e i relativi piani dedicati: modello/serializzabilità di Particle,
eventuale divisione di engine in pacchetti, pipeline delle options e architettura
comune delle estensioni. Contiene raccomandazioni iniziali, alternative e prove;
le riscritture restano subordinate alle evidenze.

I contratti si discutono in 03 prima dei refactor di 04–07; 06/07 verificano stato
e responsabilità, 08 chiude la migrazione delle estensioni, 09 il packaging e 10
il registro delle decisioni. Gli ARCH si affiancano agli IMP senza duplicarne
misure e ottimizzazioni. Il checkout analizzato per queste valutazioni è `4.5.2`;
la baseline `4.5.1` riportata sopra documenta la ricognizione originale.

## Stato di questo piano

- [x] Ricognizione dei punti critici e aggiornamento della documentazione di planning.
- [x] Handover 01–10 preparati.
- [ ] Baseline bundle e budget numerici.
- [ ] Implementazione e verifica 01–10, con copertura di tutto l’engine e audit plugin/browser.

I conteggi test storici in `STATE.md` restano riferiti alle sessioni 4.x. Le analisi
in `codebase/` e `research/` non completamente riverificate sono riferimenti storici,
non un backlog automatico da aggiungere alla v5.
