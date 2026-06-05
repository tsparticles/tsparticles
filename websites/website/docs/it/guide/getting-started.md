# Per iniziare

tsParticles è una libreria JavaScript/TypeScript per creare animazioni di particelle, coriandoli, fuochi d'artificio e molto altro. Funziona in qualsiasi browser moderno ed è disponibile sia come pacchetto npm sia via CDN con tag `<script>`.

## Architettura: engine + bundle

`@tsparticles/engine` da solo **non fa nulla di visibile**. Contiene solo il motore interno (loop di animazione, canvas, gestione eventi) ma **nessuna forma, nessuna interazione, nessun effetto visivo**. Per vedere qualcosa devi caricare almeno un **bundle** o dei **plugin individuali**.

| Concetto | Ruolo |
|---|---|
| `@tsparticles/engine` | Motore base. Esporta `tsParticles`, i tipi, le opzioni. Da solo non disegna nulla. |
| Bundle (`@tsparticles/basic`, `@tsparticles/slim`, ecc.) | Pacchetto preassemblato che registra forme, interazioni e updater sull'engine. |
| Plugin individuali (`@tsparticles/shape-circle`, `@tsparticles/updater-opacity`, ecc.) | Pacchetti singoli da combinare a piacere per un bundle custom. |

## Scegli il tuo percorso

### Percorso A — npm/pnpm/yarn (progetti moderni con bundler)

Installa il motore + un bundle:

```bash
pnpm add @tsparticles/engine @tsparticles/slim
```

Poi nel tuo codice:

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

(async () => {
  // 1. Registra tutte le funzionalità del bundle slim sull'engine
  await loadSlim(tsParticles);

  // 2. Crea l'animazione
  await tsParticles.load({
    id: "tsparticles",       // ID del contenitore HTML
    options: {
      background: {
        color: "#0b1020",
      },
      particles: {
        number: { value: 80 },
        links: {
          enable: true,
          distance: 150,
          opacity: 0.35,
        },
        move: {
          enable: true,
          speed: 2,
        },
      },
    },
  });
})();
```

Il contenitore HTML:

```html
<div id="tsparticles"></div>
```

### Percorso B — CDN con tag `<script>` (nessun bundler, vanilla HTML)

Carica prima l'engine, poi il bundle. I file CDN espongono tutto su `window` — non serve `import`.

```html
<!DOCTYPE html>
<html>
<head>
  <!-- tsParticles engine -->
  <script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
  <!-- Bundle slim (espone loadSlim globalmente) -->
  <script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
</head>
<body>
  <div id="tsparticles"></div>
  <script>
    (async () => {
      // loadSlim è disponibile globalmente dopo aver caricato il bundle CDN
      await loadSlim(tsParticles);

      await tsParticles.load({
        id: "tsparticles",
        options: {
          background: { color: "#0b1020" },
          particles: {
            number: { value: 80 },
            links: { enable: true, distance: 150 },
            move: { enable: true, speed: 2 },
          },
        },
      });
    })();
  </script>
</body>
</html>
```

> **Nota**: anche con i bundle CDN devi chiamare `loadSlim(tsParticles)` (o `loadBasic` / `loadFull` / `loadAll`) prima di usare `tsParticles.load()`. I bundle CDN espongono la funzione loader globalmente ma non la chiamano automaticamente.

Lo stesso schema vale per `@tsparticles/basic` → `loadBasic`, `tsparticles` → `loadFull`, `@tsparticles/all` → `loadAll`.

### Percorso C — Bundle specializzati con API dedicata (coriandoli, fuochi, particelle)

Alcuni bundle hanno una loro API semplificata, senza passare da `tsParticles.load()`:

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@4/tsparticles.confetti.bundle.min.js"></script>
</head>
<body>
  <script>
    confetti({ particleCount: 100, spread: 70 });
  </script>
</body>
</html>
```

Stessa cosa per `fireworks()`, `particles()`, `ribbons()`.

## Quale bundle scegliere?

| Bundle | npm | Quando usarlo |
|---|---|---|
| `@tsparticles/basic` | `loadBasic(tsParticles)` | Minimo indispensabile: cerchi, movimento, opacità, dimensione. |
| `@tsparticles/slim` | `loadSlim(tsParticles)` | **Scelta consigliata per la maggior parte dei progetti.** Aggiunge interazioni (click/hover), collegamenti tra particelle, immagini, stelle, poligoni. |
| `tsparticles` | `loadFull(tsParticles)` | Set completo di funzionalità ufficiali: emettitori, assorbitori, forme testo, rollio, wobble, trail. |
| `@tsparticles/all` | `loadAll(tsParticles)` | **Tutto** il repository: ogni forma, interazione, effetto, easing, percorso, esportazione. Solo per prototipazione. |
| `@tsparticles/confetti` | `confetti(opzioni)` | Coriandoli in una chiamata. API dedicata. |
| `@tsparticles/fireworks` | `fireworks(opzioni)` | Fuochi d'artificio in una chiamata. API dedicata. |
| `@tsparticles/particles` | `particles(opzioni)` | Sfondo particellare semplificato. API dedicata. |
| `@tsparticles/ribbons` | `ribbons(opzioni)` | Effetto ribbon/nastri. API dedicata. |

Maggiori dettagli: [`/guide/bundles`](/it/guide/bundles).

## Usare preset predefiniti

Il pacchetto `@tsparticles/configs` contiene decine di configurazioni pronte (assorbitori, bolle, neve, stelle, gravity, collisions, ecc.).

```bash
pnpm add @tsparticles/engine @tsparticles/slim @tsparticles/configs
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import "@tsparticles/configs";

await loadSlim(tsParticles);

// Carica un preset per nome
await tsParticles.load({
  id: "tsparticles",
  options: { preset: "snow" },
});
```

Con CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/configs@4/tsparticles.configs.min.js"></script>
<script>
  (async () => {
    await loadSlim(tsParticles);
    tsParticles.load({ id: "tsparticles", options: { preset: "snow" } });
  })();
</script>
```

## Riferimenti rapidi

- Documentazione delle opzioni: [`/options/`](/it/options/)
- Guida ai bundle: [`/guide/bundles`](/it/guide/bundles)
- Catalogo preset: [`/demos/presets`](/it/demos/presets)
- Catalogo palette: [`/demos/palettes`](/it/demos/palettes)
- Catalogo forme: [`/demos/shapes`](/it/demos/shapes)
- Wrapper per framework: [`/guide/wrappers`](/it/guide/wrappers)
- Formati colore: [`/guide/color-formats`](/it/guide/color-formats)
- Ciclo di vita del contenitore: [`/guide/container-lifecycle`](/it/guide/container-lifecycle)
- Plugin e personalizzazione: [`/guide/plugins-customization`](/it/guide/plugins-customization)

## Risoluzione dei problemi

| Problema | Causa probabile | Soluzione |
|---|---|---|
| Schermo bianco, nessuna particella | `#tsparticles` non esiste nel DOM quando chiami `tsParticles.load()` | Verifica che il DIV sia presente prima dello script, oppure usa `DOMContentLoaded` |
| Schermo bianco, nessuna particella | Hai installato solo `@tsparticles/engine` | Devi installare anche un bundle (`@tsparticles/slim`) o dei plugin, perché l'engine da solo non ha forme da disegnare |
| Errore "loadBasic/loadSlim/loadFull is not a function" | Bundle non installato o import sbagliato | `pnpm add @tsparticles/slim` e importa `{ loadSlim }` |
| Le particelle non si muovono | `move.enable` non è impostato a `true` | Aggiungi `move: { enable: true, speed: 2 }` |
| Funzionalità mancante (es. collegamenti, collisioni) | Il bundle scelto non include quella funzionalità | Passa a un bundle più ricco (`@tsparticles/slim` o `tsparticles`) o installa il plugin specifico |
| Errori di tipo TypeScript | Versioni dei pacchetti non allineate | Mantieni engine e bundle sulla stessa versione maggiore/minore |
