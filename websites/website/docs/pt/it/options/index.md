# Riferimento Opzioni

Le opzioni di `tsParticles` sono molto estese: questa pagina e una mappa pratica prima di entrare nei singoli sotto-parametri.

## Scegli il tuo percorso di configurazione

- **Risultato visivo rapido**: parti da un preset e sovrascrivi i campi chiave.
- **Controllo completo**: definisci manualmente `particles`, `interactivity` e `background`.
- **Approccio config-first**: parti da `@tsparticles/configs` e poi affina passo dopo passo.

## Docs rapide (locali)

- [`Background & Canvas`](/it/options/background)
- [`Background Mask`](/it/options/background-mask)
- [`Full Screen`](/it/options/fullscreen)
- [`Motion`](/it/options/motion)
- [`Manual Particles`](/it/options/manual-particles)
- [`Themes`](/it/options/themes)
- [`Particles`](/it/options/particles)
- [`Particles Number`](/it/options/particles-number)
- [`Particles Move`](/it/options/particles-move)
- [`Particles Links`](/it/options/particles-links)
- [`Particles Palette`](/it/options/particles-palette)
- [`Particles Shape`](/it/options/particles-shape)
- [`Particles Collisions`](/it/options/particles-collisions)
- [`Particles Life`](/it/options/particles-life)
- [`Particles Orbit`](/it/options/particles-orbit)
- [`Particles Roll`](/it/options/particles-roll)
- [`Particles Rotate`](/it/options/particles-rotate)
- [`Interactivity`](/it/options/interactivity)
- [`Interactivity Click`](/it/options/interactivity-click)
- [`Interactivity Hover`](/it/options/interactivity-hover)
- [`Interactivity Div`](/it/options/interactivity-div)
- [`Interactivity Events`](/it/options/interactivity-events)
- [`Interactivity Modes`](/it/options/interactivity-modes)
- [`Plugin: Absorbers`](/it/options/plugin-absorbers)
- [`Plugin: Emitters`](/it/options/plugin-emitters)
- [`Plugin: Infection`](/it/options/plugin-infection)
- [`Plugin: Polygon Mask`](/it/options/plugin-polygon-mask)
- [`Performance Guide`](/it/options/performance)

## Pagine di approfondimento Particles

- [`Particles Bounce`](/it/options/particles-bounce)
- [`Particles Color`](/it/options/particles-color)
- [`Particles Destroy`](/it/options/particles-destroy)
- [`Particles Group`](/it/options/particles-group)
- [`Particles Opacity`](/it/options/particles-opacity)
- [`Particles Palette`](/it/options/particles-palette)
- [`Particles Repulse`](/it/options/particles-repulse)
- [`Particles Shadow`](/it/options/particles-shadow)
- [`Particles Size`](/it/options/particles-size)
- [`Particles Stroke`](/it/options/particles-stroke)
- [`Particles Tilt`](/it/options/particles-tilt)
- [`Particles Twinkle`](/it/options/particles-twinkle)
- [`Particles Wobble`](/it/options/particles-wobble)
- [`Particles ZIndex`](/it/options/particles-zindex)

## Dove trovare la documentazione di riferimento

- Documentazione opzioni principali: [`tsparticles/markdown/Options.md`](https://github.com/tsparticles/tsparticles/blob/main/markdown/Options.md)
- Pagine opzioni dettagliate: [`tsparticles/markdown/Options/`](https://github.com/tsparticles/tsparticles/tree/main/markdown/Options)
- Interfacce TypeScript: [`tsparticles/engine/src/Options/Interfaces`](https://github.com/tsparticles/tsparticles/tree/main/engine/src/Options/Interfaces)

## Opzioni root piu usate

- `background`
- `fullScreen`
- `interactivity`
- `particles`
- `detectRetina`
- `preset`
- `responsive`

## Sezioni piu usate

- `background`: sfondo canvas e basi del masking.
- `particles.number`: quantita e densita.
- `particles.move`: velocita, direzione e out modes.
- `particles.shape`: circle, polygon, image, emoji e forme custom.
- `particles.palette`: cambia rapidamente set di colori coordinati.
- `interactivity`: modalita hover/click ed effetti esterni.
- `detectRetina`: compromesso qualita/performance su schermi ad alta densita.

## Mappa particles (vista nidificata)

Usa questo albero rapido come guida di navigazione prima di aprire le singole pagine:

```text
particles
|- number
|- color
|- shape
|- size
|- opacity
|- move
|- links
|- collisions
|- life
|- destroy
|- group
|- orbit
|- repulse
|- roll
|- rotate
|- shadow
|- stroke
|- tilt
|- twinkle
|- wobble
|- zIndex
`- palette
```

Apri prima i documenti root, poi gli approfondimenti:

- Base: [`Particles`](/it/options/particles)
- Approfondimenti: [`Particles Number`](/it/options/particles-number), [`Particles Move`](/it/options/particles-move), [`Particles Links`](/it/options/particles-links)

## Workflow sicuro per le opzioni

1. Parti da una configurazione funzionante presa da demo o preset.
2. Modifica una sezione per volta.
3. Valida con TypeScript (`IOptions`) nel codice applicativo.
4. Mantieni le opzioni di produzione in file JSON dedicati.

## Esempio minimo tipizzato

```ts
import type { ISourceOptions } from "@tsparticles/engine";

export const particlesOptions: ISourceOptions = {
  fpsLimit: 60,
  particles: {
    number: { value: 70 },
    move: { enable: true, speed: 1.5 },
  },
};
```

## Guardrail performance

- Preferisci `@tsparticles/slim` salvo esigenze di plugin avanzati.
- Mantieni il numero di particelle proporzionato all'area del contenitore.
- Profila su dispositivi reali prima di aggiungere interazioni pesanti.

## Riferimenti correlati

- Docs pacchetto config: <https://github.com/tsparticles/tsparticles/blob/main/utils/configs/README.md>
- Cartella preset: <https://github.com/tsparticles/tsparticles/tree/main/presets>
- Cartella palette: <https://github.com/tsparticles/tsparticles/tree/main/palettes>

Per i dettagli completi su ogni sotto-opzione, consulta anche le pagine sorgente in `tsparticles/markdown/Options` linkate sopra.
