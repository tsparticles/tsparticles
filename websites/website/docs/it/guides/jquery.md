# Integrazione jQuery

Integra tsParticles nei tuoi progetti basati su jQuery con il wrapper ufficiale del plugin jQuery.

## Installazione

### Via CDN

Includi jQuery, tsParticles e il plugin jQuery tramite tag script:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles@4/tsparticles.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/jquery@4/tsparticles.jquery.min.js"></script>
```

---

### Via npm + Build

Installa i pacchetti richiesti:

```bash
npm install jquery @tsparticles/jquery tsparticles
```

Importa nel tuo progetto:

```javascript
import $ from "jquery";
import "@tsparticles/jquery";
```

## Inizializzazione del Motore

Prima che le particelle possano essere renderizzate, il motore tsParticles deve essere inizializzato con le funzionalità necessarie. Questo avviene tramite `$.particles.init`:

```javascript
(async () => {
  await $.particles.init(async (engine) => {
    const { loadFull } = await import("tsparticles");
    await loadFull(engine);
  });
})();
```

> **Perché è necessario?** tsParticles usa un'architettura modulare. `loadFull` registra tutte le forme, interazioni e aggiornamenti integrati. Puoi importare bundle più piccoli (es. `tsparticles-slim`) per ridurre la dimensione del bundle.

## Utilizzo Base

Una volta che il motore è inizializzato e il DOM è pronto, seleziona un elemento contenitore e chiama `.particles().load()`:

```javascript
$(document).ready(async () => {
  await $.particles.init(async (engine) => {
    const { loadFull } = await import("tsparticles");
    await loadFull(engine);
  });

  $("#tsparticles")
    .particles()
    .load({
      background: {
        color: "#0d47a1",
      },
      particles: {
        number: { value: 80 },
        links: { enable: true, color: "#ffffff" },
        move: { enable: true },
      },
    });
});
```

L'elemento contenitore deve esistere nel DOM:

```html
<div id="tsparticles"></div>
```

## Configurazione Personalizzata

Il metodo `.load()` accetta l'oggetto `ISourceOptions` completo. Ecco un esempio esaustivo:

```javascript
$("#tsparticles")
  .particles()
  .load({
    background: {
      color: "#000000",
    },
    fpsLimit: 120,
    particles: {
      color: {
        value: ["#ff0000", "#00ff00", "#0000ff"],
      },
      move: {
        direction: "none",
        enable: true,
        outModes: "bounce",
        speed: 4,
      },
      number: {
        density: {
          enable: true,
        },
        value: 60,
      },
      opacity: {
        value: 0.6,
      },
      shape: {
        type: ["circle", "square", "triangle"],
      },
      size: {
        value: { min: 2, max: 8 },
      },
      links: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1,
      },
    },
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
        },
      },
    },
  });
```

## Caricamento Preset

Se hai installato un pacchetto preset (es. `tsparticles-preset-stars`), caricalo durante l'inizializzazione del motore e referenzialo nella configurazione:

```bash
npm install tsparticles-preset-stars
```

```javascript
(async () => {
  await $.particles.init(async (engine) => {
    const { loadStarsPreset } = await import("tsparticles-preset-stars");
    await loadStarsPreset(engine);
  });

  $("#tsparticles")
    .particles()
    .load({
      preset: "stars",
      background: { color: "#0d47a1" },
    });
})();
```

## Gestione Eventi e Controllo del Container

`.particles()` restituisce un'istanza del plugin jQuery. Per accedere al `Container` tsParticles sottostante e chiamare metodi come `play()`, `pause()` o `destroy()`:

```javascript
const $container = $("#tsparticles");

// Carica particelle
$container.particles().load({/* opzioni */});

// Play/pause dopo alcuni secondi
setTimeout(() => {
  const container = $container.particles().getContainer();
  container?.pause();
}, 5000);
```

## Esempio Completo

Ecco una pagina HTML completa e autonoma che carica tsParticles via CDN e renderizza una scena di particelle con effetti interattivi:

```html
<!DOCTYPE html>
<html lang="it">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>tsParticles + jQuery</title>
    <style>
      #tsparticles {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: #0d47a1;
      }
    </style>
  </head>
  <body>
    <div id="tsparticles"></div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/tsparticles@4/tsparticles.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/jquery@4/tsparticles.jquery.min.js"></script>
    <script>
      $(document).ready(async () => {
        await $.particles.init(async (engine) => {
          await tsParticles.loadFull(engine);
        });

        $("#tsparticles")
          .particles()
          .load({
            fpsLimit: 60,
            particles: {
              number: { value: 100 },
              color: { value: "#ffffff" },
              links: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
              },
              move: {
                enable: true,
                speed: 2,
                outModes: "out",
              },
              size: {
                value: { min: 1, max: 4 },
              },
            },
            interactivity: {
              events: {
                onHover: { enable: true, mode: "grab" },
                onClick: { enable: true, mode: "push" },
              },
              modes: {
                grab: { distance: 200, links: { opacity: 0.5 } },
                push: { quantity: 4 },
              },
            },
            background: { color: "#0d47a1" },
          });
      });
    </script>
  </body>
</html>
```

## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## Riferimento API

| Metodo                             | Descrizione                                                     |
| ---------------------------------- | --------------------------------------------------------------- |
| `$.particles.init(fn)`             | Inizializza il motore con una callback di caricamento           |
| `$(el).particles()`                | Crea un'istanza del plugin particelle sull'elemento             |
| `$(el).particles().load(opts)`     | Carica e avvia la configurazione delle particelle               |
| `$(el).particles().destroy()`      | Distrugge l'istanza delle particelle e pulisce                  |
| `$(el).particles().getContainer()` | Restituisce il `Container` sottostante per controllo imperativo |
