---
title: Stencil-Anleitung
description: Vollständige Anleitung zur Integration von tsParticles mit Stencil-Komponenten.
---

# Stencil-Anleitung

## Inhaltsverzeichnis

1. [Installation](#installation)
2. [Custom Elements Registrierung](#custom-elements-registration)
3. [Grundlegende Verwendung](#basic-usage)
4. [Engine-Initialisierung](#engine-initialization)
5. [Benutzerdefinierte Konfiguration](#custom-configuration)
6. [Komponenten-Lebenszyklus](#component-lifecycle)
7. [TypeScript-Beispiel](#typescript-example)

---

## Installation

Installieren Sie den Stencil-Wrapper und die tsParticles-Engine über npm:

```bash
npm install @tsparticles/stencil tsparticles
```

Optional ein Preset-Bundle installieren, um die manuelle Konfiguration zu reduzieren:

```bash
npm install @tsparticles/slim
```

---

## Custom Elements Registrierung

Das Paket `@tsparticles/stencil` bietet eine `defineCustomElements`-Funktion, die das benutzerdefinierte `<stencil-particles>`-Element beim Browser registriert. Rufen Sie sie einmal auf, bevor Sie die Komponente irgendwo in Ihrer App verwenden.

```tsx
import { defineCustomElements } from "@tsparticles/stencil/loader";

// Registrieren des <stencil-particles>-Elements
defineCustomElements();
```

Für Stencil-Projekte, die Lazy-Loading verwenden, rufen Sie dies innerhalb von `componentWillLoad` oder in der Root-Komponente Ihrer App auf, um sicherzustellen, dass das Element vor dem Rendern verfügbar ist.

---

## Grundlegende Verwendung

Sobald das benutzerdefinierte Element registriert ist, können Sie `<stencil-particles>` in Ihrem JSX mit einer `options`-Eigenschaft und einem `init`-Callback verwenden, um die erforderlichen Engine-Funktionen zu laden.

```tsx
import { Component, h } from "@stencil/core";
import type { ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const options: ISourceOptions = {
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

@Component({ tag: "my-particles" })
export class MyParticles {
  render() {
    return (
      <stencil-particles
        container-id="tsparticles"
        options={options}
        init={async (engine) => {
          await loadSlim(engine);
        }}
      />
    );
  }
}
```

---

## Engine-Initialisierung

Die `init`-Eigenschaft empfängt die Engine-Instanz und ermöglicht es Ihnen, die benötigten Funktionen zu laden. Dies ist der empfohlene Ort, um `loadSlim`, `loadFull` oder einzelne Updater-/Interaktions-Plugins aufzurufen.

```tsx
import { loadSlim } from "@tsparticles/slim";
import { loadFull } from "tsparticles";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";

// Option A: leichtgewichtig (Kreise, Basisbewegung, Verbindungen)
init={async engine => { await loadSlim(engine); }}

// Option B: vollständiger Funktionsumfang (alle Formen, Effekte, Presets)
init={async engine => { await loadFull(engine); }}

// Option C: Presets (Konfetti, Feuerwerk, Schnee, Sterne)
init={async engine => { await loadConfettiPreset(engine); }}
```

Die Engine-Instanz ist auch nach der Initialisierung über das `container-id`-Attribut zugänglich, sodass Sie das Partikelsystem später bei Bedarf programmatisch steuern können.

---

## Benutzerdefinierte Konfiguration

Nachfolgend eine vollständige Konfiguration mit Interaktivität, mehreren Formtypen und Hover-/Klick-Modi.

```tsx
import { Component, h } from "@stencil/core";
import type { ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const fullOptions: ISourceOptions = {
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
  background: {
    color: "#0f0f23",
  },
};

@Component({ tag: "app-particles" })
export class AppParticles {
  render() {
    return (
      <stencil-particles
        container-id="tsparticles"
        options={fullOptions}
        init={async (engine) => {
          await loadSlim(engine);
        }}
      />
    );
  }
}
```

---

## Komponenten-Lebenszyklus

In Stencil ist der empfohlene Lebenszyklus-Hook für die einmalige Einrichtung `componentWillLoad`. Verwenden Sie ihn, um benutzerdefinierte Elemente zu registrieren und den Initialisierungsstatus zu verwalten, sodass die `<stencil-particles>`-Komponente nur rendert, wenn die Engine vorbereitet ist.

```tsx
import { Component, h, State } from "@stencil/core";
import type { ISourceOptions } from "@tsparticles/engine";
import { defineCustomElements } from "@tsparticles/stencil/loader";
import { loadSlim } from "@tsparticles/slim";

@Component({ tag: "app-root" })
export class AppRoot {
  @State() private engineReady = false;

  private options: ISourceOptions = {
    particles: {
      number: { value: 50 },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.6 },
      size: { value: { min: 1, max: 4 } },
      move: {
        enable: true,
        speed: 1,
        outModes: { default: "bounce" },
      },
    },
    background: { color: "#1a1a2e" },
  };

  componentWillLoad() {
    defineCustomElements();
    this.engineReady = true;
  }

  render() {
    return (
      <div>
        <h1>tsParticles + Stencil</h1>
        {this.engineReady && (
          <stencil-particles
            container-id="tsparticles"
            options={this.options}
            init={async (engine) => {
              await loadSlim(engine);
            }}
          />
        )}
      </div>
    );
  }
}
```

Die Verwendung von `@State()` stellt sicher, dass die Komponente neu gerendert wird, wenn die Engine bereit ist, und das bedingte Rendern verhindert, dass der Partikel-Container montiert wird, bevor das benutzerdefinierte Element definiert ist.

---


## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## TypeScript-Beispiel

Hier ist eine vollständige, typisierte Stencil-Anwendungskomponente, die tsParticles mit dem Slim-Preset, Hover-Interaktivität und einem benutzerdefinierten dunklen Thema integriert.

```tsx
import { Component, h, State, Prop } from "@stencil/core";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { defineCustomElements } from "@tsparticles/stencil/loader";
import { loadSlim } from "@tsparticles/slim";

@Component({
  tag: "app-home",
  styleUrl: "app-home.css",
  shadow: true,
})
export class AppHome {
  @State() private initialized = false;

  @Prop() readonly title: string = "Willkommen";

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

  componentWillLoad() {
    defineCustomElements();
    this.initialized = true;
  }

  private handleInit = async (engine: Engine): Promise<void> => {
    await loadSlim(engine);
  };

  private handleLoaded = async (container?: Container): Promise<void> => {
    this.container = container;
    console.log("Partikel-Container geladen:", container?.id);
  };

  render() {
    return (
      <div class="home">
        <h1>{this.title}</h1>
        <p>Unterstützt von tsParticles und Stencil</p>

        {this.initialized && (
          <stencil-particles
            container-id="tsparticles"
            options={this.options}
            init={this.handleInit}
            particlesLoaded={this.handleLoaded}
          />
        )}
      </div>
    );
  }
}
```

Das `particlesLoaded`-Ereignis wird ausgelöst, sobald der erste Frame gerendert ist, und gibt Ihnen Zugriff auf die `Container`-Instanz für programmatische Steuerung (Abspielen, Pausieren, Stoppen, Themes wechseln).

---

Sie haben jetzt alles, was Sie benötigen, um tsParticles in eine Stencil-Anwendung zu integrieren. Jedes Beispiel ist in sich geschlossen und kann direkt in Ihr Projekt kopiert werden.
