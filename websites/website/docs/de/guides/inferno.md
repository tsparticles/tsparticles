---
title: Inferno-Anleitung
description: Vollständige Anleitung zur Integration von tsParticles mit Inferno-Anwendungen.
---

# Inferno-Anleitung

## Inhaltsverzeichnis

1. [Installation](#installation)
2. [Grundlegende Verwendung](#basic-usage)
3. [Engine-Initialisierung](#engine-initialization)
4. [Benutzerdefinierte Konfiguration](#custom-configuration)
5. [Preset-Verwendung](#preset-usage)
6. [Komponenten-Muster](#component-pattern)
7. [TypeScript-Beispiel](#typescript-example)

---

## Installation

Installieren Sie den Inferno-Wrapper und die tsParticles-Engine über npm:

```bash
npm install @tsparticles/inferno tsparticles
```

Optional das Slim-Preset für ein kleineres Bundle installieren:

```bash
npm install @tsparticles/slim
```

---

## Grundlegende Verwendung

Das Paket `@tsparticles/inferno` exportiert zwei Elemente: `ParticlesProvider` und `Particles`. Umwickeln Sie Ihre Partikel-Komponenten mit `ParticlesProvider`, das einen `init`-Callback für die Engine-Einrichtung akzeptiert, und verwenden Sie dann `<Particles>`, um die Partikel-Canvas zu rendern.

```tsx
import { render } from "inferno";
import { Particles, ParticlesProvider } from "@tsparticles/inferno";
import { loadSlim } from "@tsparticles/slim";

const options = {
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

function App() {
  return (
    <ParticlesProvider
      init={async (engine) => {
        await loadSlim(engine);
      }}
    >
      <Particles id="tsparticles" options={options} />
    </ParticlesProvider>
  );
}

render(<App />, document.getElementById("app"));
```

`ParticlesProvider` muss ein Vorfahre jeder `<Particles>`-Komponente sein. Es initialisiert die Engine einmal und stellt sie über den Kontext allen Kindern zur Verfügung.

---

## Engine-Initialisierung

Der `ParticlesProvider` akzeptiert eine `init`-Eigenschaft, die die Engine-Instanz erhält. Hier laden Sie die Funktionen, Formen, Presets oder Updater, die Ihre App benötigt.

```tsx
// Leichtgewichtig — Kreis-Partikel, Basisbewegung, Verbindungen
<ParticlesProvider init={async engine => {
  const { loadSlim } = await import("@tsparticles/slim");
  await loadSlim(engine);
}}>

// Vollständiger Funktionsumfang — alle Formen, Interaktionen, Effekte
<ParticlesProvider init={async engine => {
  const { loadFull } = await import("tsparticles");
  await loadFull(engine);
}}>

// Preset-spezifisch — Konfetti, Feuerwerk, Schnee, Sterne
<ParticlesProvider init={async engine => {
  const { loadConfettiPreset } = await import("@tsparticles/preset-confetti");
  await loadConfettiPreset(engine);
}}>
```

Die Verwendung von dynamischem `import()` innerhalb des Callbacks ermöglicht Code-Splitting: Die Preset- oder Feature-Module werden nur geladen, wenn die Partikel-Komponente montiert wird.

---

## Benutzerdefinierte Konfiguration

Nachfolgend eine voll ausgestattete Konfiguration mit Interaktivität, mehreren Formtypen und einem dunklen Farbverlaufshintergrund.

```tsx
import { render } from "inferno";
import { Particles, ParticlesProvider } from "@tsparticles/inferno";
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
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

function App() {
  return (
    <ParticlesProvider
      init={async (engine) => {
        const { loadSlim } = await import("@tsparticles/slim");
        await loadSlim(engine);
      }}
    >
      <Particles id="tsparticles" options={options} />
    </ParticlesProvider>
  );
}

render(<App />, document.getElementById("app"));
```

---

## Preset-Verwendung

Das Paket `@tsparticles/configs` bietet vorgefertigte Konfigurationen, die Sie direkt an die `options`-Eigenschaft übergeben können. Kombinieren Sie sie mit dem entsprechenden Preset-Loader im `ParticlesProvider`-Init-Callback.

```tsx
import { render } from "inferno";
import { Particles, ParticlesProvider } from "@tsparticles/inferno";
import configs from "@tsparticles/configs";

function App() {
  return (
    <ParticlesProvider
      init={async (engine) => {
        const { loadFull } = await import("tsparticles");
        await loadFull(engine);
      }}
    >
      <Particles id="tsparticles" options={configs.confetti} />
    </ParticlesProvider>
  );
}

render(<App />, document.getElementById("app"));
```

Sie können `configs.confetti` durch jedes verfügbare Preset ersetzen: `configs.basic`, `configs.fireworks`, `configs.snow`, `configs.stars` usw.

---

## Komponenten-Muster

Für größere Anwendungen strukturieren Sie Ihre Partikel-Logik in einer dedizierten Komponente mit einem `particlesLoaded`-Callback für den Zugriff auf die `Container`-Instanz.

```tsx
import { render, Component } from "inferno";
import { Particles, ParticlesProvider } from "@tsparticles/inferno";
import type { Container, ISourceOptions } from "@tsparticles/engine";

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

class ParticlesBackground extends Component {
  private container?: Container;

  handleParticlesLoaded(container?: Container) {
    this.container = container;
    console.log("Partikel geladen:", container?.id);
  }

  render() {
    return (
      <ParticlesProvider
        init={async (engine) => {
          const { loadSlim } = await import("@tsparticles/slim");
          await loadSlim(engine);
        }}
      >
        <Particles id="tsparticles" options={options} particlesLoaded={this.handleParticlesLoaded} />
      </ParticlesProvider>
    );
  }
}

function App() {
  return (
    <div>
      <h1 style={{ position: "relative", zIndex: 1, color: "#fff" }}>tsParticles + Inferno</h1>
      <ParticlesBackground />
    </div>
  );
}

render(<App />, document.getElementById("app"));
```

---

## TypeScript-Beispiel

Hier ist eine vollständige, typisierte Inferno-Anwendung mit einer responsiven Partikel-Konfiguration und Vollbild-Hintergrund.

```tsx
import { render } from "inferno";
import { Particles, ParticlesProvider } from "@tsparticles/inferno";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

const particlesOptions: ISourceOptions = {
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

function handleInit(engine: Engine): Promise<void> {
  return import("@tsparticles/slim").then(({ loadSlim }) => loadSlim(engine));
}

function handleParticlesLoaded(container?: Container): void {
  console.log("tsParticles-Container bereit:", container?.id);
}

function App() {
  return (
    <ParticlesProvider init={handleInit}>
      <div style={{ position: "relative", zIndex: 1, color: "#fff", textAlign: "center", paddingTop: "2rem" }}>
        <h1>tsParticles + Inferno</h1>
        <p>Vollständige TypeScript-Integration</p>
      </div>
      <Particles id="tsparticles" options={particlesOptions} particlesLoaded={handleParticlesLoaded} />
    </ParticlesProvider>
  );
}

render(<App />, document.getElementById("app"));
```

---

Sie haben jetzt alles, was Sie benötigen, um tsParticles in eine Inferno-Anwendung zu integrieren. Jedes Beispiel ist in sich geschlossen und kann direkt in Ihr Projekt kopiert werden.
