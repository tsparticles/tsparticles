---
title: Ember-Anleitung
description: Vollständige Anleitung zur Integration von tsParticles mit Ember.js-Anwendungen.
---

# Ember-Anleitung

## Inhaltsverzeichnis

1. [Installation](#installation)
2. [Engine-Initialisierung](#engine-initialization)
3. [Grundlegende Verwendung](#basic-usage)
4. [Benutzerdefinierte Konfiguration](#custom-configuration)
5. [Ereignisbehandlung](#event-handling)
6. [Bedingtes Rendern](#conditional-rendering)
7. [TypeScript-Beispiel](#typescript-example)

---

## Installation

Installieren Sie das Ember-Addon und die tsParticles-Engine über ember-cli:

```bash
ember install @tsparticles/ember
```

Dies installiert das Addon und seine Peer-Abhängigkeit `tsparticles`. Sie können optional Preset-Pakete hinzufügen:

```bash
npm install @tsparticles/slim
```

---

## Engine-Initialisierung

Das Addon exportiert ein `initParticlesEngine`-Dienstprogramm, das Sie einmal auf Anwendungsebene aufrufen. Es erhält einen asynchronen Callback, in dem Sie die benötigten Funktionen, Presets oder Formen laden.

```typescript
import { initParticlesEngine } from "@tsparticles/ember/utils/init-particles-engine";
import { loadFull } from "tsparticles";

// Rufen Sie dies während des Anwendungs-Bootstraps auf
if (typeof window !== "undefined") {
  void initParticlesEngine(async (engine) => {
    await loadFull(engine);
  });
}
```

Typische Orte für diesen Aufruf sind der `beforeModel`-Hook der Anwendungsroute, der Konstruktor eines Anwendungs-Controllers oder ein Instance-Initializer. Die Engine-Singleton wird einmal initialisiert und von allen `<Particles>`-Komponenten in Ihrer App gemeinsam genutzt.

---

## Grundlegende Verwendung

Nach der Initialisierung der Engine verwenden Sie die `<Particles>`-Komponente in einer beliebigen Vorlage. Übergeben Sie Ihre Partikel-Konfiguration über das `@options`-Argument.

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

## Benutzerdefinierte Konfiguration

Erstellen Sie eine umfangreichere Konfiguration mit Interaktivität, mehreren Formen und responsiver Dichte.

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

## Ereignisbehandlung

Die `<Particles>`-Komponente feuert eine `@particlesLoaded`-Aktion, wenn der Container die Initialisierung abgeschlossen hat und der erste Frame gerendert wird. Verwenden Sie dies, um auf die `Container`-Instanz für programmatische Steuerung zuzugreifen.

```typescript
import Controller from "@ember/controller";
import { action } from "@ember/object";
import type { Container, ISourceOptions } from "@tsparticles/engine";

export default class ApplicationController extends Controller {
  options: ISourceOptions = {/* ... */};

  @action
  loadedCallback(container: Container) {
    console.log("Partikel geladen", container?.id);

    // Beispiel für programmatische Steuerung:
    setTimeout(() => {
      container.pause();
      console.log("Partikel nach 5 Sekunden pausiert");
    }, 5000);
  }
}
```

```hbs
<Particles @options={{this.options}} @particlesLoaded={{this.loadedCallback}} />
```

Sie können das Callback-Muster auch inline mit einem Template-Helper verwenden, wenn Sie keine separate Aktion definieren möchten.

---

## Bedingtes Rendern

Verwenden Sie Embers `{{if}}`-Helper zusammen mit einer `@tracked`-Eigenschaft, um zu steuern, wann die `<Particles>`-Komponente gerendert wird. Dies ist nützlich, wenn die Engine-Initialisierung asynchron ist und Sie vermeiden möchten, die Komponente vor der Bereitschaft der Engine zu rendern.

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
  <p>Lade Partikel...</p>
{{/if}}
```

Der `@tracked`-Dekorator stellt sicher, dass die Vorlage automatisch neu gerendert wird, sobald das Promise aufgelöst wird.

---

## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## TypeScript-Beispiel

Nachfolgend ein vollständiger, typisierter Ember-Anwendungs-Controller, der das vollständige Integrationsmuster mit Slim-Preset, Interaktivität und Lebenszyklus-Management demonstriert.

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
    console.log("Partikel geladen in Container:", container?.id);
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
    <p>Initialisiere Partikel-Engine...</p>
  </div>
{{/if}}
```

---

Sie haben jetzt alles, was Sie benötigen, um tsParticles in eine Ember.js-Anwendung zu integrieren. Jedes Beispiel ist in sich geschlossen und kann direkt in Ihr Projekt kopiert werden.
