# Web Components

Verwenden Sie tsParticles mit nativen Web Components über das `@tsparticles/webcomponents`-Paket. Dieser Ansatz erfordert kein Framework — nur Vanilla-JavaScript und benutzerdefinierte Elemente.

## Installation

### Via CDN

Binden Sie den tsParticles-Kern und das Web Components-Bundle ein:

```html
<script src="https://cdn.jsdelivr.net/npm/tsparticles@4/tsparticles.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/webcomponents@4/tsparticles.webcomponents.min.js"></script>
```

### Via npm + Build

```bash
npm install @tsparticles/webcomponents tsparticles
```

Dann in Ihr JavaScript-Bundle importieren:

```javascript
import { initParticlesEngine, defineParticlesElement } from "@tsparticles/webcomponents";
```

## Engine-Initialisierung

Bevor das `<web-particles>`-Element rendern kann, muss die Engine mit den benötigten Funktionen initialisiert werden. Rufen Sie `initParticlesEngine` mit einem Callback auf, der die gewünschten Plugins lädt:

```javascript
import { initParticlesEngine } from "@tsparticles/webcomponents";

const { loadFull } = await import("tsparticles");

await initParticlesEngine(async (engine) => {
  await loadFull(engine);
});
```

> **Warum `loadFull`?** Es registriert alle integrierten Formen (Kreis, Quadrat, Polygon, Bild usw.), Interaktionen (Hover, Klick) und Updater (Deckkraft, Größe, Farbe usw.). Für ein kleineres Bundle verwenden Sie `tsparticles-slim` oder wählen einzelne Plugins aus.

## Definieren des benutzerdefinierten Elements

Nach der Engine-Initialisierung registrieren Sie das `<web-particles>`-Element:

```javascript
import { defineParticlesElement } from "@tsparticles/webcomponents";

defineParticlesElement();
```

Dies registriert das `web-particles`-Tag bei der `CustomElementRegistry` des Browsers. Es ist sicher, es mehrfach aufzurufen — doppelte Registrierungen werden ignoriert.

## Grundlegende Verwendung

Sobald sowohl `initParticlesEngine` als auch `defineParticlesElement` ausgeführt wurden, verwenden Sie das Element direkt in HTML:

```html
<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>tsParticles Web Components</title>
  </head>
  <body>
    <web-particles id="tsparticles"></web-particles>

    <script type="module">
      import { initParticlesEngine, defineParticlesElement } from "@tsparticles/webcomponents";

      const { loadFull } = await import("tsparticles");

      await initParticlesEngine(async (engine) => {
        await loadFull(engine);
      });

      defineParticlesElement();

      const el = document.getElementById("tsparticles");
      el.options = {
        background: { color: "#0d47a1" },
        particles: {
          number: { value: 80 },
          links: { enable: true, color: "#ffffff" },
          move: { enable: true, speed: 2 },
        },
      };
    </script>
  </body>
</html>
```

## Benutzerdefinierte Konfiguration

Das `<web-particles>`-Element akzeptiert Konfiguration über die `options`-Eigenschaft (JavaScript-Objekt) oder über JSON im `options`-Attribut.

### Via JavaScript-Eigenschaft

```javascript
const el = document.querySelector("web-particles");
el.options = {
  background: { color: "#000000" },
  fpsLimit: 60,
  particles: {
    color: { value: ["#ff0000", "#00ff00", "#0000ff"] },
    links: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
    },
    move: {
      enable: true,
      speed: 3,
      outModes: "bounce",
    },
    number: { value: 60 },
    opacity: { value: 0.6 },
    shape: { type: ["circle", "square"] },
    size: { value: { min: 2, max: 6 } },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "repulse" },
      onClick: { enable: true, mode: "push" },
    },
    modes: {
      repulse: { distance: 200 },
      push: { quantity: 4 },
    },
  },
};
```

### Via HTML-Attribut (JSON)

```html
<web-particles
  id="tsparticles"
  options='{
    "background": { "color": "#0d47a1" },
    "particles": {
      "number": { "value": 50 },
      "links": { "enable": true, "color": "#ffffff" },
      "move": { "enable": true, "speed": 2 }
    }
  }'
></web-particles>
```

> Bei Verwendung des `options`-Attributs muss der Wert gültiges JSON sein. Für komplexe Konfigurationen wird die Eigenschaftszuweisung bevorzugt.

## Dynamische Erstellung

Sie können `<web-particles>`-Elemente vollständig in JavaScript erstellen und jederzeit zum DOM hinzufügen:

```javascript
import { initParticlesEngine, defineParticlesElement } from "@tsparticles/webcomponents";

const { loadFull } = await import("tsparticles");

await initParticlesEngine(async (engine) => {
  await loadFull(engine);
});

defineParticlesElement();

function createParticles(container, config) {
  const el = document.createElement("web-particles");
  el.id = "dynamic-particles";
  el.style.position = "absolute";
  el.style.width = "100%";
  el.style.height = "100%";
  el.style.top = "0";
  el.style.left = "0";
  el.options = config;
  container.appendChild(el);
  return el;
}

// Verwendung
const particles = createParticles(document.body, {
  background: { color: "#1a1a2e" },
  particles: {
    number: { value: 100 },
    links: { enable: true, color: "#e94560" },
    move: { enable: true, speed: 1 },
  },
});
```

## Erweitern des benutzerdefinierten Elements

Sie können `ParticlesElement` ableiten, um Ihr eigenes benutzerdefiniertes Element mit integrierter Konfiguration zu erstellen:

```javascript
import { initParticlesEngine, ParticlesElement } from "@tsparticles/webcomponents";

const { loadFull } = await import("tsparticles");

await initParticlesEngine(async (engine) => {
  await loadFull(engine);
});

class MyParticlesBackground extends ParticlesElement {
  constructor() {
    super();
    this.style.position = "fixed";
    this.style.top = "0";
    this.style.left = "0";
    this.style.width = "100%";
    this.style.height = "100%";
    this.style.zIndex = "-1";
  }

  connectedCallback() {
    this.options = {
      background: { color: "#0d47a1" },
      particles: {
        number: { value: 80 },
        links: { enable: true, color: "#ffffff" },
        move: { enable: true, speed: 2 },
      },
    };
    super.connectedCallback();
  }
}

customElements.define("my-particles-bg", MyParticlesBackground);
```

Verwendung:

```html
<my-particles-bg></my-particles-bg>
```

## Container-Zugriff und Steuerung

Das benutzerdefinierte Element stellt die tsParticles-`Container`-Instanz für die imperative Steuerung bereit:

```javascript
const el = document.querySelector("web-particles");

// Zugriff auf den Container (verfügbar nach connectedCallback)
const container = el.container;
container?.pause();
container?.play();

// Zerstören und aufräumen
el.dispose();
```

## Vollständiges Beispiel

Eine vollständige HTML-Seite mit dem Web Components-Modul und CDN-Skripten:

```html
<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>tsParticles Web Components Demo</title>
    <style>
      body {
        margin: 0;
        overflow: hidden;
      }
      web-particles {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
      .content {
        position: relative;
        z-index: 1;
        color: white;
        text-align: center;
        padding-top: 20vh;
        font-family: sans-serif;
      }
    </style>
  </head>
  <body>
    <div class="content">
      <h1>tsParticles + Web Components</h1>
      <p>Native benutzerdefinierte Elemente, kein Framework erforderlich.</p>
    </div>

    <web-particles id="tsparticles"></web-particles>

    <script type="module">
      import {
        initParticlesEngine,
        defineParticlesElement,
      } from "https://cdn.jsdelivr.net/npm/@tsparticles/webcomponents@4/tsparticles.webcomponents.min.js";

      const tsParticles = window.tPparticles;

      await initParticlesEngine(async (engine) => {
        await tsParticles.loadFull(engine);
      });

      defineParticlesElement();

      const el = document.getElementById("tsparticles");
      el.options = {
        background: { color: "#0d47a1" },
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
      };
    </script>
  </body>
</html>
```

## API-Referenz

| Export / Eigenschaft            | Typ                      | Beschreibung                                                          |
| ------------------------------- | ------------------------ | --------------------------------------------------------------------- |
| `initParticlesEngine(callback)` | `function`               | Initialisiert die tsParticles-Engine mit Plugin-Ladern                |
| `defineParticlesElement()`      | `function`               | Registriert das `<web-particles>`-Element                             |
| `ParticlesElement`              | `class`                  | Basisklasse, die Sie für benutzerdefinierte Elemente erweitern können |
| `element.options`               | `ISourceOptions`         | Partikel-Konfigurationsobjekt abrufen/setzen                          |
| `element.container`             | `Container \| undefined` | Nur-Lesen-Referenz auf den zugrunde liegenden `Container`             |
| `element.dispose()`             | `function`               | Zerstört die Partikel-Instanz und gibt Ressourcen frei                |
