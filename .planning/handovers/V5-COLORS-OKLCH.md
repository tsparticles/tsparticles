# V5-COLOR — OKLCH come modello colore standard

Data: 2026-11-06. Branch: `v5`. Ricognizione: sorgenti `4.5.2`.
Stato: **piano dettagliato, implementazione e misure ancora da eseguire**.

## Obiettivo vincolante

OKLCH diventa la rappresentazione canonica del colore delle particelle e delle
relative animazioni nella v5: `IOklch` sostituisce `IHsl` nei contratti runtime.
Le opzioni continuano ad accettare i formati gestiti dai color manager, con array,
range, selezione per indice, random e precedenze documentate. HSL/RGB restano
formati di ingresso e conversione, non passaggi obbligatori della pipeline.

Preservare il colore in floating point fino al confine di output. Un colore fuori
dal gamut del dispositivo non può essere riprodotto identico: conservarne il valore
canonico e applicare una trasformazione documentata solo alla destinazione.
La migrazione deve evitare perdite aggiuntive dovute a clipping, quantizzazione,
conversioni superflue o interpretazione di coordinate RGB nello spazio sbagliato.

## Evidenze verificate nel checkout

| Area                                                              | Stato attuale                                                                                            | Conseguenza                                                                                            |
| ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `engine/src/Core/Interfaces/IColorManager.ts`                     | `handleColor` / `handleRangeColor` restituiscono `IRgb`; `parseString` restituisce `IRgba`               | Tutti i manager confluiscono in RGB                                                                    |
| `engine/src/Utils/ColorUtils.ts`                                  | `rangeColorToHsl` passa da `rangeColorToRgb` e `rgbToHsl`                                                | Anche OKLCH viene ricostruito da RGB                                                                   |
| `plugins/colors/oklch/src/utils.ts`                               | `oklchToRgb` clampa e arrotonda a 0–255                                                                  | Perdita del gamut e della precisione all'ingresso                                                      |
| `engine/src/Core/Interfaces/Colors.ts`                            | Esistono `IOklch`, `IOklcha`, `IRangeOklch`; manca `IRangeOklch` diretto nell'unione `IRangeColor.value` | Riutilizzare i tipi, correggere la copertura senza duplicazioni                                        |
| `Particle.ts`, `IParticleHslAnimation.ts`, `IParticleModifier.ts` | Fill, stroke, back color, getter e modifier dipendono da HSL                                             | Cambiamento pubblico trasversale                                                                       |
| `AnimatableColor.ts`, `HslAnimation.ts`, `updaters/paint`         | Canali `h/s/l`, limiti e velocità numeriche HSL                                                          | Rinominare `s` in `c` non conserva la semantica                                                        |
| `CanvasManager.ts`                                                | Richiesta P3/float16 subordinata anche a HDR; flag `hdr` aggiornato dal solo spazio P3 effettivo         | Wide gamut SDR e HDR sono confusi                                                                      |
| `ColorUtils.ts`                                                   | Ramo HDR produce `color(display-p3 ...)` da una pipeline RGB/tone mapping                                | Audit necessario di primarie, transfer function e unità; cambiare etichetta non converte le coordinate |
| Links, connect, bubble e gradient                                 | Mix/conversioni e output dipendono da RGB/HSL                                                            | Migrare anche interpolazione e cache                                                                   |

Prima di implementare riverificare le evidenze sul commit effettivo e produrre
un inventario completo degli usi; questa tabella non sostituisce l'audit per file.
La modifica locale preesistente a `pnpm-lock.yaml` non appartiene a questo piano.

## Contratto di destinazione

```text
Input supportato → color manager → OKLCH + alpha
                                      ↓
                      stato e animazione h/c/l
                                      ↓
                   modifier / interpolazione / mix
                                      ↓
               adattatore della destinazione effettiva
                                      ↓
          conversione / tone mapping / gamut mapping → output
```

### Tipi, unità e precisione

- Riutilizzare `IOklch` (`l`, `c`, `h`) e `IOklcha` (`a`), senza creare un secondo
  tipo `IOKLCH`. Mantenere `l` in **0–100** per i valori SDR, coerente con l'API
  OKLCH esistente; normalizzare a 0–1 soltanto negli helper matematici che lo
  richiedono. CSS `oklch(0.7 …)` e `oklch(70% …)` devono risolvere allo stesso `l=70`.
- `c` è chroma assoluta, non percentuale HSL; non limitarla al gamut sRGB né
  fissare 0.4 come massimo fisico. Un eventuale massimo predefinito delle animazioni
  è una scelta di UX documentata, distinta dalla validità del colore.
- `h` in gradi, normalizzato modulo 360 anche per valori negativi e giri multipli;
  `a` in 0–1, separato dall'opacità di paint/particella/stop. Definire esplicitamente
  come si combinano, evitando di moltiplicare due volte lo stesso alpha.
- Numeri JS in doppia precisione, nessun arrotondamento nel modello o durante le
  conversioni. Precisione delle stringhe e quantizzazione dell'output hanno test
  dedicati. Le coordinate RGB intermedie devono specificare primarie e codifica:
  niente oggetti `IRgb` ambigui per P3 o RGB lineare.
- Definire una soglia numerica per colori acromatici e una hue stabile quando `c`
  è quasi zero; conservare la hue animabile, distinguendola dalla hue mancante
  durante l'interpolazione. Vietare NaN/Infinity nello stato runtime.
- Le coordinate estese fuori gamut non si clampano durante la conversione.
  La normalizzazione degli input invalidi segue un contratto distinto e testato.

### Color manager e compatibilità di ingresso

Contratto v5 proposto: mantenere i ruoli `accepts`, `handleColor`,
`handleRangeColor`, `parseString`, cambiando i risultati rispettivamente in
`IOklcha | undefined` per tutti i percorsi risolti. Alpha assente nell'input
equivale a 1. Documentare il breaking change per manager di terze parti e fornire
un esempio completo di migrazione. Nessun adattatore RGB implicito nel percorso
nativo v5; un adattatore legacy esplicito può coprire manager sRGB esterni,
dichiarando che non recupera precisione o gamut già persi.

1. OKLCH passa direttamente al modello canonico; OKLab passa a OKLCH senza RGB.
2. Lab/LCH usano conversioni con punto di bianco dichiarato e adattamento D50/D65;
   hex/named/RGB/HSL/HSV/HWB usano il significato sRGB storico, senza rounding.
3. Esporre `colorToOklch`, `rangeColorToOklch`, `stringToOklcha` e helper di stile
   dal dominio colore selettivo. Separare conversioni pure, parsing e rendering;
   il core non importa i plugin colore per ottenere il proprio modello canonico.
4. Conservare i manager opzionali per i formati di ingresso; il modello runtime
   OKLCH e il suo rendering non devono richiedere `loadOklchColorPlugin` dopo che
   un altro manager ha già risolto un colore.
5. Aggiungere input `color(display-p3 …)` almeno tramite manager opzionale; definire
   tipo discriminato per oggetti RGB con spazio esplicito. Pianificare separatamente
   gli ulteriori profili CSS (`srgb-linear`, Rec.2020, XYZ, ecc.) con elenco dei
   formati effettivamente implementati, senza dichiarare supporto CSS universale.
6. Preservare input wrapped (`{ oklch: … }`, `{ lch: … }`, ecc.) e bare storici.
   OKLCH/LCH e OKLab/Lab condividono la forma: non inferire lo spazio dai soli
   nomi dei campi. Verificare ordine dei manager e precedenze storiche; preferire
   forme esplicite nei nuovi esempi e definire un discriminante per i nuovi spazi.
7. Parser deterministici, utilizzabili senza DOM: testare percentuali per canale,
   alpha, segni, decimali, unità angolari, whitespace e consumo dell'intera stringa.
   Pubblicare il sottoinsieme CSS supportato; `none`, colori relativi, `var()` e
   profili custom richiedono una decisione esplicita, non parsing parziale silenzioso.
8. Risolvere range e random una volta con il servizio RNG dell'engine; preservare
   `reduceDuplicates`, indice, array annidati supportati e isolamento tra engine.

### Animazioni, interpolazione e mix

- Introdurre `IOklchAnimation`, `OklchAnimation` e `IParticleOklchAnimation` con
  canali `h/c/l`; migrare `AnimatableColor`, stato fill/stroke e gradient.
  Rinominare gli helper HSL specifici, aggiornare export, firme e consumer insieme.
- Definire velocità e offset in unità di canale per tempo, verificando il fattore
  temporale esistente. Conservare delay, count, decay, sync, range e reduce factor;
  misurare periodi reali con tick espliciti. Non applicare a `c` i fattori numerici
  di saturazione HSL.
- Hue ciclica con modulo corretto su `[min,max)`, anche con overshoot di più giri,
  velocità negativa e min diverso da zero. `l` e `c` seguono limiti/bounce definiti;
  validare min/max invertiti, uguali e valori iniziali fuori dai limiti animati.
  Non abbassare un colore statico valido al massimo predefinito dell'animazione.
- OKLCH è il default di interpolazione percettiva: hue path `shorter` predefinito,
  con regole esplicite per 180°, achromatici, estremi identici e alpha zero.
  Le altre direzioni di hue sono un'estensione tipizzata se esposte al consumer.
- Le animazioni di canale sono distinte dall'interpolazione fra due colori.
  Lavorare in OKLab per operazioni cartesiane può evitare hue spurie: eventuali
  helper dedicati devono dichiararlo, restituendo poi il risultato canonico OKLCH.
- Distinguere mix percettivo (bubble, transizioni, colore links) da compositing
  fisico o luminoso: quest'ultimo usa RGB lineare nello spazio dichiarato.
  Non cambiare blend mode del canvas per effetto di una sostituzione di utility.
- Preservare i pesi del mix, incluso il peso basato sul raggio dei links; definire
  comportamento per somma zero e alpha premoltiplicato. Nei metodi polari la hue
  non si premoltiplica. Gradient del canvas e gradient calcolati dall'engine possono
  interpolare diversamente: provare i pixel intermedi, non solo gli stop.

### Migrazione delle opzioni di animazione

La compatibilità dei **valori colore** non implica equivalenza delle animazioni HSL.
`s=50` non equivale a `c=0.2`; neppure hue/lightness HSL hanno lo stesso significato
di hue/lightness OKLCH. Non introdurre un alias automatico `s → c`.

Il nuovo schema canonico usa `animation.h/c/l`; la forma compatta di animazione
resta shorthand della hue. Per uno schema storico `h/s/l`, scegliere e documentare
in C0 un importatore legacy esplicito oppure una migrazione breaking con diagnostica
chiara e guida. Raccomandazione: guida/manuale per i canali HSL e conversione esatta
dei soli colori statici; nessun secondo stato HSL per particella nel core v5.
Lo schema legacy non deve essere accettato con significato percettivo diverso
senza segnalazione. Applicare la stessa regola a offset split e coordinate trail.

### Rendering, gamut e HDR

- Capability separate per sintassi colore, spazio effettivo del canvas (`srgb` /
  `display-p3`), precisione (`unorm8` / `float16`) e disponibilità HDR. P3 SDR deve
  funzionare anche quando `(dynamic-range: high)` è falso. Leggere attributi
  effettivi quando disponibili; media query e opzioni richieste non sono una prova.
- Proporre selezione gamut `auto | srgb | display-p3`, distinta dalle opzioni HDR;
  default raccomandato `auto` con fallback verificato. Definire comportamento su
  canvas fornito dal consumer, OffscreenCanvas e contesti già creati. Una seconda
  `getContext` non cambia le impostazioni: ricreazione/refresh richiede un percorso
  di lifecycle esplicito, con ownership e teardown corretti.
- Serializzare OKLCH direttamente dove supportato oppure convertire in coordinate
  RGB della destinazione. Verificare il risultato di fill/stroke, shadow, gradient,
  background CSS e mask, canvas intermedi, immagini/SVG ricolorate, export e cache.
  Un canvas intermedio sRGB può perdere il gamut prima della composizione finale.
- Per output riproducibile, scegliere un gamut mapping esplicito con riduzione
  della chroma e controllo dell'errore percettivo, confrontato con gli algoritmi
  CSS Color 4. Selezionare algoritmo e tolleranze in C0/C2 con vettori di riferimento;
  vietato usare clipping per canale come strategia generale di fedeltà.
- Eseguire mapping solo alla destinazione e non scriverlo nello stato animato.
  Lo stesso colore deve poter essere ridisegnato in P3 dopo un output sRGB.
  Per output nativo del browser dichiarare le eventuali differenze di mapping;
  fallback engine e output nativo devono essere confrontati, non assunti identici.
- Wide gamut non equivale a HDR. OKLCH non definisce da solo luminanza assoluta,
  reference white, peak nits o tone mapping. In C0 fissare unità/reference white e
  rappresentazione estesa per il ramo HDR, valutando metadati di luminanza separati
  dal colore. Provare il percorso RGB lineare esteso ↔ OKLab/OKLCH senza clamp.
  Se non conserva i valori HDR attuali, il contratto è da correggere prima del rollout.
- Audit dei modi HDR esistenti: distinguere fedeltà da enhancement creativo,
  saturation boost e tone mapping. Nessun boost automatico nel percorso di fedeltà.
  Precisare ordine delle trasformazioni HDR e mapping finale per evitare doppio
  tone mapping/clipping e interpretazione errata delle primarie.

## Inventario di migrazione e responsabilità

| Owner negli handover | File/famiglie da coprire                                                    | Risultato richiesto                                             |
| -------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------- |
| 03 + 05              | `Colors`, `IColorManager`, `ColorUtils`, costanti, export/facciate          | Contratti canonici e conversioni pure                           |
| 03 + 07              | `IAnimatableColor`, HSL animation class/interface, `Particle`, modifier     | Stato e schema h/c/l                                            |
| 05                   | `CanvasManager`, `RenderManager`, utility canvas/HDR e superfici intermedie | Output e capability coerenti                                    |
| 07 + 08              | `updaters/paint`, gradient, roll, orbit, twinkle, destroy                   | Animazioni, alterazione L, back color, eredità e offset split   |
| 08                   | Tutti `plugins/colors/*` e relativi test                                    | Risoluzione nativa senza passaggio sRGB forzato                 |
| 08                   | Bubble, connect, grab, links, external trail, light                         | Mix, cache, coordinate e colori ausiliari                       |
| 08                   | Emitters, absorbers, trail, polygonMask, backgroundMask                     | Colori spawn, decorazioni e background senza perdita anticipata |
| 08                   | `shapes/image`, cards, altri drawer/effects, palette e consumer custom      | SVG, raster e helper legacy verificati                          |
| 09 + 10              | Bundle, wrapper, CLI/MCP/codegen, schema, demo, markdown, changelog         | API pubblicate, esempi e migrazione completi                    |

Inventariare anche `IRgb`, `IHsl`, `colorMix`, `rangeColorToRgb/Hsl`, helper style,
accessi `.s`, `h/s/l`, min/max/offset colore e chiavi cache. Ogni uso residuo va
classificato: input/conversione intenzionale, boundary di output o bug da migrare.
Non eliminare convertitori HSL/RGB utili ai consumer: conservarli se semanticamente
corretti, oppure documentarne esplicitamente rimozione e sostituzione nella major.

## Sequenza di implementazione con gate

Non aggiungere un undicesimo refactor dopo la release: inserire questa sequenza
negli handover 03/05/07/08/09/10. I contratti Particle necessari a 05 si definiscono
in 03; le integrazioni minime si consegnano con 05, la revisione integrale resta in 07.

1. **C0 — Baseline e decisioni (03, prima dei cambiamenti condivisi).** Catturare
   commit/dirty diff, API/types, fixture colore e scene, immagini e benchmark v4.
   Congelare unità, alpha, manager, input ambiguo, legacy animation, mix, algoritmo
   gamut, gamut selection e contratto HDR. Produrre `V5-COLOR-DECISIONS.md` con
   scelta, alternative, prove richieste ed eventuale questione aperta per ogni voce.
   Una questione HDR non risolta blocca il relativo rollout, non autorizza perdite.
2. **C1 — Matematica e tipi (03/05).** Implementare conversioni bidirezionali pure,
   riusando matrici/coefficienti verificati, transfer function estese con segno e
   adattamento del bianco. Centralizzare il minimo condiviso evitando cicli
   engine → plugin. Aggiornare export e test di accuratezza prima dei consumer.
3. **C2 — Manager e output verticale (05 con 08).** Migrare tutti i manager con
   test, parsing e alpha; completare capability, gamut mapping e fallback.
   Dimostrare una scena statica OKLCH/P3 attraverso l'intera pipeline fino ai pixel.
   Non chiudere la fase se il rendering ricade ancora su HSL/RGB quantizzato.
4. **C3 — Particelle e animazioni (05/07).** Migrare opzioni/runtime, fill/stroke,
   getter, modifier, reset/pool, paint e gradient. Aggiungere test di tick e periodi,
   achromatici, hue wrap, eredità colore e alpha. Nessun doppio modello persistente.
5. **C4 — Ecosistema (08).** Chiudere la matrice per tutti i consumer sopra,
   incluse superfici nascoste, links/gradient/cache e plugin esterni rappresentativi.
   Aggiornare helper, schema e generatori insieme ai loro test. Un semplice build
   non prova la correttezza percettiva.
6. **C5 — Performance, distribuzione e rilascio (09/10).** Confrontare misure,
   bundle reali e browser; completare guida, changelog e fixture di migrazione.
   Chiudere `V5-COLOR-REPORT.md` con comandi, esiti, limiti e decisioni finali.

## Test e prove di accettazione

### Numerici e di contratto

- Vettori indipendenti da CSS Color 4/WPT e conversioni bidirezionali: nero,
  bianco, grigi, primari sRGB/P3, colori P3 fuori sRGB e colori fuori entrambi.
  Il round trip da solo non basta: due conversioni con lo stesso errore possono
  annullarsi. Confrontare coordinate e deltaE OK con soglie fissate prima dei test.
- Soglie iniziali proposte per il percorso float in gamut: errore assoluto <= 1e-6
  su RGB normalizzato e deltaE OK <= 1e-5 (OKLab L in 0–1); confermarle contro
  coefficienti/reference prima di congelarle. Non confrontare hue numericamente
  quando la chroma è sotto la soglia acromatica. Output 8-bit: tolleranza separata.
- Input OKLCH non deve attraversare convertitori RGB; nessuna riduzione di chroma
  prima del rendering. Testare lo stesso valore prima e dopo output sRGB/P3.
- Test di gamut mapping su bordi/cuspidi, luminosità estrema e hue blu/viola;
  output finito nel gamut scelto e confronto con riferimento indipendente.
- Parser e tipi per tutti i manager, alpha zero, alpha percentuale, range e array,
  input invalidi/ambigui, manager custom e isolamento RNG su due engine.
- Aggiornare `utils/tests/src/tests/ColorUtils.ts`, `EngineUtils.ts`, `HDROptions.ts`,
  test Particle/Updaters/Emitters/Options/Configs/Exports e `conversion.spec.ts`
  dei manager; aggiungere fixture di riferimento e test specifici mancanti.

### Rendering reale

- Matrice Chromium/Firefox/WebKit, versioni registrate: canvas HTML e Offscreen,
  sRGB SDR, P3 SDR, HDR quando disponibile, attributi ignorati/fallback, contesto
  preesistente e cambio display/capability. I mock jsdom non provano gamut o HDR.
- Scene: statici equivalenti tra formati, P3 saturo, hue sweep a L/C costanti,
  variazioni L/C, grigio ↔ colore, fill/stroke alpha, bubble, links/connect,
  gradient, roll/twinkle, split, emitters/trail, background/mask, SVG ed export.
- Pixel readback con spazio/formato espliciti dove supportati; screenshot e
  metadati colore conservati. Un PNG sRGB o un display SDR non certificano P3/HDR.
  Non richiedere pixel identici tra browser senza caratterizzarne il color management.

### Costi e verifica workspace

- Benchmark deterministici di parse/init, update h/c/l, draw e mix dei links,
  scenari statici e animati alla stessa densità; registrare tempo frame, allocazioni,
  heap e cache hit rate. Evitare trigonometria/conversioni ripetute per colore statico.
- Cache limitate con invalidazione per colore, alpha, capability, gamut, tone
  mapping e precisione effettivi. Valutare cache per valore/versione della particella;
  evitare `JSON.stringify` nel frame e quantizzazione della chroma che altera i colori.
- Misure min/gzip/Brotli di helper puro, scena minima, basic/slim/full/all e lazy
  con somma dei chunk. Confrontare con IMP-01/02; fissare budget dopo la baseline.
  Non imporre dipendenze generiche pesanti senza misurarne il costo e la licenza.
- Scoprire target con `pnpm nx show project <nome> --json`; eseguire test mirati
  via Nx, suite completa e lint/format. Prima di proporre commit vale anche
  `pnpm exec vitest` richiesto da AGENTS, con esecuzione finita se parte in watch.
  Ricostruire tutti i downstream non CLI/non website/non palette come da AGENTS,
  più ogni CLI/schema/generatore modificato; chiudere con `pnpm run build:ci`.
  Su questo sandbox usare i workaround Nx documentati nell'indice se necessari.

## Documentazione e definizione di completamento

- [ ] `IOklch` e animazione h/c/l sono l'unico modello canonico delle particelle;
      ogni uso HSL/RGB residuo è intenzionale e classificato.
- [ ] Tutti i formati storici di valore restano coperti dai manager; schema nuovo,
      alpha e conversione/migrazione dei manager esterni sono documentati.
- [ ] Wide gamut attraversa parsing, stato, modifier e output senza clipping
      anticipato; P3 SDR verificato separatamente da HDR e float16.
- [ ] Decisioni HDR e gamut mapping implementate e provate; nessuna equivalenza
      presunta fra coordinate sRGB/P3 o fra wide gamut e luminanza assoluta.
- [ ] Matrice di tutti i pacchetti coinvolti chiusa con esiti, non solo compilazione.
- [ ] Test numerici/browser, benchmark e budget superati; eventuali verifiche
      non eseguibili restano gate aperti con riproduzione e ambiente richiesto.
- [ ] Aggiornati `markdown/Color.md`, opzioni paint/color e plugin colors, API docs,
      schema, demo, preset, wrapper e generatori interessati, changelog breaking e
      guida v4 → v5 con esempi prima/dopo per custom manager, animazioni e offset.
- [ ] `V5-COLOR-DECISIONS.md` e `V5-COLOR-REPORT.md` raccolti dal gate 10.

Questo piano autorizza la preparazione del lavoro; non dichiara già disponibili
le API proposte, né miglioramenti di fedeltà/prestazioni già misurati.

## Riferimenti tecnici

Consultati il 2026-11-06; fissare la revisione usata nelle fixture di implementazione.

- [CSS Color 4 — Oklab/OKLCH](https://www.w3.org/TR/css-color-4/#ok-lab),
  [conversioni](https://www.w3.org/TR/css-color-4/#color-conversion-code),
  [interpolazione](https://www.w3.org/TR/css-color-4/#interpolation) e
  [gamut mapping](https://www.w3.org/TR/css-color-4/#gamut-mapping).
- [WHATWG HTML — Canvas color spaces](https://html.spec.whatwg.org/multipage/canvas.html#colour-spaces-and-colour-space-conversion)
  e [impostazioni del contesto](https://html.spec.whatwg.org/multipage/canvas.html#concept-canvas-settings).
- [Web Platform Tests — CSS color](https://github.com/web-platform-tests/wpt/tree/master/css/css-color)
  e [wide gamut canvas](https://github.com/web-platform-tests/wpt/tree/master/html/canvas/element/wide-gamut-canvas).
