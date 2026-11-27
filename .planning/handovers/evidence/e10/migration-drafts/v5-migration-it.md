# Guida alla migrazione a v5 — bozza E10

Stato: bozza E10 aggiornata al 2026-11-27. Le verifiche E9 su pacchetti
installati e browser sono passate per il candidato corrente. Questa guida
descrive i contratti v5 implementati per engine, wrapper, bundle e colori. I
limiti di dimensione E0 restano riferimenti diagnostici secondo il criterio
E10 aggiornato; non vengono indicati come superati. Il follow-up senza callback
del renderer supera tutte le 30 righe runtime E0, incluse quelle HDR forzate.
Nel confronto M4/500, update e render rientrano nei limiti E0; il p95 del frame
è 7,20 ms, 0,05 ms oltre il riferimento storico E5. La verifica HDR su hardware
e le revisioni documentali richieste restano aperte.

L'esempio TypeScript generato da MCP e tutti i 20 scaffold CLI (Vanilla e 19
framework) superano i controlli di tipo, la build di produzione e l'avvio in
Chrome senza errori di pagina o console. Tutte le nove famiglie di template
impacchettate escludono le varianti ritirate di Vue 2, Nuxt 2 e Nuxt 3. Restano
aperte la revisione linguistica delle nove bozze e la verifica HDR/browser su hardware. Questa è una bozza
interna, non la guida definitiva di rilascio.

Le guide Vanilla predefinite e localizzate del sito attuale sono copie identiche
e puntano ai pacchetti CDN v4 pubblicati. Gli esempi singleton vengono mantenuti
come documentazione v4 fino alla pubblicazione della pagina di migrazione v5 e
non valgono come verifica dei consumer v5.

## Proprietà dell'engine

Sostituisci gli import del singleton `tsParticles` con `createEngine()`. Mantieni
l'istanza restituita nello scope dell'applicazione, passala a ogni loader e
forniscila esplicitamente a wrapper e provider. Una variabile locale può
continuare a chiamarsi `tsParticles`. Il teardown di un componente gestisce il
proprio container e non deve distruggere container non correlati che usano lo
stesso engine.

La personalizzazione di random/logger e la pianificazione delle animazioni
appartengono all'istanza dall'implementazione E2. Registra i plugin
personalizzati su `container.engine` (o `container.pluginManager.engine`) così
i servizi runtime seguono l'engine proprietario.

## Integrazioni framework ritirate

| Integrazione                               | Destinazione della migrazione           | Rimozione / verifica               |
| ------------------------------------------ | --------------------------------------- | ---------------------------------- |
| Wrapper, demo e riferimenti starter Vue 2  | Migrare a Vue 3 e `@tsparticles/vue3`   | Rimosso in E1; ricontrollato in E9 |
| Wrapper, demo e riferimenti starter Nuxt 2 | Migrare a Nuxt 4 e `@tsparticles/nuxt4` | Rimosso in E1; ricontrollato in E9 |
| Wrapper, demo e riferimenti starter Nuxt 3 | Migrare a Nuxt 4 e `@tsparticles/nuxt4` | Rimosso in E1; ricontrollato in E9 |

Gli aggiornamenti dei framework sono migrazioni applicative, non rinominazioni
dirette dei pacchetti. La ricerca di riferimenti E0 è in
`../../e0/retirement-references.txt`; durante la rimozione controlla
installer, stringhe generate, documentazione e traduzioni. La matrice include
anche i consumer mantenuti che devono usare engine espliciti.

## API deprecate

La funzione `colorMix()` che restituiva RGB è stata rimossa. Sono stati rimossi
anche gli helper engine deprecati `getStyleFromRgb()` e `getStyleFromHsl()`,
`getStyleFromHsv()` del plugin HSV e il formatter locale del pacchetto OKLCH
`getStyleFromOklch()`. Converti RGB con `rgbToOklch()`, HSL con
`rgbToOklch(hslToRgbFloat(color))` e risolvi le opzioni HSV tramite il color
manager HSV registrato con `rangeColorToOklch(engine.pluginManager,
{ value: { hsv: color } })`. Passa il risultato canonico a
`getStyleFromOklch()` dell'engine, che tiene conto del gamut di destinazione e
delle impostazioni HDR. Se il confine di output richiede davvero solo RGB, usa
`mapOklchToSrgb(result).rgb`.

### Hook del ciclo di vita degli interactor

Le classi base degli interactor forniscono un'implementazione predefinita senza
effetti di `reset()`. La classe base degli interactor esterni fornisce anche un
`clear()` senza effetti. Il manager seleziona gli hook personalizzati dopo
l'inizializzazione degli interactor, inclusa l'inizializzazione del redraw.
Mantieni gli override che gestiscono stato o lavoro nella fase di reset e
aggiungi il modificatore TypeScript `override` se usi `noImplicitOverride`.

Consulta l'[inventario delle API deprecate](../../e9/deprecated-migrations.md) per
i formatter colore ritirati, le opzioni Confetti e Ribbons e la superficie di
compatibilità particles.js mantenuta come opt-in. Per i progetti che aggiornano
il compilatore a Stencil 5, rimuovi `applyPolyfills()` e attendi
`defineCustomElements()` quando la registrazione deve terminare prima
dell'hydration. Il wrapper tsParticles per Stencil usa Stencil 4 e dichiara
ancora `applyPolyfills()`.

## Colori, opzioni e contratti pubblici

Gli input colore continuano ad accettare RGB, HSL, HSV, HWB, Lab, LCH, OKLab,
stringhe CSS, array e intervalli supportati. Lo stato colore e l'animazione
delle particelle usano ora OKLCH: sostituisci le componenti HSL legacy
`{ h, s, l }` con `{ h, c, l }`. La tonalità resta un angolo, croma e luminosità
usano la scala numerica OKLCH di v5 e l'alfa resta un valore di opacità
separato. Non copiare la saturazione HSL nel croma; converti il colore al
confine d'ingresso oppure mantieni un input CSS/RGB supportato e lascia che
l'engine lo analizzi. I manager che implementano l'estensione colore devono
seguire il contratto OKLCH corrente; consulta le [decisioni colore](../../../V5-COLOR-DECISIONS.md)
per input accettati, gamut mapping, alfa e comportamento HDR.

## API con engine esplicito implementate in E1

```ts
import { createEngine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const engine = createEngine();
await loadSlim(engine);
const container = await engine.load({ id: "particles", options: {} });
container?.destroy();
```

Gli entrypoint root, `/lazy` e browser module non creano engine né pubblicano
oggetti su `globalThis`. Gli script classici Rollup espongono il namespace di
factory e loader:

```js
const engine = tsParticles.createEngine();
await tsParticles.loadSlim(engine);
await engine.load({ id: "particles", options: {} });
```

Un bundle standalone include le definizioni dell'engine; gli script di feature
esterni richiedono prima l'engine corrispondente e le sue dipendenze. Mantieni
allineate le versioni dei pacchetti. Il namespace contiene definizioni, non un
engine. Caricare un altro bundle non distrugge un engine già creato. La
proprietà del canvas è esclusiva anche tra copie dell'engine incluse in bundle
separati. Distruggi l'owner prima di trasferire il canvas. ID uguali su canvas
forniti distinti restano indipendenti tra engine diversi.

Usa un engine separato quando l'applicazione richiede registri di plugin,
sorgenti casuali, logger, scheduler o proprietà dei container separati. Registra
ogni feature necessaria su ciascun engine che la userà:

```ts
import { createEngine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const editor = createEngine();
const preview = createEngine();
await Promise.all([loadSlim(editor), loadSlim(preview)]);

const editorContainer = await editor.load({ id: "editor", options: {} });
const previewContainer = await preview.load({ id: "preview", options: {} });

editorContainer?.destroy();
previewContainer?.destroy();
```

I pacchetti convenience esportano `createConfetti(engine)`,
`createFireworks(engine)`, `createParticles(engine)` e `createRibbons(engine)`.
La funzione restituita è associata a quell'engine e mantiene `init`, `create` e
`version`:

```ts
import { createEngine } from "@tsparticles/engine";
import { createConfetti } from "@tsparticles/confetti";

const confetti = createConfetti(createEngine());
await confetti({ count: 30, spread: 70 });
```

`initPjs(engine)` restituisce `{ particlesJS, pJSDom, Particles }` e non assegna
queste API di compatibilità a `globalThis`. `loadConfigs(engine)` registra
esplicitamente catalogo e palette su quell'engine.

| Famiglia wrapper                              | Proprietà engine e registrazione                                                                                                                                            |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| React / Next.js                               | Passa `engine` a `ParticlesProvider` e fornisci un registrar `init` che carichi i plugin richiesti.                                                                         |
| Vue 3                                         | Installa il provider particles con `{ engine, init }`; nei discendenti chiama `useParticlesProvider()`.                                                                     |
| Angular                                       | Passa un engine a `service.init(engine, registrar)` e usa un service provider distinto per ogni engine indipendente. I componenti convenience ricevono `engine` come input. |
| Preact, Solid, Inferno, Svelte, Stencil, Riot | Fornisci l'engine tramite API del componente/provider e inizializzalo con `initParticlesEngine(engine, registrar)` dove disponibile.                                        |
| Qwik                                          | Crea/registra sul client e conserva l'engine con `noSerialize`; non crearlo durante il rendering server.                                                                    |
| Custom elements                               | Assegna `.engine` come proprietà; non è un attributo HTML serializzato.                                                                                                     |
| Nuxt 4                                        | Usa `engine` e `registerParticles` esportati dal modulo di inizializzazione configurato.                                                                                    |

Per le firme specifiche dei framework e i vincoli SSR, consulta il README di
ciascun wrapper. Non ricreare un engine implicito a livello di modulo in un
provider.

Il teardown di un componente distrugge solo il container che possiede.
L'applicazione gestisce il ciclo di vita di un engine condiviso e deve
completare i caricamenti in sospeso e distruggere i container prima di
abbandonarlo. I servizi runtime appartengono a ciascun engine; configurali
prima di caricare un container:

```ts
const engine = createEngine();
engine.setRandom(myRandomFn);
engine.setLogger(myLogger);
engine.setAnimationFunctions(requestFrame, cancelFrame);
const container = await engine.load({ id: "particles", options });
```

Le precedenti API globali `setParticlesRandom`, `getParticlesRandom`,
`getParticlesRandomFn`, `setParticlesLogger` e `getParticlesLogger` sono state
rimosse. Sostituiscile con `engine.setRandom`, `engine.getRandom`,
`engine.getRandomFn`, `engine.setLogger` ed `engine.getLogger`. I plugin
personalizzati possono accedere all'owner tramite `container.engine` o
`container.pluginManager.engine`. Gli helper runtime ricevono un provider
casuale esplicito; usa il provider stabile `getRandomFn()` dell'engine owner,
così le successive modifiche alla sorgente hanno effetto senza coinvolgere
altri engine. Anche la pianificazione delle animazioni è per engine; i frame
attivi dei container vengono annullati dallo scheduler che li ha creati.

### Ordine di inizializzazione

Per i wrapper che espongono `initParticlesEngine`, chiamalo
`initParticlesEngine(engine, registrar)` durante l'inizializzazione
dell'applicazione. I componenti possono montarsi prima: attendono
l'inizializzazione di quell'engine e non ne creano né inizializzano uno
implicito. Per jQuery usa `$.particles(engine).init(registrar)`. I provider
React/Vue e l'inizializzazione del service Angular eseguono il passaggio
equivalente. Se la registrazione fallisce, le attese correnti vengono rifiutate
e un nuovo tentativo di inizializzazione è possibile.

## Entry point dei moduli e browser

Importa la root del pacchetto per l'API ESM standard. Usa il subpath `/lazy`
quando serve l'entrypoint differito; il caricamento dinamico non ripristina il
vecchio singleton. I controlli sui pacchetti installati coprono `import` ESM,
`require` CJS e la condizione browser per root e `/lazy`.

Per l'output browser classico, il namespace Rollup contiene factory e loader
delle feature. Crea l'engine dopo il caricamento dello script namespace e
passalo a ciascun loader. Gli script di feature esterni dipendono dall'engine
corrispondente e dalle dipendenze condivise; usa versioni coerenti e l'ordine
indicato nel README browser del bundle. Un bundle standalone include le feature
selezionate. Né il caricamento dell'entrypoint browser né l'import della root
di un pacchetto creano automaticamente un engine.

## Confini dei pacchetti e API singleton rimosse

Importa i tipi runtime e `createEngine` da `@tsparticles/engine`, poi importa
solo i pacchetti feature necessari all'applicazione, per esempio
`@tsparticles/slim` o un pacchetto dedicato a interazioni, forme o updater. I
pacchetti convenience sono adapter separati. Preferisci gli export dichiarati
del pacchetto agli import interni `dist` o agli import sorgente di altri
pacchetti. Il report E10 dei pacchetti installati è la fonte di riferimento per
gli attuali controlli su `exports`, dichiarazioni e risoluzione.

Il singleton engine esportato e gli helper globali di mutazione dell'engine
sono stati rimossi. Sostituisci `setParticlesRandom`, `getParticlesRandom`,
`getParticlesRandomFn`, `setParticlesLogger` e `getParticlesLogger` con i
metodi dell'engine che possiede il container. Se il codice applicativo usava
`tsParticles.load`, `tsParticles.loadJSON` o `tsParticles.dom`, esegui quelle
operazioni sull'engine esplicito oppure conserva il container restituito. Non
accedere a `window.tsParticles` da un pacchetto ESM/CJS importato; i bundle
browser classici espongono separatamente il namespace documentato.
