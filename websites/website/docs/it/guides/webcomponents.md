# Web Components

Usa tsParticles con Web Components nativi tramite il pacchetto `@tsparticles/webcomponents`. Questo approccio non richiede framework — solo JavaScript puro e elementi personalizzati.

## Installazione

### Via CDN

Includi il core tsParticles e il bundle Web Components:

```html
<script src="https://cdn.jsdelivr.net/npm/tsparticles@4/tsparticles.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/webcomponents@4/tsparticles.webcomponents.min.js"></script>
```

### Via npm + Build

```bash
npm install @tsparticles/webcomponents tsparticles
```

Poi importa nel tuo bundle JavaScript:

```javascript
import { initParticlesEngine, defineParticlesElement } from "@tsparticles/webcomponents";
```

## Inizializzazione del Motore

Prima che l'elemento `<web-particles>` possa renderizzare, il motore deve essere inizializzato con le funzionalità necessarie. Chiama `initParticlesEngine` con una callback che carica i plugin desiderati:

```javascript
import { initParticlesEngine } from "@tsparticles/webcomponents";

const { loadFull } = await import("tsparticles");

await initParticlesEngine(async (engine) => {
  await loadFull(engine);
});
```

> **Perché `loadFull`?** Registra tutte le forme integrate (cerchio, quadrato, poligono, immagine, ecc.), interazioni (hover, click) e aggiornamenti (opacità, dimensione, colore, ecc.). Per un bundle più piccolo, usa `tsparticles-slim` o seleziona plugin individuali.

## Definire l'Elemento Personalizzato

Dopo l'inizializzazione del motore, registra l'elemento personalizzato `<web-particles>`:

```javascript
import { defineParticlesElement } from "@tsparticles/webcomponents";

defineParticlesElement();
```

Questo registra il tag `web-particles` con il `CustomElementRegistry` del browser. È sicuro chiamarlo più volte — le registrazioni duplicate vengono ignorate.

## Utilizzo Base

Una volta che sia `initParticlesEngine` che `defineParticlesElement` sono stati eseguiti, usa l'elemento direttamente in HTML:

```html
<!DOCTYPE html>
<html lang="it">
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

## Configurazione Personalizzata

L'elemento `<web-particles>` accetta la configurazione tramite la proprietà `options` (oggetto JavaScript) o tramite JSON nell'attributo `options`.

### Tramite Proprietà JavaScript

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

### Tramite Attributo HTML (JSON)

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

> Quando usi l'attributo `options`, il valore deve essere JSON valido. L'assegnazione tramite proprietà è preferibile per configurazioni complesse.

## Creazione Dinamica

Puoi creare elementi `<web-particles>` interamente in JavaScript e aggiungerli al DOM in qualsiasi momento:

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

// Utilizzo
const particles = createParticles(document.body, {
  background: { color: "#1a1a2e" },
  particles: {
    number: { value: 100 },
    links: { enable: true, color: "#e94560" },
    move: { enable: true, speed: 1 },
  },
});
```

## Estendere l'Elemento Personalizzato

Puoi creare una sottoclasse di `ParticlesElement` per creare il tuo elemento personalizzato con configurazione incorporata:

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

Utilizzo:

```html
<my-particles-bg></my-particles-bg>
```

## Accesso e Controllo del Container

L'elemento personalizzato espone l'istanza `Container` di tsParticles per il controllo imperativo:

```javascript
const el = document.querySelector("web-particles");

// Accedi al container (disponibile dopo connectedCallback)
const container = el.container;
container?.pause();
container?.play();

// Distruggi e pulisci
el.dispose();
```

## Esempio Completo

Una pagina HTML completa che usa il modulo Web Components con script CDN:

```html
<!DOCTYPE html>
<html lang="it">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Demo Web Components tsParticles</title>
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
      <p>Elementi personalizzati nativi, nessun framework richiesto.</p>
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

## Riferimento API

| Esportazione / Proprietà        | Tipo                     | Descrizione                                                |
| ------------------------------- | ------------------------ | ---------------------------------------------------------- |
| `initParticlesEngine(callback)` | `function`               | Inizializza il motore tsParticles con caricatori plugin    |
| `defineParticlesElement()`      | `function`               | Registra l'elemento personalizzato `<web-particles>`       |
| `ParticlesElement`              | `class`                  | Classe base che puoi estendere per elementi personalizzati |
| `element.options`               | `ISourceOptions`         | Legge/imposta l'oggetto di configurazione particelle       |
| `element.container`             | `Container \| undefined` | Riferimento in sola lettura al `Container` sottostante     |
| `element.dispose()`             | `function`               | Distrugge l'istanza delle particelle e libera risorse      |
