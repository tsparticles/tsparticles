---
title: Guida Ember
description: Guida completa per integrare tsParticles con applicazioni Ember.js.
---

# Guida Ember

## Indice dei Contenuti

1. [Installazione](#installazione)
2. [Inizializzazione del Motore](#inizializzazione-del-motore)
3. [Utilizzo Base](#utilizzo-base)
4. [Configurazione Personalizzata](#configurazione-personalizzata)
5. [Gestione Eventi](#gestione-eventi)
6. [Rendering Condizionale](#rendering-condizionale)
7. [Esempio TypeScript](#esempio-typescript)

---

## Installazione

Installa l'addon Ember e il motore tsParticles tramite ember-cli:

```bash
ember install @tsparticles/ember
```

Questo installerà l'addon e la sua dipendenza peer `tsparticles`. Puoi opzionalmente aggiungere pacchetti preset:

```bash
npm install @tsparticles/slim
```

---

## Inizializzazione del Motore

L'addon esporta un'utilità `initParticlesEngine` che chiami una volta a livello di applicazione. Riceve una callback asincrona dove caricare le funzionalità, i preset o le forme necessarie alla tua app.

```typescript
import { initParticlesEngine } from "@tsparticles/ember/utils/init-particles-engine";
import { loadFull } from "tsparticles";

// Chiama questa durante il bootstrap dell'applicazione
if (typeof window !== "undefined") {
  void initParticlesEngine(async (engine) => {
    await loadFull(engine);
  });
}
```

Le posizioni tipiche per questa chiamata sono l'hook `beforeModel` della route applicazione, il costruttore di un controller applicazione o un inizializzatore di istanza. Il singleton del motore viene inizializzato una volta e condiviso tra tutti i componenti `<Particles>` della tua app.

---

## Utilizzo Base

Dopo aver inizializzato il motore, usa il componente `<Particles>` in qualsiasi template. Passa la tua configurazione delle particelle tramite l'argomento `@options`.

```hbs
{{! app/templates/application.hbs }}

<Particles @options={{this.options}} />
```

```typescript
// app/controllers/application.ts
import Controller from "@ember/controller";
import type { ISourceOptions } from "@tsparticles/engine";

export default class ApplicationController extends Controller {
  options: ISourceOptions = {
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
  };
}
```

---

## Configurazione Personalizzata

Costruisci una configurazione più ricca con interattività, forme multiple e densità reattiva.

```typescript
import Controller from "@ember/controller";
import type { ISourceOptions } from "@tsparticles/engine";

export default class IndexController extends Controller {
  options: ISourceOptions = {
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
  };
}
```

```hbs
<Particles @options={{this.options}} />
```

---

## Gestione Eventi

Il componente `<Particles>` attiva un'azione `@particlesLoaded` quando il container ha terminato l'inizializzazione e il primo frame è stato renderizzato. Usala per accedere all'istanza `Container` per il controllo programmatico.

```typescript
import Controller from "@ember/controller";
import { action } from "@ember/object";
import type { Container, ISourceOptions } from "@tsparticles/engine";

export default class ApplicationController extends Controller {
  options: ISourceOptions = {
    /* ... */
  };

  @action
  loadedCallback(container: Container) {
    console.log("Particelle caricate", container?.id);

    // Esempio di controllo programmatico:
    setTimeout(() => {
      container.pause();
      console.log("Particelle in pausa dopo 5 secondi");
    }, 5000);
  }
}
```

```hbs
<Particles @options={{this.options}} @particlesLoaded={{this.loadedCallback}} />
```

Puoi anche usare il pattern callback inline con un helper di template se preferisci non definire un'azione separata.

---

## Rendering Condizionale

Usa l'helper `{{if}}` di Ember insieme a una proprietà `@tracked` per controllare quando il componente `<Particles>` viene renderizzato. È utile quando l'inizializzazione del motore è asincrona e vuoi evitare di renderizzare il componente prima che il motore sia pronto.

```typescript
import Controller from "@ember/controller";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { initParticlesEngine } from "@tsparticles/ember/utils/init-particles-engine";
import { loadSlim } from "@tsparticles/slim";

export default class ApplicationController extends Controller {
  @tracked engineReady = false;

  options: ISourceOptions = {
    particles: {
      number: { value: 50 },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.6 },
      size: { value: { min: 1, max: 4 } },
      move: { enable: true, speed: 1, outModes: { default: "bounce" } },
    },
    background: { color: "#1a1a2e" },
  };

  constructor(...args: any[]) {
    super(...args);
    if (typeof window !== "undefined") {
      void initParticlesEngine(async (engine: Engine) => {
        await loadSlim(engine);
      }).then(() => {
        this.engineReady = true;
      });
    }
  }
}
```

```hbs
{{#if this.engineReady}}
  <Particles @options={{this.options}} @particlesLoaded={{this.loadedCallback}} />
{{else}}
  <p>Caricamento particelle...</p>
{{/if}}
```

Il decoratore `@tracked` garantisce che il template venga ri-renderizzato automaticamente una volta che la promise si risolve.

---

## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## Esempio TypeScript

Ecco un controller applicazione Ember completo e tipizzato che dimostra il pattern di integrazione completo con preset slim, interattività e gestione del ciclo di vita.

```typescript
// app/controllers/application.ts
import Controller from "@ember/controller";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { initParticlesEngine } from "@tsparticles/ember/utils/init-particles-engine";
import { loadSlim } from "@tsparticles/slim";

export default class ApplicationController extends Controller {
  @tracked private engineReady = false;

  private container?: Container;

  private readonly options: ISourceOptions = {
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
  };

  constructor(...args: any[]) {
    super(...args);
    if (typeof window !== "undefined") {
      void initParticlesEngine(async (engine: Engine) => {
        await loadSlim(engine);
      }).then(() => {
        this.engineReady = true;
      });
    }
  }

  @action
  private handleParticlesLoaded(container?: Container): void {
    this.container = container;
    console.log("Particelle caricate nel container:", container?.id);
  }
}
```

```hbs
{{! app/templates/application.hbs }}

{{#if this.engineReady}}
  <div class="app-container">
    <h1>tsParticles + Ember</h1>
    <Particles @options={{this.options}} @particlesLoaded={{this.handleParticlesLoaded}} />
  </div>
{{else}}
  <div class="loading">
    <p>Inizializzazione motore particelle...</p>
  </div>
{{/if}}
```

---

Ora hai tutto il necessario per integrare tsParticles in un'applicazione Ember.js. Ogni esempio è autonomo e pronto per essere copiato nel tuo progetto.
