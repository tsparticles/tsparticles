# jQuery-Integration

Integrieren Sie tsParticles in Ihre jQuery-basierten Projekte mit dem offiziellen jQuery-Plugin-Wrapper.

## Installation

### Via CDN

Binden Sie jQuery, tsParticles und das jQuery-Plugin über Script-Tags ein:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles@4/tsparticles.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/jquery@4/tsparticles.jquery.min.js"></script>
```

---

### Via npm + Build

Installieren Sie die erforderlichen Pakete:

```bash
npm install jquery @tsparticles/jquery tsparticles
```

Importieren Sie in Ihr Projekt:

```javascript
import $ from "jquery";
import "@tsparticles/jquery";
```

## Engine-Initialisierung

Bevor Partikel gerendert werden können, muss die tsParticles-Engine mit den benötigten Funktionen initialisiert werden. Dies geschieht über `$.particles.init`:

```javascript
(async () => {
  await $.particles.init(async (engine) => {
    const { loadFull } = await import("tsparticles");
    await loadFull(engine);
  });
})();
```

> **Warum wird dies benötigt?** tsParticles verwendet eine modulare Architektur. `loadFull` registriert alle integrierten Formen, Interaktionen und Updater. Sie können kleinere Bundles (z. B. `tsparticles-slim`) importieren, um die Bundle-Größe zu reduzieren.

## Grundlegende Verwendung

Sobald die Engine initialisiert und das DOM bereit ist, wählen Sie ein Container-Element aus und rufen `.particles().load()` auf:

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

Das Container-Element muss im DOM vorhanden sein:

```html
<div id="tsparticles"></div>
```

## Benutzerdefinierte Konfiguration

Die `.load()`-Methode akzeptiert das vollständige `ISourceOptions`-Objekt. Hier ein umfassendes Beispiel:

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

## Preset-Laden

Wenn Sie ein Preset-Paket installiert haben (z. B. `tsparticles-preset-stars`), laden Sie es während der Engine-Initialisierung und referenzieren Sie es in der Konfiguration:

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

## Ereignisbehandlung und Container-Steuerung

`.particles()` gibt eine jQuery-Plugin-Instanz zurück. So greifen Sie auf den zugrunde liegenden tsParticles-`Container` zu und rufen Methoden wie `play()`, `pause()` oder `destroy()` auf:

```javascript
const $container = $("#tsparticles");

// Partikel laden
$container.particles().load({
  /* Optionen */
});

// Nach einigen Sekunden pausieren/fortsetzen
setTimeout(() => {
  const container = $container.particles().getContainer();
  container?.pause();
}, 5000);
```

## Vollständiges Beispiel

Nachfolgend eine vollständige, in sich geschlossene HTML-Seite, die tsParticles via CDN lädt und eine Partikelszene mit interaktiven Effekten rendert:

```html
<!DOCTYPE html>
<html lang="de">
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

## API-Referenz

| Methode                            | Beschreibung                                                        |
| ---------------------------------- | ------------------------------------------------------------------- |
| `$.particles.init(fn)`             | Engine mit einem Loader-Callback initialisieren                     |
| `$(el).particles()`                | Plugin-Instanz auf dem Element erstellen                            |
| `$(el).particles().load(opts)`     | Partikel-Konfiguration laden und starten                            |
| `$(el).particles().destroy()`      | Partikel-Instanz zerstören und aufräumen                            |
| `$(el).particles().getContainer()` | Zugrunde liegenden `Container` für imperative Steuerung zurückgeben |
