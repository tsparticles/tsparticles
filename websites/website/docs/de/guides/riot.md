---
title: Riot-Anleitung
description: Vollständige Anleitung zur Integration von tsParticles mit Riot.js-Komponenten.
---

# Riot-Anleitung

## Inhaltsverzeichnis

1. [Installation](#installation)
2. [Engine-Initialisierung](#engine-initialization)
3. [Grundlegende Verwendung](#basic-usage)
4. [Bedingtes Rendern](#conditional-rendering)
5. [Preset-Verwendung](#preset-usage)
6. [Benutzerdefinierte Konfiguration](#custom-configuration)
7. [Vollständige Komponente](#full-component)

---

## Installation

Installieren Sie den Riot-Wrapper und die tsParticles-Engine über npm:

```bash
npm install @tsparticles/riot tsparticles
```

Optional Preset-Konfigurationen für die schnelle Einrichtung installieren:

```bash
npm install @tsparticles/configs
npm install @tsparticles/slim
```

---

## Engine-Initialisierung

Der Riot-Wrapper exportiert eine `initParticlesEngine`-Funktion. Rufen Sie sie im `onBeforeMount`-Lebenszyklus-Hook Ihrer Komponente auf, um die Engine vorzubereiten, bevor die Partikel-Komponente rendert.

```html
<my-component>
  <script>
    import { initParticlesEngine } from "@tsparticles/riot";
    import { loadSlim } from "@tsparticles/slim";

    export default {
      onBeforeMount() {
        if (typeof window !== "undefined") {
          initParticlesEngine(async (engine) => {
            await loadSlim(engine);
          });
        }
      },
    };
  </script>
</my-component>
```

Die Engine initialisiert einmal und wird von allen `<riot-particles>`-Instanzen in Ihrer App gemeinsam genutzt.

---

## Grundlegende Verwendung

Nach der Initialisierung der Engine verwenden Sie die `<riot-particles>`-Komponente in Ihrer Vorlage. Übergeben Sie die Konfiguration als JSON-stringifiziertes Optionsobjekt oder als Referenz auf eine Eigenschaft Ihrer Komponente.

```html
<my-component>
  <riot-particles id="tsparticles" options="{particlesConfig}" />

  <script>
    import RiotParticles, { initParticlesEngine } from "@tsparticles/riot";
    import { loadSlim } from "@tsparticles/slim";

    export default {
      particlesConfig: {
        fpsLimit: 60,
        particles: {
          number: { value: 80 },
          color: { value: "#00d4ff" },
          shape: { type: "circle" },
          opacity: { value: 0.6 },
          size: { value: { min: 2, max: 5 } },
          links: {
            enable: true,
            distance: 150,
            color: "#00d4ff",
            opacity: 0.3,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1.5,
            direction: "none",
            random: true,
            outModes: { default: "bounce" },
          },
        },
        background: { color: "#0d1117" },
      },
      onBeforeMount() {
        if (typeof window !== "undefined") {
          initParticlesEngine(async (engine) => {
            await loadSlim(engine);
          });
        }
      },
    };
  </script>
</my-component>
```

---

## Bedingtes Rendern

Verwenden Sie Riot's `if={}`-Direktive mit einer Zustandseigenschaft, um das Rendern der Partikel-Komponente zu verzögern, bis die Engine initialisiert ist. Dies vermeidet Layout-Verschiebungen und stellt sicher, dass die Komponente eine bereite Engine erhält.

```html
<my-component>
  <riot-particles if="{state.particlesInitialized}" id="tsparticles" options="{particlesConfig}" />

  <script>
    import RiotParticles, { initParticlesEngine } from "@tsparticles/riot";
    import { loadSlim } from "@tsparticles/slim";

    export default {
      particlesConfig: {
        particles: {
          number: { value: 50 },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: { value: 0.6 },
          size: { value: { min: 1, max: 4 } },
          move: { enable: true, speed: 1, outModes: { default: "bounce" } },
        },
        background: { color: "#1a1a2e" },
      },
      onBeforeMount() {
        this.state.particlesInitialized = false;
        if (typeof window !== "undefined") {
          initParticlesEngine(async (engine) => {
            await loadSlim(engine);
          }).then(() => {
            this.update({ particlesInitialized: true });
          });
        }
      },
    };
  </script>
</my-component>
```

Der Aufruf von `this.update()` löst ein erneutes Rendern aus, sodass das `<riot-particles>`-Tag erscheint, sobald das Promise aufgelöst wird.

---

## Preset-Verwendung

Das Paket `@tsparticles/configs` bietet vorgefertigte Konfigurationen für gängige Effekte wie Konfetti, Feuerwerk, Schnee und Sterne. Verwenden Sie sie direkt als Ihr Optionsobjekt.

```html
<my-component>
  <riot-particles if="{state.particlesInitialized}" id="tsparticles" options="{particlesConfig}" />

  <script>
    import RiotParticles, { initParticlesEngine } from "@tsparticles/riot";
    import { loadFull } from "tsparticles";
    import configs from "@tsparticles/configs";

    export default {
      particlesConfig: configs.basic,
      onBeforeMount() {
        this.state.particlesInitialized = false;
        if (typeof window !== "undefined") {
          initParticlesEngine(async (engine) => {
            await loadFull(engine);
          }).then(() => {
            this.update({ particlesInitialized: true });
          });
        }
      },
    };
  </script>
</my-component>
```

Verfügbare Presets umfassen `basic`, `confetti`, `fireworks`, `snow`, `stars` und mehr. Jedes Preset erfordert, dass das entsprechende Preset-Paket im Engine-Callback geladen wird. Zum Beispiel erfordert `configs.fireworks` `loadFireworksPreset`.

---

## Benutzerdefinierte Konfiguration

Erstellen Sie eine benutzerdefinierte Konfiguration mit Interaktivität, mehreren Formen und erweiterten Animationsoptionen.

```html
<my-component>
  <riot-particles if="{state.particlesInitialized}" id="tsparticles" options="{particlesConfig}" />

  <script>
    import RiotParticles, { initParticlesEngine } from "@tsparticles/riot";
    import { loadSlim } from "@tsparticles/slim";

    export default {
      particlesConfig: {
        fullScreen: { enable: true, zIndex: -1 },
        fpsLimit: 60,
        particles: {
          number: {
            value: 60,
            density: { enable: true, width: 800, height: 800 },
          },
          color: {
            value: ["#ff6b6b", "#feca57", "#48dbfb", "#ff9ff3", "#54a0ff"],
          },
          shape: {
            type: ["circle", "triangle", "polygon"],
            options: {
              polygon: { sides: 6 },
            },
          },
          opacity: { value: { min: 0.4, max: 0.8 } },
          size: { value: { min: 3, max: 8 } },
          links: {
            enable: true,
            distance: 200,
            color: "#ffffff",
            opacity: 0.15,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            outModes: { default: "out" },
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "attract" },
            onClick: { enable: true, mode: "repulse" },
          },
          modes: {
            attract: { distance: 200, duration: 0.4, factor: 1 },
            repulse: { distance: 200, duration: 0.4 },
          },
        },
        background: { color: "#0f0f23" },
      },
      onBeforeMount() {
        this.state.particlesInitialized = false;
        if (typeof window !== "undefined") {
          initParticlesEngine(async (engine) => {
            await loadSlim(engine);
          }).then(() => {
            this.update({ particlesInitialized: true });
          });
        }
      },
    };
  </script>
</my-component>
```

---

## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## Vollständige Komponente

Nachfolgend eine vollständige `.riot`-Datei, die alles zusammenführt: Engine-Initialisierung in `onBeforeMount`, bedingtes Rendern mit Zustand, eine umfangreiche Konfiguration mit Interaktivität und einen `particlesLoaded`-Callback über die integrierte Unterstützung für geladene Ereignisse der Komponente.

```html
<my-component>
  <div class="particles-wrapper">
    <h1>tsParticles + Riot.js</h1>

    {#if state.particlesInitialized}
    <riot-particles id="tsparticles" options="{particlesConfig}" />
    {:else}
    <p>Lade Partikel-Engine...</p>
    {/if}
  </div>

  <script>
    import RiotParticles, { initParticlesEngine } from "@tsparticles/riot";
    import { loadSlim } from "@tsparticles/slim";

    export default {
      state: {
        particlesInitialized: false,
      },
      particlesConfig: {
        fullScreen: { enable: true, zIndex: -1 },
        fpsLimit: 60,
        particles: {
          number: { value: 80, density: { enable: true } },
          color: { value: "#6366f1" },
          shape: { type: "circle" },
          opacity: { value: { min: 0.3, max: 0.7 } },
          size: { value: { min: 2, max: 6 } },
          links: {
            enable: true,
            distance: 160,
            color: "#6366f1",
            opacity: 0.25,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1.2,
            direction: "none",
            random: false,
            straight: false,
            outModes: { default: "bounce" },
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "grab" },
            onClick: { enable: true, mode: "push" },
          },
          modes: {
            grab: { distance: 180, links: { opacity: 0.6 } },
            push: { quantity: 3 },
          },
        },
        background: { color: "#0a0a1a" },
      },
      onBeforeMount() {
        if (typeof window !== "undefined") {
          initParticlesEngine(async (engine) => {
            await loadSlim(engine);
          }).then(() => {
            this.update({ particlesInitialized: true });
          });
        }
      },
    };
  </script>

  <style scoped>
    .particles-wrapper {
      position: relative;
      min-height: 100vh;
    }
    .particles-wrapper h1 {
      position: relative;
      z-index: 1;
      color: #fff;
      text-align: center;
      padding-top: 2rem;
    }
    .particles-wrapper p {
      position: relative;
      z-index: 1;
      color: #aaa;
      text-align: center;
    }
  </style>
</my-component>
```

---

Sie haben jetzt alles, was Sie benötigen, um tsParticles in eine Riot.js-Anwendung zu integrieren. Jedes Beispiel ist in sich geschlossen und kann direkt in Ihr Projekt kopiert werden.
