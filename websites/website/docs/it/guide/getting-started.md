# Per iniziare

Questo percorso è la configurazione affidabile più rapida per `tsParticles` nel 2026.

## Lista di controllo rapida

1. Installa `@tsparticles/engine`.
2. Scegli un percorso di runtime (`@tsparticles/slim`, `@tsparticles/all`, API mirate come `@tsparticles/particles` o solo pacchetti personalizzati).
3. Carica il tuo pacchetto una volta.
4. Inizia con opzioni manuali, un oggetto di configurazione o una preimpostazione.

## 1) Installa il motore + un preset bundle

Utilizza `@tsparticles/engine` più `@tsparticles/slim` per un ottimo equilibrio predefinito tra dimensioni e funzionalità.

```bash
pnpm add @tsparticles/engine @tsparticles/slim
```

Hai bisogno di collegamenti CDN, varianti `npm`/`yarn` o esempi di `require(...)`?

- Vedi [`/guide/installation`](/it/guide/installation).

## 2) Crea un contenitore in HTML

```html
<div id="tsparticles"></div>
```

## 3) Inizializza tsParticles

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const options = {
  background: {
    color: "#0b1020",
  },
  particles: {
    number: {
      value: 80,
    },
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
};

(async () => {
  await loadSlim(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options,
  });
})();
```

## 4) Scegli il pacchetto giusto

- `@tsparticles/slim`: la maggior parte delle app dovrebbe iniziare qui.
- `@tsparticles/basic`: set di funzionalità più piccolo per configurazioni molto leggere.
- `@tsparticles/all`: tutto incluso, più semplice per una prototipazione veloce.

Se hai bisogno di un'API mirata invece della configurazione diretta di `tsParticles`:

- `@tsparticles/particles`: API di sfondo delle particelle semplificata
- `@tsparticles/confetti`: API coriandoli con una sola chiamata
- `@tsparticles/fireworks`: API fuochi d'artificio con una sola chiamata

## 5) Usa preimpostazioni/configurazioni quando hai bisogno di velocità

Se preferisci gli effetti predefiniti:

```bash
pnpm add @tsparticles/configs
```

Quindi carica una configurazione per chiave, come l'[`demo/vite` app](https://github.com/tsparticles/tsparticles/blob/main/demo/vite/src/main.ts).

Se preferisci configurazioni basate sul nome preimpostato, utilizza il catalogo ufficiale dei preimpostati in [`/demos/presets`](/it/demos/presets).

## Mappa della documentazione rapida

- Opzioni root: [`/options/`](/it/options/)
- Riferimento wrapper: [`/guide/wrappers`](/it/guide/wrappers)
- Catalogo preimpostazioni: [`/demos/presets`](/it/demos/presets)
- Catalogo tavolozze: [`/demos/palettes`](/it/demos/palettes)
- Catalogo forme: [`/demos/shapes`](/it/demos/shapes)
- Migrazione da particles.js: [`/migrations/particles-js`](/it/migrations/particles-js)
- Formati colore: [`/guide/color-formats`](/it/guide/color-formats)
- Ciclo di vita del contenitore: [`/guide/container-lifecycle`](/it/guide/container-lifecycle)
- Plugin e personalizzazione: [`/guide/plugins-customization`](/it/guide/plugins-customization)

## Risoluzione dei problemi

- Schermata vuota: verificare che `#tsparticles` esista prima di chiamare `tsParticles.load`.
- Funzionalità mancante: probabilmente avrai bisogno di un altro plugin/pacchetto (forma, interazione, aggiornamento).
- Errori di digitazione sulle opzioni: mantieni i tuoi pacchetti allineati alla stessa versione maggiore/minore.
